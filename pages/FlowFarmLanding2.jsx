import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const VIDEO = 'https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4';
const MATTERPORT = 'https://my.matterport.com/show/?m=xZRfSiQPuQ8';

const IMG = {
  exterior:      'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds:       'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  aerial:        'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  tunnel:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop:      'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  cabana:        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  living:        'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  kitchen:       'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  conservatory:  'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
  foyer:         'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public',
};

function useFade(threshold) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); o.disconnect(); }
    }, { threshold: threshold || 0.12 });
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
      transform: on ? 'none' : (up ? 'translateY(40px)' : 'translateY(22px)'),
      transition: `opacity 1.8s ease ${delay || 0}s, transform 1.8s ease ${delay || 0}s`,
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
      background: 'rgba(10,10,10,0.52)',
      backdropFilter: 'blur(18px)',
      WebkitBackdropFilter: 'blur(18px)',
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
      fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.38em',
      textTransform: 'uppercase', color: GOLD, margin: 0,
      textAlign: center ? 'center' : 'left',
    }}>{children}</p>
  );
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const t = [
      setTimeout(() => setP(1), 300),
      setTimeout(() => setP(2), 1400),
      setTimeout(() => setP(3), 2600),
    ];
    return () => t.forEach(clearTimeout);
  }, []);
  const show = (n, extra) => ({
    opacity: p >= n ? 1 : 0,
    transform: p >= n ? 'none' : 'translateY(24px)',
    transition: 'opacity 2.4s ease, transform 2.4s ease',
    ...extra,
  });

  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <video autoPlay loop muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.78 }}>
        <source src={VIDEO} type="video/mp4" />
      </video>

      {/* cinematic vignette */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 25%, transparent 55%, rgba(0,0,0,0.92) 100%)' }} />

      {/* wordmark */}
      <div style={{ position: 'absolute', top: '2.8rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...show(1) }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '11px', letterSpacing: '0.55em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', margin: 0 }}>
          Flow Farm
        </p>
      </div>

      {/* nav */}
      <nav style={{ position: 'absolute', top: '2.5rem', right: '3.5rem', zIndex: 10, display: 'flex', gap: '3rem', ...show(1) }}>
        {['The Estate', 'The Land', 'Inquire'].map(n => (
          <a key={n} href={'#' + n.replace(' ', '-').toLowerCase()}
            style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.26em', textTransform: 'uppercase', textDecoration: 'none' }}>
            {n}
          </a>
        ))}
      </nav>

      {/* center hero text */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8vw' }}>
        <div style={show(2)}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, margin: '0 0 2.2rem' }}>
            The Architectural Masterpiece
          </p>
          <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '6.4rem', lineHeight: 1.04, margin: 0, letterSpacing: '-0.02em', textShadow: '0 4px 120px rgba(0,0,0,0.5)' }}>
            The House That<br /><em>Quietly Steals</em><br />the Whole Show.
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: '2.4rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem', margin: '0 0 2.8rem', letterSpacing: '0.02em' }}>
            Architect-designed, materially rich, and impossible<br />to confuse with ordinary luxury.
          </p>
          <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, rgba(201,169,110,0.6), transparent)', margin: '0 auto' }} />
        </div>
      </div>

      {/* bottom left info */}
      <div style={{ position: 'absolute', bottom: '3.5rem', left: '3.5rem', right: '3.5rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', ...show(3) }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>107 Linden Trail, Aberdeen NC</p>
          <p style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>15 Acres -- 6 Structures -- $5,250,000</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.14)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', margin: 0 }}>Scroll</p>
          <div style={{ width: 1, height: 38, background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)', animation: 'sc 2.4s ease-in-out infinite' }} />
        </div>
      </div>
      <style>{`@keyframes sc{0%,100%{opacity:0.08}50%{opacity:0.6}}`}</style>
    </section>
  );
}

// ============================================================
// MANIFESTO -- text on dark, no photo
// ============================================================
function Manifesto() {
  return (
    <section style={{ background: DARK, padding: '20rem 0', textAlign: 'center' }}>
      <Fade up>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 5vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3.2rem' }}>
          <Eyebrow center>107 Linden Trail -- Aberdeen, North Carolina</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '3.4rem', lineHeight: 1.28, margin: 0, letterSpacing: '-0.02em' }}>
            Not just a home.<br />
            A living system built for those<br />
            who intend to leave something behind.
          </h2>
          <div style={{ width: 38, height: 1, background: GOLD, opacity: 0.4 }} />
          <p style={{ color: 'rgba(255,255,255,0.34)', fontFamily: 'Georgia, serif', fontSize: '1.2rem', lineHeight: 2.2, margin: 0, maxWidth: 640 }}>
            Fifteen acres of forest and working farmland three miles from Pinehurst Resort.
            Designed by Robert E. Clark AIA as one of his final private commissions.
            Built to operate indefinitely, independently, and beautifully.
          </p>
          <a href={MATTERPORT} target="_blank" rel="noreferrer"
            style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.34em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(201,169,110,0.3)', paddingBottom: '0.35rem' }}>
            Begin the Virtual Tour
          </a>
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// CINEMATIC TEXT-ON-PHOTO -- glass panel over full bleed
// ============================================================
function CinematicReveal({ src, eyebrow, headline, body, align, quote }) {
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(135deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.15) 100%)' }} />

      <div style={{ position: 'relative', zIndex: 5, maxWidth: 1360, margin: '0 auto', padding: '12rem 6vw', width: '100%', display: 'flex', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Fade delay={0.1}>
          {quote ? (
            <div style={{ maxWidth: 720, textAlign: 'center' }}>
              <p style={{ color: '#fff', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '3.2rem', lineHeight: 1.3, margin: 0, letterSpacing: '-0.01em', textShadow: '0 2px 60px rgba(0,0,0,0.6)' }}>
                "{headline}"
              </p>
            </div>
          ) : (
            <Glass style={{ padding: '4rem 4.5rem', maxWidth: 560 }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {eyebrow && <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.4, margin: '1.8rem 0' }} />}
              <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.2, margin: eyebrow ? '0 0 2rem' : '0 0 2rem', letterSpacing: '-0.015em', whiteSpace: 'pre-line' }}>
                {headline}
              </h2>
              {body && <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 2.1, margin: 0 }}>{body}</p>}
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
  const stats = [
    ['15', 'Total Acres'], ['8,519', 'Sq Ft Above Grade'], ['6 / 7', 'Beds / Baths'],
    ['7', 'Buildable Acres'], ['6', 'Structures'], ['3 mi', 'To Pinehurst'],
    ['14.3kW', 'Solar Array'], ['1,200A', 'Total Power'], ['$5.25M', 'Offered At'],
  ];
  return (
    <section style={{ background: '#0d0d0d', padding: '14rem 0' }}>
      <Fade>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.38em', textTransform: 'uppercase', color: GOLD, margin: '0 0 7rem', textAlign: 'center' }}>
          By The Numbers
        </p>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 1060, margin: '0 auto', padding: '0 5vw', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        {stats.map(([v, l], i) => (
          <Fade key={l} delay={i * 0.06}>
            <div style={{ textAlign: 'center', padding: '4rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '3rem', fontWeight: 400, margin: '0 0 0.8rem', letterSpacing: '-0.03em' }}>{v}</p>
              <p style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', margin: 0 }}>{l}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// THE MECHANISM -- infrastructure on dark with glass
// ============================================================
function Mechanism() {
  const cols = [
    { label: 'Energy',     items: ['14.3kW Solar -- 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane', '1,200 Amp Total Power'] },
    { label: 'Climate',    items: ['Geothermal -- 20 Wells x 300 Ft', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification Per Zone', 'Zone-Independent Control'] },
    { label: 'Water',      items: ['Private Well -- Up to 50 GPM', '2 x 1,500 Gal Private Septic', 'Whole-House Water Filtration', 'Whole-House Fire Sprinkler', 'Walk-In Cooler 12 x 8 Ft'] },
    { label: 'Smart Home', items: ['Control4 Audio, Video, Lighting', 'Araknis Enterprise Network', 'Whole Campus Wi-Fi', 'Brown Safe + Vault Door', 'Dual Central Vacuum'] },
  ];
  return (
    <section style={{ position: 'relative', background: DARK, padding: '18rem 0', overflow: 'hidden' }}>
      {/* subtle background texture */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG.aerial})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06, zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Fade>
          <div style={{ textAlign: 'center', marginBottom: '10rem', padding: '0 4rem' }}>
            <Eyebrow center>The Mechanism</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '3.4rem', lineHeight: 1.26, margin: '2.5rem 0 2.8rem', letterSpacing: '-0.02em' }}>
              Structure that holds<br /><em>freedom.</em>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: '1.15rem', lineHeight: 2.2, maxWidth: 560, margin: '0 auto' }}>
              Operating with commercial-grade gravity. Solar, battery, generator, geothermal,
              private water. Autonomy at this scale is not inherited. It is engineered.
            </p>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1360, margin: '0 auto', padding: '0 5vw', gap: '3rem' }}>
          {cols.map((col, i) => (
            <Fade key={col.label} delay={i * 0.12}>
              <Glass style={{ padding: '3rem 2.5rem', height: '100%' }}>
                <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', margin: '0 0 2rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {col.label}
                </p>
                {col.items.map(item => (
                  <p key={item} style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 2, margin: '0 0 0.6rem' }}>{item}</p>
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
// THE LAND -- portrait grid
// ============================================================
function Land() {
  const structures = [
    { src: IMG.cabana,   label: 'Cabana House',           body: 'A private guest retreat. One bed, full bath, full kitchen, private entrance. The estate within the estate.' },
    { src: IMG.tunnel,   label: 'High Tunnel Greenhouse', body: '96 by 36 feet. Geothermal climate control. Pineapples, avocados, citrus. Year-round, every year.' },
    { src: IMG.workshop, label: 'Farm Workshop',          body: '30 by 40 feet. Plumbing, electrical, walk-in cooler. Built to run a real operation, not just the idea of one.' },
  ];
  return (
    <section id="the-land" style={{ background: '#0d0d0d', padding: '18rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', marginBottom: '12rem', padding: '0 5vw', textAlign: 'center' }}>
          <Eyebrow center>The Land</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '3.4rem', lineHeight: 1.26, margin: 0, letterSpacing: '-0.02em' }}>
            Three acres producing.<br />Seven acres waiting.
          </h2>
          <div style={{ width: 38, height: 1, background: GOLD, opacity: 0.4 }} />
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: '1.18rem', lineHeight: 2.2, maxWidth: 580, margin: 0 }}>
            USDA-certified veganic. O2Compost regenerative systems.
            Biochar production. 1,400-ft double deer fence.
            A farm already running -- and seven raw acres ready for whatever comes next.
          </p>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 1360, margin: '0 auto', padding: '0 5vw', gap: '4rem' }}>
        {structures.map((s, i) => (
          <Fade key={s.label} delay={i * 0.2}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={s.src} alt={s.label} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2.5rem 2rem' }}>
                  <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.3rem', margin: 0, letterSpacing: '-0.01em' }}>{s.label}</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 2, margin: '2rem 0 0', padding: '0 0.2rem' }}>{s.body}</p>
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
  return (
    <section style={{ background: DARK, padding: '18rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1360, margin: '0 auto', padding: '0 5vw', gap: '10rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.4rem' }}>
            <Eyebrow>Location</Eyebrow>
            <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.4 }} />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.015em' }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'Georgia, serif', fontSize: '1.08rem', lineHeight: 2.1, margin: 0 }}>
              Three miles from Pinehurst Resort. A transferable Pinehurst Country Club
              Signature Golf Membership -- unlimited access to Course No. 7 and No. 9 --
              is included with the sale.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {['Pinehurst Resort -- 3 Miles', 'Moore County Regional -- Private Aviation', 'Raleigh-Durham International -- 1 Hour', 'FirstHealth Moore Regional Hospital', 'Pinehurst Country Club -- Membership Included'].map(item => (
                <p key={item} style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0, paddingLeft: '1.2rem', borderLeft: '1px solid rgba(201,169,110,0.28)' }}>
                  {item}
                </p>
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.2}>
          <div style={{ position: 'relative' }}>
            <img src={IMG.aerial} alt="Aerial view" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
            <Glass style={{ position: 'absolute', bottom: '-2rem', left: '-2rem', padding: '1.8rem 2.5rem' }}>
              <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Exclusively Offered At</p>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.6rem', margin: 0, letterSpacing: '-0.02em' }}>$5,250,000</p>
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const inp = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '1.1rem 0', outline: 'none', width: '100%' };
  return (
    <section id="inquire" style={{ background: '#0d0d0d', padding: '18rem 0' }}>
      <Fade up>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.8rem', marginBottom: '7rem' }}>
          <Eyebrow center>Private Inquiry</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '3.4rem', margin: 0, letterSpacing: '-0.02em', textAlign: 'center' }}>
            Request a Private Showing
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.24)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem', margin: 0, textAlign: 'center' }}>
            Exclusively represented by Rachel Hernandez
          </p>
        </div>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem', textAlign: 'center' }}>Thank you. We will be in touch shortly.</p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 520, margin: '0 auto', padding: '0 5vw' }}>
            <input name="name" value={form.name} onChange={set} placeholder="Your Name" required style={inp} />
            <input name="email" value={form.email} onChange={set} type="email" placeholder="Email Address" required style={inp} />
            <input name="phone" value={form.phone} onChange={set} type="tel" placeholder="Phone (optional)" style={inp} />
            <textarea name="message" value={form.message} onChange={set} placeholder="Tell us about your interest" rows={4} style={{ ...inp, resize: 'none' }} />
            <button type="submit" style={{ marginTop: '1.2rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.14)', color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', padding: '1.5rem 4rem', cursor: 'pointer', alignSelf: 'flex-start', transition: 'all 0.3s ease' }}>
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
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)', padding: '5rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Georgia, serif', fontSize: '1rem', letterSpacing: '0.06em', margin: '0 0 0.5rem' }}>Flow Farm</p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>107 Linden Trail, Aberdeen NC</p>
        <p style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>Exclusively Offered at $5,250,000</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', margin: '0 0 0.5rem', letterSpacing: '0.04em' }}>Rachel Hernandez</p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.16em', margin: '0 0 0.3rem' }}>rachelhernandezrealtor@gmail.com</p>
        <p style={{ color: 'rgba(255,255,255,0.08)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>Exclusively Represented</p>
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
      <Manifesto />
      <CinematicReveal
        src={IMG.living}
        eyebrow="The Residence"
        headline={"A grand living room.\n27 feet wide. 17 feet tall."}
        body="Reclaimed Civil War-era heart pine floors. Seven fireplaces. Six bedrooms, seven bathrooms. 8,519 square feet above grade. Designed by Robert E. Clark AIA -- built to outlast everything around it."
      />
      <Numbers />
      <CinematicReveal
        src={IMG.conservatory}
        eyebrow="The Conservatory"
        headline={"Glass on every side.\nAn octagonal dome overhead."}
        body="19.5 by 17.7 feet, entirely glass-wrapped with a skylight dome that tracks the sky from morning to dusk. The room that reminds you why you came here."
        align="right"
      />
      <CinematicReveal
        src={IMG.grounds}
        headline={"Autonomy at this scale is not inherited. It is engineered."}
        quote
      />
      <CinematicReveal
        src={IMG.kitchen}
        eyebrow="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the serious cook."}
        body="A 60-inch dual fuel Wolf range. Six burners, griddle, grill, warming drawer. Two KitchenAid dishwashers. Sub-Zero throughout. The pantry opens to a breakfast room that looks across the farm."
      />
      <Land />
      <Mechanism />
      <CinematicReveal
        src={IMG.aerial}
        headline={"Private by Nature.\nPinehurst by Proximity."}
        eyebrow="Location"
        body="Three miles from Pinehurst Resort. A transferable Pinehurst Country Club Signature Golf Membership -- unlimited access to Course No. 7 and No. 9 -- is included with the sale."
        align="right"
      />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
