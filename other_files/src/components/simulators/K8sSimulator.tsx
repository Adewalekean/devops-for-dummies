import React, { useState, useEffect } from 'react';
import { Flame, ShieldAlert, RefreshCw, Plus, Minus, CheckCircle2, AlertOctagon, HeartHandshake } from 'lucide-react';

interface StovePod {
  id: string;
  name: string;
  isBurnt: boolean;
  cookingOrders: number;
  uptimeSeconds: number;
}

export const K8sSimulator: React.FC = () => {
  const [targetReplicas, setTargetReplicas] = useState<number>(3);
  const [stoves, setStoves] = useState<StovePod[]>([
    { id: 'stove-1', name: 'Stove-Pod #1', isBurnt: false, cookingOrders: 20, uptimeSeconds: 120 },
    { id: 'stove-2', name: 'Stove-Pod #2', isBurnt: false, cookingOrders: 25, uptimeSeconds: 95 },
    { id: 'stove-3', name: 'Stove-Pod #3', isBurnt: false, cookingOrders: 18, uptimeSeconds: 40 },
  ]);
  const [autoHealMessage, setAutoHealMessage] = useState<string>('Kubernetes is actively watching: 3 of 3 stoves healthy.');

  // Self-healing check
  const crashStove = (stoveId: string) => {
    setStoves(prev =>
      prev.map(s => (s.id === stoveId ? { ...s, isBurnt: true, cookingOrders: 0 } : s))
    );
    setAutoHealMessage(`🚨 Stove ${stoveId} caught fire! Kubernetes detected failed healthcheck...`);

    // K8s auto-heals after 1.5 seconds!
    setTimeout(() => {
      setStoves(prev => {
        const withoutDead = prev.filter(s => s.id !== stoveId);
        const newStove: StovePod = {
          id: 'stove-' + Math.random().toString(36).substring(2, 6),
          name: `Replacement Stove #${withoutDead.length + 1}`,
          isBurnt: false,
          cookingOrders: 20,
          uptimeSeconds: 1,
        };
        return [...withoutDead, newStove];
      });
      setAutoHealMessage('✅ Self-Healing Complete! Dead stove thrown out, brand new clean stove cooking smoothly.');
    }, 1600);
  };

  const scaleUp = () => {
    if (stoves.length >= 6) return;
    const newCount = stoves.length + 1;
    setTargetReplicas(newCount);
    const newStove: StovePod = {
      id: 'stove-' + Math.random().toString(36).substring(2, 6),
      name: `Stove-Pod #${newCount}`,
      isBurnt: false,
      cookingOrders: 15,
      uptimeSeconds: 5,
    };
    setStoves(prev => [...prev, newStove]);
    setAutoHealMessage(`📈 Autoscaled UP: Created Stove-Pod #${newCount} to handle extra customer orders.`);
  };

  const scaleDown = () => {
    if (stoves.length <= 1) return;
    const newCount = stoves.length - 1;
    setTargetReplicas(newCount);
    setStoves(prev => prev.slice(0, -1));
    setAutoHealMessage(`📉 Scaled DOWN: Gracefully retired 1 stove to save cloud electricity costs.`);
  };

  return (
    <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4 sm:p-6 my-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-purple-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm sm:text-base">
              The 500-Stove Kitchen Manager (Kubernetes)
            </h4>
            <p className="text-xs text-slate-600">
              Test auto-healing (when a stove catches fire) and autoscaling (rush hour).
            </p>
          </div>
        </div>

        {/* Scaler controls */}
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-purple-200 shadow-xs">
          <span className="text-xs font-medium text-slate-700">Active Stoves:</span>
          <button
            onClick={scaleDown}
            disabled={stoves.length <= 1}
            className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs disabled:opacity-40"
          >
            <Minus className="w-3 h-3" />
          </button>
          <span className="text-xs font-mono font-bold text-purple-700 px-1">{stoves.length}</span>
          <button
            onClick={scaleUp}
            disabled={stoves.length >= 6}
            className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs disabled:opacity-40"
          >
            <Plus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Stoves Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 mt-4">
        {stoves.map((stove) => (
          <div
            key={stove.id}
            className={`p-4 rounded-xl border transition-all relative ${
              stove.isBurnt
                ? 'bg-rose-100/90 border-rose-400 shadow-md ring-2 ring-rose-300'
                : 'bg-white border-purple-200 shadow-xs hover:border-purple-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                <span className="text-base">{stove.isBurnt ? '🔥' : '🍳'}</span>
                {stove.name}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  stove.isBurnt
                    ? 'bg-rose-200 text-rose-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {stove.isBurnt ? 'BURNING!' : 'HEALTHY'}
              </span>
            </div>

            <div className="mt-2 text-xs text-slate-600 space-y-1">
              <div className="flex justify-between">
                <span>Cooking:</span>
                <span className="font-mono font-medium">{stove.cookingOrders} orders</span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="font-mono">{stove.isBurnt ? 'CRASHED' : 'Running (Pod)'}</span>
              </div>
            </div>

            <button
              onClick={() => crashStove(stove.id)}
              disabled={stove.isBurnt}
              className="w-full mt-3 text-xs bg-rose-50 hover:bg-rose-100 disabled:opacity-50 text-rose-700 font-medium py-1.5 px-3 rounded-lg border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
            >
              <AlertOctagon className="w-3.5 h-3.5" />
              {stove.isBurnt ? 'Healing in progress...' : 'Spill Soup (Crash Stove)'}
            </button>
          </div>
        ))}
      </div>

      {/* K8s Controller Message Bar */}
      <div className="mt-4 p-3 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-purple-400 flex-shrink-0" />
          <span>{autoHealMessage}</span>
        </div>
      </div>
    </div>
  );
};
