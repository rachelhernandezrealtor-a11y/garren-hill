import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ease = [0.22, 0.1, 0.28, 1];

const ACCESS_POINTS = [
{ label: 'Moore County Airport', kicker: 'Private Aviation', detail: 'Minutes Away', desc: 'A private aviation facility for charter flights and convenient arrivals, serving the Pinehurst corridor.' },
{ label: 'FirstHealth Moore Regional', kicker: 'Advanced Medical', detail: 'Nearby', desc: 'A full-service regional hospital providing emergency, surgical, and specialty care minutes from the property.' },
{ label: 'Raleigh-Durham International', kicker: 'Major Hub', detail: '~70 Miles', desc: 'National and international connectivity — just over an hour\'s drive to RDU airport.' }];


export default function LocationContext() {
  const ref = useRef(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '6%']);

  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(heroScroll, [0, 1], ['0%', '18%']);
  const heroImgScale = useTransform(heroScroll, [0, 1], [1.08, 1]);
  const heroOverlay = useTransform(heroScroll, [0, 0.6], [0.35, 0.6]);
  const heroTextY = useTransform(heroScroll, [0, 0.5], [0, 50]);
  const heroTextOpacity = useTransform(heroScroll, [0, 0.4], [1, 0.2]);

  const isHeroInView = useInView(heroRef, { once: true });


  return null;



















































































































































}