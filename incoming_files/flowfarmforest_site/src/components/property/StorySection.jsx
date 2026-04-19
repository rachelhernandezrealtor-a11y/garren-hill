import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: '15.4', label: 'Contiguous Acres' },
  { value: '3 mi', label: 'From Pinehurst' },
  { value: 'Pinehurst No. 7 & 9', label: 'Golf Membership' },
  { value: 'USDA', label: 'Agricultural Zoning' },
];

export default function StorySection() {
  return (
    <section id="story" className="relative py-24 md:py-36 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url(https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/80f153c11_107LindenTrail-104.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
        }}
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/65" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
           initial={{ opacity: 0, y: 28 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: '-80px' }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16 md:mb-20 p-8 sm:p-14 bg-black/25 backdrop-blur-sm rounded-lg"
         >
          <div className="flex items-center justify-center gap-3 mb-7">
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/80 font-medium">The Opportunity</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-[1.15] max-w-3xl mx-auto mb-6">
            Built for enterprise, <em className="italic">designed</em> for legacy
          </h2>
          <div className="font-sans text-white/70 text-sm max-w-2xl mx-auto leading-relaxed font-light space-y-4">
            <p>
              Designed by acclaimed architect <strong className="text-white/90">Robert Clark</strong> as one of his final works,
              the main residence is a culminating expression of proportion, flow, and livable grandeur — encompassing{' '}
              <strong className="text-white/90">8,519 SF of finished heated living space above grade</strong>, plus{' '}
              <strong className="text-white/90">1,709 SF of partially finished walk-out lower level</strong>, and an additional{' '}
              <strong className="text-white/90">2,531 SF conditioned crawl space</strong> with accessible mechanical systems.
              A three-car garage and separate cabana house, structurally complete and ready for interior finish, provide
              exceptional flexibility for guest accommodations, retreat use, or expanded residential capacity.
            </p>
            <p>
              Flow Farm isn't just a residence — it's a living enterprise. The estate's established organic farm opens
              doors to multiple income streams: host holistic retreats or destination weddings, develop a branded line of
              organic produce or wellness products, offer culinary or sustainability workshops, or create an exclusive
              wellness and retreat center.
            </p>
            <p>
              Internal access roads provide convenient and discreet circulation across the land, connecting residential,
              agricultural, and operational areas with intention and efficiency. Existing structures are thoughtfully
              positioned and ready for immediate use, allowing immediate activation while preserving flexibility for
              future expansion.
            </p>
            <p>
              The home is engineered for resilience and independence: a 30 kW Kohler whole-house generator, a 14.3 kW
              solar array, a private well producing up to 50 GPM, and a sophisticated geothermal system of 20 deep wells
              managing five HVAC zones. A fully equipped gourmet kitchen with Sub-Zero refrigeration, a Wolf 60-inch
              dual-fuel range, and professional-grade appliances throughout further elevate the estate's operational readiness.
            </p>
            <p>
              Beyond the residence, the property includes a 96 × 36 ft high tunnel greenhouse with a custom geothermal
              climate system, an O2Compost system, biochar production kiln, a 30 × 40 ft farm workshop, walk-in cooler,
              and approximately 1,400 ft of double deer fencing enclosing three acres of active cultivation.
            </p>
            <p>
              Together, these integrated systems create a rare foundation for independence, efficiency, and scalability —
              fully engineered to operate effortlessly as a private estate, retreat center, hospitality destination, or
              visionary enterprise for generations to come.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="text-center p-6 sm:p-8 border border-white/15 bg-white/5 backdrop-blur-sm"
            >
              <div className="font-serif text-3xl sm:text-4xl font-light text-accent mb-2">{stat.value}</div>
              <div className="font-sans text-[9px] tracking-[0.25em] uppercase text-white/50">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}