import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function DepthOnScroll({
  className = '',
  children,
  intensity = 1,
  hoverLift = true,
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const safeIntensity = Math.max(0.4, Math.min(intensity, 1.2));

  // Subtle, device-safe transforms
  const y = useTransform(scrollYProgress, [0, 1], [8 * safeIntensity, -8 * safeIntensity]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.994, 1.006]);

  const baseHoverLift = -4 * safeIntensity;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
      viewport={{ once: true, amount: 0.35 }}
      style={reduce ? undefined : { y, scale, willChange: 'transform' }}
      whileHover={hoverLift && !reduce ? { y: baseHoverLift, scale: 1.01, transition: { duration: 0.25 } } : undefined}
    >
      {children}
    </motion.div>
  );
}