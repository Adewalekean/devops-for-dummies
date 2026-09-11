import React, { useState } from 'react';
import { X, Copy, Check, Terminal, FileCode, Download, ExternalLink, Play } from 'lucide-react';

interface FlaskEditionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlaskEditionModal: React.FC<FlaskEditionModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'app_py' | 'template' | 'requirements' | 'guide'>('overview');
  const [copiedFile, setCopiedFile] = useState<string | null>(null);

  if (!isOpen) return null;

  const appPyCode = `"""
DevOps for Dummies (Python & Flask Edition)
Run locally: python app.py
"""

from flask import Flask, render_template

app = Flask(__name__)

LESSONS = [
    {
        "id": "intro",
        "step": "Foundation",
        "title": "Start Here: The Big Picture",
        "emoji": "🍽️",
        "analogy": "DevOps is like a restaurant where the Cooks (Dev) and Waiters (Ops) work as one team using automated prep lines instead of yelling when soup spills.",
        "content": "Before DevOps, coders threw code over a wall to system administrators. When things broke, both sides argued. DevOps unites them with automated tools so software releases are safe, fast, and continuous."
    },
    {
        "id": "linux",
        "step": "Step 1",
        "title": "Linux: The Kitchen Floor",
        "emoji": "🐧",
        "analogy": "Linux is the kitchen floor. You need to know where cupboards and knives live before you cook. 95% of web servers run on Linux.",
        "content": "Linux is a fast, reliable operating system without heavy mouse graphics. You navigate it with simple 2-letter commands like 'ls' (look around) and 'cd' (enter a room)."
    },
    {
        "id": "git",
        "step": "Step 2",
        "title": "Git: The Recipe Undo Button",
        "emoji": "📜",
        "analogy": "Git is an indestructible save-point in a video game. If you add 2 cups of salt by mistake, snap your fingers to revert back to your last save.",
        "content": "Git tracks the entire history of every file. You can branch off to experiment safely without ever risking the working version."
    },
    {
        "id": "docker",
        "step": "Step 3",
        "title": "Docker: The Magic Lunchbox",
        "emoji": "📦",
        "analogy": "The 'works on my machine' excuse is dead! Docker is a magic lunchbox that brings its own fork, napkin, and mini-microwave so food tastes identical anywhere.",
        "content": "Docker packs your code, Python version, and libraries into a lightweight 'Container' that runs identically on Mac, Windows, or Cloud servers."
    },
    {
        "id": "cicd",
        "step": "Step 4",
        "title": "CI/CD: The Robot Conveyor Belt",
        "emoji": "🤖",
        "analogy": "An automated bakery conveyor belt that inspects every muffin for burnt edges, boxes it, and loads the delivery truck automatically.",
        "content": "CI/CD automatically tests your code on every save, catches bugs before users see them, and deploys updates with zero downtime."
    },
    {
        "id": "k8s",
        "step": "Step 5",
        "title": "Kubernetes: The 500-Stove Manager",
        "emoji": "☸️",
        "analogy": "If 1 stove catches fire, the manager throws it out and lights a brand new one in seconds. If 10,000 customers order, it lights 10 more ovens.",
        "content": "Kubernetes automatically manages, auto-heals, and balances thousands of Docker containers across multiple cloud servers."
    }
]

@app.route('/')
def home():
    return render_template('index.html', lessons=LESSONS)

if __name__ == '__main__':
    print("🚀 DevOps for Dummies (Flask Server) is starting!")
    print("👉 Open your browser at http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
`;

  const templateCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevOps for Dummies (Flask Edition)</title>
    <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Lexend', sans-serif; background: #f8fafc; color: #1e293b; margin: 0; display: flex; }
        aside { width: 260px; background: #0f172a; color: white; padding: 1.5rem; min-height: 100vh; }
        .nav-item { padding: 0.75rem 1rem; border-radius: 8px; cursor: pointer; color: #94a3b8; display: flex; gap: 0.5rem; margin-bottom: 0.25rem; }
        .nav-item:hover, .nav-item.active { background: #2563eb; color: white; }
        main { flex: 1; padding: 2.5rem; max-width: 850px; }
        .card { display: none; background: white; padding: 2rem; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
        .card.active { display: block; }
        .analogy { background: #fef3c7; border-left: 5px solid #f59e0b; padding: 1rem 1.25rem; border-radius: 0 8px 8px 0; margin: 1rem 0; }
    </style>
</head>
<body>
    <aside>
        <h3>🚀 DevOps 101</h3>
        {% for lesson in lessons %}
        <div class="nav-item {% if loop.first %}active{% endif %}" onclick="show('{{ lesson.id }}', this)">
            {{ lesson.emoji }} {{ lesson.title }}
        </div>
        {% endfor %}
    </aside>
    <main>
        {% for lesson in lessons %}
        <div id="{{ lesson.id }}" class="card {% if loop.first %}active{% endif %}">
            <span style="font-size: 0.75rem; background: #e0e7ff; color: #3730a3; padding: 3px 8px; border-radius: 99px;">{{ lesson.step }}</span>
            <h1>{{ lesson.emoji }} {{ lesson.title }}</h1>
            <div class="analogy"><strong>💡 Analogy:</strong> {{ lesson.analogy }}</div>
            <p>{{ lesson.content }}</p>
            <button onclick="window.print()" style="padding: 8px 16px; border-radius: 6px; cursor: pointer;">🖨️ Print Lesson</button>
        </div>
        {% endfor %}
    </main>
    <script>
        function show(id, btn) {
            document.querySelectorAll('.nav-item').forEach(e => e.classList.remove('active'));
            btn.classList.add('active');
            document.querySelectorAll('.card').forEach(c => c.classList.remove('active'));
            document.getElementById(id).classList.add('active');
        }
    </script>
</body>
</html>`;

  const reqCode = `flask==3.0.3`;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFile(label);
    setTimeout(() => setCopiedFile(null), 2000);
  };

  const downloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-3 bg-gradient-to-r from-indigo-50 to-purple-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-xs">
              🐍
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  Python & Flask Backend Edition
                </h3>
                <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                  Ready to Run
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600">
                Created directly in your project root (<code className="font-mono text-indigo-700">app.py</code> & <code className="font-mono text-indigo-700">templates/index.html</code>).
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

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 border-b border-slate-200 flex flex-wrap gap-2 bg-slate-50">
          {[
            { id: 'overview', label: '📌 Architecture Overview' },
            { id: 'app_py', label: '🐍 app.py' },
            { id: 'template', label: '📄 templates/index.html' },
            { id: 'requirements', label: '📦 requirements.txt' },
            { id: 'guide', label: '⚡ Run in 3 Steps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`text-xs sm:text-sm px-3.5 py-2 font-medium border-b-2 transition-all ${
                activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-700 bg-white rounded-t-lg'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {activeTab === 'overview' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-indigo-50/80 border border-indigo-200 text-indigo-950 space-y-2">
                <h4 className="font-bold text-base flex items-center gap-2">
                  <span>🎉</span> You asked for a Flask App — here is everything you need!
                </h4>
                <p>
                  We have included both the <strong>Python Flask backend application</strong> (<code className="font-mono bg-white px-1.5 py-0.5 rounded">app.py</code> and <code className="font-mono bg-white px-1.5 py-0.5 rounded">templates/index.html</code>) and this <strong>live interactive web simulator</strong> so you get the best of both worlds!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-mono text-indigo-700 font-bold block mb-1">1. app.py</span>
                  <p className="text-xs text-slate-600">
                    A clean, lightweight Python server that defines all the DevOps lessons and passes them to the Jinja2 template.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-mono text-indigo-700 font-bold block mb-1">2. templates/index.html</span>
                  <p className="text-xs text-slate-600">
                    Single-page layout with a fast JavaScript lesson switcher so you don't have to refresh the browser.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="font-mono text-indigo-700 font-bold block mb-1">3. requirements.txt</span>
                  <p className="text-xs text-slate-600">
                    Only 1 dependency needed: <code className="font-mono">flask==3.0.3</code>. Zero complicated baggage!
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-semibold"># Project Structure:</div>
                <div className="text-slate-300">
                  devops_app/<br />
                  ├── app.py &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Python Flask web server<br />
                  ├── requirements.txt &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Dependency list (flask)<br />
                  └── templates/<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;└── index.html &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# Clean single-page template
                </div>
              </div>
            </div>
          )}

          {activeTab === 'app_py' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">File: app.py (Python 3)</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(appPyCode, 'app_py')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedFile === 'app_py' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedFile === 'app_py' ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                  <button
                    onClick={() => downloadFile('app.py', appPyCode)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download app.py</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-[350px]">
                {appPyCode}
              </pre>
            </div>
          )}

          {activeTab === 'template' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">File: templates/index.html</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(templateCode, 'template')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedFile === 'template' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedFile === 'template' ? 'Copied!' : 'Copy Template'}</span>
                  </button>
                  <button
                    onClick={() => downloadFile('index.html', templateCode)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download index.html</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs overflow-x-auto max-h-[350px]">
                {templateCode}
              </pre>
            </div>
          )}

          {activeTab === 'requirements' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-500">File: requirements.txt</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(reqCode, 'req')}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    {copiedFile === 'req' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedFile === 'req' ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={() => downloadFile('requirements.txt', reqCode)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white flex items-center gap-1.5 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download requirements.txt</span>
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs">
                {reqCode}
              </pre>
            </div>
          )}

          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-base">
                How to Run this Flask App on your own Computer
              </h4>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                    1
                  </span>
                  <div>
                    <strong className="block font-semibold text-slate-900">Install Flask:</strong>
                    <p className="text-xs text-slate-600 mb-1.5">Open your terminal or command prompt and run:</p>
                    <code className="font-mono bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-lg text-xs block">
                      pip install flask
                    </code>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                    2
                  </span>
                  <div>
                    <strong className="block font-semibold text-slate-900">Launch the Server:</strong>
                    <p className="text-xs text-slate-600 mb-1.5">Navigate into the folder with your files and type:</p>
                    <code className="font-mono bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-lg text-xs block">
                      python app.py
                    </code>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs flex-shrink-0">
                    3
                  </span>
                  <div>
                    <strong className="block font-semibold text-slate-900">Open in your Browser:</strong>
                    <p className="text-xs text-slate-600 mb-1.5">Go to your web browser and visit:</p>
                    <code className="font-mono bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-lg text-xs block">
                      http://127.0.0.1:5000
                    </code>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-500">
            All files (<code className="font-mono">app.py</code>, <code className="font-mono">templates/</code>, <code className="font-mono">requirements.txt</code>) are already stored in this project root!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
