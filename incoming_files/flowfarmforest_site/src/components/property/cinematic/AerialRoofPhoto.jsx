import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];
const imgFilter = 'saturate(0.78) contrast(0.94) brightness(0.96) sepia(0.04)';

export default function AerialRoofPhoto() {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 1.6, ease }}
      >
        <img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4eda15170_107LindenTrailGrass-3.jpg"
          alt="Aerial overhead view of the main residence and grounds"
          className="w-full object-cover"
          style={{ aspectRatio: '21/9', filter: imgFilter }}
        />
      </motion.div>
    </section>
  );
}