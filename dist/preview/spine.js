/* ============================================================================
   RACHEL STUDIO — THE SPINE  ·  spine.js  ·  v1  ·  motion engine
   ----------------------------------------------------------------------------
   GSAP + ScrollTrigger, loaded once. Effects are declared in HTML via
   data-attributes — no per-property hand-rolling. Add an attribute, get a
   bad-ass, consistent, reduced-motion-safe effect.

   REQUIRES (load before this file):
     gsap.min.js, ScrollTrigger.min.js   (CDN, pinned versions)

   EFFECT VOCABULARY (put on any element):
     data-reveal               fade + rise in on scroll (default)
     data-reveal="left|right|scale"   directional / scale variant
     data-reveal-stagger       on a parent: its children reveal in sequence
     data-parallax="0.2"       element drifts at depth (number = strength)
     data-dissolve             cross-dissolve a stack of .layer children
     data-pin                  pin section while inner [data-pin-scrub] animates
     data-writeon              SVG/script line "writes" on left-to-right (a pen)
     data-count="4250000"      number counts up when it scrolls in
   ============================================================================ */
(function(){
  "use strict";

  var REDUCED = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var hasGSAP = typeof window.gsap !== 'undefined';

  // Mark the doc so CSS knows JS+anim are live (controls the pre-hidden state).
  if (hasGSAP && !REDUCED) document.documentElement.classList.add('s-anim');

  function ready(fn){
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    /* -------- graceful fallback: no GSAP or reduced-motion -> show everything -------- */
    if (!hasGSAP || REDUCED){
      document.querySelectorAll('[data-reveal]').forEach(function(el){
        el.style.opacity = 1; el.style.transform = 'none';
      });
      buildCursor();           // cursor is fine without scroll engine
      return;
    }

    var gsap = window.gsap;
    gsap.registerPlugin(window.ScrollTrigger);

    var EASE = 'power3.out';     // matches --ease feel
    var DUR  = 0.9;

    /* ---------------- REVEAL (fade + rise / directional / scale) ---------------- */
    gsap.utils.toArray('[data-reveal]').forEach(function(el){
      // skip if inside a stagger parent (handled below)
      if (el.closest('[data-reveal-stagger]') && el.parentElement.hasAttribute('data-reveal-stagger')) return;
      var dir = el.getAttribute('data-reveal');
      var from = {opacity:0, duration:DUR, ease:EASE};
      if (dir === 'left')  from.x = -40;
      else if (dir === 'right') from.x = 40;
      else if (dir === 'scale') from.scale = 0.96;
      else from.y = 30;
      gsap.from(el, Object.assign(from, {
        scrollTrigger:{ trigger:el, start:'top 82%', toggleActions:'play none none none' }
      }));
    });

    /* ---------------- STAGGER (children reveal in sequence) ---------------- */
    gsap.utils.toArray('[data-reveal-stagger]').forEach(function(parent){
      var kids = parent.children;
      gsap.from(kids, {
        opacity:0, y:34, duration:DUR, ease:EASE, stagger:0.12,
        scrollTrigger:{ trigger:parent, start:'top 78%', toggleActions:'play none none none' }
      });
    });

    /* ---------------- PARALLAX (depth drift) ---------------- */
    gsap.utils.toArray('[data-parallax]').forEach(function(el){
      var strength = parseFloat(el.getAttribute('data-parallax')) || 0.2;
      gsap.to(el, {
        yPercent: -strength * 100, ease:'none',
        scrollTrigger:{ trigger:el.parentElement||el, start:'top bottom', end:'bottom top', scrub:true }
      });
    });

    /* ---------------- DISSOLVE (cross-fade stacked .layer children on scrub) ---------------- */
    gsap.utils.toArray('[data-dissolve]').forEach(function(box){
      var layers = box.querySelectorAll('.layer');
      if (layers.length < 2) return;
      var tl = gsap.timeline({
        scrollTrigger:{ trigger:box, start:'top top', end:'+='+(layers.length*60)+'%', scrub:true, pin:true }
      });
      layers.forEach(function(layer,i){
        if (i===0) return;
        tl.to(layers[i-1], {opacity:0, duration:1}, i-1)
          .fromTo(layer, {opacity:0}, {opacity:1, duration:1}, i-1);
      });
    });

    /* ---------------- PIN (hold section, scrub inner timeline) ---------------- */
    gsap.utils.toArray('[data-pin]').forEach(function(section){
      var scrub = section.querySelectorAll('[data-pin-scrub]');
      var tl = gsap.timeline({
        scrollTrigger:{ trigger:section, start:'top top', end:'+=120%', scrub:true, pin:true }
      });
      scrub.forEach(function(el,i){
        tl.from(el, {opacity:0, y:40, duration:1}, i*0.6);
      });
    });

    /* ---------------- WRITE-ON (the pen) ----------------
       Real handwriting draw-on. Two modes:
       (a) SVG path with [data-writeon] on a <path> -> stroke-dashoffset draw.
       (b) text element [data-writeon] -> left-to-right clip reveal (ink flowing),
           sized generously so swashes/descenders never clip (fixes cut-off T). */
    gsap.utils.toArray('[data-writeon]').forEach(function(el){
      var isPath = el.tagName.toLowerCase() === 'path';
      if (isPath){
        var len = el.getTotalLength();
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
        gsap.to(el, {
          strokeDashoffset:0, duration:2.4, ease:'power1.inOut',
          scrollTrigger:{ trigger:el.closest('svg')||el, start:'top 72%', toggleActions:'play none none none' }
        });
      } else {
        // clip-reveal: animate inset() so it wipes on left->right; padding in CSS protects glyphs
        gsap.fromTo(el,
          { clipPath:'inset(0 100% 0 0)', webkitClipPath:'inset(0 100% 0 0)' },
          { clipPath:'inset(0 0% 0 0)', webkitClipPath:'inset(0 0% 0 0)',
            duration:2.2, ease:'power2.inOut',
            scrollTrigger:{ trigger:el, start:'top 74%', toggleActions:'play none none none' } }
        );
      }
    });

    /* ---------------- COUNT-UP (numbers tick into place) ---------------- */
    gsap.utils.toArray('[data-count]').forEach(function(el){
      var end = parseFloat(el.getAttribute('data-count')) || 0;
      var prefix = el.getAttribute('data-count-prefix') || '';
      var obj = {v:0};
      gsap.to(obj, {
        v:end, duration:2, ease:'power2.out',
        scrollTrigger:{ trigger:el, start:'top 85%', toggleActions:'play none none none' },
        onUpdate:function(){ el.textContent = prefix + Math.round(obj.v).toLocaleString('en-US'); }
      });
    });

    buildCursor();
    // settle layout after fonts load so triggers measure correctly
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function(){ window.ScrollTrigger.refresh(); });
    window.addEventListener('load', function(){ window.ScrollTrigger.refresh(); });
  });

  /* ---------------- GOLD CURSOR (opt-in via body.s-cursor) ---------------- */
  function buildCursor(){
    if (!document.body.classList.contains('s-cursor')) return;
    if (!window.matchMedia('(pointer:fine)').matches) return;
    var dot = document.createElement('div');
    dot.className = 's-cursor-dot';
    document.body.appendChild(dot);
    var x=0,y=0,tx=0,ty=0;
    document.addEventListener('mousemove', function(e){ x=e.clientX; y=e.clientY; });
    (function loop(){ tx+=(x-tx)*0.2; ty+=(y-ty)*0.2; dot.style.transform='translate('+tx+'px,'+ty+'px) translate(-50%,-50%)'; requestAnimationFrame(loop); })();
    document.querySelectorAll('a,button,[data-cursor-grow]').forEach(function(el){
      el.addEventListener('mouseenter', function(){ dot.classList.add('grow'); });
      el.addEventListener('mouseleave', function(){ dot.classList.remove('grow'); });
    });
  }
})();
