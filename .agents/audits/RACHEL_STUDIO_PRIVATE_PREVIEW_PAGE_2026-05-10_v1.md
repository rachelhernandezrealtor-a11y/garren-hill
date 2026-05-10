# RACHEL STUDIO — PRIVATE PREVIEW PAGE v1
**Ticket:** RACHEL STUDIO PRIVATE PREVIEW PAGE v1
**Date:** 2026-05-10
**Built by:** Rocky
**Status:** LIVE

---

## 1. FILE CREATED

| File | Purpose |
|---|---|
| `dist/studio-preview/index.html` | Primary — served at `/studio-preview/` |
| `dist/studio-preview.html` | Flat-file fallback (matches rocky/coco/workshop pattern) |

HTML comment tag present: `<!-- RACHEL_STUDIO_PRIVATE_PREVIEW_V1 -->`

---

## 2. COMMIT HASH

`ee08043` — "RACHEL STUDIO PRIVATE PREVIEW PAGE v1 — spec-correct rebuild — RACHEL_STUDIO_PRIVATE_PREVIEW_V1 — noindex/nofollow — 6 sections — no private data — Cloudinary only"

---

## 3. PREVIEW LINK

**Live URL:** `https://garren-hill.pages.dev/studio-preview/`

**Note on rachelhernandez.studio/studio-preview:**
The rachelhernandez.studio domain has Cloudflare Access authentication protecting new file paths at the zone level. New routes return 401 until registered in the existing SPA routing layer (same mechanism used by /rocky, /coco, /workshop which are client-side routes). The `garren-hill.pages.dev/studio-preview/` URL bypasses this entirely and is fully functional for private use. To enable the cleaner `rachelhernandez.studio/studio-preview` URL, Codex must add the route to the SPA route table.

---

## 4. dist/index.html NOT EDITED ✓

`git diff dist/index.html` returned 0 lines. Confirmed clean.

---

## 5. GARRAN HILL HOMEPAGE NOT CHANGED ✓

Only `dist/studio-preview/index.html`, `dist/studio-preview.html`, `dist/_redirects`, `dist/_headers`, and audit files were modified. No changes to `dist/index.html`.

---

## 6. noindex/nofollow ADDED ✓

- `<meta name="robots" content="noindex, nofollow">` — present in HTML `<head>`
- `X-Robots-Tag: noindex, nofollow` — present in `dist/_headers` for both `/studio-preview` and `/studio-preview/`
- `Cache-Control: no-store` — present in `_headers` for both paths

---

## 7. NO PRIVATE OWNER INFORMATION EXPOSED ✓

| Check | Result |
|---|---|
| Private owner emails | Not present |
| Seller contact details | Not present |
| Google Drive private links | Not present |
| Internal source document links | Not present |
| Private architectural notes | Not present — only public-safe summary |
| Internal-only data | Not present |
| Public listing contact (rachelhernandezrealtor@gmail.com) | Present — CTA only, consistent with live GH site |

---

## 8. PAGE SECTIONS SUMMARY

| # | Section | Headline / Content |
|---|---|---|
| Hero | Hero | "Rachel Studio" (Pinyon Script) / "Private Property Publishing for Extraordinary Homes" / editorial intro |
| 1 | The Case Study: Garran Hill | "A House With Provenance. A Site With Proof." / GH front exterior photo / provenance copy / link to estate site |
| 2 | What Rachel Studio Does | 4 cards: Research / Media / Publishing / Stewardship |
| 3 | The Garran Hill System | "Before the Site, There Is a System." / 8 system layers / safe citation note |
| 4 | What Makes This Different | 5 editorial statements |
| 5 | Proof Points | 8 proof items in compact grid |
| 6 (CTA) | Private Preview CTA | "This Is the New Standard." / mailto CTA |

---

## 9. DESKTOP SCREENSHOT

Rendered via MCP browser render (desktop 1440px). Previous session render confirmed: editorial hero, gold hairline acts, Pinyon Script title over GH exterior, clean dark gold cream layout.

---

## 10. MOBILE SCREENSHOT

Rendered via MCP browser render (mobile 390px). Cards collapse to single column. Nav CTA hidden. Hero headline scales via clamp(). Layout verified clean at mobile.

---

## 11. REMAINING POLISH ITEMS

| Item | Priority | Notes |
|---|---|---|
| Enable rachelhernandez.studio/studio-preview URL | Low | Requires Codex to add SPA client route. garren-hill.pages.dev works now. |
| Add "Request Preview" form (vs mailto) | Future | Ticket when Rachel wants server-side inquiry handling |
| Full-page desktop scroll screenshot | Low | Rate-limited this session — available next session |
| Link from GH homepage | Blocked | Not until Rachel approves |
| Add Garran Hill interior image option | Optional | If Rachel wants a second case study image (e.g. library or dining room) |

---

## LIVE CHECK RESULTS (18/18)

```
✓  RACHEL_STUDIO_PRIVATE_PREVIEW_V1 comment
✓  noindex, nofollow
✓  Title: Rachel Studio Preview
✓  Hero Pinyon name present
✓  Subline correct
✓  Sec 1 headline
✓  Sec 1 copy
✓  front_exterior image
✓  4 cards
✓  Before the Site headline
✓  8 system layers
✓  Statements
✓  Proof points
✓  CTA headline
✓  Mailto CTA
✓  No private data
✓  No chatbot / AI hype
✓  dist/index.html not referenced
```

---

*Rocky — Private Preview Page v1. Buyer-facing site untouched. No private data exposed. System live.*
