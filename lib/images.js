/**
 * lib/images.js
 *
 * Single source of truth for all image references on the Garran Hill site.
 * Every <img> on the page should derive its src from imageUrl(SLOT_NAME).
 * No Cloudinary URL is ever typed by hand anywhere else.
 *
 * SCOPE — what this owns
 *   - Mapping section/role names ("LIBRARY_HERO") to Cloudinary public IDs
 *   - Building Cloudinary delivery URLs from those public IDs
 *   - Standardized indoor/outdoor transform recipes
 *
 * SCOPE — what this does NOT own
 *   - Aspect ratios / cropping for layout (CSS handles that with object-fit)
 *   - Page structure or copy
 *   - Any image not directly used on the live site
 *
 * SHAPE — how to use
 *
 *   import { imageUrl, REGISTRY, TRANSFORMS } from "./lib/images";
 *
 *   imageUrl("LIBRARY_HERO")
 *     → "https://res.cloudinary.com/dghn2xpif/image/upload/gh_key/gh_library_hero"
 *
 *   imageUrl("LIBRARY_HERO", TRANSFORMS.INDOOR)
 *     → "https://res.cloudinary.com/dghn2xpif/image/upload/e_improve:indoor:65,..,c_limit/gh_key/gh_library_hero"
 *
 *   imageUrl("LIBRARY_HERO", "w_800,c_fill,f_auto,q_auto")
 *     → custom transform string passed through verbatim
 *
 *   imageUrl("DUMAINE")  → null  (slot exists but asset is missing — caller decides what to render)
 *
 *   imageUrl("NOT_A_SLOT")  → null + console.warn  (typo / unknown slot)
 *
 * RULES
 *   1. New section on the page? Add a slot to REGISTRY. Don't reach for raw URLs.
 *   2. Slot's asset is missing/unconfirmed? Use null. The page decides whether to show
 *      a placeholder or hide the section. Never fake a working URL.
 *   3. New property? Don't fork this file. Generalize REGISTRY to a per-property map
 *      (see "EXTENDING TO MULTIPLE PROPERTIES" at the bottom).
 *   4. Adding a transform recipe? Add it to TRANSFORMS, not inline. Recipes are named.
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

export const CLOUDINARY_CLOUD = "dghn2xpif";

const IMAGE_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/image/upload`;
const VIDEO_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD}/video/upload`;

// ─────────────────────────────────────────────────────────────────────────────
// TRANSFORM RECIPES
//
// Locked. Sourced from MASTER_BRIEF. Do not improvise transform strings inline
// in page code — extend this object instead.
// ─────────────────────────────────────────────────────────────────────────────

export const TRANSFORMS = {
  // Interior shots — indoor improve, gentle brightness lift, sharpen, max width
  INDOOR:
    "e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,w_1600,c_limit",

  // Exterior / grounds — outdoor improve, sharpen, slight saturation
  OUTDOOR:
    "e_improve:outdoor:70,e_sharpen:35,e_saturation:22,f_auto,q_auto,w_1920,c_limit",

  // Documents (letters, brochures, archival scans) — preserve detail, no aggressive enhancement
  DOCUMENT: "f_auto,q_auto,w_1400,c_limit",

  // PNG transparency assets (wax seal, crests) — preserve alpha, modest size
  TRANSPARENT: "f_auto,q_auto,w_800,c_limit",

  // Plain delivery — no transformations, original quality
  NONE: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// REGISTRY
//
// The canonical map of slot name → Cloudinary public ID.
// Slot names are SCREAMING_SNAKE_CASE so they read as constants in JSX.
// Public IDs are written exactly as they exist in Cloudinary — including any
// folder prefix. The video flag is set on slots that are videos, not images.
//
// null means: the slot exists in the page's vocabulary but the asset has not
// yet been uploaded. The page should handle this gracefully.
// ─────────────────────────────────────────────────────────────────────────────

export const REGISTRY = {
  // ── HERO ──────────────────────────────────────────────────────────────────
  HERO_VIDEO: { id: "Last_for_real_q0fqvw", video: true, locked: true },
  HERO_VIDEO_ALT: { id: "gh_key/gh_hero_graded_v2", video: true },

  // ── NARRATIVE ANCHORS ─────────────────────────────────────────────────────
  KB_GATE: { id: "gh_key/gh_gate_twilight" },
  SAPLING_1916: { id: "gh_key/gh_sapling1916" },
  THRESHOLD: { id: "gh_key/gh_threshold_stone_wide" },

  // ── WALTER HINES PAGE ─────────────────────────────────────────────────────
  WHP_PORTRAIT: { id: "gh_key/gh_whp_portrait_wide" },     // Philip de László, 1917
  WHP_LETTER_1: { id: "gh_key/gh_whp_letter1" },           // Vol. I p. 354
  WHP_LETTER_2: { id: "gh_key/gh_whp_letter2" },           // Vol. I p. 356

  // ── ROOMS ─────────────────────────────────────────────────────────────────
  ENTRY_HALL: { id: "gh_key/gh_entry62" },
  LIVING_ROOM: { id: "gh_key/6d0f31d8c_341c7343c_living" },        // semantic name pending reupload
  FIREPLACE: { id: "gh_key/f04d40de7_gh_fire65" },                  // semantic name pending reupload
  LIBRARY_HERO: { id: "gh_key/gh_library_hero" },
  LIBRARY_DETAIL: { id: "gh_key/gh_library_detail" },

  // Numbered room slots — pending Rachel's reupload with semantic names.
  // When reuploaded, change the id here in this single place — every page
  // reference inherits the new path automatically.
  ROOM_38: { id: "gh_key/acff7572b_gh_200HollycrestDrive-38" },
  ROOM_40: { id: "gh_key/5123ec1dc_gh_200HollycrestDrive-40" },
  ROOM_41: { id: "gh_key/364c36c60_gh_200HollycrestDrive-41" },
  ROOM_43: { id: "gh_key/2a25a2db3_gh_200HollycrestDrive-43" },
  ROOM_44: { id: "gh_key/dc5868d03_gh_200HollycrestDrive-44" },
  ROOM_216: { id: "gh_key/9cf767cfb_gh_216" },

  STAIR: { id: "gh_key/b6dd004e7_up3" },                            // semantic name pending reupload

  // ── GROUNDS ───────────────────────────────────────────────────────────────
  GROUNDS_1: { id: "gh_key/3be937915_up6" },
  GROUNDS_2: { id: "gh_key/5b5d50472_up8" },
  GROUNDS_3: { id: "gh_key/e171592ba_up12" },
  GROUNDS_4: { id: "gh_key/e4aa14cad_up5" },

  // ── HISTORY ───────────────────────────────────────────────────────────────
  DUMAINE: { id: null },  // Betty Dumaine portrait — does not exist in Cloudinary yet

  // ── CLOSE / BRAND ─────────────────────────────────────────────────────────
  CLOSE_BG: { id: "gh_key/gh_191" },
  WAX_SEAL: { id: "gh_key/gh_wax_seal_v3", locked: true },
};

// ─────────────────────────────────────────────────────────────────────────────
// imageUrl — the only function the rest of the app ever calls
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a Cloudinary delivery URL for a registered slot.
 *
 * @param {string} slot - Key from REGISTRY (e.g. "LIBRARY_HERO")
 * @param {string|null} [transforms] - Transform string. Use TRANSFORMS.INDOOR /
 *                                     TRANSFORMS.OUTDOOR for the standard recipes,
 *                                     or pass a custom string. Omit / pass null
 *                                     for plain delivery.
 * @returns {string|null} The full Cloudinary URL, or null if the slot is
 *                        unknown or the asset is missing. Caller decides how
 *                        to handle null (placeholder / hide / etc).
 */
export function imageUrl(slot, transforms = null) {
  const entry = REGISTRY[slot];

  if (!entry) {
    if (typeof console !== "undefined") {
      console.warn(`[images] unknown slot: ${slot}`);
    }
    return null;
  }

  if (!entry.id) {
    // slot is known but asset is missing — return null so caller can render
    // a placeholder or skip the section
    return null;
  }

  const base = entry.video ? VIDEO_BASE : IMAGE_BASE;

  if (transforms) {
    return `${base}/${transforms}/${entry.id}`;
  }

  return `${base}/${entry.id}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// hasImage — for conditional rendering
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Check whether a slot has a usable asset, before rendering.
 *
 *   {hasImage("DUMAINE") && <img src={imageUrl("DUMAINE")} />}
 *
 * @param {string} slot
 * @returns {boolean}
 */
export function hasImage(slot) {
  return Boolean(REGISTRY[slot]?.id);
}

// ─────────────────────────────────────────────────────────────────────────────
// Diagnostic helpers — useful in dev, harmless in prod
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns every slot whose asset is currently null.
 * Useful for a build-time check or a dashboard widget that shows what's missing.
 */
export function missingSlots() {
  return Object.entries(REGISTRY)
    .filter(([, entry]) => !entry.id)
    .map(([slot]) => slot);
}

/**
 * Returns slots whose public ID still has the auto-generated hash prefix.
 * These are the candidates for Rachel's reupload pass.
 */
export function unrenamedSlots() {
  const looksHashed = (id) => /\b[0-9a-f]{8,}_/.test(id);
  return Object.entries(REGISTRY)
    .filter(([, entry]) => entry.id && looksHashed(entry.id))
    .map(([slot, entry]) => ({ slot, id: entry.id }));
}

// ─────────────────────────────────────────────────────────────────────────────
// EXTENDING TO MULTIPLE PROPERTIES
//
// When Flow Farm Forest comes online, do NOT fork this file. Instead:
//
//   1. Rename `REGISTRY` to `REGISTRIES` and nest:
//        export const REGISTRIES = {
//          "garran-hill": { HERO_VIDEO: {...}, ... },
//          "flow-farm":   { HERO_VIDEO: {...}, ... },
//        };
//
//   2. Update imageUrl to take a property argument:
//        imageUrl("garran-hill", "LIBRARY_HERO")
//
//   3. Keep TRANSFORMS shared — they're property-agnostic.
//
// The slot-name vocabulary (HERO_VIDEO, KB_GATE, LIBRARY_HERO, etc.) becomes
// the page-template contract. Every property fills in the same slots; the
// page renders the same shape with different content. That's the template.
// ─────────────────────────────────────────────────────────────────────────────
