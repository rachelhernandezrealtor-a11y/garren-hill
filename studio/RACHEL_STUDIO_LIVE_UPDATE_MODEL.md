# Rachel Studio Live Update Model

Date: 2026-05-03

Status: active platform decision record.

Purpose: define how price, status, MLS number, key facts, and other changeable listing data should update after a property site is live.

## The Problem

Once a property site is live, some facts may change:

- price
- status
- MLS number
- beds, baths, square footage, acreage
- open house details
- showing instructions
- links
- campaign notes
- approved media

Today, those changes can be made by editing code, pushing to GitHub, waiting for Cloudflare, purging cache, and verifying the live site.

That works, but it is too fragile as the long-term operating model.

Rachel Studio needs a controlled update system so listing data changes in one place and appears everywhere it is allowed to appear.

## The Recommended Path

Use Option C now.

Build toward Option B.

### Option A: Code Updates

Current method.

Rachel tells Rocky or Codex the change. The code is edited. GitHub deploys. Cloudflare publishes. The live site is checked.

Use only for:

- locked copy changes approved by Rachel
- full section changes
- design changes
- one-off launch fixes

Do not use as the normal path for recurring listing facts.

### Option C: Private Admin Panel

Best near-term answer.

Rachel Studio gets a private admin panel where approved users can update key listing fields.

The site reads those fields from the Rachel Studio backend.

This keeps Rachel out of code and keeps Rocky/Codex from manually hunting every repeated field.

Admin panel fields should include:

- price
- status
- MLS number
- property facts
- tour links
- contact routing
- open house notes
- public/private visibility flags
- source verification status
- last approved by
- last published at

This is the practical first version.

### Option B: Full Database-Driven Property Sites

Best long-term answer.

The Rachel Studio backend becomes the property truth layer. Public sites render approved data, approved media, approved copy, and approved SEO fields from that backend.

The backend can live on Cloudflare with:

- D1 database for property records
- R2 or Cloudinary references for media
- Workers API for public site data
- private admin routes
- MCP tools for controlled AI access
- launch and approval records

Base44 can remain Rocky's home and memory layer.

It should not be the only permanent source for public listing data.

## What Should Sync Automatically

These fields are safe candidates for backend-driven updates:

- price
- listing status
- MLS number
- beds
- baths
- square footage
- acreage
- lot size
- property type
- branded and unbranded URLs
- Matterport URL
- Vimeo/video URL
- contact form destination
- open house date/time
- key disclosure or compliance note
- selected source-backed links
- schema fields
- meta title
- meta description
- Open Graph image

## What Should Not Sync Automatically

These require Rachel/Rocky approval and should not change casually:

- locked copy
- historical claims
- buyer voice
- editorial section order
- hero media
- locked assets
- source-sensitive language
- names of private owners
- zoning/commercial/agritourism claims
- anything that could change buyer reliance

## Approval Rules

Every update needs a state:

- draft
- ready for Rocky review
- ready for Rachel review
- approved for preview
- approved for production
- live and verified
- rejected

The public site reads production-approved values only.

Preview may show draft or review values if clearly marked.

## Publishing Rule

Changing a backend field is not the same as publishing it.

Recommended flow:

1. Update value in admin panel.
2. Mark source status.
3. Preview site updates.
4. Rachel/Rocky approve.
5. Publish approved value.
6. Verify public site.
7. Log the change.

## Client-Friendly Translation

The client should hear:

After launch, the property presentation stays current. Key listing data can be updated through a controlled process, so price, status, links, and approved details remain accurate without rebuilding the site every time.

The client does not need to hear:

Cloudflare D1, Workers, MCP, GitHub, cache purge, API routes, or deployment internals.

## The Decision

Rachel Studio should not depend on panic-patching code for normal listing updates.

The near-term build should be a private admin panel.

The long-term build should be database-driven property sites with approval gates.

The human rule stays the same:

Rachel approves what matters.

Rocky holds the standard.

Codex builds and verifies the machinery.
