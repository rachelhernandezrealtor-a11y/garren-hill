# THE PROPERTY WORKFLOW
# Version 1.0 — Locked 2026-04-27
# This is the standard. Every property follows this. No exceptions.

---

## WHAT THIS IS

This is not a template. It is a methodology.
The thing that makes a property site great is not the code.
It is the process that produced the code.

Lock the process. Every property gets built at the same level.
The only thing that changes is the theme.

---

## THE FIVE STEPS

### STEP 1 — PROPERTY BRIEF
Before anything else exists, the brief exists.

The brief answers:
- What are the locked facts? (price, beds, baths, SF, acreage, year built)
- What is the architectural truth? (style, builder, restoration history)
- Who built it and what did they carry? (the human story behind the property)
- What is the haunting detail? (the one thing that doesn't let go — Blue Fox equivalent)
- What is the theme? (the emotional truth of this house in one sentence)
- What are the banned facts? (anything that must never appear)
- What are the locked copy moments? (lines already written and approved)

The brief is written BEFORE photos are selected.
The brief is written BEFORE copy is drafted.
The brief is written BEFORE code is touched.

**Deliverable:** PROPERTY_BRIEF.md — locked, signed off by Rachel.

---

### STEP 2 — PHOTO PASS
No copy is written until the photos are chosen.
No photo is chosen until it has been seen.

Protocol:
1. Query PropertyPhoto entity by ai_room / ai_category
2. Pull top candidates for each scene in the arc
3. Pass candidates to GPT-4o vision — actually look at them
4. Select based on what the photo SHOWS, not filename or metadata
5. Upload winner to Cloudinary with correct prefix
6. Record selection in PHOTO_SELECTIONS.md

**Rule:** Rocky does not place a photo it has not seen. Every time. No exceptions.

The photo pass produces a scene-by-scene image map:
- Scene name → Cloudinary URL → what the photo shows → why it earns the copy

**Deliverable:** PHOTO_SELECTIONS.md — one entry per scene, locked before Step 3.

---

### STEP 3 — COPY DOCUMENT
The full story written top to bottom as a script.
Not inside code. Just the words, in order.

Structure follows the 14-beat arc (see below).
Every section gets:
- Eyebrow (section label)
- Headline (the emotional truth — never a spec)
- Body (1–3 sentences maximum — facts only if they earn feeling)
- Bridge line (the last line of the section that causes the next section)

Rules:
- No specs inside emotional sections
- History arrives AFTER the buyer has felt the house
- The haunting detail gets its own breath — never buried in body copy
- Price appears only in: stat bar, inquiry modal, twilight caption
- Banned words: nestled, boasts, charming, stunning, elegant, cozy, spacious,
  beautiful, luxurious, features, offers, provides, showcases

**Deliverable:** COPY_DOCUMENT.md — read top to bottom like a script.
Rachel reads and approves before Step 4.

---

### STEP 4 — DESIGN BUILD
One clean file. Story-first. Built from scratch, not patched.

**Design Laws (non-negotiable):**
- Colors: DARK #0a0a0a / GOLD #C9A96E / CREAM #F5F0E8
- Typography: Cormorant Garamond (all weights) + Pinyon Script (title only)
- No frosted glass cards. Ever.
- Words float on images — no boxes, no borders
- Interstitials: #0a0a0a bg, naked text, gold rule above AND below
- Photo on photo = never. Every cinematic section needs a breath between.
- Body text opacity: 0.78 minimum
- Fade: 14px translateY, 1.8s, cubic-bezier(.16,1,.3,1)
- Inquiry modal: gold border, "Request Private Showing",
  "All inquiries held in strict confidence"
- Footer: "Offered Exclusively By", agent name, Sotheby's in gold
- Custom cursor: gold dot + ring, mix-blend-mode difference
- Grain texture: 3–4% noise overlay on dark sections
- Stat bar numbers: count-up animation on scroll entry

**Section Components (reusable across properties):**
- Hero: full-bleed video, script title, eyebrow, stat bar at bottom
- Cinematic: 50/50 split — editorial text left, image right (or flipped)
- Interstitial: centered, dark, gold rules, one idea only
- Breath: single italic line, low opacity, no section wrapper
- Full Bleed: image covers 100%, text floats, overlay gradient
- WHP-style Portrait: full bleed bg, heavy left gradient, editorial text over
- Blue Fox-style Moment: centered, no image, just the words
- Closing: twilight image, seal, script title, price, CTA

**What changes property to property:**
- The theme
- The history section (who built it)
- The haunting detail section
- The imagery
- The closing line

**What never changes:**
- The design laws
- The section components
- The arc structure
- The copy rules

**Deliverable:** [PROPERTY]_V1.html — single file, clean build.
Deployed to Cloudflare Pages, GitHub tagged, master file synced.

---

### STEP 5 — DEPLOY + PROTECT
1. Build the static file (Vite or direct HTML)
2. Push to GitHub repo for the property
3. Cloudflare Pages picks up automatically
4. Run cache purge: `bash /app/.agents/skills/purge_cloudflare.sh [property]`
5. Visual review via browserbase — screenshot every section
6. Git tag: `v1.0-approved-YYYYMMDD`
7. Sync master file: `cp dist/index.html /app/.agents/[PROPERTY]_MASTER.html`
8. Log to CHANGE_LOG.md

---

## THE 14-BEAT ARC

This is the narrative spine. Every property follows this arc.
The beats are named for their emotional function, not their content.
Content changes. Function never changes.

**Beat 1 — HERO**
The hero answers one question: what is the single thing that makes a buyer stop?
That answer comes from the brief — not from a generic rule.

For Garran Hill: the history IS the identity.
"Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship." stays in the hero.
A buyer who doesn't know WHP Googles him in 30 seconds. The house becomes something else entirely.
The name is the seduction. It belongs at the top.

For Flow Farm: the land and what's been built on it is the identity. No founder in the hero.

Rule: No spec lists. No bed/bath count. One line of emotional truth. The video does the rest.

**Beat 2 — THE ARRIVAL**
Something has been here longer than you.
Architecture only — the form, the proportion, the weight.
No specs. Bridge line: something that makes you want to go closer.

**Beat 3 — CONNECTIVE BREATH (Interstitial)**
One fact, exploded. The craftsmen. The builder. The provenance.
One idea. Gold rules. Nothing else.

**Beat 4 — THE THRESHOLD**
The door opens. The poetry of crossing.
Hardware. Glass. The devotion of preservation.
Bridge: "The house begins here."

**Beat 5 — THE INTERIOR**
You are inside before you've processed it.
The axis of the house. The floors. The proportions.
One architectural fact. Rest is feeling.

**Beat 6 — THE SIGNATURE ROOM**
The room that defines the house emotionally.
Fire going. No one home yet.
Let the image carry. One sentence maximum.

**Beat 7 — THE REWARD ROOM**
The room you don't leave quickly.
The quote is the HEADLINE — earned, not previewed.
This is where the buyer slows down.

**Beat 8 — BREATH BETWEEN ROOMS AND HISTORY**
One naked line. Low opacity.
Something that closes the house tour and opens the history.
"Seven rooms. Seven fireplaces. One house that has never forgotten who it is."

**Beat 9 — THE SUITE**
Brief. Intimate. The private world inside the house.
The buyer imagines living here.

**Beat 10 — HISTORY ARRIVES**
First time the builder/founder is named.
The buyer has already fallen for the house. NOW they learn who built it.
The surprise is the seduction.

**Beat 11 — THE PORTRAIT**
Full bleed. The face. The story.
The longing. The thing they never got to see.
The quote that lands like a door closing.

**Beat 12 — THE GROUNDS OPEN**
Coming out of history, you step outside.
The saplings line (or equivalent) lives HERE — as the entrance to the grounds.
The passage of time made visible.

**Beat 13 — THE HAUNTING DETAIL**
Its own breath. No image. Just the words.
The detail that doesn't let go.
Betty Dumaine / Blue Fox equivalent for every property.
Last line is always the one that stays.

**Beat 14 — THE CLOSE**
Twilight image. The seal. The script title. The price.
One sentence that earns everything that came before it.
"It is ready for the fifth family."
Request Private Showing.

---

## WHAT CHANGES PROPERTY TO PROPERTY

| Element | Garran Hill | Flow Farm | Next Property |
|---|---|---|---|
| Theme | Neo-Georgian. 110 years of stewardship. | Agritourism earned. Legacy ready. | TBD |
| Haunting Detail | Blue Fox. Someone still puts flowers. | Mark started in 2009. He didn't find the zoning. He earned it. | TBD |
| History Beat | Walter Hines Page never slept here. | 15 years of farm infrastructure. | TBD |
| Closing Line | It is ready for the fifth family. | The system is already running. | TBD |
| Signature Room | Drawing room. Delft fireplace. | The farm kitchen / scullery. | TBD |
| Reward Room | The library. | The racquetball court / cabana. | TBD |

---

## FLOW FARM — CURRENT STATUS
Theme: Agritourism Established. Legacy Ready.
Haunting Detail: Mark started in 2009. Earned the zoning. Didn't find it.
Closing Line: The system is already running. The buyer inherits it.
Follows: Same 14-beat arc. Same design laws. Same five steps.
Next Action: Step 2 (Photo Pass) — pending Garran Hill V1 approval.

---

## THE RULE IN ONE SENTENCE

The brief knows the truth.
The photos earn the copy.
The copy earns the code.
The code earns nothing on its own.

---

## WHAT WE KNOW WORKS

- 14-beat arc — story causes itself forward
- Interstitials as bridges, not decorations
- History after feeling, never before
- Haunting detail in its own breath
- Photo selection before copy always
- One clean file from scratch, not patched
- Git tag every approved version
- Cloudflare purge after every deploy
- Master file synced after every deploy

## WHAT WE KNOW BREAKS

- Patching existing code instead of rebuilding
- Assigning photos by filename or memory — never by vision
- Spec dumps inside emotional sections
- Introducing the founder in the hero
- Building before the copy document exists
- Deploying without purging Cloudflare cache
- More than one Cloudflare project per property

---

*Last updated: 2026-04-27*
*Rocky + Rachel — Sotheby's International Realty, Pinehurst NC*
