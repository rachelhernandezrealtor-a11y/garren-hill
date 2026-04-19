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
  living1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/717eeff1-f98e-4bd6-0ef6-66ed1c054200/public',
  living2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6c90dba3-97de-4654-ccba-a70677a7a300/public',
  kitchen1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/88c2e1c1-04db-4193-745d-8bec90459b00/public',
  conservatory1: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6d2ef33c-35eb-4b90-5c6d-fe3d37fea900/public',
  conservatory2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/1abfcd89-c693-4c59-0c1f-0aa35ab1e100/public',
  foyer: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/ada10c6f-d704-40ce-10e5-58d25e101200/public',
  dining: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/53360e16-7ba3-4bae-ef62-721a86fdbd00/public',
  cabana2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/bb6c9c80-2258-4414-87c7-5ae5a49b1700/public',
};

function useFadeIn(threshold = 0.12) {
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
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(24px)', transition: `opacity 1.3s ease ${delay}s, transform 1.3s ease ${delay}s`, ...style }}>
      {children}
    </div>
  );
}

function GoldRule({ width = 32, style = {} }) {
  return <div style={{ width, height: 1, background: GOLD, opacity: 0.6, ...style }} />;
}

function Label({ children, style = {} }) {
  return <p style={{ fontFamily: 'sans-serif', fontSize: '0.44rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0, ...style }}>{children}</p>;
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
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.78) 100%)' }} />
      <div style={{ position: 'absolute', top: '2rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...fade(1) }}>
        <Label>Flow Farm -- Pinehurst, North Carolina</Label>
      </div>
      <nav style={{ position: 'absolute', top: '1.6rem', right: '2.5rem', zIndex: 10, display: 'flex', gap: '2rem', ...fade(1) }}>
        {['The Estate', 'The Land', 'Inquire'].map(n => (
          <a key={n} href={`#${n.toLowerCase().replace(' ','-')}`} style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>{n}</a>
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

function VisionSection() {
  return (
    <section style={{ background: DARK, padding: '9rem 0', textAlign: 'center' }}>
      <FadeIn>
        <Label style={{ display: 'block', marginBottom: '2rem' }}>The Vision</Label>
        <GoldRule style={{ margin: '0 auto 3rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '2.6rem', lineHeight: 1.25, maxWidth: 700, margin: '0 auto 2.5rem', padding: '0 2rem', letterSpacing: '-0.01em' }}>
          Not just a home. A living system built for those who intend to leave something behind.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '1.05rem', lineHeight: 1.95, maxWidth: 580, margin: '0 auto', padding: '0 2rem' }}>
          Fifteen acres of forest and working farmland. A fully self-sustaining compound three miles from Pinehurst Resort. Designed by Robert E. Clark AIA as one of his final private commissions -- and built to operate indefinitely, independently, and beautifully.
        </p>
      </FadeIn>
    </section>
  );
}

function FullBleedPhoto({ src, caption }) {
  return (
    <section style={{ position: 'relative', height: '90vh', overflow: 'hidden', background: DARK }}>
      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.7) 100%)' }} />
      {caption && (
        <FadeIn style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, textAlign: 'center' }}>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1rem, 1.8vw, 1.35rem)', margin: 0, letterSpacing: '0.03em' }}>{caption}</p>
        </FadeIn>
      )}
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: '15', label: 'Total Acres' },
    { value: '8,519', label: 'Square Feet Above Grade' },
    { value: '6 / 7', label: 'Bedrooms / Bathrooms' },
    { value: '7', label: 'Buildable Acres' },
    { value: '6', label: 'Structures on Property' },
    { value: '3', label: 'Miles to Pinehurst Resort' },
    { value: '14.3kW', label: 'Solar Array' },
    { value: '1,200A', label: 'Total Power' },
    { value: '$5.25M', label: 'Offered At' },
  ];
  return (
    <section style={{ background: MID, padding: '9rem 0' }}>
      <FadeIn>
        <Label style={{ textAlign: 'center', display: 'block', marginBottom: '5rem' }}>By The Numbers</Label>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 1000, margin: '0 auto', padding: '0 4vw' }}>
        {stats.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.07}>
            <div style={{ textAlign: 'center', padding: '2.8rem 1rem', borderTop: '1px solid rgba(255,255,255,0.06)', borderRight: i % 3 !== 2 ? '1px solid rgba(255,255,255,0.06)' : 'none' }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 400, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>{s.value}</p>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>{s.label}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ResidenceSection() {
  return (
    <section style={{ background: DARK, padding: '11rem 0' }} id="the-estate">
      <FadeIn>
        <Label style={{ textAlign: 'center', display: 'block', marginBottom: '1.5rem' }}>The Residence</Label>
        <GoldRule style={{ margin: '0 auto 7rem' }} />
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1200, margin: '0 auto 9rem', padding: '0 5vw', gap: '6rem', alignItems: 'center' }}>
        <FadeIn delay={0.1}>
          <img src={PHOTOS.living1} alt="Living Room" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
        </FadeIn>
        <FadeIn delay={0.25}>
          <Label style={{ marginBottom: '1.2rem', display: 'block' }}>Main Residence</Label>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', lineHeight: 1.18, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            A grand living room<br />27 feet wide and<br />17 feet tall.
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 1.2rem' }}>
            Reclaimed Civil War-era heart pine floors run the full length of the home. Seven fireplaces. Six bedrooms, seven bathrooms. Every room designed with proportion, permanence, and the long view in mind.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 2.2rem' }}>
            Designed by Robert E. Clark AIA as one of his final private commissions. 8,519 square feet above grade with a 1,709 SF walk-out lower level and 2,531 SF conditioned crawl space.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem' }}>
            {['6 Bedrooms', '7 Bathrooms', '7 Fireplaces', 'Heart Pine Floors', 'Robert E. Clark AIA'].map(f => (
              <span key={f} style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.16em', textTransform: 'uppercase', paddingBottom: '0.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{f}</span>
            ))}
          </div>
        </FadeIn>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1200, margin: '0 auto', padding: '0 5vw', gap: '6rem', alignItems: 'center' }}>
        <FadeIn delay={0.1}>
          <Label style={{ marginBottom: '1.2rem', display: 'block' }}>The Conservatory</Label>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', lineHeight: 1.18, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            Glass on every side.<br />An octagonal dome<br />overhead.
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: 0 }}>
            19.5 by 17.7 feet, entirely glass-wrapped with a skylight dome that tracks the sky from morning to dusk. The room that reminds you why you came here.
          </p>
        </FadeIn>
        <FadeIn delay={0.25}>
          <img src={PHOTOS.conservatory1} alt="Conservatory" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
        </FadeIn>
      </div>
    </section>
  );
}

function KitchenSection() {
  return (
    <section style={{ background: MID, padding: '11rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 1200, margin: '0 auto', padding: '0 5vw', gap: '6rem', alignItems: 'center' }}>
        <FadeIn delay={0.1}>
          <img src={PHOTOS.kitchen1} alt="Kitchen" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
        </FadeIn>
        <FadeIn delay={0.25}>
          <Label style={{ marginBottom: '1.2rem', display: 'block' }}>The Kitchen</Label>
          <h3 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', lineHeight: 1.18, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            Sub-Zero. Wolf 60".<br />Designed for the<br />serious cook.
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 1.2rem' }}>
            A 60-inch dual fuel Wolf range with six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Sub-Zero refrigeration.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 2.2rem' }}>
            A walk-in pantry and breakfast room that opens to the farm beyond the glass. This house was designed to feed people.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem' }}>
            {['Wolf 60" Dual Fuel', 'Sub-Zero', '2 KitchenAid Dishwashers', 'Walk-In Pantry'].map(f => (
              <span key={f} style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.16em', textTransform: 'uppercase', paddingBottom: '0.25rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>{f}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function LandSection() {
  const structures = [
    { img: PHOTOS.cabana, label: 'Cabana House', body: 'A private guest retreat with one bedroom, one bath, full kitchen, and its own entrance. The estate within the estate.' },
    { img: PHOTOS.highTunnel, label: 'High Tunnel Greenhouse', body: '96 by 36 feet. Year-round specialty crop production with geothermal climate control -- the agricultural heart of the property.' },
    { img: PHOTOS.workshop, label: 'Farm Workshop', body: '30 by 40 feet with plumbing, full electrical, and a 12 by 8 walk-in cooler. Built to run a real operation.' },
  ];
  return (
    <section style={{ background: DARK, padding: '11rem 0' }} id="the-land">
      <FadeIn>
        <Label style={{ textAlign: 'center', display: 'block', marginBottom: '1.5rem' }}>The Land</Label>
        <GoldRule style={{ margin: '0 auto 2.5rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', textAlign: 'center', margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>
          Three acres producing.<br />Seven acres waiting.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '1rem', textAlign: 'center', maxWidth: 520, margin: '0 auto 7rem', padding: '0 2rem', lineHeight: 1.9 }}>
          A USDA-certified veganic farm with O2Compost regenerative systems, biochar production, a 1,400-foot double deer fence, and seven buildable acres ready for whatever vision comes next.
        </p>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: 1200, margin: '0 auto', padding: '0 5vw', gap: '2.5rem' }}>
        {structures.map((s, i) => (
          <FadeIn key={s.label} delay={i * 0.15}>
            <img src={s.img} alt={s.label} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block', marginBottom: '1.8rem' }} />
            <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1.05rem', fontWeight: 400, margin: '0 0 0.7rem' }}>{s.label}</p>
            <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '0.88rem', lineHeight: 1.8, margin: 0 }}>{s.body}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function SystemsSection() {
  const cols = [
    { label: 'Energy', items: ['14.3kW Solar -- 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane Tanks', '1,200 Amp Total Power'] },
    { label: 'Climate', items: ['Geothermal -- 20 Wells x 300 Ft Deep', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification Each Zone', 'Zone-Independent Control'] },
    { label: 'Water', items: ['Private Well -- Up to 50 GPM', '2 x 1,500 Gal Private Septic', 'Commercial Water Filtration', 'Whole House Fire Sprinkler', 'Walk-In Cooler 12 x 8 Ft'] },
    { label: 'Smart Home', items: ['Control4 Audio, Video, Lighting', 'Araknis Enterprise Networking', 'Whole Campus Wi-Fi', 'Brown Safe + Vault Door', 'Dual Central Vacuum'] },
  ];
  return (
    <section style={{ background: MID, padding: '11rem 0' }}>
      <FadeIn>
        <Label style={{ textAlign: 'center', display: 'block', marginBottom: '1.5rem' }}>Infrastructure</Label>
        <GoldRule style={{ margin: '0 auto 2.5rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', textAlign: 'center', margin: '0 0 1.5rem', letterSpacing: '-0.01em' }}>
          Off-grid capable.<br /><em>On-grid refined.</em>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '1rem', textAlign: 'center', maxWidth: 500, margin: '0 auto 7rem', padding: '0 2rem', lineHeight: 1.9 }}>
          Solar, battery, generator, geothermal, and private water. Complete autonomy -- quietly, invisibly, and without compromise.
        </p>
      </FadeIn>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', maxWidth: 1200, margin: '0 auto', padding: '0 5vw', gap: '3rem' }}>
        {cols.map((col, i) => (
          <FadeIn key={col.label} delay={i * 0.1}>
            <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.43rem', letterSpacing: '0.26em', textTransform: 'uppercase', margin: '0 0 1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>{col.label}</p>
            {col.items.map(item => (
              <p key={item} style={{ color: 'rgba(255,255,255,0.36)', fontFamily: 'Georgia, serif', fontSize: '0.9rem', lineHeight: 1.75, margin: '0 0 0.65rem' }}>{item}</p>
            ))}
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function LocationSection() {
  return (
    <section style={{ background: DARK, padding: '11rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 5vw', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7rem', alignItems: 'center' }}>
        <FadeIn delay={0.1}>
          <Label style={{ marginBottom: '1.5rem', display: 'block' }}>Location</Label>
          <GoldRule style={{ marginBottom: '2.5rem' }} />
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', lineHeight: 1.2, margin: '0 0 2rem', letterSpacing: '-0.01em' }}>
            Private by Nature.<br />Pinehurst by Proximity.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.38)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 1.2rem' }}>
            Three miles from Pinehurst Resort. Four points of private access. Moore County Regional Airport is 15 minutes away for private aviation. Raleigh-Durham International is under an hour.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.32)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 3rem' }}>
            A transferable Pinehurst Country Club Signature Golf Membership is included -- unlimited access to Course No. 7 and No. 9.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            {['Pinehurst Resort -- 3 Miles', 'Moore County Regional Airport -- 15 Min', 'Raleigh-Durham International -- 1 Hour', 'FirstHealth Moore Regional Hospital'].map(p => (
              <p key={p} style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0, paddingLeft: '1rem', borderLeft: '1px solid rgba(201,169,110,0.3)' }}>{p}</p>
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

function InquireSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSent(true); };
  const inputStyle = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '0.9rem 0', outline: 'none', width: '100%', letterSpacing: '0.02em' };
  return (
    <section style={{ background: MID, padding: '11rem 0', textAlign: 'center' }} id="inquire">
      <FadeIn>
        <Label style={{ display: 'block', marginBottom: '1.5rem' }}>Private Inquiry</Label>
        <GoldRule style={{ margin: '0 auto 3rem' }} />
        <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', margin: '0 0 1rem', letterSpacing: '-0.01em' }}>
          Request a Private Viewing
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1rem', margin: '0 0 4rem' }}>
          Exclusively represented by Rachel Hernandez
        </p>
        {sent ? (
          <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem' }}>Thank you. We will be in touch shortly.</p>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem', maxWidth: 460, margin: '0 auto', padding: '0 2rem', textAlign: 'left' }}>
            <input name="name" value={form.name} onChange={handle} placeholder="Your Name" required style={inputStyle} />
            <input name="email" value={form.email} onChange={handle} type="email" placeholder="Email Address" required style={inputStyle} />
            <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your interest" rows={3} style={{ ...inputStyle, resize: 'none' }} />
            <button type="submit" style={{ marginTop: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.65)', fontFamily: 'sans-serif', fontSize: '0.43rem', letterSpacing: '0.28em', textTransform: 'uppercase', padding: '1.1rem 3rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
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
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3.5rem 5vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Flow Farm -- 107 Linden Trail, Aberdeen NC</p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '0.38rem', letterSpacing: '0.14em', textTransform: 'uppercase', margin: 0 }}>Exclusively Offered at $5,250,000</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.18em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>Rachel Hernandez</p>
        <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '0.38rem', letterSpacing: '0.14em', margin: 0 }}>rachelhernandezrealtor@gmail.com</p>
      </div>
    </footer>
  );
}

export default function FlowFarmLanding2() {
  return (
    <div style={{ background: DARK, minHeight: '100vh' }}>
      <Hero />
      <VisionSection />
      <FullBleedPhoto src={PHOTOS.exterior} caption="Main residence -- Robert E. Clark AIA, Pinehurst NC" />
      <StatsSection />
      <ResidenceSection />
      <KitchenSection />
      <FullBleedPhoto src={PHOTOS.conservatory2} caption="19.5 x 17.7 ft -- glass-wrapped, octagonal skylight dome" />
      <LandSection />
      <FullBleedPhoto src={PHOTOS.grounds} caption="3-acre USDA veganic farm -- active, producing, regenerative" />
      <SystemsSection />
      <LocationSection />
      <InquireSection />
      <Footer />
    </div>
  );
}
