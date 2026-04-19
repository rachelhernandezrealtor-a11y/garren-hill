import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';
const MID = '#141414';

const VIDEO = 'https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4';

const P = {
  exterior: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  aerial: 'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  tunnel: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  cabana: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  living: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  kitchen: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  conservatory: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
};

function useFadeIn() {
  const ref = useRef(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } }, { threshold: 0.08 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);
  return [ref, on];
}

function Fade({ children, delay = 0, up = 32 }) {
  const [ref, on] = useFadeIn();
  return (
    <div ref={ref} style={{ opacity: on ? 1 : 0, transform: on ? 'none' : `translateY(${up}px)`, transition: `opacity 1.4s ease ${delay}s, transform 1.4s ease ${delay}s` }}>
      {children}
    </div>
  );
}

function Cap({ children }) {
  return <p style={{ fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>{children}</p>;
}

function Rule() {
  return <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.6 }} />;
}

// -- HERO ----------------------------------------------------------------------
function Hero() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const a = setTimeout(() => setP(1), 500);
    const b = setTimeout(() => setP(2), 1700);
    const c = setTimeout(() => setP(3), 3000);
    return () => { clearTimeout(a); clearTimeout(b); clearTimeout(c); };
  }, []);
  const s = (n) => ({ opacity: p >= n ? 1 : 0, transform: p >= n ? 'none' : 'translateY(16px)', transition: 'opacity 1.8s ease, transform 1.8s ease' });
  return (
    <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', background: '#000' }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.85 }}>
        <source src={VIDEO} type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, transparent 25%, transparent 50%, rgba(0,0,0,0.8) 100%)' }} />

      <div style={{ position: 'absolute', top: '2.2rem', left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'center', ...s(1) }}>
        <Cap>Flow Farm &mdash; Pinehurst, North Carolina</Cap>
      </div>

      <nav style={{ position: 'absolute', top: '1.8rem', right: '3rem', zIndex: 10, display: 'flex', gap: '2.5rem', ...s(1) }}>
        {['The Estate', 'The Land', 'Inquire'].map(n => (
          <a key={n} href={'#' + n.replace(' ', '-').toLowerCase()} style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', textDecoration: 'none' }}>{n}</a>
        ))}
      </nav>

      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
        <div style={s(2)}>
          <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '6rem', lineHeight: 1.04, margin: 0, letterSpacing: '-0.015em', textShadow: '0 2px 60px rgba(0,0,0,0.5)' }}>
            Agritourism<br /><em>Established.</em><br />Legacy Ready.
          </h1>
        </div>
        <div style={{ ...s(3), marginTop: '2.5rem' }}>
          <div style={{ width: 1, height: 52, background: 'linear-gradient(to bottom, transparent, ' + GOLD + ', transparent)', margin: '0 auto' }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '3rem', left: '3rem', right: '3rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', ...s(3) }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>107 Linden Trail, Aberdeen NC</p>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>15 Acres &nbsp;&mdash;&nbsp; 6 Structures &nbsp;&mdash;&nbsp; $5,250,000</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 32, background: 'linear-gradient(to bottom, rgba(255,255,255,0.35), transparent)', animation: 'hpulse 2s ease-in-out infinite' }} />
        </div>
      </div>
      <style>{`@keyframes hpulse{0%,100%{opacity:0.2}50%{opacity:0.8}}`}</style>
    </section>
  );
}

// -- VISION --------------------------------------------------------------------
function Vision() {
  return (
    <section style={{ background: DARK, padding: '14rem 0', textAlign: 'center' }}>
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2.2rem' }}>
          <Cap>The Vision</Cap>
          <Rule />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', lineHeight: 1.28, maxWidth: 720, margin: 0, letterSpacing: '-0.015em' }}>
            Not just a home. A living system<br />built for those who intend to leave<br />something behind.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '1.1rem', lineHeight: 2, maxWidth: 580, margin: 0 }}>
            Fifteen acres of forest and working farmland. A fully self-sustaining compound three miles from Pinehurst Resort. Designed by Robert E. Clark AIA as one of his final private commissions &mdash; and built to operate indefinitely, independently, and beautifully.
          </p>
        </div>
      </Fade>
    </section>
  );
}

// -- FULL BLEED PHOTO ----------------------------------------------------------
function FullBleed({ src, caption }) {
  return (
    <section style={{ position: 'relative', height: '92vh', overflow: 'hidden' }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
      {caption && (
        <Fade style={{ position: 'absolute', bottom: '4rem', left: 0, right: 0, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.2rem', margin: 0, letterSpacing: '0.02em' }}>{caption}</p>
        </Fade>
      )}
    </section>
  );
}

// -- STATS ---------------------------------------------------------------------
function Stats() {
  const data = [
    ['15', 'Total Acres'], ['8,519', 'Sq Ft Above Grade'], ['6 / 7', 'Beds / Baths'],
    ['7', 'Buildable Acres'], ['6', 'Structures'], ['3 mi', 'To Pinehurst'],
    ['14.3kW', 'Solar Array'], ['1,200A', 'Total Power'], ['$5.25M', 'Offered At'],
  ];
  return (
    <section style={{ background: MID, padding: '10rem 0' }}>
      <Fade><Cap style={{ textAlign: 'center', display: 'block', marginBottom: '5rem' }}>By The Numbers</Cap></Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 960, margin: '0 auto', padding: '0 4vw', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        {data.map(([v, l], i) => (
          <Fade key={l} delay={i * 0.07}>
            <div style={{ textAlign: 'center', padding: '3.2rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.07)', borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.07)' : 'none' }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '2.6rem', fontWeight: 400, margin: '0 0 0.6rem', letterSpacing: '-0.02em' }}>{v}</p>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{l}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// -- SPLIT: photo + text -------------------------------------------------------
function Split({ src, label, headline, body, tags, flip, bg }) {
  return (
    <section id="the-estate" style={{ background: bg || DARK, padding: '12rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1280, margin: '0 auto', padding: '0 5vw', gap: '8rem', alignItems: 'center' }}>
        <Fade delay={0.05} style={{ order: flip ? 2 : 1 }}>
          <img src={src} alt={label} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
        </Fade>
        <Fade delay={0.2} style={{ order: flip ? 1 : 2 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <Cap>{label}</Cap>
            <Rule />
            <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.4rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.01em' }}>{headline}</h3>
            <div>
              {body.map((b, i) => <p key={i} style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.95, margin: i < body.length - 1 ? '0 0 1rem' : 0 }}>{b}</p>)}
            </div>
            {tags && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.7rem 2.2rem', paddingTop: '0.5rem' }}>
                {tags.map(t => <span key={t} style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', paddingBottom: '0.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>)}
              </div>
            )}
          </div>
        </Fade>
      </div>
    </section>
  );
}

// -- LAND ----------------------------------------------------------------------
function Land() {
  const items = [
    { src: P.cabana, label: 'Cabana House', body: 'A private guest retreat with one bedroom, full bath, and kitchen. Its own entrance. The estate within the estate.' },
    { src: P.tunnel, label: 'High Tunnel Greenhouse', body: '96 by 36 feet. Year-round specialty crop production with geothermal climate control.' },
    { src: P.workshop, label: 'Farm Workshop', body: '30 by 40 feet with full plumbing, electrical, and a 12 x 8 walk-in cooler. Built for a real operation.' },
  ];
  return (
    <section id="the-land" style={{ background: DARK, padding: '14rem 0' }}>
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginBottom: '9rem' }}>
          <Cap>The Land</Cap>
          <Rule />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', textAlign: 'center', margin: 0, letterSpacing: '-0.015em', lineHeight: 1.25 }}>
            Three acres producing.<br />Seven acres waiting.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', textAlign: 'center', maxWidth: 520, margin: 0, lineHeight: 2 }}>
            USDA-certified veganic. O2Compost regenerative systems. Biochar production. 1,400-ft double deer fence. A living farm already producing &mdash; and seven raw acres ready for whatever comes next.
          </p>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 1280, margin: '0 auto', padding: '0 5vw', gap: '4rem' }}>
        {items.map((item, i) => (
          <Fade key={item.label} delay={i * 0.18}>
            <img src={item.src} alt={item.label} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block', marginBottom: '2.4rem' }} />
            <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.1rem', margin: '0 0 0.8rem', letterSpacing: '-0.01em' }}>{item.label}</p>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.9, margin: 0 }}>{item.body}</p>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// -- SYSTEMS -------------------------------------------------------------------
function Systems() {
  const cols = [
    { label: 'Energy', items: ['14.3kW Solar &mdash; 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane Tanks', '1,200 Amp Total Power'] },
    { label: 'Climate', items: ['Geothermal &mdash; 20 Wells x 300 Ft', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification', 'Zone-Independent Control'] },
    { label: 'Water', items: ['Private Well &mdash; Up to 50 GPM', '2 x 1,500 Gal Private Septic', 'Commercial Water Filtration', 'Whole House Fire Sprinkler', 'Walk-In Cooler 12 x 8 Ft'] },
    { label: 'Smart Home', items: ['Control4 Audio, Video, Lighting', 'Araknis Enterprise Network', 'Whole Campus Wi-Fi', 'Brown Safe + Vault Door', 'Dual Central Vacuum'] },
  ];
  return (
    <section style={{ background: MID, padding: '14rem 0' }}>
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginBottom: '8rem' }}>
          <Cap>Infrastructure</Cap>
          <Rule />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', textAlign: 'center', margin: 0, letterSpacing: '-0.015em', lineHeight: 1.25 }}>
            Off-grid capable.<br /><em>On-grid refined.</em>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', textAlign: 'center', maxWidth: 480, margin: 0, lineHeight: 2 }}>
            Solar, battery, generator, geothermal, and private water. Complete autonomy &mdash; quietly, invisibly, and without compromise.
          </p>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1280, margin: '0 auto', padding: '0 5vw', gap: '3rem' }}>
        {cols.map((col, i) => (
          <Fade key={col.label} delay={i * 0.1}>
            <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 1.8rem', paddingBottom: '1.2rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{col.label}</p>
            {col.items.map(item => <p key={item} dangerouslySetInnerHTML={{ __html: item }} style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontSize: '0.93rem', lineHeight: 1.85, margin: '0 0 0.7rem' }} />)}
          </Fade>
        ))}
      </div>
    </section>
  );
}

// -- LOCATION ------------------------------------------------------------------
function Location() {
  return (
    <section style={{ background: DARK, padding: '14rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1280, margin: '0 auto', padding: '0 5vw', gap: '8rem', alignItems: 'center' }}>
        <Fade delay={0.05}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <Cap>Location</Cap>
            <Rule />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.4rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.01em' }}>
              Private by Nature.<br />Pinehurst by Proximity.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.95, margin: 0 }}>
              Three miles from Pinehurst Resort. Moore County Regional Airport is 15 minutes away. Raleigh-Durham International is under an hour. A transferable Pinehurst Country Club Signature Golf Membership is included.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', paddingTop: '0.5rem' }}>
              {['Pinehurst Resort &mdash; 3 Miles', 'Moore County Regional &mdash; 15 Min', 'Raleigh-Durham International &mdash; 1 Hour', 'FirstHealth Moore Regional Hospital'].map(item => (
                <p key={item} dangerouslySetInnerHTML={{ __html: item }} style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0, paddingLeft: '1.2rem', borderLeft: '1px solid rgba(201,169,110,0.35)' }} />
              ))}
            </div>
          </div>
        </Fade>
        <Fade delay={0.22}>
          <img src={P.aerial} alt="Aerial" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
        </Fade>
      </div>
    </section>
  );
}

// -- INQUIRE -------------------------------------------------------------------
function Inquire() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const inp = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.13)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '1rem 0', outline: 'none', width: '100%' };
  return (
    <section id="inquire" style={{ background: MID, padding: '14rem 0', textAlign: 'center' }}>
      <Fade>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.8rem', marginBottom: '5rem' }}>
          <Cap>Private Inquiry</Cap>
          <Rule />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.8rem', margin: 0, letterSpacing: '-0.015em' }}>Request a Private Viewing</h2>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', margin: 0 }}>Exclusively represented by Rachel Hernandez</p>
        </div>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.15rem' }}>Thank you. We will be in touch shortly.</p>
        ) : (
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem', maxWidth: 460, margin: '0 auto', padding: '0 2rem', textAlign: 'left' }}>
            <input name="name" value={form.name} onChange={set} placeholder="Your Name" required style={inp} />
            <input name="email" value={form.email} onChange={set} type="email" placeholder="Email Address" required style={inp} />
            <textarea name="message" value={form.message} onChange={set} placeholder="Tell us about your interest" rows={4} style={{ ...inp, resize: 'none' }} />
            <button type="submit" style={{ marginTop: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '1.2rem 3.5rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
              Request Viewing
            </button>
          </form>
        )}
      </Fade>
    </section>
  );
}

// -- FOOTER --------------------------------------------------------------------
function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Flow Farm &mdash; 107 Linden Trail, Aberdeen NC</p>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Exclusively Offered at $5,250,000</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Rachel Hernandez</p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.12em', margin: 0 }}>rachelhernandezrealtor@gmail.com</p>
      </div>
    </footer>
  );
}

// -- APP -----------------------------------------------------------------------
export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0 }}>
      <Hero />
      <Vision />
      <FullBleed src={P.exterior} caption="Main residence &mdash; Robert E. Clark AIA, Pinehurst NC" />
      <Stats />
      <Split
        src={P.living} label="The Residence" bg={DARK}
        headline={"A grand living room.\n27 feet wide.\n17 feet tall."}
        body={[
          "Reclaimed Civil War-era heart pine floors run the full length of the home. Seven fireplaces. Six bedrooms, seven bathrooms. Every room designed with proportion, permanence, and the long view in mind.",
          "Designed by Robert E. Clark AIA as one of his final private commissions. 8,519 square feet above grade with a 1,709 SF walk-out lower level and 2,531 SF conditioned crawl space."
        ]}
        tags={['6 Bedrooms', '7 Bathrooms', '7 Fireplaces', 'Heart Pine Floors', 'Robert E. Clark AIA']}
      />
      <Split
        src={P.conservatory} label="The Conservatory" bg={MID} flip
        headline={"Glass on every side.\nAn octagonal dome\noverhead."}
        body={["19.5 by 17.7 feet, entirely glass-wrapped with a skylight dome that tracks the sky from morning to dusk. The room that reminds you why you came here."]}
      />
      <Split
        src={P.kitchen} label="The Kitchen" bg={DARK}
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the\nserious cook."}
        body={[
          "A 60-inch dual fuel Wolf range with six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Sub-Zero refrigeration throughout.",
          "A walk-in pantry opens to the breakfast room, which looks across the farm. This house was designed to feed people."
        ]}
        tags={['Wolf 60" Dual Fuel', 'Sub-Zero', '2 Dishwashers', 'Walk-In Pantry']}
      />
      <FullBleed src={P.conservatory2} caption="Glass-wrapped conservatory &mdash; octagonal skylight dome" />
      <Land />
      <FullBleed src={P.grounds} caption="3-acre USDA veganic farm &mdash; active, producing, regenerative" />
      <Systems />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
