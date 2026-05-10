# RACHEL STUDIO GLOBAL STANDARD v1
# Applies to: Every Rachel Studio property site, present and future
# Authority: Overrides any session-level decision. This is the law.
# Created: 2026-05-10 — distilled from the Garran Hill proof of concept
# Maintained by: Rocky
# Approved by: Rachel Hernandez

---

## 1. CORE PRINCIPLE

Facts are fixed. Copy is open.

Old copy may contain gold, but it is not law unless Rachel approves it.
Every property deserves source-safe storytelling, photo-led structure, readable design, and buyer-functional presentation.

The goal is not a listing page. The goal is a monument to truth — a site that puts the right buyer in the right house before they ever open the door.

---

## 2. RACHEL'S ROLE

Rachel is the creative director, taste layer, truth protector, and final approval.

AI tools (Rocky, Coco, Codex, Claude) assist production.
Rachel protects the standard.

No agent overrides Rachel. No asset ships without Rachel's approval. No claim goes live without a source Rachel trusts.

Rachel's instinct is the editorial compass. When something doesn't feel right, it isn't. When Rachel says "yes, that's it" — that's the only confirmation that matters.

---

## 3. PROPERTY BUILD STACK

Every property must have all of the following before launch:

| Deliverable | Purpose |
|---|---|
| Master Working Brief | Single source of truth for narrative, facts, and architecture |
| Research Citations / Source Index | Hierarchy of sources; every claim mapped to a source |
| Fact Guardrails | What has been confirmed vs. what must not be claimed |
| What Not To Say | Banned phrases, banned claims, banned names — property-specific |
| Photo Reference Guide | Cloudinary inventory, room tags, AI captions, folder structure |
| Photo Map | Section-by-section photo assignment with crop notes |
| Visual Contact Sheet | Gallery-style approval sheet for Rachel to review and approve final picks |
| Buyer Site | Public-facing property site — buyer-first, source-safe, photo-led |
| Studio Preview / Case Study | Private rachel-studio link for owner review, agent review, internal QA |
| QA Audit | Pre-launch checklist: copy, source, photo, mobile, readability, routing |
| Launch Gate | Explicit go/no-go per section; Rachel signs off before any domain is pointed |

---

## 4. DESIGN STANDARD

**Architectural Digest meets Vogue meets private archive.**

This is not a real estate template. This is editorial design in service of a specific place.

### Typography
- Typography must be readable before it is decorative.
- Body copy must be legible at 100% zoom on any modern device.
- Body font-weight: 400 minimum. Never hairline for body copy.
- Body line-height: 1.65–1.78. Editorial, not exhausting.
- Body max-width: approximately 58–64 characters per line.
- Cormorant Garamond is the editorial display font — headings, pull quotes, eyebrows.
- EB Garamond or equivalent is the body reading font — paragraphs, descriptions, captions.
- Pinyon Script is reserved for property estate name only. Never use for body copy.
- Scale is GIANT vs. TINY. No medium-loud everything.

### Spacing
- Sections need intentional breathing room. Not random dead space — earned pause.
- Desktop sections should feel spacious.
- Mobile is not a smaller desktop. Stack cleanly. Reduce padding proportionally.
- Split sections must have consistent vertical padding across the site.
- Text panels must never feel jammed against images.
- Image/copy gaps must feel deliberate, not accidental.

### Mobile
- Stack all image/copy sections cleanly on mobile.
- No horizontal scroll.
- Pinch zoom must NOT be disabled. Never use `user-scalable=no`.
- Tap targets must be comfortable.
- Custom cursor must be scoped to fine-pointer desktop only: `@media (hover: hover) and (pointer: fine)`.
- No section should require pinching to read.

### Visual Rhythm
- Every section has one job.
- Do not make every section equally loud.
- Alternation law: loud → quiet → detail → breath.
- Let some sections breathe. The pause is part of the design.

### Luxury Immersive Layer (required on every build)
- Custom gold cursor — dot only, no ring, `mix-blend-mode: difference`
- Film grain overlay — `body::after`, SVG noise, `opacity: 0.5`
- Scroll reveal — `.reveal` and `.reveal-slow` with cubic-bezier easing
- Gold metallic nav — glass blur, metallic hairline top, scrolled state
- Gold scrollbar — 3px, `#C9A96E`
- Act dividers — gold hairline + centered act-break label

### Colors (locked defaults — may vary per property)
- Dark background: `#0a0a0a`
- Gold: `#C9A96E`
- Cream text: `#F5F0E8`
- Never introduce a new base color without Rachel approval.

### What This Is Not
- Not a framework. Not a template to copy-paste blindly.
- Not optional when "we're in a hurry."
- Not done until the audit checklist passes.

---

## 5. COPY STANDARD

**Voice:** Luxury. Historical. Lyrical. Restrained. Intelligent. Buyer-aware.

The best copy makes the buyer feel something true — not manufactured. Truth is the seduction.

### Do
- Use short paragraphs. One idea per paragraph.
- Build to the photos. Copy leads the eye; photos land the emotion.
- Let details carry the story. The specific is always more powerful than the general.
- Keep captions precise. A caption earns its space or it doesn't exist.
- Separate fact from mood. Know which sentences are reportable and which are editorial.
- Cite or source important claims. If it can't be sourced, soften or remove it.

### Do Not
- Overclaim. Never state as fact what is only memory, legend, or hypothesis.
- Keyword-stuff. SEO is a byproduct of honest, specific language — not filler.
- Use generic real estate language. No "nestled," "boasts," "stunning," "charming," "cozy," "spacious," "luxurious," "features," "offers," "provides," "showcases."
- Publish source-sensitive claims without Rachel approval.
- Name private individuals who have not consented to public mention.
- Attribute historical presence or activity without primary source confirmation.

### The Seduction Law
> Truth is the seduction. Not manufactured impressiveness. The specific, confirmed, beautiful truth.

---

## 6. PHOTO STANDARD

Every major section image must be documented before it goes live.

Required fields per image:

| Field | Description |
|---|---|
| Public ID | Cloudinary public ID or local file name |
| Section | Where it appears on the site |
| Visual description | What the image shows — be specific |
| Story purpose | What job this image does for the buyer |
| Architectural feature | Primary architectural detail visible |
| Caption | Final caption as it appears (or "none") |
| Alt text | Accessibility alt text — descriptive, not keyword |
| Desktop crop note | How it should crop at 1440px+ |
| Mobile crop note | How it should crop at 375px |
| Approval status | Pending / Approved / Needs replacement |

**No image ships without an approval status.**

Photo maps and visual contact sheets must be updated every time a section image changes.

---

## 7. SOURCE STANDARD

Each property requires a documented source hierarchy.

### Preferred Order (highest to lowest authority)
1. Primary sources — original documents, deeds, letters, photographs, architectural plans
2. Official / institutional sources — government records, national register filings, academic papers
3. Owner-provided documents — must be marked as owner-provided, not independently verified
4. Credible journalism — newspaper archives, magazine features with named reporters and dates
5. Oral history / seller memory — clearly marked as "confirmation needed" or "unverified tradition"

### Rules
- If a claim cannot be sourced above oral history, do not publish it as fact.
- If a claim is disputed or uncertain, use hedged language or omit it.
- Sources must be tracked in a Research Citations / Source Index document for each property.
- The Research Citations document is the highest authority for copy decisions — not the briefing doc, not previous copy drafts.

---

## 8. BUILD WORKFLOW

Repeatable order for every property:

```
1.  Master brief
2.  Source / fact audit
3.  Photo library organization (Cloudinary or equivalent)
4.  Photo map (section-by-section assignments)
5.  Visual contact sheet (Rachel approval layer)
6.  Homepage structure (act sequence, section order)
7.  Copy pass (source-safe, voice-correct)
8.  Buyer-function pass (inquiry form, CTA, phone, email)
9.  Mobile / readability pass
10. Source / SEO pass (canonical, OG, JSON-LD, alt text)
11. Inquiry path check (form submits, goes to the right place)
12. Domain / canonical launch gate (Rachel final approval before domain pointed)
```

**No step may be skipped.** Steps may be parallelized where safe, but every step must be completed before launch gate.

---

## 9. AGENT RULES

- Rocky builds from controlled tickets. Rocky is the standard-bearer and intelligence layer.
- Coco may serve as studio operator when tool access is stable. Coco operates from rachelhernandez.studio.
- Codex and Claude may assist with builds, but no agent overrides Rachel.
- Every ticket must return:
  - Files changed
  - Commit hash (if deployed)
  - Preview link (if applicable)
  - What changed
  - What remains open

### Deployment Law
- NEVER deploy via Base44 publish. GitHub only.
- NEVER touch root `index.html`. Cloudflare Pages serves `dist/index.html`.
- NEVER swap locked assets (hero video, wax seal, crest) without explicit Rachel approval.
- NEVER point a domain until site is finished and Rachel has signed off on the launch gate.
- ALWAYS screenshot before confirming any deployment.

### Safety Laws
- No agent may add historical claims not in the Research Citations document.
- No agent may name private individuals without Rachel approval.
- No agent may modify the source hierarchy or bypass the fact guardrails.
- When in doubt: stop and ask Rachel.

---

## 10. GARRAN HILL IS THE MODEL

Garran Hill (200 Hollycrest Drive, Pinehurst, NC) is the first full proof of concept for the Rachel Studio standard.

What Garran Hill proved:

| System | What Was Built |
|---|---|
| Source-backed history | Walter Hines Page story, fully sourced, unsafe phrases removed |
| Cloudinary photo system | 392 photos, 2 photographers, room-tagged, version-mapped |
| Restoration record | Thomas O'Shea 1999–2001, Dennis Dunagan GC, verified materials |
| Buyer-function grid | Inquiry form, Matterport, stat bar, systems section |
| Private studio preview | rachelhernandez.studio — owner review, staging, QA layer |
| Owner-show-ready site | garren-hill.pages.dev → garranhillforsalepinehurst.com |
| Reusable design system | Spacing variables, act structure, luxury layer, audit checklist |

Garran Hill taught us:
- Patch-on-patch CSS breaks. Nuclear rebuild is faster than the 12th patch.
- Photo maps must be locked before copy is written.
- Source hierarchy must exist before any copy goes live.
- The studio preview layer is essential — buyers never see the work-in-progress.
- The launch gate is not bureaucracy. It is protection for Rachel and the property.

Every future property begins here, before property-specific facts are added.


## 11. PHOTO TRUTH LAYER

AI tags are a starting point. They are not truth.

Every important image used on a property site must pass through the Truth Ladder before live use:

```
1. Cloudinary public ID confirmed in inventory
2. AI tag / room tag reviewed (starting point only)
3. Visual confirmation: does the image actually show that room / feature?
4. Matterport or floor-plan cross-reference if room location is uncertain
5. Rachel approval for signature, hero, and evidence-layer images
6. Cleared for live site use
```

### Rules

- Do not publish room-specific claims based solely on AI tags.
- A staircase shot from the foyer will be tagged room_foyer by AI. Verify.
- A pool shot tagged room_pool may actually be a twilight facade. Verify.
- Mislabel corrections must be proposed first, documented in the Photo Truth Layer file, and applied only in a separate approved Cloudinary tagging ticket.
- Never rename, retag, move, delete, or overwrite Cloudinary assets without a dedicated approved tagging ticket.
- Every future property build gets a Photo Truth Layer document before final room section build.

### What Matterport Can Verify
- Room name and location in the floor plan
- Room adjacency and flow
- Whether two photos show the same space from different angles
- Whether a feature belongs to Kitchen vs. Butler's Pantry vs. Back Hall
- Balcony connections and circulation paths

### Signature Image Approval
- Hero images: Rachel approval required before lock
- Jewel Box / Mirror Bath: Rachel visual confirm required — do not label without confirmation
- Blue Fox / Dumaine: Rachel confirm content and rights before public use
- Archival / letter images: Rachel confirm authenticity and rights before any live use

### Reference Files
- Photo Truth Layer: `.agents/photo-maps/GARRAN_HILL_PHOTO_TRUTH_LAYER_v1.md`
- Tag correction queue: documented in Truth Layer — apply separately
- Applies to: Garran Hill ✓ (audited 2026-05-10), Flow Farm (next build), every future property

---
---

## APPENDIX — BANNED PHRASES (universal)

These phrases are banned across all Rachel Studio properties:

> nestled, boasts, charming, stunning, elegant, cozy, spacious, beautiful, luxurious, features, offers, provides, showcases, perfect for, ideal for, rare opportunity, dream home, one-of-a-kind, you won't find, don't miss, priced to sell, motivated seller

Plus property-specific banned phrases documented in each property's Fact Guardrails.

---

## VERSION HISTORY

| Version | Date | Notes |
|---|---|---|
| v1.0 | 2026-05-10 | Initial standard — distilled from Garran Hill proof of concept |
| v1.1 | 2026-05-10 | Added Section 11: Photo Truth Layer — AI tags are starting point, not truth |

*Next update: when Flow Farm proves or improves a pattern.*
*Maintained by: Rocky. Approved by: Rachel.*
