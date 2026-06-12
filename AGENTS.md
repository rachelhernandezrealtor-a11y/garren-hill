# AGENTS.md — Start Here
# For: Cursor / Claude Code / any AI agent editing this codebase
# Last updated: 2026-05-01

---

## Read These First — In Order

0. **[RACHEL-LIVE-RULES.md](.agents/rules/RACHEL-LIVE-RULES.md)**
   THE LIVING LAW. Supersedes everything below when they conflict. Only MLS
   facts and verified citations are fixed; every older brief is a work in
   progress that contains errors. Current Rachel is the only authority.

1. **[MASTER_BRIEF.md](.agents/rules/MASTER_BRIEF.md)**
   The complete project brief. Property facts, architecture, history, locked copy, tool chain, deployment rules, and buyer persona. This is the single source of truth. It overrides everything else.

2. **[VOICE_AND_STYLE.md](.agents/rules/VOICE_AND_STYLE.md)**
   The law of the page. Voice, banned words, locked copy moments, typography, mobile-first responsive rules, conversion rules, and historical accuracy requirements. Read before touching a single word.

3. **[WORKFLOW.md](.agents/rules/WORKFLOW.md)**
   The five-step build process. Every property follows this exactly.

---

## Project in Brief

This is the Garran Hill property site — 200 Hollycrest Drive, Pinehurst, NC.
Built 1915–16 for Walter Hines Page. Neo-Georgian. Restored 1999–2001.
Listed at $4,250,000 by Rachel Hernandez, Sotheby's International Realty.

The site is editorial-led, not listing-led. Copy, photography, and design are held to a publishing standard, not a real estate standard.

---

## Deployment

- **Live site:** rachelhernandez.studio (Cloudflare Pages)
- **Dev URL:** garren-hill.pages.dev
- **Repo:** rachelhernandezrealtor-a11y/garren-hill (GitHub)
- **Source of truth for HTML:** `dist/index.html` — Cloudflare serves this, NOT root `index.html`
- **Media:** Cloudinary cloud `dghn2xpif`, all assets under `gh_key/` prefix

After every deploy, run:
```
curl -X POST "https://api.cloudflare.com/client/v4/zones/ba9f1f552f0ee309df0b992e7e670c6f/purge_cache" \
  -H "Authorization: Bearer $CLOUDFLARE_ROCKY_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

---

## Hard Rules (Quick Reference)

- **Never name:** Ann McAllister / Dr. Russell McAllister / David Prest
- **Tennis courts: SELLING POINT** (Rachel, 2026-06-12). Two private courts within the estate grounds, marketed proudly. The only required honesty: they need resurfacing. The old "never market" rule is dead.
- **Never use:** nested, boasts, charming, stunning, elegant, luxurious, or any banned word from VOICE_AND_STYLE.md
- **Never swap:** hero video `Last_for_real_q0fqvw` or wax seal `gh_wax_seal_v3`
- **One site. One deployment.** Do not create alternate branches or staging environments without approval.
- **Spaceship Law:** Every edit commits to GitHub immediately. No batching.

---

## Decision Records

All locked design and copy decisions are logged in `.agents/decisions/`.
If a decision has a DEC-XXX record, it is final. Do not override without a new record.

---

*Part of the rachel hernandez studio system.*
*For Rocky (Base44 Superagent): https://app.base44.com/superagent/69e248a2469cc39540781cce*
