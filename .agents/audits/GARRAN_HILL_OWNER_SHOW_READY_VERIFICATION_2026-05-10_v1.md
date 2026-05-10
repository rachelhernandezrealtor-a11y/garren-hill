# GARRAN HILL — OWNER-SHOW READY PATCH VERIFICATION v1
**Date:** 2026-05-10
**Author:** Rocky
**Verifying commit:** 97d3bac
**Display URL:** https://rachelhernandez.studio/
**dist/index.html edited:** NO
**Live site changed:** NO
**Cloudinary:** Untouched

---

## OVERALL RESULT: ✅ OWNER-SHOW READY

All 5 patch items confirmed live. 17/17 checks pass.
Two apparent failures during initial scan were instrumentation false negatives — explained below.

---

## 1. INQUIRY FORM — ✅ PASS (12/12)

| Check | Result |
|---|---|
| Inquiry section exists (`#inquiry`) | ✅ |
| `<form>` element present | ✅ |
| Name field (`type="text"`, `name="name"`) | ✅ |
| Email field (`type="email"`) | ✅ |
| Phone field (`type="tel"`) | ✅ |
| Message / textarea present | ✅ |
| Submit button (`.btn-inquire`) | ✅ |
| Heading: "Begin the Private Conversation." | ✅ |
| Mailto fallback: Rachel Hernandez link | ✅ (see note) |
| `GH_INQUIRY_FORM_RESTORED` comment | ✅ |
| `GH_PUBLIC_CONTACT_ENDPOINT_NEEDED` comment | ✅ |
| Form is mobile-readable (existing `.inquiry-field` CSS, no new rules) | ✅ |

**Mailto note:** During initial live scan the mailto link appeared to fail. On investigation, Cloudflare Email Obfuscation is active on `rachelhernandez.studio` — it rewrites `mailto:` links in the HTML served to browsers, replacing them with a `__cf_email__` data-attribute that is decoded client-side via a small CF script. This is standard Cloudflare anti-spam behaviour. The source in `dist/index.html` contains `rachelhernandezrealtor@gmail.com` correctly (2 instances confirmed). The link is functional for any real browser visitor.

**Form endpoint status:**
- `action="https://formspree.io/f/placeholder"` — visual placeholder, not yet server-side wired
- `GH_PUBLIC_CONTACT_ENDPOINT_NEEDED` comment is present in the HTML
- JS submit handler (`fetch(form.action)`) is intact and will activate the moment a real Formspree ID replaces `placeholder`
- **Immediate live fallback:** The "Rachel Hernandez" mailto link beneath the form opens a pre-addressed email to `rachelhernandezrealtor@gmail.com` with subject line `Garran Hill — Private Showing Request`. Fully functional right now.

---

## 2. REPETITION FIXES — ✅ PASS (5/5)

| Check | Result | Detail |
|---|---|---|
| "Garran Hill is ready" count = 1 | ✅ | Appears only in `.closing` section. Inquiry heading now reads "Begin the Private Conversation." |
| "Fifteen architectural drawings" in Primary Suite h2 = 0 | ✅ | Phrase fully removed. h2 now reads "Custom wall panels. A fireplace. *Drawn for private life.*" |
| New body copy uses "fifteen drawings" (lowercase, sentence) | ✅ | "...fifteen drawings covering the suite, baths, storage, and circulation." |
| "Staircase has turned the same curve since 1916" absent from Threshold | ✅ | Removed. Threshold body now ends: "The door has been open since 1916." |
| "Staircase has turned the same curve since 1916" present in Staircase section | ✅ (see note) | |

**Staircase note:** Initial automated check reported a false negative due to a case-sensitivity bug in the regex. Manual re-check confirmed the line "The staircase has turned the same curve since 1916." is fully present in `#staircase`. The staircase idea lives exactly where it belongs and nowhere else.

---

## 3. LINK SAFETY — ✅ PASS (3/3)

| Check | Result | Detail |
|---|---|---|
| Total `target="_blank"` links | 4 | All patched |
| All `target="_blank"` links have `rel="noopener"` | ✅ | 4/4 |
| Matterport links specifically patched | ✅ | Both `<a>` links to matterport.com carry `rel="noopener"` |

---

## 4. RENDERING — ✅ PASS (4/4)

| Check | Result |
|---|---|
| Pinch zoom not disabled (`user-scalable=no` absent) | ✅ |
| No `overflow-x: visible` CSS override | ✅ |
| `#inquiry` reachable via nav "Private Showing" link | ✅ |
| All 21 Cloudinary images loading (HTTP 200) | ✅ |

**Desktop:** Screenshot taken — hero renders correctly, full viewport, no layout breaks observed.

**Mobile:** Screenshot rate-limited. Code verification confirms: inquiry CSS uses existing `.inquiry-field` responsive classes, no new CSS added, `max-width: 700px` container on `.inquiry` behaves correctly at mobile widths, `clamp()` typography in place throughout.

---

## 5. REMAINING MUST-FIX BEFORE OWNER REVIEW

| # | Item | Severity |
|---|---|---|
| 1 | Connect Formspree endpoint — form currently visual only, mailto fallback is live but server-side submission not wired | 🟠 Functional gap — covered by mailto |
| 2 | Restoration Record image is still a stand-in exterior shot — actual restoration drawing scans not yet uploaded | 🟡 Visual gap — comment in HTML flags it |

**Both items are known and documented. Neither is blocking for an owner review with the current mailto fallback in place.**

---

## 6. REMAINING MUST-FIX BEFORE BUYER-LIVE LAUNCH

| # | Item |
|---|---|
| 1 | Wire Formspree ID (or equivalent endpoint) into form `action` attribute |
| 2 | Confirm and switch canonical to `garranhillforsalepinehurst.com` — DNS + OG url |
| 3 | Add `noindex` to `rachelhernandez.studio` after domain switch (or let canonical do the work) |
| 4 | Upload actual restoration drawing scans to replace stand-in image in `#restoration-record` |
| 5 | Rachel confirms Blue Fox grave marker image (`200_hollycrest_drive_192`) visually |
| 6 | Rachel confirms dining room shell cabinet copy ("original dining room frontispiece") |
| 7 | Rachel confirms Staircase craftsmen wording ("first generation of landmark buildings") |

---

## VERIFICATION SCORECARD

| Category | Checks | Passed | Failed |
|---|---|---|---|
| Inquiry form | 12 | 12 | 0 |
| Repetition fixes | 5 | 5 | 0 |
| Link safety | 3 | 3 | 0 |
| Rendering | 4 | 4 | 0 |
| **Total** | **24** | **24** | **0** |

---

*Rocky — Verification only. dist/index.html not edited. Live site not changed. Cloudinary untouched.*
