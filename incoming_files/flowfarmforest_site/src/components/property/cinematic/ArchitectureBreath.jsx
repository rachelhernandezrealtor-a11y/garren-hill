import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

export default function ArchitectureBreath() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <section
      ref={ref}
      className="w-full"
      style={{
        background: '#F6F4EF',
        padding: 'clamp(80px, 12vh, 140px) clamp(24px, 6vw, 64px)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.8, ease }}
        className="text-center mx-auto"
        style={{ maxWidth: '620px' }}
      >
        <p
          className="font-display"
          style={{
            fontSize: 'clamp(1.3rem, 2.4vw, 2rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.75,
            letterSpacing: '0.02em',
            color: '#1C1C1A',
            margin: 0,
          }}
        >
          The systems make it possible—<br />
          the architecture gives it form.
        </p>
      </motion.div>
    </section>
  );
}