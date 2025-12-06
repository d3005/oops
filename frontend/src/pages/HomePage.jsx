import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Sparkles, ArrowDown, BookOpen, ChevronRight, Rocket, Box, Layers, Package, Database } from 'lucide-react';
import { courseInfo, unitsOverview } from '../data/unitsData';

const iconMap = {
  Rocket, Box, Layers, Package, Database
};

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef(null);
  const unitsRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (unitsRef.current) observer.observe(unitsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Floating shapes */}
        <div
          className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'linear-gradient(135deg, #00D9FF, #06D6A0)',
            transform: `translate3d(${mousePosition.x * 50}px, ${mousePosition.y * 50}px, 0)`,
            left: '10%', top: '20%',
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'linear-gradient(135deg, #FF6B35, #9B5DE5)',
            transform: `translate3d(${-mousePosition.x * 40}px, ${-mousePosition.y * 40}px, 0)`,
            right: '5%', bottom: '10%',
            transition: 'transform 0.3s ease-out'
          }}
        />

        {/* Main content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="mb-6 inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-full px-5 py-2">
            <Code2 className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 text-sm font-medium">{courseInfo.subtitle}</span>
            <Sparkles className="w-4 h-4 text-orange-400" />
          </div>

          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Java
            </span>
            <br />
            <span className="text-white">Programming</span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Mastery
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            {courseInfo.description}. <span className="text-cyan-400">5 comprehensive units</span> covering
            everything from basics to advanced concepts.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/unit/1"
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center justify-center gap-2">
                <Rocket className="w-5 h-5" />
                Start Learning
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button
              onClick={() => document.getElementById('units-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl font-semibold text-white hover:bg-slate-700/50 transition-all duration-300"
            >
              <span className="flex items-center justify-center gap-2">
                <BookOpen className="w-5 h-5" />
                View All Units
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <span className="text-slate-500 text-sm">Explore Units</span>
          <ArrowDown className="w-5 h-5 text-slate-500" />
        </div>
      </section>

      {/* Units Index Section */}
      <section
        id="units-section"
        ref={unitsRef}
        className="relative py-24 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
      >
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-4 block">Course Contents</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Master Java in </span>
              <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">5 Units</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              From fundamentals to advanced concepts, each unit builds upon the previous with superhero analogies.
            </p>
          </div>

          {/* Units Grid */}
          <div className="space-y-6">
            {unitsOverview.map((unit, index) => {
              const IconComponent = iconMap[unit.icon];
              return (
                <Link
                  to={`/unit/${unit.id}`}
                  key={unit.id}
                  className={`group block transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="relative rounded-2xl overflow-hidden bg-slate-800/30 border border-slate-700 hover:border-slate-600 transition-all duration-300 group-hover:scale-[1.01]"
                    style={{
                      boxShadow: `0 0 0 1px transparent`,
                    }}
                  >
                    <div className="p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
                      {/* Unit number & Icon */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${unit.gradient} flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}
                          style={{ boxShadow: `0 10px 40px ${unit.color}30` }}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <div className="md:hidden">
                          <span className="text-slate-500 text-sm">Unit {unit.id}</span>
                          <h3 className="text-xl font-bold text-white">{unit.title}</h3>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-grow">
                        <div className="hidden md:block">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="text-slate-500 text-sm">Unit {unit.id}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-slate-500 text-sm">{unit.topics.length} Topics</span>
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-1">{unit.title}</h3>
                        </div>
                        <p className="text-slate-400 text-sm md:text-base">{unit.description}</p>
                        
                        {/* Topics */}
                        <div className="flex flex-wrap gap-2 mt-4">
                          {unit.topics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-6 h-6 text-slate-500 group-hover:text-white group-hover:translate-x-2 transition-all duration-300 hidden md:block" />
                    </div>

                    {/* Gradient line at bottom */}
                    <div
                      className={`h-1 bg-gradient-to-r ${unit.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                    />
                  </div>
                </Link>
              );
            })}          </div>

          {/* OOP Basics Link */}
          <div className={`mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Link
              to="/oop-basics"
              className="inline-flex items-center gap-3 px-6 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>View OOP Basics Interactive Presentation</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
