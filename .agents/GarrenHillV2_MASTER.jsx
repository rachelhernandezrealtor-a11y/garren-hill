import React, { useState, useEffect, useRef, useCallback } from 'react';

const GOLD = '#C9A96E';
const CREAM = '#F5F0E8';
const DARK = '#0a0a0a';

const GH  = 'https://media.base44.com/images/public/69e2578ca7113dbe93cb208d/';
const GH2 = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/';

const cdnExt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:outdoor:70,e_auto_brightness,e_sharpen:30,e_saturation:20,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;
const cdnInt = (url) =>
  `https://res.cloudinary.com/dghn2xpif/image/fetch/e_improve:indoor:60,e_brightness:10,e_shadow:-30,e_sharpen:40,e_saturation:15,f_auto,q_auto,w_2400,c_limit/${encodeURIComponent(url)}`;

const CREST = 'https://media.base44.com/images/public/69e248a2469cc39540781cce/be819ab2a_generated_image.png';

//  HERO 
const IMG_DRIVEWAY  = cdnExt(GH  + 'gh_200HollycrestDrive-2.jpg');
const IMG_PORTICO   = cdnExt(GH  + 'fa8cec793_200HollycrestDrive-191.jpg');

//  THRESHOLD 
const IMG_THRESHOLD = cdnInt(GH2 + 'a9228a85d_200Holycrest-1179.jpg');

//  ENTRY HALL gallery 
const GALLERY_ENTRY = [
  cdnInt(GH + '082d9b5c7_200Holycrest-1182.jpg'),
  cdnInt(GH2 + '94d09b1c9_gh_158.jpg'),
  cdnInt(GH2 + 'b659167d3_gh_159.jpg'),
  cdnInt(GH2 + '9435e9307_gh_160.jpg'),
];

//  STAIRCASE gallery 
const GALLERY_STAIR = [
  cdnInt(GH2 + '99fab83cd_gh_86.jpg'),
  cdnInt(GH2 + '2c73f02e0_gh_161.jpg'),
  cdnInt(GH2 + '0b310370a_gh_162.jpg'),
];

//  SALON / LIVING ROOM gallery 
const GALLERY_SALON = [
  cdnInt(GH + '341c7343c_200Holycrest-1203.jpg'),
  cdnInt(GH2 + 'c6b8d2db4_gh_163.jpg'),
  cdnInt(GH2 + 'aea566b70_gh_164.jpg'),
  cdnInt(GH2 + '4b6b9da04_gh_165.jpg'),
  cdnInt(GH  + '5f5f87315_200HollycrestDrive-65fire.jpg'),
];

//  DINING ROOM gallery 
const GALLERY_DINING = [
  cdnInt(GH + 'e926f8fdd_200Holycrest-1296.jpg'),
  cdnInt(GH2 + 'f700fe55e_gh_166.jpg'),
  cdnInt(GH2 + '21e684205_gh_167.jpg'),
  cdnInt(GH2 + '24d34efbb_gh_168.jpg'),
];

//  LIBRARY gallery 
const GALLERY_LIBRARY = [
  cdnInt(GH2 + 'd06eb5c89_gh_169.jpg'),
  cdnInt(GH2 + 'b494c961a_gh_170.jpg'),
  cdnInt(GH2 + '10f509668_gh_171.jpg'),
];

//  PRIMARY SUITE gallery 
const GALLERY_PRIMARY = [
  cdnInt(GH2 + 'd45916396_gh_119.jpg'),
  cdnInt(GH  + '4046f0d74_200HollycrestDrive-95.jpg'),
  cdnInt(GH  + 'f0ace4a90_200HollycrestDrive-101.jpg'),
  cdnInt(GH2 + '9e282a5ce_gh_174.jpg'),
  cdnInt(GH2 + '9b61bcfdb_gh_175.jpg'),
];

//  ADDITIONAL BEDROOMS gallery 
const GALLERY_BEDS = [
  cdnInt(GH2 + '05bc834ac_gh_176.jpg'),
  cdnInt(GH2 + '40755e9b3_gh_177.jpg'),
  cdnInt(GH2 + 'fc1699b0d_gh_178.jpg'),
  cdnInt(GH2 + 'b916e950d_gh_179.jpg'),
  cdnInt(GH2 + '77d459d9b_gh_180.jpg'),
];

//  BATHS gallery 
const GALLERY_BATHS = [
  cdnInt(GH  + 'f0ace4a90_200HollycrestDrive-101.jpg'),
  cdnInt(GH  + 'b57f79399_200HollycrestDrive-80.jpg'),
  cdnInt(GH2 + '2dc028617_gh_181.jpg'),
  cdnInt(GH2 + '6a5a2b35b_gh_182.jpg'),
];

//  GROUNDS / POOL gallery 
const GALLERY_GROUNDS = [
  cdnExt(GH  + '57352d0a9_200HollycrestDrive-208.jpg'),
  cdnExt(GH  + '17d8dd539_200HollycrestDrive-132.jpg'),
  cdnExt(GH2 + '782f791e5_IMG_9412.jpg'),
  cdnExt(GH2 + 'cd78defd6_200HollycrestDrive-11.jpg'),
  cdnExt(GH2 + 'e4a71cbd1_200HollycrestDrive-172.jpg'),
  cdnExt(GH2 + '8423de7d0_IMG_9355.jpeg'),
  cdnExt(GH2 + '863ec328e_26MarCamelliasalongpebblepath.jpg'),
];

//  CLOSING 
const IMG_AERIAL   = cdnExt(GH2 + '91bd002f8_gh_200HollycrestDrive-217.jpg');
const IMG_DUSK2    = cdnExt(GH2 + 'f19ebeaad_gh_200HollycrestDrive-209.jpg');
const IMG_TWILIGHT = cdnExt(GH2 + 'dbb9ffc69_gh_200HollycrestDrive-203.jpg');
const IMG_BLUEFOX  = cdnExt(GH2 + 'd0ac5bb49_200HollycrestDrive-192.jpg');

// -- AS DRAWN. AS BUILT. --
const DRAW_SHEET8   = cdnExt(GH2 + '1ec5d67bf_E5751CC7-03E2-43F9-8A41-C0437168E36FIMG_4335.jpg');
const DRAW_SHEET1   = cdnExt(GH2 + '6d312bf4e_IMG_4319.jpg');
const DRAW_SHEET4   = cdnExt(GH2 + '17793bb24_IMG_4325.jpg');
const PHOTO_PORTICO_CLOSE = cdnExt(GH2 + '6f0410dd9_200HollycrestDrive-8.jpg');
const PHOTO_PORTICO_FULL  = cdnExt(GH  + 'fa8cec793_200HollycrestDrive-191.jpg');
const PHOTO_THRESHOLD2    = cdnInt(GH2 + 'a9228a85d_200Holycrest-1179.jpg');

//  EYEBROW 
const eyebrowStyle = {
  fontFamily: 'sans-serif',
  fontSize: '10px',
  letterSpacing: '0.36em',
  textTransform: 'uppercase',
  color: GOLD,
  display: 'block',
  marginBottom: '1.2rem',
};

// ===================== HOOKS =====================
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const h = () => setY(window.scrollY);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return y;
}

function useInView(ref, threshold = 0.1) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold }
    );
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
      transform: visible ? 'translateY(0)' : 'translateY(22px)',
      transition: `opacity 0.85s ease ${delay}s, transform 0.85s ease ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

// ===================== LIGHTBOX =====================
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(4,4,4,0.97)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: '1.5rem', right: '2rem',
        background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
        fontSize: '1.8rem', cursor: 'pointer', zIndex: 10, lineHeight: 1,
      }}>x</button>

      {/* Counter */}
      <div style={{
        position: 'absolute', top: '1.8rem', left: 0, right: 0,
        textAlign: 'center', zIndex: 10,
        fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em',
        textTransform: 'uppercase', color: 'rgba(201,169,110,0.7)',
      }}>
        {idx + 1} of {images.length}
      </div>

      {/* Prev */}
      <button
        onClick={e => { e.stopPropagation(); prev(); }}
        style={{
          position: 'absolute', left: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.6)', width: 48, height: 48,
          fontSize: '1.2rem', cursor: 'pointer', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >&#8592;</button>

      {/* Image */}
      <img
        src={images[idx]}
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '88vw', maxHeight: '88vh',
          objectFit: 'contain',
          boxShadow: '0 8px 80px rgba(0,0,0,0.9)',
        }}
        alt=""
      />

      {/* Next */}
      <button
        onClick={e => { e.stopPropagation(); next(); }}
        style={{
          position: 'absolute', right: '1.5rem', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: '1px solid rgba(255,255,255,0.15)',
          color: 'rgba(255,255,255,0.6)', width: 48, height: 48,
          fontSize: '1.2rem', cursor: 'pointer', zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >&#8594;</button>

      {/* Dots */}
      <div style={{
        position: 'absolute', bottom: '2rem', left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: '0.5rem',
      }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={e => { e.stopPropagation(); setIdx(i); }}
            style={{
              width: i === idx ? 20 : 6, height: 6,
              background: i === idx ? GOLD : 'rgba(255,255,255,0.25)',
              border: 'none', borderRadius: 3, cursor: 'pointer',
              transition: 'all 0.3s ease', padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ===================== GALLERY GRID =====================
function GalleryGrid({ images, onOpen }) {
  const show = images.slice(0, 4);
  const remaining = images.length - 4;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: show.length === 1 ? '1fr' : show.length === 2 ? '1fr 1fr' : show.length === 3 ? '1fr 1fr 1fr' : '1fr 1fr 1fr 1fr',
      gap: '3px',
      marginTop: '2rem',
    }}>
      {show.map((src, i) => (
        <div
          key={i}
          onClick={() => onOpen(i)}
          style={{
            position: 'relative',
            paddingBottom: '72%',
            cursor: 'pointer',
            overflow: 'hidden',
            background: '#111',
          }}
        >
          <img
            src={src}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            alt=""
          />
          {i === 3 && remaining > 0 && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'rgba(10,10,10,0.72)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexDirection: 'column', gap: '0.4rem',
            }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: '2rem', color: '#fff' }}>+{remaining}</span>
              <span style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD }}>View All</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ===================== ROOM SECTION =====================
function RoomSection({ eyebrow, headline, headlineItalic, body, body2, images, reverse = false, fact }) {
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <section style={{ background: DARK, padding: 'clamp(4rem,8vw,7rem) clamp(2rem,6vw,5rem)' }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', flexDirection: reverse ? 'row-reverse' : 'row',
          gap: 'clamp(2.5rem,5vw,5rem)', alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}>
          {/* Text */}
          <div style={{ flex: '0 0 min(100%, 400px)' }}>
            <FadeIn>
              <span style={eyebrowStyle}>{eyebrow}</span>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 400,
                fontSize: 'clamp(1.8rem, 2.6vw, 2.9rem)',
                color: '#fff', lineHeight: 1.18, margin: '0 0 1.4rem',
              }}>
                {headline}<br />
                <em style={{ fontWeight: 300 }}>{headlineItalic}</em>
              </h2>
              <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.5rem' }} />
              <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82, margin: '0 0 1rem' }}>{body}</p>
              {body2 && <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82 }}>{body2}</p>}
              {fact && (
                <div style={{
                  marginTop: '1.8rem',
                  padding: '1rem 1.4rem',
                  borderLeft: `2px solid ${GOLD}`,
                  background: 'rgba(201,169,110,0.06)',
                }}>
                  <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '1.1rem', color: GOLD, margin: 0, lineHeight: 1.7 }}>{fact}</p>
                </div>
              )}
            </FadeIn>
          </div>
          {/* Gallery */}
          <div style={{ flex: 1, minWidth: 280 }}>
            <FadeIn delay={0.15}>
              <GalleryGrid images={images} onOpen={(i) => setLightbox(i)} />
              <button
                onClick={() => setLightbox(0)}
                style={{
                  marginTop: '1rem',
                  fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em',
                  textTransform: 'uppercase', color: GOLD,
                  background: 'none', border: `1px solid rgba(201,169,110,0.35)`,
                  padding: '0.7rem 1.8rem', cursor: 'pointer',
                }}
              >
                View All {images.length} Photos
              </button>
            </FadeIn>
          </div>
        </div>
      </section>
      {lightbox !== null && (
        <Lightbox images={images} startIndex={lightbox} onClose={() => setLightbox(null)} />
      )}
    </>
  );
}

// ===================== NAV =====================
function Nav({ onInquire }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
      padding: '1.1rem 2.5rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,10,0.94)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(201,169,110,0.12)' : 'none',
      transition: 'background 0.5s ease',
    }}>
      <span style={{
        fontFamily: "'Cormorant Garamond', Georgia, serif",
        fontSize: '1.05rem', letterSpacing: '0.22em',
        textTransform: 'uppercase', color: '#fff', fontWeight: 400,
      }}>Garran Hill</span>
      <div style={{ display: 'flex', gap: '2.2rem', alignItems: 'center' }}>
        {['The Estate', 'The Grounds', 'The History'].map(label => (
          <span key={label} style={{
            fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', cursor: 'pointer',
          }}>{label}</span>
        ))}
        <button onClick={onInquire} style={{
          fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em',
          textTransform: 'uppercase', color: GOLD,
          background: 'none', border: `1px solid ${GOLD}`, padding: '0.55rem 1.3rem', cursor: 'pointer',
        }}>Private Inquiry</button>
      </div>
    </nav>
  );
}

// ===================== HERO =====================
function Hero({ onInquire }) {
  const scrollY = useScrollY();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap');
      `}</style>
      {/* Shot 1: driveway */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_DRIVEWAY})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${scrollY * 0.2}px)`,
        transform: 'scale(1.08)',
        zIndex: 0,
        opacity: phase === 2 ? 1 : 0,
        transition: 'opacity 2.5s ease',
      }} />
      {/* Shot 2: portico -- starts visible, fades out */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_PORTICO})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(38% + ${scrollY * 0.18}px)`,
        transform: 'scale(1.08)',
        zIndex: 1,
        opacity: phase === 2 ? 0 : 1,
        transition: 'opacity 2.5s ease',
      }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 2, background: 'linear-gradient(to bottom, rgba(10,10,10,0.42) 0%, rgba(10,10,10,0.14) 38%, rgba(10,10,10,0.75) 100%)' }} />
      {/* Content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 3,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 2rem',
      }}>
        <div style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 1s ease 0.3s, transform 1s ease 0.3s' }}>
          <span style={{ ...eyebrowStyle, marginBottom: '1.8rem' }}>
            200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; Est. 1916
          </span>
        </div>
        <div style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 1s ease 0.6s, transform 1s ease 0.6s' }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400,
            fontSize: 'clamp(2.2rem, 5vw, 5rem)',
            color: '#fff', lineHeight: 1.12,
            margin: '0 0 1.4rem', letterSpacing: '0.02em',
            textShadow: '0 2px 32px rgba(0,0,0,0.5)',
            maxWidth: 820,
          }}>
            Built in 1916.<br />
            <em style={{ fontWeight: 300 }}>Still the finest house in Moore County.</em>
          </h1>
        </div>
        <div style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 1s ease 0.9s, transform 1s ease 0.9s' }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.05rem, 1.8vw, 1.5rem)',
            color: CREAM, opacity: 0.9,
            margin: '0 0 2.8rem',
          }}>
            Neo-Georgian. Walter Hines Page. 110 years of remarkable stewardship.
          </p>
        </div>
        <div style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 1s ease 1.1s', display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={onInquire} style={{
            fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em',
            textTransform: 'uppercase', color: GOLD,
            background: 'none', border: `1px solid ${GOLD}`,
            padding: '1rem 2.8rem', cursor: 'pointer',
          }}>Private Inquiry</button>
          <a href="https://my.matterport.com/show/?m=mfwyqT5Btwx&brand=0&mls=1&" target="_blank" rel="noreferrer" style={{
            fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.32em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)',
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
            padding: '1rem 2.8rem', cursor: 'pointer', textDecoration: 'none',
            backdropFilter: 'blur(8px)',
          }}>Tour the Estate</button>
        </div>
      </div>
      {/* Stats bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 4,
        background: 'rgba(10,10,10,0.75)', backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(201,169,110,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.4rem 2rem', gap: 'clamp(1.5rem,4vw,4.5rem)', flexWrap: 'wrap',
      }}>
        {[
          ['6,700', 'Square Feet'],
          ['4.25', 'Acres'],
          ['5 / 5', 'Beds / Baths'],
          ['7', 'Fireplaces'],
          ['1916', 'Year Built'],
          ['$3,450,000', 'Asking Price'],
        ].map(([val, label], i, arr) => (
          <React.Fragment key={label}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontWeight: 300, fontSize: 'clamp(1.2rem, 2vw, 1.8rem)',
                color: '#fff', letterSpacing: '0.04em', lineHeight: 1,
              }}>{val}</div>
              <div style={{
                fontFamily: 'sans-serif', fontSize: '7.5px', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: GOLD, marginTop: '0.35rem',
              }}>{label}</div>
            </div>
            {i < arr.length - 1 && (
              <div style={{ width: 1, height: 28, background: 'linear-gradient(to bottom, transparent, rgba(201,169,110,0.35), transparent)', flexShrink: 0 }} />
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

// ===================== WALTER HINES PAGE =====================
function WalterSection() {
  return (
    <section style={{ position: 'relative', background: DARK, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${CREST})`,
        backgroundRepeat: 'no-repeat', backgroundPosition: 'center',
        backgroundSize: '50%', opacity: 0.045,
        filter: 'grayscale(1) brightness(2)',
      }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 820, margin: '0 auto', padding: 'clamp(6rem,12vw,9rem) clamp(2rem,6vw,4rem)', textAlign: 'center' }}>
        <FadeIn><span style={eyebrowStyle}>The History</span></FadeIn>
        <FadeIn delay={0.15}>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: 'clamp(2rem, 3.8vw, 3.6rem)',
            color: '#fff', lineHeight: 1.15, margin: '0 0 2rem',
          }}>
            Some houses hold history.<br />
            <em style={{ fontWeight: 300 }}>This one shaped it.</em>
          </h2>
        </FadeIn>
        <FadeIn delay={0.25}>
          <div style={{ width: 44, height: 1, background: GOLD, margin: '0 auto 2.4rem', opacity: 0.55 }} />
        </FadeIn>
        <FadeIn delay={0.35}>
          <p style={{ color: CREAM, fontSize: 'clamp(0.98rem,1.2vw,1.1rem)', lineHeight: 2, opacity: 0.85, margin: '0 0 1.5rem' }}>
            In February 1913, Walter Hines Page -- publisher, diplomat, and native son of North Carolina --
            purchased this land two miles southwest of Pinehurst. He named it Garran Hill. He planned to
            grow peaches. He hired an architect and broke ground on a two-story Georgian brick house.
          </p>
        </FadeIn>
        <FadeIn delay={0.45}>
          <p style={{ color: CREAM, fontSize: 'clamp(0.98rem,1.2vw,1.1rem)', lineHeight: 2, opacity: 0.85, margin: '0 0 2.4rem' }}>
            He never walked through the door. President Wilson appointed him Ambassador to Great Britain
            that same March. Page spent five years in London fighting to bring America into the First World War
            -- and succeeded. He came home on a stretcher in October 1918 and died December 21 at a cottage
            in Pinehurst. His family held the farm.
          </p>
        </FadeIn>
        <FadeIn delay={0.55}>
          <blockquote style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.3rem, 2vw, 1.9rem)',
            color: '#fff', lineHeight: 1.6,
            margin: '0', padding: '2.2rem 0',
            borderTop: '1px solid rgba(201,169,110,0.2)',
            borderBottom: '1px solid rgba(201,169,110,0.2)',
          }}>
            "The friend of Britain in her sorest need."
          </blockquote>
          <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '1rem 0 0', opacity: 0.7 }}>
            Westminster Abbey -- London
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== CREST DIVIDER =====================
function CrestDivider() {
  return (
    <div style={{ background: DARK, textAlign: 'center', padding: '3rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem' }}>
      <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
      <img src={CREST} alt="Garran Hill Crest" style={{ width: 60, height: 60, objectFit: 'contain', opacity: 0.72, filter: 'sepia(1) saturate(1.5) brightness(1.1)' }} />
      <div style={{ width: 60, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)` }} />
    </div>
  );
}

// ===================== THRESHOLD =====================
function ThresholdSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-60, Math.min(60, (scrollY - top) * 0.22));

  return (
    <section ref={ref} style={{ position: 'relative', height: '95vh', minHeight: 640, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_THRESHOLD})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.08)', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.08) 42%, rgba(10,10,10,0.78) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '4.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 2rem' }}>
        <FadeIn>
          <span style={eyebrowStyle}>The Threshold</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: 'clamp(1.8rem,3.2vw,3.4rem)',
            color: '#fff', lineHeight: 1.2, margin: '0 auto', maxWidth: 680,
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}>
            <em style={{ fontWeight: 300 }}>Garran Hill.</em> 1916.<br />
            Carved in the granite where it has always been.
          </h2>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== HISTORY WHISPERS =====================
function HistoryWhisper({ text, attribution }) {
  return (
    <section style={{ background: '#070707', padding: 'clamp(4rem,8vw,6rem) clamp(2rem,6vw,4rem)', textAlign: 'center' }}>
      <FadeIn>
        <div style={{ width: 44, height: 1, background: GOLD, margin: '0 auto 2rem', opacity: 0.35 }} />
        <p style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontStyle: 'italic', fontWeight: 300,
          fontSize: 'clamp(1.2rem, 2vw, 1.85rem)',
          color: 'rgba(255,255,255,0.78)',
          lineHeight: 1.7, maxWidth: 700, margin: '0 auto 1.5rem',
        }}>{text}</p>
        {attribution && (
          <p style={{ fontFamily: 'sans-serif', fontSize: '8.5px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, opacity: 0.6, margin: 0 }}>{attribution}</p>
        )}
        <div style={{ width: 44, height: 1, background: GOLD, margin: '2rem auto 0', opacity: 0.35 }} />
      </FadeIn>
    </section>
  );
}

// ===================== FULL-BLEED PULL SECTION =====================
function FullBleedSection({ imgSrc, eyebrow, headline, headlineItalic, body, textRight = false }) {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-50, Math.min(50, (scrollY - top) * 0.2));

  return (
    <section ref={ref} style={{ position: 'relative', height: '76vh', minHeight: 520, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${imgSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: textRight
          ? 'linear-gradient(to left, rgba(10,10,10,0.88) 38%, rgba(10,10,10,0.08) 100%)'
          : 'linear-gradient(to right, rgba(10,10,10,0.88) 38%, rgba(10,10,10,0.08) 100%)',
      }} />
      <div style={{
        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
        [textRight ? 'right' : 'left']: 'clamp(2.5rem,6vw,5rem)',
        zIndex: 2, maxWidth: 440,
        textAlign: textRight ? 'right' : 'left',
      }}>
        <FadeIn>
          <span style={{ ...eyebrowStyle, textAlign: textRight ? 'right' : 'left' }}>{eyebrow}</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: 'clamp(1.7rem,2.6vw,2.8rem)',
            color: '#fff', lineHeight: 1.2, margin: '0 0 1.2rem',
          }}>
            {headline}<br />
            <em style={{ fontWeight: 300 }}>{headlineItalic}</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: textRight ? '0 0 1.4rem auto' : '0 0 1.4rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.9, opacity: 0.82 }}>{body}</p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== GROUNDS GALLERY SECTION =====================
function GroundsSection() {
  const [lightbox, setLightbox] = useState(null);
  return (
    <>
      <section style={{ background: DARK, padding: 'clamp(4rem,8vw,7rem) clamp(2rem,6vw,5rem)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <FadeIn>
            <span style={eyebrowStyle}>The Grounds</span>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400, fontSize: 'clamp(1.8rem,3vw,3rem)',
              color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', maxWidth: 600,
            }}>
              Thirty years of planting.<br />
              <em style={{ fontWeight: 300 }}>It shows.</em>
            </h2>
            <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1.5rem' }} />
            <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82, maxWidth: 620, margin: '0 0 0.8rem' }}>
              The azaleas were here before the current stewards arrived. The camellias bloom in March.
              The daffodils line the drive every spring without being asked. A 20 x 40 pool. Two tennis courts.
              4.25 acres, every inch of it tended for over a century.
            </p>
            <GalleryGrid images={GALLERY_GROUNDS} onOpen={setLightbox} />
            <button
              onClick={() => setLightbox(0)}
              style={{
                marginTop: '1rem',
                fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: GOLD,
                background: 'none', border: `1px solid rgba(201,169,110,0.35)`,
                padding: '0.7rem 1.8rem', cursor: 'pointer',
              }}
            >
              View All {GALLERY_GROUNDS.length} Photos
            </button>
          </FadeIn>
        </div>
      </section>
      {lightbox !== null && <Lightbox images={GALLERY_GROUNDS} startIndex={lightbox} onClose={() => setLightbox(null)} />}
    </>
  );
}

// ===================== AERIAL =====================
function AerialSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', height: '60vh', minHeight: 420, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_AERIAL})`,
        backgroundSize: 'cover', backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.28) 0%, rgba(6,6,6,0.05) 40%, rgba(6,6,6,0.55) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '2.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <FadeIn>
          <span style={{ ...eyebrowStyle, color: 'rgba(201,169,110,0.72)' }}>
            4.25 Acres &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; Inside the Gates
          </span>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== DUSK 2 =====================
function Dusk2Section() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', height: '60vh', minHeight: 400, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_DUSK2})`,
        backgroundSize: 'cover', backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.32) 0%, rgba(6,6,6,0.08) 45%, rgba(6,6,6,0.68) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2, padding: '0 2rem' }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.4rem,2.4vw,2.4rem)',
            color: 'rgba(255,255,255,0.9)', lineHeight: 1.5,
            margin: '0 auto', maxWidth: 600,
            textShadow: '0 2px 24px rgba(0,0,0,0.6)',
          }}>
            The world outside these gates<br />does not exist here.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== TWILIGHT CLOSE =====================
function TwilightClose() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', height: '72vh', minHeight: 500, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_TWILIGHT})`,
        backgroundSize: 'cover', backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)', zIndex: 0,
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,6,6,0.22) 0%, rgba(6,6,6,0.08) 50%, rgba(6,6,6,0.72) 100%)', zIndex: 1 }} />
      <div style={{ position: 'absolute', bottom: '3.5rem', left: 0, right: 0, textAlign: 'center', zIndex: 2 }}>
        <FadeIn>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: 'clamp(1.8rem,3vw,3.2rem)',
            color: '#fff', letterSpacing: '0.04em', margin: '0 auto',
            textShadow: '0 2px 24px rgba(0,0,0,0.55)',
          }}>
            Garran Hill is ready.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

// ===================== INQUIRE MODAL =====================
function InquireModal({ open, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch('https://base44.app/api/apps/69e248a2469cc39540781cce/entities/Inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, property: 'Garran Hill', source: 'Landing Page' }),
      });
    } catch (_) {}
    setSubmitted(true);
  };

  if (!open) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1500, background: 'rgba(5,5,5,0.94)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }} onClick={onClose}>
      <div style={{ background: '#0e0e0e', border: '1px solid rgba(201,169,110,0.22)', padding: 'clamp(2.5rem,5vw,4rem)', maxWidth: 520, width: '100%', position: 'relative' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position: 'absolute', top: '1.2rem', right: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.4rem', cursor: 'pointer' }}>x</button>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2.5rem 0' }}>
            <span style={eyebrowStyle}>Thank You</span>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.6rem', color: '#fff', lineHeight: 1.4, margin: 0 }}>We will be in touch shortly.</p>
          </div>
        ) : (
          <>
            <span style={{ ...eyebrowStyle, marginBottom: '0.8rem' }}>Private Inquiry</span>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 400, fontSize: 'clamp(1.4rem,2vw,1.8rem)', color: '#fff', margin: '0 0 2rem', lineHeight: 1.2 }}>
              Garran Hill<br />
              <span style={{ fontWeight: 300, fontStyle: 'italic', fontSize: '84%' }}>200 Hollycrest Drive, Pinehurst, NC</span>
            </h3>
            <form onSubmit={handleSubmit}>
              {[{ key: 'name', label: 'Full Name', type: 'text', req: true }, { key: 'email', label: 'Email', type: 'email', req: true }, { key: 'phone', label: 'Phone', type: 'tel', req: false }].map(f => (
                <div key={f.key} style={{ marginBottom: '1.2rem' }}>
                  <label style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '0.5rem' }}>{f.label}</label>
                  <input type={f.type} required={f.req} value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: CREAM, padding: '0.8rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              ))}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD, display: 'block', marginBottom: '0.5rem' }}>Message</label>
                <textarea rows={4} value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.12)', color: CREAM, padding: '0.8rem 1rem', fontFamily: 'Georgia, serif', fontSize: '0.9rem', outline: 'none', resize: 'none', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={{ width: '100%', padding: '1.1rem', background: 'none', border: `1px solid ${GOLD}`, color: GOLD, fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer' }}>
                Submit Inquiry
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ===================== FOOTER =====================
function Footer({ onInquire }) {
  return (
    <footer style={{ background: '#060606', borderTop: '1px solid rgba(201,169,110,0.12)', padding: 'clamp(4rem,8vw,6rem) clamp(2rem,6vw,4rem)', textAlign: 'center' }}>
      <img src={CREST} alt="Garran Hill Crest" style={{ width: 68, height: 68, objectFit: 'contain', opacity: 0.7, filter: 'sepia(1) saturate(1.5) brightness(1.1)', display: 'block', margin: '0 auto 2rem' }} />
      <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(1.4rem,2vw,1.8rem)', color: '#fff', fontWeight: 300, fontStyle: 'italic', margin: '0 0 0.6rem' }}>Garran Hill</p>
      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '0 0 2.4rem', opacity: 0.75 }}>
        200 Hollycrest Drive &nbsp;&bull;&nbsp; Pinehurst, NC &nbsp;&bull;&nbsp; $3,450,000
      </p>
      <div style={{ width: 44, height: 1, background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`, margin: '0 auto 2.4rem' }} />
      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', margin: '0 0 0.4rem' }}>Rachel Hernandez</p>
      <p style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', margin: '0 0 2.5rem' }}>
        Sotheby's International Realty &nbsp;&bull;&nbsp; Pinehurst, NC
      </p>
      <button onClick={onInquire} style={{ fontFamily: 'sans-serif', fontSize: '9px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, background: 'none', border: `1px solid rgba(201,169,110,0.4)`, padding: '0.85rem 2.5rem', cursor: 'pointer' }}>
        Private Inquiry
      </button>
    </footer>
  );
}


// ===================== BLUE FOX SECTION =====================
function BlueFoxSection() {
  const ref = useRef();
  const scrollY = useScrollY();
  const [top, setTop] = useState(0);
  useEffect(() => { if (ref.current) setTop(ref.current.getBoundingClientRect().top + window.scrollY); }, []);
  const parallax = Math.max(-40, Math.min(40, (scrollY - top) * 0.18));

  return (
    <section ref={ref} style={{ position: 'relative', height: '72vh', minHeight: 500, overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${IMG_BLUEFOX})`,
        backgroundSize: 'cover',
        backgroundPosition: `center calc(50% + ${parallax}px)`,
        transform: 'scale(1.06)', zIndex: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to bottom, rgba(6,6,6,0.18) 0%, rgba(6,6,6,0.22) 45%, rgba(6,6,6,0.85) 100%)',
      }} />
      <div style={{
        position: 'absolute', bottom: '4rem', left: 0, right: 0,
        textAlign: 'center', zIndex: 2, padding: '0 2rem',
      }}>
        <FadeIn>
          <span style={{ ...eyebrowStyle, marginBottom: '1.2rem' }}>The Grounds</span>
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: 'italic', fontWeight: 300,
            fontSize: 'clamp(1.4rem, 2.4vw, 2.5rem)',
            color: '#fff', lineHeight: 1.6,
            margin: '0 auto 1rem', maxWidth: 640,
            textShadow: '0 2px 24px rgba(0,0,0,0.7)',
          }}>
            Blue Fox lived here from 1946 to 1965.<br />
            Someone put flowers on his grave.<br />
            <em>They still do.</em>
          </p>
          <p style={{
            fontFamily: 'sans-serif', fontSize: '8.5px', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: GOLD, opacity: 0.65, margin: 0,
          }}>Betty Dumaine &nbsp;&bull;&nbsp; Garran Hill</p>
        </FadeIn>
      </div>
    </section>
  );
}


// ===================== AS DRAWN. AS BUILT. =====================
function AsDrawnPair({ drawingSrc, photoSrc, sheetLabel, roomLabel, note }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '3px',
      marginBottom: '3px',
    }}>
      {/* Drawing panel */}
      <div style={{ position: 'relative', paddingBottom: '70%', overflow: 'hidden', background: '#0c0c0c' }}>
        <img src={drawingSrc} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(1) brightness(0.55) sepia(1) hue-rotate(5deg) saturate(3)',
          mixBlendMode: 'screen',
        }} alt="" />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(201,169,110,0.08) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'absolute', bottom: '1.2rem', left: '1.2rem' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.3rem', opacity: 0.8 }}>{sheetLabel}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>As Drawn</p>
        </div>
      </div>
      {/* Photo panel */}
      <div style={{ position: 'relative', paddingBottom: '70%', overflow: 'hidden', background: '#111' }}>
        <img src={photoSrc} style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
        }} alt="" />
        <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.2rem', textAlign: 'right' }}>
          <p style={{ fontFamily: 'sans-serif', fontSize: '8px', letterSpacing: '0.28em', textTransform: 'uppercase', color: GOLD, margin: '0 0 0.3rem', opacity: 0.8 }}>{roomLabel}</p>
          <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontStyle: 'italic', fontWeight: 300, fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>As Built</p>
        </div>
      </div>
    </div>
  );
}

function AsDrawnSection() {
  return (
    <section style={{ background: DARK, padding: 'clamp(4rem,8vw,7rem) 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 clamp(2rem,6vw,5rem)' }}>
        <FadeIn>
          <span style={eyebrowStyle}>As Drawn. As Built.</span>
          <h2 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 400, fontSize: 'clamp(1.8rem,3vw,3rem)',
            color: '#fff', lineHeight: 1.18, margin: '0 0 1rem', maxWidth: 700,
          }}>
            Thomas O'Shea drew it in 2000.<br />
            <em style={{ fontWeight: 300 }}>The house was already 84 years old.</em>
          </h2>
          <div style={{ width: 32, height: 1, background: GOLD, opacity: 0.5, margin: '0 0 1rem' }} />
          <p style={{ color: CREAM, fontSize: '1rem', lineHeight: 1.95, opacity: 0.82, maxWidth: 620, margin: '0 0 3rem' }}>
            When Dr. and Mrs. McAllister commissioned the restoration drawings, the architect found
            a house built exactly as intended -- nothing structural had shifted in 84 years. The
            columns still plumb. The brick still true. The proportions still perfect.
          </p>
        </FadeIn>
      </div>
      <FadeIn delay={0.1}>
        <AsDrawnPair
          drawingSrc={DRAW_SHEET8}
          photoSrc={PHOTO_PORTICO_CLOSE}
          sheetLabel="Sheet 8 of 15 -- Composite Section, Porch & Attic"
          roomLabel="The Portico -- Built 1916"
          note="Rear elevation, attic dormer, porch framing"
        />
      </FadeIn>
      <FadeIn delay={0.2}>
        <AsDrawnPair
          drawingSrc={DRAW_SHEET1}
          photoSrc={PHOTO_PORTICO_FULL}
          sheetLabel="Sheet 1 of 15 -- Elevations & Site Plan"
          roomLabel="The Front Elevation -- 110 Years Later"
          note="Front, rear, and side elevations. Circular drive."
        />
      </FadeIn>
      <FadeIn delay={0.3}>
        <AsDrawnPair
          drawingSrc={DRAW_SHEET4}
          photoSrc={PHOTO_THRESHOLD2}
          sheetLabel="Sheet 4 of 15 -- First Floor Plan"
          roomLabel="The Threshold -- Garran Hill, 1916"
          note="Library on central axis. Kitchen north. Marble flooring."
        />
      </FadeIn>
    </section>
  );
}

// ===================== APP =====================
export default function GarrenHillV2() {
  const [inquireOpen, setInquireOpen] = useState(false);
  const open = () => setInquireOpen(true);
  const close = () => setInquireOpen(false);

  return (
    <div style={{ background: DARK, minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&display=swap" rel="stylesheet" />

      <Nav onInquire={open} />
      <Hero onInquire={open} />
      <WalterSection />
      <CrestDivider />
      <ThresholdSection />

      {/*  ENTRY HALL  */}
      <RoomSection
        eyebrow="The Entry Hall"
        headline="The axis reveals itself"
        headlineItalic="the moment you enter."
        body="The original 1916 leaded glass fanlight. The sweeping oak staircase. Persian runner on heart-pine floors. Straight ahead -- the Library, exactly where the architect drew it, on the central axis of the house."
        body2="Custom woodwork by David Prest. The proportions of a house built by craftsmen who knew it would last a hundred years."
        images={GALLERY_ENTRY}
        fact="6,700 square feet. Two stair cores. Seven fireplaces. All original."
      />

      <HistoryWhisper
        text="Built by Leonard Tufts' own craftsmen -- the same men who built Pinehurst."
      />

      {/*  STAIRCASE  */}
      <RoomSection
        eyebrow="The Staircase"
        headline="The same oak handrail"
        headlineItalic="since 1916."
        body="The curved newel post. The turned balusters. The landing that overlooks the entry hall below. Built to last, and it has."
        images={GALLERY_STAIR}
        reverse={true}
      />

      {/*  SALON  */}
      <RoomSection
        eyebrow="The Salon"
        headline="Formal. Not stiff."
        headlineItalic="The room holds the light."
        body="Original plaster moldings. Two fireplaces that have warmed every winter since Woodrow Wilson was president. Georgian proportions -- high ceilings, symmetrical windows, rooms that reward furniture arranged for conversation."
        images={GALLERY_SALON}
        fact="7 fireplaces across 6,700 square feet. Each one original. Each one still working."
      />

      {/*  DINING  */}
      <RoomSection
        eyebrow="The Dining Room"
        headline="A room designed"
        headlineItalic="for long evenings."
        body="The original wainscoting. The fireplace surround. Windows that face the rear terrace and the garden beyond. Proportions that seat twelve without effort."
        images={GALLERY_DINING}
        reverse={true}
      />

      <BlueFoxSection />

      {/*  LIBRARY  */}
      <RoomSection
        eyebrow="The Library"
        headline="On the central axis."
        headlineItalic="Visible from the front door."
        body="The bookcases were built into the house. They are not furniture -- they are architecture. The room sits exactly where Thomas O'Shea drew it in January 2000, restoring what Walter Hines Page's architect intended in 1916."
        images={GALLERY_LIBRARY}
        fact="The library sits on the central hall axis -- the organizing spine of the entire floor plan."
      />

      <AsDrawnSection />

      {/*  PRIMARY SUITE  */}
      <RoomSection
        eyebrow="The Primary Suite"
        headline="The Wedgwood mantel."
        headlineItalic="Original to the house."
        body="The primary suite occupies the full rear wing of the second floor with balcony access over the grounds. The Wedgwood mantel -- the finest in the house -- has never been touched."
        body2="Ann McAllister spent years restoring the room around it. The result is a suite that feels exactly as it was intended to feel in 1916."
        images={GALLERY_PRIMARY}
        reverse={true}
        fact="5 bedrooms. 5 baths. Every bath fully updated while preserving original architectural details."
      />

      {/*  ADDITIONAL BEDROOMS  */}
      <RoomSection
        eyebrow="The Guest Rooms"
        headline="Five bedrooms."
        headlineItalic="Each one with a reason to stay."
        body="The guest wing rooms each have their own character -- corner light, original millwork, and the kind of quiet that only comes from solid brick construction."
        images={GALLERY_BEDS}
      />

      {/*  BATHS  */}
      <RoomSection
        eyebrow="The Bathrooms"
        headline="Updated fully."
        headlineItalic="Nothing original was lost."
        body="Five full baths. The Tennessee marble powder room. Every update made with restraint -- the architecture leads, the fixtures follow."
        images={GALLERY_BATHS}
        reverse={true}
      />

      <CrestDivider />

      {/*  GROUNDS  */}
      <GroundsSection />

      <FullBleedSection
        imgSrc={cdnExt(GH2 + '782f791e5_IMG_9412.jpg')}
        eyebrow="The Azaleas"
        headline="Hollycrest was named"
        headlineItalic="for these trees."
        body="They were here before the house. They will be here after. The red azalea hedge along the drive is one of the finest in Moore County."
      />

      <AerialSection />
      <Dusk2Section />
      <TwilightClose />

      <Footer onInquire={open} />
      <InquireModal open={inquireOpen} onClose={close} />
    </div>
  );
}
