import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import PropertyLinkButton from './PropertyLinkButton';
import LINKS from './propertyLinks';

const ease = [0.22, 0.1, 0.28, 1];

const ROW1 = [
  { value: '6', label: 'Bedrooms' },
  { value: '7.5', label: 'Bathrooms' },
  { value: '3', label: 'Car Garage' },
  { value: '8,519', label: 'SF Above Grade' },
  { value: '1,709', label: 'SF Below Grade' },
  { value: '2,531', label: 'SF Mechanical' },
];

const ROW2 = [
  { value: '5', label: 'Geothermal Zones' },
  { value: '14.3 kW', label: 'Solar Array' },
  { value: '30 kW', label: 'Kohler Generator' },
];

export default function ResidenceSpecs() {
  return (
    <div className="w-full" style={{ marginTop: 0 }}>
      {/* Specs grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.1, ease }}
        className="flex flex-wrap justify-center items-baseline"
        style={{ maxWidth: '720px', margin: '0 auto', gap: 'clamp(16px, 3vw, 36px) clamp(20px, 3.5vw, 48px)' }}
      >
        {ROW1.map((spec, i) => (
          <div key={i} className="text-center">
            <span
              className="block font-serif"
              style={{
                fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: '#1C1C1A',
                letterSpacing: '-0.02em',
              }}
            >
              {spec.value}
            </span>
            <span
              className="block font-sans uppercase"
              style={{
                fontSize: '0.56rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#6B6B67',
                marginTop: '5px',
              }}
            >
              {spec.label}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.2, ease }}
        className="flex flex-wrap justify-center items-baseline"
        style={{ maxWidth: '720px', margin: '0 auto', marginTop: 'clamp(12px, 1.5vh, 20px)', gap: 'clamp(16px, 3vw, 36px) clamp(20px, 3.5vw, 48px)' }}
      >
        {ROW2.map((spec, i) => (
          <div key={i} className="text-center">
            <span
              className="block font-serif"
              style={{
                fontSize: 'clamp(1.4rem, 2.2vw, 1.85rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                color: '#1C1C1A',
                letterSpacing: '-0.02em',
              }}
            >
              {spec.value}
            </span>
            <span
              className="block font-sans uppercase"
              style={{
                fontSize: '0.56rem',
                fontWeight: 500,
                letterSpacing: '0.2em',
                color: '#6B6B67',
                marginTop: '5px',
              }}
            >
              {spec.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Action buttons — breathing room, no divider */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.35, ease }}
          className="flex flex-wrap justify-center"
          style={{ gap: 'clamp(10px, 1.5vw, 18px)', marginTop: 'clamp(14px, 2vh, 24px)' }}
        >
          <PropertyLinkButton href={LINKS.architectPlans} label="Architect Plans" linkType="architectPlans" variant="light" />
          <PropertyLinkButton href={LINKS.virtualTour} label="Virtual Tour" linkType="virtualTour" variant="light" />
          <PropertyLinkButton href={LINKS.walkingTour4D} label="4D Walking Tour" linkType="walkingTour4D" variant="light" />
          <PropertyLinkButton href={LINKS.floorPlan} label="Floor Plan" linkType="floorPlan" variant="light" />
          <PropertyLinkButton href={LINKS.video} label="Property Video" linkType="video" variant="light" />
        </motion.div>
    </div>
  );
}