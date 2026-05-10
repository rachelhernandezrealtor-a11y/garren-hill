# GARRAN HILL — PHOTO TRUTH LAYER v1
# Date: 2026-05-10
# Cloudinary access: CONFIRMED (read-only)
# Matterport: https://my.matterport.com/show/?m=mfwyqT5Btwx — URL accessible
#             Room-level navigation requires human; Rocky can confirm link is live
# dist/index.html: NOT EDITED
# Live site: NOT CHANGED
# Cloudinary assets: NOT MODIFIED

---

## THE TRUTH LADDER

Every image used on the Garran Hill site must pass all six rungs before live use:

```
1. Cloudinary public ID confirmed in inventory
2. AI tag / room tag reviewed (starting point only — not truth)
3. Visual confirmation: does the image actually show that room / feature?
4. Matterport or floor-plan cross-reference if room location is uncertain
5. Rachel approval for signature, hero, and evidence-layer images
6. Cleared for live site use
```

AI tags are generated from visual pattern recognition.
They are not ground truth.

A staircase photographed from the foyer → tagged room_foyer.
A twilight facade → tagged room_pool if a pool edge appears in frame.
A wing living room → tagged room_lower_level_office if the AI can't distinguish depth.

**This file is the single source of truth for photo assignments on Garran Hill.**

---

## PART 1 — HOMEPAGE IMAGE AUDIT (18 unique assets)

### LOCKED BRAND ASSETS — DO NOT AUDIT FOR REPLACEMENT

| Public ID | Use | Status |
|---|---|---|
| `gh_key/gh_wax_seal_v3` | Nav wax seal | 🔒 LOCKED FOREVER |
| `gh_key/gh_crest_black_gold_v3` | Stat bar crest | 🔒 LOCKED FOREVER — Rachel approved |

---

### EXTERIOR / ARRIVAL IMAGES

| Public ID | Folder | Tags | Used As | Assignment Correct? | Confidence | Action |
|---|---|---|---|---|---|---|
| `gh_exteriors/entrance` | gh_exteriors | act_arrival, room_gates | Arrival gates full-bleed | ✅ Yes | VERIFIED | Keep |
| `gh_exteriors/front_exterior` | gh_exteriors | act_arrival, room_exterior_approach | Architecture full-bleed | ✅ Yes | VERIFIED | Keep |
| `gh_exteriors/200holycrestf-1440` | gh_exteriors | act_evidence, room_architectural_details | Restoration Record split | ✅ Yes | VERIFIED | Keep |
| `gh_exteriors/holycrestextf_3327` | gh_exteriors | act_land, **room_pool** | **Twilight full-bleed closer** | ⚠️ TAG MISMATCH — used as twilight, tagged pool | UNCERTAIN | Rachel confirm: is this the twilight facade shot or a pool-area shot? |
| `gh_photos/200_hollycrest_drive_192` | gh_photos | act_land, room_gardens | Canopy split, Hollycrest split, Grounds split, Pool card | ⚠️ Correct for canopy/grounds. Wrong for pool card | LIKELY for grounds use, WRONG for pool card | Move to gardens card. Replace pool card with actual room_pool image |

---

### PORTRAIT / ARCHIVAL IMAGES

| Public ID | Tags | Used As | Status |
|---|---|---|---|
| `gh_key/gh_whp` | (none) | WHP portrait split | ✅ Correct |
| `gh_key/gh_threshold` | (none) | Threshold split | ✅ Correct — physical inscription |

---

### INTERIOR IMAGES

| Public ID | Tags | Used As | Correct? | Confidence | Action |
|---|---|---|---|---|---|
| `gh_interiors/200holycrest_1698` | act_house, room_foyer | Foyer full-bleed + Foyer card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1209` | act_house, room_salon | Salon band + card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1320` | act_house, room_drawing_room | Drawing Room band + card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1296` | act_house, room_dining_room | Dining Room band + card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1626` | act_house, room_kitchen | Kitchen feature split + card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1350` | act_house, room_library | Library split + card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1668` | act_house, room_powder_room | Powder Room split + card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1278` | act_house, room_primary_suite | Primary Suite split + card | ✅ Yes | VERIFIED | Keep |
| `gh_interiors/200holycrest_1182` | act_house, **room_foyer** | **Staircase split + Staircase card** | ❌ TAG MISLABEL | SUSPECTED WRONG | Replace with room_hallway_stairs candidate. See Part 5. |

---

## PART 2 — EXPLORE THE HOUSE ROOM CARDS AUDIT (20 cards)

### MAIN LEVEL

| Room | Photo | Tag | Correct? | Action |
|---|---|---|---|---|
| Foyer | 200holycrest_1698 | room_foyer | ✅ VERIFIED | Keep |
| Salon | 200holycrest_1209 | room_salon | ✅ VERIFIED | Keep |
| Drawing Room | 200holycrest_1320 | room_drawing_room | ✅ VERIFIED | Keep |
| Dining Room | 200holycrest_1296 | room_dining_room | ✅ VERIFIED | Keep |
| Kitchen & Butler's Pantry | 200holycrest_1626 | room_kitchen | ✅ VERIFIED | Keep. Butler's pantry angle: pending |
| Library | 200holycrest_1350 | room_library | ✅ VERIFIED | Keep |
| Powder Room | 200holycrest_1668 | room_powder_room | ✅ VERIFIED | Keep |
| Sunroom | PENDING | room_sunroom | — | Ready: 200holycrest_1428 or 1617. Rachel pick |

### PRIVATE LEVEL

| Room | Photo | Tag | Correct? | Action |
|---|---|---|---|---|
| Primary Suite | 200holycrest_1278 | room_primary_suite | ✅ VERIFIED | Keep |
| Primary Bath / Jewel Box | PENDING | room_primary_bath | — | 10 candidates. Rachel pick from 1371, 1374, 1380 (largest). Which is the Jewel Box? |
| Primary Closet | PENDING | room_primary_closet | — | 5 Pam Jensen candidates confirmed: 1410, 1413, 1419, 1422, 1269 |
| Upper Hall & Staircase | 200holycrest_1182 | **room_foyer** ⚠️ | ❌ WRONG TAG | Replace with room_hallway_stairs: 1215, 1338, 1569 are largest. Rachel pick |
| Bedrooms | PENDING | room_bedroom_2 | — | 5 Pam Jensen candidates: 1530, 1534, 1539, 1542, 1545 |

### LOWER LEVEL & STORAGE

| Room | Photo | Tag | Notes | Action |
|---|---|---|---|---|
| Lower-Level Office | PENDING | room_lower_level_office | 5 large Pam Jensen assets confirmed: 1581, 1599, 1602, 1605, 1608. Previous Winglivingroom suspicion resolved — these are real candidates | Rachel pick from Pam Jensen set |
| Laundry | PENDING | room_laundry | 2 Pam Jensen (1494, 1497) + 2 NestVisions | Use 1497 (Pam Jensen) |
| Attic/Cedar/Basement | PENDING | room_attic_storage | NestVisions only (drive_145–149) | Use pending Rachel review |

### GROUNDS

| Room | Photo | Tag | Notes | Action |
|---|---|---|---|---|
| Pool & Terrace | 200_hollycrest_drive_192 ⚠️ | room_gardens | WRONG — this is canopy/grounds, not pool | Replace with holycrestextf_3334 or drive_177 (room_pool tagged) |
| Wee Cottage | PENDING | room_outbuildings | 6 candidates: holycrestextf_3361 (largest, 2865KB), 3346, 3345, 3349 | Rachel pick — 3361 is strongest by file size |
| Gardens & Grounds | PENDING (currently using 192 as pool card) | room_gardens | Reassign 200_hollycrest_drive_192 HERE — correct tag | Move 192 to gardens card |
| Tennis | Text-only | n/a | Correct — no photo needed | Keep |

---

## PART 3 — BLUE FOX — RACHEL CONFIRMED ✅

**Rachel has confirmed the Blue Fox stone marker.**

The image reads:
> MY IRISH HUNTER / BLUE FOX / 1946–1965

**Confirmed asset:** `gh_img/75a1922cd`
- Tags currently: act_evidence, room_grounds_details, archival, blue_fox
- Already tagged blue_fox ✅

**Note on 200_hollycrest_drive_192:**
This asset (tagged room_gardens) was listed as a Blue Fox candidate in the prior audit. With Rachel's confirmation of 75a1922cd as the actual marker, 200_hollycrest_drive_192 is the canopy/aerial grounds shot — not the marker. Reassign to Gardens card.

---

## PART 4 — MATTERPORT VERIFICATION LAYER

**MATTERPORT URL ACCESSIBLE:** https://my.matterport.com/show/?m=mfwyqT5Btwx

Rocky can reach the URL. Room-level visual navigation inside the scan requires a human.

**Items queued for Matterport confirmation (Rachel to walk):**

| Room | Question | Priority |
|---|---|---|
| Staircase / 1182 | Foyer or staircase framing? Matterport will show mahogany volute position | HIGH |
| holycrestextf_3327 | Pool area or twilight facade from front? | HIGH |
| Lower-level office | Confirm separation from wing/living area | MEDIUM |
| Sunroom | Where does it connect — kitchen flow or back hall? | MEDIUM |
| Primary Bath | Which candidate is the Jewel Box / mirror bath? | HIGH |
| Primary Closet | Confirm these show the dressing suite, not a hallway closet | MEDIUM |
| Balcony | Which suite does the 24×11 ft balcony connect to? | LOW |

---

## PART 5 — TAG CORRECTION QUEUE (DO NOT APPLY YET)

All 11 corrections require a separate dedicated tagging ticket with Rachel approval.

| # | Public ID | Current Tags | Proposed Tags to Add | Reason | Confidence | Rachel Approval |
|---|---|---|---|---|---|---|
| 1 | `gh_interiors/200holycrest_1182` | room_foyer | ADD room_hallway_stairs, room_staircase; REVIEW room_foyer | Shows mahogany volute staircase from foyer — AI tagged the entry space not the primary subject | HIGH | Yes — visual confirm first |
| 2 | `gh_exteriors/holycrestextf_3327` | act_land, room_pool | If twilight facade: ADD room_exterior_twilight, REMOVE room_pool | Used as twilight closer; pool tag doesn't match emotional register or current use | UNCERTAIN | Yes — Rachel confirm content |
| 3 | `gh_photos/200_hollycrest_drive_192` | act_land, room_gardens | ADD room_canopy, room_grounds | Used for canopy/aerial; room_gardens is correct, canopy is more precise | MEDIUM | No — additive |
| 4 | `gh_img/75a1922cd` | archival, blue_fox, act_evidence, room_grounds_details | ADD hollycrest, dumaine, grave_marker, stone_marker, act_land | Rachel confirmed: stone reads MY IRISH HUNTER / BLUE FOX / 1946–1965 | ✅ RACHEL CONFIRMED | Approved in principle — apply in tagging ticket |
| 5 | `gh_img/ee869bbb3` | archival, dumaine, act_evidence, room_grounds_details | ADD hollycrest, betty_dumaine | Rachel to confirm content and rights before full tag | PENDING RACHEL CONFIRM | Yes |
| 6 | `gh_img/7b1b1f524` | archival, room_architectural_details | ADD restoration_drawings, o_shea | If confirmed as O'Shea restoration drawing | PENDING RACHEL CONFIRM | Yes |
| 7 | `gh_key/gh_threshold_stone` | (none) | ADD threshold, garran_hill_1916, room_threshold, act_evidence, threshold_inscription | Physical inscription proof — should be evidence-tagged | HIGH | No — additive |
| 8 | `gh_key/gh_whp_letter1` | (none) | ADD whp, walter_hines_page, manuscript, archival, act_evidence | If confirmed as authentic WHP letter | PENDING RACHEL CONFIRM | Yes — authenticity first |
| 9 | `gh_key/gh_whp_wikimedia` | (none) | ADD whp, walter_hines_page, portrait, act_evidence, public_domain | WHP portrait — public domain candidate | HIGH | Yes — license confirm first |
| 10 | `holycrestextf_3334` (pool) | room_pool | ADD act_land, pool_area | Already tagged correctly; add act context | LOW | No |
| 11 | `gh_exteriors/holycrestextf_3361` (Wee Cottage) | room_outbuildings | ADD wee_cottage, act_land | If Rachel confirms this is the Wee Cottage angle | PENDING RACHEL CONFIRM | Yes |

---

## PART 6 — READY-TO-BUILD PHOTO ASSIGNMENTS

These rooms have no image on site right now. Confirmed Pam Jensen candidates exist.
Waiting on Rachel picks before the next live build ticket.

| Room | Best Candidates (by file size) | Tag | Rachel Pick Needed? |
|---|---|---|---|
| Staircase card fix | 200holycrest_1215 (17MB), 1338 (16MB tall), 1569 (16MB) | room_hallway_stairs | Yes — pick 1 |
| Primary Bath / Jewel Box | 200holycrest_1371 (18MB), 1365 (17MB), 1380 (portrait, 12MB) | room_primary_bath | Yes — pick 1, confirm Jewel Box |
| Primary Closet | 200holycrest_1422 (17MB), 1419 (17MB), 1413 (15MB) | room_primary_closet | Yes — pick 1 |
| Sunroom | 200holycrest_1428 (16MB landscape), 1617 (15MB), 1425 (13MB portrait) | room_sunroom | Yes — pick 1 |
| Bedrooms | 200holycrest_1534 (15MB), 1542 (14MB), 1545 (13MB) | room_bedroom_2 | Yes — pick 1 |
| Pool & Terrace card | holycrestextf_3334 (1712KB), holycrestextf_3333 (1562KB), drive_177 (959KB) | room_pool | Yes — pick 1 |
| Wee Cottage | holycrestextf_3361 (2865KB), 3346 (2254KB), 3345 (2245KB) | room_outbuildings | Yes — pick 1 |
| Lower-Level Office | 200holycrest_1605 (20MB), 1608 (19MB), 1581 (18MB) | room_lower_level_office | Yes — pick 1 |
| Laundry | 200holycrest_1497 (Pam Jensen) | room_laundry | No — ready to use |
| Gardens card | 200_hollycrest_drive_192 (move from pool card) | room_gardens | No — just reassign |

---

*Photo Truth Layer v1 — 2026-05-10*
*Maintained by: Rocky*
*Cloudinary: READ-ONLY — 0 assets modified*
*Blue Fox confirmed by Rachel: 2026-05-10*

---

## RACHEL VISUAL CONFIRMATION — MAY 10, 2026

Rachel confirmed the Salon / Drawing Room distinction:

- Salon (room_salon tag): CONFIRMED = formal living room, two seating areas, terrace doors
- Drawing Room (room_drawing_room tag): CONFIRMED = Blue Room, blue-and-white tiled fireplace, spiral stair to office
- Library: CONFIRMED separate from Drawing Room and Salon

### AI CONFLICT NOTE
Any Cloudinary AI tag that conflicts with the above should be treated as suspect until corrected by a separate tagging ticket. The room_salon and room_drawing_room tags on Pam Jensen masters are confirmed accurate. Do not rely on AI captions that may describe fireplace details incorrectly.

### Blue Fox: CONFIRMED 2026-05-10
- gh_img/75a1922cd: Rachel confirmed — grave marker, inscription MY IRISH HUNTER / BLUE FOX / 1946-1965
- In use on live site in #hollycrest section ✅

---
