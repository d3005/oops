import React, { useState, useEffect, useRef } from 'react';
import { Flame, Droplets, Zap, Database } from 'lucide-react';
import { dataTypes } from '../data/mockData';

const DataTypesSection = () => {
  const [hoveredType, setHoveredType] = useState(null);
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

  const typeColors = [
    'from-amber-500 to-yellow-600',
    'from-blue-500 to-cyan-600',
    'from-green-500 to-emerald-600',
    'from-purple-500 to-violet-600',
    'from-red-500 to-orange-600',
    'from-teal-500 to-cyan-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600'
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Pokéball background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute -top-1/2 -left-1/4 w-full h-full rounded-full border-[100px] border-red-500" />
        <div className="absolute -bottom-1/2 -right-1/4 w-full h-full rounded-full border-[100px] border-white" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <Flame className="w-6 h-6 text-orange-500" />
            <Droplets className="w-6 h-6 text-blue-500" />
            <Zap className="w-6 h-6 text-yellow-500" />
          </div>
          <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
            {dataTypes.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">DATA TYPES & </span>
            <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              VARIABLES
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {dataTypes.intro}
          </p>
        </div>

        {/* Primitive Data Types Grid */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-8">
            <Database className="w-6 h-6 text-cyan-400" />
            <h3 className="text-2xl font-bold text-white">Primitive Data Types</h3>
            <span className="text-slate-500 text-sm">(The Original 8 Gym Badges)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dataTypes.primitives.map((type, index) => (
              <div
                key={type.type}
                className={`group relative transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredType(index)}
                onMouseLeave={() => setHoveredType(null)}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden transition-transform duration-300 ${
                    hoveredType === index ? 'scale-105' : ''
                  }`}
                  style={{
                    transform: hoveredType === index
                      ? 'perspective(1000px) rotateY(5deg) rotateX(-5deg) scale(1.05)'
                      : 'perspective(1000px) rotateY(0) rotateX(0)'
                  }}
                >
                  {/* Card border gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${typeColors[index]} opacity-50`} />
                  
                  {/* Card content */}
                  <div className="relative m-[2px] bg-slate-900 rounded-2xl p-5">
                    {/* Type name badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-sm font-bold font-mono bg-gradient-to-r ${typeColors[index]} text-white`}
                      >
                        {type.type}
                      </span>
                      <span className="text-xs text-slate-500">{type.size}</span>
                    </div>

                    {/* Stats */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Range:</span>
                        <span className="text-slate-300 font-mono text-xs">
                          {type.range}
                        </span>
                      </div>
                      <div className="text-slate-400 text-xs italic">
                        {type.analogy}
                      </div>
                    </div>

                    {/* Code example */}
                    <div className="mt-4 bg-slate-950 rounded-lg p-3">
                      <code className="text-xs font-mono text-emerald-400">
                        {type.example}
                      </code>
                    </div>

                    {/* Power level indicator */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Power Level</span>
                        <span>{type.size}</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${typeColors[index]} transition-all duration-500`}
                          style={{
                            width: hoveredType === index
                              ? `${((index + 1) / 8) * 100}%`
                              : `${((index + 1) / 8) * 60}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${typeColors[index]} blur-xl transition-opacity duration-300 -z-10 ${
                    hoveredType === index ? 'opacity-30' : 'opacity-0'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Memory size visualization */}
        <div
          className={`bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Memory Size Visualization (Dragon Ball Power Levels)
          </h4>
          
          <div className="space-y-4">
            {[
              { name: 'byte', bits: 8, label: 'Krillin', color: 'bg-amber-500' },
              { name: 'short', bits: 16, label: 'Piccolo', color: 'bg-blue-500' },
              { name: 'int', bits: 32, label: 'Goku', color: 'bg-green-500' },
              { name: 'long', bits: 64, label: 'Goku SSJ', color: 'bg-purple-500' }
            ].map((item, index) => (
              <div key={item.name} className="flex items-center gap-4">
                <span className="w-16 text-sm font-mono text-slate-400">{item.name}</span>
                <div className="flex-grow h-8 bg-slate-900 rounded-lg overflow-hidden relative">
                  <div
                    className={`h-full ${item.color} transition-all duration-1000`}
                    style={{
                      width: isVisible ? `${(item.bits / 64) * 100}%` : '0%',
                      transitionDelay: `${index * 200}ms`
                    }}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                    {item.bits} bits - {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTypesSection;
