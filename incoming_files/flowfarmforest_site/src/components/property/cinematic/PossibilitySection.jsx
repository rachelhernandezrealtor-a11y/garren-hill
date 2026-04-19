import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];
const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg';

export default function PossibilitySection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <section ref={ref} data-nav-theme="dark" className="w-full bg-black text-white">
      {/* Parallax divider image */}
      <div className="relative w-full overflow-hidden" style={{ height: 'clamp(40vh, 50vh, 60vh)' }}>
        <motion.img
          src={IMG}
          alt="Flow Farm aerial"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 35%', filter: 'saturate(0.85) brightness(0.65)', y: imgY, willChange: 'transform', scale: 1.15 }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,1) 0%, rgba(10,10,10,0) 20%, rgba(10,10,10,0) 80%, rgba(10,10,10,1) 100%)' }} />
      </div>

      {/* Text block */}
      <div className="py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl mx-auto px-6 sm:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease }}
            className="block font-sans text-[0.95rem] md:text-[1.05rem] tracking-[0.3em] uppercase text-[#C9B18F] font-bold mb-6 sm:mb-8"
          >
            THE OPPORTUNITY
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 2.4, delay: 0.12, ease }}
            className="font-display text-[clamp(2.8rem,5vw,4.5rem)] font-medium text-white leading-[1.05] mb-6 sm:mb-8"
          >
            Position, Not Potential.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, delay: 0.3, ease }}
            className="font-sans text-white/60 leading-relaxed mx-auto"
            style={{
              fontSize: 'clamp(1rem, 1.15vw, 1.05rem)',
              letterSpacing: '0.01em',
              maxWidth: '560px',
              margin: '0 auto',
            }}
          >
            Most luxury properties sell a lifestyle. Flow Farm sells a far rarer combination: lifestyle, land advantage, and built-in strategic value. The farm is already running. The agricultural standing is already doing its work. The infrastructure is already in place. That means the next owner is not buying a concept — they are buying a proven position with immediate beauty and long-term upside.
          </motion.p>
        </div>
      </div>
    </section>
  );
}