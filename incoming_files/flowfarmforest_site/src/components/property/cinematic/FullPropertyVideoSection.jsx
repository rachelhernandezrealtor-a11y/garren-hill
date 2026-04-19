import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';

const FALLBACK_VIDEO = 'https://base44.app/api/apps/69a8c6b6c09f3f53db8fa60a/files/mp/public/69a8c6b6c09f3f53db8fa60a/2bcb80afb_foresthero_v11080p.mp4';

export default function FullPropertyVideoSection() {
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      base44.entities.SiteSettings.filter({ setting_key: 'property_video_2160' }),
      base44.entities.SiteSettings.filter({ setting_key: 'property_video_1080' }),
      // legacy single key fallback if previously used
      base44.entities.SiteSettings.filter({ setting_key: 'property_video_url' }),
    ])
      .then(([uhd, hd, single]) => {
        if (!mounted) return;
        const url = (uhd && uhd[0]?.value) || (hd && hd[0]?.value) || (single && single[0]?.value);
        setVideoUrl(url || FALLBACK_VIDEO);
      })
      .catch(() => setVideoUrl(FALLBACK_VIDEO));
    return () => { mounted = false; };
  }, []);

  return (
    <section aria-label="Property Video" className="relative w-full" style={{ minHeight: '80svh', padding: 0 }}>
      <div className="absolute inset-0 z-10 overflow-hidden">
        <video
          key={videoUrl || 'fallback'}
          src={videoUrl || FALLBACK_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full"
          style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}
        />
      </div>
      {/* Subtle overlays for readability / continuity with hero */}
      <div className="absolute inset-0 pointer-events-none bg-black/10" />
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      {/* Spacer to enforce height when video loads */}
      <div style={{ height: '80svh' }} />

      {/* Temporary uploader — fixed, high z-index, non-scrolling */}
    </section>
  );
}