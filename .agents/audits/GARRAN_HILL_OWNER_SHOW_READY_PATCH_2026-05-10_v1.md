# GARRAN HILL — OWNER-SHOW READY PATCH v1
**Date:** 2026-05-10
**Author:** Rocky
**Based on:** GARRAN_HILL_LIVE_RENDER_QA_2026-05-10_v1.md
**Commit:** (see below)
**File edited:** dist/index.html only
**Root index.html:** Untouched
**Cloudinary:** Untouched

---

## ISSUES FIXED

### 1. Inquiry Form — RESTORED
**Was:** `#inquiry` section had heading copy and closing text but zero form HTML. No `<form>`, no fields, no submit. CSS and JS both referenced `inquiry-form` that did not exist in the HTML. A buyer could not contact.

**Fixed:** Full form HTML restored inside `#inquiry` using existing site CSS classes:
- `.inquiry-form` wrapper
- `.inquiry-field` inputs (name, email, phone, textarea)
- `.btn-inquire` submit button labeled "Request Private Showing"
- Direct contact fallback line: "For private showings and offering details, please inquire directly with Rachel Hernandez." — linked via `mailto:rachelhernandezrealtor@gmail.com`
- HTML comments added: `<!-- GH_INQUIRY_FORM_RESTORED -->` and `<!-- GH_PUBLIC_CONTACT_ENDPOINT_NEEDED -->`
- Closing `<section class="closing">` correctly closed outside `#inquiry` (structural nesting bug also fixed)

**Contact endpoint note:** Form `action` currently set to `https://formspree.io/f/placeholder`. This is a visual placeholder — form will not submit server-side until Rachel provides a Formspree ID or equivalent. The `mailto:` fallback link is live and functional immediately. JS handler (`fetch(form.action)`) remains intact and will activate once a real endpoint is set.

**Email used:** `rachelhernandezrealtor@gmail.com` — Rachel's public listing contact, confirmed in `PROPERTY_VAULT.md` and multiple repo files. No private owner or steward emails used.

---

### 2. Duplicate "Garran Hill is ready" — FIXED
**Was:** Inquiry section h2 said "Garran Hill is ready." and the `<section class="closing">` immediately beneath it also said "Garran Hill is ready. / It is offered now for the first time." — same line back-to-back, looked like a paste error.

**Fixed:**
- Inquiry heading changed to: **"Begin the Private Conversation."**
- Closing section preserved as-is: "Garran Hill is ready. / It is offered now for the first time."
- "Garran Hill is ready" now appears exactly once on the page.

---

### 3. Primary Suite — "Fifteen architectural drawings" duplication — FIXED
**Was:** h2 said `"Fifteen architectural drawings survive."` and first body line immediately said `"Fifteen architectural drawings document every decision made in this room alone."` — true duplication.

**Fixed:**
- h2 changed to: **"Custom wall panels. A fireplace. *Drawn for private life.*"**
- Body now reads: "The private rooms were shaped during the restoration with full architectural documentation — fifteen drawings covering the suite, baths, storage, and circulation. Every decision recorded. All transfer with the property."
- Idea present once. Body expands rather than echoing.

---

### 4. Threshold — Staircase cross-section repeat — FIXED
**Was:** Threshold body copy included "The staircase has turned the same curve since 1916." — the same line used as the Staircase section h2. Cross-section duplication; staircase idea belongs to the Staircase section.

**Fixed:** Line removed from Threshold body. Replaced with:
**"The door has been open since 1916."**
This keeps the Threshold focused on: inscription, original hardware, authenticity, the house's first physical proof — without bleeding into the Staircase narrative.

---

### 5. rel="noopener" — ALL PATCHED
**Was:** 4 `target="_blank"` links, 2 missing `rel="noopener"` (both Matterport).

**Fixed:** All 4 `target="_blank"` links now carry `rel="noopener"`. Breakdown:
- `https://my.matterport.com/...` × 2 — patched
- `https://www.ncpedia.org/...` — already had it, confirmed
- `https://www.dncr.nc.gov` — already had it, confirmed

---

## LINES / SECTIONS CHANGED

| Section | Line approx | Change |
|---|---|---|
| `#threshold` body | ~825–828 | Removed staircase line, added "The door has been open since 1916." |
| `#primary-suite` h2 | ~1014 | "Fifteen architectural drawings survive." → "Drawn for private life." |
| `#primary-suite` body | ~1017 | Collapsed duplication, expanded to full sentence |
| `#inquiry` | ~1220–1229 | Full form HTML restored, heading changed, closing section de-nested |
| Matterport `<a>` × 2 | ~830, ~1155 | Added `rel="noopener"` |

---

## CONTACT ENDPOINT LIMITATION

The inquiry form `action` is set to `https://formspree.io/f/placeholder`. This must be replaced before the form can submit server-side. Options:

1. **Formspree** (simplest) — Rachel creates account at formspree.io, gets a form ID, replace `placeholder` with the real ID. Free tier handles ~50 submissions/month.
2. **EmailJS** — client-side email sending, no backend required.
3. **Netlify Forms** — if site moves to Netlify hosting.
4. **Custom endpoint** — Rocky can deploy a Base44 backend function to handle submissions.

Until then: the `mailto:` fallback link is fully functional. A buyer can click "Rachel Hernandez" to open a pre-addressed email.

---

## REMAINING OWNER-SHOW RISKS

| # | Risk | Severity |
|---|---|---|
| 1 | Form submits to placeholder endpoint — buyer cannot complete form submission server-side | 🟠 Functional gap — mailto fallback covers it |
| 2 | Restoration Record section uses stand-in exterior image, not actual drawings | 🟡 Visual gap — comment in HTML flags it |
| 3 | Blue Fox grave marker (`200_hollycrest_drive_192`) unconfirmed | 🟡 Caption held at safe level |
| 4 | Canonical points to garranhillforsalepinehurst.com — DNS not yet switched | 🟡 Pre-launch only |
| 5 | Dining body copy echoes h2 "formality of the first house" — minor | 🟢 Low risk |

---

*Rocky — Owner-Show Ready Patch v1. All 5 QA must-fix items resolved. dist/index.html only. Root index.html and Cloudinary untouched.*
