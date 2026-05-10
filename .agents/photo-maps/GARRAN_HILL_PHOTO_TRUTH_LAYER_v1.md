# GARRAN HILL — PHOTO TRUTH LAYER v1
# Date: 2026-05-10
# Cloudinary access: CONFIRMED (read-only)
# Matterport: ACCESSIBLE at https://my.matterport.com/show/?m=mfwyqT5Btwx
#             (Rocky can access URL; room-level visual navigation requires human)
# dist/index.html: NOT EDITED
# Live site: NOT CHANGED
# Cloudinary assets: NOT MODIFIED

---

## THE TRUTH LADDER

Every image used on the Garran Hill site must pass through this ladder before live use:

```
1. Cloudinary public ID confirmed in inventory
2. AI tag / room tag confirmed (starting point only — not truth)
3. Visual confirmation: does it actually show that room?
4. Matterport cross-reference: is this the right space, right angle?
5. Rachel approval for signature/hero images
6. Cleared for site use
```

AI tags are a starting point. They are generated from visual pattern recognition.
They are not ground truth. A staircase viewed from the foyer will be tagged room_foyer.
A hallway glimpsed through a doorway will be tagged by the primary subject, not the secondary space.

---

## PART 1 — HOMEPAGE IMAGE AUDIT

18 unique image public IDs currently in use on the live site.

---

### LOCKED / BRAND ASSETS (do not audit for replacement)

| Public ID | Use | Status |
|---|---|---|
| `gh_key/gh_wax_seal_v3` | Nav wax seal | 🔒 LOCKED FOREVER — do not replace |
| `gh_key/gh_crest_black_gold_v3` | Stat bar crest | 🔒 LOCKED FOREVER — Rachel approved |
| `gh_key/gh_whp` | WHP portrait | ✅ Correct — WHP portrait, confirmed use |
| `gh_key/gh_threshold` | Threshold split | ✅ Correct — threshold inscription |

---

### EXTERIOR / ARRIVAL IMAGES

| # | Public ID | Tags | Used As | Assignment Correct? | Confidence | Action |
|---|---|---|---|---|---|---|
| 1 | `gh_exteriors/entrance` | act_arrival, room_gates | Arrival gates full-bleed | ✅ Yes — gates/circular drive | VERIFIED | Keep |
| 2 | `gh_photos/200_hollycrest_drive_192` | act_land, room_gardens | Canopy split, Hollycrest split, Grounds split, Pool card | ⚠️ Partial — tagged room_gardens. Used for pool card which is misleading | LIKELY for canopy/grounds, UNCERTAIN for pool card | Keep for canopy/grounds. Replace pool card with actual pool image |
| 3 | `gh_exteriors/front_exterior` | act_arrival, room_exterior_approach | Architecture full-bleed | ✅ Yes — front facade | VERIFIED | Keep |
| 4 | `gh_exteriors/200holycrestf-1440` | act_evidence, room_architectural_details | Restoration record split | ✅ Yes — exterior elevation | VERIFIED | Keep |
| 5 | `gh_exteriors/holycrestextf_3327` | act_land, room_pool | Twilight full-bleed | ⚠️ MISMATCH — tagged room_pool but used as twilight exterior | UNCERTAIN | Rachel confirm: is this the twilight exterior or pool area shot? Tag says pool. |

---

### INTERIOR IMAGES

| # | Public ID | Tags | Used As | Assignment Correct? | Confidence | Action |
|---|---|---|---|---|---|---|
| 6 | `gh_interiors/200holycrest_1698` | act_house, room_foyer | Foyer full-bleed + Foyer card | ✅ Yes — foyer | VERIFIED | Keep |
| 7 | `gh_interiors/200holycrest_1209` | act_house, room_salon | Salon (band + card) | ✅ Yes | VERIFIED | Keep |
| 8 | `gh_interiors/200holycrest_1320` | act_house, room_drawing_room | Drawing room (band + card) | ✅ Yes | VERIFIED | Keep |
| 9 | `gh_interiors/200holycrest_1296` | act_house, room_dining_room | Dining room (band + card) | ✅ Yes | VERIFIED | Keep |
| 10 | `gh_interiors/200holycrest_1626` | act_house, room_kitchen | Kitchen feature + card | ✅ Yes | VERIFIED | Keep |
| 11 | `gh_interiors/200holycrest_1350` | act_house, room_library | Library split + card | ✅ Yes | VERIFIED | Keep |
| 12 | `gh_interiors/200holycrest_1668` | act_house, room_powder_room | Powder room split + card | ✅ Yes | VERIFIED | Keep |
| 13 | `gh_interiors/200holycrest_1278` | act_house, room_primary_suite | Primary suite split + card | ✅ Yes | VERIFIED | Keep |
| 14 | `gh_interiors/200holycrest_1182` | act_house, **room_foyer** | **STAIRCASE split + card** | ❌ MISLABEL — tagged room_foyer, used as staircase | **SUSPECTED MISLABEL** | Rachel confirm: is 1182 the staircase or foyer? 10 other room_foyer images exist. 10 room_hallway_stairs images exist. |

---

### CONFIRMED MISLABELS: 0
### SUSPECTED MISLABELS: 2

1. **`gh_interiors/200holycrest_1182`** — tagged `room_foyer`, used as staircase on site. The staircase is visible from the foyer, so AI tagged it by the larger space. Very likely shows the mahogany volute staircase from the foyer entry. **Rachel confirm.**

2. **`gh_exteriors/holycrestextf_3327`** — tagged `room_pool`, used as twilight exterior full-bleed. Pool shots are typically from ground level showing the water. Twilight shots show the house facade lit at dusk. These are different subjects. **Rachel confirm which this is.**

---

## PART 2 — EXPLORE THE HOUSE ROOM CARDS AUDIT

20 room cards in 4 groups. 9 are currently pending-state (no confirmed photo).

### MAIN LEVEL — 8 cards

| Room Card | Photo Used | Tag Relied On | Photo Matches Room? | Needs Better Photo? | Matterport Verify? | Status |
|---|---|---|---|---|---|---|
| Foyer | 200holycrest_1698 | room_foyer | ✅ Yes | No | No | ✅ VERIFIED |
| Salon | 200holycrest_1209 | room_salon | ✅ Yes | No | No | ✅ VERIFIED |
| Drawing Room | 200holycrest_1320 | room_drawing_room | ✅ Yes | No | No | ✅ VERIFIED |
| Dining Room | 200holycrest_1296 | room_dining_room | ✅ Yes | No | No | ✅ VERIFIED |
| Kitchen & Butler's Pantry | 200holycrest_1626 | room_kitchen | ✅ Yes | Possible — butler's pantry angle? | No | ✅ VERIFIED (kitchen). Butler's pantry angle pending |
| Library | 200holycrest_1350 | room_library | ✅ Yes | No | No | ✅ VERIFIED |
| Powder Room | 200holycrest_1668 | room_powder_room | ✅ Yes | No | No | ✅ VERIFIED |
| Sunroom / Sitting Room | PENDING | room_sunroom | — | Yes — 5 candidates exist | ⚠️ Yes | Candidates: 200holycrest_1617, 200holycrest_1428, 200_hollycrest_drive_47/48 |

### PRIVATE LEVEL — 5 cards

| Room Card | Photo Used | Tag Relied On | Photo Matches Room? | Notes | Status |
|---|---|---|---|---|---|
| Primary Suite | 200holycrest_1278 | room_primary_suite | ✅ Yes | 8 total primary suite images available | ✅ VERIFIED |
| Primary Bath | PENDING | room_primary_bath | — | 10 candidates exist — 200holycrest_1362 through 1383 | Needs Rachel pick |
| Primary Closet | PENDING | room_primary_closet | — | Tag not yet searched — may exist | Needs tag search + Rachel |
| Upper Hall & Staircase | 200holycrest_1182 | room_foyer ⚠️ | **Mislabeled** | 10 true room_hallway_stairs images exist — use those | ⚠️ Replace with room_hallway_stairs candidate |
| Bedrooms | PENDING | room_bedroom_2/3/4 | — | Tags exist, images found in previous searches | Needs Rachel pick |

### LOWER LEVEL & STORAGE — 3 cards

| Room Card | Photo Used | Notes | Status |
|---|---|---|---|
| Lower-Level Office | PENDING | 5 images tagged room_lower_level_office — 200_hollycrest_drive_137/139/140/142, gh_img/Winglivingroom | **Note: gh_img/Winglivingroom tag is suspicious — "Wing living room" is not lower-level office. Rachel confirm.** |
| Laundry | PENDING | 4 images: 200holycrest_1494/1497, 200_hollycrest_drive_143/144 | Pam Jensen images available |
| Attic/Cedar/Basement | PENDING | 5 images: 200_hollycrest_drive_145–149 | NestVisions only, may be lower quality |

### GROUNDS — 4 cards

| Room Card | Photo Used | Notes | Status |
|---|---|---|---|
| Pool & Terrace | 200_hollycrest_drive_192 (room_gardens) ⚠️ | **Mismatch** — 10 actual room_pool images exist. Replace with holycrestextf_3334/3333 or 200_hollycrest_drive_177-184 | Replace |
| Wee Cottage | PENDING | 6 room_outbuildings images confirmed: holycrestextf_3345/3346/3349/3361, 200_hollycrest_drive_193/194 | Ready to assign — Rachel pick |
| Gardens & Grounds | PENDING | Use 200_hollycrest_drive_192 here (correctly tagged room_gardens) | Swap 192 from pool card to gardens card |
| Tennis | Text-only | No photo — correct for now | Keep text-only |

---

## PART 3 — MATTERPORT VERIFICATION LAYER

**Status:** MATTERPORT URL ACCESSIBLE at https://my.matterport.com/show/?m=mfwyqT5Btwx

Rocky can reach the URL. Room-level visual navigation inside the Matterport scan requires a human operating the interface — Rocky cannot steer the virtual tour.

**What Matterport can verify (Rachel or agent with browser):**
- Confirm 1182 is staircase vs. foyer (navigate to mahogany volute)
- Confirm holycrestextf_3327 is twilight exterior or pool area
- Confirm lower-level office vs. wing living room distinction
- Confirm sunroom location relative to kitchen/back hall flow
- Confirm primary bath is separate from bathroom_2/bathroom_3
- Verify balcony location relative to primary suite

**Items flagged for Matterport confirmation:**

| Room | Question | Priority |
|---|---|---|
| Staircase / 1182 | Foyer or staircase? | HIGH |
| Twilight / holycrestextf_3327 | Pool area or twilight facade? | HIGH |
| Lower-level office | Confirm vs. wing/living area | MEDIUM |
| Sunroom | Where does it flow from kitchen/back hall? | MEDIUM |
| Primary bath | Is 1362-1383 the Jewel Box or a standard bath? | HIGH |
| Balcony | Which bedroom does it connect to? | LOW |

---

## PART 4 — CLOUDINARY TAG CORRECTIONS (PROPOSED — DO NOT APPLY YET)

| # | Public ID | Current Tags | Proposed Additional Tags | Reason | Confidence | Rachel Approval Required? |
|---|---|---|---|---|---|---|
| 1 | `gh_interiors/200holycrest_1182` | room_foyer | ADD: room_hallway_stairs, room_staircase | Appears to show mahogany volute staircase, not foyer floor plan | HIGH — staircase visible from foyer, likely wrong primary tag | Yes — visual confirm first |
| 2 | `gh_exteriors/holycrestextf_3327` | act_land, room_pool | Clarify: if twilight facade → ADD room_exterior_twilight, REMOVE room_pool | Tagged pool but used as twilight hero | UNCERTAIN | Yes — Rachel confirm |
| 3 | `gh_photos/200_hollycrest_drive_192` | act_land, room_gardens | ADD: room_canopy, room_grounds | Used for canopy aerial/grounds context — gardens is correct, canopy is more precise | MEDIUM | No — additive only |
| 4 | `gh_img/75a1922cd` | archival, blue_fox | ADD: room_grounds_details, hollycrest, grave_marker | If confirmed as Blue Fox stone marker | PENDING RACHEL CONFIRM | Yes |
| 5 | `gh_img/ee869bbb3` | archival, dumaine | ADD: hollycrest, betty_dumaine | If confirmed as Dumaine-related image | PENDING RACHEL CONFIRM | Yes |
| 6 | `gh_img/7b1b1f524` | archival, room_architectural_details | ADD: restoration_drawings, o_shea | If confirmed as O'Shea restoration drawing | PENDING RACHEL CONFIRM | Yes |
| 7 | `gh_img/Winglivingroom` | room_lower_level_office | REMOVE room_lower_level_office, ADD room_wing_living OR investigate | Name says "Wing living room" — inconsistent with lower-level office tag | SUSPICIOUS | Yes — investigate first |
| 8 | `gh_key/gh_threshold_stone` | (none) | ADD: room_threshold, garran_hill_1916, act_evidence, threshold_inscription | Physical proof of 1916 inscription — should be tagged as evidence | HIGH | No — additive |
| 9 | `gh_key/gh_whp_letter1` | (none) | ADD: whp, walter_hines_page, manuscript, archival, act_evidence | If confirmed as authentic WHP letter | PENDING RACHEL CONFIRM | Yes |
| 10 | `gh_key/gh_whp_wikimedia` | (none) | ADD: whp, walter_hines_page, portrait, act_evidence, public_domain | WHP portrait — public domain candidate | HIGH | Yes — license confirm first |

---

## PART 5 — PHOTOS RACHEL SHOULD CONFIRM

| Photo | Question | Priority |
|---|---|---|
| 200holycrest_1182 | Is this the staircase or foyer? | HIGH |
| holycrestextf_3327 | Twilight facade or pool area? | HIGH |
| gh_img/75a1922cd | Blue Fox stone marker? | HIGH |
| gh_img/ee869bbb3 | Betty Dumaine? Rights clear? | HIGH |
| gh_img/7b1b1f524 | O'Shea restoration drawing? | MEDIUM |
| gh_img/Winglivingroom | Wing living room or lower-level office? | MEDIUM |
| 200holycrest_1362–1383 | Which is the Jewel Box / mirror bath? | HIGH |
| holycrestextf_3345/3346/3349/3361 | Which Wee Cottage angle is strongest? | MEDIUM |
| gh_key/gh_whp_letter1 | Authentic WHP letter? What does it say? | HIGH |
| gh_key/gh_whp_wikimedia | License confirmed for commercial use? | HIGH |

---

## PART 6 — ROOM CARDS WITH CONFIRMED PHOTO CANDIDATES (READY TO ASSIGN)

These rooms have no photo on the site right now but Cloudinary has confirmed candidates:

| Room | Best Candidate | Tag | Note |
|---|---|---|---|
| Sunroom | 200holycrest_1617 or 200holycrest_1428 | room_sunroom | Rachel pick from 5 options |
| Primary Bath / Jewel Box | 200holycrest_1371 or 1374 (largest files, 6048×4024) | room_primary_bath | Rachel pick — prioritize largest/sharpest |
| Upper Hall / Staircase | Replace 1182 with room_hallway_stairs candidate | room_hallway_stairs | 10 options — 200holycrest_1338 (4024×6048) is tall format, likely strong |
| Pool & Terrace | holycrestextf_3334 or 3333 (room_pool tagged, 1700-1900KB) | room_pool | Better than using 192 for pool card |
| Wee Cottage | holycrestextf_3345 or 3361 | room_outbuildings | Rachel pick from 6 |
| Lower-Level Office | 200_hollycrest_drive_137 or 140 | room_lower_level_office | Avoid gh_img/Winglivingroom pending investigation |
| Laundry | 200holycrest_1497 (Pam Jensen, higher res) | room_laundry | Better than NestVisions |
| Gardens card | 200_hollycrest_drive_192 | room_gardens | Correct use for gardens card |

---

*Photo Truth Layer v1 — 2026-05-10*
*Cloudinary: READ-ONLY — no assets modified*
