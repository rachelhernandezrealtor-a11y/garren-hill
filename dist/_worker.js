const ROOT_BUILD_URL =
  "https://raw.githubusercontent.com/rachelhernandezrealtor-a11y/garren-hill/preview/garran-hill-safe-access/index.html";

const HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow, noarchive",
};

function applyPreviewCorrections(html) {
  return html
    .replace(
      `.hero-loop-fade { position: absolute; inset: 0; z-index: 1; background: #000; pointer-events: none;
    animation: loopFade 6s linear infinite; }`,
      `.hero-loop-fade { display: none; }`
    )
    .replace(
      `linear-gradient(90deg, rgba(10,10,10,0.48) 0%, rgba(10,10,10,0.22) 42%, rgba(10,10,10,0.0) 62%),
      linear-gradient(180deg, rgba(10,10,10,0.10) 0%, rgba(10,10,10,0.0) 30%, rgba(10,10,10,0.0) 60%, rgba(10,10,10,0.50) 100%);`,
      `linear-gradient(90deg, rgba(10,10,10,0.28) 0%, rgba(10,10,10,0.12) 42%, rgba(10,10,10,0.0) 62%),
      linear-gradient(180deg, rgba(10,10,10,0.06) 0%, rgba(10,10,10,0.0) 35%, rgba(10,10,10,0.0) 68%, rgba(10,10,10,0.28) 100%);`
    )
    .replace("Last_Hero_3_ei2bur.mp4", "Last_for_real_q0fqvw.mp4");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      const response = await fetch(ROOT_BUILD_URL, {
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