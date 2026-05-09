# GARRAN HILL — LLM PRIME PROMPT
# For: Any LLM (Claude, GPT-4, Gemini) asked to improve this site
# Authority: Rocky + Rachel Studio
# Date: 2026-05-09
# Rule: Read this entire file before touching a single line of code.

---

## WHAT YOU ARE WORKING ON

A luxury single-property real estate landing page for Garran Hill — 200 Hollycrest Drive, Pinehurst, NC. Listed at $4,250,000 through Sotheby's International Realty.

This is NOT a listing page. It is a luxury editorial publication. Think Architectural Digest 1987. Think Vogue. Think Aman Hotels. Every word, image, and pixel earns its place.

The file is: `dist/index.html` — a single self-contained HTML file with embedded CSS and JS.

---

## WHAT IS ALREADY LOCKED — DO NOT TOUCH THESE

### Assets — NEVER swap, rename, or replace:
- **Hero video:** `done_czfe8o` (Cloudinary) — Rachel named it "done." It is final.
- **Stat bar crest:** `gh_key/gh_crest_black_gold_v3` (v1778359641) — Rachel approved. Never replace.
- **Wax seal:** `gh_key/gh_wax_seal_v3` (v1777397863) — Never replace.

### Facts — LOCKED:
- Price: $4,250,000 (never change)
- Bedrooms: 4 | Bathrooms: 6 | Living Area: 6,072 SF | Acres: 4.15
- Address: 200 Hollycrest Drive, Pinehurst, NC | Est. 1916
- Matterport: https://my.matterport.com/show/?m=mfwyqT5Btwx

### Copy moments — ALL LOCKED, use verbatim:
- "Some houses hold history. This one shaped it."
- "The door has been open since 1916."
- "He named it Garran Hill. He never spent a night here."
- "The farm — the farm — the farm."
- "Well, Frank, I did get here after all, didn't I?"
- "Someone still puts flowers there."
- "In 1916, those were saplings. Now they are a forest."
- "The world outside these gates does not exist here."
- "Garran Hill is ready. It is offered now for the first time."
- "Fire going, no one home yet."
- "The staircase has turned the same curve since 1916."
- "White cabinetry. Dark granite. Island. Four windows. Room to cook."

### Names — NEVER put on the page:
- Ann McAlister, Dr. Russell McAlister, David Prest (except Library section only)
- Never name current owners. Ever.

### Banned words:
nestled, boasts, charming, stunning, elegant, cozy, spacious, beautiful, luxurious,
features (as verb), offers, provides, showcases, remarkable, breathtaking, magnificent,
pristine, oasis, sanctuary, escape, dream (as adjective)

---

## THE DESIGN SYSTEM — FOLLOW EXACTLY

### Colors:
```
--dark:    #0a0a0a   (background — everywhere, no exceptions)
--gold:    #C9A96E   (full gold — CTA borders, closing price, hairline peaks only)
--gold-lt: #F5E098   (light gold — hairline center peaks only)
--cream:   #F5F0E8   (all text)
```

### Gold hierarchy — THE LAW:
- **Full gold (#C9A96E solid):** CTA button border/hover fill, nav link underline on hover, closing price, hairline gradient peaks. That's it.
- **Muted gold (rgba 201,169,110 at 0.45–0.58):** Eyebrows, micro rules, pull attribution, nav wordmark Est./1916, act break glyphs, stat dividers, closing address.
- **Whisper gold (rgba 201,169,110 at 0.06–0.22):** Section borders, structural hairlines, ornament glyphs. Felt not seen.
- **NEVER gold:** Body copy, stat numbers, stat labels, headings, hero eyebrow. These are cream.

### Fonts — ONLY these three:
- `Pinyon Script` — estate name ONLY (hero title, closing script). Nothing else.
- `Cormorant Garamond` (weights 300–400) — ALL other text. Never bold. Never weight 500+.
- `EB Garamond` (400 only) — stat numbers, closing price. The "engraved" feel.

### Typography scale:
- Hero title: `clamp(5rem, 16vw, 14rem)` — Pinyon Script
- Section headings (h2): `clamp(1.9rem, 3.8vw, 3.4rem)` — Cormorant Garamond 300
- Eyebrows: `clamp(0.58rem, 0.73vw, 0.66rem)` — letter-spacing 0.52em, uppercase
- Body copy: `clamp(1.05rem, 1.35vw, 1.22rem)` — line-height 1.88
- Stat numbers: `clamp(1.2rem, 1.8vw, 2.0rem)` — EB Garamond
- Stat labels: `clamp(0.54rem, 0.66vw, 0.60rem)` — letter-spacing 0.40em, uppercase

### Spacing system — use ONLY these variables:
```css
--sp-unit: clamp(0.9rem, 1.8vw, 1.4rem)
--sp-xs:  calc(var(--sp-unit) * 1)
--sp-sm:  calc(var(--sp-unit) * 2)
--sp-md:  calc(var(--sp-unit) * 4.5)
--sp-lg:  calc(var(--sp-unit) * 7)
--sp-xl:  calc(var(--sp-unit) * 11)
--col-pad: clamp(2.5rem, 8vw, 9rem)
--col-mid: clamp(1.8rem, 5vw, 5.5rem)
--max-text: 660px
```
**No orphan values.** If it's not in the system, add it to the system first.

---

## THE STAT BAR — CRITICAL, READ CAREFULLY

The stat bar has been through 20+ iterations. The current implementation is the correct one. Do not restructure it.

**The law:**
```
Single flex row: 4 Bedrooms | [div] | 6 Bathrooms | [div] | [CREST] | [div] | 6,072 SF | [div] | 4.15 Acres | [div] | $4,250,000
```

**The crest is the focal point.** The numbers frame it. The row serves the crest.

**CSS rules that must not change:**
```css
.stat-numbers {
  display: flex;
  flex-direction: row;       /* NEVER remove or change */
  align-items: flex-end;     /* bottom-aligned — crest rises naturally */
  flex-wrap: nowrap;         /* NEVER add wrapping to desktop */
}
.stat-crest-wrap img {
  transform: translateY(-12px);  /* rises above bar line */
  /* NO position:absolute. NO margin tricks. Just translateY. */
}
```

---

## THE NARRATIVE SEQUENCE — LOCKED

This is the scroll order. Do not reorder sections:

```
ACT 0 — THRESHOLD
  Hero (fullscreen video, Garran Hill title, stat bar)

ACT 1 — THE LAND
  KB Gate (twilight exterior, "Some houses hold history. This one shaped it.")
  Opening Statement

ACT 2 — THE HISTORY
  WHP Portrait + Bio (Walter Hines Page)
  Farm Quote pull
  Letter/Last Words
  ── gold hairline + act label ──

ACT 3 — THE HOUSE
  Entry Hall
  Staircase
  Library
  Drawing Room / Salon
  Kitchen
  Dining Room
  Primary Suite
  Powder Room
  ── gold hairline + act label ──

ACT 4 — THE GROUNDS
  Exterior / 1916 saplings
  Blue Fox (Betty Dumaine's horse, buried on grounds)
  Pool + Gardens
  ── gold hairline + act label ──

ACT 5 — THE RECORD
  In Print (Pinestraw Magazine coverage)
  Restoration (Thomas O'Shea, 1999–2001)

ACT 6 — THE CLOSE
  Gallery (lightbox)
  Matterport 3D tour link
  Inquiry form
  Closing statement + price + address
  Footer
```

---

## THE LUXURY IMMERSIVE LAYER — ALL MANDATORY

These must be present in every build. Do not remove:

1. **Custom gold cursor** — `#cursor` dot + `#cursor-ring` ring. `cursor:none` on body.
2. **Film grain overlay** — `body::after` with SVG fractalNoise. `opacity:0.5`.
3. **Scroll reveals** — `.reveal` and `.reveal-slow` classes with IntersectionObserver JS.
4. **Gold metallic nav hairline** — `nav::before` gradient top line.
5. **Nav scrolled state** — JS adds `.scrolled` class on scroll > 60px.
6. **Crest glow animation** — `@keyframes crestGlow` breathing gold drop-shadow.
7. **Gold 3px scrollbar** — `::-webkit-scrollbar-thumb { background: #C9A96E }`.
8. **Scroll progress bar** — `#scroll-progress` top gold line.
9. **Act break dividers** — gold hairline + labeled glyph between every act.

---

## WHAT IS SAFE TO IMPROVE

You may improve these things — they are not locked:

1. **Section copy** — sharpen the prose, but never use banned words, never invent facts
2. **Photo presentation** — how images are cropped, positioned, sized within their sections
3. **Section spacing rhythm** — use the --sp- variable system, make it breathe more
4. **Typography refinement** — tighten line-heights, improve heading scale if needed
5. **Gallery** — improve the grid layout, lightbox experience
6. **Mobile responsiveness** — stat bar mobile stacking, section padding on small screens
7. **Transitions and animations** — scroll reveals, hover states, section entrance
8. **The inquiry form** — field layout, button treatment
9. **Act pacing** — if a section feels abrupt, add breath; if two loud sections are adjacent, add a pull quote between them
10. **Performance** — image lazy-loading, font loading optimization

---

## CLOUDINARY IMAGE URL PATTERN — CRITICAL

All images use this exact pattern:
```
https://res.cloudinary.com/dghn2xpif/image/upload/TRANSFORMS/VERSION/gh_key/FILENAME.jpg
```

Interior transforms: `e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,c_limit,w_1600`
Exterior transforms: `e_improve:outdoor:70,e_sharpen:35,e_saturation:22,f_auto,q_auto,c_limit,w_1920`

**Rule:** `c_limit` MUST come before `w_`. Never use `image/fetch`. Never use `media.base44.com`.

Current photo public IDs in use:
- `gh_191` — portico twilight (v1777244059)
- `gh_threshold` — threshold plaque (v1777263004)
- `gh_whp` — Walter Hines Page portrait (v1777244132)
- `gh_sapling1916` — 1916 saplings (v1777270125)
- `gh_entry62` — entry hall (v1777270464)
- `gh_stair51` — staircase
- `gh_lib58`, `gh_lib59` — library
- `gh_kitchen49` — kitchen
- `gh_dining60` — dining room
- `gh_salon65` — salon
- `gh_primary68` — primary suite
- `gh_powder54` — powder room
- `gh_crest_black_gold_v3` — stat bar crest (v1778359641) ← NEVER replace

---

## DEPLOYMENT — NEVER SKIP

1. Edit `dist/index.html` only
2. `cp dist/index.html index.html`
3. `git add dist/index.html index.html && git commit -m "..." && git push`
4. Cloudflare purge cache
5. Screenshot the live site to verify
6. NEVER say "done" without a screenshot

GitHub repo: `rachelhernandezrealtor-a11y/garren-hill`
Live URL: `https://garren-hill.pages.dev`
Cloudflare Zone: `ba9f1f552f0ee309df0b992e7e670c6f`

---

## THE ONE-SENTENCE STANDARD

Every decision — copy, layout, spacing, color, image — must pass this test:

**Does this make a $4.25M buyer feel something true?**

If yes, keep it. If no, cut it.

---

*This prompt was generated from the locked laws of Rachel Hernandez Studio.*
*Rocky built this. Rachel approved it. Do not deviate.*
