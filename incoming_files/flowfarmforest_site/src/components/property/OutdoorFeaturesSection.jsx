import React from 'react';
import { motion } from 'framer-motion';
import { Fence, Trees, Dog } from 'lucide-react';

const outdoorFeatures = [
  {
    icon: Fence,
    title: 'Deer Fencing',
    stat: '~1,400 ft',
    description: 'Double deer fencing enclosing approximately 3 acres of cultivated garden space, providing secure growing areas and defined landscape boundaries.',
  },
  {
    icon: Dog,
    title: 'Fenced Dog Run',
    description: 'Dedicated secure space for pets, thoughtfully integrated into the broader estate landscape with convenient access from the main residence.',
  },
  {
    icon: Trees,
    title: 'Private Treehouse',
    description: "Elevated retreat nestled within the property's protected woodland, offering a secluded vantage point overlooking the forest canopy.",
  },
];

export default function OutdoorFeaturesSection() {
  return (
    <section id="outdoor-features" className="bg-background py-24 md:py-36 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-7">
            <div className="h-px w-8 sm:w-12 bg-accent" />
            <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-accent font-medium">
              Outdoor Living
            </span>
            <div className="h-px w-8 sm:w-12 bg-accent" />
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-primary mb-6 leading-[1.15]">
            Thoughtfully designed <em className="italic">outdoor</em> spaces
          </h2>
          <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            From cultivated garden areas to private retreats, the estate's outdoor infrastructure provides both functional growing space and recreational sanctuary within the natural landscape.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {outdoorFeatures.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="group bg-card border border-border p-8 hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center border border-accent/30 bg-accent/5 group-hover:bg-accent/10 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-light text-primary mb-1">
                      {feature.title}
                    </h3>
                    {feature.stat && (
                      <p className="font-sans text-sm font-light text-accent">
                        {feature.stat}
                      </p>
                    )}
                  </div>
                </div>
                <p className="font-sans text-sm font-light text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Image */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 overflow-hidden"
        >
          <img
            src="https://images.unsplash.com/photo-1469022563149-aa64dbd37dae?w=1200&q=85"
            alt="Outdoor garden and fenced areas"
            className="w-full h-96 md:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
          />
        </motion.div>
      </div>
    </section>
  );
}