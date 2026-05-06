const PREVIEW_SOURCE_URL =
  "https://raw.githubusercontent.com/rachelhernandezrealtor-a11y/garren-hill/codex/garran-launch-stabilization/dist/index.html";

const HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow, noarchive",
};

const NO_HAZE_CSS = `
  /* Codex preview-only no-haze repair. Production remains untouched. */
  body::after { display: none !important; }
  .hero-loop-fade { display: none !important; animation: none !important; opacity: 0 !important; }
  .hero-video { filter: brightness(1.12) contrast(1.06) saturate(1.04) !important; }
  .hero-overlay {
    background:
      linear-gradient(90deg, rgba(10,10,10,0.28) 0%, rgba(10,10,10,0.12) 42%, rgba(10,10,10,0) 62%),
      linear-gradient(180deg, rgba(10,10,10,0.04) 0%, rgba(10,10,10,0) 35%, rgba(10,10,10,0) 68%, rgba(10,10,10,0.24) 100%) !important;
  }
  .hero-top-nav.scrolled { backdrop-filter: none !important; background: rgba(10,10,10,0.78) !important; }
  .fade-in,
  .scroll-reveal,
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

  if (!next.includes("Codex preview-only no-haze repair")) {
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