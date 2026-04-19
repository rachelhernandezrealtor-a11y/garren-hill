import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sprout, Wheat, Leaf, Hammer } from 'lucide-react';
import EstateOverviewCinematic from '@/components/property/EstateOverviewCinematic.jsx';
import { fadeUp, revealViewport } from './motionConfig';

export default function NewMainResidenceReturn({ sections, renderSection }) {
  return (
    <section className="w-full pb-16 sm:pb-20 md:pb-28 bg-white overflow-x-hidden overflow-y-visible">

      {/* Cinematic estate overview — single continuous scroll experience */}
      <EstateOverviewCinematic />

      {/* Detailed sections */}
      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10" style={{ paddingTop: 'clamp(48px, 7vh, 80px)' }}>

        {/* Estate description */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.0, delay: 0.15, ease: [0.22, 0.1, 0.28, 1] }}
          style={{ maxWidth: '680px', marginBottom: 'clamp(48px, 7vh, 72px)' }}
        >
          <p className="font-sans text-foreground/60" style={{ fontSize: 'clamp(0.875rem, 1.05vw, 1.0rem)', lineHeight: '2', letterSpacing: '0.005em', marginBottom: 'clamp(18px, 2.5vh, 28px)' }}>Flow Farm unfolds as a private estate across eight acres, with thoughtfully designed structures and cultivated grounds, including a three-acre veganic farm secured by deer fencing and a separate single-fenced dog run. To the north, approximately seven additional acres extend into pristine, undeveloped forest, creating a natural buffer of towering pines and hardwoods while offering exceptional potential for future expansion.</p>
          <p className="font-sans text-foreground/50 mb-0" style={{ fontSize: 'clamp(0.875rem, 1.05vw, 1.0rem)', lineHeight: '2', letterSpacing: '0.005em' }}>The estate{"'"}s current configuration also provides ample space for the creation of a formal driveway and a more defined arrival sequence. The estate offers multiple points of access, including a primary entrance from Linden Trail and additional access via Linden Road, Mollie Lane, and Skene Lane.</p>
        </motion.div>

        {/* Structure icons — whispered editorial detail */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.4, delay: 0.6, ease: [0.22, 0.03, 0.18, 1] }}
          style={{
            marginBottom: 'clamp(72px, 10vh, 108px)',
            paddingTop: 'clamp(48px, 6vh, 64px)',
            paddingBottom: 'clamp(48px, 6vh, 64px)',
            borderTop: '1px solid rgba(0,0,0,0.025)',
            borderBottom: '1px solid rgba(0,0,0,0.025)',
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-12 sm:gap-14 md:gap-16 lg:gap-20">
            <div className="text-center">
              <Home className="mx-auto mb-4 sm:mb-5" style={{ width: '13px', height: '13px', color: 'rgba(0,0,0,0.12)' }} strokeWidth={0.8} />
              <h4 className="font-sans font-normal mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.30)' }}>Guest House</h4>
              <p className="font-sans mb-0" style={{ fontSize: '10px', letterSpacing: '0.04em', color: 'rgba(0,0,0,0.16)' }}>3,372 SF</p>
            </div>
            <div className="text-center">
              <Sprout className="mx-auto mb-4 sm:mb-5" style={{ width: '13px', height: '13px', color: 'rgba(0,0,0,0.12)' }} strokeWidth={0.8} />
              <h4 className="font-sans font-normal mb-0" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.30)' }}>Greenhouse &amp; High Tunnel</h4>
            </div>
            <div className="text-center">
              <Wheat className="mx-auto mb-4 sm:mb-5" style={{ width: '13px', height: '13px', color: 'rgba(0,0,0,0.12)' }} strokeWidth={0.8} />
              <h4 className="font-sans font-normal mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.30)' }}>Veganic Farm</h4>
              <p className="font-sans mb-0" style={{ fontSize: '10px', letterSpacing: '0.04em', color: 'rgba(0,0,0,0.16)' }}>3 Acres</p>
            </div>
            <div className="text-center">
              <Leaf className="mx-auto mb-4 sm:mb-5" style={{ width: '13px', height: '13px', color: 'rgba(0,0,0,0.12)' }} strokeWidth={0.8} />
              <h4 className="font-sans font-normal mb-0" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.30)' }}>Biochar &amp; Compost</h4>
            </div>
            <div className="text-center">
              <Hammer className="mx-auto mb-4 sm:mb-5" style={{ width: '13px', height: '13px', color: 'rgba(0,0,0,0.12)' }} strokeWidth={0.8} />
              <h4 className="font-sans font-normal mb-1" style={{ fontSize: '11px', letterSpacing: '0.08em', color: 'rgba(0,0,0,0.30)' }}>Workshop</h4>
              <p className="font-sans mb-0" style={{ fontSize: '10px', letterSpacing: '0.04em', color: 'rgba(0,0,0,0.16)' }}>30' × 40'</p>
            </div>
          </div>
        </motion.div>

        {/* Sections sequence */}
        <motion.div initial="hidden" whileInView="visible" viewport={revealViewport} variants={fadeUp}>
          {sections.map((section) => (
            <div key={section.id}>
              {renderSection(section)}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}