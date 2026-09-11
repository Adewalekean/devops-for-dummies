import React, { useState } from 'react';
import { JargonTerm } from '../types';
import { Search, X, HelpCircle, BookOpen, Sparkles, Volume2 } from 'lucide-react';

interface JargonBusterModalProps {
  isOpen: boolean;
  onClose: () => void;
  terms: JargonTerm[];
}

export const JargonBusterModal: React.FC<JargonBusterModalProps> = ({
  isOpen,
  onClose,
  terms,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!isOpen) return null;

  const categories = ['All', 'Basics', 'Containers', 'Automation', 'Cloud', 'Kubernetes'];

  const filteredTerms = terms.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      item.term.toLowerCase().includes(query) ||
      item.dummyDefinition.toLowerCase().includes(query) ||
      item.metaphor.toLowerCase().includes(query) ||
      item.scaryDefinition.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-3 bg-gradient-to-r from-sky-50 to-indigo-50/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              📖
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                The DevOps Jargon Buster
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Terrifying tech words translated into simple, everyday English.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors border border-slate-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 sm:p-5 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search scary words (e.g. Pod, Dockerfile, Daemon, CI/CD, YAML)..."
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-sky-500 focus:bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms list */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No matching words found. Try typing "container", "pipeline", or "cluster"!
            </div>
          ) : (
            filteredTerms.map((t) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-sky-200 transition-all shadow-xs space-y-2.5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-bold text-slate-900 font-mono">
                      {t.term}
                    </h4>
                    {t.pronunciation && (
                      <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        🗣️ {t.pronunciation}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-full">
                    {t.category}
                  </span>
                </div>

                {/* Dummy translation */}
                <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl text-xs sm:text-sm text-amber-950 font-medium">
                  <span className="text-amber-800 font-bold block mb-0.5">
                    💡 In Plain English:
                  </span>
                  {t.dummyDefinition}
                </div>

                {/* Everyday metaphor */}
                <div className="text-xs text-slate-600 flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Everyday Metaphor:</strong> {t.metaphor}
                  </span>
                </div>

                {/* The scary technical jargon */}
                <details className="text-[11px] text-slate-500 pt-1">
                  <summary className="cursor-pointer hover:text-slate-700 font-medium">
                    Show the intimidating textbook definition (if you dare)
                  </summary>
                  <div className="p-2.5 bg-slate-100 rounded-lg mt-1 font-mono text-[10px] text-slate-600 leading-relaxed">
                    {t.scaryDefinition}
                  </div>
                </details>
              </div>
            ))
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Got It, Back to Lessons
          </button>
        </div>

      </div>
    </div>
  );
};
