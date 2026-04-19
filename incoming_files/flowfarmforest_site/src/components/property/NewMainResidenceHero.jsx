import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const secondaryStructures = [
{ title: 'Cabana House' },
{ title: 'High-Tunnel Greenhouse' },
{ title: 'Farm Workshop' },
{ title: 'Compost + Biochar' }];


// Subtle organic offsets so the list doesn't feel like a UI stack
const itemOffsets = [0, 6, -4, 8];

function StructureLabel({ structure, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px 0px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 6 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.1, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        marginLeft: `${itemOffsets[index] || 0}px`,
        marginBottom: index === secondaryStructures.length - 1 ? 0 : 'clamp(6px, 1.2vh, 12px)'
      }}>

      <div
        style={{
          background: 'rgba(255,255,255,0.045)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '4px',
          padding: '11px 16px',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'inline-block',
          userSelect: 'none',
          pointerEvents: 'none'
        }}>

        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize: 'clamp(0.68rem, 1vw, 0.75rem)',
          fontWeight: 300,
          color: 'rgba(255,255,255,0.42)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap'
        }}>
          {structure.title}
        </span>
      </div>
    </motion.div>);

}

export default function NewMainResidenceHero(props) {
  const containerRef = useRef(null);
  const headlineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Slowed parallax — more cinematic, less motion
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const headlineInView = useInView(headlineRef, { once: true });

  const backgroundImage = props?.backgroundImage || 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/17ec6f38b_107LindenTrailGrass-28.jpg';

  return null;


























































































































































}