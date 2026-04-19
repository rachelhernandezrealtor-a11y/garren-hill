import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, animate, useInView } from 'framer-motion';
import { X, ChevronRight } from 'lucide-react';
import { homeEditorialContent } from './homeEditorialContent';

const ease = [0.16, 1, 0.3, 1];

const STATS = [
  { value: '1200', label: 'Amp Service', eyebrow: 'Electrical' },
  { value: '14.3', label: 'kW Solar Array', eyebrow: 'Power' },
  { value: '30', label: 'kW Generator', eyebrow: 'Backup' },
  { value: '20', label: 'Geothermal Wells', eyebrow: 'Climate' },
  { value: '50', label: 'GPM Private Well', eyebrow: 'Water' },
];

const GALLERY_TILES = [
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/c4eacc80f_MechanicalRoom.jpg',
    alt: 'Water Filtration System',
    caption: 'Water & Fire Systems',
    title: 'Water Security & Protection',
    description: 'Private Water Well (up to 50 gpm), Clear Water Solutions whole house commercial water filtration, and Private Septic (2x 1,500 gallon with pump). Includes a whole house fire sprinkler system and 2 Water Furnace superheaters providing geothermal hot water.',
    wide: true,
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/be4149347_CrawlSpaceSolarBatteries.jpg',
    alt: 'Crawl Space Solar Batteries',
    caption: 'Solar Battery System',
    title: 'Power Independence',
    description: '30 kW Kohler generator with 2x 1,000 gallon buried propane tanks. 14.3 kW solar array (61 Samsung panels) and Sunny Island 10k Solar Battery Backup system for true off-grid resilience.',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/29eea450c_CrawlspaceHvac.jpg',
    alt: 'Crawl Space HVAC',
    caption: 'Geothermal HVAC',
    title: 'Climate & Air Quality',
    description: 'HVAC Design by Energy Innovations. Geothermal loop with 20 deep wells (each 300 ft), powering 5 interconnected Water Furnace zones. Lennox air purification and Energy Recovery Ventilator (ERV) system.',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/9974eff2c_MechanicalRoom2.jpg',
    alt: 'Mechanical Room',
    caption: 'Conditioned Crawl Space',
    title: 'Fully Accessible Conditioned Space',
    description: 'Energy efficient insulation and mylar wrap throughout. Sealed and fully conditioned crawl space below the full footprint. All mechanicals are fully accessible within conditioned space. Includes dual VacuMaid S2400 whole house central vacuum.',
  },
  {
    src: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/2ab9de092_MechanicalRoom3.jpg',
    alt: 'Electrical Panels',
    caption: 'Smart Automation & Security',
    title: 'Smart Automation & Security',
    description: 'Whole "smart house" Control 4 audio, video, and lighting system. Whole house alarm system, whole campus Wi-Fi, and a Brown Safe (jewelry + vault door) for ultimate security.',
    pdfUrl: 'https://docs.google.com/viewer?url=https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/50cf69b77_ElectricalDesign.pdf',
    pdfLabel: 'View Electrical Design Plans',
  },
];

function AnimatedStatValue({ value }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numericMatch = value.match(/[\d.]+/);
  const numberValue = numericMatch ? Number(numericMatch[0]) : null;
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 88, damping: 18, mass: 0.7 });
  const roundedValue = useTransform(springValue, (latest) => {
    if (numberValue === null) return value;
    const decimals = numberValue % 1 !== 0 ? 1 : 0;
    return value.replace(/[\d.]+/, latest.toFixed(decimals));
  });

  useEffect(() => {
    if (numberValue === null || !isInView) return;
    motionValue.set(0);
    const controls = animate(0, numberValue, {
      duration: 2.2,
      delay: 0.2,
      ease,
      onUpdate: (latest) => motionValue.set(latest),
    });
    return () => controls.stop();
  }, [motionValue, numberValue, isInView]);

  if (numberValue === null) return <span ref={ref}>{value}</span>;
  return <motion.span ref={ref}>{roundedValue}</motion.span>;
}

export default function EngineeredInfrastructureSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="bg-black text-white relative z-20">

      {/* ─── HERO HEADER + ANIMATED STATS ─── */}
      <div className="px-6 sm:px-10 lg:px-16 mx-auto max-w-7xl relative">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="rounded-[22px] overflow-visible bg-transparent"
        >
          <div className="relative">

            <div className="p-0 sm:p-0 lg:p-0">
              <p className="mb-4 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">Engineered Infrastructure</p>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <h2 className="mb-6 max-w-[16ch] text-balance font-display text-[clamp(2.6rem,5vw,4.4rem)] font-medium leading-[1.05] tracking-tight text-white drop-shadow-xl">The Private Infrastructure Core.</h2>
                <p className="max-w-[46ch] font-sans text-[1rem] leading-[1.85] text-white/80 mb-0">Beneath the estate lies a fully encapsulated, conditioned mechanical suite designed to support over 12,000 square feet of integrated living. Engineered for resilience, independence, and long-term performance.</p>
              </div>

              {/* Animated Stats Row */}
              <div className="relative w-full mt-8 pt-6 border-t border-white/10 overflow-x-auto overflow-y-hidden flex" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
                <div className="flex w-max min-w-full flex-nowrap items-start gap-8 md:w-auto md:min-w-0 xl:gap-16 pb-2">
                  {STATS.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}
                      whileHover={{ y: -4 }}
                      className="group relative flex min-w-[140px] shrink-0 flex-col items-start text-left sm:min-w-0"
                    >
                      <div className="relative w-full border-l border-white/20 pl-5 sm:pl-6 py-2">
                        <motion.div aria-hidden="true" initial={{ scaleY: 0, opacity: 0.35 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 + i * 0.09, ease }} className="absolute left-0 top-0 h-full w-[1.5px] origin-top bg-gradient-to-b from-white via-white/50 to-transparent" />
                        <span className="block font-sans uppercase whitespace-nowrap text-[#C9B18F] mb-3" style={{ fontSize: 'clamp(0.48rem, 0.65vw, 0.6rem)', fontWeight: 700, letterSpacing: '0.34em' }}>{stat.eyebrow}</span>
                        <span className="block font-serif whitespace-nowrap" style={{ fontSize: 'clamp(2.35rem, 3.7vw, 3.65rem)', fontWeight: 400, letterSpacing: '-0.05em', lineHeight: 0.92, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>
                          <AnimatedStatValue value={stat.value} />
                        </span>
                        <span className="mt-4 block font-sans uppercase" style={{ fontSize: 'clamp(0.58rem, 0.82vw, 0.72rem)', fontWeight: 600, letterSpacing: '0.28em', lineHeight: 1.35, color: 'rgba(255,255,255,0.72)', maxWidth: '14ch' }}>{stat.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── FULL-BLEED PARALLAX DIVIDER IMAGE ─── */}
      <div className="relative w-full h-[50vh] overflow-hidden">
        <img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/6cf8e0882_Crawl.jpg"
          alt="Encapsulated mechanical suite"
          className="w-full h-[130%] object-cover absolute top-[-15%]"
          style={{ filter: 'brightness(0.65) contrast(1.1) saturate(0.9)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease }}
          className="absolute inset-0 flex items-center justify-center text-center px-6"
        >
          <p className="font-display text-[clamp(1.4rem,2.5vw,2.2rem)] italic font-light text-white/90 max-w-[28ch] leading-[1.35] drop-shadow-xl">
            "A mechanical core engineered to outlast, outperform, and outlive any challenge."
          </p>
        </motion.div>
      </div>

      {/* ─── BENTO PHOTO GALLERY ─── */}
      <div className="px-6 pt-12 pb-4 sm:px-10 lg:px-16 lg:pt-16 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease }}
          className="mb-8"
        >
          <p className="font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F] mb-3">
            Systems Gallery
          </p>
          <p className="font-sans text-[0.95rem] leading-[1.8] text-white/60 max-w-[48ch]">
            Click any system to explore technical specifications in detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.1, ease }}
          className="grid grid-cols-2 gap-2 sm:gap-3"
        >
          {GALLERY_TILES.map((tile, i) => (
            <button
              key={i}
              onClick={() => setSelected(tile)}
              className={`group relative overflow-hidden cursor-pointer block rounded-2xl transition-all duration-500 text-left border border-[#C9B18F]/20 bg-black/30 backdrop-blur-sm ${tile.wide ? 'col-span-2' : 'col-span-1'}`}
              style={{ aspectRatio: tile.wide ? '21/9' : '3/2', boxShadow: '0 18px 50px rgba(0,0,0,0.35)' }}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="cinematic-vignette absolute inset-0" aria-hidden="true" />
              {/* Hover reveal accent line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#C9B18F] group-hover:w-full transition-all duration-700" />
              <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-7">
                <p className="font-sans text-[0.6rem] sm:text-[0.65rem] font-bold tracking-[0.3em] uppercase text-[#C9B18F] mb-1">
                  {tile.caption}
                </p>
                <p className="font-display text-[0.95rem] sm:text-[1.1rem] font-medium text-white leading-[1.2] mb-0">
                  {tile.title}
                </p>
                <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="font-sans text-[0.58rem] uppercase tracking-[0.2em] text-white/60">Explore</span>
                  <ChevronRight className="w-3 h-3 text-white/50" />
                </div>
              </div>
            </button>
          ))}
        </motion.div>
      </div>

      {/* ─── HIGHLIGHTS GRID ─── */}
      <div className="px-6 py-14 sm:px-10 lg:px-16 lg:py-20 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {homeEditorialContent.systemsHighlights.map((item, index) => (
            <div key={index}>
              <div className="mb-4 h-px w-10 bg-[#C9B18F]/50" />
              <p className="mb-0 font-sans text-[0.95rem] leading-[1.85] text-white/60">{item}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ─── DETAIL MODAL ─── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35, ease }}
              className="bg-[#0d0d0d] border border-white/10 text-white max-w-2xl w-full shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img src={selected.src} alt={selected.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 sm:p-8 md:p-10">
                <p className="font-sans text-[0.58rem] font-bold tracking-[0.35em] uppercase text-[#C9B18F] mb-3">
                  {selected.caption}
                </p>
                <h3 className="font-display text-[1.5rem] sm:text-[1.8rem] font-medium text-white mb-4 leading-[1.1]">
                  {selected.title}
                </h3>
                <div className="h-px w-10 bg-white/10 mb-5" />
                <p className="font-sans text-[0.95rem] font-light text-white/70 leading-[1.85]">
                  {selected.description}
                </p>
                {selected.pdfUrl && (
                  <a
                    href={selected.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-6 font-sans text-[0.65rem] tracking-[0.18em] uppercase font-semibold border border-white/20 text-white px-5 py-3 hover:bg-white hover:text-black transition-all duration-300 no-underline"
                  >
                    {selected.pdfLabel}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}