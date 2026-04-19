import React from 'react';
import { propertyData } from './propertyData';
import PropertyRoom from './PropertyRoom';

export default function PropertyExperienceMainSection({ data, onOpenGallery }) {
  const rooms = data.rooms || propertyData.residence.rooms;
  const hero = data.hero || propertyData.residence.hero;

  return (
    <section id="ff-residence" className="bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="border border-black/8 rounded-3xl bg-white shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <div className="text-xs tracking-widest uppercase text-gray-500 mb-3">
              {data.kicker || 'Main Residence'}
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-black mb-4 leading-tight">
              {data.title}
            </h2>
            <div className="w-24 h-px bg-black/15" />
          </div>

          {/* Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {data.chips?.map((chip) => (
              <a
                key={chip.label}
                href={chip.href}
                className="px-4 py-2.5 rounded-full border border-black/12 bg-gray-50 text-xs tracking-wider uppercase text-black hover:shadow-md transition-all"
              >
                {chip.label}
              </a>
            ))}
          </div>

          {/* Hero Split */}
          <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-8">
            {/* Image */}
            <button
              onClick={() => onOpenGallery(hero.group, 0)}
              className="lg:col-span-4 relative group cursor-pointer rounded-2xl overflow-hidden shadow-lg"
            >
              <img
                src={hero.image.src}
                alt={hero.image.alt}
                className="w-full h-96 object-cover group-hover:scale-102 transition-transform"
              />
              <div className="absolute bottom-12 right-3 px-3 py-2 rounded-full bg-black/70 text-white text-xs tracking-wider uppercase backdrop-blur-sm">
                Open gallery ↗
              </div>
              <div className="absolute bottom-2 left-3 right-3 text-xs tracking-widest uppercase text-gray-400">
                {hero.image.caption}
              </div>
            </button>

            {/* Stats & Actions */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                {data.stats?.map((stat) => (
                  <div key={stat.key} className="border border-black/8 rounded-2xl bg-gray-50 p-3">
                    <div className="text-xs tracking-wider uppercase text-black mb-2">
                      {stat.key}
                    </div>
                    <div className="font-serif text-2xl text-black mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs tracking-wider uppercase text-gray-500">
                      {stat.sub}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                {data.actions?.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    target="_blank"
                    rel="noopener"
                    className={`px-6 py-3 rounded-full text-xs tracking-wider uppercase font-medium transition-all text-center ${
                      action.style === 'solid'
                        ? 'bg-black text-white hover:bg-gray-900'
                        : 'border border-black bg-white text-black hover:bg-black hover:text-white'
                    }`}
                  >
                    {action.label}
                  </a>
                ))}
              </div>

              <div className="text-xs text-gray-600 mt-2 leading-relaxed">
                {data.note}
              </div>
            </div>
          </div>

          {/* Body Text */}
          {data.body?.map((paragraph, idx) => (
            <p key={idx} className="text-base leading-relaxed text-gray-700 mb-4 max-w-3xl">
              {paragraph}
            </p>
          ))}

          {/* Smart Home Callout */}
          {data.smartHome && (
            <div className="bg-black text-white rounded-2xl p-6 my-8 shadow-lg">
              <div className="text-xs tracking-widest uppercase text-gray-300 mb-2">
                {data.smartHome.kicker}
              </div>
              <h3 className="font-serif text-2xl font-light mb-4">
                {data.smartHome.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-200 mb-4">
                {data.smartHome.body}
              </p>
              <div className="flex flex-wrap gap-2">
                {data.smartHome.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full bg-white/10 border border-white/18 text-xs tracking-wider uppercase text-gray-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Mini Grid */}
          {data.miniGrid && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-8">
              {data.miniGrid.map((item) => (
                <div key={item.title} className="border border-black/8 rounded-2xl bg-gray-50 p-4">
                  <div className="text-xs tracking-wider uppercase font-medium text-black mb-2">
                    {item.title}
                  </div>
                  <div className="text-sm leading-relaxed text-gray-700">
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Room Portfolio */}
          {rooms && (
            <div className="mt-8 pt-8 border-t border-black/10">
              <div className="mb-8">
                <div className="text-xs tracking-widest uppercase text-gray-500 mb-2">
                  Interior Portfolio
                </div>
                <h3 className="font-serif text-3xl font-light text-black mb-4">
                  A room-by-room visual walkthrough.
                </h3>
                <div className="w-24 h-px bg-black/15" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {rooms.map((room) => (
                  <PropertyRoom
                    key={room.id}
                    room={room}
                    onOpenGallery={onOpenGallery}
                  />
                ))}
              </div>

              <p className="text-sm tracking-widest uppercase text-gray-600 mt-8 pt-6 border-t border-black/10">
                {data.tagline}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}