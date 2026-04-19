import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ease = [0.22, 0.1, 0.28, 1];

const HERO_IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/3c2f14dfa_107LindenTrailGrass-66.jpg';

export default function ExteriorLink() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

  return (
    <section data-nav-theme="light" className="w-full" style={{ background: '#F6F4EF', paddingTop: 'clamp(64px, 8vh, 100px)', paddingBottom: 'clamp(64px, 8vh, 100px)' }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-8 overflow-hidden">

        {/* Header */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="block font-sans text-[9px] tracking-[0.35em] uppercase font-medium"
          style={{ color: 'rgba(0,0,0,0.35)', marginBottom: 'clamp(16px, 2vh, 24px)' }}
        >
          Exteriors & Grounds
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.12, ease }}
          className="font-display text-primary"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '0.01em', marginBottom: 'clamp(20px, 2.5vh, 28px)' }}
        >
          The Residence,<br />From Every Angle
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.25, ease }}
          className="font-sans"
          style={{ fontSize: 'clamp(0.88rem, 1.04vw, 1rem)', lineHeight: 1.85, color: 'rgba(0,0,0,0.52)', maxWidth: '580px', marginBottom: 'clamp(40px, 5vh, 60px)' }}
        >
          Solid brick masonry, deep-set windows, and articulated detailing define the façade. The compound layout frames courtyards, covered porches, and the conservatory wing among longleaf pines.
        </motion.p>

        {/* Hero image teaser */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, ease }}
        >
          <Link to="/photos" className="block group">
            <div className="overflow-hidden rounded-xl relative" style={{ aspectRatio: '16/9' }}>
              <motion.img
                src={HERO_IMG}
                alt="Entry Portico Detail"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ filter: 'brightness(0.97) contrast(0.95) saturate(0.78)', y: imgY, willChange: 'transform', scale: 1.06 }}
              />
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.5))' }} />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
                <span className="font-sans text-white" style={{ fontSize: 'clamp(0.7rem, 0.85vw, 0.82rem)', fontWeight: 400, letterSpacing: '0.04em', textShadow: '0 1px 4px rgba(0,0,0,0.6)' }}>
                  Georgian-inspired entry portico — handmade brick, copper lanterns, and reclaimed heart pine door
                </span>
                <span className="font-sans uppercase text-white/70 group-hover:text-white transition-colors flex items-center gap-1.5 shrink-0 ml-4" style={{ fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.2em' }}>
                  View All <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}