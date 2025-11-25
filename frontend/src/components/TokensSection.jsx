import React, { useState, useEffect, useRef } from 'react';
import { Key, Tag, Hash, Plus, Braces, Sparkles } from 'lucide-react';
import { javaTokens } from '../data/mockData';

const iconMap = {
  Key: Key,
  Tag: Tag,
  Hash: Hash,
  Plus: Plus,
  Braces: Braces
};

const TokensSection = () => {
  const [activeToken, setActiveToken] = useState(0);
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

  const stoneColors = [
    { bg: 'from-violet-500 to-purple-600', shadow: 'shadow-purple-500/30', text: 'text-purple-400' },
    { bg: 'from-amber-500 to-orange-600', shadow: 'shadow-orange-500/30', text: 'text-orange-400' },
    { bg: 'from-blue-500 to-cyan-600', shadow: 'shadow-cyan-500/30', text: 'text-cyan-400' },
    { bg: 'from-red-500 to-rose-600', shadow: 'shadow-rose-500/30', text: 'text-rose-400' },
    { bg: 'from-emerald-500 to-teal-600', shadow: 'shadow-teal-500/30', text: 'text-teal-400' }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-black via-slate-950 to-slate-900 overflow-hidden"
    >
      {/* Cosmic background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5,
              animation: `twinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider mb-4 block">
            {javaTokens.subtitle}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Elements/</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Tokens
            </span>
            <span className="text-white"> in Java</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {javaTokens.intro}
          </p>
        </div>

        {/* Infinity Stones display */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {javaTokens.tokens.map((token, index) => {
            const IconComponent = iconMap[token.icon];
            const colors = stoneColors[index];
            
            return (
              <div
                key={index}
                className={`relative cursor-pointer transition-all duration-500 ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setActiveToken(index)}
              >
                {/* Stone container */}
                <div
                  className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${colors.bg} p-1 transition-all duration-300 ${
                    activeToken === index
                      ? `scale-125 ${colors.shadow} shadow-2xl`
                      : 'hover:scale-110'
                  }`}
                  style={{
                    transform: activeToken === index
                      ? 'perspective(500px) rotateY(10deg) scale(1.25)'
                      : 'perspective(500px) rotateY(0)'
                  }}
                >
                  {/* Inner glow */}
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                    <IconComponent className="w-10 h-10 text-white relative z-10" />
                  </div>
                  
                  {/* Outer glow */}
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${colors.bg} blur-xl opacity-50 -z-10 transition-opacity duration-300 ${
                      activeToken === index ? 'opacity-100' : 'opacity-30'
                    }`}
                  />
                </div>

                {/* Label */}
                <p
                  className={`text-center mt-3 text-sm font-medium transition-colors duration-300 ${
                    activeToken === index ? colors.text : 'text-slate-500'
                  }`}
                >
                  {token.name}
                </p>
              </div>
            );
          })}
        </div>

        {/* Active token details */}
        <div
          className={`max-w-3xl mx-auto transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {javaTokens.tokens.map((token, index) => {
            const colors = stoneColors[index];
            const IconComponent = iconMap[token.icon];
            
            return (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  activeToken === index
                    ? 'opacity-100 transform-none'
                    : 'opacity-0 absolute -translate-y-4 pointer-events-none'
                }`}
              >
                <div
                  className={`bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 relative overflow-hidden`}
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${colors.bg} opacity-10 blur-3xl`}
                  />

                  <div className="relative">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center`}
                      >
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${colors.text}`}>
                          {token.name}
                        </h3>
                        <p className="text-slate-400 text-sm">
                          {token.description}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-950 rounded-xl p-4 font-mono text-sm">
                      <span className="text-slate-500">Examples: </span>
                      <span className="text-slate-300">{token.examples}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TokensSection;
