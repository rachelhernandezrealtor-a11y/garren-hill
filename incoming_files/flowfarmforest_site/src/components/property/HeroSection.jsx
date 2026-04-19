import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const keyStats = [
  { id: 1, label: "USDA Zoned", value: "15 Acres" },
  { id: 2, label: "Veganic Farm", value: "3 Acre" },
  { id: 3, label: "to Pinehurst", value: "3 Miles" },
  { id: 7, label: "Price", value: "$5.25M" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 1.5 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function HeroSection() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [bgReady, setBgReady] = useState(false);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  // Parallax: background drifts subtly slower than scroll — cinematic depth
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.04, 1.12]);
  // Fade out hero content as user scrolls away
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45, 0.8], [1, 1, 0]);

  return (
    <>
      <section ref={sectionRef} id="hero" className="relative isolate min-h-[100svh] overflow-hidden bg-black">

        {/* Background Video Layer — cinematic parallax with scale */}
        <motion.div className="absolute -inset-[6%] -z-10 pointer-events-none" style={{ y: bgY, scale: bgScale }} aria-hidden="true">

          {/* Vimeo background iframe — fades in once loaded */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              overflow: 'hidden',
              opacity: bgReady ? 1 : 0,
              transition: 'opacity 1.4s ease',
            }}
          >
            <iframe
              src="https://player.vimeo.com/video/1171394707?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
              onLoad={() => setBgReady(true)}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 'max(177.78vh, 100vw)',
                height: 'max(56.25vw, 100vh)',
                transform: 'translate(-50%, -50%)',
                border: 'none',
              }}
            />
          </div>

          {/* Cinematic depth overlays — on the background layer */}
          {/* Top edge vignette */}
          <div className="absolute inset-x-0 top-0 h-[30%]" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 100%)' }} />
          {/* Side vignettes — frame the composition */}
          <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 180px 60px rgba(0,0,0,0.25)' }} />
          {/* Subtle warm tone shift — estate warmth */}
          <div className="absolute inset-0" style={{ background: 'rgba(12,8,4,0.08)' }} />
        </motion.div>


        {/* Darker lower zone — cinematic depth behind metrics, fades before CTA */}
        <div className="absolute inset-x-0 bottom-0 h-[40%] z-[5] pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.28) 100%)' }} />

        {/* Hero Content — fades on scroll, stable position */}
        <motion.div className="relative z-10 w-full px-5 sm:px-8 md:px-12 flex flex-col items-center justify-center min-h-[100svh]" style={{ opacity: contentOpacity }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1], delay: 0.5 }}
            className="relative w-full max-w-2xl text-center"
          >
            {/* Subtle dark backing behind content for readability */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                width: 'min(100vw, 900px)',
                height: '120%',
                background: 'radial-gradient(ellipse 65% 55% at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 55%, transparent 85%)',
                filter: 'blur(30px)',
                WebkitFilter: 'blur(30px)',
              }}
            />

            {/* Headline */}
            <motion.h1
              className="font-serif text-[2rem] sm:text-5xl md:text-6xl lg:text-7xl font-light text-white mb-5 sm:mb-7 md:mb-8 leading-[1.08] tracking-tight"
              style={{
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                textShadow: '0 2px 24px rgba(0,0,0,0.65), 0 4px 40px rgba(0,0,0,0.3)'
              }}
            >
              Agritourism <em className="italic font-light">Established</em>. Legacy Ready.
            </motion.h1>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.8 }}
              className="text-white mb-6 sm:mb-10 font-normal normal-case mx-auto px-4 py-3 sm:px-8 sm:py-5"
              style={{ 
                fontSize: 'clamp(0.85rem, 1.1vw, 1.1rem)',
                letterSpacing: '0.015em',
                lineHeight: '1.75',
                maxWidth: '660px',
                color: '#ffffff',
                WebkitTextFillColor: '#ffffff',
                textShadow: '0 1px 4px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5)',
                background: 'none'
              }}
            >
              A rare convergence of land, architecture, and infrastructure, this private estate offers energy independence, favorable tax positioning, rare zoning flexibility, enterprise potential, future expansion opportunity, and a transferable Pinehurst Country Club Signature Golf Membership with exclusive unlimited access to Course No. 7 and No. 9.
            </motion.p>

            {/* Stat pills */}
            <motion.div
              className="flex flex-wrap justify-center gap-1.5 sm:gap-3 mx-auto mb-10 sm:mb-14"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {keyStats.map((stat) => (
                <motion.div
                  key={stat.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="flex flex-col items-center justify-center px-3 py-2 sm:px-5 sm:py-3 rounded-2xl border border-white/15 text-white transition-all duration-300 cursor-default text-center"
                  style={{ background: 'rgba(0,0,0,0.30)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', boxShadow: '0 2px 12px rgba(0,0,0,0.2)' }}
                >
                  <span className="font-serif font-bold text-xs sm:text-base md:text-lg text-white" style={{ color: '#ffffff', WebkitTextFillColor: '#ffffff', textShadow: '0 1px 6px rgba(0,0,0,0.6)' }}>{stat.value}</span>
                  <span className="font-sans text-[7px] sm:text-[8px] uppercase tracking-wider leading-tight mt-px" style={{ color: 'rgba(255,255,255,0.85)', WebkitTextFillColor: 'rgba(255,255,255,0.85)', textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA — anchored with breathing room, above the transition fade */}
            <div className="relative z-10 pb-2 sm:pb-4">
              <motion.button
                onClick={() => setVideoOpen(true)}
                whileHover={{ scale: 1.04, borderColor: 'rgba(255,255,255,0.8)' }}
                whileTap={{ scale: 0.97 }}
                className="text-white font-serif text-[11px] sm:text-sm font-semibold tracking-[0.18em] uppercase px-8 sm:px-14 py-3.5 sm:py-5 border transition-all duration-300 rounded-full"
                style={{ borderColor: 'rgba(255,255,255,0.50)', background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(28px)', WebkitBackdropFilter: 'blur(28px)', color: '#ffffff', WebkitTextFillColor: '#ffffff', textShadow: '0 1px 8px rgba(0,0,0,0.7)', boxShadow: '0 4px 28px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.20), 0 0 0 1px rgba(255,255,255,0.06)' }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              >
                Enter Flow Farm
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom gradient — begins below CTA zone, cinematic transition into next section */}
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-28 z-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.72) 75%, rgba(0,0,0,0.92) 100%)' }} />
      </section>

      {videoOpen && (
        <Dialog open={videoOpen} onOpenChange={setVideoOpen}>
          <DialogContent className="max-w-4xl w-full aspect-video p-0 bg-black border-none">
            <button
              onClick={() => setVideoOpen(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 z-50"
            >
              <X className="w-8 h-8" />
            </button>
            <div style={{ paddingBottom: '56.25%', position: 'relative', height: 0 }}>
              <iframe
                src="https://player.vimeo.com/video/1165426324?title=0&byline=0&portrait=0&badge=0&autopause=0&autoplay=1&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Flow Farm Estate"
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}