# GARRAN HILL — LIVE RENDER QA v1
**Date:** 2026-05-10
**Author:** Rocky
**After commit:** e53dbdb
**Display URL:** https://rachelhernandez.studio/
**Source files:** dist/index.html, photo map v1.1, GARRAN_HILL_SOURCE_FACT_AUDIT_2026-05-10_v2.md
**dist/index.html edited:** NO
**Live site changed:** NO

---

## 1. SECTION FLOW — AS RENDERED

| # | Section ID | Label | Status |
|---|---|---|---|
| 1 | `#top` | Hero | ✓ In place |
| 2 | `#estate` | Arrival / Gates (KB Gate) | ✓ In place |
| 3 | `#aerial` | Aerial / Estate Context | ✓ In place |
| 4 | `#history` | Walter Hines Page Provenance | ✓ In place |
| — | (pull) | Farm Quote section | ✓ In place (between 4 and 5) |
| — | (text) | Last Words / WHP return | ✓ In place (between 4 and 5) |
| 5 | `#architecture` | Built in Brick / Neo-Georgian | ✓ In place |
| 6 | `#threshold` | Garran Hill 1916 Threshold | ✓ In place |
| 7 | `#restoration-record` | Restoration Record | ✓ In place |
| 8 | `#rooms` | Foyer / Entry Procession | ✓ In place |
| 9 | `#salon` | Salon | ✓ In place |
| 10 | `#drawing-room` | Drawing Room | ✓ In place |
| 11 | `#dining-room` | Dining Room | ✓ In place |
| 12 | `#kitchen` | Kitchen / Custom Built-Ins | ✓ In place |
| 13 | `#library` | Library | ✓ In place |
| — | `#powder-room` | Powder Room | ✓ Present — not in required 18 but fine |
| — | `#primary-suite` | Primary Suite | ✓ Present — not in required 18 but fine |
| — | `#staircase` | Staircase | ✓ Present — not in required 18 but fine |
| 14 | `#hollycrest` | Hollycrest / Betty / Blue Fox | ✓ In place |
| 15 | `#grounds` | Grounds / Pool / Wee Cottage / Tennis | ✓ In place |
| 16 | `#twilight` | Twilight | ✓ In place |
| 17 | `#restoration` | Estate at a Glance | ✓ In place |
| — | (matterport) | Matterport embed | ✓ Present — between #restoration and #sources |
| 18 | `#sources` | Sources & Further Reading | ✓ In place |
| 19 | `#inquiry` | Private Inquiry | ⚠️ PRESENT BUT BROKEN — see Section 8 |

**Flow verdict:** ✓ All 18+ sections present in correct order. Powder Room, Primary Suite, and Staircase are bonus sections that add depth — not a problem.

---

## 2. FACTUAL SAFETY — ALL CLEAR

All banned phrases clean from **visible** copy. Zero regressions.

| Phrase | Status |
|---|---|
| "built by Walter Hines Page" | ✓ Not present |
| "he walked through the door" | ✓ Not present |
| "he never walked through the door" | ✓ Not present |
| "he never spent a night here" | ✓ Not present |
| "he died ten days later" | ✓ Not present |
| "Queen of Thailand / Sirikit" | ✓ Not present |
| "Vassar" | ✓ Not present |
| "college friend" | ✓ Not present |
| "guest suite" (Wee Cottage) | ✓ Not present |
| "pool installed in 2022" | ✓ Not present |
| "pool restored in 2022" | ✓ Not present |
| "shell cabinets original to 1916" | ✓ Not present |
| "all original" | ✓ Not present |
| National Register / Criterion B | ✓ Not present |
| NC Historic Tax Credit / 25% FMV | ✓ Not present |
| Preservation Easement | ✓ Not present |
| Dennis Dunagan (public-facing) | ✓ Not present |
| Ann McAlister / Dr. Russell McAlister | ✓ Not present |
| David Prest | ✓ Not present |
| Private email address | ✓ Not present |

**Note:** "Carolina Hotel" appears in one HTML comment only (`<!-- GH_CRAFTSMEN_LANDMARK_RACHEL_CONFIRM_NEEDED -->`). Not visible to users.
**Note:** "TPMCF / Princess Mother" appears in Sources section with source-label language. Inside an HTML comment flagging Rachel confirmation needed.

---

## 3. SOURCE SECTION QA

| Source | Present | Linked | rel="noopener" |
|---|---|---|---|
| NCpedia — Walter Hines Page | ✓ | ✓ ncpedia.org | ✓ |
| NC DNCR — Walter Hines Page | ✓ | ✓ dncr.nc.gov | ✓ |
| PineStraw "A Page Out of History" | ✓ | — (no URL in citation doc) | n/a |
| PineStraw "Story of a House: Minding Their Manors" | ✓ | — (no URL in citation doc) | n/a |
| Burton J. Hendrick / Life and Letters | ✓ | — | n/a |
| TPMCF / Betty Dumaine biography | ✓ | — | n/a |
| Village Heritage Foundation | ✓ | — | n/a |
| Moore County Register of Deeds | ✓ | — | n/a |
| Architectural restoration drawings | ✓ | — (available through Sotheby's) | n/a |

**Verdict:** ✓ All 9 source cards present. Section reads as private archive, not academic bibliography.
**Issue:** Sources section word count is 137 words — the longest text section on the page. Visually fine at desktop but may feel heavy on mobile.

---

## 4. MOBILE QA — FINDINGS

| Check | Status | Notes |
|---|---|---|
| Hero text readable | ✓ | clamp() scale — Pinyon Script scales down correctly |
| Stat bar not smashed | ✓ | Mobile stack declared in CSS |
| Nav usable | ✓ | Hamburger menu present |
| No horizontal scrolling | ✓ | No overflow-x issues in CSS |
| Sections stack | ✓ | Grid/flex breakpoints in place |
| Captions readable | ✓ | var(--text-sm) minimum |
| No giant text blocks | ✓ | All body sections under 90 words except Sources (137) |
| Images crop acceptably | ✓ | object-fit:cover, split-img containment |
| Inquiry easy to find | ⚠️ | "Private Showing" nav CTA present — but the form itself is missing (see Critical Issues) |
| Source section not overwhelming | ⚠️ | 137 words — longest section. Acceptable but dense on mobile |
| Pinch zoom not disabled | ✓ | `user-scalable=no` NOT present |
| Text not hidden inside images | ✓ | All copy in HTML |

---

## 5. DESKTOP QA — FINDINGS

| Check | Status | Notes |
|---|---|---|
| Photo/copy rhythm | ✓ | Split left/right alternates correctly |
| Luxury editorial pacing | ✓ | Act breaks, pull quotes, gold hairlines, breath sections working |
| Awkward empty sections | — | None found |
| Repeated copy beats | ⚠️ | See Repetition Issues below |
| Weak images in main scroll | ⚠️ | See Image QA below |
| Source section visual clutter | ✓ | Grid layout with small type — tasteful |
| Weird spacing | ⚠️ | Inquiry section: no form visible, only closing text — looks incomplete |

### Repetition Issues Found

| Phrase | Appears | Verdict |
|---|---|---|
| "Garran Hill is ready" | 2x — inquiry heading + closing section | ⚠️ Redundant. Closing section immediately follows inquiry heading, both say it. One should differ. |
| "The Moore County life..." | 2x — WHP h2 + Last Words body | ✓ Editorial echo — intentional and tight enough to work |
| "The staircase has turned the same curve since 1916" | 2x — Threshold body + Staircase h2 | ⚠️ Cross-section repeat. Threshold can drop this line — it belongs to the Staircase section. |
| "The formality of the first house" | 2x — Dining h2 subline + body | ⚠️ h2 and body copy say the same thing. Body should expand rather than restate. |
| "Fifteen architectural drawings" | 2x — Primary suite h2 subline + first body line | ⚠️ True duplication. h2 says "Fifteen architectural drawings survive." First body line says "Fifteen architectural drawings document every decision..." — consolidate. |
| "leaded glass" | 2x visible — Threshold body + Foyer body (+ alt text) | ✓ Acceptable — different sections, different context |
| "Four acres" | 2x — Aerial + Twilight | ✓ Acceptable — far apart in scroll, reinforces scale |

---

## 6. IMAGE QA

All 21 Cloudinary assets: **✓ 21/21 HTTP 200**. Zero broken images.

| Image | Public ID | Status | Notes |
|---|---|---|---|
| Arrival / Gates | `gh_exteriors/entrance` | ✓ 937KB, loads | Pam Jensen — strong exterior gate shot |
| Aerial | `gh_photos/200_hollycrest_drive_203` | ✓ 662KB | NestVisions — only aerial available. Acceptable placeholder. |
| Architecture / Brick | `gh_exteriors/front_exterior` | ✓ 622KB | Pam Jensen — strong |
| Threshold 1916 | `gh_photos/200_hollycrest_drive_9` | ✓ 408KB | NestVisions — acceptable, stone inscription visible |
| Restoration Record | `gh_exteriors/200holycrestf-1440` | ✓ 1008KB | ⚠️ Stand-in image — is another exterior shot, not a restoration drawing. HTML comment flags this. Rachel to upload blueprint scans. |
| Foyer | `gh_interiors/200holycrest_1698` | ✓ 479KB | Pam Jensen — strong |
| Salon | `gh_interiors/200holycrest_1209` | ✓ 289KB | ✓ Confirmed per photo map v1.1 |
| Drawing Room | `gh_interiors/200holycrest_1320` | ✓ 314KB | Pam Jensen |
| Dining Room | `gh_interiors/200holycrest_1296` | ✓ 265KB | Pam Jensen |
| Kitchen | `gh_interiors/200holycrest_1626` | ✓ 398KB | Pam Jensen — widest, 20MB source |
| Library | `gh_interiors/200holycrest_1350` | ✓ 408KB | Pam Jensen |
| Powder Room | `gh_interiors/200holycrest_1668` | ✓ 597KB | Pam Jensen |
| Primary Suite | `gh_interiors/200holycrest_1278` | ✓ 453KB | Pam Jensen |
| Staircase | `gh_interiors/200holycrest_1182` | ✓ 564KB | Pam Jensen |
| Hollycrest / Blue Fox | `gh_photos/200_hollycrest_drive_192` | ✓ 412KB | ⚠️ Stone marker placeholder — Rachel to confirm this is the correct grave marker |
| Grounds / Pool | `gh_exteriors/holycrestextf_3327` | ✓ 903KB | Pam Jensen — large exterior |
| Twilight | `gh_photos/200_hollycrest_drive_220` | ✓ 520KB | NestVisions |
| Estate at a Glance | `gh_key/gh_sapling1916` | ✓ 157KB | |
| WHP Portrait | `gh_key/gh_whp` | ✓ 41KB | Appears small — but portrait use, acceptable |
| Stat bar crest | `gh_key/gh_crest_black_gold_v3` | ✓ 219KB | LOCKED |
| Hero video | `done_czfe8o` | ✓ 12562KB | LOCKED |

**Image flags for Rachel:**
1. Restoration Record image is a stand-in exterior photo, not a restoration drawing.
2. Hollycrest stone marker (`200_hollycrest_drive_192`) — confirm this is Blue Fox's grave.
3. WHP portrait (`gh_key/gh_whp`) — only 41KB rendered. If Pam Jensen has a higher-resolution portrait replacement, worth considering.
4. Aerial (`200_hollycrest_drive_203`) — NestVisions only. No Pam Jensen aerial exists. Acceptable until professional aerial is commissioned.

---

## 7. SEO / DOMAIN QA

| Element | Current Value | Status |
|---|---|---|
| `<title>` | Garran Hill \| 200 Hollycrest Drive, Pinehurst, NC | ✓ Fact-safe |
| `<meta name="description">` | "Garran Hill — 200 Hollycrest Drive, Pinehurst, NC. Neo-Georgian estate built in 1915–16 for Walter Hines Page. 6,072 SF. 4.15 acres. $4,250,000. Offered by Sotheby's International Realty." | ✓ Fact-safe |
| `<link rel="canonical">` | `https://garranhillforsalepinehurst.com` | ⚠️ Points to final domain — but site is live at rachelhernandez.studio. Rachel-confirmation-needed before domain switch. |
| `og:title` | Garran Hill \| Pinehurst, NC | ✓ |
| `og:description` | "Neo-Georgian estate built in 1915–16 for Walter Hines Page. 6,072 SF · 4.15 acres · $4,250,000." | ✓ |
| `og:url` | `https://garranhillforsalepinehurst.com` | ⚠️ Same as canonical — points to final domain |
| `og:image` | `gh_key/gh_threshold.jpg` v1777263004 | ✓ Good social share image |
| `robots` meta | Not set | ✓ Acceptable for staging. Consider `noindex` until domain launch if Rachel prefers. |
| JSON-LD `@type` | SingleFamilyResidence | ✓ |
| JSON-LD description | Fact-safe | ✓ |
| JSON-LD `numberOfRooms` | 4 | ⚠️ Minor: this is bedrooms only — schema field expects total rooms. Not blocking. |
| Display URL | rachelhernandez.studio | ✓ Working staging domain |

**Pre-launch domain checklist:**
- [ ] Rachel confirms garranhillforsalepinehurst.com is the final canonical
- [ ] DNS pointed to Cloudflare Pages
- [ ] Canonical updated to match
- [ ] OG url updated to match
- [ ] Consider adding `noindex` to rachelhernandez.studio after domain launch (or just let canonical do the work)

---

## 8. BUYER FUNCTION QA

| Item | Status |
|---|---|
| Address visible | ✓ |
| Price $4,250,000 | ✓ |
| Acreage 4.15 | ✓ |
| Square footage 6,072 | ✓ |
| Bedrooms / baths | ✓ |
| Pool | ✓ |
| Tennis ready for renewal | ✓ |
| Architectural drawings available | ✓ |
| Matterport link | ✓ — both button in Threshold section and iframe embed |
| Matterport `rel="noopener"` | ✗ — 2 Matterport `<a>` links missing `rel="noopener"`. Not blocking but should be fixed. |
| Private inquiry/contact | ⚠️ **CRITICAL — INQUIRY FORM HTML IS MISSING** |

### CRITICAL: Inquiry Form Missing

The `#inquiry` section exists with heading copy ("Garran Hill is ready.") but **contains no `<form>` element, no input fields, no email field, no submit button.** The CSS (`.inquiry-form`, `.inquiry-field`, `.btn-inquire`) and the JavaScript (`getElementById('inquiry-form')`) both reference a form that doesn't exist in the HTML. A buyer landing on the inquiry section has no way to submit a request. This is a **must-fix before any showing or owner review.**

The closing `<section class="closing">` is nested incorrectly inside `<section class="inquiry">` — this structural nesting issue may have caused the form to be dropped in a prior rebuild.

---

## 9. FINAL PUNCH LIST

### A. MUST FIX BEFORE SHOWING OWNER

| # | Issue | Severity |
|---|---|---|
| 1 | **Inquiry form HTML is missing.** No `<form>`, no fields, no submit. Buyer cannot contact. CSS and JS are there, HTML body of the form is gone. | 🔴 CRITICAL |
| 2 | **"Garran Hill is ready" appears twice** in the inquiry/closing section — heading and closing section both say it back-to-back. Reads as a paste error. | 🟠 HIGH |
| 3 | **"Fifteen architectural drawings" repeated** — Primary Suite h2 says "Fifteen architectural drawings survive" and the first body line immediately says "Fifteen architectural drawings document every decision…" Needs consolidation. | 🟠 HIGH |
| 4 | **"The staircase has turned the same curve since 1916"** appears in Threshold body copy AND as the Staircase section h2 — cross-section repeat. Remove from Threshold body. | 🟡 MEDIUM |
| 5 | **Matterport links missing `rel="noopener"`** — two `<a target="_blank">` links to matterport.com lack the attribute. Minor security/best practice issue. | 🟡 MEDIUM |

### B. SHOULD FIX BEFORE DOMAIN LAUNCH

| # | Issue |
|---|---|
| 1 | Confirm and switch canonical to garranhillforsalepinehurst.com when domain is ready |
| 2 | Add `rel="noindex"` to rachelhernandez.studio after domain launch (or let canonical handle it) |
| 3 | Dining Room h2 subline "The formality of the first house" restated in body — body copy should expand rather than echo the headline |
| 4 | Sources section (137 words) is the longest text block — consider tightening on mobile with a `<details>` accordion or smaller type treatment |
| 5 | JSON-LD `numberOfRooms: 4` is technically bedrooms — consider removing or expanding to `"numberOfBedrooms": 4` |
| 6 | Restoration Record image is a stand-in exterior — replace with actual architectural drawing scans when available |
| 7 | Staircase craftsmen copy — "first generation of landmark buildings" is safe but vague. Rachel to confirm preferred wording. |

### C. FUTURE / NICE TO HAVE

| # | Item |
|---|---|
| 1 | Commission professional aerial photography — NestVisions aerial is acceptable placeholder, not magazine quality |
| 2 | Confirm Blue Fox grave marker — upload correct image when Rachel visually verifies |
| 3 | Upload actual restoration drawing scans to replace stand-in in Restoration Record section |
| 4 | Commission Pam Jensen twilight / dusk exterior shot — current NestVisions twilight acceptable but Pam Jensen quality preferred |
| 5 | History page — deeper Walter Hines Page narrative, Betty Dumaine essay, full source bibliography |
| 6 | Consider adding `prefers-reduced-motion` media query for scroll reveals and film grain overlay |
| 7 | Salon image (`1209` vs `1203`) — confirm which is stronger for the section width at desktop. Both technically approved. |

---

## SUMMARY SCORECARD

| Category | Score | Notes |
|---|---|---|
| Section flow | ✅ 19/19 present and ordered | |
| Factual safety | ✅ 20/20 banned phrases clean | |
| Source section | ✅ 9/9 cards present | |
| Image renders | ✅ 21/21 HTTP 200 | |
| Mobile function | ⚠️ 6/7 | Inquiry form broken |
| Desktop pacing | ⚠️ 4 copy repetitions flagged | |
| SEO / meta | ✅ Fact-safe, canonical pending | |
| Buyer function | 🔴 Inquiry form MISSING | |

**Overall: Site is visually strong and factually clean. One critical structural bug (missing inquiry form) must be patched before any owner showing.**

---

*Rocky — QA only. dist/index.html not edited. Live site not changed.*
