import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import InquiryCTA from '@/components/property/InquiryCTA';
import { getImageAdjust } from './imageAdjust';

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg';

const LABELS = [
  { text: 'Main Residence', top: '20%', left: '32%', mobileTop: '20%', mobileLeft: '32%', scrollRange: [0.05, 0.40] },
  { text: '3 Acre Veganic Farm', top: '68%', left: '29%', mobileTop: '72%', mobileLeft: '18%', scrollRange: [0.05, 0.95], mobileRotate: -15, holdAtEnd: true },
  { text: 'Guest House', top: '28%', left: '52%', mobileTop: '28%', mobileLeft: '54%', scrollRange: [0.15, 0.95], holdAtEnd: true },
  { text: 'High Tunnel', top: '61%', left: '58%', mobileTop: '65%', mobileLeft: '55%', scrollRange: [0.15, 0.95], rotate: -35, mobileRotate: -35, holdAtEnd: true },
  { text: 'Farm Workshop', top: '84%', left: '50%', mobileTop: '80%', mobileLeft: '48%', scrollRange: [0.15, 0.95], holdAtEnd: true },
  { text: 'Biochar · Compost', top: '84%', left: '66%', mobileTop: '85%', mobileLeft: '65%', scrollRange: [0.15, 0.95], holdAtEnd: true },
];

const FEATURE_KEYS = [
  { main: "96' × 36' High Tunnel", sub: 'Year-Round Growing' },
  { main: 'Aerated O2Compost System', sub: 'Organic Soil Regeneration' },
  { main: 'Biochar Kiln', sub: 'I-Beam · Chain Hoist' },
  { main: "30' x 40' Farm Workshop" },
];

/* ─── Shared card styles — soft frosted glass ─── */
const CARD_STYLE = {
  background: 'rgba(20,18,14,0.72)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.28)',
  borderRadius: '2px',
  padding: 'clamp(8px, 2vw, 22px)',
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(3px, 0.6vw, 9px)',
  minWidth: 'clamp(120px, 20vw, 300px)',
  maxWidth: 'clamp(170px, 26vw, 340px)',
  boxShadow: '0 18px 56px rgba(0,0,0,0.4)',
};

const CARD_TITLE_STYLE = {
  fontSize: 'clamp(0.45rem, 0.82vw, 0.78rem)',
  fontWeight: 600,
  fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  color: 'rgba(255,255,255,0.96)',
  lineHeight: 1.3,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  marginBottom: '3px',
  textShadow: '0 1px 4px rgba(0,0,0,0.4)',
};

const CARD_ITEM_STYLE = {
  fontSize: 'clamp(0.46rem, 0.82vw, 0.84rem)',
  fontWeight: 600,
  fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
  letterSpacing: '0.18em',
  color: 'rgba(255,255,255,0.98)',
  lineHeight: 1.4,
  textShadow: '0 1px 4px rgba(0,0,0,0.5)',
};

const CARD_SUB_STYLE = {
  fontSize: 'clamp(0.42rem, 0.72vw, 0.72rem)',
  fontWeight: 500,
  letterSpacing: '0.16em',
  color: 'rgba(255,255,255,0.9)',
  lineHeight: 1.25,
  marginTop: '3px',
};

const DOT = <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', flexShrink: 0, boxShadow: '0 0 6px rgba(0,0,0,0.35)' }} />;

/* ─── Feature keys card (far right) ─── */
function FeatureKeysCard() {

  return (
    <motion.div
      className="absolute z-20 pointer-events-none hidden sm:block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 0.1, 0.28, 1] }}
      style={{ top: '42%', right: '8%' }}
    >
      <div style={CARD_STYLE}>
        {FEATURE_KEYS.map((key, i) => (
          <div key={i} className="flex items-start gap-2">
            {DOT}
            <div>
              <span className="font-sans uppercase block" style={CARD_ITEM_STYLE}>{key.main}</span>
              {key.sub && <span className="font-sans uppercase block" style={CARD_SUB_STYLE}>{key.sub}</span>}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

const GROUNDS_TITLE = 'Fully Protected Grounds';
const GROUNDS_FEATURES = [
  'Fenced 3 Acres',
  '1,400ft Double Deer Fence',
  '1-Acre Fenced Dog Run',
];

/* ─── Specs card next to Main Residence ─── */
function ResidenceSpecsCard() {

  return (
    <motion.div
      className="absolute z-20 pointer-events-none hidden sm:block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 0.1, 0.28, 1] }}
      style={{ top: '8%', left: '4%' }}
    >
      <div style={CARD_STYLE}>
        <span className="block font-serif" style={CARD_TITLE_STYLE}>{GROUNDS_TITLE}</span>
        {GROUNDS_FEATURES.map((feat, i) => (
          <span key={i} className="font-sans uppercase whitespace-nowrap flex items-center gap-2" style={CARD_ITEM_STYLE}>
            {DOT}
            {feat}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

const GUEST_HOUSE_TITLE = 'Guest House';
const GUEST_HOUSE_STATS = '3,372 SF  ·  1-Car Garage';
const GUEST_HOUSE_FEATURES = [
  "20'×40' Sports Court",
  'Walk-In Cooler',
  'Electric + Plumbing Installed',
];

/* ─── Specs card next to Guest House ─── */
function GuestHouseSpecsCard() {

  return (
    <motion.div
      className="absolute z-20 pointer-events-none hidden sm:block"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 0.1, 0.28, 1] }}
      style={{ top: '8%', right: '8%' }}
    >
      <div style={CARD_STYLE}>
        <span className="block font-serif" style={CARD_TITLE_STYLE}>{GUEST_HOUSE_TITLE}</span>
        <span className="font-sans uppercase whitespace-nowrap flex items-center gap-2" style={CARD_ITEM_STYLE}>
          {DOT}
          {GUEST_HOUSE_STATS}
        </span>
        {GUEST_HOUSE_FEATURES.map((feat, i) => (
          <span key={i} className="font-sans uppercase whitespace-nowrap flex items-center gap-2" style={CARD_ITEM_STYLE}>
            {DOT}
            {feat}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── Individual map label — cinematic parallax drift on all viewports ─── */
function EstateLabel({ label, scrollYProgress, index, isMobile }) {
  const fadeIn = 0.10;
  const start = label.scrollRange[0];

  const opacity = useTransform(
    scrollYProgress,
    [start, start + fadeIn],
    [0, 1]
  );
  const entryY = useTransform(
    scrollYProgress,
    [start, start + fadeIn],
    [20, 0]
  );
  const scale = useTransform(
    scrollYProgress,
    [start, start + fadeIn],
    [0.9, 1]
  );

  // Subtle parallax drift — each label gets a unique phase offset based on index
  const phase = index * 0.12;
  const driftY = useTransform(scrollYProgress, [0, 0.2 + phase, 0.5 + phase * 0.5, 0.8, 1], [0, -1.2, 0.8, -0.6, 0.4]);
  const driftX = useTransform(scrollYProgress, [0, 0.18 + phase, 0.48 + phase * 0.5, 0.82, 1], [0, 0.9, -0.7, 1.0, -0.3]);

  const currentTop = isMobile && label.mobileTop ? label.mobileTop : label.top;
  const currentLeft = isMobile && label.mobileLeft ? label.mobileLeft : label.left;
  const currentRotate = isMobile && label.mobileRotate !== undefined ? label.mobileRotate : (label.rotate || 0);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: currentTop,
        left: currentLeft,
        opacity,
        y: entryY,
        scale,
        translateY: driftY,
        translateX: driftX,
        transform: `translate(-50%, -50%)${currentRotate ? ` rotate(${currentRotate}deg)` : ''}`,
      }}
    >
      <div className="relative" style={{ zIndex: 1 }}>
        {/* Pulsing beacon dot */}
        <div className="sm:w-[7px] sm:h-[7px] w-[5px] h-[5px]" style={{
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.35) 60%, transparent 100%)',
          margin: '0 auto 6px',
          boxShadow: '0 0 8px rgba(255,255,255,0.4), 0 0 20px rgba(255,255,255,0.12)',
          animation: 'pulse 2.5s ease-in-out infinite',
        }} />
        {/* Thin line connector */}
        <div className="hidden sm:block" style={{ width: '1px', height: '22px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), rgba(255,255,255,0.05))', margin: '0 auto 6px' }} />
        <span
                  className="block font-sans uppercase text-center"
                  style={{
                    fontSize: 'clamp(0.46rem, 0.7vw, 0.7rem)',
                    fontWeight: 600,
                    letterSpacing: '0.22em',
                    color: 'rgba(255,255,255,0.96)',
                    textShadow: '0 2px 10px rgba(0,0,0,0.65)',
                    padding: 'clamp(4px, 0.6vw, 7px) clamp(8px, 1.2vw, 14px)',
                    background: 'rgba(18,16,12,0.45)',
                    borderRadius: '3px',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    boxShadow: '0 10px 36px rgba(0,0,0,0.25)',
                      whiteSpace: 'nowrap',
                      maxWidth: 'clamp(140px, 50vw, 350px)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
          {label.text}
        </span>
        {label.sub && (
          <span
            className="block font-sans text-center whitespace-nowrap"
            style={{
              fontSize: 'clamp(0.56rem, 0.72vw, 0.66rem)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: label.brightSub ? '#ffffff' : 'rgba(255,255,255,0.85)',
              marginTop: 4,
              textShadow: '0 1px 6px rgba(0,0,0,0.6)',
            }}
          >
            {label.sub}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Editorial narrative block — wind-drift, no fade-out ─── */
function EstateNarrative({ scrollYProgress }) {
  // Fade in only — stays visible
  const opacity = useTransform(scrollYProgress, [0, 0.03], [0, 1]);

  // Barely perceptible breeze — 1-2px drift, <0.1° rotation
  const headX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1.2, -0.8, 1.5, -0.5]);
  const headY = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.7, 1], [12, 0, -0.8, 0.5, -0.3]);
  const headR = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.06, -0.04, 0.03]);

  const bodyX = useTransform(scrollYProgress, [0, 0.25, 0.55, 0.85, 1], [0, -0.8, 1.0, -0.6, 0.4]);
  const bodyY = useTransform(scrollYProgress, [0, 0.12, 0.45, 0.75, 1], [8, 0, 0.6, -0.5, 0.3]);
  const bodyR = useTransform(scrollYProgress, [0, 0.35, 0.7, 1], [0, -0.04, 0.05, -0.02]);

  const linkX = useTransform(scrollYProgress, [0, 0.22, 0.52, 0.82, 1], [0, 1.0, -0.6, 1.2, -0.4]);
  const linkY = useTransform(scrollYProgress, [0, 0.14, 0.48, 0.78, 1], [6, 0, -0.5, 0.4, -0.2]);
  const linkR = useTransform(scrollYProgress, [0, 0.28, 0.65, 1], [0, 0.05, -0.03, 0.02]);

  return (
    <motion.div
      className="absolute z-20 hidden sm:flex flex-col items-start"
      style={{
        bottom: 'clamp(20%, 32vh, 50%)',
        left: 'clamp(12px, 3vw, 120px)',
        right: 'clamp(12px, 3vw, 120px)',
        opacity,
      }}
    >
      <div className="relative" style={{ maxWidth: '540px', padding: '0' }}>
        {/* Warm glow scrim behind text for readability */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-70px -90px',
            background: 'radial-gradient(ellipse 85% 75% at 38% 45%, rgba(40,28,12,0.7) 0%, rgba(30,20,8,0.45) 35%, rgba(20,14,6,0.2) 60%, transparent 85%)',
            filter: 'blur(40px)',
            zIndex: 0,
          }}
        />

        {/* Headline — drifts like a leaf */}
        <motion.h2
          className="relative font-display"
          style={{
            fontSize: 'clamp(1.6rem, 6vw, 5.5rem)',
            fontWeight: 400,
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            color: '#ffffff',
            marginBottom: 'clamp(8px, 1.5vh, 18px)',
            textShadow: '0 1px 12px rgba(0,0,0,0.45), 0 3px 28px rgba(0,0,0,0.18)',
            zIndex: 1,
            x: headX,
            y: headY,
            rotate: headR,
          }}
        >
          Flow Farm
        </motion.h2>

        {/* Body text — slightly different drift phase */}
        <motion.p
          className="relative font-sans"
          style={{
            fontSize: 'clamp(0.65rem, 1vw, 1.02rem)',
            lineHeight: 1.45,
            letterSpacing: '0.04em',
            color: 'rgba(255,252,245,0.95)',
            maxWidth: '340px',
            textShadow: '0 1px 5px rgba(0,0,0,0.42), 0 2px 12px rgba(0,0,0,0.18)',
            zIndex: 1,
            margin: 0,
            x: bodyX,
            y: bodyY,
            rotate: bodyR,
          }}
        >
          15 acres. Six structures. A USDA-registered farm (FSA #5893) regeneratively building healthy soil since 2009. The rest, wooded and ready.
        </motion.p>

        {/* Location link — its own wind lane */}
        <motion.div
          className="relative"
          style={{
            zIndex: 1,
            x: linkX,
            y: linkY,
            rotate: linkR,
            marginTop: 'clamp(8px, 1.5vh, 20px)',
          }}
        >
          <Link
            to="/Location"
            className="inline-flex items-center gap-2 font-sans uppercase pointer-events-auto"
            style={{
              fontSize: 'clamp(0.5rem, 0.72vw, 0.7rem)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#fff',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.22)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: '7px 14px',
              borderRadius: '2px',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.22)'; }}
          >
            <MapPin className="w-3 h-3" />
            Location & Access
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ─── Mobile drift wrapper ─── */
function MobileDriftCard({ children }) {
  return <div>{children}</div>;
}

/* ─── Mobile info card ─── */
function MobileCard({ title, subtitle, items }) {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid rgba(0,0,0,0.08)',
      borderRadius: '2px',
      padding: '16px 18px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    }}>
      <span style={{
        display: 'block',
        fontSize: '0.65rem',
        fontWeight: 600,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#1C1C1A',
        marginBottom: subtitle ? '2px' : '10px',
        fontFamily: "'DM Sans', sans-serif",
      }}>{title}</span>
      {subtitle && (
        <span style={{
          display: 'block',
          fontSize: '0.58rem',
          letterSpacing: '0.16em',
          color: '#6B6B67',
          marginBottom: '10px',
          fontFamily: "'DM Sans', sans-serif",
          textTransform: 'uppercase',
        }}>{subtitle}</span>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
        {items.map((item, i) => (
          <span key={i} style={{
            fontSize: '0.55rem',
            fontWeight: 500,
            letterSpacing: '0.16em',
            color: '#6B6B67',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(0,0,0,0.25)', flexShrink: 0 }} />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main section ─── */
export default function EstateOverview() {
  const isMobile = useIsMobile();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Subtle vertical drift only — no scale to preserve image crispness
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '-2%']);


  return (
    <section
      ref={sectionRef}
      data-nav-theme="dark"
      className="relative w-full"
      style={{ position: 'relative', zIndex: 2, background: '#f7f1e6', margin: 0, padding: 0 }}
    >
      {/* Aerial canvas — image determines height, full-bleed */}
      <div className="relative w-full" style={{ background: 'transparent', lineHeight: 0, overflow: 'hidden', margin: 0, padding: 0 }}>
        {/* Aerial image — natural flow, parallax zoom + drift */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 1.2, ease: [0.22, 0.1, 0.28, 1] }}
          style={{
            y: imgY,
            willChange: 'transform',
          }}
        >
          <img
            src={IMG}
            srcSet={`${IMG}?width=640 640w, ${IMG}?width=1024 1024w, ${IMG}?width=1600 1600w, ${IMG}?width=2200 2200w`}
            sizes="100vw"
            alt="Flow Farm aerial view — 15-acre regenerative estate compound with six structures near Pinehurst, North Carolina. Main residence, guest house, farm workshop, greenhouse, and veganic farm visible."
            className="w-full estate-aerial-img cinematic-exterior"
            loading="eager"
            decoding="async"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
              filter: `${getImageAdjust(IMG)}`,
              imageRendering: '-webkit-optimize-contrast',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          />
        </motion.div>

        {/* Overlay container for labels and cards */}
        <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>



        {/* Bottom fade — cinematic atmospheric blend */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: 'clamp(220px, 32vh, 420px)',
            background: 'linear-gradient(to bottom, transparent 0%, rgba(223,205,178,0.1) 34%, rgba(211,186,148,0.26) 68%, rgba(191,159,112,0.42) 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* Top edge vignette — subtle */}
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: 'clamp(100px, 15vh, 200px)',
            background: 'linear-gradient(to bottom, rgba(255,248,238,0.12) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Estate narrative overlay */}
        <EstateNarrative scrollYProgress={scrollYProgress} />

        <div className="absolute bottom-[8%] right-[4%] z-20 hidden lg:block" style={{ pointerEvents: 'auto' }}>
          <InquiryCTA
            variant="dark"
            sublabel="Private Tour"
            label="Request Viewing"
          />
        </div>

        {/* Map labels */}
        {LABELS.map((label, i) => (
          <EstateLabel key={i} label={label} scrollYProgress={scrollYProgress} index={i} isMobile={isMobile} />
        ))}

        {/* Info cards — desktop only (overlaid on image) */}
        {!isMobile && (
          <>
            <ResidenceSpecsCard />
            <GuestHouseSpecsCard />
            <FeatureKeysCard />
          </>
        )}
        </div>
      </div>

      {/* Info cards — mobile: stacked below the aerial image */}
      {isMobile && (
        <div className="flex flex-col gap-3 px-5 py-8" style={{ background: '#f7f1e6', margin: 0, padding: '16px 20px 0 20px' }}>
          {[
            { title: GROUNDS_TITLE, items: GROUNDS_FEATURES },
            { title: GUEST_HOUSE_TITLE, subtitle: GUEST_HOUSE_STATS, items: GUEST_HOUSE_FEATURES },
            { title: 'Farm Infrastructure', items: FEATURE_KEYS.map(k => k.sub ? `${k.main} \u2014 ${k.sub}` : k.main) },
          ].map((card, i) => (
            <MobileDriftCard key={i}>
              <MobileCard title={card.title} subtitle={card.subtitle} items={card.items} />
            </MobileDriftCard>
          ))}
        </div>
      )}
    </section>
  );
}