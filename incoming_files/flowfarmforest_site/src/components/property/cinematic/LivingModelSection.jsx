import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

const PILLARS = [
  {
    label: 'The Farm Sustains the Designation',
    text: 'The veganic operation is not ornamental — it is the mechanism that sustains the USDA agricultural zoning underlying every structure, every permitted use, and every acre of flexibility on this estate. Without it, the math changes entirely.',
  },
  {
    label: 'Independent by Infrastructure',
    text: 'Two deep private wells with commercial-grade filtration. A 14.3 kW solar array with battery backup. Five geothermal zones drawing from twenty wells at three hundred feet. A 30 kW standby generator. The estate does not rely on municipal systems — it has quietly replaced them.',
  },
  {
    label: 'Three Miles from Pinehurst',
    text: 'Close enough to draw on a resort economy that welcomes over a million visitors annually. Far enough to remain outside city limits. Extraterritorial jurisdiction delivers resort-caliber proximity with county-level taxation — an arithmetic as persuasive as the address.',
  },
  {
    label: 'Permitted to Expand',
    text: 'Retreat centers. Commercial kitchens. Event venues. Agritourism operations. The zoning, the utilities, and the road access already accommodate them. What remains is only the intention of the next steward.',
  },
  {
    label: 'A Compound, Not a Residence',
    text: 'Two homes. Six structures. Fifteen acres. This is the kind of property that absorbs a growing family or a growing enterprise without ever feeling the strain.',
  },
];

/* Individual pillar card with its own scroll-driven animation */
function PillarCard({ pillar, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px 0px -60px 0px' });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Continuous parallax float as user scrolls past
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -10]);

  return (
    <motion.div
      ref={ref}
      style={{
        y: floatY,
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.92,
        background: '#F6F4EF',
        border: '1px solid rgba(164,138,106,0.12)',
        borderRadius: '14px',
        padding: 'clamp(24px, 3.5vw, 36px)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.06), 0 12px 48px rgba(0,0,0,0.04)',
        transition: `opacity 0.8s cubic-bezier(0.22,0.1,0.28,1) ${index * 0.08}s, scale 0.8s cubic-bezier(0.22,0.1,0.28,1) ${index * 0.08}s`,
        willChange: 'transform',
      }}
    >
      {/* Animated accent line */}
      <motion.div
        style={{
          height: '2px',
          background: '#A48A6A',
          marginBottom: '16px',
          width: isInView ? '24px' : '0px',
          transition: `width 0.6s cubic-bezier(0.22,0.1,0.28,1) ${index * 0.08 + 0.3}s`,
        }}
      />
      <span
        className="block font-sans uppercase"
        style={{
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          color: '#A48A6A',
          marginBottom: '10px',
        }}
      >
        {pillar.label}
      </span>
      <p
        className="font-sans"
        style={{
          fontSize: 'clamp(0.84rem, 0.92vw, 0.92rem)',
          lineHeight: 1.85,
          color: '#6B6B67',
          margin: 0,
        }}
      >
        {pillar.text}
      </p>
    </motion.div>
  );
}

export default function LivingModelSection() {
  return (
    <section data-nav-theme="light" className="w-full min-h-screen flex flex-col justify-center" style={{ background: '#ECE7DF' }}>
      {/* Header */}
      <div
        className="max-w-4xl mx-auto px-6 sm:px-8 text-center"
        style={{ paddingTop: 'clamp(80px, 12vh, 140px)', paddingBottom: 'clamp(48px, 6vh, 72px)' }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease }}
          className="block font-sans uppercase"
          style={{
            fontSize: '0.56rem',
            fontWeight: 500,
            letterSpacing: '0.4em',
            color: 'rgba(0,0,0,0.26)',
            marginBottom: '14px',
          }}
        >
          The Opportunity
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.1, ease }}
          className="font-display"
          style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            fontWeight: 400,
            lineHeight: 1.06,
            letterSpacing: '0.01em',
            color: '#1C1C1A',
            marginBottom: 'clamp(24px, 3vh, 36px)',
          }}
        >
          The Logic of the Land
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.25, ease }}
          className="font-serif italic mx-auto"
          style={{
            fontSize: 'clamp(0.92rem, 1.2vw, 1.12rem)',
            lineHeight: 1.65,
            fontWeight: 300,
            color: 'rgba(0,0,0,0.42)',
            maxWidth: '620px',
            margin: '0 auto',
          }}
        >
          Fifteen acres where every system answers to the next — the farm sustains the zoning, the zoning unlocks the land, and the infrastructure removes every barrier between ownership and what comes after.
        </motion.p>
      </div>

      {/* Narrative body */}
      <div
        className="max-w-3xl mx-auto px-6 sm:px-8"
        style={{ paddingBottom: 'clamp(48px, 6vh, 72px)' }}
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.15, ease }}
          className="font-sans text-center"
          style={{
            fontSize: 'clamp(0.86rem, 0.98vw, 0.96rem)',
            lineHeight: 1.85,
            color: 'rgba(0,0,0,0.50)',
            margin: '0 auto',
            maxWidth: '580px',
          }}
        >
          What distinguishes this estate is not its scale but its coherence. The agricultural operation, the energy systems, the water infrastructure, the zoning — each was designed to reinforce the others. The result is a property where the most consequential decisions have already been made, and made well.
        </motion.p>
      </div>

      {/* Pillars grid — each card has independent scroll-driven motion */}
      <div
        className="max-w-5xl mx-auto px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-x-14 gap-y-10 sm:gap-y-12"
        style={{ paddingBottom: 'clamp(80px, 12vh, 140px)' }}
      >
        {PILLARS.map((pillar, i) => (
          <PillarCard key={pillar.label} pillar={pillar} index={i} />
        ))}
      </div>
    </section>
  );
}