import React from 'react';
import { motion } from 'framer-motion';

const ease = [0.22, 0.1, 0.28, 1];

export default function GalleryBridge({ text = "More to explore." }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.6, delay: 0.2, ease }}
      className="mx-auto text-center"
      style={{
        maxWidth: '500px',
        paddingTop: 'clamp(40px, 5vh, 60px)',
        paddingBottom: 'clamp(40px, 5vh, 60px)',
      }}
    >
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)',
          marginBottom: '24px',
        }}
      />
      <p
        className="font-serif italic"
        style={{
          fontSize: 'clamp(0.88rem, 1.1vw, 1rem)',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'rgba(0,0,0,0.28)',
          margin: 0,
        }}
      >
        {text}
      </p>
      <div
        style={{
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(0,0,0,0.06), transparent)',
          marginTop: '24px',
        }}
      />
    </motion.div>
  );
}