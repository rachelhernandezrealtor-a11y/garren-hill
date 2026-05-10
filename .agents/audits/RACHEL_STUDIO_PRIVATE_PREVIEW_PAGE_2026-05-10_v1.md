# RACHEL STUDIO — PRIVATE PREVIEW PAGE v1
**Date:** 2026-05-10
**Commit:** c153cfd (page + routing)
**Files created:**
  - `dist/studio-preview/index.html` (primary)
  - `dist/studio-preview.html` (flat-file fallback)
**Files edited:** `dist/_redirects`, `dist/_headers` (routing only)
**dist/index.html:** NOT EDITED ✓
**Garran Hill homepage:** NOT CHANGED ✓
**Cloudinary:** Untouched ✓
**noindex/nofollow:** Present in HTML meta ✓
**Private owner info exposed:** None ✓

---

## PREVIEW URL

**Working now:**
`https://garren-hill.pages.dev/studio-preview/`

**Note on rachelhernandez.studio/studio-preview:**
rachelhernandez.studio has Cloudflare Access authentication protecting new paths at the zone level. New flat-file routes return 401 until they are registered in the existing SPA routing layer (same mechanism used by /rocky, /coco, /workshop). The garren-hill.pages.dev URL bypasses this and serves the page directly. For a private Rachel-only preview, the pages.dev URL is appropriate. If rachelhernandez.studio/studio-preview is needed, the SPA route table must be updated by Codex.

---

## PAGE SECTIONS (7 acts)

| Act | Section | Content |
|---|---|---|
| Hero | Rachel Studio | Pinyon Script hero name, subline, editorial framing, Garran Hill exterior bg |
| 1 | The Case Study | Split: GH exterior photo + provenance copy, link to estate site |
| 2 | What Rachel Studio Does | 4 cards: Research / Media / Publishing / Stewardship |
| 3 | The Production System | Garran Hill layers listed (8 items), system description, photo/doc note |
| 4 | The Surface and the Structure | Pull quote — "before the site, there is a system" |
| 5 | The Standard | 5 editorial statements |
| 6 | Proof Points | 8 proof items in compact grid |
| CTA | Private Studio Preview | "This Is the New Standard" — mailto CTA |

---

## DESIGN SYSTEM APPLIED

- Font: Cormorant Garamond (300/400 + italic) + Pinyon Script (hero name)
- Colors: #0a0a0a / #C9A96E / #F5F0E8 — identical to GH site
- Gold cursor (7px dot, no ring — law compliant)
- Film grain overlay
- Gold scrollbar (3px)
- Scroll reveal on all sections
- Gold hairline act dividers with centred act labels
- Nav: Pinyon Script wordmark + "Request Preview" CTA
- Mobile breakpoints: 900px (case split collapses), 600px (cards stack, nav CTA hides)
- `meta name="robots" content="noindex, nofollow"` ✓
- `X-Robots-Tag: noindex, nofollow` in `_headers` ✓
- Pinch zoom NOT disabled ✓

---

## PRIVATE DATA AUDIT

| Item | Status |
|---|---|
| Private owner emails | Not present |
| Private seller contact details | Not present |
| Google Drive private links | Not present |
| Owner-provided private notes | Not present — only public-safe summary |
| Internal-only source documents | Not present |
| Garran Hill buyer site | Not changed |
| rachelhernandezrealtor@gmail.com | Present in CTA — public listing contact only |

---

## REMAINING NOTES

- If rachelhernandez.studio/studio-preview path is needed, Codex must register it in the SPA route table
- The garren-hill.pages.dev/studio-preview/ URL is fully functional for Rachel's private use
- Page is not linked from the GH homepage ✓
- Page is not indexed by search engines ✓

---

*Rocky — Studio Preview Page v1. No buyer-facing files changed. No private data exposed.*
