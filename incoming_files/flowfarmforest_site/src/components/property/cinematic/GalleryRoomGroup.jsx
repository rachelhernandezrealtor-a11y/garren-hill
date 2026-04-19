import React from 'react';
import GalleryPhotoCard from './GalleryPhotoCard';

export default function GalleryRoomGroup({ room, photos, globalOffset, onPhotoClick }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <h3 className="font-display text-[clamp(1.1rem,2vw,1.4rem)] font-normal text-foreground m-0 leading-tight">
          {room}
        </h3>
        <span className="font-sans text-[0.62rem] font-light text-muted-foreground/35 tracking-wider uppercase">
          {photos.length} {photos.length === 1 ? 'photo' : 'photos'}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {photos.map((photo, i) => (
          <GalleryPhotoCard
            key={photo.src}
            photo={photo}
            index={i}
            onClick={() => onPhotoClick(globalOffset + i)}
          />
        ))}
      </div>
    </div>
  );
}