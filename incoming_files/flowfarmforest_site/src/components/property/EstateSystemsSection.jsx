import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeUp, revealTransition, revealViewport } from './motionConfig';

const categories = [
  {
    id: 'sustainability',
    label: 'Energy & Sustainability',
    intro: 'Renewable energy and environmental systems support Flow Farm\'s long-term sustainability, efficiency, and self-sufficiency.',
    items: [
      '14.3 kW solar array',
      '20 geothermal wells, 300 feet each',
      'Designed for long-term stewardship and energy resilience',
    ],
  },
  {
    id: 'intelligent',
    label: 'Intelligent Systems',
    intro: 'Integrated automation and connectivity systems deliver seamless comfort, control, and whole-estate performance.',
    items: [
      'Control4 smart home automation',
      'Centralized control of audio, video, and lighting',
      'Distributed speakers throughout the home',
      'Whole-campus Wi-Fi',
    ],
  },
  {
    id: 'infrastructure',
    label: 'Estate Infrastructure',
    intro: 'Robust mechanical, water, air-quality, and backup power systems are engineered for reliability, resilience, and continuous performance.',
    items: [
      'Five HVAC zones',
      'Energy recovery ventilation',
      'Lennox air purification',
      'Whole-house water filtration',
      '30 kW generator',
      'Dual 1,000-gallon propane tanks',
    ],
  },
];

const panelVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.1, 0.28, 1] } },
  exit: { opacity: 0, y: -6, transition: { duration: 0.3, ease: [0.22, 0.1, 0.28, 1] } },
};

export default function EstateSystemsSection() {
  const [activeId, setActiveId] = useState(null);
  const activeCategory = categories.find((c) => c.id === activeId);

  return (
    <section style={{ marginTop: 0, marginBottom: 'clamp(64px, 10vh, 120px)' }}>

      {/* Kicker */}
      <motion.span
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        transition={{ ...revealTransition, delay: 0 }}
        className="block font-sans text-foreground/35"
        style={{
          fontSize: '10px',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          fontWeight: 500,
          marginBottom: 'clamp(16px, 2.5vh, 24px)',
        }}
      >
        Systems &amp; Infrastructure
      </motion.span>

      {/* Headline */}
      <motion.h3
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        transition={{ ...revealTransition, delay: 0.08 }}
        className="font-serif font-light text-primary"
        style={{
          fontSize: 'clamp(2rem, 4.5vw, 3.25rem)',
          lineHeight: '1.08',
          letterSpacing: '-0.015em',
          marginBottom: 'clamp(24px, 3.5vh, 40px)',
        }}
      >
        Estate Systems
      </motion.h3>

      {/* Introductory copy */}
      <motion.p
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        transition={{ ...revealTransition, delay: 0.16 }}
        className="font-sans text-foreground/50"
        style={{
          fontSize: 'clamp(0.875rem, 1vw, 1rem)',
          lineHeight: '2',
          letterSpacing: '0.005em',
          maxWidth: '640px',
          marginBottom: 'clamp(48px, 7vh, 72px)',
        }}
      >
        Fully sustainable by design, Flow Farm integrates advanced energy, infrastructure, and smart-home systems to support resilience, operational independence, and long-term stewardship.
      </motion.p>

      {/* Category selectors */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={revealViewport}
        transition={{ ...revealTransition, delay: 0.24 }}
        className="flex flex-col sm:flex-row sm:items-center"
        style={{
          gap: 'clamp(0px, 0vw, 0px)',
          marginBottom: 'clamp(40px, 6vh, 64px)',
        }}
        role="tablist"
        aria-label="Estate Systems"
      >
        {categories.map((cat, idx) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={cat.id}
              id={`tab-${cat.id}`}
              onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
              className="text-left sm:text-center transition-all"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: '11px',
                fontWeight: isActive ? 500 : 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: isActive ? '#1a1a1a' : 'rgba(26,26,26,0.36)',
                padding: '14px 0',
                paddingRight: idx < categories.length - 1 ? 'clamp(28px, 3.5vw, 44px)' : '0',
                border: 'none',
                borderBottom: isActive ? '1.5px solid #1a1a1a' : '1.5px solid transparent',
                borderRadius: '0',
                background: 'transparent',
                cursor: 'pointer',
                transitionDuration: '0.4s',
                transitionTimingFunction: 'cubic-bezier(0.22, 0.1, 0.28, 1)',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(26,26,26,0.65)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.color = 'rgba(26,26,26,0.36)';
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </motion.div>

      {/* Expanded panel */}
      <AnimatePresence mode="wait">
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            id={activeCategory.id}
            role="tabpanel"
            aria-labelledby={`tab-${activeCategory.id}`}
            style={{
              borderTop: '1px solid rgba(0,0,0,0.06)',
              paddingTop: 'clamp(32px, 5vh, 52px)',
            }}
          >
            <p
              className="font-sans text-foreground/50"
              style={{
                fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                lineHeight: '2',
                letterSpacing: '0.005em',
                maxWidth: '560px',
                marginBottom: 'clamp(28px, 4vh, 44px)',
              }}
            >
              {activeCategory.intro}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {activeCategory.items.map((item, idx) => (
                <li
                  key={item}
                  className="font-sans text-foreground/65"
                  style={{
                    fontSize: 'clamp(0.82rem, 0.95vw, 0.92rem)',
                    lineHeight: '1.6',
                    paddingTop: idx === 0 ? 0 : 'clamp(14px, 1.8vh, 18px)',
                    paddingBottom: 'clamp(14px, 1.8vh, 18px)',
                    borderBottom: idx < activeCategory.items.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                    letterSpacing: '0.015em',
                  }}
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}