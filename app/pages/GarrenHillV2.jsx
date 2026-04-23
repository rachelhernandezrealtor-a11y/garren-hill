import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const GH = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';
const BASE = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';

const cdnExt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;
const cdnInt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;

// HERO -- portico, circular drive, arrival shot
const IMG_HERO    = cdnExt(GH + 'fa8cec793_200HollycrestDrive-191.jpg');
// EXTERIORS
const IMG_ARCH    = cdnExt(BASE + '5c9dadfb8_gh_200HollycrestDrive-28.jpg');
const IMG_SIDE    = cdnExt(BASE + 'ff295318a_gh_200HollycrestDrive-8.jpg');
const IMG_POOL    = cdnExt(GH + '57352d0a9_200HollycrestDrive-208.jpg');
const IMG_REAR    = cdnExt(GH + '17d8dd539_200HollycrestDrive-132.jpg');
// INTERIORS
const IMG_FOYER   = cdnInt(GH + '082d9b5c7_200Holycrest-1182.jpg');
const IMG_SALON   = cdnInt(GH + '341c7343c_200Holycrest-1203.jpg');
const IMG_FIRE    = cdnInt(GH + '5f5f87315_200HollycrestDrive-65fire.jpg');
const IMG_DINING  = cdnInt(GH + 'e926f8fdd_200Holycrest-1296.jpg');
const IMG_PRIMARY = cdnInt(GH + '4046f0d74_200HollycrestDrive-95.jpg');

const eyebrow = {
  fontFamily: 'sans-serif',
  fontSize: '10px',
  letterSpacing: '0.36em',
  textTransform: 'uppercase',
  color: GOLD,
  display: 'block',
  marginBottom: '1.2rem',
};

const dividerStyle = {
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
          ? 'linear-gradient(to left, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.12) 100%)'
          : 'linear-gradient(to right, rgba(10,10,10,0.92) 40%, rgba(10,10,10,0.12) 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        width: 'min(52%, 560px)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(2.5rem, 5vw, 5rem)',
        marginLeft: reverse ? 'auto' : 0,
      }}>
        <FadeIn>
          <span style={eyebrow}>{eyebrowText}</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
            color: '#fff', lineHeight: 1.18,
            margin: '0 0 1.6rem', letterSpacing: '-0.01em',
          }} dangerouslySetInnerHTML={{ __html: headline }} />
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.45, margin: '0 0 1.6rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 2, margin: 0, opacity: 0.86, fontFamily: 'Georgia, serif' }}>{body}</p>
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
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic',
          fontSize: 'clamp(1.6rem, 3vw, 2.8rem)',
          color: '#fff', lineHeight: 1.45,
          margin: '0 auto 2.5rem', maxWidth: 860,
          fontWeight: 300,
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
    <div style={{ position: 'relative', height: `clamp(340px, ${height}, ${maxH})`, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: position, transform: 'scale(1.03)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.18)' }} />
      {label && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem 3vw', background: 'linear-gradient(to top, rgba(10,10,10,0.65) 0%, transparent 100%)' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: 0 }}>{label}</p>
        </div>
      )}
    </div>
  );
}

function VideoEmbed({ src, title = 'Garran Hill' }) {
  return (
    <div style={{ position: 'relative', background: '#000', overflow: 'hidden' }}>
      <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
        <iframe
          src={src}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
        />
      </div>
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
        <div style={{ flex: 1, borderLeft: `1px solid rgba(201,169,110,0.2)`, paddingLeft: '2rem', paddingTop: '0.1rem' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.02rem', color: '#fff', margin: '0 0 0.45rem', lineHeight: 1.3 }}>{title}</p>
          <p style={{ color: CREAM, fontSize: '0.93rem', lineHeight: 1.9, opacity: 0.7, margin: 0 }}>{body}</p>
        </div>
      </div>
    </FadeIn>
  );
}

export default function GarranHillV2() {
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
        body: JSON.stringify({ ...form, property: 'Garran Hill', source: 'Landing Page' }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  // Ken Burns parallax for hero
  const heroBgY = Math.min(scrollY * 0.35, 120);

  return (
    <div style={{ background: DARK, color: CREAM, fontFamily: 'Georgia, serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '1.3rem 4vw',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 60 ? 'rgba(8,8,8,0.94)' : 'transparent',
        backdropFilter: scrollY > 60 ? 'blur(14px)' : 'none',
        borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,0.06)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.05rem', color: GOLD, letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 400 }}>
          Garran Hill
        </span>
        <div style={{ display: 'flex', gap: 'clamp(1.2rem, 3vw, 2.8rem)', alignItems: 'center' }}>
          {['The Estate', 'The History', 'Inquire'].map(l => (
            <a key={l} href={l === 'Inquire' ? '#inquire' : '#'} onClick={l === 'Inquire' ? (e) => { e.preventDefault(); setInquiryOpen(true); } : undefined}
              style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.62)', textDecoration: 'none' }}>
              {l}
            </a>
          ))}
          <button onClick={() => setInquiryOpen(true)} style={{
            padding: '0.6rem 1.5rem',
            border: `1px solid ${GOLD}`,
            background: 'transparent', color: GOLD,
            fontFamily: 'sans-serif', fontSize: '9px',
            letterSpacing: '0.24em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: 1,
          }}>
            Private Inquiry
          </button>
        </div>
      </nav>

      {/* ============================================================
          HERO -- portico arrival, Ken Burns slow push
      ============================================================ */}
      <div style={{ position: 'relative', height: '100vh', minHeight: 680, overflow: 'hidden' }}>
        {/* Background -- portico photo with Ken Burns */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: `url(${IMG_HERO})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(1.08) translateY(${heroBgY * 0.4}px)`,
          transition: 'transform 0.05s linear',
          animation: 'kenBurns 22s ease-out forwards',
        }} />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.18) 45%, rgba(10,10,10,0.72) 100%)',
        }} />

        {/* Hero content -- centered */}
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          textAlign: 'center', padding: '0 clamp(1.5rem, 6vw, 6rem)',
          paddingTop: '5rem',
        }}>
          {/* Property address eyebrow */}
          <FadeIn delay={0.1}>
            <span style={{ ...eyebrow, textAlign: 'center', marginBottom: '1.8rem' }}>
              200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC 28374
            </span>
          </FadeIn>

          {/* Estate name -- Cormorant Garamond masthead */}
          <FadeIn delay={0.25}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: 'clamp(3.8rem, 9vw, 9rem)',
              color: 'rgba(255,255,255,0.88)',
              lineHeight: 0.95,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              margin: '0 0 1.4rem',
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}>
              Garran Hill
            </h1>
          </FadeIn>

          {/* Gold rule */}
          <FadeIn delay={0.35}>
            <div style={{ width: 60, height: 1, background: GOLD, opacity: 0.7, margin: '0 auto 1.6rem' }} />
          </FadeIn>

          {/* Headline */}
          <FadeIn delay={0.4}>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300,
              fontSize: 'clamp(1.1rem, 2.2vw, 1.9rem)',
              color: 'rgba(245,240,232,0.84)',
              lineHeight: 1.55,
              margin: '0 0 2.6rem',
              maxWidth: 620,
            }}>
              Built in 1916. Still the finest house in Moore County.
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.55}>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => setInquiryOpen(true)} style={{
                padding: '0.95rem 2.8rem',
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
                padding: '0.95rem 2.8rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.2)',
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

        {/* STATS BAR -- pinned bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          background: 'rgba(8,8,8,0.80)', backdropFilter: 'blur(16px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '1.4rem 0',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          flexWrap: 'wrap', gap: 0,
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
                  fontSize: 'clamp(1.3rem, 2vw, 2rem)', color: '#fff', lineHeight: 1, marginBottom: '0.4rem',
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

      {/* ============================================================
          MANIFESTO
      ============================================================ */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={{ ...eyebrow, textAlign: 'center' }}>The Property</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400,
            fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)', color: '#fff', lineHeight: 1.15,
            margin: '0 0 2rem', letterSpacing: '-0.01em',
          }}>
            Some houses hold history.<br /><em>This one shaped it.</em>
          </h2>
          <div style={dividerStyle} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.85, margin: '2.2rem 0' }}>
            In 1913, Walter Hines Page -- publisher, kingmaker, and the man Woodrow Wilson appointed U.S. Ambassador to the Court of St. James -- bought land two miles southwest of Pinehurst and commissioned a Georgian manor from a Boston firm. He named it Garran Hill. He planned to come home.
          </p>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.85, margin: '0 0 2.2rem' }}>
            The war came instead. Page spent four years in London arguing, cajoling, and eventually exhausting himself in service of the Allied cause. He sailed home in 1918. He died within weeks. He never walked through the door of the house built for him.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.95, margin: 0 }}>
            In a vestibule of Westminster Abbey, a bronze memorial bears the inscription:
            "The friend of Britain in her sorest need." The house he never occupied still stands.
            It has been cared for ever since by people who understood what they had.
          </p>
        </FadeIn>
      </div>

      {/* ============================================================
          ARCHITECTURE CINEMATIC
      ============================================================ */}
      <CinematicReveal
        eyebrowText="The Architecture"
        headline="Neo-Georgian.<br /><em>Unchanged in all the</em><br />ways that matter."
        body="Designed by a Boston architectural firm. Built by Leonard Tufts' own craftsmen -- the same men who built Pinehurst. Longitudinal brick construction, one room deep, a wing at each end. A columned portico. A circular drive. The NE/SW orientation floods the back of the house with natural light from first sun to last."
        imgSrc={IMG_ARCH}
      />

      {/* ============================================================
          SIDE ELEVATION FULL BLEED
      ============================================================ */}
      <FullBleed imgSrc={IMG_SIDE} label="200 Hollycrest Drive -- 4.15 acres" height="52vw" maxH="660px" position="center top" />

      {/* ============================================================
          ENTRY CINEMATIC
      ============================================================ */}
      <CinematicReveal
        eyebrowText="The Entry"
        headline="Original leaded glass.<br /><em>Original solid doors.</em><br />Original brass keys."
        body="The front entry has not been touched since 1916 -- leaded glass sidelights, the over-door fanlight, solid-wood interior doors with their original brass key plates and the original keys to match. Nothing performed. Everything considered."
        imgSrc={IMG_FOYER}
        reverse={true}
        position="center"
      />

      {/* ============================================================
          WESTMINSTER ABBEY PULL QUOTE
      ============================================================ */}
      <PullQuote
        quote="The friend of Britain in her sorest need."
        attribution="Westminster Abbey -- memorial to Walter Hines Page, U.S. Ambassador 1913-1918"
      />

      {/* ============================================================
          LIVING ROOM CINEMATIC
      ============================================================ */}
      <CinematicReveal
        eyebrowText="The Living Room"
        headline="Seven fireplaces.<br /><em>One room that earns</em><br />all of them."
        body="The salon runs the full depth of the house. Custom crown moldings, raised-panel wainscoting, and a carved mantel by master carpenter David Prest. Original wide-plank oak floors throughout. The room was designed for entertaining at scale. It still is."
        imgSrc={IMG_SALON}
      />

      {/* ============================================================
          FIREPLACE FULL BLEED -- video moment lives here
      ============================================================ */}
      <FullBleed imgSrc={IMG_FIRE} label="One of seven original carved mantels -- circa 1916" height="60vw" maxH="720px" />

      {/* ============================================================
          DINING ROOM CINEMATIC
      ============================================================ */}
      <CinematicReveal
        eyebrowText="The Dining Room"
        headline="The original<br /><em>frontispiece.</em><br />Untouched."
        body="The dining room's frontispiece -- the architectural centrepiece above the fireplace surround -- is original 1916 millwork. Catalogued, protected, preserved through the full gut renovation. Every surface around it was rebuilt to meet it. The room seats twelve without effort."
        imgSrc={IMG_DINING}
        reverse={true}
      />

      {/* ============================================================
          HISTORY TIMELINE
      ============================================================ */}
      <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 8vw, 10rem)', background: '#070707' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, display: 'block', marginBottom: '3rem' }}>The Provenance</span>
          </FadeIn>
          <TimelineItem
            year="1916"
            title="Walter Hines Page commissions Garran Hill"
            body="Publisher of Doubleday, Page & Co. U.S. Ambassador to Great Britain 1913-1918. Built by the same Tufts craftsmen who built Pinehurst. Page sailed home in 1918, worn through. He died within weeks. He never lived here."
          />
          <TimelineItem
            year="1959"
            title="Betty Dumaine arrives. The estate becomes Hollycrest."
            body="Prominent Bostonian. She renamed the property for its native holly trees, brought horses, hounds, and peacocks. Shared her Vassar room with a girl who would become Queen of Thailand. Royalty visited. Her beloved horse Blue Fox is buried on the grounds beneath a 4-foot bronze statue."
          />
          <TimelineItem
            year="1980"
            title="Betty Dumaine bequeaths Hollycrest to Duke University."
            body="Duke could not sell. Tennis courts and pool added in 1985 in preparation for a subdivision that never came."
          />
          <TimelineItem
            year="2001"
            title="The McAllister Restoration."
            body="Three years. Architect Thomas O'Shea of Durham. All plumbing and electrical replaced. Interior fully rebuilt around the surviving original fabric: seven mantels, original doors, the 1916 leaded glass, the dining room frontispiece. Nothing that mattered was touched."
            last
          />
        </div>
      </div>

      {/* ============================================================
          PRIMARY BEDROOM CINEMATIC
      ============================================================ */}
      <CinematicReveal
        eyebrowText="The Primary Suite"
        headline="A room that faces<br /><em>the morning light.</em>"
        body="The primary suite sits on the NE corner of the second floor, oriented deliberately to catch the first light of day. Balcony access to the rear grounds. The suite was fully renovated in 2001 and reflects the same discipline that defines the rest of the house -- nothing showy, nothing careless."
        imgSrc={IMG_PRIMARY}
      />

      {/* ============================================================
          POOL + GROUNDS FULL BLEED
      ============================================================ */}
      <FullBleed imgSrc={IMG_POOL} label="20 x 40 pool -- camellia garden -- American sycamores planted 1959" height="55vw" maxH="680px" />

      {/* ============================================================
          ANN'S PULL QUOTE
      ============================================================ */}
      <PullQuote
        quote="We wanted whoever came next to feel it -- to feel that it had been loved."
        attribution="Ann McAllister -- steward, 1998-present"
      />

      {/* ============================================================
          GROUNDS + LEGACY SECTION
      ============================================================ */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={{ ...eyebrow, textAlign: 'center' }}>The Grounds</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400,
            fontSize: 'clamp(2rem, 3.4vw, 3.2rem)', color: '#fff', lineHeight: 1.18,
            margin: '0 0 2rem',
          }}>
            4.15 acres that have<br /><em>never been subdivided.</em>
          </h2>
          <div style={dividerStyle} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.85, margin: '2rem 0' }}>
            Long-leaf pines. Three American sycamores planted by Betty Dumaine in 1959. A camellia garden. Grandiflora magnolias, dogwoods, holly trees, azaleas, iris. A children's playhouse called The Wee Cottage. A brick terrace behind the house that seats a large group al fresco, accessible from both the dining room and the living room.
          </p>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.1, opacity: 0.85, margin: 0 }}>
            The 20x40 pool was added in 1985. The two tennis courts remain. County water, county sewer, a private well and storage tank for irrigation and pool. A 250-gallon underground propane tank. The infrastructure of a property that has always been run properly.
          </p>
        </FadeIn>
      </div>

      {/* ============================================================
          REAR PORCH / TERRACE FULL BLEED
      ============================================================ */}
      <FullBleed imgSrc={IMG_REAR} label="Brick terrace -- accessible from dining room and living room" height="52vw" maxH="640px" />

      {/* ============================================================
          MATTERPORT TOUR SECTION
      ============================================================ */}
      <div style={{ background: '#050505', padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 8vw, 8rem)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '1.2rem' }}>Walk Every Room</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400,
              fontSize: 'clamp(2rem, 3vw, 3rem)', color: '#fff', textAlign: 'center',
              margin: '0 0 3rem', lineHeight: 1.2,
            }}>
              The full floor plan,<br /><em>at your own pace.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 2 }}>
              <iframe
                src="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&"
                title="Garran Hill 3D Tour"
                allowFullScreen
                allow="xr-spatial-tracking"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* ============================================================
          INQUIRE SECTION
      ============================================================ */}
      <div id="inquire" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 12rem)', background: '#070707', textAlign: 'center' }}>
        <FadeIn>
          <span style={{ ...eyebrow, textAlign: 'center' }}>Private Inquiry</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400,
            fontSize: 'clamp(2rem, 3.5vw, 3.4rem)', color: '#fff', margin: '0 0 1rem', lineHeight: 1.18,
          }}>
            Garran Hill is ready.
          </h2>
          <div style={dividerStyle} />
          <p style={{ color: CREAM, opacity: 0.7, fontSize: '1rem', lineHeight: 1.95, maxWidth: 520, margin: '2rem auto 3.5rem', fontStyle: 'italic' }}>
            The current stewards have maintained this property for over two decades with the intention of passing it to someone who will care for it as they have.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <div style={{ maxWidth: 540, margin: '0 auto' }}>
            {submitted ? (
              <p style={{ color: GOLD, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', fontStyle: 'italic' }}>
                Thank you. We will be in touch.
              </p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { key: 'name', placeholder: 'Full Name', type: 'text' },
                  { key: 'email', placeholder: 'Email Address', type: 'email' },
                  { key: 'phone', placeholder: 'Phone (optional)', type: 'tel' },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    required={key !== 'phone'}
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      color: CREAM, padding: '1rem 1.4rem',
                      fontFamily: 'Georgia, serif', fontSize: '0.95rem',
                      outline: 'none', borderRadius: 1,
                    }}
                  />
                ))}
                <textarea
                  placeholder="Tell us about yourself and your interest in the property."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={4}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: CREAM, padding: '1rem 1.4rem',
                    fontFamily: 'Georgia, serif', fontSize: '0.95rem',
                    outline: 'none', resize: 'vertical', borderRadius: 1,
                  }}
                />
                <button type="submit" style={{
                  padding: '1.1rem',
                  background: 'rgba(201,169,110,0.15)',
                  border: `1px solid ${GOLD}`,
                  color: GOLD, fontFamily: 'sans-serif', fontSize: '10px',
                  letterSpacing: '0.3em', textTransform: 'uppercase',
                  cursor: 'pointer', borderRadius: 1, marginTop: '0.5rem',
                }}>
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </FadeIn>
      </div>

      {/* ============================================================
          FOOTER
      ============================================================ */}
      <footer style={{
        background: '#030303', padding: '3rem 4vw',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem', color: GOLD, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
          Garran Hill
        </span>
        <span style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; Est. 1916
        </span>
        <span style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)' }}>
          Rachel Hernandez &nbsp;&bull;&nbsp; rachelhernandezrealtor@gmail.com
        </span>
      </footer>

      {/* ============================================================
          INQUIRY MODAL
      ============================================================ */}
      {inquiryOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '2rem',
        }} onClick={() => setInquiryOpen(false)}>
          <div style={{
            background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.1)',
            padding: 'clamp(2.5rem, 5vw, 4rem)', maxWidth: 480, width: '100%',
            borderRadius: 2,
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: '2rem', color: '#fff', margin: '0 0 0.5rem' }}>
              Private Inquiry
            </h3>
            <p style={{ color: CREAM, opacity: 0.55, fontSize: '0.88rem', margin: '0 0 2rem', lineHeight: 1.7 }}>
              Garran Hill is offered by private introduction.
            </p>
            {submitted ? (
              <p style={{ color: GOLD, fontStyle: 'italic', fontSize: '1.1rem' }}>Thank you. We will be in touch.</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {[
                  { key: 'name', placeholder: 'Full Name', type: 'text' },
                  { key: 'email', placeholder: 'Email', type: 'email' },
                  { key: 'phone', placeholder: 'Phone (optional)', type: 'tel' },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    placeholder={placeholder}
                    value={form[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    required={key !== 'phone'}
                    style={{
                      background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                      color: CREAM, padding: '0.85rem 1.2rem',
                      fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', borderRadius: 1,
                    }}
                  />
                ))}
                <textarea
                  placeholder="Your interest in the property..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  rows={3}
                  style={{
                    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    color: CREAM, padding: '0.85rem 1.2rem',
                    fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', resize: 'vertical', borderRadius: 1,
                  }}
                />
                <button type="submit" style={{
                  padding: '1rem',
                  background: 'rgba(201,169,110,0.15)', border: `1px solid ${GOLD}`,
                  color: GOLD, fontFamily: 'sans-serif', fontSize: '9px',
                  letterSpacing: '0.28em', textTransform: 'uppercase',
                  cursor: 'pointer', borderRadius: 1, marginTop: '0.4rem',
                }}>
                  Submit
                </button>
              </form>
            )}
            <button onClick={() => setInquiryOpen(false)} style={{
              position: 'absolute', top: '1.2rem', right: '1.4rem',
              background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)',
              fontSize: '1.2rem', cursor: 'pointer',
            }}>x</button>
          </div>
        </div>
      )}

      {/* Ken Burns keyframe animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
        @keyframes kenBurns {
          from { transform: scale(1.08) translateY(0px); }
          to   { transform: scale(1.0) translateY(0px); }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.28); }
      `}</style>
    </div>
  );
}
