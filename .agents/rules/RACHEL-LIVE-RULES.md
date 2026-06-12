# RACHEL'S LIVE RULES — single property sites
## The living law. Updated by Coco the moment Rachel says something new.
## Last updated: 2026-06-12

This file SUPERSEDES every older brief, "locked" doc, master brief, and
hard-rules list. Rachel, June 12 2026: "there are no hard rules like i told
you, with exception to citations and the mls facts. every brief was a work
in progress with things wrong."

---

## 0. THE RULE HIERARCHY (the only fixed things)

1. **MLS / FlexMLS facts** — price, beds, baths, SF, acreage, year, address,
   status, remarks. Never altered, never rounded, never "improved."
2. **Verified citations** — CITATIONS.md claims with sources. Nothing
   historical publishes without one.
3. **Everything else is open** and answers to current Rachel only. Old
   briefs are compasses, not law. When an old "rule" conflicts with what
   serves the sale, ask Rachel, one question at a time.

## 1. WHAT THE SITE IS (Rachel, 2026-06-12)

> "A single property luxury website on crack."

- It must do everything a buyer expects from any serious listing
  experience: effortless navigation, fast loads, obvious inquiry path,
  gallery depth, floor plans, location context, working on every device.
- AND it must go past what single property sites normally offer. The
  category is limited; this one is not. Cool galleries for the room
  sections. Cinematic story. Provenance as the comp-killer.
- Goal in her words: "the most incredible and bad ass one... to really
  step up what a single property website offers normally."
- Ease of use is a feature of luxury. Nothing clever at the cost of clear.

## 2. RESPONSIVE LAW (Rachel, 2026-06-12)

> "Everything must be responsive sized and optimized for all screens and
> ideal for the spaces provided within each viewport."

- Every text element sits on the locked type scale (tokens below). No
  ad-hoc font sizes. No two sections inventing their own scale.
- Every section is designed for the space it occupies in EACH viewport:
  desktop, tablet, 375px phone. Not desktop squeezed down.
- 375px check is mandatory before showing Rachel anything.
- No pinching, no horizontal scroll, 44px tap targets, body copy never
  below 1rem on mobile.

### The locked type scale (Global Standard v1 §III)
```css
--text-xs:   clamp(0.65rem, 0.8vw,  0.75rem)   /* labels, eyebrows */
--text-sm:   clamp(0.85rem, 1.1vw,  1.0rem)    /* captions, small body */
--text-base: clamp(1.05rem, 1.2vw,  1.18rem)   /* body */
--text-md:   clamp(1.3rem,  2vw,    1.7rem)    /* subheads */
--text-lg:   clamp(1.9rem,  3.2vw,  3.0rem)    /* section titles */
--text-xl:   clamp(2.8rem,  5.5vw,  5.2rem)    /* large display */
--text-hero: clamp(6rem,    19vw,   17rem)     /* hero name */
```
Body: 1.72 line-height, 62ch max. Captions: --text-sm, 0.12em tracking.
Hero/stat-bar/crest art direction may deviate deliberately; nothing else may.

## 3. PHOTO DELIVERY LAW (Rachel, 2026-06-12)

> "All the photos need to be from cloudinary responsive sized."

- Every image serves from Cloudinary with `f_auto,q_auto,c_limit,w_{n}`.
- Every content photo carries a 5-step srcset (480/768/1080/1440/1920) and
  a `sizes` attribute. No raw uploads in src, ever.
- Chrome assets (crest, seal) capped at their display size.
- No photo huge in one place and cut off in another: each placement gets
  object-fit + object-position that protects the photo's point (the
  must-keep edge: threshold stone, fanlight, fireplace).
- `loading="lazy"` below the fold; above-fold images preloaded.

## 4. COPY LAWS (current, from Rachel directly)

- **NO DASHES** in copy, meta, or alt text. No em dashes, no double
  hyphens. Restructure with periods, commas, or line breaks. (June 2026.)
- **Never name the sellers** (the McAllisters, any spelling). "The current
  stewards."
- **Tennis courts are a SELLING POINT** (June 12 2026). Two private courts,
  marketed proudly. The only required honesty: they need resurfacing.
  The old "never market the tennis" rule is dead.
- CTA: **"Request Private Showing."**
- Banned-word lists from old briefs remain good instinct (no nestled /
  boasts / stunning / charming filler), but the test is Rachel's ear, not
  the list.
- Do not sell. Reveal. AD/Vogue register, never cheesy.

## 5. MEDIA LAWS (standing, June 2026)

- Heroes loop seamlessly, designed as a circle. Visible restart = rejected.
- AI may MOVE real footage and photos. AI never GENERATES imagery for a
  listing.
- Never build from compressed copies; cut from the 4K/ProRes masters.
- Gate photos stay out of the hero; the hero opens and closes on the facade.

## 6. PROCESS LAWS

- Save is not publish. Production publish is Rachel's hands only.
- Every change commits to GitHub immediately and deploys to the dev URL.
- Coco QAs her own work (motion QA, 375px check, live verification)
  BEFORE showing Rachel. Rachel sees finished candidates, not drafts.
- Decisions come to Rachel one at a time, as screening rooms, never as
  filename lists. Once she rules, it locks.
- When Rachel states a new rule in chat, Coco writes it into THIS file in
  the same work session. That is what keeps this file the law.

---

*One file. Current Rachel only. Everything else is history.*
