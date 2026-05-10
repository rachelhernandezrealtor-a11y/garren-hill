# GARRAN HILL — GALLERY + LAYOUT STACKING RHYTHM AUDIT v1
# Date: 2026-05-10
# Based on: dist/index.html analysis + section structure review
# dist/index.html: NOT EDITED
# Live site: NOT CHANGED

---

## REUSABLE LAYOUT PATTERNS (reference)

| Pattern | When to use |
|---|---|
| full-bleed act | Cinematic moment. Hero image fills viewport. One headline. No furniture. |
| alternating split | Image left / copy right, then flip. Standard room section. |
| vertical pair | Two tall portrait images side-by-side. Doors, staircase, powder room. |
| feature inset | Large image left, small inset detail right. Kitchen island + window detail. |
| room card grid | 3–4 cards, equal size. Keep to 1 grid per act, max 8 cards before break. |
| caption-led image row | 2–3 landscape images in a row with captions below. For grounds/pool/exterior sequence. |
| whisper / breath section | No image. Just copy. Creates pause between loud sections. Gold hairline. |

---

## SECTION-BY-SECTION AUDIT

### HERO (✅ Locked)
- Full-bleed video. Stat bar at bottom. No issues.
- **DO NOT TOUCH.**

---

### ACT I — ARRIVAL / KB GATE
- `#estate` — full-bleed canopy (200_hollycrest_drive_192) → currently tagged room_gardens, used as aerial canopy. Fine for this use.
- `#aerial` — ✅ Working

**Issue:** 200_hollycrest_drive_192 is also used for Hollycrest split, Grounds split, AND Pool card. Same image appearing 4 times across the site is diluting its impact.
**Fix:** Replace pool card use with actual pool image. Move 192 to Gardens card only.

---

### ACT II — HISTORY (✅ Clean)
- WHP portrait + bio. Cinematic. No layout issues.

---

### ACT III — ARCHITECTURE + THRESHOLD (✅ Clean)
- Front exterior full-bleed → threshold split.
- Good rhythm. No fixes needed.

---

### ACT IV — RESTORATION RECORD (✅ Clean)
- Exterior elevation split + copy. Good.

---

### ACT V — FOYER FULL-BLEED (✅ Clean)
- 200holycrest_1698. Strong arrival moment.

---

### EXPLORE THE HOUSE — ROOM CARD INDEX (#explore)

**Current state:** Room cards rendering as a grid in 4 groups. Main Level group shows 7 cards.

**Issue 1 — Too many cards in one grid, no rhythm break**
7 Main Level cards stacked in one block feels like an MLS grid. No pause between major rooms.

**Recommendation:**
Split Main Level into two sub-groups with a breath between:
- Group A: Foyer, Salon, Drawing Room, Dining Room (entertaining suite)
- Breath (gold hairline + "Private rooms above")
- Group B: Kitchen & Butler's Pantry, Library, Powder Room (service/private main)

**Issue 2 — Staircase card in room grid**
The staircase is an architectural circulation element, not a room. Placing it as a peer card to Salon/Library makes the grid feel padded.

**Recommendation:** Move staircase out of the room card grid. Let it live as the full-bleed section it already is below the grid. Remove staircase card from the main index.

**Issue 3 — "Photo pending" cards not elegantly hidden**
Some room cards likely show empty/broken image states. Pending cards should show:
```css
.card-pending { background: rgba(201,169,110,0.06); border:1px solid rgba(201,169,110,0.18); }
.card-pending::before { content:''; } /* no broken image icon */
```
With a subtle cream label: "Photography forthcoming" in --text-xs.

---

### KITCHEN FEATURE SECTION (#kitchen)

**Current state:** Single split — 200holycrest_1626 left, copy right.

**Issue:** Kitchen copy references "two farm sinks, island, heart-pine floors, wall of windows" but only one image. The butler's pantry is in the card label but has no visual confirmation.

**Recommendation:**
If a butler's pantry photo is confirmed → add as a vertical inset detail below the main kitchen image, or as a second split immediately following.
If not confirmed → keep one clean image. Do not add placeholder.

**Issue 2:** The section heading "Not original to 1916. Original to the restoration." is correct and source-safe. Keep.

---

### SOCIAL ROOMS BAND (#social-rooms)

**Current state:** A horizontal caption band with 2–3 images side by side (1209 Salon, 1296 Dining, 1320 Drawing Room).

**Issue 1 — Delft tile assigned to both Salon and Drawing Room**
Both cards say "Delft tile" in their captions. This is almost certainly wrong — there is likely one Delft surround, in one room. Until Matterport confirms which room, the caption band must not double-assign this detail.

**Safe interim fix:** Remove "Delft tile" from whichever card is less certain. Keep it only in the room where the photo most clearly shows a fireplace.

**Issue 2 — Band images are landscape, cramped at mobile**
Three landscape images in a horizontal row collapse badly on mobile. At 375px they likely stack with no breathing room.

**Recommendation:**
Mobile: stack to single column, each image full-width with caption below.
```css
@media (max-width:768px) {
  .social-band { flex-direction: column; }
  .social-band .band-item { width: 100%; margin-bottom: var(--sp-lg); }
}
```
**Safe to patch now — layout only, no copy changes.**

---

### LIBRARY SECTION (#library)

**Current state:** Single split — 1350 left, "Three walls of shelving. Floor to ceiling. Rolling ladder." right.

**Issue:** Library is one of the most distinctive rooms in the house (rolling ladder, French doors) but gets only one image and the same split format as every other room. It deserves a full-bleed moment or at minimum a vertical pair.

**Recommendation:** When a second library image is confirmed, upgrade to vertical pair: tall shot of ladder + wide shot of French doors to grounds. For now, keep the single split — do not change.

---

### PRIMARY SUITE SECTION (#primary-suite)

**Current state:** Single split — 1278, "Custom wall panels. A fireplace. Drawn for private life."

**Issue:** "Custom wall panels. A fireplace." is correct per PineStraw. Copy is good. Single image is appropriate here.

**Recommendation:** When primary bath / Jewel Box is confirmed, add a second section or inset immediately below the primary suite split. Do not bundle bath into the bedroom section.

---

### STAIRCASE SECTION (#staircase)

**Current state:** 1182 (tagged room_foyer ⚠️) used as staircase full-bleed or split.

**Issue:** This is a suspected mislabeled image. The copy ("The staircase has turned the same curve since 1916.") is source-safe and locked. The image needs replacing with a confirmed room_hallway_stairs asset.

**Not safe to fix without Rachel confirming which room_hallway_stairs image to use.**

---

### POWDER ROOM (#powder-room)

**Current state:** Single split — 1668, fuchsia chinoiserie.

✅ Perfect. No changes needed.

---

### OLD-HOUSE SECRETS (#old-house-secrets)

**Current state:** Text-only or minimal image section.

**Issue:** The secrets (disappearing screen, coat closet, refrigerator in bookcase) are described without any photographic evidence. This is intentional — they are sourced from PineStraw. Copy is fine.

**Recommendation:** Do not add images here without Matterport confirmation of which photos actually show these features. The text mystery is more powerful than an unverified image.

---

### HOLLYCREST (#hollycrest)

**Current state:** Split with 200_hollycrest_drive_192 (canopy/gardens image used 4th time).

**Issue:** Blue Fox is confirmed (75a1922cd). The site likely has a placeholder or no Blue Fox image yet. The confirmed image should replace any placeholder here.

**Safe fix:** If the Hollycrest section does not yet show 75a1922cd, this is ready to deploy.

---

### GROUNDS (#grounds)

**Issue:** 200_hollycrest_drive_192 appearing again. Should only appear in the Gardens card. The grounds section needs a dedicated grounds image, not the same canopy shot.

**Candidates:** room_pool Pam Jensen shots for pool area, outbuildings shots for Wee Cottage.

---

### GALLERY (#gallery)

**Current state:** 38-image gallery grid below the main content.

**Issue:** Gallery grid appears below all narrative content. 38 images in a uniform grid with no hierarchy feels like a photo dump after the editorial build.

**Recommendation:** No change yet. Gallery serves its purpose as "see everything." Consider breaking into tagged sub-galleries by room in a future ticket — but not until room truth layer is confirmed.

---

### INQUIRY SECTION (#inquiry)

✅ Present and working. DO NOT TOUCH.

---

## SAFE MICRO PATCHES (if Phase 1 clean — it is)

| Patch | Safe now? | Notes |
|---|---|---|
| Mobile social band stack | ✅ Yes | CSS only, no copy changes |
| Pending card "photography forthcoming" state | ✅ Yes | CSS only |
| Swap pool card to actual room_pool image | ✅ Yes | Rachel confirm which pool image first |
| Move 200_hollycrest_drive_192 to gardens-only | ✅ Yes | Reassign, no copy change |
| Add Blue Fox image (75a1922cd) to hollycrest section | ✅ Yes | Rachel confirmed |
| Remove Delft tile duplicate from one room card | ⚠️ Hold | Needs Matterport confirm which room first |
| Replace staircase image 1182 | ⚠️ Hold | Rachel confirm replacement pick |
| Rename Salon/Drawing Room | ⚠️ Hold | Matterport required |
| Add new room sections (bath, closet, sunroom) | ⚠️ Hold | Rachel picks needed |

---

*Audit: 2026-05-10 — Rocky*
*dist/index.html: NOT EDITED*
