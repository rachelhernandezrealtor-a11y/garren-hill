import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Building2, Car, Flag } from 'lucide-react';
import ParallaxBg from './ParallaxBg';

const experiences = [
{
  icon: Plane,
  title: 'Moore County Regional Airport',
  description: 'Private aviation facility minutes away — direct access for domestic and charter flights.'
},
{
  icon: Car,
  title: 'Raleigh-Durham International',
  description: 'Just over an hour\'s drive — seamless connections to national and international destinations.'
},
{
  icon: Building2,
  title: 'FirstHealth Moore Regional Hospital',
  description: 'Advanced medical care nearby, providing peace of mind for residents and guests.'
},
{
  icon: Flag,
  title: 'Pinehurst Golf',
  description: 'Iconic golf destination just minutes away, with a transferable Signature Golf Membership included.'
}];


const BG_IMAGE = 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/7befdab6-2668-4847-fb00-cb40c4ab5b00/public';

export default function LifestyleSection() {
  return (
    <ParallaxBg backgroundImage={BG_IMAGE} intensity={0.4}>
      <section id="lifestyle" className="py-24 md:py-36 px-4 sm:px-6 relative">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 lg:gap-24 items-start">

          {/* Left — sticky on desktop */}
          <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8 }}
              className="md:sticky md:top-28">

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-white" />
              <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-white font-medium">Location & Access</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-[1.15] mb-6">Strategic Location

              </h2>
            <p className="font-sans text-white leading-relaxed text-sm font-light mb-10">
              Strategically located, Flow Farm offers rare privacy without isolation — minutes from Pinehurst,
              private aviation, advanced healthcare, and within easy reach of a major international airport.
            </p>

            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              

            </div>
          </motion.div>

          {/* Right — Experience list */}
          <div className="space-y-4">
            {experiences.map((exp, index) =>
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex items-start gap-5 p-5 sm:p-6 bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-500">

                <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center border border-white/30 bg-white/5 group-hover:bg-white/10 transition-colors duration-400">
                  <exp.icon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-light text-white mb-1">{exp.title}</h3>
                  <p className="font-sans text-white/80 leading-relaxed text-xs font-light">{exp.description}</p>
                </div>
              </motion.div>
              )}
          </div>
        </div>
      </div>
      </div>
      </section>
    </ParallaxBg>
  );
}