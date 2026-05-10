# GARRAN HILL — MASTER SYNC ADDENDUM
## MAY 10, 2026 — CURRENT OPERATING STATUS

**Author:** Rocky (founding builder-agent)
**For:** Rachel, Rocky, Coco, Codex, Claude, ChatGPT
**Status:** Active operating truth — supersedes any conflicting older notes
**Last updated:** 2026-05-10 00:29 ET

> Facts are fixed. Copy is open. Old copy may contain gold, but it is not law unless Rachel approves it. This file records the current operating truth so all agents stay aligned.

---

## 1. CURRENT DISPLAY STATUS

- **Current display URL:** https://rachelhernandez.studio/
- This URL is showing the Garran Hill site now.
- Treat this as current studio / display / staging presentation.
- **Do not call it final public launch** until Rachel confirms final domain transfer.
- Final domain / canonical SEO must be confirmed before launch indexing begins.
- rachelhernandez.studio is Rachel and Rocky's private workspace — not for buyers.

---

## 2. CURRENT PIPELINE STATUS

- Rocky can edit repo files and commit to GitHub.
- Cloudflare display path is working — changes go live after push + cache purge.
- **`dist/index.html` is the active site file.** All edits go here only.
- **`root index.html` must not be edited** unless Rachel explicitly says so.
- Repo: `rachelhernandezrealtor-a11y/garren-hill`
- Dev URL: `garren-hill.pages.dev`

**Recent successful commits:**
| Hash | Description |
|---|---|
| `e2140f6` | Pipeline test — "built in 1915–16 for Walter Hines Page" copy |
| `8a344e9` | Restoration Record section added |
| `5b37f00` | Photo map v1 created |
| `0656040` | Photo map v1.1 — QA corrected |
| `2d2fda9` | Visual approval contact sheet |

---

## 3. ROCKY ROLE

- Rocky is Rachel's founding builder-agent for Garran Hill.
- Rachel is creative director and final approval on everything.
- Rocky builds from **controlled tickets only** — never from vague instructions.
- Rocky should never make broad site changes without a specific, scoped ticket.
- After every ticket, Rocky returns:
  - Changed files
  - Commit hash
  - Preview / display link
  - Screenshot when applicable
  - Warnings and conflicts

---

## 4. CURRENT HERO STATUS

- Rachel changed the hero. Current site is using `done_czfe8o`.
- An earlier project rule named `Last_for_real_q0fqvw` as the locked hero.
- **Do not treat this as an error.** Do not swap assets.
- Both videos confirmed live in Cloudinary. File sizes: `done_czfe8o` = 674MB, `Last_for_real_q0fqvw` = 296MB.
- **Marked: Rachel-confirmation-needed before any future hero edit.**
- No agent should touch the hero video without an explicit hero ticket from Rachel.

---

## 5. CURRENT PHOTO SYSTEM

- **Cloudinary cloud:** `dghn2xpif`
- `gh_photos` — NestVisions listing photos (web-optimized, 2048px max)
- `gh_exteriors` — Pam Jensen exterior masters (full-resolution)
- `gh_interiors` — Pam Jensen interior masters (full-resolution)
- `gh_key` — **LOCKED** hero / key assets — do not touch, do not transform, do not rename
- All photos tagged by room (`tags:room_X`) and act (`tags:act_X`)
- Photo search: use Cloudinary API with tag expressions — do not guess file names

**Photo map status:**
- Photo map v1 created: `photo-maps/GARRAN_HILL_HOMEPAGE_PHOTO_MAP_v1.md`
- Photo map v1.1 corrected: `photo-maps/GARRAN_HILL_HOMEPAGE_PHOTO_MAP_v1_1.md`
- Visual approval contact sheet: `.agents/photo-maps/GARRAN_HILL_PHOTO_APPROVAL_CONTACT_SHEET_v1.md`
- **Use the contact sheet before placing any more homepage images.**
- Final photo truth lives in the photo map and contact sheet — not in file names.

**Cloudinary transform rules:**
- Interior: `e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,c_limit,w_1600`
- Exterior: `e_improve:outdoor:70,e_sharpen:35,e_saturation:22,f_auto,q_auto,c_limit,w_1920`
- `c_limit` MUST precede `w_` in every transform string
- NEVER use `image/fetch` — Cloudinary public IDs only
- NEVER use `media.base44.com` for property images

---

## 6. CURRENT FACT GUARDRAILS

### Walter Hines Page
- ✓ Use: "built in 1915–16 for Walter Hines Page"
- ✓ Use: "construction supervised by Ralph Page from Boston architectural plans"
- ✓ Use: "supported by experienced Pinehurst builders working with Leonard Tufts"
- ✓ Safe emotional line: "He named it Garran Hill. He never spent a night here."
- ✗ Do not say "Page built the house" as if he personally constructed it
- ✗ Do not say he walked through the door
- ✗ Do not say he never walked through the door

### Betty Dumaine
- ✓ Use: horses, hounds, peacocks, native hollies, Blue Fox
- ✗ Do not headline Queen of Thailand, Queen Sirikit, Vassar, college friend, or royal visit language on the public homepage
- Blue Fox is story-critical — image confirmation still needed before caption locks

### Restoration
- ✓ "The restoration did not make Garran Hill new. It made the house legible again."
- ✓ "Full brick. Formal proportion. Restored with the discipline of the original house."
- ✓ "During restoration, matching the old brick became a three-month act of preservation."
- ✗ Do not say everything is original — the restoration changed things
- ✗ Do not publicly name private owners or David Prest unless Rachel specifically approves

### Pool
- ✓ 20 × 40 in-ground concrete pool, brick wall and iron gates
- ✓ Converted from chlorine to saltwater in 2022
- ✗ Do not say "installed in 2022" — the pool predates 2022

### Tennis
- ✓ Two regulation tennis courts exist
- ✓ Court surfaces have deteriorated and need resurfacing
- ✓ Public-safe phrase: "Two regulation tennis courts remain part of the estate's sporting landscape, ready for renewal."
- ✗ Do not oversell the courts

### Wee Cottage
- ✓ Children's playhouse
- ✗ Do not call it a guest suite unless Rachel explicitly confirms

### Dining Room
- ✓ Safe language: "Original dining room frontispiece and formal architectural detail."
- ✗ Do not claim shell cabinets are 1916 original unless Rachel confirms

---

## 7. CURRENT SEO / BACKLINK STATUS

- SEO should be authority-based — not keyword-stuffed
- Current display URL: `rachelhernandez.studio`
- **Do not aggressively index until Rachel confirms final domain strategy**

**Final SEO launch checklist — all items pending Rachel confirmation:**
- [ ] Final domain confirmed
- [ ] Canonical URL confirmed
- [ ] index / noindex decision
- [ ] Meta title and description
- [ ] Open Graph image selected
- [ ] JSON-LD / schema review
- [ ] Google Search Console
- [ ] Bing Webmaster
- [ ] Image alt text pass
- [ ] Source / backlink section live

---

## 8. CURRENT FILES THAT MATTER

| File | Purpose |
|---|---|
| `dist/index.html` | Active site file — all edits go here |
| `GARRAN_HILL_MASTER_WORKING_BRIEF_2026-05-04.md` | Master working brief (source of truth) |
| `photo-maps/GARRAN_HILL_HOMEPAGE_PHOTO_MAP_v1.md` | Photo map v1 |
| `photo-maps/GARRAN_HILL_HOMEPAGE_PHOTO_MAP_v1_1.md` | Photo map v1.1 — QA corrected |
| `.agents/photo-maps/GARRAN_HILL_HOMEPAGE_PHOTO_MAP_v1_1.md` | Same — agents copy |
| `.agents/photo-maps/GARRAN_HILL_PHOTO_APPROVAL_CONTACT_SHEET_v1.md` | Visual contact sheet — Rachel approves here |
| `AGENTS.md` | Agent operating rules |
| `.agents/master/GARRAN_HILL_MASTER_SYNC_ADDENDUM_2026-05-10.md` | This file |
| `.agents/README_CURRENT_STATUS.md` | Quick-reference status board |

---

## 9. OPEN CONFIRMATION ITEMS

These cannot be resolved without Rachel. No agent should guess.

| # | Item | Status |
|---|---|---|
| 1 | **Canonical hero video** — `done_czfe8o` vs `Last_for_real_q0fqvw` | ⚠️ Rachel to confirm |
| 2 | **Final domain / canonical URL** | ⚠️ Rachel to confirm |
| 3 | **rachelhernandez.studio** — indexed or treated as staging? | ⚠️ Rachel to confirm |
| 4 | **Blue Fox stone marker** — is `200_hollycrest_drive_192` the actual grave? | ⚠️ Rachel to confirm |
| 5 | **Tennis court photos** — are they main-scroll worthy or gallery only? | ⚠️ Rachel to confirm |
| 6 | **Wee Cottage image** — is `holycrestextf_3361` the correct structure? | ⚠️ Rachel to confirm |
| 7 | **Dining shell cabinets** — confirmed 1916 original? | ⚠️ Rachel to confirm |
| 8 | **Restoration blueprint photos** — upload to `gh_documents/restoration_drawings/`? | ⚠️ Rachel to confirm |
| 9 | **Contact sheet approvals** — which images does Rachel approve for homepage? | ⚠️ Rachel to review contact sheet |

---

## 10. NEXT BUILD ORDER

1. ✅ Master sync addendum — this file
2. Factual safety pass on visible site copy
3. Rachel reviews visual approval contact sheet
4. Homepage photo / copy implementation — approved images only
5. Mobile QA pass
6. SEO / source / backlink section
7. Final domain / canonical launch gate

---

*Written by Rocky. Rocky does not resolve open items silently. Rocky does not make site changes without a controlled ticket. Rachel is the only creative authority.*
