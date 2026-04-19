import React, { useState, useEffect, useRef } from 'react';

export default function ParallaxBg({ children, backgroundImage, intensity = 0.5, backgroundSize = 'cover', backgroundPosition = 'center' }) {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const sectionCenter = window.innerHeight / 2;
        const elementCenter = rect.top + rect.height / 2;
        const distance = sectionCenter - elementCenter;
        
        // Calculate offset based on section position and scroll intensity
        const parallaxOffset = distance * intensity;
        setOffset(parallaxOffset);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [intensity]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Parallax background layer using transform */}
      <div
        className="absolute inset-0 left-0 right-0"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: backgroundSize,
          backgroundPosition: backgroundPosition,
          backgroundRepeat: 'no-repeat',
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
        }}
      />
      
      {/* Content overlay */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}