import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx';

export default function ArchitecturalPlansFeature() {
  return (
    <Dialog>
      <div className="mb-8 sm:mb-10 flex flex-nowrap gap-3 sm:gap-4 overflow-x-auto pb-1 bg-transparent">
        <DialogTrigger asChild>
          <button className="inline-flex min-h-[56px] shrink-0 items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-4 font-sans text-[11px] uppercase tracking-[0.22em] leading-none text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md whitespace-nowrap">
            View Architectural Plans
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </DialogTrigger>
        <a
          href="https://my.matterport.com/show/?m=xZRfSiQPuQ8&brand=0&mls=1&"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[56px] shrink-0 items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-4 font-sans text-[11px] uppercase tracking-[0.22em] leading-none text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md whitespace-nowrap"
        >
          Explore 3D Home Tour
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
        </a>
        <button className="inline-flex min-h-[56px] shrink-0 items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-4 font-sans text-[11px] uppercase tracking-[0.22em] leading-none text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md whitespace-nowrap">
          View Floor Plan
        </button>
      </div>
      <DialogContent className="max-w-5xl border-none bg-white p-8 sm:p-10 shadow-none rounded-[28px]">
        <DialogHeader className="mb-6 text-left">
          <DialogTitle className="font-serif text-2xl font-light text-black">Architectural Plans</DialogTitle>
        </DialogHeader>
        <div className="min-h-[420px] bg-white">
          <div>
            <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.35em] text-black/55">Main Residence</p>
            <h3 className="font-serif text-4xl font-light text-black">Architectural Plans</h3>
            <p className="mt-3 max-w-md font-sans text-sm leading-7 text-black/65">Original design drawings prepared for the residence, presented as a refined archival preview.</p>
          </div>
          <div className="grid grid-cols-2 gap-6 sm:gap-8 pt-8 mt-8">
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-black/45">Sheet</p>
              <p className="mt-2 font-serif text-lg font-light text-black">Ground Level</p>
            </div>
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-black/45">Architect</p>
              <p className="mt-2 font-serif text-lg font-light text-black">Robert E. Clark</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}