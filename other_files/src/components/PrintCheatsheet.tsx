import React from 'react';
import { LESSONS } from '../data/lessons';

export const PrintCheatsheet: React.FC = () => {
  return (
    <div className="hidden print:block p-8 bg-white text-black font-sans max-w-4xl mx-auto">
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-2xl font-bold uppercase tracking-wider">
          DevOps for Dummies & Slow Learners — Complete Study Guide
        </h1>
        <p className="text-sm text-gray-700 mt-1">
          Master the concepts one simple analogy at a time. No complex jargon.
        </p>
      </div>

      <div className="space-y-6">
        {LESSONS.map((l) => (
          <div key={l.id} className="border border-gray-300 p-4 rounded-lg break-inside-avoid">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-bold">
                {l.emoji} {l.title}
              </h2>
              <span className="text-xs uppercase font-bold border border-black px-2 py-0.5 rounded">
                {l.badge}
              </span>
            </div>

            <div className="bg-gray-100 p-2.5 rounded text-xs mb-2">
              <strong>Everyday Analogy: {l.analogy.title}</strong>
              <p className="mt-1">{l.analogy.description}</p>
            </div>

            <p className="text-xs text-gray-800 leading-relaxed mb-2">
              <strong>What it really is:</strong> {l.plainEnglishExplanation}
            </p>

            <div className="text-xs border-t border-gray-200 pt-2 text-gray-700">
              <strong>🎯 Rule of Thumb:</strong> {l.summaryTakeaway}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-xs text-gray-500 mt-8 border-t border-gray-300 pt-3">
        DevOps for Dummies Study Sheet • Read 3 times, practice with free browser playgrounds, and conquer your fears!
      </div>
    </div>
  );
};
