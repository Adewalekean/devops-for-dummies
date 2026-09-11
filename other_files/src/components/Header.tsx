import React from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Terminal, 
  Printer, 
  Code2, 
  Volume2, 
  VolumeX, 
  Turtle, 
  Sparkles,
  CheckCircle2,
  FileCode
} from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  totalCount: number;
  isSlowMode: boolean;
  onToggleSlowMode: () => void;
  isSpeaking: boolean;
  onToggleSpeech: () => void;
  onOpenJargon: () => void;
  onOpenQuiz: () => void;
  onOpenFlask: () => void;
  onPrint: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  totalCount,
  isSlowMode,
  onToggleSlowMode,
  isSpeaking,
  onToggleSpeech,
  onOpenJargon,
  onOpenQuiz,
  onOpenFlask,
  onPrint,
}) => {
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-sm font-bold text-xl flex-shrink-0">
              🚀
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  DevOps for Dummies
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
                  Slow Learners Edition
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                No complex jargon. Real-world kitchen & lunchbox analogies only.
              </p>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Slow Pace Mode Toggle */}
            <button
              onClick={onToggleSlowMode}
              title="Slow mode enlarges text spacing and breaks explanations into one bite at a time"
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                isSlowMode
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 ring-2 ring-emerald-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Turtle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isSlowMode ? 'Slow & Steady ON' : 'Slow Mode'}</span>
            </button>

            {/* Read Aloud Toggle */}
            <button
              onClick={onToggleSpeech}
              title="Listen to the lesson read aloud at a calm, comfortable pace"
              className={`text-xs px-2.5 py-1.5 rounded-lg border font-medium flex items-center gap-1.5 transition-all ${
                isSpeaking
                  ? 'bg-amber-100 text-amber-900 border-amber-300 ring-2 ring-amber-200'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-amber-700 animate-pulse" />
                  <span>Stop Voice</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Read Aloud</span>
                </>
              )}
            </button>

            {/* Jargon Buster */}
            <button
              onClick={onOpenJargon}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
              <span>Jargon Buster</span>
            </button>

            {/* Confidence Quiz */}
            <button
              onClick={onOpenQuiz}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Quick Quiz</span>
            </button>

            {/* Python / Flask Backend Edition */}
            <button
              onClick={onOpenFlask}
              className="text-xs px-3 py-1.5 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <FileCode className="w-3.5 h-3.5 text-indigo-600" />
              <span>Python / Flask Code</span>
            </button>

            {/* Print Study Sheet */}
            <button
              onClick={onPrint}
              title="Print all lessons or save as PDF"
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print</span>
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-3 flex items-center gap-3 pt-2.5 border-t border-slate-100 text-xs text-slate-600">
          <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center gap-1.5 font-medium whitespace-nowrap">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {completedCount} of {totalCount} Steps Completed ({progressPercent}%)
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
