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

## 1b. THE CONNECTION PRINCIPLE (Rachel, 2026-06-12)

> "I want to always do things like that to show what connects. It really
> helps a buyer understand the feel of the house."

- When copy or a caption names a connected space (French doors to the
  terrace, kitchen to breakfast room, butler's pantry to dining room,
  spiral stair to the office), the imagery should CARRY the buyer there:
  a quick classy fade through to the connected space and back.
- The house is a flow, not a stack of rooms. Imagery moves the way a body
  moves through the house. Doors go somewhere.
- This is a signature move of the template ("the passage"), reusable on
  every property.

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
- **VERTICAL PHOTO LAW (Rachel, 2026-06-12): vertical (portrait) photos are
  paired and used appropriately.** A lone vertical stretched into a
  landscape slot is a violation. Verticals run as side-by-side pairs
  (diptych), or as a deliberate single editorial moment sized for their
  orientation. Slot orientation must match photo orientation — the photo
  map's recorded dimensions say which is which; check before placing.

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
- **THE CORE THEME (Rachel, June 12, verbatim):** "The house was not built
  for spectacle. It was built for coming back." Every act, every photo
  choice, every line answers to this. Return, not arrival. Homecoming,
  not impression. The whole page is the buyer being shown a house that
  was always waiting for someone.
- **THE VOICE SHAPE (Rachel, June 12, her own example):** "Some houses are
  built for arrival. Garran Hill was built for return." Setup, turn,
  silence. Short declaratives that reverse an expectation and stop. Never
  explained, never decorated, never followed by a line trying to top it.
- **THE HAUNTING THREAD (Rachel, June 12):** the ARCHITECTURE IN GENERAL
  is woven through everything "in the sneakiest realest way... truth,
  haunting almost." The physical truth of the house surfaces inside other
  sentences: the brick, the proportions, the millwork, the mantels, the
  fanlights, the oak, the craftsmen. NO REPEATING — each detail appears
  ONCE, in the one place it lands hardest, then never again. Never a
  specs paragraph. Always MLS-cited truth.
- **MAIN PAGE vs /history (Rachel, June 12):** the main page is written
  for the buyer, not for historians. WHP and Dumaine's full stories live
  on /history (the backlink engine). The main page spends history in
  single devastating drops, then hands the buyer back to the house. Lead:
  the house, tied to WHP through the then/now fade. The craftsmen line —
  "the same craftsmen who built Pinehurst built this house" — is the
  hinge into the architecture. Garran Hill being IN Pinehurst is a big
  deal; the name does quiet work.

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
- **LOOK AT THE PAGE after every change.** If it doesn't look right, it is
  not okay. Verified URLs and green checks are not the same as eyes on the
  page. (Rachel, June 12, after the Cloudinary 400 incident.)
- **When Rachel sends an asset, link, or fact in chat, it gets filed into
  FACTS.md / the spine IMMEDIATELY**, same turn. Chat is not storage.
  (June 12: the Matterport link had been sent before and was not filed.)
- Decisions come to Rachel one at a time, as screening rooms, never as
  filename lists. Once she rules, it locks.
- When Rachel states a new rule in chat, Coco writes it into THIS file in
  the same work session. That is what keeps this file the law.

---

*One file. Current Rachel only. Everything else is history.*

## WHP TRUTH LAW (Rachel + CITATIONS.md, 2026-06-14)
BANNED, the whole category: any claim about what Walter Hines Page NEVER did at
the house. "He never spent a night here," "he never came home to it," "never made
the house his own" are ALL banned overclaims — we do not know and cannot assert a
negative absolute. The retired-phrase list is not the point; the NEGATIVE ABSOLUTE
is the point. Do not state one in any wording.
What we CAN say (cited, Bill Case / PineStraw, CITATIONS.md): Page commissioned
the house from London; his son Ralph supervised the build and made the farm his
home; Walter and Alice rented Currituck Cottage in Pinehurst; Walter resigned the
embassy, sailed home gravely ill autumn 1918, arrived Aberdeen station Dec 11 1918,
and died Dec 21 1918 at Currituck Cottage in Pinehurst. Safe framings: "His son
built it and lived in it," "he commissioned it from London and sent his son Ralph
to build it." Westminster Abbey tablet: cited and safe. EVERY historical line
traces to CITATIONS.md before it ships. Read citations before writing history.

## ROOM-NAMING + ARCHITECTURE TRUTH LAW (FlexMLS, mls-listing-truth.md, 2026-06-14)
The FlexMLS listing description is the authority for room names and architectural
detail. Use ITS language — the descriptions are already beautiful; do not invent.
- THE DRAWING ROOM (not "living room" / not "salon"): nearly forty feet, two
  sitting areas, Federal style carved mantel, dark marble surround, coffered and
  paneled ceiling, arched built in bookcases, French doors to the rear brick terrace.
- THE SITTING ROOM: spiral staircase + Delft tile fireplace.
- THE DINING ROOM: fireplace, original 1916 frontispiece, arched shell cabinets.
- THE LIBRARY: floor to ceiling shelving.
- THE KITCHEN: reclaimed heart pine floors, custom white Shaker cabinetry, glass
  front display cabinets, black granite counters, professional stainless range with
  hood, full size stainless refrigerator, custom pullout pantry, kitchen desk,
  breakfast sitting area with chinoiserie toile wallpaper. Butler's pantry with farm
  sink and butcher block counter.
- PRIMARY SUITE (first floor, full depth, a private wing): fireplace, paneled
  wainscoting, restored oak floors, detailed millwork, two dressing rooms (one with
  custom arched built in wardrobe closet, one walk in with direct bath access). Bath:
  divided light windows, garden views, jetted tub beneath the windows, marble
  counters, stone tile walk in shower with dual rain heads and hand shower, French
  doors to the grounds.
- SECOND FLOOR: three bedrooms each with a fireplace, three full baths, two more
  jetted tubs, balcony access, large office/den connected to the spiral staircase.
- BASEMENT: stone walled four room, partially developed, climate controlled.
- GROUNDS: saltwater pool in a brick walled garden; rear brick terrace (from dining
  room and drawing room); two lighted regulation tennis courts (need resurfacing);
  mature longleaf pines, three American plane trees planted 1959, camellia garden,
  Grandiflora magnolias, dogwoods, hollies, azaleas, dwarf nandinas, a signature
  autumnalis tree, iris specimens; The Wee Cottage children's playhouse; well house.
- Brick: rare handmade red brick, traditional Flemish bond, over a classic water
  table. Matching the historic brick took three months of curation.
The MLS description is the single richest source of true architectural language.
Quarry it for the woven story; never fabricate a detail it doesn't contain.

## MLS IS FACT, NOT PROSE LAW (Rachel, 2026-06-14)
The FlexMLS description is the FACT authority — room names, materials, dimensions,
what exists. It is NOT the voice. Never lift its listing cadence onto the site.
Strings like "stone tile walk in shower with dual rain heads and hand shower" or
"divided light windows" are spec-sheet language and must NEVER appear as site
prose. Pull the TRUTH from MLS, then write it in Rachel's editorial voice:
setup/turn/silence, short declaratives, the detail surfacing inside the living,
never a feature list. Fact from MLS, voice from Rachel. Two different jobs.

## SELL THE HOUSE LAW (Rachel, 2026-06-14)
The website's JOB is to sell the house and convey its features. Editorial voice
serves that goal — it is not decoration. The balance: voice that makes the
FEATURES land harder, never poetry that buries them. A buyer must finish each
section knowing what they are actually getting (the forty-foot drawing room, the
seven fireplaces, the two dressing rooms, the saltwater pool, the heart pine
kitchen, the two courts). Beautiful sentences that forget to sell are a failure.
Every act earns its keep by leaving a concrete, desirable feature in the buyer's
mind, delivered in Rachel's voice. Reveal the feature; do not just admire it.

## TYPOGRAPHY-AS-ART LAW (Rachel, 2026-06-14, REVISED 2026-06-14)
> "Use text AROUND the photos, not on top of the photos. You must look at the
> photos and it must be laid out editorially."

CORRECTION to the earlier over-the-photo approach: text-ON-photo (the .epic
overlay) is NOT the default and is mostly retired. The signature is EDITORIAL
LAYOUT, the way a magazine sets a feature:
- Text sits BESIDE, ABOVE, or BELOW the image in its own column or block, not
  overlaid on it. The photo is art; the words frame it, they do not cover it.
- Asymmetric magazine spreads: image left + text right, full-bleed image then a
  caption block beneath, a tall portrait beside a narrow text column, a wide
  landscape with a single line set under it. Vary the rhythm down the scroll.
- COCO MUST LOOK AT EVERY PHOTO before placing it (vision on the Cloudinary URL).
  Orientation (portrait vs landscape), what the photo actually shows, where the
  light and the subject sit — all decide which layout slot it earns and what the
  text beside it should say. Never place a photo blind.
- Overlay text is allowed ONLY where it is unavoidable and earns it (a single hero
  line, an act divider), always with a scrim. Everywhere else: text around, photo
  clean.
- Vertical photos pair or stand as a deliberate editorial single, sized for their
  orientation. A landscape gets a wide slot. Match slot to what the photo IS.

## TYPOGRAPHY-AS-ART (original note retained below)
> "Text over photos. We need to have beautiful typography."

The media is art, and the words live ON the art, not in boxes beside it. The
signature move of this site: large editorial display type set directly over
full-bleed photography, the way a magazine opens a feature.
- Display serif (Cormorant Garamond) at hero/section scale, set over a darkened
  or gradient-veiled photo so the type always reads. Never type on a busy/light
  area without a scrim.
- The setup/turn/silence voice carries here too: a short line, the gold italic
  turn, silence. Text-over-photo is for the LANDING lines of a movement, not for
  paragraphs (long copy stays in the quiet reading columns).
- Locked type scale still governs (Global Standard v1 §III). Hero/section
  display may use --text-xl / --text-hero; captions stay --text-sm with tracking.
- Every text-over-photo block must pass the 375px check: type reflows, scrim
  holds, nothing clipped.
- This is the through-line that makes the whole scroll feel like one magazine.

## THE MAGAZINE-AND-LISTING LAW (Rachel, 2026-06-14)
> "Think of how a magazine would tell the story. We need a narrative, then still
> needs the normal sections a buyer expects to find."

The page is BOTH, in this order of priority:
1. A flowing magazine feature (Pinestraw / AD / Vogue register) that TELLS THE
   STORY and SELLS THE HOUSE. The features (O'Shea restoration, celadon millwork,
   heart-pine kitchen, Delft sitting room + spiral stair, Federal mantel, brick
   terrace, saltwater pool, two courts, 28-zone irrigation) are WOVEN INTO the
   narrative the way a magazine threads them: a detail surfaces inside a sentence
   about living there, never a spec dump. The story is the selling.
2. AND the normal sections a serious buyer expects, present and easy to find:
   facts/stats, full gallery, floor plans, virtual tour, location, inquiry. These
   reassure and let a buyer verify. They do NOT replace the narrative; they sit
   beneath it as the reference layer.

The feature authority is features-sheet.md (filed from Rachel's PDF, 2026-06-14).
Every woven detail must trace to a line there or to FACTS.md / FlexMLS.
A buyer should be able to fall into the story OR jump to the section they need.
Neither mode is sacrificed for the other.

## HIGH-TECH GALLERY LAW — THE WHOLE POINT (Rachel, 2026-06-14)
> "Remember we want it high tech that was the point to have impressive galleries."

The impressive, high-tech gallery experience is the REASON this site exists.
It is the comp-killer, the thing single-property sites never do. Never flatten
a gallery into a plain static grid to "fix" a problem. A grid is a retreat.

- The fix for a DUPLICATE walk is never "make it a boring grid." It is to give
  the second gallery a DIFFERENT high-tech job (a curated archive viewer, a
  cinematic screening room, a filterable lightbox wall with motion), not to
  re-narrate the same rooms and not to dumb it down.
- Redundancy = remove the repetition. Never remove the craft.
- When in doubt, the galleries get MORE impressive, never less. Motion,
  lightbox, Ken Burns, crossfade, gold UI, the passage fade. That is the bar.

## GALLERY LAW — THE WALK (Rachel, 2026-06-13, template spine)
Galleries are scrolling narratives, never grids. The pattern, reusable for
every property:
1. Order photos by the WALKING PATH (Matterport/floor plan order, the way
   the house actually unfolds), grouped into movements: Arrival, Main Rooms,
   Quiet Rooms, Private Wing, Upstairs, Grounds.
2. Staggered editorial rows: asymmetric 7/5 grids, tall portraits against
   wide landscapes, lifted offsets, full-bleed 21:9 cinematic breaks.
3. Carousels for room sequences: slow crossfade (~4.2s) + Ken Burns drift
   (9s scale 1.0 to 1.07), gold counter, room-name caption. Classy, never
   slideshow-y.
4. NARRATIVE INTERLUDES between movements: one or two italic editorial
   lines (setup/turn voice, gold italic on the turn), weaving the story
   through the photos. The scroll IS the story.
5. Room names matter: use the house's real names with one architectural
   truth where it earns it (Flemish Bond, Delft Tile, Heart Pine).
6. Every frame clicks to lightbox. Lazy-load below the fold.

---

## 7. PERSONALIZE EVERY LISTING (Rachel, 2026-06-18)

> "we try to personalize our listings" — each property gets its OWN identity,
> never a template stamped on every house. The design language is chosen to
> FIT the specific house: its era, its architecture, its feeling.

- **Typeface is part of a property's identity, chosen to fit the house.**
  - GARRAN HILL = **Edwardian Script ITC** as the signature/romantic face,
    BECAUSE the house is Georgian (1916 Colonial/Georgian Revival). The
    period-elegant script belongs to this house's era.
  - **Edwardian is GARRAN HILL ONLY.** It does NOT travel to other
    properties. The next listing gets whatever face fits IT.
  - Font file: /Applications/Microsoft Word.app/Contents/Resources/DFonts/EdwardianScriptITC.ttf
  - Where Edwardian works: the NAME ("Garran Hill") on a calm/dark photo
    where the hairlines can breathe. NOT for room labels over busy photos
    (it dissolves into mush, reads "wedding invitation").

## 8. THE GARRAN HILL TYPE SYSTEM — SOCIAL / REEL (locked 2026-06-18)

For 9:16 Instagram Reel/Story frames (1080x1920, native res, JPEG q94+):
- **Structured editorial lockup** (Vogue/AD masthead grammar), centered:
  1. IVORY tracked kicker: "GARRAN HILL · PINEHURST" (gold too close to warm
     wood tones to ever pop at small size — kicker stays ivory/white)
  2. Gold rule + small diamond ornament
  3. Room name in gold Didot caps (metallic gradient: champagne highlight
     255,248,216 -> 233,198,130 -> antique 178,138,70)
  4. Ivory italic subline (Hoefler Text italic) = the room's editorial line
- Body face: **Didot** (/System/Library/Fonts/Supplemental/Didot.ttc)
- Spaced-caps + a plain line ALONE reads "basic/realtor flyer." The kicker +
  ornament + place-name + italic line is what makes it gorgeous/editorial.

## 9. PRESERVE THE IMAGE — AIRY, NOT BLOCKED (Rachel, 2026-06-18, HARD RULE)

> Looking at a heavy scrim: "it is covering the photo think airy background
> preserve the image"

- NEVER darken the photo into a block/band to make text legible. The image
  is the product. Keep backgrounds AIRY.
- Legibility comes from protecting the LETTERS, not darkening the picture:
  a soft text halo/glow hugging each glyph + a very light, low-alpha gradient
  only at the very bottom edge. The photo must stay luminous top to bottom.

## 10. CLEANUP TOOLS (2026-06-18)

- Cloudinary generative remove: e_gen_remove:prompt_(thing) transform.
  Used to remove the concrete/equipment block from 120-tennis-courts (CLEAN).
  Note: gen-remove can leave a faint smear on textured surfaces (floor) —
  if so, CROP the area out of frame instead of fighting the AI infill.

## 11. MUSIC FOR GARRAN HILL (2026-06-18)

- Handel (period-correct: 1916 English provenance, Page at Court of St James's).
- Use ROYALTY-FREE public-domain recordings from Musopen.org (safe for a
  business IG account; IG restricts licensed commercial tracks on business accts).
- Water Music HWV 348-350; 12 Concerti Grossi Op.6 HWV 319-330.
