import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#B8986A';
const CREAM = '#F2EDE4';
const DARK = '#0d0b09';
const MATTERPORT = 'https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&';
const GH = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';

const IMG = {
  hero:        GH + '6e1617ac3_200HollycrestDrive-222.jpg',
  exterior2:   GH + '0275eccb6_200HollycrestDrive-225.jpg',
  exterior3:   GH + 'f0b4bf90e_200HollycrestDrive-223.jpg',
  aerial:      GH + '9efa93e39_200HollycrestDrive-230.jpg',
  pool:        GH + '18ea0e2c4_200HollycrestDrive-218.jpg',
  poolwide:    GH + '6e1fa56a6_200HollycrestDrive-219.jpg',
  tennis:      GH + 'b38e74a20_200HollycrestDrive-216.jpg',
  weecottage:  GH + '4e6cdb2f6_200HollycrestDrive-212.jpg',
  livingroom:  GH + 'cee09ae5f_200HollycrestDrive-65.jpg',
  livingfire:  GH + '5f5f87315_200HollycrestDrive-65.jpg',
  living2:     GH + '974dc6da4_200HollycrestDrive-66.jpg',
  masterbath:  GH + '78160e09e_200HollycrestDrive-69.jpg',
  masterbath2: GH + 'a9f46703e_200HollycrestDrive-68.jpg',
  bath2:       GH + '8b40a6c2b_200HollycrestDrive-64.jpg',
  kitchen:     GH + '3eddea51a_200HollycrestDrive-32.jpg',
  dining:      GH + '75f99e8d6_200HollycrestDrive-31.jpg',
  hallway:     GH + '23ae60213_200HollycrestDrive-30.jpg',
  bedroom2:    GH + 'fd252a907_200HollycrestDrive-60.jpg',
  library:     GH + '42dea0be0_200HollycrestDrive-58.jpg',
  portico:     GH + 'b9dc3dc38_200HollycrestDrive-61.jpg',
  entry:       GH + '594c48db0_200HollycrestDrive-62.jpg',
  sitting:     GH + 'c416c62aa_200HollycrestDrive-67.jpg',
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
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); o.disconnect(); } }, { threshold: 0.1 });
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
      ...style
    }}>{children}</div>
  );
}

function Glass({ children, style }) {
  return (
    <div style={{
      background: 'rgba(10,8,6,0.72)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.07)',
      ...style
    }}>{children}</div>
  );
}

function Eyebrow({ children, center }) {
  return (
    <p style={{
      fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.36em',
      textTransform: 'uppercase', color: GOLD, margin: 0, textAlign: center ? 'center' : 'left'
    }}>{children}</p>
  );
}

function GoldLine({ center }) {
  return <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.3, margin: center ? '0 auto' : undefined }} />;
}

function Hero() {
  const w = useW(); const mob = w < 768;
  const [p, setP] = useState(0);
  useEffect(() => {
    const t = [setTimeout(() => setP(1), 300), setTimeout(() => setP(2), 1400), setTimeout(() => setP(3), 2600)];
    return () => t.forEach(clearTimeout);
  }, []);
  const show = n => ({
    opacity: p >= n ? 1 : 0,
    transform: p >= n ? 'none' : 'translateY(24px)',
    transition: 'opacity 2.4s ease, transform 2.4s ease'
  });
  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 640, overflow: 'hidden', background: DARK }}>
      <img src={IMG.hero} alt="Garren Hill" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', zIndex: 1, opacity: 0.68 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(13,11,9,0.3) 0%, transparent 25%, transparent 55%, rgba(13,11,9,0.97) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'radial-gradient(ellipse at center, transparent 30%, rgba(13,11,9,0.42) 100%)' }} />

      <div style={{ position: 'absolute', top: mob ? '1.8rem' : '2.6rem', left: 0, right: 0, zIndex: 10, textAlign: 'center', ...show(1) }}>
        <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.52em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', margin: 0 }}>Garren Hill</p>
      </div>

      {!mob && (
        <nav style={{ position: 'absolute', top: '2.4rem', right: '3rem', zIndex: 10, display: 'flex', gap: '2.8rem', ...show(1) }}>
          {['The Manor', 'The Grounds', 'Inquire'].map(n => (
            <a key={n} href={'#' + n.toLowerCase().replace(' ', '-')} style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.24em', textTransform: 'uppercase', textDecoration: 'none' }}>{n}</a>
          ))}
        </nav>
      )}

      <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: mob ? '0 6vw' : '0 10vw' }}>
        <div style={show(2)}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.4em', textTransform: 'uppercase', color: GOLD, margin: mob ? '0 0 1.6rem' : '0 0 2rem' }}>
            Pinehurst, North Carolina -- Est. 1916
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
          <p style={{ color: 'rgba(255,255,255,0.12)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.16em', textTransform: 'uppercase', margin: 0 }}>4.15 Acres -- 5 Beds -- 5 Baths -- 7 Fireplaces</p>
        </div>
      </div>
    </section>
  );
}

function Legacy() {
  const w = useW(); const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '8rem 0' : '18rem 0', textAlign: 'center' }}>
      <Fade up>
        <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 6vw', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: mob ? '2.4rem' : '3rem' }}>
          <Eyebrow center>200 Hollycrest Drive -- Pinehurst, North Carolina</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : w < 1024 ? '2.6rem' : '3.2rem', lineHeight: 1.32, margin: 0, letterSpacing: '-0.018em' }}>
            Built in 1916 by Walter Hines Page.<br />
            Co-founder of Doubleday, Page and Co.<br />
            <em>Still standing. Still rare.</em>
          </h2>
          <GoldLine center />
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.12rem', lineHeight: 2.1, margin: 0, maxWidth: 640 }}>
            Recognized by the Village Historic Foundation. Meticulous restoration with period-accurate
            brick sourced over three months to match the original portico exactly. The year 1916
            remains inlaid in brick at the entrance -- a quiet declaration that some things are built to last.
          </p>
          <a href={MATTERPORT} target="_blank" rel="noreferrer" style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(184,152,106,0.28)', paddingBottom: '0.3rem' }}>
            Begin the Virtual Tour
          </a>
        </div>
      </Fade>
    </section>
  );
}

function Cinematic({ src, eyebrow, headline, body, align, quote, position }) {
  const w = useW(); const mob = w < 768;
  const overlay = quote
    ? 'rgba(13,11,9,0.58)'
    : align === 'right'
      ? 'linear-gradient(to left, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.35) 55%, transparent 100%)'
      : 'linear-gradient(to right, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.35) 55%, transparent 100%)';
  return (
    <section style={{ position: 'relative', minHeight: mob ? '80vh' : '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: position || 'center', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: overlay }} />
      <div style={{ position: 'relative', zIndex: 5, width: '100%', maxWidth: 1360, margin: '0 auto', padding: mob ? '6rem 6vw' : '10rem 6vw', display: 'flex', justifyContent: quote ? 'center' : align === 'right' ? 'flex-end' : 'flex-start' }}>
        <Fade delay={0.1}>
          {quote ? (
            <div style={{ maxWidth: mob ? '100%' : 680, textAlign: 'center' }}>
              <p style={{ color: CREAM, fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: mob ? '1.5rem' : w < 1024 ? '2rem' : '2.8rem', lineHeight: 1.4, margin: 0, letterSpacing: '-0.01em' }}>"{headline}"</p>
            </div>
          ) : (
            <Glass style={{ padding: mob ? '2.5rem 2rem' : '3.5rem 4rem', maxWidth: mob ? '100%' : 500 }}>
              {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
              {eyebrow && <div style={{ width: 28, height: 1, background: GOLD, opacity: 0.3, margin: '1.4rem 0' }} />}
              <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '1.6rem' : '2.4rem', lineHeight: 1.22, margin: '0 0 1.6rem', letterSpacing: '-0.015em', whiteSpace: 'pre-line' }}>{headline}</h2>
              {body && <p style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Georgia, serif', fontSize: mob ? '0.95rem' : '1rem', lineHeight: 2, margin: 0 }}>{body}</p>}
            </Glass>
          )}
        </Fade>
      </div>
    </section>
  );
}

function Manor() {
  const w = useW(); const mob = w < 768;
  return (
    <section id="the-manor" style={{ background: '#100e0c', padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', maxWidth: 1320, margin: '0 auto', padding: '0 6vw', gap: mob ? '5rem' : '8rem', alignItems: 'center' }}>
        <Fade delay={0.1}>
          <img src={IMG.exterior2} alt="Garren Hill manor" style={{ width: '100%', height: mob ? 360 : 600, objectFit: 'cover', objectPosition: 'center 20%', display: 'block' }} />
        </Fade>
        <Fade delay={0.25}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Eyebrow>The Manor</Eyebrow>
            <GoldLine />
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.2, margin: 0, letterSpacing: '-0.018em' }}>
              Five bedrooms.<br />Seven fireplaces.<br />One hundred and nine<br />years of character.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.05rem', lineHeight: 2.1, margin: 0 }}>
              Wide plank heart pine floors throughout. A central hall vista that runs the full
              depth of the house. Original millwork, period-accurate brick sourced over three
              months to match the entrance portico exactly.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.05rem', lineHeight: 2.1, margin: 0 }}>
              A five-zone climate system engineered to protect the original architecture.
              The Wee Cottage -- moved to the grounds by sky crane -- sits quietly at the
              edge of the property, complete and self-contained.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.5rem' }}>
              <a href={MATTERPORT} target="_blank" rel="noreferrer" style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(184,152,106,0.28)', paddingBottom: '0.3rem' }}>Virtual Tour</a>
              <a href="#inquire" style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.3rem' }}>Private Inquiry</a>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Numbers() {
  const w = useW(); const mob = w < 768;
  const stats = [
    ['1916', 'Year Built'], ['4.15', 'Acres'], ['5 / 5', 'Beds / Baths'],
    ['7', 'Fireplaces'], ['VHF', 'Recognized'], ['Pinehurst ETJ', 'Tax Benefit'],
    ['Wee Cottage', 'Guest Structure'], ['5 Zone', 'Climate Control']
  ];
  return (
    <section style={{ background: DARK, padding: mob ? '7rem 0' : '12rem 0', borderTop: '1px solid rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 6vw' }}>
        <Fade up>
          <div style={{ display: 'grid', gridTemplateColumns: mob ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: mob ? '3rem 2rem' : '4rem 3rem' }}>
            {stats.map(([val, label]) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <p style={{ color: GOLD, fontFamily: 'Georgia, serif', fontSize: mob ? '1.6rem' : '2rem', fontWeight: 400, margin: '0 0 0.5rem', letterSpacing: '-0.01em' }}>{val}</p>
                <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
}

function Interiors() {
  const w = useW(); const mob = w < 768;
  const photos = [
    { src: IMG.livingroom,  label: 'Living Room',     body: 'The 40-foot grand living room. Two fireplaces. Original pine floors.' },
    { src: IMG.masterbath,  label: 'Primary Bath',    body: 'Fully renovated with period sensitivity. Every fixture chosen with intention.' },
    { src: IMG.pool,        label: 'The Pool',        body: '20 by 40 feet. Surrounded by mature plantings and the quiet of Pinehurst.' },
    { src: IMG.weecottage,  label: 'Wee Cottage',     body: 'Private guest structure. Moved to the grounds by sky crane. Self-contained.' },
    { src: IMG.exterior3,   label: 'The Grounds',     body: '4.15 acres of curated landscape. Circular drive. Private and protected.' },
    { src: IMG.exterior2,   label: 'The Portico',     body: '1916 inlaid in the entrance brick. The first thing you see. The last you forget.' },
  ];
  return (
    <section style={{ background: '#0d0b09', padding: mob ? '8rem 0' : '14rem 0' }}>
      <Fade up>
        <div style={{ textAlign: 'center', marginBottom: mob ? '5rem' : '8rem', padding: '0 6vw' }}>
          <Eyebrow center>The Interior</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.25, margin: '2rem 0 0', letterSpacing: '-0.018em' }}>
            Rooms that remember.
          </h2>
        </div>
      </Fade>
      <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : 'repeat(3, 1fr)', maxWidth: 1320, margin: '0 auto', padding: '0 5vw', gap: mob ? '3rem' : '3.5rem' }}>
        {photos.map((photo, i) => (
          <Fade key={photo.label} delay={i * 0.12}>
            <div>
              <div style={{ position: 'relative', overflow: 'hidden' }}>
                <img src={photo.src} alt={photo.label} style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,11,9,0.75) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                  <p style={{ color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.26em', textTransform: 'uppercase', margin: 0 }}>{photo.label}</p>
                </div>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Georgia, serif', fontSize: '0.95rem', lineHeight: 1.9, margin: '1.5rem 0 0' }}>{photo.body}</p>
            </div>
          </Fade>
        ))}
      </div>
    </section>
  );
}

function Grounds() {
  const w = useW(); const mob = w < 768;
  return (
    <section id="the-grounds" style={{ background: '#0f0d0b', padding: mob ? '8rem 0' : '16rem 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 6vw' }}>
        <Fade up>
          <div style={{ textAlign: 'center', marginBottom: mob ? '5rem' : '8rem' }}>
            <Eyebrow center>The Grounds</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.25, margin: '2rem 0 0', letterSpacing: '-0.018em' }}>
              4.15 private acres.<br />Two tennis courts. A pool.<br />The Wee Cottage.
            </h2>
          </div>
        </Fade>
        <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: mob ? '2rem' : '2.5rem' }}>
          <Fade delay={0.1}>
            <img src={IMG.poolwide} alt="Pool" style={{ width: '100%', height: mob ? 280 : 420, objectFit: 'cover', objectPosition: 'center 40%', display: 'block' }} />
          </Fade>
          <Fade delay={0.2}>
            <div style={{ display: 'grid', gap: mob ? '2rem' : '2.5rem' }}>
              <img src={IMG.tennis} alt="Tennis courts" style={{ width: '100%', height: mob ? 180 : 195, objectFit: 'cover', display: 'block' }} />
              <img src={IMG.weecottage} alt="Wee Cottage" style={{ width: '100%', height: mob ? 180 : 195, objectFit: 'cover', display: 'block' }} />
            </div>
          </Fade>
        </div>
        <Fade delay={0.3}>
          <p style={{ color: 'rgba(255,255,255,0.22)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.08rem', lineHeight: 2.1, margin: mob ? '3rem 0 0' : '5rem 0 0', maxWidth: 680, marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
            The grounds have been tended with the same care as the house itself. A 20-by-40 pool,
            two tennis courts, a circular drive through mature pines, and the Wee Cottage --
            private, complete, and quietly extraordinary.
          </p>
        </Fade>
      </div>
    </section>
  );
}

function Location() {
  const w = useW(); const mob = w < 768;
  return (
    <section style={{ background: DARK, padding: mob ? '8rem 0' : '14rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 6vw', textAlign: 'center' }}>
        <Fade up>
          <Eyebrow center>Location</Eyebrow>
          <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.25, margin: '2rem 0 3rem', letterSpacing: '-0.018em' }}>
            Pinehurst, North Carolina.
          </h2>
          <GoldLine center />
          <p style={{ color: 'rgba(255,255,255,0.28)', fontFamily: 'Georgia, serif', fontSize: mob ? '1rem' : '1.1rem', lineHeight: 2.1, margin: '3rem auto 0', maxWidth: 640 }}>
            Within the Pinehurst Extra-Territorial Jurisdiction -- a designation that carries
            meaningful tax advantages. Minutes from the Village of Pinehurst, the golf courses,
            and everything that makes this corner of the Sandhills genuinely irreplaceable.
          </p>
        </Fade>
      </div>
    </section>
  );
}

function Inquire() {
  const w = useW(); const mob = w < 768;
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = e => {
    e.preventDefault();
    setSent(true);
  };
  const inp = { background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.12)', color: CREAM, fontFamily: 'Georgia, serif', fontSize: '1rem', padding: '0.9rem 0', width: '100%', outline: 'none' };
  return (
    <section id="inquire" style={{ background: '#100e0c', padding: mob ? '8rem 0' : '16rem 0', borderTop: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '0 6vw' }}>
        <Fade up>
          <div style={{ textAlign: 'center', marginBottom: mob ? '4rem' : '6rem' }}>
            <Eyebrow center>Private Inquiry</Eyebrow>
            <h2 style={{ color: CREAM, fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: mob ? '2rem' : '3rem', lineHeight: 1.25, margin: '2rem 0 1.5rem', letterSpacing: '-0.018em' }}>
              This home deserves<br />a thoughtful conversation.
            </h2>
            <GoldLine center />
          </div>
        </Fade>
        {sent ? (
          <Fade up>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'Georgia, serif', fontSize: '1.1rem', lineHeight: 2, textAlign: 'center' }}>
              Thank you. Rachel will be in touch shortly.
            </p>
          </Fade>
        ) : (
          <Fade delay={0.1}>
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: mob ? '1fr' : '1fr 1fr', gap: '2.5rem' }}>
                <input style={inp} placeholder="Your name" name="name" value={form.name} onChange={handle} required />
                <input style={inp} placeholder="Email address" name="email" type="email" value={form.email} onChange={handle} required />
              </div>
              <input style={inp} placeholder="Phone (optional)" name="phone" value={form.phone} onChange={handle} />
              <textarea style={{ ...inp, resize: 'none', minHeight: 100 }} placeholder="Any specific questions or timeline?" name="message" value={form.message} onChange={handle} />
              <button type="submit" style={{ alignSelf: mob ? 'stretch' : 'flex-start', background: 'transparent', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', padding: '1.1rem 3rem', cursor: 'pointer' }}>
                Submit Inquiry
              </button>
            </form>
          </Fade>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: DARK, padding: '4rem 6vw', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
      <div>
        <p style={{ color: 'rgba(255,255,255,0.1)', fontFamily: 'Georgia, serif', fontSize: '0.85rem', margin: '0 0 0.4rem', letterSpacing: '0.12em' }}>Garren Hill</p>
        <p style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', margin: 0 }}>200 Hollycrest Drive, Pinehurst, NC -- Est. 1916</p>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.06)', fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>Rachel Hernandez -- rachelhernandezrealtor@gmail.com</p>
    </footer>
  );
}

export default function FlowFarmLanding() {
  return (
    <div style={{ background: DARK, margin: 0, padding: 0, overflowX: 'hidden' }}>
      <Hero />
      <Legacy />
      <Manor />
      <Cinematic
        src={IMG.livingroom}
        eyebrow="The Living Room"
        headline={"40 feet long.\nTwo fireplaces.\nOne hundred years of life lived well."}
        body="Original heart pine floors. Proportions that command respect. The room Walter Hines Page built for conversation, literature, and the long view."
        position="center 40%"
      />
      <Numbers />
      <Interiors />
      <Cinematic
        src={IMG.livingfire}
        headline={"A house that has outlasted every trend that ever passed through Pinehurst."}
        quote
        position="center 50%"
      />
      <Grounds />
      <Cinematic
        src={IMG.exterior2}
        eyebrow="The Portico"
        headline={"1916.\nInlaid in brick.\nStill there."}
        body="Three months sourcing period-accurate brick to match what Walter Hines Page built over a century ago. Some things are worth getting exactly right."
        align="right"
        position="center 25%"
      />
      <Location />
      <Inquire />
      <Footer />
    </div>
  );
}
