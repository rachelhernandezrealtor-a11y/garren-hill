import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SCENES = [
  {
    eyebrow: 'The first truth',
    title: 'This story starts with the land itself.',
    copy: 'The home page begins with atmosphere, acreage, and arrival: fifteen acres of forest, farmland, and a self-sustaining compound near Pinehurst. Before architecture, before plans, the real opportunity is the land position already established here.',
    accent: 'Land first',
    image: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e6c0e9783_forestpath.jpg',
    imageClass: 'cinematic-dark'
  },
  {
    eyebrow: 'The second truth',
    title: 'Then the vision becomes larger.',
    copy: 'As the page unfolds, the narrative moves from privacy and beauty into optionality: estate living, hospitality potential, regenerative farming, and a long-horizon legacy play. The opportunity is not one isolated feature, but the way multiple futures can coexist on one property.',
    accent: 'Optionality',
    image: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
    imageClass: 'cinematic-exterior'
  },
  {
    eyebrow: 'The third truth',
    title: 'Location gives the narrative its power.',
    copy: 'The home page keeps returning to the same strategic advantage: close to Pinehurst, yet protected and self-possessed. That proximity brings relevance, prestige, and demand; the privacy preserves rarity. Together, they create a position that is difficult to replicate.',
    accent: 'Proximity + privacy',
    image: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1d6a2f95f_bridge_aerial.jpg',
    imageClass: 'cinematic-warm'
  },
  {
    eyebrow: 'The final truth',
    title: 'Everything on the page points to one conclusion.',
    copy: 'The compound, the infrastructure, the stewardship, the agricultural credibility, and the architectural ambition are not separate stories. They are evidence. They support one central idea: this is a rare property with both immediate presence and long-term strategic upside.',
    accent: 'The conclusion',
    image: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7711a3672_tunnelgood.jpg',
    imageClass: 'cinematic-warm'
  }
];

function OpportunityScene({ scene, index, total, scrollYProgress }) {
  const start = index / total;
  const end = (index + 1) / total;

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.04), start + 0.08, end - 0.12, end],
    [0, 1, 1, 0]
  );

  const textY = useTransform(scrollYProgress, [start, end], ['6%', '-6%']);
  const imageScale = useTransform(scrollYProgress, [start, end], [1.08, 1.01]);

  return (
    <motion.div className="absolute inset-0" style={{ opacity }}>
      <motion.img
        src={scene.image}
        alt={scene.title}
        className={`absolute inset-0 h-full w-full object-cover ${scene.imageClass}`}
        style={{ scale: imageScale, willChange: 'transform' }}
      />

      <div className="absolute inset-0 bg-[rgba(10,8,7,0.34)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,248,240,0.16)_0%,rgba(255,248,240,0.05)_28%,transparent_58%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,7,6,0.2)_0%,rgba(8,7,6,0.08)_22%,rgba(8,7,6,0.12)_46%,rgba(8,7,6,0.56)_100%)]" />

      <motion.div
        className="relative z-10 mx-auto flex h-full w-full max-w-[1380px] items-end px-6 pb-16 pt-28 sm:px-8 sm:pb-20 md:px-12 md:pb-24 lg:px-16 lg:pb-28"
        style={{ y: textY }}
      >
        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,1.2fr)_320px] lg:items-end lg:gap-16">
          <div className="max-w-[760px] text-white">
            <p className="mb-5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.42em] text-[#e4cfad]/76 sm:text-[0.68rem]">
              {scene.eyebrow}
            </p>
            <h2
              className="mb-6 max-w-[10ch] text-white"
              style={{
                fontSize: 'clamp(2.9rem, 6.6vw, 6.4rem)',
                lineHeight: 0.92,
                fontWeight: 400,
                letterSpacing: '0.01em',
                textShadow: '0 10px 36px rgba(0,0,0,0.34)'
              }}
            >
              {scene.title}
            </h2>
            <p
              className="m-0 max-w-[58ch] text-white/88"
              style={{
                fontSize: 'clamp(0.98rem, 1.15vw, 1.1rem)',
                lineHeight: 1.95,
                letterSpacing: '0.01em'
              }}
            >
              {scene.copy}
            </p>
            <p
              className="mt-6 mb-0 max-w-[24ch] font-display italic text-[#f2e6d3]/72"
              style={{
                fontSize: 'clamp(1rem, 1.5vw, 1.35rem)',
                lineHeight: 1.58,
                letterSpacing: '0.018em',
                textShadow: '0 6px 20px rgba(0,0,0,0.24)'
              }}
            >
              The rarest estates are felt before they are explained.
            </p>
          </div>

          <div className="w-full max-w-[320px] justify-self-start lg:justify-self-end">
            <div className="border border-[#d6c2a1]/24 bg-[rgba(12,10,8,0.34)] p-5 backdrop-blur-xl sm:p-6 lg:p-7" style={{ boxShadow: '0 30px 90px rgba(0,0,0,0.26)' }}>
              <p className="m-0 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.28em] text-white/48">
                {scene.accent}
              </p>
              <div className="mt-6 h-px w-full bg-white/14" />
              <p className="mb-0 mt-6 font-serif text-[1.22rem] leading-[1.45] text-white/92 sm:text-[1.34rem]">
                {index === total - 1
                  ? 'Land, location, stewardship, and vision aligned into one rare opportunity.'
                  : 'Each section deepens the same truth: this property gains power because the parts reinforce each other.'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OpportunityProgress({ scrollYProgress }) {
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="absolute right-4 top-1/2 z-20 hidden h-[240px] -translate-y-1/2 md:flex md:flex-col md:items-center">
      <span className="mb-4 rotate-180 font-sans text-[0.52rem] font-semibold uppercase tracking-[0.28em] text-white/45 [writing-mode:vertical-rl]">
        Opportunity
      </span>
      <div className="relative h-full w-px bg-white/16">
        <motion.div className="absolute left-0 top-0 w-px bg-white" style={{ height }} />
      </div>
    </div>
  );
}

export default function OpportunityNarrativeSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end']
  });

  return (
    <section ref={ref} className="relative w-full bg-[#090807]" style={{ height: `${SCENES.length * 100}vh`, paddingTop: 0, paddingBottom: 0 }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {SCENES.map((scene, index) => (
          <OpportunityScene
            key={scene.title}
            scene={scene}
            index={index}
            total={SCENES.length}
            scrollYProgress={scrollYProgress}
          />
        ))}

        <OpportunityProgress scrollYProgress={scrollYProgress} />

        <div className="absolute inset-x-0 top-0 z-20 h-24 bg-[linear-gradient(to_bottom,rgba(9,8,7,0.82)_0%,transparent_100%)]" />
        <div className="absolute inset-x-0 bottom-0 z-20 h-32 bg-[linear-gradient(to_top,rgba(9,8,7,0.72)_0%,transparent_100%)]" />
      </div>
    </section>
  );
}