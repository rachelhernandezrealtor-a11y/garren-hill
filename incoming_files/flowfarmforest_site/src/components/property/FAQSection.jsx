import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Trash2 } from 'lucide-react';
import { useEditMode } from '@/components/EditModeContext.jsx';
import { base44 } from '@/api/base44Client';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const faqs = [
  {
    category: 'Property',
    items: [
      {
        question: 'What is the total acreage?',
        answer: 'Flow Farm comprises approximately 15 acres of carefully curated land, with nearly 8 acres of protected forest, multiple access points, and thoughtfully zoned residential, agricultural, and operational areas.'
      },
      {
        question: 'How many structures are on the property?',
        answer: 'Six interconnected structures: the main residence (12,000+ sq ft), private cabana house, climate-controlled greenhouse, farm workshop, regenerative compost area, and biochar production zone.'
      },
      {
        question: 'What are the utility systems?',
        answer: 'The estate features 14.3 kW solar array (61 Samsung panels), 30 kW Kohler generator backup, private well (50 GPM), dual 1,500-gallon septic tanks, 20 deep geothermal wells, and commercial-grade water filtration.'
      }
    ]
  },
  {
    category: 'Smart Home & Automation',
    items: [
      {
        question: 'What is the smart home system?',
        answer: 'The property includes a comprehensive Control4 system managing whole-house audio, video, and lighting, with enterprise-grade Araknis networking for secure, estate-wide connectivity supporting both residential and commercial operations.'
      },
      {
        question: 'Is there security infrastructure?',
        answer: 'Yes, the estate features whole-house alarm systems, fire sprinklers, a Brown Safe vault door with jewelry safe in the master closet, central vacuum systems, and a comprehensive automation platform.'
      }
    ]
  },
  {
    category: 'Operations & Use Cases',
    items: [
      {
        question: 'Can this property support agritourism?',
        answer: 'Absolutely. With USDA agricultural zoning, 3-acre veganic farm, separate guest residence, and enterprise-grade infrastructure, the property is ideally suited for agritourism ventures, farm stays, wellness retreats, or farm-to-table hospitality.'
      },
      {
        question: 'What are the primary use cases?',
        answer: 'Flow Farm is flexible for multiple uses: private family compound, agritourism destination, wellness retreat center, luxury farm stay, corporate retreat venue, or agricultural enterprise with residential components.'
      },
      {
        question: 'Is the farm operational?',
        answer: 'Yes. The property includes a 3-acre veganic (vegetable/organic) farm with high tunnel greenhouse, farm workshop, and operational infrastructure ready for immediate use or expansion.'
      }
    ]
  },
  {
    category: 'Sustainability & Systems',
    items: [
      {
        question: 'How sustainable is the property?',
        answer: 'The estate integrates solar power, geothermal heating/cooling, water independence via private well and filtration, regenerative composting, biochar production, sealed crawl space, and energy recovery ventilation—engineered for resilience and minimal environmental impact.'
      },
      {
        question: 'What is the geothermal system?',
        answer: 'Twenty deep wells feed into a 5-zone HVAC system with geothermal heat exchange, providing highly efficient climate control across the entire property with Lennox air purification on each zone.'
      }
    ]
  }
];

export default function FAQSection() {
  const { isEditMode } = useEditMode();
  const [expanded, setExpanded] = useState(null);

  const toggleExpanded = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleDelete = async () => {
    const sections = await base44.entities.PageSection.filter({ page_name: 'Home', section_type: 'FAQSection' });
    if (sections.length > 0) {
      await base44.entities.PageSection.delete(sections[0].id);
      window.location.reload();
    }
  };

  return (
    <section id="faq" className="bg-card py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 border-t border-border relative">
      {isEditMode && (
        <button
          onClick={handleDelete}
          className="absolute top-4 right-4 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors z-50"
          title="Delete section">
          <Trash2 className="w-4 h-4" />
        </button>
      )}
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-accent" />
            <span className="font-sans text-[8px] sm:text-[9px] tracking-[0.35em] uppercase text-accent font-medium">Common Questions</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-primary leading-tight sm:leading-[1.15]">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-8">
          {faqs.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: catIdx * 0.1 }}
              className="space-y-3">
              <h3 className="font-serif text-lg sm:text-xl text-primary font-light mb-4">
                {category.category}
              </h3>

              {category.items.map((faq, idx) => {
                const id = `faq-${catIdx}-${idx}`;
                const isExpanded = expanded === id;

                return (
                  <motion.div
                    key={id}
                    className="border border-border rounded-lg overflow-hidden bg-background hover:border-accent/30 transition-colors">
                    <button
                      onClick={() => toggleExpanded(id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-background/50 transition-colors">
                      <p className="font-sans font-medium text-foreground pr-4">
                        {faq.question}
                      </p>
                      <motion.div
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0">
                        <ChevronDown className="w-5 h-5 text-accent" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="border-t border-border">
                          <p className="px-6 py-4 font-sans text-sm text-foreground/70 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}