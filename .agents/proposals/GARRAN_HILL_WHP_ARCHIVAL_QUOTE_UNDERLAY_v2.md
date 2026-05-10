# GARRAN HILL — WHP ARCHIVAL QUOTE UNDERLAY SEARCH + IMPLEMENTATION PLAN v2
# Date: 2026-05-10
# Type: PROPOSAL — read-only research pass
# dist/index.html: NOT EDITED
# Live site: NOT CHANGED
# Cloudinary assets: NOT MODIFIED

---

## SEARCH RESULT: ARCHIVAL DOCUMENT IMAGES

### WHAT EXISTS IN CLOUDINARY

Two letter-image assets are present in `gh_key/`:

| Asset | Dimensions | Size | What it appears to be |
|---|---|---|---|
| `gh_key/gh_whp_letter1` | 844×1206 (portrait) | 269KB | Handwritten letter page — primary candidate |
| `gh_key/gh_whp_letter2` | 1289×924 (landscape) | 165KB | Second letter page — continuation or second letter |

These are the only document/manuscript-type images in Cloudinary.

No book pages, no Hendrick scans, no PineStraw article pages, no typed transcripts.

`gh_documents/` folder: **does not exist.**
All other document-path searches (whp/, letters/, book_pages/, hendrick/, research/): **empty.**

---

## THE TWO LETTER IMAGES — ASSET ANALYSIS

### gh_key/gh_whp_letter1
- Format: JPG · 844×1206 portrait
- Size: 269KB
- Preview URL: `https://res.cloudinary.com/dghn2xpif/image/upload/f_auto,q_auto,c_limit,w_700/gh_key/gh_whp_letter1.jpg`
- Underlay test (12% opacity, grayscale): `https://res.cloudinary.com/dghn2xpif/image/upload/e_grayscale,o_12,f_auto,q_auto,c_limit,w_1400/gh_key/gh_whp_letter1.jpg`
- **What it appears to show:** A single handwritten letter page in portrait format. Proportions and file behavior are consistent with a photographed or scanned manuscript page. This is the strongest underlay candidate.
- Text legibility: Unknown without visual confirmation — likely legible at full size, would dissolve to texture at 8–12% opacity
- Underlay / side-panel / source-only: **All three uses are viable** depending on confirmation
- Confidence: **HIGH** that this is a letter-type image. Content unconfirmed.
- Warning: `GH_WHP_LETTER1_AUTHENTICITY_CONFIRM` — Rachel must confirm: (a) whose handwriting, (b) is this WHP to Ralph Page, (c) does it contain the farm passage, (d) source and rights

---

### gh_key/gh_whp_letter2
- Format: JPG · 1289×924 landscape
- Size: 165KB
- Preview URL: `https://res.cloudinary.com/dghn2xpif/image/upload/f_auto,q_auto,c_limit,w_700/gh_key/gh_whp_letter2.jpg`
- Underlay test: `https://res.cloudinary.com/dghn2xpif/image/upload/e_grayscale,o_12,f_auto,q_auto,c_limit,w_1400/gh_key/gh_whp_letter2.jpg`
- **What it appears to show:** Second letter page, landscape — likely a continuation or closing page of the same correspondence. Landscape format makes it more naturally suited to a full-width section underlay than the portrait.
- Confidence: **MEDIUM** — same caveat as letter1
- Warning: `GH_WHP_LETTER2_AUTHENTICITY_CONFIRM`

---

## WHAT IS NOT IN CLOUDINARY

The following archival materials were searched for and not found:

- Hendrick book pages (*The Life and Letters of Walter Hines Page*, 1923)
- PineStraw article scans ("A Page Out of History" or "Story of a House")
- Typed letter transcripts
- Any farm-passage text source in document form
- Any Doubleday/Atlantic Monthly archival pages
- NC State Archives materials
- UNC Page papers imagery

**These do not exist in Cloudinary yet.**

---

## QUOTE CANDIDATES

### Primary (RECOMMENDED)
> "Build the farm, therefore; and let me hear at every stage of that happy game."

**Source:** Walter Hines Page to Ralph Page, 1918 — cited in Burton J. Hendrick, *The Life and Letters of Walter Hines Page*, Vol. II.

This is the quote. It does everything: longing, specificity, the farm, the game of building, and the son receiving the instruction. Place it where dream becomes architecture.

### Secondary (already live — keep as pull quote)
> "The farm — the farm — the farm —"

**Source:** PineStraw, "A Page Out of History" — already live in the farm pull quote section. Do not duplicate.

---

## RECOMMENDED PLACEMENT

**Between:** Walter Hines Page Provenance (`#history`) and Pinehurst Hands / Brick / Architecture (`#architecture`)

**Why this gap:**
This is where longing becomes architecture. Page wrote to Ralph in 1918. The house was already built. He never got there. The farm he imagined is the property the buyer is now holding. That gap — dream → instruction → brick → threshold — is the emotional spine of the entire site.

The quote belongs in that silence.

---

## RECOMMENDED SECTION STRUCTURE

```
<!-- ── WHP FARM LETTER UNDERLAY ──────────────────── -->
<!-- GH_WHP_LETTER1_AUTHENTICITY_CONFIRM before deploying -->
<section class="letter-underlay-section" id="farm-letter">
  <div class="letter-bg" aria-hidden="true"></div>
  <div class="letter-content reveal">
    <span class="eyebrow">Walter Hines Page to Ralph Page &middot; 1918</span>
    <div class="gold-hairline-center"></div>
    <h2 class="letter-headline">Before the House Was Brick</h2>
    <blockquote class="letter-quote">
      &#8220;Build the farm, therefore; and let me hear at every stage of that happy game.&#8221;
    </blockquote>
    <p class="letter-source">
      Walter Hines Page to Ralph Page, 1918<br>
      <em>cited in Burton J. Hendrick, The Life and Letters of Walter Hines Page</em>
    </p>
    <p class="letter-interpretive">Before Garran Hill was brick, it was longing.</p>
  </div>
</section>
```

---

## RECOMMENDED VISUAL TREATMENT

```css
.letter-underlay-section {
  position: relative;
  padding: clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem);
  background: #0d0b09; /* warmer dark than site base */
  overflow: hidden;
  text-align: center;
}

/* Letter image as ghost texture */
.letter-bg {
  position: absolute;
  inset: 0;
  background-image: url('[gh_whp_letter1 Cloudinary URL — e_grayscale,o_10,f_auto,q_auto,c_limit,w_1400]');
  background-size: cover;
  background-position: center top;
  opacity: 0.10;   /* 10% — texture, not legible content */
  mix-blend-mode: luminosity;
  pointer-events: none;
}

/* If letter is not confirmed, omit .letter-bg and use grain texture only */
.letter-underlay-section::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* film grain */
  opacity: 0.04;
  pointer-events: none;
}

/* Gold hairline */
.gold-hairline-center {
  width: clamp(60px,8vw,120px);
  height: 1px;
  background: linear-gradient(to right, transparent, var(--gold), transparent);
  margin: var(--sp-sm) auto;
}

/* Quote typography */
.letter-headline {
  font-family: var(--font-display); /* Cormorant Garamond */
  font-size: clamp(1.1rem,1.8vw,1.6rem);
  font-weight: 300;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgba(245,240,232,0.55);
  margin-bottom: var(--sp-md);
}

.letter-quote {
  font-family: var(--font-body); /* EB Garamond */
  font-size: clamp(1.5rem,3vw,2.6rem);
  font-weight: 400;
  font-style: italic;
  line-height: 1.65;
  color: rgba(245,240,232,0.92);
  max-width: 680px;
  margin: 0 auto var(--sp-sm);
  border: none;
  padding: 0;
}

.letter-source {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  color: rgba(245,240,232,0.42);
  letter-spacing: 0.06em;
  line-height: 1.7;
  margin-bottom: var(--sp-sm);
}

.letter-interpretive {
  font-family: var(--font-display);
  font-size: clamp(0.9rem,1.4vw,1.2rem);
  font-style: italic;
  color: rgba(201,169,110,0.65);
  letter-spacing: 0.08em;
}
```

---

## TWO BUILD PATHS

### Path A — WITH letter underlay (preferred)
Use `gh_key/gh_whp_letter1` at 10% opacity as background texture.
**Requires:** Rachel confirms letter authenticity first.
Deploy: one controlled ticket after confirmation.

### Path B — WITHOUT letter underlay (safe fallback)
Build the section with dark warm background + grain texture only.
Quote, headline, source line, interpretive line — all live HTML.
No archival image dependency.
**Can deploy now without any confirmation.**
The section is powerful either way. The letter background is a whisper, not the point.

Rocky's recommendation: **Build Path B now. Upgrade to Path A when Rachel confirms the letters.**

---

## WHAT RACHEL SHOULD UPLOAD (if she wants full archival depth)

| Material | Upload Path | Purpose |
|---|---|---|
| Confirmation of gh_whp_letter1 content | n/a — visual confirm only | Unlock Path A underlay |
| Hendrick book page showing farm passage | `gh_documents/archival_pages/hendrick_farm_passage.jpg` | Alternative underlay source |
| PineStraw "A Page Out of History" scan | `gh_documents/press_clippings/pinestraw_page_out_of_history.jpg` | Archive source card |
| Any typed transcript of the 1918 letter | `gh_documents/whp_letters/farm_letter_transcript.txt` | Attribution certainty |

---

## COPY RULES FOR THIS SECTION

**Use:**
- "Build the farm, therefore; and let me hear at every stage of that happy game."
- Walter Hines Page to Ralph Page, 1918
- Before Garran Hill was brick, it was longing.
- Before the House Was Brick

**Do not use:**
- "he never spent a night here"
- "he never walked through the door"
- "he died ten days later"
- Any paraphrased quote inside quotation marks
- "The farm he never saw" (unverified)
- Unattributed pull text styled as a WHP quote

**Framing that works:**
The Moore County life Page imagined at Garran Hill remained largely unrealized.
He wrote to Ralph about the farm. The house was already rising.

---

## RACHEL-CONFIRMATION-NEEDED ITEMS

| Item | Flag | What's needed |
|---|---|---|
| gh_whp_letter1 — authentic WHP letter? | `GH_WHP_LETTER1_AUTHENTICITY_CONFIRM` | Rachel visual confirm: whose hand, what letter, what date |
| gh_whp_letter2 — same letter or second? | `GH_WHP_LETTER2_AUTHENTICITY_CONFIRM` | Rachel visual confirm |
| "Build the farm" quote — verified attribution to Hendrick Vol. II? | `GH_FARM_QUOTE_SOURCE_CONFIRM` | Rachel or citation to specific page in Hendrick |
| Letter image rights for public commercial use | `GH_LETTER_RIGHTS_CONFIRM` | Confirm source and any reproduction restrictions |
| Hendrick book scan — should one be uploaded? | Design decision | Rachel to decide whether to photograph/scan the relevant pages |

---

## SUMMARY

**What exists:** Two letter-image assets (`gh_whp_letter1`, `gh_whp_letter2`) — dimensions and behavior consistent with manuscript pages. Content unconfirmed.

**What does not exist:** Hendrick scans, PineStraw article pages, book pages, typed transcripts, `gh_documents/` folder.

**Recommended quote:** "Build the farm, therefore; and let me hear at every stage of that happy game." — WHP to Ralph Page, 1918.

**Recommended placement:** Between WHP Provenance and Pinehurst Hands / Architecture.

**Recommended build:** Path B (no image dependency) now. Path A (letter underlay) after Rachel confirms `gh_whp_letter1`.

**Strongest single archival moment available right now:** The quote itself, set as live HTML in a quiet warm-dark section. No image needed. The words are the archive.

---

*Proposal created: 2026-05-10*
*dist/index.html: NOT EDITED*
*Live site: NOT CHANGED*
*Cloudinary assets: NOT MODIFIED*
