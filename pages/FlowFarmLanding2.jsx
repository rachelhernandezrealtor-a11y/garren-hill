import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const VIDEO = 'https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4';
const MATTERPORT = 'https://my.matterport.com/show/?m=xZRfSiQPuQ8';

const B = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';
const CLOUD = 'dghn2xpif';
const cdn = (url, w = 1400) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/f_auto,q_auto,w_' + w + ',c_limit/' + encodeURIComponent(url);

const IMG = {
  // Hero shots -- real professional photos
  living:        B + '4db7d0477_livingroom.jpg',
  conservatory:  B + '8cb2578a0_MONEYSHOT.jpg',
  kitchen:       B + '1c4b8a04f_SOGOODKITCHEN.jpg',
  dining:        B + 'db01725cb_sogoodtolivingroom.jpg',
  spabath:       B + '08da5b97d_spaprimarybath.jpg',
  foyer:         B + '9b1d02a04_260115107LindenTrailF-9727.jpg',
  powderroom:    B + '4e58028ab_260115107LindenTrailF-9769-2.jpg',
  wolf:          B + 'ef4b4a364_WOLFDOUBLEGASRANGE.jpg',
  office:        B + '2b920c3b0_markofficemoneyshot.jpg',
  hallway:       B + '8e3d794f9_secondfloorhallway.jpg',
  // Grounds / aerial
  aerial:        'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  grounds:       'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  exterior:      'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  // Structures
  cabana:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  tunnel:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop:      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
};

function useW() {
  const [w, setW] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setW(window.innerWidth);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);
  return w;
}

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

function Glass({ children, style }) {
  return (
    <div style={{
      background: 'rgba(8,8,8,0.62)',
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

      <div style={{ position: 'absolute', top: mob ? '1.8rem' : '2.6rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...show(1) }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', margin: 0 }}>
          Flow Farm
        </p>
      </div>

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

      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: mob ? '0 6vw' : '0 10vw' }}>
        <div style={show(2)}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 1.6rem' : '0 0 2rem' }}>
            The Architectural Masterpiece
          </p>
          <h1 style={{
            color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: mob ? '2.8rem' : w < 1024 ? '4.6rem' : '6.2rem',
            lineHeight: 1.06, margin: 0, letterSpacing: '-0.02em',
            textShadow: '0 4px 80px rgba(0,0,0,0.6)',
          }}>
            Agritourism Established.<br /><em>Legacy Ready.</em>
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: mob ? '1.6rem' : '2.2rem' }}>
          <p style={{
            color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: mob ? '0.95rem' : '1.1rem', margin: mob ? '0 0 2rem' : '0 0 2.6rem',
            letterSpacing: '0.01em', lineHeight: 1.7,
          }}>
            A rare convergence of land, architecture, and infrastructure.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: mob ? '0 0 2rem' : '0 0 2.6rem', gap: 0 }}>
            {[
              { num: '15', label1: 'USDA', label2: 'ACRES' },
              { num: '7', label1: 'BUILDABLE', label2: 'ACRES' },
              { num: '3', label1: 'ACRE VEGANIC', label2: 'FARM' },
              { num: '3', label1: 'MI TO', label2: 'PINEHURST' },
              { num: '$5.25M', label1: 'OFFERED', label2: 'AT' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
                {i > 0 && <div style={{ width: '1px', background: 'rgba(255,255,255,0.25)', margin: mob ? '0 1.2rem' : '0 2rem', alignSelf: 'stretch' }} />}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '2.8rem', fontWeight: 400, lineHeight: 1, marginBottom: '0.4rem' }}>{s.num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', fontSize: mob ? '7px' : '8px', letterSpacing: '0.18em', textTransform: 'uppercase', lineHeight: 1.5 }}>{s.label1}<br />{s.label2}</div>
                </div>
              </div>
            ))}
          </div>
          <a href="#inquire" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(201,169,110,0.45)', color: GOLD, fontFamily: 'sans-serif', fontSize: mob ? '9px' : '10px', letterSpacing: '0.28em', textTransform: 'uppercase', padding: mob ? '0.85rem 2rem' : '1rem 2.6rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>
            Enter Flow Farm
          </a>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: mob ? '2rem' : '3rem', left: mob ? '1.5rem' : '3rem', right: mob ? '1.5rem' : '3rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', ...show(3) }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'sans-serif', fontSize: mob ? '9px' : '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>107 Linden Trail, Aberdeen NC</p>
          <p style={{ color: 'rgba(255,255,255,0.14)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>15 Acres &mdash; 6 Structures &mdash; $5,250,000</p>
        </div>
        {!mob && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
            <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)' }} />
          </div>
        )}
      </div>
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
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : w < 1024 ? '2.6rem' : '3.2rem', lineHeight: 1.3, margin: 0, letterSpacing: '-0.018em' }}>
            Not just a home.<br />A living system built for those<br />who intend to leave something behind.
          </h2>
          <GoldLine />
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.15rem', lineHeight: 2.1, margin: 0, maxWidth: 580 }}>
            Fifteen acres of forest and working farmland three miles from Pinehurst Resort.
            Designed by Robert E. Clark AIA as one of his final private commissions.
            Built to operate indefinitely, independently, and beautifully.
          </p>
          <a href={MATTERPORT} target="_blank" rel="noreferrer"
            style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.28)', paddingBottom: '0.3rem' }}>
            Begin the Virtual Tour
          </a>
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// FOUNDATION
// ============================================================
function Foundation() {
  const w = useW();
  const mob = w < 768;
  return (
    <section id="the-estate" style={{ background: '#0c0c0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 6vw', gap: mob ? '5rem' : '8rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>The Estate</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.018em' }}>
              A Foundation for<br />What Comes Next.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2.1, margin: 0 }}>
              A living estate rooted in sustainability, elevated by state-of-the-art
              infrastructure and refined luxury. Designed by Robert E. Clark AIA of Pinehurst
              -- one of his final and most personal works.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2.1, margin: 0 }}>
              Reclaimed Civil War-era heart pine floors, custom-laid in artisan patterns
              throughout every bedroom, hallway, and closet. A glass conservatory with
              octagonal skylight dome. Six structures across fifteen curated acres.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
              <a href={MATTERPORT} target="_blank" rel="noreferrer"
                style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.28)', paddingBottom: '0.3rem' }}>
                Virtual Tour
              </a>
              <a href="#inquire"
                style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem' }}>
                Private Inquiry
              </a>
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ position: 'relative' }}>
            <img src={cdn(IMG.grounds)} alt="Flow Farm Estate" style={{ width: '100%', height: mob ? 340 : 560, objectFit: 'cover', display: 'block' }} />
            <Glass style={{ position: 'absolute', bottom: mob ? -20 : -28, left: mob ? -10 : -28, padding: '1.4rem 2rem' }}>
              <p style={{ margin: '0 0 0.3rem', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Architect</p>
              <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '1rem', color: CREAM }}>Robert E. Clark AIA</p>
              <p style={{ margin: '0.2rem 0 0', fontFamily: 'sans-serif', fontSize: '9px', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>Pinehurst, NC</p>
            </Glass>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// CINEMATIC
// ============================================================
function CinematicReveal({ src, eyebrow, headline, body, align, quote, position }) {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ position: 'relative', minHeight: mob ? '80vh' : '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position || 'center', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: quote
        ? 'rgba(0,0,0,0.48)'
        : align === 'right'
          ? 'linear-gradient(to left, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)'
          : 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)'
      }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 6vw' : '10rem 6vw', display: 'flex', justifyContent: quote ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Fade delay={0.1}>
          {quote ? (
            <div style={{ maxWidth: mob ? '100%' : 700, textAlign: 'center' }}>
              <p style={{ color: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '1.6rem' : w < 1024 ? '2.2rem' : '3rem', lineHeight: 1.35, margin: 0, textShadow: '0 2px 40px rgba(0,0,0,0.7)', letterSpacing: '-0.01em' }}>
                &ldquo;{headline}&rdquo;
              </p>
            </div>
          ) : (
            <Glass style={{ padding: mob ? '2.5rem 2rem' : '3.5rem 4rem', maxWidth: mob ? '100%' : 520 }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {eyebrow && <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.35, margin: '1.4rem 0' }} />}
              <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.7rem' : '2.5rem', lineHeight: 1.22, margin: '0 0 1.6rem', letterSpacing: '-0.015em', whiteSpace: 'pre-line' }}>
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
  const cols = mob ? 2 : 4;
  const stats = [
    ['15', 'Acres'],
    ['8,519', 'Sq Ft Main Residence'],
    ['6 / 7', 'Beds / Baths'],
    ['$5.25M', 'Offered At'],
    ['6', 'Structures'],
    ['1,200', 'Amps Total Power'],
    ['14.3kW', 'Solar Array'],
    ['3 mi', 'To Pinehurst Resort'],
  ];
  return (
    <section style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '13rem 0' }}>
      <Fade>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 5rem' : '0 0 6rem', textAlign: 'center' }}>
          By The Numbers
        </p>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 1020, margin: '0 auto', padding: '0 5vw', borderTop: '1px solid rgba(255,255,255,0.05)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        {stats.map(([v, l], i) => (
          <Fade key={l} delay={i * 0.05}>
            <div style={{ textAlign: 'center', padding: mob ? '3rem 1rem' : '4rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
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
// MECHANISM
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
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${cdn(IMG.aerial)})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.05, zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: mob ? '5rem' : '8rem', padding: '0 6vw' }}>
            <Eyebrow center>The Mechanism</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3.2rem', lineHeight: 1.28, margin: '2rem 0 2.4rem', letterSpacing: '-0.018em' }}>
              Structure that holds<br /><em>freedom.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, maxWidth: 520, margin: '0 auto' }}>
              Solar, battery, generator, geothermal, private water.
              Autonomy at this scale is not inherited. It is engineered.
            </p>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : tab ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: '2rem' }}>
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
    { src: IMG.cabana,   label: 'Cabana House',           detail: '1 Bed | 1 Bath | Full Kitchen | Private Entrance', body: 'A private guest retreat with the feel of a boutique inn. Direct access to the grounds, full kitchen, and a private entrance that keeps guests comfortable and independent.' },
    { src: IMG.tunnel,   label: 'High Tunnel Greenhouse', detail: '96 x 36 Ft | Geothermal Climate Control',          body: 'Year-round production at commercial scale. Pineapples, avocados, citrus. Climate-controlled by the same geothermal system that heats and cools the main residence.' },
    { src: IMG.workshop, label: 'Farm Workshop',          detail: '30 x 40 Ft | Plumbing | Electrical | Walk-In Cooler', body: 'Built to run a real operation. Plumbing, electrical, and a 12 by 8 foot walk-in cooler. This is the infrastructure behind the idea.' },
  ];
  return (
    <section id="the-land" style={{ background: '#0c0c0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.4rem', marginBottom: mob ? '6rem' : '10rem', padding: '0 6vw', textAlign: 'center' }}>
          <Eyebrow center>The Land</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3.2rem', lineHeight: 1.28, margin: 0, letterSpacing: '-0.018em' }}>
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
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: mob ? '3rem' : '3.5rem' }}>
        {structures.map((s, i) => (
          <Fade key={s.label} delay={i * 0.18}>
            <div>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={s.src} alt={s.label} style={{ width: '100%', aspectRatio: mob ? '4/3' : '2/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.8rem' }}>
                  <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.15rem', margin: '0 0 0.4rem', letterSpacing: '-0.01em' }}>{s.label}</p>
                  <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{s.detail}</p>
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
    <section style={{ background: DARK, padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: mob ? '5rem' : '8rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>Location</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.9rem' : '2.6rem', lineHeight: 1.24, margin: 0, letterSpacing: '-0.015em' }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2, margin: 0 }}>
              Three miles from Pinehurst Resort. A transferable Pinehurst Country Club
              Signature Golf Membership -- unlimited access to Course No. 7 and No. 9 --
              is included with the sale.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              {['Pinehurst Resort -- 3 Miles', 'Moore County Regional -- Private Aviation', 'Raleigh-Durham International -- 1 Hour', 'FirstHealth Moore Regional Hospital', 'Pinehurst CC Membership Included'].map(item => (
                <p key={item} style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ display: 'inline-block', width: 20, height: 1, background: GOLD, opacity: 0.4, flexShrink: 0 }} />
                  {item}
                </p>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <img src={cdn(IMG.aerial)} alt="Aerial view of Flow Farm" style={{ width: '100%', height: mob ? 320 : 560, objectFit: 'cover', display: 'block' }} />
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
  const submit = e => { e.preventDefault(); setSent(true); };
  const inp = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '1rem 0', width: '100%', outline: 'none' };
  return (
    <section id="inquire" style={{ background: '#0c0c0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        <Fade up>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.6rem' }}>
            <Eyebrow center>Private Inquiry</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '2.8rem', lineHeight: 1.2, margin: 0, letterSpacing: '-0.018em' }}>
              Begin the Conversation.
            </h2>
            <GoldLine />
            <p style={{ color: 'rgba(255,255,255,0.24)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 2, margin: 0 }}>
              This property is shown by private appointment only.
              All inquiries are handled with full discretion.
            </p>
          </div>
        </Fade>
        {sent ? (
          <Fade><p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem', textAlign: 'center', lineHeight: 1.9 }}>Thank you. We will be in touch shortly.</p></Fade>
        ) : (
          <Fade style={{ width: '100%' }}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
              <input style={inp} placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <input style={inp} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input style={inp} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <textarea style={{ ...inp, resize: 'none', height: 100 }} placeholder="Your message (optional)" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              <button type="submit" style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: '1.2rem 3rem', cursor: 'pointer', alignSelf: 'center', marginTop: '1rem' }}>
                Submit Inquiry
              </button>
            </form>
          </Fade>
        )}
      </div>
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
    <footer style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.05)', padding: mob ? '4rem 6vw' : '5rem 6vw' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'center', gap: '2rem' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'Georgia, serif', fontSize: '0.85rem', margin: '0 0 0.4rem', letterSpacing: '0.12em' }}>Flow Farm</p>
          <p style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>107 Linden Trail, Aberdeen, NC</p>
        </div>
        <div style={{ textAlign: mob ? 'left' : 'right' }}>
          <p style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Offered at $5,250,000</p>
          <p style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Rachel Hernandez &mdash; rachelhernandezrealtor@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// PAGE
// ============================================================
// v2
export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Hero />
      <Manifesto />
      <Foundation />
      <CinematicReveal
        src={cdn(IMG.living)}
        eyebrow="The Residence"
        headline={"A grand living room.\n27 feet wide. 17 feet tall."}
        body="Exposed king post trusses. Grand piano. Heart pine floors. French doors to the covered porch. And beyond -- the conservatory, the kitchen, the farm. All of it visible from where you stand."
        position="center 35%"
      />
      <Numbers />
      <CinematicReveal
        src={cdn(IMG.conservatory)}
        eyebrow="The Conservatory"
        headline={"The room that stops\nevery conversation."}
        body="19.5 by 17.7 feet, entirely glass-wrapped. An octagonal dome overhead tracks the sky from morning to dusk. Views of the farm, the cabana, the pines. The room that reminds you why you came here."
        align="right"
        position="center center"
      />
      <CinematicReveal
        src={cdn(IMG.grounds)}
        headline={"Autonomy at this scale is not inherited. It is engineered."}
        quote
        position="center 60%"
      />
      <CinematicReveal
        src={cdn(IMG.kitchen)}
        eyebrow="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the serious cook."}
        body="A 60-inch dual fuel Wolf range with red knobs, six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Butcher block island. Scullery with full Sub-Zero and wine fridge. The kitchen that makes you want to stay home."
        position="center 40%"
      />
      <Land />
      <Mechanism />
      <CinematicReveal
        src={cdn(IMG.spabath)}
        eyebrow="The Primary Suite"
        headline={"A spa.\nA sanctuary.\nA reason to stay."}
        body="Dual vanities. Freestanding soaking tub beneath a window to the forest. Body-jet shower. Mosaic tile floors. A room that earns the word primary."
        align="right"
        position="center 30%"
      />
      <CinematicReveal
        src={cdn(IMG.foyer)}
        eyebrow="The Welcome"
        headline={"Every arrival\nshould feel like this."}
        body="Herringbone heart pine floors laid on the diagonal. A reclaimed wood door with transom light overhead. A star lantern casting warm light across the entry. The first impression that sets the tone for everything that follows."
        position="center top"
      />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}

