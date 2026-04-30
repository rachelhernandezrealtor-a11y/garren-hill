/**
 * lib/images.js — Garran Hill Image Registry
 * Single source of truth for all Cloudinary assets.
 *
 * Generated: 2026-04-30
 * Authors: Rocky + Claude
 *
 * Usage:
 *   import { imageUrl, TRANSFORMS, hasImage } from "./lib/images";
 *   <img src={imageUrl("LIBRARY_HERO", TRANSFORMS.INDOOR)} />
 *   {hasImage("DUMAINE") && <img src={imageUrl("DUMAINE")} />}
 */

const CLOUD_NAME = "dghn2xpif";
const IMAGE_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;
const VIDEO_BASE = `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/`;

export const TRANSFORMS = {
  INDOOR:      "e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,w_1600,c_limit",
  OUTDOOR:     "e_improve:outdoor:70,e_sharpen:35,e_saturation:22,f_auto,q_auto,w_1920,c_limit",
  DOCUMENT:    "f_auto,q_auto,w_1200,c_limit",
  TRANSPARENT: "e_background_removal/f_auto,q_auto",
  NONE:        "",
};

export const REGISTRY = {
  HERO_VIDEO:       { id: "Last_for_real_q0fqvw", video: true, locked: true },
  HERO_VIDEO_ALT:   { id: "gh_key/gh_hero_graded_v2", video: true },
  KB_GATE:          { id: "gh_key/gh_gate_twilight" },
  SAPLING_1916:     { id: "gh_key/gh_sapling1916" },
  THRESHOLD:        { id: "gh_key/gh_threshold_stone_wide" },
  WHP_PORTRAIT:     { id: "gh_key/gh_whp_portrait_wide" },
  WHP_LETTER_1:     { id: "gh_key/gh_whp_letter1" },
  WHP_LETTER_2:     { id: "gh_key/gh_whp_letter2" },
  LIBRARY_HERO:     { id: "gh_key/gh_library_hero" },
  LIBRARY_DETAIL:   { id: "gh_key/gh_library_detail" },
  ENTRY_HALL:       { id: "gh_key/gh_entry62" },
  CLOSE_BG:         { id: "gh_key/gh_191" },
  WAX_SEAL:         { id: "gh_key/gh_wax_seal_v3", locked: true },
  GROUNDS_1:        { id: "gh_key/3be937915_up6" },
  GROUNDS_2:        { id: "gh_key/5b5d50472_up8" },
  GROUNDS_3:        { id: "gh_key/e171592ba_up12" },
  GROUNDS_4:        { id: "gh_key/e4aa14cad_up5" },
  STAIR:            { id: "gh_key/b6dd004e7_up3" },
  LIVING_ROOM:      { id: "gh_key/6d0f31d8c_341c7343c_living" },
  FIREPLACE:        { id: "gh_key/f04d40de7_gh_fire65" },
  ROOM_38:          { id: "gh_key/acff7572b_gh_200HollycrestDrive-38" },
  ROOM_40:          { id: "gh_key/5123ec1dc_gh_200HollycrestDrive-40" },
  ROOM_41:          { id: "gh_key/364c36c60_gh_200HollycrestDrive-41" },
  ROOM_43:          { id: "gh_key/2a25a2db3_gh_200HollycrestDrive-43" },
  ROOM_44:          { id: "gh_key/dc5868d03_gh_200HollycrestDrive-44" },
  ROOM_216:         { id: "gh_key/9cf767cfb_gh_216" },
  DUMAINE:          { id: null },
};

export function imageUrl(slot, transforms = "") {
  const entry = REGISTRY[slot];
  if (!entry || entry.id === null) return null;
  const base = entry.video ? VIDEO_BASE : IMAGE_BASE;
  const t = transforms ? `${transforms}/` : "";
  return `${base}${t}${entry.id}`;
}

export function hasImage(slot) {
  const entry = REGISTRY[slot];
  return !!(entry && entry.id !== null);
}

export function missingSlots() {
  return Object.entries(REGISTRY)
    .filter(([, v]) => v.id === null)
    .map(([k]) => k);
}

export function unrenamedSlots() {
  const HASH_PATTERN = /[0-9a-f]{7,}_/;
  return Object.entries(REGISTRY)
    .filter(([, v]) => v.id && HASH_PATTERN.test(v.id))
    .map(([k]) => k);
}

// MULTI-PROPERTY NOTE: When Flow Farm comes online, nest registries:
// export const GH = { REGISTRY, imageUrl, hasImage };
// export const FF = { REGISTRY: FF_REGISTRY, imageUrl: ffImageUrl };
