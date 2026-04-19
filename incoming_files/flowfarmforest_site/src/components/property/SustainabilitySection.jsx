import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Sun, Droplets, Wind, ShieldCheck, Lock } from 'lucide-react';
import EditorialImage from './EditorialImage';
import EditorialQuote from './EditorialQuote';
import { fadeUp, stagger, revealViewport } from './motionConfig';

const topSystems = [
  { icon: Wind, title: 'Central Vacuum System', subtitle: 'CONCEALED IN-WALL NETWORK' },
  { icon: ShieldCheck, title: 'Security & Safety', subtitle: 'WHOLE-HOUSE ALARM · FIRE SPRINKLERS' },
  { icon: Lock, title: 'Brown Safe', subtitle: 'VAULT DOOR · JEWELRY SAFE IN MASTER CLOSET' }
];

const energySystems = [
  { icon: Zap, title: 'Whole-House Generator', subtitle: '30 KW KOHLER BACKUP POWER' },
  { icon: Sun, title: 'Solar Array', subtitle: '14.3 KW SOLAR SYSTEM' },
  { icon: Droplets, title: 'Private Well', subtitle: 'UP TO 50 GPM OUTPUT' },
  { icon: Wind, title: 'Geothermal System', subtitle: '20 DEEP WELLS · 5 HVAC ZONES' },
  { icon: Zap, title: 'Power Independence', subtitle: '30 KW BACKUP · 14.3 KW SOLAR WITH BATTERY STORAGE' },
  { icon: Droplets, title: 'Clear Water Solutions', subtitle: 'WHOLE HOUSE COMMERCIAL GRADE WATER FILTRATION SYSTEM' }
];


/* ─── EASY IMAGE SWAP ─────────────────────────────────
   Change any src below to update photos.
   ──────────────────────────────────────────────────── */
const IMAGES = {
  smartHome: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/2ab9de092_MechanicalRoom3.jpg',
  solar: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/be4149347_CrawlSpaceSolarBatteries.jpg',
  mechanical: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/9974eff2c_MechanicalRoom2.jpg',
};

export default function SustainabilitySection() {
  return (
    <section id="sustainability" className="bg-[#fcfaf6] py-14 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-8 lg:px-12 border-t border-black/5">
      <div className="max-w-4xl mx-auto">

        {/* ── SECTION HEADER ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className="mb-8 sm:mb-14 md:mb-20 max-w-3xl">
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-foreground/35 font-medium block mb-3">Systems & Technology</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground leading-[1.02] tracking-[-0.015em]">
            Engineered for Independence
          </h2>
          <p className="max-w-2xl font-sans text-sm sm:text-base text-foreground/60 leading-[2] mb-0">
            Behind the beauty is a deeply considered operating core — power, water, automation, and mechanical systems presented with the same care as the architecture itself.
          </p>
          <div className="h-px w-12 bg-foreground/12 mt-5" />
        </motion.div>

        {/* ── SMART HOME + IMAGE ── */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-12 md:gap-16 items-start mb-10 sm:mb-18 md:mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}
            className="bg-[rgba(26,24,22,0.94)] text-background p-5 sm:p-8 border border-black/10 shadow-[0_14px_36px_rgba(0,0,0,0.12)]"
          >
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-background/40 block mb-3 font-normal">Connected Living</span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-[1.7rem] font-semibold text-background mb-4 leading-[1.2]">
              Smart Home + Enterprise-Grade Connectivity
            </h3>
            <p className="font-sans text-[13px] sm:text-[14px] text-background/55 leading-[1.95] mb-5">
              Whole-house audio with integrated speakers in every room, including the screened porch. Layered lighting throughout offers dimmers, spotlights, and custom scenes controlled by phone or wall switch. A comprehensive Control4 system manages audio, video, and lighting, while enterprise-grade Araknis networking delivers secure, estate-wide connectivity.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Whole-home audio', 'Lighting scenes', 'Control4 platform', 'Araknis network'].map((tag) => (
                <span key={tag} className="px-2.5 py-1 border border-background/15 text-[9px] tracking-[0.12em] uppercase text-background/50 font-sans">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className="md:mt-10">
            <EditorialImage src={IMAGES.smartHome} alt="Smart home system" aspect="5/4" caption="Integrated Technology" />
          </motion.div>
        </div>

        {/* ── PULL QUOTE ── */}
        <div className="max-w-2xl mb-12 sm:mb-18 md:mb-24">
          <EditorialQuote text="Resilience isn't a feature — it's the foundation on which everything else is built" />
        </div>

        {/* ── SYSTEMS LIST WITH IMAGE ── */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-start mb-12 sm:mb-18 md:mb-24">
          <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-foreground/40 font-medium block mb-3">Home Systems</span>
            <div className="h-px bg-foreground/10 mb-5" />
            {topSystems.map((system, index) => (
              <div key={index} className="flex items-center gap-4 py-3.5 border-b border-foreground/[0.05]">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full bg-foreground/[0.03]">
                  <system.icon className="w-3.5 h-3.5 text-foreground/30" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-sm sm:text-base font-medium text-foreground leading-tight">{system.title}</h3>
                  <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.15em] text-foreground/28 mt-0.5">{system.subtitle}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className="md:mt-6">
            <EditorialImage src={IMAGES.mechanical} alt="Mechanical systems" aspect="5/4" caption="Estate Infrastructure" />
          </motion.div>
        </div>

        {/* ── ENERGY INFRASTRUCTURE + STAGGERED IMAGES ── */}
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-foreground/40 font-medium block mb-2">Energy & Water Independence</span>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground leading-[1.1] mb-4">Resilience Infrastructure</h3>
          <div className="h-px bg-foreground/8 mb-6 sm:mb-8" />

          <div className="mb-6 sm:mb-8 p-4 sm:p-5 bg-foreground/[0.02] border border-foreground/6">
            <p className="font-sans text-[13px] sm:text-[14px] text-foreground/45 leading-[1.95]">
              A robust, high-capacity septic system designed for a large residential load of 7 bedrooms. The system is engineered to handle 840 gallons per day—calculated at 120 gallons per day per bedroom—ensuring reliable wastewater management while maintaining the residence's operational independence and environmental stewardship.
            </p>
          </div>

          {/* Energy cards + image */}
          <div className="grid grid-cols-12 gap-3 sm:gap-4">
            <div className="col-span-12 lg:col-span-8">
              <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={stagger}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
              >
                {energySystems.map((system, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="p-4 sm:p-5 border border-foreground/[0.05] hover:border-foreground/12 transition-all duration-500 hover:shadow-sm"
                  >
                    <div className="w-7 h-7 flex items-center justify-center rounded-full bg-foreground/[0.03] mb-3">
                      <system.icon className="w-3.5 h-3.5 text-foreground/25" strokeWidth={1.5} />
                    </div>
                    <h4 className="font-serif text-sm sm:text-[15px] font-medium text-foreground leading-tight">{system.title}</h4>
                    <p className="font-sans text-[8px] sm:text-[9px] tracking-[0.15em] text-foreground/28 mt-1">{system.subtitle}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div variants={fadeUp} className="col-span-12 lg:col-span-4 lg:mt-6">
              <EditorialImage src={IMAGES.solar} alt="Solar panels" aspect="5/4" caption="14.3 kW Solar Array" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}