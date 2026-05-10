# RACHEL STUDIO — GLOBAL STYLE AND TRUTH STANDARD v1
**Created:** 2026-05-10
**Authority:** Permanent — applies to Garran Hill, Flow Farm, and every future Rachel Studio property site
**Approval:** Rocky — awaiting Rachel confirmation of any site-specific deviations

---

## THE PRIME RULE

**"Facts are fixed. Copy is open. Every Rachel Studio property page must be source-safe, mobile-readable, visually breathable, and buyer-functional. The style is Architectural Digest meets Vogue meets private archive. Typography must be readable before it is decorative. Every image must have a job. Every section must serve the buyer. Rachel is the taste, truth, and approval layer."**

---

## I. SERVED-VERSION ALIGNMENT RULE

Before any style or copy work on any property site:

1. **Pull the latest repo.** `git pull origin main`
2. **Confirm Cloudflare Pages serves `dist/index.html`** — NOT root `index.html`.
3. **Fetch the live URL** and compare MD5 hash against local `dist/index.html`.
4. **If they match** — proceed.
5. **If they do not match** — diagnose routing/cache mismatch, do not style the wrong version.
6. **Purge Cloudflare cache** after every deploy. Always.

**Cloudflare zone:** `fe5ca314e7aea9294d866b1fb475da29`
**garren-hill.pages.dev** → served from `dist/index.html` in repo root of branch `main`
**rachelhernandez.studio** → CNAME to pages.dev — same source, email obfuscation by CF scrape shield is expected (not a mismatch)

---

## II. SOURCE SAFETY RULES

### Facts are fixed. Copy is open.

The following categories are **source-confirmed and safe to use:**
- "Built in 1915–16 for Walter Hines Page."
- "Page hired an architect for a two-story Georgian brick house."
- "Construction supervised by Ralph Page."
- "The Moore County life Page imagined at Garran Hill remained largely unrealized."
- "The hunt for matching brick took three months." (PineStraw, Story of a House)
- "Craftsmen from Leonard Tufts' Pinehurst building world." (in-sentence only)
- "Betty Dumaine's Hollycrest years brought horses, hounds, peacocks, native hollies, and old Pinehurst lore."
- "20 × 40 ft in-ground concrete pool, surrounded by brick wall and iron gates; converted from chlorine to saltwater in 2022."
- "Two regulation tennis courts remain part of the estate's sporting landscape, ready for renewal."
- "The Wee Cottage, a children's playhouse and one of the grounds' gentlest surprises."
- "The restoration did not make Garran Hill new. It made the house legible again."

### Phrases that are BANNED from any public-facing page:
| Banned Phrase | Reason |
|---|---|
| "He never spent a night here" | Banned by instruction |
| "He walked through the door" | Banned by instruction |
| "He never walked through the door" | Banned by instruction |
| "He died ten days later" | Banned by instruction |
| "Built by Walter Hines Page" (as if by hand) | Misleading |
| "Built by Leonard Tufts' own craftsmen" (as headline) | Not independently sourced as headline |
| "The same men who built Pinehurst built Garran Hill" (as standalone) | Not independently sourced as headline claim |
| "The same hands that raised the Carolina Hotel" | Specific building claim — not sourced |
| "Queen of Thailand" | Not for public homepage |
| "Vassar" / "college friend" | Not for public homepage |
| "Shell cabinets were already there" | Rachel-confirm-needed |
| "Hardware was specified in 1916. It has not been replaced." | Not independently verified |
| "Custom Marvin windows made to 1916 specifications" | Not independently verified |
| "National Register" (as confirmed status) | Not confirmed with preservation source |
| "Tax credit" / "easement" | Not independently verified for public use |
| "Installed in 2022" / "Restored in 2022" (re: pool) | Pool predates 2022 — use "converted to saltwater in 2022" |
| "All original" | Not accurate — restoration changed things |
| "Offered now for the first time" | Too absolute — use "for the first time since its restoration" |
| "Guest suite" | Not in verified listing copy |

### Before using any new historical claim:
1. Check GH_SOURCE_BACKLINK_INDEX.md
2. If not there, flag as confirmation-needed
3. Do not add to live site until source confirmed or Rachel explicitly approves

---

## III. GLOBAL TYPOGRAPHY BASELINE

### Font System
- **Pinyon Script** — estate name moments ONLY (hero title, studio wordmark)
- **Cormorant Garamond** — headings, display, editorial sections (weight 200–400)
- **EB Garamond** — body copy, paragraphs, captions (weight 400–500)
- **System sans-serif** — never used in editorial sections; UI only if needed

### Google Fonts Load Order
```
Cormorant+Garamond:ital,wght@0,200;0,300;0,400;1,200;1,300;1,400
EB+Garamond:ital,wght@0,400;0,500;1,400
Pinyon+Script
```

### Type Scale (CSS variables — locked)
```css
--text-xs:   clamp(0.65rem, 0.8vw,  0.75rem)   /* labels, eyebrows */
--text-sm:   clamp(0.85rem, 1.1vw,  1.0rem)    /* captions, small body */
--text-base: clamp(1.05rem, 1.2vw,  1.18rem)   /* body — readable first */
--text-md:   clamp(1.3rem,  2vw,    1.7rem)     /* subheads */
--text-lg:   clamp(1.9rem,  3.2vw,  3.0rem)    /* section titles */
--text-xl:   clamp(2.8rem,  5.5vw,  5.2rem)    /* large display */
--text-hero: clamp(6rem,    19vw,   17rem)      /* hero name */
```

### Body Copy Rules
- `font-family: 'EB Garamond', 'Cormorant Garamond', Georgia, serif`
- `font-weight: 400` — never hairline for paragraph text
- `font-size: clamp(1.05rem, 1.2vw, 1.18rem)`
- `line-height: 1.65–1.78` (use 1.72 as baseline)
- `max-width: 62ch`
- Opacity: never below `rgba(245,240,232,0.80)` — manage hierarchy with size, not opacity

### Caption Rules
- `font-size: clamp(0.78rem, 0.9vw, 0.86rem)`
- `font-weight: 400`
- `letter-spacing: 0.12em`
- `line-height: 1.6`

### Heading Rules
- H2: `text-wrap: balance` where supported
- Cormorant Garamond, weight 300
- Color: `var(--cream)` — never below 0.85 opacity

---

## IV. GLOBAL SPACING BASELINE

### CSS Variable System (locked)
```css
--sp-unit: clamp(1rem, 2vw, 1.6rem)
--sp-xs:   calc(var(--sp-unit) * 1)      /* 10–26px */
--sp-sm:   calc(var(--sp-unit) * 2)      /* 20–51px */
--sp-md:   calc(var(--sp-unit) * 4.5)    /* 45–115px */
--sp-lg:   calc(var(--sp-unit) * 7)      /* 70–179px */
--sp-xl:   calc(var(--sp-unit) * 11)     /* 110–282px */
--col-pad: clamp(2.5rem, 8vw, 9rem)      /* page margins */
--col-mid: clamp(1.8rem, 5vw, 5.5rem)   /* split section padding */
--max-text: 62ch                          /* body copy max width */
```

### Section Padding (desktop)
- Split sections: `clamp(4.5rem, 8vw, 8rem)` top/bottom
- Pull quote sections: `var(--sp-xl) clamp(3rem, 15vw, 18rem)`
- Full-text sections: `var(--sp-xl) var(--col-pad)`
- Breath interstitials: `var(--sp-xl) var(--col-pad)`

### Split Section
- Gap between image and text: `clamp(2.5rem, 5vw, 5rem)` — deliberate, not minimal
- Text column vertical padding: `clamp(2rem, 4vw, 4rem)` so copy never hugs image edge

### No orphan values
If you find yourself writing `padding: 3.5rem` or `margin-top: 2.4rem` on a section, STOP. Map it to the `--sp-` system. If no system value fits, add one to the system.

---

## V. MOBILE RULES

### Non-negotiable
- No section requires pinching to read
- No horizontal scroll
- No giant text overlays on important photos
- Tap targets comfortable (44px minimum)
- Inquiry form easy to find and fill
- `user-scalable=no` is **BANNED** — never add it
- Body copy minimum `1.0rem` on mobile

### Cursor (LOCKED — 2026-05-10)
```css
/* Only on desktop, fine-pointer devices */
@media (hover: hover) and (pointer: fine) {
  * { cursor: none !important; }
}
/* Touch/mobile: always restore native cursor */
@media (hover: none), (pointer: coarse) {
  * { cursor: auto !important; }
  #cursor { display: none !important; }
}
```
Gold cursor dot = 7px, no ring. NEVER re-add the ring. Cursor style locked.

### Stack order on mobile
- Image always stacks above text (default flex-direction: column)
- Image minimum height: 280px on mobile
- Section padding: `clamp(3rem, 10vw, 5rem)`

---

## VI. IMAGE JOB RULES

Every image has one assigned job. If you can't name the job, the image doesn't belong.

| Section | Image's Job |
|---|---|
| Hero | Arrival ceremony — the estate at its most cinematic |
| KB Gate / Aerial | Scale — the land, the context, the claim |
| WHP Portrait | Origin — the man, not the mythology |
| Threshold / Entry | Proof — the brick, the name, the date |
| Foyer | Procession — how the house receives you |
| Library | Thought — restoration discipline, quiet authority |
| Salon / Drawing Room | Social life — how the house entertains |
| Kitchen | Livability — warmth, scale, actual use |
| Dining | Ceremony — the table, the shell cabinets, the light |
| Primary Suite | Rest — the private scale of the house |
| Staircase | Continuity — 1916 to now, one unbroken curve |
| Grounds | Estate life — scale, privacy, the world outside the gate |
| Hollycrest / Dumaine | Legend — the house's other chapter |
| Twilight | Emotion — the house as feeling, not fact |

### Image containment (LOCKED — 2026-05-10)
```css
.split-img {
  position: relative;
  overflow: hidden;
}
.split-img img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
```
NEVER allow a general `section img { height: auto }` to override `.split-img img`.

---

## VII. VISUAL RHYTHM RULES

### The law: every section gets ONE job
Do not make every section equally loud. Let the site breathe.

**Pacing pattern (per act):**
`arrival → scale → origin → proof → procession → rooms → rest → legend → grounds → emotion → conversion`

**Within each act:**
`loud → quiet → detail → breath`
- Never two loud sections back to back
- One pull quote per act maximum
- Every act ends with a breath before the gold hairline divider

### Act structure: gold hairline + act-break label between each act
```html
<div class="section-divider"></div>
<div class="act-break reveal">
  <span class="act-break-glyph">The House</span>
</div>
```

---

## VIII. INQUIRY PATH RULES

- Inquiry section must be reachable from nav on every device
- Form fields: Name, Email, Phone (optional), Message
- Submit button: gold border style, not a filled button by default
- On mobile: form must be fully usable without pinching
- Confirmation message on submit (no page reload)
- Rachel's email: rachelhernandezrealtor@gmail.com — Cloudflare scrape shield obfuscation is expected and correct

---

## IX. DEPLOYMENT RULES (PERMANENT)

- **NEVER deploy via Base44 publish** — GitHub + Cloudflare Pages only
- **Target file: `dist/index.html`** — always, never root `index.html`
- **Post-deploy:** purge Cloudflare cache immediately
- **Screenshot before confirming** — never say "done" without visual verification
- **rachelhernandez.studio** — private workspace only, NOT for buyers. Keep `noindex` and `nofollow` on any studio-preview paths.

---

*This standard was built from the GLOBAL STYLE LAYER + SERVED VERSION ALIGNMENT v1 session, 2026-05-10.*
*Applies permanently to all Rachel Studio property sites.*
*Next update: when a new pattern is proven in production and approved by Rachel.*
