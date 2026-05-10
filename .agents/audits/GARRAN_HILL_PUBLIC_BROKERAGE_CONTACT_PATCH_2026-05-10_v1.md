# GARRAN HILL — PUBLIC BROKERAGE CONTACT PATCH AUDIT v1
# Date: 2026-05-10
# Commit: b6b6cab
# dist/index.html: EDITED (11 patches, +30 lines)
# Root index.html: NOT TOUCHED
# Cloudinary assets: NOT MODIFIED

---

## LIVE STATUS

garren-hill.pages.dev: DEPLOYING (cache purged)
rachelhernandez.studio: DEPLOYING

---

## CONFIRMED PUBLIC CONTACT — GARRAN HILL

| Field | Value |
|---|---|
| Agent | Rachel Hernandez |
| Brokerage | Pines Sotheby's International Realty |
| Location | Southern Pines, North Carolina |
| Public email | rachel.hernandez@sothebysrealty.com |
| Phone | NOT PUBLIC — not displayed |

---

## PATCHES APPLIED (11 total)

### 1. Inquiry visible mailto link
- Old: `mailto:rachelhernandezrealtor@gmail.com?subject=Garran Hill — Private Showing Request`
- New: `mailto:rachel.hernandez@sothebysrealty.com?subject=Garran%20Hill%20Private%20Showing%20Request`

### 2. Inquiry section body copy
- Old: `Sotheby's International Realty, Pinehurst · Rachel Hernandez.`
- New: `For private showings and offering details, please inquire directly with Rachel Hernandez at Pines Sotheby's International Realty.`

### 3. JS mailto fallback
- Old: `'mailto:rachelhernandezrealtor@gmail.com?subject=…'`
- New: `'mailto:rachel.hernandez@sothebysrealty.com?subject=…'`

### 4. JS code comment
- Old: `// Do not expose private owner emails. rachelhernandezrealtor@gmail.com is the…`
- New: `// Do not expose private owner emails. Public email: rachel.hernandez@sothebysrealty.com. This is the…`

### 5. HTML comment (GH_INQUIRY_CONTACT_ENDPOINT_NEEDED)
- Gmail reference updated to sothebysrealty.com

### 6. Schema/nav lockup (HTML entity apostrophe variant)
- Old: `Sotheby's International Realty, Pinehurst · Rachel Hernandez · $4,250,000`
- New: `Pines Sotheby's International Realty · Rachel Hernandez · Southern Pines, NC · $4,250,000`

### 7. Closing section lockup
- Old: `Sotheby's International Realty · Rachel Hernandez · Pinehurst, NC · $4,250,000`
- New: `Pines Sotheby's International Realty · Rachel Hernandez · Southern Pines, NC · $4,250,000`

### 8. OG meta description
- Old: `Offered by Sotheby's International Realty.`
- New: `Offered by Pines Sotheby's International Realty, Southern Pines, NC.`

### 9. Schema: broker / RealEstateAgent block added
```json
"broker": {
  "@type": "RealEstateAgent",
  "name": "Rachel Hernandez",
  "worksFor": {
    "@type": "RealEstateAgent",
    "name": "Pines Sotheby's International Realty",
    "address": {"@type":"PostalAddress","addressLocality":"Southern Pines","addressRegion":"NC","addressCountry":"US"}
  },
  "email": "rachel.hernandez@sothebysrealty.com"
}
```
No telephone field added.

### 10. Footer added
New `<footer>` element added before `</body>`:
- Rachel Hernandez (eyebrow label)
- Pines Sotheby's International Realty
- Southern Pines, North Carolina
- rachel.hernandez@sothebysrealty.com (clickable mailto, subject pre-filled)
- No phone number

### 11. Schema telephone scan
- No existing telephone field found — clean.

---

## CONTACT SAFETY VERIFICATION (post-patch)

| Check | Result |
|---|---|
| Gmail remaining in HTML | NONE — clean |
| tel: links | NONE — clean |
| Phone number patterns (###-###-####) | NONE — clean |
| Drruss / DrRuss | ABSENT |
| New email occurrences | 7 (footer, inquiry link, inquiry copy, JS fallback, comment, schema, closing) |
| Footer present | YES |
| Schema broker block | YES |
| Telephone field in schema | ABSENT |
| Hero video intact | YES (done_czfe8o) |
| Inquiry form present | YES |

---

## FILES CHANGED

- `dist/index.html` — 11 contact patches
- `.agents/rules/RACHEL_STUDIO_GLOBAL_STANDARD_v1.md` — Section 12 added: Public Contact Standard
- `.agents/README_CURRENT_STATUS.md` — Public Brokerage Contact block added
- `.agents/audits/GARRAN_HILL_PUBLIC_BROKERAGE_CONTACT_PATCH_2026-05-10_v1.md` — this file

---

## CONFIRMATION CHECKLIST

| Item | Status |
|---|---|
| dist/index.html edited | ✅ |
| Root index.html | ✅ NOT TOUCHED |
| Cloudinary assets | ✅ NOT MODIFIED |
| Hero video (done_czfe8o) | ✅ LOCKED |
| No phone number displayed | ✅ CONFIRMED |
| Gmail removed from public HTML | ✅ CONFIRMED |
| Private owner emails not exposed | ✅ CONFIRMED |
| Inquiry form mailto → sothebysrealty.com | ✅ |
| Footer contact block | ✅ ADDED |
| Schema broker block | ✅ ADDED (no telephone) |
| Inquiry form still works | ✅ |
| garren-hill.pages.dev | ✅ DEPLOYING |
| rachelhernandez.studio | ✅ DEPLOYING |

---

*Audit: 2026-05-10 — Rocky*
*Commit: b6b6cab*
