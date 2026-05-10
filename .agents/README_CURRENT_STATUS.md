# GARRAN HILL — CURRENT STATUS BOARD
**Last updated:** 2026-05-10 (Rachel Studio Global Standard v1 created) by Rocky

> Quick reference for any agent entering this project. Read this first.

---

## ⚡ RACHEL STUDIO GLOBAL STANDARD — READ BEFORE ANY PROPERTY BUILD

**Rachel Studio Global Standard v1 now exists.**
Future properties should begin from this standard before property-specific facts are added.

File: `.agents/rules/RACHEL_STUDIO_GLOBAL_STANDARD_v1.md`

This standard covers:
- Core principle (facts fixed, copy open)
- Rachel's role as creative director + approval layer
- Full property build stack (11 required deliverables)
- Design standard (typography, spacing, mobile, luxury immersive layer)
- Copy standard (voice, do/don't, the seduction law)
- Photo standard (required fields per image)
- Source standard (hierarchy: primary → institutional → owner → journalism → oral history)
- Build workflow (12-step repeatable order)
- Agent rules (no agent overrides Rachel)
- Garran Hill as the model and proof of concept

---

## ⚡ GARRAN HILL-SPECIFIC STANDARDS

1. **Source truth must be checked before style work.** Run the unsafe phrase scan against `dist/index.html` before touching anything.
2. **Verify served site matches dist/index.html** — fetch live URL, compare. If MD5 differs (beyond Cloudflare email obfuscation), diagnose route/cache mismatch before proceeding.
3. **Global style/truth standard:** `.agents/rules/RACHEL_STUDIO_GLOBAL_STYLE_AND_TRUTH_STANDARD_v1.md`
4. **Typography baseline:** EB Garamond at weight 400 for body copy. Cormorant Garamond for headings. Pinyon Script for estate name only.
5. **Section breathing room:** Desktop sections spacious, not jammed. Mobile sections edited, not compressed.
6. **Mobile cursor:** Always scoped to `(hover: hover) and (pointer: fine)` — never apply `cursor: none` globally.

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

---

## PUBLIC BROKERAGE CONTACT — GARRAN HILL (CONFIRMED 2026-05-10)

| Field | Value |
|---|---|
| Agent | Rachel Hernandez |
| Brokerage | Pines Sotheby's International Realty |
| Location | Southern Pines, North Carolina |
| Public email | rachel.hernandez@sothebysrealty.com |
| Phone | **Not public — do not display** |

All mailto: links on the site use rachel.hernandez@sothebysrealty.com.
Gmail address removed from all public-facing HTML.
Footer added with contact block.
Schema broker block added (no telephone field).


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
3. ✅ Rachel Studio Global Standard v1 created
4. Rachel approves contact sheet
5. Photo implementation — approved only
6. Pinehurst Hands / Brick Thread — Rachel confirms Boston plans + Tufts craftsmen sourcing
7. Mobile QA sign-off
8. SEO / backlink section
9. Domain / launch gate

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
*Garran Hill style standard: `.agents/rules/RACHEL_STUDIO_GLOBAL_STYLE_AND_TRUTH_STANDARD_v1.md`*
*Rachel Studio global standard: `.agents/rules/RACHEL_STUDIO_GLOBAL_STANDARD_v1.md`*
