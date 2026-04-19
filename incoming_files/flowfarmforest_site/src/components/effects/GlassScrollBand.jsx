import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export default function GlassScrollBand({ kicker = 'Field Notes', title, body, alignment = 'left', className = '' }) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // Always create motion values, then gate with reduced-motion
  const yTitleMv = useTransform(scrollYProgress, [0, 1], ['12%', '-6%']);
  const yBodyMv = useTransform(scrollYProgress, [0, 1], ['-4%', '8%']);
  const opacityMv = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  const yTitle = shouldReduce ? 0 : yTitleMv;
  const yBody = shouldReduce ? 0 : yBodyMv;
  const opacity = shouldReduce ? 1 : opacityMv;

  return (
    <section ref={ref} className={`relative w-full px-6 sm:px-10 lg:px-16 ${className}`} aria-label={title || kicker}>
      {/* Ambient warm orb */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
             style={{ background: 'radial-gradient(60% 60% at 50% 40%, rgba(201,177,143,0.25), rgba(0,0,0,0))' }} />
      </div>

      <div className="mx-auto max-w-7xl">
        <motion.div
          className="glass-bold glass-card relative overflow-hidden border rounded-2xl p-6 sm:p-8 lg:p-10"
          style={{
            opacity,
            boxShadow: '0 28px 80px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(201,177,143,0.28)'
          }}
        >
          {/* subtle inner vignette */}
          <div className="pointer-events-none absolute inset-0" style={{
            background: 'radial-gradient(120% 120% at 50% 0%, rgba(255,239,220,0.06), rgba(0,0,0,0))'
          }} />

          <div className={`relative grid items-start gap-6 md:gap-10 ${alignment === 'left' ? 'text-left' : 'text-right'} md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]`}>
            <div>
              {kicker && (
                <p className="mb-3 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">
                  {kicker}
                </p>
              )}
              {title && (
                <motion.h3
                  className={`mb-0 font-display text-[clamp(2rem,4.5vw,3.2rem)] leading-[1.02] text-white ${alignment === 'left' ? '' : ''}`}
                  style={{ y: yTitle, textShadow: '0 10px 30px rgba(0,0,0,0.55), 0 2px 0 rgba(255,255,255,0.04)' }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                >
                  {title}
                </motion.h3>
              )}
            </div>
            {body && (
              <motion.p
                className="mb-0 max-w-[48ch] font-sans text-[1rem] sm:text-[1.05rem] leading-[1.8] text-white/85"
                style={{ y: yBody, textShadow: '0 8px 24px rgba(0,0,0,0.5)' }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {body}
              </motion.p>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}