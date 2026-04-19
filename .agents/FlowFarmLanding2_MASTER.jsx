import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const VIDEO = 'https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4';
const MATTERPORT = 'https://my.matterport.com/show/?m=xZRfSiQPuQ8';

// Cloudflare Image Delivery -- /w=2400 for retina quality
const cf = id => `https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/${id}/w=2400`;

const IMG = {
  exterior:      'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds:       'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  aerial:        'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  tunnel:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop:      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  cabana:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  living:        cf('717eeff1-f98e-4bd6-0ef6-66ed1c054200'),
  living2:       cf('6c90dba3-97de-4654-ccba-a70677a7a300'),
  kitchen:       cf('88c2e1c1-04db-4193-745d-8bec90459b00'),
  conservatory:  cf('6d2ef33c-35eb-4b90-5c6d-fe3d37fea900'),
  conservatory2: cf('1abfcd89-c693-4c59-0c1f-0aa35ab1e100'),
  foyer:         cf('ada10c6f-d704-40ce-10e5-58d25e101200'),
  dining:        cf('53360e16-7ba3-4bae-ef62-721a86fdbd00'),
};

// ============================================================
// RESPONSIVE HOOK
// ============================================================
function useW() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

// ============================================================
// FADE ON SCROLL
// ============================================================
function useFade() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); o.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}

function Fade({ children, delay, up, style }) {
  const [ref, on] = useFade();
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'none' : (up ? 'translateY(36px)' : 'translateY(20px)'),
      transition: `opacity 1.6s ease ${delay || 0}s, transform 1.6s ease ${delay || 0}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// Frosted glass panel
function Glass({ children, style }) {
  return (
    <div style={{
      background: 'rgba(8,8,8,0.58)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.07)',
      ...style,
    }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, center }) {
  return (
    <p style={{
      fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em',
      textTransform: 'uppercase', color: GOLD, margin: 0,
      textAlign: center ? 'center' : 'left',
    }}>{children}</p>
  );
}

function GoldLine() {
  return <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.35 }} />;
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const w = useW();
  const mob = w < 768;
  const [p, setP] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setP(1), 200),
      setTimeout(() => setP(2), 1200),
      setTimeout(() => setP(3), 2400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  const show = n => ({
    opacity: p >= n ? 1 : 0,
    transform: p >= n ? 'none' : 'translateY(22px)',
    transition: 'opacity 2.2s ease, transform 2.2s ease',
  });

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: mob ? 600 : 700, overflow: 'hidden', background: '#000' }}>
      <video autoPlay loop muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.80 }}>
        <source src={VIDEO} type="video/mp4" />
      </video>

      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.5) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 30%, transparent 50%, rgba(0,0,0,0.94) 100%)' }} />

      {/* wordmark center top */}
      <div style={{ position: 'absolute', top: mob ? '1.8rem' : '2.6rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...show(1) }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', margin: 0 }}>
          Flow Farm
        </p>
      </div>

      {/* nav -- hidden on mobile */}
      {!mob && (
        <nav style={{ position: 'absolute', top: '2.4rem', right: '3rem', zIndex: 10, display: 'flex', gap: '2.8rem', ...show(1) }}>
          {['The Estate', 'The Land', 'Inquire'].map(n => (
            <a key={n} href={'#' + n.toLowerCase().replace(' ', '-')}
              style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none' }}>
              {n}
            </a>
          ))}
        </nav>
      )}

      {/* center headline */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: mob ? '0 6vw' : '0 10vw' }}>
        <div style={show(2)}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 1.6rem' : '0 0 2rem' }}>
            The Architectural Masterpiece
          </p>
          <h1 style={{
            color: '#fff',
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            fontSize: mob ? '2.8rem' : w < 1024 ? '4.6rem' : '6.2rem',
            lineHeight: 1.06,
            margin: 0,
            letterSpacing: '-0.02em',
            textShadow: '0 4px 80px rgba(0,0,0,0.6)',
          }}>
            The House That<br /><em>Quietly Steals</em><br />the Whole Show.
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: mob ? '1.6rem' : '2.2rem' }}>
          <p style={{
            color: 'rgba(255,255,255,0.38)',
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            fontSize: mob ? '0.95rem' : '1.1rem',
            margin: mob ? '0 0 2rem' : '0 0 2.6rem',
            letterSpacing: '0.01em',
            lineHeight: 1.7,
          }}>
            Architect-designed, materially rich, and impossible<br />to confuse with ordinary luxury.
          </p>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${GOLD}, transparent)`, margin: '0 auto', opacity: 0.6 }} />
        </div>
      </div>

      {/* bottom bar */}
      <div style={{
        position: 'absolute',
        bottom: mob ? '2rem' : '3rem',
        left: mob ? '1.5rem' : '3rem',
        right: mob ? '1.5rem' : '3rem',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        ...show(3),
      }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'sans-serif', fontSize: mob ? '9px' : '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>107 Linden Trail, Aberdeen NC</p>
          <p style={{ color: 'rgba(255,255,255,0.14)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>15 Acres &mdash; 6 Structures &mdash; $5,250,000</p>
        </div>
        {!mob && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)', animation: 'sc 2.4s ease-in-out infinite' }} />
          </div>
        )}
      </div>
      <style>{`@keyframes sc{0%,100%{opacity:0.06}50%{opacity:0.55}}`}</style>
    </section>
  );
}

// ============================================================
// MANIFESTO
// ============================================================
function Manifesto() {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '8rem 0' : '18rem 0', textAlign: 'center' }}>
      <Fade up>
        <div style={{ maxWidth: 820, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mob ? '2.4rem' : '3rem' }}>
          <Eyebrow center>107 Linden Trail &mdash; Aberdeen, North Carolina</Eyebrow>
          <h2 style={{
            color: CREAM,
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            fontSize: mob ? '2rem' : w < 1024 ? '2.6rem' : '3.2rem',
            lineHeight: 1.3,
            margin: 0,
            letterSpacing: '-0.018em',
          }}>
            Not just a home.<br />
            A living system built for those<br />
            who intend to leave something behind.
          </h2>
          <GoldLine />
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.15rem', lineHeight: 2.1, margin: 0, maxWidth: 580 }}>
            Fifteen acres of forest and working farmland three miles from Pinehurst Resort.
            Designed by Robert E. Clark AIA as one of his final private commissions.
            Built to operate indefinitely, independently, and beautifully.
          </p>
          <a href={MATTERPORT} target="_blank" rel="noreferrer"
            style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: `1px solid rgba(201,169,110,0.28)`, paddingBottom: '0.3rem' }}>
            Begin the Virtual Tour
          </a>
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// CINEMATIC -- full bleed photo with glass card or centered quote
// ============================================================
function CinematicReveal({ src, eyebrow, headline, body, align, quote, position }) {
  const w = useW();
  const mob = w < 768;

  return (
    <section style={{ position: 'relative', minHeight: mob ? '80vh' : '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img
        src={src}
        alt=""
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: position || 'center',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: quote
        ? 'rgba(0,0,0,0.42)'
        : align === 'right'
          ? 'linear-gradient(to left, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)'
          : 'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.1) 100%)'
      }} />

      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 6vw' : '10rem 6vw', display: 'flex', justifyContent: quote ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Fade delay={0.1}>
          {quote ? (
            <div style={{ maxWidth: mob ? '100%' : 700, textAlign: 'center' }}>
              <p style={{
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
                fontSize: mob ? '1.6rem' : w < 1024 ? '2.2rem' : '3rem',
                lineHeight: 1.35,
                margin: 0,
                textShadow: '0 2px 40px rgba(0,0,0,0.7)',
                letterSpacing: '-0.01em',
              }}>
                &ldquo;{headline}&rdquo;
              </p>
            </div>
          ) : (
            <Glass style={{ padding: mob ? '2.5rem 2rem' : '3.5rem 4rem', maxWidth: mob ? '100%' : 520 }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {eyebrow && <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.35, margin: '1.4rem 0' }} />}
              <h2 style={{
                color: CREAM,
                fontFamily: 'Georgia, serif',
                fontWeight: 400,
                fontSize: mob ? '1.7rem' : '2.5rem',
                lineHeight: 1.22,
                margin: '0 0 1.6rem',
                letterSpacing: '-0.015em',
                whiteSpace: 'pre-line',
              }}>
                {headline}
              </h2>
              {body && <p style={{ color: 'rgba(255,255,255,0.44)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.95rem' : '1rem', lineHeight: 2, margin: 0 }}>{body}</p>}
            </Glass>
          )}
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// NUMBERS
// ============================================================
function Numbers() {
  const w = useW();
  const mob = w < 768;
  const cols = mob ? 2 : 3;

  const stats = [
    ['15', 'Total Acres'],
    ['8,519', 'Sq Ft Above Grade'],
    ['6 / 7', 'Beds / Baths'],
    ['7', 'Buildable Acres'],
    ['6', 'Structures'],
    ['3 mi', 'To Pinehurst'],
    ['14.3kW', 'Solar Array'],
    ['1,200A', 'Total Power'],
    ['$5.25M', 'Offered At'],
  ];

  return (
    <section style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '13rem 0' }}>
      <Fade>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 5rem' : '0 0 6rem', textAlign: 'center' }}>
          By The Numbers
        </p>
      </Fade>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        maxWidth: 1020,
        margin: '0 auto',
        padding: '0 5vw',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        borderLeft: '1px solid rgba(255,255,255,0.05)',
      }}>
        {stats.map(([v, l], i) => (
          <Fade key={l} delay={i * 0.05}>
            <div style={{
              textAlign: 'center',
              padding: mob ? '3rem 1rem' : '4rem 1rem',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
            }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '2.8rem', fontWeight: 400, margin: '0 0 0.7rem', letterSpacing: '-0.03em' }}>{v}</p>
              <p style={{ color: 'rgba(255,255,255,0.16)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>{l}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// THE MECHANISM
// ============================================================
function Mechanism() {
  const w = useW();
  const mob = w < 768;
  const tab = w < 1024;

  const cols = [
    { label: 'Energy',     items: ['14.3kW Solar -- 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane', '1,200 Amp Total Power'] },
    { label: 'Climate',    items: ['Geothermal -- 20 Wells x 300 Ft', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification Per Zone', 'Zone-Independent Control'] },
    { label: 'Water',      items: ['Private Well -- Up to 50 GPM', '2 x 1,500 Gal Private Septic', 'Whole-House Water Filtration', 'Whole-House Fire Sprinkler', 'Walk-In Cooler 12 x 8 Ft'] },
    { label: 'Smart Home', items: ['Control4 Audio, Video, Lighting', 'Araknis Enterprise Network', 'Whole Campus Wi-Fi', 'Brown Safe + Vault Door', 'Dual Central Vacuum'] },
  ];

  return (
    <section style={{ position: 'relative', background: DARK, padding: mob ? '8rem 0' : '16rem 0', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.aerial})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05, zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: mob ? '5rem' : '8rem', padding: '0 6vw' }}>
            <Eyebrow center>The Mechanism</Eyebrow>
            <h2 style={{
              color: CREAM,
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              fontSize: mob ? '2rem' : '3.2rem',
              lineHeight: 1.28,
              margin: '2rem 0 2.4rem',
              letterSpacing: '-0.018em',
            }}>
              Structure that holds<br /><em>freedom.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, maxWidth: 520, margin: '0 auto' }}>
              Operating with commercial-grade gravity. Solar, battery, generator, geothermal,
              private water. Autonomy at this scale is not inherited. It is engineered.
            </p>
          </div>
        </Fade>
        <div style={{
          display: 'grid',
          gridTemplateColumns: mob ? '1fr' : tab ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 5vw',
          gap: '2rem',
        }}>
          {cols.map((col, i) => (
            <Fade key={col.label} delay={i * 0.1}>
              <Glass style={{ padding: mob ? '2.5rem 2rem' : '3rem 2.5rem' }}>
                <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 1.8rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {col.label}
                </p>
                {col.items.map(item => (
                  <p key={item} style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'Georgia, serif', fontSize: '0.94rem', lineHeight: 2, margin: '0 0 0.4rem' }}>{item}</p>
                ))}
              </Glass>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// THE LAND
// ============================================================
function Land() {
  const w = useW();
  const mob = w < 768;

  const structures = [
    { src: IMG.cabana,   label: 'Cabana House',           body: 'A private guest retreat. One bed, full bath, full kitchen, private entrance. The estate within the estate.' },
    { src: IMG.tunnel,   label: 'High Tunnel Greenhouse', body: '96 by 36 feet. Geothermal climate control. Pineapples, avocados, citrus. Year-round, every year.' },
    { src: IMG.workshop, label: 'Farm Workshop',          body: '30 by 40 feet. Plumbing, electrical, walk-in cooler. Built to run a real operation, not just the idea of one.' },
  ];

  return (
    <section id="the-land" style={{ background: '#0c0c0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.4rem', marginBottom: mob ? '6rem' : '10rem', padding: '0 6vw', textAlign: 'center' }}>
          <Eyebrow center>The Land</Eyebrow>
          <h2 style={{
            color: CREAM,
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            fontSize: mob ? '2rem' : '3.2rem',
            lineHeight: 1.28,
            margin: 0,
            letterSpacing: '-0.018em',
          }}>
            Three acres producing.<br />Seven acres waiting.
          </h2>
          <GoldLine />
          <p style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, maxWidth: 540, margin: 0 }}>
            USDA-certified veganic. O2Compost regenerative systems.
            Biochar production. 1,400-ft double deer fence.
            A farm already running -- and seven raw acres ready for whatever comes next.
          </p>
        </div>
      </Fade>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 5vw',
        gap: mob ? '3rem' : '3.5rem',
      }}>
        {structures.map((s, i) => (
          <Fade key={s.label} delay={i * 0.18}>
            <div>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img
                  src={s.src}
                  alt={s.label}
                  style={{ width: '100%', aspectRatio: mob ? '4/3' : '2/3', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 1.8rem' }}>
                  <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.2rem', margin: 0, letterSpacing: '-0.01em' }}>{s.label}</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: '0.98rem', lineHeight: 2, margin: '1.8rem 0 0' }}>{s.body}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// LOCATION
// ============================================================
function Location() {
  const w = useW();
  const mob = w < 768;

  return (
    <section id="the-estate" style={{ background: DARK, padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 5vw',
        gap: mob ? '5rem' : '8rem',
        alignItems: 'center',
      }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>Location</Eyebrow>
            <GoldLine />
            <h2 style={{
              color: CREAM,
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              fontSize: mob ? '1.9rem' : '2.6rem',
              lineHeight: 1.24,
              margin: 0,
              letterSpacing: '-0.015em',
            }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2, margin: 0 }}>
              Three miles from Pinehurst Resort. A transferable Pinehurst Country Club
              Signature Golf Membership -- unlimited access to Course No. 7 and No. 9 --
              is included with the sale.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              {[
                'Pinehurst Resort -- 3 Miles',
                'Moore County Regional -- Private Aviation',
                'Raleigh-Durham International -- 1 Hour',
                'FirstHealth Moore Regional Hospital',
                'Pinehurst CC Membership Included',
              ].map(item => (
                <p key={item} style={{ color: 'rgba(255,255,255,0.16)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.17em', textTransform: 'uppercase', margin: 0, paddingLeft: '1rem', borderLeft: `1px solid rgba(201,169,110,0.25)` }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ position: 'relative' }}>
            <img src={IMG.aerial} alt="Aerial" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
            <Glass style={{ position: 'absolute', bottom: mob ? '-1rem' : '-1.8rem', left: mob ? '-0.5rem' : '-1.8rem', padding: '1.5rem 2.2rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', margin: '0 0 0.45rem' }}>Exclusively Offered At</p>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.5rem', margin: 0, letterSpacing: '-0.02em' }}>$5,250,000</p>
            </Glass>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// INQUIRE
// ============================================================
function Inquire() {
  const w = useW();
  const mob = w < 768;
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const inp = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    color: CREAM,
    fontFamily: 'Georgia, serif',
    fontSize: '1rem',
    padding: '1rem 0',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  };

  return (
    <section id="inquire" style={{ background: '#0c0c0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.4rem', marginBottom: mob ? '5rem' : '7rem', padding: '0 6vw', textAlign: 'center' }}>
          <Eyebrow center>Private Inquiry</Eyebrow>
          <h2 style={{
            color: CREAM,
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            fontSize: mob ? '2rem' : '3.2rem',
            margin: 0,
            letterSpacing: '-0.018em',
          }}>
            Request a Private Showing
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', margin: 0 }}>
            Exclusively represented by Rachel Hernandez
          </p>
        </div>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', textAlign: 'center', padding: '0 6vw' }}>
            Thank you. We will be in touch shortly.
          </p>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); setSent(true); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', maxWidth: 500, margin: '0 auto', padding: '0 6vw', width: '100%', boxSizing: 'border-box' }}
          >
            <input name="name" value={form.name} onChange={set} placeholder="Your Name" required style={inp} />
            <input name="email" value={form.email} onChange={set} type="email" placeholder="Email Address" required style={inp} />
            <input name="phone" value={form.phone} onChange={set} type="tel" placeholder="Phone (optional)" style={inp} />
            <textarea name="message" value={form.message} onChange={set} placeholder="Tell us about your interest" rows={4} style={{ ...inp, resize: 'none' }} />
            <button type="submit" style={{
              marginTop: '1rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.38)',
              fontFamily: 'sans-serif',
              fontSize: '10px',
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              padding: '1.4rem 3.5rem',
              cursor: 'pointer',
              alignSelf: 'flex-start',
              transition: 'border-color 0.3s, color 0.3s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD; }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = 'rgba(255,255,255,0.38)'; }}
            >
              Request Showing
            </button>
          </form>
        )}
      </Fade>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  const w = useW();
  const mob = w < 768;
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(255,255,255,0.04)',
      padding: mob ? '3.5rem 6vw' : '4.5rem 5vw',
      display: 'flex',
      flexDirection: mob ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: mob ? 'flex-start' : 'center',
      gap: '2rem',
    }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'Georgia, serif', fontSize: '1rem', letterSpacing: '0.06em', margin: '0 0 0.4rem' }}>Flow Farm</p>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.25rem' }}>107 Linden Trail, Aberdeen NC</p>
        <p style={{ color: 'rgba(255,255,255,0.07)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>Exclusively Offered at $5,250,000</p>
      </div>
      <div style={{ textAlign: mob ? 'left' : 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'Georgia, serif', fontSize: '0.9rem', margin: '0 0 0.4rem', letterSpacing: '0.04em' }}>Rachel Hernandez</p>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.14em', margin: '0 0 0.25rem' }}>rachelhernandezrealtor@gmail.com</p>
        <p style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>Exclusively Represented</p>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Hero />
      <Manifesto />
      <CinematicReveal
        src={IMG.living}
        eyebrow="The Residence"
        headline={"A grand living room.\n27 feet wide. 17 feet tall."}
        body="Reclaimed Civil War-era heart pine floors. Seven fireplaces. Six bedrooms, seven bathrooms. 8,519 square feet above grade. Designed by Robert E. Clark AIA -- built to outlast everything around it."
        position="center center"
      />
      <Numbers />
      <CinematicReveal
        src={IMG.conservatory}
        eyebrow="The Conservatory"
        headline={"Glass on every side.\nAn octagonal dome overhead."}
        body="19.5 by 17.7 feet, entirely glass-wrapped with a skylight dome that tracks the sky from morning to dusk. The room that reminds you why you came here."
        align="right"
        position="center 40%"
      />
      <CinematicReveal
        src={IMG.grounds}
        headline={"Autonomy at this scale is not inherited. It is engineered."}
        quote
        position="center 60%"
      />
      <CinematicReveal
        src={IMG.kitchen}
        eyebrow="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the serious cook."}
        body="A 60-inch dual fuel Wolf range. Six burners, griddle, grill, warming drawer. Two KitchenAid dishwashers. Sub-Zero throughout. The pantry opens to a breakfast room that looks across the farm."
        position="center 30%"
      />
      <Land />
      <Mechanism />
      <CinematicReveal
        src={IMG.foyer}
        eyebrow="The Welcome"
        headline={"Every arrival\nshould feel like this."}
        body="The central hall vista runs the full depth of the house. Heart pine floors, original millwork, and a staircase that earns every eye that finds it."
        align="right"
        position="center top"
      />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
