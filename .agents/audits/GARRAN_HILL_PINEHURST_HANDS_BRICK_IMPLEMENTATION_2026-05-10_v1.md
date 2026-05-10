# GARRAN HILL — PINEHURST HANDS + BRICK IMPLEMENTATION
# Audit: v1
# Date: 2026-05-10
# Commit: 89a5db9
# File changed: dist/index.html only
# Deployed: garren-hill.pages.dev → rachelhernandez.studio

---

## SERVED SITE vs REPO

- garren-hill.pages.dev: ✅ serving 89a5db9 (verified post-deploy)
- rachelhernandez.studio: propagates via Cloudflare — same build
- root index.html: ✅ untouched
- Cloudinary assets: ✅ untouched
- Hero video: ✅ untouched (done_czfe8o)

---

## EXACT LINES CHANGED

### CHANGE 1 — Architecture Section (id="architecture")

**Was:**
```
<h2>Full brick.<em>Formal proportion.</em></h2>
```
**Now:**
```
<h2>Pinehurst Hands.<em>Neo-Georgian discipline.</em></h2>
```

**Body — Was:**
```
<p>Flemish bond brick. White portico. Four columns. A circular lawn held before the entrance like a pause before a sentence.</p>
<p>Full brick. Formal proportion. Restored with the discipline of the original house.</p>
<p>The door has been open since 1916.</p>
```
**Body — Now:**
```
<p>Built in 1915–16 for Walter Hines Page, Garran Hill was planned from an architect's drawings and carried into being in Pinehurst. Ralph Page supervised the work, with experienced builders from Leonard Tufts' Pinehurst building world shaping the house in brick, proportion, and Neo-Georgian discipline.</p>
<p>Flemish bond. White portico. Four columns. A circular lawn held before the entrance like a pause before a sentence.</p>
<!-- GH_BOSTON_PLANS_SOURCE_CONFIRMATION_NEEDED -->
<!-- GH_HANDMADE_BRICK_SELLER_CONFIRMATION_NEEDED -->
```
**Short line added below (italic, quiet gold tone):**
```
Boston plans. Pinehurst hands. Garran Hill in brick, 1916.
```

**What was softened:**
- "Full brick. Formal proportion. Restored with the discipline of the original house." — replaced with sourced narrative
- Generic "formal proportion" headline → named "Pinehurst Hands" with sourcing
- "The door has been open since 1916" moved out of architecture body (it lives in threshold, cleaner)

---

### CHANGE 2 — Threshold Section (id="threshold")

**Was:**
```
<p>Original leaded glass. Original hardware. Herringbone brick underfoot.</p>
<p>The name inlaid in the threshold brick. Specified before ground was broken. Still there.</p>
<p>The door has been open since 1916.</p>
```
**Now:**
```
<p>Herringbone brick underfoot. Original leaded glass overhead. The name inlaid in the threshold.</p>
<p><em>"GARRAN HILL · 1916."</em> The threshold still says what the house has always known.</p>
```

**What was softened:**
- "Original hardware." — removed (hardware spec claim softened per ticket instructions)
- "Specified before ground was broken. Still there." — removed overly assertive phrasing
- Copy tightened to proof-tone, not claim-tone
- Image unchanged: `gh_photos/200_hollycrest_drive_9` ✅

---

### CHANGE 3 — Restoration Section (id="restoration-record")

**Added after drawings transfer line:**
```
<p style="color:rgba(245,240,232,0.62);font-size:var(--text-sm);">
PineStraw records Page's commission of a two-story Georgian brick house; later restoration 
notes record that matching the old brick during portico work took three months.
</p>
```

**Tone:** Muted gold — quiet source note, not main body. Does not interrupt restoration narrative flow.

**What was NOT added:**
- No academic footnote style
- No heavy attribution block
- No claim about the original brick being handmade or original source

---

### CHANGE 4 — Staircase Section

**Was:**
```
<p>Mahogany volute. Built by craftsmen who shaped Pinehurst's first generation of landmark buildings.</p>
<!-- GH_CRAFTSMEN_LANDMARK_RACHEL_CONFIRM_NEEDED: Carolina Hotel reference removed pending source confirmation -->
```
**Now:**
```
<p>Mahogany volute. Built by the hands that were building Pinehurst in 1916.</p>
<!-- GH_CRAFTSMEN_LANDMARK_RACHEL_CONFIRM_NEEDED: specific building names removed pending source confirmation -->
<!-- GH_CAROLINA_HOTEL_VIEW_NOTE: early accounts note the Carolina Hotel could once be seen from the front porch, before the present canopy returned. Available for use when Rachel confirms placement. -->
```

**What was softened:**
- "landmark buildings" — too strong without source → replaced with "building Pinehurst in 1916" (place + time, not building list)
- Carolina Hotel NOT named in public copy — preserved in comment for when Rachel confirms

---

## SAFETY CHECKS

| Check | Result |
|---|---|
| "handmade brick" in public HTML | ✅ NOT PRESENT — withheld pending seller confirmation |
| "handmade brick" comment flag present | ✅ GH_HANDMADE_BRICK_SELLER_CONFIRMATION_NEEDED |
| Carolina Hotel named as craftsman proof | ✅ NOT PRESENT |
| Carolina Hotel in public HTML | ✅ NOT PRESENT — comment-only |
| Carolina Hotel view note preserved in comment | ✅ GH_CAROLINA_HOTEL_VIEW_NOTE |
| Holly Inn / clubhouse / cottages named | ✅ NOT PRESENT |
| "same men" / "same craftsmen" language | ✅ NOT PRESENT |
| "landmark buildings" | ✅ REMOVED |
| National Register claim | ✅ NOT PRESENT |
| Tax credit / easement claim | ✅ NOT PRESENT |
| "he never spent a night" | ✅ NOT PRESENT |
| "he died ten days later" | ✅ NOT PRESENT |
| "offered now for the first time" | ✅ NOT PRESENT |
| root index.html touched | ✅ UNTOUCHED |
| Cloudinary assets modified | ✅ UNTOUCHED |
| Hero video changed | ✅ UNTOUCHED |
| Section order changed | ✅ UNCHANGED |
| New CSS added | ✅ NONE — inline style only for PineStraw note (muted tone) |

---

## BOSTON PLANS STATUS

- "Boston plans. Pinehurst hands. Garran Hill in brick, 1916." — **USED** in public copy as short tagline
- HTML comment `GH_BOSTON_PLANS_SOURCE_CONFIRMATION_NEEDED` placed in architecture body
- Source status: referenced in owner background material and PineStraw context
- **Rachel confirmation still needed** to fully remove comment flag and treat as confirmed

---

## REMAINING RACHEL-CONFIRMATION-NEEDED ITEMS

| Item | Comment Flag | Status |
|---|---|---|
| "Boston plans" — sourced or seller tradition? | `GH_BOSTON_PLANS_SOURCE_CONFIRMATION_NEEDED` | Used in tagline; flag present |
| Handmade brick — seller provenance? | `GH_HANDMADE_BRICK_SELLER_CONFIRMATION_NEEDED` | Not public; held in comment |
| Carolina Hotel view note — place in public copy? | `GH_CAROLINA_HOTEL_VIEW_NOTE` | Not public; held in comment |
| Specific Pinehurst building names (beyond general Tufts orbit) | `GH_CRAFTSMEN_LANDMARK_RACHEL_CONFIRM_NEEDED` | Not public |
| Dining shell cabinets — confirmed 1916 original? | `GH_DINING_SHELL_CABINETS_CONFIRM_NEEDED` | Elsewhere in site |
| Threshold inscription — carved stone, brick inlay, or cast plaque? | (open item) | Affects caption precision |
| Restoration drawings upload to Cloudinary | `GH_RESTORATION_DRAWINGS_IMAGE_PENDING` | Image slot still placeholder |

---

## FILES CHANGED

| File | Type | Action |
|---|---|---|
| `dist/index.html` | Site build | 4 targeted copy changes (+12 lines, -9 lines) |
| `.agents/audits/GARRAN_HILL_PINEHURST_HANDS_BRICK_IMPLEMENTATION_2026-05-10_v1.md` | Audit | Created |

**root index.html:** ✅ Not opened. Not touched.
**Cloudinary:** ✅ No asset URLs changed.
**CSS:** ✅ No new CSS rules. One inline style added (PineStraw note, muted tone).
**Images:** ✅ No image changes. Threshold image confirmed correct.

---

*Committed: 89a5db9*
*Deployed: garren-hill.pages.dev*
*Verified live: all 9 checks passed*
