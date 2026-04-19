import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import PropertyLinkButton from './PropertyLinkButton';
import LINKS from './propertyLinks';
import { base44 } from '@/api/base44Client';
import { ChevronDown } from 'lucide-react';
import InquiryAmbientAccent from './InquiryAmbientAccent';

const ease = [0.22, 0.1, 0.28, 1];

const CONTACT_POINTS = [
  {
    kicker: 'Private Showings',
    title: 'Schedule a guided visit',
    copy: 'Arrange a private appointment to experience the estate, its residence, and the surrounding land in person.',
  },
  {
    kicker: 'Property Materials',
    title: 'Review the full package',
    copy: 'Access plans, video, virtual tour, and supporting materials before or after your visit.',
  },
  {
    kicker: 'Direct Conversation',
    title: 'Discuss the opportunity',
    copy: 'Share your vision, intended use, or acquisition timeline and we will follow up directly.',
  },
];

export default function InquirySection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const heroImgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);
  const heroOverlay = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.6]);
  const heroTextY = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0.2]);
  const isHeroInView = useInView(heroRef, { once: true });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await base44.functions.invoke('sendTourRequest', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });
      console.log('Tour request response:', response.data);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error('Tour request failed:', err);
      alert('Something went wrong — please try again or email us directly.');
    } finally {
      setLoading(false);
    }
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" data-nav-theme="dark" className="w-full" style={{ background: '#000' }}>
      <div
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ height: '92vh', minHeight: '560px', background: '#000' }}
      >
        <motion.img
          src="https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/967c6b791_107LindenTrailGrass-65.jpg"
          alt="Golden-hour view across the estate grounds"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            y: heroImgY,
            scale: heroImgScale,
            filter: 'saturate(0.82) contrast(1.1) brightness(0.78)',
            imageRendering: '-webkit-optimize-contrast',
            objectPosition: 'center center',
            willChange: 'transform',
          }}
        />
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.42)', opacity: heroOverlay }} />
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.34) 72%, rgba(0,0,0,0.56) 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: '65%', background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.18) 48%, transparent 100%)' }} />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-end text-center"
          style={{ padding: 'clamp(24px, 5vw, 64px)', paddingBottom: 'clamp(72px, 11vh, 132px)', y: heroTextY, opacity: heroTextOpacity }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ duration: 1.6, ease, delay: 0.2 }}
            className="mb-5 block font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-white/70"
          >
            Private Inquiry
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.8, ease, delay: 0.35 }}
            className="mb-8 text-balance font-display text-[clamp(3.6rem,8vw,7rem)] font-medium leading-[0.9] text-white"
            style={{ textShadow: '0 1px 2px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.24)' }}
          >
            Begin the Conversation
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, ease, delay: 0.5 }}
            className="mb-0 mx-auto max-w-[620px] font-sans text-[0.96rem] leading-[2.1] text-white/90"
            style={{ textShadow: '0 1px 10px rgba(0,0,0,0.28)' }}
          >
            For private showings, acquisition discussions, and full access to property materials, submit your inquiry below.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 1.2, ease }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer z-10"
          onClick={() => contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <ChevronDown className="w-5 h-5 text-white/40" strokeWidth={1.5} />
          </motion.div>
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 pointer-events-none" style={{ height: 'clamp(40px, 6vh, 80px)', background: 'linear-gradient(to bottom, transparent, #000)' }} />
      </div>

      <div ref={contentRef} className="relative text-white" style={{ paddingTop: 'clamp(60px, 9vh, 100px)', paddingBottom: 'clamp(80px, 12vh, 140px)' }}>
        <InquiryAmbientAccent />
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
            className="text-center mx-auto relative"
            style={{ maxWidth: '700px', marginBottom: 'clamp(56px, 7vh, 88px)' }}
          >
            <div style={{ width: '56px', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '0 auto clamp(18px, 2vh, 24px)' }} />
            <span className="mb-5 block font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">
              Inquiry
            </span>
            <h2 className="mb-6 font-display text-[clamp(2.8rem,5vw,4.5rem)] font-medium leading-[1.05] text-white">
              A direct path to the estate
            </h2>
            <p className="mb-0 font-sans text-[0.96rem] leading-[2.1] text-white/70">
              Whether you are considering a private residence, hospitality concept, or long-term land vision, this is the place to begin.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 items-start" style={{ gap: 'clamp(32px, 5vw, 80px)' }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 1.6, ease }}
              className="lg:col-span-5"
            >
              <span className="mb-5 block font-sans text-[0.66rem] font-bold uppercase tracking-[0.34em] text-[#C9B18F]">
                What to expect
              </span>
              <h3 className="mb-6 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] text-white">
                A thoughtful, private introduction
              </h3>
              <p className="mb-10 font-sans text-[0.96rem] leading-[2.1] text-white/70">
                Submit your details and a brief note about your interest. We will respond directly to coordinate next steps, answer questions, and share the most relevant materials.
              </p>
              <div className="mb-10 h-px w-16 bg-[rgba(255,255,255,0.15)]" />

              <div className="grid grid-cols-1" style={{ gap: 'clamp(1px, 0.2vw, 2px)' }}>
                {CONTACT_POINTS.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease, delay: i * 0.12 }}
                    style={{
                      padding: 'clamp(24px, 3vw, 32px)',
                      background: '#111',
                      borderTop: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    <span className="mb-2 block font-sans text-[0.66rem] font-bold uppercase tracking-[0.3em] text-[#C9B18F]">
                      {item.kicker}
                    </span>
                    <h4 className="mb-4 font-display text-[clamp(1.2rem,1.8vw,1.5rem)] font-medium leading-[1.12] text-white">
                      {item.title}
                    </h4>
                    <p className="mb-0 font-sans text-[0.88rem] leading-[1.85] text-white/60">
                      {item.copy}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.1, ease }}
                style={{ marginTop: 'clamp(40px, 6vh, 64px)' }}
              >
                <span className="block font-sans uppercase" style={{ fontSize: '0.52rem', fontWeight: 600, letterSpacing: '0.35em', color: '#C9B18F', marginBottom: '14px' }}>
                  Property Resources
                </span>
                <div className="flex flex-wrap gap-2.5">
                  <PropertyLinkButton href={LINKS.video} label="Property Video" linkType="video" variant="light" />
                  <PropertyLinkButton href={LINKS.virtualTour} label="Virtual Tour" linkType="virtualTour" variant="light" />
                  <PropertyLinkButton href={LINKS.walkingTour4D} label="4D Walking Tour" linkType="walkingTour4D" variant="light" />
                  <PropertyLinkButton href={LINKS.floorPlan} label="Floor Plan" linkType="floorPlan" variant="light" />
                  <PropertyLinkButton href={LINKS.architectPlans} label="Architect Plans" linkType="architectPlans" variant="light" />
                  <PropertyLinkButton href={LINKS.electricalPlan} label="Electrical Plans" linkType="electricalPlan" variant="light" />
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.6, ease }}
              className="lg:col-span-7"
            >
              <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.15)', padding: 'clamp(28px, 4vw, 44px)', boxShadow: '0 26px 80px rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', position: 'relative', overflow: 'hidden' }}>
                <div aria-hidden="true" style={{ position: 'absolute', inset: '0 0 auto 0', height: '1px', background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.34) 50%, transparent 100%)' }} />
                <div style={{ marginBottom: 'clamp(24px, 3vh, 32px)', paddingBottom: 'clamp(20px, 2.5vh, 28px)', borderBottom: '1px solid rgba(255,255,255,0.15)' }}>
                  <span className="mb-3 block font-sans text-[0.66rem] font-bold uppercase tracking-[0.35em] text-[#C9B18F]">
                    Private Request
                  </span>
                  <h3 className="mb-3 font-display text-[clamp(1.8rem,3vw,2.5rem)] font-medium leading-[1.05] text-white">
                    Schedule your private tour
                  </h3>
                  <p className="mb-0 font-sans text-[0.96rem] leading-[1.85] text-white/60">
                    Sustainable infrastructure. USDA zoning. A residence and landholding of unusual scale and flexibility.
                  </p>
                </div>

                {submitted && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginBottom: '24px', padding: '16px 18px', background: '#1a1a1a', border: '1px solid rgba(255, 255, 255, 0.28)' }}>
                    <p className="font-sans" style={{ fontSize: '0.88rem', color: '#fff', margin: 0, fontWeight: 500 }}>
                      Thank you — we&apos;ll be in touch shortly.
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {[
                    { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                    { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                    { name: 'phone', label: 'Phone', type: 'tel', placeholder: '(123) 456-7890' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block font-sans uppercase" style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.26em', color: '#C9B18F', marginBottom: '10px' }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleChange}
                        required={field.name !== 'phone'}
                        placeholder={field.placeholder}
                        className="w-full bg-transparent font-sans text-sm text-white focus:outline-none"
                        style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', padding: '0 0 14px', borderRadius: 0 }}
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block font-sans uppercase" style={{ fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.26em', color: '#C9B18F', marginBottom: '10px' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Tell us about your interest..."
                      className="w-full bg-transparent font-sans text-sm text-white focus:outline-none resize-none"
                      style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', padding: '0 0 14px', borderRadius: 0 }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full font-sans uppercase transition-all duration-300 hover:opacity-95 hover:-translate-y-[1px]"
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      letterSpacing: '0.28em',
                      color: '#000',
                      padding: '16px 24px',
                      border: '1px solid rgba(255,255,255,0.18)',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    {loading ? 'Sending...' : 'Request a Tour'}
                  </button>
                </form>

                <div style={{ marginTop: 'clamp(28px, 3vh, 36px)', paddingTop: 'clamp(20px, 2.5vh, 28px)', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                  <p className="font-sans" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>
                    107 Linden Trail · Pinehurst, NC 28374
                  </p>
                  <p className="font-sans" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0 }}>
                    $5,250,000
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}