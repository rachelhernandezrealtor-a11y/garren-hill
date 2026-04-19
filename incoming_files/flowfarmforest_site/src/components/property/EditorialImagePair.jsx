import React from 'react';
import { motion } from 'framer-motion';

export default function EditorialImagePair({ images, layout = 'side-by-side', caption }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  if (layout === 'side-by-side') {
    return (
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full py-12 sm:py-20 lg:py-28 px-6 sm:px-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          {images.map((img, idx) => (
            <motion.div key={idx} variants={itemVariants} className="overflow-hidden rounded-lg">
              <img
                src={img}
                alt={`Editorial moment ${idx + 1}`}
                className="w-full h-[300px] sm:h-[400px] lg:h-[500px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
        {caption && (
          <p className="text-xs sm:text-sm text-foreground/50 mt-6 max-w-6xl mx-auto leading-relaxed">
            {caption}
          </p>
        )}
      </motion.section>
    );
  }

  if (layout === 'offset') {
    return (
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="w-full py-12 sm:py-20 lg:py-28 px-6 sm:px-8"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Larger left image */}
            <motion.div variants={itemVariants} className="lg:col-span-2 overflow-hidden rounded-lg">
              <img
                src={images[0]}
                alt="Editorial feature"
                className="w-full h-[350px] sm:h-[450px] lg:h-[550px] object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            {/* Smaller right images */}
            <div className="flex flex-col gap-6 sm:gap-8">
              {images.slice(1).map((img, idx) => (
                <motion.div key={idx} variants={itemVariants} className="overflow-hidden rounded-lg flex-1">
                  <img
                    src={img}
                    alt={`Detail ${idx + 1}`}
                    className="w-full h-[200px] sm:h-[250px] object-cover hover:scale-105 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        {caption && (
          <p className="text-xs sm:text-sm text-foreground/50 mt-6 max-w-6xl mx-auto leading-relaxed">
            {caption}
          </p>
        )}
      </motion.section>
    );
  }
}