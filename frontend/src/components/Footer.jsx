import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, Code2, Sparkles, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const summaryPillars = [
    { name: 'Abstraction', desc: 'Hide complexity', color: 'text-cyan-400' },
    { name: 'Polymorphism', desc: 'Many forms', color: 'text-orange-400' },
    { name: 'Inheritance', desc: 'Code reuse', color: 'text-purple-400' },
    { name: 'Encapsulation', desc: 'Data protection', color: 'text-emerald-400' }
  ];

  return (
    <>
      <footer
        ref={footerRef}
        className="relative py-20 bg-gradient-to-b from-slate-900 to-black overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Summary Section */}
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Sparkles className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              You've Learned the Fundamentals!
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Object-Oriented Programming gives you the power to build scalable,
              maintainable, and elegant software systems.
            </p>
          </div>

          {/* Quick recap grid */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {summaryPillars.map((pillar, index) => (
              <div
                key={pillar.name}
                className="bg-slate-800/30 backdrop-blur-sm border border-slate-700 rounded-xl p-4 text-center hover:border-slate-600 transition-colors duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className={`text-lg font-bold ${pillar.color}`}>
                  {pillar.name}
                </span>
                <p className="text-xs text-slate-500 mt-1">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <button
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl font-semibold text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-105"
              onClick={scrollToTop}
            >
              <span>Review Again</span>
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Brand */}
              <div className="flex items-center gap-2">
                <Code2 className="w-6 h-6 text-cyan-400" />
                <span className="text-white font-semibold">OOP Basics</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-400 text-sm">Interactive Learning</span>
              </div>

              {/* Links */}
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  <Github className="w-4 h-4" />
                  <span className="text-sm">Source</span>
                </a>
                <a
                  href="#"
                  className="text-slate-400 hover:text-white transition-colors duration-300 flex items-center gap-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span className="text-sm">Resources</span>
                </a>
              </div>

              {/* Copyright */}
              <p className="text-slate-500 text-sm">
                Made with superhero analogies
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <button
        className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        onClick={scrollToTop}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </button>
    </>
  );
};

export default Footer;
