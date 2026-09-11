#!/usr/bin/env python3
"""
DevOps for Dummies & Slow Learners
Single-page web application with embedded lesson contents and analogies.
Can be executed with standard Python 3.
Works with Flask if installed, or gracefully uses Python's built-in HTTP server.
"""

import os
import sys

# Complete curriculum with ELI5 (Explain Like I'm 5) real-world analogies
# Embedded directly in Python code (no JSON files needed)
LESSONS = [
    {
        "id": "intro",
        "step": "Foundation",
        "title": "Start Here: The Big Picture",
        "emoji": "🍽️",
        "analogy_title": "The Busy Restaurant Dilemma",
        "analogy": "DevOps is like a restaurant where the Cooks (Developers) and Waiters (Operations) work as one united team with automated prep lines, instead of screaming at each other when soup spills.",
        "content": "In traditional tech, programmers wrote code and 'threw it over the wall' to operations to keep running on servers. When things broke, both sides argued. DevOps is the culture, habits, and automated tools that unite software developers and IT operations so software ships quickly, safely, and with fewer bugs.",
        "takeaway": "DevOps = Teamwork + Automation."
    },
    {
        "id": "linux",
        "step": "Step 1",
        "title": "Linux (The Kitchen Floor)",
        "emoji": "🐧",
        "analogy_title": "The Clean Countertop",
        "analogy": "Linux is the floor and countertops of your kitchen. You need to know where cupboards and knives live before you start cooking. Over 95% of servers run on Linux.",
        "content": "Linux is a fast, rock-solid operating system without heavy mouse graphics. You navigate it by typing simple 2-letter commands like 'ls' (look around) and 'cd' (enter a room). Think of it like walking in a dark room using a flashlight.",
        "takeaway": "Don't fear the terminal: 5 simple commands are all you need to start."
    },
    {
        "id": "git",
        "step": "Step 2",
        "title": "Git (The Undo Button)",
        "emoji": "📜",
        "analogy_title": "The Video Game Checkpoint",
        "analogy": "Git is an indestructible save-point in a video game. If you accidentally dump 2 cups of salt into your recipe, you can snap your fingers and travel back in time to the last checkpoint.",
        "content": "Git tracks changes in your code history. You can experiment safely in 'branches' without ever risking the working version, and collaborate with 50 teammates without overwriting each other's work.",
        "takeaway": "Save checkpoints early and often with 'commit'."
    },
    {
        "id": "docker",
        "step": "Step 3",
        "title": "Docker (The Magic Lunchbox)",
        "emoji": "📦",
        "analogy_title": "The Self-Contained Bento Box",
        "analogy": "The 'it works on my machine' excuse ends here! Docker is a magic lunchbox that brings its own fork, napkin, and mini-microwave so the meal tastes identical in any kitchen in the world.",
        "content": "Docker packages your app, its code, its Python version, and its libraries into a lightweight 'Container'. This container runs identically on your laptop, your teammate's laptop, or a cloud server.",
        "takeaway": "Package your app once; run it everywhere without missing dependencies."
    },
    {
        "id": "cicd",
        "step": "Step 4",
        "title": "CI/CD (The Robot Conveyor Belt)",
        "emoji": "🤖",
        "analogy_title": "The Automated Factory Assembly Line",
        "analogy": "In a modern bakery, an automated conveyor belt inspects every muffin, checks for burnt edges, boxes it, and loads it onto the delivery truck without human error.",
        "content": "CI/CD stands for Continuous Integration & Continuous Deployment. It automatically tests your code every time you save, catches bugs before users see them, and deploys updates safely with zero downtime.",
        "takeaway": "Automate repetitive tests so you never do scary manual deployments."
    },
    {
        "id": "k8s",
        "step": "Step 5",
        "title": "Kubernetes (The 500-Stove Manager)",
        "emoji": "☸️",
        "analogy_title": "The Head Chef with 500 Stoves",
        "analogy": "If 1 stove catches fire, the manager throws it out and lights a brand-new clean stove in seconds. If 10,000 customers order pizza, the manager turns on 10 more pizza ovens.",
        "content": "Kubernetes (K8s) is an automated container orchestrator. It manages thousands of Docker containers across multiple servers, auto-healing crashed containers and autoscaling for high traffic.",
        "takeaway": "Declare what you want, and Kubernetes works 24/7 to keep it alive."
    }
]

# Check if Flask is installed
try:
    from flask import Flask, render_template
    HAS_FLASK = True
except ImportError:
    HAS_FLASK = False

if HAS_FLASK:
    # Standard Flask Implementation
    app = Flask(__name__, template_folder=os.path.join(os.path.dirname(__file__), 'templates'))

    @app.route('/')
    def home():
        return render_template('index.html', lessons=LESSONS)

    def run_app():
        port = int(os.environ.get('PORT', 5000))
        print("=" * 60)
        print("🚀 DevOps for Dummies (Flask Mode)")
        print(f"👉 Server running at: http://127.0.0.1:{port}")
        print("=" * 60)
        app.run(host='0.0.0.0', port=port, debug=True)

else:
    # Built-in Python HTTP server fallback (Zero Dependencies Needed!)
    from http.server import HTTPServer, BaseHTTPRequestHandler
    import html

    class DevOpsHandler(BaseHTTPRequestHandler):
        def do_GET(self):
            template_path = os.path.join(os.path.dirname(__file__), 'templates', 'index.html')
            
            # Read template
            try:
                with open(template_path, 'r', encoding='utf-8') as f:
                    template_content = f.read()
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(f"Error loading template: {e}".encode('utf-8'))
                return

            # Simple template rendering without external dependencies
            # Generates the sidebar items and lesson cards
            nav_items = ""
            lesson_cards = ""
            for i, l in enumerate(LESSONS):
                is_first = (i == 0)
                active_class = " active" if is_first else ""
                
                # Navigation item
                nav_items += f'''
                <a class="nav-link{active_class}" onclick="showLesson('{l['id']}', this)">
                    <span>{l['emoji']}</span>
                    <span>{html.escape(l['title'])}</span>
                </a>
                '''

                # Lesson card
                lesson_cards += f'''
                <div id="{l['id']}" class="lesson-section{active_class}">
                    <span class="badge-step">{html.escape(l['step'])}</span>
                    <h1 class="mt-2">{l['emoji']} {html.escape(l['title'])}</h1>
                    <hr>
                    
                    <h5>💡 The Simple Analogy: {html.escape(l['analogy_title'])}</h5>
                    <div class="analogy-box">
                        "{html.escape(l['analogy'])}"
                    </div>

                    <h5>What is it really in plain English?</h5>
                    <p class="lead text-secondary">
                        {html.escape(l['content'])}
                    </p>

                    <div class="takeaway-box">
                        🎯 <strong>Key Rule:</strong> {html.escape(l['takeaway'])}
                    </div>
                    
                    <div class="mt-4">
                        <button class="btn btn-outline-primary" onclick="window.print()">🖨️ Print this lesson</button>
                        <p class="text-muted mt-2"><small>Take your time. Read this three times before moving to the next step.</small></p>
                    </div>
                </div>
                '''

            # Replace Jinja loop placeholders with rendered HTML
            rendered = template_content
            # Replace sidebar block
            import re
            rendered = re.sub(r'\{%\s*for lesson in lessons\s*%\}.*?\{%\s*endfor\s*%\}', nav_items, rendered, flags=re.DOTALL)
            rendered = re.sub(r'\{%\s*for lesson in lessons\s*%\}.*?\{%\s*endfor\s*%\}', lesson_cards, rendered, flags=re.DOTALL)

            self.send_response(200)
            self.send_header('Content-type', 'text/html; charset=utf-8')
            self.end_headers()
            self.wfile.write(rendered.encode('utf-8'))

    def run_app():
        port = int(os.environ.get('PORT', 5000))
        server = HTTPServer(('0.0.0.0', port), DevOpsHandler)
        print("=" * 60)
        print("🚀 DevOps for Dummies (Standalone Python Server)")
        print(f"👉 Server running at: http://127.0.0.1:{port}")
        print("💡 Note: Run 'pip install flask' anytime for native Flask mode!")
        print("=" * 60)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server gracefully.")
            server.server_close()

if __name__ == '__main__':
    run_app()
