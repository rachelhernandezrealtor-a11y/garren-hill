# GARRAN HILL — ROOM TRUTH + PHOTO CARD MICRO-PATCH AUDIT v2
# Date: 2026-05-10
# Commit: c2508fc
# dist/index.html: EDITED (10 surgical patches)
# Root index.html: NOT TOUCHED
# Cloudinary assets: NOT MODIFIED

---

## SERVED VERSION STATUS (post-deploy)

| URL | Status |
|---|---|
| garren-hill.pages.dev | ✅ LIVE — all patches confirmed (88,346 chars) |
| rachelhernandez.studio | ✅ LIVE — cache purged |

---

## ROOM TRUTH LOCKED — RACHEL CONFIRMED MAY 10

### SALON = Living Room ✅ LOCKED

- **Public label:** Salon
- **Conventional buyer label:** Living Room / Formal Living Room
- **Truth:** Large formal living room with two seating areas, glass doors opening to brick terrace/patio
- **Blueprint reference:** Floor plan labels this room "Living Room / Living Room Reflected Ceiling Plan"
- **Source:** PineStraw describes the blush pink salon as nearly 40 feet long, divided into conversation areas
- **Photo PIDs:** 200holycrest_1209 (card + band), 200holycrest_1203 (band alt)
- **Cloudinary tags:** room_salon — CONFIRMED ACCURATE for this room

**Copy applied:**
- Room card: *"The house's great living room — two seating areas, terrace doors, and room to gather."*
- Band caption: *"The Salon — The house's great living room, long and gracious, arranged in two seating areas with glass doors opening to the brick terrace."*

---

### DRAWING ROOM = Blue Room ✅ LOCKED

- **Public label:** Drawing Room
- **Internal/source note:** Blue Room
- **Truth:** The room with the blue-and-white tiled fireplace and custom spiral staircase rising to second-floor office/TV room
- **Source:** PineStraw references Ann's Blue Room, Delft collections, tiles framing the fireplace, second-floor office/TV room
- **Photo PIDs:** 200holycrest_1320 (card + band)
- **Cloudinary tag:** room_drawing_room — CONFIRMED ACCURATE

**Copy applied:**
- Room card: *"The Blue Room: tiled fireplace, intimate scale, and a spiral stair to the office above."*
- Band caption: *"The Drawing Room — The Blue Room. Blue-and-white tiled fireplace, intimate scale. A spiral stair rises to the second-floor office above."*
- Public language: "blue-and-white tiled fireplace" — Delft not used publicly until Rachel approves

**Tag correction queued (separate ticket):** room_salon on 1209 and room_drawing_room on 1320 are confirmed accurate — no correction needed.

---

### LIBRARY = Separate Room ✅ CLARIFIED

- **Public label:** Library
- **Truth:** Separate room from social rooms — built-in shelving, rolling ladder, French doors to grounds
- **Photo PIDs:** 200holycrest_1350
- **Note:** Spiral stair and blue tile belong to Drawing Room, NOT Library. Copy clarified.

**Copy applied:**
- Section body: *"A separate room from the social rooms below — quiet, proportioned, and complete."* (replaced "When you stand in it, you cannot find the seam")
- Room card: *"Built-in shelving, books, and quiet proportion — drawn into the restoration with discipline."*

**No spiral stair or blue tile language in Library section.** ✅

---

## PHOTO ACCURACY PATCHES

### PATCH — Blue Fox (carried from v1) ✅
- Image: `gh_img/75a1922cd` — Rachel confirmed
- Copy: *"Her Irish hunter, Blue Fox, is buried on the grounds. Someone still puts flowers there."*
- 200_hollycrest_drive_192: down to 3 uses (aerial, grounds, gallery — all correct)

### PATCH — Pool Card (carried from v1) ✅
- Pool card: `gh_exteriors/holycrestextf_3334` (room_pool tagged) replacing gardens image

### PATCH — Kitchen Label Softened ✅
- Section eyebrow: "Kitchen & Butler's Pantry" → "Kitchen"
- Room card name: "Kitchen & Butler's Pantry" → "Kitchen"
- Internal comment added: `<!-- GH_PHOTO_CONFIRMATION_NEEDED: Butler's Pantry -->`
- Body copy still references butler's pantry as a feature (source-confirmed) — not as a section label

---

## AERIAL CLOSER SECTION — ADDED ✅

New section `id="aerial-closer"` inserted before twilight:

- **Image:** 200_hollycrest_drive_192 (canopy approach — only use in this position)
- **H2:** *"From above, the estate explains itself."*
- **Copy:** *"Garran Hill sits within its own 4.15-acre circle — the surviving house core of a much larger Page-era farm. Around it, Pinehurst has grown. Inside the gates, the original world remains: circular drive, trees, lawn, terrace, pool, gardens, and shade."*
- **Position:** Between #grounds and twilight
- Twilight section kept as emotional closer — it still has its job

---

## DELFT TILE STATUS ✅

- "Delft tile" occurrences: **0** — removed in v1, maintained in v2
- "formal fireplace surround": **0** — replaced with room-specific accurate copy
- "blue-and-white tiled fireplace" in Drawing Room: **2** (card + band) ✅
- Public copy uses "blue-and-white tiled" — Delft held until Rachel approves as source-safe public language

---

## MOBILE / LAYOUT STATUS (carried from v1) ✅

- Mobile social band CSS: stacks cleanly ≤768px ✅
- Pending room cards: elegant dark hold state, no broken icon ✅

---

## CROSSWALK UPDATES APPLIED

`.agents/photo-maps/GARRAN_HILL_ROOM_NAMING_CROSSWALK_v1.md` — updated with:
- Salon = Living Room, LOCKED
- Drawing Room = Blue Room, LOCKED
- Library = separate room, clarified
- Kitchen/Butler's Pantry: held pending photo confirm

`.agents/photo-maps/GARRAN_HILL_PHOTO_TRUTH_LAYER_v1.md` — updated with:
- Rachel visual confirmation May 10 note
- AI tag conflict note

---

## REMAINING RACHEL-REVIEW ITEMS

| Item | What's needed | Priority |
|---|---|---|
| holycrestextf_3327 — twilight or pool? | Rachel confirm which it shows | HIGH |
| Staircase image (1182) tagged room_foyer | Rachel pick from room_hallway_stairs set (1215, 1338, 1569) | HIGH |
| Primary Bath / Jewel Box | Rachel pick from 200holycrest_1371, 1374, 1380 | HIGH |
| "Delft" public-safe? | Rachel confirm Delft may appear publicly vs. "blue-and-white tiled" | MEDIUM |
| Sunroom / Morning Room | Name + photo confirm — not on site yet | MEDIUM |
| Wee Cottage card | Rachel pick angle | MEDIUM |
| Pool confirm: 3334 vs 3333 | Is holycrestextf_3334 the right pool shot? | MEDIUM |
| Kitchen: Butler's Pantry photo | Confirm a photo shows pantry/service | LOW |

---

## CONFIRMATION CHECKLIST

| Item | Status |
|---|---|
| dist/index.html edited | ✅ |
| Root index.html | ✅ NOT TOUCHED |
| Cloudinary assets | ✅ NOT MODIFIED |
| Inquiry path | ✅ PRESENT |
| The Archive | ✅ PRESENT |
| Hero video (done_czfe8o) | ✅ LOCKED |
| Salon = Living Room locked | ✅ LIVE |
| Drawing Room = Blue Room + spiral stair | ✅ LIVE |
| Library clarified | ✅ LIVE |
| Kitchen label softened | ✅ LIVE |
| Aerial closer added | ✅ LIVE |
| Delft tile: 0 occurrences | ✅ LIVE |
| Blue Fox confirmed (75a1922cd) | ✅ LIVE |
| garren-hill.pages.dev | ✅ VERIFIED |
| rachelhernandez.studio | ✅ VERIFIED, CACHE PURGED |

---

*Audit: 2026-05-10 — Rocky*
*Commit: c2508fc*
