import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white border-t border-black/10 px-5 sm:px-8 lg:px-12 py-16 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(255,255,255,0) 100%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(191,162,116,0.12) 0%, rgba(191,162,116,0) 72%)' }}
      />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-[1.2fr_0.9fr_1fr] gap-10 sm:gap-12"
        >
          <div>
            <span className="block font-sans text-[0.56rem] font-semibold tracking-[0.36em] uppercase text-foreground/35 mb-4">
              Flow Farm
            </span>
            <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.65rem)] font-normal leading-[1.04] text-foreground mb-4">
              A private sanctuary shaped for legacy living.
            </h2>
            <p className="font-sans text-[0.88rem] leading-[1.82] text-foreground/54 max-w-md m-0">
              Fifteen contiguous acres in the Pinehurst corridor, balancing estate presence, agricultural grounding, and modern self-sufficiency.
            </p>
          </div>

          <div>
            <span className="block font-sans text-[0.56rem] font-semibold tracking-[0.36em] uppercase text-foreground/35 mb-4">
              Place
            </span>
            <div className="flex items-start gap-3 text-foreground/62">
              <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-[#8C7A63]" />
              <p className="font-sans text-[0.88rem] leading-[1.9] m-0">
                107 Linden Trail<br />
                Aberdeen, NC 28315<br />
                Moore County, North Carolina
              </p>
            </div>
          </div>

          <div>
            <span className="block font-sans text-[0.56rem] font-semibold tracking-[0.36em] uppercase text-foreground/35 mb-4">
              Explore
            </span>
            <div className="flex flex-col gap-3">
              <Link to="/" className="font-sans text-[0.76rem] tracking-[0.22em] uppercase text-foreground/60 no-underline hover:text-foreground transition-all duration-300 hover:translate-x-[2px]">
                Home
              </Link>
              <Link to="/Location" className="font-sans text-[0.76rem] tracking-[0.22em] uppercase text-foreground/60 no-underline hover:text-foreground transition-all duration-300 hover:translate-x-[2px]">
                Location
              </Link>
              <Link to="/estate-at-a-glance" className="font-sans text-[0.76rem] tracking-[0.22em] uppercase text-foreground/60 no-underline hover:text-foreground transition-all duration-300 hover:translate-x-[2px]">
                Estate at a Glance
              </Link>
              <Link to="/inquiry" className="font-sans text-[0.76rem] tracking-[0.22em] uppercase text-foreground/60 no-underline hover:text-foreground transition-all duration-300 hover:translate-x-[2px]">
                Inquiry
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="h-px bg-black/8 my-10 sm:my-12" />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-foreground/35 m-0">
            © {new Date().getFullYear()} Flow Farm
          </p>
          <p className="font-sans text-[0.68rem] tracking-[0.2em] uppercase text-foreground/35 m-0">
            Designed by Robert Clark · USDA FSA #5893
          </p>
        </motion.div>
      </div>
    </footer>
  );
}