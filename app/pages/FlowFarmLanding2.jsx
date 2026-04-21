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
            fontSize: mob ? '2.8rem' : '4.8rem',
            lineHeight: 1.1, margin: 0, letterSpacing: '-0.01em', textShadow: '0 4px 40px rgba(0,0,0,0.6)',
          }}>
            Flow Farm<br />Pinehurst
          </h1>
        </div>
        <div style={{ marginTop: mob ? '2.4rem' : '3.2rem', ...show(3) }}>
          <p style={{ color: 'rgba(255,255,255,0.48)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.9rem' : '1.08rem', lineHeight: 1.8, margin: 0, maxWidth: 520, fontStyle: 'italic' }}>
            Fifteen acres of working farmland, forest, and a fully self-sustaining compound — three miles from Pinehurst Resort.
          </p>
        </div>
        <div style={{ marginTop: mob ? '2.8rem' : '3.8rem', ...show(3) }}>
          <HeroStats mob={mob} />
        </div>
        <div style={{ ...show(3) }}>
          <Glass style={{ padding: mob ? '0.95rem 1.8rem' : '1.2rem 2.4rem', borderRadius: '32px' }}>
            <a href="#inquire" style={{
              color: GOLD, fontSize: '10px', fontFamily: 'sans-serif', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500,
            }}>
              Start Tour
            </a>
          </Glass>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// MANIFESTO
// ============================================================
function Manifesto() {
  return (
    <section style={{ background: DARK, padding: '5rem 6vw', maxWidth: 1200, margin: '0 auto' }}>
      <Fade delay={0}>
        <div>
          <Eyebrow>Our Philosophy</Eyebrow>
          <GoldLine />
        </div>
      </Fade>
      <Fade delay={0.2} up>
        <h2 style={{
          color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
          fontWeight: 400, lineHeight: 1.25, margin: '1.6rem 0 2rem 0', letterSpacing: '-0.01em',
        }}>
          Built not for today, but for generations. Agritourism, architecture, and legacy wrapped in a single vision.
        </h2>
      </Fade>
      <Fade delay={0.4}>
        <p style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 700, margin: '0 0 2rem 0' }}>
          Flow Farm is a working ecosystem—vegetable gardens, pasture land, forest. Every structural decision was made with soil, sun, and source in mind. This isn't a residence. It's a statement of agricultural and architectural integrity.
        </p>
      </Fade>
    </section>
  );
}

// ============================================================
// FOUNDATION
// ============================================================
function Foundation() {
  return (
    <section style={{ background: DARK, padding: '5rem 6vw', maxWidth: 1200, margin: '0 auto', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
      <Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem' }}>
          {[
            { label: 'Footprint', value: '8,519 SF' },
            { label: 'Lower Level', value: '2,531 SF' },
            { label: 'Beds / Baths', value: '6 / 7' },
            { label: 'Acreage', value: '15 Acres' },
            { label: 'Outbuildings', value: '5 Structures' },
            { label: 'Built', value: '2017' },
          ].map(s => (
            <div key={s.label}>
              <Eyebrow>{s.label}</Eyebrow>
              <p style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.8rem', margin: '0.6rem 0 0 0', fontWeight: 400 }}>
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// CINEMA REVEALS
// ============================================================
function CinematicReveal({ title, description, image, reverse, cta }) {
  const w = useW();
  const mob = w < 768;
  const [ref, on] = useFade();

  return (
    <section style={{
      background: DARK, padding: mob ? '3rem 5vw' : '4rem 6vw',
      borderTop: '1px solid rgba(201,169,110,0.15)',
    }}>
      <div ref={ref} style={{
        maxWidth: 1200, margin: '0 auto',
        display: mob ? 'grid' : 'grid',
        gridTemplateColumns: mob ? '1fr' : '1fr 1fr',
        gap: mob ? '2rem' : '3.5rem',
        alignItems: 'center',
        gridAutoFlow: reverse && !mob ? 'dense' : 'row',
      }}>
        <div style={{
          opacity: on ? 1 : 0.4, transform: on ? 'scale(1)' : 'scale(0.96)',
          transition: 'opacity 1.4s ease, transform 1.4s ease',
        }}>
          <img src={cdn(image)} alt={title} style={{
            width: '100%', height: 'auto', display: 'block', borderRadius: '4px',
          }} />
        </div>
        <div style={{
          opacity: on ? 1 : 0, transform: on ? 'translateX(0)' : 'translateX(40px)',
          transition: 'opacity 1.6s ease 0.2s, transform 1.6s ease 0.2s',
        }}>
          <Eyebrow>{title}</Eyebrow>
          <GoldLine />
          <h3 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: mob ? '1.6rem' : '2.2rem', margin: '1.2rem 0 1rem 0', lineHeight: 1.3, fontWeight: 400 }}>
            {description}
          </h3>
          {cta && <a href={cta.href} style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none' }}>{cta.text}</a>}
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
  return (
    <section style={{ background: DARK, padding: mob ? '3.5rem 5vw' : '5rem 6vw', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Fade>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2.5rem', textAlign: 'center' }}>
            {[
              { label: 'Power Systems', value: '14.3kW' },
              { label: 'Solar Panels', value: '61' },
              { label: 'Geothermal Wells', value: '20 x 300\'' },
              { label: 'Propane Reserve', value: '2,000 Gal.' },
              { label: 'Well Flow Rate', value: '50 GPM' },
              { label: 'Private Land', value: '15 Acres' },
            ].map(s => (
              <div key={s.label}>
                <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: '2rem', margin: 0, fontWeight: 400 }}>
                  {s.value}
                </p>
                <p style={{ color: 'rgba(255,255,255,0.52)', fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0.5rem 0 0 0' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// QUOTE
// ============================================================
function Quote() {
  return (
    <section style={{ background: DARK, padding: '4rem 6vw', borderTop: '1px solid rgba(201,169,110,0.15)', textAlign: 'center' }}>
      <Fade>
        <blockquote style={{
          color: 'rgba(255,255,255,0.72)', fontFamily: 'Georgia, serif', fontSize: '1.4rem',
          lineHeight: 1.8, margin: 0, fontStyle: 'italic', maxWidth: 720, margin: '0 auto',
        }}>
          "Land that is farmed, built upon with intention, and left to future stewards—that is legacy."
        </blockquote>
      </Fade>
    </section>
  );
}

// ============================================================
// LOCATION
// ============================================================
function Location() {
  return (
    <section id="the-land" style={{ background: DARK, padding: '5rem 6vw', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Fade>
          <Eyebrow>Geography & Access</Eyebrow>
          <GoldLine />
        </Fade>
        <Fade delay={0.2} up>
          <h2 style={{
            color: '#fff', fontFamily: 'Georgia, serif', fontSize: '2.8rem', fontWeight: 400,
            lineHeight: 1.25, margin: '1.4rem 0 2rem 0',
          }}>
            Three miles from Pinehurst Resort. Linden Trail feeds directly into the forest conservation corridor.
          </h2>
        </Fade>
        <Fade delay={0.4}>
          <p style={{ color: 'rgba(255,255,255,0.62)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.8 }}>
            Aberdeen, NC. Private well. Septic (2x1500 gal). 1,200 amp power service. High-speed fiber. Transferable Pinehurst Country Club membership.
          </p>
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// MECHANISM
// ============================================================
function Mechanism() {
  return (
    <section style={{ background: DARK, padding: '5rem 6vw', borderTop: '1px solid rgba(201,169,110,0.15)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Fade>
          <Eyebrow>Infrastructure</Eyebrow>
          <GoldLine />
        </Fade>
        <Fade delay={0.2} up>
          <h3 style={{
            color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400,
            lineHeight: 1.5, margin: '1.2rem 0 0.8rem 0',
          }}>
            Solar + Battery Backup
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            14.3kW photovoltaic system (61 Samsung panels) paired with Sunny Island battery inverters. 30kW Kohler generator with 2,000 gallons of propane reserve.
          </p>
        </Fade>

        <Fade delay={0.3} up style={{ marginTop: '1.8rem' }}>
          <h3 style={{
            color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400,
            lineHeight: 1.5, margin: '0 0 0.8rem 0',
          }}>
            Geothermal Heating
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            20 geothermal wells (300 feet each) supply two Water Furnace units with 5-zone temperature control. Private well (50 GPM) with whole-house filtration.
          </p>
        </Fade>

        <Fade delay={0.4} up style={{ marginTop: '1.8rem' }}>
          <h3 style={{
            color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400,
            lineHeight: 1.5, margin: '0 0 0.8rem 0',
          }}>
            Kitchen Precision
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            Wolf 60" dual-fuel range, Sub-Zero refrigeration, wine fridge, 12x8 walk-in cooler, butcher block prep island. Scullery with secondary sink and hand-wash station.
          </p>
        </Fade>

        <Fade delay={0.5} up style={{ marginTop: '1.8rem' }}>
          <h3 style={{
            color: '#fff', fontFamily: 'Georgia, serif', fontSize: '1.4rem', fontWeight: 400,
            lineHeight: 1.5, margin: '0 0 0.8rem 0',
          }}>
            Smart Systems
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.7, margin: 0 }}>
            Control4 automation + Araknis networking. Brown Safe vault door on lower level. Fiber-optic backbone with Wi-Fi 6.
          </p>
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// INQUIRE
// ============================================================
function Inquire() {
  return (
    <section id="inquire" style={{
      background: `linear-gradient(135deg, rgba(0,0,0,0.8), rgba(201,169,110,0.08)), url(${IMG.exterior}})`,
      backgroundSize: 'cover', backgroundPosition: 'center',
      padding: '5rem 6vw', textAlign: 'center', borderTop: '1px solid rgba(201,169,110,0.15)',
    }}>
      <Fade>
        <h2 style={{
          color: '#fff', fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 5vw, 3rem)',
          fontWeight: 400, margin: 0, letterSpacing: '-0.01em',
        }}>
          Start a conversation about Flow Farm
        </h2>
      </Fade>
      <Fade delay={0.2} style={{ marginTop: '1.6rem' }}>
        <p style={{
          color: 'rgba(255,255,255,0.68)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', margin: 0,
        }}>
          Inquiries by phone or email. Private tours by appointment.
        </p>
      </Fade>
      <Fade delay={0.4} style={{ marginTop: '2.4rem', display: 'flex', gap: '1.6rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Glass style={{ padding: '1rem 2rem', borderRadius: '32px' }}>
          <a href="tel:+19106661111" style={{
            color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em',
            textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500,
          }}>
            +1 (910) 666-1111
          </a>
        </Glass>
        <Glass style={{ padding: '1rem 2rem', borderRadius: '32px' }}>
          <a href="mailto:rachel@example.com" style={{
            color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em',
            textTransform: 'uppercase', textDecoration: 'none', fontWeight: 500,
          }}>
            hello@flowfarm.farm
          </a>
        </Glass>
      </Fade>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer style={{
      background: '#000', borderTop: '1px solid rgba(201,169,110,0.15)',
      padding: '2rem 6vw', textAlign: 'center',
    }}>
      <p style={{
        color: 'rgba(255,255,255,0.35)', fontFamily: 'sans-serif', fontSize: '8px',
        letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0,
      }}>
        © 2026 Flow Farm. All rights reserved.
      </p>
    </footer>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  return (
    <div style={{ background: DARK, color: '#fff' }}>
      <Hero />
      <Manifesto />
      <Foundation />
      <CinematicReveal title="Living Room" description="Soaring trusses, floor-to-ceiling windows, views to the conservatory." image={IMG.living} />
      <Numbers />
      <CinematicReveal title="Conservatory" description="Octagonal dome, 20ft ceiling, natural light flooding east." image={IMG.conservatory} reverse />
      <Quote />
      <CinematicReveal title="Kitchen" description="Wolf dual-fuel precision, Sub-Zero cold, butcher block prep. Scullery separate." image={IMG.kitchen} />
      <Location />
      <Mechanism />
      <CinematicReveal title="Foyer" description="Herringbone entry, soaring stairs, chandelier anchor." image={IMG.foyer} reverse />
      <Inquire />
      <Footer />
    </div>
  );
}
