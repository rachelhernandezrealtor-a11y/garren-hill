import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ============================================================
   GARRAN HILL V6 -- MASTER BUILD 2026-04-23
   200 Hollycrest Drive, Pinehurst, NC
   4 Bedrooms / 4 Full Bathrooms / 2 Powder Rooms / 7 Fireplaces
   4.15 Acres / 6,072 Sq Ft GLA / Est. 1916
   Offered at $4,250,000
   Represented by Rachel Hernandez, Sotheby's International Realty
   --
   V6 CHANGES:
   - Hero video: proper HLS load, poster-to-video crossfade, no black screen
   - Galleries: true masonry / editorial grid, opens to full-screen lightbox
   - Library section: shots 58 + 59
   - Ken Burns on threshold section
============================================================ */

const FONTS    = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap';
const DARK     = '#0a0a0a';
const GOLD     = '#C9A96E';
const CREAM    = '#F5F0E8';
const SERIF    = "'Cormorant Garamond', Georgia, serif";
const SCRIPT   = "'Pinyon Script', cursive";

const GH_VIDEO  = 'https://customer-qqzxuq43g9w49ny2.cloudflarestream.com/3ca89e91573ba05f59e829fdacad9c2e/manifest/video.m3u8';
const GH_POSTER = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:80,e_auto_brightness,e_sharpen:50,e_saturation:30,f_auto,q_auto,w_1920,c_limit/https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/fa8cec793_200HollycrestDrive-191.jpg';

const BP  = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';
const B   = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';
const CDN = 'https://res.cloudinary.com/dghn2xpif/image/fetch/';
const INT = 'e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,w_1600,c_limit';
const EXT = 'e_improve:outdoor:70,e_auto_brightness,e_sharpen:35,e_saturation:22,f_auto,q_auto,w_1920,c_limit';

const pro    = (f, p = INT) => `${CDN}${p}/${BP}${f}`;
const own    = (f, p = INT) => `${CDN}${p}/${B}${f}`;
const ext    = f => pro(f, EXT);
const ownExt = f => own(f, EXT);

/* ---- ALL IMAGES ---- */
const I = {
  portico:     ext('fa8cec793_200HollycrestDrive-191.jpg'),
  entry:       pro('082d9b5c7_200Holycrest-1182.jpg'),
  threshold:   pro('7abb71910_200Holycrest-1179.jpg'),
  living:      pro('341c7343c_200Holycrest-1203.jpg'),
  wing:        own('0b06bdce9_Winglivingroom.jpg'),
  fireplace:   pro('5f5f87315_200HollycrestDrive-65fire.jpg'),
  fireplace2:  pro('194aa03be_200HollycrestDrive-94.jpg'),
  fp3:         pro('cee09ae5f_200HollycrestDrive-65.jpg'),
  fp4:         pro('c5aaa4c7d_200HollycrestDrive-110.jpg'),
  fp5:         pro('b5094de64_200HollycrestDrive-107.jpg'),
  fp6:         pro('d726a6755_200HollycrestDrive-119.jpg'),
  fp7:         pro('974dc6da4_200HollycrestDrive-66.jpg'),
  doorknob:    pro('886246096_200Holycrest-1701.jpg'),
  fireYellow:  pro('a6fad9582_200HollycrestDrive-116.jpg'),
  fireDining:  pro('a521e9d8a_200HollycrestDrive-34.jpg'),
  firePink:    pro('66ed11beb_200Holycrest-1351.jpg'),
  firePinkWide:pro('36a377fdc_200HollycrestDrive-93.jpg'),
  fireOrnate:  pro('c04dbe756_200HollycrestDrive-94.jpg'),
  stairHall:   pro('e856d8465_200HollycrestDrive-16.jpg'),
  leadedGlass: pro('b8fc16781_200Holycrest-1185.jpg'),
  sitting:     own('07dd22757_SITTINGROOMGUESTSUITE.jpg'),
  dining:      pro('e926f8fdd_200Holycrest-1296.jpg'),
  dining2:     pro('1b24b019d_HHDRwshellcabinetsApr96.jpg'),
  office:      pro('1d3d71365_200HollycrestDrive-136.jpg'),
  officeTall:  pro('92368fa78_200HollycrestDrive-135.jpg'),
  library:     pro('42dea0be0_200HollycrestDrive-58.jpg'),
  libraryWide: pro('d8eb9d69a_200HollycrestDrive-59.jpg'),
  bath:        pro('6e5fe498c_200HollycrestDrive-96.jpg'),
  window:      own('b0965610e_21AprHHBRwindowviewdogwoodemergingazaleas.jpg'),
  img1916:     own('7b1b1f524_GarranHill1916photos.jpg'),
  sepia:       ownExt('386fcbb9b_McAllisterColumns7BWjpgAntique.JPG'),
  whp:         `${CDN}f_auto,q_auto,w_1600/${B}2e864596c_WalterHinesPage.jpeg`,
  betty:       own('ee869bbb3_BDumainewToddyHunter1970s.jpg'),
  roseMoney:   ownExt('53fbdc821_53fbdc821.jpg'),
  roseWall:    ownExt('58a73d8a6_rosewall.jpg'),
  iris:        ownExt('08572b50d_25AprIrisbluejustoutinsideyardbywall.jpg'),
  azalea:      own('a851234be_21AprAzaleasbackyardundermagnolialongline.jpg'),
  poolWall:    own('e83a8c208_poolarchroses.jpg'),
  pool:        ext('57352d0a9_200HollycrestDrive-208.jpg'),
  aerial:      ext('12f2e7091_200HollycrestDrive-214.jpg'),
  dusk2:       ext('0de69e38e_200HollycrestDrive-9.jpg'),
  twilight:    ext('0275eccb6_200HollycrestDrive-225.jpg'),
  crest:       `${B}be819ab2a_generated_image.png`,
};

/* ============================================================
   HOOKS
============================================================ */
function useInView(ref, threshold = 0.1) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

function FadeIn({ children, delay = 0 }) {
  const ref = useRef();
  const v   = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(24px)', transition: `opacity 1.2s ease ${delay}s, transform 1.2s ease ${delay}s` }}>
      {children}
    </div>
  );
}

/* ============================================================
   TYPOGRAPHY HELPERS
============================================================ */
const EYE = (ov = {}) => ({
  fontFamily: 'sans-serif', fontSize: '8.5px', letterSpacing: '0.36em',
  textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '1.6rem', ...ov,
});

function Rule({ center = false }) {
  return <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.28, margin: center ? '0 auto 2.2rem' : '0 0 2.2rem' }} />;
}

/* ============================================================
   LIGHTBOX  --  full screen, keyboard nav, swipe ready
============================================================ */
function Lightbox({ photos, idx: startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const n = photos.length;
  const prev = useCallback(() => setIdx(i => (i - 1 + n) % n), [n]);
  const next = useCallback(() => setIdx(i => (i + 1) % n), [n]);

  useEffect(() => {
    const h = e => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next, onClose]);

  /* touch swipe */
  const tx = useRef(null);
  const onTS = e => { tx.current = e.touches[0].clientX; };
  const onTE = e => {
    if (tx.current === null) return;
    const dx = e.changedTouches[0].clientX - tx.current;
    if (Math.abs(dx) > 44) { dx < 0 ? next() : prev(); }
    tx.current = null;
  };

  return (
    <div
      onClick={onClose}
      onTouchStart={onTS} onTouchEnd={onTE}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* close */}
      <button onClick={onClose} style={{ position: 'absolute', top: '1.4rem', right: '1.8rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}>&#10005;</button>

      {/* counter */}
      <p style={{ position: 'absolute', top: '1.6rem', left: '50%', transform: 'translateX(-50%)', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: 0 }}>
        {idx + 1} &nbsp;/&nbsp; {n}
      </p>

      <div onClick={e => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', maxWidth: '92vw' }}>
        {n > 1 && (
          <button onClick={prev} style={{ flexShrink: 0, background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)', width: 48, height: 48, fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#8249;</button>
        )}
        <div style={{ textAlign: 'center' }}>
          <img
            src={photos[idx].src}
            alt={photos[idx].caption || ''}
            style={{ maxWidth: '80vw', maxHeight: '78vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />
          {photos[idx].caption && (
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', color: 'rgba(255,255,255,0.32)', fontSize: '0.8rem', marginTop: '1.1rem', letterSpacing: '0.04em' }}>
              {photos[idx].caption}
            </p>
          )}
        </div>
        {n > 1 && (
          <button onClick={next} style={{ flexShrink: 0, background: 'none', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)', width: 48, height: 48, fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#8250;</button>
        )}
      </div>

      {/* dot strip */}
      {n > 1 && (
        <div style={{ display: 'flex', gap: '6px', marginTop: '1.8rem' }}>
          {photos.map((_, i) => (
            <div key={i} onClick={() => setIdx(i)} style={{ width: 5, height: 5, borderRadius: '50%', background: i === idx ? GOLD : 'rgba(255,255,255,0.18)', cursor: 'pointer', transition: 'background 0.25s' }} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SOTHEBY'S MASONRY GALLERY
   -- Editorial grid: hero fills left, thumbs stack right.
   -- If 1 photo: single full-width.
   -- If 2: 60/40 split.
   -- If 3+: hero left + right column of up to 3, +N overlay on last.
============================================================ */
function MasonryGallery({ photos, onOpen }) {
  if (!photos || !photos.length) return null;

  const total  = photos.length;
  const hero   = photos[0];
  const thumbs = photos.slice(1, 4);         /* up to 3 right-column thumbs */
  const hidden = total - 4;                  /* how many are hidden */

  /* single photo */
  if (total === 1) {
    return (
      <div style={{ marginTop: '2.4rem' }}>
        <GalleryLabel n={total} />
        <div
          onClick={() => onOpen(photos, 0)}
          style={{ position: 'relative', width: '100%', aspectRatio: '16/9', backgroundImage: `url(${hero.src})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'zoom-in', overflow: 'hidden' }}
        >
          <HoverShade />
          <CaptionOverlay text={hero.caption} />
        </div>
      </div>
    );
  }

  /* 2 photos: side by side */
  if (total === 2) {
    return (
      <div style={{ marginTop: '2.4rem' }}>
        <GalleryLabel n={total} />
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 3 }}>
          {photos.map((p, i) => (
            <div key={i} onClick={() => onOpen(photos, i)}
              style={{ position: 'relative', aspectRatio: '4/3', backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'zoom-in', overflow: 'hidden' }}>
              <HoverShade />
              <CaptionOverlay text={p.caption} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* 3+ photos: hero left, column right */
  return (
    <div style={{ marginTop: '2.4rem' }}>
      <GalleryLabel n={total} />
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 3, alignItems: 'stretch' }}>
        {/* hero */}
        <div
          onClick={() => onOpen(photos, 0)}
          style={{ position: 'relative', backgroundImage: `url(${hero.src})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'zoom-in', overflow: 'hidden', minHeight: 280 }}
        >
          <HoverShade />
          <CaptionOverlay text={hero.caption} />
        </div>
        {/* right column */}
        <div style={{ display: 'grid', gridTemplateRows: `repeat(${thumbs.length}, 1fr)`, gap: 3 }}>
          {thumbs.map((p, i) => {
            const isLast  = i === thumbs.length - 1;
            const showMore = isLast && hidden > 0;
            return (
              <div key={i} onClick={() => onOpen(photos, i + 1)}
                style={{ position: 'relative', backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'zoom-in', overflow: 'hidden', minHeight: 90 }}>
                <HoverShade />
                {showMore ? (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: '#fff', fontSize: '1.05rem', letterSpacing: '0.02em' }}>+{hidden + 1} more</span>
                  </div>
                ) : (
                  <CaptionOverlay text={p.caption} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GalleryLabel({ n }) {
  return (
    <p style={{ fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.34em', textTransform: 'uppercase', color: GOLD, opacity: 0.55, margin: '0 0 0.75rem' }}>
      Gallery &mdash; {n} {n === 1 ? 'Image' : 'Images'}
    </p>
  );
}

function HoverShade() {
  const [h, setH] = useState(false);
  return (
    <div
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ position: 'absolute', inset: 0, background: h ? 'rgba(0,0,0,0.18)' : 'transparent', transition: 'background 0.25s' }}
    />
  );
}

function CaptionOverlay({ text }) {
  if (!text) return null;
  return (
    <p style={{ position: 'absolute', bottom: '0.65rem', left: '0.85rem', right: '0.85rem', fontFamily: SERIF, fontStyle: 'italic', fontSize: '0.72rem', color: 'rgba(255,255,255,0.62)', margin: 0, lineHeight: 1.45, pointerEvents: 'none' }}>
      {text}
    </p>
  );
}

/* ============================================================
   INQUIRY MODAL
============================================================ */
function InquiryModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const f  = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const INP = { width: '100%', background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(201,169,110,0.16)', color: CREAM, padding: '0.9rem 1.1rem', fontFamily: SERIF, fontSize: '1rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.8rem', borderRadius: 0 };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.93)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#0d0d0d', border: '1px solid rgba(201,169,110,0.13)', maxWidth: 520, width: '100%', padding: 'clamp(2.2rem,5vw,3.8rem)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.1rem', right: '1.4rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.28)', fontSize: '1.2rem', cursor: 'pointer' }}>&#10005;</button>
        <span style={EYE()}>Private Inquiry</span>
        <p style={{ fontFamily: SCRIPT, fontSize: '2.4rem', color: GOLD, margin: '0 0 0.3rem', lineHeight: 1 }}>Garran Hill</p>
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', color: CREAM, opacity: 0.45, fontSize: '0.86rem', margin: '0 0 2.2rem', lineHeight: 1.75 }}>
          200 Hollycrest Drive, Pinehurst, NC 28374<br />
          4 Bedrooms &nbsp;&bull;&nbsp; 4 Full Bathrooms &nbsp;&bull;&nbsp; 2 Powder Rooms &nbsp;&bull;&nbsp; 4.15 Acres<br />
          Offered at $4,250,000
        </p>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: SERIF, fontStyle: 'italic', fontSize: '1.15rem', textAlign: 'center', padding: '2.5rem 0' }}>Thank you. Rachel will be in touch shortly.</p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
            <input style={INP} placeholder="Full name" value={form.name} onChange={f('name')} required />
            <input style={INP} placeholder="Email address" type="email" value={form.email} onChange={f('email')} required />
            <input style={INP} placeholder="Phone (optional)" value={form.phone} onChange={f('phone')} />
            <textarea style={{ ...INP, minHeight: 88, resize: 'vertical' }} placeholder="Message (optional)" value={form.message} onChange={f('message')} />
            <button type="submit" style={{ width: '100%', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '8.5px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: '1.1rem', cursor: 'pointer', marginTop: '0.3rem' }}>
              Send Inquiry
            </button>
          </form>
        )}
        <p style={{ fontFamily: 'sans-serif', fontSize: '7px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginTop: '1.8rem', textAlign: 'center' }}>
          Rachel Hernandez &nbsp;&bull;&nbsp; Sotheby's International Realty &nbsp;&bull;&nbsp; All inquiries held in strict confidence
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   HERO  --  V6: poster visible immediately, video crossfades in
============================================================ */
function Hero({ onInquire }) {
  const vRef     = useRef();
  const [ready, setReady] = useState(false);   /* video ready to show */

  useEffect(() => {
    const v = vRef.current;
    if (!v) return;

    const onCanPlay = () => setReady(true);
    v.addEventListener('canplay', onCanPlay);

    /* HLS load */
    const load = () => {
      if (v.canPlayType('application/vnd.apple.mpegurl')) {
        v.src = GH_VIDEO;
        v.play().catch(() => {});
        return;
      }
      if (window.Hls && window.Hls.isSupported()) {
        const hls = new window.Hls({ maxBufferLength: 30, startLevel: -1 });
        hls.loadSource(GH_VIDEO);
        hls.attachMedia(v);
        hls.on(window.Hls.Events.MANIFEST_PARSED, () => v.play().catch(() => {}));
        return;
      }
    };

    if (!window.Hls) {
      const s   = document.createElement('script');
      s.src     = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.7/dist/hls.min.js';
      s.onload  = load;
      document.head.appendChild(s);
    } else {
      load();
    }
    return () => v.removeEventListener('canplay', onCanPlay);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden', background: '#040404' }}>

      {/* POSTER -- always visible until video is ready */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: `url(${GH_POSTER})`,
        backgroundSize: 'cover', backgroundPosition: 'center 58%',
        opacity: ready ? 0 : 1,
        transition: 'opacity 1.4s ease',
      }} />

      {/* VIDEO */}
      <video
        ref={vRef}
        muted loop playsInline preload="none"
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 58%',
          zIndex: 2,
          opacity: ready ? 1 : 0,
          transition: 'opacity 1.4s ease',
        }}
      />

      {/* GRADIENT OVERLAY */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 3, background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.82) 100%)' }} />

      {/* NAV */}
      <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'clamp(1.2rem,2.5vw,1.8rem) clamp(1.5rem,4vw,3.5rem)' }}>
        <span style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)' }}>Garran Hill</span>
        <div style={{ display: 'flex', gap: 'clamp(1.5rem,3vw,2.8rem)', alignItems: 'center' }}>
          {['The Estate', 'The History', 'The Grounds'].map(l => (
            <span key={l} style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', cursor: 'pointer' }}>{l}</span>
          ))}
          <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, background: 'none', border: `1px solid ${GOLD}`, padding: '0.6rem 1.3rem', cursor: 'pointer' }}>
            Private Inquiry
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(2rem,5vw,4.5rem) clamp(2rem,6vw,5.5rem) clamp(8rem,14vw,11rem)' }}>
        <div>
          <span style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, opacity: 0.75, display: 'block', marginBottom: '2rem' }}>
            200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; Est. 1916
          </span>
          <div style={{ fontFamily: SCRIPT, fontSize: 'clamp(5rem,12vw,13rem)', color: '#fff', lineHeight: 0.88, textShadow: '0 4px 40px rgba(0,0,0,0.6)', marginBottom: '2.5rem' }}>
            Garran<br />Hill
          </div>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem,1.5vw,1.25rem)', color: 'rgba(255,255,255,0.78)', margin: '0 0 0.5rem', letterSpacing: '0.01em' }}>Built in 1916. Built once. Built right.</p>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.85rem,1.1vw,1rem)', color: 'rgba(255,255,255,0.42)', margin: '0 0 3rem', letterSpacing: '0.01em' }}>Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship.</p>
          <span style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.34em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: '3px' }}>
            Tour the Estate
          </span>
        </div>
      </div>

      {/* STAT BAR */}
      <StatBar />
    </section>
  );
}

function StatBar() {
  const S = [
    { n: '1916',       l: 'Year Built' },
    { n: '6,072',      l: 'Square Feet' },
    { n: '4.15',       l: 'Acres' },
    { n: '4',          l: 'Bedrooms' },
    { n: '4',          l: 'Full Bathrooms' },
    { n: '2',          l: 'Powder Rooms' },
    { n: '7',          l: 'Fireplaces' },
    { n: '$4,250,000', l: 'Asking Price' },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, background: 'rgba(4,4,4,0.84)', backdropFilter: 'blur(18px)', borderTop: '1px solid rgba(201,169,110,0.09)', display: 'flex', overflowX: 'auto' }}>
      {S.map((s, i) => (
        <div key={i} style={{ flex: '1 0 auto', padding: 'clamp(0.75rem,1.4vw,1.1rem) clamp(0.5rem,1vw,1rem)', textAlign: 'center', borderRight: i < S.length - 1 ? '1px solid rgba(201,169,110,0.07)' : 'none' }}>
          <div style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.85rem,1.4vw,1.3rem)', color: '#fff', whiteSpace: 'nowrap' }}>{s.n}</div>
          <div style={{ fontFamily: 'sans-serif', fontSize: '6.5px', letterSpacing: '0.26em', textTransform: 'uppercase', color: GOLD, opacity: 0.58, marginTop: '0.15rem', whiteSpace: 'nowrap' }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   CINEMATIC REVEAL  --  text left / right + masonry gallery
============================================================ */
function CinematicReveal({ eyebrow, headline, body, subBody, img, flip = false, photos, onOpen, dark = false, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: flip ? 'row-reverse' : 'row', minHeight: 'clamp(540px,72vh,860px)', background: dark ? '#060606' : DARK }}>
      {/* text panel */}
      <div style={{ flex: '0 0 46%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(4rem,7vw,7rem) clamp(3rem,5.5vw,5.5rem)' }}>
        <FadeIn>
          <span style={EYE()}>{eyebrow}</span>
          <Rule />
          <h2
            style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(1.9rem,2.9vw,3.5rem)', color: '#fff', lineHeight: 1.08, margin: '0 0 1.8rem', letterSpacing: '-0.015em' }}
            dangerouslySetInnerHTML={{ __html: headline }}
          />
          <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.95rem,1.18vw,1.08rem)', color: CREAM, opacity: 0.7, lineHeight: 2.25, margin: 0 }}>{body}</p>
          {subBody && <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.88rem,1.05vw,0.98rem)', color: CREAM, opacity: 0.48, lineHeight: 2.1, margin: '1.2rem 0 0', fontStyle: 'italic' }}>{subBody}</p>}
          {children}
          {photos && photos.length > 0 && <MasonryGallery photos={photos} onOpen={onOpen} />}
        </FadeIn>
      </div>
      {/* image panel */}
      <div style={{ flex: 1, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 460 }} />
    </section>
  );
}

/* ============================================================
   FULL BLEED
============================================================ */
function FullBleed({ src, eyebrow, headline, body, align = 'center', darken = 0.52, minH = 'clamp(500px,70vh,800px)', bgPos = 'center', children }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: minH, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: '-8% 0', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: bgPos, zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: `rgba(4,4,4,${darken})`, zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,10vw,14rem)', textAlign: align === 'right' ? 'left' : align, display: 'flex', flexDirection: 'column', alignItems: align === 'right' ? 'flex-end' : align === 'center' ? 'center' : 'flex-start' }}>
        <FadeIn>
          {eyebrow && <span style={EYE()}>{eyebrow}</span>}
          {headline && (
            <h2
              style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(2rem,4vw,4.8rem)', color: '#fff', lineHeight: 1.08, margin: eyebrow ? '0 0 2rem' : '0 0 1.5rem', letterSpacing: '-0.015em', maxWidth: (align === 'left' || align === 'right') ? 780 : '100%' }}
              dangerouslySetInnerHTML={{ __html: headline }}
            />
          )}
          {body && <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(1rem,1.25vw,1.12rem)', color: CREAM, opacity: 0.78, lineHeight: 2.15, maxWidth: 680, margin: align === 'center' ? '0 auto' : '0' }}>{body}</p>}
          {children}
        </FadeIn>
      </div>
    </section>
  );
}

function PullQuote({ quote, attr }) {
  return (
    <div style={{ background: '#050505', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,14vw,18rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <img src={I.crest} alt="" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 340, opacity: 0.03, pointerEvents: 'none', mixBlendMode: 'screen' }} />
      <FadeIn>
        <Rule center />
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.7rem,3.5vw,3.6rem)', color: '#fff', lineHeight: 1.38, margin: '0 auto 2.2rem', maxWidth: 860 }}>
          &ldquo;{quote}&rdquo;
        </p>
        <Rule center />
        {attr && <p style={{ fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: '1.5rem 0 0' }}>{attr}</p>}
      </FadeIn>
    </div>
  );
}

function DarkSection({ eyebrow, headline, body, children, center = false }) {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)', textAlign: center ? 'center' : 'left' }}>
      <FadeIn>
        {eyebrow && <span style={EYE()}>{eyebrow}</span>}
        <Rule center={center} />
        {headline && <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(2rem,3.5vw,4rem)', color: '#fff', lineHeight: 1.1, margin: '0 0 1.8rem', maxWidth: center ? '100%' : 840, letterSpacing: '-0.012em' }} dangerouslySetInnerHTML={{ __html: headline }} />}
        {body && <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.95rem,1.18vw,1.08rem)', color: CREAM, opacity: 0.68, lineHeight: 2.25, maxWidth: 760, margin: center ? '0 auto' : 0 }}>{body}</p>}
        {children}
      </FadeIn>
    </section>
  );
}

function DetailGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.8rem', marginTop: '3.5rem' }}>
      {items.map((c, i) => (
        <FadeIn key={i} delay={i * 0.06}>
          <div style={{ borderTop: '1px solid rgba(201,169,110,0.14)', paddingTop: '1.8rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem' }}>{c.label}</p>
            <p style={{ fontFamily: SERIF, fontWeight: 300, color: CREAM, fontSize: '0.97rem', lineHeight: 2.1, opacity: 0.68, margin: 0 }}>{c.body}</p>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer({ onInquire }) {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(201,169,110,0.07)' }}>
      <div style={{ padding: 'clamp(3.5rem,7vw,6rem) clamp(2rem,8vw,8rem)', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: SCRIPT, fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: GOLD, margin: '0 0 0.4rem', lineHeight: 1 }}>Garran Hill</p>
          <p style={{ fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', margin: 0 }}>200 Hollycrest Drive &bull; Pinehurst, NC 28374 &bull; Est. 1916</p>
        </div>
        <img src={I.crest} alt="" style={{ height: 64, opacity: 0.35, mixBlendMode: 'screen' }} />
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', color: CREAM, opacity: 0.35, fontSize: '0.84rem', margin: '0 0 0.35rem' }}>Represented exclusively by</p>
          <p style={{ fontFamily: SERIF, fontWeight: 500, color: CREAM, fontSize: '1.05rem', margin: '0 0 0.22rem' }}>Rachel Hernandez</p>
          <p style={{ fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, opacity: 0.65, margin: '0 0 1.2rem' }}>Sotheby's International Realty</p>
          <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, background: 'none', border: `1px solid ${GOLD}`, padding: '0.65rem 1.6rem', cursor: 'pointer' }}>
            Private Inquiry
          </button>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '1.2rem 3rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.13)', margin: 0 }}>
          &copy; 2026 Sotheby's International Realty &nbsp;&bull;&nbsp; All inquiries held in strict confidence
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN APP
============================================================ */
export default function GarranHillV6() {
  const [modal, setModal] = useState(false);
  const [lb, setLb]       = useState(null);
  const openLB = useCallback((photos, idx) => setLb({ photos, idx }), []);

  useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS; document.head.appendChild(l);
    document.title = 'Garran Hill -- 200 Hollycrest Drive, Pinehurst, NC | $4,250,000';
    document.body.style.cssText = 'margin:0;background:#0a0a0a;overflow-x:hidden';
  }, []);

  /* ---- GALLERY COLLECTIONS ---- */
  const G = {
    entry: [
      { src: I.leadedGlass, caption: 'The Entrance Hall -- Leaded glass fanlight. Staircase. The axis to the library.' },
      { src: I.entry,       caption: 'The Entrance Hall -- Looking to the Library' },
      { src: I.threshold,   caption: 'The Threshold -- GARRAN HILL 1916' },
    ],
    reception: [
      { src: I.living,    caption: 'The Drawing Room' },
      { src: I.fireplace, caption: 'Fire going, no one home yet.' },
      { src: I.fireplace2,caption: 'Second Fireplace -- Original Surround' },
      { src: I.wing,      caption: 'The Wing Living Room' },
      { src: I.sitting,   caption: 'The Guest Suite Sitting Room' },
    ],
    dining: [
      { src: I.dining,    caption: 'The Dining Room' },
      { src: I.dining2,   caption: 'Shell Cabinets -- Original. Still there.' },
    ],
    library: [
      { src: I.libraryWide, caption: 'The Library -- Full View' },
      { src: I.library,     caption: 'The Library -- French Doors + Rolling Ladder' },
    ],
    study: [
      { src: I.office,    caption: 'The Study -- David Prest Millwork' },
      { src: I.officeTall,caption: 'The Study -- Floor to Ceiling' },
    ],
    primary: [
      { src: I.bath,      caption: 'Primary Bath -- Freestanding Tub' },
      { src: I.window,    caption: 'White dogwood through divided glass. April.' },
    ],
    grounds: [
      { src: I.roseMoney, caption: 'The Rose Garden -- Money Shot' },
      { src: I.roseWall,  caption: 'The wall does two things: it holds the pool and it holds the roses.' },
      { src: I.iris,      caption: 'The irises come back every April. Nobody planted them this year.' },
      { src: I.azalea,    caption: 'Azaleas. Back yard. Under the magnolia.' },
      { src: I.poolWall,  caption: 'Pool -- The Arch Gate' },
      { src: I.pool,      caption: 'The Pool -- 20 x 40 Salt Water' },
    ],
  };

  return (
    <div style={{ background: DARK, color: CREAM, minHeight: '100vh' }}>
      {lb && <Lightbox photos={lb.photos} idx={lb.idx} onClose={() => setLb(null)} />}
      {modal && <InquiryModal onClose={() => setModal(false)} />}

      {/* 01 HERO */}
      <Hero onInquire={() => setModal(true)} />

      {/* 02 THRESHOLD -- Ken Burns */}
      <section style={{ position: 'relative', minHeight: 'clamp(460px,60vh,680px)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <style>{`
          @keyframes thresholdPull { from { transform: scale(1.0); } to { transform: scale(1.07); } }
        `}</style>
        <div style={{
          position: 'absolute', inset: '-6% 0',
          backgroundImage: `url(${I.threshold})`,
          backgroundSize: 'cover', backgroundPosition: 'center 30%', zIndex: 0,
          animation: 'thresholdPull 12s ease-in-out infinite alternate',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,4,4,0.54)', zIndex: 1 }} />
        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem' }}>
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.8rem,4vw,4rem)', color: '#fff', margin: 0, lineHeight: 1.3 }}>
              The door has been open since 1916.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 02b STAIRCASE -- interior arrival */}
      <section style={{ position: 'relative', minHeight: 'clamp(500px,68vh,780px)', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
        <style>{`@keyframes stairPull { from { transform: scale(1.0); } to { transform: scale(1.06); } }`}</style>
        <div style={{
          position: 'absolute', inset: '-6% 0',
          backgroundImage: `url(${I.leadedGlass})`,
          backgroundSize: 'cover', backgroundPosition: 'center 20%', zIndex: 0,
          animation: 'stairPull 14s ease-in-out infinite alternate',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(4,4,4,0.72) 0%, rgba(4,4,4,0.18) 60%, transparent 100%)', zIndex: 1 }} />
        <FadeIn>
          <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(3rem,8vw,7rem) clamp(2rem,10vw,12rem)', maxWidth: 640 }}>
            <span style={EYE()}>The Entrance Hall</span>
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.6rem,3.2vw,3.2rem)', color: '#fff', margin: '1.5rem 0 0', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
              The staircase has turned<br />the same curve since 1916.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* 03 ENTRANCE HALL */}
      <CinematicReveal
        eyebrow="The Entrance Hall"
        headline="Carved in granite.<br/><em style='font-weight:300'>GARRAN HILL 1916.</em>"
        body="White raised-panel wainscoting to chair rail on every wall. The staircase curves right as you enter -- mahogany volute, white turned balusters, the same sweep since 1916. The central axis runs straight to the library bookcases, visible from the front door."
        img={I.entry}
        photos={G.entry} onOpen={openLB}
      />

      {/* 04 DRAWING ROOM */}
      <CinematicReveal flip
        eyebrow="The Drawing Room"
        headline="Fire going, no one home yet.<br/><em style='font-weight:300'>Seven fireplaces. This is one.</em>"
        body="The original proportions -- 17-foot ceilings where the architecture demands it. Original fireplace surround. Three exposures. The room holds light differently in the morning than it does in the afternoon."
        img={I.living}
        photos={G.reception} onOpen={openLB} dark
      />

      {/* 05 DINING ROOM */}
      <CinematicReveal
        eyebrow="The Dining Room"
        headline="The shell cabinets were already there.<br/><em style='font-weight:300'>They are still there now.</em>"
        body="Four shell alcoves set into the walls -- original to 1916, intact through every era of the house. The room was right then. It is right now."
        img={I.dining}
        photos={G.dining} onOpen={openLB}
      />

      {/* 06 LIBRARY */}
      <CinematicReveal flip
        eyebrow="The Library"
        headline="Floor to ceiling. Wall to wall.<br/><em style='font-weight:300'>The books were already there.</em>"
        body="Built-in shelving on three walls. Rolling ladder. Brass chandelier. French doors to the entrance hall on two sides. Visible from the front door the moment you step in."
        img={I.libraryWide}
        photos={G.library} onOpen={openLB} dark
      />

      {/* 06b WALTER HINES PAGE -- woven after Library */}
      <FullBleed
        src={I.whp}
        eyebrow="The Man Who Built It"
        headline="He named it Garran Hill.<br/><em style='font-weight:300'>He never walked through the door.</em>"
        darken={0.70}
        bgPos="center top"
        minH="clamp(560px,76vh,860px)"
      >
        <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.92rem,1.15vw,1.05rem)', color: CREAM, opacity: 0.68, lineHeight: 2.3, maxWidth: 600, marginTop: '1.5rem' }}>
          Walter Hines Page purchased the land in February 1913 and named the estate Garran Hill. The following month, President Wilson appointed him Ambassador to the Court of St. James. He served in London through the First World War -- the most consequential years of the 20th century. He died in Pinehurst on December 21, 1918, and was honored in Westminster Abbey as &ldquo;the friend of Britain in her sorest need.&rdquo; The house he built was completed without him. It has stood for 110 years.
        </p>
      </FullBleed>

      {/* 07 STUDY */}
      <CinematicReveal
        eyebrow="The Study"
        headline="Custom millwork. Original proportions.<br/><em style='font-weight:300'>Built-in shelving floor to ceiling.</em>"
        body="Floor-to-ceiling built-in shelving by David Prest. Original fireplace. Divided-light windows on two walls. The room was designed for a man who read everything and wrote constantly."
        img={I.office}
        photos={G.study} onOpen={openLB}
      />

      {/* 08 PRIMARY SUITE */}
      <CinematicReveal flip
        eyebrow="The Primary Suite"
        headline="White dogwood through divided glass.<br/><em style='font-weight:300'>April. Every year.</em>"
        body="Two dark-wood vanities with speckled granite countertops and undermount sinks. Freestanding soaking tub. Framed by original divided-light windows on two walls. The dogwood blooms every April without anyone's help."
        img={I.bath}
        photos={G.primary} onOpen={openLB} dark
      />

      {/* 08b SEVEN FIREPLACES */}
      <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,8rem) clamp(2rem,8vw,10rem)' }}>
        <FadeIn>
          <div style={{ marginBottom: 'clamp(3rem,6vw,5rem)' }}>
            <span style={EYE()}>The Fireplaces</span>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(2.2rem,4vw,4.8rem)', color: '#fff', lineHeight: 1.06, margin: '1.2rem 0 1.8rem', letterSpacing: '-0.015em' }}>
              Seven fireplaces.<br /><em style={{ fontWeight: 300 }}>Six of them light with one switch.</em>
            </h2>
            <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.95rem,1.2vw,1.08rem)', color: CREAM, opacity: 0.68, lineHeight: 2.2, maxWidth: 640 }}>
              Each surround is original to 1916 -- carved wood, marble, painted plaster. Each room was designed around its fireplace. Six are fitted with propane gas logs and wall-switch timers. One tap. The house shifts.
            </p>
          </div>
        </FadeIn>

        {/* TWO HEROES -- fire on */}
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, marginBottom: 4 }}>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${I.fireplace})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,6,0.85) 0%, transparent 52%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 'clamp(1.2rem,2.5vw,2rem)' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.5rem' }}>The Drawing Room</p>
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem,1.6vw,1.45rem)', color: '#fff', margin: 0, lineHeight: 1.3 }}>Fire going, no one home yet.</p>
              </div>
            </div>
            <div style={{ position: 'relative', aspectRatio: '4/3', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${I.firePink})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,6,0.85) 0%, transparent 52%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, padding: 'clamp(1.2rem,2.5vw,2rem)' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '7px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.5rem' }}>The Rose Suite</p>
                <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem,1.6vw,1.45rem)', color: '#fff', margin: 0, lineHeight: 1.3 }}>The surround is carved plaster. The fire is real.</p>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* DETAIL STRIP -- five more surrounds */}
        <FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 4 }}>
            {[
              { src: I.fireOrnate,  label: 'The Master Wing',  sub: 'Ornate coffered overmantel. Gas log.' },
              { src: I.fireYellow,  label: 'Yellow Suite',     sub: 'Twin room. Wood fire. Three windows.' },
              { src: I.fireDining,  label: 'The Dining Room',  sub: 'Shell alcove + fire. Linked by arch.' },
              { src: I.fp4,         label: 'The Red Room',     sub: 'White surround. Gas log.' },
              { src: I.firePinkWide,label: 'The Rose Suite',   sub: 'Four-poster. Fire going.' },
            ].map((fp, i) => (
              <div key={i} style={{ position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${fp.src})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,6,0.88) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '0.9rem' }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '6.5px', letterSpacing: '0.24em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.2rem', opacity: 0.85 }}>{fp.label}</p>
                  <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: '0.72rem', color: CREAM, margin: 0, opacity: 0.6, lineHeight: 1.4 }}>{fp.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* 13 GROUNDS */}
      <CinematicReveal
        eyebrow="The Grounds"
        headline="The wall does two things:<br/><em style='font-weight:300'>it holds the pool and it holds the roses.</em>"
        body="4.15 acres. Rose garden running the full length of the pool wall. Irises in April. Azaleas under the magnolia. 28-zone irrigation from a 130-foot dedicated well. 12+ parking spaces. Two tennis courts."
        img={I.roseMoney}
        photos={G.grounds} onOpen={openLB}
      />

      {/* 13b STEWARDSHIP -- Betty Dumaine, woven after Grounds */}
      <FullBleed
        src={I.betty}
        eyebrow="Stewardship"
        headline="She planted this garden from scratch.<br/><em style='font-weight:300'>This is what twenty years of care looks like.</em>"
        darken={0.60}
        align="left"
        bgPos="center top"
        minH="clamp(540px,72vh,820px)"
      >
        <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.92rem,1.15vw,1.05rem)', color: CREAM, opacity: 0.68, lineHeight: 2.3, maxWidth: 560, marginTop: '1.5rem' }}>
          Betty Dumaine arrived at Garran Hill and found the grounds nearly bare. Over twenty years she planted everything -- the rose garden, the pool walk, the camellias along the pebble path. Blue Fox, her horse, is buried on the grounds. A stone marks the place. Four generations of remarkable people have called this place home.
        </p>
      </FullBleed>

      {/* 14 INFRASTRUCTURE */}
      <DarkSection
        eyebrow="Infrastructure"
        headline="Built to run."
      >
        <DetailGrid items={[
          { label: 'Pool', body: '20x40 salt water, converted 2022. Brick surround with original wrought iron gate.' },
          { label: 'Hot Water', body: 'Three heaters -- 80 gallon primary + two 40-gallon units. Three whirlpool tubs.' },
          { label: 'Fireplaces', body: 'Seven fireplaces. Six of seven fitted with propane gas logs and wall-switch timers.' },
          { label: 'Irrigation', body: '28+ zones fed by a dedicated 130-foot deep well. Independent of the domestic system.' },
          { label: 'Security', body: 'Hard-wired 2000. Greensboro monitoring. Intercom via house phones.' },
          { label: 'Parking', body: '12+ cars northeast lot. Additional 6 at the pool lot.' },
        ]} />
      </DarkSection>

      {/* 14b 1916 ARCHIVE -- woven before end sequence */}
      <DarkSection
        eyebrow="Est. 1916"
        headline="In 1916, those were saplings.<br/>Now they are a forest."
      >
        <div style={{ marginTop: '3rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
          <div style={{ aspectRatio: '4/3', backgroundImage: `url(${I.img1916})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
          <div style={{ aspectRatio: '4/3', backgroundImage: `url(${I.sepia})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        </div>
      </DarkSection>

      {/* RESTORATION PULL QUOTE -- transition into end */}
      <PullQuote
        quote="The new entry was designed around the original leaded glass."
        attr="Thomas O'Shea -- Restoration Architect, 2000"
      />

      {/* 15 AERIAL */}
      <FullBleed
        src={I.aerial}
        headline="The world outside these gates<br/>does not exist here."
        darken={0.38}
        minH="clamp(540px,72vh,820px)"
      />

      {/* 16 DUSK */}
      <FullBleed
        src={I.dusk2}
        eyebrow="200 Hollycrest Drive"
        headline="Four generations of remarkable people<br/>have called this place home."
        darken={0.48}
        minH="clamp(520px,68vh,780px)"
      />

      {/* 17 FINAL -- TWILIGHT */}
      <FullBleed
        src={I.twilight}
        darken={0.35}
        minH="clamp(560px,76vh,860px)"
      >
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(2rem,4.5vw,5rem)', color: '#fff', margin: '0 auto', textAlign: 'center', letterSpacing: '-0.01em', lineHeight: 1.15, textShadow: '0 4px 32px rgba(0,0,0,0.5)' }}>
          Garran Hill is ready.
        </p>
      </FullBleed>

      {/* FOOTER */}
      <Footer onInquire={() => setModal(true)} />
    </div>
  );
}
