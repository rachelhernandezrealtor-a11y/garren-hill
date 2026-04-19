import React from 'react';
import { motion } from 'framer-motion';
import PropertyLinkButton from './PropertyLinkButton';
import LINKS from './propertyLinks';
import { getImageAdjust } from './imageAdjust';

const ease = [0.22, 0.1, 0.28, 1];
const CUPOLA = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/276cdf64b_cupoladesign.jpg';

const ALL_SPECS = [
  { value: '$5.25M', label: 'Asking Price' },
  { value: '15', label: 'Acres' },
  { value: '6', label: 'Bedrooms' },
  { value: '7.5', label: 'Bathrooms' },
  { value: '3', label: 'Car Garage' },
  { value: '8,519', label: 'SF Above Grade' },
  { value: '1,709', label: 'SF Below Grade' },
  { value: '2,531', label: 'SF Mechanical' },
];

const NAV_BUTTONS = [
  { label: 'Infrastructure', href: '#' },
  { label: 'Systems', href: '#' },
  { label: 'Security', href: '#' },
  { label: 'Features', href: '#' },
];

export default function ResidenceBridge() {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '90vh' }}>
      {/* Cupola background */}
      <div className="absolute inset-0">
        <img
          src={CUPOLA}
          alt=""
          className="w-full h-full object-cover"
          style={{ objectPosition: '52% 45%', transform: 'scale(2.2)', filter: getImageAdjust(CUPOLA) }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(246,244,239,0.92) 0%, rgba(246,244,239,0.84) 40%, rgba(246,244,239,0.94) 100%)' }} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-6 sm:px-8" style={{ padding: 'clamp(56px, 9vh, 100px) clamp(24px, 5vw, 48px)' }}>

          {/* Title block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease }}
            className="text-center"
            style={{ marginBottom: 'clamp(32px, 5vh, 56px)' }}
          >
            <span className="block font-sans uppercase" style={{
              fontSize: '0.52rem',
              fontWeight: 400,
              letterSpacing: '0.5em',
              color: '#A48A6A',
              marginBottom: '14px',
            }}>
              Designed by Robert E. Clark
            </span>
            <h2 className="font-display italic" style={{
              fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
              fontWeight: 400,
              lineHeight: 1.08,
              color: '#1C1C1A',
              letterSpacing: '0.015em',
              margin: '0 0 clamp(12px, 2vh, 20px) 0',
            }}>
              Main Residence
            </h2>
            <p className="font-serif italic mx-auto" style={{
              fontSize: 'clamp(0.88rem, 1.1vw, 1.05rem)',
              lineHeight: 1.65,
              fontWeight: 300,
              color: '#6B6B67',
              maxWidth: '480px',
              margin: 0,
            }}>
              An architectural estate designed with intention — and built to perform. Constructed entirely in brick with copper detailing, the home reflects permanence and precision.
            </p>
          </motion.div>

          {/* Specs row — compact, horizontal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="flex flex-wrap justify-center"
            style={{ gap: 'clamp(6px, 1.2vw, 14px)', marginBottom: 'clamp(28px, 4vh, 48px)' }}
          >
            {ALL_SPECS.map((s, i) => (
              <div
                key={i}
                className="flex items-baseline gap-1.5"
                style={{
                  padding: '8px 14px',
                  background: 'rgba(255,255,255,0.45)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(28,28,26,0.06)',
                  borderRadius: '2px',
                }}
              >
                <span className="font-serif" style={{
                  fontSize: 'clamp(1.1rem, 1.6vw, 1.4rem)',
                  fontWeight: 300,
                  color: '#1C1C1A',
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                }}>
                  {s.value}
                </span>
                <span className="font-sans uppercase" style={{
                  fontSize: '0.44rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  color: '#A48A6A',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* Nav + Links — centered */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, delay: 0.15, ease }}
            className="flex flex-col items-center"
          >
            {/* Category nav buttons */}
            <div className="flex flex-wrap justify-center" style={{ gap: '8px', marginBottom: 'clamp(16px, 2.5vh, 28px)' }}>
              {NAV_BUTTONS.map((btn, i) => (
                <button
                  key={i}
                  className="font-sans uppercase text-center cursor-pointer transition-all"
                  style={{
                    fontSize: '0.52rem',
                    fontWeight: 500,
                    letterSpacing: '0.25em',
                    color: '#1C1C1A',
                    padding: '10px 20px',
                    background: 'rgba(255,255,255,0.45)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(28,28,26,0.1)',
                    borderRadius: '2px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(164,138,106,0.5)'; e.currentTarget.style.color = '#A48A6A'; e.currentTarget.style.background = 'rgba(255,255,255,0.85)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(28,28,26,0.1)'; e.currentTarget.style.color = '#1C1C1A'; e.currentTarget.style.background = 'rgba(255,255,255,0.45)'; }}
                >
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Property link buttons */}
            <div className="flex flex-wrap justify-center" style={{ gap: 'clamp(8px, 1vw, 14px)' }}>
              <PropertyLinkButton href={LINKS.virtualTour} label="Virtual Tour" linkType="virtualTour" variant="light" />
              <PropertyLinkButton href={LINKS.walkingTour4D} label="4D Walking Tour" linkType="walkingTour4D" variant="light" />
              <PropertyLinkButton href={LINKS.floorPlan} label="Floor Plan" linkType="floorPlan" variant="light" />
              <PropertyLinkButton href={LINKS.video} label="Property Video" linkType="video" variant="light" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}