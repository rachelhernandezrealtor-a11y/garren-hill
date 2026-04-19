import React from 'react';
import { Bed, Bath, Ruler, Car, Cog } from 'lucide-react';

const stats = [
  { icon: Bed, value: '6', label: 'Bedrooms' },
  { icon: Bath, value: '7.5', label: 'Bathrooms' },
  { icon: Car, value: '3', label: 'Car Garage' },
  { icon: Ruler, value: '8,519', label: 'SF Main' },
  { icon: Ruler, value: '1,709', label: 'SF Lower' },
  { icon: Cog, value: '2,531', label: 'SF Systems' },
];

export default function MainResidenceStatsGrid() {
  return (
    <div className="mb-10 sm:mb-12 md:mb-14">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-0 border-y border-stone-200/80">
        {stats.map(({ icon: Icon, value, label }, index) => (
          <div
            key={label}
            className={[
              'px-3 py-5 sm:px-4 sm:py-6 text-center',
              index < 3 ? 'border-b border-stone-200/70 sm:border-b' : '',
              index % 3 !== 2 ? 'sm:border-r sm:border-stone-200/70' : '',
              index % 2 === 0 ? 'border-r border-stone-200/70 sm:border-r-0' : '',
            ].join(' ')}
          >
            <Icon className="w-3.5 h-3.5 text-stone-400 mx-auto mb-2.5" strokeWidth={1.2} />
            <div className="font-serif text-[1.9rem] sm:text-[2.15rem] leading-none font-light text-stone-900 tracking-[-0.02em] mb-2">
              {value}
            </div>
            <div className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.24em] text-stone-500">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}