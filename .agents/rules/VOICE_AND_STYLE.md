# VOICE & STYLE — GARRAN HILL + FLOW FARM
# Law of the page. Read before touching a single word.
# Last updated: 2026-05-01

---

## THE CORE PRINCIPLE

**Truth is the seduction.**

This is not marketing copy. This is revelation. The house already exists. It has a story that is stranger and more beautiful than anything we could invent. Our job is to surface it — not dress it up.

The buyer is smart, literate, and suspicious of effort. They will feel the difference between a page that is selling at them and a page that is trusting them with something. Write for the second feeling, always.

**Seductive but with truth.** Never one without the other.

---

## THE VOICE

### What it sounds like
- A trusted friend who happens to know everything about the property
- A magazine editor who loves architecture and has done the research
- A historian who knows how to write for civilians
- Someone who is proud of this house and shows it through restraint, not enthusiasm

### What it does NOT sound like
- A listing agent
- A brochure
- A travel review
- Anyone who uses the word "nestled"

### Tone by section
| Section | Tone |
|---|---|
| Hero | Monumental. Spare. One sentence max. |
| KB Gate | Poetic. Time-collapsing. The gap between 1916 and now. |
| Threshold | Intimate. This is a moment, not a feature. |
| Architecture / Rooms | Precise. Name the material. Name the year. Trust the detail. |
| WHP History | Journalistic. Tragic. Let the facts carry the weight. |
| Grounds | Expansive. Quiet. Almost reverent. |
| Closing | Direct. Final. No hedging. |

---

## BANNED WORDS — ABSOLUTE PROHIBITION

Never use these. Not once. Not ironically. Not in subtext. If you catch one, delete it.

```
nestled        boasts         charming       stunning
elegant        cozy           spacious       beautiful
luxurious      features       offers         provides
showcases      sprawling      breathtaking   magnificent
exquisite      impeccable     meticulously   perfectly
ideally        conveniently   rare find      one-of-a-kind
once-in-a-lifetime             dream home    turnkey
```

### Why
These words are signals that the writer doesn't trust the house. The house doesn't need them. Every time you reach for one of these words, stop and ask: what is actually true here? Write that instead.

---

## LOCKED COPY MOMENTS — DO NOT REWRITE

These lines are final. They have been approved and locked. Do not paraphrase. Do not improve. Do not "tighten."

```
[Hero]          "Some houses hold history. This one shaped it."
[Closing]       "Garran Hill is ready. It is offered now for the first time."
[Threshold]     "The door has been open since 1916."
[Drawing Room]  "Fire going, no one home yet."
[WHP]           "The farm — the farm — the farm."
[WHP last]      "Well, Frank, I did get here after all, didn't I?"
[Blue Fox]      "Someone still puts flowers there."
[Trees/KB]      "In 1916, those were saplings. Now they are a forest."
[Grounds]       "The world outside these gates does not exist here."
[Kitchen]       "White cabinetry. Dark granite. Island. Four windows. Room to cook."
[Hero subhead]  "Neo-Georgian.  Walter Hines Page.  110 years of unbroken stewardship."
[KB headline]   "Some houses hold history. / This one shaped it."
```

If you need to write around one of these, write around it. The lock does not move.

---

## STRUCTURAL RULES

### The narrative spine — LOCKED
Hero → KB Gate → Intro → Craftsmen → Threshold → Entry Hall → WHP → Rooms → Plans & Tour → Grounds → In Print → Dumaine → Restoration → Systems → Closing

Do not reorder. Do not skip. Do not add sections without approval.

### Section principles
1. **One idea per section.** A section that tries to do two things does neither.
2. **Statement before evidence.** Lead with the claim, follow with the proof.
3. **Exit gracefully.** Every section should close on something that makes the reader want to scroll.
4. **Never crowd a face, roofline, horizon, flame, or doorway.** Text and photography are in conversation — give each other room.

---

## TYPOGRAPHY RULES

### Hierarchy
- Display / Hero: Pinyon Script or Cormorant Garamond, weight 200–300
- Section headlines: Cormorant Garamond, weight 200–300, italic for emphasis
- Body: Cormorant Garamond, 1rem–1.15rem, line-height 1.75–1.9
- Eyebrows / labels: Cormorant Garamond or system sans, 0.65–0.75rem, letter-spacing 0.25–0.35em, uppercase
- Pull quotes: Cormorant Garamond italic, larger, centered, gold accent

### Color
- Dark background: `#0a0a0a`
- Gold: `#C9A96E`
- Cream: `#F5F0E8`
- Never use pure white (`#ffffff`) for body text — use cream or rgba(245,240,232,0.85)

### Never
- System fonts for display type
- Bold weights above 400 in display copy
- All-caps for anything longer than 6 words
- Centered body paragraphs (more than 2 lines)

---

## MOBILE-FIRST RESPONSIVE RULES

### Breakpoints
```
Mobile:  375px  (default — write for this first)
Tablet:  768px
Desktop: 1280px
```

### Typography scaling
All display type uses `clamp()`. No fixed px sizes for headlines.

```css
/* Hero display */
font-size: clamp(3.5rem, 10vw, 9rem);

/* Section headline */
font-size: clamp(2.2rem, 4.5vw, 5.8rem);

/* Body */
font-size: clamp(1rem, 1.2vw, 1.12rem);

/* Eyebrow */
font-size: clamp(0.6rem, 0.9vw, 0.75rem);
```

### Layout
- Stack columns to single column at 768px and below
- Stat bar stacks vertically on mobile, horizontal on desktop
- Hero text block: full width on mobile, 50% left-anchored on desktop
- Padding: `clamp(24px, 6vw, 80px)` for section padding
- Images: `object-fit: cover` with explicit `aspect-ratio` — never unconstrained height

### Touch targets
- All interactive elements: minimum 44px tap target
- CTA buttons: minimum 48px height, 200px width
- Nav links: 44px height minimum

---

## CONVERSION RULES

### CTA placement
1. **No CTA in the hero.** The hero is a statement. It does not beg.
2. **First CTA appears after the first room sequence** (approximately 40% scroll depth).
3. **Closing section always ends with a CTA** — this is the only mandatory placement.
4. **CTA language:** Never "Contact us" or "Schedule a showing." Use language that respects the reader's intelligence:
   - "Arrange a private viewing"
   - "Request the full property report"
   - "Begin a conversation with Rachel"

### Price visibility
- Price is always visible in the stat bar — `$4,250,000` spelled out in full, no abbreviation ($4.25M is not acceptable)
- No label on the price line. "$4,250,000" alone reads classier than "$4,250,000 List Price"
- Stat bar is sticky on desktop — price is always in peripheral vision while scrolling
- On mobile: stat bar appears below hero, pinned. Price must be readable at 375px.

### Forms and friction
- No pop-up forms. Ever.
- No email capture gates before content.
- No autoplay audio or video with sound.
- Inquiry forms are minimal: name, email, phone (optional), message (optional).
- The call to action is a human conversation — not a lead capture.

### Social proof
- Sotheby's International Realty brand mark: footer only, tasteful size
- No testimonials on property pages — they are not appropriate here
- National Register candidacy is a narrative fact, not a badge

---

## HISTORICAL ACCURACY RULES

These are not style preferences. These are facts. Getting them wrong breaks trust.

### Walter Hines Page
- Born Cary, NC
- Ambassador to the Court of St. James, 1913–1918 (NOT "British ambassador")
- Bought approximately 1,000 acres in February 1913
- Son Ralph supervised construction
- Completed 1915–16
- Returned from London December 1918; died ten days later
- **Never spent a single night at Garran Hill** — this is the central tragic fact

### Elizabeth 'Betty' Dumaine
- Residency: 1959–1984
- Attended Edith Johnson School, Cambridge, MA
- Lifelong friendship with the Princess Mother of Thailand (Srinagarindra) — correct title, not "Queen"
- Thai royal family had established ties to the property
- Correct spelling: Dumaine (not Demaine)
- Horse: Blue Fox. Buried on grounds.

### The property
- Built by Leonard Tufts' craftsmen — same men building Pinehurst (founded 1895 by James Walker Tufts)
- 4.15 acres (current) — part of original ~1,000-acre Page family timberland
- "GARRAN HILL · 1916" inlaid in threshold brick
- Living room enlarged for dancing — do NOT call it a 1916 room in its current proportions
- Library designed 2000 by Thomas O'Shea
- Heart-pine floors: KITCHEN ONLY. Rest of house is original solid oak.

---

## HARD RULES — NEVER VIOLATE

1. **Never name Ann McAllister or Dr. Russell McAllister** anywhere on the site or in any public copy.
2. **Never name David Prest** on the site (Study millwork).
3. **Never market the tennis courts** — they are deteriorated.
4. **Never use 'steward', 'owner', or personal owner perspective** in copy.
5. **Never use 'nestled'** (see banned words, but worth repeating).
6. **Never use 'once-in-a-lifetime'** or any claim the buyer can feel is manufactured.
7. **Never link buyers to rachelhernandez.studio** — that is the private platform workspace.
8. **Never approximate a historical fact** — verify first or omit.

---

## FLOW FARM — VOICE NOTES

Flow Farm has a different register than Garran Hill. Less history, more intensity. The property is operational — it does things.

- Voice: precise, slightly technical, quietly astonishing
- The numbers do the work: 15 acres, 7 buildable, 30kW generator, 20 geothermal wells
- Infrastructure copy style: spare, declarative, no verbs
  - ✅ "143 lighting circuits. Some of them are these trees."
  - ✅ "The electrical capacity of a small hotel."
  - ❌ "The home features an impressive smart home system."
- The farm is not a hobby. It is USDA registered, veganic certified, 40+ crops. Write it that way.
- Pinehurst CC Golf Membership transfers — mention once, factually, no fanfare

---

## QUICK REFERENCE — DECISION FRAMEWORK

Before any word, image, or design decision ships, run these five tests:

| Test | Keep | Cut |
|---|---|---|
| Earnest or salesy? | Earnest | Salesy |
| True or staged? | True | Staged |
| Respects or condescends? | Respects | Condescends |
| Proud to share? | Yes | No |
| Would they miss it if gone? | Yes | No |

If you're unsure: cut it. The house speaks for itself.

---

*This document is part of the rachel hernandez studio system.*
*Master Brief: .agents/rules/MASTER_BRIEF.md*
*Decision records: .agents/decisions/*
*Workflow: .agents/rules/WORKFLOW.md*
