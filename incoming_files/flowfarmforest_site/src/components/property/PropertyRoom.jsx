import React, { useState } from 'react';

export default function PropertyRoom({ room, onOpenGallery }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const primaryImage = room.gallery[0];
  const hasMultiple = room.gallery.length > 1;

  return (
    <article className="border border-black/8 rounded-3xl bg-white overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Media */}
      <button
        onClick={() => onOpenGallery(room.group, 0)}
        className="relative w-full overflow-hidden bg-white group cursor-pointer"
      >
        <img
          src={primaryImage.src}
          alt={primaryImage.alt}
          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </button>

      {/* Content */}
      <div className="p-5">
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-widest font-medium text-black">
            {room.kicker}
          </h4>
          <p className="text-xs text-gray-500 uppercase tracking-wider mt-2">
            {room.sub}
          </p>
        </div>

        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          {room.text}
        </p>

        {hasMultiple ? (
          <details
            className="group"
            onToggle={(e) => setDetailsOpen(e.currentTarget.open)}
          >
            <summary className="cursor-pointer px-4 py-2.5 rounded-full border border-black text-xs tracking-wider uppercase text-black hover:bg-black hover:text-white transition-all list-none">
              {room.previewLabel || 'Preview Gallery'}
            </summary>

            <div className="pt-3 mt-3 border-t border-black/10">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {room.gallery.map((img, idx) => (
                  <button
                    key={`${room.group}-${idx}`}
                    onClick={() => onOpenGallery(room.group, idx)}
                    className="relative overflow-hidden rounded"
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className="w-full h-16 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-600 uppercase tracking-wider">
                Click any photo to open the lightbox gallery.
              </p>
            </div>
          </details>
        ) : (
          <button
            onClick={() => onOpenGallery(room.group, 0)}
            className="w-full px-4 py-2.5 rounded-full border border-black text-xs tracking-wider uppercase text-black hover:bg-black hover:text-white transition-all"
          >
            {room.openLabel || 'Open Photo'}
          </button>
        )}
      </div>
    </article>
  );
}