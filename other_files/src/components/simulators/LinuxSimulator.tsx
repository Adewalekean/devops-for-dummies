import React, { useState } from 'react';
import { Terminal, Folder, FileText, CheckCircle2, RotateCcw, Play } from 'lucide-react';

interface FileNode {
  name: string;
  type: 'dir' | 'file';
  content?: string;
  children?: FileNode[];
}

const INITIAL_FS: FileNode[] = [
  {
    name: 'kitchen',
    type: 'dir',
    children: [
      { name: 'recipe.txt', type: 'file', content: 'Secret Recipe:\n1. 2 cups flour\n2. 1 cup milk\n3. Bake at 350°F' },
      { name: 'spices.txt', type: 'file', content: 'Pantry Spices:\n- Cinnamon\n- Paprika\n- Basil' },
      {
        name: 'cupboard',
        type: 'dir',
        children: [
          { name: 'plates.txt', type: 'file', content: '12 clean porcelain plates ready for dinner.' }
        ]
      }
    ]
  },
  { name: 'notes.txt', type: 'file', content: 'Welcome to your first server! You are safe here; you cannot break anything.' }
];

export const LinuxSimulator: React.FC = () => {
  const [currentPath, setCurrentPath] = useState<string>('/home/chef');
  const [history, setHistory] = useState<Array<{ command: string; output: string; isError?: boolean }>>([
    {
      command: 'echo "Welcome to the Kitchen Floor Terminal!"',
      output: 'Welcome to the Kitchen Floor Terminal!\nTip: Type "help" or click any shortcut button below to run commands without typing.'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [currentDirName, setCurrentDirName] = useState('home');

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const arg = parts[1];

    let output = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        output = `Safe Practice Commands:\n  ls            - List files in the current folder (look around)\n  pwd           - Print working directory (where am I?)\n  cd <folder>   - Change folder (e.g. "cd kitchen" or "cd ..")\n  cat <file>    - Read file contents (e.g. "cat notes.txt")\n  mkdir <name>  - Create a new folder\n  clear         - Clear the screen`;
        break;
      case 'pwd':
        output = currentPath;
        break;
      case 'ls':
        if (currentDirName === 'home') {
          output = '📁 kitchen/   📄 notes.txt';
        } else if (currentDirName === 'kitchen') {
          output = '📁 cupboard/   📄 recipe.txt   📄 spices.txt';
        } else if (currentDirName === 'cupboard') {
          output = '📄 plates.txt';
        } else {
          output = '📁 (empty folder)';
        }
        break;
      case 'cd':
        if (!arg || arg === '~' || arg === '/') {
          setCurrentPath('/home/chef');
          setCurrentDirName('home');
          output = 'Moved back to home kitchen floor (/home/chef)';
        } else if (arg === '..') {
          if (currentDirName === 'cupboard') {
            setCurrentPath('/home/chef/kitchen');
            setCurrentDirName('kitchen');
            output = 'Moved up one level to /home/chef/kitchen';
          } else if (currentDirName === 'kitchen') {
            setCurrentPath('/home/chef');
            setCurrentDirName('home');
            output = 'Moved up to /home/chef';
          } else {
            output = 'Already at root home folder';
          }
        } else if (arg === 'kitchen' && currentDirName === 'home') {
          setCurrentPath('/home/chef/kitchen');
          setCurrentDirName('kitchen');
          output = 'Entered 📁 kitchen folder';
        } else if (arg === 'cupboard' && currentDirName === 'kitchen') {
          setCurrentPath('/home/chef/kitchen/cupboard');
          setCurrentDirName('cupboard');
          output = 'Entered 📁 cupboard folder';
        } else {
          output = `bash: cd: ${arg}: No such file or directory. Try typing "ls" to see where you can go!`;
          isError = true;
        }
        break;
      case 'cat':
        if (!arg) {
          output = 'Usage: cat <filename>. For example: cat notes.txt';
          isError = true;
        } else if (arg === 'notes.txt' && currentDirName === 'home') {
          output = 'Welcome to your first server! You are safe here; you cannot break anything.';
        } else if (arg === 'recipe.txt' && currentDirName === 'kitchen') {
          output = 'Secret Recipe:\n1. 2 cups flour\n2. 1 cup milk\n3. Bake at 350°F for 20 minutes.';
        } else if (arg === 'spices.txt' && currentDirName === 'kitchen') {
          output = 'Pantry Spices:\n- Cinnamon\n- Paprika\n- Fresh Basil';
        } else if (arg === 'plates.txt' && currentDirName === 'cupboard') {
          output = '12 clean porcelain plates ready for dinner service!';
        } else {
          output = `cat: ${arg}: No such file. Tip: type "ls" to see available files.`;
          isError = true;
        }
        break;
      case 'mkdir':
        if (!arg) {
          output = 'Usage: mkdir <foldername>. For example: mkdir desserts';
          isError = true;
        } else {
          output = `Success! Created new folder: 📁 ${arg}`;
        }
        break;
      case 'clear':
        setHistory([]);
        setInputVal('');
        return;
      default:
        output = `Command not recognized: "${cmd}". Type "help" or click one of the friendly buttons below!`;
        isError = true;
    }

    setHistory(prev => [...prev, { command: trimmed, output, isError }]);
    setInputVal('');
  };

  const quickButtons = [
    { label: 'Look around (ls)', cmd: 'ls' },
    { label: 'Where am I? (pwd)', cmd: 'pwd' },
    { label: 'Enter Kitchen (cd kitchen)', cmd: 'cd kitchen' },
    { label: 'Read Recipe (cat recipe.txt)', cmd: currentDirName === 'kitchen' ? 'cat recipe.txt' : 'cat notes.txt' },
    { label: 'Go Back (cd ..)', cmd: 'cd ..' },
  ];

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 sm:p-6 shadow-xl border border-slate-800 my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
          </div>
          <span className="text-xs sm:text-sm font-mono text-slate-400 font-medium ml-2">
            chef@kitchen-server:{currentPath}$
          </span>
        </div>
        <button
          onClick={() => {
            setHistory([{ command: 'clear', output: 'Terminal reset to start.' }]);
            setCurrentPath('/home/chef');
            setCurrentDirName('home');
          }}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors px-2 py-1 rounded bg-slate-800/60"
        >
          <RotateCcw className="w-3 h-3" /> Reset Terminal
        </button>
      </div>

      {/* Terminal log output */}
      <div className="font-mono text-xs sm:text-sm py-4 space-y-3 min-h-[160px] max-h-[260px] overflow-y-auto pr-2">
        {history.map((entry, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="text-slate-500">$</span>
              <span className="font-semibold">{entry.command}</span>
            </div>
            <div className={`whitespace-pre-wrap pl-4 ${entry.isError ? 'text-rose-300' : 'text-slate-200'}`}>
              {entry.output}
            </div>
          </div>
        ))}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          executeCommand(inputVal);
        }}
        className="flex items-center gap-2 pt-3 border-t border-slate-800"
      >
        <span className="text-emerald-400 font-mono text-sm">$</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Type a command (e.g. ls, pwd, cd kitchen) or click below..."
          className="flex-1 bg-slate-800/80 text-white font-mono text-xs sm:text-sm px-3 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-emerald-500"
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5"
        >
          <Play className="w-3.5 h-3.5 fill-current" /> Run
        </button>
      </form>

      {/* Slow Learner Clickable Shortcuts */}
      <div className="mt-4 pt-3 border-t border-slate-800/60">
        <p className="text-xs text-slate-400 mb-2 font-medium">
          💡 Click to test without typing:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickButtons.map((btn, i) => (
            <button
              key={i}
              onClick={() => executeCommand(btn.cmd)}
              className="text-xs font-mono bg-slate-800 hover:bg-slate-700 text-amber-200 hover:text-white px-3 py-1.5 rounded-md transition-colors border border-slate-700/50"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
