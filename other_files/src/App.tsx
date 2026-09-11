import React, { useState, useEffect } from 'react';
import { LESSONS } from './data/lessons';
import { JARGON_TERMS } from './data/jargon';
import { QUIZ_QUESTIONS } from './data/quizzes';
import { LessonId } from './types';
import { Header } from './components/Header';
import { RoadmapNav } from './components/RoadmapNav';
import { LessonView } from './components/LessonView';
import { JargonBusterModal } from './components/JargonBusterModal';
import { FlaskEditionModal } from './components/FlaskEditionModal';
import { QuizModal } from './components/QuizModal';
import { PrintCheatsheet } from './components/PrintCheatsheet';

export default function App() {
  const [activeLessonId, setActiveLessonId] = useState<LessonId>('intro');
  const [completedIds, setCompletedIds] = useState<Set<LessonId>>(() => {
    try {
      const saved = localStorage.getItem('devops_dummies_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set<LessonId>();
    } catch {
      return new Set<LessonId>();
    }
  });
  const [isSlowMode, setIsSlowMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('devops_slow_mode') === 'true';
    } catch {
      return false;
    }
  });
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isJargonOpen, setIsJargonOpen] = useState<boolean>(false);
  const [isFlaskOpen, setIsFlaskOpen] = useState<boolean>(false);
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  // Save progress
  useEffect(() => {
    try {
      localStorage.setItem(
        'devops_dummies_completed',
        JSON.stringify(Array.from(completedIds))
      );
    } catch {}
  }, [completedIds]);

  // Save slow mode preference
  useEffect(() => {
    try {
      localStorage.setItem('devops_slow_mode', String(isSlowMode));
    } catch {}
  }, [isSlowMode]);

  // Handle active lesson change & cancel speech if playing
  const handleSelectLesson = (id: LessonId) => {
    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setActiveLessonId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCompleted = (id: LessonId) => {
    setCompletedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSlowMode = () => {
    setIsSlowMode(prev => !prev);
  };

  const toggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const currentLesson = LESSONS.find(l => l.id === activeLessonId);
      if (!currentLesson) return;

      const speechText = `${currentLesson.title}. ${currentLesson.subtitle}. Analogy: ${currentLesson.analogy.title}. ${currentLesson.analogy.description}. What it really is: ${currentLesson.plainEnglishExplanation}. Key takeaway: ${currentLesson.summaryTakeaway}`;
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = isSlowMode ? 0.85 : 0.95; // gentle, reassuring pace for slow learners
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const currentLessonIndex = LESSONS.findIndex(l => l.id === activeLessonId);
  const activeLesson = LESSONS[currentLessonIndex] || LESSONS[0];
  const prevLesson = currentLessonIndex > 0 ? LESSONS[currentLessonIndex - 1] : undefined;
  const nextLesson = currentLessonIndex < LESSONS.length - 1 ? LESSONS[currentLessonIndex + 1] : undefined;

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col ${isSlowMode ? 'text-lg' : 'text-base'}`}>
      
      {/* Header with quick utilities */}
      <Header
        completedCount={completedIds.size}
        totalCount={LESSONS.length}
        isSlowMode={isSlowMode}
        onToggleSlowMode={toggleSlowMode}
        isSpeaking={isSpeaking}
        onToggleSpeech={toggleSpeech}
        onOpenJargon={() => setIsJargonOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onOpenFlask={() => setIsFlaskOpen(true)}
        onPrint={handlePrint}
      />

      {/* Main Learning Canvas */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 print:hidden">
        
        {/* Slow-mode banner notification if enabled */}
        {isSlowMode && (
          <div className="mb-6 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="text-xl">🐢</span>
              <span>
                <strong>Slow & Steady Mode Active:</strong> Generous text line-height, simplified pacing, and relaxed speech rate. Take all the time you need!
              </span>
            </div>
            <button
              onClick={toggleSlowMode}
              className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline flex-shrink-0"
            >
              Turn off
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Navigation: Roadmap Steps */}
          <div className="lg:col-span-4 sticky lg:top-24 space-y-4">
            <RoadmapNav
              lessons={LESSONS}
              activeLessonId={activeLessonId}
              completedIds={completedIds}
              onSelectLesson={handleSelectLesson}
            />

            {/* Python / Flask Card in Sidebar for Quick Access */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200/80 shadow-xs space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">🐍</span>
                <h4 className="text-xs sm:text-sm font-bold text-indigo-950">
                  Prefer Python & Flask?
                </h4>
              </div>
              <p className="text-xs text-indigo-900 leading-relaxed">
                The full Python backend edition (<code className="font-mono bg-white px-1 py-0.5 rounded">app.py</code> & <code className="font-mono bg-white px-1 py-0.5 rounded">index.html</code>) is included in this repository.
              </p>
              <button
                onClick={() => setIsFlaskOpen(true)}
                className="w-full text-xs font-semibold py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                View & Download Flask Code
              </button>
            </div>
          </div>

          {/* Right Main Content: Active Lesson & Simulators */}
          <div className="lg:col-span-8 space-y-6">
            <LessonView
              lesson={activeLesson}
              isCompleted={completedIds.has(activeLesson.id)}
              isSlowMode={isSlowMode}
              onToggleCompleted={handleToggleCompleted}
              onSelectLesson={handleSelectLesson}
              prevLesson={prevLesson}
              nextLesson={nextLesson}
            />
          </div>

        </div>
      </div>

      {/* Printable Cheatsheet for Print Mode */}
      <PrintCheatsheet />

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 print:hidden">
        <p>
          DevOps for Dummies & Slow Learners • Built with simplicity, care, and everyday analogies.
        </p>
        <p className="mt-1 text-slate-400">
          Remember: every senior DevOps engineer started on day one not knowing what Linux was. You've got this!
        </p>
      </footer>

      {/* Modals */}
      <JargonBusterModal
        isOpen={isJargonOpen}
        onClose={() => setIsJargonOpen(false)}
        terms={JARGON_TERMS}
      />

      <FlaskEditionModal
        isOpen={isFlaskOpen}
        onClose={() => setIsFlaskOpen(false)}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        questions={QUIZ_QUESTIONS}
      />

    </div>
  );
}
