import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Plus, X, ChevronRight } from 'lucide-react';
import CURATED_SECTIONS from '@/components/property/cinematic/curatedGalleryData';

const ease = [0.16, 1, 0.3, 1];

const NARRATIVE_COPY = {
  'Arrival & First Impression': "A deliberate threshold. Reclaimed Civil War-era heart pine runs seamlessly through living areas, bedrooms, and closets. No visual interruption. No downgrade in finish. This is comprehensive craftsmanship anchored by an incredibly thoughtful floor plan.",
  'Grand Living': "Engineered for scale. The Great Room acts as the central gathering point, pulling guests outward to the screened porch or inward to the culinary spaces. Timber trusses and monumental masonry anchor the volume.",
  'Culinary & Entertaining': "Commercial standard. Residential perfection. Two islands. Wolf range. A full conservatory flooded with light from an octagonal skylight dome. A concealed scullery with side-by-side Sub-Zero refrigeration makes large-scale entertaining effortless.",
  "Owner's Retreat": "Absolute seclusion. Occupying a dedicated wing, the primary suite operates entirely independent of the entertaining zones. Cathedral ceilings, agate stone details, and a curated dressing room.",
  'Family Wing': "A self-contained ecosystem. Two ensuite bedrooms and a central lounge share a dedicated laundry, allowing guests or family to operate on their own schedule without disrupting the main house.",
  'Guest Suites & Private Quarters': "Autonomy for extended stays. A fully independent guest apartment above the garage with dedicated HVAC. Perfect for long-term visitors, staff, or security.",
  'Flexible Living & Creative Spaces': "Spaces that adapt. A formal executive office off the main entry for focused work, and high-capacity flex zones for media, recreation, or strategic planning. The house plans reveal deep flexibility.",
  'Service Wing & Mudroom': "The logistical spine. A heavy-duty service corridor intercepts the three-car garage, absorbing daily friction and feeding directly into the scullery to keep formal spaces pristine.",
  'Upper Level & Corridors': "Three levels connected by multiple staircases allow absolute privacy and layered functionality. Skylights cut through the roofline, ensuring transitional spaces feel expansive.",
  'Lower Level & Infrastructure': "The industrial core. An encapsulated, climate-controlled mechanical suite drives the footprint. Geothermal systems, a 1,200-amp core, and a solar/battery matrix ensure the property never stops. Comprehensive house plans and engineering schematics detail every system.",
  'The Estate': "Fifteen acres of secured perimeter. Smart-controls extend well beyond the walls, managing the landscape and establishing a deep, natural privacy buffer.",
  'Garage & Outbuildings': "Covered breezeways connect the main residence to a working root cellar, a climate-controlled greenhouse, and a cabana. The estate operates as a self-sufficient compound."
};

const SECTION_SPECS = {
  'Culinary & Entertaining': {
    label: "Culinary Specifications",
    items: [
      "60\" Wolf dual fuel stove (6-burners, griddle, grill, warming drawer)",
      "Sub-Zero refrigeration suite (refrigerator, freezer, combo, wine cooler)",
      "Concealed scullery designed for event prep and staging",
      "Dual KitchenAid dishwashers for high-capacity turnaround"
    ]
  },
  'Arrival & First Impression': {
    label: "Material Craftsmanship",
    items: [
      "Reclaimed Civil War-era heart pine flooring",
      "Custom artisan floor patterning throughout",
      "Uninterrupted material continuity into closets and private quarters",
      "Solid brick masonry exterior construction"
    ]
  },
  'Lower Level & Infrastructure': {
    label: "Infrastructure Specs",
    items: [
      "Geothermal loop with 20 deep wells (300 ft each)",
      "5 interconnected Water Furnace geothermal zones",
      "14.3 kW solar array with Sunny Island 10k backup",
      "30 kW Kohler generator with 2,000-gallon buried propane",
      "Whole-house commercial water filtration (Clear Water Solutions)"
    ]
  }
};

const INTERSTITIAL_QUOTES = {
  2: "A scale that accommodates hundreds, yet protects the privacy of one.",
  5: "Autonomy is the ultimate luxury. Every wing its own ecosystem.",
  9: "Volume held by structural mass. Light captured by deliberate design."
};

function NarrativeBand({ title, copy, specs, index }) {
  if (!copy && !specs) return null;
  const isEven = index % 2 === 0;

  return (
    <div className="w-full bg-[#0a0a0a] py-20 md:py-32 px-6 sm:px-10 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center`}>
          <div className={`lg:col-span-${specs ? '7' : '10 lg:col-start-2 text-center'} ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
             <div className={`flex items-center gap-4 mb-8 ${!specs ? 'justify-center' : ''}`}>
                {!specs && <div className="h-px w-12 bg-[#C9B18F]/50" />}
                <span className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F]">
                  The Narrative
                </span>
                <div className="h-px w-12 bg-[#C9B18F]/50" />
             </div>
             <h3 className={`font-display text-[clamp(2.2rem,4vw,3.5rem)] font-medium leading-[1.1] text-white mb-8 ${!specs ? 'mx-auto max-w-[20ch]' : ''}`}>
               {title}
             </h3>
             <p className={`font-sans text-[1.1rem] md:text-[1.35rem] leading-[1.85] font-light text-white/70 text-pretty editorial-dropcap-gold ${!specs ? 'mx-auto max-w-[40ch]' : ''}`}>
               {copy}
             </p>
             
             {title === 'Lower Level & Infrastructure' && (
               <div className={`mt-10 ${!specs ? 'flex justify-center' : ''}`}>
                 <a href="/inquiry" className="inline-flex items-center gap-3 px-8 py-4 bg-[#111] border border-[#C9B18F]/30 hover:bg-[#C9B18F] hover:text-black text-[#C9B18F] rounded-full font-sans text-[0.75rem] font-bold uppercase tracking-[0.2em] transition-all duration-300">
                   Request Floor Plans
                   <ChevronRight className="w-4 h-4" />
                 </a>
               </div>
             )}
             
             {title === 'Arrival & First Impression' && (
               <div className={`mt-10 ${!specs ? 'flex justify-center' : ''}`}>
                 <a href="/all-photos" className="inline-flex items-center gap-3 px-8 py-4 bg-[#111] border border-white/20 hover:bg-white hover:text-black text-white rounded-full font-sans text-[0.75rem] font-bold uppercase tracking-[0.2em] transition-all duration-300">
                   View All Photos
                   <ChevronRight className="w-4 h-4" />
                 </a>
               </div>
             )}
          </div>
          {specs && (
            <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
               <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 md:p-12">
                  <h4 className="font-sans text-[0.75rem] font-bold uppercase tracking-[0.25em] text-[#C9B18F] mb-6">
                    {specs.label}
                  </h4>
                  <div className="h-px w-full bg-white/10 mb-6" />
                  <ul className="flex flex-col gap-5 m-0 p-0 list-none">
                    {specs.items.map((item, idx) => (
                       <li key={idx} className="flex items-start gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/30 mt-2.5 flex-shrink-0" />
                          <span className="font-sans text-[0.95rem] leading-[1.7] text-white/80">{item}</span>
                       </li>
                    ))}
                  </ul>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Full-bleed hero section with parallax image background and floating editorial text
function HeroSection({ section, index, onImageClick, heroImage, gridImages }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%']);
  const copy = NARRATIVE_COPY[section.title] || '';
  const specs = SECTION_SPECS[section.title];
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      {/* Full-bleed parallax background */}
      <motion.div
        className="absolute inset-0 w-full h-[140%] top-[-20%]"
        style={{ y: imgY }}
      >
        <img
          src={heroImage.src}
          alt={heroImage.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ filter: heroImage.adjust || 'brightness(1.05) saturate(1.1) contrast(1.04)' }}
        />
      </motion.div>

      {/* Gradient scrim - heavier at top and bottom for text legibility, lighter in middle */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black pointer-events-none" />
      {/* Side scrim for text panel */}
      <div className={`absolute inset-y-0 ${isEven ? 'left-0' : 'right-0'} w-1/2 bg-gradient-to-${isEven ? 'r' : 'l'} from-black/75 to-transparent pointer-events-none`} />

      {/* Click to expand */}
      <button
        onClick={() => onImageClick(heroImage)}
        className="absolute inset-0 w-full h-full cursor-zoom-in z-[1]"
        aria-label={`View ${section.title} full screen`}
      />

      {/* Floating editorial content */}
      <div className={`relative z-10 flex items-center min-h-[100svh] px-5 sm:px-10 lg:px-16 py-16 md:py-24`}>
        <div className={`w-full max-w-7xl mx-auto flex ${isEven ? 'justify-start' : 'justify-end'}`}>
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease }}
            className="max-w-[48rem] pointer-events-auto"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-6">
              <div className="h-px w-8 md:w-12 bg-[#C9B18F]" />
              <span className="font-sans text-[0.6rem] md:text-[0.7rem] font-bold uppercase tracking-[0.4em] text-[#C9B18F] drop-shadow-md">
                Chapter {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h2 className="font-display text-[clamp(3.5rem,8vw,7rem)] font-medium leading-[0.95] text-white tracking-tight text-balance drop-shadow-2xl">
              {section.title}
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Bottom image caption */}
      <div className="absolute bottom-6 right-6 sm:bottom-8 sm:right-8 z-10 pointer-events-none">
        <span className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-white/50">
          {heroImage.alt}
        </span>
      </div>
    </div>
  );
}

// High-end, edge-to-edge cinematic grid with tone matching
function ImageGrid({ images, onImageClick, sectionTitle }) {
  if (!images || images.length === 0) return null;

  const shown = images.slice(0, 3);

  const applyTone = (baseFilter) => {
    return baseFilter || 'brightness(1.05) saturate(1.1) contrast(1.04)';
  };

  return (
    <div className="w-full bg-black py-1 md:py-2">
      <div className={`w-full grid gap-1 md:gap-1 ${shown.length === 1 ? 'grid-cols-1' : shown.length === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-[2fr_1fr]'}`}>
        {shown.length >= 3 ? (
          <>
            {/* Left: large */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease }}
              onClick={() => onImageClick(shown[0])}
              className="relative overflow-hidden cursor-zoom-in group md:row-span-2"
            >
              <img
                src={shown[0].src} alt={shown[0].alt} loading="lazy" decoding="async"
                className="w-full h-[50vh] md:h-[80vh] object-cover transition-transform duration-[2s] group-hover:scale-[1.03] will-change-transform"
                style={{ filter: applyTone(shown[0].adjust) }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 opacity-70 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="h-px w-6 md:w-8 bg-[#C9B18F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                    <span className="font-sans text-[0.55rem] md:text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      Perspective
                    </span>
                  </div>
                  <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.5rem)] leading-[1.15] text-white drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                    {shown[0].alt}
                  </h3>
                </div>
              </div>
            </motion.div>
            {/* Right: stacked pair */}
            {shown.slice(1).map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: (i + 1) * 0.12, ease }}
                onClick={() => onImageClick(img)}
                className="relative overflow-hidden cursor-zoom-in group"
              >
                <img
                  src={img.src} alt={img.alt} loading="lazy" decoding="async"
                  className="w-full h-[35vh] md:h-[calc(40vh-2px)] object-cover transition-transform duration-[2s] group-hover:scale-[1.03] will-change-transform"
                  style={{ filter: applyTone(img.adjust) }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
                   <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                     <p className="font-sans text-[0.55rem] font-bold uppercase tracking-[0.25em] text-[#C9B18F]/90 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {i === 0 ? 'Context' : 'Texture'}
                     </p>
                     <h4 className="font-display text-[clamp(1.2rem,1.8vw,1.8rem)] leading-[1.15] text-white/90 group-hover:text-white transition-colors duration-500 drop-shadow-md">
                        {img.alt}
                     </h4>
                   </div>
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          shown.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12, ease }}
              onClick={() => onImageClick(img)}
              className="relative overflow-hidden cursor-zoom-in group"
            >
              <img
                src={img.src} alt={img.alt} loading="lazy" decoding="async"
                className="w-full h-[50vh] md:h-[70vh] object-cover transition-transform duration-[2s] group-hover:scale-[1.03] will-change-transform"
                style={{ filter: applyTone(img.adjust) }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end pointer-events-none">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                  <div className="flex items-center gap-3 mb-3 md:mb-4">
                    <div className="h-px w-6 md:w-8 bg-[#C9B18F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-100" />
                    <span className="font-sans text-[0.55rem] md:text-[0.65rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F] opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200">
                      {i === 0 ? 'Perspective' : 'Context'}
                    </span>
                  </div>
                  <h3 className="font-display text-[clamp(1.6rem,2.5vw,2.5rem)] leading-[1.15] text-white drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                    {img.alt}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}

// Full-bleed cinematic quote between sections
function CinematicQuote({ quote }) {
  return (
    <div className="relative w-full bg-black flex items-center justify-center py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,177,143,0.04)_0%,transparent_70%)]" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 1, ease }}
        className="text-center max-w-[30ch] mx-auto relative z-10"
      >
        <div className="mb-10 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent mx-auto" />
        <p className="font-display text-[clamp(1.8rem,3.5vw,3.2rem)] italic leading-[1.25] text-white/90">
          "{quote}"
        </p>
        <div className="mt-10 h-16 w-px bg-gradient-to-b from-transparent via-[#C9B18F]/50 to-transparent mx-auto" />
      </motion.div>
    </div>
  );
}

export default function NewMainResidencePageSection() {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <div className="bg-black text-white">
      {CURATED_SECTIONS.map((section, index) => {
        const [heroImage, ...gridImages] = section.images;
        if (!heroImage) return null;

        return (
          <div key={index} className="relative w-full z-10 bg-black">
            {/* Sticky Hero */}
            <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden">
              <HeroSection
                section={section}
                index={index}
                onImageClick={setLightboxImage}
                heroImage={heroImage}
                gridImages={gridImages}
              />
            </div>

            {/* Scrolling over-content */}
            <div className="relative z-10 w-full bg-black">
              {/* Narrative Text Band */}
              <NarrativeBand title={section.title} copy={NARRATIVE_COPY[section.title]} specs={SECTION_SPECS[section.title]} index={index} />

              {/* Supporting image grid */}
              <ImageGrid images={gridImages} onImageClick={setLightboxImage} sectionTitle={section.title} />

              {/* Interstitial cinematic quote */}
              {INTERSTITIAL_QUOTES[index] && (
                <CinematicQuote quote={INTERSTITIAL_QUOTES[index]} />
              )}
            </div>
          </div>
        );
      })}

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/98 p-4 sm:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <button
              className="absolute top-5 right-5 z-50 p-2 text-white/60 hover:text-white transition-colors"
              onClick={() => setLightboxImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="relative max-w-[92vw] max-h-[92vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-w-full max-h-[88vh] object-contain"
                style={{ filter: lightboxImage.adjust || 'brightness(1.05) saturate(1.08)' }}
              />
              {lightboxImage.alt && (
                <p className="mt-4 text-center font-sans text-[0.6rem] uppercase tracking-[0.25em] text-white/40 mb-0">
                  {lightboxImage.alt}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}