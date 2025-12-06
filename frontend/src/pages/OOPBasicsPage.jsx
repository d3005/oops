import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Hero3D from '../components/Hero3D';
import AvengersSection from '../components/AvengersSection';
import PillarsSection from '../components/PillarsSection';
import JavaStructureSection from '../components/JavaStructureSection';
import TokensSection from '../components/TokensSection';
import DataTypesSection from '../components/DataTypesSection';
import ConstantsSection from '../components/ConstantsSection';
import Footer from '../components/Footer';

const OOPBasicsPage = () => {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Back navigation */}
      <div className="fixed top-4 left-4 z-50">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/90 backdrop-blur-sm border border-slate-700 rounded-xl text-slate-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Back to Index</span>
        </Link>
      </div>

      <Hero3D />
      <AvengersSection />
      <PillarsSection />
      <JavaStructureSection />
      <TokensSection />
      <DataTypesSection />
      <ConstantsSection />
      <Footer />
    </div>
  );
};

export default OOPBasicsPage;
