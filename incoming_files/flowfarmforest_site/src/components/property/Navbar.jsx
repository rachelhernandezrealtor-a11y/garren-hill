import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { siteContent } from './siteContent';

const navLinks = [
  { label: 'Estate at a Glance', href: '/estate-at-a-glance' },
  { label: 'All Photos', href: '/all-photos' },
  { label: 'Location', href: '/Location' },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkZone, setDarkZone] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setScrolled(y > vh * 0.9);

      const navBottom = scrolled ? 44 + 64 : 64;
      const sampleY = y + navBottom / 2;
      const sections = document.querySelectorAll('[data-nav-theme]');
      let theme = 'dark';
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + y;
        const sectionBottom = sectionTop + rect.height;
        if (sampleY >= sectionTop && sampleY < sectionBottom) {
          theme = section.getAttribute('data-nav-theme') || 'dark';
          break;
        }
      }
      setDarkZone(theme === 'dark');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleRequestViewing = useCallback((e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    navigate('/inquiry');
  }, [navigate]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
        className="fixed left-0 right-0 z-50 transition-all duration-500 will-change-transform"
        style={{
          top: '0px',
          background: 'transparent',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          borderBottom: '1px solid transparent',
          boxShadow: 'none',
          transition: 'top 0.4s ease, background 0.65s ease, backdrop-filter 0.65s ease, border-bottom-color 0.65s ease, box-shadow 0.65s ease',
        }}
      >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              opacity: scrolled ? 1 : 0,
              background: darkZone
                ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.24) 50%, transparent 100%)'
                : 'linear-gradient(90deg, transparent 0%, rgba(23,22,20,0.12) 50%, transparent 100%)',
              transition: 'opacity 0.5s ease, background 0.5s ease',
            }}
          />
        <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 h-12 sm:h-14 md:h-16 lg:h-20 flex items-center justify-between">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 hidden lg:block"
            style={{ height: '1px', background: 'transparent' }}
          />
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none no-underline opacity-0 pointer-events-none" aria-label="Go to home">
            <span className="font-sans text-[0.54rem] sm:text-[0.58rem] font-semibold tracking-[0.42em] uppercase">Flow Farm</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, i) => {
             const isPage = !link.href.startsWith('#');
             const isActive = location.pathname === link.href;
             const className = `font-sans text-[10px] xl:text-[11px] tracking-[0.28em] uppercase font-medium transition-colors ${isActive ? (darkZone ? 'text-white' : 'text-black') : (darkZone ? 'text-white/75 hover:text-white' : 'text-black/72 hover:text-black')}`;
             const style = {};
              const handleClick = link.scrollTop ? (e) => {
                e.preventDefault();
                navigate(link.href);
                setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
              } : undefined;
              return isPage ? (
                <motion.div key={link.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 + 0.4 }} whileHover={{ y: -2 }} className="relative">
                  <Link to={link.href} onClick={handleClick} className={className} style={style}>{link.label}</Link>
                  <span
                    className="absolute left-0 right-0 -bottom-2 h-px origin-center transition-all duration-500"
                    style={{
                      opacity: isActive && scrolled ? 1 : 0,
                      transform: isActive && scrolled ? 'scaleX(1)' : 'scaleX(0.45)',
                      background: darkZone ? 'rgba(85,67,43,0.42)' : 'rgba(140,122,99,0.72)',
                    }}
                  />
                </motion.div>
              ) : (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 + 0.4 }}
                  whileHover={{ y: -2 }}
                  className={className}
                  style={style}>
                  {link.label}
                </motion.a>
              );
            })}

          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden w-8 sm:w-9 h-8 sm:h-9 flex items-center justify-center transition-colors duration-500 ${darkZone ? 'text-white' : 'text-black'}`}
            aria-label="Toggle menu">
            {mobileOpen ? <X className="w-4 sm:w-5 h-4 sm:h-5" /> : <Menu className="w-4 sm:w-5 h-4 sm:h-5" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white flex flex-col pt-16 sm:pt-20 md:pt-24" style={{ background: 'linear-gradient(180deg, #f6f1e8 0%, #f2ece2 100%)', backdropFilter: 'blur(16px)' }}>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                style={{ background: 'radial-gradient(circle at top center, rgba(191,162,116,0.12) 0%, rgba(191,162,116,0) 52%)' }}
              />
            <div className="flex-1 overflow-y-auto px-3 sm:px-6">
              <div className="flex flex-col gap-0.5 mt-3 sm:mt-4">
                {navLinks.map((link, i) => {
                  const isPage = !link.href.startsWith('#');
                  const isActive = location.pathname === link.href;
                  const handleMobileClick = (e) => {
                    setMobileOpen(false);
                    if (link.scrollTop) {
                      e.preventDefault();
                      navigate(link.href);
                      setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
                    }
                  };
                  return isPage ? (
                    <motion.div key={link.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 + 0.1 }}>
                      <Link to={link.href} onClick={handleMobileClick} className={`font-display text-[1.18rem] sm:text-[1.45rem] md:text-[1.75rem] font-light py-2 sm:py-2.5 transition-colors block ${isActive ? 'text-accent' : 'text-primary hover:text-accent'}`}>{link.label}</Link>
                    </motion.div>
                  ) : (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 + 0.1 }}
                      className="font-display text-lg sm:text-xl md:text-2xl font-light text-primary py-2.5 sm:py-3 hover:text-accent transition-colors">
                      {link.label}
                    </motion.a>
                  );
                })}
              </div>
            </div>

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileOpen(false);
                handleRequestViewing(e);
              }}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-4 sm:mt-6 mb-4 sm:mb-6 mx-3 sm:mx-6 bg-primary text-white font-sans text-[9px] sm:text-[10px] md:text-[11px] tracking-[0.24em] uppercase font-medium py-3 sm:py-3.5 md:py-4 text-center cursor-pointer border border-primary hover:bg-transparent hover:text-primary transition-all duration-300">
              {siteContent.cta.primary}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}