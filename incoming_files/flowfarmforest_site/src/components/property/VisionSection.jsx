import React from 'react';
import { motion } from 'framer-motion';
import KeyFeatureBox from './KeyFeatureBox';

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } }
};

export default function VisionSection() {
  return (
    <section
      id="vision"
      className="relative h-[50vh] md:h-[70vh] pt-16 md:pt-24 px-4 sm:px-6 -mt-6 md:-mt-12 bg-cover bg-no-repeat bg-[center_35%]"
    >
      <style>{`
        #vision {
          background-image: url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/077cd420d_drone-background-mobile-1080x1350.jpg');
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center 35%;
          background-attachment: scroll;
        }
        @media (min-width: 768px) {
          #vision {
            background-image: url('https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a8c6b6c09f3f53db8fa60a/9cb1f2c8e_drone-background-desktop-1920x1080.jpg');
          }
        }
      `}</style>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/35" />


      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="relative">

          <div className="flex items-center gap-3 mb-6">
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-white font-medium">The Vision</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-light text-white leading-[1.15] mb-8">
            Where luxury meets legacy, and the land continues to flow
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 max-w-2xl">
            <KeyFeatureBox
              index={0}
              title="Private Sanctuary"
              description="15.4 contiguous acres just 3 miles from Pinehurst's heart. Rare scale, privacy, and long-term control in Moore County's most desirable corridor." />

            <KeyFeatureBox
              index={1}
              title="Golf Membership"
              description="Transferable Pinehurst Country Club Signature Golf Membership including Pinehurst No. 7 and No. 9, connecting to a global audience year-round." />

            <KeyFeatureBox
              index={2}
              title="Agricultural Zoning"
              description="USDA zoning supports agritourism, hospitality, regenerative agriculture, and equestrian pursuits with potential tax advantages through present-use valuation." />

            <KeyFeatureBox
              index={3}
              title="Sustainable Systems"
              description="Geothermal systems, solar integration, private wells, and high-performance construction ensure efficiency and energy independence with modern connectivity." />

          </div>
        </motion.div>
      </div>
    </section>
  );
}