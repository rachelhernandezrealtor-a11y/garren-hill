# GARRAN HILL — OWNER PRESENTATION POLISH v1
**Date:** 2026-05-10
**Commit:** 376b64b
**File edited:** dist/index.html only
**Root index.html:** Untouched
**Cloudinary:** Untouched
**Live URL:** https://rachelhernandez.studio/
**Verification:** 15/15 live checks passed

---

## FILES CHANGED

- `dist/index.html` — 36 insertions, 22 deletions

---

## 1. FORM BEHAVIOR AFTER PATCH

**Previous behavior:** Form submitted via `fetch()` to `https://formspree.io/f/placeholder` — a non-existent endpoint. Any buyer submission would silently fail or show "Error — please email directly."

**After patch:**
- `form.action` changed from `https://formspree.io/f/placeholder` to `#inquiry`
- JS `// 7. INQUIRY FORM` handler replaced entirely with a mailto builder:
  - On submit: captures name, email, phone, message from form fields
  - Assembles a `mailto:rachelhernandezrealtor@gmail.com` URL with:
    - Subject: `Garran Hill Private Showing Request`
    - Body: formatted with all four fields (phone omitted if blank)
  - Sets `window.location.href` to open the pre-addressed email
  - Button reads "Opening..." for 2 seconds then resets to "Request Private Showing"
- No private owner emails used — only `rachelhernandezrealtor@gmail.com` (public listing contact, confirmed in PROPERTY_VAULT.md)
- `GH_PUBLIC_CONTACT_ENDPOINT_NEEDED` comment preserved in HTML
- `GH_INQUIRY_FORM_RESTORED` comment preserved in HTML
- Fake Formspree URL is gone from the rendered/served HTML

**Public visitor experience:** Clicks "Request Private Showing" → their email client opens pre-filled → they send. Clean. No error states. No visible tech language.

---

## 2. SOURCE SECTION CHANGES

| Item | Before | After |
|---|---|---|
| Section heading | "Sources & Further Reading" | "The Archive" |
| Max width | `var(--max-text)` = 720px | 600px (tighter, mobile-friendly) |
| Grid gap | 1.1em | 0.85em |
| Font size | default body | `var(--text-xs)` — compact |
| External links | retained with `rel="noopener"` | retained, same |
| Source count | 9 + footer note | 9 + condensed footer note |
| TPMCF confirm comment | present | preserved |
| All 9 sources | present | present |

Sources retained in full:
1. NCpedia — Walter Hines Page biography (linked)
2. NC Dept. of Natural & Cultural Resources (linked)
3. PineStraw — "A Page Out of History"
4. PineStraw — "Story of a House: Minding Their Manors"
5. Burton J. Hendrick — Life and Letters of WHP, 1923
6. The Princess Mother's Charities Fund of Thailand — Betty Dumaine biography
7. Village Heritage Foundation — Hollycrest plaque
8. Moore County Register of Deeds
9. Architectural restoration drawings — 36-sheet plan set

---

## 3. BUYER-FUNCTION CHECKS

| Buyer Item | Present | Where |
|---|---|---|
| Address | ✅ | Estate at a Glance (gold type) |
| Price | ✅ | Estate at a Glance (gold type) + Closing lockup |
| Acreage | ✅ | Estate at a Glance |
| Square footage | ✅ | Estate at a Glance |
| Beds / baths | ✅ | Estate at a Glance |
| Pool | ✅ | Estate at a Glance |
| Tennis (ready for renewal) | ✅ | Estate at a Glance |
| Architectural plans available | ✅ | Estate at a Glance + Restoration Record |
| Matterport / tour link | ✅ | Estate at a Glance + Matterport section |
| Private inquiry path | ✅ | #inquiry — nav link, form, mailto fallback |

---

## 4. RESTORATION RECORD

- Image unchanged (exterior architectural detail, `200holycrestf-1440.jpg`)
- `<!-- GH_RESTORATION_DRAWINGS_IMAGE_PENDING -->` comment added immediately before the split-img div
- Visible copy already states: "The architectural drawings — all 36 sheets — transfer with the property." — accurate, no implied claim about current image being a blueprint scan.

---

## 5. REMAINING MUST-FIX BEFORE OWNER REVIEW

| # | Item | Severity |
|---|---|---|
| 1 | Form opens buyer's email client — depends on buyer having a default mail app configured (most do; mobile especially). Not a blocker. | 🟡 Minor UX dependency |
| 2 | Restoration Record image is exterior, not a drawing scan | 🟡 Visual — comment flags it |

**No blocking items for owner review.**

---

## 6. REMAINING MUST-FIX BEFORE BUYER-LIVE / DOMAIN LAUNCH

| # | Item |
|---|---|
| 1 | Wire real Formspree ID (or equivalent endpoint) to replace mailto-only form behavior |
| 2 | Switch canonical DNS to `garranhillforsalepinehurst.com` |
| 3 | Noindex `rachelhernandez.studio` after domain switch |
| 4 | Replace Restoration Record stand-in image with actual drawing scan (Rachel approves) |
| 5 | Rachel visually confirms Blue Fox grave marker (`200_hollycrest_drive_192`) |
| 6 | Rachel confirms dining room shell cabinet copy wording |
| 7 | Rachel confirms staircase craftsmen line |
| 8 | TPMCF / Betty Dumaine Thai connection — Rachel confirms public language |

---

*Rocky — Owner Presentation Polish v1. dist/index.html only. 15/15 live checks. Root index.html untouched. Cloudinary untouched.*
