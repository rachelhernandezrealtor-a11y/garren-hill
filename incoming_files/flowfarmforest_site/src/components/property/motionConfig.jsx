/**
 * Unified motion language for all post-forest sections.
 * 
 * Principles:
 * - Subtle fade-in with slight upward translate
 * - Restrained, editorial easing
 * - No bounce, no dramatic motion
 * - Consistent across all informational sections
 */

// Canonical cubic-bezier — smooth deceleration, no overshoot
const EASE = [0.22, 0.1, 0.28, 1];

// Standard reveal — text blocks, images, cards
export const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: EASE },
  },
};

// Stagger container — wraps groups of fadeUp children
export const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.08 },
  },
};

// Inline transition for whileInView without variants
export const revealTransition = {
  duration: 1.0,
  ease: EASE,
};

// Standard viewport config
export const revealViewport = {
  once: true,
  margin: '-60px',
};