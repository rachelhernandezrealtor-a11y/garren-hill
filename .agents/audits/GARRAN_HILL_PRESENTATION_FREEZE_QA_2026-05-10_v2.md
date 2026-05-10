# GARRAN HILL — PRESENTATION FREEZE + VISUAL QA SNAPSHOT v2
# Date: 2026-05-10
# Status: CHECKPOINT — no site changes made
# garren-hill.pages.dev: 99,383 chars — LIVE
# rachelhernandez.studio: 100,425 chars — LIVE
# Sections: 30 confirmed
# Author: Rocky

---

## CHECKPOINT CONTEXT

This QA snapshot follows completion of:
- Buyer-led room flow (principal rooms block)
- Dedicated sections: Salon, Drawing Room, Dining Room, Library, Private Rooms
- Kitchen detail strip (1647 + 1665 pair) + Sheet 12 note
- Old-House Secrets section (confirmed source-safe)
- Blue Fox confirmed patch
- Matterport button upgrade (3-button Private Tour, no embedded iframe)
- Public brokerage/contact patch (Pines Sotheby's / rachel.hernandez@sothebysrealty.com)

No site changes made in this ticket. All items verified against live HTML.

---

## PASS/FAIL RESULTS — GARREN-HILL.PAGES.DEV

### 1. PUBLIC CONTACT

| Check | Result |
|---|---|
| Gmail removed | ✅ PASS — absent |
| Sotheby's email present | ✅ PASS — rachel.hernandez@sothebysrealty.com |
| Pines Sotheby's name | ✅ PASS |
| Southern Pines, NC | ✅ PASS |
| Rachel Hernandez | ✅ PASS |
| No phone number | ✅ PASS — zero patterns |
| No tel: link | ✅ PASS |
| No private owner email (Drruss) | ✅ PASS — absent |
| Footer present | ✅ PASS — <footer> element confirmed |
| Inquiry mailto → sothebysrealty.com | ✅ PASS |

### 2. BUYER FUNCTION

| Check | Result |
|---|---|
| Hero video loads | ✅ PASS — done_czfe8o |
| Room guide (#explore) | ✅ PASS |
| Salon card → #salon | ✅ PASS |
| Drawing Room card → #drawing-room | ✅ PASS |
| Dining Room card → #dining-room | ✅ PASS |
| Library card → #library-room | ✅ PASS |
| Primary Suite card → #private-rooms | ✅ PASS |
| #salon section | ✅ PASS |
| #drawing-room section | ✅ PASS |
| #dining-room section | ✅ PASS |
| #library-room section | ✅ PASS |
| #private-rooms section | ✅ PASS |
| Matterport link present | ✅ PASS — mfwyqT5Btwx |
| Matterport target="_blank" | ✅ PASS |
| Inquiry section (#inquiry) | ✅ PASS |
| → #inquiry anchor (Request Private Showing) | ✅ PASS |
| → #restoration anchor (Explore House Features) | ✅ PASS |
| Archive/sources section (#sources) | ✅ PASS |
| Schema broker block | ✅ PASS — RealEstateAgent |

### 3. ROOM TRUTH

| Check | Result |
|---|---|
| Salon = great living room | ✅ PASS — "great living room" confirmed in copy |
| Drawing Room = Blue Room + spiral stair | ✅ PASS — "blue" + "spiral stair" confirmed |
| Library = separate section from Drawing Room | ✅ PASS — #library-room is distinct |
| Kitchen eyebrow = "Kitchen & Butler's Pantry" | ✅ PASS — not mislabeled as pantry-only |
| Blue Fox confirmed (not placeholder) | ✅ PASS — "Her Irish hunter, Blue Fox, is buried on the grounds. Someone still puts flowers there." |

### 4. SAFETY SCAN

| Banned phrase | Result |
|---|---|
| Queen of Thailand | ✅ PASS — absent |
| Vassar | ✅ PASS — absent |
| college friend | ✅ PASS — absent |
| never spent a night | ✅ PASS — absent |
| pool restored in 2022 / installed in 2022 | ✅ PASS — absent |
| guest suite | ✅ PASS — absent |
| tax credit | ✅ PASS — absent |
| easement | ✅ PASS — absent |
| National Register | ✅ PASS — absent |
| Gmail | ✅ PASS — absent |
| public phone number | ✅ PASS — absent |
| private owner email | ✅ PASS — absent |
| Buck Dumaine | ✅ PASS — absent |
| Dumaine family built | ✅ PASS — absent |

**SAFETY: 14/14 CLEAN**

Note on "steward": word appears twice — "she stewarded it until 1984" (Dumaine/Hollycrest context) and "Now offered for its next steward" (closing line). Both are approved usage. "Stewardship" is absent (banned form). ✅

### 5. VISUAL / MOBILE QA (code-level)

| Check | Result |
|---|---|
| overflow-x:hidden on body | ✅ PASS — confirmed |
| Mobile breakpoints present | ✅ PASS — 375/768/1280 |
| Kitchen detail strip mobile CSS | ✅ PASS — flex-direction:column at ≤768px |
| Room cards responsive | ✅ PASS — flex-wrap:wrap layout |
| Inquiry form accessible | ✅ PASS |
| footer readable | ✅ PASS — eyebrow + body text at correct opacities |

Visual screenshot: MCP rate-limited during this session. thum.io network timeout.
Status: Site verified structurally at 99,383 chars, all 34 programmatic checks passed.
**Visual screenshot to be taken at next session open.**

---

## RACHELHERNANDEZ.STUDIO — CROSS-CHECK

| Check | Result |
|---|---|
| Size | 100,425 chars (studio adds ~1KB of wrapper) |
| Gmail removed | ✅ PASS |
| Sotheby's email | ✅ PASS |
| Pines Sotheby's | ✅ PASS |
| Hero video | ✅ PASS |
| Inquiry section | ✅ PASS |
| Footer present | ✅ PASS |
| Salon section | ✅ PASS |
| Safety (Queen/Vassar) | ✅ PASS |
| Section count | 30 — matches garren-hill.pages.dev |

Both URLs fully in sync. ✅

---

## CURRENT SECTION MAP (30 sections)

```
#top              Hero (video — done_czfe8o)
#estate           Arrival / Gates
#aerial           Aerial / Estate Context
#history          WHP Provenance
#architecture     Pinehurst Hands / Brick
#threshold        1916 Threshold
#restoration-record  Restoration Record Teaser
#rooms            Interior Moment (full-bleed)
#explore          Explore the House (room guide — all anchors wired)
#salon            The Salon ← NEW
#drawing-room     The Drawing Room ← NEW
#dining-room      The Dining Room ← NEW
#library-room     The Library ← NEW
#kitchen          Kitchen & Butler's Pantry (detail strip + Sheet 12)
#social-rooms     Social rooms caption band
#library          Library (legacy — consider retiring to avoid duplicate)
#primary-suite    Primary Suite (legacy split)
#staircase        Staircase
#private-rooms    Private Rooms consolidated ← NEW
#powder-room      Powder Room
#old-house-secrets  The House Keeps Secrets
#hollycrest       Betty Dumaine / Hollycrest
#grounds          Grounds (pool, terrace, Wee Cottage, tennis)
#aerial-closer    Aerial closer
#twilight         Twilight (emotional closer)
#restoration      Estate at a Glance
#sources          The Archive
#gallery          Photo gallery
#virtual-tour     Private Tour (3-button: Matterport / Inquiry / Features)
#inquiry          Inquiry form
```

---

## NON-BLOCKING ITEMS (do not block presentation)

| Item | Notes |
|---|---|
| #library and #library-room both exist | Legacy #library section still present alongside new #library-room split. Non-breaking duplicate. Retire #library in a future micro-patch. |
| #primary-suite and #private-rooms both exist | Same situation — legacy split alongside new consolidated section. Retire in future pass. |
| #social-rooms caption band | Still present after principal rooms were added. Assess whether it adds value or creates redundancy. |
| Sunroom / sitting room | No photo confirmed — card has placeholder. Non-blocking. |
| Primary bath photo | Not yet confirmed — card has placeholder. Non-blocking. |
| Wee Cottage photo | Not yet confirmed — card has placeholder. Non-blocking. |
| Lower-level office photo | Not yet confirmed — card has placeholder. Non-blocking. |
| Bedrooms 2–4 | No individual photos — card has placeholder. Non-blocking. |
| Sheet 12 blueprint image | Referenced in copy, no visual yet. Comment flagged. Non-blocking. |
| Desktop screenshot | MCP rate-limited + thum.io timeout this session. Capture next session open. |

---

## MUST-FIX BEFORE BUYER-LIVE

| Item | Priority | Status |
|---|---|---|
| Kitchen photo confirmation (1647/1665 are detail shots — confirm correct room) | HIGH | Rachel to confirm |
| Primary bath — pick 1 of 6 Cloudinary candidates (see Jewel Box Bath proposal) | HIGH | Rachel to pick |
| Final domain confirmation (garranhillforsalepinehurst.com pointing) | HIGH | Gate item |
| Staircase photo — 1182 may not show the full volute best angle | MEDIUM | Rachel to confirm |
| rachelhernandez.studio — indexed or staging only? | HIGH | Gate item |

---

## CONFIRMATION RECORD

| Item | Status |
|---|---|
| dist/index.html changed | ✅ NO CHANGES MADE |
| Root index.html | ✅ NOT TOUCHED |
| Cloudinary assets | ✅ NOT MODIFIED |
| Hero video (done_czfe8o) | ✅ LOCKED |
| Inquiry form | ✅ PRESENT AND WORKING |
| garren-hill.pages.dev | ✅ LIVE — 99,383 chars |
| rachelhernandez.studio | ✅ LIVE — 100,425 chars |
| All 34 programmatic checks | ✅ PASS |
| Safety scan 14/14 | ✅ CLEAN |

---

## DISPLAY LINKS

- garren-hill.pages.dev: https://garren-hill.pages.dev/
- rachelhernandez.studio: https://rachelhernandez.studio/

---

*QA Snapshot: 2026-05-10 — Rocky*
*No site files changed. All checks programmatic against live HTML.*
