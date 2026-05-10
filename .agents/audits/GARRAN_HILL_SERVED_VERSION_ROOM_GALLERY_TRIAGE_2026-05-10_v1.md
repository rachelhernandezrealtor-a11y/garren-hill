# GARRAN HILL — SERVED VERSION + ROOM + GALLERY TRIAGE AUDIT v1
# Date: 2026-05-10
# dist/index.html: NOT EDITED
# Live site: NOT CHANGED
# Cloudinary: NOT MODIFIED

---

## PHASE 1 — SERVED VERSION DIAGNOSTIC

### garren-hill.pages.dev
- HTTP status: 200
- Chars: 85,920
- MD5: cdfa82ed421163738eac6a6af0c28d90
- Local dist/index.html: 85,920 chars / same MD5
- **RESULT: ✅ EXACT MATCH — serving current build**

### rachelhernandez.studio
- HTTP status: 200
- Chars: 86,637 (717 chars more than local)
- MD5: 250bdf3f4d8589c9066a6e9b05f78cb1
- **RESULT: ✅ CONTENT MATCH — difference is Cloudflare infrastructure injection only**

Cloudflare injections detected (not content differences):
- Email obfuscation: `/cdn-cgi/l/email-protection` — CF replaces mailto: links with encoded versions
- Analytics beacon: `cloudflare-static/email-decode.min.js` + `beacon.min.js`
- These 3 injections account for all 717 chars of difference

**Both URLs are serving the current source-safe build. Visual work is cleared to proceed.**

### Unsafe Phrase Scan — dist/index.html
All 19 phrases checked. Result: ✅ CLEAN

Checked:
- Built by Leonard Tufts' own craftsmen → NOT FOUND
- same men who built Pinehurst → NOT FOUND
- same hands that raised the Carolina Hotel → NOT FOUND
- He never spent a night → NOT FOUND
- He died ten days later → NOT FOUND
- Queen of Thailand → NOT FOUND
- Vassar → NOT FOUND
- college friend → NOT FOUND
- shell cabinets were already there → NOT FOUND
- installed in 2022 → NOT FOUND
- Restored in 2022 → NOT FOUND
- guest suite → NOT FOUND
- National Register → NOT FOUND
- tax credit → NOT FOUND
- easement → NOT FOUND
- hardware was specified in 1916 → NOT FOUND
- it has not been replaced → NOT FOUND
- Custom Marvin windows → NOT FOUND
- offered now for the first time → NOT FOUND

### Key Asset Checks — Both Live URLs
- Hero video (done_czfe8o): ✅ Present
- Blue Fox: ✅ Present
- "Someone still puts flowers": ✅ Present
- The Archive: ✅ Present
- Inquiry form: ✅ Present (70 instances of inquiry/form/contact)

---

## PHASE 2 — ROOM NAMING SUMMARY

Full crosswalk: `.agents/photo-maps/GARRAN_HILL_ROOM_NAMING_CROSSWALK_v1.md`

### Verified rooms (no action needed)
| Room | Photo | Status |
|---|---|---|
| Foyer | 200holycrest_1698 | ✅ VERIFIED |
| Dining Room | 200holycrest_1296 | ✅ VERIFIED |
| Kitchen | 200holycrest_1626 | ✅ VERIFIED |
| Library | 200holycrest_1350 | ✅ LIKELY (rolling ladder is specific) |
| Powder Room | 200holycrest_1668 | ✅ VERIFIED (fuchsia chinoiserie unmistakable) |
| Primary Suite | 200holycrest_1278 | ✅ VERIFIED |

### Suspected problems requiring Matterport/Rachel
| Room | Problem | Priority |
|---|---|---|
| Salon vs. Drawing Room | Both cards say "Delft tile" — likely only one room has it | HIGH |
| Staircase | 1182 tagged room_foyer — likely mislabel | HIGH |
| Pool card | Using 192 (room_gardens) not a pool image | HIGH |
| Butler's Pantry | Bundled into kitchen card without confirmed photo | MEDIUM |
| Sunroom/Breakfast Room | Not on site — name and photo both unconfirmed | MEDIUM |
| Primary Bath / Jewel Box | Not on site — needs Rachel pick from 10 candidates | HIGH |

---

## PHASE 3 — MATTERPORT STATUS

URL: https://my.matterport.com/show/?m=mfwyqT5Btwx — ACCESSIBLE
Rocky cannot steer the scan. Rachel walkthrough checklist created in crosswalk file.

14-item checklist covers: Salon vs. Drawing Room, Delft tile room, spiral stair, Library confirmation, Butler's Pantry, Sunroom identity, Jewel Box Bath, secret features locations, Wee Cottage approach, staircase image confirm.

---

## PHASE 4 — GALLERY/LAYOUT STACKING ISSUES

Full audit: `.agents/audits/GARRAN_HILL_GALLERY_STACKING_LAYOUT_RHYTHM_AUDIT_2026-05-10_v1.md`

### Top issues found

| Issue | Section | Priority | Safe to fix now? |
|---|---|---|---|
| 200_hollycrest_drive_192 used 4× across site | canopy, hollycrest, grounds, pool card | HIGH | Pool card: yes. Others: yes (reassign) |
| Social band mobile — 3 landscape images don't stack | #social-rooms | MEDIUM | ✅ CSS only |
| Delft tile copy in both Salon and Drawing Room | #explore cards | HIGH | ⚠️ Hold — Matterport first |
| Staircase image tagged room_foyer | #staircase | HIGH | ⚠️ Hold — Rachel pick |
| Pending room cards not hidden elegantly | #explore | LOW | ✅ CSS only |
| Staircase card in room card grid (should be arch. element) | #explore | LOW | ⚠️ Hold |
| Gallery = 38-image flat grid after editorial build | #gallery | MEDIUM | Hold for room truth first |

---

## PHASE 5 — MICRO PATCHES MADE

**None applied this ticket.** Phase 1 confirmed clean, but no micro patches were made in this ticket — this is a diagnostic + documentation pass only.

Patches cleared for next build ticket:
1. ✅ Mobile social band stack (CSS)
2. ✅ Pending card photo-forthcoming state (CSS)
3. ✅ Blue Fox image 75a1922cd into #hollycrest section (confirmed)
4. ✅ Replace pool card with actual room_pool image (pending Rachel pick)
5. ✅ Move 200_hollycrest_drive_192 to gardens card only

---

## PHASE 6 — BLUE FOX STATUS

**CONFIRMED by Rachel. Not a placeholder. Not unconfirmed.**

Image: `gh_img/75a1922cd`
Inscription: MY IRISH HUNTER / BLUE FOX / 1946–1965
Caption: "Someone still puts flowers there."
Copy: "Betty Dumaine's beloved Irish hunter, Blue Fox, remains part of Hollycrest lore."

This image is ready to deploy in the Hollycrest section.

---

## RECOMMENDED NEXT TICKET

**PHOTO CARD ACCURACY + CONFIRMED ROOMS v1**

Scope (dist/index.html only):
1. Add Blue Fox image (75a1922cd) to #hollycrest section
2. Swap pool card from 192 (gardens) to confirmed room_pool image — Rachel pick first
3. Reassign 192 to gardens card only
4. Fix mobile social band stack — CSS only
5. Add "photography forthcoming" state to pending cards — CSS only
6. Swap staircase image 1182 → confirmed room_hallway_stairs candidate — Rachel pick first

**Gates before build:**
- Rachel picks pool image from: holycrestextf_3334, holycrestextf_3333, drive_177
- Rachel picks staircase replacement from: 1215, 1338, 1569
- Rachel confirms Salon vs. Drawing Room Delft tile (Matterport)

**Items ready now with no pick needed:**
- Blue Fox image deploy
- Mobile social band CSS fix
- Pending card state CSS

---

## FILES CREATED THIS TICKET

| File | Purpose |
|---|---|
| `.agents/photo-maps/GARRAN_HILL_ROOM_NAMING_CROSSWALK_v1.md` | Full room truth crosswalk + Matterport checklist |
| `.agents/audits/GARRAN_HILL_GALLERY_STACKING_LAYOUT_RHYTHM_AUDIT_2026-05-10_v1.md` | Gallery + layout stacking audit |
| `.agents/audits/GARRAN_HILL_SERVED_VERSION_ROOM_GALLERY_TRIAGE_2026-05-10_v1.md` | This file — triage master |

---

*Triage: 2026-05-10 — Rocky*
*dist/index.html: NOT EDITED*
*Live site: NOT CHANGED*
*Cloudinary: NOT MODIFIED*
*Root index.html: NOT TOUCHED*
