import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';
const MID = '#111111';

const VIDEO = 'https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4';

const IMG = {
  exterior:      'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds:       'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  aerial:        'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  tunnel:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop:      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  cabana:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  living:        'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  living2:       'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public',
  kitchen:       'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  conservatory:  'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
  foyer:         'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public',
};

// -- FADE ON SCROLL --
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

function Fade({ children, delay = 0, style = {} }) {
  const [ref, on] = useFade();
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'translateY(0)' : 'translateY(30px)',
      transition: `opacity 1.6s ease ${delay}s, transform 1.6s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

// -- TINY LABEL --
function Label({ children, center, gold }) {
  return (
    <p style={{
      fontFamily: 'sans-serif',
      fontSize: '10px',
      letterSpacing: '0.35em',
      textTransform: 'uppercase',
      color: gold ? GOLD : 'rgba(255,255,255,0.28)',
      margin: 0,
      textAlign: center ? 'center' : 'left',
    }}>{children}</p>
  );
}

// -- GOLD HAIRLINE --
function Line({ center }) {
  return (
    <div style={{
      width: 40,
      height: 1,
      background: GOLD,
      opacity: 0.5,
      margin: center ? '0 auto' : '0',
    }} />
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const a = setTimeout(() => setP(1), 400);
    const b = setTimeout(() => setP(2), 1600);
    const c = setTimeout(() => setP(3), 2800);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, []);
  const anim = (n) => ({
    opacity: p >= n ? 1 : 0,
    transform: p >= n ? 'translateY(0)' : 'translateY(18px)',
    transition: 'opacity 2s ease, transform 2s ease',
  });

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <video
        autoPlay loop muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.82 }}
      >
        <source src={VIDEO} type="video/mp4" />
      </video>

      {/* gradient */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 30%, transparent 52%, rgba(0,0,0,0.85) 100%)',
      }} />

      {/* top center wordmark */}
      <div style={{ position: 'absolute', top: '2.2rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...anim(1) }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '13px', letterSpacing: '0.4em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: 0 }}>
          Flow Farm
        </p>
      </div>

      {/* nav */}
      <nav style={{ position: 'absolute', top: '2rem', right: '3rem', zIndex: 10, display: 'flex', gap: '2.5rem', ...anim(1) }}>
        {['The Estate', 'The Land', 'Inquire'].map(n => (
          <a key={n} href={'#' + n.replace(' ', '-').toLowerCase()}
            style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none' }}>
            {n}
          </a>
        ))}
      </nav>

      {/* center headline */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 6vw',
      }}>
        <div style={anim(2)}>
          <h1 style={{
            color: '#fff',
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            fontSize: '5.8rem',
            lineHeight: 1.06,
            margin: 0,
            letterSpacing: '-0.01em',
            textShadow: '0 2px 80px rgba(0,0,0,0.4)',
          }}>
            Agritourism<br /><em>Established.</em><br />Legacy Ready.
          </h1>
        </div>

        <div style={{ ...anim(3), marginTop: '2.8rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: 1, height: 56, background: 'linear-gradient(to bottom, transparent, ' + GOLD + ')' }} />
        </div>
      </div>

      {/* bottom bar */}
      <div style={{
        position: 'absolute', bottom: '3rem', left: '3.5rem', right: '3.5rem', zIndex: 10,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        ...anim(3),
      }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 0.35rem' }}>
            107 Linden Trail, Aberdeen NC
          </p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>
            15 Acres &nbsp;--&nbsp; 6 Structures &nbsp;--&nbsp; $5,250,000
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
          <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)', animation: 'sc 2.2s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`@keyframes sc{0%,100%{opacity:0.15}50%{opacity:0.7}}`}</style>
    </section>
  );
}

// ============================================================
// OPENING STATEMENT
// ============================================================
function Opening() {
  return (
    <section style={{ background: DARK, padding: '16rem 0', textAlign: 'center' }}>
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.8rem', maxWidth: 800, margin: '0 auto', padding: '0 4rem' }}>
          <Label center>The Vision</Label>
          <Line center />
          <h2 style={{
            color: CREAM,
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: 1.32,
            margin: 0,
            letterSpacing: '-0.015em',
          }}>
            Not just a home.<br />
            A living system built for those<br />
            who intend to leave something behind.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.38)',
            fontFamily: 'Georgia, serif',
            fontSize: '1.15rem',
            lineHeight: 2.1,
            margin: 0,
            maxWidth: 600,
          }}>
            Fifteen acres of forest and working farmland. A fully self-sustaining compound
            three miles from Pinehurst Resort. Designed by Robert E. Clark AIA as one of
            his final private commissions -- and built to operate indefinitely,
            independently, and beautifully.
          </p>
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// FULL BLEED PHOTO
// ============================================================
function Bleed({ src, caption }) {
  return (
    <section style={{ position: 'relative', height: '94vh', overflow: 'hidden' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.72) 100%)' }} />
      {caption && (
        <Fade style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.48)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', margin: 0, letterSpacing: '0.02em' }}>
            {caption}
          </p>
        </Fade>
      )}
    </section>
  );
}

// ============================================================
// NUMBERS
// ============================================================
function Numbers() {
  const stats = [
    ['15',     'Total Acres'],
    ['8,519',  'Sq Ft Above Grade'],
    ['6 / 7',  'Beds / Baths'],
    ['7',      'Buildable Acres'],
    ['6',      'Structures'],
    ['3 mi',   'To Pinehurst Resort'],
    ['14.3kW', 'Solar Array'],
    ['1,200A', 'Total Power'],
    ['$5.25M', 'Offered At'],
  ];
  return (
    <section style={{ background: MID, padding: '12rem 0' }}>
      <Fade>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <Label center>By The Numbers</Label>
        </div>
      </Fade>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        maxWidth: 1000,
        margin: '0 auto',
        padding: '0 4vw',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}>
        {stats.map(([v, l], i) => (
          <Fade key={l} delay={i * 0.07}>
            <div style={{
              textAlign: 'center',
              padding: '3.5rem 1rem',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
            }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '2.8rem', fontWeight: 400, margin: '0 0 0.7rem', letterSpacing: '-0.02em' }}>{v}</p>
              <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>{l}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// EDITORIAL SPLIT -- photo left or right
// ============================================================
function Split({ src, label, headline, paragraphs, tags, flip = false, bg = DARK, id }) {
  return (
    <section id={id} style={{ background: bg, padding: '14rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 5vw',
        gap: '9rem',
        alignItems: 'center',
      }}>
        {/* photo */}
        <Fade delay={0.05} style={{ order: flip ? 2 : 1 }}>
          <img src={src} alt={label} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
        </Fade>

        {/* text */}
        <Fade delay={0.25} style={{ order: flip ? 1 : 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Label>{label}</Label>
            <Line />
            <h3 style={{
              color: CREAM,
              fontFamily: 'Georgia, serif',
              fontWeight: 400,
              fontSize: '2.6rem',
              lineHeight: 1.22,
              margin: 0,
              letterSpacing: '-0.01em',
              whiteSpace: 'pre-line',
            }}>{headline}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {paragraphs.map((t, i) => (
                <p key={i} style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 2, margin: 0 }}>{t}</p>
              ))}
            </div>
            {tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem 2.5rem', paddingTop: '0.8rem' }}>
                {tags.map(t => (
                  <span key={t} style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', paddingBottom: '0.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>
                ))}
              </div>
            )}
          </div>
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// THE LAND -- tall portrait grid
// ============================================================
function Land() {
  const structures = [
    {
      src: IMG.cabana,
      label: 'Cabana House',
      body: 'A private guest retreat with one bedroom, full bath, and kitchen. Its own entrance. The estate within the estate.',
    },
    {
      src: IMG.tunnel,
      label: 'High Tunnel Greenhouse',
      body: '96 by 36 feet. Year-round specialty crop production with geothermal climate control. Pineapples, avocados, citrus.',
    },
    {
      src: IMG.workshop,
      label: 'Farm Workshop',
      body: '30 by 40 feet. Full plumbing, electrical, and a 12 x 8 walk-in cooler. Built for a real operation.',
    },
  ];

  return (
    <section id="the-land" style={{ background: DARK, padding: '16rem 0' }}>
      {/* header */}
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', marginBottom: '10rem', padding: '0 4rem' }}>
          <Label center>The Land</Label>
          <Line center />
          <h2 style={{
            color: CREAM,
            fontFamily: 'Georgia, serif',
            fontWeight: 400,
            fontSize: '3rem',
            lineHeight: 1.28,
            textAlign: 'center',
            margin: 0,
            letterSpacing: '-0.015em',
          }}>
            Three acres producing.<br />Seven acres waiting.
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.32)',
            fontFamily: 'Georgia, serif',
            fontSize: '1.1rem',
            lineHeight: 2.1,
            textAlign: 'center',
            maxWidth: 560,
            margin: 0,
          }}>
            USDA-certified veganic. O2Compost regenerative systems.
            Biochar production. 1,400-ft double deer fence.
            A living farm already producing -- and seven raw acres ready for whatever comes next.
          </p>
        </div>
      </Fade>

      {/* tall portrait grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 5vw',
        gap: '5rem',
      }}>
        {structures.map((s, i) => (
          <Fade key={s.label} delay={i * 0.2}>
            <div>
              <img
                src={s.src}
                alt={s.label}
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block', marginBottom: '2.8rem' }}
              />
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.15rem', margin: '0 0 1rem', letterSpacing: '-0.01em' }}>{s.label}</p>
              <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '0.98rem', lineHeight: 1.95, margin: 0 }}>{s.body}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// INFRASTRUCTURE
// ============================================================
function Systems() {
  const cols = [
    { label: 'Energy',     items: ['14.3kW Solar -- 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane', '1,200 Amp Total Power'] },
    { label: 'Climate',    items: ['Geothermal -- 20 Wells x 300 Ft', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification', 'Zone-Independent Control'] },
    { label: 'Water',      items: ['Private Well -- Up to 50 GPM', '2 x 1,500 Gal Private Septic', 'Whole-House Water Filtration', 'Whole-House Fire Sprinkler', 'Walk-In Cooler 12 x 8 Ft'] },
    { label: 'Smart Home', items: ['Control4 Audio, Video, Lighting', 'Araknis Enterprise Network', 'Whole Campus Wi-Fi', 'Brown Safe + Vault Door', 'Dual Central Vacuum'] },
  ];
  return (
    <section style={{ background: MID, padding: '16rem 0' }}>
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', marginBottom: '9rem', padding: '0 4rem' }}>
          <Label center>Infrastructure</Label>
          <Line center />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '3rem', lineHeight: 1.28, textAlign: 'center', margin: 0, letterSpacing: '-0.015em' }}>
            Off-grid capable.<br /><em>On-grid refined.</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '1.1rem', lineHeight: 2.1, textAlign: 'center', maxWidth: 500, margin: 0 }}>
            Solar, battery, generator, geothermal, and private water.
            Complete autonomy -- quietly, invisibly, without compromise.
          </p>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: '4rem' }}>
        {cols.map((col, i) => (
          <Fade key={col.label} delay={i * 0.12}>
            <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: '0 0 2rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              {col.label}
            </p>
            {col.items.map(item => (
              <p key={item} style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.9, margin: '0 0 0.8rem' }}>{item}</p>
            ))}
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
  return (
    <section style={{ background: DARK, padding: '16rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: '9rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Label>Location</Label>
            <Line />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.6rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.01em' }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 2, margin: 0 }}>
              Three miles from Pinehurst Resort. Moore County Regional Airport
              for private aviation is minutes away. Raleigh-Durham International
              is under an hour. A transferable Pinehurst Country Club Signature
              Golf Membership is included with the sale.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', paddingTop: '0.5rem' }}>
              {[
                'Pinehurst Resort -- 3 Miles',
                'Moore County Regional Airport -- Private Aviation',
                'Raleigh-Durham International -- 1 Hour',
                'FirstHealth Moore Regional Hospital',
              ].map(item => (
                <p key={item} style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0, paddingLeft: '1.2rem', borderLeft: '1px solid rgba(201,169,110,0.3)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <img src={IMG.aerial} alt="Aerial view" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
        </Fade>
      </div>
    </section>
  );
}

// ============================================================
// INQUIRE
// ============================================================
function Inquire() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const base = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.12)',
    color: CREAM,
    fontFamily: 'Georgia, serif',
    fontSize: '1rem',
    padding: '1rem 0',
    outline: 'none',
    width: '100%',
  };
  return (
    <section id="inquire" style={{ background: MID, padding: '16rem 0' }}>
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.5rem', marginBottom: '6rem' }}>
          <Label center>Private Inquiry</Label>
          <Line center />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '3rem', margin: 0, letterSpacing: '-0.015em', textAlign: 'center' }}>
            Request a Private Showing
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', margin: 0, textAlign: 'center' }}>
            Exclusively represented by Rachel Hernandez
          </p>
        </div>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', textAlign: 'center' }}>
            Thank you. We will be in touch shortly.
          </p>
        ) : (
          <form
            onSubmit={e => { e.preventDefault(); setSent(true); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', maxWidth: 480, margin: '0 auto', padding: '0 3rem', textAlign: 'left' }}
          >
            <input name="name" value={form.name} onChange={set} placeholder="Your Name" required style={base} />
            <input name="email" value={form.email} onChange={set} type="email" placeholder="Email Address" required style={base} />
            <textarea name="message" value={form.message} onChange={set} placeholder="Tell us about your interest" rows={4} style={{ ...base, resize: 'none' }} />
            <button type="submit" style={{
              marginTop: '1rem',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.55)',
              fontFamily: 'sans-serif',
              fontSize: '10px',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              padding: '1.3rem 3.5rem',
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}>
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
  return (
    <footer style={{
      background: '#050505',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      padding: '4rem 5vw',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: '1rem',
    }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
          Flow Farm -- 107 Linden Trail, Aberdeen NC
        </p>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>
          Exclusively Offered at $5,250,000
        </p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>
          Rachel Hernandez
        </p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.12em', margin: 0 }}>
          rachelhernandezrealtor@gmail.com
        </p>
      </div>
    </footer>
  );
}

// ============================================================
// ROOT
// ============================================================
export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0 }}>
      <Hero />
      <Opening />
      <Bleed src={IMG.exterior} caption="Main residence -- Robert E. Clark AIA, Pinehurst NC" />
      <Numbers />
      <Split
        id="the-estate"
        src={IMG.living}
        label="The Residence"
        headline={"A grand living room.\n27 feet wide. 17 feet tall."}
        paragraphs={[
          "Reclaimed Civil War-era heart pine floors run the full depth of the home. Seven fireplaces. Six bedrooms, seven bathrooms. Every room built with proportion, permanence, and the long view in mind.",
          "Designed by Robert E. Clark AIA as one of his final private commissions. 8,519 square feet above grade. A home that took years to build -- and will outlast everything built around it.",
        ]}
        tags={['6 Bedrooms', '7 Bathrooms', '7 Fireplaces', 'Heart Pine Floors', 'Robert E. Clark AIA']}
        bg={DARK}
      />
      <Split
        src={IMG.conservatory}
        label="The Conservatory"
        headline={"Glass on every side.\nAn octagonal dome overhead."}
        paragraphs={["19.5 by 17.7 feet, entirely glass-wrapped with a skylight dome that tracks the sky from morning to dusk. The room that reminds you why you came here."]}
        flip
        bg={MID}
      />
      <Split
        src={IMG.kitchen}
        label="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the serious cook."}
        paragraphs={[
          "A 60-inch dual fuel Wolf range with six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Sub-Zero refrigeration throughout.",
          "The pantry opens to the breakfast room, which looks across the farm. This house was designed to feed people.",
        ]}
        tags={['Wolf 60" Dual Fuel', 'Sub-Zero', '2 KitchenAid Dishwashers', 'Walk-In Pantry']}
        bg={DARK}
      />
      <Bleed src={IMG.conservatory2} caption="Glass conservatory -- octagonal skylight dome, morning to dusk" />
      <Land />
      <Bleed src={IMG.grounds} caption="3-acre USDA veganic farm -- active, producing, regenerative" />
      <Systems />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
