/* ============================================================================
   RACHEL STUDIO — THE SPINE · motion engine (GSAP + ScrollTrigger)
   Named, data-attribute effects. Drop GSAP + this file in; tag elements.
   Degrades gracefully: no JS / reduced-motion => everything visible & still.
   ----------------------------------------------------------------------------
   USAGE (in markup):
     data-reveal            fade+rise on enter (variants: left|right|scale)
     data-reveal-stagger    children rise in sequence (e.g. the farm lines)
     data-parallax="0.2"    gentle background drift (strength 0..1)
     data-pin               pin while inner [data-pin-layer]s cross-dissolve
     data-writeon           script line draws on left->right like a pen
   ========================================================================== */
(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = !!(window.gsap && window.ScrollTrigger);
  if(!hasGSAP || reduce){
    // graceful: reveal everything, no motion
    document.querySelectorAll('[data-reveal],[data-reveal-stagger]>*,[data-writeon]')
      .forEach(function(el){el.style.opacity=1;el.style.transform='none';el.style.clipPath='none';});
    return;
  }
  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add('s-anim');
  var EASE='power3.out';

  /* reveal — fade + directional rise */
  gsap.utils.toArray('[data-reveal]').forEach(function(el){
    var dir=el.getAttribute('data-reveal')||'up';
    var from={opacity:0,duration:1.1,ease:EASE};
    if(dir==='left')from.x=-40; else if(dir==='right')from.x=40;
    else if(dir==='scale')from.scale=.96; else from.y=30;
    gsap.from(el,{scrollTrigger:{trigger:el,start:'top 82%'},...from});
  });

  /* reveal-stagger — children in sequence (the farm. the farm. the farm.) */
  gsap.utils.toArray('[data-reveal-stagger]').forEach(function(wrap){
    var kids=wrap.children;
    gsap.from(kids,{scrollTrigger:{trigger:wrap,start:'top 78%'},
      opacity:0,y:54,filter:'blur(12px)',duration:1.5,ease:EASE,stagger:0.9});
  });

  /* parallax — gentle drift on the tagged layer */
  gsap.utils.toArray('[data-parallax]').forEach(function(el){
    var s=parseFloat(el.getAttribute('data-parallax'))||0.2;
    gsap.fromTo(el,{yPercent:-s*12},{yPercent:s*12,ease:'none',
      scrollTrigger:{trigger:el.parentElement||el,start:'top bottom',end:'bottom top',scrub:true}});
  });

  /* writeon — reveal a script line left->right like ink flowing from a pen */
  gsap.utils.toArray('[data-writeon]').forEach(function(el){
    gsap.fromTo(el,{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)',
      duration:2.2,ease:'power2.inOut',
      scrollTrigger:{trigger:el,start:'top 80%'}});
  });

  /* pin — hold a section while inner [data-pin-layer]s cross-dissolve */
  gsap.utils.toArray('[data-pin]').forEach(function(sec){
    var layers=sec.querySelectorAll('[data-pin-layer]');
    if(!layers.length)return;
    var tl=gsap.timeline({scrollTrigger:{trigger:sec,start:'top top',
      end:'+='+(layers.length*100)+'%',scrub:true,pin:true}});
    layers.forEach(function(l,i){
      if(i>0)tl.fromTo(l,{opacity:0},{opacity:1,duration:1},i-0.5);
      if(i<layers.length-1)tl.to(l,{opacity:0,duration:1},i+0.5);
    });
  });

  /* gold cursor (desktop) */
  if(window.matchMedia('(pointer:fine)').matches){
    var dot=document.querySelector('.s-cursor-dot');
    if(dot){
      window.addEventListener('mousemove',function(e){
        gsap.to(dot,{x:e.clientX,y:e.clientY,duration:.25,ease:'power2.out',
          xPercent:-50,yPercent:-50});
      });
      document.querySelectorAll('a,button,[data-hover]').forEach(function(el){
        el.addEventListener('mouseenter',function(){dot.classList.add('grow');});
        el.addEventListener('mouseleave',function(){dot.classList.remove('grow');});
      });
    }
  }

  ScrollTrigger.refresh();
})();
