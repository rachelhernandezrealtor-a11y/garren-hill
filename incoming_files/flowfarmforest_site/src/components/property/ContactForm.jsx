import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditMode } from '@/components/EditModeContext.jsx';
import { base44 } from '@/api/base44Client';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function ContactForm() {
  const { isEditMode } = useEditMode();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const sections = await base44.entities.PageSection.filter({ page_name: 'Home', section_type: 'ContactForm' });
    if (sections.length > 0) {
      await base44.entities.PageSection.delete(sections[0].id);
      window.location.reload();
    }
  };

  return (
    <section id="contact" className="bg-background py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 relative">
      {isEditMode && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors z-50"
          title="Delete section">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16 lg:gap-20">
          {/* Left - Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-8 bg-accent" />
              <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-accent font-medium">Get In Touch</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight sm:leading-[1.15] mb-8 max-w-xl">
              Schedule Your Private Tour
            </h2>
            <p className="font-sans text-sm sm:text-base text-foreground/70 leading-relaxed mb-12">
              Experience Flow Farm firsthand. Our luxury estate specialists are ready to guide you through this extraordinary property.
            </p>

            <div className="space-y-8">
              <motion.a
                href="tel:+1234567890"
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center border border-accent/30 rounded-lg bg-accent/5 group-hover:bg-accent/10 transition-colors flex-shrink-0">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1">Phone</p>
                  <p className="font-serif text-lg text-primary group-hover:text-accent transition-colors">(123) 456-7890</p>
                </div>
              </motion.a>

              <motion.a
                href="mailto:info@flowfarm.com"
                whileHover={{ x: 8 }}
                className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 flex items-center justify-center border border-accent/30 rounded-lg bg-accent/5 group-hover:bg-accent/10 transition-colors flex-shrink-0">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1">Email</p>
                  <p className="font-serif text-lg text-primary group-hover:text-accent transition-colors">inquiries@flowfarm.com</p>
                </div>
              </motion.a>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-accent/30 rounded-lg bg-accent/5 flex-shrink-0">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-1">Location</p>
                  <p className="font-serif text-lg text-primary">Pinehurst, North Carolina</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="lg:sticky lg:top-24">
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 sm:p-8 md:p-10">
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="font-sans text-sm text-green-700 font-medium">
                    Thank you! We'll be in touch shortly.
                  </p>
                </motion.div>
              )}

              <div className="space-y-5 mb-6">
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border bg-background text-foreground font-sans text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-border bg-background text-foreground font-sans text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-background text-foreground font-sans text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                    placeholder="(123) 456-7890"
                  />
                </div>

                <div>
                  <label className="block font-sans text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-border bg-background text-foreground font-sans text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all resize-none"
                    placeholder="Tell us about your interest..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-accent hover:bg-accent/90 text-white font-sans text-sm tracking-[0.1em] uppercase font-medium py-3 rounded-lg transition-all">
                {loading ? 'Sending...' : 'Schedule Tour'}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}