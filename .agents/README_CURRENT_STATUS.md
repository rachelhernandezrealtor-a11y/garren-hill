# GARRAN HILL — CURRENT STATUS BOARD
**Last updated:** 2026-05-10 (Global Style Alignment v1) by Rocky

> Quick reference for any agent entering this project. Read this first.

---

## ⚡ GLOBAL STANDARDS — READ BEFORE ANY DESIGN PASS

1. **Source truth must be checked before style work.** Run the unsafe phrase scan against `dist/index.html` before touching anything.
2. **Verify served site matches dist/index.html** — fetch live URL, compare. If MD5 differs (beyond Cloudflare email obfuscation), diagnose route/cache mismatch before proceeding.
3. **Global style/truth standard now exists:** `.agents/rules/RACHEL_STUDIO_GLOBAL_STYLE_AND_TRUTH_STANDARD_v1.md`
4. This standard applies to Garran Hill and all future Rachel Studio properties.
5. **Typography baseline:** EB Garamond at weight 400 for body copy. Cormorant Garamond for headings. Pinyon Script for estate name only.
6. **Section breathing room:** Desktop sections spacious, not jammed. Mobile sections edited, not compressed.
7. **Mobile cursor:** Always scoped to `(hover: hover) and (pointer: fine)` — never apply `cursor: none` globally.

---

## DISPLAY SITE
**URL:** https://rachelhernandez.studio/
**Status:** Live — current build serving Global Style Alignment v1
**Active file:** `dist/index.html` — edit here only
**Do not touch:** `root index.html`
**Not public launch yet** — final domain pending Rachel confirmation

---

## PIPELINE
- GitHub repo: `rachelhernandezrealtor-a11y/garren-hill`
- Dev URL: `garren-hill.pages.dev`
- Cloudflare serves `dist/index.html` — NOT root
- Rocky commits → Cloudflare picks up → purge if needed

---

## HERO
- **LOCKED VIDEO:** `done_czfe8o` — Rachel named it "done." Never swap.
- Earlier rule re: `Last_for_real_q0fqvw` is superseded — `done_czfe8o` is canonical.

---

## PHOTOS
- Cloudinary: `dghn2xpif`
- `gh_interiors` + `gh_exteriors` = Pam Jensen masters ← prefer these
- `gh_photos` = NestVisions ← use when story-critical or only source
- `gh_key` = LOCKED — never touch
- **GH_CLOUDINARY_PHOTO_GUIDE.md** is the ONLY photo source of truth

---

## OPEN ITEMS (Rachel must decide)
1. Final domain / canonical URL (garranhillforsalepinehurst.com vs rachelhernandez.studio)
2. rachelhernandez.studio — indexed or staging only?
3. Blue Fox image — grave or related marker?
4. Tennis courts — main scroll or gallery only?
5. Wee Cottage — correct building confirmed?
6. Dining shell cabinets — confirmed 1916 original?
7. Restoration drawings — upload to Cloudinary?
8. Contact sheet — which images approved?
9. "Boston plans" — source-confirmed or verbal tradition?
10. Threshold inscription — carved stone, brick inlay, or cast plaque?

---

## NEXT BUILD ORDER
1. ✅ Global Style + Truth Standard created
2. ✅ Global Style Alignment patch deployed
3. Rachel approves contact sheet
4. Photo implementation — approved only
5. Pinehurst Hands / Brick Thread — Rachel confirms Boston plans + Tufts craftsmen sourcing
6. Mobile QA sign-off
7. SEO / backlink section
8. Domain / launch gate

---

## CRITICAL LAWS (never break)
- Never edit `root index.html`
- Never deploy via Base44 publish — GitHub only
- Never swap hero video (`done_czfe8o`) without explicit Rachel ticket
- Never touch `gh_key` assets
- Never name Ann McAlister / Dr. Russell McAlister / David Prest on site
- Never market tennis courts beyond "ready for renewal"
- Screenshot before confirming any deployment
- `c_limit` before `w_` in every Cloudinary transform
- Cursor `cursor: none` only inside `(hover: hover) and (pointer: fine)` media query
- EB Garamond weight 400 for body copy — never hairline paragraph text

---

*Full detail: `.agents/master/GARRAN_HILL_MASTER_SYNC_ADDENDUM_2026-05-10.md`*
*Global style standard: `.agents/rules/RACHEL_STUDIO_GLOBAL_STYLE_AND_TRUTH_STANDARD_v1.md`*
