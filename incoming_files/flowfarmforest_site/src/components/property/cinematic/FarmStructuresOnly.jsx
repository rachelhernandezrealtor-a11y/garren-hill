import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const FARM_CHAPTERS = [
  {
    src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b5a0967e7_CompostingandBioChar.jpg',
    alt: 'Biochar and compost pavilion',
    kicker: 'Chapter 01',
    title: 'Biochar & Compost Pavilion',
    body: 'A covered aerated composting system (O2Compost) and a biochar kiln under a covered structure with I-Beam and chain hoist. The kiln converts forest debris into stable carbon, building fertility that lasts for centuries.',
    detail: 'One biochar application lasts decades, permanently improving drainage and microbial activity in North Carolina clay. The composting system is fully enclosed and odor-free.',
    videoId: 'fqvHbREiws4',
    videoTitle: 'Biochar & Soil Building',
    filter: 'contrast(1.08) saturate(1.05) brightness(1.04)',
  },
  {
    src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/585331166_tunnelgood.jpg',
    alt: 'High Tunnel Interior — Tomato Rows',
    kicker: 'Chapter 02',
    title: 'High Tunnel Greenhouse',
    body: 'A 96′ × 36′ high tunnel (Four Season Tools) featuring a custom Climate Battery air-to-soil geothermal system for heating. Extends the growing season by months for warm-season crops year-round.',
    detail: 'The Climate Battery stores daytime solar heat in the soil, then releases it at night — eliminating propane heating costs while maintaining optimal growing temperatures through winter.',
    videoId: 'QzTo5wD4T3w',
    videoTitle: 'Geothermal High Tunnel',
    filter: 'brightness(0.7) contrast(1.1) saturate(1.1)',
  },
  {
    src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/bcd5e803e_FarmWorkshop.jpg',
    alt: 'Farm workshop and equipment storage',
    kicker: 'Chapter 03',
    title: 'Farm Workshop & Auxiliary Building',
    body: 'Operational farm workshop (30′ × 40′) with concrete slab and full electrical service. Includes a dedicated walk-in cooler (12′ × 8′) for post-harvest crop storage, eliminating cold-chain bottlenecks.',
    detail: 'The auxiliary building has its own electrical panel and can be expanded or converted to additional livestock housing, equipment storage, or a second processing facility.',
    filter: 'brightness(0.7) contrast(1.06) saturate(0.95)',
  },
];

const YIELD_IMAGES = [
  // Standardized grading via tokens for consistency across the site
  { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b18d982e7_D4954975-B67E-4DBB-B6A4-03D6449142D0_1_105_c.jpeg', alt: 'Potato rows in full bloom', caption: 'Field Cultivation', filter: 'brightness(0.9) contrast(1.05) saturate(1.0)' },
  { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/543963574_fruittrees.jpg', alt: 'Citrus & Fruit Trees Under Glass', caption: 'Year-Round Citrus', filter: 'brightness(1.05) contrast(1.04) saturate(1.1)' },
  { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/9c58675e2_lemon.jpg', alt: 'Citrus Row — Oranges & Lemons', caption: 'Citrus Row', filter: 'brightness(1.0) contrast(1.05) saturate(1.15)' },
  { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/0372fe081_BabyKiwis.jpg', alt: 'Hardy kiwi fruit clusters on trellised vines', caption: 'Hardy Kiwi', filter: 'brightness(0.98) contrast(1.08) saturate(1.06)' },
  { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/5779641d9_PotatoFlowers.jpg', alt: 'Potato plants flowering beside the residence', caption: 'Potato Blossoms', filter: 'brightness(1.02) contrast(1.06) saturate(1.05)' },
];

const VEGANIC_CARDS = [
  { title: 'Beyond Organic', text: 'No pesticides, no chemicals, no animal byproducts. Just plants feeding plants — and land that gets better every season.' },
  { title: 'Biochar Built On-Site', text: 'Flow Farm\'s own kiln converts forest debris into biochar, transforming North Carolina clay into rich, productive soil that lasts decades.' },
  { title: 'Soil That Compounds', text: 'Cover crops, plant-based compost, and biochar work in concert. The soil is measurably healthier each year — a real, appreciating asset.' },
  { title: 'A Farm Already Running', text: 'CSA members, farmers market relationships, and an established reputation. The revenue and community are already in place.' },
];

// Sticky hero with parallax image + floating editorial text
function FarmChapterHero({ chapter, index, onVideoClick }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%']);
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative w-full h-full overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 w-full h-[140%] top-[-20%]" style={{ y: imgY }}>
        <img
          src={chapter.src}
          alt={chapter.alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
          style={{ filter: chapter.filter }}
        />
      </motion.div>

      {/* Cinematic gradients */}
      <div className="absolute inset-0 cinematic-vignette" />

      {/* Floating editorial text */}
      <div className={`relative z-10 flex items-center min-h-[100svh] px-5 sm:px-10 lg:px-16 py-16 md:py-24`}>
        <div className={`w-full max-w-7xl mx-auto flex ${isEven ? 'justify-start' : 'justify-end'}`}>
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease }}
            className="max-w-[38rem] pointer-events-auto"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-5">
              <div className="h-px w-4 md:w-6 bg-[#C9B18F]" />
              <span className="font-sans text-[0.5rem] md:text-[0.6rem] font-bold uppercase tracking-[0.4em] text-[#C9B18F]">
                {chapter.kicker}
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-medium leading-[1.02] text-white tracking-tight text-balance mb-5">
              {chapter.title}
            </h2>
            <p className="font-sans text-[0.95rem] md:text-[1.05rem] leading-[1.75] font-light text-white/85 mb-0 text-pretty">
              {chapter.body}
            </p>
            {chapter.videoId && (
              <button
                onClick={() => onVideoClick(chapter)}
                className="mt-8 inline-flex items-center gap-3 font-sans text-[0.7rem] font-bold uppercase tracking-[0.28em] text-[#C9B18F] border border-[#C9B18F]/40 px-5 py-3 hover:bg-[#C9B18F]/10 transition-colors duration-300 pointer-events-auto"
              >
                <span className="w-4 h-4 rounded-full border border-[#C9B18F]/60 flex items-center justify-center text-[0.55rem]">▶</span>
                Watch the Process
              </button>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-6 right-6 z-10 pointer-events-none">
        <span className="font-sans text-[0.55rem] uppercase tracking-[0.2em] text-white/40">{chapter.alt}</span>
      </div>
    </div>
  );
}

// Scrolling detail panel that slides over the sticky hero
function FarmChapterDetail({ chapter }) {
  return (
    <div className="w-full bg-black">
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, ease }}
          className="max-w-2xl"
        >
          <div className="border-l-[1.5px] border-[#C9B18F]/30 pl-6">
            <p className="font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F] mb-4">Detail</p>
            <p className="font-sans text-[1.05rem] leading-[1.85] text-white/60 mb-0">{chapter.detail}</p>
          </div>
        </motion.div>

        {chapter.videoId && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.15, ease }}
            className="mt-12 overflow-hidden rounded-xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
            style={{ aspectRatio: '16/9', maxWidth: '680px' }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${chapter.videoId}?rel=0&modestbranding=1`}
              title={chapter.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              style={{ border: 'none' }}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function FarmStructuresOnly() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="bg-black text-white">

      {/* ── Intro header ── */}
      <div className="relative overflow-hidden">
        {/* Subtle aerial background */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <img
            src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e75aca465_107LindenTrailGrass-44.jpg"
            alt=""
            className="w-full h-full object-cover opacity-20"
            style={{ filter: 'saturate(0.8) contrast(1.05)' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-10 lg:px-16 pt-24 pb-20 md:pt-32 md:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
            className="font-sans text-[0.66rem] font-bold uppercase tracking-[0.4em] text-[#C9B18F] mb-6"
          >
            The Infrastructure
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end">
             {/* No background card/box behind text to keep top section crisp */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.1, ease }}
              className="font-display text-[clamp(3.5rem,7vw,6.5rem)] font-medium leading-[0.96] tracking-tight text-white mb-0"
            >
              The Farm Unlocks the Land.
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.25, ease }}
              className="border-l-[1.5px] border-[#C9B18F]/30 pl-6"
            >
              <p className="font-sans text-[0.95rem] font-medium tracking-wide text-white/40 mb-4">Three Structures · Operational Since 2009</p>
              <p className="font-sans text-[1.05rem] leading-[1.85] text-white/65 mb-0">
                Three acres of working farmland supported by serious infrastructure: a biochar and composting pavilion, a season-extending high tunnel, and a full workshop for equipment and operations. This is what turns acreage into an actual opportunity.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Chapter sections (sticky parallax) ── */}
      {FARM_CHAPTERS.map((chapter, index) => (
        <div key={index} className="relative w-full z-10 bg-black">
          {/* Sticky Hero */}
          <div className="sticky top-0 z-0 h-[100svh] w-full overflow-hidden">
            <FarmChapterHero
              chapter={chapter}
              index={index}
              onVideoClick={setActiveVideo}
            />
          </div>

          {/* Scrolling content */}
          <div className="relative z-10 w-full bg-black">
            <FarmChapterDetail chapter={chapter} />
          </div>
        </div>
      ))}

      {/* ── The Yield ── */}
      <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          className="mb-12"
        >
          <p className="font-sans text-[0.66rem] font-bold uppercase tracking-[0.4em] text-[#C9B18F] mb-5">The Yield</p>
          <h3 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[1.02] tracking-tight text-white mb-0">
            Grown on the Land.
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {YIELD_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.15, ease }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-[2500ms] group-hover:scale-[1.03] will-change-transform cinematic-exterior"
                style={{ filter: img.filter }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-5 left-5 right-5 font-sans text-[0.6rem] font-bold uppercase tracking-[0.28em] text-white/80">
                {img.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Veganic Agriculture ── */}
      <div className="border-t border-white/10 mx-auto max-w-7xl px-5 sm:px-10 lg:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-20 items-end mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease }}
          >
            <p className="font-sans text-[0.66rem] font-bold uppercase tracking-[0.4em] text-[#C9B18F] mb-5">
              NC Qualifying Farmer Exemption
            </p>
            <h3 className="font-display text-[clamp(2.8rem,5vw,5rem)] font-medium leading-[1.02] tracking-tight text-white mb-0">
              Veganic. Established. Running.
            </h3>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="border-l-[1.5px] border-[#C9B18F]/30 pl-6"
          >
            <p className="font-sans text-[1.05rem] leading-[1.85] text-white/65 mb-0">
              With an established North Carolina Qualifying Farmer Exemption already in place, the farm supports potential tax advantages and reduced operating costs. Whether envisioned as a luxury escape, income-producing venture, or working farm, the next owner inherits a running operation and the freedom to build on it.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {VEGANIC_CARDS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1, delay: i * 0.1, ease }}
              className="pt-6 border-t border-white/15"
            >
              <h4 className="font-display text-[1.5rem] font-medium text-white mb-3 leading-tight">{item.title}</h4>
              <p className="font-sans text-white/55 text-[0.9rem] leading-[1.75] mb-0">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/96 p-4 sm:p-10"
            onClick={() => setActiveVideo(null)}
          >
            <button className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors z-50 p-2" onClick={() => setActiveVideo(null)}>
              <X className="w-6 h-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-4xl rounded-xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
              style={{ aspectRatio: '16/9' }}
              onClick={e => e.stopPropagation()}
            >
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.videoTitle}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
                style={{ border: 'none' }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}