import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const GH  = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';
const GH2 = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';

const cdnExt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;
const cdnInt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;

// --- IMAGES ---
const IMG_DRIVEWAY   = cdnExt(GH + 'gh_200HollycrestDrive-2.jpg');
const IMG_PORTICO    = cdnExt(GH  + 'fa8cec793_200HollycrestDrive-191.jpg');
const IMG_THRESHOLD  = cdnInt(GH2 + 'a9228a85d_200Holycrest-1179.jpg');
const IMG_ENTRY      = cdnInt(GH  + '082d9b5c7_200Holycrest-1182.jpg');
const IMG_STAIR      = cdnInt(GH2 + '99fab83cd_gh_86.jpg');
const IMG_SALON      = cdnInt(GH  + '341c7343c_200Holycrest-1203.jpg');
const IMG_FIRE       = cdnInt(GH  + '5f5f87315_200HollycrestDrive-65fire.jpg');
const IMG_WEDGWOOD   = cdnInt(GH2 + 'd45916396_gh_119.jpg');
const IMG_DINING     = cdnInt(GH  + 'e926f8fdd_200Holycrest-1296.jpg');
const IMG_POOL       = cdnExt(GH  + '57352d0a9_200HollycrestDrive-208.jpg');
const IMG_REAR       = cdnExt(GH  + '17d8dd539_200HollycrestDrive-132.jpg');
const IMG_PINK_AZ    = cdnExt(GH2 + '782f791e5_IMG_9412.jpg');
const IMG_WHITE_AZ   = cdnExt(GH2 + 'cd78defd6_200HollycrestDrive-11.jpg');
const IMG_CHERUB     = cdnExt(GH2 + 'e4a71cbd1_200HollycrestDrive-172.jpg');
const IMG_DAFFODILS  = cdnExt(GH2 + '8423de7d0_IMG_9355.jpeg');
const IMG_CAMELLIA   = cdnExt(GH2 + '863ec328e_26MarCamelliasalongpebblepath.jpg');
const IMG_AERIAL     = cdnExt(GH2 + '91bd002f8_gh_200HollycrestDrive-217.jpg');
const IMG_DUSK2      = cdnExt(GH2 + 'f19ebeaad_gh_200HollycrestDrive-209.jpg');
const IMG_TWILIGHT   = cdnExt(GH2 + 'dbb9ffc69_gh_200HollycrestDrive-203.jpg');

const CREST = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/be819ab2a_generated_image.png';

const eyebrowStyle = {
  fontFamily: 'sans-serif',
  fontSize: '10px',
  letterSpacing: '0.36em',
  textTransform: 'uppercase',
  color: GOLD,
  display: 'block',
  marginBottom: '1.2rem',
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

// ===================== NAV =====================
function Nav({ onInquire }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      padding: '1.1rem 2.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : 'none',
      transition: 'background 0.5s ease, border 0.5s ease',
    }}>
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.05rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: '#fff',
        fontWeight: 400,
      }}>Garran Hill</span>
      <div style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
        {['The Estate', 'The Grounds', 'The History'].map(label => (
          <span key={label} style={{
            fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', cursor: 'pointer',
          }}>{label}</span>
        ))}
        <button onClick={onInquire} style={{
          fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: GOLD,
          background: 'none', border: `1px solid ${GOLD}`, padding: '0.55rem 1.3rem',
          cursor: 'pointer',
        }}>Private Inquiry</button>
      </div>
    </nav>
  );
}

// ===================== HERO =====================
function Hero({ onInquire }) {
  const scrollY = useScrollY();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 200); }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden' }}>
      {/* BG: cross-dissolve two images */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_DRIVEWAY})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${scrollY * 0.22}px)`,
        transform: 'scale(1.08)',
        zIndex: 0,
        transition: 'opacity 1.2s ease',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_PORTICO})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(40% + ${scrollY * 0.18}px)`,
        transform: 'scale(1.08)',
        zIndex: 1,
        opacity: loaded ? 0 : 1,
        animation: loaded ? 'fadeOut 3s ease 1.5s forwards' : 'none',
      }} />
      <style>{`
        @keyframes fadeOut { from { opacity: 1; } to { opacity: 0; } }
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.18) 40%, rgba(10,10,10,0.72) 100%)',
      }} />
      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 2rem',
      }}>
        <FadeIn delay={0.3}>
          <span style={{ ...eyebrowStyle, marginBottom: '1.6rem', textAlign: 'center' }}>
            200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; Est. 1916
          </span>
        </FadeIn>
        <FadeIn delay={0.6}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(2.4rem, 5.5vw, 5.2rem)',
            color: '#fff',
            lineHeight: 1.12,
            margin: '0 0 1.4rem',
            letterSpacing: '0.02em',
            textShadow: '0 2px 32px rgba(0,0,0,0.5)',
            maxWidth: 800,
          }}>
            Built in 1916.<br />
            <em style={{ fontWeight: 300 }}>Still the finest house in Moore County.</em>
          </h1>
        </FadeIn>
        <FadeIn delay={0.9}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.1rem, 2vw, 1.55rem)',
            color: CREAM,
            opacity: 0.92,
            margin: '0 0 2.8rem',
            letterSpacing: '0.01em',
          }}>
            Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship.
          </p>
        </FadeIn>
        <FadeIn delay={1.1}>
          <div style={{ display: 'flex', gap: '1.2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={onInquire} style={{
              fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em',
              textTransform: 'uppercase', color: GOLD,
              background: 'none', border: `1px solid ${GOLD}`,
              padding: '1rem 2.8rem', cursor: 'pointer',
            }}>Private Inquiry</button>
            <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" rel="noreferrer" style={{
              fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 2.8rem', cursor: 'pointer', textDecoration: 'none',
              backdropFilter: 'blur(8px)',
            }}>Tour the Estate</button>
          </div>
        </FadeIn>
      </div>
      {/* Stats bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        background: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(201,169,110,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.4rem 2rem', gap: 'clamp(2rem, 5vw, 5rem)',
        flexWrap: 'wrap',
      }}>
        {[
          ['4.25', 'Acres'],
          ['5', 'Bedrooms'],
          ['7', 'Fireplaces'],
          ['1916', 'Est.'],
          ['$3.45M', 'Asking Price'],
        ].map(([val, label], i, arr) => (
          <React.Fragment key={label}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300, fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                color: '#fff', letterSpacing: '0.04em', lineHeight: 1,
              }}>{val}</div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em',
                textTransform: 'uppercase', color: GOLD, marginTop: '0.35rem',
              }}>{label}</div>
            </div>
            {i < arr.length - 1 && (
              <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)' }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// ===================== WALTER HINES PAGE SECTION =====================
function WalterSection() {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', display: 'flex', alignItems: 'center', background: DARK }}>
      {/* Crest watermark */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: `url(${CREST})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '55%',
        opacity: 0.045,
        filter: 'grayscale(1) brightness(2)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', padding: 'clamp(6rem,12vw,10rem) clamp(2rem,6vw,4rem)', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The History</span>
        </FadeIn>
        <FadeIn delay={0.15}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(2rem, 4vw, 3.8rem)',
            color: '#fff',
            lineHeight: 1.15,
            margin: '0 0 2.2rem',
          }}>
            Some houses hold history.<br />
            <em style={{ fontWeight: 300 }}>This one shaped it.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.28}>
          <div style={{ width: 44, height: 1, background: GOLD, margin: '0 auto 2.4rem', opacity: 0.6 }} />
        </FadeIn>
        <FadeIn delay={0.38}>
          <p style={{ color: CREAM, fontSize: 'clamp(1rem, 1.3vw, 1.12rem)', lineHeight: 2, opacity: 0.85, margin: '0 0 1.6rem' }}>
            In February 1913, Walter Hines Page -- publisher, diplomat, and native son of North Carolina --
            purchased this land two miles southwest of Pinehurst. He named it Garran Hill. He planned to grow
            peaches. He hired an architect and broke ground on a two-story Georgian brick house.
          </p>
        </FadeIn>
        <FadeIn delay={0.48}>
          <p style={{ color: CREAM, fontSize: 'clamp(1rem, 1.3vw, 1.12rem)', lineHeight: 2, opacity: 0.85, margin: '0 0 2.4rem' }}>
            He never walked through the door. President Wilson appointed him Ambassador to Great Britain
            that same March. Page spent five years in London fighting to bring America into the First World War --
            and succeeded. He came home on a stretcher in October 1918 and died December 21 at a cottage
            in Pinehurst. His family held the farm.
          </p>
        </FadeIn>
        <FadeIn delay={0.58}>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
            color: '#fff',
            lineHeight: 1.55,
            margin: '0 0 0.8rem',
            padding: '2rem 0',
            borderTop: `1px solid rgba(201,169,110,0.2)`,
            borderBottom: `1px solid rgba(201,169,110,0.2)`,
          }}>
            "The friend of Britain in her sorest need."
          </blockquote>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '1rem 0 0', opacity: 0.75 }}>
            Westminster Abbey -- London
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== CREST DIVIDER =====================
function CrestDivider() {
  return (
    <div style={{ background: DARK, textAlign: 'center', padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.4rem' }}>
      <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      <img src={CREST} alt="Garran Hill Crest" style={{ width: 64, height: 64, objectFit: 'contain', opacity: 0.75, filter: 'sepia(1) saturate(1.5) brightness(1.1)' }} />
      <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
    </div>
  );
}

// ===================== THRESHOLD SECTION =====================
function ThresholdSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-60, Math.min(60, (scrollY - top) * 0.22));

  return (
    <section ref={ref} style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_THRESHOLD})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.08)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.1) 45%, rgba(10,10,10,0.75) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 2rem' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Threshold</span>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.5rem, 2.8vw, 3rem)',
            color: '#fff',
            lineHeight: 1.2,
            margin: '0 auto',
            maxWidth: 680,
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}>
            <em style={{ fontWeight: 300 }}>Garran Hill.</em> 1916.<br />
            Carved in the granite where it has always been.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== ENTRY HALL SECTION =====================
function EntryHallSection() {
  return (
    <section style={{ display: 'flex', minHeight: '85vh', background: DARK, overflow: 'hidden' }}>
      {/* Text left */}
      <div style={{ flex: '0 0 42%', display: 'flex', alignItems: 'center', padding: 'clamp(4rem,8vw,6rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Entry Hall</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 2.8vw, 3rem)',
            color: '#fff',
            lineHeight: 1.18,
            margin: '0 0 1.6rem',
          }}>
            The axis reveals itself<br />
            <em style={{ fontWeight: 300 }}>the moment you enter.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82, margin: '0 0 1.2rem' }}>
            The original 1916 leaded glass fanlight. The sweeping oak staircase. The Persian runner
            on original heart-pine floors. And straight ahead -- the Library, exactly where the architect
            drew it, on the central axis of the house.
          </p>
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82 }}>
            Custom woodwork by David Prest. Seven fireplaces. The proportions of a house
            built by craftsmen who knew it would last a hundred years.
          </p>
        </FadeIn>
      </div>
      {/* Image right */}
      <div style={{
        flex: 1,
        backgroundImage: `url(${IMG_ENTRY})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
      }} />
    </section>
  );
}

// ===================== STAIRCASE SECTION =====================
function StaircaseSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-50, Math.min(50, (scrollY - top) * 0.2));

  return (
    <section ref={ref} style={{ position: 'relative', height: '75vh', minHeight: 520, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_STAIR})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(30% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.82) 36%, rgba(10,10,10,0.08) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 'clamp(2.5rem,6vw,5rem)', zIndex: 2, maxWidth: 420 }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Staircase</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.7rem, 2.6vw, 2.8rem)',
            color: '#fff',
            lineHeight: 1.2,
            margin: '0 0 1.2rem',
          }}>
            <em style={{ fontWeight: 300 }}>The same oak handrail</em><br />
            since 1916.
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.4rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.9, opacity: 0.82 }}>
            The curved newel post. The turned balusters. The landing that overlooks the entry hall below.
            Built by Leonard Tufts' own craftsmen -- the same men who built Pinehurst.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== SALON / LIVING ROOM =====================
function SalonSection() {
  return (
    <section style={{ display: 'flex', minHeight: '85vh', background: DARK, overflow: 'hidden', flexDirection: 'row-reverse' }}>
      {/* Text right */}
      <div style={{ flex: '0 0 42%', display: 'flex', alignItems: 'center', padding: 'clamp(4rem,8vw,6rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Salon</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 2.8vw, 3rem)',
            color: '#fff',
            lineHeight: 1.18,
            margin: '0 0 1.6rem',
          }}>
            Formal. Not stiff.<br />
            <em style={{ fontWeight: 300 }}>The room holds the light.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82 }}>
            Original plaster moldings. Fireplaces that have warmed every winter since Woodrow Wilson
            was president. The proportions are Georgian -- high ceilings, symmetrical windows, rooms
            that reward furniture arranged for conversation.
          </p>
        </FadeIn>
      </div>
      {/* Image left */}
      <div style={{
        flex: 1,
        backgroundImage: `url(${IMG_SALON})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
      }} />
    </section>
  );
}

// ===================== FIREPLACE SECTION =====================
function FireplaceSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-50, Math.min(50, (scrollY - top) * 0.2));

  return (
    <section ref={ref} style={{ position: 'relative', height: '78vh', minHeight: 540, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_FIRE})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(40% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(10,10,10,0.88) 36%, rgba(10,10,10,0.1) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 'clamp(2.5rem,6vw,5rem)', zIndex: 2, maxWidth: 400, textAlign: 'right' }}>
        <FadeIn>
          <span style={{ ...eyebrowStyle, textAlign: 'right' }}>Seven Fireplaces</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.7rem, 2.6vw, 2.8rem)',
            color: '#fff',
            lineHeight: 1.2,
            margin: '0 0 1.2rem',
          }}>
            Every room has<br />
            <em style={{ fontWeight: 300 }}>a reason to stay.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.4rem 0', marginLeft: 'auto' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.9, opacity: 0.82 }}>
            The Wedgwood mantel in the primary suite. The dining room surround in original tile.
            Seven in total. Each one original to the house. Each one still working.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== DINING ROOM =====================
function DiningSection() {
  return (
    <section style={{ display: 'flex', minHeight: '85vh', background: DARK, overflow: 'hidden' }}>
      <div style={{ flex: '0 0 42%', display: 'flex', alignItems: 'center', padding: 'clamp(4rem,8vw,6rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Dining Room</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 2.8vw, 3rem)',
            color: '#fff',
            lineHeight: 1.18,
            margin: '0 0 1.6rem',
          }}>
            A room designed<br />
            <em style={{ fontWeight: 300 }}>for long evenings.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82 }}>
            The original wainscoting. The fireplace surround. Windows that face the rear terrace
            and the garden beyond. Proportions that seat twelve without effort.
          </p>
        </FadeIn>
      </div>
      <div style={{
        flex: 1,
        backgroundImage: `url(${IMG_DINING})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
      }} />
    </section>
  );
}

// ===================== HISTORY WHISPER -- BETTY DUMAINE =====================
function BettyWhisper() {
  return (
    <section style={{ background: '#070707', padding: 'clamp(5rem,10vw,8rem) clamp(2rem,6vw,4rem)', textAlign: 'center' }}>
      <FadeIn>
        <span style={eyebrowStyle}>Provenance</span>
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
          color: 'rgba(255,255,255,0.82)',
          lineHeight: 1.65,
          maxWidth: 720,
          margin: '0 auto 2rem',
        }}>
          "The estate passed through remarkable hands. Betty Dumaine kept peacocks on the grounds.
          A blue fox is buried beneath the old boxwood. European royalty visited. The house has always
          drawn the kind of people who understand what it is."
        </p>
        <div style={{ width: 44, height: 1, background: GOLD, margin: '0 auto', opacity: 0.4 }} />
      </FadeIn>
    </section>
  );
}

// ===================== WEDGWOOD MANTEL / PRIMARY SUITE =====================
function PrimarySection() {
  return (
    <section style={{ display: 'flex', minHeight: '85vh', background: DARK, overflow: 'hidden', flexDirection: 'row-reverse' }}>
      <div style={{ flex: '0 0 42%', display: 'flex', alignItems: 'center', padding: 'clamp(4rem,8vw,6rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Primary Suite</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 2.8vw, 3rem)',
            color: '#fff',
            lineHeight: 1.18,
            margin: '0 0 1.6rem',
          }}>
            The Wedgwood mantel.<br />
            <em style={{ fontWeight: 300 }}>Original to the house.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82 }}>
            The primary suite occupies the full rear wing of the second floor. Balcony access.
            The Wedgwood mantel -- the finest in the house -- has never been touched.
            Ann McAllister restored the room around it.
          </p>
        </FadeIn>
      </div>
      <div style={{
        flex: 1,
        backgroundImage: `url(${IMG_WEDGWOOD})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '85vh',
      }} />
    </section>
  );
}

// ===================== GROUNDS INTRO =====================
function GroundsIntroSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-50, Math.min(50, (scrollY - top) * 0.2));

  return (
    <section ref={ref} style={{ position: 'relative', height: '80vh', minHeight: 560, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_PINK_AZ})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(40% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.08) 45%, rgba(10,10,10,0.72) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 2rem' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Grounds</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(2rem, 3.8vw, 4rem)',
            color: '#fff',
            lineHeight: 1.15,
            margin: '0 auto',
            maxWidth: 680,
            textShadow: '0 2px 28px rgba(0,0,0,0.55)',
          }}>
            Thirty years of planting.<br />
            <em style={{ fontWeight: 300 }}>It shows.</em>
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== GARDEN DETAILS =====================
function GardenSection() {
  return (
    <section style={{ background: DARK, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '60vh' }}>
      <div style={{
        backgroundImage: `url(${IMG_CAMELLIA})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        minHeight: 420, position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.28)' }} />
        <div style={{ position: 'absolute', bottom: '2rem', left: '2rem' }}>
          <FadeIn><span style={eyebrowStyle}>March Camellias</span></FadeIn>
        </div>
      </div>
      <div style={{
        backgroundImage: `url(${IMG_DAFFODILS})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        minHeight: 420, position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.28)' }} />
        <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', textAlign: 'right' }}>
          <FadeIn><span style={eyebrowStyle}>The Driveway in Spring</span></FadeIn>
        </div>
      </div>
    </section>
  );
}

// ===================== CHERUB / PROVENANCE SECTION =====================
function CherubSection() {
  return (
    <section style={{ display: 'flex', minHeight: '80vh', background: DARK, overflow: 'hidden' }}>
      <div style={{
        flex: '0 0 50%',
        backgroundImage: `url(${IMG_CHERUB})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
      }} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: 'clamp(4rem,8vw,6rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>One Hundred Years</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 2.6vw, 2.8rem)',
            color: '#fff',
            lineHeight: 1.2,
            margin: '0 0 1.6rem',
          }}>
            The stone figures have stood<br />
            <em style={{ fontWeight: 300 }}>longer than anyone remembers.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82 }}>
            The azaleas were here before the current stewards arrived. The hellebores return
            every winter without being asked. Hollycrest was named for these trees.
            This is what a century of care looks like.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== POOL + COURTS =====================
function PoolSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-50, Math.min(50, (scrollY - top) * 0.2));

  return (
    <section ref={ref} style={{ position: 'relative', height: '72vh', minHeight: 500, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_POOL})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.85) 36%, rgba(10,10,10,0.1) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 'clamp(2.5rem,6vw,5rem)', zIndex: 2, maxWidth: 440 }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Estate Grounds</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.7rem, 2.6vw, 2.8rem)',
            color: '#fff',
            lineHeight: 1.2,
            margin: '0 0 1.2rem',
          }}>
            A 20 x 40 pool.<br />
            <em style={{ fontWeight: 300 }}>Two tennis courts. 4.25 acres.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.4rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.9, opacity: 0.82 }}>
            The infrastructure of a life fully lived. Behind the gates of an estate that has never
            been subdivided in 110 years.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== REAR TERRACE =====================
function RearSection() {
  return (
    <section style={{ display: 'flex', minHeight: '80vh', background: DARK, overflow: 'hidden', flexDirection: 'row-reverse' }}>
      <div style={{ flex: '0 0 42%', display: 'flex', alignItems: 'center', padding: 'clamp(4rem,8vw,6rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Rear Terrace</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.8rem, 2.8vw, 3rem)',
            color: '#fff',
            lineHeight: 1.18,
            margin: '0 0 1.6rem',
          }}>
            The house continues<br />
            <em style={{ fontWeight: 300 }}>behind it.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82 }}>
            The rear elevation shows what the architect drew in 1916 and what was built: a broad
            covered terrace opening onto the grounds, with the pool, the courts, and the garden
            beyond. Private in every direction.
          </p>
        </FadeIn>
      </div>
      <div style={{
        flex: 1,
        backgroundImage: `url(${IMG_REAR})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '80vh',
      }} />
    </section>
  );
}

// ===================== AERIAL =====================
function AerialSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', height: '65vh', minHeight: 440, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_AERIAL})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.3) 0%, rgba(6,6,6,0.05) 40%, rgba(6,6,6,0.55) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '2.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <FadeIn>
          <span style={{ ...eyebrowStyle, color: 'rgba(201,169,110,0.75)' }}>
            4.25 Acres &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; Inside the Gates
          </span>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== DUSK 2 =====================
function Dusk2Section() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', height: '62vh', minHeight: 420, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_DUSK2})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.35) 0%, rgba(6,6,6,0.1) 45%, rgba(6,6,6,0.65) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 2rem' }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.4rem, 2.4vw, 2.4rem)',
            color: 'rgba(255,255,255,0.9)',
            lineHeight: 1.5,
            margin: '0 auto',
            maxWidth: 640,
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}>
            The world outside these gates<br />does not exist here.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== TWILIGHT CLOSE =====================
function TwilightClose() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', height: '72vh', minHeight: 500, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_TWILIGHT})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.25) 0%, rgba(6,6,6,0.1) 50%, rgba(6,6,6,0.7) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(1.6rem, 2.8vw, 3rem)',
            color: '#fff',
            letterSpacing: '0.04em',
            margin: '0 auto',
            textShadow: '0 2px 24px rgba(0,0,0,0.55)',
          }}>
            Garran Hill is ready.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== INQUIRE MODAL =====================
function InquireModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://base44.app/api/apps/69e248a2469cc39540781cce/entities/Inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, property: 'Garran Hill', source: 'Landing Page' }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  if (!open) return null;

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(5,5,5,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
      onClick={onClose}
    >
      <div
        style={{ background: '#0e0e0e', border: '1px solid rgba(201,169,110,0.22)', padding: 'clamp(2.5rem,5vw,4rem)', maxWidth: 520, width: '100%', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{ position: 'absolute', top: '1.2rem', right: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>x</button>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
            <span style={eyebrowStyle}>Thank you</span>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', color: '#fff', lineHeight: 1.4, margin: 0 }}>We will be in touch shortly.</p>
          </div>
        ) : (
          <>
            <span style={{ ...eyebrowStyle, marginBottom: '0.8rem' }}>Private Inquiry</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.4rem,2.2vw,1.9rem)', color: '#fff', margin: '0 0 2rem', lineHeight: 1.2 }}>
              Garran Hill<br />
              <span style={{ fontWeight: 300, fontStyle: 'italic', fontSize: '85%' }}>200 Hollycrest Drive, Pinehurst, NC</span>
            </h3>
            <form onSubmit={handleSubmit}>
              {[
                { key: 'name', label: 'Full Name', type: 'text', required: true },
                { key: 'email', label: 'Email Address', type: 'email', required: true },
                { key: 'phone', label: 'Phone Number', type: 'tel', required: false },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '1.2rem' }}>
                  <label style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '0.5rem' }}>{f.label}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: CREAM, padding: '0.8rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '0.5rem' }}>Message</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: CREAM, padding: '0.8rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" style={{
                width: '100%', padding: '1.1rem', background: 'none',
                border: `1px solid ${GOLD}`, color: GOLD,
                fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em',
                textTransform: 'uppercase', cursor: 'pointer',
              }}>
                Submit Inquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ===================== FOOTER =====================
function Footer({ onInquire }) {
  return (
    <footer style={{ background: '#060606', borderTop: '1px solid rgba(201,169,110,0.12)', padding: 'clamp(4rem,8vw,6rem) clamp(2rem,6vw,4rem)', textAlign: 'center' }}>
      <img src={CREST} alt="Garran Hill Crest" style={{ width: 72, height: 72, objectFit: 'contain', opacity: 0.7, filter: 'sepia(1) saturate(1.5) brightness(1.1)', marginBottom: '2rem', display: 'block', margin: '0 auto 2rem' }} />
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.4rem, 2vw, 1.8rem)', color: '#fff', fontWeight: 300, fontStyle: 'italic', margin: '0 0 0.6rem' }}>
        Garran Hill
      </p>
      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '0 0 2.5rem', opacity: 0.75 }}>
        200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; $3,450,000
      </p>
      <div style={{ width: 44, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: '0 auto 2.5rem' }} />
      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.4rem' }}>
        Rachel Hernandez
      </p>
      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 2.5rem' }}>
        Sotheby's International Realty &nbsp;&bull;&nbsp; Pinehurst, NC
      </p>
      <button onClick={onInquire} style={{
        fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em',
        textTransform: 'uppercase', color: GOLD,
        background: 'none', border: `1px solid rgba(201,169,110,0.4)`,
        padding: '0.85rem 2.5rem', cursor: 'pointer',
      }}>
        Private Inquiry
      </button>
    </footer>
  );
}

// ===================== APP =====================
export default function GarrenHillV2() {
  const [inquireOpen, setInquireOpen] = useState(false);

  return (
    <div style={{ background: DARK, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet" />

      <Nav onInquire={() => setInquireOpen(true)} />
      <Hero onInquire={() => setInquireOpen(true)} />
      <WalterSection />
      <CrestDivider />
      <ThresholdSection />
      <EntryHallSection />
      <StaircaseSection />
      <SalonSection />
      <FireplaceSection />
      <DiningSection />
      <BettyWhisper />
      <PrimarySection />
      <CrestDivider />
      <GroundsIntroSection />
      <GardenSection />
      <CherubSection />
      <PoolSection />
      <RearSection />
      <AerialSection />
      <Dusk2Section />
      <TwilightClose />
      <Footer onInquire={() => setInquireOpen(true)} />
      <InquireModal open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </div>
  );
}
