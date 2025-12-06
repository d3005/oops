import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, Code, BookOpen, Lightbulb, Home, Menu, X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { unitsOverview, unit1Content, unit2Content, unit3Content, unit4Content, unit5Content } from '../data/unitsData';

const unitContents = {
  1: unit1Content,
  2: unit2Content,
  3: unit3Content,
  4: unit4Content,
  5: unit5Content
};

const UnitPage = () => {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(0);
  const [expandedTopic, setExpandedTopic] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  const unitNum = parseInt(unitId);
  const unitData = unitContents[unitNum];
  const unitInfo = unitsOverview.find(u => u.id === unitNum);

  useEffect(() => {
    setIsVisible(true);
    setActiveSection(0);
    setExpandedTopic(null);
    window.scrollTo(0, 0);
  }, [unitId]);

  if (!unitData || !unitInfo) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Unit Not Found</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">Go back to Home</Link>
        </div>
      </div>
    );
  }

  const currentSection = unitData.sections[activeSection];
  const IconComponent = LucideIcons[currentSection?.icon] || LucideIcons.BookOpen;

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors">
                <Home className="w-5 h-5 text-slate-300" />
              </Link>
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Link to="/" className="text-slate-400 hover:text-white">Home</Link>
                <span className="text-slate-600">/</span>
                <span className="text-white">Unit {unitNum}: {unitInfo.title}</span>
              </div>
            </div>

            {/* Unit Navigation */}
            <div className="flex items-center gap-2">
              {unitNum > 1 && (
                <Link
                  to={`/unit/${unitNum - 1}`}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-5 h-5 text-slate-300" />
                  <span className="hidden sm:inline text-sm text-slate-300">Unit {unitNum - 1}</span>
                </Link>
              )}
              {unitNum < 5 && (
                <Link
                  to={`/unit/${unitNum + 1}`}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  <span className="hidden sm:inline text-sm text-slate-300">Unit {unitNum + 1}</span>
                  <ArrowRight className="w-5 h-5 text-slate-300" />
                </Link>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                {sidebarOpen ? <X className="w-5 h-5 text-slate-300" /> : <Menu className="w-5 h-5 text-slate-300" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed md:sticky top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-slate-900 border-r border-slate-800 overflow-y-auto transition-transform duration-300 z-40 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="p-6">
            {/* Unit Header */}
            <div className={`mb-8 p-4 rounded-xl bg-gradient-to-br ${unitInfo.gradient} bg-opacity-10`} style={{ backgroundColor: `${unitInfo.color}10` }}>
              <span className="text-sm font-medium" style={{ color: unitInfo.color }}>Unit {unitNum}</span>
              <h2 className="text-lg font-bold text-white mt-1">{unitInfo.title}</h2>
              <p className="text-xs text-slate-400 mt-2">{unitInfo.subtitle}</p>
            </div>

            {/* Sections */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Contents</span>
              {unitData.sections.map((section, index) => {
                const SectionIcon = LucideIcons[section.icon] || LucideIcons.BookOpen;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(index);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 text-left ${
                      activeSection === index
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    <SectionIcon className="w-5 h-5 flex-shrink-0" style={{ color: activeSection === index ? unitInfo.color : undefined }} />
                    <span className="text-sm font-medium">{section.title}</span>
                  </button>
                );
              })}
            </div>

            {/* All Units */}
            <div className="mt-8 pt-6 border-t border-slate-800">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">All Units</span>
              <div className="mt-3 space-y-1">
                {unitsOverview.map(unit => (
                  <Link
                    key={unit.id}
                    to={`/unit/${unit.id}`}
                    className={`block p-2 rounded-lg text-sm transition-colors ${
                      unit.id === unitNum
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-500 hover:text-white hover:bg-slate-800/50'
                    }`}
                  >
                    Unit {unit.id}: {unit.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main ref={contentRef} className="flex-1 min-h-screen">
          {/* Hero Analogy */}
          <div
            className={`relative py-16 px-6 md:px-12 bg-gradient-to-br ${unitInfo.gradient} bg-opacity-5 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ backgroundColor: `${unitInfo.color}08` }}
          >
            <div className="max-w-4xl">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5" style={{ color: unitInfo.color }} />
                <span className="text-sm font-semibold uppercase tracking-wider" style={{ color: unitInfo.color }}>
                  {unitData.heroAnalogy.title}
                </span>
              </div>
              <p className="text-xl text-slate-300 leading-relaxed">
                {unitData.heroAnalogy.description}
              </p>
            </div>
          </div>

          {/* Section Content */}
          <div className="p-6 md:p-12">
            <div
              className={`max-w-4xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${unitInfo.gradient} flex items-center justify-center shadow-lg`}
                  style={{ boxShadow: `0 10px 40px ${unitInfo.color}30` }}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div>
                  <span className="text-sm text-slate-500">Section {activeSection + 1} of {unitData.sections.length}</span>
                  <h1 className="text-3xl font-bold text-white">{currentSection.title}</h1>
                </div>
              </div>

              {/* Definition Box */}
              {currentSection.content.definition && (
                <div className="mb-8 p-6 bg-slate-800/50 border border-slate-700 rounded-2xl">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    <span className="font-semibold text-white">Definition</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{currentSection.content.definition}</p>
                </div>
              )}

              {/* Render different content types */}
              {renderSectionContent(currentSection, unitInfo, expandedTopic, setExpandedTopic)}

              {/* Navigation */}
              <div className="flex justify-between mt-12 pt-8 border-t border-slate-800">
                <button
                  onClick={() => setActiveSection(Math.max(0, activeSection - 1))}
                  disabled={activeSection === 0}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeSection === 0
                      ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous
                </button>
                <button
                  onClick={() => setActiveSection(Math.min(unitData.sections.length - 1, activeSection + 1))}
                  disabled={activeSection === unitData.sections.length - 1}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all ${
                    activeSection === unitData.sections.length - 1
                      ? 'bg-slate-800/30 text-slate-600 cursor-not-allowed'
                      : `bg-gradient-to-r ${unitInfo.gradient} text-white hover:opacity-90`
                  }`}
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

// Helper function to render different content types
const renderSectionContent = (section, unitInfo, expandedTopic, setExpandedTopic) => {
  const content = section.content;

  return (
    <div className="space-y-8">
      {/* Features/Types list */}
      {content.features && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.features.map((feature, i) => {
            const FeatureIcon = LucideIcons[feature.icon] || LucideIcons.Star;
            return (
              <div key={i} className="p-5 bg-slate-800/30 border border-slate-700 rounded-xl hover:border-slate-600 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <FeatureIcon className="w-5 h-5" style={{ color: unitInfo.color }} />
                  <span className="font-semibold text-white">{feature.name}</span>
                </div>
                <p className="text-sm text-slate-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Token types */}
      {content.types && (
        <div className="space-y-3">
          {content.types.map((type, i) => (
            <div
              key={i}
              className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl"
              style={{ borderLeftColor: type.color, borderLeftWidth: '4px' }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-white">{type.name}</span>
                <code className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400">{type.example}</code>
              </div>
              <p className="text-sm text-slate-400 mt-1">{type.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Primitives table */}
      {content.primitives && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Size</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Range</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Example</th>
              </tr>
            </thead>
            <tbody>
              {content.primitives.map((p, i) => (
                <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/30">
                  <td className="py-3 px-4"><code className="text-cyan-400">{p.type}</code></td>
                  <td className="py-3 px-4 text-slate-400">{p.size}</td>
                  <td className="py-3 px-4 text-slate-400">{p.range}</td>
                  <td className="py-3 px-4"><code className="text-emerald-400 text-xs">{p.example}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Categories (operators) */}
      {content.categories && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.categories.map((cat, i) => (
            <div key={i} className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
              <span className="text-white font-semibold">{cat.name}</span>
              <code className="block text-lg my-2 text-cyan-400">{cat.operators}</code>
              <p className="text-xs text-slate-500">{cat.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Control statement types */}
      {content.types && content.types[0]?.code && (
        <div className="space-y-4">
          {content.types.map((type, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-slate-700">
              <button
                onClick={() => setExpandedTopic(expandedTopic === i ? null : i)}
                className="w-full p-4 bg-slate-800/50 flex items-center justify-between hover:bg-slate-800 transition-colors"
              >
                <div>
                  <span className="text-white font-semibold">{type.name}</span>
                  <p className="text-sm text-slate-400">{type.desc}</p>
                </div>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${expandedTopic === i ? 'rotate-180' : ''}`} />
              </button>
              {expandedTopic === i && (
                <div className="p-4 bg-slate-950">
                  <pre className="text-sm font-mono text-slate-300 overflow-x-auto"><code>{type.code}</code></pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modifiers */}
      {content.modifiers && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.modifiers.map((mod, i) => {
            const ModIcon = LucideIcons[mod.icon] || LucideIcons.Key;
            return (
              <div key={i} className="p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
                <div className="flex items-center gap-3 mb-2">
                  <ModIcon className="w-5 h-5" style={{ color: unitInfo.color }} />
                  <code className="text-white font-semibold">{mod.name}</code>
                </div>
                <p className="text-sm text-slate-400">{mod.scope}</p>
              </div>
            );
          })}
        </div>
      )}

      {/* Methods list */}
      {content.methods && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {content.methods.map((m, i) => (
            <div key={i} className="p-3 bg-slate-800/30 border border-slate-700 rounded-lg">
              <code className="text-cyan-400 text-sm">{m.method}</code>
              <p className="text-xs text-slate-500 mt-1">{m.desc}</p>
            </div>
          ))}
        </div>
      )}

      {/* Steps list */}
      {content.steps && (
        <div className="space-y-3">
          {content.steps.map((step, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/30 border border-slate-700 rounded-xl">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${unitInfo.gradient} flex items-center justify-center text-white font-bold`}>
                {i + 1}
              </div>
              <span className="text-slate-300">{step}</span>
            </div>
          ))}
        </div>
      )}

      {/* Usage list */}
      {content.usage && (
        <ul className="space-y-2">
          {content.usage.map((use, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-300">
              <span className="mt-1 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: unitInfo.color }} />
              {use}
            </li>
          ))}
        </ul>
      )}

      {/* Code example */}
      {content.syntax && (
        <div className="rounded-xl overflow-hidden border border-slate-700">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">Code Example</span>
            </div>
            <span className="text-xs text-slate-500">Java</span>
          </div>
          <pre className="p-4 bg-slate-950 overflow-x-auto text-sm">
            <code className="font-mono text-slate-300">{content.syntax}</code>
          </pre>
        </div>
      )}

      {content.codeExample && (
        <div className="rounded-xl overflow-hidden border border-slate-700">
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-300">Code Example</span>
            </div>
          </div>
          <pre className="p-4 bg-slate-950 overflow-x-auto text-sm">
            <code className="font-mono text-slate-300">{content.codeExample}</code>
          </pre>
        </div>
      )}

      {/* Analogy box */}
      {content.analogy && (
        <div className="p-6 rounded-2xl border-l-4" style={{ borderColor: unitInfo.color, backgroundColor: `${unitInfo.color}10` }}>
          <div className="flex items-center gap-2 mb-3">
            <LucideIcons.Sparkles className="w-5 h-5" style={{ color: unitInfo.color }} />
            <span className="font-semibold text-white">Superhero Analogy: {content.analogy.hero}</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{content.analogy.explanation}</p>
        </div>
      )}
    </div>
  );
};

export default UnitPage;
