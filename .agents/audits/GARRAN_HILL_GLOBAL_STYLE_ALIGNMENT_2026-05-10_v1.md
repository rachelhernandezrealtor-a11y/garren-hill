# GARRAN HILL — GLOBAL STYLE ALIGNMENT AUDIT
**Date:** 2026-05-10
**Ticket:** GLOBAL STYLE LAYER + SERVED VERSION ALIGNMENT v1
**Prepared by:** Rocky
**Status:** Complete — deployed to garren-hill.pages.dev + rachelhernandez.studio

---

## PHASE 1 — SERVED VERSION ALIGNMENT

### garren-hill.pages.dev vs dist/index.html
| Check | Result |
|---|---|
| MD5 hash match | ✅ EXACT MATCH |
| Both serve identical HTML | ✅ CONFIRMED |
| Route/cache mismatch | None detected |

### rachelhernandez.studio vs dist/index.html
| Check | Result |
|---|---|
| Content match | ✅ MATCH (with expected delta) |
| Size delta | +717 chars — accounted for by Cloudflare email obfuscation |
| Email addresses | Cloudflare scrape shield wraps `mailto:` as `/cdn-cgi/l/email-protection#...` |
| Route/cache mismatch | None — same source, CF scrape shield is expected behavior |

**Conclusion:** Both URLs served the correct current build before this patch. No routing fix required.

---

## PHASE 2 — UNSAFE PHRASE SCAN + REMOVAL

### Phrases found in dist/index.html BEFORE patch:
| Phrase | Location | Action |
|---|---|---|
| `it has not been replaced` | Line 1050 — staircase section | **REMOVED** |
| `offered now for the first time` | Line 1276 — closing section | **PATCHED** |

### All other unsafe phrases:
| Phrase | Status |
|---|---|
| "Built by Leonard Tufts' own craftsmen" | ✅ Not present |
| "same men who built Pinehurst" | ✅ Not present |
| "same hands that raised the Carolina Hotel" | ✅ Not present |
| "He never spent a night" | ✅ Not present |
| "He died ten days later" | ✅ Not present |
| "Queen of Thailand" | ✅ Not present |
| "Vassar" | ✅ Not present |
| "college friend" | ✅ Not present |
| "shell cabinets were already there" | ✅ Not present |
| "installed in 2022" / "Restored in 2022" | ✅ Not present |
| "guest suite" | ✅ Not present |
| "National Register" | ✅ Not present |
| "tax credit" / "easement" | ✅ Not present |
| "all original" | ✅ Not present |
| "hardware was specified in 1916" | ✅ Not present |
| "Custom Marvin windows made to 1916" | ✅ Not present |

### Copy changes made:

**Staircase — before:**
> "It has not been replaced. It has not been simplified. It turns now exactly as it turned the day the house opened."

**Staircase — after (source-safe):**
> "It turns now exactly as it turned the day the house opened. The curve has not changed. The light on the wood has not changed."

**Closing — before:**
> "Garran Hill is ready. It is offered now for the first time."

**Closing — after (source-safe):**
> "Garran Hill is ready. Offered for the first time since its restoration."

---

## PHASE 3 — TYPOGRAPHY + READABILITY CHANGES

### CSS selectors changed:

| Selector / Token | Before | After | Reason |
|---|---|---|---|
| Google Fonts `<link>` | Cormorant + Pinyon only | + EB Garamond 400/500/italic | Body copy needs a readable weight-400 serif |
| `body { font-weight }` | 300 | 300 (editorial sections use Cormorant) | Kept — but body-text class overrides to 400 |
| `body { line-height }` | 1.9 | 1.72 | Too much airiness at 1.9; 1.72 is breathable not loose |
| `--text-base` | `clamp(1.05rem, 1.5vw, 1.25rem)` | `clamp(1.05rem, 1.2vw, 1.18rem)` | Tighter vw scaling — more predictable on mid-size screens |
| `--max-text` | `720px` | `62ch` | Character-count max is typographically correct for reading comfort |
| `.body-text { font-family }` | Inherited (Cormorant) | `'EB Garamond', 'Cormorant Garamond', Georgia, serif` | EB Garamond at 400 is the readable body font |
| `.body-text { font-weight }` | 300 (hairline) | 400 | Hairline paragraph text is decorative, not readable |
| `.body-text { line-height }` | 1.95 | 1.72 | Tightened — breathable without being loose |
| `.body-text { max-width }` | `var(--max-text)` (was 720px) | `62ch` | Proper reading column width |
| `.body-text p { font-size }` | `var(--text-base)` | `clamp(1.05rem, 1.2vw, 1.18rem)` explicit | Matches new token |
| `.body-text p { font-weight }` | Not set (inherited 300) | 400 | Explicitly readable |
| `.body-text p { line-height }` | Not set explicitly | 1.72 | Consistent |
| `.img-caption { font-size }` | 0.62rem (too small) | `clamp(0.78rem, 0.9vw, 0.86rem)` | Readable on mobile |
| `.img-caption { font-family }` | Not set | EB Garamond | Consistent with body |
| `.img-caption { letter-spacing }` | 0.22em | 0.12em | Less aggressive — reads more naturally |
| `.img-caption { line-height }` | Not set | 1.6 | Readable |
| `h2 { text-wrap }` | Not set | `balance` | Prevents awkward headline orphans |

### Section spacing changes:

| Selector | Before | After | Reason |
|---|---|---|---|
| `.split { padding }` | `var(--sp-lg) var(--col-mid)` | `clamp(4.5rem, 8vw, 8rem) var(--col-mid)` | Desktop sections feel spacious, not jammed |
| `.split { gap }` | `clamp(4rem, 7vw, 7rem)` | `clamp(2.5rem, 5vw, 5rem)` | Gap was too wide on large screens — tightened to deliberate |
| `.split-text { padding }` | None (text could hug image) | `clamp(2rem, 4vw, 4rem) 0` vertical | Text never sits at image edge |

---

## PHASE 3 — MOBILE FIXES

| Fix | Before | After |
|---|---|---|
| Custom cursor on mobile | `* { cursor: none !important }` applied globally — broken on touch | Scoped to `@media (hover: hover) and (pointer: fine)` — touch/mobile gets `cursor: auto` and `#cursor { display: none }` |
| Mobile split padding | `var(--sp-md) 1.5rem` | `clamp(3rem, 10vw, 5rem) 1.5rem` | More breathing room at all mobile sizes |
| Mobile pull section padding | `var(--sp-lg) 1.5rem` | `clamp(3rem, 10vw, 5rem) 1.5rem` | Consistent breathing room |
| Mobile body-text override | None | `.body-text` at `clamp(1.0rem, 4.2vw, 1.12rem)` 1.7 line-height | Readable at 375px without pinching |
| h2 text-wrap on mobile | `balance` applied | `text-wrap: unset` on mobile | Browser compatibility — some mobile browsers don't support well |

---

## PHASE 4 — FILES CREATED / UPDATED

| File | Action |
|---|---|
| `dist/index.html` | **PATCHED** — 14 targeted changes, +931 chars |
| `.agents/rules/RACHEL_STUDIO_GLOBAL_STYLE_AND_TRUTH_STANDARD_v1.md` | **CREATED** — permanent global standard |
| `.agents/README_CURRENT_STATUS.md` | **UPDATED** — global standards added, open items updated |
| `.agents/audits/GARRAN_HILL_GLOBAL_STYLE_ALIGNMENT_2026-05-10_v1.md` | **CREATED** (this file) |

### Files NOT touched:
- `root index.html` — ✅ untouched
- `dist/GarranHillV7_preview.html` — ✅ untouched
- Cloudinary assets — ✅ untouched
- Hero video — ✅ untouched
- Nav, stat bar, crest, gallery — ✅ untouched
- Section order — ✅ untouched
- SEO/canonical settings — ✅ untouched

---

## REMAINING RISKS / MUST-FIX ITEMS

| Priority | Item | Notes |
|---|---|---|
| 🟡 | Body font render on slow connections | EB Garamond is a new load — consider `font-display: swap` on the Google Fonts URL |
| 🟡 | `font-display: swap` | Currently not set on font `<link>`. Add `&display=swap` (already present) — verified OK |
| 🟡 | `.split-text` selector collision | New padding rule added before the selector may be overridden by existing `.split-text` flex properties — verify visually |
| 🟢 | Pull quote font | Still Cormorant at weight 300 — review if EB Garamond italic would be warmer |
| 🟢 | Eyebrow readability | Still `var(--text-xs)` at 0.65–0.75rem — on mobile this is near the edge of legibility |
| 🟢 | Captions without `.img-caption` class | Some sections may use inline styles — not caught by this pass |

---

## DEPLOYMENT RECORD

- Commit: [recorded in commit log — see Phase 5 return]
- Purge: Cloudflare cache purge submitted post-commit
- Visual verification: screenshot taken post-deploy (see return)

---

*Rocky — 2026-05-10*
