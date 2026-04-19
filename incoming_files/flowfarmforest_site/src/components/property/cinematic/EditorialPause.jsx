import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

const BG_IMAGE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/192707303_forestforbase.png';

export default function EditorialPause({ lines }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.6, 1, 1, 0.6]);

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(40vh, 50vh, 60vh)' }}
    >
      {/* Parallax background */}
      <motion.img
        src={BG_IMAGE}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'saturate(0.85) contrast(1.08) brightness(0.55) sepia(0.04)', y: imgY, willChange: 'transform', scale: 1.15 }}
      />

      {/* Deep cinematic vignette */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.30) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,10,8,0.4) 0%, transparent 25%, transparent 75%, rgba(12,10,8,0.4) 100%)' }} />

      {/* Text content */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 2, ease }}
          className="text-center"
        >
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, delay: i * 0.2, ease }}
              className="font-display italic"
              style={{
                fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)',
                fontWeight: 300,
                lineHeight: 1.55,
                letterSpacing: '0.02em',
                color: 'rgba(255,255,255,0.65)',
                textShadow: '0 2px 20px rgba(0,0,0,0.5)',
                margin: 0,
              }}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}