import React, { useState, useEffect, useRef } from 'react';

// Load Cormorant Garamond for ultra-thin editorial numerals
if (typeof document !== 'undefined') {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap';
  document.head.appendChild(link);
}


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

function useCounter(target, duration, delay, decimals) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const t = setTimeout(() => {
      let startTime = null;
      const animate = (ts) => {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = ease * target;
        setCount(parseFloat(val.toFixed(decimals || 0)));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay || 1800);
    return () => clearTimeout(t);
  }, []);
  return [count, ref];
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
function HeroStat({ value, prefix, suffix, decimals, label1, label2, duration, delay, mob }) {
  const [count, ref] = useCounter(value, duration || 1600, delay || 600, decimals || 0);
  const display = (prefix || '') + (decimals ? count.toFixed(decimals) : Math.round(count).toLocaleString()) + (suffix || '');
  return (
    <div ref={ref} style={{ textAlign: 'left' }}>
      <div style={{
        color: '#fff',
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: mob ? '2.4rem' : '3.2rem',
        fontWeight: 300,
        lineHeight: 1,
        marginBottom: '0.35rem',
        letterSpacing: '-0.01em',
        fontStyle: 'normal',
      }}>{display}</div>
      <div style={{
        color: 'rgba(255,255,255,0.55)',
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontSize: mob ? '7px' : '8px',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        lineHeight: 1.6,
        fontWeight: 400,
      }}>{label1}<br />{label2}</div>
    </div>
  );
}

function HeroStats({ mob }) {
  const stats = [
    { value: 15, prefix: '', suffix: '', decimals: 0, label1: 'USDA', label2: 'ACRES', duration: 1600, delay: 1800 },
    { value: 7, prefix: '', suffix: '', decimals: 0, label1: 'BUILDABLE', label2: 'ACRES', duration: 1600, delay: 1950 },
    { value: 3, prefix: '', suffix: '', decimals: 0, label1: 'ACRE VEGANIC', label2: 'FARM', duration: 1600, delay: 2100 },
    { value: 5.25, prefix: '$', suffix: 'M', decimals: 2, label1: 'OFFERED', label2: 'AT', duration: 1600, delay: 2250 },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: mob ? '0 0 2rem' : '0 0 2.6rem', gap: 0 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {i > 0 && (
            <div style={{
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, transparent)',
              margin: mob ? '0 1.2rem' : '0 2rem',
              alignSelf: 'stretch',
              minHeight: mob ? '48px' : '60px',
            }} />
          )}
          <HeroStat {...s} mob={mob} />
        </div>
      ))}
    </div>
  );
}

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
            Agritourism <em>Established.</em><br />Legacy Ready.
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: mob ? '1.6rem' : '2.2rem' }}>
          <p style={{
            color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontStyle: 'italic',
            fontSize: mob ? '0.95rem' : '1.1rem', margin: mob ? '0 0 2rem' : '0 0 2.6rem',
            letterSpacing: '0.01em', lineHeight: 1.7,
          }}>
            Where architectural excellence meets working land -- three miles from Pinehurst Resort.
          </p>
          <HeroStats mob={mob} />
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
    <section style={{ background: DARK, padding: mob ? '7rem 0' : '11rem 0', textAlign: 'center' }}>
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
    <section id="the-estate" style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '10rem 0' }}>
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
            <img src={cdn(IMG.aerial)} alt="Flow Farm Estate" style={{ width: '100%', height: mob ? 340 : 560, objectFit: 'cover', display: 'block' }} />
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
function CountStat({ value, label, prefix, suffix, decimals, duration, mob }) {
  // value = numeric target, prefix/suffix = decorative strings around the number
  const [count, ref] = useCounter(value, duration || 1800, 0, decimals || 0);
  const display = (prefix || '') + (decimals ? count.toFixed(decimals) : Math.round(count).toLocaleString()) + (suffix || '');
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: mob ? '3rem 1rem' : '4rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
      <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '2.8rem', fontWeight: 400, margin: '0 0 0.7rem', letterSpacing: '-0.03em' }}>{display}</p>
      <p style={{ color: 'rgba(255,255,255,0.16)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
    </div>
  );
}

function Numbers() {
  const w = useW();
  const mob = w < 768;
  const cols = mob ? 2 : 4;
  // [label, numeric_target, prefix, suffix, decimals, duration_ms]
  const stats = [
    ['Acres', 15, '', '', 0, 1600],
    ['Sq Ft Main Residence', 8519, '', '', 0, 2200],
    ['Beds', 6, '', '', 0, 1200],
    ['Offered At', 5.25, '$', 'M', 2, 1800],
    ['Structures', 6, '', '', 0, 1200],
    ['Amps Total Power', 1200, '', '', 0, 2000],
    ['kW Solar Array', 14.3, '', 'kW', 1, 1600],
    ['Mi To Pinehurst', 3, '', ' mi', 0, 1000],
  ];
  return (
    <section style={{ background: '#0c0c0c', padding: mob ? '6rem 0' : '9rem 0' }}>
      <Fade>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 5rem' : '0 0 6rem', textAlign: 'center' }}>
          By The Numbers
        </p>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 1020, margin: '0 auto', padding: '0 5vw', borderTop: '1px solid rgba(255,255,255,0.05)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        {stats.map(([label, value, prefix, suffix, decimals, duration], i) => (
          <CountStat key={label} value={value} label={label} prefix={prefix} suffix={suffix} decimals={decimals} duration={duration} mob={mob} />
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
    <section style={{ position: 'relative', background: DARK, padding: mob ? '6rem 0' : '10rem 0', overflow: 'hidden' }}>
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
    <section id="the-land" style={{ background: '#0c0c0c', padding: mob ? '6rem 0' : '10rem 0' }}>
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
    <section style={{ background: DARK, padding: mob ? '7rem 0' : '10rem 0' }}>
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
    <section id="inquire" style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '10rem 0' }}>
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
// OPPORTUNITY
// ============================================================
function Opportunity() {
  const w = useW();
  const mob = w < 768;

  const cards = [
    {
      eyebrow: 'The Farm',
      headline: 'The Engine Is Already Running.',
      body: 'A USDA-registered veganic operation building soil since 2009. CSA members, a high tunnel, a biochar kiln -- all active. The farm is not a feature. It is the legal and strategic foundation for everything that follows.',
    },
    {
      eyebrow: 'The Zoning',
      headline: 'The Key Is Already Cut.',
      body: 'NC Qualifying Farmer Exemption in place. Retreat centers, event venues, commercial kitchens, equestrian operations -- all permitted. What others spend years and capital to unlock, this estate has already secured.',
    },
    {
      eyebrow: 'The Infrastructure',
      headline: 'Independent by Design.',
      body: 'Two deep private wells. 14.3 kW solar with battery backup. Five geothermal zones from twenty wells at 300 feet. 30 kW standby generator. The estate operates entirely off municipal systems -- by intention, not circumstance.',
    },
    {
      eyebrow: 'The Position',
      headline: 'Three Miles from a Million Visitors.',
      body: 'Close enough to draw on a resort economy. Far enough to remain outside city limits. Resort-caliber proximity with county-level taxation. The location is not incidental -- it is part of the thesis.',
    },
  ];

  const summary = [
    { num: '15', label: 'Acres of Working Land', sub: 'USDA-registered agricultural standing inside a dense natural forest buffer -- permanent, protected, and fully active.' },
    { num: '3', label: 'The Farm at Its Heart', sub: 'A veganic operation building soil since 2009. The farm sustains the zoning. The zoning unlocks the land.' },
    { num: '7+', label: 'Acres Ready to Build', sub: 'A guest house shell designed by Robert E. Clark AIA already on the parcel. The infrastructure exists. The vision is yours.' },
    { num: '~7,500', label: 'Square Feet of Residence', sub: 'Eight structures designed as a compound -- not a house with outbuildings, but a full estate in deliberate balance.' },
    { num: '5', label: 'Climate Zones, Zero Grid', sub: 'Twenty geothermal wells. 14.3 kW solar with battery. Two deep wells. The estate answers to nothing municipal.' },
    { num: '6', label: 'Structures on the Land', sub: 'Main house, wing, cabana, workshop, high tunnel, cottage. A compound that absorbs a family or an enterprise without strain.' },
  ];

  const vis = { opacity: 1, transform: 'none' };

  return (
    <>
      {/* CINEMATIC FULL-BLEED GLASS SECTION */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <img
          src={cdn(IMG.aerial)}
          alt=""
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 40%',
            zIndex: 0,
          }}
        />
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.75) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, width: '100%', padding: mob ? '8rem 6vw' : '10rem 8vw' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto' }}>

            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 1.6rem' : '0 0 2rem' }}>
              The Opportunity
            </p>

            <h2 style={{
              color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: mob ? '2rem' : '3.2rem', lineHeight: 1.18,
              margin: mob ? '0 0 1.2rem' : '0 0 1.6rem',
              maxWidth: 780,
            }}>
              A Rare Convergence of<br />Sanctuary and Strategy.
            </h2>

            <p style={{
              color: 'rgba(255,255,255,0.65)', fontFamily: 'Georgia, serif',
              fontSize: mob ? '1rem' : '1.15rem', lineHeight: 1.85,
              maxWidth: 640, margin: mob ? '0 0 4rem' : '0 0 5rem',
            }}>
              The farm sustains the zoning. The zoning unlocks the land. The infrastructure removes every barrier between ownership and what comes next. Fifteen acres -- a compound, not simply a residence -- that absorbs a growing family or a growing enterprise without ever feeling the strain.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
              gap: mob ? '1.2rem' : '1.5rem',
            }}>
              {cards.map((c, i) => (
                <div key={c.eyebrow} style={{
                  background: 'rgba(8,8,8,0.60)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  padding: mob ? '2rem 1.8rem' : '2.6rem 2.4rem',
                }}>
                  <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.9rem' }}>
                    {c.eyebrow}
                  </p>
                  <h3 style={{
                    color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400,
                    fontSize: mob ? '1.15rem' : '1.3rem', lineHeight: 1.3,
                    margin: '0 0 1rem',
                  }}>
                    {c.headline}
                  </h3>
                  <p style={{
                    color: 'rgba(255,255,255,0.52)', fontFamily: 'Georgia, serif',
                    fontSize: '0.92rem', lineHeight: 1.75, margin: 0,
                  }}>
                    {c.body}
                  </p>
                </div>
              ))}
            </div>

            <p style={{
              color: 'rgba(255,255,255,0.25)', fontFamily: 'Georgia, serif', fontStyle: 'italic',
              fontSize: mob ? '1rem' : '1.25rem', lineHeight: 1.7,
              textAlign: 'center', margin: mob ? '4rem 0 0' : '5rem auto 0',
              maxWidth: 600,
              borderTop: '1px solid rgba(255,255,255,0.08)',
              paddingTop: mob ? '2.5rem' : '3.5rem',
            }}>
              "Fifteen acres where every system answers to the next."
            </p>
          </div>
        </div>
      </section>

      {/* INVESTMENT SUMMARY -- dark editorial */}
      <section style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.04)', padding: mob ? '7rem 6vw' : '10rem 8vw' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Fade up>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.2rem', textAlign: 'center' }}>
              Investment Summary
            </p>
          </Fade>
          <Fade up delay={0.08}>
            <h2 style={{
              color: 'rgba(255,255,255,0.82)', fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: mob ? '1.5rem' : '2rem', textAlign: 'center',
              margin: mob ? '0 0 4rem' : '0 0 5.5rem', lineHeight: 1.3,
            }}>
              The strategic value of the land.
            </h2>
          </Fade>
          <div style={{
            display: 'grid',
            gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            borderLeft: mob ? 'none' : '1px solid rgba(255,255,255,0.06)',
          }}>
            {summary.map((s, i) => (
              <Fade key={s.label} up delay={0.05 + i * 0.07}>
                <div style={{
                  padding: mob ? '2.8rem 0' : '3.5rem 3rem',
                  borderRight: mob ? 'none' : '1px solid rgba(255,255,255,0.06)',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: mob ? '3rem' : '3.8rem',
                    fontWeight: 300,
                    color: GOLD,
                    lineHeight: 1,
                    marginBottom: '1rem',
                  }}>{s.num}</div>
                  <p style={{
                    color: 'rgba(255,255,255,0.75)', fontFamily: 'sans-serif',
                    fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
                    margin: '0 0 0.75rem',
                  }}>{s.label}</p>
                  <p style={{
                    color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif',
                    fontSize: '0.88rem', lineHeight: 1.7, margin: 0,
                  }}>{s.sub}</p>
                </div>
              </Fade>
            ))}
          </div>
        </div>
      </section>
    </>
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
      <Opportunity />
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

