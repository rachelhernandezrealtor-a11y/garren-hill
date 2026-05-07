const PREVIEW_SOURCE_URL =
  "https://raw.githubusercontent.com/rachelhernandezrealtor-a11y/garren-hill/codex/garran-launch-stabilization/dist/index.html";

const HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow, noarchive",
};

const NO_HAZE_CSS = `
  /* Codex preview-only no-haze repair v3. Production remains untouched. */
  body::before,
  body::after {
    content: none !important;
    display: none !important;
    opacity: 0 !important;
    background: none !important;
  }
  * {
    -webkit-backdrop-filter: none !important;
    backdrop-filter: none !important;
  }
  :root {
    --text: rgba(245,240,232,0.94) !important;
  }
  body {
    background: #0a0a0a !important;
  }
  .hero-loop-fade { display: none !important; animation: none !important; opacity: 0 !important; }
  .hero-video {
    filter: brightness(1.18) contrast(1.08) saturate(1.06) !important;
    opacity: 1 !important;
  }
  .hero-overlay {
    background:
      linear-gradient(90deg, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.06) 42%, rgba(10,10,10,0) 62%),
      linear-gradient(180deg, rgba(10,10,10,0.02) 0%, rgba(10,10,10,0) 35%, rgba(10,10,10,0) 68%, rgba(10,10,10,0.14) 100%) !important;
  }
  .hero-top-nav.scrolled { backdrop-filter: none !important; background: rgba(10,10,10,0.78) !important; }
  .address-beat,
  .craftsmen-beat,
  .stewardship-beat,
  .restoration-beat,
  .infra-beat,
  .room-beat,
  .room-beat-flip,
  .whp-section,
  .plans-beat,
  .inprint-beat,
  .interstitial {
    opacity: 1 !important;
    filter: none !important;
  }
  .craftsmen-headline,
  .craftsmen-body,
  .craftsmen-body p,
  .craftsmen-pull,
  .room-headline,
  .room-body,
  .room-body p,
  .stewardship-headline,
  .stewardship-body,
  .restoration-headline,
  .restoration-body,
  .infra-headline,
  .infra-body,
  .plans-headline,
  .plans-body,
  .inprint-title,
  .threshold-headline,
  .threshold-body,
  .threshold-body p,
  .whp-titles-headline,
  .whp-titles-bio,
  .whp-titles-bio p,
  .whp-farm-source,
  .whp-last-coda {
    color: rgba(245,240,232,0.94) !important;
    opacity: 1 !important;
    filter: none !important;
    text-shadow: none !important;
  }
  .craftsmen-eyebrow,
  .room-eyebrow,
  .stewardship-eyebrow,
  .restoration-eyebrow,
  .infra-eyebrow,
  .plans-eyebrow,
  .inprint-eyebrow,
  .threshold-eyebrow,
  .whp-titles-eyebrow {
    opacity: 0.92 !important;
    color: #C9A96E !important;
    filter: none !important;
  }
  .craftsmen-rule,
  .room-rule,
  .stewardship-beat::before,
  .stewardship-beat::after,
  .restoration-rule,
  .threshold-rule,
  .interstitial-rule,
  .interstitial-rule-bottom {
    opacity: 0.72 !important;
    filter: none !important;
  }
  .threshold-overlay {
    background:
      linear-gradient(to right, rgba(10,10,10,0.34) 0%, rgba(10,10,10,0.16) 42%, rgba(10,10,10,0) 72%),
      linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0) 48%, rgba(10,10,10,0.20) 100%) !important;
  }
  .fullbleed-overlay-left {
    background: linear-gradient(to right, rgba(10,10,10,0.34) 0%, rgba(10,10,10,0.14) 45%, rgba(10,10,10,0.02) 100%) !important;
  }
  .fullbleed-overlay-dark {
    background: rgba(10,10,10,0.20) !important;
  }
  .twilight-overlay {
    background: linear-gradient(to bottom,
      rgba(10,10,10,0.12) 0%,
      rgba(10,10,10,0.04) 30%,
      rgba(10,10,10,0.28) 70%,
      rgba(10,10,10,0.62) 100%
    ) !important;
  }
  .kb-overlay {
    background:
      radial-gradient(ellipse at 0% 0%, rgba(5,3,2,0.20) 0%, transparent 52%),
      radial-gradient(ellipse at 100% 0%, rgba(5,3,2,0.20) 0%, transparent 52%),
      radial-gradient(ellipse at 0% 100%, rgba(5,3,2,0.28) 0%, transparent 52%),
      radial-gradient(ellipse at 100% 100%, rgba(5,3,2,0.28) 0%, transparent 52%),
      linear-gradient(to bottom,
        rgba(10,10,10,0.06) 0%,
        rgba(10,10,10,0) 48%,
        rgba(10,10,10,0.22) 76%,
        rgba(10,10,10,0.46) 100%
      ) !important;
  }
  .threshold-img,
  .fullbleed-beat img,
  .twilight-bg,
  .room-img-wrap img,
  .kb-gate .kb-img,
  .whp-titles-right img,
  .whp-letter-panel img,
  #whp-letter-p354.dimming img {
    filter: none !important;
    opacity: 1 !important;
  }
  section.fullbleed-beat > div[style*="background:linear-gradient"],
  section.fullbleed-beat > div[style*="background: linear-gradient"],
  section.fullbleed-beat > div[style*="rgba(10,10,10,0.72)"] {
    background: linear-gradient(to right, rgba(10,10,10,0.34) 0%, rgba(10,10,10,0.06) 100%) !important;
  }
  .fade-in,
  .scroll-reveal,
  .address-beat,
  .craftsmen-beat,
  .stewardship-beat,
  .restoration-beat,
  .infra-beat,
  .room-beat,
  .room-beat-flip,
  .plans-beat,
  .inprint-beat,
  .interstitial,
  .kb-line-1,
  .kb-line-2,
  .kb-line-3,
  .kb-address-wrapper,
  .kb-rule-top-anim,
  .kb-rule-bottom-anim,
  .whp-titles-eyebrow,
  .whp-titles-headline,
  .whp-titles-bio,
  .whp-titles-right,
  .whp-farm-quote,
  .whp-farm-source,
  .whp-letter-panel,
  .whp-last-quote,
  .whp-last-cite {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    filter: none !important;
  }
`;

function applyPreviewCorrections(html) {
  let next = html
    .replace(/Last_Hero_3_ei2bur\.mp4/g, "Last_for_real_q0fqvw.mp4")
    .replace(/he never walked through the door/gi, "he never spent a night here");

  if (!next.includes("Codex preview-only no-haze repair v3")) {
    next = next.replace("</style>", `${NO_HAZE_CSS}\n</style>`);
  }

  return next;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const response = await fetch(PREVIEW_SOURCE_URL, {
        headers: { accept: "text/html" },
        cf: { cacheTtl: 30, cacheEverything: true },
      });

      if (!response.ok) {
        return new Response("Preview source unavailable", { status: 502 });
      }

      const html = applyPreviewCorrections(await response.text());
      return new Response(html, { headers: HEADERS });
    }

    return env.ASSETS.fetch(request);
  },
};
