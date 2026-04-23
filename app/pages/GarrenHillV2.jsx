import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ============================================================
   GARRAN HILL V5 -- MASTER BUILD 2026-04-23
   200 Hollycrest Drive, Pinehurst, NC
   4 Beds / 4 Baths / 2 Powder Rooms / 7 Fireplaces
   4.15 Acres / 6,072 Sq Ft GLA / Est. 1916
   Offered at $4,250,000
   Represented by Rachel Hernandez, Sotheby's International Realty
============================================================ */

const FONTS = "https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap";
const DARK  = '#0a0a0a';
const GOLD  = '#C9A96E';
const CREAM = '#F5F0E8';
const SERIF  = "'Cormorant Garamond', Georgia, serif";
const SCRIPT = "'Pinyon Script', cursive";

const GH_VIDEO  = 'https://customer-qqzxuq43g9w49ny2.cloudflarestream.com/3ca89e91573ba05f59e829fdacad9c2e/manifest/video.m3u8';
const GH_POSTER = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:80,e_auto_brightness,e_sharpen:50,e_saturation:30,f_auto,q_auto,w_1920,c_limit/https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/fa8cec793_200HollycrestDrive-191.jpg';

const BP  = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';
const B   = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';
const CDN = 'https://res.cloudinary.com/dghn2xpif/image/fetch/';
const INT = 'e_improve:indoor:65,e_brightness:12,e_shadow:-25,e_sharpen:45,e_saturation:18,f_auto,q_auto,w_1600,c_limit';
const EXT = 'e_improve:outdoor:70,e_auto_brightness,e_sharpen:35,e_saturation:22,f_auto,q_auto,w_1920,c_limit';

const pro = (f, p=INT) => `${CDN}${p}/${BP}${f}`;
const own = (f, p=INT) => `${CDN}${p}/${B}${f}`;
const ext = f => pro(f, EXT);
const ownExt = f => own(f, EXT);

const I = {
  /* Hero */
  portico:     ext('fa8cec793_200HollycrestDrive-191.jpg'),
  /* Entrance */
  entry:       pro('082d9b5c7_200Holycrest-1182.jpg'),
  threshold:   pro('a9228a85d_200Holycrest-1179.jpg'),
  /* Reception */
  living:      pro('341c7343c_200Holycrest-1203.jpg'),
  wing:        own('0b06bdce9_Winglivingroom.jpg'),
  fireplace:   pro('5f5f87315_200HollycrestDrive-65fire.jpg'),
  fireplace2:  pro('e07e07f86_200HollycrestDrive-86.jpg'),
  sitting:     own('07dd22757_SITTINGROOMGUESTSUITE.jpg'),
  /* Dining */
  dining:      pro('e926f8fdd_200Holycrest-1296.jpg'),
  dining2:     pro('1b24b019d_HHDRwshellcabinetsApr96.jpg'),
  /* Study */
  office:      own('2b920c3b0_markofficemoneyshot.jpg'),
  officeTall:  own('0f9f2f213_architecmarkofficetallbeampic.jpg'),
  /* Primary Suite */
  bath:        own('08da5b97d_spaprimarybath.jpg'),
  window:      own('b0965610e_21AprHHBRwindowviewdogwoodemergingazaleas.jpg'),
  /* History */
  img1916:     own('7b1b1f524_GarranHill1916photos.jpg'),
  sepia:       ownExt('386fcbb9b_McAllisterColumns7BWjpgAntique.JPG'),
  whp:         `${CDN}f_auto,q_auto,w_1600/${B}2e864596c_WalterHinesPage.jpeg`,
  betty:       own('ee869bbb3_BDumainewToddyHunter1970s.jpg'),
  /* Grounds */
  roseMoney:   ownExt('53fbdc821_53fbdc821.jpg'),
  roseWall:    ownExt('58a73d8a6_rosewall.jpg'),
  iris:        ownExt('08572b50d_25AprIrisbluejustoutinsideyardbywall.jpg'),
  azalea:      own('a851234be_21AprAzaleasbackyardundermagnolialongline.jpg'),
  poolWall:    own('e83a8c208_poolarchroses.jpg'),
  pool:        ext('57352d0a9_200HollycrestDrive-208.jpg'),
  /* Exterior */
  aerial:      ext('12f2e7091_200HollycrestDrive-214.jpg'),
  dusk2:       ext('0de69e38e_200HollycrestDrive-9.jpg'),
  twilight:    ext('0275eccb6_200HollycrestDrive-225.jpg'),
  /* Assets */
  crest:       `${B}be819ab2a_generated_image.png`,
};

/* ============================================================
   HOOKS
============================================================ */
function useInView(ref, threshold = 0.12) {
  const [v, setV] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return v;
}

/* ============================================================
   COMPONENTS
============================================================ */
function FadeIn({ children, delay = 0 }) {
  const ref = useRef();
  const v = useInView(ref);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? 'none' : 'translateY(22px)', transition: `opacity 1.1s ease ${delay}s, transform 1.1s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const EYE = (overrides = {}) => ({
  fontFamily: 'sans-serif',
  fontSize: '9px',
  letterSpacing: '0.34em',
  textTransform: 'uppercase',
  color: GOLD,
  display: 'block',
  marginBottom: '1.6rem',
  ...overrides,
});

function Rule({ center = false }) {
  return <div style={{ width: 44, height: 1, background: GOLD, opacity: 0.32, margin: center ? '0 auto 2.2rem' : '0 0 2.2rem' }} />;
}

/* ============================================================
   LIGHTBOX
============================================================ */
function Lightbox({ photos, idx: startIdx, onClose }) {
  const [idx, setIdx] = useState(startIdx);
  const prev = () => setIdx(i => (i - 1 + photos.length) % photos.length);
  const next = () => setIdx(i => (i + 1) % photos.length);
  useEffect(() => {
    const h = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.97)', zIndex: 9999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <button onClick={onClose} style={{ position: 'absolute', top: '1.5rem', right: '2rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.4rem', cursor: 'pointer' }}>&#10005;</button>
      <div onClick={e => e.stopPropagation()} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {photos.length > 1 && <button onClick={prev} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)', width: 44, height: 44, fontSize: '1.2rem', cursor: 'pointer', flexShrink: 0 }}>&#8249;</button>}
        <div>
          <img src={photos[idx].src} alt={photos[idx].caption || ''} style={{ maxWidth: '80vw', maxHeight: '76vh', objectFit: 'contain', display: 'block' }} />
          {photos[idx].caption && (
            <p style={{ fontFamily: SERIF, fontStyle: 'italic', color: 'rgba(255,255,255,0.38)', fontSize: '0.82rem', textAlign: 'center', marginTop: '1rem', letterSpacing: '0.04em' }}>{photos[idx].caption}</p>
          )}
        </div>
        {photos.length > 1 && <button onClick={next} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)', width: 44, height: 44, fontSize: '1.2rem', cursor: 'pointer', flexShrink: 0 }}>&#8250;</button>}
      </div>
      {photos.length > 1 && (
        <div style={{ display: 'flex', gap: '6px', marginTop: '1.5rem' }}>
          {photos.map((_, i) => <div key={i} onClick={() => setIdx(i)} style={{ width: 5, height: 5, borderRadius: '50%', background: i === idx ? GOLD : 'rgba(255,255,255,0.2)', cursor: 'pointer' }} />)}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   SOTHEBY'S GALLERY -- the real thing
============================================================ */
function SothebyGallery({ photos, onOpen }) {
  if (!photos || !photos.length) return null;
  const hero = photos[0];
  const rest = photos.slice(1, 5);
  return (
    <div style={{ marginTop: '2.8rem' }}>
      {/* Label */}
      <p style={EYE({ marginBottom: '1rem' })}>Gallery &mdash; {photos.length} {photos.length === 1 ? 'Image' : 'Images'}</p>
      <div style={{ display: 'grid', gridTemplateColumns: rest.length ? '2fr 1fr' : '1fr', gridTemplateRows: 'auto', gap: '4px' }}>
        {/* Hero thumb */}
        <div onClick={() => onOpen(photos, 0)} style={{ position: 'relative', aspectRatio: '16/10', backgroundImage: `url(${hero.src})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', overflow: 'hidden' }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 50%)' }} />
          {hero.caption && <p style={{ position: 'absolute', bottom: '0.75rem', left: '0.9rem', fontFamily: SERIF, fontStyle: 'italic', fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{hero.caption}</p>}
        </div>
        {/* Right column thumbs */}
        {rest.length > 0 && (
          <div style={{ display: 'grid', gridTemplateRows: `repeat(${Math.min(rest.length, 4)}, 1fr)`, gap: '4px' }}>
            {rest.map((p, i) => (
              <div key={i} onClick={() => onOpen(photos, i + 1)} style={{ position: 'relative', backgroundImage: `url(${p.src})`, backgroundSize: 'cover', backgroundPosition: 'center', cursor: 'pointer', overflow: 'hidden' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                {i === rest.length - 1 && photos.length > 5 && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.58)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: SERIF, fontStyle: 'italic', color: '#fff', fontSize: '1rem' }}>+{photos.length - 5} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   INQUIRY MODAL
============================================================ */
function InquiryModal({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const f = k => e => setForm(p => ({ ...p, [k]: e.target.value }));
  const INP = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(201,169,110,0.18)', color: CREAM, padding: '0.9rem 1.1rem', fontFamily: SERIF, fontSize: '1rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.85rem', borderRadius: 0 };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9998, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#0e0e0e', border: '1px solid rgba(201,169,110,0.15)', maxWidth: 520, width: '100%', padding: 'clamp(2.2rem,5vw,3.8rem)', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.1rem', right: '1.4rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '1.2rem', cursor: 'pointer' }}>&#10005;</button>
        <span style={EYE()}>Private Inquiry</span>
        <p style={{ fontFamily: SCRIPT, fontSize: '2.2rem', color: GOLD, margin: '0 0 0.3rem', lineHeight: 1 }}>Garran Hill</p>
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', color: CREAM, opacity: 0.5, fontSize: '0.88rem', margin: '0 0 2.2rem', lineHeight: 1.7 }}>
          200 Hollycrest Drive, Pinehurst, NC 28374<br />
          4 Beds &nbsp;&bull;&nbsp; 4 Baths &nbsp;&bull;&nbsp; 2 Powder Rooms &nbsp;&bull;&nbsp; 4.15 Acres<br />
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
            <button type="submit" style={{ width: '100%', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.34em', textTransform: 'uppercase', padding: '1.1rem', cursor: 'pointer', marginTop: '0.3rem' }}>
              Send Inquiry
            </button>
          </form>
        )}
        <p style={{ fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', marginTop: '1.8rem', textAlign: 'center' }}>
          Rachel Hernandez &nbsp;&bull;&nbsp; Sotheby's International Realty &nbsp;&bull;&nbsp; All inquiries held in strict confidence
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   HERO
============================================================ */
function Hero({ onInquire }) {
  const vRef = useRef();
  useEffect(() => {
    const v = vRef.current; if (!v) return;
    if (v.canPlayType('application/vnd.apple.mpegurl')) { v.src = GH_VIDEO; v.play().catch(() => {}); return; }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/hls.js@latest/dist/hls.min.js';
    s.onload = () => {
      if (!window.Hls || !window.Hls.isSupported()) return;
      const hls = new window.Hls({ maxBufferLength: 30 });
      hls.loadSource(GH_VIDEO); hls.attachMedia(v);
      hls.on(window.Hls.Events.MANIFEST_PARSED, () => v.play().catch(() => {}));
    };
    document.head.appendChild(s);
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 660, overflow: 'hidden', background: DARK }}>
      <video ref={vRef} muted loop playsInline autoPlay poster={GH_POSTER}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 38%', zIndex: 0 }} />
      {/* Gradient: left side darker so script reads, fade bottom for stats */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(105deg, rgba(4,4,4,0.72) 0%, rgba(4,4,4,0.32) 48%, rgba(4,4,4,0.06) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(4,4,4,0.25) 0%, transparent 20%, transparent 60%, rgba(4,4,4,0.75) 100%)' }} />

      {/* NAV */}
      <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10, padding: 'clamp(1.2rem,2.5vw,1.9rem) clamp(2rem,5vw,4rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.62rem,0.8vw,0.8rem)', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Garran Hill</span>
        <div style={{ display: 'flex', gap: 'clamp(1.2rem,2.8vw,2.8rem)', alignItems: 'center' }}>
          {['The Estate', 'The History', 'The Grounds'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', textDecoration: 'none' }}>{l}</a>
          ))}
          <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, background: 'none', border: `1px solid ${GOLD}`, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>Private Inquiry</button>
        </div>
      </nav>

      {/* TITLE */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 clamp(2rem,6vw,6rem)', paddingTop: '4rem' }}>
        <span style={{ ...EYE(), color: 'rgba(201,169,110,0.82)', marginBottom: '2.2rem' }}>200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; Est. 1916</span>
        <h1 style={{ fontFamily: SCRIPT, fontWeight: 400, fontSize: 'clamp(5rem,16vw,18rem)', color: '#fff', lineHeight: 0.87, margin: '0 0 2.8rem', textShadow: '0 4px 80px rgba(0,0,0,0.4)', maxWidth: '60vw' }}>
          Garran<br />Hill
        </h1>
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem,1.45vw,1.26rem)', color: CREAM, opacity: 0.9, margin: '0 0 0.5rem' }}>Built in 1916. Built once. Built right.</p>
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(0.8rem,1vw,0.95rem)', color: CREAM, opacity: 0.55, margin: 0 }}>Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship.</p>
      </div>

      {/* TOUR LINK */}
      <div style={{ position: 'absolute', bottom: '5.5rem', left: 0, right: 0, zIndex: 10, textAlign: 'center' }}>
        <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1" target="_blank" rel="noopener noreferrer"
          style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.42)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.18)', paddingBottom: '3px' }}>
          Tour the Estate
        </a>
      </div>
      <StatBar />
    </section>
  );
}

/* STAT BAR */
function StatBar() {
  const S = [
    { n: '1916', l: 'Year Built' }, { n: '6,072', l: 'Square Feet' }, { n: '4.15', l: 'Acres' },
    { n: '4', l: 'Bedrooms' }, { n: '4 + 2', l: 'Baths & Powder Rooms' }, { n: '7', l: 'Fireplaces' }, { n: '$4,250,000', l: 'Asking Price' },
  ];
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10, background: 'rgba(4,4,4,0.82)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(201,169,110,0.1)', display: 'flex' }}>
      {S.map((s, i) => (
        <div key={i} style={{ flex: 1, padding: 'clamp(0.8rem,1.6vw,1.2rem) 0', textAlign: 'center', borderRight: i < S.length - 1 ? '1px solid rgba(201,169,110,0.08)' : 'none' }}>
          <div style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.9rem,1.6vw,1.45rem)', color: '#fff' }}>{s.n}</div>
          <div style={{ fontFamily: 'sans-serif', fontSize: '7px', letterSpacing: '0.26em', textTransform: 'uppercase', color: GOLD, opacity: 0.62, marginTop: '0.18rem' }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   CINEMATIC REVEAL
============================================================ */
function CinematicReveal({ eyebrow, headline, body, subBody, img, flip = false, photos, onOpen, dark = false, children }) {
  return (
    <section style={{ display: 'flex', flexDirection: flip ? 'row-reverse' : 'row', minHeight: 'clamp(520px,70vh,800px)', background: dark ? '#060606' : DARK }}>
      <div style={{ flex: '0 0 44%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(4rem,7vw,7rem) clamp(3rem,5.5vw,5.5rem)' }}>
        <FadeIn>
          <span style={EYE()}>{eyebrow}</span>
          <Rule />
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(1.85rem,2.8vw,3.3rem)', color: '#fff', lineHeight: 1.1, margin: '0 0 1.8rem', letterSpacing: '-0.015em' }}
            dangerouslySetInnerHTML={{ __html: headline }} />
          <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.95rem,1.18vw,1.08rem)', color: CREAM, opacity: 0.72, lineHeight: 2.2, margin: 0 }}>{body}</p>
          {subBody && <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.88rem,1.05vw,0.98rem)', color: CREAM, opacity: 0.5, lineHeight: 2.0, margin: '1.2rem 0 0', fontStyle: 'italic' }}>{subBody}</p>}
          {children}
          {photos && photos.length > 0 && <SothebyGallery photos={photos} onOpen={onOpen} />}
        </FadeIn>
      </div>
      <div style={{ flex: 1, backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: 460 }} />
    </section>
  );
}

/* ============================================================
   FULL BLEED SECTION
============================================================ */
function FullBleed({ src, eyebrow, headline, body, align = 'center', darken = 0.52, minH = 'clamp(500px,70vh,800px)', children }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: minH, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: '-8% 0', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: `rgba(4,4,4,${darken})`, zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,10vw,14rem)', textAlign: align }}>
        <FadeIn>
          {eyebrow && <span style={EYE({ color: align === 'left' ? GOLD : GOLD })}>{eyebrow}</span>}
          {headline && <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(2rem,4vw,4.8rem)', color: '#fff', lineHeight: 1.08, margin: eyebrow ? '0 0 2rem' : '0 0 1.5rem', letterSpacing: '-0.015em', maxWidth: align === 'left' ? 780 : '100%' }}
            dangerouslySetInnerHTML={{ __html: headline }} />}
          {body && <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(1rem,1.25vw,1.12rem)', color: CREAM, opacity: 0.78, lineHeight: 2.15, maxWidth: 680, margin: align === 'center' ? '0 auto' : '0' }}>{body}</p>}
          {children}
        </FadeIn>
      </div>
    </section>
  );
}

/* PULL QUOTE */
function PullQuote({ quote, attr }) {
  return (
    <div style={{ background: '#050505', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,14vw,18rem)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <img src={I.crest} alt="" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 360, opacity: 0.03, pointerEvents: 'none', mixBlendMode: 'screen' }} />
      <FadeIn>
        <Rule center />
        <p style={{ fontFamily: SERIF, fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.8rem,3.5vw,3.8rem)', color: '#fff', lineHeight: 1.35, margin: '0 auto 2.2rem', maxWidth: 880 }}>
          &ldquo;{quote}&rdquo;
        </p>
        <Rule center />
        {attr && <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', margin: '1.5rem 0 0' }}>{attr}</p>}
      </FadeIn>
    </div>
  );
}

/* DARK SECTION */
function DarkSection({ eyebrow, headline, body, children, center = false }) {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)', textAlign: center ? 'center' : 'left' }}>
      <FadeIn>
        {eyebrow && <span style={EYE()}>{eyebrow}</span>}
        <Rule center={center} />
        {headline && <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(2rem,3.5vw,4rem)', color: '#fff', lineHeight: 1.1, margin: '0 0 1.8rem', maxWidth: center ? '100%' : 840, letterSpacing: '-0.012em' }} dangerouslySetInnerHTML={{ __html: headline }} />}
        {body && <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.95rem,1.18vw,1.08rem)', color: CREAM, opacity: 0.7, lineHeight: 2.2, maxWidth: 760, margin: center ? '0 auto' : 0 }}>{body}</p>}
        {children}
      </FadeIn>
    </section>
  );
}

/* DETAIL GRID */
function DetailGrid({ items }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.8rem', marginTop: '3.5rem' }}>
      {items.map((c, i) => (
        <FadeIn key={i} delay={i * 0.06}>
          <div style={{ borderTop: '1px solid rgba(201,169,110,0.15)', paddingTop: '1.8rem' }}>
            <p style={{ fontFamily: 'sans-serif', fontSize: '8.5px', letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1rem' }}>{c.label}</p>
            <p style={{ fontFamily: SERIF, fontWeight: 300, color: CREAM, fontSize: '0.97rem', lineHeight: 2.1, opacity: 0.7, margin: 0 }}>{c.body}</p>
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
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(201,169,110,0.08)' }}>
      <div style={{ padding: 'clamp(3.5rem,7vw,6rem) clamp(2rem,8vw,8rem)', display: 'flex', flexWrap: 'wrap', gap: '2.5rem', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: SCRIPT, fontSize: 'clamp(2.5rem,5vw,4.5rem)', color: GOLD, margin: '0 0 0.5rem', lineHeight: 1 }}>Garran Hill</p>
          <p style={{ fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: 0 }}>200 Hollycrest Drive &bull; Pinehurst, NC 28374 &bull; Est. 1916</p>
        </div>
        <img src={I.crest} alt="" style={{ height: 68, opacity: 0.4, mixBlendMode: 'screen' }} />
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: SERIF, fontStyle: 'italic', color: CREAM, opacity: 0.38, fontSize: '0.86rem', margin: '0 0 0.4rem' }}>Represented exclusively by</p>
          <p style={{ fontFamily: SERIF, fontWeight: 500, color: CREAM, fontSize: '1.05rem', margin: '0 0 0.25rem' }}>Rachel Hernandez</p>
          <p style={{ fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.22em', textTransform: 'uppercase', color: GOLD, opacity: 0.7, margin: '0 0 1.2rem' }}>Sotheby's International Realty</p>
          <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '8.5px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, background: 'none', border: `1px solid ${GOLD}`, padding: '0.65rem 1.6rem', cursor: 'pointer' }}>
            Private Inquiry
          </button>
        </div>
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.2rem 3rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '7px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.15)', margin: 0 }}>
          &copy; 2026 Sotheby's International Realty &nbsp;&bull;&nbsp; All inquiries held in strict confidence
        </p>
      </div>
    </footer>
  );
}

/* ============================================================
   MAIN APP
============================================================ */
export default function GarranHillV3() {
  const [modal, setModal] = useState(false);
  const [lb, setLb] = useState(null);
  const openLB = useCallback((photos, idx) => setLb({ photos, idx }), []);

  useEffect(() => {
    const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = FONTS; document.head.appendChild(l);
    document.title = 'Garran Hill -- 200 Hollycrest Drive, Pinehurst, NC | $4,250,000';
    document.body.style.cssText = 'margin:0;background:#0a0a0a;overflow-x:hidden';
  }, []);

  /* ---- GALLERY COLLECTIONS ---- */
  const G = {
    entry: [
      { src: I.entry,     caption: 'The Entrance Hall -- Looking to the Library' },
      { src: I.threshold, caption: 'The Threshold -- GARRAN HILL 1916' },
    ],
    reception: [
      { src: I.living,    caption: 'The Principal Reception Room' },
      { src: I.sitting,   caption: 'The Wing Sitting Room' },
      { src: I.wing,      caption: 'The Secondary Reception' },
      { src: I.fireplace, caption: 'The Fireside' },
    ],
    dining: [
      { src: I.dining,    caption: 'The Dining Room -- Original Shell Alcoves' },
      { src: I.dining2,   caption: 'The Dining Room, April 22 1996 -- The Day They Said Yes' },
    ],
    study: [
      { src: I.office,     caption: 'The Study' },
      { src: I.officeTall, caption: 'The Study -- Vaulted Ceiling & Exposed Beams' },
    ],
    suite: [
      { src: I.bath,   caption: 'The Primary Bath' },
      { src: I.window, caption: 'April -- Dogwood Through the Bedroom Window' },
    ],
    grounds: [
      { src: I.roseMoney, caption: 'The Rose Garden -- June, Ann\'s Garden' },
      { src: I.poolWall,  caption: 'The Pool Wall -- Arched Gate & Roses' },
      { src: I.iris,      caption: 'The Irises -- April. Nobody Planted Them This Year.' },
      { src: I.azalea,    caption: 'The Azaleas Under the Magnolia -- Betty\'s Colors' },
    ],
  };

  /* ---- CARD DATA ---- */
  const RESTORATION = [
    { label: 'Original Leaded Glass', body: 'The new entry was designed around the 1916 leaded glass sidelights and over-door fanlight. The restoration was built to preserve them exactly. They have not been touched.' },
    { label: 'David Prest -- Master Carpenter', body: 'All Georgian interior woodwork custom-built to match the 1916 millwork: paneling, crown moldings, chair rails, raised panel wainscoting throughout every principal room.' },
    { label: 'Marvin Custom Windows', body: 'Every window replaced to the original 1916 Georgian profiles. The proportions are correct because the original drawings survived and were available to the craftsmen.' },
    { label: 'Original Oak Floors', body: 'Wide-plank oak throughout the principal rooms. New heart-pine laid in the kitchen. Every board worth saving was saved. The floors have been walked for 110 years.' },
    { label: 'Stone Basement', body: 'Four rooms below half the house. Stone walls. Climate-controlled. Wine rack. The kind of storage that makes a house a proper estate rather than a large house.' },
    { label: 'Tennessee Marble', body: 'The powder room vanity. Chosen by people who understood that a powder room is the first impression every guest takes home and the last thing they remember.' },
  ];

  const INFRA = [
    { label: 'The Pool -- 20 x 40 Feet', body: 'Salt water, converted 2022. Brick perimeter wall with #4 iron gates. Separate parking lot for pool use. The rose beds run the full length of the wall.' },
    { label: 'Hot Water', body: 'Three heaters: one 80-gallon and two 40-gallon units. Whirlpool tubs in three bathrooms. Hot water is not a concern in this house.' },
    { label: 'Seven Fireplaces', body: 'Six of the seven have propane gas logs with wall-switch timers. The fire is going before you walk into the room.' },
    { label: 'Irrigation -- 28 Zones', body: 'A dedicated 130-foot irrigation well feeds 28 zones independently of city water. The grounds do not depend on anything they do not already have.' },
    { label: 'Security', body: 'Hard-wired during the 2000 restoration. Greensboro monitoring. Intercom throughout via house phones. The house has watched over itself for 24 years.' },
    { label: 'Parking', body: '12 cars in the northeast lot. Six additional at the pool. The circular drive manages arrivals. No one parks on the street.' },
    { label: 'The Cedar Closet', body: 'Full cedar lining. Top of the third staircase. Original oak floors. Family portraits still on the walls. The house remembers who has been here.' },
    { label: 'Architectural Drawings', body: 'Original plans available to new owners. The proportions are correct because the drawings survived. The next steward inherits the blueprint.' },
  ];

  return (
    <div style={{ background: DARK, color: CREAM }}>
      {modal && <InquiryModal onClose={() => setModal(false)} />}
      {lb    && <Lightbox photos={lb.photos} idx={lb.idx} onClose={() => setLb(null)} />}

      {/* 01 HERO */}
      <Hero onInquire={() => setModal(true)} />

      {/* 02 MANIFESTO */}
      <FullBleed src={I.img1916} eyebrow="Pinehurst, North Carolina -- 1913" darken={0.76}
        headline="Some houses hold history.<br/><em style='font-weight:300'>This one shaped it.</em>">
        <div style={{ maxWidth: 660, margin: '0 auto' }}>
          <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(1rem,1.2vw,1.1rem)', color: CREAM, opacity: 0.78, lineHeight: 2.2, margin: '2rem 0 0' }}>
            Walter Hines Page purchased this land in February 1913 and named it Garran Hill. He planned to grow peaches. President Wilson appointed him Ambassador to Britain in March. He never walked through the door.
          </p>
          <p style={{ fontFamily: SERIF, fontWeight: 300, fontSize: 'clamp(0.92rem,1.1vw,1rem)', color: CREAM, opacity: 0.52, lineHeight: 2.2, margin: '1.2rem 0 0', fontStyle: 'italic' }}>
            His family held the estate after him. The Page family rented it by the season. People came back.
          </p>
        </div>
      </FullBleed>

      {/* 03 SEPIA GATE */}
      <FullBleed src={I.sepia} darken={0.35} minH="clamp(380px,55vh,640px)"
        headline="<em style='font-weight:300'>In 1916, those were saplings.<br/>Now they are a forest.</em>" />

      {/* 04 WESTMINSTER */}
      <PullQuote
        quote="The friend of Britain in her sorest need."
        attr="Westminster Abbey -- Walter Hines Page, American Ambassador to Great Britain, 1913-1918" />

      {/* 05 ARCHITECTURE */}
      <CinematicReveal
        eyebrow="Neo-Georgian Architecture -- 1916"
        headline="Built by Leonard Tufts' own craftsmen.<br/><em style='font-weight:300'>The same men who built Pinehurst.</em>"
        body="Longitudinal plan. Columned portico. Circular drive. Three staircases. The 2000 restoration was designed entirely around the original 1916 leaded glass sidelights and over-door fanlight -- so they could remain exactly as they were the day the house was finished."
        img={I.portico} />

      {/* 06 ENTRANCE HALL */}
      <CinematicReveal flip
        eyebrow="The Entrance Hall"
        headline="Powder blue walls. Mahogany rail.<br/><em style='font-weight:300'>The axis straight to the library from the front door.</em>"
        body='White raised-panel wainscoting runs to chair rail on every wall. The staircase curves right as you enter -- mahogany volute, white turned balusters, the same sweep since 1916. The central axis runs straight to the library bookcases, visible from the front door. GARRAN HILL 1916, carved in granite at the threshold.'
        img={I.entry}
        photos={G.entry} onOpen={openLB} />

      {/* 07 PRINCIPAL RECEPTION ROOM */}
      <CinematicReveal
        eyebrow="The Principal Reception Room"
        headline="The room was right in 1916.<br/><em style='font-weight:300'>It is right now.</em>"
        body="Coffered ceiling, white painted panels. Tall double-hung windows on two sides. French doors open to the grounds. Through the archway: the wing sitting room -- four six-pane casement windows, grayish-blue walls, light that changes every hour."
        subBody="Seven fireplaces in this house. This is the one that holds the room."
        img={I.living}
        photos={G.reception} onOpen={openLB} dark />

      {/* 08 FIRE FULL BLEED */}
      <FullBleed src={I.fireplace} darken={0.32} minH="clamp(480px,68vh,800px)"
        headline="<em style='font-weight:300; letter-spacing:-0.01em'>Fire going,<br/>no one home yet.</em>" />

      {/* 09 DINING ROOM */}
      <CinematicReveal flip
        eyebrow="The Dining Room"
        headline="Three shell alcoves.<br/><em style='font-weight:300'>All of them original 1916.</em>"
        body="Three arched Neo-Georgian shell cabinets -- two flanking the fireplace, one additional -- have held the same position since the house was built. Brass candelabra chandelier. Gold-scrollwork mirror above the white mantelpiece. This room has not needed to change."
        img={I.dining}
        photos={G.dining} onOpen={openLB} />

      {/* 10 WALTER HINES PAGE */}
      <FullBleed src={I.whp} eyebrow="Walter Hines Page -- 1855-1918" align="left" darken={0.58}
        minH="clamp(540px,76vh,880px)"
        headline="He named it Garran Hill.<br/><em style='font-weight:300'>He never walked through the door.</em>"
        body="Ambassador to the Court of St. James's, 1913-1918. He wrote to Wilson every week begging America to enter the war. He came home on a stretcher in October 1918. He died December 21st at a cottage near Pinehurst. A tablet was placed in Westminster Abbey." />

      {/* 11 RESTORATION */}
      <DarkSection
        eyebrow="The 2000 Restoration -- Thomas O'Shea, Architect"
        headline="Every decision deferred to 1916."
        body="The restoration took three years. Master carpenter David Prest rebuilt the Georgian interior to match the original millwork exactly. The brief was simple: bring the house back to what it was. The leaded glass never moved.">
        <DetailGrid items={RESTORATION} />
      </DarkSection>

      {/* 12 STUDY */}
      <CinematicReveal
        eyebrow="The Study"
        headline="Exposed ceiling beams. Vaulted ceiling.<br/><em style='font-weight:300'>A wall of divided-light windows.</em>"
        body="Custom-built desk. Built-in shelving. Conical pendant lights. The room does not ask you to work -- it makes work feel like the right thing to do."
        img={I.office}
        photos={G.study} onOpen={openLB} dark />

      {/* 13 PRIMARY SUITE */}
      <CinematicReveal flip
        eyebrow="The Primary Suite"
        headline="White dogwood through divided glass.<br/><em style='font-weight:300'>April. Every year.</em>"
        body="Two dark-wood vanities with speckled granite countertops and undermount sinks. Freestanding soaking tub. Frameless glass shower with rain showerhead. Wall-mounted sconces above each vanity. This is a bathroom that required decisions."
        img={I.bath}
        photos={G.suite} onOpen={openLB} />

      {/* 14 BETTY DUMAINE */}
      <FullBleed src={I.betty} eyebrow="Betty Dumaine -- Steward, 1946-1965" align="left" darken={0.52}
        minH="clamp(520px,74vh,860px)"
        headline="She held Garran Hill for nineteen years.<br/><em style='font-weight:300'>The garden is still hers.</em>"
        body="She brought peacocks. She buried a horse named Blue Fox on the grounds -- a stone marks the grave. She planted the rose garden that still blooms every June. The azaleas under the magnolia have been this color since Betty planted them." />

      {/* 15 ROSE GARDEN */}
      <CinematicReveal
        eyebrow="The Rose Garden -- June"
        headline="She planted this garden from scratch.<br/><em style='font-weight:300'>This is what twenty years of care looks like.</em>"
        body="The current stewards planted roses before they filled the pool. The wall does two things: it holds the pool and it holds the roses. Ann's garden. The brick wall, the iron gates, the rose beds -- all of it from the same intention."
        img={I.roseMoney}
        photos={G.grounds} onOpen={openLB} dark />

      {/* 16 IRISES */}
      <FullBleed src={I.iris} darken={0.35} minH="clamp(440px,64vh,740px)"
        headline="<em style='font-weight:300'>The irises come back every April.<br/>Nobody planted them this year.</em>" />

      {/* 17 WALLED POOL */}
      <CinematicReveal flip
        eyebrow="The Walled Pool Terrace -- 20 x 40 Feet"
        headline="The wall does two things:<br/><em style='font-weight:300'>it holds the pool and it holds the roses.</em>"
        body="Light gray stone surround. Brick perimeter wall with wrought iron gate. Salt water, converted 2022. The rose beds run the full length of the wall -- the same beds Betty planted."
        img={I.pool} />

      {/* 18 INFRASTRUCTURE */}
      <DarkSection
        eyebrow="The Infrastructure"
        headline="Everything works.<br/><em style='font-weight:300'>Everything has been maintained.</em>"
        body="Three hot water heaters. Seven fireplaces, six with propane and wall-switch timers. 28-zone irrigation on a 130-foot dedicated well. Hard-wired security. Original architectural drawings available. This estate runs.">
        <DetailGrid items={INFRA} />
      </DarkSection>

      {/* 19 AERIAL */}
      <FullBleed src={I.aerial} eyebrow="4.15 Acres -- Pinehurst, North Carolina" darken={0.4}
        minH="clamp(480px,68vh,780px)"
        headline="The grounds hold the house<br/><em style='font-weight:300'>the way they always have.</em>" />

      {/* 20 INQUIRE */}
      <FullBleed src={I.dusk2} eyebrow="200 Hollycrest Drive -- Pinehurst, NC" darken={0.5}
        headline="The world beyond the brick pillars<br/><em style='font-weight:300'>does not exist here.</em>">
        <button onClick={() => setModal(true)} style={{ marginTop: '2.8rem', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, background: 'none', border: `1px solid ${GOLD}`, padding: '1.1rem 3.5rem', cursor: 'pointer' }}>
          Private Inquiry
        </button>
      </FullBleed>

      {/* 21 TWILIGHT FINALE */}
      <FullBleed src={I.twilight} darken={0.26} minH="clamp(520px,76vh,900px)" parallax={false}
        headline="<em style='font-weight:300; font-size:clamp(2.8rem,5.5vw,6.2rem); letter-spacing:-0.01em'>Garran Hill is ready.</em>" />

      <Footer onInquire={() => setModal(true)} />
    </div>
  );
}
