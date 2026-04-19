import React, { useRef, useEffect, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import useAiForestImage from '@/hooks/useAiForestImage';





import WalkTheLand from '@/components/property/WalkTheLand';
const ArchitecturalMasterpieceLabel = lazy(() => import('@/components/property/cinematic/ArchitecturalMasterpieceLabel'));
const ArchitecturalReveal = lazy(() => import('@/components/property/ArchitecturalReveal'));
const NewMainResidencePageSection = lazy(() => import('@/components/property/NewMainResidencePageSection'));
const FarmStructuresOnly = lazy(() => import('@/components/property/cinematic/FarmStructuresOnly'));
const EngineeredInfrastructureSection = lazy(() => import('@/components/property/cinematic/EngineeredInfrastructureSection'));
import { Link } from 'react-router-dom';
import DepthOnScroll from '@/components/effects/DepthOnScroll';
import HomeSectionSeam from './HomeSectionSeam';
import GlassScrollBand from '@/components/effects/GlassScrollBand';
import FarmCropGallery from '@/components/property/cinematic/FarmCropGallery';
import FeaturedCrops from '@/components/farm/FeaturedCrops';
import WhatWeGrowShowcase from '@/components/farm/WhatWeGrowShowcase';


function SectionBlock({ kicker, title, body, items = [], opportunity = false, land = false }) {
  return (
    <section className="bg-black text-white px-5 py-10 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className={`grid gap-8 items-start ${opportunity ? 'grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]' : 'grid-cols-1 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]'} md:gap-6 lg:gap-6`}>
          <div className={`min-w-0 ${opportunity ? '' : 'lg:pl-2'}`}>
            {opportunity ? (
              <div className="min-w-0">
                <p className="mb-5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">{kicker}</p>
                <h2 className="mb-8 max-w-[8ch] text-balance font-display text-[clamp(3.6rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-white">
                  {title}
                </h2>
                <p className="max-w-[32ch] whitespace-pre-line font-sans text-[1.05rem] leading-[1.8] text-white/70">{body}</p>
              </div>
            ) : (
              <>
                {!land && <p className="mb-5 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">{kicker}</p>}
                {!land && (
                  <h2 className={`mb-8 font-display font-medium leading-[0.95] tracking-tight text-white text-balance ${opportunity ? 'max-w-[8ch] text-[clamp(3.6rem,8vw,6.5rem)]' : 'max-w-[10ch] text-[clamp(3.6rem,8vw,6.5rem)]'}`}>
                    {title}
                  </h2>
                )}
                {!land && (
                  <p className={`whitespace-pre-line font-sans text-white/70 ${opportunity ? 'max-w-[28ch] text-[0.88rem] leading-[2.15]' : 'max-w-[34ch] text-[1.05rem] leading-[1.8]'}`}>
                    {body}
                  </p>
                )}
                {items.length > 0 && !land && (
                  <div className="mt-12 grid gap-8 sm:grid-cols-2">
                    {items.map((item) => (
                      <div key={item} className="border-l-[1.5px] border-white/20 pl-5 md:pl-6">
                        <div className="mb-4 h-px w-10 bg-white/20" />
                        <p className="mb-0 max-w-[24ch] font-sans text-[0.78rem] font-bold uppercase tracking-[0.16em] leading-[2] text-white/70">{item}</p>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {opportunity && (
            <div className="hidden w-full self-end overflow-hidden border border-white/10 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.4)] rounded-xl md:-ml-6 md:mt-28 md:block lg:-ml-10 lg:mt-40">
              <div className="relative group">
                <img
                  src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4b058f674_generated_image.png"
                  alt="Aerial view of the estate and surrounding forest acreage"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="block h-[46rem] w-full object-cover object-[52%_34%] sm:h-[54rem] sm:object-[52%_35%] lg:h-[68rem] lg:object-[53%_36%] transition-transform duration-1000 group-hover:scale-[1.02] will-change-transform"
                />
                <p className="absolute bottom-4 left-4 mb-0 font-sans text-[0.58rem] font-medium uppercase tracking-[0.28em] text-white/90 drop-shadow-md">
                  Pinehurst, North Carolina
                </p>
              </div>
            </div>
          )}

          {opportunity && (
            <div className="col-span-full mt-10 grid grid-cols-1 items-start gap-8 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)] md:gap-6 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
              <div className="overflow-hidden border border-white/10 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.4)] rounded-xl md:col-start-1 md:row-start-1">
                <img
                  src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/71ecc8fb2_generated_image.png"
                  alt="Flow Farm garden rows with workers and tractor beside the residence"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="block h-[28rem] w-full object-cover sm:h-[36rem] lg:h-[46rem] transition-transform duration-1000 hover:scale-[1.02]"
                  style={{ objectPosition: '22% 92%' }}
                />
              </div>

              <div className="min-w-0 lg:pt-0">
                <p className="mb-5 font-sans text-[0.95rem] md:text-[1.05rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F]">
                  THE OPPORTUNITY
                </p>
                <h2 className="mb-8 max-w-[12ch] text-balance font-display text-[clamp(3.6rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-white">
                  The Farm Is the Engine.<br />The Zoning Is the Key.
                </h2>
                <div className="max-w-[44ch] font-sans text-[1.05rem] leading-[1.8] text-white/70">
                  <p className="mb-0 whitespace-pre-line">This is not potential. It is position. A working USDA-registered farm anchors the land in its most powerful state—preserving agricultural status and securing a classification that supports far greater flexibility than typical acreage. That position is not theoretical. It is already established—through use, infrastructure, and alignment. What others would need to build, maintain, and protect has already been done. The farm generates momentum. The zoning secures it. What remains is control—over how the land is operated, expanded, and ultimately defined over time.</p>
                </div>
              </div>
            </div>
          )}

          {opportunity && (
            <div className="col-span-full mt-14 block lg:hidden">
             <div className="overflow-visible bg-transparent border-0 rounded-none shadow-none md:backdrop-blur-0">
            <WalkTheLand mapKey="opportunity-aerial-map" />
          </div>
            </div>
          )}

          {land && (
            <div className="col-span-full mt-16 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-12">
              <div className="overflow-hidden border border-white/10 bg-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.4)] rounded-xl">
                <img
                  src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4953bd89e_forestacreage2.jpg"
                  alt="Forest and land view"
                  sizes="(min-width: 1024px) 900px, 100vw"
                  loading="lazy"
                  decoding="async"
                  className="block h-[28rem] w-full object-cover sm:h-[34rem] lg:h-[40rem] transition-transform duration-1000 hover:scale-[1.02] will-change-transform"
                />
              </div>

              <div className="min-w-0">
                <p className="mb-5 font-sans text-[0.95rem] md:text-[1.05rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F]">{kicker}</p>
                <h2 className="mb-8 max-w-[9ch] whitespace-pre-line font-display text-[clamp(3.6rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-white">
                  {title}
                </h2>
                <p className="max-w-[34ch] whitespace-pre-line font-sans text-[1.05rem] leading-[1.8] text-white/70">{body}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ParallaxBleedSection({ id, imageSrc, imageFilter, imagePosition = 'center', kicker, title, body, alignment = 'left', generateForest = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const yImage = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const shouldReduceMotion = useReducedMotion();

  const aiUrl = useAiForestImage({
    prompt: 'Cinematic longleaf pine forest, blue hour mist, photoreal, 16:9, soft vignette, luxury editorial tone',
    storageKey: 'ai_forest_bg_v1',
    fallbackUrl: imageSrc,
    enabled: generateForest,
  });

  return (
    <section id={id} ref={ref} className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden cinematic-vignette" style={{ contentVisibility: 'auto', contain: 'paint' }}>
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={aiUrl || imageSrc}
          alt="Section background"
          loading="eager"
          decoding="async"
          sizes="100vw"
          fetchpriority="high"
          className="w-full h-[130%] object-cover absolute top-[-10%] cinematic-exterior"
          style={{ y: shouldReduceMotion ? 0 : yImage, filter: imageFilter || 'none', objectPosition: imagePosition, willChange: 'transform' }}
        />
        {/* Crystal clear image with just a very subtle vignette at the edges so it isn't washed out */}
        <div className="absolute inset-0 bg-black/5" />
      </div>
      
      <div className="relative z-10 w-full px-6 sm:px-8 lg:px-14 py-14 mt-6 pointer-events-none">
        <motion.div 
          className={`mx-auto max-w-7xl flex flex-col ${alignment === 'left' ? 'items-start' : 'items-end'}`}
          style={{ y: shouldReduceMotion ? 0 : yText, opacity, willChange: 'transform, opacity' }}
        >
          {/* Floating glass text (no box) */}
          <div className={`max-w-3xl ${alignment === 'left' ? 'text-left' : 'text-right'} ff-glass-text relative`}>

            
            <div className={`relative z-10 flex items-center gap-4 mb-6 ${alignment === 'left' ? '' : 'justify-end'}`}>
              {alignment === 'left' && <div className="h-px w-8 bg-white/50" />}
              <p className="mb-0 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-white drop-shadow-md">
                {kicker}
              </p>
              {alignment === 'right' && <div className="h-px w-8 bg-white/50" />}
            </div>
            
            <h2 className={`relative z-10 mb-8 text-balance font-display text-[clamp(2.6rem,5.5vw,5rem)] font-medium leading-[0.95] text-white drop-shadow-xl tracking-tight ${alignment === 'left' ? '' : 'text-right'}`}>
              {title}
            </h2>
            
            <div className={`relative z-10 ${alignment === 'left' ? 'border-l-[1.5px] border-[#C9B18F]/30 pl-6 md:pl-8' : 'border-r-[1.5px] border-[#C9B18F]/30 pr-6 md:pr-8'}`}>
              {body}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function HomeEditorialSections() {
  const farmBgRef = React.useRef(null);
  const { scrollYProgress: farmProg } = useScroll({ target: farmBgRef, offset: ["start end", "end start"] });
  const yFarm = useTransform(farmProg, [0, 1], ["-10%", "10%"]); 
  const reduceFarm = useReducedMotion();
  const FALLBACK_FARM_BG_URL = "https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b34ca9d5c_107LindenTrailGrass-101.jpg";
  const forestUrl = useAiForestImage({
    prompt: 'Cinematic longleaf pine forest at blue hour, soft mist, photorealistic, 16:9, subtle vignette, luxury real estate aesthetic, warm twilight sky with cool greens',
    storageKey: 'ai_forest_bg_v1',
    fallbackUrl: FALLBACK_FARM_BG_URL,
    enabled: false,
  });

  const bgUrl = forestUrl || FALLBACK_FARM_BG_URL;
  const CROPS = [
    'Tomatoes',
    'Cucumbers',
    'Leafy greens',
    'Herbs',
    'Peppers',
    'Squash & Zucchini',
    'Strawberries',
    'Potatoes',
    'Baby kiwi (hardy kiwi)',
    'Cut flowers'
  ];
  return (
    <>
      {/* PHASE 1: THE OPPORTUNITY (HOOK) */}
      <ParallaxBleedSection id="section-overview" 
        imageSrc="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4953bd89e_forestacreage2.jpg"
        imageFilter="none"
        kicker="The Opportunity"
        title={<>The Farm Is the Engine.<br/>The Zoning Is the Key.</>}
        alignment="left"
                 generateForest={false}
                 body={
          <>
            <p className="mb-6 font-sans text-[1rem] sm:text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-white/85 drop-shadow-md pointer-events-auto">
              This is not potential. It is position. A working USDA-registered farm anchors the land in its most powerful state—preserving agricultural status and securing a classification that supports far greater flexibility than typical acreage.
            </p>
            <p className="font-sans text-[1rem] sm:text-[1.05rem] md:text-[1.15rem] leading-[1.8] text-white/85 drop-shadow-md pointer-events-auto">
              What others would need to build, maintain, and protect has already been done. The farm generates momentum. The zoning secures it. What remains is control.
            </p>
          </>
        }
      />

      <section className="bg-black text-white px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28 relative z-20 border-t border-white/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <DepthOnScroll intensity={0.9} hoverLift={false} className="mb-16">
              <p className="mb-4 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">
                Investment Summary
              </p>
              <h3 className="max-w-[16ch] text-balance font-display text-[clamp(2.8rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white">
                The strategic value of the land.
              </h3>
            </DepthOnScroll>
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-x-10 lg:grid-cols-3 lg:gap-x-16 lg:gap-y-20">
              <div className="border-l-[1.5px] border-[#C9B18F]/50 pl-5 md:pl-6">
                <p className="mb-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.15em] leading-[1.4] text-[#C9B18F]">15 ACRES OF OPPORTUNITY</p>
                <p className="mb-0 font-sans text-[0.95rem] font-medium leading-[1.6] text-white/80">Secured agricultural standing enveloped by a protected natural forest buffer.</p>
              </div>
              <div className="border-l-[1.5px] border-[#C9B18F]/50 pl-5 md:pl-6">
                <p className="mb-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.15em] leading-[1.4] text-[#C9B18F]">THE AGRICULTURAL ENGINE</p>
                <p className="mb-0 font-sans text-[0.95rem] font-medium leading-[1.6] text-white/80">A highly productive, 3-acre USDA-registered veganic farm that secures the estate's zoning.</p>
              </div>
              <div className="border-l-[1.5px] border-[#C9B18F]/50 pl-5 md:pl-6">
                <p className="mb-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.15em] leading-[1.4] text-[#C9B18F]">UNCOMMON FREEDOM</p>
                <p className="mb-0 font-sans text-[0.95rem] font-medium leading-[1.6] text-white/80">The rare entitlement to create a private family compound, luxury wellness retreat, or hospitality venue.</p>
              </div>
              <div className="border-l-[1.5px] border-[#C9B18F]/50 pl-5 md:pl-6">
                <p className="mb-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.15em] leading-[1.4] text-[#C9B18F]">ARCHITECTURAL PERMANENCE</p>
                <p className="mb-0 font-sans text-[0.95rem] font-medium leading-[1.6] text-white/80">A curated ~7,500 sq ft design masterpiece by Robert E. Clark, built to commercial standards.</p>
              </div>
              <div className="border-l-[1.5px] border-[#C9B18F]/50 pl-5 md:pl-6">
                <p className="mb-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.15em] leading-[1.4] text-[#C9B18F]">ENGINEERED INDEPENDENCE</p>
                <p className="mb-0 font-sans text-[0.95rem] font-medium leading-[1.6] text-white/80">True self-sufficiency through advanced solar, geothermal climate control, and deep-water wells.</p>
              </div>
              <div className="border-l-[1.5px] border-[#C9B18F]/50 pl-5 md:pl-6">
                <p className="mb-3 font-sans text-[0.75rem] font-bold uppercase tracking-[0.15em] leading-[1.4] text-[#C9B18F]">COMPOUND EXPANSION</p>
                <p className="mb-0 font-sans text-[0.95rem] font-medium leading-[1.6] text-white/80">An architect-designed guest house shell and 7 buildable acres ready for immediate development.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHASE 2: PROVING THE ESTATE & FARM ENGINE */}
      <section id="section-farm" ref={farmBgRef} className="relative z-20 overflow-hidden px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20">
        <motion.img
          src={bgUrl}
          alt="Farm twilight background"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: reduceFarm ? 0 : yFarm, filter: 'none' }}
        />
        
        <div className="mx-auto max-w-7xl relative z-10">
          <GlassScrollBand
            kicker="Thesis"
            title="Fifteen acres. One unified system."
            body="A working veganic farm anchors the land—securing agricultural status and control while the zoning unlocks uncommon freedom."
            alignment="left"
          />
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 lg:mb-10"
          >
            <p className="mb-4 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">
              The Engine
            </p>
            <div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:gap-12">
               <h2 className="mb-0 max-w-[14ch] text-balance font-display text-[clamp(3rem,6vw,5rem)] font-medium leading-[0.95] tracking-tight text-white drop-shadow-xl">
                 Fifteen acres. One unified system.
               </h2>
               <p className="max-w-[38ch] font-sans text-[1rem] leading-[1.8] text-white drop-shadow-md mb-0">
                 Navigate the distinct topographies of the estate. From the agricultural engine to the architectural center, every acre serves a deliberate purpose.
               </p>
             </div>
            </div>
            </motion.div>

          <div className="overflow-visible bg-transparent border-0 rounded-none shadow-none md:backdrop-blur-0">
            <WalkTheLand mapKey="opportunity-aerial-map" />
          </div>

           <WhatWeGrowShowcase
             crops={CROPS}
             galleryImages={[
               { url: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ff2d6c245_harvest-background-universal-2000x1500.jpg', caption: 'Harvest Assortment' },
               { url: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/91707c607_Tomato_Transplants.jpg', caption: 'Tomato Transplants (Greenhouse)' },
               { url: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/33190880d_flowmelons.jpg', caption: 'Heirloom Melon Varietals' }
             ]}
             intervalMs={4500}
           />
           </div>
           </section>

      <Suspense fallback={null}><FarmStructuresOnly /></Suspense>
      <HomeSectionSeam tone="dark" />

       {/* PHASE 3: THE ARCHITECTURE */}
      <section className="bg-black py-12 border-t border-white/5 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center px-6"
        >
          <div className="mb-8 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent" />
          <p className="mx-auto max-w-[34ch] text-balance font-display text-[clamp(1.8rem,3.5vw,3rem)] italic leading-[1.2] text-white/90">
            "The architecture is merely the anchor. The land it sits upon provides the true foundation for autonomy."
          </p>
          <div className="mt-8 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent" />
        </motion.div>
      </section>

      <Suspense fallback={null}><ArchitecturalMasterpieceLabel /></Suspense>
      <Suspense fallback={null}><ArchitecturalReveal /></Suspense>
      <Suspense fallback={null}><NewMainResidencePageSection /></Suspense>
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 py-10 flex justify-center">
        <Link to="/inquiry" className="ff-glass-chip">Schedule Private Viewing</Link>
      </div>
      <HomeSectionSeam tone="dark" />

      {/* PHASE 4: INFRASTRUCTURE */}
      <section className="bg-black py-12 border-t border-white/5 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center text-center px-6"
        >
          <div className="mb-8 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent" />
          <p className="mx-auto max-w-[34ch] text-balance font-display text-[clamp(1.8rem,3.5vw,3rem)] italic leading-[1.2] text-white/90">
            "To understand the true value of the estate, you have to look at the systems that drive it."
          </p>
          <div className="mt-8 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent" />
        </motion.div>
      </section>

      <Suspense fallback={null}><EngineeredInfrastructureSection /></Suspense>

      {/* PHASE 5: REGIONAL POSITION */}
      <section id="section-location" className="bg-black text-white px-6 py-16 sm:px-10 sm:py-24 lg:px-16 lg:py-28 relative z-20">
        <div className="mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-16 flex flex-col items-center text-center lg:mb-24"
          >
            <div className="mb-8 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent" />
            <p className="mx-auto max-w-[32ch] text-balance font-display text-[clamp(1.8rem,3.5vw,3rem)] italic leading-[1.2] text-white/90 drop-shadow-md">
              "True independence isn't isolation—it's the ability to engage with the world on your own terms."
            </p>
            <div className="mt-8 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.98fr)] md:gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
            <div className="min-w-0 lg:pt-0">
              <p className="mb-5 font-sans text-[0.95rem] md:text-[1.05rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F]">
                Regional Position
              </p>
              <h2 className="mb-6 max-w-[10ch] text-balance font-display text-[clamp(3.6rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-white">
                Connected.<br />Supported.<br />Ready.
              </h2>
              <div className="max-w-[38ch] font-sans text-[1.15rem] leading-[1.7] font-light text-white/80">
                <p className="mb-6 whitespace-pre-line">
                  Seamless access to private aviation, regional healthcare, and major airports positions the estate perfectly for private enjoyment or commercial expansion.
                </p>
                <p className="mb-0 whitespace-pre-line">
                  Agritourism, luxury hospitality, wellness retreats, or corporate events—all supported by established tourism infrastructure and a surging regional economy.
                </p>
              </div>
            </div>

            <div className="overflow-hidden border border-white/10 bg-[#111] shadow-[0_18px_40px_rgba(0,0,0,0.4)] md:col-start-2 md:row-start-1">
              <img
                src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg"
                alt="Pinehurst regional accessibility"
                sizes="(min-width: 1024px) 900px, 100vw"
                loading="lazy"
                decoding="async"
                className="block h-[28rem] w-full object-cover sm:h-[36rem] lg:h-[46rem]"
                style={{ objectPosition: '50% 50%', filter: 'saturate(0.8) contrast(1.1) brightness(0.95)' }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-12 border-t border-white/5 relative z-20">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="mb-1 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">Regional Position</p>
            <p className="mb-0 font-sans text-white/70">Explore airports, healthcare, and access routes on the dedicated Location page.</p>
          </div>
          <Link to="/Location" className="ff-glass-chip">Explore Location</Link>
        </div>
      </section>
    </>
  );
}