import React from 'react';
import CinematicThreshold from './CinematicThreshold';

const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/13b7514e8_fireplace.jpg';

export default function GreatRoomHero() {
  return (
    <CinematicThreshold
      label="Volume & Light"
      title="The Great Room"
      whisper="Stone, timber, and an honest flame. The heart of the house."
      image={IMG}
      imageAlt="The Great Room — stone hearth and timber trusses"
    />
  );
}