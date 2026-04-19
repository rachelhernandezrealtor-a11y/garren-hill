import React from 'react';
import { motion } from 'framer-motion';

export default function OpportunitiesHeader() {
  return (
    <section id="opportunities" className="bg-white px-3 sm:px-4 md:px-6 border-t border-border/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl py-8 sm:py-10 md:py-12">

          <p className="font-sans text-muted-foreground text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed mb-6 sm:mb-7 md:mb-8 max-w-2xl">Thoughtfully composed to feel both grand and inviting, the residence balances beauty, comfort, and natural movement throughout. Flow Farm is designed for both residential elegance and agricultural operation: the architecturally significant main residence, private cabana house, climate-controlled high-tunnel greenhouse, operational farm workshop, regenerative compost area, and biochar production zone.</p>


          <blockquote className="border-l-4 border-accent pl-4 sm:pl-6 md:pl-8 py-3 sm:py-4 md:py-5 mb-0 bg-accent/5 rounded-r-lg">
            <p className="text-primary text-sm sm:text-base md:text-lg font-serif font-normal leading-relaxed italic">
              "Flow Farm integrates an extraordinary level of infrastructure and systems rarely found in a private estate, combining luxury living with advanced engineering, sustainability, and operational readiness."
            </p>
          </blockquote>

        </motion.div>
      </div>
    </section>);
}