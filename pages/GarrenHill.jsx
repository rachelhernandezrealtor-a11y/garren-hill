import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#B8986A';
const CREAM = '#F2EDE4';
const DARK = '#0d0b09';
const MATTERPORT = 'https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&';

// Garren Hill photos from the Rocky Photo Hub
const GH = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';
const OLD = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';

// Using Garren Hill Hollycrest photos
const IMG = {
  exterior1: 'https://media.base44.com/images/public/69e248a2469cc39540781cce/6e1617ac3_200HollycrestDrive-222.jpg',
  exterior2: 'https://media.base44.com/images/public/69e248a2469cc39540781cce/0275eccb6_200HollycrestDrive-225.jpg',
  // Fallback to available photos for now
  hero:     'https://media.base44.com/images/public/69e248a2469cc39540781cce/6e1617ac3_200HollycrestDrive-222.jpg',
  portico:  'https://media.base44.com/images/public/69e248a2469cc39540781cce/0275eccb6_200HollycrestDrive-225.jpg',
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

function Fade({ children, delay, up, style }) {
  const [ref, on] = useFade();
  return (
    <div ref={ref} style={{
      opacity: on ? 1 : 0,
      transform: on ? 'none' : (up ? 'translateY(36px)' : 'translateY(20px)'),
      transition: `opacity 1.8s ease ${delay || 0}s, transform 1.8s ease ${delay || 0}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Glass({ children, style }) {
  return (
    <div style={{ background: 'rgba(10,8,6,0.65)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.06)', ...style }}>
      {children}
    </div>
  );
}

function Eyebrow({ children, center }) {
  return <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: 0, textAlign: center ? 'center' : 'left' }}>{children}</p>;
}

function GoldLine({ center }) {
  return <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.3, margin: center ? '0 auto' : undefined }} />;
}

// ============================================================
// HERO
// ============================================================
function Hero() {
  const w = useW();
  const mob = w < 768;
  const [p, setP] = useState(0);
  useEffect(() => {
    const t = [setTimeout(() => setP(1), 300), setTimeout(() => setP(2), 1400), setTimeout(() => setP(3), 2600)];
    return () => t.forEach(clearTimeout);
  }, []);
  const show = n => ({ opacity: p >= n ? 1 : 0, transform: p >= n ? 'none' : 'translateY(24px)', transition: 'opacity 2.4s ease, transform 2.4s ease' });

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', background: '#0d0b09' }}>
      <img src={IMG.hero} alt="Garren Hill" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', zIndex: 1, opacity: 0.72 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(13,11,9,0.3) 0%, transparent 25%, transparent 55%, rgba(13,11,9,0.96) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,11,9,0.45) 100%)' }} />

      <div style={{ position: 'absolute', top: mob ? '1.8rem' : '2.6rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...show(1) }}>
        <p style={{ fontFamily: 'Georgia, serif', fontSize: '10px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: 0 }}>Garren Hill</p>
      </div>
      {!mob && (
        <nav style={{ position: 'absolute', top: '2.4rem', right: '3rem', zIndex: 10, display: 'flex', gap: '2.8rem', ...show(1) }}>
          {['The Manor', 'The Legacy', 'Inquire'].map(n => (
            <a key={n} href={'#' + n.toLowerCase().replace(' ', '-')}
              style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none' }}>{n}</a>
          ))}
        </nav>
      )}

      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: mob ? '0 6vw' : '0 10vw' }}>
        <div style={show(2)}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 1.6rem' : '0 0 2rem' }}>
            Pinehurst, North Carolina &mdash; Est. 1916
          </p>
          <h1 style={{ color: '#fff', fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2.6rem' : w < 1024 ? '4.2rem' : '5.8rem', lineHeight: 1.08, margin: 0, letterSpacing: '-0.02em', textShadow: '0 4px 80px rgba(0,0,0,0.7)' }}>
            A Century of<br /><em>Quiet Consequence.</em>
          </h1>
        </div>
        <div style={{ ...show(3), marginTop: mob ? '1.6rem' : '2.2rem' }}>
          <p style={{ color: 'rgba(255,255,255,0.34)', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '0.92rem' : '1.08rem', margin: mob ? '0 0 2rem' : '0 0 2.6rem', lineHeight: 1.8 }}>
            The most historically significant private residence<br />in the Pinehurst ETJ.
          </p>
          <div style={{ width: 1, height: 44, background: `linear-gradient(to bottom, ${GOLD}, transparent)`, margin: '0 auto', opacity: 0.5 }} />
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: mob ? '2rem' : '3rem', left: mob ? '1.5rem' : '3rem', right: mob ? '1.5rem' : '3rem', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', ...show(3) }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'sans-serif', fontSize: mob ? '9px' : '11px', letterSpacing: '0.2em', textTransform: 'uppercase', margin: '0 0 0.3rem' }}>200 Hollycrest Drive, Pinehurst, NC</p>
          <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>4.15 Acres &mdash; 5 Beds &mdash; 5 Baths &mdash; 7 Fireplaces</p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// LEGACY
// ============================================================
function Legacy() {
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '8rem 0' : '18rem 0', textAlign: 'center' }}>
      <Fade up>
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mob ? '2.4rem' : '3rem' }}>
          <Eyebrow center>The Legacy</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : w < 1024 ? '2.6rem' : '3.2rem', lineHeight: 1.32, margin: 0, letterSpacing: '-0.018em' }}>
            Built in 1916 by Walter Hines Page.<br />
            Co-founder of Doubleday, Page &amp; Co.<br />
            <em>Still standing. Still rare.</em>
          </h2>
          <GoldLine center />
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, margin: 0, maxWidth: 620 }}>
            Recognized by the Village Historic Foundation. Meticulously restored
            over years of patient stewardship. The date 1916 remains inlaid in brick
            at the entrance portico -- a quiet declaration that some things are built to last.
          </p>
          <a href={MATTERPORT} target="_blank" rel="noreferrer"
            style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(184,152,106,0.28)', paddingBottom: '0.3rem' }}>
            Begin the Virtual Tour
          </a>
        </div>
      </Fade>
    </section>
  );
}

// ============================================================
// MANOR -- split layout
// ============================================================
function Manor() {
  const w = useW();
  const mob = w < 768;
  return (
    <section id="the-manor" style={{ background: '#100e0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 6vw', gap: mob ? '5rem' : '8rem', alignItems: 'center' }}>
        <Fade delay={0.1}>
          <img src={IMG.portico} alt="Garren Hill portico" style={{ width: '100%', height: mob ? 360 : 600, objectFit: 'cover', display: 'block' }} />
        </Fade>
        <Fade delay={0.25}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>The Manor</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.22, margin: 0, letterSpacing: '-0.018em' }}>
              Five bedrooms.<br />Seven fireplaces.<br />One hundred years<br />of character.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.05rem', lineHeight: 2.1, margin: 0 }}>
              Wide plank heart pine floors throughout. A central hall vista that runs the full
              depth of the house. Original millwork, period-accurate brick carefully sourced
              over three months to match the portico.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.05rem', lineHeight: 2.1, margin: 0 }}>
              A five-zone climate system engineered to protect the original architecture.
              The Wee Cottage -- a private guest structure moved to the site by sky crane --
              sits quietly on the grounds, complete and self-contained.
            </p>
            <a href="#inquire" style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(184,152,106,0.28)', paddingBottom: '0.3rem', alignSelf: 'flex-start' }}>
              Private Inquiry
            </a>
          </div>
        </Fade>
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
  const stats = [
    ['1916', 'Year Built'],
    ['4.15', 'Acres'],
    ['5 / 5', 'Beds / Baths'],
    ['7', 'Fireplaces'],
    ['VHF', 'Recognized'],
    ['Pinehurst ETJ', 'Tax Benefit'],
    ['Wee Cottage', 'Guest Structure'],
    ['5 Zone', 'Climate Control'],
  ];
  const cols = mob ? 2 : 4;
  return (
    <section style={{ background: '#0d0b09', padding: mob ? '7rem 0' : '12rem 0' }}>
      <Fade>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 5rem' : '0 0 6rem', textAlign: 'center' }}>
          The Provenance
        </p>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, maxWidth: 1020, margin: '0 auto', padding: '0 5vw', borderTop: '1px solid rgba(255,255,255,0.05)', borderLeft: '1px solid rgba(255,255,255,0.05)' }}>
        {stats.map(([v, l], i) => (
          <Fade key={l} delay={i * 0.05}>
            <div style={{ textAlign: 'center', padding: mob ? '3rem 1rem' : '4rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontSize: mob ? '1.6rem' : '2.4rem', fontWeight: 400, margin: '0 0 0.7rem', letterSpacing: '-0.02em' }}>{v}</p>
              <p style={{ color: 'rgba(255,255,255,0.16)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0 }}>{l}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// ROOMS -- architectural details
// ============================================================
function Rooms() {
  const w = useW();
  const mob = w < 768;
  const rooms = [
    { label: 'Grand Living Room', body: 'Approximately 40 feet in length. A fireplace at each end. Heart pine floors that tell the age of the wood in every knot and grain.' },
    { label: 'Entrance Hall', body: 'The central hall vista runs the full depth of the house. Every door, every threshold, every proportion deliberate.' },
    { label: 'Library', body: 'Floor-to-ceiling shelving. A fireplace. The room that first made Garren Hill a place for writers, thinkers, and those who understood the value of quiet.' },
    { label: 'Dining Room', body: 'Formal and generous. Original millwork. Light from the garden. The table that has seated a century of remarkable meals.' },
    { label: 'Kitchen + Breakfast Room', body: 'Fully modernized while honoring the bones. Opens to the rear grounds and the gardens beyond.' },
    { label: 'Primary Suite', body: 'First floor. Private fireplace. A master bath that carries the same attention to detail as every other room in the house.' },
  ];
  return (
    <section id="the-legacy" style={{ background: '#100e0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <Fade up>
        <div style={{ textAlign: 'center', marginBottom: mob ? '5rem' : '8rem', padding: '0 6vw' }}>
          <Eyebrow center>The Rooms</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.25, margin: '2rem 0 0', letterSpacing: '-0.018em' }}>
            Rooms that have<br />witnessed history.
          </h2>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
        {rooms.map((r, i) => (
          <Fade key={r.label} delay={i * 0.08}>
            <div style={{ background: '#100e0c', padding: mob ? '2.5rem 2rem' : '3.5rem 3rem' }}>
              <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '0 0 1.2rem' }}>{r.label}</p>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'Georgia, serif', fontSize: '0.98rem', lineHeight: 1.9, margin: 0 }}>{r.body}</p>
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
  const w = useW();
  const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mob ? '2.4rem' : '3rem', textAlign: 'center' }}>
        <Fade up>
          <Eyebrow center>Location</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.25, margin: '2rem 0', letterSpacing: '-0.018em' }}>
            In the Pinehurst ETJ.<br /><em>The best address in the Sandhills.</em>
          </h2>
          <GoldLine center />
          <p style={{ color: 'rgba(255,255,255,0.26)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.1rem', lineHeight: 2.1, margin: '2rem 0 0', maxWidth: 580 }}>
            Located in the Pinehurst ETJ, Garren Hill benefits from a favorable tax rate
            while sitting at the quiet center of everything the Sandhills offers.
            Golf, dining, culture, and some of the finest weather in the Southeast --
            all within minutes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginTop: '1rem' }}>
            {['Pinehurst Village -- Minutes', 'Pinehurst Resort -- Nearby', 'Moore County Airport', 'FirstHealth Regional Hospital', 'Village Historic Foundation'].map(item => (
              <p key={item} style={{ color: 'rgba(255,255,255,0.14)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', margin: 0, display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <span style={{ display: 'inline-block', width: 16, height: 1, background: GOLD, opacity: 0.4 }} />
                {item}
              </span>
            ))}
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
  const w = useW();
  const mob = w < 768;
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const submit = e => { e.preventDefault(); setSent(true); };
  const inp = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '1rem 0', width: '100%', outline: 'none' };
  return (
    <section id="inquire" style={{ background: '#100e0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ maxWidth: 600, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem' }}>
        <Fade up>
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.6rem' }}>
            <Eyebrow center>Private Inquiry</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '2.8rem', lineHeight: 1.2, margin: 0, letterSpacing: '-0.018em' }}>
              Begin the Conversation.
            </h2>
            <GoldLine center />
            <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'Georgia, serif', fontSize: '1rem', lineHeight: 2, margin: 0 }}>
              Garren Hill is shown by private appointment only.
              All inquiries are handled with full discretion.
            </p>
          </div>
        </Fade>
        {sent ? (
          <Fade><p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.1rem', textAlign: 'center', lineHeight: 1.9 }}>Thank you. We will be in touch shortly.</p></Fade>
        ) : (
          <Fade style={{ width: '100%' }}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%' }}>
              <input style={inp} placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
              <input style={inp} placeholder="Email Address" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
              <input style={inp} placeholder="Phone Number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
              <textarea style={{ ...inp, resize: 'none', height: 100 }} placeholder="Your message (optional)" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              <button type="submit" style={{ background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: '1.2rem 3rem', cursor: 'pointer', alignSelf: 'center', marginTop: '1rem' }}>
                Submit Inquiry
              </button>
            </form>
          </Fade>
        )}
      </div>
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
    <footer style={{ background: DARK, borderTop: '1px solid rgba(255,255,255,0.04)', padding: mob ? '4rem 6vw' : '5rem 6vw' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', display: 'flex', flexDirection: mob ? 'column' : 'row', justifyContent: 'space-between', alignItems: mob ? 'flex-start' : 'center', gap: '2rem' }}>
        <div>
          <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'Georgia, serif', fontSize: '0.85rem', margin: '0 0 0.4rem', letterSpacing: '0.12em' }}>Garren Hill</p>
          <p style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>200 Hollycrest Drive, Pinehurst, NC &mdash; Est. 1916</p>
        </div>
        <div style={{ textAlign: mob ? 'left' : 'right' }}>
          <p style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Rachel Hernandez &mdash; rachelhernandezrealtor@gmail.com</p>
        </div>
      </div>
    </footer>
  );
}

export default function GarrenHill() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Hero />
      <Legacy />
      <Manor />
      <Numbers />
      <Rooms />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
