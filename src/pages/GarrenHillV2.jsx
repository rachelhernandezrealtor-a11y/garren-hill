import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';
const GLASS = 'rgba(255,255,255,0.10)';
const GLASS_BORDER = 'rgba(255,255,255,0.25)';

// Old GH app base (396 categorized photos live here)
const GH = 'https://base44.app/api/apps/69e2578ca7113dbe93cb208d/files/mp/public/69e2578ca7113dbe93cb208d/';

const cdnExt = (id) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(GH + id)}`;
const cdnInt = (id) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(GH + id)}`;

// KEY PHOTOS -- best shot per section
const IMG_HERO       = cdnExt('68cfea3cf_FrontExterior.jpg');         // Front elevation, columned portico
const IMG_ARCH       = cdnExt('efbaf4e19_-HolycrestExtF-3370.jpg');   // Side / grounds wide
const IMG_SALON      = cdnInt('286e0697a_200Holycrest-1542.jpg');      // Living room / salon
const IMG_DINING     = cdnInt('7dbb52edc_200Holycrest-1308.jpg');      // Dining room
const IMG_KITCHEN    = cdnInt('025a9c5a7_200Holycrest-1680.jpg');      // Kitchen
const IMG_STAIRCASE  = cdnInt('7427e8d2e_200Holycrest-1698.jpg');      // Hallway / staircase
const IMG_FOYER      = cdnInt('02bb02e1e_200Holycrest-1689.jpg');      // Entry foyer
const IMG_PRIMARY    = cdnInt('5f1f8af66_200Holycrest-1545.jpg');      // Primary bedroom
const IMG_BATH       = cdnInt('0447409d0_200Holycrest-1563.jpg');      // Primary bath
const IMG_POWDER     = cdnInt('b57f79399_200HollycrestDrive-80.jpg');  // Powder room (Tennessee marble)
const IMG_POOL       = cdnExt('9dd5eed5d_-HolycrestExtF-3334.jpg');   // Pool classic shot
const IMG_POOL2      = cdnExt('57352d0a9_200HollycrestDrive-208.jpg'); // Pool with house
const IMG_GARDEN     = cdnExt('93480b070_200HollycrestDrive-190.jpg'); // Garden / grounds
const IMG_REAR       = cdnExt('d93c7facb_200Holycrest-1437.jpg');      // Rear terrace / porch

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

function FullBleed({ imgSrc, label, height = '55vw', maxH = '680px' }) {
  return (
    <div style={{ position: 'relative', height: `clamp(360px, ${height}, ${maxH})`, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${imgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.03)' }} />
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
          {['The Estate', 'The History', 'Inquire'].map(item => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); if (item === 'Inquire') setInquiryOpen(true); }}
              style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', textDecoration: 'none', cursor: 'pointer' }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${IMG_HERO})`,
          backgroundSize: 'cover', backgroundPosition: 'center top',
          transform: `scale(1.08) translateY(${scrollY * 0.25}px)`,
          transition: 'transform 0.08s linear',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.28) 0%, rgba(10,10,10,0.42) 50%, rgba(10,10,10,0.92) 100%)' }} />

        {/* Stats bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          background: 'rgba(8,8,8,0.82)', backdropFilter: 'blur(14px)',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          padding: '1.5rem 0',
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem',
        }}>
          {[
            { value: '1916', label: 'Year Built' },
            { value: '6,700', label: 'Sq Ft' },
            { value: '7', label: 'Fireplaces' },
            { value: '4.15', label: 'Acres' },
            { value: '$4,250,000', label: 'Offered At' },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.09)', margin: '0 clamp(0.8rem, 2.5vw, 2.5rem)' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(1.2rem, 1.8vw, 1.8rem)', color: '#fff' }}>{s.value}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Hero copy */}
        <div style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(3rem, 7vw, 6rem) clamp(3rem, 7vw, 6rem) 9.5rem' }}>
          <FadeIn delay={0.1}>
            <span style={{ ...eyebrow, marginBottom: '1.2rem' }}>Pinehurst, North Carolina -- Est. 1916</span>
            <h1 style={{
              fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
              color: '#fff', lineHeight: 1.05,
              margin: '0 0 2.2rem', letterSpacing: '-0.03em', maxWidth: 820,
            }}>
              Garren Hill.<br /><em>A century of</em><br />belonging.
            </h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setInquiryOpen(true)} style={{
                padding: '0.9rem 2.4rem',
                background: 'rgba(201,169,110,0.15)',
                border: `1px solid ${GOLD}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 0 20px rgba(201,169,110,0.08)',
                color: GOLD, fontFamily: 'sans-serif', fontSize: '10px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: 1,
              }}>
                Inquire
              </button>
              <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" rel="noreferrer" style={{
                padding: '0.9rem 2.4rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.75)', fontFamily: 'sans-serif', fontSize: '10px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 1, display: 'inline-flex', alignItems: 'center',
              }}>
                Virtual Tour
              </a>
            </div>
          </FadeIn>
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
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.05, opacity: 0.85, margin: '2.2rem 0' }}>
            In 1913, Walter Hines Page -- co-founder of Doubleday, Page &amp; Co., confidant to presidents, and soon-to-be U.S. Ambassador to the Court of St. James -- purchased a thousand-acre farm two miles southwest of Pinehurst and commissioned a Boston architect to design a two-story Georgian brick manor. He named it Garran Hill, after his family's deep Moore County roots. He planned to grow peaches. He planned to come home.
          </p>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.05, opacity: 0.85, margin: '0 0 2.2rem' }}>
            Instead, Woodrow Wilson called. Page sailed for London, served through the entirety of World War I, and gave what remained of his health to the Allied cause. He never fully occupied the house he built.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.5)', fontSize: '1.05rem', lineHeight: 1.85, margin: 0 }}>
            In a vestibule of Westminster Abbey stands a sculpture bearing the inscription: "The friend of Britain in her sorest need." Garren Hill is the house he was always trying to come back to.
          </p>
        </FadeIn>
      </div>

      {/* ARCHITECTURE CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Architecture"
        headline="Neo-Georgian.<br /><em>Unchanged in all</em><br />the ways that matter."
        body="Designed by a Boston architectural firm and built by Leonard Tufts' own craftsmen. The structure is longitudinal brick construction, one room deep, with a wing at each end -- a silhouette that has not changed since 1916. The NE/SW orientation was deliberate: the back of the house floods with natural light from morning through afternoon."
        imgSrc={IMG_ARCH}
        position="center top"
      />

      {/* BETTY DUMAINE QUOTE */}
      <PullQuote
        quote="She had shared a room at Vassar with a girl who became the Queen of Thailand. Hollycrest hosted the royal personage on several occasions."
        attribution="Betty Dumaine -- Owner 1959 to 1980"
      />

      {/* SALON CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Living Room"
        headline="Nearly forty feet<br /><em>of room.</em>"
        body="The salon runs nearly forty feet. Tall windows parade down both sides. One end anchored by a fireplace; the other by a view of the camellia garden that the current owners planted knowing exactly how it would look through those windows. The original oak flooring is still here. Master carpenter David Prest rebuilt the Georgian woodwork from scratch: paneling, crown moldings, chair rails. The bones are 1916. The eye is not."
        imgSrc={IMG_SALON}
        reverse={true}
      />

      {/* NUMBERS GRID */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 8rem)', background: '#060606' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '2.5rem' }}>By the Numbers</span>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { n: '5', label: 'Bedrooms' },
              { n: '5', label: 'Bathrooms' },
              { n: '7', label: 'Fireplaces' },
              { n: '4.15', label: 'Acres' },
              { n: '6,700', label: 'Sq Ft Heated' },
              { n: '1916', label: 'Year Built' },
              { n: '3 Yrs', label: 'Restoration' },
              { n: '110+', label: 'Years of History' },
            ].map(item => (
              <FadeIn key={item.label}>
                <div style={{ padding: '2.5rem 1rem', background: '#060606', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(1.8rem, 2.2vw, 2.6rem)', color: '#fff' }}>{item.n}</div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.36)', marginTop: '0.45rem' }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* DINING CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Dining Room"
        headline="The frontispiece<br /><em>was not touched.</em>"
        body="The original frontispiece in the dining room was preserved through the entire 1999 restoration -- stripped back to itself, left exactly as it was. The room was designed for the kind of dinner parties that last past midnight. It still is."
        imgSrc={IMG_DINING}
      />

      {/* RESTORATION */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>The Restoration</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem' }}>
            Three years.<br /><em>Every pipe. Every wire.</em><br />Every original key.
          </h2>
          <div style={divider} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85, margin: '2.2rem 0' }}>
            In 1998, the current stewards commissioned Durham architect Thomas O'Shea to recreate the original drawings from scratch. General contractor Dennis Dunagan led a three-year full restoration -- interior completely gutted, all plumbing and electrical replaced, new joists, every Marvin window custom-made to profile. An interior designer's eye was in every decision. The wallpaper. The hardware. The way the light falls through a doorway. If you know, you know.
          </p>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85 }}>
            What was kept is the point: the leaded glass sidelights and over-door fan at the front entry. The seven fireplace mantels. The original oak flooring. The solid-wood interior doors with their original brass key plates -- and their original keys.
          </p>
        </FadeIn>
      </div>

      {/* STAIRCASE FULL BLEED */}
      <FullBleed imgSrc={IMG_STAIRCASE} label="The Staircase -- Narrow. Dramatic. Original." height="60vw" maxH="720px" />

      {/* KITCHEN CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Kitchen"
        headline="Created entirely<br /><em>from scratch.</em>"
        body="There was no kitchen in the original house. The current stewards designed it from nothing -- opening it to sweeping views of the magnolias and the grounds. New heart-pine flooring continues the thread. The room knows where it is."
        imgSrc={IMG_KITCHEN}
        reverse={true}
      />

      {/* POWDER ROOM CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Powder Room"
        headline="Tennessee marble.<br /><em>Polished brass.</em><br />1916 hardware."
        body="A Tennessee marble vanity. Original polished brass hinges and doorknobs. The kind of powder room that stops a guest mid-sentence. The kind of detail that reveals who put this house together."
        imgSrc={IMG_POWDER}
      />

      {/* GROUNDS CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Grounds"
        headline="4.15 acres.<br /><em>The Wee Cottage</em><br />arrived by sky crane."
        body="Betty Dumaine planted three American sycamores in 1959. They are still here. The camellia garden. Grandiflora magnolias. A brick terrace designed for dining al fresco -- accessible from both the dining room and the living room. A 20-by-40-foot pool. Two tennis courts. And tucked in the corner: the Wee Cottage, a fully furnished guest retreat that was transported to the property by sky crane and set on its own foundation."
        imgSrc={IMG_REAR}
        reverse={true}
      />

      {/* POOL FULL BLEED */}
      <FullBleed imgSrc={IMG_POOL} label="The Pool -- 20 x 40 ft" height="58vw" maxH="700px" />

      {/* CENTURY TIMELINE */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem)', background: '#060606' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '3.5rem' }}>A Century of Stewards</span>
          </FadeIn>
          <TimelineItem
            year="1916"
            title="Walter Hines Page"
            body="U.S. Ambassador to the Court of St. James. Co-founder of Doubleday, Page & Co. He helped put Woodrow Wilson in the White House. He commissioned this house for himself. He never lived here -- he gave the rest of his health to the Allied cause and died weeks after returning from London."
          />
          <TimelineItem
            year="1918"
            title="The Page Family"
            body="Walter's son Ralph moved the family in after his father's death. The house stayed in the Page family through World War II -- quietly outlasting the men who shaped it."
          />
          <TimelineItem
            year="1959"
            title="Betty Dumaine"
            body="Prominent Bostonian. Horses, hounds, and peacocks kept as guard birds. Her Vassar roommate became the Queen of Thailand -- the royal entourage visited. She threw birthday parties for her horses and invited the neighborhood children. Her favorite horse, Blue Fox, is buried on the grounds beneath a slate marker and a four-foot bronze statue."
          />
          <TimelineItem
            year="1980"
            title="Duke University"
            body="Betty left the estate to Duke on her death. Duke advertised in Atlanta and New York. The tennis courts and pool were added in 1985. Still no buyers."
          />
          <TimelineItem
            year="1999"
            title="The Restoration"
            body="The current stewards purchased the property and spent three years restoring it completely. An interior designer's hand is in every finish, every fabric, every door. The Georgian bones, preserved. The twenty-first century, installed."
          />
          <TimelineItem
            year="Now"
            title="The Next Chapter"
            body="The house is ready."
            last={true}
          />
        </div>
      </div>

      {/* PRIMARY SUITE CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Primary Suite"
        headline="Light from<br /><em>three directions.</em>"
        body="The NE/SW orientation the Boston architect specified in 1916 still delivers. The back of the house is wall-to-wall windows. A balcony off two of the second-floor bedrooms overlooks the tennis courts and the rear grounds. The narrow spiral staircase connects the floors with quiet drama. Below, the stone-walled basement holds a climate-controlled wine room -- the same quiet logic throughout: everything considered."
        imgSrc={IMG_PRIMARY}
        reverse={true}
      />

      {/* PRIMARY BATH FULL BLEED */}
      <FullBleed imgSrc={IMG_BATH} label="The Primary Bath" height="55vw" maxH="660px" />

      {/* FEATURE CARDS */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 8rem)', background: DARK }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(255px, 1fr))', gap: '1.5rem' }}>
          {[
            {
              label: 'Recognition',
              title: 'Historic Designation',
              body: 'One of the distinctly historical homes in southern Moore County. Virginia Historic Foundation recognized. 110 years of documented ownership and continuous stewardship.',
            },
            {
              label: 'Infrastructure',
              title: 'County Water, Sewer + Private Well',
              body: '250-gallon underground propane. In-ground well and storage tank serving the pool and irrigation. 7 fireplaces with propane gas logs. All systems rebuilt during the 1999 restoration.',
            },
            {
              label: 'Entertaining',
              title: 'Built for Gatherings',
              body: 'Over 25 years as a private venue: English Speaking Union, Pi Beta Phi, Phi Beta Kappa, DAR, the Folio Club of Durham, wedding celebrations. The house knows how to hold a crowd.',
            },
            {
              label: 'Below Grade',
              title: 'Four-Room Stone Basement',
              body: 'Stone-walled basement under half the house. Partially finished, climate-controlled. Wine rack, storage, interior and exterior access. The house has more room than it shows.',
            },
          ].map(card => (
            <FadeIn key={card.title}>
              <div style={{ background: GLASS, border: `1px solid ${GLASS_BORDER}`, padding: '2.5rem 2rem' }}>
                <span style={{ ...eyebrow, marginBottom: '0.9rem' }}>{card.label}</span>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.02rem', color: '#fff', margin: '0 0 0.9rem', lineHeight: 1.3 }}>{card.title}</p>
                <p style={{ color: CREAM, fontSize: '0.9rem', lineHeight: 1.95, opacity: 0.72, margin: 0 }}>{card.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* FOYER CINEMATIC */}
      <CinematicReveal
        eyebrowText="The Entry"
        headline="The leaded glass<br /><em>has been here</em><br />since 1916."
        body="The leaded glass sidelights and over-door fan at the front entry are original. The frontispiece in the dining room is original. The solid-wood interior doors with their original brass key plates are original. Some things survive a restoration because they are worth surviving."
        imgSrc={IMG_FOYER}
      />

      {/* LOCATION */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>The Location</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem' }}>
            Pinehurst ETJ.<br /><em>Moore County tax rate.</em><br />All the prestige.
          </h2>
          <div style={divider} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85, margin: '2.2rem 0' }}>
            200 Hollycrest Drive sits within the Pinehurst ETJ -- the extraterritorial jurisdiction. The address carries the prestige and proximity of Pinehurst village. The tax rate is Moore County. It is a rare and meaningful distinction.
          </p>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85, margin: 0 }}>
            Two miles from the village. Walking distance to the Pinehurst Harness Track. Three golf courses within five minutes. The resort, the restaurants, the village -- all of it close enough to matter.
          </p>
        </FadeIn>
      </div>

      {/* MATTERPORT */}
      <div style={{ background: '#060606', padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 8rem)' }}>
        <FadeIn>
          <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '2rem' }}>Tour the Estate</span>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.07)' }}>
            <iframe
              src="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allowFullScreen allow="xr-spatial-tracking"
              title="Garren Hill Virtual Tour"
            />
          </div>
        </FadeIn>
      </div>

      {/* GARDEN FULL BLEED */}
      <FullBleed imgSrc={IMG_GARDEN} label="The Grounds -- Long-leaf pines. Camellias. Sycamores planted in 1959." height="50vw" maxH="600px" />

      {/* CLOSING QUOTE */}
      <PullQuote
        quote="This house needs three or four kids running around."
        attribution="The current steward -- after 25 years of preservation"
      />

      {/* CLOSING CTA */}
      <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 10vw, 14rem)', textAlign: 'center', background: DARK }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#fff', margin: '0 0 2.5rem', lineHeight: 1.08 }}>
            Garren Hill is ready.
          </h2>
          <div style={divider} />
          <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '2.5rem 0 3rem' }}>
            200 Hollycrest Drive -- Pinehurst, NC 28374 -- $4,250,000
          </p>
          <button onClick={() => setInquiryOpen(true)} style={{
            padding: '1.1rem 3.2rem',
            background: 'rgba(201,169,110,0.15)',
            border: `1px solid ${GOLD}`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
            color: GOLD, fontFamily: 'sans-serif', fontSize: '10px',
            letterSpacing: '0.32em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: 1,
          }}>
            Begin a Conversation
          </button>
        </FadeIn>
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '1.8rem 4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#050505' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.88rem', color: 'rgba(255,255,255,0.25)' }}>Garren Hill</span>
        <span style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)' }}>Rachel Hernandez -- Listing Agent</span>
      </div>

      {/* INQUIRY MODAL */}
      {inquiryOpen && (
        <div onClick={() => setInquiryOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            position: 'relative',
            background: '#0f0f0f', border: '1px solid rgba(255,255,255,0.1)',
            maxWidth: 480, width: '100%', padding: 'clamp(2rem, 5vw, 3.5rem)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.5rem', color: '#fff', margin: '0 0 1rem' }}>Thank you.</p>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', margin: 0, lineHeight: 1.7 }}>We will be in touch shortly.</p>
              </div>
            ) : (
              <>
                <span style={{ ...eyebrow, marginBottom: '0.4rem' }}>Inquire</span>
                <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.5rem', color: '#fff', margin: '0 0 2rem' }}>Garren Hill</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { key: 'name', placeholder: 'Full Name', type: 'text', required: true },
                    { key: 'email', placeholder: 'Email Address', type: 'email', required: true },
                    { key: 'phone', placeholder: 'Phone (optional)', type: 'tel', required: false },
                  ].map(f => (
                    <input key={f.key} type={f.type} placeholder={f.placeholder} required={f.required}
                      value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.85rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', borderRadius: 1, width: '100%', boxSizing: 'border-box' }}
                    />
                  ))}
                  <textarea placeholder="Message (optional)" rows={4}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.85rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', resize: 'vertical', borderRadius: 1, width: '100%', boxSizing: 'border-box' }}
                  />
                  <button type="submit" style={{
                    padding: '1rem', background: GOLD, border: 'none',
                    color: '#0a0a0a', fontFamily: 'sans-serif', fontSize: '10px',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    cursor: 'pointer', marginTop: '0.5rem', borderRadius: 1,
                  }}>
                    Send Inquiry
                  </button>
                </form>
              </>
            )}
            <button onClick={() => setInquiryOpen(false)} style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.35)', fontSize: '1.1rem', cursor: 'pointer', lineHeight: 1 }}>x</button>
          </div>
        </div>
      )}
    </div>
  );
}
