import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { features } from './data/featuresSectionData';

export default function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState(0);
  const activeFeature = features[selectedFeature];

  return (
    <section className="w-full bg-[#f3efe8]" style={{ padding: 'clamp(72px, 9vh, 120px) 0' }}>
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div className="flex flex-col justify-between gap-8">
          <div className="max-w-2xl">
            <span className="mb-4 block font-sans text-[10px] font-semibold uppercase tracking-[0.34em] text-[#9a8c7a]">
              Residence Systems
            </span>
            <h2
              className="font-display text-[#171614]"
              style={{ fontSize: 'clamp(2.3rem, 4.8vw, 4.2rem)', lineHeight: 1.02, marginBottom: '18px' }}
            >
              Core features that make the estate function beautifully.
            </h2>
            <p className="max-w-xl font-sans text-[#5f5a52]" style={{ fontSize: 'clamp(0.95rem, 1.05vw, 1.02rem)', lineHeight: 1.9, margin: 0 }}>
              From culinary infrastructure to energy resilience, these systems turn the property from a beautiful setting into a capable long-term residence.
            </p>
          </div>

          <div className="grid gap-3">
            {features.map((feature, index) => {
              const isActive = selectedFeature === index;
              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setSelectedFeature(index)}
                  className="w-full text-left transition-all duration-300"
                  style={{
                    background: isActive ? 'rgba(27,25,23,0.94)' : 'rgba(255,255,255,0.72)',
                    color: isActive ? '#f6f4ef' : '#171614',
                    border: `1px solid ${isActive ? 'rgba(27,25,23,0.82)' : 'rgba(154,140,122,0.18)'}`,
                    padding: '18px 20px',
                    borderRadius: '2px',
                    boxShadow: isActive ? '0 14px 30px rgba(0,0,0,0.10)' : 'none'
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="mb-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] opacity-60">
                        {feature.detail}
                      </div>
                      <div className="font-display" style={{ fontSize: 'clamp(1.2rem, 1.8vw, 1.55rem)', lineHeight: 1.12, marginBottom: '8px' }}>
                        {feature.title}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: 1.75, color: isActive ? 'rgba(246,244,239,0.78)' : '#6b6b67' }}>
                        {feature.highlight}
                      </p>
                    </div>
                    <ChevronRight className="mt-1 h-4 w-4 shrink-0 opacity-70" />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={activeFeature.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden border border-black/10 bg-white"
          style={{ borderRadius: '2px' }}
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/5">
            <img
              src={activeFeature.image}
              alt={activeFeature.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <div className="mb-2 font-sans text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                {activeFeature.detail}
              </div>
              <div className="font-display text-white" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.6rem)', lineHeight: 1.05 }}>
                {activeFeature.title}
              </div>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <p className="font-sans text-[#5f5a52]" style={{ fontSize: 'clamp(0.95rem, 1vw, 1rem)', lineHeight: 1.9, marginBottom: '16px' }}>
              {activeFeature.description}
            </p>
            <p className="font-sans text-[#171614]" style={{ fontSize: '0.82rem', lineHeight: 1.8, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
              {activeFeature.highlight}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}