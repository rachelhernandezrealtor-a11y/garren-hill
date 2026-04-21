import React, { useState, useEffect, useRef } from 'react';

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
const OLD = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/';
const SUP = 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/';
const CLOUD = 'dghn2xpif';

const cdnInt = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/' + encodeURIComponent(url);
const cdnExt = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1600,c_limit/' + encodeURIComponent(url);
const cdnForest = (url) => 'https://res.cloudinary.com/' + CLOUD + '/image/fetch/f_auto,q_auto,w_2400,e_vibrance:40,e_saturation:20,e_brightness:15,e_sharpen:60/' + encodeURIComponent(url);

const IMG = {
  living:       cdnInt(B + '4db7d0477_livingroom.jpg'),
  conservatory: cdnInt(B + '8cb2578a0_MONEYSHOT.jpg'),
  kitchen:      cdnInt(B + '1c4b8a04f_SOGOODKITCHEN.jpg'),
  dining:       cdnInt(B + 'db01725cb_sogoodtolivingroom.jpg'),
  spabath:      cdnInt(B + '08da5b97d_spaprimarybath.jpg'),
  foyer:        cdnInt(B + '9b1d02a04_260115107LindenTrailF-9727.jpg'),
  powderroom:   cdnInt(B + '4e58028ab_260115107LindenTrailF-9769-2.jpg'),
  wolf:         cdnInt(B + 'ef4b4a364_WOLFDOUBLEGASRANGE.jpg'),
  office:       cdnInt(B + '2b920c3b0_markofficemoneyshot.jpg'),
  hallway:      cdnInt(B + '8e3d794f9_secondfloorhallway.jpg'),
  aerial:       cdnExt(B + '2ca329bbf_flowfarmmasterphotoswebsite.jpg'),
  exterior:     cdnExt(OLD + '595faa261_107LindenTrail-29.jpg'),
  grounds:      cdnExt(OLD + 'da785e254_flowfarmmasterphotoswebsite3.jpg'),
  cabana:       cdnExt(SUP + '3af6924d6_CabanaHouseMain.jpg'),
  tunnel:       cdnExt(SUP + '217fdb4a1_HighTunnel.jpg'),
  workshop:     cdnExt(SUP + '136958608_FarmWorkshop.jpg'),
  forest:       cdnForest(B + 'fbfaf627b_generated_image.png'),
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
      transition: 'opacity 1.6s ease ' + (delay || 0) + 's, transform 1.6s ease ' + (delay || 0) + 's',
      ...style,
    }}>
      {children}
    </div>
  );
}

function Glass({ children, style }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.12)',
      border: '1px solid rgba(255,255,255,0.28)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      ...style,
    }}>
      {children}
    </div>
  );
}

function GoldLine() {
  return <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.35 }} />;
}

function Eyebrow({ children, center }) {
  return (
    <p style={{
      fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em',
      textTransform: 'uppercase', color: GOLD, margin: 0,
      textAlign: center ? 'center' : 'left',
    }}>
      {children}
    </p>
  );
}

function HeroStats({ mob }) {
  const stats = [
    { value: 3, suffix: '-Acre', label: 'Veganic Farm', decimals: 0 },
    { value: 15, suffix: '', label: 'Total Acres', decimals: 0 },
    { value: 3, suffix: ' Mi.', label: 'To Pinehurst', decimals: 0 },
    { value: 5.25, suffix: 'M', label: 'USD', decimals: 2, prefix: '$' },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    stats.forEach((s, i) => {
      const delay = 1800 + i * 400;
      const duration = 1200;
      setTimeout(() => {
        let start = null;
        const animate = (ts) => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCounts(prev => {
            const next = [...prev];
            next[i] = parseFloat((ease * s.value).toFixed(s.decimals));
            return next;
          });
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }, delay);
    });
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', margin: mob ? '0 0 2rem' : '0 0 2.6rem', gap: 0 }}>
      {stats.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          {i > 0 && (
            <div style={{
              width: 1, margin: '0 mob ? 1.2rem : 2rem',
              background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.18) 20%, rgba(255,255,255,0.18) 80%, transparent)',
            }} />
          )}
          <div style={{ textAlign: 'center', padding: mob ? '0 1.2rem' : '0 2rem' }}>
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 300, fontSize: mob ? '2rem' : '2.8rem',
              color: '#fff', lineHeight: 1, letterSpacing: '-0.02em',
            }}>
              {s.prefix || ''}{counts[i].toFixed(s.decimals)}{s.suffix}
            </div>
            <div style={{
              fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem',
            }}>
              {s.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// CINEMATIC REVEAL
// ============================================================
function CinematicReveal({ eyebrow, headline, body, src, align, quote }) {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ position: 'relative', minHeight: mob ? '80vh' : '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(' + src + ')', backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: quote
        ? 'linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75))'
        : align === 'right'
          ? 'linear-gradient(to left, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.92) 100%)'
          : 'linear-gradient(to right, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.92) 100%)'
      }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 6vw' : '10rem 6vw', display: 'flex', justifyContent: quote ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Fade up>
          {quote ? (
            <div style={{ maxWidth: mob ? '100%' : 700, textAlign: 'center' }}>
              <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? 'clamp(1.8rem, 5vw, 2.8rem)' : 'clamp(2rem, 4vw, 3.8rem)', color: '#fff', lineHeight: 1.35, margin: 0, letterSpacing: '-0.01em' }}>
                "{headline}"
              </p>
            </div>
          ) : (
            <Glass style={{ maxWidth: mob ? '100%' : 480, padding: mob ? '2.4rem' : '3.6rem 4rem' }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {eyebrow && <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.35, margin: '1.4rem 0' }} />}
              <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.9rem' : '2.6rem', lineHeight: 1.22, margin: '0 0 1.6rem', letterSpacing: '-0.018em' }}>
                {headline}
              </h2>
              {body && <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.95, margin: 0 }}>{body}</p>}
            </Glass>
          )}
        </Fade>
      </div>
    </section>
  );
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
      setTimeout(() => setP(1), 400),
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
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.32)', margin: 0 }}>Flow Farm</p>
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
          <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2.8rem' : w < 1024 ? '4.6rem' : '6.2rem', lineHeight: 1.06, margin: 0, letterSpacing: '-0.02em', textShadow: '0 4px 80px rgba(0,0,0,0.6)' }}>
            Agritourism <em>Established.</em><br />Legacy Ready.
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: mob ? '1.6rem' : '2.2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '0.95rem' : '1.1rem', margin: mob ? '0 0 2rem' : '0 0 2.6rem', letterSpacing: '0.01em', lineHeight: 1.7 }}>
            Where architectural excellence meets working land -- three miles from Pinehurst Resort.
          </p>
          <HeroStats mob={mob} />
          <a href="#inquire" style={{ display: 'inline-block', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(201,169,110,0.45)', color: GOLD, fontFamily: 'sans-serif', fontSize: mob ? '9px' : '10px', letterSpacing: '0.28em', textTransform: 'uppercase', padding: mob ? '0.85rem 2rem' : '1rem 2.6rem', borderRadius: '2rem', textDecoration: 'none', fontWeight: 600 }}>
            Enter Flow Farm
          </a>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: mob ? '2rem' : '3rem', left: mob ? '1.5rem' : '3rem', right: mob ? '1.5rem' : '3rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', ...show(3) }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'sans-serif', fontSize: mob ? '9px' : '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>107 Linden Trail, Aberdeen NC</p>
          <p style={{ color: 'rgba(255,255,255,0.14)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>15 Acres -- 6 Structures -- $5,250,000</p>
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
          <Eyebrow center>107 Linden Trail -- Aberdeen, North Carolina</Eyebrow>
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
              Reclaimed Civil War-era heart pine floors. A glass conservatory with
              octagonal skylight dome. Six structures across fifteen curated acres.
              One tap, the house shifts.
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
            <img src={IMG.aerial} alt="Flow Farm aerial" style={{ width: '100%', height: mob ? 340 : 560, objectFit: 'cover', display: 'block' }} />
            <Glass style={{ position: 'absolute', bottom: mob ? -20 : -28, left: mob ? -10 : -28, padding: '1.4rem 2rem' }}>
              <p style={{ margin: '0 0 0.3rem', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Architect</p>
              <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '1rem', color: CREAM }}>Robert E. Clark AIA</p>
            </Glass>
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// NUMBERS
// ============================================================
function StatCard({ value, label, sub, delay }) {
  const [ref, on] = useFade();
  const w = useW();
  const mob = w < 768;
  return (
    <div ref={ref} style={{ textAlign: 'center', padding: mob ? '3rem 1rem' : '4rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)', opacity: on ? 1 : 0, transform: on ? 'none' : 'translateY(20px)', transition: 'opacity 1.2s ease ' + (delay || 0) + 's, transform 1.2s ease ' + (delay || 0) + 's' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: mob ? '2.6rem' : '3.6rem', color: '#fff', lineHeight: 1, letterSpacing: '-0.02em' }}>{value}</div>
      <div style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, marginTop: '0.7rem' }}>{label}</div>
      {sub && <div style={{ fontFamily: 'Georgia, serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.25)', marginTop: '0.5rem', lineHeight: 1.5 }}>{sub}</div>}
    </div>
  );
}

function Numbers() {
  const w = useW();
  const mob = w < 768;
  const tab = w < 1024;
  const cols = mob ? 2 : tab ? 3 : 4;
  const stats = [
    { value: '8,519', label: 'Square Feet', sub: 'Main Residence + Lower Level' },
    { value: '15', label: 'Acres', sub: 'Forest, farmland, and meadow' },
    { value: '6', label: 'Structures', sub: 'Main house, cabana, greenhouse, workshop, barn, studio' },
    { value: '14.3kW', label: 'Solar Array', sub: '61 Samsung panels + Sunny Island battery' },
    { value: '20', label: 'Geo Wells', sub: '300 ft deep, 5-zone Water Furnace' },
    { value: '1,200A', label: 'Power Capacity', sub: 'The electrical capacity of a small hotel' },
    { value: '50 GPM', label: 'Private Well', sub: 'Whole-house filtration' },
    { value: '30kW', label: 'Generator', sub: 'Kohler + 2,000 gal propane reserve' },
  ];
  return (
    <section style={{ background: '#0c0c0c', padding: mob ? '6rem 0' : '9rem 0' }}>
      <Fade up>
        <div style={{ textAlign: 'center', marginBottom: mob ? '4rem' : '6rem', padding: '0 6vw' }}>
          <Eyebrow center>Estate at a Glance</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '2.8rem', margin: '1.2rem 0 0', letterSpacing: '-0.018em' }}>
            The numbers that define it.
          </h2>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', maxWidth: 1020, margin: '0 auto', padding: '0 5vw', borderTop: '1px solid rgba(255,255,255,0.05)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        {stats.map((s, i) => <StatCard key={i} {...s} delay={i * 0.08} />)}
      </div>
    </section>
  );
}

// ============================================================
// OPPORTUNITY (Forest)
// ============================================================
function Opportunity() {
  const w = useW();
  const mob = w < 768;
  const bgRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!bgRef.current) return;
      const rect = bgRef.current.getBoundingClientRect();
      const shift = -rect.top * 0.35;
      bgRef.current.style.backgroundPositionY = (50 + shift * 0.35) + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const cards = [
    { title: 'Agritourism Zoning', body: 'Three certified organic acres currently producing. Seven additional acres with full agritourism entitlements in place. The infrastructure -- fencing, irrigation, cold storage -- is already built.' },
    { title: 'Energy Independence', body: 'Solar, geothermal, and a 30kW generator create true off-grid capability. This property does not ask permission from the utility grid.' },
    { title: 'Income Infrastructure', body: 'The cabana house, farm operation, and event-ready grounds create multiple revenue streams from a single ownership position.' },
  ];

  return (
    <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div ref={bgRef} style={{
        position: 'absolute', inset: 0, zIndex: 0,
        backgroundImage: 'url(' + IMG.forest + ')',
        backgroundSize: '108%', backgroundPosition: 'center 50%',
        backgroundRepeat: 'no-repeat', willChange: 'background-position',
        filter: 'saturate(1.25) brightness(1.12)',
      }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.72) 100%)' }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1320, margin: '0 auto', padding: mob ? '7rem 6vw' : '11rem 6vw' }}>
        <Fade up>
          <div style={{ textAlign: 'center', marginBottom: mob ? '4rem' : '6rem' }}>
            <Eyebrow center>The Opportunity</Eyebrow>
            <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2.2rem' : '3.4rem', lineHeight: 1.22, margin: '1.4rem 0 0', letterSpacing: '-0.018em' }}>
              What fifteen acres can hold.
            </h2>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: mob ? '1.6rem' : '2rem' }}>
          {cards.map((c, i) => (
            <Fade key={i} delay={i * 0.15}>
              <Glass style={{ padding: mob ? '2rem' : '2.8rem 3rem', height: '100%' }}>
                <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, margin: '0 0 1.2rem' }}>{c.title}</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.9, margin: 0 }}>{c.body}</p>
              </Glass>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LAND (Structures)
// ============================================================
function Land() {
  const w = useW();
  const mob = w < 768;
  const structures = [
    { src: IMG.cabana, label: 'Cabana House', detail: '1 Bed | 1 Bath | Full Kitchen | Private Entrance', body: 'A private guest retreat with the feel of a boutique inn. Direct access to the grounds, full kitchen, and a private entrance that keeps guests comfortable and independent.' },
    { src: IMG.tunnel, label: 'High Tunnel Greenhouse', detail: '96 x 36 Ft | Geothermal Climate Control', body: 'Year-round production at commercial scale. Pineapples, avocados, citrus. Climate-controlled by the same geothermal system that heats and cools the main residence.' },
    { src: IMG.workshop, label: 'Farm Workshop', detail: '30 x 40 Ft | Plumbing | Electrical | Walk-In Cooler', body: 'Built to run a real operation. Plumbing, electrical, and a 12 x 8 foot walk-in cooler. This is the infrastructure behind the idea.' },
  ];
  return (
    <section id="the-land" style={{ background: '#0c0c0c', padding: mob ? '6rem 0' : '10rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.4rem', marginBottom: mob ? '6rem' : '10rem', padding: '0 6vw', textAlign: 'center' }}>
          <Eyebrow center>The Land</Eyebrow>
          <GoldLine />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2.2rem' : '3rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.018em' }}>
            Three acres producing.<br />Seven acres waiting.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2.1, maxWidth: 580, margin: 0 }}>
            The land is not decorative. It is operational. A 1,400-foot deer fence, irrigation infrastructure, cold storage, and commercial-scale greenhouse are already in place.
          </p>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: mob ? '3rem' : '3.5rem' }}>
        {structures.map((s, i) => (
          <Fade key={i} delay={i * 0.12}>
            <div>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={s.src} alt={s.label} style={{ width: '100%', height: mob ? 260 : 340, objectFit: 'cover', display: 'block', transition: 'transform 0.8s ease' }}
                  onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                  onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.8rem' }}>
                  <p style={{ margin: '0 0 0.4rem', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD }}>{s.detail}</p>
                  <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#fff', fontWeight: 400 }}>{s.label}</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.9, margin: '1.4rem 0 0' }}>{s.body}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// MECHANISM (Systems)
// ============================================================
function Mechanism() {
  const w = useW();
  const mob = w < 768;
  const systems = [
    { label: 'Energy', items: ['14.3kW solar array -- 61 Samsung panels', 'Sunny Island battery backup system', '30kW Kohler generator + 2,000 gal propane', 'Seamless solar / geo / generator handoff'] },
    { label: 'Climate', items: ['20 geothermal wells x 300 ft deep', '5-zone Water Furnace system', 'Full house dehumidification', 'Radiant + forced air zoning'] },
    { label: 'Water', items: ['Private well -- 50 GPM capacity', 'Whole-house filtration system', 'Music from speakers you cannot see', '2 x 1,500 gal septic system'] },
    { label: 'Automation', items: ['Control4 smart home system', 'Araknis network infrastructure', '143 lighting circuits throughout', 'Wolf 60" dual fuel + Sub-Zero'] },
  ];
  return (
    <section style={{ background: DARK, padding: mob ? '7rem 0' : '10rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: mob ? '5rem' : '8rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>Infrastructure</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.018em' }}>
              Structure that<br />holds freedom.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 2.1, margin: 0 }}>
              The electrical capacity of a small hotel. A geothermal system with 20 wells drilled 300 feet down. Solar and battery backup that runs the estate indefinitely. This property was engineered to need nothing from the outside world.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem' }}>
              {systems.map((sys, i) => (
                <div key={i}>
                  <p style={{ margin: '0 0 0.6rem', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD }}>{sys.label}</p>
                  {sys.items.map((item, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.35rem' }}>
                      <span style={{ display: 'inline-block', width: 20, height: 1, background: GOLD, opacity: 0.4, flexShrink: 0 }} />
                      <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '0.88rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <img src={IMG.exterior} alt="Flow Farm exterior" style={{ width: '100%', height: mob ? 320 : 560, objectFit: 'cover', display: 'block' }} />
        </Fade>
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
  const places = [
    { name: 'Pinehurst Resort', dist: '3 Miles', note: 'Golf membership included' },
    { name: 'Southern Pines', dist: '4 Miles', note: 'Shopping, dining, airport' },
    { name: 'Raleigh-Durham', dist: '75 Miles', note: 'International airport hub' },
    { name: 'Charlotte', dist: '90 Miles', note: 'Major metro, direct flights' },
  ];
  return (
    <section style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '10rem 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 6vw' }}>
        <Fade up>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: mob ? 'flex-start' : 'center', gap: '2rem', marginBottom: mob ? '4rem' : '7rem', textAlign: mob ? 'left' : 'center' }}>
            <Eyebrow center={!mob}>Location</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.018em' }}>
              The Sandhills of<br />North Carolina.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.06rem', lineHeight: 2.1, maxWidth: 560, margin: 0 }}>
              Aberdeen sits at the edge of the Sandhills region -- home to more championship golf courses per capita than anywhere in the world. Three miles to Pinehurst Resort. Pinehurst Country Club Golf Membership included with sale.
            </p>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(4, 1fr)', gap: mob ? '2rem' : '3rem' }}>
          {places.map((p, i) => (
            <Fade key={i} delay={i * 0.1}>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem' }}>
                <p style={{ margin: '0 0 0.5rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '2.2rem', color: GOLD, lineHeight: 1 }}>{p.dist}</p>
                <p style={{ margin: '0 0 0.4rem', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: CREAM }}>{p.name}</p>
                <p style={{ margin: 0, fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.28)', lineHeight: 1.5 }}>{p.note}</p>
              </div>
            </Fade>
          ))}
        </div>
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
  const inp = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '1rem 0', width: '100%', outline: 'none' };
  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section id="inquire" style={{ background: '#0c0c0c', padding: mob ? '7rem 0' : '10rem 0' }}>
      <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        <Fade up>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.6rem' }}>
            <Eyebrow center>Private Inquiry</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '2.8rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.018em' }}>
              Begin the conversation.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: 0 }}>
              Qualified inquiries only. Private showings available by appointment.
            </p>
          </div>
        </Fade>
        {sent ? (
          <Fade up>
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: '1.1rem', lineHeight: 1.9 }}>Thank you. We will be in touch shortly.</p>
            </div>
          </Fade>
        ) : (
          <Fade up delay={0.1} style={{ width: '100%' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', width: '100%' }}>
              <input style={inp} placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
              <input style={inp} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
              <input style={inp} placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
              <textarea style={{ ...inp, resize: 'none', height: 100 }} placeholder="Message (optional)" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
              <button type="submit" style={{ background: 'transparent', border: '1px solid ' + GOLD, color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: '1.2rem 3rem', cursor: 'pointer', alignSelf: 'center', marginTop: '1rem' }}>
                Request Private Showing
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
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '0.42em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', margin: '0 0 0.5rem' }}>Flow Farm</p>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '0.82rem', color: 'rgba(255,255,255,0.12)', margin: 0 }}>107 Linden Trail, Aberdeen, North Carolina</p>
        </div>
        <div style={{ textAlign: mob ? 'left' : 'right' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.12)', margin: '0 0 0.4rem' }}>Listed at $5,250,000</p>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.08)', margin: 0 }}>flowfarmforest.com</p>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// APP
// ============================================================
export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, minHeight: '100vh', color: CREAM }}>
      <Hero />
      <Manifesto />
      <Foundation />
      <CinematicReveal
        eyebrow="The Living Room"
        headline={"Seventeen feet overhead. Sound that fills every inch without effort."}
        body={"Civil War-era heart pine floors. Reclaimed timber trusses. A grand piano at the center of a room designed to hold it. The Control4 system sets the scene with one tap."}
        src={IMG.living}
        align="left"
      />
      <Numbers />
      <CinematicReveal
        eyebrow="The Conservatory"
        headline={"An octagonal dome. Light that moves with the day."}
        body={"Custom-designed glass conservatory with a faceted skylight dome. Opens to the living room and the landscape beyond. There is no other room like it."}
        src={IMG.conservatory}
        align="right"
      />
      <CinematicReveal
        headline={"Autonomy at this scale is not inherited. It is engineered."}
        src={IMG.grounds}
        quote={true}
      />
      <CinematicReveal
        eyebrow="The Kitchen"
        headline={"Wolf. Sub-Zero. Music from speakers you cannot see."}
        body={"A 60-inch Wolf dual fuel range. Sub-Zero refrigeration. Scullery with dedicated wine storage. Whole-house water filtration at every tap. Designed for the cook who takes it seriously."}
        src={IMG.kitchen}
        align="left"
      />
      <Land />
      <Opportunity />
      <Mechanism />
      <CinematicReveal
        eyebrow="The Entry"
        headline={"Herringbone brick. The first impression holds."}
        body={"Hand-laid herringbone entry. Custom millwork throughout. One tap, and the house shifts -- lighting, sound, temperature. The foyer sets the tone for everything that follows."}
        src={IMG.foyer}
        align="right"
      />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
