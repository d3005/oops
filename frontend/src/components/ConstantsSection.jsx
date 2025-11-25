import React, { useState, useEffect, useRef } from 'react';
import { Lock, Gem, Eye, Sparkles } from 'lucide-react';
import { constants } from '../data/mockData';

const ConstantsSection = () => {
  const [activeExample, setActiveExample] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-rotate examples
  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setActiveExample(prev => (prev + 1) % constants.examples.length);
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const stonePositions = [
    { x: 20, y: 40, color: 'from-violet-500 to-purple-600', name: 'Mind' },
    { x: 40, y: 20, color: 'from-blue-500 to-cyan-600', name: 'Space' },
    { x: 60, y: 40, color: 'from-red-500 to-rose-600', name: 'Reality' },
    { x: 30, y: 60, color: 'from-orange-500 to-amber-600', name: 'Soul' },
    { x: 50, y: 60, color: 'from-green-500 to-emerald-600', name: 'Time' },
    { x: 80, y: 50, color: 'from-yellow-500 to-amber-500', name: 'Power' }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-slate-900 via-indigo-950/20 to-slate-900 overflow-hidden"
    >
      {/* Cosmic background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-amber-500" />
            <Gem className="w-6 h-6 text-purple-500" />
          </div>
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
            {constants.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">CONSTANTS </span>
            <span className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              (Final Variables)
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {constants.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Gauntlet visualization */}
          <div
            className={`relative h-96 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            {/* Gauntlet base */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-80 bg-gradient-to-b from-amber-600/30 to-amber-900/30 rounded-3xl backdrop-blur-sm border border-amber-500/30">
                {/* Infinity stones */}
                {stonePositions.map((stone, index) => (
                  <div
                    key={index}
                    className="absolute transition-all duration-500"
                    style={{
                      left: `${stone.x}%`,
                      top: `${stone.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    <div
                      className={`relative w-10 h-10 rounded-full bg-gradient-to-br ${stone.color} transition-all duration-300 ${
                        activeExample === index % constants.examples.length
                          ? 'scale-125 shadow-lg'
                          : 'scale-100'
                      }`}
                      style={{
                        boxShadow: activeExample === index % constants.examples.length
                          ? `0 0 30px 10px ${['rgba(139,92,246,0.5)', 'rgba(6,182,212,0.5)', 'rgba(244,63,94,0.5)', 'rgba(249,115,22,0.5)', 'rgba(34,197,94,0.5)', 'rgba(234,179,8,0.5)'][index]}`
                          : 'none'
                      }}
                    >
                      <div className="absolute inset-1 bg-gradient-to-br from-white/40 to-transparent rounded-full" />
                      <Sparkles
                        className={`absolute -top-1 -right-1 w-4 h-4 text-white transition-opacity duration-300 ${
                          activeExample === index % constants.examples.length ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </div>
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-500 whitespace-nowrap">
                      {stone.name}
                    </span>
                  </div>
                ))}

                {/* Center piece */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-amber-500/50 flex items-center justify-center">
                  <span className="text-2xl font-bold text-amber-400">6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Code examples */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-300 text-sm font-medium">The final Keyword</span>
                </div>
                <span className="text-xs text-amber-500 font-mono">Constants.java</span>
              </div>

              {/* Code content */}
              <div className="p-6 space-y-4">
                {constants.examples.map((example, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                      activeExample === index
                        ? 'bg-amber-500/10 border border-amber-500/30'
                        : 'bg-slate-900/50 border border-transparent hover:border-slate-700'
                    }`}
                    onClick={() => setActiveExample(index)}
                  >
                    <code className="font-mono text-sm">
                      <span className="text-amber-400">final</span>
                      <span className="text-slate-300"> {example.code.replace('final ', '')}</span>
                    </code>
                    <p className="text-xs text-slate-500 mt-2">{example.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Convention note */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Eye className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold">Naming Convention</span>
                  <p className="text-slate-400 text-sm mt-1">
                    {constants.convention}
                  </p>
                  <code className="inline-block mt-2 px-3 py-1 bg-slate-900 rounded text-xs font-mono text-amber-400">
                    MAX_VALUE, INFINITY_STONES, PI
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConstantsSection;
