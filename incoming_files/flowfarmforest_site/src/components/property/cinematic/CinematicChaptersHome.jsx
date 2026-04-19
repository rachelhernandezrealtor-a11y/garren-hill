import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CinematicHero from '@/components/property/cinematic/CinematicHero';
import HomeSectionSeam from '@/components/property/cinematic/HomeSectionSeam';
import InquiryCTA from '@/components/property/InquiryCTA';
import LocationClosing from '@/components/property/location/LocationClosing';
import HomeGuidedGallerySection from '@/components/property/cinematic/HomeGuidedGallerySection';
import HomeEditorialSections from '@/components/property/cinematic/HomeEditorialSections';

import SectionJumpNav from '@/components/property/cinematic/SectionJumpNav';
import FullBleedAutoSequence from '@/components/property/cinematic/FullBleedAutoSequence';

const HERO_IMAGE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e6c0e9783_forestpath.jpg';
const CHAPTER_IMAGE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg';
const CLOSING_IMAGE = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7711a3672_tunnelgood.jpg';
const GALLERY_IMAGES = [
{
  src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e6c0e9783_forestpath.jpg',
  title: 'Arrival Through the Pines',
  caption: 'A cinematic first impression framed by forest and privacy.',
  span: 'lg:col-span-2',
  ratio: 'aspect-[16/9]'
},
{
  src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/da785e254_flowfarmmasterphotoswebsite3.jpg',
  title: 'Estate Perspective',
  caption: 'Grounds, architecture, and open sky in one frame.',
  span: '',
  ratio: 'aspect-[4/5]'
},
{
  src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7711a3672_tunnelgood.jpg',
  title: 'The Closing View',
  caption: 'A quieter image that lingers long after the tour.',
  span: '',
  ratio: 'aspect-[4/5]'
}];


const stats = [
{ label: 'Acres', value: '15' },
{ label: 'Buildable Acres', value: '7' },
{ label: 'To Pinehurst', value: '3 mi' },
{ label: 'Offered At', value: '$5.25M' }];


export default function CinematicChaptersHome() {
  return (
    <main className="w-full bg-black text-white relative">

      
      <SectionJumpNav />
      {/* 1. HERO — cinematic first impression */}
      <CinematicHero />




      {/* 3. EDITORIAL STORY — intro → map → architecture → farm → infrastructure → region */}
      <div id="editorial-story">
        <HomeEditorialSections />
      </div>

      {/* 3. FULL-BLEED AUTO SEQUENCE — cinematic scroll from All Photos */}
      <FullBleedAutoSequence
        max={14}
        useAIQuotes={false}
        generateForest={false}
        quotes={[]}
        onlyCustom
        showStatsChips
        customImages={[
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/967c6b791_107LindenTrailGrass-65.jpg', alt: 'Front exterior at twilight' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/5843bc809_livingroom.jpg', alt: 'Grand living under timber trusses' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/bfda33343_KITCHENYES.jpg', alt: 'Chef’s kitchen built for scale' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/89e1b25c5_CONSERVATORYBEST.jpg', alt: 'Light-filled glass pavilion' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e802ebf12_primary1main.jpg', alt: 'Primary suite — vaulted ceiling' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/d0bb8decd_primarytightshottubandshower.jpg', alt: 'Spa bath — tub + rain shower' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/f6b8bb6bb_markofficemoneyshot.jpg', alt: 'Executive office — cathedral timber' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/59881eba8_260115107LindenTrailF-9475-2.jpg', alt: 'Mudroom — vaulted with island' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e3e772f98_MechanicalRoom.jpg', alt: 'Mechanical core — filtration' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7b98519f8_CrawlSpaceSolarBatteries.jpg', alt: 'Battery backup — solar array' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2a1ce3d2a_Drone2.jpg', alt: 'Estate aerial — residence, farm & lake' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/595faa261_107LindenTrail-29.jpg', alt: 'Compound aerial — residence & cabana' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/bc9f57d35_107LindenTrailGrass-81.jpg', alt: 'Rear courtyard at twilight' },
          { src: 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/fc6c3b2e1_107LindenTrailGrass-77.jpg', alt: 'Side elevation at blue hour' }
        ]}
        className="border-t border-white/5"
      />

      {/* 4. GUIDED GALLERY — invitation to explore visually */}
      <HomeGuidedGallerySection />
      

      {/* 7. CLOSING CTA */}
      













      

      <LocationClosing />
    </main>);

}