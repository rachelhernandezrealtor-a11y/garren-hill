import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, Users, Leaf, Wrench, Recycle } from 'lucide-react';

const structures = [
{
  title: "Main Residence",
  icon: Home,
  route: "/main-residence"
},
{
  title: "Guest House",
  icon: Users,
  route: "/guest-house"
},
{
  title: "Geothermal Greenhouse",
  icon: Leaf,
  route: "/greenhouse"
},
{
  title: "Operational Farm Workshop",
  icon: Wrench,
  route: "/workshop"
},
{
  title: "Bio Char & Compost Pavilion",
  icon: Recycle,
  route: "/compost-pavilion"
}];


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
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function FlowFarmStructures() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={containerVariants}
      className="w-full">
      


      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
        {structures.map((structure, idx) => {
          const Icon = structure.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              onClick={() => navigate(structure.route)}
              className="flex flex-col items-center justify-center gap-3 sm:gap-4 p-5 sm:p-6 md:p-7 lg:p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/20 hover:border-white/30 hover:bg-black/30 hover:shadow-2xl transition-all duration-300 group cursor-pointer min-h-[140px] sm:min-h-[160px] md:min-h-[180px]" style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}>
              <Icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300" strokeWidth={1.5} />
              <p className="font-sans text-xs sm:text-sm md:text-base text-white/90 text-center font-medium leading-tight group-hover:text-white transition-colors">
                {structure.title}
              </p>
            </motion.div>);

        })}
      </div>
    </motion.div>);

}