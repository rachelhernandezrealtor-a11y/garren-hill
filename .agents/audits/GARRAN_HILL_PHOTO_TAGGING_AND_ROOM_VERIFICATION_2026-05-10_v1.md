# GARRAN HILL — PHOTO TAGGING + ROOM VERIFICATION AUDIT
# Date: 2026-05-10
# Cloudinary access: CONFIRMED (read-only)
# Matterport: URL accessible — room navigation requires human
# dist/index.html: NOT EDITED
# Live site: NOT CHANGED
# Cloudinary assets: NOT MODIFIED

---

## SUMMARY

- Homepage images audited: 18 unique public IDs
- Room cards audited: 20
- Confirmed mislabels: 0 (suspected 2)
- Suspected mislabels: 2
- Photos needing Rachel confirmation: 10
- Photos needing Matterport confirmation: 6
- Proposed tag corrections: 10 (none applied)
- New photo candidates found for empty cards: 8 rooms

---

## CRITICAL FINDINGS

### FINDING 1 — Staircase image is tagged room_foyer
`gh_interiors/200holycrest_1182` is tagged `room_foyer` but used on the site as the staircase section and staircase card.

This is not necessarily wrong — the mahogany volute staircase rises directly from the foyer and the AI likely tagged the larger space. But it means:
- The foyer card and the staircase card are both using images tagged room_foyer
- 10 genuine room_hallway_stairs images exist and are unused on the site
- The staircase card should use a room_hallway_stairs image for accuracy

**Recommended fix:** Swap staircase card to `200holycrest_1338` (4024×6048, tall format, room_hallway_stairs). Rachel confirm.

### FINDING 2 — Twilight hero tagged room_pool
`gh_exteriors/holycrestextf_3327` is tagged `room_pool` but serves as the twilight full-bleed emotional closer.

Twilight = house facade lit at dusk. Pool = ground-level water shot. These are different subjects and different emotional registers. The tag is almost certainly wrong for this image's actual content.

**Recommended fix:** Rachel confirm image content. If it is the twilight facade (as used), retag to room_exterior_twilight. 10 actual pool images exist under room_pool tag.

### FINDING 3 — Pool card uses wrong image
The Pool & Terrace card currently uses `200_hollycrest_drive_192` (tagged room_gardens) as the pool thumbnail. This shows the canopy/grounds, not the pool. 10 actual room_pool images exist.

**Recommended fix:** Replace pool card with `holycrestextf_3334` or `200_hollycrest_drive_177` (both tagged room_pool). Move 200_hollycrest_drive_192 to the Gardens card where it belongs.

### FINDING 4 — gh_img/Winglivingroom suspicious tag
`gh_img/Winglivingroom` is tagged `room_lower_level_office`. The public ID contains "Winglivingroom" which suggests it may show a wing/living area, not the lower-level office. This needs investigation before use.

### FINDING 5 — Primary Bath has candidates (Jewel Box/Mirror Bath gap can be filled)
10 images tagged `room_primary_bath` exist (200holycrest_1362–1383). The two largest files (1371, 1374 at 6048×4024) are the best candidates for the Jewel Box Bath feature. Rachel needs to identify which image shows the mirror/marble ornament treatment.

---

## ROOMS WITH PHOTO GAPS — CONFIRMED CANDIDATES NOW AVAILABLE

| Room | Gap Status | Best Candidate | Tag |
|---|---|---|---|
| Staircase (card fix) | ⚠️ Mislabeled | 200holycrest_1338 | room_hallway_stairs |
| Primary Bath / Jewel Box | 🔴 Empty | 200holycrest_1371 or 1374 | room_primary_bath |
| Sunroom | 🔴 Empty | 200holycrest_1617 | room_sunroom |
| Pool & Terrace (card fix) | ⚠️ Wrong image | holycrestextf_3334 | room_pool |
| Wee Cottage | 🔴 Empty | holycrestextf_3345 or 3361 | room_outbuildings |
| Lower-Level Office | 🔴 Empty (with caveat) | 200_hollycrest_drive_137 | room_lower_level_office |
| Laundry | 🔴 Empty | 200holycrest_1497 | room_laundry |
| Gardens card | ⚠️ Misassigned | 200_hollycrest_drive_192 | room_gardens |

---

## PROPOSED NEXT LIVE BUILD TICKET

**PHOTO CARD ACCURACY + MISSING ROOM CARDS v1**

Scope:
1. Swap staircase card image from 1182 (room_foyer) to confirmed room_hallway_stairs candidate
2. Swap pool card image from 200_hollycrest_drive_192 (room_gardens) to actual room_pool image
3. Move 200_hollycrest_drive_192 to gardens card (correct use)
4. Add Wee Cottage card photo from room_outbuildings candidates
5. Add sunroom card photo from room_sunroom candidates
6. Add primary bath card photo from room_primary_bath candidates (Rachel picks)
7. Add laundry card photo
8. Add lower-level office card photo (pending Winglivingroom investigation)

**Dependencies before build:**
- Rachel confirms 1182 content (staircase or foyer)
- Rachel confirms holycrestextf_3327 content (twilight or pool)
- Rachel picks primary bath / Jewel Box candidate from 1362–1383
- Rachel picks staircase candidate from room_hallway_stairs set
- Rachel picks Wee Cottage angle from outbuildings set

---

## TAG CORRECTION QUEUE (DO NOT APPLY YET — SEPARATE TICKET REQUIRED)

10 corrections proposed. All documented in PHOTO_TRUTH_LAYER_v1.md.
Apply only after Rachel confirms each item.
Apply in a single dedicated Cloudinary tagging ticket with Rachel approval.

---

*Audit: 2026-05-10*
*By: Rocky*
*dist/index.html: NOT EDITED*
*Live site: NOT CHANGED*
*Cloudinary: NOT MODIFIED*
