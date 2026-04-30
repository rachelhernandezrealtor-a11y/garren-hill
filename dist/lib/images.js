/**
 * lib/images.js — PATCHED 2026-04-30
 *
 * Single source of truth for all image references on the Garran Hill site.
 *
 * URL STRUCTURE (dynamic folder mode)
 *   Bare:       /upload/{id}.{ext}
 *   With xform: /upload/{transforms}/v{version}/{id}.{ext}
 *
 *   Version is required between transforms and the path in Cloudinary dynamic
 *   folder mode. Without it: x-cld-error "Invalid transformation parameter - gh"
 *   Verified: transform + version = 200; transform + no version = 400.
 *
 * c_limit MUST come before w_ in all transform strings.
 *   Verified: w_1920,c_limit → 400; c_limit,w_1920 → 200.
 */

export const CLOUDINARY_CLOUD = "dghn2xpif";

const IMAGE_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload`;
const VIDEO_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload`;

export const TRANSFORMS = {
  INDOOR:      "e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,c_limit,w_1600",
  OUTDOOR:     "e_improve:outdoor:70,e_sharpen:35,e_saturation:22,f_auto,q_auto,c_limit,w_1920",
  DOCUMENT:    "f_auto,q_auto,c_limit,w_1400",
  TRANSPARENT: "f_auto,q_auto,c_limit,w_800",
  NONE:        null,
};

export const REGISTRY = {
  // ── HERO ──────────────────────────────────────────────────────────────────
  HERO_VIDEO:     { id: "Last_for_real_q0fqvw",      ext: "mp4",  version: null,       video: true,  locked: true },
  HERO_VIDEO_ALT: { id: "gh_key/gh_hero_graded_v2",  ext: "mp4",  version: 1777522818, video: true },

  // ── NARRATIVE ANCHORS ─────────────────────────────────────────────────────
  KB_GATE:      { id: "gh_key/gh_gate_twilight",        ext: "jpg", version: 1777428893 },
  SAPLING_1916: { id: "gh_key/gh_sapling1916",          ext: "jpg", version: 1777270125 },
  THRESHOLD:    { id: "gh_key/gh_threshold_stone_wide", ext: "jpg", version: 1777393131 },

  // ── WALTER HINES PAGE ─────────────────────────────────────────────────────
  WHP_PORTRAIT: { id: "gh_key/gh_whp_portrait_wide", ext: "png", version: 1777392167 },
  WHP_LETTER_1: { id: "gh_key/gh_whp_letter1",       ext: "jpg", version: 1777391998 },
  WHP_LETTER_2: { id: "gh_key/gh_whp_letter2",       ext: "jpg", version: 1777392076 },

  // ── ROOMS ─────────────────────────────────────────────────────────────────
  ENTRY_HALL:     { id: "gh_key/gh_entry62",       ext: "jpg", version: 1777270464 },
  LIBRARY_HERO:   { id: "gh_key/gh_library_hero",  ext: "jpg", version: 1777407424 },
  LIBRARY_DETAIL: { id: "gh_key/gh_library_detail",ext: "jpg", version: 1777407432 },

  // Hashed filenames — asset NOT found in Cloudinary gh_key/.
  // Listed as null pending Rachel's photo system reupload.
  LIVING_ROOM: { id: null, ext: "jpg", version: null },
  FIREPLACE:   { id: null, ext: "jpg", version: null },
  ROOM_38:     { id: null, ext: "jpg", version: null },
  ROOM_40:     { id: null, ext: "jpg", version: null },
  ROOM_41:     { id: null, ext: "jpg", version: null },
  ROOM_43:     { id: null, ext: "jpg", version: null },
  ROOM_44:     { id: null, ext: "jpg", version: null },
  ROOM_216:    { id: null, ext: "jpg", version: null },
  STAIR:       { id: null, ext: "jpg", version: null },

  // ── GROUNDS ───────────────────────────────────────────────────────────────
  GROUNDS_1:   { id: null, ext: "jpg", version: null },
  GROUNDS_2:   { id: null, ext: "jpg", version: null },
  GROUNDS_3:   { id: null, ext: "jpg", version: null },
  GROUNDS_4:   { id: null, ext: "jpg", version: null },

  GROUNDS_UP5:  { id: "gh_key/gh_grounds_up5",  ext: "jpg", version: 1777443296 },
  GROUNDS_UP6:  { id: "gh_key/gh_grounds_up6",  ext: "jpg", version: 1777443295 },
  GROUNDS_UP8:  { id: "gh_key/gh_grounds_up8",  ext: "jpg", version: 1777443294 },
  GROUNDS_UP12: { id: "gh_key/gh_grounds_up12", ext: "jpg", version: 1777443297 },

  // ── HISTORY ───────────────────────────────────────────────────────────────
  DUMAINE: { id: null, ext: "jpg", version: null },

  // ── CLOSE / BRAND ─────────────────────────────────────────────────────────
  CLOSE_BG: { id: "gh_key/gh_191",          ext: "jpg", version: 1777244059 },
  WAX_SEAL:  { id: "gh_key/gh_wax_seal_v3", ext: "png", version: 1777397863, locked: true },
};

export function imageUrl(slot, transforms = null) {
  const entry = REGISTRY[slot];

  if (!entry) {
    if (typeof console !== "undefined") console.warn(`[images] unknown slot: "${slot}"`);
    return null;
  }

  if (!entry.id) return null;

  const base = entry.video ? VIDEO_BASE : IMAGE_BASE;
  const filename = `${entry.id}.${entry.ext}`;

  if (transforms) {
    if (!entry.version && typeof console !== "undefined") {
      console.warn(`[images] slot "${slot}" has no version — transforms may fail`);
    }
    const vSeg = entry.version ? `/v${entry.version}` : "";
    return `${base}/${transforms}${vSeg}/${filename}`;
  }

  return `${base}/${filename}`;
}

export function hasImage(slot) {
  return Boolean(REGISTRY[slot]?.id);
}

export function missingSlots() {
  return Object.entries(REGISTRY).filter(([, e]) => !e.id).map(([s]) => s);
}

export function unversionedSlots() {
  return Object.entries(REGISTRY)
    .filter(([, e]) => e.id && !e.version)
    .map(([s, e]) => ({ slot: s, id: e.id }));
}

export function unrenamedSlots() {
  const looksHashed = (id) => /\b[0-9a-f]{8,}_/.test(id);
  return Object.entries(REGISTRY)
    .filter(([, e]) => e.id && looksHashed(e.id))
    .map(([s, e]) => ({ slot: s, id: e.id }));
}
