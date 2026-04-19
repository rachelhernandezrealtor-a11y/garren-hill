import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

function Counter({ from = 0, to, duration = 2, format = (v) => Math.round(v), suffix = '', prefix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => `${prefix}${format(latest)}${suffix}`);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, to, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [isInView, count, to, duration]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

export default function HomeStatisticsModule() {
  const stats = [
    { label: 'Total Acres', value: 15, suffix: '', format: Math.round },
    { label: 'Buildable Acres', value: 7, suffix: '', format: Math.round },
    { label: 'Miles to Pinehurst', value: 3, suffix: '', format: Math.round },
    { label: 'Offered At', value: 5.25, prefix: '$', suffix: 'M', format: (v) => v.toFixed(2) },
    { label: 'Amp Electrical Service', value: 1200, suffix: '', format: (v) => Math.round(v).toLocaleString() },
    { label: 'Acre Veganic Farm', value: 3, suffix: '', format: Math.round },
  ];

  return (
    <section className="bg-[#0a0a0a] text-white px-6 py-20 sm:px-10 lg:px-16 lg:py-24 border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="mx-auto max-w-7xl relative z-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-16 md:grid-cols-3 lg:grid-cols-6 lg:gap-x-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center"
            >
              <div className="font-display text-[clamp(2.8rem,4.5vw,4rem)] font-medium leading-none text-white mb-5 drop-shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <Counter 
                  to={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix} 
                  format={stat.format} 
                  duration={2.5}
                />
              </div>
              <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/50 max-w-[14ch]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}