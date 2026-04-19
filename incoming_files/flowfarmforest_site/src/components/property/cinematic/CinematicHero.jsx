import React, { useState, useRef, useEffect } from 'react';
import { motion, animate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { X } from 'lucide-react';
import InquiryCTA from '@/components/property/InquiryCTA';

const ease = [0.25, 0.1, 0.25, 1];
const KEY_METRICS = [
{ label: 'USDA Acres', value: 15, suffix: '', decimals: 0 },
{ label: 'Buildable Acres', value: 7, suffix: '', decimals: 0 },
{ label: 'Acre Veganic Farm', value: 3, suffix: '', decimals: 0 },
{ label: 'Offered At', value: 5.25, prefix: '$', suffix: 'M', decimals: 2 }];


const BG_VIDEO = 'https://base44.app/api/apps/69a8c6b6c09f3f53db8fa60a/files/mp/public/69a8c6b6c09f3f53db8fa60a/2bcb80afb_foresthero_v11080p.mp4';

function HeroStatValue({ value, item, index = 0 }) {
  const numericMatch = value.match(/[\d.]+/);
  const numberValue = numericMatch ? Number(numericMatch[0]) : null;
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 88, damping: 18, mass: 0.7 });
  const roundedValue = useTransform(springValue, (latest) => {
    if (numberValue === null) return value;
    const decimals = item.decimals || 0;
    const formatted = latest.toFixed(decimals);
    return value.replace(/[\d.]+/, formatted);
  });

  useEffect(() => {
    if (numberValue === null) return;
    motionValue.set(0);
    const controls = animate(0, numberValue, {
      duration: 2.2,
      delay: 1.8 + index * 0.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => motionValue.set(latest)
    });
    return () => controls.stop();
  }, [motionValue, numberValue, index]);

  if (numberValue === null) {
    return <>{value}</>;
  }
  return <motion.span>{roundedValue}</motion.span>;
}

function InteractiveKeyItem({ item, index, variant = 'primary' }) {
  const stringValue = item.value.toString();

  return null;






































































}

export default function CinematicHero() {
  const [videoOpen, setVideoOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState(null);

  useEffect(() => {
    base44.entities.SiteSettings.filter({ setting_key: 'hero_video_url' }).then((settings) => {
      if (settings.length > 0) setModalVideoUrl(settings[0].value);
    });
  }, []);

  return (
    <>
      








































































































































































      

      {videoOpen &&
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => setVideoOpen(false)}>
        
          <button
          onClick={() => setVideoOpen(false)}
          style={{ position: 'absolute', top: 20, right: 24, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.7)', zIndex: 10 }}>
          
            <X style={{ width: 28, height: 28 }} />
          </button>
          <div
          style={{ width: '90vw', maxWidth: 900, aspectRatio: '16/9', background: '#000', position: 'relative' }}
          onClick={(e) => e.stopPropagation()}>
          
            {modalVideoUrl &&
          <video
            src={modalVideoUrl}
            controls
            autoPlay
            style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />

          }
          </div>
        </div>
      }
    </>);

}