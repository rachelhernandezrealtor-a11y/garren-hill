import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Bath, Sprout, Hammer, Recycle, Flame } from 'lucide-react';


const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};


const KITCHEN_IMAGE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/195810d61_260115107LindenTrailF-9523-Copy1.jpg';

export default function EstateCompoundSection() {
  const structures = [
  { name: 'Architecturally significant main residence', icon: Home },
  { name: 'Private cabana house', icon: Bath },
  { name: 'Climate-controlled high tunnel greenhouse', icon: Sprout },
  { name: 'Operational farm workshop', icon: Hammer },
  { name: 'Regenerative compost area', icon: Recycle },
  { name: 'Biochar production zone', icon: Flame }];


  const [bgImage, setBgImage] = useState(KITCHEN_IMAGE);

  return (
    <section
      id="estate-compound-detail"
      className="relative pt-6 sm:pt-8 md:pt-12 pb-16 sm:pb-24 md:pb-32 lg:pb-40 px-4 sm:px-6 bg-white"
      style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.75), rgba(255,255,255,0.75)), url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}>

      

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="flex flex-col">

          <p className="font-sans text-[8px] sm:text-xs tracking-[0.25em] uppercase text-foreground/60 font-medium mb-3 sm:mb-4">The Opportunity</p>

          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground leading-tight sm:leading-[1.15] max-w-3xl mb-6 sm:mb-8 text-left">
            Built for enterprise, <em className="italic">designed</em> for legacy
          </h2>

          <p className="text-foreground/70 mb-6 sm:mb-8 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-3xl">The main compound sits on approximately eight acres and offers exceptional flexibility for its next chapter. With USDA agricultural zoning, privacy, scale, sustainable infrastructure, and state-of-the-art technology and systems, a Robert Clark-designed estate residence, guest residence, and 3-acre veganic farm come together in an extraordinary setting suited for a primary residence, or a destination-driven venture.

          </p>

          <p className="font-serif text-base sm:text-lg md:text-xl lg:text-2xl italic text-foreground/80 leading-relaxed max-w-2xl mb-8 sm:mb-10 md:mb-12">
            &ldquo;Flow Farm integrates an extraordinary level of infrastructure and systems rarely found in a private estate, combining luxury living with advanced engineering, sustainability, and operational readiness.&rdquo;
          </p>

          <div className="max-w-2xl mb-8 sm:mb-10 md:mb-12">
            <h3 className="font-serif text-lg sm:text-xl md:text-2xl font-light text-foreground mb-4 sm:mb-6">Interconnected Structures</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left">
              {structures.map((structure, index) => {
                const IconComponent = structure.icon;
                return (
                  <li key={index} className="flex items-center gap-2 sm:gap-3 text-foreground/80 text-xs sm:text-sm md:text-base font-light">
                    <IconComponent className="w-4 sm:w-5 h-4 sm:h-5 text-amber-600 flex-shrink-0" />
                    {structure.name}
                  </li>);

              })}
            </ul>
          </div>

        </motion.div>

        {/* Kitchen Image - Right Corner */}
        










      </div>
    </section>);

}