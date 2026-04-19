import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const PHOTOS = {
  exterior: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  aerial: 'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  highTunnel: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  compost: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg',
  cabana: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  living1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  living2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public',
  kitchen1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  conservatory1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
  foyer: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public',
  dining: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/53360e16-7ba3-4bae-ef62-721a86fdbd00/public',
  cabana2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/bb6c9c80-2258-4414-87c7-5ae5a49b1700/public',
};

const glass = {
  background: 'rgba(8,8,8,0.55)',
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  border: '1px solid rgba(255,255,255,0.07)',
};

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 1.3s ease ${delay}s, transform 1.3s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function GoldRule({ style = {} }) {
  return <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.65, ...style }} />;
}

function Label({ children, style = {} }) {
  return <p style={{ fontFamily: 'sans-serif', fontSize: '0.43rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, ...style }}>{children}</p>;
}

function Hero() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  const fade = (p) => ({ opacity: phase >= p ? 1 : 0, transform: phase >= p ? 'translateY(0)' : 'translateY(14px)', transition: 'opacity 1.6s ease, transform 1.6s ease' });
  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: DARK }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.9 }}>
        <source src="https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 22%, transparent 58%, rgba(0,0,0,0.8) 100%)' }} />
      <div style={{ position: 'absolute', top: '2rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...fade(1) }}>
        <Label>Flow Farm -- Pinehurst, North Carolina</Label>
      </div>
      <nav style={{ position: 'absolute', top: '1.6rem', right: '2.5rem', zIndex: 10, display: 'flex', gap: '2rem', ...fade(1) }}>
        {['The Estate', 'The Land', 'Inquire'].map(n => (
          <a key={n} href={`#${n.toLowerCase().replace(' ','-')}`} style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>{n}</a>
        ))}
      </nav>
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8vw' }}>
        <div style={fade(2)}>
          <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.8rem, 6.8vw, 6.5rem)', lineHeight: 1.02, margin: 0, letterSpacing: '-0.01em', textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
            Agritourism<br /><em>Established.</em><br />Legacy Ready.
          </h1>
        </div>
        <div style={{ ...fade(3), marginTop: '2.2rem' }}>
          <div style={{ width: 1, height: 48, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, margin: '0 auto' }} />
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '2.5rem', left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 2.8rem', ...fade(3) }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'sans-serif', fontSize: '0.43rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>107 Linden Trail, Aberdeen NC</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>15 Acres -- 6 Structures -- $5,250,000</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.38rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 30, background: 'linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)', animation: 'pulse 2.2s ease-in-out infinite' }} />
        </div>
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:0.25;}50%{opacity:0.7;}}`}</style>
    </section>
  );
}

function GlassSection({ photo, align = 'right', label, headline, body, tags, minHeight = '90vh' }) {
  return (
    <section style={{ position: 'relative', minHeight, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <img src={photo} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.28)', zIndex: 1 }} />
      <FadeIn delay={0.1} style={{ position: 'relative', zIndex: 2, margin: align === 'right' ? '0 5vw 0 0' : '0 0 0 5vw', maxWidth: 480, padding: '3.5rem', ...glass }}>
        <Label style={{ marginBottom: '1.2rem', display: 'block' }}>{label}</Label>
        <GoldRule style={{ marginBottom: '2rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.5rem, 2.5vw, 2.3rem)', lineHeight: 1.2, margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>{headline}</h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.85, margin: tags ? '0 0 1.8rem' : 0 }}>{body}</p>
        {tags && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1.4rem' }}>
            {tags.map(t => <span key={t} style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.15em', textTransform: 'uppercase', paddingBottom: '0.2rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{t}</span>)}
          </div>
        )}
      </FadeIn>
    </section>
  );
}

function GlassStatsSection() {
  const stats = [
    { v: '15', l: 'Total Acres' }, { v: '8,519', l: 'Sq Ft Above Grade' }, { v: '6 / 7', l: 'Beds / Baths' },
    { v: '7', l: 'Buildable Acres' }, { v: '6', l: 'Structures' }, { v: '$5.25M', l: 'Offered At' },
    { v: '14.3kW', l: 'Solar Array' }, { v: '1,200A', l: 'Total Power' }, { v: '3 mi', l: 'To Pinehurst' },
  ];
  return (
    <section style={{ position: 'relative', minHeight: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 5vw' }}>
      <img src={PHOTOS.aerial} alt="Aerial" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1 }} />
      <FadeIn style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1000, padding: '3.5rem 4rem', ...glass }}>
        <Label style={{ textAlign: 'center', display: 'block', marginBottom: '3rem' }}>By The Numbers</Label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0' }}>
          {stats.map((s, i) => (
            <FadeIn key={s.l} delay={i * 0.07}>
              <div style={{ textAlign: 'center', padding: '2rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)', borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
                <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)', fontWeight: 400, margin: '0 0 0.4rem', letterSpacing: '-0.02em' }}>{s.v}</p>
                <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>{s.l}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function GlassLandSection() {
  const items = [
    { img: PHOTOS.cabana, label: 'Cabana House', body: 'Private guest retreat. 1 bed, 1 bath, full kitchen, its own entrance. The estate within the estate.' },
    { img: PHOTOS.highTunnel, label: 'High Tunnel Greenhouse', body: '96 x 36 ft. Year-round specialty crops with geothermal climate control. The agricultural heart.' },
    { img: PHOTOS.workshop, label: 'Farm Workshop', body: '30 x 40 ft. Full plumbing, electrical, and a 12 x 8 walk-in cooler. Built to run a real operation.' },
  ];
  return (
    <section style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7rem 5vw' }} id="the-land">
      <img src={PHOTOS.grounds} alt="Grounds" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.42)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100 }}>
        <FadeIn>
          <Label style={{ textAlign: 'center', display: 'block', marginBottom: '1.2rem' }}>The Land</Label>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.6, margin: '0 auto 2rem' }} />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 3rem)', textAlign: 'center', margin: '0 0 1rem', letterSpacing: '-0.01em' }}>Three acres producing.<br />Seven acres waiting.</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif', fontSize: '1rem', textAlign: 'center', maxWidth: 500, margin: '0 auto 4rem', lineHeight: 1.9 }}>
            USDA-certified veganic. O2Compost regenerative systems. Biochar production. 1,400-ft double deer fence. A living farm that has been producing for years -- and seven raw acres ready for whatever comes next.
          </p>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          {items.map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.15}>
              <div style={{ ...glass, overflow: 'hidden' }}>
                <img src={item.img} alt={item.label} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ padding: '2rem' }}>
                  <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', margin: '0 0 0.6rem' }}>{item.label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>{item.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function GlassSystemsSection() {
  const cols = [
    { label: 'Energy', items: ['14.3kW Solar -- 61 Panels', 'Sunny Island 10k Battery', '30kW Kohler Generator', '2 x 1,000 Gal Propane', '1,200 Amp Total Power'] },
    { label: 'Climate', items: ['Geothermal -- 20 Wells x 300 Ft', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification', 'Zone-Independent Control'] },
    { label: 'Water', items: ['Private Well -- 50 GPM', '2 x 1,500 Gal Septic', 'Commercial Water Filtration', 'Whole House Fire Sprinkler', 'Walk-In Cooler 12 x 8 Ft'] },
    { label: 'Smart Home', items: ['Control4 Audio, Video, Light', 'Araknis Enterprise Network', 'Whole Campus Wi-Fi', 'Full Property Alarm', 'Dual Central Vacuum'] },
  ];
  return (
    <section style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '7rem 5vw' }}>
      <img src={PHOTOS.exterior} alt="Exterior" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
      <FadeIn style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 1100, padding: '4rem', ...glass }}>
        <Label style={{ textAlign: 'center', display: 'block', marginBottom: '1.2rem' }}>Infrastructure</Label>
        <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.6, margin: '0 auto 2rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)', textAlign: 'center', margin: '0 0 0.8rem', letterSpacing: '-0.01em' }}>Off-grid capable. On-grid refined.</h2>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', textAlign: 'center', maxWidth: 500, margin: '0 auto 3.5rem', lineHeight: 1.9 }}>
          Solar, battery, generator, geothermal, and private water. Complete autonomy -- quietly, invisibly, without compromise.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2.5rem' }}>
          {cols.map((col, i) => (
            <FadeIn key={col.label} delay={i * 0.1}>
              <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.25em', textTransform: 'uppercase', margin: '0 0 1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{col.label}</p>
              {col.items.map(item => <p key={item} style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif', fontSize: '0.88rem', lineHeight: 1.75, margin: '0 0 0.5rem' }}>{item}</p>)}
            </FadeIn>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

function GlassLocationSection() {
  return (
    <section style={{ position: 'relative', minHeight: '85vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '6rem 5vw' }} id="location">
      <img src={PHOTOS.aerial} alt="Aerial" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 1 }} />
      <FadeIn style={{ position: 'relative', zIndex: 2, maxWidth: 500, padding: '3.5rem', ...glass }}>
        <Label style={{ display: 'block', marginBottom: '1.2rem' }}>Location</Label>
        <GoldRule style={{ marginBottom: '2rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', lineHeight: 1.2, margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>
          Private by Nature.<br />Pinehurst by Proximity.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.9, margin: '0 0 2rem' }}>
          Three miles from Pinehurst Resort. Four private points of access. Moore County Regional Airport is 15 minutes away. Raleigh-Durham International under an hour. The world is close. You just cannot tell.
        </p>
        {['Pinehurst Resort -- 3 Miles', 'Moore County Regional -- Private Aviation', 'RDU International -- 1 Hour', 'FirstHealth Moore Regional Hospital'].map(p => (
          <p key={p} style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.13em', textTransform: 'uppercase', margin: '0 0 0.6rem', paddingLeft: '0.8rem', borderLeft: `1px solid rgba(201,169,110,0.35)` }}>{p}</p>
        ))}
      </FadeIn>
    </section>
  );
}

function GolfSection() {
  return (
    <section style={{ position: 'relative', minHeight: '70vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 5vw' }}>
      <img src={PHOTOS.conservatory2} alt="Membership" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 1 }} />
      <FadeIn style={{ position: 'relative', zIndex: 2, maxWidth: 560, padding: '4rem', textAlign: 'center', ...glass }}>
        <Label style={{ display: 'block', marginBottom: '1.2rem' }}>Membership</Label>
        <GoldRule style={{ margin: '0 auto 2rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.6vw, 2.4rem)', lineHeight: 1.2, margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>
          Pinehurst Country Club.<br />Signature Golf Membership.<br /><em>Transferable.</em>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.9, margin: '0 0 2.5rem' }}>
          Unlimited access to Course No. 7 and No. 9 -- two of the most revered courses in the history of American golf. Included with the estate.
        </p>
        <a href="https://my.matterport.com/show/?m=xZRfSiQPuQ8" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', border: `1px solid rgba(201,169,110,0.4)`, color: GOLD, fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.26em', textTransform: 'uppercase', padding: '1rem 2.5rem', textDecoration: 'none', background: 'transparent' }}>
          View 3D Matterport Tour
        </a>
      </FadeIn>
    </section>
  );
}

function InquireSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSent(true); };
  const inputStyle = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '0.9rem 0', outline: 'none', width: '100%' };
  return (
    <section style={{ position: 'relative', minHeight: '80vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6rem 5vw' }} id="inquire">
      <img src={PHOTOS.living2} alt="Inquire" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1 }} />
      <FadeIn style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 480, padding: '4rem', ...glass }}>
        <Label style={{ display: 'block', marginBottom: '1.2rem', textAlign: 'center' }}>Private Inquiry</Label>
        <GoldRule style={{ margin: '0 auto 2rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)', textAlign: 'center', margin: '0 0 0.6rem', letterSpacing: '-0.01em' }}>Request a Private Viewing</h2>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.92rem', textAlign: 'center', margin: '0 0 2.5rem' }}>Exclusively represented by Rachel Hernandez</p>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', textAlign: 'center' }}>Thank you. We will be in touch shortly.</p>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
            <input name="name" value={form.name} onChange={handle} placeholder="Your Name" required style={inputStyle} />
            <input name="email" value={form.email} onChange={handle} type="email" placeholder="Email Address" required style={inputStyle} />
            <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your interest" rows={3} style={{ ...inputStyle, resize: 'none' }} />
            <button type="submit" style={{ marginTop: '0.8rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.26em', textTransform: 'uppercase', padding: '1rem 2.5rem', cursor: 'pointer' }}>
              Request Viewing
            </button>
          </form>
        )}
      </FadeIn>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.25rem' }}>Flow Farm -- 107 Linden Trail, Aberdeen NC</p>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'sans-serif', fontSize: '0.38rem', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>Exclusively Offered at $5,250,000</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.25rem' }}>Rachel Hernandez</p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '0.38rem', letterSpacing: '0.12em', margin: 0 }}>rachelhernandezrealtor@gmail.com</p>
      </div>
    </footer>
  );
}

export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK }}>
      <Hero />
      <GlassSection
        photo={PHOTOS.foyer}
        align="right"
        label="The Vision"
        headline={"Not just a home.\nA living system built for those\nwho intend to leave something behind."}
        body="Fifteen acres of forest and working farmland. A fully self-sustaining compound three miles from Pinehurst Resort. Designed by Robert E. Clark AIA as one of his final private commissions."
      />
      <GlassStatsSection />
      <GlassSection
        photo={PHOTOS.living1}
        align="left"
        label="The Residence"
        headline={"A grand living room\n27 feet wide and\n17 feet tall."}
        body="Reclaimed Civil War-era heart pine floors run the full length of the home. Seven fireplaces. Six bedrooms, seven bathrooms. Every room designed with proportion, permanence, and the long view."
        tags={['6 Bedrooms', '7 Bathrooms', '7 Fireplaces', 'Heart Pine Floors']}
      />
      <GlassSection
        photo={PHOTOS.conservatory1}
        align="right"
        label="The Conservatory"
        headline={"Glass on every side.\nAn octagonal dome\noverhead."}
        body="19.5 by 17.7 feet, entirely glass-wrapped with a skylight dome that tracks the sky from morning to dusk. The room that reminds you why you came here."
      />
      <GlassSection
        photo={PHOTOS.kitchen1}
        align="left"
        label="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nDesigned for the\nserious cook."}
        body="A 60-inch dual fuel Wolf range. Two KitchenAid dishwashers. Sub-Zero refrigeration. Walk-in pantry and breakfast room that opens to the farm beyond the glass."
        tags={['Wolf 60" Dual Fuel', 'Sub-Zero', '2 KitchenAid Dishwashers', 'Walk-In Pantry']}
      />
      <GlassLandSection />
      <GlassSystemsSection />
      <GlassLocationSection />
      <GolfSection />
      <InquireSection />
      <Footer />
    </div>
  );
}
