import React from 'react';
import { motion } from 'framer-motion';
import EditorialQuote from './EditorialQuote';
import { fadeUp, stagger, revealViewport } from './motionConfig';

/* ─── EASY IMAGE SWAP ─────────────────────────────────
   Change any src below to update photos.
   ──────────────────────────────────────────────────── */
const IMAGES = {
  field:       "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
  greenhouse:  "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
  fieldTrip:   "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/e63dcb222_Screenshot2026-03-03at75255AM.jpg",
  soil:        "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80",
};

export default function StewardshipSection({
  heading = "Stewardship Over Time",
  paragraph1 = "Flow Farm has been cultivated through years of steady, intentional care. The land was approached with restraint and attentiveness, allowing its natural systems to strengthen and mature over time rather than forcing rapid change.",
  paragraph2 = "Agricultural areas were gradually established using regenerative, veganic practices that support soil vitality, ecological balance, and long-term productivity. Each season contributed to the stability and resilience that now define the property.",
  paragraph3 = "The agricultural foundation is established, while meaningful opportunity remains for expansion, refinement, or entirely new direction.",
  signature = "Prepared with care • Ready for what comes next",
  video1Title = "Origins of Flow Farm",
  video1Id = "cCLhlfSRqXw",
  video2Title = "Stewardship and Cultivation",
  video2Id = "T0-XXHBXbZM",
  video3Title = "Flow Farm Field Trip",
  video3Id = "9pbdesXTyGg",
  closingStatement = "What has been established here is rare. What comes next is entirely yours.",
  onContentUpdate = () => {}
}) {
  return (
    <section className="w-full bg-white py-16 sm:py-24 md:py-32 lg:py-40 px-5 sm:px-8 lg:px-12">
      
      {/* ── HEADER ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}
        className="max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-20 text-center"
      >
        <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-foreground/35 font-medium block mb-4">Heritage</span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-5 sm:mb-6 leading-[1.02] tracking-[-0.015em]">
          {heading}
        </h2>
        <div className="h-px w-12 bg-foreground/10 mx-auto" />
      </motion.div>

      {/* ── IMAGE LEFT + TEXT RIGHT ── */}
      <div className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-22">
        <div className="grid md:grid-cols-5 gap-8 sm:gap-12 md:gap-16 items-start">
          <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={stagger} className="md:col-span-2 flex flex-col gap-3 sm:gap-4">
            <motion.div variants={fadeUp}>
              <figure>
                <div className="overflow-hidden bg-foreground/[0.02] group" style={{ aspectRatio: '3/4', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <img src={IMAGES.field} alt="Estate fields" className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02]" loading="lazy" decoding="async" />
                </div>
                <figcaption className="mt-3 font-sans text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-foreground/25 font-normal">Estate Landscape</figcaption>
              </figure>
            </motion.div>
            <motion.div variants={fadeUp} className="md:ml-4">
              <figure>
                <div className="overflow-hidden bg-foreground/[0.02] group" style={{ aspectRatio: '4/3', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <img src={IMAGES.soil} alt="Rich soil" className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02]" loading="lazy" decoding="async" />
                </div>
                <figcaption className="mt-3 font-sans text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-foreground/25 font-normal">Regenerative Soil</figcaption>
              </figure>
            </motion.div>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className="md:col-span-3 md:mt-8">
            <div className="space-y-4 sm:space-y-5">
              <p className="font-sans text-[13px] sm:text-[14px] leading-[2] text-foreground/45">{paragraph1}</p>
              <p className="font-sans text-[13px] sm:text-[14px] leading-[2] text-foreground/45">{paragraph2}</p>
              <p className="font-sans text-[13px] sm:text-[14px] leading-[2] text-foreground/45">{paragraph3}</p>
            </div>
            <div className="w-8 h-px bg-foreground/10 mt-7 mb-3" />
            <span className="font-sans text-[7px] tracking-[0.35em] uppercase text-foreground/20 font-normal">{signature}</span>
          </motion.div>
        </div>
      </div>

      {/* ── PULL QUOTE ── */}
      <div className="max-w-2xl mx-auto mb-12 sm:mb-16 md:mb-22 px-2">
        <EditorialQuote text="Each season contributed to the stability and resilience that now define this property" />
      </div>

      {/* ── VIDEO GRID ── */}
      <div className="max-w-3xl mx-auto mb-12 sm:mb-16 md:mb-22 grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {[{ title: video1Title, id: video1Id }, { title: video2Title, id: video2Id }].map((video) => (
          <motion.div key={video.id} initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-foreground/30 block mb-2.5">{video.title}</span>
            <div className="overflow-hidden bg-black aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── IMAGE PAIR + FIELD TRIP ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={stagger}
        className="max-w-4xl mx-auto mb-12 sm:mb-16 md:mb-22"
      >
        <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-5">
            <figure>
              <div className="overflow-hidden bg-foreground/[0.02] group" style={{ aspectRatio: '3/4', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <img src={IMAGES.greenhouse} alt="Greenhouse" className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02]" loading="lazy" decoding="async" />
              </div>
              <figcaption className="mt-3 font-sans text-[7px] sm:text-[8px] tracking-[0.3em] uppercase text-foreground/25 font-normal">Cultivation Greenhouse</figcaption>
            </figure>
          </motion.div>
          <motion.div variants={fadeUp} className="col-span-12 md:col-span-7 md:mt-8">
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-foreground/30 block mb-2.5 text-center">{video3Title}</span>
            <figure>
              <div className="overflow-hidden bg-foreground/[0.02] group" style={{ aspectRatio: '16/9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <img src={IMAGES.fieldTrip} alt={video3Title} className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02]" loading="lazy" decoding="async" />
              </div>
            </figure>
          </motion.div>
        </div>
      </motion.div>

      {/* ── CLOSING STATEMENT ── */}
      <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp} className="max-w-xl mx-auto text-center">
        <div className="w-10 h-px bg-foreground/10 mx-auto mb-6 sm:mb-8" />
        <p className="font-serif text-xl sm:text-2xl md:text-[1.75rem] font-light text-foreground/70 leading-[1.35] italic tracking-[0.005em]">
          {closingStatement}
        </p>
      </motion.div>
    </section>
  );
}