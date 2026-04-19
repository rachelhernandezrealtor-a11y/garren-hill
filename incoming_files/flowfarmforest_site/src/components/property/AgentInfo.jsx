import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, MapPin, Trash2 } from 'lucide-react';
import { useEditMode } from '@/components/EditModeContext.jsx';
import { base44 } from '@/api/base44Client';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function AgentInfo() {
  const { isEditMode } = useEditMode();

  const handleDelete = async () => {
    const sections = await base44.entities.PageSection.filter({ page_name: 'Home', section_type: 'AgentInfo' });
    if (sections.length > 0) {
      await base44.entities.PageSection.delete(sections[0].id);
      window.location.reload();
    }
  };

  return (
    <section id="agent" className="bg-background py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 border-t border-border relative">
      {isEditMode && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors z-50"
          title="Delete section">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-accent font-medium">Meet Your Agent</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight sm:leading-[1.15]">
            Luxury Estate Expertise
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-16">
          {/* Agent Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <div className="w-full h-full bg-gradient-to-br from-muted/40 to-muted/20" />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-xl sm:text-2xl font-light text-primary mb-2">
                Alexandra Sterling
              </h3>
              <p className="font-sans text-sm text-accent font-medium tracking-widest uppercase mb-4">
                Senior Luxury Property Specialist
              </p>
              <p className="font-sans text-sm text-foreground/70 leading-relaxed mb-6">
                With 15+ years specializing in luxury estate properties across the Southeast, Alexandra brings unparalleled expertise in high-value acquisitions, agritourism ventures, and transformative property development.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-medium text-muted-foreground tracking-widest uppercase mb-1">Credentials</p>
                    <p className="font-sans text-sm text-foreground/70">Licensed Real Estate Broker, Certified Luxury Home Marketing Specialist</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-medium text-muted-foreground tracking-widest uppercase mb-1">Experience</p>
                    <p className="font-sans text-sm text-foreground/70">$500M+ in luxury property transactions, estate development consultant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs font-medium text-muted-foreground tracking-widest uppercase mb-1">Service Area</p>
                    <p className="font-sans text-sm text-foreground/70">Pinehurst, Sandhills, and Greater Raleigh region</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <p className="font-sans text-xs text-muted-foreground mb-3">DIRECT CONTACT</p>
                <a href="tel:+19105551234" className="font-serif text-lg text-primary hover:text-accent transition-colors block mb-2">
                  (910) 555-1234
                </a>
                <a href="mailto:alexandra@luxuryestates.com" className="font-sans text-sm text-accent hover:underline">
                  alexandra@luxuryestates.com
                </a>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className="flex flex-col justify-center">
            <h3 className="font-serif text-2xl sm:text-3xl font-light text-primary mb-8">
              Why Work With Our Team
            </h3>

            <div className="space-y-8">
              {[
                {
                  title: 'Specialized Expertise',
                  description: 'Deep knowledge of luxury estates, agricultural properties, and enterprise-scale residential development.'
                },
                {
                  title: 'Discretion & Privacy',
                  description: 'Confidential handling of high-profile acquisitions with comprehensive NDA protocols.'
                },
                {
                  title: 'Global Network',
                  description: 'Access to qualified buyers worldwide through luxury property networks and international partnerships.'
                },
                {
                  title: 'Comprehensive Support',
                  description: 'From property inspection to closing, we guide you through every step with transparency and expertise.'
                },
                {
                  title: 'Market Intelligence',
                  description: 'Real-time insights into luxury market trends, comparable sales, and investment potential.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-4">
                  <div className="w-1 bg-accent rounded-full flex-shrink-0" />
                  <div>
                    <h4 className="font-serif text-lg font-light text-primary mb-2">
                      {item.title}
                    </h4>
                    <p className="font-sans text-sm text-foreground/70">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}