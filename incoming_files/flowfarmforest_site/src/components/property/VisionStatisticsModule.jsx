import React, { useState } from 'react';
import { motion } from 'framer-motion';

const statistics = [
{ label: 'Total Acres', value: '15', description: 'Contiguous private estate' },
{ label: 'Farm Acreage', value: '3', description: 'USDA veganic farm' },
{ label: 'Forest', value: '8', description: 'USDA zoned acres' },
{ label: 'Distance to Pinehurst', value: '3 mi', description: 'From town center' }];


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function VisionStatisticsModule() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}>
      {statistics.map((stat, index) => null






























      )}
    </motion.div>);

}