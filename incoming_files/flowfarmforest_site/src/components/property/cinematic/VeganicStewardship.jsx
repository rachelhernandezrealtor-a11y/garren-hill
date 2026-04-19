import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, Sprout, FlameKindling, Truck } from 'lucide-react';

const ease = [0.22, 0.1, 0.28, 1];

const PILLARS = [
  {
    icon: Leaf,
    title: 'Beyond Organic',
    text: 'Most people know organic means no pesticides or synthetic chemicals. Veganic takes it one step further — no animal byproducts of any kind. No manure, no blood meal, nothing. Just plants feeding plants. The cleanest food you can grow.',
  },
  {
    icon: FlameKindling,
    title: 'Biochar — Built On-Site',
    text: 'Flow Farm built its own kiln to make biochar, a natural charcoal that transforms North Carolina\'s tough clay soil into rich, productive ground. One application lasts for decades — it\'s one of the most powerful things you can do for the land.',
  },
  {
    icon: Sprout,
    title: 'Soil That Gets Better Every Year',
    text: 'Instead of depleting the land, this approach builds it up. Cover crops, plant-based compost, and biochar work together so the soil is healthier each season. It\'s farming that gives back more than it takes.',
  },
  {
    icon: Truck,
    title: 'A Farm People Already Know',
    text: 'Flow Farm delivers fresh vegetables and fruits to CSA members and sells at local farmers markets. The relationships, the reputation, and the revenue are already in place — ready for the next steward to continue or expand.',
  },
];

function PillarCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2, delay: index * 0.1, ease }}
      style={{ padding: 'clamp(24px, 3vw, 36px)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(76,110,60,0.1)' }}>
          <Icon className="w-4 h-4" strokeWidth={1.5} style={{ color: 'rgba(76,110,60,0.7)' }} />
        </div>
        <h4 className="font-serif" style={{ fontSize: 'clamp(1.1rem, 1.4vw, 1.3rem)', fontWeight: 400, lineHeight: 1.2, color: '#1C1C1A', margin: 0, letterSpacing: '0.01em' }}>{item.title}</h4>
      </div>
      <p className="font-sans" style={{ fontSize: 'clamp(0.78rem, 0.86vw, 0.86rem)', lineHeight: 1.8, color: 'rgba(0,0,0,0.48)', margin: 0 }}>{item.text}</p>
    </motion.div>
  );
}

export default function VeganicStewardship() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  return (
    <section id="sustainability-section" data-nav-theme="light" className="w-full" style={{ background: '#F6F4EF' }}>

      {/* Hero image — biochar / farm */}
      <div ref={heroRef} className="relative w-full overflow-hidden" style={{ height: 'clamp(50vh, 60vh, 70vh)' }}>
        <motion.img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b18d982e7_D4954975-B67E-4DBB-B6A4-03D6449142D0_1_105_c.jpeg"
          alt="Potato rows in full bloom at Flow Farm"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 40%', filter: 'saturate(0.92) contrast(1.06) brightness(0.98) sepia(0.02)', y: imgY, willChange: 'transform' }}
        />
        <div className="absolute inset-0 flex flex-col justify-end" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.08) 100%), radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.15) 100%)', padding: 'clamp(24px, 4vw, 52px)' }}>
          <span className="block font-sans uppercase" style={{ fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.38em', color: 'rgba(255,255,255,0.48)', marginBottom: '6px' }}>The Agricultural Operation</span>
          <h3 className="font-serif" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 3.2rem)', fontWeight: 300, lineHeight: 1.1, color: '#fff', letterSpacing: '0.02em', textShadow: '0 2px 12px rgba(0,0,0,0.35)', marginBottom: '8px' }}>
            Veganic. Established. Running.
          </h3>
          <p className="font-sans" style={{ fontSize: 'clamp(0.8rem, 0.92vw, 0.9rem)', lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', maxWidth: '520px', margin: 0 }}>
            Regeneratively building healthy soil since 2009. About half the property operates as a USDA-registered fruit and vegetable farm (Moore County, NC — FSA #5893) using organic and sustainable veganic practices — no animal byproducts, no synthetic inputs, just plants feeding plants. The other half remains wooded, ideal for future development or investment. CSA members, farmers market customers, and the infrastructure to keep it all going. The farm doesn't just sustain the land. It sustains the zoning.
          </p>
        </div>
      </div>

      {/* Editorial — what veganic means */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8" style={{ paddingTop: 'clamp(48px, 6vh, 80px)', paddingBottom: 'clamp(24px, 3vh, 40px)' }}>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: 0.1, ease }}
          className="font-display"
          style={{ fontSize: 'clamp(1.8rem, 4.5vw, 3.6rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '0.01em', color: '#1C1C1A', marginBottom: 'clamp(20px, 3vh, 32px)' }}
        >
          Veganic Farming, Defined
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
          className="font-sans"
          style={{ fontSize: 'clamp(0.92rem, 1.06vw, 1.02rem)', lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', margin: 0 }}
        >
          Organic agriculture prohibits synthetic pesticides, chemical fertilizers, and genetically modified organisms. Veganic agriculture goes further — eliminating all animal-derived inputs as well. No manure, no blood meal, no bone meal. Soil fertility is maintained entirely through plant-based compost, mineral amendments, cover cropping, and biochar. Flow Farm has been regeneratively building healthy soil since 2009, and built its own kiln to produce biochar on-site — a carbon-rich soil amendment especially effective in North Carolina's heavy clay. As a registered USDA farm (Moore County, NC — FSA #5893), the operation manages three acres of production farmland under this discipline year-round. A state-of-the-art geothermal high tunnel enables year-round production, including pineapples, avocados, and citrus.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.35, ease }}
          className="font-serif italic"
          style={{ fontSize: 'clamp(0.86rem, 1vw, 0.98rem)', lineHeight: 1.6, fontWeight: 300, color: 'rgba(0,0,0,0.32)', marginTop: 'clamp(16px, 2vh, 24px)', maxWidth: '520px', borderLeft: '2px solid rgba(76,110,60,0.15)', paddingLeft: 'clamp(12px, 1.5vw, 18px)' }}
        >
          Few farms in the Southeast operate at this standard. Flow Farm is one of them.
        </motion.p>
      </div>

      {/* Four pillars */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8" style={{ paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1" style={{ borderRadius: '12px', overflow: 'hidden', background: '#F6F4EF', border: '1px solid rgba(164,138,106,0.10)', boxShadow: '0 8px 32px rgba(28,28,26,0.03)' }}>
          {PILLARS.map((item, i) => (
            <PillarCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Business opportunity callout */}
      <div style={{ background: 'linear-gradient(to bottom, #F6F4EF 0%, #ECE7DF 15%, #ECE7DF 85%, #F6F4EF 100%)', padding: 'clamp(40px, 5vh, 64px) 0' }}>
        <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease }}
            className="block font-sans uppercase"
            style={{ fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.38em', color: 'rgba(0,0,0,0.28)', marginBottom: 'clamp(14px, 2vh, 22px)' }}
          >
            What the Farm Makes Possible
          </motion.span>

          <motion.h3
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.1, ease }}
          className="font-serif"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2.6rem)', fontWeight: 400, lineHeight: 1.1, color: '#1C1C1A', letterSpacing: '0.01em', marginBottom: 'clamp(16px, 2vh, 24px)' }}
          >
            The Zoning Follows the Farm
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.2, ease }}
            className="font-sans mx-auto"
            style={{ fontSize: 'clamp(0.88rem, 1vw, 0.98rem)', lineHeight: 1.85, color: 'rgba(0,0,0,0.48)', maxWidth: '540px', margin: '0 auto' }}
          >
            With an established North Carolina Qualifying Farmer Exemption already in place, the farm supports potential tax advantages and reduced operating costs. CSA members, market regulars, a high tunnel, a biochar kiln — all running. The farm's continued operation is what unlocks everything else: new structures, hospitality ventures, equestrian operations, a generational compound. Whether envisioned as a luxury escape, income-producing venture, or working farm, the next owner inherits a running operation and the freedom to build on it.
          </motion.p>
        </div>
      </div>
    </section>
  );
}