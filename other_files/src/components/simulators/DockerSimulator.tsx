import React, { useState } from 'react';
import { Package, Laptop, Server, CheckCircle2, XCircle, Play, Sparkles, RefreshCw } from 'lucide-react';

export const DockerSimulator: React.FC = () => {
  const [isPacked, setIsPacked] = useState<boolean>(false);
  const [hasRuntime, setHasRuntime] = useState<boolean>(true);
  const [hasDependencies, setHasDependencies] = useState<boolean>(true);
  const [testedMachines, setTestedMachines] = useState<Record<string, 'success' | 'failed' | 'idle'>>({
    mac: 'idle',
    windows: 'idle',
    ubuntu: 'idle',
    cloud: 'idle',
  });

  const machines = [
    { id: 'mac', name: 'Alex\'s MacBook (macOS)', icon: '🍎', desc: 'No Python installed!' },
    { id: 'windows', name: 'Sarah\'s Windows 11 PC', icon: '🪟', desc: 'Runs Python 2.7 (Old!)' },
    { id: 'ubuntu', name: 'Company Linux Server', icon: '🐧', desc: 'Strict security settings' },
    { id: 'cloud', name: 'Amazon AWS Cloud', icon: '☁️', desc: 'Remote data center' },
  ];

  const handlePack = () => {
    setIsPacked(true);
    setTestedMachines({ mac: 'idle', windows: 'idle', ubuntu: 'idle', cloud: 'idle' });
  };

  const handleTestAll = () => {
    if (!isPacked) return;
    setTestedMachines({
      mac: 'success',
      windows: 'success',
      ubuntu: 'success',
      cloud: 'success',
    });
  };

  const handleTestWithoutDocker = () => {
    setIsPacked(false);
    setTestedMachines({
      mac: 'failed', // No python
      windows: 'failed', // Wrong version
      ubuntu: 'success', // Might happen to have it
      cloud: 'failed', // Missing packages
    });
  };

  const reset = () => {
    setIsPacked(false);
    setTestedMachines({ mac: 'idle', windows: 'idle', ubuntu: 'idle', cloud: 'idle' });
  };

  return (
    <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-4 sm:p-6 my-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-sky-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
              The Magic Lunchbox (Docker) Simulator
            </h4>
            <p className="text-xs text-slate-600">
              See why packing an app in a container ends the "It works on my computer!" nightmare.
            </p>
          </div>
        </div>
        <button
          onClick={reset}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-sky-200 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Reset Demo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4">
        {/* Step 1: Pack the Lunchbox */}
        <div className="lg:col-span-5 bg-white p-4 rounded-xl border border-sky-200 shadow-sm space-y-3">
          <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider block">
            1. Prepare the Magic Lunchbox
          </span>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-medium text-slate-700">📄 Application Code: <code className="text-sky-700 font-mono">app.py</code></span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">Included</span>
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-700">📦 Dependencies (Flask + Libraries)</span>
                <p className="text-[11px] text-slate-500">The ingredients and secret spices</p>
              </div>
              <input
                type="checkbox"
                checked={hasDependencies}
                onChange={(e) => setHasDependencies(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded"
              />
            </div>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-medium text-slate-700">🐍 Exact Runtime (Python 3.10)</span>
                <p className="text-[11px] text-slate-500">The mini-microwave that cooks it</p>
              </div>
              <input
                type="checkbox"
                checked={hasRuntime}
                onChange={(e) => setHasRuntime(e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded"
              />
            </div>
          </div>

          <div className="pt-2 space-y-2">
            <button
              onClick={handlePack}
              className={`w-full text-xs font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-sm ${
                isPacked
                  ? 'bg-emerald-600 text-white'
                  : 'bg-sky-600 hover:bg-sky-700 text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              {isPacked ? '✓ Sealed Container Ready!' : 'Pack Into Docker Lunchbox (Build Image)'}
            </button>

            <button
              onClick={handleTestWithoutDocker}
              className="w-full text-xs text-slate-600 hover:text-slate-800 py-1.5 px-3 rounded-lg border border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 transition-colors"
            >
              Try sending raw code WITHOUT Docker (The Old Way)
            </button>
          </div>
        </div>

        {/* Step 2: Test on 4 different computers */}
        <div className="lg:col-span-7 bg-white p-4 rounded-xl border border-sky-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="text-xs font-semibold text-sky-800 uppercase tracking-wider">
                2. Test Running It On Different Computers
              </span>
              {isPacked && (
                <button
                  onClick={handleTestAll}
                  className="text-xs bg-sky-100 hover:bg-sky-200 text-sky-800 font-medium px-2.5 py-1 rounded-md transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" /> Run on All Computers
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {machines.map((m) => {
                const status = testedMachines[m.id];
                return (
                  <div
                    key={m.id}
                    className={`p-3 rounded-xl border transition-all text-xs ${
                      status === 'success'
                        ? 'bg-emerald-50/80 border-emerald-300'
                        : status === 'failed'
                        ? 'bg-rose-50/80 border-rose-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-base">{m.icon}</span>
                      {status === 'success' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                          <CheckCircle2 className="w-3 h-3" /> Works 100%!
                        </span>
                      )}
                      {status === 'failed' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                          <XCircle className="w-3 h-3" /> Crashed!
                        </span>
                      )}
                      {status === 'idle' && (
                        <span className="text-[10px] text-slate-400">Waiting to test...</span>
                      )}
                    </div>
                    <p className="font-semibold text-slate-800 mt-1">{m.name}</p>
                    <p className="text-[11px] text-slate-500">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs">
            {isPacked ? (
              <span className="text-emerald-400">
                🐳 Docker container brings its own Python 3.10 & dependencies. It will run flawlessly on any OS!
              </span>
            ) : (
              <span className="text-amber-300">
                ⚠️ Without Docker: The MacBook has no Python, Windows has the wrong version, and the server crashes. "It works on my machine" strikes again!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
