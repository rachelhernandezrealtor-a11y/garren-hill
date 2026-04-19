import React from 'react';
import { motion } from 'framer-motion';
import BasementFeature from './BasementFeature';

import InteractiveRoomFlow from './InteractiveRoomFlow';
import CinematicBridge from './CinematicBridge';
import { QuoteStrip } from './ResidenceShared';

export default function LowerLevelSection() {
  return (
    <>
      <CinematicBridge
        fromImage="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2eb818889_centerstairwellhouse.jpg"
        toImage="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/f2b3b20a3_walkoutbasement.jpg"
        fromAlt="Center stairwell descending"
        toAlt="Walk-out lower level"
        caption="Descending to the Lower Level"
      />

      <div id="basement-section">
        <BasementFeature />
      </div>

      {/* Unfinished potential callout */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
        className="max-w-3xl mx-auto px-6 py-12 text-center"
        style={{ background: 'rgba(28,28,26,0.02)', borderTop: '1px solid rgba(28,28,26,0.06)', borderBottom: '1px solid rgba(28,28,26,0.06)' }}
      >
        <h4 className="font-display" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 400, lineHeight: 1.15, color: '#1C1C1A', marginBottom: '14px' }}>
          Ready for Further Finish and Long-Term Flexibility
        </h4>
        <p className="font-sans" style={{ fontSize: 'clamp(0.85rem, 1vw, 0.95rem)', lineHeight: 1.8, color: '#6B6B67', maxWidth: '640px', margin: '0 auto' }}>
          The walk-out lower level adds a theater room, recreation room, safe room, heated/cooled unfinished storage, and substantial additional storage, with plumbing, electrical, and drywall already in place for a future owner to complete more finished space as desired.
        </p>
        <p className="font-serif italic" style={{ fontSize: 'clamp(0.9rem, 1.1vw, 1rem)', lineHeight: 1.7, color: '#A48A6A', marginTop: '18px', maxWidth: '580px', marginLeft: 'auto', marginRight: 'auto' }}>
          Altogether, the layout balances privacy, entertaining, daily function, and long-term flexibility at an exceptional level.
        </p>
      </motion.div>

      <InteractiveRoomFlow />

      <QuoteStrip>
        600 amps. 189 dimmable circuits. Five geothermal zones. 20 wells at 300 feet. 14.3 kW solar. 30 kW generator. Whole-house Savant. 33 architectural sheets by Robert E. Clark. Every surface carries history. Every system anticipates the future.
      </QuoteStrip>
    </>
  );
}