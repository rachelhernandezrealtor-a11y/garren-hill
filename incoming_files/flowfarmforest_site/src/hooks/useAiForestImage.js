import { useEffect, useRef, useState } from 'react';
import { base44 } from '@/api/base44Client';

// Simple in-memory de-duplication to avoid parallel duplicate generations
const pending = {};
const TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function readCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.url || !parsed?.ts) return null;
    if (Date.now() - parsed.ts > TTL_MS) return null;
    return parsed.url;
  } catch {
    return null;
  }
}

function writeCache(key, url) {
  try {
    localStorage.setItem(key, JSON.stringify({ url, ts: Date.now() }));
  } catch {
    // ignore quota errors
  }
}

export default function useAiForestImage({ prompt, storageKey = 'ai_forest_bg_v1', fallbackUrl = '', enabled = true }) {
  const mounted = useRef(true);
  const cached = typeof window !== 'undefined' ? readCache(storageKey) : null;
  const [url, setUrl] = useState(cached || fallbackUrl || '');

  useEffect(() => {
    return () => { mounted.current = false; };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (cached) return; // already have a cached URL, no need to generate

    const doGen = async () => {
      try {
        const gen = await base44.integrations.Core.GenerateImage({ prompt });
        const newUrl = gen?.url;
        if (newUrl) {
          writeCache(storageKey, newUrl);
          if (mounted.current) setUrl(newUrl);
        }
      } catch {
        // fail silently; keep fallback
      } finally {
        delete pending[storageKey];
      }
    };

    if (!pending[storageKey]) {
      pending[storageKey] = doGen();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, prompt, storageKey]);

  return url;
}