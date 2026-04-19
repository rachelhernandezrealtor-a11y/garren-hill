import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

let imageCache = null;
let imageCachePromise = null;
let textCache = null;
let textCachePromise = null;
let imageSubscriptionStarted = false;
let textSubscriptionStarted = false;

let globalEditMode = false;
const editModeListeners = new Set();
const pendingImages = {};
const imageListeners = new Map();
const textListeners = new Map();

const asArray = (result) =>
  Array.isArray(result) ? result : Array.isArray(result?.items) ? result.items : [];

function notifyListeners(listenersMap, key, value) {
  const listeners = listenersMap.get(key);
  if (!listeners) return;
  listeners.forEach((listener) => listener(value));
}

function subscribeToKey(listenersMap, key, listener) {
  const current = listenersMap.get(key) || new Set();
  current.add(listener);
  listenersMap.set(key, current);
  return () => {
    const next = listenersMap.get(key);
    if (!next) return;
    next.delete(listener);
    if (next.size === 0) listenersMap.delete(key);
  };
}

async function ensureImageCache() {
  if (imageCache !== null) return imageCache;
  if (imageCachePromise) return imageCachePromise;
  imageCachePromise = (async () => {
    try {
      const rows = asArray(await base44.entities.ImageContent.list());
      imageCache = {};
      rows.forEach((row) => {
        imageCache[row.content_id] = row.image_url;
      });
      imageCachePromise = null;
      return imageCache;
    } catch {
      imageCache = {};
      imageCachePromise = null;
      return imageCache;
    }
  })();
  return imageCachePromise;
}

async function ensureTextCache() {
  if (textCache !== null) return textCache;
  if (textCachePromise) return textCachePromise;
  textCachePromise = (async () => {
    try {
      const rows = asArray(await base44.entities.TextContent.list());
      textCache = {};
      rows.forEach((row) => {
        textCache[row.content_id] = row.value;
      });
      textCachePromise = null;
      return textCache;
    } catch {
      textCache = {};
      textCachePromise = null;
      return textCache;
    }
  })();
  return textCachePromise;
}

function startImageSubscription() {
  if (imageSubscriptionStarted) return;
  imageSubscriptionStarted = true;

  base44.entities.ImageContent.subscribe((event) => {
    if (!event?.data?.content_id || event.type === 'delete') return;
    const key = event.data.content_id;
    if (imageCache !== null) imageCache[key] = event.data.image_url;
    notifyListeners(imageListeners, key, event.data.image_url);
    if (import.meta.env.DEV) {
      console.debug('[EditableImage] synced', event.type, key);
    }
  });
}

function startTextSubscription() {
  if (textSubscriptionStarted) return;
  textSubscriptionStarted = true;

  base44.entities.TextContent.subscribe((event) => {
    if (!event?.data?.content_id || event.type === 'delete') return;
    const key = event.data.content_id;
    if (textCache !== null) textCache[key] = event.data.value;
    notifyListeners(textListeners, key, event.data.value);
    if (import.meta.env.DEV) {
      console.debug('[EditableText] synced', event.type, key);
    }
  });
}

export function getGlobalEditMode() {
  return globalEditMode;
}

export function toggleGlobalEditMode() {
  globalEditMode = !globalEditMode;
  editModeListeners.forEach((listener) => listener(globalEditMode));
  return globalEditMode;
}

export async function saveAllPendingImages() {
  try {
    const entries = Object.entries(pendingImages);
    for (const [id, url] of entries) {
      const existing = asArray(await base44.entities.ImageContent.filter({ content_id: id }));
      if (existing.length > 0) {
        await base44.entities.ImageContent.update(existing[0].id, { image_url: url });
      } else {
        await base44.entities.ImageContent.create({ content_id: id, image_url: url });
      }
      if (imageCache) imageCache[id] = url;
      notifyListeners(imageListeners, id, url);
      delete pendingImages[id];
    }
    return true;
  } catch {
    return false;
  }
}

export function EditableText({
  storageKey,
  defaultValue = '',
  tag: Tag = 'p',
  className = '',
  style = {}
}) {
  const safeStorageKey = typeof storageKey === 'string' ? storageKey : '';
  const safeDefaultValue = typeof defaultValue === 'string' ? defaultValue : String(defaultValue ?? '');
  const [value, setValue] = useState(defaultValue);
  const [isEditing, setIsEditing] = useState(false);
  const [editMode, setEditMode] = useState(globalEditMode);

  useEffect(() => {
    const listener = (mode) => setEditMode(mode);
    editModeListeners.add(listener);
    return () => editModeListeners.delete(listener);
  }, []);

  useEffect(() => {
    startTextSubscription();
    let isActive = true;

    ensureTextCache().then((cache) => {
      if (!isActive) return;
      if (safeStorageKey && cache[safeStorageKey] !== undefined) setValue(cache[safeStorageKey]);
    });

    const unsubscribe = subscribeToKey(textListeners, safeStorageKey, setValue);
    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [safeStorageKey]);

  const handleSave = async (newValue) => {
    const safeValue = typeof newValue === 'string' ? newValue : String(newValue ?? '');
    setValue(safeValue);
    setIsEditing(false);
    if (safeStorageKey && textCache !== null) textCache[safeStorageKey] = safeValue;
    notifyListeners(textListeners, safeStorageKey, safeValue);

    if (safeStorageKey) {
      const existing = asArray(await base44.entities.TextContent.filter({ content_id: safeStorageKey }));
      if (existing.length > 0) {
        await base44.entities.TextContent.update(existing[0].id, { value: safeValue });
      } else {
        await base44.entities.TextContent.create({ content_id: safeStorageKey, value: safeValue });
      }
    }

    if (import.meta.env.DEV) {
      console.debug('[EditableText] saved', safeStorageKey, safeValue);
    }
  };

  if (editMode && isEditing) {
    return (
      <textarea
        autoFocus
        defaultValue={value}
        data-editable-id={safeStorageKey}
        data-editable-label={safeStorageKey}
        className={`${className} border border-blue-400 rounded p-1 w-full`}
        style={style}
        onBlur={(e) => handleSave(e.target.value)}
      />
    );
  }

  return (
    <Tag
      data-editable-id={safeStorageKey}
      data-editable-label={safeStorageKey}
      className={className}
      style={{ ...style, cursor: editMode ? 'pointer' : 'inherit' }}
      onClick={() => editMode && setIsEditing(true)}
    >
      {value || safeDefaultValue || ' '}
    </Tag>
  );
}

export function EditableImage({ id, src: defaultSrc, alt = '', className = '', style = {} }) {
  const safeId = typeof id === 'string' ? id : '';
  const safeAlt = typeof alt === 'string' ? alt : '';
  const safeSrc = typeof defaultSrc === 'string' ? defaultSrc : '';
  const [src, setSrc] = useState(safeSrc);

  useEffect(() => {
    startImageSubscription();
    let isActive = true;

    ensureImageCache().then((cache) => {
      if (!isActive) return;
      if (safeId && cache[safeId]) setSrc(cache[safeId]);
    });

    const unsubscribe = subscribeToKey(imageListeners, safeId, setSrc);
    return () => {
      isActive = false;
      unsubscribe();
    };
  }, [safeId]);

  return src ? (
    <img src={src} alt={safeAlt} className={className} style={style} data-editable-id={safeId} data-editable-label={safeAlt || safeId} />
  ) : (
    <div className={className} style={style} data-editable-id={safeId} data-editable-label={safeAlt || safeId} />
  );
}