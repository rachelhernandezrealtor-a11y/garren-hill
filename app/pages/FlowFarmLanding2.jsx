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
          }}>
            A House in Perfect<br />Conversation with<br />Its Landscape.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.58)',
            fontFamily: 'Georgia, serif',
            fontSize: mob ? '1rem' : '1.15rem',
            lineHeight: 1.7,
            margin: 0,
            maxWidth: 700,
          }}>
            Architect Robert E. Clark realized a vision of sophisticated simplicity. Reclaimed Civil War heart pine. Native stone. Geothermal systems. Every element is intelligent, thoughtful, and honest about what it is.
          </p>
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
    <section style={{ background: DARK, padding: mob ? '6rem 3rem' : '12rem 4rem', display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', gap: mob ? '3rem' : '4rem', maxWidth: 1400, margin: '0 auto' }}>
      <Fade>
        <div>
          <Eyebrow>Architect</Eyebrow>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '1.35rem' : '1.6rem', fontWeight: 400, margin: '0.8rem 0 0.5rem' }}>Robert E. Clark</h3>
          <p style={{ color: 'rgba(255,255,255,0.52)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>AIA. A master of rural modernism. Clark's portfolio reads like a love letter to land.</p>
        </div>
      </Fade>
      <Fade delay={0.2}>
        <div>
          <Eyebrow>Materials</Eyebrow>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '1.35rem' : '1.6rem', fontWeight: 400, margin: '0.8rem 0 0.5rem' }}>Reclaimed &amp; Native</h3>
          <p style={{ color: 'rgba(255,255,255,0.52)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>Civil War-era heart pine. Native stone. Sourced locally. Built to last centuries, not seasons.</p>
        </div>
      </Fade>
      <Fade delay={0.4}>
        <div>
          <Eyebrow>Infrastructure</Eyebrow>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '1.35rem' : '1.6rem', fontWeight: 400, margin: '0.8rem 0 0.5rem' }}>Intelligent Systems</h3>
          <p style={{ color: 'rgba(255,255,255,0.52)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>Solar + battery. Geothermal. Private well. Built for resilience and independence.</p>
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// CINEMATIC REVEAL
// ============================================================
function CinematicReveal({ image, alt, label, desc, reverse }) {
  const w = useW();
  const mob = w < 768;
  const order = reverse ? [1, 0] : [0, 1];

  const [ref, on] = useFade();
  return (
    <section ref={ref} style={{ background: DARK, padding: mob ? '4rem 2rem' : '8rem 4rem', opacity: on ? 1 : 0.8, transition: 'opacity 0.8s ease' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? '2.5rem' : '5rem', alignItems: 'center' }}>
        <div style={{ order: order[0] }}>
          <Fade>
            <img src={image} alt={alt} style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
          </Fade>
        </div>
        <div style={{ order: order[1] }}>
          <Fade delay={0.2}>
            <Eyebrow>{label}</Eyebrow>
            <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '1.8rem' : '2.4rem', fontWeight: 400, margin: '0.8rem 0 1.2rem', lineHeight: 1.2 }}>
              {label}
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.58)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.1rem', lineHeight: 1.7, margin: 0 }}>
              {desc}
            </p>
          </Fade>
        </div>
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
  const numbers = [
    { label: 'Square Feet', value: '8,519' },
    { label: 'Bedrooms', value: '6' },
    { label: 'Bathrooms', value: '7' },
    { label: 'Acres', value: '15' },
    { label: 'Structures', value: '6' },
    { label: 'Solar kW', value: '14.3' },
  ];

  return (
    <section style={{ background: DARK, padding: mob ? '6rem 3rem' : '12rem 4rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Fade up>
          <div style={{ textAlign: 'center', marginBottom: mob ? '4rem' : '6rem' }}>
            <Eyebrow center>By The Numbers</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '3rem', fontWeight: 400, margin: '1rem 0 0' }}>
              Built For Scale
            </h2>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr 1fr' : 'repeat(3, 1fr)', gap: mob ? '2rem' : '3rem' }}>
          {numbers.map((n, i) => (
            <Fade key={i} delay={i * 0.08}>
              <Glass style={{ padding: mob ? '2rem' : '2.4rem', textAlign: 'center' }}>
                <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>
                  {n.label}
                </p>
                <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '2.6rem', fontWeight: 400, margin: 0 }}>
                  {n.value}
                </p>
              </Glass>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// QUOTE
// ============================================================
function Quote() {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '6rem 4rem' : '14rem 6rem', textAlign: 'center' }}>
      <Fade>
        <blockquote style={{
          maxWidth: 900,
          margin: '0 auto',
          color: CREAM,
          fontFamily: 'Georgia, serif',
          fontSize: mob ? '1.5rem' : '2rem',
          fontStyle: 'italic',
          fontWeight: 400,
          lineHeight: 1.6,
          borderLeft: `3px solid ${GOLD}`,
          paddingLeft: mob ? '1.5rem' : '2rem',
        }}>
          "The house doesn't announce itself. It lives quietly, in perfect balance between nature and craft. That's the whole point."
        </blockquote>
        <p style={{ color: 'rgba(255,255,255,0.48)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: mob ? '2rem' : '3rem', margin: '2rem auto 0' }}>
          &mdash; Robert E. Clark, Architect
        </p>
      </Fade>
    </section>
  );
}

// ============================================================
// LAND
// ============================================================
function Land() {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '6rem 2rem' : '12rem 4rem' }} id="the-land">
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <Fade up>
          <div style={{ textAlign: 'center', marginBottom: mob ? '3rem' : '5rem' }}>
            <Eyebrow center>The Landscape</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '3rem', fontWeight: 400, margin: '1rem 0' }}>
              15 Acres of Possibility
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.52)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 600, margin: '1rem auto 0' }}>
              Six structures. Tennis courts. A pool. An 1,400-foot deer fence. Forest on three sides.
            </p>
          </div>
        </Fade>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: mob ? '1.5rem' : '2rem', marginTop: mob ? '2rem' : '3rem' }}>
          <Fade delay={0.1}>
            <img src={IMG.grounds} alt="Grounds" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
          </Fade>
          <Fade delay={0.2}>
            <img src={IMG.tunnel} alt="High Tunnel" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
          </Fade>
          <Fade delay={0.3}>
            <img src={IMG.workshop} alt="Workshop" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
          </Fade>
          <Fade delay={0.4}>
            <img src={IMG.cabana} alt="Cabana" style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 2 }} />
          </Fade>
        </div>
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
  const items = [
    { icon: '🌱', title: 'Solar System', desc: '14.3kW solar array with battery backup + 30kW backup generator.' },
    { icon: '♨', title: 'Geothermal', desc: '20 wells, 300ft deep. Water Furnace HVAC. 5-zone climate control.' },
    { icon: '💧', title: 'Water', desc: 'Private well 50 GPM. Whole-house filtration. 2x1,500-gal septic.' },
    { icon: '🔒', title: 'Security', desc: 'Full Control4 automation + Araknis networking. Brown Safe vault.' },
  ];

  return (
    <section style={{ background: DARK, padding: mob ? '6rem 3rem' : '12rem 4rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Fade up>
          <div style={{ textAlign: 'center', marginBottom: mob ? '4rem' : '6rem' }}>
            <Eyebrow center>The Systems</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '3rem', fontWeight: 400, margin: '1rem 0 0' }}>
              Engineered for Independence
            </h2>
          </div>
        </Fade>

        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(2, 1fr)', gap: mob ? '2.5rem' : '3rem' }}>
          {items.map((it, i) => (
            <Fade key={i} delay={i * 0.12}>
              <Glass style={{ padding: mob ? '2.2rem' : '2.8rem' }}>
                <p style={{ fontSize: '2.4rem', margin: '0 0 1rem' }}>{it.icon}</p>
                <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.35rem', fontWeight: 400, margin: '0 0 0.6rem' }}>
                  {it.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.58)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.6, margin: 0 }}>
                  {it.desc}
                </p>
              </Glass>
            </Fade>
          ))}
        </div>
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
    <section style={{ background: DARK, padding: mob ? '6rem 3rem' : '12rem 4rem', textAlign: 'center' }} id="the-estate">
      <Fade up>
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <Eyebrow center>Location</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '3rem', fontWeight: 400, margin: '1rem 0' }}>
            Three Miles From<br />Pinehurst.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.58)',
            fontFamily: 'Georgia, serif',
            fontSize: mob ? '1rem' : '1.1rem',
            lineHeight: 1.7,
            margin: '1.5rem 0 0',
          }}>
            Deep in the forest. Close to world-class golf, Pinehurst village, and everything you need. Far enough away to feel like you own a private world.
          </p>
          <div style={{ marginTop: mob ? '2.5rem' : '3.5rem' }}>
            <a href={MATTERPORT} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: mob ? '0.9rem 2rem' : '1.1rem 2.6rem',
                background: GOLD,
                color: DARK,
                fontFamily: 'sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: 1,
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => { e.target.style.opacity = 0.88; e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; }}
            >
              Virtual Tour
            </a>
          </div>
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// INQUIRE
// ============================================================
function Inquire() {
  const w = useW();
  const mob = w < 768;
  const [e, setE] = useState('');
  const [msg, setMsg] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!e || !msg) return;
    try {
      // Normally this would POST to your backend
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setE('');
      setMsg('');
    } catch (err) { console.error(err); }
  };

  return (
    <section style={{ background: DARK, padding: mob ? '6rem 3rem' : '12rem 4rem', textAlign: 'center' }} id="inquire">
      <Fade up>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Eyebrow center>Interested?</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '2rem' : '2.8rem', fontWeight: 400, margin: '1rem 0 0.5rem' }}>
            Let's Talk
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.52)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.6, margin: '0 0 2.5rem' }}>
            Reach out to Rachel Hernandez, listing agent.
          </p>

          {sent && (
            <div style={{
              padding: '1.2rem',
              background: 'rgba(201, 169, 110, 0.1)',
              border: `1px solid ${GOLD}`,
              borderRadius: 2,
              color: CREAM,
              fontFamily: 'Georgia, serif',
              fontSize: '0.95rem',
              marginBottom: '2rem',
            }}>
              Thank you. We'll be in touch soon.
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <input
              type="email"
              placeholder="Your email"
              value={e}
              onChange={ev => setE(ev.target.value)}
              style={{
                padding: mob ? '0.9rem' : '1.1rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 2,
                color: CREAM,
                fontFamily: 'Georgia, serif',
                fontSize: '0.95rem',
                outline: 'none',
              }}
            />
            <textarea
              placeholder="Your message"
              value={msg}
              onChange={ev => setMsg(ev.target.value)}
              rows={mob ? 4 : 5}
              style={{
                padding: mob ? '0.9rem' : '1.1rem',
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 2,
                color: CREAM,
                fontFamily: 'Georgia, serif',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: mob ? '0.9rem' : '1.1rem',
                background: GOLD,
                color: DARK,
                fontFamily: 'sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: 2,
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
              onMouseEnter={e => { e.target.style.opacity = 0.88; e.target.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)'; }}
            >
              Send Inquiry
            </button>
          </form>
        </div>
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
    <footer style={{ background: 'rgba(0,0,0,0.4)', padding: mob ? '3rem 2rem' : '4rem 3rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
          107 Linden Trail, Aberdeen, North Carolina<br />
          <a href="mailto:rachelhernandezrealtor@gmail.com" style={{ color: GOLD, textDecoration: 'none' }}>
            rachelhernandezrealtor@gmail.com
          </a>
        </p>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
          &copy; 2026 Flow Farm Forest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// ============================================================
// MAIN APP
// ============================================================
export default function App() {
  return (
    <div style={{ background: DARK, color: '#fff', fontFamily: 'sans-serif' }}>
      <Hero />
      <Manifesto />
      <Foundation />
      <CinematicReveal image={IMG.living} alt="Living Room" label="Living" desc="The heart of the house. Soaring trusses. Piano. Views to the conservatory. Hand-painted details that quiet the eye." reverse={false} />
      <Numbers />
      <CinematicReveal image={IMG.conservatory} alt="Conservatory" label="Conservatory" desc="An octagonal dome catches light at every hour. Subtle geometry. Built as a room, not a statement." reverse={true} />
      <Quote />
      <CinematicReveal image={IMG.kitchen} alt="Kitchen" label="The Kitchen" desc="Wolf range. Sub-Zero. Scullery. Butcher block island. This is where the house really lives. Heritage tools. Modern systems." reverse={false} />
      <Land />
      <Mechanism />
      <CinematicReveal image={IMG.foyer} alt="Foyer" label="The Foyer" desc="Herringbone inlay. Soaring height. The entry whispers. Architecture at its most honest and refined." reverse={true} />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
