# FLOW FARM DESIGN BIBLE
Last updated: 2026-04-23

This is the living source of truth for all design decisions, copy rules, aesthetic standards, and implementation notes for the Flow Farm landing page (FlowFarmLanding2.jsx / flowfarmforest.com) AND the Garren Hill landing page (GarrenHillV2 / garren-hill.pages.dev).

---

## THE MASTER TEMPLATE LAW

Both properties share ONE template. The architecture is identical. Only images, copy, and typography expression change per property. This is non-negotiable.

### What is LOCKED across both sites
- Section order logic (Hero > Manifesto/Story > CinematicReveals > PullQuotes > Stats > Inquire > Footer)
- Component architecture: CinematicReveal, PullQuote, FadeIn, stats bar, nav, inquiry modal
- Deployment pipeline: GitHub -> Cloudflare Pages
- CDN enhancement profiles: cdnInt / cdnExt / cdnForest
- Verification script before every push
- Color palette: DARK, GOLD, CREAM (same hex values on both)
- Build safety rules (no non-ASCII, no curly quotes, etc.)

### What CHANGES per property
- Typography expression (see per-property rules below)
- Hero photo / video
- All images
- All copy and headlines
- Accent copy moments (FF: smart home / GH: history)
- Stats bar values

---

## PER-PROPERTY TYPOGRAPHY RULES

### Flow Farm
- Primary display: `Georgia, serif`
- Stats/numbers: `'Cormorant Garamond', Georgia, serif` weight 300
- Vibe: working farm meets Aman resort. Warm, grounded, modern luxury.
- Headlines: mixed upright + italic, left-aligned on hero

### Garren Hill
- Primary display: `'Cormorant Garamond', Georgia, serif` — Cormorant IS the primary face
- Body: Georgia, serif
- Stats/numbers: `'Cormorant Garamond', Georgia, serif` weight 300
- Vibe: 18th century Georgian formality. Older, grander, more restrained.
- Headlines: centered on hero, mixed upright + italic, declarative
- Eyebrows: same sans-serif, same gold, same spacing — identical to FF

---

## BRAND IDENTITY

### Color Palette (BOTH PROPERTIES — DO NOT CHANGE)
- DARK: `#0a0a0a` — near-black background
- GOLD: `#C9A96E` — accent, eyebrows, dividers, CTA
- CREAM: `#F5F0E8` — body text on dark backgrounds
- WHITE: `#ffffff` — headlines, pull quotes
- GLASS: `rgba(255,255,255,0.12)` — frosted card fill
- GLASS BORDER: `rgba(255,255,255,0.28)` — frosted card border

### Vibe
- Editorial. Aman resort aesthetic as the north star.
- NOT dark and moody. Vibrant, crystal clear, floating on glass.
- Full-bleed imagery. Minimal UI chrome.
- Let the property speak. Copy is spare and deliberate.
- Words float directly on images — NO glass cards behind text.

---

## LAYOUT RULES

### Universal Section Order Template
1. Hero (full-bleed, stats bar, 2 CTAs)
2. Manifesto / Story opening
3. Architecture / Foundation reveal
4. CinematicReveal -- primary interior
5. Numbers / Stats feature section
6. CinematicReveal -- signature space
7. Pull Quote
8. CinematicReveal -- tertiary space
9. Land / Grounds
10. Opportunity / Legacy section
11. Mechanism / Infrastructure
12. CinematicReveal -- detail/entry
13. Location
14. Inquire
15. Footer

### CinematicReveal Pattern (BOTH PROPERTIES)
- Full-bleed photo on right (60% width desktop)
- Dark frosted text panel on left (overlapping photo edge)
- Eyebrow label in GOLD
- Serif headline (large, 2-3 lines max)
- Body paragraph (2-3 sentences)
- NO buttons inside CinematicReveal panels

### Hero Pattern (BOTH PROPERTIES)
- Full-bleed photo (GH) or video (FF) background
- Ken Burns parallax scale 1.08 base
- Address eyebrow in GOLD pinned below nav
- Headline centered (GH) or left-aligned (FF) -- only difference allowed
- Italic subhead in CREAM
- Two CTAs: primary gold bordered + secondary frosted glass
- Stats bar pinned to bottom: frosted glass, Cormorant Garamond weight 300, gradient dividers
- NO hero buttons other than the two approved CTAs

### Frosted Glass Cards
- Background: `rgba(255,255,255,0.12)`
- Border: `1px solid rgba(255,255,255,0.28)`
- Backdrop-filter: `blur(12px)` when on image backgrounds
- On pure dark bg: no backdrop-filter needed, just rgba fill

---

## IMAGE STANDARDS

### Cloudinary Fetch Base
```
https://res.cloudinary.com/dghn2xpif/image/fetch/f_auto,q_auto,w_2400/
```
Wrap ALL images through this.

### Enhancement Profiles
- cdnInt: `e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit`
- cdnExt: `e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1600,c_limit`
- cdnForest: `f_auto,q_auto,w_2400,e_vibrance:40,e_saturation:20,e_brightness:15,e_sharpen:60`

### Flow Farm Photo Base
`https://media.base44.com/images/public/69e248a2469cc39540781cce/`

### Garren Hill Photo Base
`https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/`

### Flow Farm Key Images
- Living room (trusses + piano): `4db7d0477_livingroom.jpg`
- Conservatory money shot (octagonal dome): `8cb2578a0_MONEYSHOT.jpg`
- Kitchen wide: `1c4b8a04f_SOGOODKITCHEN.jpg`
- Primary spa bath: `08da5b97d_spaprimarybath.jpg`
- Foyer herringbone: `9b1d02a04_260115107LindenTrailF-9727.jpg`
- Aerial establishing: `2ca329bbf_flowfarmmasterphotoswebsite.jpg`

### Garren Hill Key Images
- Hero (portico front): `ac89533df_gh_200HollycrestDrive-1.jpg` (current app BASE)
- Entrance hall: `082d9b5c7_200Holycrest-1182.jpg`
- Living room wide: `341c7343c_200Holycrest-1203.jpg`
- Fireplace lit: `5f5f87315_200HollycrestDrive-65fire.jpg`
- Dining room: `e926f8fdd_200Holycrest-1296.jpg`
- Pool: `57352d0a9_200HollycrestDrive-208.jpg`
- Portico detail: `fa8cec793_200HollycrestDrive-191.jpg`

---

## COPY RULES (BOTH PROPERTIES)

### Universal Voice Laws
- Declarative sentences. No hedging.
- Present tense. The property exists NOW.
- Specificity over adjectives. "17 feet tall" not "soaring ceilings."
- No real estate cliches: no "nestled," "boasts," "charming," "stunning."
- Short paragraphs. Two sentences max in body slots.
- Numbers are features. Lead with them.

### Flow Farm Copy Moments (LOCKED)
| Location | Line |
|---|---|
| Foyer | "one tap, the house shifts" |
| Living Room | "sound that fills seventeen feet without effort" |
| Kitchen | "music from speakers you can't see" + water filtration |
| Spa Bath | "lights already at ten percent" -- full-bleed pull quote |
| Closet | quiet one-liner about the dimmer |
| Office | solar/geo/generator handoff woven in |
| Exterior Night | "143 lighting circuits. Some of them are these trees." |
| Infrastructure | Lead with "the electrical capacity of a small hotel" |

### Garren Hill Copy Moments (LOCKED)
| Location | Line |
|---|---|
| Manifesto | Walter Hines Page / WWI / "never walked through the door" |
| Architecture | "Built by Leonard Tufts' own craftsmen -- the same men who built Pinehurst." |
| History | Betty Dumaine -- peacocks, Blue Fox grave, royalty |
| Westminster Abbey | "The friend of Britain in her sorest need." -- MUST appear |
| Ending | Ann's quote + "Garren Hill is ready." -- full stop, no pitch after |

### Garren Hill Copy Laws
- Do NOT name current owners -- "the current stewards" only
- "That someone is you" -- REMOVED, too salesy
- Authoritative, restrained tone throughout
- History is proof, not content -- every detail makes buyer feel chosen

### Pull Quote Format (BOTH PROPERTIES)
- Full-bleed dark or image section
- Georgia italic, large centered text
- ASCII quotes only: `"` -- no curly quotes in code
- No attribution unless it adds authority

### Flow Farm Approved Headlines (LOCKED)
- Hero: "Agritourism Established. Legacy Ready."
- Quote section: "Autonomy at this scale is not inherited. It is engineered."
- Land section: "Three acres producing. Seven acres waiting."
- Mechanism section: "Structure that holds freedom."

### Garren Hill Approved Headlines (LOCKED)
- Hero: "Built in 1916. Still the finest house in Moore County."
- Hero subhead: "Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship."
- Manifesto: "Some houses hold history. This one shaped it."

---

## ANIMATION + INTERACTION RULES (BOTH PROPERTIES)

### Stats Bar
- Cormorant Garamond weight 300
- Gradient dividers (not hard lines)
- Frosted glass backing
- Two-line labels allowed for GH

### Parallax
- All full-bleed sections: backgroundPositionY scroll shift
- Shift: 0.18--0.25 multiplier (subtle)
- Ken Burns: scale 1.08 base

### Transitions
- No hard cuts between sections
- Dark bg sections bleed into each other
- Image sections: slight top/bottom gradient fade for legibility

### Lightbox (video -- FF only)
- Natural 16:9 ratio -- no cover cropping
- Scroll position saved on open, restored exactly on close
- Mobile portrait: letterbox with gold rotate nudge (fades 3s)
- Landscape mobile / desktop: full cinematic box

---

## TECHNICAL RULES (BOTH PROPERTIES)

### Build Safety
- NO non-ASCII characters -- will crash build silently
- Use `--` not em-dash in strings
- ASCII quotes only -- no curly quotes in code
- Check `ord(c) > 127` after every Python file manipulation
- SPELLING LAW: The property is always **Garren Hill** -- never "Garran Hill" (that was the original 1913 name, now corrected). Check every file.

### File Management
- Flow Farm source: `/app/.agents/FlowFarmLanding2_MASTER.jsx`
- Garren Hill source: `/app/.agents/GarrenHillV2_MASTER.jsx`
- GH live file: `/tmp/garren-hill-push/index.html` (standalone HTML)
- FF live file: Vite build via `/app/flowfarm-landing/` repo
- Update master backup after EVERY approved change
- NEVER use Base44 editor chat panel

### Verification Before Every Push
- FF: run `/app/.agents/skills/push_flowfarm.sh`
- GH: check non-ASCII, confirm hero headline locked, confirm image URLs resolve

---

## VIDEO RULES -- LAW, NON-NEGOTIABLE

### Platform
- ALL videos MUST be hosted on Cloudflare Stream. No exceptions.
- NO Vimeo. NO Base44 hosting. NO third-party video players.

### Flow Farm Locked Video URLs (DO NOT CHANGE)
| Video | URL |
|---|---|
| Hero background (forest loop) | `https://customer-qqzxuq43g9w49ny2.cloudflarestream.com/5d06a3b0e25b768ac6dc681dbf4f5b81/manifest/video.m3u8` |
| Property tour ("Enter Flow Farm") | `https://customer-qqzxuq43g9w49ny2.cloudflarestream.com/de1885d159ae310508174f03f775c797/watch` |

### Garren Hill Video
- PENDING -- Rachel to upload to Cloudflare Stream when ready
- Will be a lightbox tour triggered by "Tour the Estate" button

---

## PENDING / TO-DO

### Flow Farm
- [ ] Weave all smart home copy moments into existing sections
- [ ] Spa bath pull quote as full-bleed standalone section
- [ ] "143 lighting circuits" exterior night moment
- [ ] Manifesto section -- text floating on forest canopy bg

### Garren Hill
- [ ] Refine all sections below hero to match new template laws
- [ ] Cormorant Garamond as primary display face throughout
- [ ] Blue Fox / Betty Dumaine section
- [ ] Westminster Abbey pull quote
- [ ] Ann's quote ending
- [ ] Upload property video to Cloudflare Stream

---

## RACHEL'S AESTHETIC PREFERENCES (locked)

- Vibrant NOT dark and moody
- Crystal clear, like floating on glass
- 3D immersive backgrounds with depth
- Editorial serif typography
- Words floating directly on images -- NO glass cards behind text
- Full-bleed cinematic photo reveals
- Specificity in copy -- no vague luxury language
- Aman resort aesthetic as the north star
- Stats and numbers as features, not footnotes
- One template, two expressions -- never two different systems
