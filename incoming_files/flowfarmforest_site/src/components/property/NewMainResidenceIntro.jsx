import React from 'react';
import { motion } from 'framer-motion';
import { Home, Sprout, Wheat, Leaf, Hammer } from 'lucide-react';
import { EditableText, EditableImage } from '@/components/EditableText.jsx';
import ArchitecturalPlansFeature from '@/components/property/ArchitecturalPlansFeature.jsx';
import ArchitecturalReveal from '@/components/property/ArchitecturalReveal.jsx';
import EstateSystemsSection from '@/components/property/EstateSystemsSection.jsx';
import MainResidenceStatsGrid from '@/components/property/MainResidenceStatsGrid.jsx';
import NewMainResidenceReturn from '@/components/property/NewMainResidenceReturn.jsx';
import { fadeUp, revealTransition, revealViewport } from './motionConfig';

export default function NewMainResidenceIntro() {
  const sections = [
  { id: 'intro', type: 'intro' },
  { id: 'foyer-text', type: 'text' },
  { id: 'foyer-image', type: 'foyer-image' },
  { id: 'foyer-quote', type: 'quote' },
  { id: 'foyer-text-2', type: 'text-2' },
  { id: 'greatRoom-text', type: 'text-3' },
  { id: 'greatRoom-image', type: 'greatRoom-image' },
  { id: 'greatRoom-gallery', type: 'greatRoom-gallery' },
  { id: 'greatRoom-quote', type: 'quote' },
  { id: 'greatroom-anchor-text', type: 'text-body', content: 'Positioned at the center of the home, the Great Room anchors the surrounding living spaces, connecting naturally to the kitchen, conservatory, and dining areas. Tall glass doors open to the screened porch, extending the living space outward and creating a natural connection to the surrounding landscape.' },
  { id: 'greatroom-anchor-images', type: 'greatroom-anchor-images' },
  { id: 'kitchen-heading', type: 'text-heading', label: "The Chef's Kitchen" },
  { id: 'kitchen-quote-intro', type: 'text-quote', content: '"The kitchen at Flow Farm is designed as the true culinary heart of the residence, an expansive space where professional capability and architectural openness come together at the center of daily life."' },
  { id: 'kitchen-text-island', type: 'text-body', content: 'A large custom island topped with thick butcher-block anchors the room, creating both a natural gathering point and a highly functional preparation surface. The island incorporates a professional workstation sink with integrated accessories, allowing multiple cooking tasks to happen simultaneously while guests gather comfortably around the eat-in bar seating.' },
  { id: 'kitchen-images', type: 'kitchen-images' },
  { id: 'kitchen-quote-cooking', type: 'text-quote', content: '"A commanding presence that combines professional capability with architectural elegance."' },
  { id: 'kitchen-cooking-quote', type: 'quote' },
  { id: 'kitchen-text-2', type: 'text-5' },
  { id: 'kitchen-conservatory-image', type: 'kitchen-conservatory-image' },
  { id: 'kitchen-quote', type: 'quote' },
  { id: 'kitchen-quote-image', type: 'kitchen-quote-image' },
  { id: 'kitchen-staggered-images', type: 'kitchen-staggered-images' },
  { id: 'scullery-text', type: 'text-6' },
  { id: 'scullery-staggered-images', type: 'scullery-staggered-images' },
  { id: 'scullery-quote', type: 'quote' },
  { id: 'scullery-image', type: 'scullery-image' },
  { id: 'dining-text', type: 'text-7' },
  { id: 'dining-quote', type: 'quote' },
  { id: 'dining-staggered-images', type: 'dining-staggered-images' },
  { id: 'conservatory-text', type: 'text-8' },
  { id: 'conservatory-quote', type: 'quote' },
  { id: 'conservatory-staggered-images', type: 'conservatory-staggered-images' },
  { id: 'porch-text', type: 'text-9' },
  { id: 'porch-quote', type: 'quote' },
  { id: 'porch-staggered-images', type: 'porch-staggered-images' },
  { id: 'primary-suite-text', type: 'text-12' },
  { id: 'primary-suite-bedroom', type: 'primary-suite-bedroom' },
  { id: 'primary-suite-sitting-room', type: 'primary-suite-sitting-room' },
  { id: 'primary-suite-quote', type: 'quote' },
  { id: 'primary-suite-bath', type: 'primary-suite-bath' },
  { id: 'primary-suite-closet', type: 'primary-suite-closet' },
  { id: 'primary-suite-closet-full', type: 'primary-suite-closet-full' },
  { id: 'primary-suite-office', type: 'primary-suite-office' },
  { id: 'wings-text', type: 'text-10' },
  { id: 'wings-quote', type: 'quote' },
  { id: 'wings-staggered-images', type: 'wings-staggered-images' },
  { id: 'laundry-staggered-images', type: 'laundry-staggered-images' },
  { id: 'stairs-quote', type: 'stairs-quote' },
  { id: 'stairs-image', type: 'stairs-image' },
  { id: 'architecture-text', type: 'text-11' },
  { id: 'centerstairs-image', type: 'centerstairs-image' },
  { id: 'upstairs-office-images', type: 'upstairs-office-images' },
  { id: 'architecture-quote', type: 'quote' }];

  const renderSection = (section) => {
    if (section.type === 'text-heading') {
      return (
        <div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>{section.label}</h3>
        </div>);
    }
    if (section.type === 'text-quote') { return null; }
    if (section.type === 'text-body') {
      return (<p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ marginBottom: 'clamp(16px, 2vh, 24px)', maxWidth: '860px' }}>{section.content}</p>);
    }

    switch (section.id) {
      case 'intro':
        return (
          <>
            <div className="mb-8 sm:mb-10 md:mb-12">
              <EditableImage id="intro-hero-image" src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e7ec84dc8_newpic.jpg" alt="Aerial view of main residence" className="w-full h-auto rounded-xl shadow-lg" style={{}} />
            </div>
            <EstateSystemsSection />
            <ArchitecturalReveal />
            <MainResidenceStatsGrid />
            <ArchitecturalPlansFeature />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start mb-8 sm:mb-10 md:mb-12">
              <div className="md:pt-14 lg:pt-18 relative isolate overflow-hidden rounded-xl">
                <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/5770678d3_107LindenTrailGrass-81.jpg" alt="Main residence exterior detail" className="block w-full h-auto rounded-xl shadow-lg" style={{ filter: 'saturate(0.78) contrast(0.94) brightness(0.96) sepia(0.04)' }} />
              </div>
              <div className="md:pt-16 lg:pt-24">
                <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e3b80b5a3_107LindenTrailGrass-63.jpg" alt="Cupola architectural detail" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'saturate(0.78) contrast(0.94) brightness(0.96) sepia(0.04)' }} />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5 sm:gap-6 md:gap-8 items-start mt-8 sm:mt-10 md:mt-12">
              <div className="w-full md:w-[46%] md:pt-12 lg:pt-16">
                <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/d37284700_cupola.jpg" alt="Main residence exterior" className="w-full h-auto md:aspect-[3/4] md:object-cover rounded-xl shadow-lg" style={{ filter: 'saturate(0.78) contrast(0.94) brightness(0.96) sepia(0.04)' }} />
                <blockquote className="mt-6 sm:mt-8 md:mt-10 pl-6 border-l-2 border-primary text-left max-w-2xl">
                  <p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary italic mb-0">From its articulated rooflines to the glass-wrapped conservatory, the residence reveals a carefully composed exterior defined by structure, light, and enduring materials.</p>
                </blockquote>
              </div>
              <div className="w-full md:w-[58%] md:mt-24 lg:mt-32">
                <blockquote className="mb-6 sm:mb-8 md:mb-10 pl-6 border-l-2 border-primary">
                  <p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary italic">Solid brick masonry, substantial chimney structures, vaulted ceilings, exposed beams, and carefully framed windows give the home its timeless presence, while thoughtful construction and advanced systems support comfort, performance, and long-term livability</p>
                </blockquote>
                <img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/317c343d4_107LindenTrailGrass-67.jpg" alt="Main residence exterior" className="mt-6 sm:mt-8 md:mt-10 w-full h-auto rounded-xl shadow-lg" style={{ filter: 'saturate(0.78) contrast(0.94) brightness(0.96) sepia(0.04)' }} />
              </div>
            </div>
          </>);
      case 'foyer-text':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="flex items-center gap-3 mb-3 sm:mb-4"><span className="font-sans text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-accent font-medium">Foyer</span></div><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary mb-4 sm:mb-5 leading-tight">Entry & Arrival</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed mb-4 sm:mb-5">The home{"'"}s sense of permanence and craftsmanship carries seamlessly from its brick exterior into the arrival experience, where a gracious foyer introduces the residence with light, scale, and quiet elegance. Nearby, a beautifully positioned powder room serves the main level with discretion, extending the home{"'"}s polished welcome.</p></div>);
      case 'foyer-image':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 items-start"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/955343688_foyer.jpg" alt="Foyer" className="w-full h-auto rounded-xl shadow-lg md:col-span-2 row-span-2" style={{ filter: 'brightness(1.15)' }} /><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/e4431b9fb_architguestpowder.jpg" alt="Powder Room" className="w-full h-auto rounded-xl shadow-lg md:mt-16" style={{ filter: 'brightness(1.15)' }} /></div><blockquote className="mt-8 sm:mt-10 pl-6 border-l-2 border-primary"><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary italic">Crafted from Civil War-era heart pine, the front door carries original bullet marks from the period, thoughtfully patched in a way that preserves the wood{"'"}s remarkable history.</p></blockquote></div>);
      case 'foyer-quote': return null;
      case 'foyer-text-2': return null;
      case 'foyer-background': return null;
      case 'greatRoom-text':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div><span className="block font-sans text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-medium" style={{ marginBottom: 'clamp(12px, 1.5vh, 18px)' }}>The Heart</span><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>The Great Room</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed mb-0 drop-cap">The vaulted Great Room serves as the architectural anchor, with exposed beams, a substantial masonry fireplace, and a sense of volume that feels both dramatic and inviting.</p></div><div className="md:pt-24 lg:pt-32"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/13b7514e8_fireplace.jpg" alt="Great Room Fireplace" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div></div>);
      case 'greatRoom-gallery':
        return (<div style={{ marginTop: 'clamp(40px, 5vh, 56px)', marginBottom: 'clamp(32px, 4vh, 48px)' }}><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div className="md:row-span-2"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/82834dc6e_livingroom2.jpg" alt="Great Room windows" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div><div></div><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/67d53f69d_livingroom.jpg" alt="Great Room piano view" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div></div></div>);
      case 'greatRoom-quote': return null;
      case 'kitchen-images':
        return (<div style={{ marginTop: 'clamp(32px, 4vh, 48px)', marginBottom: 'clamp(32px, 4vh, 48px)' }}><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2f7576434_SUNSHINEKITCHEN.jpg" alt="Kitchen island with butcher-block" className="w-full h-auto rounded-xl shadow-lg" /></div>);
      case 'kitchen-cooking-quote':
        return (<blockquote className="pl-6" style={{ marginTop: 'clamp(32px, 4vh, 48px)', borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">"A commanding presence that combines professional capability with architectural elegance."</p></blockquote>);
      case 'kitchen-quote':
        return (<blockquote className="pl-6" style={{ marginTop: 'clamp(32px, 4vh, 48px)', borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">"A kitchen designed to support everything from quiet mornings to large gatherings with equal ease."</p></blockquote>);
      case 'kitchen-quote-image':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/60319aa4e_SOGOODKITCHEN.jpg" alt="Kitchen with professional appliances and island" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div>);
      case 'kitchen-staggered-images':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7390c5246_KITCHENYES.jpg" alt="Kitchen view" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div><div className="md:pt-16"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/752144368_KITCHENTOOFFICETOMUD.jpg" alt="Kitchen to office to mudroom" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'scullery-quote':
        return (<blockquote className="pl-6" style={{ marginTop: 'clamp(32px, 4vh, 48px)', borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">"A beautifully designed secondary workspace that serves both function and elegance."</p></blockquote>);
      case 'scullery-image':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div></div><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/5e4a49860_HEARTPINEHALLWAYWITHBUILTINDESK.jpg" alt="Scullery workspace" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'dining-quote':
        return (<blockquote className="pl-6" style={{ marginTop: 'clamp(32px, 4vh, 48px)', borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">"A space that feels both refined and connected to the heart of the home."</p></blockquote>);
      case 'dining-staggered-images':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div className="md:col-span-2"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4c4ce32dd_sogoodtolivingroom.jpg" alt="Dining room with piano view" className="w-full h-auto rounded-xl shadow-lg" /></div><div className="md:col-span-2 flex justify-center"><div className="w-full md:w-3/4"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1a3e7a0fd_dininghori.jpg" alt="Dining room window details" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div></div></div></div>);
      case 'conservatory-quote':
        return (<blockquote className="pl-6" style={{ marginTop: 'clamp(32px, 4vh, 48px)', borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">"A luminous transition between the home{"'"}s interior architecture and the beauty beyond."</p></blockquote>);
      case 'conservatory-staggered-images':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/b2114e829_CONSERVATORYBEST.jpg" alt="Conservatory with radial roof structure" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div>);
      case 'porch-quote':
        return (<blockquote className="pl-6" style={{ marginTop: 'clamp(32px, 4vh, 48px)', borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">"A sheltered setting that extends the experience of the home outward."</p></blockquote>);
      case 'porch-staggered-images':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div className="md:row-span-2"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4d2f938a8_patio2.jpg" alt="Screened porch with furnishings" className="w-full h-auto rounded-xl shadow-lg" /></div><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/56daefc3b_patio4.jpg" alt="Screened porch seating area" className="w-full h-auto rounded-xl shadow-lg" /></div><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2569bcdfe_patio.jpg" alt="Screened porch with landscape views" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'wings-quote':
        return (<blockquote className="pl-6" style={{ marginTop: 'clamp(32px, 4vh, 48px)', borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">"Distinct wings that create a rare sense of privacy and ease."</p></blockquote>);
      case 'wings-staggered-images':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ee9a2e93b_tojoffice.jpg" alt="Family wing living room" className="w-full h-auto rounded-xl shadow-lg" /></div><div className="md:pt-16"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/1728556b0_Winglivingroom.jpg" alt="Family wing with entertainment space" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'stairs-quote':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', marginBottom: 'clamp(56px, 8vh, 80px)', padding: 'clamp(36px, 5vh, 52px) clamp(32px, 4vw, 48px)', borderRadius: '16px', background: 'linear-gradient(135deg, rgba(0,0,0,0.025) 0%, rgba(0,0,0,0.05) 100%)', border: '1px solid rgba(0,0,0,0.06)' }}><p className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-primary/85 leading-relaxed m-0">"Multiple staircases connect three finished levels, allowing architectural layering between public entertaining spaces, private family quarters, executive workspace, and retreat amenities."</p></div>);
      case 'stairs-image':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/3e5de52f9_HEARTPINEDETAILTHROUGHSTAIRWAYTOGUESTSUITE.jpg" alt="Heart pine stairway detail" className="w-full h-auto rounded-xl shadow-lg" /></div>);
      case 'architecture-quote': return null;
      case 'kitchen-text-2':
        return (<EditableText storageKey="kitchen-text-2" tag="p" defaultValue="Designed as the culinary heart of the home, the kitchen combines professional capability with warmth and openness. A substantial butcher-block island with integrated workstation sink and eat-in bar anchors the space, while a 60-inch Wolf dual-fuel range, Sub-Zero refrigeration, wine storage, custom cabinetry, and expansive counters support both everyday living and large-scale entertaining. Reclaimed heart pine floors, skylit ceilings, and open sightlines to the Great Room and conservatory make the space feel bright, connected, and deeply inviting." className="font-sans text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed mb-8 sm:mb-10" />);
      case 'kitchen-conservatory-image':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><EditableImage id="kitchen-to-conservatory-image" src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/0dd951721_KitchentoConservatory.jpg" alt="Kitchen to conservatory view" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div>);
      case 'scullery-text':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>The Scullery</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ maxWidth: '860px', marginBottom: 0 }}>Located just beyond the main kitchen, the scullery provides a beautifully designed secondary workspace that supports both everyday living and large-scale entertaining. Custom cabinetry in rich finishes lines both sides of the room, paired with stone countertops, under-cabinet lighting, and polished fixtures that maintain the home{"'"}s refined material palette.</p></div>);
      case 'scullery-staggered-images':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/41e08fa40_SCULLERYSINKGLASSTILEBACKSPLASHGRANITECOUNTERS.jpg" alt="Scullery sink and cabinetry" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div><div className="md:pt-16"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2c5a1a393_SCULLERY.jpg" alt="Scullery workspace overview" className="w-full h-auto rounded-xl shadow-lg" style={{ filter: 'brightness(1.15)' }} /></div></div></div>);
      case 'scullery-text-continued':
        return (<><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed mb-4 sm:mb-5">A secondary sink, additional refrigeration, and extensive prep surfaces allow food preparation, cleanup, and service staging to happen discreetly behind the scenes while the main kitchen remains open and welcoming for guests.</p><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed mb-8 sm:mb-10">Reclaimed heart pine flooring continues into the scullery, reinforcing the craftsmanship and warmth that define the home{"'"}s interior architecture.</p></>);
      case 'dining-text':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>The Dining Room</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ maxWidth: '860px', marginBottom: 0 }}>The formal dining room continues the sense of architectural flow, offering a space that feels both refined and connected to the heart of the home. Positioned within the main entertaining sequence, it is designed for gatherings that are intimate in atmosphere yet generous in scale.</p></div>);
      case 'conservatory-text':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>The Conservatory</h3><div style={{ maxWidth: '860px' }}><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ marginBottom: 'clamp(12px, 1.5vh, 18px)' }}>Extending from the main living spaces, the octagonal glass conservatory is one of the home{"'"}s most distinctive architectural features.</p><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed mb-0">Wrapped in full-height glazing, the conservatory fills with natural light throughout the day and offers panoramic views of the surrounding landscape.</p></div></div>);
      case 'porch-text':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>The Screened Porch</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ maxWidth: '860px', marginBottom: 0 }}>Connected to the principal living spaces, the screened porch extends the experience of the home outward, providing a sheltered setting for relaxed outdoor living.</p></div>);
      case 'primary-suite-text':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><span className="block font-sans text-[8px] sm:text-[9px] tracking-[0.4em] uppercase text-foreground/40 font-medium" style={{ marginBottom: 'clamp(12px, 1.5vh, 18px)' }}>Owner{"'"}s Retreat</span><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>The Primary Suite</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ maxWidth: '860px', marginBottom: 'clamp(32px, 4vh, 48px)' }}>Conceived as a true personal sanctuary, the primary suite is an expansive owner{"'"}s retreat featuring a cathedral-ceiling bedroom, spa-quality ensuite bathroom, a sitting room with intimate furnishings, and an extraordinary walk-in closet designed for curated wardrobes.</p><blockquote className="pl-6" style={{ borderLeft: '2px solid rgba(0,0,0,0.12)' }}><p className="font-serif text-base sm:text-lg md:text-xl font-light text-primary/80 italic mb-0">A private sanctuary that captures natural light, architectural detail, and the promise of uncompromising comfort.</p></blockquote></div>);
      case 'primary-suite-bedroom':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/8b298c854_primary1main.jpg" alt="Primary bedroom with cathedral ceiling" className="w-full h-auto rounded-xl shadow-lg" /></div>);
      case 'primary-suite-sitting-room':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/f82d6e27b_primarywidetositrom.jpg" alt="Primary sitting room with bay windows" className="w-full h-auto rounded-xl shadow-lg" /><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/6ccf9883b_primary.jpg" alt="Primary suite details" className="w-full h-auto rounded-xl shadow-lg" /></div></div>);
      case 'primary-suite-bath':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/47e7449c8_primarytightshottubandshower.jpg" alt="Spa bathtub and shower" className="w-full h-auto rounded-xl shadow-lg" /></div><div className="md:pt-16"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/f5f2dea89_spaprimarybath.jpg" alt="Primary bathroom spa amenities" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'primary-suite-closet':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/bbf0fd2bb_primaryclosetgreatshot.jpg" alt="Dressing room with curated wardrobe storage" className="w-full h-auto rounded-xl shadow-lg" /><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/78ae0502f_PrimarySuiteClosetSafe.jpg" alt="Closet safe and organization" className="w-full h-auto rounded-xl shadow-lg" /></div></div>);
      case 'primary-suite-closet-full':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/00ec6839d_fullshotprimcloset.jpg" alt="Full primary closet view with custom storage" className="w-full h-auto rounded-xl shadow-lg" /></div>);
      case 'primary-suite-office':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/2cbd74bf4_Yesjoffice.jpg" alt="Primary suite office with bay windows and fireplace" className="w-full h-auto rounded-xl shadow-lg" /></div>);
      case 'wings-text':
        return (<div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>Private Wings</h3><div style={{ maxWidth: '860px' }}><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ marginBottom: 'clamp(12px, 1.5vh, 18px)' }}>The main level unfolds in distinct wings that create a rare sense of privacy and ease.</p><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed mb-0">Thoughtfully set apart, a separate family wing includes two ensuite bedrooms, a family or playroom, laundry room, and a vaulted study with double doors.</p></div></div>);
      case 'laundry-staggered-images':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><div className="md:row-span-2"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/87a51f5b1_laundrytoom.jpg" alt="Laundry room with custom cabinetry" className="w-full h-auto rounded-xl shadow-lg" /></div><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/532688180_laundryroom2.jpg" alt="Laundry room layout" className="w-full h-auto rounded-xl shadow-lg" /></div><div><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/3292ca115_laundryperk.jpg" alt="Laundry room ironing station" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'architecture-text':
        return (<><div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>The Mudroom</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ maxWidth: '860px', marginBottom: 0 }}>A thoughtfully designed service entry with ample storage, custom cabinetry, and generous counter space for daily living and guest management.</p></div><div style={{ marginTop: 'clamp(32px, 4vh, 48px)', marginBottom: 'clamp(32px, 4vh, 48px)' }}><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/3cbece88f_MUDROOM.jpg" alt="Mudroom with cabinetry and counter space" className="w-full h-auto rounded-xl shadow-lg" /></div><div style={{ marginTop: 'clamp(56px, 8vh, 80px)', paddingTop: 'clamp(36px, 5vh, 52px)', borderTop: '1px solid rgba(0,0,0,0.08)' }}><h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-primary leading-tight" style={{ marginBottom: 'clamp(16px, 2vh, 24px)' }}>Private Suite above Mudroom with Kitchenette</h3><p className="font-sans text-xs sm:text-sm md:text-base text-foreground/75 leading-relaxed" style={{ maxWidth: '860px', marginBottom: 0 }}>A serene sitting room that serves the private guest suite, offering comfortable furnishings and abundant natural light through architectural windows.</p></div><div style={{ marginTop: 'clamp(32px, 4vh, 48px)', marginBottom: 'clamp(32px, 4vh, 48px)' }}><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/fb0ea4e3b_SITTINGROOMGUESTSUITE.jpg" alt="Guest suite sitting room" className="w-full h-auto rounded-xl shadow-lg" /></div></>);
      case 'centerstairs-image':
        return (<div className="mt-8 sm:mt-10 md:mt-12 mb-8 sm:mb-10 md:mb-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/a50108adb_centerstairwellhouse.jpg" alt="Center stairwell with heart pine detail" className="w-full h-auto rounded-xl shadow-lg" /></div>);
      case 'upstairs-office-images':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/4d33757f9_architecmarkofficetallbeampic.jpg" alt="Office with exposed beams" className="w-full h-auto rounded-xl shadow-lg md:row-span-2" /><div className="flex flex-col gap-8 sm:gap-10 md:gap-12"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/faeddcbe8_markofficemoneyshot.jpg" alt="Office with workspace and seating" className="w-full h-auto rounded-xl shadow-lg" /><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/a4985e3d4_markoffice1.jpg" alt="Office with window seating area" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'greatroom-anchor-images':
        return (<div className="mt-12 sm:mt-14 md:mt-16 mb-8 sm:mb-10 md:mb-12"><div className="flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-10 items-start"><div className="w-full md:w-[38%]"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/9e85346a0_patio4.jpg" alt="Screened porch with furnishings and glass doors" className="w-full h-auto rounded-xl shadow-lg" /></div><div className="w-full md:w-[58%] md:mt-6 lg:mt-8"><img src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/7573d3f1d_patio.jpg" alt="Screened porch with landscape views" className="w-full h-auto rounded-xl shadow-lg" /></div></div></div>);
      case 'canvas':
        return <div />;
      default:
        return null;
    }
  };

  return (
    <NewMainResidenceReturn sections={sections} renderSection={renderSection} />
  );
}