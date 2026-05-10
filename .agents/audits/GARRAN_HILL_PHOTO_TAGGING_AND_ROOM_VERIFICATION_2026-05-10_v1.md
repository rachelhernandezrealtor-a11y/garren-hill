# GARRAN HILL — PHOTO TAGGING + ROOM VERIFICATION AUDIT v1
# Date: 2026-05-10
# Cloudinary access: CONFIRMED (read-only)
# Matterport: URL accessible — room navigation requires human
# dist/index.html: NOT EDITED
# Live site: NOT CHANGED
# Cloudinary assets: NOT MODIFIED

---

## SUMMARY COUNTS

| Item | Count |
|---|---|
| Homepage images audited | 18 |
| Room cards audited | 20 |
| Locked brand assets (not audited) | 2 |
| Confirmed mislabels | 0 |
| Suspected mislabels | 2 |
| Photos needing Rachel confirmation | 9 |
| Photos needing Matterport confirmation | 6 |
| Proposed tag corrections | 11 (none applied) |
| Rooms with confirmed Cloudinary candidates now available | 10 |
| Rachel-confirmed facts new this session | 1 (Blue Fox ✅) |

---

## CLOUDINARY ACCESS: CONFIRMED

## MATTERPORT ACCESS: URL ACCESSIBLE
https://my.matterport.com/show/?m=mfwyqT5Btwx
Rocky can confirm the URL is live. Room-level navigation requires Rachel to walk the scan.

---

## CRITICAL FINDINGS

### 1. STAIRCASE CARD USES FOYER-TAGGED IMAGE ⚠️
`gh_interiors/200holycrest_1182` is tagged `room_foyer` and is currently powering:
- The staircase section split
- The staircase room card

The mahogany volute staircase rises directly from the foyer, so the AI tagged the broader entry space rather than the staircase itself. This is a probable mislabel — the image most likely shows the staircase rising from the foyer, not the foyer floor plan.

**10 correctly tagged room_hallway_stairs images exist and are unused on the site.**
Best replacement candidates (all Pam Jensen masters):
- `200holycrest_1215` — 3966×5594 (17MB) — tall portrait format
- `200holycrest_1338` — 4024×6048 (16MB) — very tall, strong stair geometry
- `200holycrest_1569` — 5044×3699 (16MB) — landscape, wider view

**Action required:** Rachel picks one. Next build ticket swaps the card.

---

### 2. TWILIGHT FULL-BLEED TAGGED room_pool ⚠️
`gh_exteriors/holycrestextf_3327` is tagged `room_pool` but serves as the twilight full-bleed emotional closer — the last cinematic image before the inquiry section.

A twilight exterior (house lit at dusk, facade centered) is a completely different subject from a pool area shot (water, deck, enclosure). This tag is almost certainly wrong for the image's actual content.

**Action required:** Rachel confirms which this is. If twilight: retag in dedicated ticket. 10 separate room_pool images exist for actual pool use.

---

### 3. POOL CARD USES WRONG IMAGE ⚠️
`gh_photos/200_hollycrest_drive_192` (tagged `room_gardens`) is currently powering the Pool & Terrace room card. This shows the mature canopy / aerial grounds — not the pool.

**Fix:** Move 200_hollycrest_drive_192 to the Gardens & Grounds card (correct use). Replace pool card with `holycrestextf_3334` or `drive_177` (both tagged room_pool).

---

### 4. BLUE FOX CONFIRMED ✅
Rachel has visually confirmed `gh_img/75a1922cd` as the Blue Fox stone marker.

The inscription reads:
> MY IRISH HUNTER / BLUE FOX / 1946–1965

This image is currently tagged: `act_evidence, room_grounds_details, archival, blue_fox`

The `blue_fox` tag is already present. Additional tags (hollycrest, dumaine, grave_marker, stone_marker, act_land) to be added in dedicated tagging ticket.

This image replaces the `GH_BLUE_FOX_IMAGE_PENDING` placeholder in the #hollycrest section.

---

### 5. PRIMARY BATH / JEWEL BOX — CANDIDATES CONFIRMED, PICK NEEDED
10 large Pam Jensen images exist tagged `room_primary_bath` (200holycrest_1362–1398).
Three largest: 1371 (18MB), 1365 (17MB), 1395 (17MB).

Rachel needs to identify which image shows the mirror / marble / ornament treatment that is the Jewel Box.

---

### 6. LOWER-LEVEL OFFICE — REAL CANDIDATES CONFIRMED
5 large Pam Jensen images exist tagged `room_lower_level_office`:
1605 (20MB), 1608 (19MB), 1581 (18MB), 1602 (18MB), 1599 (16MB).

Previous session flagged `gh_img/Winglivingroom` as suspicious. The Pam Jensen set above supersedes that concern — use these instead.

---

### 7. PRIMARY CLOSET — CANDIDATES FOUND (PREVIOUSLY UNKNOWN)
5 Pam Jensen images exist tagged `room_primary_closet`:
1422 (17MB), 1419 (17MB), 1413 (15MB), 1410 (14MB), 1269 (12MB)

This fills a gap that was marked pending. Rachel pick needed.

---

## PHOTOS NEEDING RACHEL VISUAL CONFIRMATION

| Asset | Question | Priority |
|---|---|---|
| `gh_interiors/200holycrest_1182` | Staircase from foyer — or foyer itself? | HIGH |
| `gh_exteriors/holycrestextf_3327` | Twilight facade or pool area? | HIGH |
| `gh_interiors/200holycrest_1371` etc | Which is the Jewel Box / Mirror Bath? | HIGH |
| `gh_exteriors/holycrestextf_3361` etc | Which Wee Cottage angle is strongest? | MEDIUM |
| `gh_img/ee869bbb3` (dumaine tag) | Who/what is this? Rights clear? | HIGH |
| `gh_img/7b1b1f524` (architectural) | Is this an O'Shea restoration drawing? | MEDIUM |
| `gh_key/gh_whp_letter1` | Authentic WHP letter — whose hand, what letter? | HIGH |
| `gh_key/gh_whp_wikimedia` | License confirmed for commercial use? | HIGH |
| Staircase card pick | From: 1215, 1338, 1569 — Rachel choose 1 | HIGH |

---

## PHOTOS NEEDING MATTERPORT CONFIRMATION

| Room | Question |
|---|---|
| Staircase vs. foyer | Where does 1182 sit in the floor plan? |
| Twilight / pool | Pool area or front facade? |
| Lower-level office | Confirm separation from wing/common areas |
| Sunroom | Kitchen flow or back hall connection? |
| Primary bath | Which candidate shows the Jewel Box space? |
| Primary closet | Confirm these are the dressing suite, not passage closets |

---

## PROPOSED TAG CORRECTIONS — 11 ITEMS

Not applied. Require dedicated tagging ticket + Rachel approval.
All documented in full in GARRAN_HILL_PHOTO_TRUTH_LAYER_v1.md.

Priority order:
1. `gh_img/75a1922cd` — add grave_marker/hollycrest/dumaine tags (Rachel confirmed)
2. `gh_interiors/200holycrest_1182` — resolve foyer vs. staircase
3. `gh_exteriors/holycrestextf_3327` — resolve twilight vs. pool
4. `gh_key/gh_threshold_stone` — add inscription/evidence tags (no harm, additive)
5. `gh_key/gh_whp_wikimedia` — add WHP/portrait/public_domain after license confirm
6–11. All others pending individual confirms

---

## RECOMMENDED NEXT LIVE BUILD TICKET

**PHOTO CARD ACCURACY + PENDING ROOM CARDS v1**

Scope (all changes to dist/index.html only):
1. Swap staircase card from 1182 → confirmed room_hallway_stairs pick
2. Swap pool card from 200_hollycrest_drive_192 → actual room_pool image
3. Reassign 200_hollycrest_drive_192 to gardens card
4. Add Blue Fox image (75a1922cd) to #hollycrest section — Rachel confirmed
5. Add Wee Cottage card photo — Rachel pick
6. Add Sunroom card photo — Rachel pick
7. Add Primary Bath / Jewel Box card — Rachel pick
8. Add Primary Closet card — Rachel pick (candidates now confirmed)
9. Add Lower-Level Office card — Rachel pick
10. Upgrade Laundry card with 200holycrest_1497

**Gate:** Rachel picks for items 1, 5, 6, 7, 8, 9 first.
Items 2, 3, 4, 10 can be built immediately.

---

## FILES REFERENCED

| File | Purpose |
|---|---|
| `.agents/photo-maps/GARRAN_HILL_PHOTO_TRUTH_LAYER_v1.md` | Full truth ladder + candidate lists |
| `.agents/audits/GARRAN_HILL_PHOTO_TAGGING_AND_ROOM_VERIFICATION_2026-05-10_v1.md` | This file |
| `.agents/GH_CLOUDINARY_PHOTO_GUIDE.md` | Master photo inventory — source of truth |

---

*Audit: 2026-05-10 — Rocky*
*dist/index.html: NOT EDITED*
*Live site: NOT CHANGED*
*Cloudinary: NOT MODIFIED*
