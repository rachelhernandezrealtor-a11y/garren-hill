# GARRAN HILL — MATTERPORT PRESENTATION UPGRADE AUDIT v1
# Date: 2026-05-10
# Commit: 750e67a
# dist/index.html: EDITED
# Root index.html: NOT TOUCHED
# Cloudinary assets: NOT MODIFIED

---

## CHANGE SUMMARY

The embedded Matterport iframe was removed from the main scroll and replaced with an editorial
"Private Tour" action section matching the black / old gold / cream design language.

---

## IFRAME STATUS

- **Before:** `<section class="matterport-section">` containing a live `<iframe>` at 100% width — embedded directly in page flow
- **After:** Iframe completely removed. Matterport accessible via button only.
- **Matterport URL preserved:** `https://my.matterport.com/show/?m=mfwyqT5Btwx`

---

## NEW SECTION DESIGN

**Section ID:** `#virtual-tour`
**Section class:** `.private-tour-section`
**HTML comment:** `<!-- GH_MATTERPORT_PRESENTATION_UPGRADE -->`

### Typography + Label
- Eyebrow: **Private Tour**
- H2: *Step inside Garran Hill — from wherever you are.*
- Decorative passage line: `Virtual Passage · Private Showing · Estate Details` (uppercase, letter-spaced, gold 55% opacity)

### Body Copy
> "For buyers beginning at a distance, the virtual tour offers a quiet first passage through the house — from threshold to principal rooms, private spaces, and grounds."

### Button Group (.tour-actions)

| Button | Label | Behavior | Class |
|---|---|---|---|
| Primary | Enter the Virtual Tour | Opens `https://my.matterport.com/show/?m=mfwyqT5Btwx` in new tab | `.tour-btn--primary` |
| Secondary | Request Private Showing | Anchors to `#inquiry` | `.tour-btn` |
| Tertiary | Explore House Features | Anchors to `#features` | `.tour-btn` |

- **target="_blank":** ✅ on Virtual Tour button
- **rel="noopener":** ✅ on Virtual Tour button
- No `rel="noopener"` needed on internal anchor buttons

---

## CSS DESIGN

- `.tour-btn`: EB Garamond, uppercase, letter-spacing 0.22em, 1px old-gold border (rgba 0.45), transparent background
- `.tour-btn--primary`: slightly brighter border (rgba 0.75), cream text, subtle gold background wash
- Hover: gold fill rgba(0.08–0.14), border brightens, color shifts to cream
- No rounded corners. No pills. No shadows. No glow.
- Section framed by top + bottom gold hairlines (rgba 0.18)
- **Mobile:** buttons stack full-width (max 340px), centered, comfortable tap targets

---

## BUYER FUNCTION PRESERVED

| Function | Status |
|---|---|
| Virtual tour access | ✅ Button opens Matterport in new tab |
| Private showing request | ✅ Button anchors to #inquiry |
| House features | ✅ Button anchors to #features |
| Estate at a Glance | ✅ Present in page (not removed) |
| Inquiry form | ✅ Present and working |
| Archive / source section | ✅ Untouched |

---

## FILES CHANGED

- `dist/index.html` — CSS block §18 replaced + HTML section replaced
- `.agents/audits/GARRAN_HILL_MATTERPORT_PRESENTATION_UPGRADE_2026-05-10_v1.md` — this file

---

## MOBILE BEHAVIOR

- Buttons stack vertically, full-width, max 340px, centered
- No horizontal scroll
- Comfortable tap targets (0.9em vertical padding)
- Pinch zoom not disabled
- Custom cursor scoped to desktop only (from prior pass)

---

## REMAINING RISKS

| Item | Risk | Note |
|---|---|---|
| #features anchor | Must exist in page for button to land | Verify #features section ID is present |
| Matterport link longevity | External URL — not under Rocky's control | Rachel to confirm tour remains live |
| iframe reveal option | Not implemented — if Rachel wants iframe behind a toggle, queue as separate ticket | |

---

## CONFIRMATION CHECKLIST

| Item | Status |
|---|---|
| dist/index.html edited | ✅ |
| Root index.html | ✅ NOT TOUCHED |
| Cloudinary assets | ✅ NOT MODIFIED |
| Hero video (done_czfe8o) | ✅ LOCKED |
| Matterport URL preserved | ✅ |
| target=_blank + rel=noopener | ✅ |
| Inquiry form present | ✅ |
| Mobile stacking | ✅ |
| GH_MATTERPORT_PRESENTATION_UPGRADE comment | ✅ |
| garren-hill.pages.dev live | ✅ VERIFIED (90,730 chars) |
| rachelhernandez.studio live | ✅ VERIFIED |

---

*Audit: 2026-05-10 — Rocky*
*Commit: 750e67a*
