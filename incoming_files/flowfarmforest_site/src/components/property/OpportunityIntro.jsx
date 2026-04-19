import React from 'react';
import { motion } from 'framer-motion';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const lineIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
};

const IMAGES = [
{ src: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7711a3672_tunnelgood.jpg", alt: "Estate greenhouse" },
{ src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/1e0ac9873_2764143276991492642.jpg", alt: "Muscadine grapevines" },
{ src: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/ab239b0e7_4603172767521858802.jpg", alt: "Flow beehive" },
{ src: "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/41de5d5d3_HarvestBox.png", alt: "Estate harvest box" }];


export default function OpportunityIntro() {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Forest background image band */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b5064633b_JPEGimage.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="sync" />
        
        <div className="absolute inset-0" style={{ background: 'rgba(255,255,255,0.88)' }} />
      </div>

      <div
        className="relative z-10 flex flex-col items-center text-center px-6 sm:px-8"
        style={{ paddingTop: 'clamp(64px, 9vh, 110px)', paddingBottom: 'clamp(48px, 6vh, 80px)' }}>
        
        {/* ── Headline ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          className="max-w-2xl">
          
          {/* Eyebrow */}
          <motion.span
            variants={lineIn}
            className="block font-sans text-[9px] sm:text-[10px] tracking-[0.45em] uppercase text-foreground/30 font-medium mb-6 sm:mb-8">
            
            Private Estate Opportunity
          </motion.span>

          {/* Main Headline */}
          <motion.h2
            variants={lineIn}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-semibold text-foreground leading-[1.12] mb-4 sm:mb-5">
            
            Private by Nature.<br />
            Pinehurst by Proximity.
          </motion.h2>

          {/* Stat Strip */}
          <motion.div variants={lineIn} className="flex flex-wrap justify-center gap-x-8 sm:gap-x-12 gap-y-4 mb-6 sm:mb-8">
            {[
            { label: "USDA Zoned", value: "15 Acres" },
            { label: "Veganic Farm", value: "3 Acre" },
            { label: "to Pinehurst", value: "3 Miles" },
            { label: "Price", value: "$5.25M" }].
            map((stat, idx) =>
            <div key={idx} className="flex flex-col items-center">
                <span className="font-serif font-semibold text-base sm:text-lg text-foreground leading-none tracking-[-0.01em]">{stat.value}</span>
                <span className="font-sans text-[7px] sm:text-[8px] uppercase tracking-[0.3em] text-foreground/30 mt-1.5 font-normal">{stat.label}</span>
              </div>
            )}
          </motion.div>

          {/* Divider */}
          <motion.div variants={lineIn} className="w-10 h-px bg-foreground/12 mx-auto mb-6 sm:mb-8" />

          <motion.p
            variants={lineIn}
            className="font-sans text-foreground/75 font-light leading-relaxed"
            style={{ fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)', letterSpacing: '0.01em', maxWidth: '540px', margin: '0 auto' }}>
            
            The agricultural foundation is established, while meaningful opportunity remains for expansion, refinement, or entirely new direction. What has been created here is rare. What comes next is entirely yours.
          </motion.p>
        </motion.div>

        {/* ── 4-Image Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="w-full max-w-2xl mt-10 sm:mt-12">
          
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {IMAGES.map((img, idx) =>
            <motion.div
              key={idx}
              variants={lineIn}
              className="overflow-hidden"
              style={{ aspectRatio: '1' }}>
              
                <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                style={{ filter: 'saturate(0.88) brightness(0.98)' }}
                loading="lazy"
                decoding="async" />
              
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* ── Closing Lines ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={stagger}
          className="flex flex-col items-center gap-6 sm:gap-8 mt-10 sm:mt-12">
          
          





          

          <motion.div variants={lineIn} className="w-8 h-px bg-foreground/10" />

          





          
        </motion.div>
      </div>
    </section>);

}