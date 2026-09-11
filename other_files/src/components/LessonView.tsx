import React from 'react';
import { Lesson, LessonId } from '../types';
import { 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Lightbulb,
  HeartHandshake
} from 'lucide-react';
import { LinuxSimulator } from './simulators/LinuxSimulator';
import { GitSimulator } from './simulators/GitSimulator';
import { DockerSimulator } from './simulators/DockerSimulator';
import { CicdSimulator } from './simulators/CicdSimulator';
import { K8sSimulator } from './simulators/K8sSimulator';

interface LessonViewProps {
  lesson: Lesson;
  isCompleted: boolean;
  isSlowMode: boolean;
  onToggleCompleted: (id: LessonId) => void;
  onSelectLesson: (id: LessonId) => void;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  isCompleted,
  isSlowMode,
  onToggleCompleted,
  onSelectLesson,
  prevLesson,
  nextLesson,
}) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-8 shadow-sm">
      
      {/* Lesson Header */}
      <div className="border-b border-slate-100 pb-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
              {lesson.badge}
            </span>
            <span className="text-xs text-slate-500 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} minute read
            </span>
          </div>

          <button
            onClick={() => onToggleCompleted(lesson.id)}
            className={`text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-slate-400'}`} />
            {isCompleted ? 'Marked as Learned ✓' : 'Mark as Learned'}
          </button>
        </div>

        <div className="flex items-start gap-4">
          <span className="text-4xl sm:text-5xl flex-shrink-0 select-none">
            {lesson.emoji}
          </span>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {lesson.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              {lesson.subtitle}
            </p>
          </div>
        </div>

        {/* Fear-Buster Reassurance Box for Slow Learners */}
        <div className="mt-4 p-3.5 rounded-xl bg-sky-50 border border-sky-200/80 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-sky-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-sky-900">
            <strong className="font-semibold block mb-0.5">Don't be intimidated:</strong>
            {lesson.fearBuster}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className={`space-y-8 ${isSlowMode ? 'leading-loose text-base' : 'leading-relaxed'}`}>

        {/* 1. The Real-World Analogy (ELI5) */}
        <section className="bg-amber-50/80 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">💡</span>
            <h3 className="text-base sm:text-lg font-bold text-amber-950">
              The Everyday Analogy: {lesson.analogy.title}
            </h3>
          </div>

          <div className="bg-amber-100/60 rounded-xl p-3 mb-4 text-xs sm:text-sm font-medium text-amber-900 flex items-center gap-2">
            <HeartHandshake className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span><strong>Role in plain terms:</strong> {lesson.analogy.realWorldRole}</span>
          </div>

          <p className="text-sm sm:text-base text-slate-800 font-normal leading-relaxed">
            {lesson.analogy.description}
          </p>

          <div className="mt-4 pt-3 border-t border-amber-200/80 text-xs text-amber-900 font-mono bg-white/70 px-3 py-2 rounded-lg border border-amber-200">
            ✨ {lesson.analogy.visualLabel}
          </div>
        </section>

        {/* 2. What is it really in plain English? */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-600" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              What is it really in plain English?
            </h3>
          </div>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {lesson.plainEnglishExplanation}
          </p>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-600">
            <strong className="text-slate-800 font-semibold">Why this matters to you: </strong>
            {lesson.whyItMatters}
          </div>
        </section>

        {/* 3. Interactive Sandbox / Simulator */}
        {lesson.interactiveType && (
          <section className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Hands-on Interactive Playground
              </h3>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-medium px-2 py-0.5 rounded-full border border-indigo-200">
                100% Safe Sandbox
              </span>
            </div>

            {lesson.interactiveType === 'terminal' && <LinuxSimulator />}
            {lesson.interactiveType === 'git' && <GitSimulator />}
            {lesson.interactiveType === 'docker' && <DockerSimulator />}
            {lesson.interactiveType === 'cicd' && <CicdSimulator />}
            {lesson.interactiveType === 'k8s' && <K8sSimulator />}
          </section>
        )}

        {/* 4. Key Concepts to Know */}
        <section className="space-y-3 pt-2">
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Bite-Sized Concepts to Remember
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {lesson.keyConcepts.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm font-mono text-indigo-900">
                    {item.term}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {item.simpleDefinition}
                  </p>
                </div>
                {item.example && (
                  <div className="mt-3 pt-2 border-t border-slate-200/80 text-[11px] text-slate-500 italic">
                    Example: {item.example}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 5. Free Zero-Install Recommended Practice */}
        <section className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Free Browser Practice (No Install Needed)
              </span>
              <span className="text-[10px] bg-emerald-200 text-emerald-900 font-bold px-1.5 py-0.5 rounded">
                100% Free
              </span>
            </div>
            <h4 className="text-sm sm:text-base font-bold text-emerald-950">
              {lesson.recommendedPractice.name}
            </h4>
            <p className="text-xs text-emerald-800">
              {lesson.recommendedPractice.description}
            </p>
          </div>

          <a
            href={lesson.recommendedPractice.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl transition-all shadow-sm flex-shrink-0"
          >
            <span>Open Free Lab</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </section>

        {/* 6. Summary Takeaway Callout */}
        <div className="p-4 rounded-xl bg-slate-900 text-slate-100 flex items-center justify-between gap-3 text-xs sm:text-sm">
          <div>
            <strong className="text-amber-300 block mb-0.5">Summary Takeaway:</strong>
            {lesson.summaryTakeaway}
          </div>
        </div>

      </div>

      {/* Lesson Navigation Footer */}
      <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {prevLesson ? (
          <button
            onClick={() => onSelectLesson(prevLesson.id)}
            className="text-xs sm:text-sm font-medium text-slate-600 hover:text-slate-900 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous: {prevLesson.title.split(':')[0]}</span>
          </button>
        ) : (
          <div />
        )}

        <div className="flex items-center gap-2">
          <button
            onClick={() => onToggleCompleted(lesson.id)}
            className={`text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-800 hover:bg-slate-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? '✓ Completed!' : 'Mark as Learned'}
          </button>

          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson.id)}
              className="text-xs sm:text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Next: {nextLesson.title.split(':')[0]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

    </div>
  );
};
