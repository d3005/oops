import React from "react";
import "./App.css";
import Hero3D from "./components/Hero3D";
import AvengersSection from "./components/AvengersSection";
import PillarsSection from "./components/PillarsSection";
import JavaStructureSection from "./components/JavaStructureSection";
import TokensSection from "./components/TokensSection";
import DataTypesSection from "./components/DataTypesSection";
import ConstantsSection from "./components/ConstantsSection";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App min-h-screen bg-slate-900">
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
}

export default App;
