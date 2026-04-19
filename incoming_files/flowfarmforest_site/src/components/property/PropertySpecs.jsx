import React from 'react';
import { motion } from 'framer-motion';
import { Home, Zap, Droplets, Wind, DollarSign, Leaf, Trash2 } from 'lucide-react';
import { useEditMode } from '@/components/EditModeContext.jsx';
import { base44 } from '@/api/base44Client';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const specs = [
  { icon: Leaf, label: 'Total Acreage', value: '15', unit: 'acres' },
  { icon: Home, label: 'Main Residence', value: '12,000+', unit: 'sq ft' },
  { icon: Zap, label: 'Solar Array', value: '14.3', unit: 'kW' },
  { icon: Droplets, label: 'Private Well', value: '50', unit: 'GPM' },
  { icon: Wind, label: 'Bedrooms', value: '6+', unit: 'across structures' },
  { icon: DollarSign, label: 'List Price', value: '$5.25', unit: 'million' }
];

export default function PropertySpecs() {
  const { isEditMode } = useEditMode();

  const handleDelete = async () => {
    const sections = await base44.entities.PageSection.filter({ page_name: 'Home', section_type: 'PropertySpecs' });
    if (sections.length > 0) {
      await base44.entities.PageSection.delete(sections[0].id);
      window.location.reload();
    }
  };

  return (
    <section id="specs" className="bg-card py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 border-t border-border relative">
      <div className="max-w-7xl mx-auto">
        {isEditMode && (
          <button
            onClick={handleDelete}
            className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors z-50"
            title="Delete section">
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-12 sm:mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-accent font-medium">At a Glance</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight sm:leading-[1.15] max-w-2xl">
            Property Specifications
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {specs.map((spec, index) => {
            const Icon = spec.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="p-6 sm:p-7 md:p-8 border border-border hover:border-accent/50 transition-colors bg-background rounded-lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-accent/30 rounded-lg bg-accent/5">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-muted-foreground font-medium">
                      {spec.label}
                    </p>
                  </div>
                </div>
                <div className="ml-0">
                  <p className="font-serif text-2xl sm:text-3xl font-light text-primary mb-1">
                    {spec.value}
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-muted-foreground">
                    {spec.unit}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}