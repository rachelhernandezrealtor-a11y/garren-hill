import React, { useEffect, useRef } from 'react';

export default function VideoBackgroundSection() {
  const iframeRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const Vimeo = window.Vimeo;
    if (!Vimeo) return;

    const player = new Vimeo.Player(iframe);
    
    // Monitor time and reset when it hits 30 seconds
    intervalRef.current = setInterval(() => {
      player.getCurrentTime().then((seconds) => {
        if (seconds >= 30) {
          player.setCurrentTime(0);
        }
      });
    }, 100);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <section className="w-full bg-black">
      <div style={{ paddingBottom: '56.25%', position: 'relative', width: '100%', overflow: 'hidden' }}>
        <iframe
          ref={iframeRef}
          src="https://player.vimeo.com/video/1165426324?autoplay=1&loop=1&muted=1&background=1&controls=0&title=0&byline=0&portrait=0"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
          title="Flow Farm Estate"
        />
      </div>
    </section>
  );
}