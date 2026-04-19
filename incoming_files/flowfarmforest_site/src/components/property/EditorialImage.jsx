import React, { useState } from 'react';

/**
 * Editorial image with subtle shadow and refined hover.
 * height: CSS max-height (default '340px')
 * aspect: aspect-ratio override (e.g. '3/4', '16/9')
 */
export default function EditorialImage({ 
  src, 
  alt = '', 
  caption, 
  height = '340px', 
  aspect,
  className = '' 
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={className}>
      <div 
        className="overflow-hidden bg-foreground/[0.02] group border border-black/8"
        style={{ 
          ...(aspect ? { aspectRatio: aspect } : { maxHeight: height }),
          boxShadow: '0 10px 30px rgba(0,0,0,0.07)',
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-[1.02] ${loaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy" 
          decoding="async" 
        />
      </div>
      {caption && (
        <figcaption className="mt-3 pt-3 border-t border-black/6 font-sans text-[7px] sm:text-[8px] tracking-[0.32em] uppercase text-foreground/30 font-normal">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}