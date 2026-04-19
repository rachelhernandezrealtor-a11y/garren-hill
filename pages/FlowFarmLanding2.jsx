import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';
const MID = '#141414';

const PHOTOS = {
  exterior: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg',
  grounds: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  aerial: 'https://media.base44.com/images/public/69e248a2469cc39540781cce/2ca329bbf_flowfarmmasterphotoswebsite.jpg',
  highTunnel: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/217fdb4a1_HighTunnel.jpg',
  workshop: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/136958608_FarmWorkshop.jpg',
  compost: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/983e028f7_CompostingandBioChar.jpg',
  cabana: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/3af6924d6_CabanaHouseMain.jpg',
  foyer: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public',
  living1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  living2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public',
  living3: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/3ea36a81-abc3-48b7-bf95-5dbddd664900/public',
  dining: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/53360e16-7ba3-4bae-ef62-721a86fdbd00/public',
  kitchen1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  kitchen2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/00b098c8-fea7-4300-bf34-6c2f557dd200/public',
  conservatory1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
  cabana2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/bb6c9c80-2258-4414-87c7-5ae5a49b1700/public',
};

function useFadeIn(threshold = 0.15) {
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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(28px)', transition: `opacity 1.2s ease ${delay}s, transform 1.2s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function GoldRule({ width = 40, style = {} }) {
  return <div style={{ width, height: 1, background: GOLD, margin: '0 auto', opacity: 0.7, ...style }} />;
}

function Label({ children, style = {} }) {
  return <p style={{ fontFamily: 'sans-serif', fontSize: '0.44rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', margin: 0, ...style }}>{children}</p>;
}

function Hero() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const fade = (p, extra = {}) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 1.6s ease, transform 1.6s ease',
    ...extra
  });

  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: DARK }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.9 }}>
        <source src="https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.78) 100%)' }} />

      {/* Top label */}
      <div style={{ position: 'absolute', top: '2rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...fade(1) }}>
        <Label>Flow Farm -- Pinehurst, North Carolina</Label>
      </div>

      {/* Nav */}
      <nav style={{ position: 'absolute', top: '1.6rem', right: '2.5rem', zIndex: 10, display: 'flex', gap: '2rem', ...fade(1) }}>
        {['Location', 'Estate', 'Inquire'].map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>{n}</a>
        ))}
      </nav>

      {/* Center headline */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 8vw' }}>
        <div style={fade(2)}>
          <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2.8rem, 6.8vw, 6.5rem)', lineHeight: 1.02, margin: 0, letterSpacing: '-0.01em', textShadow: '0 4px 40px rgba(0,0,0,0.5)' }}>
            Agritourism<br /><em>Established.</em><br />Legacy Ready.
          </h1>
        </div>
        <div style={{ ...fade(3), marginTop: '2.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)` }} />
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: 0, right: 0, zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', padding: '0 2.8rem', ...fade(3) }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'sans-serif', fontSize: '0.43rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.2rem' }}>107 Linden Trail, Aberdeen NC</p>
          <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>15 Acres -- 6 Structures -- $5,250,000</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.38rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, rgba(255,255,255,0.25), transparent)`, animation: 'pulse 2.2s ease-in-out infinite' }} />
        </div>
      </div>
      <style>{`@keyframes pulse { 0%,100%{opacity:0.25;} 50%{opacity:0.7;} }`}</style>
    </section>
  );
}

function IntroSection() {
  return (
    <section style={{ background: DARK, padding: '10rem 0', textAlign: 'center' }}>
      <FadeIn>
        <Label style={{ marginBottom: '3rem', display: 'block' }}>The Estate</Label>
        <GoldRule width={32} style={{ marginBottom: '3.5rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3.5vw, 3.2rem)', lineHeight: 1.25, maxWidth: 760, margin: '0 auto 2.5rem', padding: '0 2rem', letterSpacing: '-0.01em' }}>
          A rare convergence of land, architecture,<br />and infrastructure.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)', lineHeight: 1.9, maxWidth: 540, margin: '0 auto', padding: '0 2rem' }}>
          Fifteen acres of working farmland and forest, three miles from Pinehurst Resort. A living estate rooted in sustainability, elevated by state-of-the-art infrastructure and refined luxury.
        </p>
      </FadeIn>
    </section>
  );
}

function FullBleedPhoto({ src, label, caption }) {
  return (
    <section style={{ position: 'relative', height: '88vh', overflow: 'hidden', background: DARK }}>
      <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.65) 100%)' }} />
      {caption && (
        <FadeIn style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.4rem)', margin: 0, letterSpacing: '0.02em' }}>{caption}</p>
        </FadeIn>
      )}
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '15', unit: 'Acres', detail: 'Total Estate' },
    { value: '8,519', unit: 'Sq Ft', detail: 'Main Residence' },
    { value: '6', unit: 'Structures', detail: 'On Property' },
    { value: '3', unit: 'Miles', detail: 'To Pinehurst Resort' },
    { value: '$5.25M', unit: '', detail: 'Offered At' },
    { value: '30kW', unit: 'Generator', detail: 'Kohler Backup Power' },
  ];
  return (
    <section style={{ background: MID, padding: '9rem 0' }}>
      <FadeIn>
        <Label style={{ textAlign: 'center', marginBottom: '5rem', display: 'block' }}>By The Numbers</Label>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 960, margin: '0 auto', padding: '0 4vw', gap: '4rem 2rem' }}>
        {stats.map((s, i) => (
          <FadeIn key={s.detail} delay={i * 0.1}>
            <div style={{ textAlign: 'center', borderTop: `1px solid rgba(255,255,255,0.07)`, paddingTop: '2.5rem' }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 400, margin: '0 0 0.3rem', letterSpacing: '-0.02em' }}>
                {s.value}<span style={{ fontSize: '0.5em', color: GOLD, marginLeft: '0.3rem' }}>{s.unit}</span>
              </p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{s.detail}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ResidenceSection() {
  return (
    <section style={{ background: DARK, padding: '10rem 0' }} id="estate">
      <FadeIn>
        <Label style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'block' }}>The Residence</Label>
        <GoldRule width={28} style={{ marginBottom: '7rem' }} />
      </FadeIn>
      {/* Split -- image left, text right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1200, margin: '0 auto', padding: '0 4vw', gap: '5rem', alignItems: 'center', marginBottom: '8rem' }}>
        <FadeIn delay={0.1}>
          <img src={PHOTOS.living1} alt="Living" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
        </FadeIn>
        <FadeIn delay={0.25}>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 1.5rem' }}>Main Residence</p>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)', lineHeight: 1.2, margin: '0 0 1.8rem', letterSpacing: '-0.01em' }}>
            8,519 square feet.<br />Designed to endure.
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', lineHeight: 1.85, margin: '0 0 2rem' }}>
            Designed by Robert E. Clark AIA as one of his final commissions. Reclaimed Civil War-era heart pine floors, a glass-wrapped conservatory with octagonal skylight dome, and a Sub-Zero and Wolf kitchen worthy of any Michelin kitchen.
          </p>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {['6 Bedrooms', '7 Bathrooms', '7 Fireplaces', 'Glass Conservatory'].map(f => (
              <span key={f} style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.18em', textTransform: 'uppercase', borderBottom: `1px solid rgba(255,255,255,0.1)`, paddingBottom: '0.3rem' }}>{f}</span>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Split -- text left, image right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1200, margin: '0 auto', padding: '0 4vw', gap: '5rem', alignItems: 'center' }}>
        <FadeIn delay={0.1}>
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 1.5rem' }}>The Conservatory</p>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)', lineHeight: 1.2, margin: '0 0 1.8rem' }}>
            Glass, light,<br />and open sky.
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', lineHeight: 1.85, margin: 0 }}>
            19.5 by 17.7 feet, wrapped entirely in glass with an octagonal skylight dome overhead. A room that dissolves the boundary between inside and estate.
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <img src={PHOTOS.conservatory1} alt="Conservatory" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
        </FadeIn>
      </div>
    </section>
  );
}

function LandSection() {
  const structures = [
    { img: PHOTOS.cabana, label: 'Cabana House', detail: 'Private guest retreat -- 1 bed, 1 bath, full kitchen' },
    { img: PHOTOS.highTunnel, label: 'High Tunnel Greenhouse', detail: '96 x 36 ft -- year-round specialty crops' },
    { img: PHOTOS.workshop, label: 'Farm Workshop', detail: '30 x 40 ft with plumbing, walk-in cooler' },
  ];
  return (
    <section style={{ background: MID, padding: '10rem 0' }}>
      <FadeIn>
        <Label style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'block' }}>The Land</Label>
        <GoldRule width={28} style={{ marginBottom: '2.5rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textAlign: 'center', margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>
          A foundation for what comes next.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', textAlign: 'center', maxWidth: 500, margin: '0 auto 7rem', padding: '0 2rem', lineHeight: 1.85 }}>
          3-acre USDA veganic farm. 7 buildable acres. Multiple points of access. Energy independence built in.
        </p>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 1200, margin: '0 auto', padding: '0 4vw', gap: '2rem' }}>
        {structures.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.15}>
            <div>
              <img src={s.img} alt={s.label} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block', marginBottom: '1.5rem' }} />
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', fontWeight: 400, margin: '0 0 0.5rem' }}>{s.label}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0, lineHeight: 1.7 }}>{s.detail}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SystemsSection() {
  const systems = [
    ['Energy', ['14.3kW Solar Array -- 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane Tanks']],
    ['Climate', ['Geothermal Loop -- 20 Wells x 300 Ft', 'Five-Zone Water Furnace Systems', 'Energy Recovery Ventilator', 'Lennox Air Purification Each Zone']],
    ['Infrastructure', ['1,200 Amp Total Power', 'Private Well Up to 50 GPM', 'Whole House Fire Sprinkler', 'Commercial Water Filtration']],
    ['Smart Home', ['Control4 Audio, Video, Lighting', 'Whole Campus Wi-Fi', 'Whole House Alarm System', 'Dual VacuMaid Central Vacuum']],
  ];
  return (
    <section style={{ background: DARK, padding: '10rem 0' }}>
      <FadeIn>
        <Label style={{ textAlign: 'center', marginBottom: '1.5rem', display: 'block' }}>Infrastructure</Label>
        <GoldRule width={28} style={{ marginBottom: '2.5rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', textAlign: 'center', margin: '0 0 7rem', letterSpacing: '-0.01em' }}>
          Built for independence.
        </h2>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1200, margin: '0 auto', padding: '0 4vw', gap: '3rem' }}>
        {systems.map(([cat, items], i) => (
          <FadeIn key={cat} delay={i * 0.1}>
            <div>
              <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.24em', textTransform: 'uppercase', margin: '0 0 1.5rem', paddingBottom: '1rem', borderBottom: `1px solid rgba(255,255,255,0.07)` }}>{cat}</p>
              {items.map(item => (
                <p key={item} style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontSize: '0.88rem', lineHeight: 1.7, margin: '0 0 0.6rem' }}>{item}</p>
              ))}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section style={{ background: MID, padding: '10rem 0' }} id="location">
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 4vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
        <FadeIn delay={0.1}>
          <Label style={{ marginBottom: '1.5rem', display: 'block' }}>Location</Label>
          <GoldRule width={28} style={{ margin: '0 0 2.5rem' }} />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.2, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            Private by Nature.<br />Pinehurst by Proximity.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.85, margin: '0 0 3rem' }}>
            Three miles from Pinehurst Resort. Multiple points of access via Linden Trail, Linden Road, Mollie Lane, and Skene Lane. Private drive creates immediate separation and discretion.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {['Moore County Regional Airport -- Private Aviation', 'Raleigh-Durham International -- 1 Hour', 'FirstHealth Moore Regional Hospital', 'Historic Village of Pinehurst'].map(p => (
              <p key={p} style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0, paddingLeft: '1rem', borderLeft: `1px solid rgba(255,255,255,0.1)` }}>{p}</p>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={0.25}>
          <img src={PHOTOS.aerial} alt="Aerial" style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', display: 'block' }} />
        </FadeIn>
      </div>
    </section>
  );
}

function GolfSection() {
  return (
    <section style={{ background: DARK, padding: '10rem 0', textAlign: 'center' }}>
      <FadeIn>
        <Label style={{ marginBottom: '1.5rem', display: 'block' }}>Membership</Label>
        <GoldRule width={28} style={{ marginBottom: '3rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', lineHeight: 1.2, maxWidth: 680, margin: '0 auto 2rem', letterSpacing: '-0.01em' }}>
          Pinehurst Country Club<br />Signature Golf Membership.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.85, maxWidth: 500, margin: '0 auto', padding: '0 2rem' }}>
          Transferable. Unlimited access to Course No. 7 and No. 9 -- two of the most celebrated courses in American golf.
        </p>
      </FadeIn>
    </section>
  );
}

function InquireSection() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section style={{ background: MID, padding: '10rem 0', textAlign: 'center' }} id="inquire">
      <FadeIn>
        <Label style={{ marginBottom: '1.5rem', display: 'block' }}>Private Inquiry</Label>
        <GoldRule width={28} style={{ marginBottom: '3rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', margin: '0 0 1rem', letterSpacing: '-0.01em' }}>
          Request a Private Viewing
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '1rem', margin: '0 0 4rem' }}>
          Exclusively represented by Rachel Hernandez
        </p>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem' }}>Thank you. We will be in touch shortly.</p>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', maxWidth: 440, margin: '0 auto', padding: '0 2rem' }}>
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" required style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '0.8rem 0', outline: 'none', letterSpacing: '0.03em' }} />
            <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email Address" required style={{ background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '0.8rem 0', outline: 'none', letterSpacing: '0.03em' }} />
            <button type="submit" style={{ marginTop: '1.5rem', background: 'transparent', border: `1px solid rgba(255,255,255,0.2)`, color: 'rgba(255,255,255,0.7)', fontFamily: 'sans-serif', fontSize: '0.44rem', letterSpacing: '0.28em', textTransform: 'uppercase', padding: '1.1rem 3rem', cursor: 'pointer' }}>
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
    <footer style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <p style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>Flow Farm -- 107 Linden Trail, Aberdeen NC</p>
      <p style={{ color: 'rgba(255,255,255,0.18)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>Rachel Hernandez -- rachelhernandezrealtor@gmail.com</p>
      <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '0.38rem', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>$5,250,000</p>
    </footer>
  );
}

export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <Hero />
      <IntroSection />
      <FullBleedPhoto src={PHOTOS.exterior} label="Exterior" caption="Main residence -- Robert E. Clark AIA" />
      <StatsSection />
      <ResidenceSection />
      <FullBleedPhoto src={PHOTOS.kitchen1} label="Kitchen" caption="Sub-Zero and Wolf -- designed for the serious cook" />
      <LandSection />
      <FullBleedPhoto src={PHOTOS.grounds} label="Grounds" caption="3-acre USDA veganic farm -- active and producing" />
      <SystemsSection />
      <LocationSection />
      <GolfSection />
      <InquireSection />
      <Footer />
    </div>
  );
}
