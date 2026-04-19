import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.15 } }
};

const lineIn = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.1, ease: [0.25, 0.1, 0.25, 1] } }
};

const chapterReveal = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { duration: 1.6, ease: [0.22, 0.1, 0.28, 1] } }
};

const chapterLine = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 1.2, ease: [0.22, 0.1, 0.28, 1] } }
};

const gridItem = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.85, ease: [0.22, 0.1, 0.28, 1], delay: 0.08 + i * 0.1 }
  })
};

const GRID_IMAGES = [
  { src: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7711a3672_tunnelgood.jpg", alt: "Estate greenhouse — structured cultivation" },
  { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/1e0ac9873_2764143276991492642.jpg", alt: "Muscadine orchard — natural growth" },
  { src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/ab239b0e7_4603172767521858802.jpg", alt: "Flow beehive — living ecosystem" },
  { src: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/41de5d5d3_HarvestBox.png", alt: "Estate harvest — abundance" },
];

export default function OpportunitySection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // Forest parallax — slow drift, feels like the viewer is descending into the canopy
  const forestY = useTransform(scrollYProgress, [0, 1], ['-6%', '10%']);
  const forestScale = useTransform(scrollYProgress, [0, 1], [1.10, 1.16]);

  return (
    <section ref={sectionRef} id="estate-compound" className="relative bg-black overflow-hidden">

      {/* Top blend — smooth transition from hero */}
      <div className="absolute inset-x-0 top-0 h-24 z-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />

      {/* Forest background — cinematic parallax with slow scale drift */}
      <motion.div className="absolute -inset-[5%] pointer-events-none" style={{ y: forestY, scale: forestScale }} aria-hidden="true">
        <img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b5064633b_JPEGimage.jpg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'saturate(0.68) contrast(0.95) brightness(0.82) sepia(0.04)' }}
          loading="eager"
        />
        {/* Warm atmospheric wash */}
        <div className="absolute inset-0" style={{ background: 'rgba(10,14,8,0.22)' }} />
        {/* Vertical gradient — preserves canopy texture at center, darkens extremes */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.06) 12%, transparent 28%, transparent 55%, rgba(0,0,0,0.10) 65%, rgba(0,0,0,0.24) 78%, rgba(0,0,0,0.40) 92%, rgba(0,0,0,0.50) 100%)' }} />
        {/* Center light pocket — warm glow where text lives */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 55% 35% at 50% 28%, rgba(255,248,235,0.12) 0%, rgba(255,248,235,0.04) 40%, transparent 65%)' }} />
        {/* Secondary glow behind grid area */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 45% 30% at 50% 68%, rgba(255,248,235,0.07) 0%, transparent 50%)' }} />
        {/* Bottom atmospheric softening — suppresses forest floor */}
        <div className="absolute inset-x-0 bottom-0 h-[45%]" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(6,10,5,0.20) 30%, rgba(6,10,5,0.38) 60%, rgba(4,8,4,0.52) 85%, rgba(2,6,2,0.58) 100%)' }} />
        {/* Deep cinematic vignette — strong edge framing */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 280px 120px rgba(0,0,0,0.28)' }} />
        {/* Side vignettes — extra darkness at left/right edges */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.22) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.22) 100%)' }} />
      </motion.div>

      {/* ── ACT I: A FOUNDATION, ROOTED IN SUSTAINABILITY ── */}
      <div
        className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8"
        style={{ paddingTop: 'clamp(100px, 14vh, 160px)' }}
      >
        {/* Soft light pocket behind text — readable without flattening forest */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          aria-hidden="true"
          style={{
            top: 'clamp(60px, 10vh, 120px)',
            width: 'min(92vw, 700px)',
            height: 'clamp(300px, 50vh, 460px)',
            background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.14) 50%, transparent 85%)',
            filter: 'blur(40px)',
            WebkitFilter: 'blur(40px)',
          }}
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="relative flex flex-col items-center text-center"
        >
          <motion.h2
            variants={lineIn}
            className="font-serif font-semibold leading-[1.08]"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', marginBottom: 'clamp(20px, 3vh, 32px)', color: 'rgba(255,255,255,0.96)', textShadow: '0 2px 20px rgba(0,0,0,0.5)' }}
          >
            A Foundation, Rooted in Sustainability
          </motion.h2>

          <motion.blockquote
            variants={lineIn}
            className="font-serif italic font-light"
            style={{ fontSize: 'clamp(1.25rem, 2vw, 1.65rem)', lineHeight: '1.55', maxWidth: '480px', marginBottom: 'clamp(18px, 2.5vh, 28px)', color: 'rgba(255,255,255,0.84)', textShadow: '0 1px 12px rgba(0,0,0,0.4)' }}
          >
            "Not defined by a single use, but by its capacity to evolve, operate, and scale."
          </motion.blockquote>

          <motion.p
            variants={lineIn}
            className="font-sans font-light leading-relaxed"
            style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1rem)', letterSpacing: '0.01em', maxWidth: '460px', marginBottom: 0, color: 'rgba(255,255,255,0.68)', textShadow: '0 1px 8px rgba(0,0,0,0.35)' }}
          >
            Flow Farm is already in motion — a functioning, regenerative system designed to support both private enjoyment and future enterprise. What has been established here is rare. What comes next is entirely yours.
          </motion.p>
        </motion.div>
      </div>

      {/* ── ACT II: AN ESTATE IN MOTION — gentle chapter reveal ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8"
        style={{ paddingTop: 'clamp(80px, 11vh, 130px)' }}
      >
        <motion.div variants={chapterLine} className="w-10 mx-auto origin-center" style={{ height: '1px', background: 'rgba(234,231,225,0.25)', marginBottom: 'clamp(22px, 3vh, 36px)' }} />
        <motion.span
          variants={chapterReveal}
          className="block font-serif text-[20px] sm:text-[24px] md:text-[28px] tracking-[0.10em] font-light text-center"
          style={{ color: '#EAE7E1', textShadow: '0 1px 16px rgba(0,0,0,0.4)' }}
        >
          An Estate in Motion
        </motion.span>
      </motion.div>

      {/* ── ACT III: IMAGE GRID — tangible expression ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="relative z-10 max-w-2xl mx-auto px-6 sm:px-8"
        style={{ paddingTop: 'clamp(32px, 4.5vh, 52px)', paddingBottom: 'clamp(20px, 3vh, 36px)' }}
      >
        {/* Cinematic vignette zone — radial darkening dissolves into forest */}
        <div
          className="relative w-full"
          style={{ padding: 'clamp(14px, 2.5vw, 28px)' }}
        >
          {/* Primary vignette — dark center pool, feathered edges, no hard corners */}
          <div
            className="absolute pointer-events-none"
            aria-hidden="true"
            style={{
              top: '-25%',
              left: '-20%',
              right: '-20%',
              bottom: '-25%',
              background: 'radial-gradient(ellipse 58% 52% at 50% 50%, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.24) 35%, rgba(0,0,0,0.10) 60%, transparent 82%)',
              filter: 'blur(20px)',
              WebkitFilter: 'blur(20px)',
            }}
          />
          <div className="relative grid grid-cols-2 gap-3 sm:gap-4">
            {GRID_IMAGES.map((img, idx) => (
              <motion.div
                key={idx}
                custom={idx}
                variants={gridItem}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="overflow-hidden rounded-lg group"
                style={{
                  aspectRatio: '1',
                  boxShadow: '0 8px 28px rgba(0,0,0,0.28), 0 2px 8px rgba(0,0,0,0.14)',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ filter: 'saturate(0.88) brightness(0.96) contrast(1.06)' }}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Breathing room below grid */}
        <div style={{ height: 'clamp(40px, 6vh, 64px)' }} />
      </motion.div>

      {/* Bottom fade — gentle dissolve, not heavy black */}
      <div className="absolute inset-x-0 bottom-0 z-20 pointer-events-none" style={{ height: 'clamp(100px, 14vh, 160px)', background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 25%, rgba(0,0,0,0.40) 55%, rgba(0,0,0,0.70) 80%, rgba(0,0,0,0.88) 100%)' }} />
    </section>
  );
}