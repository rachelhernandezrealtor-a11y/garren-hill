import React from 'react';
import CinematicThreshold from './CinematicThreshold';

const IMG = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/955343688_foyer.jpg';

export default function FoyerHero() {
  return (
    <CinematicThreshold
      label="Stepping Inside"
      title="The Foyer"
      whisper="Heart pine underfoot, light overhead. The residence begins here."
      image={IMG}
      imageAlt="The Foyer — heart pine and light"
    />
  );
}