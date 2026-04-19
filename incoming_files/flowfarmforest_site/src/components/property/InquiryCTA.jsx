import React from 'react';
import { Link } from 'react-router-dom';

export default function InquiryCTA({
  to = '/inquiry',
  label = 'Schedule Private Viewing',
  sublabel,
  variant = 'light',
  className = '',
}) {
  const styles = {
    light: {
      button: 'bg-[#f7f1e8]/10 text-[#fffaf2] border-[#f3e6d5]/28 hover:bg-[#f7f1e8]/14 hover:border-[#f3e6d5]/34',
    },
    dark: {
      button: 'bg-white/10 text-white border-white/18 hover:bg-white/16',
    },
  };

  const current = styles[variant] || styles.light;

  return (
    <Link
      to={to}
      className={`inline-flex shrink-0 cursor-pointer border px-5 py-3 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.26em] transition-all duration-300 ${current.button} ${className}`}
    >
      {label}
    </Link>
  );
}