import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ease = [0.22, 1, 0.36, 1];

export default function SignatureClosingSection() {
  return (
    <section
      data-nav-theme="light"
      className="relative overflow-hidden bg-[#f6f1e8] px-5 sm:px-8 lg:px-12 py-[clamp(96px,15vw,196px)]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,184,141,0.18),transparent_42%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-black/8" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-4xl"
        >
          <span className="mb-6 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.36em] text-foreground/42">
            Final Impression
          </span>
          <h2 className="mb-8 font-display text-[clamp(2.8rem,7vw,5.8rem)] font-normal leading-[0.98] text-foreground">
            Not simply seen.
            <br />
            Remembered.
          </h2>
          <p className="max-w-2xl font-sans text-[1rem] leading-[2] text-foreground/68">
            Flow Farm carries the rare combination of land, architecture, stewardship, and future possibility — the kind of place that feels singular the moment you arrive.
          </p>
          <p
            className="mt-8 mb-0 max-w-[24ch] font-display italic text-[#8f7652]"
            style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.45rem)',
              lineHeight: 1.58,
              letterSpacing: '0.018em'
            }}
          >
            Some properties impress. A few remain with you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.9, delay: 0.08, ease }}
          className="mt-14 grid gap-4 sm:grid-cols-3"
        >
          {[
            ['15 acres', 'A contiguous estate holding with privacy, structure, and long-view potential.'],
            ['Architectural depth', 'Craft, scale, and atmosphere that feel composed rather than manufactured.'],
            ['Legacy value', 'A property that supports living, hospitality, cultivation, and lasting identity.'],
          ].map(([title, copy]) => (
            <div key={title} className="border border-[#d7c7ae] bg-white/42 px-6 py-7 backdrop-blur-sm" style={{ boxShadow: '0 18px 50px rgba(86,64,34,0.06)' }}>
              <div className="mb-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[#b79661]">
                {title}
              </div>
              <p className="m-0 font-sans text-[0.96rem] leading-[1.9] text-foreground/66">{copy}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.85, delay: 0.12, ease }}
          className="mt-14"
        >
          <div className="max-w-4xl border border-[#d7c7ae] bg-white/55 px-6 py-7 sm:px-8 sm:py-9 backdrop-blur-sm">
            <div className="mb-6 h-px w-16 bg-[#c8ad7f]/70" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="mb-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-foreground/38">
                  Private Appointment
                </p>
                <p className="m-0 font-sans text-[0.96rem] leading-[1.9] text-foreground/62">
                  For buyers seeking a property with privacy, infrastructure, and long-term vision, Flow Farm deserves an in-person tour.
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/inquiry"
            className="inline-flex items-center justify-center border border-white bg-white px-8 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#151412] transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            Request a Private Tour
          </Link>
          <Link
            to="/estate-at-a-glance"
            className="inline-flex items-center justify-center border border-[#d7c7ae] bg-transparent px-8 py-4 font-sans text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[#171614] transition-all duration-300 hover:border-[#171614] hover:bg-white/70"
          >
            Revisit the Estate
          </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}