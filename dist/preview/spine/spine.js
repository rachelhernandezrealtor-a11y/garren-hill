/* ============================================================================
   RACHEL STUDIO -- THE SPINE  -  spine.js  -  GSAP motion engine  -  v1
   ----------------------------------------------------------------------------
   ONE engine, named effects driven by data-attributes. A property adds markup;
   it never writes bespoke animation JS. Loads GSAP + ScrollTrigger from CDN.

   EFFECTS (data-attribute API):
     [data-reveal]            fade+rise in on scroll (up|left|right|scale)
     [data-reveal-stagger]    children reveal in sequence (value = stagger secs)
     [data-parallax]          gentle background drift (value = strength, e.g. .2)
     [data-dissolve]          cross-dissolve / slow scale on scroll (Ken Burns)
     [data-pin]               pin the element while its section scrolls
     [data-write]             ink writes itself on, left-to-right, like a pen
                              (value optional = seconds, default 2.2)
                              FIX: a generous overflow gutter so swashes/serifs
                              (the cut-off "T" bug) are never clipped.

   Respects prefers-reduced-motion: everything resolves to its final state.
   ========================================================================== */
(function () {
  'use strict';
  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function boot() {
    var hasGSAP = window.gsap && window.ScrollTrigger;
    document.documentElement.classList.add('s-anim');
    if (hasGSAP) gsap.registerPlugin(ScrollTrigger);

    /* ---------- cursor + grain wiring (optional, class-gated) ---------- */
    initCursor();

    if (REDUCED || !hasGSAP) { resolveAllStatic(); return; }

    /* ---------- REVEAL ---------- */
    gsap.utils.toArray('[data-reveal]').forEach(function (el) {
      gsap.to(el, {
        opacity: 1, x: 0, y: 0, scale: 1, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 82%' }
      });
    });

    /* ---------- REVEAL STAGGER ---------- */
    gsap.utils.toArray('[data-reveal-stagger]').forEach(function (group) {
      var step = parseFloat(group.getAttribute('data-reveal-stagger')) || 0.12;
      var kids = group.children;
      gsap.set(kids, { opacity: 0, y: 28 });
      gsap.to(kids, {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: step,
        scrollTrigger: { trigger: group, start: 'top 80%' }
      });
    });

    /* ---------- PARALLAX ---------- */
    gsap.utils.toArray('[data-parallax]').forEach(function (el) {
      var strength = parseFloat(el.getAttribute('data-parallax')) || 0.18;
      gsap.fromTo(el, { yPercent: -strength * 50 }, {
        yPercent: strength * 50, ease: 'none',
        scrollTrigger: { trigger: el.parentElement || el, start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });

    /* ---------- DISSOLVE / KEN BURNS ---------- */
    gsap.utils.toArray('[data-dissolve]').forEach(function (el) {
      gsap.fromTo(el, { scale: 1.12, opacity: 0.6 }, {
        scale: 1, opacity: 1, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'center center', scrub: true }
      });
    });

    /* ---------- PIN ---------- */
    gsap.utils.toArray('[data-pin]').forEach(function (el) {
      ScrollTrigger.create({
        trigger: el, start: 'top top', end: '+=' + (el.offsetHeight || window.innerHeight),
        pin: true, pinSpacing: true
      });
    });

    /* ---------- WRITE-ON (the pen) ---------- */
    initWriteOn();

    ScrollTrigger.refresh();
  }

  /* The write-on: each [data-write] element's text is revealed left-to-right by
     a sweeping inset clip. We pad the clip with a gutter so ascenders, serifs,
     and script swashes (the cut-off "T") are never sliced. Works for any font,
     including the property signature script. */
  function initWriteOn() {
    gsap.utils.toArray('[data-write]').forEach(function (el) {
      var dur = parseFloat(el.getAttribute('data-write')) || 2.2;
      // gutter so glyph overhang is never clipped (px). big enough for script swashes.
      var G = 0.22; // 22% of font size each side via padding trick
      el.style.display = 'inline-block';
      // start fully clipped from the right; sweep open to fully visible + gutter
      gsap.fromTo(el,
        { clipPath: 'inset(-' + (G*100) + '% 100% -' + (G*100) + '% -' + (G*100) + '%)',
          webkitClipPath: 'inset(-' + (G*100) + '% 100% -' + (G*100) + '% -' + (G*100) + '%)' },
        { clipPath: 'inset(-' + (G*100) + '% -' + (G*100) + '% -' + (G*100) + '% -' + (G*100) + '%)',
          webkitClipPath: 'inset(-' + (G*100) + '% -' + (G*100) + '% -' + (G*100) + '% -' + (G*100) + '%)',
          duration: dur, ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 78%' } }
      );
    });
  }

  /* True stroke-draw for SVG paths: any <path data-draw> animates its stroke on.
     This is the gold-standard "handwriting draws itself" for a real SVG wordmark. */
  function initSVGDraw() {
    gsap.utils.toArray('path[data-draw], [data-draw] path').forEach(function (p) {
      try {
        var len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len, fillOpacity: 0 });
        var tl = gsap.timeline({ scrollTrigger: { trigger: p, start: 'top 78%' } });
        tl.to(p, { strokeDashoffset: 0, duration: 2.4, ease: 'power1.inOut' })
          .to(p, { fillOpacity: 1, duration: 0.8 }, '-=0.3');
      } catch (e) {}
    });
  }

  function resolveAllStatic() {
    // no JS animation: show everything in final state
    document.querySelectorAll('[data-reveal],[data-reveal-stagger] > *').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
    document.querySelectorAll('[data-write]').forEach(function (el) {
      el.style.clipPath = 'none'; el.style.webkitClipPath = 'none';
    });
  }

  function initCursor() {
    if (!document.body.classList.contains('s-cursor')) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;
    var dot = document.createElement('div');
    dot.className = 's-cursor-dot';
    document.body.appendChild(dot);
    window.addEventListener('mousemove', function (e) {
      dot.style.left = e.clientX + 'px'; dot.style.top = e.clientY + 'px';
    });
    document.querySelectorAll('a,button,[data-hover]').forEach(function (h) {
      h.addEventListener('mouseenter', function () { dot.classList.add('grow'); });
      h.addEventListener('mouseleave', function () { dot.classList.remove('grow'); });
    });
  }

  // expose SVG draw for property pages that include a real wordmark path
  window.SpineDraw = initSVGDraw;

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
