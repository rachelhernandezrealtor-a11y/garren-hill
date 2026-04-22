import React, { useState, useEffect, useRef } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';
const GLASS = 'rgba(255,255,255,0.10)';
const GLASS_BORDER = 'rgba(255,255,255,0.25)';

const GH = 'https://base44.app/api/apps/69e2578ca7113dbe93cb208d/files/mp/public/69e2578ca7113dbe93cb208d/';

const cdnExt = (id) => `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(GH + id)}`;
const cdnInt = (id) => `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(GH + id)}`;

// Hero: front elevation -- grand portico approach
const IMG_HERO    = cdnExt('68cfea3cf_FrontExterior.jpg');
// Manifesto bg: entrance close-up, columns
const IMG_COLUMNS = cdnExt('ab16d64a5_Entrance.jpg');
// Living room / salon
const IMG_SALON   = cdnInt('5f5f87315_200HollycrestDrive-65fire.jpg');
// Grounds / rear terrace
const IMG_GROUNDS = cdnExt('d93c7facb_200Holycrest-1437.jpg');
// Pool
const IMG_POOL    = cdnExt('9dd5eed5d_-HolycrestExtF-3334.jpg');
// Primary suite
const IMG_PRIMARY = cdnInt('78160e09e_200HollycrestDrive-69.jpg');
// Kitchen
const IMG_KITCHEN = cdnInt('3e2b8a70f_200HollycrestDrive-47.jpg');
// Staircase / foyer
const IMG_FOYER   = cdnInt('b9dc3dc38_200HollycrestDrive-61.jpg');
// Exterior side / grounds wide
const IMG_EXT2    = cdnExt('efbaf4e19_-HolycrestExtF-3370.jpg');

const eyebrow = {
  fontFamily: 'sans-serif',
  fontSize: '10px',
  letterSpacing: '0.36em',
  textTransform: 'uppercase',
  color: GOLD,
  display: 'block',
  margin: '0 0 1.2rem',
};

const divider = {
  width: 40,
  height: 1,
  background: GOLD,
  opacity: 0.5,
  margin: '2rem auto',
};

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

function FadeIn({ children, delay = 0, style = {} }) {
  const ref = useRef();
  const visible = useInView(ref);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function CinematicReveal({ eyebrowText, headline, body, imgSrc, reverse = false, position = 'center' }) {
  const scrollY = useScrollY();
  const ref = useRef();
  const [offsetTop, setOffsetTop] = useState(0);
  useEffect(() => {
    if (ref.current) setOffsetTop(ref.current.offsetTop);
  }, []);
  const parallax = (scrollY - offsetTop) * 0.3;
  return (
    <div ref={ref} style={{ position: 'relative', minHeight: '90vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: `${position} ${-parallax}px`,
        transform: 'scale(1.06)',
        zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: reverse
          ? 'linear-gradient(to left, rgba(10,10,10,0.88) 40%, rgba(10,10,10,0.2) 100%)'
          : 'linear-gradient(to right, rgba(10,10,10,0.88) 40%, rgba(10,10,10,0.2) 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        width: 'min(52%, 560px)',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(2.5rem, 5vw, 5rem)',
        marginLeft: reverse ? 'auto' : 0,
        marginRight: reverse ? 0 : 'auto',
      }}>
        <FadeIn>
          <span style={eyebrow}>{eyebrowText}</span>
          <h2 style={{
            fontFamily: 'Georgia, serif', fontWeight: 400,
            fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
            color: '#fff', lineHeight: 1.15,
            margin: '0 0 1.8rem', letterSpacing: '-0.02em',
          }} dangerouslySetInnerHTML={{ __html: headline }} />
          <div style={{ width: 36, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.8rem' }} />
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 1.95, margin: 0, opacity: 0.88 }}>{body}</p>
        </FadeIn>
      </div>
    </div>
  );
}

function PullQuote({ quote, attribution }) {
  return (
    <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 10vw, 14rem)', background: '#080808', textAlign: 'center' }}>
      <FadeIn>
        <p style={{
          fontFamily: 'Georgia, serif', fontStyle: 'italic',
          fontSize: 'clamp(1.5rem, 2.8vw, 2.6rem)',
          color: '#fff', lineHeight: 1.4,
          margin: '0 auto 2.5rem', maxWidth: 860,
        }}>
          &ldquo;{quote}&rdquo;
        </p>
        <div style={divider} />
        {attribution && (
          <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '1.5rem 0 0' }}>
            {attribution}
          </p>
        )}
      </FadeIn>
    </div>
  );
}

function TimelineItem({ year, title, body, last = false }) {
  return (
    <FadeIn>
      <div style={{ display: 'flex', gap: '2.5rem', marginBottom: last ? 0 : '3.5rem', alignItems: 'flex-start' }}>
        <div style={{ minWidth: 56, textAlign: 'right', paddingTop: '0.15rem' }}>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '1.4rem', color: GOLD, display: 'block', lineHeight: 1.1 }}>{year}</span>
        </div>
        <div style={{ flex: 1, borderLeft: `1px solid rgba(201,169,110,0.22)`, paddingLeft: '2.2rem', paddingTop: '0.1rem' }}>
          <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', color: '#fff', margin: '0 0 0.5rem' }}>{title}</p>
          <p style={{ color: CREAM, fontSize: '0.95rem', lineHeight: 1.9, opacity: 0.72, margin: 0 }}>{body}</p>
        </div>
      </div>
    </FadeIn>
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
      await fetch('https://base44.app/api/apps/69e248a2469cc39540781cce/entities/Inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, property: 'Garren Hill', source: 'Landing Page' }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  return (
    <div style={{ background: DARK, color: CREAM, fontFamily: 'Georgia, serif', overflowX: 'hidden' }}>

      {/* -- NAV -- */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '1.4rem 4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 60 ? 'rgba(10,10,10,0.92)' : 'linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, transparent 100%)',
        borderBottom: scrollY > 60 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        backdropFilter: scrollY > 60 ? 'blur(12px)' : 'none',
        transition: 'all 0.4s ease',
      }}>
        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.05rem', color: '#fff', letterSpacing: '0.04em' }}>Garren Hill</span>
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {['The Estate', 'The History', 'Inquire'].map(item => (
            <a key={item} href="#" onClick={(e) => { e.preventDefault(); if (item === 'Inquire') setInquiryOpen(true); }}
              style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', cursor: 'pointer', transition: 'color 0.2s' }}>
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* -- HERO -- */}
      <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${IMG_HERO})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          transform: `scale(1.08) translateY(${scrollY * 0.28}px)`,
          transition: 'transform 0.08s linear',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.45) 50%, rgba(10,10,10,0.9) 100%)' }} />

        {/* Bottom stats bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
          background: 'rgba(10,10,10,0.78)', backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '1.6rem 0',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          {[
            { label: 'Year Built', value: '1916' },
            { label: 'Sq Ft', value: '6,700' },
            { label: 'Fireplaces', value: '7' },
            { label: 'Acres', value: '4.15' },
            { label: 'Price', value: '$4,250,000' },
          ].map((s, i) => (
            <React.Fragment key={s.label}>
              {i > 0 && <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.1)', margin: '0 clamp(1rem, 3vw, 3rem)' }} />}
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(1.3rem, 2vw, 1.9rem)', color: '#fff', letterSpacing: '-0.01em' }}>{s.value}</div>
                <div style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '0.3rem' }}>{s.label}</div>
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Hero text */}
        <div style={{ position: 'relative', zIndex: 5, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(3rem, 7vw, 6rem) clamp(3rem, 7vw, 6rem) 9rem' }}>
          <FadeIn delay={0.1}>
            <span style={{ ...eyebrow, marginBottom: '1.2rem' }}>Pinehurst, North Carolina -- Est. 1916</span>
            <h1 style={{
              fontFamily: 'Georgia, serif', fontWeight: 400,
              fontSize: 'clamp(3.2rem, 7vw, 6.8rem)',
              color: '#fff', lineHeight: 1.04,
              margin: '0 0 2rem', letterSpacing: '-0.03em', maxWidth: 860,
            }}>
              Garren Hill.<br /><em>A century of</em><br />belonging.
            </h1>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => setInquiryOpen(true)} style={{
                padding: '0.9rem 2.4rem',
                background: 'rgba(201,169,110,0.15)',
                border: `1px solid ${GOLD}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
                color: GOLD, fontFamily: 'sans-serif', fontSize: '10px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                cursor: 'pointer', borderRadius: 1,
                transition: 'background 0.25s',
              }}>
                Inquire
              </button>
              <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" rel="noreferrer" style={{
                padding: '0.9rem 2.4rem',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.22)',
                color: 'rgba(255,255,255,0.8)', fontFamily: 'sans-serif', fontSize: '10px',
                letterSpacing: '0.28em', textTransform: 'uppercase',
                textDecoration: 'none', borderRadius: 1, display: 'inline-flex', alignItems: 'center',
              }}>
                Virtual Tour
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* -- MANIFESTO -- */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>The Property</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', color: '#fff', lineHeight: 1.18, margin: '0 0 2rem', letterSpacing: '-0.02em' }}>
            Built for a homecoming<br /><em>that never came.</em>
          </h2>
          <div style={divider} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.05, opacity: 0.85, margin: '2.2rem 0' }}>
            In 1913, Walter Hines Page -- co-founder of Doubleday, Page &amp; Co., confidant to presidents, and soon-to-be U.S. Ambassador to the Court of St. James -- purchased a thousand-acre farm two miles southwest of Pinehurst and commissioned a Boston architect to design a two-story Georgian brick manor. He named it Garran Hill, after his family's deep Moore County roots. He planned to grow peaches. He planned to come home.
          </p>
          <p style={{ color: CREAM, fontSize: '1.1rem', lineHeight: 2.05, opacity: 0.85, margin: '0 0 2.2rem' }}>
            Instead, Woodrow Wilson called. Page sailed for London, served through the entirety of World War I, and gave what remained of his health to the Allied cause. He never fully occupied the house he built.
          </p>
          <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', color: 'rgba(255,255,255,0.55)', fontSize: '1.05rem', lineHeight: 1.85, margin: 0 }}>
            In a vestibule of Westminster Abbey stands a sculpture bearing the inscription: "The friend of Britain in her sorest need." Garren Hill is the house he was always trying to come back to.
          </p>
        </FadeIn>
      </div>

      {/* -- EXTERIOR CINEMATIC -- */}
      <CinematicReveal
        eyebrowText="The Architecture"
        headline="Neo-Georgian.<br /><em>Unchanged in all</em><br />the ways that matter."
        body="Designed by a Boston architectural firm and built by Leonard Tufts' own craftsmen from Pinehurst. The NE/SW orientation was deliberate -- the back of the house floods with natural light from morning through afternoon. Columned portico. Circular drive. Brick elevation that has not moved an inch in 110 years."
        imgSrc={IMG_EXT2}
        position="center top"
      />

      {/* -- BETTY DUMAINE QUOTE -- */}
      <PullQuote
        quote="She had shared a room at Vassar with a girl who became the Queen of Thailand. Hollycrest hosted the royal personage on several occasions."
        attribution="Betty Dumaine -- Owner 1959 to 1980"
      />

      {/* -- SALON CINEMATIC -- */}
      <CinematicReveal
        eyebrowText="The Salon"
        headline="Nearly forty feet<br /><em>of living room.</em>"
        body="The blush pink salon runs nearly forty feet, tall windows parading down both sides, one end anchored by a fireplace, the other by a view of the camellia garden. The original oak flooring is still here. So are all seven fireplace mantels -- preserved through the full 1999 restoration. Master carpenter David Prest rebuilt the Georgian woodwork from scratch: custom paneling, crown moldings, chair rails. The bones are 1916. The finish is flawless."
        imgSrc={IMG_SALON}
        reverse={true}
      />

      {/* -- NUMBERS GRID -- */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 8rem)', background: '#080808' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '2.5rem' }}>By the Numbers</span>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.06)' }}>
            {[
              { n: '5', label: 'Bedrooms' },
              { n: '5', label: 'Bathrooms' },
              { n: '7', label: 'Fireplaces' },
              { n: '4.15', label: 'Acres' },
              { n: '6,700', label: 'Sq Ft Heated' },
              { n: '1916', label: 'Year Built' },
              { n: '3', label: 'Years to Restore' },
              { n: '110+', label: 'Years of History' },
            ].map(item => (
              <FadeIn key={item.label}>
                <div style={{ padding: '2.5rem 1.5rem', background: '#080808', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: 'clamp(2rem, 2.5vw, 2.8rem)', color: '#fff' }}>{item.n}</div>
                  <div style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', marginTop: '0.5rem' }}>{item.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>

      {/* -- RESTORATION -- */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>The Restoration</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem' }}>
            Three years.<br /><em>Every pipe. Every wire.</em><br />Every original key.
          </h2>
          <div style={divider} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85, margin: '2.2rem 0' }}>
            In 1998, the current stewards commissioned Durham architect Thomas O'Shea to recreate the original drawings from scratch. General contractor Dennis Dunagan led a three-year full restoration -- interior completely gutted, all plumbing and electrical replaced. Every Marvin window custom-made to the original profiles.
          </p>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85, margin: '0 0 2.2rem' }}>
            What was kept is the point: the leaded glass sidelights and over-door fan at the front entry. The seven fireplace mantels. The original oak flooring throughout. The solid-wood interior doors with their original brass key plates -- and their original keys. A Tennessee marble vanity in the powder room. Polished brass hinges that have opened the same doors for a century. If you know, you know.
          </p>
        </FadeIn>
      </div>

      {/* -- KITCHEN CINEMATIC -- */}
      <CinematicReveal
        eyebrowText="The Kitchen"
        headline="Created entirely<br /><em>from scratch.</em>"
        body="The kitchen did not exist in the original house. The current stewards -- an interior designer among them -- designed it from nothing, opening it to sweeping views of the magnolias, the sycamores Betty Dumaine planted in 1959, and the grounds beyond. New heart-pine flooring continues the thread."
        imgSrc={IMG_KITCHEN}
      />

      {/* -- GROUNDS CINEMATIC -- */}
      <CinematicReveal
        eyebrowText="The Grounds"
        headline="4.15 acres.<br /><em>A tennis court.</em><br />A pool. The Wee Cottage."
        body="Betty Dumaine planted three American sycamores in 1959. They are still here. A 20-by-40-foot pool. Two tennis courts. A brick terrace accessible from both the dining room and the living room -- designed for dinner parties, and it shows. And tucked in the back, the Wee Cottage: a fully furnished guest retreat that arrived by sky crane and was set on its own foundation. The kind of thing that only happens at a place like this."
        imgSrc={IMG_GROUNDS}
        reverse={true}
      />

      {/* -- POOL FULL BLEED -- */}
      <div style={{ position: 'relative', height: 'clamp(400px, 55vw, 700px)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${IMG_POOL})`, backgroundSize: 'cover', backgroundPosition: 'center', transform: 'scale(1.04)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.3)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem 4vw', background: 'linear-gradient(to top, rgba(10,10,10,0.75) 0%, transparent 100%)' }}>
          <FadeIn>
            <p style={{ fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', margin: 0 }}>The Pool -- 20 x 40 ft</p>
          </FadeIn>
        </div>
      </div>

      {/* -- CENTURY TIMELINE -- */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 8vw, 10rem)', background: '#080808' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <FadeIn>
            <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '3.5rem' }}>A Century of Stewards</span>
          </FadeIn>
          <TimelineItem
            year="1916"
            title="Walter Hines Page"
            body="U.S. Ambassador to the Court of St. James. Co-founder of Doubleday, Page & Co. He helped put Woodrow Wilson in the White House. He commissioned this home. He never lived here -- he gave his health to the Allied cause instead, and died only weeks after returning from London."
          />
          <TimelineItem
            year="1918"
            title="The Page Family"
            body="Walter's son Ralph moved the family in. The home stayed in the Page family through World War II -- quietly outlasting the men who shaped it."
          />
          <TimelineItem
            year="1959"
            title="Betty Dumaine"
            body="Prominent Bostonian. Horses, hounds, peacocks kept as guard birds. Her Vassar roommate became the Queen of Thailand -- the royal entourage visited. She threw birthday parties for her horses and invited the neighborhood children. Her favorite horse, Blue Fox, is buried on the grounds beneath a slate marker and a four-foot bronze statue."
          />
          <TimelineItem
            year="1980"
            title="Duke University"
            body="Betty left the estate to Duke on her death. Duke advertised in Atlanta and New York. No takers. The tennis courts and pool were added in 1985 in preparation for a subdivision that never happened."
          />
          <TimelineItem
            year="1999"
            title="The Restoration"
            body="The current stewards purchased the property and spent three years restoring it completely. Every system rebuilt. The Georgian bones, preserved. An interior designer's hand is in every detail -- if you know what to look for."
          />
          <TimelineItem
            year="Now"
            title="The Next Chapter"
            body="The house is ready."
            last={true}
          />
        </div>
      </div>

      {/* -- PRIMARY SUITE CINEMATIC -- */}
      <CinematicReveal
        eyebrowText="The Primary Suite"
        headline="Light from<br /><em>three directions.</em>"
        body="The NE/SW orientation the architect specified in 1916 still delivers. The back of the house floods with windows. A balcony off two of the second-floor bedrooms overlooks the tennis courts and the rear grounds. A stone-walled basement below -- partially finished, climate-controlled, with a wine rack -- holds the same quiet logic: everything thought through."
        imgSrc={IMG_PRIMARY}
      />

      {/* -- FEATURE CARDS -- */}
      <div style={{ padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 8rem)', background: DARK }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {[
            { label: 'Recognition', title: 'Historic Designation', body: 'One of the distinctly historical homes in southern Moore County. Virginia Historic Foundation recognized. 110 years of documented ownership.' },
            { label: 'Infrastructure', title: 'County Water, Sewer + Private Well', body: '250-gallon underground propane. In-ground well and storage tank serving the pool and irrigation. 7 propane fireplaces. All systems rebuilt in 1999.' },
            { label: 'Entertaining', title: 'Designed for Gatherings', body: 'Over 25 years as a private venue: English Speaking Union, Pi Beta Phi, Phi Beta Kappa, DAR, the Folio Club of Durham, wedding celebrations. The house knows how to hold a crowd.' },
            { label: 'Below Grade', title: 'Four-Room Stone Basement', body: 'Stone-walled basement under half the house. Partially finished, climate-controlled. Wine rack, storage, interior and exterior access. The house has more room than it shows.' },
          ].map(card => (
            <FadeIn key={card.title}>
              <div style={{ background: GLASS, border: `1px solid ${GLASS_BORDER}`, padding: '2.5rem 2rem', height: '100%' }}>
                <span style={{ ...eyebrow, marginBottom: '1rem' }}>{card.label}</span>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '1.05rem', color: '#fff', margin: '0 0 1rem', lineHeight: 1.3 }}>{card.title}</p>
                <p style={{ color: CREAM, fontSize: '0.92rem', lineHeight: 1.9, opacity: 0.75, margin: 0 }}>{card.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* -- FOYER CINEMATIC -- */}
      <CinematicReveal
        eyebrowText="The Entry"
        headline="The leaded glass<br /><em>has been here</em><br />since 1916."
        body="The frontispiece in the dining room. The leaded glass sidelights and over-door fan at the front entry. The solid-wood interior doors with their original brass hardware. Some things were not touched in the restoration because they did not need to be."
        imgSrc={IMG_FOYER}
        reverse={true}
      />

      {/* -- LOCATION -- */}
      <div style={{ padding: 'clamp(5rem, 10vw, 9rem) clamp(2rem, 10vw, 14rem)', maxWidth: 840, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <span style={eyebrow}>The Location</span>
          <h2 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: '#fff', lineHeight: 1.2, margin: '0 0 2rem' }}>
            Pinehurst ETJ.<br /><em>Moore County tax rate.</em><br />All the prestige.
          </h2>
          <div style={divider} />
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85, margin: '2.2rem 0' }}>
            200 Hollycrest Drive sits within the Pinehurst ETJ -- the extraterritorial jurisdiction -- which means the address carries the prestige and proximity of Pinehurst village while the property pays Moore County taxes. A meaningful distinction for the right buyer.
          </p>
          <p style={{ color: CREAM, fontSize: '1.05rem', lineHeight: 2.05, opacity: 0.85, margin: 0 }}>
            Two miles from the village. Walking distance to the Pinehurst Harness Track. The golf courses, the resort, the restaurants -- all of it, close enough to matter.
          </p>
        </FadeIn>
      </div>

      {/* -- MATTERPORT EMBED -- */}
      <div style={{ background: '#080808', padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 8rem)' }}>
        <FadeIn>
          <span style={{ ...eyebrow, textAlign: 'center', display: 'block', marginBottom: '2rem' }}>Tour the Estate</span>
          <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 2, border: '1px solid rgba(255,255,255,0.08)' }}>
            <iframe
              src="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
              allowFullScreen allow="xr-spatial-tracking"
              title="Garren Hill Virtual Tour"
            />
          </div>
        </FadeIn>
      </div>

      {/* -- CLOSING QUOTE -- */}
      <PullQuote
        quote="This house needs three or four kids running around."
        attribution="The current steward, after 25 years of preservation"
      />

      {/* -- GARREN HILL IS READY -- */}
      <div style={{ padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 10vw, 14rem)', textAlign: 'center', background: DARK }}>
        <FadeIn>
          <h2 style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(2.5rem, 5vw, 5rem)', color: '#fff', margin: '0 0 2.5rem', lineHeight: 1.1 }}>
            Garren Hill is ready.
          </h2>
          <div style={divider} />
          <p style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'sans-serif', fontSize: '10px', letterSpacing: '0.28em', textTransform: 'uppercase', margin: '2.5rem 0 3rem' }}>
            200 Hollycrest Drive -- Pinehurst, NC 28374 -- $4,250,000
          </p>
          <button onClick={() => setInquiryOpen(true)} style={{
            padding: '1.1rem 3rem',
            background: 'rgba(201,169,110,0.15)',
            border: `1px solid ${GOLD}`,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
            color: GOLD, fontFamily: 'sans-serif', fontSize: '10px',
            letterSpacing: '0.3em', textTransform: 'uppercase',
            cursor: 'pointer', borderRadius: 1,
          }}>
            Begin a Conversation
          </button>
        </FadeIn>
      </div>

      {/* -- FOOTER -- */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '2rem 4vw', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#060606' }}>
        <span style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(255,255,255,0.3)' }}>Garren Hill</span>
        <span style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>Rachel Hernandez -- Listing Agent</span>
      </div>

      {/* -- INQUIRY MODAL -- */}
      {inquiryOpen && (
        <div onClick={() => setInquiryOpen(false)} style={{
          position: 'fixed', inset: 0, zIndex: 500,
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: '#111', border: '1px solid rgba(255,255,255,0.12)',
            maxWidth: 480, width: '100%', padding: 'clamp(2rem, 5vw, 3.5rem)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <p style={{ fontFamily: 'Georgia, serif', fontStyle: 'italic', fontSize: '1.4rem', color: '#fff', margin: '0 0 1rem' }}>Thank you.</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', margin: 0 }}>We will be in touch shortly.</p>
              </div>
            ) : (
              <>
                <span style={{ ...eyebrow, marginBottom: '0.5rem' }}>Inquire</span>
                <h3 style={{ fontFamily: 'Georgia, serif', fontWeight: 400, fontSize: '1.5rem', color: '#fff', margin: '0 0 2rem' }}>Garren Hill</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { key: 'name', placeholder: 'Full Name', type: 'text' },
                    { key: 'email', placeholder: 'Email Address', type: 'email' },
                    { key: 'phone', placeholder: 'Phone (optional)', type: 'tel' },
                  ].map(f => (
                    <input key={f.key} type={f.type} placeholder={f.placeholder} required={f.key !== 'phone'}
                      value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                      style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '0.85rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', borderRadius: 1 }}
                    />
                  ))}
                  <textarea placeholder="Message (optional)" rows={4}
                    value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: '#fff', padding: '0.85rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.95rem', outline: 'none', resize: 'vertical', borderRadius: 1 }}
                  />
                  <button type="submit" style={{
                    padding: '1rem', background: GOLD, border: 'none',
                    color: '#0a0a0a', fontFamily: 'sans-serif', fontSize: '10px',
                    letterSpacing: '0.28em', textTransform: 'uppercase',
                    cursor: 'pointer', marginTop: '0.5rem', borderRadius: 1,
                  }}>
                    Send Inquiry
                  </button>
                </form>
              </>
            )}
            <button onClick={() => setInquiryOpen(false)} style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem', cursor: 'pointer' }}>x</button>
          </div>
        </div>
      )}
    </div>
  );
}
