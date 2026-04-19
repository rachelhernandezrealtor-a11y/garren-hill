import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Leaf } from 'lucide-react';

export default function FeaturedCrops() {
  const { data: crops = [], isLoading } = useQuery({
    queryKey: ['featuredCrops'],
    queryFn: async () => {
      // Get up to 3 featured crops, ordered
      const items = await base44.entities.FarmCrop.filter({ is_featured: true }, 'order', 3);
      return items || [];
    },
    initialData: []
  });

  if (isLoading) return null;
  if (!crops || crops.length === 0) return null;

  return (
    <div className="mt-10">
      <p className="mb-4 font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">Featured Crops</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {crops.map((c) => (
          <article key={c.id} className="overflow-hidden border border-white/10 bg-[#111] rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <div className="relative h-56 sm:h-64">
              <img src={c.image_url} alt={c.name} className="absolute inset-0 w-full h-full object-cover cinematic-warm" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
              <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/25 bg-black/30 text-white text-[0.7rem] uppercase tracking-[0.18em]">
                <Leaf className="h-3.5 w-3.5" /> {c.is_vegan === false ? 'Non‑Vegan' : 'Vegan'}
              </div>
              <div className="absolute left-4 right-4 bottom-3">
                <h4 className="mb-1 font-display text-white text-lg leading-tight drop-shadow">{c.name}</h4>
                {c.tasting_note && (
                  <p className="mb-0 text-white/85 text-sm leading-snug line-clamp-2 drop-shadow">{c.tasting_note}</p>
                )}
              </div>
            </div>
            {Array.isArray(c.varietals) && c.varietals.length > 0 && (
              <div className="px-4 py-3 flex flex-wrap gap-2 border-t border-white/10 bg-[#0e0e0e]">
                {c.varietals.slice(0, 6).map((v, i) => (
                  <span key={i} className="inline-block px-2.5 py-1 rounded-full border border-white/15 text-white/80 text-[0.72rem] leading-none">{v}</span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}