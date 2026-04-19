import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import GALLERY_DATA from '@/components/property/cinematic/galleryData';
import WALKTHROUGH_SECTIONS from '@/components/property/cinematic/gallerySequence';

const featureKeys = ['foyer', 'living-room', 'kitchen', 'conservatory', 'primary-suite', 'cabana', 'estate'];

const featureImages = featureKeys.
map((key) => {
  const section = WALKTHROUGH_SECTIONS.find((item) => item.key === key);
  const image = section ? GALLERY_DATA.find(section.filter) : null;
  if (!section || !image) return null;
  return {
    key,
    heading: section.heading,
    description: section.description,
    src: image.src,
    alt: image.alt
  };
}).
filter(Boolean);

export default function HomeGuidedGallerySection() {
  return null;




































































}