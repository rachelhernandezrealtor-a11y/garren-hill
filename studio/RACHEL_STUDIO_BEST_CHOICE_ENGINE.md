# Rachel Studio Best Choice Engine

Date: 2026-05-03

Status: active backend function.

Purpose: let AI compare choices inside a category and recommend the best fit for a specific property, without letting AI approve, publish, or override Rachel/Rocky.

## The Plain-English Version

Rachel should be able to ask:

`Show me the best choice for this category.`

Examples:

- best kitchen image
- best hero image
- best SEO keyword cluster
- best backlink target
- best source link placement
- best headline option
- best video thumbnail
- best reel hook
- best private buyer packet angle
- best image enhancement profile
- best gallery order

The backend should return ranked choices with:

- best choice
- strong alternatives
- why each one fits
- what law it satisfies
- what risk it carries
- what still needs Rachel/Rocky approval

## The Law

AI recommends.

Rachel/Rocky approve.

Codex enforces.

The Best Choice Engine never publishes directly.

## What It Scores Against

Every recommendation should be scored against:

- property truth
- buyer voice brand
- creative standard
- selective SEO strategy
- source support
- visual quality
- mobile/desktop fit
- emotional fit
- conversion clarity
- compliance risk
- locked asset/copy rules

## Categories

### Media

- hero image
- section image
- kitchen candidate
- gallery order
- video thumbnail
- mobile crop
- desktop crop
- enhancement profile

### Copy

- headline
- eyebrow
- closing line
- caption
- inquiry language
- private dossier intro

### SEO / Source

- keyword cluster
- meta title
- meta description
- backlink target
- source placement
- schema citation
- alt text
- video title

### Design / Experience

- section order
- visual rhythm
- motion treatment
- public/private split
- buyer packet angle
- social post format

## Backend Contract

Endpoint:

`POST /api/properties/:propertyId/best-choices`

Input:

```json
{
  "category": "kitchen_image",
  "decisionKey": "garran_hill_kitchen_hero",
  "goal": "Choose the best kitchen image for the public kitchen section.",
  "context": {
    "property": "Garran Hill",
    "buyerVoice": "stewardship, provenance, architecture, cultural weight"
  },
  "constraints": [
    "must be an approved Cloudinary asset",
    "must work on mobile",
    "must not feel generic",
    "must preserve property truth"
  ],
  "candidates": [
    {
      "candidateKey": "gh_38",
      "label": "gh_38",
      "sourceType": "cloudinary_asset",
      "scores": {
        "visual_quality": 88,
        "property_truth": 92,
        "buyer_voice_fit": 86,
        "mobile_fit": 74,
        "seo_fit": 82
      },
      "riskLevel": "low",
      "rationale": "Strong architectural detail and honest kitchen context."
    }
  ],
  "createdBy": "codex"
}
```

Output:

```json
{
  "status": "best_choice_ranked",
  "topChoice": {
    "label": "gh_38",
    "scoreTotal": 84.4,
    "riskLevel": "low",
    "recommendation": "strong_candidate"
  },
  "rule": "Best choice is a recommendation, not approval. Rachel/Rocky approval is still required."
}
```

## Data Stored

The backend stores:

- decision run
- category
- property
- goal
- constraints
- candidates
- scores
- rationale
- risk warning
- recommendation
- approval status

This makes recommendations reusable, auditable, and not dependent on memory.

## Example: Garran Hill Kitchen

Category:

`kitchen_image`

Question:

Which approved kitchen image best fits Garran Hill's buyer voice, mobile layout, visual clarity, and truth standard?

The engine should rank candidates, but it should not decide production.

Rachel/Rocky still approve.

## Example: Flow Farm

Category:

`hero_sequence`

Question:

Which opening sequence best communicates that the buyer inherits a working ecosystem, not just a house?

The engine should favor:

- land
- systems
- farm operation
- geothermal/solar resilience
- wellness and privacy

It should not reuse Garran Hill's haunted archival voice.

## The Sentence

Rachel Studio can ask AI for the best choice inside a category, but the answer is ranked evidence, not automatic authority.
