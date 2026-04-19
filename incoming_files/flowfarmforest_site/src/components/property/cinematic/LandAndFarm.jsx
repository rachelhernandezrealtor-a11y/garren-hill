import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const IMG_FARM = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e7ec84dc8_newpic.jpg';
const IMG_GREENHOUSE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7711a3672_tunnelgood.jpg';
const ease = [0.22, 0.1, 0.28, 1];

export default function LandAndFarm() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section className="w-full bg-white border-t border-black/10">
      {/* Editorial intro */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8" style={{ paddingTop: 'clamp(96px, 12vh, 140px)', paddingBottom: 'clamp(56px, 7vh, 80px)' }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="block font-sans text-[9px] tracking-[0.35em] uppercase font-medium"
          style={{ color: 'rgba(0,0,0,0.38)', marginBottom: 'clamp(20px, 2.5vh, 28px)' }}
        >
          The Land
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.15, ease }}
          className="font-serif text-primary"
          style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 400, lineHeight: '1.08', marginBottom: 'clamp(28px, 3.5vh, 40px)' }}
        >
A Working Farm.<br />A Stronger Offer.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3, ease }}
          className="font-sans"
          style={{ fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)', lineHeight: '1.9', maxWidth: '600px', color: 'rgba(0,0,0,0.65)' }}
        >
          This is the operating layer that changes the entire value proposition. The farm is not just attractive — it strengthens the property’s agricultural standing, expands what the land can support, and gives buyers something exceptionally rare: a beautiful estate with a real operational backbone. Productive, proven, and already in motion, it adds substance to the story and power to the offer.
        </motion.p>
      </div>

      {/* Hero farm image */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ height: 'clamp(50vh, 65vh, 75vh)' }}>
        <motion.img
          src={IMG_FARM}
          alt="Flow Farm cultivated farmland — aerial view"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 45%', filter: 'saturate(0.9) contrast(1.05) brightness(1.12)', y: imgY, willChange: 'transform' }}
        />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.06) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.12) 100%)' }} />
      </div>

      {/* Greenhouse detail */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8" style={{ paddingTop: 'clamp(56px, 7vh, 80px)', paddingBottom: 'clamp(72px, 9vh, 100px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="overflow-hidden rounded-xl"
          >
            <img
              src={IMG_GREENHOUSE}
              alt="Commercial greenhouse and high tunnel"
              className="w-full h-auto object-cover rounded-xl"
              style={{ filter: 'saturate(0.85) contrast(1.05) brightness(0.95)', aspectRatio: '4/3' }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
          >
            <blockquote className="pl-6" style={{ borderLeft: '2px solid rgba(0,0,0,0.12)' }}>
              <p className="font-serif text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed mb-6" style={{ color: 'rgba(0,0,0,0.75)' }}>
                "Not a decorative amenity — a real agricultural system that adds value, credibility, and long-term optionality."
              </p>
            </blockquote>
            <div className="space-y-3 mt-8">
              {['3-Acre Veganic Farm', 'Commercial Greenhouse', 'High Tunnel for Extended Growing', 'Deer-Fenced Cultivation Area'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.2)' }} />
                  <span className="font-sans text-sm" style={{ color: 'rgba(0,0,0,0.55)' }}>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}