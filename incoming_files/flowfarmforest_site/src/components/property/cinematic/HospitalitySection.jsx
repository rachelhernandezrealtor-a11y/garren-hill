import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, Bed, UtensilsCrossed, Trees, Wifi, ShieldCheck } from 'lucide-react';

const ease = [0.22, 0.1, 0.28, 1];

const SCENARIOS = [
  {
    icon: Bed,
    title: 'Boutique Inn or B\u2009&\u2009B',
    text: 'Five ensuite bedrooms across the main residence, a fully independent guest house, and a cabana with kitchenette and full bath — each with its own climate zone and smart controls. The estate can comfortably accommodate multiple guest parties in complete privacy.',
  },
  {
    icon: UtensilsCrossed,
    title: 'Culinary Retreats & Events',
    text: 'The main residence offers a professional-grade kitchen with 60\u2033 Wolf range, Sub-Zero refrigeration, and a dedicated scullery — and the 3,372 SF guest house has the space and infrastructure for a formal commercial kitchen. With over a million visitors a year arriving in Pinehurst, the estate supports everything from private chef experiences to full-scale farm-to-table dining.',
  },
  {
    icon: Trees,
    title: 'Farm, Retreats & Agritourism',
    text: 'A working veganic farm with loyal CSA members and farmers market customers — already growing and already selling. Add farm dinners, wellness weekends, or agritourism experiences and you have something no one else in the region can offer.',
  },
  {
    icon: Home,
    title: 'Corporate or Creative Retreat',
    text: 'A vaulted executive office with private stair, a cabana boardroom, distributed audio/video, campus-wide Wi-Fi, and a whole-house Control 4 system make this a turnkey setting for off-site meetings, workshops, or production residencies.',
  },
  {
    icon: Wifi,
    title: 'Smart Infrastructure at Scale',
    text: '600 amps. 189 dimmable circuits. Five geothermal zones. Campus-wide Wi-Fi and Savant control. Every space — from guest rooms to outdoor entertaining areas — operates on its own smart zone, ready for commercial-grade hospitality without a single infrastructure upgrade.',
  },
  {
    icon: ShieldCheck,
    title: 'Resilient & Independent',
    text: 'Private deep well with commercial water filtration, dual septic, 14.3 kW solar with battery backup, a 30 kW Kohler generator, and a whole-house fire sprinkler system. The estate operates independently of municipal utilities — a critical advantage for continuous hospitality operations.',
  },
];

function ScenarioCard({ item, index }) {
  const Icon = item.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.2, delay: index * 0.08, ease }}
      className="flex flex-col"
      style={{ padding: 'clamp(24px, 3vw, 36px)', borderRadius: '10px', background: '#F6F4EF', border: '1px solid rgba(164,138,106,0.10)', boxShadow: '0 6px 24px rgba(28,28,26,0.03)' }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.03)' }}>
          <Icon className="w-3.5 h-3.5 text-black/30" strokeWidth={1.5} />
        </div>
        <h4 className="font-serif" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.15rem)', fontWeight: 400, lineHeight: 1.2, color: '#1C1C1A', margin: 0 }}>{item.title}</h4>
      </div>
      <p className="font-sans" style={{ fontSize: 'clamp(0.76rem, 0.84vw, 0.84rem)', lineHeight: 1.85, color: 'rgba(0,0,0,0.40)', margin: 0 }}>{item.text}</p>
    </motion.div>
  );
}

function ParallaxDivider() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ height: 'clamp(28vh, 36vh, 44vh)' }}>
      <motion.img
        src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4d2f938a8_patio2.jpg"
        alt="Screened porch — outdoor entertaining"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'saturate(0.82) brightness(0.72)', y: imgY, willChange: 'transform', scale: 1.15 }}
      />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(247,246,243,1) 0%, rgba(247,246,243,0) 20%, rgba(247,246,243,0) 80%, rgba(247,246,243,1) 100%)' }} />
    </div>
  );
}

export default function HospitalitySection() {
  return (
    <section data-nav-theme="light" className="w-full" style={{ background: 'linear-gradient(to bottom, #F6F4EF 0%, #F6F4EF 90%, #F6F4EF 100%)' }}>
      <ParallaxDivider />
      <div style={{ padding: 'clamp(80px, 12vh, 140px) 0' }}>
      {/* Header */}
      <div className="max-w-3xl mx-auto px-6 sm:px-8 text-center" style={{ marginBottom: 'clamp(40px, 5vh, 64px)' }}>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease }}
          className="block font-sans uppercase"
          style={{ fontSize: '0.56rem', fontWeight: 500, letterSpacing: '0.4em', color: 'rgba(0,0,0,0.26)', marginBottom: 'clamp(14px, 2vh, 22px)' }}
        >
          Three Miles from Pinehurst Resort
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.1, ease }}
          className="font-display"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, lineHeight: 1.06, letterSpacing: '0.01em', color: '#1C1C1A', marginBottom: 'clamp(18px, 2.5vh, 28px)' }}
        >
          A Global Destination at Your Gate
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.2, ease }}
          className="font-sans mx-auto"
          style={{ fontSize: 'clamp(0.84rem, 0.95vw, 0.94rem)', lineHeight: 1.85, color: 'rgba(0,0,0,0.40)', maxWidth: '500px', margin: '0 auto' }}
        >
          Pinehurst draws over a million visitors a year. This estate sits three miles from the resort, on 15 USDA-zoned acres with the infrastructure for hospitality, retreats, and agritourism.
        </motion.p>
      </div>

      {/* Scenario grid */}
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SCENARIOS.map((item, i) => (
            <ScenarioCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Closing quote */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.3, ease }}
        className="max-w-2xl mx-auto px-6 sm:px-8 text-center"
        style={{ marginTop: 'clamp(48px, 6vh, 80px)' }}
      >
        <p className="font-serif italic" style={{ fontSize: 'clamp(0.88rem, 1.1vw, 1.02rem)', lineHeight: 1.6, fontWeight: 300, color: 'rgba(0,0,0,0.28)', margin: 0 }}>
          The infrastructure is in place. The zoning is secured. What comes next is shaped by whoever walks through the door.
        </p>
      </motion.div>
      </div>
    </section>
  );
}