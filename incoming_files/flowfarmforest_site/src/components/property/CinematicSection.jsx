import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CinematicSection({
  children,
  backgroundImage = null,
  imageSrc = null,
  imageAlt = '',
  videoEmbedUrl = null,
  overlayOpacity = 0.4,
  overlayGradient = null,
  parallaxIntensity = 0.5,
  className = '',
  height = null,
  minHeight = null,
  kicker = null,
  heading = null,
  subheading = null,
  theme = 'dark',
  applyVignette = false,
  applyGrain = false,
  videoFilter = null,
  contentMaxWidth = 'max-w-5xl',
  contentOffsetY = null,
  kickerStyle = null,
  headingStyle = null,
  subheadingStyle = null,
}) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const resolvedImage = imageSrc || backgroundImage;
  const isLightTheme = theme === 'light';
  const textColor = '#ffffff';
  const kickerColor = isLightTheme ? 'rgba(255,248,238,0.78)' : 'rgba(255,248,238,0.72)';
  const subheadingColor = isLightTheme ? 'rgba(255,255,255,0.84)' : 'rgba(255,255,255,0.8)';

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 180 * parallaxIntensity]);
  const overlayY = useTransform(scrollYProgress, [0, 1], [0, 240 * parallaxIntensity]);
  const contentY = useTransform(scrollYProgress, [0, 1], [20, -72 * parallaxIntensity]);
  const sectionY = useTransform(scrollYProgress, [0.7, 1], [0, -88]);

  const kickerOpacity = useTransform(scrollYProgress, [0.06, 0.18, 0.76, 0.92], [0, 1, 1, 0]);
  const kickerTranslateY = useTransform(scrollYProgress, [0.06, 0.18, 0.76, 0.92], [26, 0, 0, -12]);
  const kickerTracking = useTransform(scrollYProgress, [0.06, 0.2], ['0.34em', '0.52em']);

  const headingOpacity = useTransform(scrollYProgress, [0.1, 0.22, 0.78, 0.96], [0, 1, 1, 0.18]);
  const headingTranslateY = useTransform(scrollYProgress, [0.1, 0.22, 0.78, 0.96], [30, 0, 0, -22]);
  const headingScale = useTransform(scrollYProgress, [0.74, 1], [1, 0.965]);

  const subheadingOpacity = useTransform(scrollYProgress, [0.14, 0.26, 0.76, 0.92], [0, 1, 1, 0]);
  const subheadingTranslateY = useTransform(scrollYProgress, [0.14, 0.26, 0.76, 0.92], [22, 0, 0, -14]);
  const subheadingScale = useTransform(scrollYProgress, [0.74, 1], [1, 0.985]);

  const dynamicOverlayOpacity = useTransform(scrollYProgress, [0.52, 1], [0.02, 0.3]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full overflow-hidden py-0 -mt-px ${className}`}
      style={{ paddingTop: 0, paddingBottom: 0 }}
    >
      <motion.div
        className="relative w-full overflow-hidden bg-black"
        style={{
          height: height || undefined,
          minHeight: minHeight || undefined,
          y: sectionY,
        }}
      >
        {(resolvedImage || videoEmbedUrl) && (
          <motion.div style={{ y: backgroundY }} className="absolute inset-0 h-full w-full">
            {resolvedImage && (
              <img
                src={resolvedImage}
                alt={imageAlt}
                className="absolute inset-0 h-full w-full object-cover z-0"
              />
            )}

            {videoEmbedUrl && videoEmbedUrl.includes('.mp4') ? (
              <video
                src={videoEmbedUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 h-full w-full object-cover z-10"
                style={{ filter: videoFilter || undefined }}
              />
            ) : videoEmbedUrl ? (
              <iframe
                src={videoEmbedUrl}
                title={imageAlt || heading || 'Cinematic background video'}
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                className="absolute inset-0 h-full w-full pointer-events-none z-10"
                style={{
                  border: 0,
                  transform: 'scale(1.22)',
                  filter: videoFilter || undefined
                }}
              />
            ) : null}
          </motion.div>
        )}

        {(overlayGradient || overlayOpacity > 0) && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              y: overlayY,
              background: overlayGradient || `rgba(0, 0, 0, ${overlayOpacity})`
            }}
          />
        )}

        <motion.div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ opacity: dynamicOverlayOpacity }}
        />

        {applyVignette && <div className="absolute inset-0 vignette" />}
        {applyGrain && <div className="absolute inset-0 cinematic-grain" />}

        <div className="relative z-10 h-full min-h-full">
          {(kicker || heading || subheading) ? (
            <motion.div
              className="absolute inset-0 flex items-center justify-center px-6 sm:px-8 md:px-12"
              style={{ y: contentY, transform: contentOffsetY ? `translateY(${contentOffsetY})` : undefined, zIndex: 2 }}
            >
              <div className={`w-full ${contentMaxWidth} mx-auto text-center`}>
                {kicker && (
                  <motion.p
                    className="font-sans uppercase text-center"
                    style={{
                      opacity: kickerOpacity,
                      y: kickerTranslateY,
                      letterSpacing: kickerTracking,
                      fontSize: 'clamp(0.46rem, 0.78vw, 0.7rem)',
                      fontWeight: 500,
                      color: kickerColor,
                      textShadow: 'rgba(0, 0, 0, 0.5) 0px 4px 15px',
                      margin: '0 0 clamp(16px, 2vw, 24px) 0',
                      paddingLeft: '0.52em',
                      ...kickerStyle
                    }}
                  >
                    {kicker}
                  </motion.p>
                )}

                {heading && (
                  <motion.h2
                    style={{
                      opacity: headingOpacity,
                      y: headingTranslateY,
                      scale: headingScale,
                      fontFamily: "'DM Serif Display', Georgia, serif",
                      fontSize: 'clamp(2.35rem, 6.2vw, 5rem)',
                      fontWeight: 300,
                      lineHeight: 0.96,
                      letterSpacing: '-0.03em',
                      color: textColor,
                      textShadow: '0 0 15px rgba(255,255,255,0.18), 0 0 30px rgba(255,255,255,0.08), rgba(0, 0, 0, 0.5) 0px 4px 15px',
                      margin: '0 0 clamp(14px, 2vw, 20px) 0',
                      ...headingStyle
                    }}
                  >
                    {heading.includes(' Steals the Whole Show') ? (
                      <>
                        The House That Quietly<br />
                        Steals the Whole Show
                      </>
                    ) : (
                      heading
                    )}
                  </motion.h2>
                )}

                {subheading && (
                  <motion.p
                    className="mx-auto"
                    style={{
                      opacity: subheadingOpacity,
                      y: subheadingTranslateY,
                      scale: subheadingScale,
                      maxWidth: 'clamp(320px, 58vw, 760px)',
                      fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
                      fontSize: 'clamp(0.88rem, 1.25vw, 1rem)',
                      fontWeight: 400,
                      lineHeight: 1.7,
                      letterSpacing: '0.01em',
                      color: subheadingColor,
                      textShadow: '0 0 12px rgba(255,255,255,0.12), rgba(0, 0, 0, 0.5) 0px 4px 15px',
                      margin: '0 auto',
                      ...subheadingStyle
                    }}
                  >
                    {subheading}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ) : children}
        </div>
      </motion.div>
    </section>
  );
}