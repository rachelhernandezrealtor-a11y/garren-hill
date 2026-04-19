import React from 'react';
import ForestOpportunityPillars from '@/components/property/cinematic/ForestOpportunityPillars';
import InquiryCTA from '@/components/property/InquiryCTA';

const FOREST_IMAGE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e6c0e9783_forestpath.jpg';

export default function NewForest() {
  return (
    <section className="relative z-0 -mt-px w-full overflow-hidden bg-transparent py-0" style={{ paddingTop: 0, paddingBottom: 0 }}>
      <div className="relative min-h-[980px] w-full overflow-hidden md:min-h-[900px] lg:min-h-[840px] xl:min-h-[800px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${FOREST_IMAGE})`,
            filter: 'saturate(0.92) contrast(1.03) brightness(0.88) sepia(0.06) hue-rotate(-2deg)'
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(18,16,14,0.08) 0%, rgba(18,16,14,0.22) 16%, rgba(18,16,14,0.42) 54%, rgba(18,16,14,0.78) 100%)'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 2%, rgba(255,247,236,0.15) 0%, transparent 38%)'
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-[180px] sm:h-[220px]"
          style={{
            background: 'linear-gradient(180deg, rgba(26,22,18,0.22) 0%, rgba(26,22,18,0) 100%)'
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[260px] sm:h-[320px]"
          style={{
            background: 'linear-gradient(180deg, rgba(18,16,14,0) 0%, rgba(18,16,14,0.18) 30%, rgba(18,16,14,0.54) 100%)'
          }}
        />

        <div className="relative mx-auto flex min-h-[980px] w-full max-w-[1320px] flex-col justify-between px-5 pb-10 pt-[clamp(64px,10vw,112px)] sm:px-8 sm:pb-12 md:min-h-[900px] md:px-12 lg:min-h-[840px] lg:px-16 xl:min-h-[800px] xl:px-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,360px)] lg:items-end lg:gap-16">
            <div className="max-w-[780px] text-white">
              <p className="m-0 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-white/56 sm:text-[0.68rem]">
                Forest edge · future latitude
              </p>

              <h2
                className="mt-4 text-white sm:mt-5"
                style={{
                  fontSize: 'clamp(2.8rem, 6vw, 5.8rem)',
                  fontWeight: 300,
                  lineHeight: 0.96,
                  letterSpacing: '0.012em',
                  textShadow: '0 10px 34px rgba(0,0,0,0.34)',
                  marginBottom: 'clamp(20px, 2.4vw, 30px)',
                  maxWidth: '11ch'
                }}
              >
                The opportunity
                <br />
                begins in the woods.
              </h2>

              <div className="grid max-w-[760px] grid-cols-1 gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:gap-8 lg:gap-10">
                <p
                  className="m-0 text-white"
                  style={{
                    fontSize: 'clamp(1rem, 1.18vw, 1.12rem)',
                    fontWeight: 400,
                    lineHeight: 1.94,
                    letterSpacing: '0.012em',
                    color: 'rgba(255,255,255,0.95)'
                  }}
                >
                  Seven acres of mature hardwood forest create a protected natural threshold — privacy, atmosphere, and a sense of arrival that cannot be replicated once land is gone.
                </p>
                <p
                  className="m-0 text-white/84"
                  style={{
                    fontSize: 'clamp(0.96rem, 1.08vw, 1.04rem)',
                    fontWeight: 400,
                    lineHeight: 1.92,
                    letterSpacing: '0.01em',
                    color: 'rgba(255,255,255,0.82)'
                  }}
                >
                  With an established North Carolina Qualifying Farmer Exemption, existing infrastructure, and independence from public utilities, the estate offers uncommon flexibility for expansion, hospitality, stewardship, or legacy ownership near Pinehurst.
                </p>
              </div>

              <p
                className="mt-8 mb-0 max-w-[28ch] font-display italic text-white/76"
                style={{
                  fontSize: 'clamp(1.05rem, 1.7vw, 1.5rem)',
                  lineHeight: 1.6,
                  letterSpacing: '0.02em',
                  textShadow: '0 4px 24px rgba(0,0,0,0.22)'
                }}
              >
                Privacy is the first luxury. Everything else follows.
              </p>
            </div>

            <div className="self-start justify-self-start lg:self-end lg:justify-self-end">
              <div className="max-w-[360px] border border-[#d6c2a1]/24 bg-[rgba(18,14,10,0.38)] p-5 text-white backdrop-blur-xl sm:p-6 lg:p-7" style={{ boxShadow: '0 28px 80px rgba(0,0,0,0.24)' }}>
                <p className="m-0 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/52">
                  Editorial note
                </p>
                <p className="mt-4 mb-0 text-[0.98rem] leading-[1.95] text-white/76 sm:text-[1rem]">
                  A rare land position with privacy, agricultural standing, and long-term optionality already in place.
                </p>

                <div className="mt-7 flex flex-col items-start gap-3">
                  <a
                    href="/all-photos"
                    className="inline-flex min-h-[52px] w-full items-center justify-center border border-white/28 bg-white/10 px-6 py-4 text-center font-sans text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white transition-all duration-300 hover:bg-white/18 sm:w-auto sm:min-w-[220px]"
                    style={{ textDecoration: 'none' }}
                  >
                    Walk the Land
                  </a>
                  <InquiryCTA
                    variant="dark"
                    sublabel="Private Inquiry"
                    label="Start Inquiry"
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/12 pt-8 sm:mt-14 sm:pt-10 lg:mt-16 lg:pt-12">
            <ForestOpportunityPillars />
          </div>
        </div>
      </div>
    </section>
  );
}