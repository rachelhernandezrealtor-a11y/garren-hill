import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

export default function NarrativeBridge() {
  return (
    <section className="w-full bg-white" style={{ paddingTop: 'clamp(64px, 10vh, 100px)', paddingBottom: 'clamp(64px, 10vh, 100px)' }}>
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="w-12 mx-auto origin-center"
          style={{ height: '1px', background: 'rgba(0,0,0,0.12)', marginBottom: 'clamp(28px, 4vh, 40px)' }}
        />
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.15, ease }}
          className="font-display italic"
          style={{
            fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
            fontWeight: 300,
            lineHeight: 1.25,
            letterSpacing: '0.01em',
            color: '#1C1C1A',
            marginBottom: 'clamp(12px, 1.5vh, 18px)',
          }}
        >
          One Compound. One System.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2.0, delay: 0.3, ease }}
          className="font-serif italic"
          style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1.05rem)', lineHeight: '1.6', fontWeight: 300, color: 'rgba(0,0,0,0.35)', letterSpacing: '0.01em' }}
        >
          Land, infrastructure, and architecture — operating as one.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.4, ease }}
          className="w-12 mx-auto origin-center"
          style={{ height: '1px', background: 'rgba(0,0,0,0.12)', marginTop: 'clamp(28px, 4vh, 40px)' }}
        />
      </div>
    </section>
  );
}