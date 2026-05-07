const PREVIEW_SOURCE_URL =
  "https://raw.githubusercontent.com/rachelhernandezrealtor-a11y/garren-hill/codex/garran-launch-stabilization/dist/index.html";

const HEADERS = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
  "x-robots-tag": "noindex, nofollow, noarchive",
};

const REFINED_HERO_TITLE_RULE =
  ".hero-title { font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 8.4rem; line-height: 0.92; font-weight: 300; font-style: normal; letter-spacing: 0; color: #F5F0E8; margin-bottom: clamp(12px, 1.5vh, 22px); white-space: nowrap; opacity: 1; -webkit-text-stroke: 0; paint-order: normal; text-shadow: 0 2px 28px rgba(0,0,0,0.74), 0 1px 2px rgba(0,0,0,0.55); }";

const NO_HAZE_CSS = `
  /* Codex preview-only no-haze repair v4. Production remains untouched. */
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
  .hero-title {
    font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif !important;
    font-size: 8.4rem !important;
    font-weight: 300 !important;
    font-style: normal !important;
    letter-spacing: 0 !important;
    line-height: 0.92 !important;
    color: #F5F0E8 !important;
    -webkit-text-stroke: 0 !important;
    paint-order: normal !important;
    text-shadow:
      0 2px 28px rgba(0,0,0,0.74),
      0 1px 2px rgba(0,0,0,0.55) !important;
  }
  @media (max-width: 1100px) {
    .hero-title { font-size: 6.8rem !important; }
  }
  @media (max-width: 760px) {
    .hero-title {
      font-size: 4.2rem !important;
      white-space: normal !important;
    }
  }
  @media (max-width: 420px) {
    .hero-title { font-size: 3.3rem !important; }
  }
  .hero-overlay {
    background:
      linear-gradient(90deg, rgba(10,10,10,0.18) 0%, rgba(10,10,10,0.06) 42%, rgba(10,10,10,0) 62%),
      linear-gradient(180deg, rgba(10,10,10,0.02) 0%, rgba(10,10,10,0) 35%, rgba(10,10,10,0) 68%, rgba(10,10,10,0.14) 100%) !important;
  }
  @media (max-width: 767px) {
    html,
    body {
      max-width: 100% !important;
      overflow-x: hidden !important;
    }
    .hero-viewport,
    .hero,
    .stat-bar {
      width: 100% !important;
      max-width: 100vw !important;
      overflow: hidden !important;
    }
    .hero-top-nav {
      position: fixed !important;
      top: 0 !important;
      bottom: auto !important;
      left: 0 !important;
      right: 0 !important;
      max-width: 100vw !important;
      display: grid !important;
      grid-template-columns: 1fr auto !important;
      padding: 14px 20px !important;
      overflow: hidden !important;
    }
    .nav-center,
    .nav-links {
      display: none !important;
    }
    .nav-logo {
      min-width: 0 !important;
    }
    .stat-bar {
      display: grid !important;
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      align-items: center !important;
      justify-items: center !important;
      padding-left: clamp(12px, 4vw, 20px) !important;
      padding-right: clamp(12px, 4vw, 20px) !important;
      width: min(390px, 100vw) !important;
      max-width: 390px !important;
      margin-left: 0 !important;
      margin-right: auto !important;
      overflow: hidden !important;
    }
    .stat-bar-mobile-crest {
      grid-column: 1 / -1 !important;
      width: 100% !important;
    }
    .stat-bar-row {
      display: contents !important;
    }
    .stat-item {
      width: 100% !important;
      min-width: 0 !important;
    }
    .stat-number {
      max-width: 100% !important;
      font-size: clamp(16px, 4.2vw, 21px) !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }
    .stat-unit {
      display: block !important;
      margin-left: 0 !important;
      margin-top: 2px !important;
      font-size: 0.52em !important;
    }
    .stat-label {
      white-space: normal !important;
      letter-spacing: 0.14em !important;
      line-height: 1.1 !important;
    }
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
  .craftsmen-beat > img[style] {
    opacity: 0.62 !important;
    filter: brightness(1.12) contrast(1.04) saturate(1.04) !important;
  }
  .craftsmen-beat > div[style*="linear-gradient"],
  .craftsmen-beat > div[style*="rgba(10,10,10,0.96)"],
  .craftsmen-beat > div[style*="rgba(10, 10, 10, 0.96)"] {
    background: linear-gradient(105deg,
      rgba(10,10,10,0.70) 0%,
      rgba(10,10,10,0.38) 48%,
      rgba(10,10,10,0.16) 100%
    ) !important;
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
    text-shadow: 0 2px 18px rgba(0,0,0,0.72) !important;
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

const LIVE_PREVIEW_BUILDER_SCRIPT = `
<script id="rachel-studio-live-draft-bridge">
  (() => {
    const ALLOWED_STUDIO_ORIGINS = new Set([
      "https://rachelhernandez.studio",
      "http://localhost:8787",
      "http://127.0.0.1:8787"
    ]);
    const STYLE_ID = "rachel-studio-live-preview-css";

    function getDraftStyle() {
      let style = document.getElementById(STYLE_ID);
      if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        style.setAttribute("data-rachel-studio", "live-preview-draft");
        document.head.appendChild(style);
      }
      return style;
    }

    function applyLiveCss(css) {
      const safeCss = String(css || "").slice(0, 60000);
      getDraftStyle().textContent = [
        "/* Rachel Studio live draft. Protected preview only. Not production. */",
        safeCss
      ].join("\n");
      document.documentElement.setAttribute("data-rachel-studio-live-draft", "on");
    }

    function applyCopyEdits(edits) {
      if (!Array.isArray(edits)) return;
      edits.slice(0, 24).forEach((edit) => {
        const selector = String(edit && edit.selector || "").trim();
        const text = String(edit && (edit.text || edit.replace) || "").slice(0, 2500);
        const index = Number.isFinite(edit && edit.index) ? edit.index : 0;
        if (!selector || !text) return;
        if (/script|style|iframe|form|input|textarea|video|source|img/i.test(selector)) return;
        let nodes = [];
        try {
          nodes = Array.from(document.querySelectorAll(selector));
        } catch {
          return;
        }
        const node = nodes[index] || nodes[0];
        if (!node || /^(SCRIPT|STYLE|IFRAME|FORM|INPUT|TEXTAREA|VIDEO|SOURCE|IMG)$/i.test(node.tagName)) return;
        if (!node.dataset.rachelStudioOriginalText) {
          node.dataset.rachelStudioOriginalText = node.textContent || "";
        }
        node.textContent = text;
        node.setAttribute("data-rachel-studio-copy-draft", "on");
      });
    }

    function clearCopyEdits() {
      document.querySelectorAll("[data-rachel-studio-copy-draft]").forEach((node) => {
        if (node.dataset.rachelStudioOriginalText !== undefined) {
          node.textContent = node.dataset.rachelStudioOriginalText;
        }
        delete node.dataset.rachelStudioOriginalText;
        node.removeAttribute("data-rachel-studio-copy-draft");
      });
    }

    function safeMediaUrl(value) {
      const url = String(value || "").trim();
      if (!url) return "";
      try {
        const parsed = new URL(url, window.location.href);
        const allowedHosts = [
          "res.cloudinary.com",
          "image.mux.com",
          "customer-",
          window.location.host
        ];
        const isCloudflareStream = parsed.hostname.endsWith(".cloudflarestream.com");
        const isAllowedHost = allowedHosts.includes(parsed.hostname) || isCloudflareStream;
        if ((parsed.protocol === "https:" || parsed.origin === window.location.origin) && isAllowedHost) {
          return parsed.href;
        }
      } catch {}
      return "";
    }

    function applyMediaEdits(edits) {
      if (!Array.isArray(edits)) return;
      edits.slice(0, 24).forEach((edit) => {
        const selector = String(edit && edit.selector || "").trim();
        const src = safeMediaUrl(edit && (edit.src || edit.url));
        const index = Number.isFinite(edit && edit.index) ? edit.index : 0;
        if (!selector || !src) return;
        let nodes = [];
        try {
          nodes = Array.from(document.querySelectorAll(selector));
        } catch {
          return;
        }
        const node = nodes[index] || nodes[0];
        if (!node || !/^(IMG|VIDEO|SOURCE)$/i.test(node.tagName)) return;
        if (!node.dataset.rachelStudioOriginalSrc) {
          node.dataset.rachelStudioOriginalSrc = node.getAttribute("src") || "";
        }
        node.setAttribute("src", src);
        if (node.tagName === "VIDEO") {
          node.load();
          node.play?.().catch(() => {});
        }
        const parentVideo = node.closest("video");
        if (parentVideo && node.tagName === "SOURCE") {
          parentVideo.load();
          parentVideo.play?.().catch(() => {});
        }
        node.setAttribute("data-rachel-studio-media-draft", "on");
      });
    }

    function clearMediaEdits() {
      document.querySelectorAll("[data-rachel-studio-media-draft]").forEach((node) => {
        if (node.dataset.rachelStudioOriginalSrc !== undefined) {
          node.setAttribute("src", node.dataset.rachelStudioOriginalSrc);
        }
        delete node.dataset.rachelStudioOriginalSrc;
        node.removeAttribute("data-rachel-studio-media-draft");
        if (node.tagName === "VIDEO") node.load();
        const parentVideo = node.closest("video");
        if (parentVideo && node.tagName === "SOURCE") parentVideo.load();
      });
    }

    function clearLiveCss() {
      const style = document.getElementById(STYLE_ID);
      if (style) style.remove();
      clearCopyEdits();
      clearMediaEdits();
      document.documentElement.removeAttribute("data-rachel-studio-live-draft");
    }

    function describeNode(node) {
      const rect = node.getBoundingClientRect();
      const computed = window.getComputedStyle(node);
      const src = node.currentSrc || node.src || node.getAttribute?.("src") || "";
      return {
        tag: node.tagName,
        id: node.id || "",
        className: typeof node.className === "string" ? node.className : "",
        text: (node.innerText || node.textContent || "").replace(/\s+/g, " ").trim().slice(0, 260),
        src,
        rect: {
          x: Math.round(rect.x),
          y: Math.round(rect.y),
          width: Math.round(rect.width),
          height: Math.round(rect.height)
        },
        opacity: computed.opacity,
        filter: computed.filter,
        backdropFilter: computed.backdropFilter || computed.webkitBackdropFilter || "",
        background: computed.backgroundImage && computed.backgroundImage !== "none" ? computed.backgroundImage.slice(0, 260) : computed.backgroundColor,
        objectFit: computed.objectFit,
        objectPosition: computed.objectPosition,
        zIndex: computed.zIndex,
        position: computed.position
      };
    }

    function isVisibleInViewport(node) {
      const rect = node.getBoundingClientRect();
      return rect.width > 2 &&
        rect.height > 2 &&
        rect.bottom >= 0 &&
        rect.right >= 0 &&
        rect.top <= window.innerHeight &&
        rect.left <= window.innerWidth;
    }

    function createVisualSnapshot() {
      const candidates = Array.from(document.querySelectorAll("main, section, header, nav, article, div, h1, h2, h3, p, a, button, img, video, source"))
        .filter(isVisibleInViewport)
        .slice(0, 220);
      const visibleElements = candidates
        .filter((node) => !/^(SOURCE)$/i.test(node.tagName))
        .slice(0, 48)
        .map(describeNode);
      const visibleMedia = Array.from(document.querySelectorAll("img, video, source"))
        .filter(isVisibleInViewport)
        .slice(0, 24)
        .map(describeNode);
      const hazeSuspects = candidates.filter((node) => {
        const computed = window.getComputedStyle(node);
        const joined = [
          node.id,
          typeof node.className === "string" ? node.className : "",
          computed.opacity,
          computed.filter,
          computed.backdropFilter || computed.webkitBackdropFilter || "",
          computed.backgroundImage,
          computed.backgroundColor,
          computed.mixBlendMode,
          computed.position
        ].join(" ").toLowerCase();
        return /overlay|fade|haze|veil|mist|blur|filter|backdrop|rgba\(10,\s*10,\s*10|linear-gradient|radial-gradient/.test(joined) ||
          Number.parseFloat(computed.opacity) < 0.96 ||
          computed.filter !== "none" ||
          (computed.backdropFilter && computed.backdropFilter !== "none") ||
          (computed.webkitBackdropFilter && computed.webkitBackdropFilter !== "none");
      }).slice(0, 30).map(describeNode);

      return {
        capturedAt: new Date().toISOString(),
        url: window.location.href,
        title: document.title || "",
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight,
          devicePixelRatio: window.devicePixelRatio || 1
        },
        scroll: {
          x: Math.round(window.scrollX),
          y: Math.round(window.scrollY)
        },
        counts: {
          visible: visibleElements.length,
          media: visibleMedia.length,
          hazeSuspects: hazeSuspects.length
        },
        visibleText: visibleElements.map((item) => item.text).filter(Boolean).slice(0, 18),
        visibleElements,
        visibleMedia,
        hazeSuspects
      };
    }

    window.addEventListener("message", (event) => {
      if (!ALLOWED_STUDIO_ORIGINS.has(event.origin)) return;
      const data = event.data || {};
      if (data.source !== "rachel-studio" || data.channel !== "preview-builder") return;
      if (data.type === "request-visual-snapshot") {
        event.source?.postMessage({
          source: "rachel-studio-preview",
          channel: "preview-builder",
          type: "visual-snapshot",
          requestId: data.requestId || "",
          snapshot: createVisualSnapshot()
        }, event.origin);
        return;
      }
      if (data.type === "apply-css") applyLiveCss(data.css);
      if (data.type === "apply-copy") applyCopyEdits(data.copyEdits);
      if (data.type === "apply-media") applyMediaEdits(data.mediaEdits);
      if (data.type === "apply-draft") {
        applyLiveCss(data.css);
        applyCopyEdits(data.copyEdits);
        applyMediaEdits(data.mediaEdits);
      }
      if (data.type === "clear-css") clearLiveCss();
      if (data.type === "clear-draft") clearLiveCss();
    });
  })();
</script>`;

function applyPreviewCorrections(html) {
  let next = html
    .replace(/Last_Hero_3_ei2bur\.mp4/g, "Last_for_real_q0fqvw.mp4")
    .replace(/he never walked through the door/gi, "he never spent a night here")
    .replace(/BEAT 8\s*—\s*LIVING ROOM/g, "BEAT 8 - SALON")
    .replace(/THE LIVING ROOM/g, "THE SALON")
    .replace(/The Living Room/g, "The Salon")
    .replace(
      /\.hero-title\s*\{\s*font-family:\s*['"]Pinyon Script['"],\s*cursive;[^}]*\}/,
      REFINED_HERO_TITLE_RULE
    )
    .replace(
      /\.hero-title\s*\{\s*font-size:\s*clamp\(3\.8rem,\s*14vw,\s*7rem\);\s*\}/g,
      ".hero-title { font-size: 4.2rem; white-space: normal; }"
    )
    .replace(
      /<div class="hero-title"\s+style="white-space:nowrap;">Garran Hill<\/div>/g,
      '<div class="hero-title">Garran Hill</div>'
    )
    .replace(
      /She hosted the Queen of Thailand\s*—\s*a college friend\s*—\s*and her entourage\./gi,
      "She continued the property's tradition of private hospitality."
    );

  if (!next.includes("Codex preview-only no-haze repair v4")) {
    next = next.replace("</style>", `${NO_HAZE_CSS}\n</style>`);
  }

  if (!next.includes("rachel-studio-live-draft-bridge")) {
    next = next.replace("</body>", `${LIVE_PREVIEW_BUILDER_SCRIPT}\n</body>`);
  }

  return next;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/" || url.pathname === "/index.html") {
      let response = await fetch(PREVIEW_SOURCE_URL, {
        headers: { accept: "text/html" },
        cf: { cacheTtl: 30, cacheEverything: true },
      });

      if (!response.ok) {
        const assetUrl = new URL("/index.html", request.url);
        response = await env.ASSETS.fetch(new Request(assetUrl, request));
      }

      if (!response.ok) {
        return new Response("Preview source unavailable", { status: 502 });
      }

      const html = applyPreviewCorrections(await response.text());
      return new Response(html, { headers: HEADERS });
    }

    return env.ASSETS.fetch(request);
  },
};
