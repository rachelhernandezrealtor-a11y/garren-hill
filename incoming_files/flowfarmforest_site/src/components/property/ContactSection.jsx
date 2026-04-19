import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-card py-24 md:py-36 px-4 sm:px-6 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-accent font-medium">Get In Touch</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl font-light text-primary leading-[1.15]">
            Schedule Your Private Viewing
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-serif text-2xl font-light text-primary mb-4">Sotheby's International Realty</h3>
              <div className="space-y-4">
                <a href="tel:+19109876543" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="font-sans text-sm">(910) 987-6543</span>
                </a>
                <a href="mailto:info@flowfarm.com" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="font-sans text-sm">info@flowfarm.com</span>
                </a>
                <div className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="font-sans text-sm">107 Aberdeen Trail, North Carolina</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="min-h-32"
            />
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-primary-foreground">
              {submitted ? 'Message Sent' : 'Send Inquiry'}
            </Button>
            {submitted && (
              <div className="flex items-center gap-2 text-accent">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Thank you for your inquiry</span>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );





























































































































































}