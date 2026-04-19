import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import ROOMS from '@/components/property/cinematic/roomTourData';

const ease = [0.16, 1, 0.3, 1];

const DEFAULT_QUOTES = [
  'Autonomy is the ultimate luxury.',
  'Volume held by structural mass. Light captured by design.',
  'The farm is the engine. The zoning is the key.',
  'True independence is friction removed from daily life.',
];

const DEFAULT_STATS = [
  { label: 'Acres', value: '15' },
  { label: 'Buildable', value: '7' },
  { label: 'To Pinehurst', value: '3 mi' },
  { label: 'Status', value: 'USDA Farm' },
];

function dedupeBySrc(list) {
  const seen = new Set();
  return list.filter((img) => {
    if (!img?.src) return false;
    if (seen.has(img.src)) return false;
    seen.add(img.src);
    return true;
  });
}

function BleedImageSection({ src, alt, showChips, overlayQuote }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section ref={ref} className="relative w-full h-[56svh] sm:h-[68svh] md:h-[88svh] overflow-hidden" style={{ contentVisibility: 'auto', containIntrinsicSize: '900px 600px' }}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y,
          willChange: 'transform',
          filter: 'saturate(1.05) contrast(1.05) brightness(1.02)'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-8 lg:p-12 pointer-events-none">
        <motion.p
          initial={{ y: 12, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="m-0 font-sans text-[0.65rem] uppercase tracking-[0.25em] text-white/70"
        >
          {alt || '—'}
        </motion.p>
        {overlayQuote && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease }}
          >
            <p className="mt-2 max-w-[32ch] font-display italic text-white/90 text-[clamp(1.1rem,2.6vw,1.6rem)] leading-[1.35] drop-shadow">
              “{overlayQuote}”
            </p>
          </motion.div>
        )}
        {showChips && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mt-3 flex flex-wrap gap-2"
          >
            {DEFAULT_STATS.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-[0.62rem] tracking-[0.18em] uppercase text-white/80 backdrop-blur"
              >
                <span className="text-white/60">{s.label}</span>
                <span className="text-white">{s.value}</span>
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default function FullBleedAutoSequence({
  max = 12,
  quotes = DEFAULT_QUOTES,
  showStatsChips = true,
  className = '',
  useAIQuotes = false,
  customImages = [],
  generateForest = false,
  onlyCustom = false,
}) {
  const [aiQuotes, setAiQuotes] = useState([]);

  useEffect(() => {
    if (!useAIQuotes) return;
    (async () => {
      const res = await base44.integrations.Core.InvokeLLM({
        prompt: `Write 6 short, tasteful editorial pull-quotes (max 12 words each) for a luxury real estate website that emphasizes autonomy, architecture, engineered infrastructure, and agrarian power. Tone: refined, confident, cinematic. Output JSON only.`,
        response_json_schema: {
          type: 'object',
          properties: {
            quotes: { type: 'array', items: { type: 'string' } }
          },
          required: ['quotes']
        }
      });
      if (res?.quotes?.length) setAiQuotes(res.quotes.slice(0, 6));
    })();
  }, [useAIQuotes]);

  const [aiImages, setAiImages] = useState([]);
  useEffect(() => {
    if (!generateForest) return;
    (async () => {
      const prompts = [
        'Cinematic aerial pine forest at blue hour, mist, photorealistic, 16:9, soft vignette, warm twilight sky, luxury real estate backdrop',
        'Longleaf pines in North Carolina at dusk, subtle haze, moody greens, photoreal landscape, premium lifestyle catalog vibe'
      ];
      const gens = await Promise.all(prompts.map((p) => base44.integrations.Core.GenerateImage({ prompt: p })));
      const urls = gens.map((g) => g?.url).filter(Boolean);
      setAiImages(urls.map((u) => ({ src: u, alt: 'AI forest background' })));
    })();
  }, [generateForest]);

  // Pull ALL images from room data (hero + gallery), dedupe, then slice
  const images = useMemo(() => {
    const normalizedCustom = (customImages || [])
      .map((ci) => (typeof ci === 'string' ? { src: ci, alt: 'Background' } : ci))
      .filter(Boolean);

    if (onlyCustom) {
      return dedupeBySrc(normalizedCustom).slice(0, max);
    }

    const base = ROOMS.flatMap((r) => {
      const arr = [];
      if (r.heroImage) arr.push({ src: r.heroImage, alt: r.heroAlt || r.title });
      if (Array.isArray(r.images)) {
        arr.push(...r.images.map((im) => ({ src: im.src, alt: im.caption || r.title })));
      }
      return arr;
    });

    const generated = aiImages || [];
    const all = [...normalizedCustom, ...base, ...generated];
    const deduped = dedupeBySrc(all);
    return deduped.slice(0, max);
  }, [max, customImages, aiImages, onlyCustom]);

  const quotesToUse = (useAIQuotes && aiQuotes && aiQuotes.length) ? aiQuotes : quotes;
  const interleave = [];
  let qi = 0;
  images.forEach((img, i) => {
    const quote = ((i + 1) % 2 === 0 && qi < quotesToUse.length) ? quotesToUse[qi++] : null;
    interleave.push({ type: 'image', data: img, quote, i });
  });

  return (
    <div className={`w-full bg-black text-white ${className}`}>
      {interleave.map((block, idx) => {
        if (block.type === 'image') {
          const isFirst = idx === 0 && showStatsChips;
          return (
            <BleedImageSection
              key={`img-${block.i}`}
              src={block.data.src}
              alt={block.data.alt}
              showChips={isFirst}
              overlayQuote={block.quote}
            />
          );
        }


      })}
    </div>
  );
}