import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import VisionStatisticsModule from './VisionStatisticsModule';
import FlowFarmStructures from './FlowFarmStructures';

import { homePageData } from './homePageData';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
};

const data = homePageData.newVision;
const IMAGE_URL = "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/a4ba8bc81_love.jpg";
const BG_IMAGE_URL = "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/fbcc003a1_HarvestBox.png";
const GREENHOUSE_BG = "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/d60160848_107LindenTrail-117.jpg";

export default function NewVisionSection() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <section
      id="estate-compound"
      className="relative pt-0 pb-0 -mt-px"
      style={{ background: '#f7f1e6' }}>

      {/* Heading Section */}
      <div className="py-6 sm:py-10 md:py-12">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="mb-6 sm:mb-8 md:mb-10">
            <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
              <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-foreground/70 font-medium">{data.eyebrow}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-foreground leading-[1.02] tracking-[-0.015em] mb-5 sm:mb-6 md:mb-7 px-4">
              {data.title}
            </h2>
            <p className="font-sans text-sm sm:text-base md:text-lg lg:text-[1.08rem] text-foreground/80 font-light leading-[2] max-w-3xl mx-auto px-4">A rare convergence of land, architecture, sustainability, infrastructure, and location, this extraordinary estate is designed for purpose, enterprise, and legacy. A transferable Pinehurst Country Club Signature Golf Membership, including Pinehurst No. 7 and No. 9, connects it to an international audience year-round. The estate integrates residential living, agriculture, and regenerative infrastructure.</p>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards - Above Background Image */}
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2
                }
              }
            }}>
            {[
            { label: "USDA Zoned", value: "15 Acres" },
            { label: "Veganic Farm", value: "3 Acre" },
            { label: "to Pinehurst", value: "3 Miles" },
            { label: "Price", value: "$5.25M" }].
            map((stat, idx) =>
            <motion.div
              key={idx}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.5, ease: "easeOut" }
                }
              }}
              className="flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 lg:px-6 lg:py-4 border border-black/10 bg-white/80 text-foreground transition-all duration-300 cursor-default text-center flex-1 min-w-[70px] sm:min-w-[85px] md:min-w-[100px] lg:min-w-[115px]">
                <span className="font-serif font-bold text-base sm:text-lg md:text-xl lg:text-2xl mb-0.5 text-foreground">{stat.value}</span>
                <span className="font-sans text-[7px] sm:text-[8px] md:text-[9px] lg:text-[10px] uppercase tracking-wider text-foreground/70 leading-tight">{stat.label}</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Background Image - Static Frame */}
      <div className="mb-0">
        <div className="overflow-hidden relative aspect-[16/9] w-full">
          <img
            src={IMAGE_URL}
            srcSet={`${IMAGE_URL}?width=640 640w, ${IMAGE_URL}?width=1024 1024w, ${IMAGE_URL}?width=1600 1600w, ${IMAGE_URL}?width=2200 2200w`}
            alt="Estate aerial view"
            className="w-full h-full block object-cover cinematic-warm"
            sizes="100vw"
            loading="lazy"
            decoding="async" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 -mt-px py-0 px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-8 md:gap-10 lg:gap-12 items-start">
            {/* Left Content - New Paragraph */}
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative">
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-4 sm:mb-5 leading-tight">An Estate Rooted in Possibility

            </h3>
              
              <p className="font-sans text-base sm:text-lg text-foreground leading-relaxed mb-6">Designed for inspired living and entrepreneurial possibility, it is a place where opportunity flows as effortlessly as the landscape itself.</p>
              
              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                {['Luxury Golf Retreat', 'Pinehurst Golf Lifestyle', 'Boutique Hospitality Estate', 'Agritourism & Regenerative Agriculture', 'Estate Culinary Experiences', 'Wellness & Longevity Retreats', 'Boutique Vineyard & Winemaking Potential', 'Legacy Family Compound'].map((item, idx) =>
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-[#fbf6ee]/90 border border-[#d8c2a0]/40 text-foreground/72 text-xs sm:text-sm font-sans font-light tracking-widest uppercase hover:bg-[#efe8dc] transition-all duration-200">
                    {item}
                  </motion.div>
              )}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                <div className="flex flex-col items-center">
                  <motion.img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/1e0ac9873_2764143276991492642.jpg"
                  alt="Grapevines"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="w-full sm:w-64 h-auto border border-black/8 shadow-[0_12px_30px_rgba(0,0,0,0.08)]" />
                  <p className="mt-3 pt-3 border-t border-black/6 w-full text-center font-sans text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-foreground/38">Muscadine Grapes</p>
                </div>
                <div className="flex flex-col items-center">
                  <motion.img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/ab239b0e7_4603172767521858802.jpg"
                  alt="Beehive"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full sm:w-64 h-auto border border-black/8 shadow-[0_12px_30px_rgba(0,0,0,0.08)]" />
                  <p className="mt-3 pt-3 border-t border-black/6 w-full text-center font-sans text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-foreground/38">Flow Beehive</p>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Body Text */}
            <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative">

              <blockquote className="border-l border-foreground/20 pl-5 sm:pl-6 md:pl-8 py-3 sm:py-4 mb-6 sm:mb-7 md:mb-8">
                <p className="text-foreground/80 text-base sm:text-lg md:text-xl lg:text-[1.9rem] font-serif font-light leading-[1.62] italic">
                  "{data.body}"
                </p>
              </blockquote>

              <img
              src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ba8fe7e6e_HarvestBox.png"
              srcSet="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ba8fe7e6e_HarvestBox.png?width=640 640w, https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ba8fe7e6e_HarvestBox.png?width=1024 1024w, https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ba8fe7e6e_HarvestBox.png?width=1600 1600w"
              alt="Harvest Box"
              className="responsive-image w-full h-auto border border-black/8 shadow-[0_14px_36px_rgba(0,0,0,0.08)] cinematic-warm"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"
              loading="lazy"
              decoding="async" />

            </motion.div>
          </div>
        </div>

       {/* Lightbox */}
       <AnimatePresence>
        {lightboxOpen &&
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxOpen(false)}>

            <button
            className="absolute top-6 right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
            onClick={() => setLightboxOpen(false)}>

              <X className="w-6 h-6" />
            </button>
            <motion.img
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            src={IMAGE_URL}
            alt="Estate aerial view"
            className="max-w-full max-h-[90vh] rounded-xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            decoding="async" />

          </motion.div>
        }
      </AnimatePresence>
    </section>);

}