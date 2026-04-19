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

function useFadeIn(threshold = 0.1) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 1.3s ease ${delay}s, transform 1.3s ease ${delay}s`,
      ...style
    }}>
      {children}
    </div>
  );
}

function Hero() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 600);
    const t2 = setTimeout(() => setPhase(2), 1800);
    const t3 = setTimeout(() => setPhase(3), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);
  const fade = (p) => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 1.6s ease, transform 1.6s ease'
  });
  return (
    <section style={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden', background: DARK }}>
      <video autoPlay loop muted playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1, opacity: 0.9 }}>
        <source src="https://base44.app/api/apps/69e248a2469cc39540781cce/files/mp/public/69e248a2469cc39540781cce/f7910a1c9_275a93837_forestheroMAIN.mp4" type="video/mp4" />
      </video>
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 22%, transparent 58%, rgba(0,0,0,0.8) 100%)' }} />
      <div style={{ position: 'absolute', top: '2rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...fade(1) }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '0.43rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: 0 }}>Flow Farm -- Pinehurst, North Carolina</p>
      </div>
      <nav style={{ position: 'absolute', top: '1.6rem', right: '2.5rem', zIndex: 10, display: 'flex', gap: '2rem', ...fade(1) }}>
        {['The Estate', 'The Land', 'Inquire'].map(n => (
          <a key={n} href={`#${n.toLowerCase().replace(' ', '-')}`} style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none' }}>{n}</a>
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

function PhotoSection({ photo, label, headline, body, cards, minHeight = '100vh', overlay = 'rgba(0,0,0,0.38)', id }) {
  return (
    <section id={id} style={{ position: 'relative', minHeight, overflow: 'hidden' }}>
      <img src={photo} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: overlay, zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, padding: '7rem 6vw 5rem' }}>
        <FadeIn>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 2.5rem' }}>{label}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', maxWidth: 1100 }}>
            <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 4.2rem)', lineHeight: 1.08, margin: 0, letterSpacing: '-0.02em' }}>{headline}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Georgia, serif', fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)', lineHeight: 1.9, margin: '0.5rem 0 0', maxWidth: 420 }}>{body}</p>
          </div>
        </FadeIn>
        {cards && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cards.length}, 1fr)`, gap: '0', marginTop: '5rem', maxWidth: 1100, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
            {cards.map((card, i) => (
              <FadeIn key={card.label} delay={i * 0.1}>
                <div style={{ padding: '2.2rem 2rem 2.2rem 0', borderRight: i < cards.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none', paddingRight: i < cards.length - 1 ? '2rem' : 0, paddingLeft: i > 0 ? '2rem' : 0 }}>
                  <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 0.7rem' }}>{card.label}</p>
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '0.92rem', lineHeight: 1.75, margin: 0 }}>{card.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function SystemsSection() {
  const cols = [
    { label: 'Energy', items: ['14.3kW Solar -- 61 Samsung Panels', 'Sunny Island 10k Battery Backup', '30kW Kohler Generator', '2 x 1,000 Gal Propane Tanks', '1,200 Amp Total Power'] },
    { label: 'Climate', items: ['Geothermal -- 20 Wells x 300 Ft', '5-Zone Water Furnace', 'Energy Recovery Ventilator', 'Lennox Air Purification', 'Zone-Independent Control'] },
    { label: 'Water + Security', items: ['Private Well -- 50 GPM', '2 x 1,500 Gal Septic', 'Commercial Water Filtration', 'Whole House Fire Sprinkler', 'Full Property Alarm'] },
    { label: 'Smart Home', items: ['Control4 Audio, Video, Light', 'Araknis Enterprise Network', 'Whole Campus Wi-Fi', 'Brown Safe + Vault Door', 'Dual Central Vacuum'] },
  ];
  return (
    <section style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden' }}>
      <img src={PHOTOS.exterior} alt="Systems" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, padding: '7rem 6vw 6rem' }}>
        <FadeIn>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 2.5rem' }}>Infrastructure</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', maxWidth: 1100, marginBottom: '5rem' }}>
            <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 4vw, 3.8rem)', lineHeight: 1.08, margin: 0, letterSpacing: '-0.02em' }}>Off-grid capable.<br /><em>On-grid refined.</em></h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0.5rem 0 0', maxWidth: 420 }}>
              Solar, battery, generator, geothermal, and private water. Complete autonomy -- quietly, invisibly, and without compromise.
            </p>
          </div>
        </FadeIn>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', maxWidth: 1100, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          {cols.map((col, i) => (
            <FadeIn key={col.label} delay={i * 0.1}>
              <div style={{ padding: '2rem', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
                <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.22em', textTransform: 'uppercase', margin: '0 0 1.2rem' }}>{col.label}</p>
                {col.items.map(item => <p key={item} style={{ color: 'rgba(255,255,255,0.42)', fontFamily: 'Georgia, serif', fontSize: '0.88rem', lineHeight: 1.75, margin: '0 0 0.5rem' }}>{item}</p>)}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function InquireSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => { e.preventDefault(); setSent(true); };
  const inputStyle = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.15)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '0.9rem 0', outline: 'none', width: '100%' };
  return (
    <section id="inquire" style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img src={PHOTOS.living2} alt="Inquire" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.52)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, padding: '7rem 6vw', width: '100%' }}>
        <FadeIn>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 2.5rem' }}>Private Inquiry</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'start', maxWidth: 1000 }}>
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.8vw, 3.6rem)', lineHeight: 1.1, margin: '0 0 1.5rem', letterSpacing: '-0.02em' }}>
                Request a<br /><em>Private Viewing.</em>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 0.5rem' }}>
                Exclusively represented by Rachel Hernandez.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.14em', margin: 0, textTransform: 'uppercase' }}>rachelhernandezrealtor@gmail.com</p>
            </div>
            <div>
              {sent ? (
                <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem', paddingTop: '2rem' }}>Thank you. We will be in touch shortly.</p>
              ) : (
                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
                  <input name="name" value={form.name} onChange={handle} placeholder="Your Name" required style={inputStyle} />
                  <input name="email" value={form.email} onChange={handle} type="email" placeholder="Email Address" required style={inputStyle} />
                  <textarea name="message" value={form.message} onChange={handle} placeholder="Tell us about your interest" rows={3} style={{ ...inputStyle, resize: 'none' }} />
                  <button type="submit" style={{ marginTop: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.65)', fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.26em', textTransform: 'uppercase', padding: '1rem 2.5rem', cursor: 'pointer', alignSelf: 'flex-start' }}>
                    Request Viewing
                  </button>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '3rem 6vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
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
      <PhotoSection
        photo={PHOTOS.grounds}
        label="Property Introduction"
        headline={"An established\nsystem of land\nand architecture."}
        body="A rare land position with privacy, agricultural standing, and long-term optionality already in place. Fifteen acres of forest and working farmland, three miles from Pinehurst Resort."
        cards={[
          { label: '15 USDA Acres', body: 'Secured agricultural status and a protected natural privacy buffer.' },
          { label: '3-Acre Veganic Farm', body: 'Established and highly productive agricultural infrastructure.' },
          { label: 'Architectural Main House', body: 'A curated design masterpiece -- 8,519 square feet above grade.' },
          { label: 'Architectural Guest House', body: 'Cabana house -- 1 bed, 1 bath, full kitchen, private entrance.' },
        ]}
        overlay="rgba(0,0,0,0.42)"
      />
      <PhotoSection
        id="the-estate"
        photo={PHOTOS.living1}
        label="The Residence"
        headline={"A grand living room\n27 feet wide.\n17 feet tall."}
        body="Reclaimed Civil War-era heart pine floors run the full depth of the home. Seven fireplaces. Designed by Robert E. Clark AIA as one of his final private commissions -- built for permanence."
        cards={[
          { label: '6 Bedrooms / 7 Baths', body: 'Generously proportioned rooms with original architectural detail throughout.' },
          { label: '7 Fireplaces', body: 'Each fireplace unique -- positioned to anchor every major living space.' },
          { label: 'Glass Conservatory', body: '19.5 x 17.7 ft, fully glass-wrapped with an octagonal skylight dome.' },
          { label: 'Heart Pine Floors', body: 'Reclaimed Civil War-era -- irreplaceable, impossibly beautiful.' },
        ]}
        overlay="rgba(0,0,0,0.38)"
      />
      <PhotoSection
        photo={PHOTOS.kitchen1}
        label="The Kitchen"
        headline={"Sub-Zero. Wolf 60\".\nBuilt for the\nserious cook."}
        body="A 60-inch dual fuel Wolf range with six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Sub-Zero refrigeration. Walk-in pantry and breakfast room opening to the farm."
        cards={[
          { label: 'Wolf 60" Dual Fuel Range', body: '6 burners, griddle, grill, warming drawer -- restaurant performance.' },
          { label: 'Sub-Zero Refrigeration', body: 'Integrated and seamless -- cold storage designed for a working kitchen.' },
          { label: 'Walk-In Pantry', body: 'Generous storage with direct access to the breakfast room and farm.' },
          { label: '2 KitchenAid Dishwashers', body: 'Because entertaining at this level demands it.' },
        ]}
        overlay="rgba(0,0,0,0.4)"
      />
      <PhotoSection
        id="the-land"
        photo={PHOTOS.highTunnel}
        label="The Farm"
        headline={"Three acres\nproducing.\nSeven waiting."}
        body="USDA-certified veganic. O2Compost regenerative systems. Biochar production kiln. 1,400-ft double deer fence. A living farm in operation for years -- and seven buildable acres ready for whatever comes next."
        cards={[
          { label: 'High Tunnel Greenhouse', body: '96 x 36 ft -- year-round specialty crops with geothermal climate control.' },
          { label: 'Farm Workshop', body: '30 x 40 ft with plumbing, full electrical, walk-in cooler 12 x 8 ft.' },
          { label: 'O2Compost System', body: 'Regenerative composting with biochar kiln and covered production area.' },
          { label: '7 Buildable Acres', body: 'Additional structures, hospitality expansion, or custom development.' },
        ]}
        overlay="rgba(0,0,0,0.45)"
      />
      <SystemsSection />
      <PhotoSection
        photo={PHOTOS.aerial}
        label="Location"
        headline={"Private by Nature.\nPinehurst\nby Proximity."}
        body="Three miles from Pinehurst Resort. Four private points of access. Moore County Regional Airport 15 minutes away. Raleigh-Durham International under an hour. The world is close. You just cannot tell."
        cards={[
          { label: 'Pinehurst Resort -- 3 Miles', body: 'Transferable Pinehurst Country Club Signature Golf Membership included.' },
          { label: 'Moore County Regional Airport', body: 'Private aviation -- 15 minutes from the property.' },
          { label: 'RDU International', body: 'Under one hour to major commercial hub.' },
          { label: 'FirstHealth Moore Regional', body: 'Level III trauma center -- 10 minutes from the property.' },
        ]}
        overlay="rgba(0,0,0,0.4)"
      />
      <InquireSection />
      <Footer />
    </div>
  );
}
