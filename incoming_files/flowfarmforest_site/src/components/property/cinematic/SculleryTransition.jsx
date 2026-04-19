import React from 'react';
import CinematicThreshold from './CinematicThreshold';

const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/a5563f7e7_KTOCONS.jpg';

export default function SculleryTransition() {
  return (
    <CinematicThreshold
      label="Continue Through"
      title="Into the Scullery"
      whisper="Built with the same hands, the same conviction that every room matters."
      image={IMG}
      imageAlt="Through the kitchen, the scullery awaits"
    />
  );
}