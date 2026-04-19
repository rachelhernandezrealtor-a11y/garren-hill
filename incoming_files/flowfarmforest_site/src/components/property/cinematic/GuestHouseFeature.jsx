import React, { useRef, useState } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import RoomLightbox from './RoomLightbox';

const ease = [0.22, 0.1, 0.28, 1];

const GUEST_HOUSE = {
  src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/346ee953a_CabanaHouseMain.jpg',
  alt: 'Flow Farm guest house cabana — 3,372 SF architect-designed brick residential structure',
  title: 'Guest House',
  desc: 'An architect-designed residential structure by Robert E. Clark featuring artisan brick that matches the main house. The building is an expansive, framed shell offering a blank canvas for your vision—with roofing, electrical, and plumbing already complete and ready for a custom interior build-out. 17 individually dimmable circuits, Dreamscape LED accent lighting, and home automation wiring are pre-installed. Designed for ultimate flexibility, it is configured for a full kitchen, cabana living, nanny quarters, and loft bedrooms.',
  specs: [
    { label: 'Square Footage', value: '3,372 SF' },
    { label: 'Garage', value: '1-Car' },
    { label: 'Sports Court', value: '20\' × 40\'' },
    { label: 'Walk-in Cooler', value: 'Commercial' }
  ],
  gallery: [
    { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/346ee953a_CabanaHouseMain.jpg', alt: 'Cabana House — Front Elevation' },
    { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2850d00a4_SideExteriorCabanaHouse.jpg', alt: 'Cabana House — Side Exterior' },
    { src: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/f6ba866c-4da9-4e83-1ddf-0a8359884a00/public', alt: 'Future Guest Apartment — Unfinished Interior' },
    { src: 'https://imagedelivery.net/M_TGAUj9Ze_tNOtZS6jINg/6e75a23a-4f7c-4034-4ba1-f6ce1f36fa00/public', alt: 'Future Sports Court — 20\'×40\'' },
  ],
};

export default function GuestHouseFeature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '5%']);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <section
      ref={ref}
      data-nav-theme="light"
      className="w-full"
      style={{ background: '#F6F4EF', padding: 'clamp(60px, 10vh, 130px) clamp(24px, 6vw, 64px)' }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.span
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease }}
            className="block font-sans uppercase"
            style={{ fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.32em', color: '#9A8C7A', marginBottom: 'clamp(14px, 1.2vw, 18px)' }}
          >
            The Compound
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.6, delay: 0.1, ease }}
            className="font-display"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 400, lineHeight: 1.1, color: '#1C1C1A', margin: 0, marginBottom: '14px' }}
          >
            Guest House.
          </motion.h2>

          <div style={{ height: 'clamp(10px, 0.8vw, 14px)' }} />
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.2, ease }}
            className="block font-sans"
            style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.1em', color: '#A89A84' }}
          >
            Architect-Designed · Shell Ready for Custom Completion
          </motion.span>
        </div>

        {/* Main Feature */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.4, ease }}
          className="grid md:grid-cols-2 items-center"
          style={{ gap: 'clamp(40px, 6vw, 80px)', marginBottom: 'clamp(64px, 8vh, 96px)' }}
        >
          {/* Image */}
          <div
            className="overflow-hidden cursor-pointer relative"
            style={{ borderRadius: '16px', boxShadow: '0 40px 100px rgba(0,0,0,0.18), 0 16px 40px rgba(0,0,0,0.10)', aspectRatio: '4/3' }}
            onClick={() => setLightboxIndex(0)}
          >
            <motion.img
              src={GUEST_HOUSE.gallery[0].src}
              alt={GUEST_HOUSE.gallery[0].alt}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: 'saturate(0.94) contrast(1.04) brightness(1.02)', y: imgY, willChange: 'transform', scale: 1.06 }}
              loading="lazy"
            />
            <div className="absolute bottom-4 right-4 z-10 font-sans text-white/90 text-xs tracking-wider uppercase px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(6px)', border: '1px solid rgba(255,255,255,0.15)' }}>
              {GUEST_HOUSE.gallery.length} Photos
            </div>
          </div>

          {/* Text */}
          <div className="font-sans">
            <h3
              className="font-display"
              style={{ fontSize: 'clamp(1.6rem, 2.2vw, 2.2rem)', fontWeight: 400, lineHeight: 1.1, color: '#1C1C1A', marginBottom: '14px' }}
            >
              {GUEST_HOUSE.title}
            </h3>
            <p style={{ fontSize: 'clamp(0.88rem, 1vw, 1rem)', lineHeight: 2.0, color: '#5A5A56', margin: 0, marginBottom: '28px' }}>
              {GUEST_HOUSE.desc}
            </p>
            {GUEST_HOUSE.specs && (
              <div className="grid grid-cols-2" style={{ gap: 'clamp(16px, 2vw, 24px)' }}>
                {GUEST_HOUSE.specs.map((spec, i) => (
                  <div key={i}>
                    <div className="font-display" style={{ fontSize: 'clamp(1rem, 1.2vw, 1.2rem)', fontWeight: 400, color: '#1C1C1A', marginBottom: '4px' }}>{spec.value}</div>
                    <div className="font-sans uppercase" style={{ fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.18em', color: '#9A8C7A' }}>{spec.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {lightboxIndex !== null && (
            <RoomLightbox
              images={GUEST_HOUSE.gallery.map(g => ({ src: g.src, caption: g.alt }))}
              index={lightboxIndex}
              onClose={() => setLightboxIndex(null)}
              onNav={(delta) => {
                const next = lightboxIndex + delta;
                if (next >= 0 && next < GUEST_HOUSE.gallery.length) setLightboxIndex(next);
              }}
            />
          )}
        </motion.div>

      </div>
    </section>
  );
}