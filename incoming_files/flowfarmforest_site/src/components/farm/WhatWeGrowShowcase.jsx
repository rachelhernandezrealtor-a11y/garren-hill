import React from 'react';
import { Leaf, ShieldCheck } from 'lucide-react';
import FarmCropGallery from '@/components/property/cinematic/FarmCropGallery';
import FeaturedCrops from '@/components/farm/FeaturedCrops';

export default function WhatWeGrowShowcase({ crops = [], galleryImages = [], intervalMs = 4500 }) {
  return (
    <section className="relative z-10 mt-8">
      <div
        className="glass-bold glass-card relative overflow-hidden border rounded-2xl p-6 sm:p-8 lg:p-10"
        style={{ boxShadow: '0 28px 80px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(201,177,143,0.28)' }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0" style={{
          background: 'radial-gradient(120% 120% at 80% -10%, rgba(201,177,143,0.09), rgba(0,0,0,0))'
        }} />

        {/* Header */}
        <div className="relative mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[0.66rem] font-bold tracking-[0.28em] uppercase text-white/80">
              <Leaf className="h-3.5 w-3.5" /> Grown On The Land
            </span>
          </div>
          <h3 className="mt-4 mb-1 font-display text-[clamp(2.4rem,4.8vw,3.8rem)] leading-[1.02] text-white">
            What We Grow
          </h3>
          <p className="mb-0 max-w-[52ch] text-white/80">
            A living engine of seasonal produce—curated varietals, veganic practices, and USDA-registered operations that secure the estate’s agricultural standing.
          </p>
        </div>

        {/* Quick tags */}
        {Array.isArray(crops) && crops.length > 0 && (
          <div className="relative mt-6">
            <div className="flex flex-wrap gap-2.5">
              {crops.map((c) => (
                <span key={c} className="inline-block border border-white/20 text-white/85 px-3 py-1.5 rounded-full text-[0.82rem] leading-none">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Badges / mini-stats */}
        <div className="mt-6 flex flex-wrap gap-3 text-white/85">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[0.78rem]">
            <ShieldCheck className="h-3.5 w-3.5" /> USDA Registered
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[0.78rem]">
            <Leaf className="h-3.5 w-3.5" /> Veganic Practices
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[0.78rem]">
            3 Acres In Production
          </span>
        </div>

        {/* Content grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f]">
            <FarmCropGallery images={galleryImages} intervalMs={intervalMs} />
          </div>
          <div className="min-w-0">
            <FeaturedCrops />
          </div>
        </div>
      </div>
    </section>
  );
}