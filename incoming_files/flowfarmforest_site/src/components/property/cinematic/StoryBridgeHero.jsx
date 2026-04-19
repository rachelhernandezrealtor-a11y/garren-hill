import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import InquiryCTA from '@/components/property/InquiryCTA';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const ease = [0.25, 0.1, 0.25, 1];
const DEFAULT_BG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4953bd89e_forestacreage2.jpg';
const DEFAULT_VIMEO_ID = '1171394707';
const DEFAULT_FALLBACK_MP4 = 'https://base44.app/api/apps/69a8c6b6c09f3f53db8fa60a/files/mp/public/69a8c6b6c09f3f53db8fa60a/2bcb80afb_foresthero_v11080p.mp4';
const buildVimeoSrc = (idOrUrl) => {
  if (!idOrUrl) return null;
  const m = String(idOrUrl).match(/video\/(\d+)/);
  const id = m ? m[1] : String(idOrUrl).replace(/[^\d]/g, '');
  if (!id) return null;
  const params = 'background=1&autoplay=1&loop=1&autopause=0&muted=1&controls=0&title=0&byline=0&portrait=0&dnt=1';
  return `https://player.vimeo.com/video/${id}?${params}`;
};

const KEY_METRICS = [
  { label: 'USDA Acres', value: 15, suffix: '', decimals: 0 },
  { label: 'Buildable Acres', value: 7, suffix: '', decimals: 0 },
  { label: 'Acre Veganic Farm', value: 3, suffix: '', decimals: 0 },
  { label: 'Offered At', value: 5.25, prefix: '$', suffix: 'M', decimals: 2 },
];

function StatValue({ value, item, index = 0 }) {
  const numericMatch = String(value).match(/[\d.]+/);
  const numberValue = numericMatch ? Number(numericMatch[0]) : null;
  const mv = useMotionValue(0);
  const sv = useSpring(mv, { stiffness: 88, damping: 18, mass: 0.7 });
  const rounded = useTransform(sv, latest => {
    if (numberValue === null) return String(value);
    const dec = item.decimals || 0;
    const formatted = latest.toFixed(dec);
    return String(value).replace(/[\d.]+/, formatted);
  });
  useEffect(() => {
    if (numberValue === null) return;
    mv.set(0);
    const controls = animate(0, numberValue, {
      duration: 1.8,
      delay: 1.2 + index * 0.12,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => mv.set(latest),
    });
    return () => controls.stop();
  }, [mv, numberValue, index]);
  return <motion.span>{rounded}</motion.span>;
}

function KeyMetric({ item, index }) {
  const stringValue = item.value.toString();
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.0 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex min-w-[148px] shrink-0 flex-col items-start text-left sm:min-w-0"
    >
      <div className="relative w-full overflow-hidden border-l border-white/20 pl-4 sm:pl-5 py-1">
        <motion.div
          aria-hidden="true"
          initial={{ scaleY: 0, opacity: 0.35 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-white via-white/40 to-transparent"
        />
        <span
          className="block font-serif whitespace-nowrap"
          style={{
            fontSize: 'clamp(2.2rem, 3.2vw, 3.2rem)',
            fontWeight: 400,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            color: '#ffffff',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
            fontVariantNumeric: 'tabular-nums'
          }}
        >
          {item.prefix}<StatValue value={stringValue} item={item} index={index} />{item.suffix}
        </span>
        <span
          className="mt-2 block font-sans uppercase"
          style={{ fontSize: 'clamp(0.72rem, 1.0vw, 0.9rem)', fontWeight: 600, letterSpacing: '0.28em', color: 'rgba(255,255,255,1)' }}
        >
          {item.label}
        </span>
      </div>
    </motion.div>
  );
}

export default function StoryBridgeHero() {
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrcs, setVideoSrcs] = useState({ uhd: null, hd: null, md: null, sd: null, poster: DEFAULT_BG });
  const [vimeoSrc, setVimeoSrc] = useState(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(true);
  const [inView, setInView] = useState(false);
  const [webmAvailable, setWebmAvailable] = useState({ uhd: false, hd: false, md: false, sd: false });
  const [isAdmin, setIsAdmin] = useState(false);
  const hasPosterRef = useRef(false);
  const sectionRef = useRef(null);
  const [currentNarrativeIndex, setCurrentNarrativeIndex] = useState(0);
  const [narrative, setNarrative] = useState([
    { text: 'Architecture. Agriculture. Autonomy.', sub: 'One estate, many futures — this is the bridge that connects every chapter below.' },
    { text: 'From aerial to arrival', sub: 'We descend through the pines and land at a working compound built to scale.' },
  ]);
  const videoRef = useRef(null);

  const adjustNarrativeToDuration = useCallback((dur) => {
    setNarrative((prev) => {
      if (!prev || prev.length === 0) return prev;
      const times = prev.map((p) => (typeof p.time === 'number' ? p.time : 0));
      const hasAnyTime = times.some((t) => t > 0);
      const isStrictlyIncreasing = times.every((t, i) => i === 0 || t > times[i - 1]);
      if (hasAnyTime && isStrictlyIncreasing) return prev;
      const N = prev.length;
      const spacing = Math.max(0, dur - 0.5) / Math.max(1, N - 1);
      return prev.map((p, i) => ({ ...p, time: i * spacing }));
    });
  }, []);

  const handleTimeUpdate = useCallback((event) => {
    const t = event.target?.currentTime || 0;
    let idx = 0;
    for (let i = 0; i < narrative.length; i++) {
      if (t >= (narrative[i].time || 0)) idx = i;
    }
    if (idx !== currentNarrativeIndex) setCurrentNarrativeIndex(idx);
  }, [narrative, currentNarrativeIndex]);

  useEffect(() => {
    base44.entities.SiteSettings.filter({}).then((settings) => {
      const byKey = Object.fromEntries(settings.map((s) => [s.setting_key, s.value]));
      let uhd = byKey.story_hero_video_2160 || null;
      let hd = byKey.story_hero_video_1080 || null;
      let md = byKey.story_hero_video_720 || null;
      let sd = byKey.story_hero_video_480 || null;
      const poster = byKey.story_hero_poster || DEFAULT_BG;

      // Fallback to known in-app MP4 if none configured
      if (!uhd && !hd && !md && !sd) {
        hd = DEFAULT_FALLBACK_MP4;
      }
      setVideoSrcs({ uhd, hd, md, sd, poster });
      hasPosterRef.current = Boolean(byKey.story_hero_poster);

      // Prefer locally uploaded sources; only use Vimeo if no local sources exist
      const hasLocal = Boolean(uhd || hd || md || sd);
      const vimeoInput = hasLocal ? null : (byKey.story_hero_vimeo_url || byKey.story_hero_vimeo_id || null);
      const vimeo = buildVimeoSrc(vimeoInput);
      setVimeoSrc(vimeo);

      if (byKey.story_hero_narrative) {
        try {
          const arr = JSON.parse(byKey.story_hero_narrative);
          if (Array.isArray(arr) && arr.every(p => typeof p.text === 'string')) {
            setNarrative(arr.map(p => ({ ...p, time: typeof p.time === 'number' ? p.time : 0 })));
          }
        } catch (e) { /* ignore */ }
      }
    });

    const mm = window.matchMedia('(min-width: 768px)');
    const update = () => {
      const saveData = navigator.connection && navigator.connection.saveData;
      const reduced = window.matchMedia('(prefers-reduced-data: reduce)').matches;
      setShouldLoadVideo(mm.matches && !saveData && !reduced);
    };
    update();
    mm.addEventListener?.('change', update);
    return () => { mm.removeEventListener?.('change', update); };
  }, []);

  // Lazy-mount hero video only when section is near viewport
  useEffect(() => {
    const el = sectionRef?.current;
    if (!el) return;
    let raf;
    const io = new IntersectionObserver((entries) => {
      const vis = entries[0]?.isIntersecting;
      raf = requestAnimationFrame(() => setInView(Boolean(vis)));
    }, { rootMargin: '200px 0px 200px 0px', threshold: 0.01 });
    io.observe(el);
    return () => { if (raf) cancelAnimationFrame(raf); io.disconnect(); };
  }, []);

  // After visible, probe for efficient WebM variants to avoid 404s on slow links
  useEffect(() => {
    if (!inView) return;
    const probe = async (url) => {
      try { const res = await fetch(url, { method: 'HEAD', mode: 'cors' }); return res.ok; } catch { return false; }
    };
    (async () => {
      const next = { uhd: false, hd: false, md: false, sd: false };
      if (videoSrcs.uhd) next.uhd = await probe(videoSrcs.uhd.replace('.mp4', '.webm'));
      if (videoSrcs.hd) next.hd = await probe(videoSrcs.hd.replace('.mp4', '.webm'));
      if (videoSrcs.md) next.md = await probe(videoSrcs.md.replace('.mp4', '.webm'));
      if (videoSrcs.sd) next.sd = await probe(videoSrcs.sd.replace('.mp4', '.webm'));
      setWebmAvailable(next);
    })();
  }, [inView, videoSrcs]);

  // Detect admin to show uploader (no public UI change)
  useEffect(() => {
    let mounted = true;
    base44.auth.isAuthenticated().then(async (authed) => {
      if (!mounted || !authed) return;
      try {
        const me = await base44.auth.me();
        if (mounted) setIsAdmin(me?.role === 'admin');
      } catch {}
    });
    return () => { mounted = false; };
  }, []);

  const captureAndSavePoster = useCallback(async () => {
    try {
      const v = videoRef.current;
      if (!v || !v.videoWidth || !v.videoHeight) return;
      // Seek to a representative frame
      const targetTime = Math.min(1, v.duration ? v.duration * 0.25 : 1);
      await new Promise((resolve) => {
        const onSeeked = () => { v.removeEventListener('seeked', onSeeked); resolve(); };
        v.addEventListener('seeked', onSeeked, { once: true });
        try { v.currentTime = targetTime; } catch { resolve(); }
      });
      const canvas = document.createElement('canvas');
      const maxW = 1920;
      const scale = Math.min(1, maxW / v.videoWidth);
      canvas.width = Math.round(v.videoWidth * scale);
      canvas.height = Math.round(v.videoHeight * scale);
      const ctx = canvas.getContext('2d');
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise((res) => canvas.toBlob(res, 'image/jpeg', 0.9));
      if (!blob) return;
      const file = new File([blob], 'story_hero_poster.jpg', { type: 'image/jpeg' });
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      const existing = await base44.entities.SiteSettings.filter({ setting_key: 'story_hero_poster' });
      if (existing && existing[0]) {
        await base44.entities.SiteSettings.update(existing[0].id, { value: file_url });
      } else {
        await base44.entities.SiteSettings.create({ setting_key: 'story_hero_poster', value: file_url });
      }
      setVideoSrcs((prev) => ({ ...prev, poster: file_url }));
      hasPosterRef.current = true;
    } catch {}
  }, [setVideoSrcs]);

  const scrollToEditorial = () => {
    const el = document.getElementById('editorial-story');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Load Vimeo Player API once and sync captions to Vimeo time
  const loadVimeoApiOnce = () => new Promise((resolve) => {
    if (window.Vimeo && window.Vimeo.Player) return resolve(window.Vimeo);
    const id = 'vimeo-player-api';
    if (document.getElementById(id)) {
      document.getElementById(id).addEventListener('load', () => resolve(window.Vimeo));
      return;
    }
    const s = document.createElement('script');
    s.id = id;
    s.src = 'https://player.vimeo.com/api/player.js';
    s.async = true;
    s.onload = () => resolve(window.Vimeo);
    document.body.appendChild(s);
  });

  useEffect(() => {
    let player;
    if (!vimeoSrc) return;
    let cancelled = false;
    loadVimeoApiOnce().then((Vimeo) => {
      if (cancelled) return;
      const iframe = document.getElementById('storyVimeoIframe');
      if (!iframe) return;
      player = new Vimeo.Player(iframe);
      player.setMuted(true).catch(() => {});
      player.setLoop(true).catch(() => {});
      player.play().catch(() => {});
      player.getDuration().then((d) => { if (d) adjustNarrativeToDuration(d); }).catch(() => {});
      player.on('timeupdate', (data) => {
        const t = data?.seconds || 0;
        setCurrentNarrativeIndex((prevIdx) => {
          let idx = 0;
          for (let i = 0; i < narrative.length; i++) {
            if (t >= (narrative[i].time || 0)) idx = i;
          }
          return idx;
        });
      });
    });
    return () => { cancelled = true; if (player && player.unload) player.unload().catch(() => {}); };
  }, [vimeoSrc, narrative, adjustNarrativeToDuration]);

  return (
    <section ref={sectionRef} className="relative w-full" style={{ minHeight: '80svh', padding: 0 }}>
      {/* Background Video (lazy-mounted) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden" style={{ backgroundColor: 'transparent' }} aria-hidden={!(inView && shouldLoadVideo)}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={videoSrcs.poster} alt="Hero poster" className="hero-bg-video" loading="eager" decoding="async" fetchpriority="high" sizes="100vw" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 400ms ease', opacity: videoReady ? 0 : 1 }} />
          {(inView && shouldLoadVideo) ? (
            vimeoSrc ? (
           <iframe
              id="storyVimeoIframe"
              loading="lazy"
              src={vimeoSrc}
              title="Story Bridge Hero"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="hero-bg-video"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none' }}
            />
          ) : (
           <video
             id="storyHeroVideo"
              ref={videoRef}
              autoPlay={inView && shouldLoadVideo}
              loop
              muted
              playsInline
              crossOrigin="anonymous"
              preload={inView && shouldLoadVideo ? 'auto' : 'none'}
              poster={videoSrcs.poster}
              className="hero-bg-video"
              aria-label="Cinematic bridge hero — Flow Farm"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'none' }}
              onLoadedMetadata={(e) => { setVideoReady(true); const d = e?.target?.duration || 0; if (d) adjustNarrativeToDuration(d); if (!hasPosterRef.current) { captureAndSavePoster(); } }}
              onTimeUpdate={handleTimeUpdate}
             >
              {(inView && shouldLoadVideo) && (
                <>
                  {webmAvailable.uhd && <source src={videoSrcs.uhd.replace('.mp4', '.webm')} type="video/webm" media="(min-resolution: 2dppx), (min-width: 1920px)" />}
                  {webmAvailable.hd && <source src={videoSrcs.hd.replace('.mp4', '.webm')} type="video/webm" media="(min-width: 1280px)" />}
                  {webmAvailable.md && <source src={videoSrcs.md.replace('.mp4', '.webm')} type="video/webm" media="(min-width: 768px)" />}
                  {webmAvailable.sd && videoSrcs.sd && <source src={videoSrcs.sd.replace('.mp4', '.webm')} type="video/webm" />}
                  {videoSrcs.uhd && <source src={videoSrcs.uhd} type="video/mp4" media="(min-resolution: 2dppx), (min-width: 1920px)" />}
                  {videoSrcs.hd && <source src={videoSrcs.hd} type="video/mp4" media="(min-width: 1280px)" />}
                  {videoSrcs.md && <source src={videoSrcs.md} type="video/mp4" media="(min-width: 768px)" />}
                  {(videoSrcs.sd || videoSrcs.md || videoSrcs.hd || videoSrcs.uhd) && (
                    <source src={videoSrcs.sd || videoSrcs.md || videoSrcs.hd || videoSrcs.uhd} type="video/mp4" />
                  )}
                </>
              )}
            </video>
          )) : null}
        </div>

      </div>

      {/* Top-right CTA */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8, ease }}
        className="absolute right-4 top-20 z-20 sm:right-8 md:right-12 md:top-24"
      >
          <InquiryCTA variant="light" label="Schedule Private Viewing" />
        </motion.div>


      {/* Centered overlay: headline + blurb + CTA */}
      <div className="absolute inset-0 z-20 w-full px-5 sm:px-8 md:px-12 flex flex-col items-center justify-start pt-4 sm:pt-8 md:pt-12">
        <div className="w-full max-w-[min(92vw,56rem)] text-center ff-glass-text">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease, delay: 0.65 }}
            className="text-white/90 mb-4 sm:mb-5 md:mb-6 uppercase flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-4 text-center"
            style={{ fontSize: 'clamp(0.78rem, 1.05vw, 0.95rem)', fontWeight: 700, letterSpacing: '0.32em', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
          >
            <span>107 Linden Trail, Aberdeen, NC</span>
            <span className="hidden sm:block text-[#C9B18F]">|</span>
            <span className="text-[#C9B18F]">3 Miles from Pinehurst</span>
            <span className="hidden sm:block text-[#C9B18F]">|</span>
            <span className="text-[#C9B18F]">Pinehurst ETJ</span>
          </motion.p>
          

          <p
            className="relative text-white/95 px-3 sm:px-4 md:px-6 leading-[1.8] sm:leading-[1.9] mx-auto"
            style={{ fontSize: 'clamp(1.12rem, 1.3vw, 1.25rem)', maxWidth: '52rem', textShadow: '0 2px 10px rgba(0,0,0,0.35), 0 6px 20px rgba(0,0,0,0.5)', marginBottom: '0.75rem' }}
          >
            Fifteen acres anchored by a commercial-grade residence and a USDA-registered farm, offering absolute privacy and rare zoning flexibility just three miles from Pinehurst.
          </p>

          <div className="relative z-30 w-full mt-2 mb-0 flex flex-wrap justify-center gap-x-8 gap-y-5">
            {KEY_METRICS.map((item, i) => (
              <KeyMetric key={`m-${i}`} item={item} index={i} />
            ))}
          </div>


        </div>
      </div>

      
      {false && (
      <div className="relative z-10 w-full px-5 sm:px-8 md:px-12 flex flex-col items-center justify-between min-h-[92svh]" style={{ paddingTop: 'clamp(132px, 18vh, 180px)' }}>
        <div className="flex-1" />

        {/* Title (same style as main) */}
        <div className="relative w-full max-w-[min(92vw,56rem)] text-center">
          

          {/* Narrative caption */}
          <div className="mx-auto w-full max-w-[1380px]">
            <div className="grid lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end">
              <div className="relative max-w-[760px] text-white mx-auto lg:mx-0">
                <div className="absolute -inset-3 sm:-inset-4 rounded-xl bg-black/25 border border-white/10" aria-hidden="true" />
                <div className="relative px-3 sm:px-4 py-3 sm:py-4">
                  <AnimatePresence mode="wait">
                    {narrative[currentNarrativeIndex] && (
                      <motion.div
                        key={`cap-${currentNarrativeIndex}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.8, ease: [0.22, 0.1, 0.28, 1] }}
                      >
                        {narrative[currentNarrativeIndex]?.eyebrow && (
                          <p className="mb-2 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.34em] text-[#e4cfad]/80">
                            {narrative[currentNarrativeIndex]?.eyebrow}
                          </p>
                        )}
                        <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.2rem)', lineHeight: 0.94, fontWeight: 400, letterSpacing: '0.01em', textShadow: '0 10px 36px rgba(0,0,0,0.34)' }}>
                          {narrative[currentNarrativeIndex]?.text}
                        </h2>
                        {narrative[currentNarrativeIndex]?.sub && (
                          <p className="m-0 text-white/90 sm:text-white/88" style={{ fontSize: 'clamp(0.98rem, 1.15vw, 1.1rem)', lineHeight: 1.85, letterSpacing: '0.01em', maxWidth: '58ch' }}>
                            {narrative[currentNarrativeIndex]?.sub}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right rail chips (desktop) */}
              <div className="hidden lg:block w-full max-w-[320px] justify-self-start lg:justify-self-end">
                <div className="border border-[#d6c2a1]/24 bg-[rgba(12,10,8,0.34)] p-5 backdrop-blur-xl sm:p-6 lg:p-7" style={{ boxShadow: '0 30px 90px rgba(0,0,0,0.26)' }}>
                  <p className="m-0 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.28em] text-white/48">Explore</p>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <Link to="/estate-at-a-glance" className="ff-glass-chip" aria-label="Explore Rooms">Rooms</Link>
                    <Link to="/Location" className="ff-glass-chip" aria-label="Explore Location">Location</Link>
                    <Link to="/inquiry" className="ff-glass-chip" aria-label="Schedule Private Viewing">Private Viewing</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics (mobile/tablet) */}
          <div className="relative z-30 w-full mt-6 mb-4 xl:hidden flex flex-wrap justify-center gap-x-10 gap-y-8">
            {KEY_METRICS.map((item, i) => (<KeyMetric key={`m-${i}`} item={item} index={i} />))}
          </div>
        </div>

        {/* CTA row */}
        <div className="relative z-20 flex flex-col sm:flex-row justify-center items-center w-full gap-6 sm:gap-10 md:gap-16" style={{ marginTop: '2.2rem' }}>
          <InquiryCTA variant="light" label="Schedule Private Viewing" />
        </div>

        {/* Scroll cue */}
        <button onClick={scrollToEditorial} className="group mt-10 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors" aria-label="Continue">
          <ChevronDown className="w-5 h-5 animate-bounce" />
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.3em]">Continue</span>
        </button>
      </div>
      )}
    </section>
  );
}