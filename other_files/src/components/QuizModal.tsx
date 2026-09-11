import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { X, CheckCircle2, XCircle, Sparkles, ArrowRight, RotateCcw, HelpCircle } from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: QuizQuestion[];
}

export const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose, questions }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentQ = questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (showExplanation) return;
    setSelectedOptionIndex(index);
    setShowExplanation(true);
    if (currentQ.options[index].isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOptionIndex(null);
    setShowExplanation(false);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOptionIndex(null);
    setShowExplanation(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-3 bg-gradient-to-r from-amber-50 to-orange-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              🎯
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Confidence-Building Check
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Gentle, zero-stress review to cement the everyday analogies in your memory.
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

        {/* Question Area or Final Screen */}
        <div className="p-6 overflow-y-auto flex-1">
          {isFinished ? (
            <div className="text-center py-8 space-y-4">
              <span className="text-5xl inline-block animate-bounce">🏆</span>
              <h3 className="text-2xl font-bold text-slate-900">
                Fantastic Work!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                You scored <strong className="text-emerald-600 font-bold text-lg">{score}</strong> out of <strong className="font-bold text-lg">{questions.length}</strong>!
                You are proving that DevOps is simple when you connect it to real-world cooking and tools.
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={handleRestart}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Try Again
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
                >
                  Back to Learning
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {/* Progress */}
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-slate-100">
                <span>Question {currentIndex + 1} of {questions.length}</span>
                <span>Score: {score}</span>
              </div>

              {/* Question Text */}
              <div>
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  {currentQ.question}
                </h4>
                <p className="text-xs text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 mt-2 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span><strong>Analogy Hint:</strong> {currentQ.analogyHint}</span>
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOptionIndex === idx;
                  let btnStyle = 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-800';

                  if (showExplanation) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-medium ring-1 ring-emerald-300';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 opacity-60 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={showExplanation}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                    >
                      <span className="flex-1">{opt.text}</span>
                      {showExplanation && opt.isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      )}
                      {showExplanation && isSelected && !opt.isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Reveal */}
              {showExplanation && selectedOptionIndex !== null && (
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm animate-in fade-in duration-200 ${
                    currentQ.options[selectedOptionIndex].isCorrect
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-amber-50 border border-amber-200 text-amber-900'
                  }`}
                >
                  <strong className="block font-semibold mb-1">
                    {currentQ.options[selectedOptionIndex].isCorrect ? '🎉 Great Job!' : '💡 Friendly Explanation:'}
                  </strong>
                  <p>{currentQ.options[selectedOptionIndex].explanation}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isFinished && (
          <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
            {showExplanation ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
              >
                <span>{currentIndex < questions.length - 1 ? 'Next Question' : 'See Results'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="text-xs text-slate-400 self-center">
                Select an answer to see the explanation
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
