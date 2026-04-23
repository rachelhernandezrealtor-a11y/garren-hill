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

const IMG_DRIVEWAY = cdnExt(GH2 + '42813e145_gh_driveway.jpg');
const IMG_PORTICO  = cdnExt(GH + 'fa8cec793_200HollycrestDrive-191.jpg');
const IMG_ARCH    = cdnExt(GH + '082d9b5c7_200Holycrest-1182.jpg');
const IMG_SALON   = cdnInt(GH + '341c7343c_200Holycrest-1203.jpg');
const IMG_FIRE    = cdnInt(GH + '5f5f87315_200HollycrestDrive-65fire.jpg');
const IMG_DINING  = cdnInt(GH + 'e926f8fdd_200Holycrest-1296.jpg');
const IMG_POOL    = cdnExt(GH + '57352d0a9_200HollycrestDrive-208.jpg');
const IMG_FOYER   = cdnInt(GH + '2ad35ae07_200Holycrest-1188.jpg');
const IMG_PRIMARY = cdnInt(GH + '4046f0d74_200HollycrestDrive-95.jpg');
const IMG_BATH    = cdnInt(GH + 'f0ace4a90_200HollycrestDrive-101.jpg');
const IMG_POWDER  = cdnInt(GH + 'b57f79399_200HollycrestDrive-80.jpg');
const IMG_REAR    = cdnExt(GH + '17d8dd539_200HollycrestDrive-132.jpg');
const IMG_GARDEN  = cdnExt(GH + 'f0698e1ec_gh_200HollycrestDrive-29.jpg');
const IMG_TWILIGHT = cdnExt(GH2 + 'dbb9ffc69_gh_200HollycrestDrive-203.jpg');
const IMG_AERIAL  = cdnExt(GH2 + '91bd002f8_gh_200HollycrestDrive-217.jpg');
const IMG_DUSK2   = cdnExt(GH2 + 'f19ebeaad_gh_200HollycrestDrive-209.jpg');

const CREST_URL = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/be819ab2a_generated_image.png';

const IMG_PINK_AZALEA  = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/https%3A%2F%2Fmedia.base44.com%2Fimages%2Fpublic%2F69e248a2469cc39540781cce%2F7f4b1c053_200HollycrestDrive-190.jpg';
const IMG_WHITE_AZALEA = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/https%3A%2F%2Fmedia.base44.com%2Fimages%2Fpublic%2F69e248a2469cc39540781cce%2Fcd78defd6_200HollycrestDrive-11.jpg';
const IMG_CHERUB       = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/https%3A%2F%2Fmedia.base44.com%2Fimages%2Fpublic%2F69e248a2469cc39540781cce%2Fe4a71cbd1_200HollycrestDrive-172.jpg';
const IMG_HOLLY        = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/https%3A%2F%2Fmedia.base44.com%2Fimages%2Fpublic%2F69e248a2469cc39540781cce%2F8ec759e7b_200HollycrestDrive-189.jpg';
const IMG_HELLEBORES   = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/https%3A%2F%2Fmedia.base44.com%2Fimages%2Fpublic%2F69e248a2469cc39540781cce%2F49057010c_IMG_9345.jpeg';
const IMG_DAFFODILS    = 'https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/https%3A%2F%2Fmedia.base44.com%2Fimages%2Fpublic%2F69e248a2469cc39540781cce%2F8423de7d0_IMG_9355.jpeg';

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


function HistoryWhisper({ text, attribution = '' }) {
  return (
    <div style={{
      background: '#060606',
      padding: 'clamp(2.5rem,4vw,3.5rem) clamp(2rem,10vw,14rem)',
      textAlign: 'center',
      borderTop: '1px solid rgba(201,169,110,0.08)',
      borderBottom: '1px solid rgba(201,169,110,0.08)',
    }}>
      <FadeIn>
        <div style={{ width: 24, height: 1, background: GOLD, opacity: 0.3, margin: '0 auto 1.8rem' }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 300,
          fontSize: 'clamp(1.1rem,1.6vw,1.5rem)',
          color: 'rgba(245,240,232,0.65)',
          lineHeight: 1.7,
          maxWidth: 640,
          margin: '0 auto',
          letterSpacing: '0.01em',
        }}>{text}</p>
        {attribution ? (
          <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, margin: '1.4rem auto 0', opacity: 0.5 }}>{attribution}</p>
        ) : null}
        <div style={{ width: 24, height: 1, background: GOLD, opacity: 0.3, margin: '1.8rem auto 0' }} />
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
        { value: '$3,450,000', label: 'Asking Price' },
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

function Hero({ onInquire }) {
  const scrollY = useScrollY();
  const [dissolve, setDissolve] = useState(0);

  useEffect(() => {
    // Cross-dissolve: driveway (0) -> portico (1) -> driveway (0) slow loop
    // Each phase: 4s hold, 3s dissolve
    const HOLD = 4000;
    const FADE = 3000;
    const TOTAL = (HOLD + FADE) * 2;
    const start = Date.now();
    let raf;
    const tick = () => {
      const t = (Date.now() - start) % TOTAL;
      let alpha;
      if (t < HOLD) {
        alpha = 0; // driveway fully visible
      } else if (t < HOLD + FADE) {
        alpha = (t - HOLD) / FADE; // dissolve to portico
      } else if (t < HOLD * 2 + FADE) {
        alpha = 1; // portico fully visible
      } else {
        alpha = 1 - (t - (HOLD * 2 + FADE)) / FADE; // dissolve back to driveway
      }
      setDissolve(alpha);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const parallax = scrollY * 0.18;

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 600, overflow: 'hidden', background: '#000' }}>

      {/* DRIVEWAY -- base layer */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_DRIVEWAY})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.08)',
        zIndex: 0,
      }} />

      {/* PORTICO -- dissolve layer */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_PORTICO})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.08)',
        zIndex: 1,
        opacity: dissolve,
      }} />

      {/* GRADIENT OVERLAY */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.12) 40%, rgba(10,10,10,0.55) 100%)', zIndex: 2 }} />

      {/* NAV */}
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

      {/* HERO CONTENT */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 clamp(1.5rem,6vw,6rem)' }}>
        <span style={{ ...eyebrowStyle, marginBottom: '1.5rem' }}>200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC 28374</span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontSize: 'clamp(2.8rem, 6vw, 6.5rem)',
          color: '#fff', lineHeight: 1.0,
          margin: '0 0 0.4rem', letterSpacing: '-0.01em',
        }}>
          Built in 1916.
        </h1>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300, fontStyle: 'italic',
          fontSize: 'clamp(2.2rem, 5vw, 5.2rem)',
          color: '#fff', lineHeight: 1.05,
          margin: '0 0 2rem', letterSpacing: '-0.01em',
        }}>
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

function CrestDivider() {
  return (
    <section style={{
      position: 'relative',
      background: '#060606',
      padding: 'clamp(5rem,10vw,8rem) clamp(2rem,10vw,14rem)',
      textAlign: 'center',
      overflow: 'hidden',
    }}>
      {/* Large faded crest as atmospheric underlay */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'clamp(320px,45vw,560px)',
        height: 'clamp(320px,45vw,560px)',
        backgroundImage: `url(${CREST_URL})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.07,
        filter: 'sepia(1) saturate(2)',
        zIndex: 0,
      }} />
      {/* Text floats over the crest */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <FadeIn>
          <img
            src={CREST_URL}
            alt="Garran Hill -- VHF crest"
            style={{
              width: 'clamp(56px,7vw,80px)',
              opacity: 0.55,
              filter: 'drop-shadow(0 2px 10px rgba(201,169,110,0.22))',
              marginBottom: '2rem',
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.28, margin: '0 auto 2.2rem' }} />
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.3rem,2vw,2rem)',
            color: 'rgba(255,255,255,0.72)',
            lineHeight: 1.6,
            maxWidth: 600,
            margin: '0 auto 1.6rem',
            letterSpacing: '0.01em',
          }}>
            Built in 1916. Recognized by the Village of Historical Foundations.<br />Still the finest house in Moore County.
          </p>
          <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.28, margin: '0 auto' }} />
        </FadeIn>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,10vw,14rem)', textAlign: 'center' }}>
      <FadeIn>
        <span style={eyebrowStyle}>Pinehurst, North Carolina -- Built 1916</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2rem,3.5vw,3.5rem)', color: '#fff', lineHeight: 1.2, margin: '0 auto 2.5rem', maxWidth: 820, letterSpacing: '-0.01em' }}>
          Some houses hold history.<br /><em style={{ fontWeight: 300 }}>This one shaped it.</em>
        </h2>
        <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 2.5rem' }} />
        <p style={{ color: CREAM, fontSize: 'clamp(0.95rem,1.2vw,1.08rem)', lineHeight: 2.0, opacity: 0.8, maxWidth: 680, margin: '0 auto' }}>
          One hundred and ten years. Five families. A World War. Peacocks on the lawn. Three years of full restoration. The current stewards have kept the faith. Garran Hill is ready.
        </p>
      </FadeIn>
    </section>
  );
}

function Architecture() {
  return (
    <CinematicReveal
      eyebrowText="The Architecture"
      headline="Built by Leonard Tufts' own craftsmen -- the same men who built Pinehurst."
      body="Neo-Georgian. Longitudinal plan: one long central body, one room deep, a wing at each end. The front portico opens to a circular drive. The NE/SW orientation was deliberate -- the back of the house floods with light."
      imgSrc={IMG_FOYER}
      position="center"
    />
  );
}

function TheSalon() {
  return (
    <CinematicReveal
      eyebrowText="The Salon"
      headline="Original oak floors. Seven carved mantels. Not one was touched."
      body="The restoration preserved every original element worth preserving: wide-plank oak floors, solid-wood interior doors with original brass key plates and original keys, the carved dining room frontispiece. Everything else was rebuilt to match."
      imgSrc={IMG_SALON}
      reverse={true}
      position="center"
    />
  );
}


function TheDining() {
  return (
    <CinematicReveal
      eyebrowText="The Dining Room"
      headline="The original frontispiece. Not reproduced -- preserved."
      body="Every gathering since 1916 has happened under the same carved woodwork. The English Speaking Union. Pi Beta Phi. Betty Dumaine's royalty. The current stewards' own celebrations. This room was designed for people worth impressing."
      imgSrc={IMG_DINING}
      position="center"
    />
  );
}



function TheFireplaces() {
  return (
    <CinematicReveal
      eyebrowText="Seven Fireplaces"
      headline="Every carved mantel original. Every damper new."
      body="The restoration team cleaned all seven fireplaces, installed new dampers throughout, and added propane gas logs to six. The mantels -- carved in 1916 -- were not touched. They did not need to be."
      imgSrc={IMG_FIRE}
      reverse={true}
      position="center"
    />
  );
}

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

function AnnQuote() {
  return (
    <section style={{ position: 'relative', minHeight: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG_REAR})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.04)', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.72)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: 'clamp(4rem,8vw,7rem) clamp(2rem,10vw,14rem)' }}>
        <FadeIn>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(1.4rem,2.4vw,2.4rem)', color: '#fff', lineHeight: 1.5, margin: '0 auto 2rem', maxWidth: 780, opacity: 0.96 }}>
            &ldquo;I wanted every person who walked through the door to feel they had arrived somewhere that mattered.&rdquo;
          </p>
          <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 1.4rem' }} />
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
            Ann McAllister -- Current Steward
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function MatterportSection() {
  return (
    <section style={{ background: '#050505', padding: 'clamp(4rem,8vw,7rem) clamp(2rem,6vw,6rem)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={eyebrowStyle}>Virtual Tour</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.8vw,3rem)', color: '#fff', lineHeight: 1.18, margin: '0 auto', letterSpacing: '-0.01em' }}>
              Walk every room.
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', border: '1px solid rgba(201,169,110,0.15)' }}>
            <iframe
              src="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allowFullScreen
              allow="xr-spatial-tracking"
              title="Garran Hill 3D Tour"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section style={{ background: '#060606', padding: 'clamp(5rem,10vw,9rem) clamp(2rem,10vw,14rem)', textAlign: 'center' }}>
      <FadeIn>
        <span style={eyebrowStyle}>The Opportunity</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2rem,3.5vw,3.5rem)', color: '#fff', lineHeight: 1.2, margin: '0 auto 2.5rem', maxWidth: 740, letterSpacing: '-0.01em' }}>
          Every generation has understood<br /><em style={{ fontWeight: 300 }}>what they were holding.</em>
        </h2>
        <div style={{ width: 40, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 2.5rem' }} />
        <p style={{ color: CREAM, fontSize: 'clamp(0.95rem,1.2vw,1.08rem)', lineHeight: 2.0, opacity: 0.8, maxWidth: 640, margin: '0 auto 1.8rem' }}>
          Walter Hines Page understood it. Ralph Page understood it. Betty Dumaine understood it. The current stewards have spent 25 years understanding it -- in the woodwork, in the gardens, in every room.
        </p>
        <p style={{ color: CREAM, fontSize: 'clamp(0.95rem,1.2vw,1.08rem)', lineHeight: 2.0, opacity: 0.8, maxWidth: 640, margin: '0 auto 2.5rem' }}>
          Garran Hill is ready.
        </p>
      </FadeIn>
    </section>
  );
}

function TheGrounds() {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-60, Math.min(60, (scrollY - top) * 0.22));
  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_PINK_AZALEA})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.88) 38%, rgba(10,10,10,0.08) 100%)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, width: 'min(52%, 560px)', padding: 'clamp(4rem,8vw,7rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Grounds</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(2rem,3vw,3.2rem)', color: '#fff', lineHeight: 1.12, margin: '0 0 1.6rem', letterSpacing: '-0.01em' }}>
            The gardens have been blooming<br /><em style={{ fontWeight: 300 }}>since 1916.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, margin: 0, opacity: 0.88 }}>
            Azaleas. Hellebores. Daffodils returning every spring without being asked. The grounds at Garran Hill are not landscaped -- they are established. A century of planting, tending, and letting things take root.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function HollySection() {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.2));
  return (
    <section ref={ref} style={{ position: 'relative', height: '70vh', minHeight: 500, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_HOLLY})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.52)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 clamp(2rem,10vw,14rem)' }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.5rem,2.6vw,2.6rem)',
            color: '#fff',
            lineHeight: 1.45,
            margin: '0 auto 1.8rem',
            maxWidth: 700,
            textShadow: '0 2px 20px rgba(0,0,0,0.5)',
          }}>
            Hollycrest was named for these trees.<br />They were here before the house.
          </p>
          <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.45, margin: '0 auto' }} />
        </FadeIn>
      </div>
    </section>
  );
}

function CherubSection() {
  return (
    <CinematicReveal
      eyebrowText="The Gardens"
      headline={"One hundred years of things
taking root."}
      body="The stone figures have stood in these gardens since Betty Dumaine's time. The azaleas were here before the current stewards arrived. The hellebores come back every winter without being asked. This is what a century of care looks like."
      imgSrc={IMG_CHERUB}
      reverse={true}
      position="center"
    />
  );
}

function DaffodilSection() {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.2));
  return (
    <section ref={ref} style={{ position: 'relative', minHeight: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_DAFFODILS})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, rgba(10,10,10,0.88) 38%, rgba(10,10,10,0.08) 100%)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, width: 'min(52%, 520px)', marginLeft: 'auto', padding: 'clamp(4rem,8vw,6rem) clamp(2.5rem,5vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>Every Spring</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.8rem,2.6vw,2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 1.4rem' }}>
            They return without<br /><em style={{ fontWeight: 300 }}>being asked.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.4rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.9, margin: 0, opacity: 0.85 }}>
            Daffodils along the drive. Azaleas at the portico. The grounds at Garran Hill have been tended for over a century -- and they show it.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function AerialSection() {
  const scrollY = useScrollY();
  const ref = useRef();
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
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.25) 0%, rgba(6,6,6,0.05) 40%, rgba(6,6,6,0.4) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '2.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <FadeIn>
          <span style={{ ...eyebrowStyle, color: 'rgba(201,169,110,0.7)' }}>4.25 Acres &nbsp;&bull;&nbsp; Pinehurst, NC</span>
        </FadeIn>
      </div>
    </section>
  );
}

function Dusk2Section() {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));
  return (
    <section ref={ref} style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_DUSK2})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.3) 0%, rgba(6,6,6,0.08) 45%, rgba(6,6,6,0.55) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 2rem' }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(1.4rem,2.2vw,2.2rem)',
            color: 'rgba(255,255,255,0.88)',
            letterSpacing: '0.01em',
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

function TwilightClose() {
  const scrollY = useScrollY();
  const ref = useRef();
  const [top, setTop] = useState(0);
  useEffect(() => {
    if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY);
  }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));
  return (
    <section ref={ref} style={{ position: 'relative', height: '70vh', minHeight: 480, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_TWILIGHT})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.3) 0%, rgba(6,6,6,0.15) 50%, rgba(6,6,6,0.6) 100%)', zIndex: 1 }} />
    </section>
  );
}

function Inquire({ open, onClose }) {
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
    <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(5,5,5,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={onClose}>
      <div style={{ background: '#0e0e0e', border: '1px solid rgba(201,169,110,0.22)', padding: 'clamp(2.5rem,5vw,4rem)', maxWidth: 540, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.2rem', right: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>x</button>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <span style={eyebrowStyle}>Thank you</span>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', color: '#fff', lineHeight: 1.4, margin: 0 }}>We will be in touch shortly.</p>
          </div>
        ) : (
          <>
            <span style={{ ...eyebrowStyle, marginBottom: '0.8rem' }}>Private Inquiry</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: '#fff', margin: '0 0 2rem', lineHeight: 1.2 }}>
              Garran Hill<br /><span style={{ fontWeight: 300, fontStyle: 'italic', fontSize: '85%' }}>200 Hollycrest Drive, Pinehurst, NC</span>
            </h3>
            <form onSubmit={handleSubmit}>
              {[
                { key: 'name', label: 'Full Name', type: 'text' },
                { key: 'email', label: 'Email Address', type: 'email' },
                { key: 'phone', label: 'Phone Number', type: 'tel' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: '1.2rem' }}>
                  <label style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '0.5rem' }}>{f.label}</label>
                  <input
                    type={f.type}
                    required={f.key !== 'phone'}
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
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: CREAM, padding: '0.8rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                />
              </div>
              <button type="submit" style={{ width: '100%', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: DARK, background: GOLD, border: 'none', padding: '1rem', cursor: 'pointer' }}>
                Submit Inquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#030303', borderTop: '1px solid rgba(201,169,110,0.12)', padding: 'clamp(2.5rem,5vw,4rem) clamp(2rem,6vw,6rem)', textAlign: 'center' }}>
      <img
        src={CREST_URL}
        alt="Garran Hill -- Hollycrest 1916 -- VHF"
        style={{
          width: 'clamp(100px,12vw,148px)',
          opacity: 0.82,
          filter: 'drop-shadow(0 2px 12px rgba(201,169,110,0.18))',
          marginBottom: '1.8rem',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      />
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(1rem,1.4vw,1.2rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '1rem' }}>
        Garran Hill
      </div>
      <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', margin: '0 0 0.5rem' }}>
        200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC 28374
      </p>
      <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,169,110,0.45)', margin: 0 }}>
        Exclusively Listed by Rachel Hernandez &nbsp;&bull;&nbsp; Sotheby's International Realty
      </p>
    </footer>
  );
}

export default function GarrenHillV2() {
  const [inquireOpen, setInquireOpen] = useState(false);
  return (
    <div style={{ background: DARK, color: '#fff', fontFamily: 'Georgia, serif', margin: 0, padding: 0 }}>
      <Hero onInquire={() => setInquireOpen(true)} />
      <Manifesto />
      <CrestDivider />
      <Architecture />
      <HistoryWhisper text="Ralph Page built this for his father. Walter Hines Page -- Ambassador to the Court of St. James, the man who pushed Wilson into the First World War -- died weeks after coming home. He never walked through the door." />
      <TheSalon />
      <HistoryWhisper text="The English Speaking Union met here. Pi Beta Phi. Betty Dumaine's royalty. This room has always known how to hold a conversation." />
      <TheDining />
      <HistoryWhisper text="Betty Dumaine shared a room at Vassar with a woman who became Queen of Thailand. Royalty visited. The dining room frontispiece was already a hundred years old by then." />
      <TheFireplaces />
      <HistoryWhisper text="The friend of Britain in her sorest need." attribution="Westminster Abbey -- Walter Hines Page Memorial -- 1918" />
      <TheRestoration />
      <HistoryWhisper text="When Blue Fox died, Betty buried him in a 10x16 slate-covered grave with a brass marker and a four-foot blue fox statue. He is still on the property." />
      <ThePool />
      <TheGrounds />
      <HollySection />
      <CherubSection />
      <DaffodilSection />
      <AerialSection />
      <AnnQuote />
      <MatterportSection />
      <Closing />
      <Dusk2Section />
      <TwilightClose />
      <Footer />
      <Inquire open={inquireOpen} onClose={() => setInquireOpen(false)} />
    </div>
  );
}
