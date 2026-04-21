import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';
const GLASS = 'rgba(255,255,255,0.10)';
const GLASS_BORDER = 'rgba(255,255,255,0.22)';

const GH_BASE = 'https://base44.app/api/apps/69e2578ca7113dbe93cb208d/files/mp/public/69e2578ca7113dbe93cb208d/';

const cdnInt = (url) => `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_1600,c_limit/${encodeURIComponent(url)}`;
const cdnExt = (url) => `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_1600,c_limit/${encodeURIComponent(url)}`;

const HERO_IMG = cdnExt(GH_BASE + '6e1617ac3_200HollycrestDrive-222.jpg');
const EXTERIOR_2 = cdnExt(GH_BASE + '0275eccb6_200HollycrestDrive-225.jpg');
const EXTERIOR_3 = cdnExt(GH_BASE + 'ae02c29d8_200HollycrestDrive-224.jpg');
const EXTERIOR_4 = cdnExt(GH_BASE + 'd79828fba_200HollycrestDrive-223.jpg');
const LIVING_1 = cdnInt(GH_BASE + '974dc6da4_200HollycrestDrive-66.jpg');
const LIVING_FIRE = cdnInt(GH_BASE + '5f5f87315_200HollycrestDrive-65fire.jpg');
const MASTER_BED = cdnInt(GH_BASE + '78160e09e_200HollycrestDrive-69.jpg');
const BATH_2 = cdnInt(GH_BASE + '8b40a6c2b_200HollycrestDrive-64.jpg');

const eyebrowStyle = {
  fontFamily: 'sans-serif',
  fontSize: '10px',
  letterSpacing: '0.36em',
  textTransform: 'uppercase',
  color: GOLD,
  margin: '0 0 1.2rem',
  display: 'block',
};

const dividerStyle = {
  width: 40,
  height: 1,
  background: GOLD,
  margin: '2rem auto',
  opacity: 0.5,
};

function useScrollY() {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrollY;
}

function StatCounter({ end, label, suffix = '', delay = 0 }) {
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1400;
      const steps = 40;
      const inc = end / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += inc;
        if (current >= end) { setVal(end); clearInterval(interval); }
        else setVal(Math.floor(current));
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [end, delay]);
  return (
    <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
      <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', letterSpacing: '-0.02em' }}>
        {suffix === '$' ? '$' : ''}{val.toLocaleString()}{suffix !== '$' ? suffix : ''}
      </div>
      <div style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: '0.4rem' }}>{label}</div>
    </div>
  );
}

function CinematicReveal({ eyebrow, headline, body, imgSrc, reverse = false }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      minHeight: '85vh',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.82) 45%, rgba(10,10,10,0.0) 100%)', zIndex: 1, ...(reverse ? { background: 'linear-gradient(to left, rgba(10,10,10,0.82) 45%, rgba(10,10,10,0.0) 100%)' } : {}) }} />
      <div style={{
        position: 'relative', zIndex: 2,
        width: '50%',
        maxWidth: 560,
        padding: 'clamp(3rem, 8vw, 7rem) clamp(2rem, 5vw, 5rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: reverse ? 'auto' : 0,
      }}>
        <span style={eyebrowStyle}>{eyebrow}</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#fff', lineHeight: 1.15, margin: '0 0 1.5rem', letterSpacing: '-0.02em' }} dangerouslySetInnerHTML={{ __html: headline }} />
        <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 1.9, margin: 0, opacity: 0.88 }}>{body}</p>
      </div>
    </div>
  );
}

export default function GarrenHillV2() {
  const scrollY = useScrollY();
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`https://base44.app/api/apps/69e248a2469cc39540781cce/entities/Inquiry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, property: 'Garren Hill', source: 'Landing Page' }),
      });
    } catch (err) {}
    setSubmitted(true);
  };

  return (
    <div style={{ background: DARK, color: CREAM, fontFamily: 'Georgia, serif', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, padding: '1.5rem 4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to bottom, rgba(10,10,10,0.7) 0%, transparent 100%)' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '1rem', color: '#fff', letterSpacing: '0.08em' }}>Garren Hill</span>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['The Estate', 'The History', 'Inquire'].map(item => (
            <a key={item} href={item === 'Inquire' ? '#inquire' : '#'} onClick={item === 'Inquire' ? (e) => { e.preventDefault(); setInquiryOpen(true); } : undefined}
              style={{ fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)', textDecoration: 'none', cursor: 'pointer' }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${HERO_IMG})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `scale(1.08) translateY(${scrollY * 0.3}px)`,
          transition: 'transform 0.1s linear',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, rgba(10,10,10,0.55) 60%, rgba(10,10,10,0.85) 100%)' }} />

        <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(3rem, 8vw, 6rem)' }}>
          <span style={{ ...eyebrowStyle, marginBottom: '1rem' }}>Pinehurst, North Carolina -- Est. 1916</span>
          <h1 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(3rem, 7vw, 6.5rem)', color: '#fff', lineHeight: 1.05, margin: '0 0 1.5rem', letterSpacing: '-0.03em', maxWidth: 900 }}>
            Garren Hill.<br />
            <em style={{ fontStyle: 'italic' }}>A century</em><br />
            of belonging.
          </h1>
          <p style={{ color: CREAM, fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', lineHeight: 1.7, maxWidth: 520, margin: '0 0 2.5rem', opacity: 0.85 }}>
            200 Hollycrest Drive -- 5 Beds -- 5 Baths -- 7 Fireplaces -- 4.15 Acres -- $4.25M
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button onClick={() => setInquiryOpen(true)} style={{ padding: '0.85rem 2.2rem', background: GLASS, border: `1px solid ${GLASS_BORDER}`, backdropFilter: 'blur(12px)', color: '#fff', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', cursor: 'pointer', borderRadius: 2 }}>
              Inquire
            </button>
            <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" rel="noreferrer" style={{ padding: '0.85rem 2.2rem', background: 'transparent', border: `1px solid rgba(255,255,255,0.3)`, color: 'rgba(255,255,255,0.75)', fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2, display: 'inline-flex', alignItems: 'center' }}>
              Virtual Tour
            </a>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3, background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(10px)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem 0', display: 'flex', justifyContent: 'center', gap: 0 }}>
          {[
            { end: 1916, label: 'Year Built', suffix: '' },
            { end: 6700, label: 'Sq Ft', suffix: '' },
            { end: 7, label: 'Fireplaces', suffix: '' },
            { end: 4, label: 'Acres', suffix: '' },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div style={{ width: 1, background: 'rgba(255,255,255,0.1)', margin: '0 0.5rem' }} />}
              <StatCounter {...s} delay={i * 200} />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* MANIFESTO */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem)', maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <span style={eyebrowStyle}>The Property</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
          Built for a homecoming<br /><em>that never came.</em>
        </h2>
        <div style={dividerStyle} />
        <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2, opacity: 0.85, margin: '2rem 0' }}>
          In 1916, Walter Hines Page -- US Ambassador to the Court of St. James, co-founder of Doubleday Page & Co., the man who helped put Woodrow Wilson in the White House -- had a home built for him in his native Moore County. Plans came from a Boston architectural firm. The builders were Leonard Tufts' own craftsmen from Pinehurst.
        </p>
        <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2, opacity: 0.85, margin: '0 0 2rem' }}>
          Page returned from London in 1918, after the war ended, and died only weeks later. He never lived here. His son Ralph moved the family in, and for decades the home stayed in the Page family -- quietly outlasting the men and women who shaped it.
        </p>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', lineHeight: 1.9, fontStyle: 'italic' }}>
          One hundred and ten years later, it is still standing. Still gathering people. Still worth the drive.
        </p>
      </div>

      {/* PULL QUOTE */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 8vw, 12rem)', background: '#0f0f0f', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#fff', lineHeight: 1.3, margin: 0, maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          "She had shared a room at Vassar with a girl who became the Queen of Thailand. Hollycrest hosted the royal personage on several occasions."
        </p>
        <div style={{ ...dividerStyle, marginTop: '2.5rem' }} />
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '1.5rem 0 0' }}>Betty Dumaine -- Owner 1959-1980</p>
      </div>

      {/* CINEMATIC -- EXTERIOR */}
      <CinematicReveal
        eyebrow="The Exterior"
        headline="Neo-Georgian.<br/><em>Unchanged in all the ways</em><br/>that matter."
        body="The structure was designed by a Boston architectural firm in Neo-Georgian style. Its NE/SW orientation was intentional -- the back of the house floods with natural light from morning through afternoon. Grandiflora magnolias, long-leaf pines, and a camellia garden frame the approach."
        imgSrc={EXTERIOR_2}
      />

      {/* NUMBERS */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 8rem)', background: DARK }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <span style={{ ...eyebrowStyle, textAlign: 'center', display: 'block' }}>By the Numbers</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { n: '5', label: 'Bedrooms' },
              { n: '5', label: 'Bathrooms' },
              { n: '7', label: 'Fireplaces' },
              { n: '4.15', label: 'Acres' },
              { n: '6,700', label: 'Sq Ft Heated' },
              { n: '1916', label: 'Year Built' },
              { n: '3', label: 'Year Restoration' },
              { n: '110', label: 'Years of History' },
            ].map(item => (
              <div key={item.label} style={{ padding: '2.5rem 2rem', background: DARK, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(2.2rem, 3vw, 3rem)', color: '#fff' }}>{item.n}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CINEMATIC -- LIVING */}
      <CinematicReveal
        eyebrow="The Living Room"
        headline="Seven fireplaces.<br/><em>One of them</em><br/>is this one."
        body="The original oak flooring is still here. So are the fireplace mantels -- all seven of them, preserved through the full 1999 restoration. Master carpenter David Prest rebuilt the Georgian woodwork from scratch: custom paneling, crown moldings, chair rails. The bones are 1916. The finish is flawless."
        imgSrc={LIVING_FIRE}
        reverse={true}
      />

      {/* RESTORATION */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem)', maxWidth: 820, margin: '0 auto', textAlign: 'center' }}>
        <span style={eyebrowStyle}>The Restoration</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem' }}>
          Three years. Every pipe.<br /><em>Every wire. Every detail.</em>
        </h2>
        <div style={dividerStyle} />
        <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2, opacity: 0.85, margin: '2rem 0' }}>
          In 1998, Dr. and Mrs. Russell McAllister purchased the property and commissioned Durham architect Thomas O'Shea to recreate the original drawings from scratch. General contractor Dennis Dunagan led a three-year full restoration -- interior completely gutted, all plumbing and electrical replaced, new joists, new windows. Every Marvin window custom-made.
        </p>
        <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2, opacity: 0.85, margin: '0' }}>
          What was kept is the point: the leaded glass sidelights and over-door fan at the front entry. The seven fireplace mantels. The original oak flooring. The solid-wood interior doors with their brass key plates -- and their original keys.
        </p>
      </div>

      {/* CINEMATIC -- EXTERIOR 3 */}
      <CinematicReveal
        eyebrow="The Grounds"
        headline="4.15 acres.<br/><em>A tennis court.</em><br/>A 20x40 pool."
        body="The grounds were shaped across three ownerships. Betty Dumaine planted the three American sycamores in 1959. The McAllisters added holly trees, azaleas, dwarf nandinas, and iris beds. The brick terrace behind the house -- accessible from both the dining room and the living room -- seats a large group for dinner. There is a children's playhouse in the back. The locals call it The Wee Cottage."
        imgSrc={EXTERIOR_3}
      />

      {/* HISTORY TIMELINE */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem)', background: '#0f0f0f' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span style={{ ...eyebrowStyle, textAlign: 'center', display: 'block', marginBottom: '3rem' }}>A Century of Stewards</span>
          {[
            { year: '1916', title: 'Walter Hines Page', body: 'US Ambassador to the Court of St. James. Co-founder of Doubleday, Page & Co. The home was built for him. He never lived here.' },
            { year: '1918', title: 'Ralph Page', body: "Walter's son moved his family in after his father's death. The home stayed in the Page family through World War II." },
            { year: '1959', title: 'Betty Dumaine', body: 'Prominent Bostonian. Horses, hounds, peacocks. Vassar roommate of the woman who became Queen of Thailand. Threw birthday parties for her horses and invited the neighborhood children.' },
            { year: '1980', title: 'Duke University', body: "Betty left the estate to Duke on her death. Duke couldn't find a buyer -- even after advertising in Atlanta and New York." },
            { year: '1999', title: 'The McAllister Restoration', body: 'Dr. and Mrs. Russell McAllister. Three years. Every system rebuilt. The Georgian bones, preserved.' },
            { year: 'Now', title: 'Yours.', body: 'The next chapter is unwritten. The house is ready.' },
          ].map((item, i) => (
            <div key={item.year} style={{ display: 'flex', gap: '2.5rem', marginBottom: '3rem', alignItems: 'flex-start' }}>
              <div style={{ minWidth: 60, textAlign: 'right' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '1.4rem', color: GOLD }}>{item.year}</span>
              </div>
              <div style={{ flex: 1, borderLeft: `1px solid rgba(201,169,110,0.25)`, paddingLeft: '2rem' }}>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#fff', marginBottom: '0.5rem' }}>{item.title}</div>
                <div style={{ color: CREAM, fontSize: '0.95rem', lineHeight: 1.85, opacity: 0.75 }}>{item.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CINEMATIC -- MASTER */}
      <CinematicReveal
        eyebrow="The Primary Suite"
        headline="Light from<br/><em>three directions.</em>"
        body="The NE/SW orientation the architect specified in 1916 still delivers. The back of the house -- including the primary suite -- is filled with windows. Morning light from the northeast. Afternoon from the southwest. A balcony off two of the second-floor bedrooms overlooks the tennis courts and the rear grounds, where the local deer herd makes regular appearances."
        imgSrc={MASTER_BED}
        reverse={true}
      />

      {/* VHF + SPECS */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 8rem)', background: DARK }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { eyebrow: 'Recognition', title: 'VHF Recognized Historic Property', body: 'Virginia Historic Foundation recognized. One of the distinctly historical homes in southern Moore County.' },
            { eyebrow: 'Infrastructure', title: 'County Water, Sewer + Private Well', body: 'County water and sewer lines. In-ground well and storage tank for irrigation and the pool. 250-gallon underground propane tank.' },
            { eyebrow: 'Entertaining', title: 'Designed for Gatherings', body: 'Over 25 years as a venue for the English Speaking Union, Pi Beta Phi, Phi Beta Kappa, DAR, the Folio Club of Durham, wedding celebrations. The brick terrace seats a large group.' },
            { eyebrow: 'Storage', title: 'Four-Room Stone Basement', body: 'Stone-walled basement under half the house. Partially finished, climate-controlled. Wine rack, refrigerator, upright freezer, storage shelving. Interior and exterior access.' },
          ].map(card => (
            <div key={card.title} style={{ background: GLASS, border: `1px solid ${GLASS_BORDER}`, padding: '2.5rem 2rem' }}>
              <span style={{ ...eyebrowStyle, marginBottom: '0.8rem' }}>{card.eyebrow}</span>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: '1.1rem', color: '#fff', marginBottom: '0.8rem', lineHeight: 1.3 }}>{card.title}</div>
              <div style={{ color: CREAM, fontSize: '0.9rem', lineHeight: 1.85, opacity: 0.75 }}>{card.body}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LOCATION */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem)', textAlign: 'center', maxWidth: 700, margin: '0 auto' }}>
        <span style={eyebrowStyle}>Location</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem' }}>
          Three minutes from<br /><em>Pinehurst Resort.</em>
        </h2>
        <div style={dividerStyle} />
        <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2, opacity: 0.85, margin: '2rem 0' }}>
          200 Hollycrest Drive sits in southern Moore County -- minutes from Pinehurst No. 2, the golf capital of the world. The Sandhills community. World-class racing at Pinehurst Motorsports. The Village of Pinehurst. And the quiet that comes from having all of it nearby without being in the middle of it.
        </p>
      </div>

      {/* INQUIRE */}
      <div id="inquire" style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem)', background: '#0f0f0f', textAlign: 'center' }}>
        <span style={eyebrowStyle}>Private Inquiries</span>
        <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 1rem' }}>
          Request Information
        </h2>
        <p style={{ color: CREAM, fontSize: '1rem', opacity: 0.65, margin: '0 0 3rem' }}>Offered at $4,250,000. Shown by appointment only.</p>

        {submitted ? (
          <div style={{ maxWidth: 500, margin: '0 auto', padding: '3rem', background: GLASS, border: `1px solid ${GLASS_BORDER}` }}>
            <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: '1.2rem', margin: 0 }}>Thank you. We will be in touch shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: 560, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { key: 'name', label: 'Name', type: 'text' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'phone', label: 'Phone', type: 'tel' },
            ].map(f => (
              <input key={f.key} type={f.type} placeholder={f.label} required={f.key !== 'phone'} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                style={{ padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none' }} />
            ))}
            <textarea placeholder="Message (optional)" rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
              style={{ padding: '1rem 1.2rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', resize: 'vertical' }} />
            <button type="submit" style={{ padding: '1rem 2rem', background: GOLD, border: 'none', color: DARK, fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600 }}>
              Submit Inquiry
            </button>
          </form>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ padding: '2.5rem 4vw', background: DARK, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)' }}>Garren Hill -- 200 Hollycrest Drive, Pinehurst, NC</span>
        <span style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Rachel Hernandez -- Luxury Real Estate</span>
      </div>

      {/* INQUIRY MODAL */}
      {inquiryOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,10,10,0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}
          onClick={e => { if (e.target === e.currentTarget) setInquiryOpen(false); }}>
          <div style={{ background: '#141414', border: `1px solid ${GLASS_BORDER}`, padding: '3rem', maxWidth: 520, width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: '1.2rem', color: '#fff' }}>Private Inquiry</span>
              <button onClick={() => setInquiryOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}>x</button>
            </div>
            {submitted ? (
              <p style={{ color: GOLD, fontFamily: 'Georgia, serif', textAlign: 'center' }}>Thank you. We will be in touch shortly.</p>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[{ key: 'name', label: 'Name', type: 'text' }, { key: 'email', label: 'Email', type: 'email' }, { key: 'phone', label: 'Phone', type: 'tel' }].map(f => (
                  <input key={f.key} type={f.type} placeholder={f.label} required={f.key !== 'phone'} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none' }} />
                ))}
                <textarea placeholder="Message" rows={3} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ padding: '0.9rem 1rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} />
                <button type="submit" style={{ padding: '0.9rem', background: GOLD, border: 'none', color: DARK, fontFamily: 'sans-serif', fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', fontWeight: 600 }}>
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
