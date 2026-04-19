import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Leaf, Users, Plane, Heart, Navigation } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const keyboxes = [
  {
    id: 1,
    icon: MapPin,
    title: 'Prime Location',
    description: 'Situated in the heart of the region with easy access to major cities and attractions, offering the perfect balance of seclusion and convenience.'
  },
  {
    id: 2,
    icon: Zap,
    title: 'Regional Connectivity',
    description: 'Located just minutes from Pinehurst golf destination, with excellent proximity to established communities and cultural hubs.'
  },
  {
    id: 3,
    icon: Leaf,
    title: 'Natural Environment',
    description: 'Surrounded by pristine countryside, forests, and agricultural land, providing a serene setting for sustainable development.'
  },
  {
    id: 4,
    icon: Users,
    title: 'Community Access',
    description: 'Near vibrant towns and villages that cater to both wellness retreats and luxury hospitality experiences throughout the year.'
  }
];

export default function LocationSection() {
  return (
    <section className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-5xl mx-auto text-center mb-16 sm:mb-20 md:mb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-0">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-accent font-medium">Location</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-foreground leading-tight mb-8">
            A Strategic Setting
          </h2>
          <p className="font-sans text-lg sm:text-xl md:text-2xl text-foreground/65 font-light leading-relaxed max-w-4xl mx-auto">
            The property's location combines accessibility with tranquility, offering unique opportunities for both private enjoyment and enterprise development.
          </p>
        </motion.div>
      </div>

      {/* Keyboxes Grid */}
      <div className="max-w-6xl mx-auto mb-20 sm:mb-28 md:mb-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 md:gap-8">
          {keyboxes.map((box, idx) => {
            const IconComponent = box.icon;
            return (
              <motion.div
                key={box.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: idx * 0.1 }}
                variants={fadeUp}
                className="group rounded-xl overflow-hidden bg-card border border-border p-8 hover:shadow-lg transition-all duration-300">
                
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300">
                    <IconComponent className="w-6 h-6 text-accent" />
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-3">
                  {box.title}
                </h3>

                <p className="font-sans text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {box.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Accessibility Section */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-start">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="space-y-6">
            
            <div>
              <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-foreground mb-7 leading-tight">
                Strategically Located
              </h3>
              <p className="font-sans text-lg sm:text-xl text-foreground/70 leading-relaxed font-light">
                Flow Farm offers seamless accessibility. Moore County Airport, a private aviation facility, is just minutes away, while FirstHealth Moore Regional Hospital is nearby, providing advanced medical care. Raleigh-Durham International Airport is approximately 70 miles, or just over an hour's drive, connecting the property directly to national and international destinations.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-9">
               <div className="flex gap-5 items-start">
                 <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                   <Plane className="w-6 h-6 text-accent" />
                 </div>
                 <div>
                   <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-2">Moore County Airport</h4>
                   <p className="font-sans text-base sm:text-lg text-foreground/70 font-light leading-relaxed">Private aviation facility just minutes away for private charter flights and convenient arrivals.</p>
                 </div>
               </div>

               <div className="flex gap-5 items-start">
                 <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                   <Heart className="w-6 h-6 text-accent" />
                 </div>
                 <div>
                   <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-2">Medical Services</h4>
                   <p className="font-sans text-base sm:text-lg text-foreground/70 font-light leading-relaxed">FirstHealth Moore Regional Hospital nearby, providing advanced medical care and emergency services.</p>
                 </div>
               </div>

               <div className="flex gap-5 items-start">
                 <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                   <Navigation className="w-6 h-6 text-accent" />
                 </div>
                 <div>
                   <h4 className="font-serif text-xl sm:text-2xl font-light text-foreground mb-2">Raleigh-Durham International</h4>
                   <p className="font-sans text-base sm:text-lg text-foreground/70 font-light leading-relaxed">RDU Airport is approximately 70 miles—just over an hour's drive—connecting to national and international destinations.</p>
                 </div>
               </div>
             </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="relative rounded-xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
              alt="Map of Flow Farm location and accessibility"
              className="w-full h-auto object-cover rounded-xl shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-sans text-xs sm:text-sm text-white/90 bg-black/40 backdrop-blur-sm rounded-lg px-4 py-3">
                Strategic location with multiple access points and proximity to essential services
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}