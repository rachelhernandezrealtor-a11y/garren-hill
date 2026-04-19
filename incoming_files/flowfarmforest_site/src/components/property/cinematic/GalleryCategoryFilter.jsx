import React from 'react';

export default function GalleryCategoryFilter({ categories, active, onSelect, photoCounts }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <button
        onClick={() => onSelect('All')}
        className={`px-4 py-1.5 rounded-full text-[0.7rem] font-sans font-medium tracking-wide uppercase transition-all duration-200 border ${
          active === 'All'
            ? 'bg-foreground text-background border-foreground'
            : 'bg-transparent text-muted-foreground/60 border-border hover:border-foreground/30 hover:text-foreground/80'
        }`}
      >
        All ({photoCounts['All']})
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-[0.7rem] font-sans font-medium tracking-wide uppercase transition-all duration-200 border ${
            active === cat
              ? 'bg-foreground text-background border-foreground'
              : 'bg-transparent text-muted-foreground/60 border-border hover:border-foreground/30 hover:text-foreground/80'
          }`}
        >
          {cat} ({photoCounts[cat]})
        </button>
      ))}
    </div>
  );
}