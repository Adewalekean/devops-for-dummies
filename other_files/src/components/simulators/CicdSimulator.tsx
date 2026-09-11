import React, { useState } from 'react';
import { Bot, CheckCircle2, XCircle, ArrowRight, Play, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

type StepStatus = 'idle' | 'running' | 'passed' | 'failed';

export const CicdSimulator: React.FC = () => {
  const [hasError, setHasError] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [statuses, setStatuses] = useState<StepStatus[]>(['idle', 'idle', 'idle', 'idle']);

  const steps = [
    { title: '1. Git Push', desc: 'Code leaves developer\'s computer' },
    { title: '2. Linter Bot', desc: 'Checks for syntax & typos' },
    { title: '3. Automated Tests', desc: 'Runs 42 safety checks' },
    { title: '4. Live Deployment', desc: 'Delivers to real customers' },
  ];

  const startPipeline = () => {
    setIsRunning(true);
    setCurrentStep(1);
    setStatuses(['passed', 'running', 'idle', 'idle']);
    setLogs(['[00:01] 🚀 Git commit detected: push branch main']);

    // Step 2: Linter
    setTimeout(() => {
      if (hasError) {
        setStatuses(['passed', 'failed', 'idle', 'idle']);
        setIsRunning(false);
        setLogs(prev => [
          ...prev,
          '[00:03] 🤖 Linter Robot: SYNTAX ERROR on line 14: "def helo_world(" (missing closing parenthesis).',
          '[00:04] 🛑 PIPELINE HALTED! Broken code blocked before touching live servers.'
        ]);
        return;
      }

      setStatuses(['passed', 'passed', 'running', 'idle']);
      setCurrentStep(2);
      setLogs(prev => [...prev, '[00:02] ✓ Linter Robot: Code syntax and formatting is pristine!']);

      // Step 3: Tests
      setTimeout(() => {
        setStatuses(['passed', 'passed', 'passed', 'running']);
        setCurrentStep(3);
        setLogs(prev => [...prev, '[00:04] ✓ Test Runner: 42/42 automated tests passed (0 failures).']);

        // Step 4: Deploy
        setTimeout(() => {
          setStatuses(['passed', 'passed', 'passed', 'passed']);
          setIsRunning(false);
          setLogs(prev => [
            ...prev,
            '[00:06] 🎉 DEPLOY SUCCESSFUL! New version live with 0 downtime for users.'
          ]);
        }, 1200);
      }, 1200);
    }, 1200);
  };

  const reset = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setStatuses(['idle', 'idle', 'idle', 'idle']);
    setLogs([]);
  };

  return (
    <div className="bg-indigo-50/70 border border-indigo-200/80 rounded-2xl p-4 sm:p-6 my-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-indigo-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
              The Robot Conveyor Belt (CI/CD) Simulator
            </h4>
            <p className="text-xs text-slate-600">
              Watch automated robots test and release software safely.
            </p>
          </div>
        </div>
        <button
          onClick={reset}
          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white px-2.5 py-1.5 rounded-lg border border-indigo-200 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset Belt
        </button>
      </div>

      {/* Code Toggle */}
      <div className="bg-white p-3.5 rounded-xl border border-indigo-200 shadow-sm mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-700">Choose Code Quality:</span>
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => { setHasError(false); reset(); }}
              className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                !hasError
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ✓ Clean Code
            </button>
            <button
              onClick={() => { setHasError(true); reset(); }}
              className={`text-xs px-3 py-1 rounded-md font-medium transition-all ${
                hasError
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              ⚠️ Code with a Typo
            </button>
          </div>
        </div>

        <button
          onClick={startPipeline}
          disabled={isRunning}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-lg flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {isRunning ? 'Conveyor Belt Running...' : 'Trigger Conveyor Belt (Push Code)'}
        </button>
      </div>

      {/* Conveyor Belt Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        {steps.map((s, idx) => {
          const st = statuses[idx];
          return (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border transition-all text-xs relative ${
                st === 'passed'
                  ? 'bg-emerald-50 border-emerald-300 shadow-sm'
                  : st === 'failed'
                  ? 'bg-rose-50 border-rose-300 shadow-sm'
                  : st === 'running'
                  ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200 animate-pulse'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-slate-800">{s.title}</span>
                {st === 'passed' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                {st === 'failed' && <XCircle className="w-4 h-4 text-rose-600" />}
                {st === 'running' && <span className="text-[10px] font-bold text-amber-700 animate-bounce">Testing...</span>}
              </div>
              <p className="text-[11px] text-slate-500">{s.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Console output */}
      <div className="mt-4 bg-slate-900 text-slate-200 font-mono text-xs p-3.5 rounded-xl min-h-[90px] max-h-[140px] overflow-y-auto space-y-1">
        {logs.length === 0 ? (
          <p className="text-slate-500 italic">
            Click "Trigger Conveyor Belt" above to watch the automation run in real-time...
          </p>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={log.includes('HALTED') || log.includes('ERROR') ? 'text-rose-300 font-semibold' : 'text-slate-200'}
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
