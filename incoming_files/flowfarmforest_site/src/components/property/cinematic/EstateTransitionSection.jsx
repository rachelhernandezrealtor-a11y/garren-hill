import React from 'react';
import { motion } from 'framer-motion';

const TOUR_URL = 'https://portal.nucleus4d.com/3ec4ff02-9412-4f29-87ba-4926145df7a1/exterior-d302c992-e611-4197-b2df-ff6931a8827a';
const TRANSITION_IMAGE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/260115107LindenTrailF-9610.jpg';

export default function EstateTransitionSection() {
  return (
    <section className="relative -mt-px overflow-hidden bg-[#0f0d0b] py-0">
      <div className="relative min-h-[72vh] w-full sm:min-h-[78vh] lg:min-h-[84vh]">
        <img
          src={TRANSITION_IMAGE}
          alt=""
          className="absolute inset-0 block h-full w-full object-cover object-center"
          loading="eager"
          decoding="async"
          style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'translateZ(0)' }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(16,13,10,0) 0%, rgba(16,13,10,0.26) 20%, rgba(16,13,10,0.68) 58%, rgba(7,7,7,0.96) 100%)'
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 24%, rgba(255,232,201,0.12) 0%, rgba(255,232,201,0) 48%)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto flex min-h-[72vh] max-w-5xl flex-col items-center justify-end px-6 pb-14 pt-24 text-center text-white sm:min-h-[78vh] sm:px-8 sm:pb-20 lg:min-h-[84vh] lg:px-10 lg:pb-24"
        >
          <h2
            className="max-w-4xl text-white"
            style={{
              fontFamily: "'DM Serif Display', 'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.2rem, 5.2vw, 4.9rem)',
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: '-0.01em',
              margin: '0 0 20px 0',
              textShadow: 'rgba(0, 0, 0, 0.52) 0px 8px 24px'
            }}
          >
            Luxury, privacy, and Pinehurst proximity—before the house even begins to speak.
          </h2>

          <div className="mb-7 flex items-center gap-4 text-white/44">
            <div className="h-px w-10 bg-white/20" />
            <span className="font-sans text-[0.56rem] font-semibold uppercase tracking-[0.34em]">Transition</span>
            <div className="h-px w-10 bg-white/20" />
          </div>
          <p
            className="max-w-3xl text-white/84"
            style={{
              fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 'clamp(0.95rem, 1.2vw, 1.08rem)',
              fontWeight: 400,
              lineHeight: 1.8,
              letterSpacing: '0.01em',
              margin: '0 0 28px 0',
              textShadow: 'rgba(0, 0, 0, 0.42) 0px 6px 18px'
            }}
          >
            Architect-designed masonry main house, guest house, working structures, and forested privacy create a true legacy compound minutes from Pinehurst. The land sets the tone—then the architecture takes over.
          </p>

          <a
            href={TOUR_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center uppercase text-white transition-all duration-300 hover:bg-white hover:text-black"
            style={{
              fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
              fontSize: 'clamp(0.72rem, 0.95vw, 0.84rem)',
              fontWeight: 700,
              letterSpacing: '0.24em',
              padding: 'clamp(12px, 1.4vw, 14px) clamp(20px, 2.8vw, 30px)',
              border: '1px solid rgba(255,255,255,0.48)',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              textDecoration: 'none'
            }}
          >
            Walk the Land
          </a>
        </motion.div>
      </div>
    </section>
  );
}