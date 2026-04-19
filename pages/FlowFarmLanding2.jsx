import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = "#0a0a0a"; // v3

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
  cabana2: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/bb6c9c80-2258-4414-87c7-5ae5a49b1700/public',
};

function useFadeIn(threshold = 0.08) {
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
      transform: visible ? 'translateY(0)' : 'translateY(20px)',
      transition: `opacity 1.2s ease ${delay}s, transform 1.2s ease ${delay}s`,
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

function EditorialSection({ photo, label, headline, paragraphs, overlay = 'rgba(0,0,0,0.42)', minHeight = '100vh', id, flip = false }) {
  return (
    <section id={id} style={{ position: 'relative', minHeight, overflow: 'hidden' }}>
      <img src={photo} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: overlay }} />
      <div style={{ position: 'relative', zIndex: 2, minHeight, display: 'flex', alignItems: 'center', padding: '8rem 6vw' }}>
        <FadeIn style={{ width: '100%' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 2.8rem' }}>{label}</p>
          <div style={{ display: 'grid', gridTemplateColumns: flip ? '1fr 1.1fr' : '1.1fr 1fr', gap: '6vw', alignItems: 'start', maxWidth: 1200 }}>
            <div style={{ order: flip ? 2 : 1 }}>
              <h2 style={{
                color: '#fff',
                fontFamily: 'Georgia, serif',
                fontWeight: 700,
                fontSize: 'clamp(2.4rem, 5vw, 4.8rem)',
                lineHeight: 1.05,
                margin: 0,
                letterSpacing: '-0.025em'
              }}>
                {headline}
              </h2>
            </div>
            <div style={{ order: flip ? 1 : 2 }}>
              {paragraphs.map((p, i) => (
                <p key={i} style={{
                  color: 'rgba(255,255,255,0.65)',
                  fontFamily: 'Georgia, serif',
                  fontSize: 'clamp(0.88rem, 1.15vw, 1.05rem)',
                  lineHeight: 1.9,
                  margin: i < paragraphs.length - 1 ? '0 0 1.4rem' : 0
                }}>{p}</p>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { v: '15', l: 'Acres' }, { v: '8,519', l: 'Sq Ft' }, { v: '6 / 7', l: 'Beds / Baths' },
    { v: '7', l: 'Fireplaces' }, { v: '6', l: 'Structures' }, { v: '$5.25M', l: 'Offered At' },
  ];
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: '40vh', display: 'flex', alignItems: 'center' }}>
      <img src={PHOTOS.aerial} alt="Aerial" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
      <FadeIn style={{ position: 'relative', zIndex: 2, width: '100%', padding: '4rem 6vw' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', maxWidth: 1200, borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {stats.map((s, i) => (
            <div key={s.l} style={{ textAlign: 'center', padding: '2.2rem 0.5rem', borderRight: i < 5 ? '1px solid rgba(255,255,255,0.08)' : 'none' }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: 'clamp(1.5rem, 2.2vw, 2.2rem)', fontWeight: 400, margin: '0 0 0.3rem', letterSpacing: '-0.02em' }}>{s.v}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: '0.4rem', letterSpacing: '0.2em', textTransform: 'uppercase', margin: 0 }}>{s.l}</p>
            </div>
          ))}
        </div>
      </FadeIn>
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', zIndex: 1 }} />
      <div style={{ position: 'relative', zIndex: 2, padding: '8rem 6vw', width: '100%' }}>
        <FadeIn>
          <p style={{ fontFamily: 'sans-serif', fontSize: '0.42rem', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 2.8rem' }}>Private Inquiry</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: '6vw', alignItems: 'start', maxWidth: 1100 }}>
            <div>
              <h2 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 700, fontSize: 'clamp(2.4rem, 4.5vw, 4.2rem)', lineHeight: 1.05, margin: '0 0 2rem', letterSpacing: '-0.025em' }}>
                Request a<br />Private Viewing.
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 1.9, margin: '0 0 0.6rem' }}>
                Exclusively represented by Rachel Hernandez. Showings are by private appointment only.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'sans-serif', fontSize: '0.41rem', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>rachelhernandezrealtor@gmail.com</p>
            </div>
            <div style={{ paddingTop: '0.5rem' }}>
              {sent ? (
                <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem' }}>Thank you. We will be in touch shortly.</p>
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

      <EditorialSection
        photo={PHOTOS.grounds}
        label="Property Introduction"
        headline={"An established\nsystem of land\nand architecture."}
        paragraphs={[
          "Flow Farm is not a concept. It is a fully realized, operating estate -- 15 USDA-certified acres with agricultural standing, natural privacy buffer, and long-term optionality already in place.",
          "Three miles from Pinehurst Resort, the property sits at the intersection of working land and refined living. Six structures. A 3-acre veganic farm. Seven buildable acres. And infrastructure designed to run the entire operation independently.",
          "This is the rare land position that does not ask you to imagine what it could become. It is already there."
        ]}
        overlay="rgba(0,0,0,0.44)"
      />

      <StatsBar />

      <EditorialSection
        id="the-estate"
        photo={PHOTOS.living1}
        label="The Residence"
        headline={"A grand living\nroom. 17 feet tall.\nBuilt to last."}
        paragraphs={[
          "Designed by Robert E. Clark AIA as one of his final private commissions, the main residence spans 8,519 square feet above grade -- with a 1,709 SF partially finished walk-out lower level and 2,531 SF of conditioned crawl space below.",
          "Reclaimed Civil War-era heart pine floors run the full depth of the home. Seven fireplaces, each unique, anchor the major living spaces. Six bedrooms, seven bathrooms -- every room designed with proportion, permanence, and the long view.",
          "The glass-wrapped conservatory -- 19.5 by 17.7 feet with an octagonal skylight dome -- is the heart of the home. A room that dissolves the boundary between inside and estate."
        ]}
        overlay="rgba(0,0,0,0.4)"
        flip={true}
      />

      <EditorialSection
        photo={PHOTOS.kitchen1}
        label="The Kitchen"
        headline={"Sub-Zero.\nWolf 60\".\nSerious cook."}
        paragraphs={[
          "A 60-inch dual fuel Wolf range with six burners, griddle, grill, and warming drawer. Two KitchenAid dishwashers. Sub-Zero refrigeration. This is a kitchen designed for people who actually cook.",
          "The walk-in pantry opens directly to the breakfast room, which looks out across the farm. The dining room beyond seats twelve comfortably. The flow of the kitchen to the land is intentional -- this house was designed to feed people.",
          "Two KitchenAid dishwashers. Because entertaining at this level demands it."
        ]}
        overlay="rgba(0,0,0,0.42)"
      />

      <EditorialSection
        id="the-land"
        photo={PHOTOS.highTunnel}
        label="The Farm"
        headline={"Three acres\nproducing.\nSeven waiting."}
        paragraphs={[
          "The 3-acre USDA-certified veganic farm has been in active production for years. O2Compost regenerative systems, a biochar kiln, and a 1,400-foot double deer fence create a self-contained growing operation unlike anything in the region.",
          "The 96 by 36 foot high tunnel greenhouse operates year-round with geothermal climate control. The farm workshop -- 30 by 40 feet with full plumbing, electrical, and a 12 by 8 walk-in cooler -- is operational and producing.",
          "Seven additional buildable acres remain untouched. The expansion potential for hospitality, wellness retreats, agritourism, or additional structures is significant -- and the infrastructure to support it is already in place."
        ]}
        overlay="rgba(0,0,0,0.45)"
        flip={true}
      />

      <EditorialSection
        photo={PHOTOS.exterior}
        label="Architectural Gravity"
        headline={"Structure that\nholds\nfreedom."}
        paragraphs={[
          "A property built to run, and designed to live. Operating with true architectural gravity, a 1,200-amp commercial-grade electrical distribution system powers a fully integrated, resilient smart home environment.",
          "A whole Control4 system connects audio, video, and lighting throughout the entire residence, supported by whole-campus Wi-Fi, a comprehensive alarm system, and a Brown Safe jewelry and vault door for ultimate security.",
          "These systems are robust, redundant, and largely invisible -- housed beneath the home in a sealed, fully conditioned mechanical crawl space with energy-efficient mylar wrap insulation. The result is a home that simply works. Quietly, completely, and indefinitely."
        ]}
        overlay="rgba(0,0,0,0.48)"
      />

      <EditorialSection
        photo={PHOTOS.aerial}
        label="Location"
        headline={"Private by\nNature. Pinehurst\nby Proximity."}
        paragraphs={[
          "Three miles from Pinehurst Resort. Four private points of access via Linden Trail, Linden Road, Mollie Lane, and Skene Lane. A private drive creates immediate separation from the world beyond.",
          "Moore County Regional Airport is 15 minutes away for private aviation. Raleigh-Durham International is under an hour for commercial travel. FirstHealth Moore Regional Hospital is 10 minutes away.",
          "A transferable Pinehurst Country Club Signature Golf Membership is included -- unlimited access to Course No. 7 and No. 9, two of the most revered courses in the history of American golf."
        ]}
        overlay="rgba(0,0,0,0.42)"
        flip={true}
      />

      <InquireSection />
      <Footer />
    </div>
  );
}
