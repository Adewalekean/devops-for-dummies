import React, { useState } from 'react';
import { GitCommit, GitBranch, History, RotateCcw, Plus, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface Commit {
  id: string;
  hash: string;
  message: string;
  recipeState: string;
  status: 'good' | 'bad';
  timestamp: string;
}

const INITIAL_COMMITS: Commit[] = [
  {
    id: 'c1',
    hash: 'a1b2c3d',
    message: 'Initial recipe: Grandma\'s Chocolate Chip Cookies',
    recipeState: 'Ingredients:\n- 2 cups flour\n- 1 cup sugar\n- 1 cup chocolate chips',
    status: 'good',
    timestamp: '10:00 AM'
  },
  {
    id: 'c2',
    hash: 'e4f5g6h',
    message: 'Added pure vanilla extract for extra flavor',
    recipeState: 'Ingredients:\n- 2 cups flour\n- 1 cup sugar\n- 1 cup chocolate chips\n- 1 tsp pure vanilla',
    status: 'good',
    timestamp: '10:15 AM'
  }
];

export const GitSimulator: React.FC = () => {
  const [commits, setCommits] = useState<Commit[]>(INITIAL_COMMITS);
  const [selectedCommitId, setSelectedCommitId] = useState<string>('c2');
  const [draftMessage, setDraftMessage] = useState('');

  const currentCommit = commits.find(c => c.id === selectedCommitId) || commits[commits.length - 1];

  const addGoodChange = () => {
    const newId = 'c' + (commits.length + 1);
    const newHash = Math.random().toString(16).substring(2, 9);
    const newCommit: Commit = {
      id: newId,
      hash: newHash,
      message: draftMessage.trim() || 'Added a pinch of sea salt',
      recipeState: currentCommit.recipeState + '\n- 1/2 tsp sea salt (enhances sweetness)',
      status: 'good',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setCommits(prev => [...prev, newCommit]);
    setSelectedCommitId(newId);
    setDraftMessage('');
  };

  const addMistake = () => {
    const newId = 'c' + (commits.length + 1);
    const newHash = Math.random().toString(16).substring(2, 9);
    const newCommit: Commit = {
      id: newId,
      hash: newHash,
      message: 'OH NO: Accidentally dumped in 2 cups of salty pickle juice!',
      recipeState: currentCommit.recipeState + '\n- 🚨 2 CUPS OF SOUR PICKLE JUICE (RUINED!)',
      status: 'bad',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setCommits(prev => [...prev, newCommit]);
    setSelectedCommitId(newId);
  };

  const revertTo = (targetId: string) => {
    setSelectedCommitId(targetId);
  };

  const resetAll = () => {
    setCommits(INITIAL_COMMITS);
    setSelectedCommitId('c2');
  };

  return (
    <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4 sm:p-6 my-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
            <GitCommit className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
              The Git Time-Machine Sandbox
            </h4>
            <p className="text-xs text-slate-600">
              Make changes, save checkpoints, and travel back in time when mistakes happen.
            </p>
          </div>
        </div>
        <button
          onClick={resetAll}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-amber-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Checkpoints
        </button>
      </div>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-4">
        {/* Checkpoint timeline */}
        <div className="md:col-span-6 space-y-3">
          <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block">
            Save-Point History (Commits)
          </label>
          <div className="space-y-2">
            {commits.map((c, i) => {
              const isSelected = c.id === selectedCommitId;
              return (
                <div
                  key={c.id}
                  onClick={() => revertTo(c.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    isSelected
                      ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-200'
                      : 'bg-white/80 border-slate-200 hover:border-amber-300'
                  }`}
                >
                  <div className="mt-0.5">
                    {c.status === 'bad' ? (
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-mono font-medium text-slate-500">
                        #{i + 1} commit: {c.hash}
                      </span>
                      <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                    </div>
                    <p className={`text-xs sm:text-sm font-medium mt-0.5 ${c.status === 'bad' ? 'text-rose-700' : 'text-slate-800'}`}>
                      {c.message}
                    </p>
                    {isSelected && (
                      <span className="inline-block text-[10px] bg-amber-100 text-amber-800 font-semibold px-2 py-0.5 rounded mt-1.5">
                        📍 You are here right now
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-wrap gap-2">
            <button
              onClick={addGoodChange}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" /> Save Good Change
            </button>
            <button
              onClick={addMistake}
              className="bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-medium px-3 py-2 rounded-lg transition-colors flex items-center gap-1.5 border border-rose-300"
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Make a Terrible Mistake!
            </button>
          </div>
        </div>

        {/* Recipe snapshot preview */}
        <div className="md:col-span-6 bg-white p-4 rounded-xl border border-amber-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <History className="w-4 h-4 text-amber-600" /> What the Recipe Looks Like Now
            </span>
            <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
              Git Commit: {currentCommit.hash}
            </span>
          </div>

          <div className="flex-1 bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed">
            {currentCommit.recipeState}
          </div>

          {currentCommit.status === 'bad' ? (
            <div className="mt-3 p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center justify-between">
              <span>😱 The recipe is ruined! Click an earlier checkpoint on the left to undo it with Git!</span>
            </div>
          ) : (
            <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Safe & delicious! Every commit is an indestructible save-point.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
