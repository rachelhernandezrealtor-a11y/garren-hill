/* ============================================================================
   RACHEL STUDIO — THE SPINE · spine.js · v1 · motion engine (GSAP/ScrollTrigger)
   ----------------------------------------------------------------------------
   ONE engine, a small vocabulary of named effects driven by data-attributes.
   Sections declare intent in HTML; the engine wires the motion. No section
   hand-rolls its own IntersectionObserver / transitions again.

   USAGE (in HTML):
     <h2 data-reveal>…</h2>                 fade+rise in on enter
     <p data-reveal="left" data-delay="0.2">slide in from left
     <div data-parallax="0.2">…</div>       gentle depth on scroll
     <img data-kenburns>                     slow scale drift while in view
     <h1 data-writeon>The farm.</h1>         script writes itself on (per-letter)
     <section data-pin data-pin-end="+=80%"> pin while inner [data-pin-step]s advance

   Loads GSAP + ScrollTrigger from CDN if not already present, then inits.
   Respects prefers-reduced-motion (shows final state, no motion).
   ========================================================================== */
(function(){
  "use strict";
  var REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  document.documentElement.classList.add("s-anim");

  function loadScript(src){
    return new Promise(function(res,rej){
      if(document.querySelector('script[src="'+src+'"]')){return res();}
      var s=document.createElement("script");
      s.src=src; s.onload=res; s.onerror=rej; document.head.appendChild(s);
    });
  }

  function boot(){
    if(typeof gsap==="undefined"){ return fallback(); }
    if(window.ScrollTrigger){ gsap.registerPlugin(ScrollTrigger); }
    init();
  }

  /* if GSAP can't load (offline), reveal everything so nothing is hidden */
  function fallback(){
    document.querySelectorAll("[data-reveal]").forEach(function(el){
      el.style.opacity=1; el.style.transform="none";
    });
    document.querySelectorAll("[data-writeon]").forEach(prepWriteOnStatic);
  }

  function num(v,d){ v=parseFloat(v); return isNaN(v)?d:v; }

  function init(){
    var EASE="power3.out";

    /* ---- REVEAL — fade + directional rise, the house default ----
       fromTo with explicit start state (don't rely on GSAP reading CSS
       transforms). CSS pre-hides opacity only, to avoid a pre-JS flash. */
    gsap.utils.toArray("[data-reveal]").forEach(function(el){
      var dir=el.getAttribute("data-reveal")||"up";
      var from={opacity:0};
      if(dir==="left")from.x=-44; else if(dir==="right")from.x=44;
      else if(dir==="scale")from.scale=.96; else from.y=34;
      if(REDUCED){ gsap.set(el,{opacity:1,x:0,y:0,scale:1}); return; }
      gsap.fromTo(el,from,{opacity:1,x:0,y:0,scale:1,
        duration:num(el.getAttribute("data-dur"),1.1),
        delay:num(el.getAttribute("data-delay"),0), ease:EASE,
        scrollTrigger:{trigger:el,start:"top 88%",toggleActions:"play none none none"}});
    });

    /* ---- PARALLAX — gentle depth, RESTRAINED (luxury, not theme-park) ---- */
    if(!REDUCED) gsap.utils.toArray("[data-parallax]").forEach(function(el){
      var amt=num(el.getAttribute("data-parallax"),.2);
      gsap.to(el,{yPercent:-amt*100,ease:"none",
        scrollTrigger:{trigger:el.parentElement||el,start:"top bottom",end:"bottom top",scrub:true}});
    });

    /* ---- KEN BURNS — slow scale drift while a photo is on screen ---- */
    if(!REDUCED) gsap.utils.toArray("[data-kenburns]").forEach(function(el){
      gsap.fromTo(el,{scale:1.0},{scale:1.12,ease:"none",
        scrollTrigger:{trigger:el.parentElement||el,start:"top bottom",end:"bottom top",scrub:true}});
    });

    /* ---- WRITE-ON — the signature script writes itself across the line ---- */
    gsap.utils.toArray("[data-writeon]").forEach(function(el){ buildWriteOn(el,REDUCED,EASE); });

    /* ---- PIN — pin a section while inner steps advance (cinematic chapters) ---- */
    if(!REDUCED) gsap.utils.toArray("[data-pin]").forEach(function(el){
      var end=el.getAttribute("data-pin-end")||"+=100%";
      var steps=gsap.utils.toArray(el.querySelectorAll("[data-pin-step]"));
      var tl=gsap.timeline({scrollTrigger:{trigger:el,start:"top top",end:end,scrub:.6,pin:true}});
      steps.forEach(function(st,i){
        tl.from(st,{opacity:0,y:30,duration:1},i*0.9);
        if(i<steps.length-1) tl.to(st,{opacity:0,y:-30,duration:1},(i+1)*0.9-0.15);
      });
    });

    ScrollTrigger.refresh();
  }

  /* WRITE-ON implementation — true "pen draws it" feel without a fake hand.
     Each word is a span; each LETTER animates: starts below + blurred + clipped,
     resolves left→right in sequence, like ink flowing from a moving nib.
     The whole phrase rides one timeline so the pen never jumps. */
  function buildWriteOn(el,reduced,EASE){
    if(el.dataset.woBuilt) return; el.dataset.woBuilt="1";
    var text=el.textContent;
    el.textContent="";
    el.style.setProperty("--wo-on","0");
    var frag=document.createDocumentFragment();
    var letters=[];
    text.split(/(\s+)/).forEach(function(tok){
      if(/^\s+$/.test(tok)){ frag.appendChild(document.createTextNode(tok)); return; }
      var word=document.createElement("span");
      word.className="s-wo-word";
      word.style.display="inline-block"; word.style.whiteSpace="nowrap";
      tok.split("").forEach(function(ch){
        var s=document.createElement("span");
        s.className="s-wo-ch"; s.textContent=ch;
        s.style.display="inline-block";
        letters.push(s); word.appendChild(s);
      });
      frag.appendChild(word);
    });
    el.appendChild(frag);
    if(reduced){ letters.forEach(function(s){s.style.opacity=1;}); return; }
    gsap.set(letters,{opacity:0,yPercent:40,filter:"blur(6px)",rotation:-4,transformOrigin:"left bottom"});
    gsap.to(letters,{opacity:1,yPercent:0,filter:"blur(0px)",rotation:0,
      ease:"power2.out",duration:0.5,
      stagger:{each:0.055},  /* the pen speed — each glyph follows the last */
      scrollTrigger:{trigger:el,start:"top 78%",toggleActions:"play none none none"}});
  }
  function prepWriteOnStatic(el){ /* fallback: leave text as-is, fully visible */ }

  /* ---- GOLD CURSOR (opt-in via body.s-cursor) ---- */
  function cursor(){
    if(!document.body.classList.contains("s-cursor")) return;
    if(!window.matchMedia||!window.matchMedia("(pointer:fine)").matches) return;
    var dot=document.createElement("div"); dot.className="s-cursor-dot"; document.body.appendChild(dot);
    window.addEventListener("mousemove",function(e){ dot.style.left=e.clientX+"px"; dot.style.top=e.clientY+"px"; });
    document.addEventListener("mouseover",function(e){
      if(e.target.closest("a,button,[data-hover]")) dot.classList.add("grow");
    });
    document.addEventListener("mouseout",function(e){
      if(e.target.closest("a,button,[data-hover]")) dot.classList.remove("grow");
    });
  }

  function start(){
    cursor();
    Promise.resolve()
      .then(function(){ return loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"); })
      .then(function(){ return loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"); })
      .then(boot).catch(fallback);
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",start);
  else start();
})();
