49266 chars
import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const GH = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';
const GH2 = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';

const cdnExt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;
const cdnInt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;

/* ---- HERO PHOTOS ---- */
const IMG_DRIVE   = cdnExt(GH2 + '689b03dab_gh_drive2.jpg'); /* driveway arrival -- hero slide 1 */
const IMG_PORTICO = cdnExt(GH + 'fa8cec793_200HollycrestDrive-191.jpg'); /* full frontal portico -- same key shot */

/* ---- INTERIOR ---- */
const IMG_ENTRY   = cdnInt(GH2 + 'a9228a85d_200Holycrest-1179.jpg');    /* THRESHOLD -- carved granite */
const IMG_ARCH    = cdnExt(GH + '082d9b5c7_200Holycrest-1182.jpg');
const IMG_SALON   = cdnInt(GH + '341c7343c_200Holycrest-1203.jpg');
const IMG_FIRE    = cdnInt(GH + '5f5f87315_200HollycrestDrive-65fire.jpg');
const IMG_DINING  = cdnInt(GH + 'e926f8fdd_200Holycrest-1296.jpg');
const IMG_FOYER   = cdnInt(GH + '2ad35ae07_200Holycrest-1188.jpg');
const IMG_PRIMARY = cdnInt(GH + '4046f0d74_200HollycrestDrive-95.jpg');
const IMG_BATH    = cdnInt(GH + 'f0ace4a90_200HollycrestDrive-101.jpg');
const IMG_POWDER  = cdnInt(GH + 'b57f79399_200HollycrestDrive-80.jpg');
const IMG_STAIR   = cdnInt(GH2 + '99fab83cd_gh_86.jpg');
const IMG_WEDGWOOD = cdnInt(GH2 + 'd45916396_gh_119.jpg');

/* ---- GROUNDS + EXTERIOR ---- */
const IMG_POOL    = cdnExt(GH + '57352d0a9_200HollycrestDrive-208.jpg');
const IMG_REAR    = cdnExt(GH + '17d8dd539_200HollycrestDrive-132.jpg');
const IMG_AERIAL  = cdnExt(GH2 + '973ee1dc1_gh_217.jpg'); /* LOCKED aerial -- shot 217 */
const IMG_DUSK2   = cdnExt(GH2 + '62359ae57_gh_209.jpg'); /* dusk privacy -- shot 209 */
const IMG_TWILIGHT = cdnExt(GH2 + '93f374f64_gh_203.jpg'); /* LOCKED twilight -- shot 203 golden sky */
const IMG_AZALEA  = cdnExt(GH2 + '782f791e5_IMG_9412.jpg');
const IMG_CHERUB  = cdnExt(GH2 + 'e4a71cbd1_200HollycrestDrive-172.jpg');
const IMG_CAMELLIA = cdnExt(GH2 + '988a1b559_26MarWhitecamelliablooms.jpg');
const IMG_DOGWOOD = cdnExt(GH2 + 'd21f554f6_IMG_9409.jpg');

/* ---- BLUE FOX ---- */
const IMG_BLUEFOX = cdnExt(GH + '431db5579_200HollycrestDrive-10.jpg');

/* ---- CREST ---- */
const CREST = 'https://res.cloudinary.com/dghn2xpif/image/upload/e_background_removal,f_png,fl_preserve_transparency/garranhill_crest_nobg.png';

/* ---- BLUEPRINTS ---- */
const BP_ELEV  = cdnExt(GH2 + '6d312bf4e_IMG_4319.jpg');
const BP_FLOOR = cdnExt(GH2 + '6234ed606_IMG_4320.jpg');
const BP_FOUND = cdnExt(GH2 + 'e116e6610_IMG_4324.jpg');

const eyebrowStyle = {
  fontFamily: 'sans-serif',
  fontSize: '10px',
  letterSpacing: '0.36em',
  textTransform: 'uppercase',
  color: GOLD,
  display: 'block',
  margin: '0 0 1.2rem',
};

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

function useInView(ref, threshold = 0.12) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const visible = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function CinematicReveal({ eyebrowText, headline, body, imgSrc, reverse = false, position = 'center' }) {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-60, Math.min(60, (scrollY - top) * 0.22));
  return (
    <div ref={ref} style={{ position: 'relative', minHeight: '88vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: `${position} calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: reverse
          ? 'linear-gradient(to left, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.1) 100%)'
          : 'linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.1) 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        width: 'min(52%, 560px)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(2.5rem, 5vw, 5rem)',
        marginLeft: reverse ? 'auto' : 0,
      }}>
        <FadeIn>
          <span style={eyebrowStyle}>{eyebrowText}</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(2rem, 3vw, 3.2rem)',
            color: '#fff', lineHeight: 1.12,
            margin: '0 0 1.6rem', letterSpacing: '-0.01em',
          }} dangerouslySetInnerHTML={{ __html: headline }} />
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, margin: 0, opacity: 0.88 }}>{body}</p>
        </FadeIn>
      </div>
    </div>
  );
}

function PullQuote({ quote, attribution }) {
  return (
    <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 12vw, 18rem)', background: '#050505', textAlign: 'center' }}>
      <FadeIn>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.5rem, 2.8vw, 2.7rem)',
          color: '#fff', lineHeight: 1.42,
          margin: '0 auto 2.5rem', maxWidth: 860,
        }}>
          &ldquo;{quote}&rdquo;
        </p>
        <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 1.5rem' }} />
        {attribution && (
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            {attribution}
          </p>
        )}
      </FadeIn>
    </div>
  );
}

function StatBar() {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
      background: 'rgba(10,10,10,0.72)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid rgba(201,169,110,0.18)',
      display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
    }}>
      {[
        { value: '6,700', label: 'Square Feet' },
        { value: '4.25', label: 'Acres' },
        { value: '5 / 5', label: 'Beds / Baths' },
        { value: '7', label: 'Fireplaces' },
        { value: '1916', label: 'Year Built' },
        { value: '$4,250,000', label: 'Asking Price' },
      ].map((s, i, arr) => (
        <div key={i} style={{
          padding: 'clamp(1rem,2vw,1.4rem) clamp(1.2rem,3vw,2.8rem)',
          textAlign: 'center',
          borderRight: i < arr.length - 1 ? '1px solid rgba(201,169,110,0.18)' : 'none',
        }}>
          <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(1.1rem,1.8vw,1.5rem)', color: '#fff', letterSpacing: '0.03em' }}>{s.value}</div>
          <div style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginTop: '0.25rem' }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ---- LIGHTBOX GALLERY ---- */
function RoomGallery({ photos }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const close = () => setOpen(false);
  const prev = (e) => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length); };
  const next = (e) => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length); };
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem', marginTop: '1.8rem' }}>
        {photos.map((p, i) => (
          <div key={i} onClick={() => { setIdx(i); setOpen(true); }} style={{
            aspectRatio: '4/3', backgroundImage: `url(${p.src})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            cursor: 'pointer', overflow: 'hidden',
          }}>
            <div style={{ width: '100%', height: '100%', background: 'rgba(0,0,0,0)', transition: 'background 0.3s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.18)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0)'}
            />
          </div>
        ))}
      </div>
      {open && (
        <div onClick={close} style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.96)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img src={photos[idx].src} alt="" style={{ maxWidth: '90vw', maxHeight: '88vh', objectFit: 'contain' }} onClick={e => e.stopPropagation()} />
          <button onClick={prev} style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', padding: '1rem' }}>&#8592;</button>
          <button onClick={next} style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer', padding: '1rem' }}>&#8594;</button>
          <button onClick={close} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', fontSize: '1.5rem', cursor: 'pointer' }}>&#10005;</button>
          {photos[idx].caption && (
            <p style={{ position: 'absolute', bottom: '2rem', left: 0, right: 0, textAlign: 'center', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{photos[idx].caption}</p>
          )}
        </div>
      )}
    </>
  );
}

/* ---- CREST DIVIDER ---- */
function CrestDivider() {
  return (
    <div style={{ background: DARK, padding: '3rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ height: 1, flex: 1, maxWidth: 200, background: 'linear-gradient(to right, transparent, rgba(201,169,110,0.3))' }} />
      <img src={CREST} alt="Garran Hill Crest" style={{ width: 56, height: 56, objectFit: 'contain', opacity: 0.7, margin: '0 2rem', filter: 'brightness(0.85) sepia(1) saturate(2) hue-rotate(5deg)' }} />
      <div style={{ height: 1, flex: 1, maxWidth: 200, background: 'linear-gradient(to left, transparent, rgba(201,169,110,0.3))' }} />
    </div>
  );
}

/* ===== HERO ===== */
function Hero({ onInquire }) {
  const scrollY = useScrollY();
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % 2), 6000);
    return () => clearInterval(t);
  }, []);
  const imgs = [IMG_DRIVE, IMG_PORTICO];
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', background: '#000' }}>
      {imgs.map((src, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: `center calc(50% + ${scrollY * 0.18}px)`,
          transform: 'scale(1.08)',
          zIndex: 0,
          opacity: slide === i ? 1 : 0,
          transition: 'opacity 2.4s ease-in-out',
        }} />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.12) 40%, rgba(10,10,10,0.62) 100%)', zIndex: 1 }} />

      <nav style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20, padding: 'clamp(1rem,2vw,1.4rem) clamp(1.5rem,4vw,3.5rem)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(0.75rem,1vw,0.9rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.82)' }}>
          Garran Hill
        </div>
        <div style={{ display: 'flex', gap: 'clamp(1.2rem,3vw,2.8rem)', alignItems: 'center' }}>
          {['The Estate', 'The History', 'The Grounds'].map(l => (
            <a key={l} href="#" style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>{l}</a>
          ))}
          <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, background: 'none', border: `1px solid ${GOLD}`, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>
            Private Inquiry
          </button>
        </div>
      </nav>

      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 clamp(1.5rem,6vw,6rem)' }}>
        <span style={{ ...eyebrowStyle, marginBottom: '1.5rem' }}>200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC 28374</span>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2.8rem, 6vw, 6.5rem)', color: '#fff', lineHeight: 1.0, margin: '0 0 0.4rem', letterSpacing: '-0.01em' }}>
          Built in 1916.
        </h1>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(2.2rem, 5vw, 5.2rem)', color: '#fff', lineHeight: 1.05, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
          Still the finest house in Moore County.
        </h1>
        <div style={{ width: 48, height: 1, background: GOLD, opacity: 0.6, margin: '0 auto 1.8rem' }} />
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1rem, 1.6vw, 1.35rem)', color: CREAM, opacity: 0.88, margin: '0 0 2.5rem', maxWidth: 600, lineHeight: 1.6 }}>
          Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship.
        </p>
        <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD, background: 'transparent', border: `1px solid ${GOLD}`, padding: 'clamp(0.8rem,1.5vw,1rem) clamp(1.8rem,3vw,2.6rem)', cursor: 'pointer' }}>
            Private Inquiry
          </button>
          <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.22)', padding: 'clamp(0.8rem,1.5vw,1rem) clamp(1.8rem,3vw,2.6rem)', textDecoration: 'none', cursor: 'pointer' }}>
            Tour the Estate
          </a>
        </div>
      </div>
      <StatBar />
    </section>
  );
}

/* ===== MANIFESTO ===== */
function Manifesto() {
  return (
    <section style={{ background: '#060606', padding: 'clamp(6rem,12vw,11rem) clamp(2rem,8vw,10rem)', textAlign: 'center' }}>
      <FadeIn>
        <span style={eyebrowStyle}>Pinehurst, North Carolina -- 1913</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2rem,3.5vw,4rem)', color: '#fff', lineHeight: 1.14, margin: '0 auto 2.5rem', maxWidth: 820, letterSpacing: '-0.02em' }}>
          Some houses hold history.<br /><em style={{ fontWeight: 300 }}>This one shaped it.</em>
        </h2>
        <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 2.5rem' }} />
        <p style={{ color: CREAM, fontSize: 'clamp(0.95rem,1.2vw,1.08rem)', lineHeight: 2.0, opacity: 0.8, maxWidth: 700, margin: '0 auto 1.8rem' }}>
          Walter Hines Page purchased this land in February 1913 and named it Garran Hill. He planned to grow peaches. He never walked through the door.
        </p>
        <p style={{ color: CREAM, fontSize: 'clamp(0.95rem,1.2vw,1.08rem)', lineHeight: 2.0, opacity: 0.8, maxWidth: 700, margin: '0 auto' }}>
          President Wilson appointed him Ambassador to Britain in March 1913. Page spent five years fighting for America to enter the war, came home on a stretcher in October 1918, and died December 21st at a cottage in Pinehurst. His family held the farm.
        </p>
      </FadeIn>
    </section>
  );
}

/* ===== WESTMINSTER QUOTE ===== */
function WestminsterQuote() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,10vw,14rem)', textAlign: 'center', background: '#050505' }}>
      <img src={CREST} alt="" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 320, opacity: 0.05, pointerEvents: 'none', filter: 'brightness(0.85) sepia(1) saturate(2) hue-rotate(5deg)' }} />
      <FadeIn>
        <span style={eyebrowStyle}>Westminster Abbey -- 1918</span>
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.6rem,3vw,3rem)', color: '#fff', lineHeight: 1.38, margin: '0 auto 2rem', maxWidth: 780 }}>
          &ldquo;The friend of Britain in her sorest need.&rdquo;
        </p>
        <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 1.5rem' }} />
        <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0 }}>Walter Hines Page -- American Ambassador to Britain 1913-1918</p>
      </FadeIn>
    </div>
  );
}

/* ===== ARCHITECTURE ===== */
function Architecture() {
  return (
    <CinematicReveal
      eyebrowText="Neo-Georgian Architecture -- 1916"
      headline="Built by Leonard Tufts' own craftsmen.<br/><em style='font-weight:300'>The same men who built Pinehurst.</em>"
      body="Longitudinal plan. Columned portico. Circular drive. Two primary stair cores. Original 1916 leaded glass sidelights and over-door fanlight at the front entry, preserved exactly as built. The proportions are correct because the original drawings survived."
      imgSrc={IMG_ARCH}
      position="center"
    />
  );
}

/* ===== THRESHOLD -- ENTRY HALL ===== */
function TheEntry() {
  return (
    <section style={{ background: '#070707', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Entry Hall</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', letterSpacing: '-0.01em', maxWidth: 640 }}>
            The house announces itself the moment you cross the threshold.
          </h2>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.8, maxWidth: 660, margin: '0 0 2.5rem' }}>
            "GARRAN HILL 1916" is carved in granite at the threshold stone. The original leaded glass fanlight. Original wide-plank oak floors. The central hall axis runs straight through to the library bookcases -- visible the instant the door opens.
          </p>
        </FadeIn>
        <RoomGallery photos={[
          { src: IMG_ENTRY, caption: 'The Threshold -- Garran Hill 1916' },
          { src: IMG_ARCH, caption: 'The Entry Hall' },
          { src: IMG_FOYER, caption: 'The Foyer' },
          { src: IMG_STAIR, caption: 'The Main Stair -- Original Balusters' },
        ]} />
      </div>
    </section>
  );
}

/* ===== WALTER HINES PAGE ===== */
function WalterPage() {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'clamp(3rem,6vw,7rem)', alignItems: 'center' }}>
        <FadeIn>
          <span style={eyebrowStyle}>Walter Hines Page -- 1855-1918</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            He named it. He never saw it.
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.4, margin: '0 0 2rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.82, margin: '0 0 1.4rem' }}>
            Publisher, diplomat, humanitarian. Page co-founded Doubleday and built Atlantic Monthly into a literary force. He named this land Garran Hill in February 1913 -- the original 1913 spelling, still correct today.
          </p>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.82, margin: 0 }}>
            His tireless advocacy for America to enter WWI, documented in thousands of letters to Washington, is credited by historians as decisive. Britain honored him with a sculpture at Westminster Abbey. He came home to die in Pinehurst, a mile from the land he never visited.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ background: 'rgba(201,169,110,0.05)', border: '1px solid rgba(201,169,110,0.15)', padding: '2.5rem' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.1rem,1.6vw,1.4rem)', color: '#fff', lineHeight: 1.5, margin: '0 0 1.8rem', opacity: 0.9 }}>
              &ldquo;The friend of Britain in her sorest need.&rdquo;
            </p>
            <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, margin: 0, opacity: 0.7 }}>Westminster Abbey -- 1918</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ===== THE SALON ===== */
function TheSalon() {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Living Room</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', letterSpacing: '-0.01em', maxWidth: 640 }}>
            The room that holds the whole house together.
          </h2>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.8, maxWidth: 660, margin: '0 0 2.5rem' }}>
            Original Georgian carved mantel. Wide-plank oak floors. Proportions drawn from the 1916 plans and rebuilt exactly to spec in the 1998 restoration. The room reads formal and feels effortless.
          </p>
        </FadeIn>
        <RoomGallery photos={[
          { src: IMG_SALON, caption: 'The Living Room' },
          { src: IMG_FIRE, caption: 'The Fireplace -- Original Carved Mantel' },
          { src: IMG_WEDGWOOD, caption: 'Wedgwood Mantel Detail' },
        ]} />
      </div>
    </section>
  );
}

/* ===== DINING ===== */
function TheDining() {
  return (
    <CinematicReveal
      eyebrowText="The Dining Room"
      headline="Formal by proportion.<br/><em style='font-weight:300'>Intimate by firelight.</em>"
      body="The dining room fireplace is the seventh. Georgian wainscoting. Custom crown molding by David Prest. A room designed for the kind of dinner that becomes a story."
      imgSrc={IMG_DINING}
      reverse={true}
      position="center"
    />
  );
}


/* ===== THE LIBRARY ===== */
function TheLibrary() {
  return (
    <CinematicReveal
      eyebrowText="The Library -- The Central Axis"
      headline="The room you see the moment<br/><em style='font-weight:300'>the door opens.</em>"
      body="The original bookcases sit on the central hall axis -- visible through the fanlight, through the leaded glass, from the threshold stone. David Prest built them to match the 1916 millwork exactly. Floor to ceiling. The library is not a room you find. It finds you."
      imgSrc={cdnInt('https://media.base44.com/images/public/69e248a2469cc39540781cce/94d09b1c9_gh_158.jpg')}
      reverse={false}
      position="center"
    />
  );
}

/* ===== THE KITCHEN ===== */
function TheKitchen() {
  const GH2k = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';
  const cdnIk = (url) =>
    `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Kitchen</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', letterSpacing: '-0.01em', maxWidth: 640 }}>
            Original heart-pine floors.<br /><em style={{ fontWeight: 300 }}>Everything else is new.</em>
          </h2>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.8, maxWidth: 660, margin: '0 0 2.5rem' }}>
            Custom cabinetry. A scullery with glass tile backsplash and granite counters. The original 1916 heart-pine kitchen floor -- the same boards, refinished but intact. A room that has fed a hundred years of dinners.
          </p>
        </FadeIn>
        <RoomGallery photos={[
          { src: cdnIk(GH2k + 'b659167d3_gh_159.jpg'), caption: 'The Kitchen -- Custom Cabinetry' },
          { src: cdnIk(GH2k + '9435e9307_gh_160.jpg'), caption: 'The Kitchen -- Heart-Pine Floors' },
          { src: cdnIk(GH2k + '2c73f02e0_gh_161.jpg'), caption: 'The Kitchen -- Wide View' },
          { src: cdnIk(GH2k + '9d8394ee6_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg'), caption: 'Scullery -- Glass Tile + Granite' },
        ]} />
      </div>
    </section>
  );
}

/* ===== THE PRIMARY SUITE ===== */
function ThePrimary() {
  return (
    <section style={{ background: '#070707', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Primary Suite</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', letterSpacing: '-0.01em', maxWidth: 640 }}>
            A suite that takes<br /><em style={{ fontWeight: 300 }}>the whole east wing.</em>
          </h2>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.8, maxWidth: 660, margin: '0 0 2.5rem' }}>
            Original wide-plank oak floors. Three windows on two walls. The bath is Tennessee marble. Every proportion exactly as the architect drew in 1916. Ann McAllister restored every detail by hand.
          </p>
        </FadeIn>
        <RoomGallery photos={[
          { src: IMG_PRIMARY, caption: 'The Primary Bedroom' },
          { src: IMG_BATH, caption: 'The Primary Bath -- Tennessee Marble' },
          { src: IMG_POWDER, caption: 'The Powder Room' },
          { src: IMG_STAIR, caption: 'The Main Stair -- Original Balusters' },
          { src: IMG_WEDGWOOD, caption: 'Wedgwood Mantel Detail' },
        ]} />
      </div>
    </section>
  );
}

/* ===== CAMELLIA INTERLUDE ===== */
function CamelliaInterlude() {
  const IMG_CRAPE = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/' + encodeURIComponent('https://media.base44.com/images/public/69e248a2469cc39540781cce/773a49b50_image.jpg');
  return (
    <div style={{ position: 'relative', minHeight: '65vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG_CRAPE})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.62)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(4rem,8vw,7rem) clamp(2rem,10vw,14rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Grounds -- Spring</span>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.6rem,2.8vw,2.8rem)', color: '#fff', lineHeight: 1.38, margin: '0 auto', maxWidth: 720, opacity: 0.96 }}>
            Crape myrtles along the circular drive.<br />Hot pink in June. Every year, without asking.
          </p>
        </FadeIn>
      </div>
    </div>
  );
}

/* ===== BETTY DUMAINE / BLUE FOX ===== */
function BlueFox() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const quoteRef = useRef();
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setQuoteVisible(true); }, { threshold: 0.3 });
    if (quoteRef.current) obs.observe(quoteRef.current);
    return () => obs.disconnect();
  }, []);
  const parallax = Math.max(-80, Math.min(80, (scrollY - top) * 0.25));
  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_BLUEFOX})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.12)',
        zIndex: 0,
        transition: 'transform 0.1s linear',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.72)', zIndex: 1 }} />
      <div ref={quoteRef} style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(4rem,8vw,8rem) clamp(2rem,8vw,10rem)', maxWidth: 820, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>Betty Dumaine -- 1959 to 1980</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,3vw,3.2rem)', color: '#fff', lineHeight: 1.18, margin: '0 auto 2rem', letterSpacing: '-0.01em', maxWidth: 680 }}>
            Peacocks on the lawn.<br /><em style={{ fontWeight: 300 }}>Royalty at the table.</em>
          </h2>
          <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 2.5rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.82, margin: '0 auto 1.6rem', maxWidth: 660 }}>
            Betty Dumaine renamed the estate Hollycrest for the native holly trees. She brought horses, hounds, and peacocks. She shared a room at Vassar with a woman who became Queen of Thailand -- royalty visited. She threw annual birthday parties for her horses.
          </p>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.82, margin: '0 auto 2.5rem', maxWidth: 660 }}>
            Her horse Blue Fox is buried in a 10-by-16-foot slate-covered grave on the property, marked with a brass plaque and a four-foot bronze fox statue. Blue Fox: 1946-1965. My Irish Hunter. Betty left the estate to Duke University when she died in 1980. She loved it that much.
          </p>
        </FadeIn>
        <div ref={quoteRef} style={{
          opacity: quoteVisible ? 1 : 0,
          transform: quoteVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s',
          display: 'inline-block', background: 'rgba(201,169,110,0.07)', border: '1px solid rgba(201,169,110,0.22)', padding: '1.4rem 2.4rem',
        }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, margin: 0 }}>Blue Fox -- Buried on the Grounds -- 1946-1965</p>
        </div>
      </div>
    </section>
  );
}

/* ===== FIREPLACE ===== */
function TheFireplace() {
  return (
    <CinematicReveal
      eyebrowText="Seven Fireplaces"
      headline="Every one original. Every one working."
      body="The seven carved mantels survived the 1998 restoration untouched. New dampers. Propane gas logs in six. The original craftsmanship intact. On a cold Pinehurst night, every room in this house can be warm."
      imgSrc={IMG_FIRE}
      reverse={true}
      position="center"
    />
  );
}

/* ===== THE RESTORATION ===== */
function TheRestoration() {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Restoration -- 1998 to 2001</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 3rem', letterSpacing: '-0.01em', maxWidth: 640 }}>
            Three years. Every system. Not a detail missed.
          </h2>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { label: 'Custom Woodwork', body: 'Master carpenter David Prest. All-new Georgian interior: custom paneling, crown moldings, chair rails, raised panel wainscoting throughout.' },
            { label: 'Original Windows', body: 'Every window replaced with Marvin custom units -- made to the original 1916 Georgian profiles. The proportions are correct because the original drawings survived.' },
            { label: 'Leaded Glass', body: 'The original 1916 leaded glass sidelights and over-door fanlight at the front entry were preserved exactly as built. They have not been touched.' },
            { label: 'The Floors', body: 'Original wide-plank oak throughout. New heart-pine in the kitchen. Every board worth saving was saved.' },
            { label: 'Stone Basement', body: 'Four rooms under half the house. Stone walls. Climate-controlled. Wine rack. The kind of storage that makes a house a proper estate.' },
            { label: 'The Powder Room', body: 'Tennessee marble vanity. The details were chosen by people who understood that a powder room is the first impression every guest takes home.' },
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{ borderTop: '1px solid rgba(201,169,110,0.2)', paddingTop: '1.8rem' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.9rem' }}>{item.label}</p>
                <p style={{ color: CREAM, fontSize: '0.95rem', lineHeight: 1.9, opacity: 0.78, margin: 0 }}>{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== AS DRAWN. AS BUILT. ===== */
function AsDrawn() {
  const pairs = [
    {
      label: 'The Elevations -- 1916',
      draw: BP_ELEV,
      photo: IMG_ARCH,
      drawCaption: 'Sheet 1: Front, Rear, Left, Right Elevations + Site Plan',
      photoCaption: 'As Built -- 2026',
    },
    {
      label: 'The Floor Plans',
      draw: BP_FLOOR,
      photo: IMG_ENTRY,
      drawCaption: 'Sheet 2: First + Second Floor Plans',
      photoCaption: 'The Entry Hall -- As Built',
    },
    {
      label: 'The Foundation',
      draw: BP_FOUND,
      photo: IMG_SALON,
      drawCaption: 'Sheet 3: Foundation Plan -- Stone Basement',
      photoCaption: 'The Living Room -- As Built',
    },
  ];
  return (
    <section style={{ background: '#050505', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,6vw,6rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>Thomas O'Shea, Architect -- Durham, NC -- 2000</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', letterSpacing: '-0.01em' }}>
            As Drawn. As Built.
          </h2>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.75, maxWidth: 620, margin: '0 0 4rem' }}>
            The original architectural drawings survived. Every proportion you see today was drawn in 1916 and rebuilt to spec in 1998. The restoration was faithful because the record was complete.
          </p>
        </FadeIn>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {pairs.map((p, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div>
                <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.2rem' }}>{p.label}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <div style={{ aspectRatio: '4/3', backgroundImage: `url(${p.draw})`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'sepia(1) saturate(0.6) brightness(0.7) hue-rotate(10deg)', border: '1px solid rgba(201,169,110,0.2)' }} />
                    <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', margin: '0.6rem 0 0' }}>{p.drawCaption}</p>
                  </div>
                  <div>
                    <div style={{ aspectRatio: '4/3', backgroundImage: `url(${p.photo})`, backgroundSize: 'cover', backgroundPosition: 'center', border: '1px solid rgba(201,169,110,0.2)' }} />
                    <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.55)', margin: '0.6rem 0 0' }}>{p.photoCaption}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== THE GROUNDS ===== */
function TheGrounds() {
  return (
    <section style={{ background: '#070707', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Grounds -- 4.25 Acres</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', letterSpacing: '-0.01em', maxWidth: 680 }}>
            A garden that has been loved for sixty years.
          </h2>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.8, maxWidth: 660, margin: '0 0 2.5rem' }}>
            Three American sycamores planted by Betty Dumaine in 1959. Grandiflora magnolias. Dogwoods, holly, azaleas, iris, camellias, long-leaf pines. The holly trees that gave Hollycrest its name. A brick terrace that seats a crowd. The Wee Cottage -- the children's playhouse -- still stands.
          </p>
        </FadeIn>
        <RoomGallery photos={[
          { src: IMG_AZALEA, caption: 'Red Azalea Hedge -- Spring 2026' },
          { src: IMG_CAMELLIA, caption: 'White Camellia -- March 2026' },
          { src: IMG_DOGWOOD, caption: 'Dogwood + Daffodils Along the Drive' },
          { src: IMG_CHERUB, caption: 'The Garden Cherub' },
          { src: IMG_POOL, caption: 'The Pool -- 20 x 40 ft' },
          { src: IMG_REAR, caption: 'The Rear Terrace' },
        ]} />
      </div>
    </section>
  );
}

/* ===== POOL CINEMATIC ===== */
function ThePool() {
  return (
    <CinematicReveal
      eyebrowText="The Grounds"
      headline="4.25 acres. Pool. Two tennis courts. A camellia garden."
      body="Three American sycamores planted by Betty Dumaine in 1959. Grandiflora magnolias. Dogwoods, holly, azaleas, iris. Long-leaf pines. A brick terrace that seats a crowd. The children's playhouse -- The Wee Cottage -- still stands."
      imgSrc={IMG_POOL}
      position="center"
    />
  );
}

/* ===== ANN QUOTE ===== */
function AnnQuote() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG_CAMELLIA})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.78)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(4rem,8vw,8rem) clamp(2rem,10vw,14rem)', maxWidth: 900, margin: '0 auto' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Current Stewards -- 2001 to Present</span>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem,2.4vw,2.4rem)', color: '#fff', lineHeight: 1.5, margin: '0 auto 2rem', maxWidth: 780, opacity: 0.96 }}>
            &ldquo;We fell in love with its character, its history, and the way it felt the moment we walked through the door.&rdquo;
          </p>
          <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 1.4rem' }} />
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', margin: 0 }}>Ann McAllister -- Garran Hill -- 2001</p>
        </FadeIn>
      </div>
    </div>
  );
}

/* ===== MATTERPORT ===== */
function MatterportSection() {
  return (
    <section style={{ background: '#050505', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,8vw,10rem)', textAlign: 'center' }}>
      <FadeIn>
        <span style={eyebrowStyle}>Virtual Tour</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 auto 1rem', letterSpacing: '-0.01em', maxWidth: 600 }}>
          Walk every room. At your own pace.
        </h2>
        <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2.0, opacity: 0.75, maxWidth: 560, margin: '0 auto 3rem' }}>
          The complete Matterport tour allows you to move through the house as if you were there -- every room, every stair, every view.
        </p>
        <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1" target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD, background: 'transparent', border: `1px solid ${GOLD}`, padding: '1rem 2.8rem', textDecoration: 'none', display: 'inline-block', cursor: 'pointer' }}>
          Enter the Virtual Tour
        </a>
      </FadeIn>
    </section>
  );
}

/* ===== CLOSING -- TWILIGHT SEQUENCE ===== */
function Closing() {
  return (
    <>
      {/* Aerial */}
      <div style={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG_AERIAL})`, backgroundSize: 'cover', backgroundPosition: 'center top', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.42)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 clamp(2rem,8vw,10rem)' }}>
          <FadeIn>
            <span style={eyebrowStyle}>Pinehurst, Moore County, North Carolina</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontStyle: 'italic', fontSize: 'clamp(1.6rem,3vw,3rem)', color: '#fff', lineHeight: 1.3, margin: 0, maxWidth: 720 }}>
              The estate from above. The world outside these gates does not exist here.
            </h2>
          </FadeIn>
        </div>
      </div>

      {/* Dusk -- privacy */}
      <div style={{ position: 'relative', height: '75vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG_DUSK2})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.52)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 clamp(2rem,8vw,10rem)' }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem,2.4vw,2.4rem)', color: '#fff', lineHeight: 1.5, margin: 0, maxWidth: 720, opacity: 0.94 }}>
              &ldquo;The world outside these gates does not exist here.&rdquo;
            </p>
          </FadeIn>
        </div>
      </div>

      {/* Final twilight */}
      <div style={{ position: 'relative', height: '80vh', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG_TWILIGHT})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.38)', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, zIndex: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '0 0 5rem', textAlign: 'center' }}>
          <FadeIn>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.2rem,2vw,2rem)', color: '#fff', lineHeight: 1.4, margin: '0 auto', maxWidth: 560, opacity: 0.9 }}>
              Garran Hill is ready.
            </p>
          </FadeIn>
        </div>
      </div>
    </>
  );
}

/* ===== INQUIRE MODAL ===== */
function Inquire({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  if (!open) return null;
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 9990, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: '#0d0d0d', border: '1px solid rgba(201,169,110,0.22)', padding: 'clamp(2.5rem,5vw,4rem)', maxWidth: 520, width: '100%' }}>
        {sent ? (
          <div style={{ textAlign: 'center' }}>
            <span style={eyebrowStyle}>Inquiry Received</span>
            <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.9, opacity: 0.8, margin: '1.5rem 0 0' }}>Rachel Hernandez will be in touch shortly. Thank you for your interest in Garran Hill.</p>
          </div>
        ) : (
          <>
            <span style={eyebrowStyle}>Private Inquiry</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.6rem,2.5vw,2.4rem)', color: '#fff', margin: '0 0 2rem' }}>Garran Hill -- $4,250,000</h2>
            <form onSubmit={submit}>
              {[{ name: 'name', label: 'Full Name', type: 'text' }, { name: 'email', label: 'Email', type: 'email' }, { name: 'phone', label: 'Phone', type: 'tel' }].map(f => (
                <div key={f.name} style={{ marginBottom: '1.2rem' }}>
                  <label style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '0.5rem' }}>{f.label}</label>
                  <input type={f.type} required style={{ width: '100%', background: 'transparent', border: '1px solid rgba(201,169,110,0.25)', color: CREAM, padding: '0.75rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.95rem', boxSizing: 'border-box' }}
                    value={form[f.name]} onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))} />
                </div>
              ))}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '0.5rem' }}>Message</label>
                <textarea rows={4} style={{ width: '100%', background: 'transparent', border: '1px solid rgba(201,169,110,0.25)', color: CREAM, padding: '0.75rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.95rem', resize: 'vertical', boxSizing: 'border-box' }}
                  value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} />
              </div>
              <button type="submit" style={{ width: '100%', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: '1rem', cursor: 'pointer' }}>
                Submit Inquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ===== FOOTER ===== */
function Footer({ onInquire }) {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(201,169,110,0.12)', padding: 'clamp(4rem,8vw,7rem) clamp(2rem,8vw,10rem)', textAlign: 'center' }}>
      <img src={CREST} alt="Garran Hill Crest" style={{ width: 64, height: 64, objectFit: 'contain', opacity: 0.65, marginBottom: '2rem', filter: 'brightness(0.85) sepia(1) saturate(2) hue-rotate(5deg)' }} />
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(1rem,1.4vw,1.2rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '0.4rem' }}>
        Garran Hill
      </div>
      <div style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginBottom: '3rem' }}>
        200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC 28374
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem', marginBottom: '3rem' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1rem,1.2vw,1.1rem)', color: 'rgba(255,255,255,0.7)' }}>Rachel Hernandez</div>
        <div style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Sotheby's International Realty</div>
        <div style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.22em', color: 'rgba(255,255,255,0.3)', marginTop: '0.3rem' }}>rachelhernandezrealtor@gmail.com</div>
      </div>
      <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD, background: 'transparent', border: `1px solid ${GOLD}`, padding: '0.9rem 2.4rem', cursor: 'pointer', marginBottom: '3rem' }}>
        Private Inquiry
      </button>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '2rem' }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.22)', margin: 0, lineHeight: 1.8 }}>
          &copy; 2026 Sotheby's International Realty. All rights reserved. Information deemed reliable but not guaranteed. $4,250,000.
        </p>
      </div>
    </footer>
  );
}

/* ===== ROOT ===== */
export default function GarrenHillV2() {
  const [inquireOpen, setInquireOpen] = useState(false);
  return (
    <div style={{ background: DARK, minHeight: '100vh', color: '#fff', fontFamily: 'Georgia, serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0a0a; }
        img { display: block; max-width: 100%; }
        a { color: inherit; }
        button { outline: none; }
      `}</style>
      <Hero onInquire={() => setInquireOpen(true)} />
      <Manifesto />
      <WestminsterQuote />
      <Architecture />
      <TheEntry />
      <CrestDivider />
      <WalterPage />
      <TheSalon />
      <TheDining />
      <TheLibrary />
      <TheKitchen />
      <ThePrimary />
      <CamelliaInterlude />
      <CrestDivider />
      <BlueFox />
      <TheFireplace />
      <TheRestoration />
      <AsDrawn />
      <CrestDivider />
      <TheGrounds />
      <ThePool />
      <AnnQuote />
      <MatterportSection />
      <Closing />
      <Footer onInquire={() => setInquireOpen(true)} />
      <Inquire open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </div>
  );
}

