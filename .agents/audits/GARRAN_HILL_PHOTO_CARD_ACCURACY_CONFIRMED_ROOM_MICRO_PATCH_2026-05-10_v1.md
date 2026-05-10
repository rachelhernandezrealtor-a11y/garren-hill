# GARRAN HILL — PHOTO CARD ACCURACY + CONFIRMED ROOM MICRO-PATCH AUDIT v1
# Date: 2026-05-10
# Commit: fb662fe
# dist/index.html: EDITED (6 surgical patches)
# Root index.html: NOT TOUCHED
# Cloudinary assets: NOT MODIFIED

---

## SERVED VERSION STATUS (post-deploy)

| URL | Status |
|---|---|
| garren-hill.pages.dev | ✅ LIVE — all 6 patches confirmed |
| rachelhernandez.studio | ✅ LIVE — cache purged, patches confirmed |

---

## PATCH 1 — BLUE FOX CONFIRMED ✅

**Image used:** `gh_img/75a1922cd`
- Version: v1777247310
- Dimensions: 1024×686
- Tags: act_evidence, room_grounds_details, archival, blue_fox
- Rachel confirmed 2026-05-10

**Previous state:** `gh_photos/200_hollycrest_drive_192` (canopy/gardens image) with `<!-- GH_BLUE_FOX_IMAGE_PENDING -->` comment

**New state:** Confirmed grave marker image with comment `<!-- GH_BLUE_FOX_CONFIRMED: Rachel confirmed 2026-05-10. Inscription: MY IRISH HUNTER / BLUE FOX / 1946–1965 -->`

**Copy applied:**
> "Betty Dumaine's Hollycrest years carried horses, hounds, peacocks, native hollies, and old Pinehurst lore to the estate. Her Irish hunter, Blue Fox, is buried on the grounds. Someone still puts flowers there."

**"Somewhere" removed:** ✅ — "buried somewhere on these grounds" → "buried on the grounds"
**Pending placeholder removed:** ✅
**Blue Fox is no longer unconfirmed on the site.**

---

## PATCH 2 — DUPLICATE IMAGE REDUCTION ✅

`200_hollycrest_drive_192` before: 5 occurrences
`200_hollycrest_drive_192` after:  3 occurrences

**Removed from:** Hollycrest section split (replaced with Blue Fox confirmed image)

**Remaining uses (all correct):**
1. `#aerial` — canopy/approach aerial ✅ correct use (room_gardens tag appropriate)
2. `#grounds` — estate grounds split ✅ correct use
3. Gallery JSON array — ✅ fine in gallery

**Alt text corrected:** `#grounds` section alt text changed from "Garran Hill pool — 20×40 concrete, brick wall, iron gates" to "Garran Hill grounds — four acres, mature canopy, estate approach, Pinehurst NC" — the image shows the grounds/canopy, not the pool.

---

## PATCH 3 — POOL / TWILIGHT CORRECTION ✅

**drive_220 status:** NOT FOUND in Cloudinary — does not exist.

**Decision made:** `holycrestextf_3327` (tagged room_pool) kept in twilight section — it is the only confirmed dusk-adjacent exterior we have. Swapping to an unconfirmed image would be worse than keeping it.

**Alt text softened:** Changed from "Garran Hill at twilight — lit windows at dusk" to "Garran Hill exterior at dusk — four acres, estate grounds, Pinehurst NC" — accurate either way pending Rachel confirmation.

**Pool room card corrected:** Pool card image swapped from `200_hollycrest_drive_192` (room_gardens) → `gh_exteriors/holycrestextf_3334` (room_pool tagged, v1777244483, 3000×1927)

**Rachel to confirm:** Is `holycrestextf_3327` the twilight facade or the pool area? This determines whether the twilight section needs a future swap or the tag needs correction.

---

## PATCH 4 — DELFT TILE SOFTENED ✅

**"Delft tile" occurrences before:** 4 (in 2 room cards + 2 caption band items)
**"Delft tile" occurrences after:** 0

**Replaced with:** "formal fireplace surround"

Locations changed:
- Salon room card: "Georgian carved mantel, Delft tile, arched fanlights" → "Georgian carved mantel, formal fireplace surround, arched fanlights"
- Drawing Room room card: "Enlarged during restoration. Georgian mantel. Delft tile returned." → "Enlarged during restoration. Georgian mantel. Formal fireplace surround."
- Caption band Salon: "Delft tile surround" → "Formal fireplace surround"
- Caption band Drawing Room: "Delft tile came back with it" → "Formal fireplace surround restored with it"
- Alt texts updated to match

**Status:** Held pending Matterport confirm — which room has the Delft surround? Rachel to walk the scan.

---

## PATCH 5 — PENDING ROOM CARD ELEGANT STATE ✅

CSS injected for `.room-card--text` cards (Sunroom, Primary Bath, Primary Closet, Bedrooms, Lower Office, Laundry):

```css
.room-card--text .room-card-img {
  background: rgba(10,10,10,0.6);
  border: 1px solid rgba(201,169,110,0.18);
  display: flex; align-items: center; justify-content: center;
  min-height: 180px;
}
.room-card-placeholder { display: none; }
.room-card--text .room-card-img::after {
  content: ''; display: block;
  width: 24px; height: 1px;
  background: rgba(201,169,110,0.35);
  margin: 0 auto;
}
```

**Result:** Pending cards show a dark gold-bordered panel with a subtle gold hairline. No broken image icon. No visible "pending" language to buyers. Internal comments preserved: `<!-- GH_PHOTO_CONFIRMATION_NEEDED: [room] -->`

---

## PATCH 6 — MOBILE SOCIAL BAND ✅

CSS injected for `@media (max-width: 768px)`:

```css
.caption-band .caption-row { flex-direction: column; gap: var(--sp-lg); }
.caption-band .caption-item { width: 100%; }
.caption-band .caption-img { max-height: 280px; }
```

**Result:** On mobile, the three social room images (Salon, Dining Room, Drawing Room) stack vertically, full-width, with captions beneath each. No horizontal scroll. No cramped layout.

---

## REMAINING RACHEL-REVIEW ITEMS

| Item | What's needed | Priority |
|---|---|---|
| holycrestextf_3327 — twilight or pool? | Rachel visual confirm — walk Matterport to front exterior dusk view | HIGH |
| Salon vs. Drawing Room — Delft tile | Matterport confirm which room has the Delft surround | HIGH |
| Staircase image (1182) | Rachel confirm — staircase or foyer? Pick replacement from room_hallway_stairs set | HIGH |
| Primary Bath / Jewel Box | Rachel pick from 200holycrest_1371, 1374, 1380 | HIGH |
| Staircase card replacement | Rachel pick from 1215, 1338, 1569 | MEDIUM |
| Sunroom / Morning Room | Matterport confirm — kitchen flow or separate wing? What to call it? | MEDIUM |
| Wee Cottage card | Rachel pick angle from holycrestextf_3361, 3345, 3346 | MEDIUM |
| Primary Closet card | Rachel pick from 1410, 1413, 1419, 1422 | LOW |
| Bedrooms card | Rachel pick from room_bedroom_2 set | LOW |
| Lower Office card | Rachel pick from 1581, 1599, 1602, 1605, 1608 | LOW |

---

## CONFIRMATION CHECKLIST

| Item | Status |
|---|---|
| dist/index.html edited | ✅ |
| Root index.html | ✅ NOT TOUCHED |
| Cloudinary assets | ✅ NOT MODIFIED |
| Inquiry path | ✅ PRESENT AND WORKING |
| The Archive | ✅ PRESENT |
| Hero video (done_czfe8o) | ✅ LOCKED, UNTOUCHED |
| Unsafe phrases | ✅ ALL CLEAN |
| Blue Fox confirmed | ✅ LIVE |
| Delft tile removed | ✅ LIVE |
| Pool card corrected | ✅ LIVE |
| Mobile band fix | ✅ LIVE |
| Pending card CSS | ✅ LIVE |
| garren-hill.pages.dev | ✅ VERIFIED LIVE |
| rachelhernandez.studio | ✅ VERIFIED LIVE, CACHE PURGED |

---

*Audit: 2026-05-10 — Rocky*
*Commit: fb662fe*
