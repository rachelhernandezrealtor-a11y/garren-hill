import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';
const GLASS = 'rgba(255,255,255,0.10)';
const GLASS_BORDER = 'rgba(255,255,255,0.25)';

// Current app storage -- all verified 200 OK
const BASE = 'https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/';
const GH = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';

const cdnExt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;
const cdnInt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;

// EXTERIORS -- uploaded to current app, verified live
const IMG_HERO     = cdnExt(BASE + 'ac89533df_gh_200HollycrestDrive-1.jpg');   // Front elevation portico
const IMG_ARCH     = cdnExt(BASE + '5c9dadfb8_gh_200HollycrestDrive-28.jpg');  // Side grounds wide
const IMG_SIDE     = cdnExt(BASE + 'ff295318a_gh_200HollycrestDrive-8.jpg');   // Side elevation
const IMG_GARDEN   = cdnExt(BASE + 'f0698e1ec_gh_200HollycrestDrive-29.jpg');  // Grounds / trees
const IMG_AERIAL   = cdnExt(BASE + 'ac02a640a_gh_200HollycrestDrive-22.jpg');  // Aerial / wide exterior
const IMG_POOL     = cdnExt(GH  + '57352d0a9_200HollycrestDrive-208.jpg');     // Pool classic
const IMG_POOL2    = cdnExt(GH  + 'cb2b6ff1c_200HollycrestDrive-207.jpg');     // Pool alt
const IMG_PORTICO  = cdnExt(GH  + 'fa8cec793_200HollycrestDrive-191.jpg');     // Portico detail
const IMG_REAR     = cdnExt(GH  + '17d8dd539_200HollycrestDrive-132.jpg');     // Rear porch

// INTERIORS -- verified live on GH app
const IMG_FOYER    = cdnInt(GH  + '082d9b5c7_200Holycrest-1182.jpg');          // Entrance hall
const IMG_FOYER2   = cdnInt(GH  + '2ad35ae07_200Holycrest-1188.jpg');          // Entrance hall wide
const IMG_SALON    = cdnInt(GH  + '341c7343c_200Holycrest-1203.jpg');          // Living room
const IMG_SALON2   = cdnInt(GH  + '0ca3bb2a1_200Holycrest-1272.jpg');          // Living room alt
const IMG_FIRE     = cdnInt(GH  + '5f5f87315_200HollycrestDrive-65fire.jpg');  // Fireplace lit
const IMG_DINING   = cdnInt(GH  + 'e926f8fdd_200Holycrest-1296.jpg');          // Dining room
const IMG_PRIMARY  = cdnInt(GH  + '4046f0d74_200HollycrestDrive-95.jpg');      // Master bedroom
const IMG_PRIMARY2 = cdnInt(GH  + 'db249be39_200HollycrestDrive-92.jpg');      // Master bedroom alt
const IMG_BATH     = cdnInt(GH  + 'f0ace4a90_200HollycrestDrive-101.jpg');     // Master bath
const IMG_BATH2    = cdnInt(GH  + '00d939ad7_200HollycrestDrive-79.jpg');      // Master bath alt
const IMG_POWDER   = cdnInt(GH  + 'b57f79399_200HollycrestDrive-80.jpg');      // Powder room Tennessee marble
const IMG_BED2     = cdnInt(GH  + '0929fd72d_200HollycrestDrive-109.jpg');     // Bedroom 2

const eyebrow = {
  fontFamily: 'sans-serif',
  fontSize: '10px',
  letterSpacing: '0.36em',
  textTransform: 'uppercase',
  color: GOLD,
  display: 'block',
  margin: '0 0 1.2rem',
};

const divider = {
  width: 40,
  height: 1,
  background: GOLD,
  opacity: 0.5,
  margin: '2rem auto',
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
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
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
  const parallax = Math.max(-60, Math.min(60, (scrollY - top) * 0.25));

  return (
    <div ref={ref} style={{ position: 'relative', minHeight: '88vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: `${position} calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)',
        zIndex: 0,
        transition: 'background-position 0.05s linear',
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: reverse
          ? 'linear-gradient(to left, rgba(10,10,10,0.9) 42%, rgba(10,10,10,0.15) 100%)'
          : 'linear-gradient(to right, rgba(10,10,10,0.9) 42%, rgba(10,10,10,0.15) 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        width: 'min(50%, 540px)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(2.5rem, 5vw, 5rem)',
        marginLeft: reverse ? 'auto' : 0,
      }}>
        <FadeIn>
          <span style={eyebrow}>{eyebrowText}</span>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(1.9rem, 3vw, 3rem)',
            color: '#fff', lineHeight: 1.15,
            margin: '0 0 1.6rem', letterSpacing: '-0.02em',
          }} dangerouslySetInnerHTML={{ __html: headline }} />
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2, margin: 0, opacity: 0.88 }}>{body}</p>
        </FadeIn>
      </div>
    </div>
  );
}

function PullQuote({ quote, attribution }) {
  return (
    <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 12vw, 16rem)', background: '#060606', textAlign: 'center' }}>
      <FadeIn>
        <p style={{
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
          fontSize: 'clamp(1.4rem, 2.6vw, 2.5rem)',
          color: '#fff', lineHeight: 1.45,
          margin: '0 auto 2.5rem', maxWidth: 820,
        }}>
          &ldquo;{quote}&rdquo;
        </p>
        <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.4, margin: '0 auto 1.5rem' }} />
        {attribution && (
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
            {attribution}
          </p>
        )}
      </FadeIn>
    </div>
  );
}

function FullBleed({ imgSrc, label, height = '55vw', maxH = '680px', position = 'center' }) {
  return (
    <div style={{ position: 'relative', height: `clamp(360px, ${height}, ${maxH})`, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: position, transform: 'scale(1.03)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.22)' }} />
      {label && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 3vw', background: 'linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 100%)' }}>
          <FadeIn>
            <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{label}</p>
          </FadeIn>
        </div>
      )}
    </div>
  );
}

function TimelineItem({ year, title, body, last = false }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '2.5rem', marginBottom: last ? 0 : '3.5rem', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 52, textAlign: 'right', paddingTop: '0.1rem' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '1.35rem', color: GOLD, display: 'block', lineHeight: 1.15 }}>{year}</span>
        </div>
        <div style={{ flex: 1, borderLeft: '1px solid rgba(201,169,110,0.2)', paddingLeft: '2rem', paddingTop: '0.1rem' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.02rem', color: '#fff', margin: '0 0 0.45rem', lineHeight: 1.3 }}>{title}</p>
          <p style={{ color: CREAM, fontSize: '0.93rem', lineHeight: 1.9, opacity: 0.7, margin: 0 }}>{body}</p>
        </div>
      </div>
    </FadeIn>
  );
}

export default function GarrenHillV2() {
  const scrollY = useScrollY();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://base44.app/api/apps/69e248a2469cc39540781cce/entities/Inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, property: 'Garren Hill', source: 'Landing Page' }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <div style={{ background: DARK, color: CREAM, fontFamily: 'Georgia, serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '1.4rem 4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 60 ? 'rgba(10,10,10,0.94)' : 'linear-gradient(to bottom, rgba(10,10,10,0.6) 0%, transparent 100%)',
        borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        backdropFilter: scrollY > 60 ? 'blur(14px)' : 'none',
        transition: 'all 0.35s ease',
      }}>
        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1rem', color: '#fff', letterSpacing: '0.04em' }}>Garren Hill</span>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" rel="noreferrer"
            style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
            Tour the Estate
          </a>
          {['The History', 'Inquire'].map(item => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); if (item === 'Inquire') setInquiryOpen(true); }}
              style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', cursor: 'pointer' }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', background: '#000' }}>

        {/* Full-bleed photo -- portico front elevation, Ken Burns scale */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${IMG_HERO})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          transform: `scale(1.08) translateY(${scrollY * 0.18}px)`,
          transition: 'transform 0.06s linear',
          willChange: 'transform',
        }} />

        {/* Gradient -- dark at top for nav, heavy at bottom for copy */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.55) 0%, rgba(10,10,10,0.1) 35%, rgba(10,10,10,0.15) 55%, rgba(10,10,10,0.88) 85%, rgba(10,10,10,0.97) 100%)',
        }} />

        {/* ADDRESS -- gold eyebrow pinned top left, below nav */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
          padding: 'clamp(5rem, 9vw, 7rem) clamp(2.5rem, 6vw, 6rem) 0',
          pointerEvents: 'none',
        }}>
          <span style={{
            fontFamily: 'sans-serif', fontSize: '9px',
            letterSpacing: '0.38em', textTransform: 'uppercase',
            color: GOLD, display: 'block',
          }}>
            200 Hollycrest Drive &nbsp;|&nbsp; Pinehurst, NC &nbsp;|&nbsp; Est. 1916
          </span>
        </div>

        {/* HERO COPY -- centered block, vertically anchored to lower third */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 5,
          display: 'flex', flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textAlign: 'center',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 8vw, 10rem) clamp(7rem, 12vh, 10rem)',
        }}>
          <FadeIn delay={0.15}>
            <h1 style={{
              fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: 'clamp(2.8rem, 6.5vw, 7rem)',
              color: '#fff', lineHeight: 1.05,
              margin: '0 0 1.4rem', letterSpacing: '-0.025em',
            }}>
              Built in 1916.<br /><em>Still the finest house</em><br />in Moore County.
            </h1>
          </FadeIn>
          <FadeIn delay={0.35}>
            <p style={{
              fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
              color: 'rgba(245,240,232,0.82)', lineHeight: 1.7,
              margin: '0 0 2.4rem', maxWidth: 520,
            }}>
              Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship.
            </p>
          </FadeIn>
          <FadeIn delay={0.5}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setInquiryOpen(true)} style={{
                padding: '0.9rem 2.6rem',
                background: 'rgba(201,169,110,0.15)',
                border: `1px solid ${GOLD}`,
                color: GOLD, fontFamily: 'sans-serif', fontSize: '10px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: 1,
                backdropFilter: 'blur(8px)',
              }}>
                Private Inquiry
              </button>
              <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" rel="noreferrer" style={{
                padding: '0.9rem 2.6rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.72)', fontFamily: 'sans-serif', fontSize: '10px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 1,
                backdropFilter: 'blur(8px)', display: 'inline-block',
              }}>
                Tour the Estate
              </a>
            </div>
          </FadeIn>
        </div>

        {/* STATS BAR -- frosted glass, pinned bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          background: 'rgba(8,8,8,0.78)', backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '1.4rem 0',
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0,
        }}>
          {[
            { value: '1916', label1: 'YEAR', label2: 'BUILT' },
            { value: '6,700', label1: 'HEATED', label2: 'SQ FT' },
            { value: '7', label1: 'ORIGINAL', label2: 'FIREPLACES' },
            { value: '4.15', label1: 'PRIVATE', label2: 'ACRES' },
            { value: '$4.25M', label1: 'OFFERED', label2: 'AT' },
          ].map((s, i) => (
            <React.Fragment key={s.label1}>
              {i > 0 && (
                <div style={{
                  width: 1, alignSelf: 'stretch', minHeight: 44,
                  background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12) 20%, rgba(255,255,255,0.12) 80%, transparent)',
                  margin: '0 clamp(1rem, 3vw, 3rem)',
                }} />
              )}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300,
                  fontSize: 'clamp(1.3rem, 2vw, 2rem)', color: '#fff', lineHeight: 1,
                  marginBottom: '0.45rem',
                }}>{s.value}</div>
                <div style={{
                  fontFamily: 'sans-serif', fontSize: '7px',
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.35)', lineHeight: 1.5,
                }}>{s.label1}<br />{s.label2}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>The Property</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
            Some houses hold history.<br /><em>This one shaped it.</em>
          </h2>
          <div style={divider} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.85, margin: '2.2rem 0' }}>
            In 1913, Walter Hines Page -- publisher, kingmaker, and the man Woodrow Wilson would appoint U.S. Ambassador to the Court of St. James -- bought land two miles southwest of Pinehurst and commissioned a Georgian manor from a Boston firm. He named it Garren Hill. He planned to come home.
          </p>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.85, margin: '0 0 2.2rem' }}>
            The war came instead. Page spent four years in London arguing, cajoling, and eventually exhausting himself in service of the Allied cause. He sailed home in 1918, worn through. He died within weeks. He never walked through the door of the house built for him.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.52)', fontSize: '1.08rem', lineHeight: 1.88, margin: 0 }}>
            In a vestibule of Westminster Abbey, a bronze memorial bears the inscription: "The friend of Britain in her sorest need." The house he never occupied still stands. It has been cared for ever since by people who understood what they had.
          </p>
        </FadeIn>
      </div>

      {/* ARCHITECTURE CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Architecture"
        headline="Neo-Georgian.<br /><em>Unchanged in all</em><br />the ways that matter."
        body="Designed by a Boston architectural firm. Built by Leonard Tufts' own craftsmen -- the same men who built Pinehurst. Longitudinal brick construction, one room deep, with a wing at each end. A columned portico. A circular drive. The NE/SW orientation was intentional: the back of the house fills with natural light from first sun to last."
        imgSrc={IMG_ARCH}
      />

      {/* FULL BLEED -- SIDE ELEVATION */}
      <FullBleed imgSrc={IMG_SIDE} label="200 Hollycrest Drive -- 4.15 Acres" height="55vw" maxH="680px" position="center top" />

      {/* FOYER CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Entry"
        headline="Original leaded glass.<br /><em>Original solid doors.</em><br />Original brass keys."
        body="The front entry has not been touched since 1916 -- leaded glass sidelights, the over-door fanlight, solid-wood interior doors with their original brass key plates and the original keys to match. The foyer sets the tone for everything that follows: nothing performed, everything considered."
        imgSrc={IMG_FOYER}
        reverse={true}
        position="center"
      />

      {/* PULL QUOTE */}
      <PullQuote
        quote="The friend of Britain in her sorest need."
        attribution="Westminster Abbey memorial to Walter Hines Page, U.S. Ambassador 1913-1918"
      />

      {/* SALON CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Living Room"
        headline="Seven fireplaces.<br /><em>One room that earns</em><br />all of them."
        body="The salon runs the full depth of the house. Custom crown moldings, raised-panel wainscoting, and a carved mantel by master carpenter David Prest, who executed every piece of interior woodwork during the 2001 restoration. Original wide-plank oak floors throughout. The room was designed for entertaining. It still is."
        imgSrc={IMG_SALON}
      />

      {/* FULL BLEED -- FIREPLACE */}
      <FullBleed imgSrc={IMG_FIRE} label="One of seven original carved mantels" height="58vw" maxH="700px" />

      {/* DINING CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Dining Room"
        headline="The original<br /><em>frontispiece.</em><br />Untouched."
        body="The dining room's frontispiece -- the architectural centrepiece above the fireplace surround -- is original 1916 millwork. It was catalogued, protected, and preserved through the full gut renovation. Every other surface around it was rebuilt to meet it. The room seats twelve for dinner without effort."
        imgSrc={IMG_DINING}
        reverse={true}
      />

      {/* HISTORY TIMELINE */}
      <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 10rem)', background: '#070707' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, textAlign: 'left', display: 'block', marginBottom: '3rem' }}>The Provenance</span>
          </FadeIn>
          <TimelineItem year="1916" title="Walter Hines Page commissions Garren Hill" body="Publisher of Doubleday, Page & Co. U.S. Ambassador to Great Britain 1913-1918. Built by the Tufts craftsmen who built Pinehurst itself. Page died weeks after returning from London. He never lived here." />
          <TimelineItem year="1959" title="Betty Dumaine arrives. The estate becomes Hollycrest." body="Prominent Bostonian. She renamed the property for its native holly trees, brought horses, hounds, and peacocks. Shared her Vassar room with a girl who would become Queen of Thailand. Royalty visited. Her beloved horse Blue Fox is buried on the grounds beneath a 4-foot bronze." />
          <TimelineItem year="1980" title="Betty Dumaine bequeaths Hollycrest to Duke University." body="She died beloved. Duke could not sell. The tennis courts and pool were added in 1985 in preparation for a subdivision that never came." />
          <TimelineItem year="2001" title="The McAllister Restoration." body="Three years. Architect Thomas O'Shea of Durham. Contractor Dennis Dunagan. All plumbing and electrical replaced. Interior fully rebuilt around the surviving original fabric: seven mantels, original doors, the 1916 leaded glass, the dining room frontispiece. Nothing that mattered was touched." last={true} />
        </div>
      </div>

      {/* FULL BLEED -- REAR PORCH */}
      <FullBleed imgSrc={IMG_REAR} label="The rear terrace -- designed for gathering" height="52vw" maxH="640px" />

      {/* PRIMARY SUITE CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Primary Suite"
        headline="A balcony.<br /><em>A bath that takes</em><br />its time."
        body="The primary suite occupies the entire rear wing of the second floor. A private balcony overlooks the tennis courts and grounds below. The bath was fully rebuilt in 2001 -- substantial, unhurried, finished with Tennessee marble at the powder room vanity. The suite is quiet in the way that only old houses achieve."
        imgSrc={IMG_PRIMARY}
        reverse={true}
      />

      {/* FULL BLEED -- BATH */}
      <FullBleed imgSrc={IMG_BATH} label="The primary bath -- Tennessee marble, rebuilt 2001" height="55vw" maxH="660px" />

      {/* POOL CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Grounds"
        headline="20 x 40 pool.<br /><em>Two tennis courts.</em><br />Long-leaf pines."
        body="The grounds were planted deliberately. Three American plane trees -- sycamores -- put in by Betty Dumaine in 1959. Grandiflora magnolias, camellias, dogwoods, holly, azaleas. The brick terrace behind the dining room seats a large party al fresco. A children's playhouse -- the Wee Cottage -- sits at the edge of the property where the pines begin."
        imgSrc={IMG_POOL}
      />

      {/* FULL BLEED -- AERIAL / WIDE */}
      <FullBleed imgSrc={IMG_AERIAL} label="200 Hollycrest Drive -- Pinehurst, North Carolina" height="58vw" maxH="700px" position="center top" />

      {/* BLUE FOX SECTION */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>The Legend</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
            A horse named Blue Fox.<br /><em>A grave with a brass marker.</em><br />A 4-foot bronze statue.
          </h2>
          <div style={divider} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.1, opacity: 0.82, margin: '2rem 0' }}>
            Betty Dumaine's favourite horse died at Hollycrest and was buried on the grounds in a 10 x 16 foot slate-lined grave with a brass marker. Above it stands a 4-foot blue fox in bronze. Every year she hosted birthday parties for her horses. The children of the community were invited. She is remembered here with a specificity that money does not buy.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.48)', fontSize: '1rem', lineHeight: 1.88, margin: 0 }}>
            The grave remains on the property. The bronze still stands. The pines she planted are 65 years old.
          </p>
        </FadeIn>
      </div>

      {/* PORTICO FULL BLEED */}
      <FullBleed imgSrc={IMG_PORTICO} label="The columned portico -- original 1916" height="56vw" maxH="680px" />

      {/* MATTERPORT -- Walk the Floor Plan */}
      <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 12rem)', background: DARK, textAlign: 'center' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <FadeIn>
            <span style={eyebrow}>Walk the Floor Plan</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 1.5rem', letterSpacing: '-0.02em' }}>
              The rooms reveal<br /><em>how they connect.</em>
            </h2>
            <div style={divider} />
            <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2, opacity: 0.75, margin: '2rem auto', maxWidth: 600 }}>
              The Matterport tour does more than show the rooms -- it shows how they are laid out. The longitudinal plan. The two stair cores. The way the light moves through the house from the NE/SW orientation. Walk it before you walk through the door.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ marginTop: '3rem', borderRadius: 4, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 60px rgba(0,0,0,0.6)' }}>
              <iframe
                src="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&"
                width="100%"
                height="560"
                frameBorder="0"
                allow="xr-spatial-tracking"
                allowFullScreen
                style={{ display: 'block' }}
                title="Garren Hill -- 3D Floor Plan Tour"
              />
            </div>
            <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginTop: '1.2rem' }}>
              Use the dollhouse view to see the full floor plan layout
            </p>
          </FadeIn>
        </div>
      </div>

      {/* SPECS */}
      <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 12rem)', background: '#070707' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '3.5rem' }}>The Property</span>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
            {[
              { label: 'Year Built', value: '1916' },
              { label: 'Heated / Cooled', value: '6,700 SF' },
              { label: 'Bedrooms', value: '5' },
              { label: 'Bathrooms', value: '5' },
              { label: 'Fireplaces', value: '7 Original Mantels' },
              { label: 'Acreage', value: '4.15 Acres' },
              { label: 'Pool', value: '20 x 40 In-Ground' },
              { label: 'Tennis', value: '2 Courts' },
              { label: 'Basement', value: '4 Rooms, Climate-Controlled' },
              { label: 'Garage', value: '2-Car Attached' },
              { label: 'Water / Sewer', value: 'County + Private Well' },
              { label: 'Offered At', value: '$4,250,000' },
            ].map(item => (
              <FadeIn key={item.label}>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: '1.4rem' }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '0 0 0.6rem' }}>{item.label}</p>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.08rem', color: '#fff', margin: 0, lineHeight: 1.3 }}>{item.value}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* ANN'S QUOTE + CLOSE */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 780, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>On Leaving</span>
          <p style={{
            fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: 'clamp(1.3rem, 2.2vw, 2rem)',
            color: '#fff', lineHeight: 1.55, margin: '0 auto 2rem', maxWidth: 680,
          }}>
            &ldquo;We cannot think of a better place in the world to raise our family.
            We hope the next owners feel the same.&rdquo;
          </p>
          <div style={divider} />
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: '2rem 0 0' }}>
            The Current Stewards
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2, opacity: 0.7, marginTop: '3rem' }}>
            Garren Hill is ready.
          </p>
        </FadeIn>
      </div>

      {/* INQUIRE */}
      <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 10rem)', background: '#070707' }}>
        <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <span style={eyebrow}>Private Inquiries</span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#fff', lineHeight: 1.15, margin: '0 0 1rem', letterSpacing: '-0.02em' }}>
              Begin the<br /><em>conversation.</em>
            </h2>
            <div style={divider} />
          </FadeIn>
          <FadeIn delay={0.15}>
            {submitted ? (
              <div style={{ marginTop: '3rem' }}>
                <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.8 }}>Thank you. Rachel Hernandez will be in touch directly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.2rem', textAlign: 'left' }}>
                {[
                  { key: 'name', label: 'Full Name', type: 'text' },
                  { key: 'email', label: 'Email Address', type: 'email' },
                  { key: 'phone', label: 'Phone (optional)', type: 'tel' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', display: 'block', marginBottom: '0.5rem' }}>{f.label}</label>
                    <input
                      type={f.type}
                      value={form[f.key]}
                      onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                      required={f.key !== 'phone'}
                      style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, padding: '0.85rem 1rem', color: '#fff', fontSize: '0.95rem', fontFamily: 'Georgia, serif', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>
                ))}
                <div>
                  <label style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', display: 'block', marginBottom: '0.5rem' }}>Message</label>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, padding: '0.85rem 1rem', color: '#fff', fontSize: '0.95rem', fontFamily: 'Georgia, serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
                <button type="submit" style={{
                  padding: '1rem 2rem', background: 'rgba(201,169,110,0.12)',
                  border: `1px solid ${GOLD}`, color: GOLD,
                  fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase',
                  cursor: 'pointer', borderRadius: 1, marginTop: '0.5rem',
                }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 0.4rem' }}>Rachel Hernandez</p>
              <p style={{ fontFamily: 'Georgia, serif', color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', margin: 0 }}>rachelhernandezrealtor@gmail.com</p>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ padding: '2.5rem 4vw', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>Garren Hill -- 200 Hollycrest Drive, Pinehurst, NC</span>
        <span style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Rachel Hernandez Realty</span>
      </div>

      {/* INQUIRY MODAL */}
      {inquiryOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(8px)' }} onClick={() => setInquiryOpen(false)} />
          <div style={{ position: 'relative', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 4, padding: 'clamp(2rem, 5vw, 3.5rem)', width: '100%', maxWidth: 520 }}>
            <button onClick={() => setInquiryOpen(false)} style={{ position: 'absolute', top: '1.2rem', right: '1.4rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.4rem', cursor: 'pointer', lineHeight: 1 }}>x</button>
            <span style={{ ...eyebrow, marginBottom: '1.5rem' }}>Private Inquiry</span>
            {submitted ? (
              <p style={{ color: CREAM, lineHeight: 1.8 }}>Thank you. Rachel will be in touch directly.</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { key: 'name', label: 'Name', type: 'text' },
                  { key: 'email', label: 'Email', type: 'email' },
                  { key: 'phone', label: 'Phone', type: 'tel' },
                ].map(f => (
                  <input key={f.key} type={f.type} placeholder={f.label} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} required={f.key !== 'phone'}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', fontFamily: 'Georgia, serif', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
                ))}
                <textarea rows={3} placeholder="Message" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 2, padding: '0.8rem 1rem', color: '#fff', fontSize: '0.9rem', fontFamily: 'Georgia, serif', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }} />
                <button type="submit" style={{ padding: '0.9rem', background: 'rgba(201,169,110,0.12)', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 1 }}>
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
