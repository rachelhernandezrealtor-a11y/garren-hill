import React from 'react';
import Navbar from '@/components/property/Navbar';
import InquirySection from '@/components/property/cinematic/InquirySection';
import Footer from '@/components/property/Footer';

export default function InquiryPage() {
  return (
    <div className="cinematic-scroll bg-black text-white" style={{ width: '100%', overflowX: 'hidden', overflowY: 'visible' }}>
      <Navbar />
      <InquirySection />
      <Footer />
    </div>
  );
}