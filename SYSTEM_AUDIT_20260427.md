# SYSTEM AUDIT — Rocky + Rachel
# Date: 2026-04-27
# Purpose: Full inventory of what exists, what's locked, what needs improvement
# This is the baseline before Garran Hill clean build begins.

---

## WHAT EXISTS AND IS LOCKED

### 1. THE METHODOLOGY (rules/)
- WORKFLOW.md — Five-step build process, 14-beat arc, what changes vs what never changes
- MASTER_BRIEF.md — Single source of truth for all facts, assets, copy, deployment
- GH_SITE_LAWS.md — Garran Hill specific technical laws (image URLs, deployment, cache)
- memory-rule.md — Memory protocol (save before responding)
- session-protocol.md — Start/end checklist for every session
- tool-chain-protocol.md — Full tool chain verification before every task

STATUS: ✅ Complete. In rules/ so loads every session automatically.

### 2. THE PROPERTY TEMPLATE (property_template/)
- PROPERTY_BRIEF_TEMPLATE.md — Full intake form for any new listing
- SITE_TEMPLATE_DATA.js — Structured data object (brief → data)
- SITE_TEMPLATE.jsx — The site itself (data-driven, no editing for new properties)
- build_property.py — Builds standalone HTML
- README.md — Workflow instructions, naming conventions, deployment rules

STATUS: ✅ Exists. NEEDS REVIEW — template was built before the clean-build methodology
was locked. The SITE_TEMPLATE.jsx may need to be replaced with a version that follows
the 14-beat arc properly. The data-driven approach is sound; the template sections
need to match the workflow beats exactly.

### 3. GARRAN HILL — CURRENT STATE
- Live: garren-hill.pages.dev ✅
- GitHub: rachelhernandezrealtor-a11y/garren-hill ✅
- Master file: /app/.agents/GarranHillV6_MASTER.jsx ✅
- Approved tag: v1.3-approved-20260427 ✅
- Cloudflare cache purge: bash /app/.agents/skills/purge_cloudflare.sh gh ✅
- Rollback: bash /app/.agents/skills/rollback.sh gh v1.3-approved-20260427 ✅

WHAT'S GOOD ON THE LIVE SITE:
- Hero with WHP + "Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship." ✅
- Stat bar: 1916 | 4 Beds | 6 Baths | [CREST] | 6,072 SF | 4.15 Acres | $4,250,000 ✅
- Wax seal (3D, photorealistic) ✅
- WHP history section (rich, specific, earned) ✅
- "Fire going, no one home yet." ✅
- "The door has been open since 1916." ✅
- Blue Fox / Betty Dumaine in stewardship section ✅
- "It is ready for the fifth family." ✅
- O'Shea restoration story ✅

WHAT NEEDS FIXING IN THE CLEAN BUILD:
- Saplings line appears TWICE — should appear once, in grounds section
- Threshold copy appears TWICE — once is enough
- Blue Fox is buried in a paragraph — needs its own breath, no image, just the words
- Some sections are spec sheets instead of story beats (kitchen especially)
- The 1931 brochure section doesn't function as a narrative beat
- Section sequence isn't tight — some repetition between rooms and history
- Editorial typography not fully realized — some body text still reads like a brochure

### 4. FLOW FARM — CURRENT STATE
- Live: flowfarmforest.com ✅
- GitHub: rachelhernandezrealtor-a11y/flowfarm-landing ✅
- Master file: /app/.agents/FlowFarmLanding2_MASTER.jsx ✅
- Approved tag: v1.1-approved-20260427 ✅
- Status: Holding — Garran Hill clean build first

WHAT'S LOCKED FOR FLOW FARM:
- Theme: Agritourism Established. Legacy Ready.
- Hero: "107 Linden Trail Aberdeen, NC 28315 | Pinehurst ETJ"
- Headline: "Agritourism Established. Legacy Ready."
- Haunting Detail: "He started in 2009. He didn't find the zoning. He earned it."
- Closing Line: "The system is already running. The buyer inherits it."
- Stat Bar: 15 USDA ACRES | 7 BUILDABLE | 3 ACRE VEGANIC FARM | $5.25M
- Follows: Same 14-beat arc, same design laws, same five steps

### 5. INFRASTRUCTURE
- Cloudinary: dghn2xpif — 2,697 images, all folders documented ✅
- Base44 entity: PropertyPhoto (396 GH photos with AI room labels) ✅
- Automations: GitHub Auto-Backup (daily), Site Health Monitor (daily) ✅
- Cloudflare token: CLOUDFLARE_CACHE_TOKEN in .env ✅
- Rollback script: /app/.agents/skills/rollback.sh ✅
- Change log: /app/.agents/CHANGE_LOG.md ✅

---

## WHAT NEEDS TO BE BUILT

### For Garran Hill Clean Build (NEXT):
1. PHOTO_SELECTIONS.md — scene-by-scene image map (Step 2)
   Every scene → Cloudinary URL → what the photo shows → why it earns the copy
   
2. GH_COPY_DOCUMENT.md — full story as script (Step 3)
   Every headline, body, bridge line in sequence. Rachel approves before code.
   
3. GarranHillV7_MASTER.html — clean build (Step 4)
   One file. Story-first. From scratch. No patching.
   Built after photo pass + copy document are approved.

### For the Template System:
1. SITE_TEMPLATE.jsx needs to be rebuilt to match the 14-beat arc properly
   Current version has sections that don't map cleanly to the beats
   
2. The brief template is good — no changes needed

3. A PHOTO_SELECTIONS_TEMPLATE.md should be added to property_template/
   So every property has the same scene-by-scene selection document

---

## THE DECISION

The Garran Hill live site is stable and has the right bones.
The clean build is about discipline — tightening the sequence,
giving every section exactly one job, removing repetition,
giving Blue Fox her own breath.

The template exists and works. What it needs is the 14-beat arc
baked into its section structure so every new property
automatically inherits the right sequence.

---

## THE ORDER OF OPERATIONS

1. ✅ WORKFLOW.md locked
2. ✅ MASTER_BRIEF.md current
3. ✅ Template system exists
4. → NEXT: Photo pass for GH clean build (PHOTO_SELECTIONS.md)
5. → THEN: Copy document (GH_COPY_DOCUMENT.md)
6. → THEN: Clean build from scratch
7. → THEN: Deploy + tag v2.0-approved
8. → THEN: Flow Farm photo pass begins

---

*Audit completed: 2026-04-27*
*Rocky + Rachel — Sotheby's International Realty*
