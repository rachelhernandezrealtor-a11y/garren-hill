import React from 'react';

const PILLARS = [
  {
    label: 'Tax Position',
    title: 'Farmer exemption already established.',
    copy: 'A meaningful structural advantage that may support lower carrying costs and stronger long-term economics.'
  },
  {
    label: 'Infrastructure',
    title: 'Systems already built for independence.',
    copy: 'Geothermal, solar with battery backup, private well, and generator capacity create unusual resilience from day one.'
  },
  {
    label: 'Privacy',
    title: 'The forest protects the estate edge.',
    copy: 'Seven wooded acres preserve separation, quiet, and a lasting sense of retreat minutes from Pinehurst.'
  }
];

function ForestOpportunityPillar({ pillar }) {
  return (
    <article className="border-t border-white/16 pt-5 text-white sm:pt-6">
      <p className="m-0 font-sans text-[0.58rem] font-semibold uppercase tracking-[0.3em] text-white/50 sm:text-[0.64rem]">
        {pillar.label}
      </p>

      <h3
        className="mt-3 max-w-[16ch] text-white"
        style={{
          fontSize: 'clamp(1.22rem, 1.7vw, 1.62rem)',
          fontWeight: 300,
          lineHeight: 1.08,
          letterSpacing: '0.01em',
          marginBottom: '12px'
        }}
      >
        {pillar.title}
      </h3>

      <p
        className="m-0 max-w-[34ch] text-white/70"
        style={{
          fontSize: 'clamp(0.9rem, 0.98vw, 0.96rem)',
          fontWeight: 400,
          lineHeight: 1.88,
          letterSpacing: '0.01em'
        }}
      >
        {pillar.copy}
      </p>
    </article>
  );
}

export default function ForestOpportunityPillars() {
  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
      {PILLARS.map((pillar) => (
        <ForestOpportunityPillar key={pillar.label} pillar={pillar} />
      ))}
    </div>
  );
}