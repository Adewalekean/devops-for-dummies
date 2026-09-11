import React from 'react';
import { Lesson, LessonId } from '../types';
import { CheckCircle2, Circle, Clock, ChevronRight } from 'lucide-react';

interface RoadmapNavProps {
  lessons: Lesson[];
  activeLessonId: LessonId;
  completedIds: Set<LessonId>;
  onSelectLesson: (id: LessonId) => void;
}

export const RoadmapNav: React.FC<RoadmapNavProps> = ({
  lessons,
  activeLessonId,
  completedIds,
  onSelectLesson,
}) => {
  return (
    <nav className="bg-white rounded-2xl border border-slate-200 p-3 sm:p-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          🗺️ Learning Journey Steps
        </span>
        <span className="text-[11px] text-slate-500 font-medium">
          Click any step to explore
        </span>
      </div>

      <div className="space-y-1.5">
        {lessons.map((lesson) => {
          const isActive = lesson.id === activeLessonId;
          const isDone = completedIds.has(lesson.id);

          return (
            <button
              key={lesson.id}
              onClick={() => onSelectLesson(lesson.id)}
              className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition-all flex items-center justify-between gap-3 group ${
                isActive
                  ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-200'
                  : isDone
                  ? 'bg-slate-50 hover:bg-slate-100 text-slate-800'
                  : 'hover:bg-slate-50 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-xl flex-shrink-0">{lesson.emoji}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? 'bg-amber-600/60 text-white'
                          : 'bg-slate-200/80 text-slate-600'
                      }`}
                    >
                      {lesson.badge}
                    </span>
                    <h3
                      className={`text-xs sm:text-sm font-semibold truncate ${
                        isActive ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {lesson.title.split(':')[0]}
                    </h3>
                  </div>
                  <p
                    className={`text-[11px] truncate mt-0.5 ${
                      isActive ? 'text-amber-100' : 'text-slate-500'
                    }`}
                  >
                    {lesson.analogy.title}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`text-[11px] flex items-center gap-1 font-medium hidden sm:flex ${
                    isActive ? 'text-amber-100' : 'text-slate-400'
                  }`}
                >
                  <Clock className="w-3 h-3" />
                  {lesson.estimatedMinutes}m
                </span>

                {isDone ? (
                  <CheckCircle2
                    className={`w-4 h-4 ${
                      isActive ? 'text-white' : 'text-emerald-500'
                    }`}
                  />
                ) : (
                  <Circle
                    className={`w-4 h-4 opacity-40 ${
                      isActive ? 'text-white' : 'text-slate-400'
                    }`}
                  />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
