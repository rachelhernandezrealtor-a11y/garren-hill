import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, animate, useInView, useMotionValue } from 'framer-motion';
import { Bed, Bath, Ruler, Car } from 'lucide-react';

const MAIN_IMAGE_URL = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1bbe3cd9f_107LindenTrailGrass-652.jpg';
const LAYERED_IMAGE_2 = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ba776ed77_foyersection.jpg'; // Foyer / architectural flow

const ease = [0.16, 1, 0.3, 1];

function AnimatedCounter({ value, decimals = 0, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplayValue(v)
    });
    return controls.stop;
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}

export default function ArchitecturalReveal() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  const mainImgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);
  const layeredImgY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);

  return (
    <section ref={ref} className="relative z-10 bg-black text-white py-10 md:py-20 overflow-hidden shadow-[0_-24px_60px_rgba(0,0,0,0.8)]">

      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        
        {/* Intro Text */}
        <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-px w-8 bg-white/30" />
              <p className="mb-0 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">
                Form & Function
              </p>
              <div className="h-px w-8 bg-white/30" />
            </div>
            <h2 className="mx-auto text-balance font-display text-[clamp(3rem,6vw,5.5rem)] font-medium leading-[1.05] text-white mb-10 tracking-tight">
              An Architecture Built for Autonomy.
            </h2>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 text-left">
              <p className="font-sans text-[1.15rem] leading-[1.7] font-light text-white/80 mb-0 flex-1 text-pretty">
                The aesthetic permanence is anchored by an uncompromising operational logic. A working, USDA-registered farm secures the zoning, transforming fifteen acres of deep forest buffer into a canvas of absolute freedom. It is a compound designed not simply to shelter, but to sustain.
              </p>
              <p className="font-sans text-[1.15rem] leading-[1.7] font-light text-white/80 mb-0 flex-1 text-pretty border-t md:border-t-0 md:border-l border-[#C9B18F]/30 pt-6 md:pt-0 md:pl-8">
                Every component—from the subterranean geothermal matrices to the expansive, commercial-grade living spaces—was conceived as a singular, breathing ecosystem. True luxury is not merely the presence of beautiful things, but the absence of friction. The definitive decisions have already been made.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Elegant Two-Image Presentation */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-4 md:gap-6 my-10 md:my-20">
          {/* Main Hero Shot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease }}
            className="relative w-full overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] group"
          >
            <motion.img
              src={MAIN_IMAGE_URL}
              alt="Main residence exterior"
              className="w-full h-[40vh] md:h-[60vh] object-cover will-change-transform transition-transform duration-[2s] group-hover:scale-105"
              style={{ y: mainImgY, filter: 'saturate(1.1) contrast(1.05) brightness(1.05)' }}
            />
          </motion.div>
          
          {/* Interior Flow Shot */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="relative w-full overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.4)] md:mt-24 group"
          >
            <motion.img
              src={LAYERED_IMAGE_2}
              alt="Interior architectural flow"
              className="w-full h-[30vh] md:h-[45vh] object-cover will-change-transform transition-transform duration-[2s] group-hover:scale-105"
              style={{ y: layeredImgY, filter: 'saturate(1.1) contrast(1.1) brightness(1.05)' }}
            />
          </motion.div>
        </div>

        {/* Architect & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease }}
            className="max-w-xl"
          >
            <p className="mb-4 font-sans text-[0.7rem] font-bold uppercase tracking-[0.25em] text-white/50">
              Main Residence
            </p>
            <h2 className="mb-8 text-balance font-display text-[clamp(3.5rem,6vw,6rem)] font-medium leading-[1.02] text-white tracking-tight">
              A Statement in Privacy. Minutes from Pinehurst.
            </h2>
            <div className="border-l-[1.5px] border-[#C9B18F]/50 pl-6 flex flex-col gap-6">
              <p className="font-sans text-[1.15rem] leading-[1.7] font-light text-white/80 text-pretty m-0">
                Crafted by architect Robert E. Clark, the residence stands as an unyielding testament to classic materiality. Civil War-era heart pine, massive timber trusses, and artisan brick establish a tactile gravity throughout. The vaulted Great Room acts as the home's gravitational center, pulling guests toward the conservatory and culinary spaces.
              </p>
              <p className="font-sans text-[1.15rem] leading-[1.7] font-light text-white/80 text-pretty m-0">
                The floor plan is deliberately winged to protect privacy while accommodating scale. Five ensuite bedrooms are scattered across distinct zones, including two fully autonomous guest apartments. The primary suite operates as a hermetic sanctuary, complete with a private stairwell ascending directly to the executive office.
              </p>
              <p className="font-sans text-[1.15rem] leading-[1.7] font-light text-white/80 text-pretty m-0">
                A walk-out lower level reveals sprawling recreation spaces, a massive Brown Safe vault, and the climate-controlled mechanical core that drives the estate. Invisible systems—from pervasive home automation to commercial-scale infrastructure—work silently to eliminate friction from daily life.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="grid grid-cols-2 gap-x-12 gap-y-12 lg:pl-16 lg:border-l border-white/10"
          >
            <div className="flex flex-col items-start">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#C9B18F] mb-3">Total Area</span>
              <span className="font-display text-4xl lg:text-5xl text-white tracking-tight">
                <AnimatedCounter value={10228} />
                <span className="text-xl font-sans text-white/30 tracking-normal ml-2 font-light">SF</span>
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#C9B18F] mb-3">Bedrooms</span>
              <span className="font-display text-4xl lg:text-5xl text-white tracking-tight">
                <AnimatedCounter value={6} />
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#C9B18F] mb-3">Bathrooms</span>
              <span className="font-display text-4xl lg:text-5xl text-white tracking-tight">
                <AnimatedCounter value={7.5} decimals={1} />
              </span>
            </div>
            <div className="flex flex-col items-start">
              <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#C9B18F] mb-3">Garages</span>
              <span className="font-display text-4xl lg:text-5xl text-white tracking-tight">
                <AnimatedCounter value={3} />
              </span>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}