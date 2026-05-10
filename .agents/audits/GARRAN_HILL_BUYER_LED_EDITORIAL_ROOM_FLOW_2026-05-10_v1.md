# GARRAN HILL — BUYER-LED EDITORIAL ROOM FLOW AUDIT v1
# Date: 2026-05-10
# Commit: b8ea4e6
# dist/index.html: EDITED (11 patches, +118 lines)
# Root index.html: NOT TOUCHED
# Cloudinary assets: NOT MODIFIED

---

## LIVE STATUS

garren-hill.pages.dev: 97,749 chars — VERIFIED LIVE
rachelhernandez.studio: LIVE (cache purged)

---

## ROOM GUIDE (Explore the House) — EXISTING + WIRED

Already present from prior build. Anchors updated to new section IDs:

| Card | Old anchor | New anchor |
|---|---|---|
| Salon | #social-rooms | #salon |
| Drawing Room | #social-rooms | #drawing-room |
| Dining Room | #social-rooms | #dining-room |
| Library | #library | #library-room |
| Primary Suite | #primary-suite | #private-rooms |

All other cards (Kitchen, Foyer, Powder Room, Staircase, Pool, Wee Cottage, Grounds, Tennis, Lower Level, Laundry, Storage) — anchors and copy unchanged.

---

## PRINCIPAL ROOMS — ADDED ✅

New sections inserted between #explore and #kitchen:

### #salon — The Salon
- Photo: gh_interiors/200holycrest_1209
- H2: "The house's great living room."
- Copy: Long, gracious, two seating areas, glass doors to brick terrace, nearly 40 ft, Georgian carved mantel, arched fanlights.

### #drawing-room — The Drawing Room
- Photo: gh_interiors/200holycrest_1320
- H2: "The Blue Room. Its own rhythm."
- Copy: Blue-and-white tiled fireplace, intimate scale, spiral stair to second-floor office. Most architectural interior moment.
- Caption: "Blue-and-white tile, firelight, and a spiral stair — the Drawing Room keeps its own rhythm."

### #dining-room — The Dining Room
- Photo: gh_interiors/200holycrest_1296
- H2: "Original frontispiece. Folding screen still works."
- Copy: 17×19 ft, original frontispiece, disappearing folding screen still operates.

### #library-room — The Library
- Photo: gh_interiors/200holycrest_1350
- H2: "Three walls. Floor to ceiling. Rolling ladder."
- Copy: Separate room, built-in shelving three walls, French doors to grounds, drawn with discipline.

---

## PRIVATE ROOMS — CONSOLIDATED SECTION ADDED ✅

New section #private-rooms inserted before #powder-room:
- Photo: gh_interiors/200holycrest_1278 (Primary Suite)
- H2: "Primary Suite. Balcony. Four bedrooms."
- Copy: Fireplace, custom wall panels, 24×11 balcony overlooking grounds. Four bedrooms. Primary bath/closet documented in restoration drawings.
- Comments: GH_PHOTO_CONFIRMATION_NEEDED for primary bath and primary closet

---

## KITCHEN — UPGRADED ✅

### Eyebrow
Restored to "Kitchen & Butler's Pantry"

### Body copy: Sheet 12 note added
"Sheet 12 of the restoration drawings documents the kitchen cabinetry in elevation — cooking wall, cornice, pantry, desk, TV cabinet, and potting side-porch work all drawn before they were built."
Comment preserved: <!-- GH_KITCHEN_SHEET_12_SOURCE_CONFIRMATION_NEEDED -->

### Detail Strip added
Two-image side-by-side strip below kitchen split:
- Left: 200holycrest_1647 — island/cabinetry detail
- Right: 200holycrest_1665 — cooking wall/cornice detail
Mobile: stacks vertically (flex-direction: column at ≤768px)

---

## GROUNDS — STRENGTHENED ✅

H2 updated: "Four acres. Pool. Terrace. Wee Cottage. Gardens."
Body now explicitly names:
- Brick terrace off the Salon
- Saltwater pool (converted 2022), brick wall, iron gates
- Wee Cottage — children's playhouse, set among the trees
- Rose beds, camellias along the pebble path
- Tennis court ready for renewal (no overmarketing)

---

## OLD-HOUSE SECRETS — PRESENT (unchanged)

Section #old-house-secrets confirmed:
- Secret coat closet beneath main stair ✅
- Disappearing folding screen ✅
- Bookcase with concealed cabinetry (lower-level office) ✅
- No weapons/firearms/tactical language ✅

---

## IMAGES USED / PROMOTED

| Section | Public ID | Use |
|---|---|---|
| Salon | gh_interiors/200holycrest_1209 | Split section |
| Drawing Room | gh_interiors/200holycrest_1320 | Split section |
| Dining Room | gh_interiors/200holycrest_1296 | Split section |
| Library | gh_interiors/200holycrest_1350 | Split section |
| Private Suite | gh_interiors/200holycrest_1278 | Split section |
| Kitchen wide | gh_interiors/200holycrest_1626 | Existing split |
| Kitchen detail | gh_interiors/200holycrest_1647 | NEW detail strip |
| Kitchen detail | gh_interiors/200holycrest_1665 | NEW detail strip |

---

## PHOTO GAPS REMAINING

| Room | Status | Tag |
|---|---|---|
| Primary Bath | PENDING | room_primary_bath |
| Primary Closet | PENDING | room_primary_closet |
| Sunroom / Sitting Room | PENDING | room_sunroom |
| Lower Level Office | PENDING | room_lower_level_office |
| Laundry | PENDING | room_laundry |
| Attic / Cedar / Basement | PENDING | room_attic_storage |
| Wee Cottage | PENDING | room_outbuildings |
| Bedrooms 2–4 | PENDING | room_bedroom_2/3/4 |

---

## SOURCE-SAFE COMPLIANCE ✅

| Banned phrase | Status |
|---|---|
| shell cabinets 1916 | ABSENT |
| never spent a night | ABSENT |
| guest suite | ABSENT |
| handmade brick (unconfirmed) | ABSENT |
| pool installed 2022 (corrected to 'converted') | CORRECT |
| Delft tile (public) | ABSENT — blue-and-white tiled used |

---

## REMAINING RACHEL-REVIEW ITEMS

| Item | Priority |
|---|---|
| Sheet 12 — link to actual blueprint image when available | HIGH |
| Primary Bath photo pick | HIGH |
| Staircase pick (1182 currently used, may not be best) | HIGH |
| Sunroom photo confirmation | MEDIUM |
| Wee Cottage photo | MEDIUM |
| "Delft" public-safe approval | MEDIUM |
| holycrestextf_3327 — twilight or pool confirm | MEDIUM |
| Kitchen 1647/1665 — confirm these are the right detail shots | LOW |

---

## CONFIRMATION CHECKLIST

| Item | Status |
|---|---|
| dist/index.html edited | ✅ |
| Root index.html | ✅ NOT TOUCHED |
| Cloudinary assets | ✅ NOT MODIFIED |
| Hero video (done_czfe8o) | ✅ LOCKED |
| Inquiry form | ✅ PRESENT |
| Matterport accessible | ✅ |
| Source/archive section | ✅ PRESENT |
| Mobile stacking | ✅ kitchen strip mobile CSS added |
| No pinch zoom disabled | ✅ |
| garren-hill.pages.dev live | ✅ 97,749 chars |
| rachelhernandez.studio | ✅ |

---

*Audit: 2026-05-10 — Rocky*
*Commit: b8ea4e6*
