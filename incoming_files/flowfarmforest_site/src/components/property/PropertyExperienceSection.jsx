import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropertyRoom from './PropertyRoom';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function PropertyExperienceSection({ data, onOpenGallery }) {
  return (
    <section className="bg-white py-24 md:py-36 px-4 sm:px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-primary" />
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-primary font-medium">
              {data.kicker}
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-primary leading-[1.15] mb-6 max-w-3xl">
            {data.title}
          </h2>
          <div className="w-24 h-px bg-primary/20" />
        </motion.div>

        {/* Navigation Chips */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {data.chips.map((chip) => (
            <a
              key={chip.label}
              href={chip.href}
              className="inline-flex items-center justify-center px-4 py-2 border border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-full text-xs font-sans uppercase tracking-widest text-primary transition-colors"
            >
              {chip.label}
            </a>
          ))}
        </motion.div>

        {/* Hero Split */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
        >
          <div className="lg:col-span-2">
            <button
              onClick={() => onOpenGallery(data.hero.group)}
              className="relative w-full overflow-hidden rounded-lg group cursor-pointer"
            >
              <img
                src={data.hero.image.src}
                alt={data.hero.image.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              <div className="absolute right-4 bottom-12 z-10 inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/70 border border-white/20 text-white text-xs font-sans uppercase tracking-wider backdrop-blur-sm">
                Open gallery ↗
              </div>
            </button>
            <p className="mt-3 text-xs font-sans uppercase tracking-wide text-muted-foreground">
              {data.hero.image.caption}
            </p>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {data.stats.map((stat) => (
                <div key={stat.key} className="border border-primary/15 bg-primary/5 rounded-lg p-3">
                  <div className="text-xs font-sans uppercase tracking-wide text-primary/60 mb-1">
                    {stat.key}
                  </div>
                  <div className="font-serif text-xl font-light text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-xs font-sans text-muted-foreground">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              {data.actions.map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 px-4 rounded-full text-center font-sans text-xs uppercase tracking-wider transition-all ${
                    action.style === 'solid'
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'border border-primary text-primary hover:bg-primary/5'
                  }`}
                >
                  {action.label}
                </a>
              ))}
            </div>

            <p className="text-xs font-sans uppercase tracking-wide text-muted-foreground/70 leading-relaxed">
              {data.note}
            </p>
          </div>
        </motion.div>

        {/* Body Copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-12 max-w-3xl"
        >
          {data.body.map((paragraph, i) => (
            <p key={i} className="font-sans text-sm leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Smart Home Callout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.4 }}
          className="bg-primary text-primary-foreground rounded-lg p-6 mb-12"
        >
          <div className="text-xs font-sans uppercase tracking-widest text-primary-foreground/70 mb-2">
            {data.smartHome.kicker}
          </div>
          <h3 className="font-serif text-2xl font-light mb-4">
            {data.smartHome.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed mb-4">
            {data.smartHome.body}
          </p>
          <div className="flex flex-wrap gap-2">
            {data.smartHome.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-primary-foreground/15 border border-primary-foreground/30 text-xs font-sans uppercase tracking-wide"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Mini Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {data.miniGrid.map((item) => (
            <div key={item.title} className="border border-primary/15 bg-primary/5 rounded-lg p-4">
              <h4 className="font-sans text-xs uppercase tracking-widest text-primary font-semibold mb-2">
                {item.title}
              </h4>
              <p className="font-sans text-sm text-foreground leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Portfolio Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ delay: 0.6 }}
          className="border-t border-primary/10 pt-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-8 bg-primary" />
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-primary font-medium">
              Interior Portfolio
            </span>
          </div>
          <h3 className="font-serif text-3xl font-light text-primary mb-8">
            A room-by-room visual walkthrough.
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.rooms.map((room) => (
              <PropertyRoom
                key={room.id}
                room={room}
                onOpenGallery={onOpenGallery}
              />
            ))}
          </div>

          <p className="font-sans text-sm uppercase tracking-wider text-foreground/70 mt-12 pt-8 border-t border-primary/10">
            {data.tagline}
          </p>
        </motion.div>
      </div>
    </section>
  );
}