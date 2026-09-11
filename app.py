"""
DevOps for Dummies & Slow Learners
A single-page Flask web application using real-world analogies (Kitchen, Lunchbox, Undo-Button)
to make DevOps simple, approachable, and fun.
"""

from flask import Flask, render_template

app = Flask(__name__)

# Complete curriculum with ELI5 (Explain Like I'm 5) real-world analogies
LESSONS = [
    {
        "id": "intro",
        "step": "Foundation",
        "title": "Start Here: What is DevOps?",
        "emoji": "🍽️",
        "analogy_title": "The Busy Restaurant Dilemma",
        "analogy": "DevOps is like a restaurant where the Cooks (Developers) and Waiters (Operations) work as one united team with automated prep lines, instead of yelling at each other when soup spills.",
        "plain_english": "Before DevOps, coders threw software over a wall to system administrators. When things crashed, they argued. DevOps is the teamwork, culture, and automated tools that build and deliver software quickly and reliably.",
        "key_takeaway": "DevOps = Teamwork + Automation."
    },
    {
        "id": "linux",
        "step": "Step 1",
        "title": "Linux: The Kitchen Floor",
        "emoji": "🐧",
        "analogy_title": "The Clean Countertop",
        "analogy": "Linux is the floor and countertops of your kitchen. You need to know where cupboards and knives live before cooking. 95% of servers run on Linux.",
        "plain_english": "Linux is a lightning-fast, rock-solid operating system without heavy mouse graphics. You control it through simple 2-letter commands like 'ls' (look around) and 'cd' (enter a room).",
        "key_takeaway": "Don't fear the black screen; it is just a dark room with a flashlight."
    },
    {
        "id": "git",
        "step": "Step 2",
        "title": "Git: The Recipe Undo Button",
        "emoji": "📜",
        "analogy_title": "The Video Game Checkpoint",
        "analogy": "Git is an indestructible save-point. If you accidentally dump 2 cups of salt into your soup, you can snap your fingers and jump back in time to the last checkpoint.",
        "plain_english": "Git tracks the complete history of every file in your project. You can experiment safely in 'branches' without fear of breaking the working version.",
        "key_takeaway": "Save checkpoints early and often with 'git commit'."
    },
    {
        "id": "docker",
        "step": "Step 3",
        "title": "Docker: The Magic Lunchbox",
        "emoji": "📦",
        "analogy_title": "The Self-Contained Bento Box",
        "analogy": "The 'works on my machine' excuse ends here! Docker is a magic lunchbox that brings its own fork, napkin, and mini-microwave so the meal tastes identical in any kitchen in the world.",
        "plain_english": "Docker bundles your code, Python version, and libraries into a lightweight 'Container' that runs identically on Mac, Windows, or Cloud servers.",
        "key_takeaway": "Package your app once, run it everywhere without missing dependencies."
    },
    {
        "id": "cicd",
        "step": "Step 4",
        "title": "CI/CD: The Robot Conveyor Belt",
        "emoji": "🤖",
        "analogy_title": "The Automated Factory Assembly Line",
        "analogy": "In a bakery, an automated belt inspects every muffin, checks for burnt edges, boxes it, and loads it onto a delivery truck without human error.",
        "plain_english": "CI/CD automatically tests your code every time you save, catches typos before customers see them, and deploys updates with zero downtime.",
        "key_takeaway": "Automate the repetitive tests so you can sleep peacefully at night."
    },
    {
        "id": "k8s",
        "step": "Step 5",
        "title": "Kubernetes: The 500-Stove Manager",
        "emoji": "☸️",
        "analogy_title": "The Super Kitchen Manager",
        "analogy": "If 1 stove catches fire, the manager throws it out and lights a brand new one in seconds. If 10,000 customers order pizza, the manager turns on 10 more pizza ovens.",
        "plain_english": "Kubernetes automatically monitors, balances, and auto-heals thousands of Docker containers across multiple cloud servers.",
        "key_takeaway": "Declare what you want (e.g. '3 copies of my app') and Kubernetes enforces it 24/7."
    }
]

@app.route('/')
def home():
    """Render the single-page DevOps learning experience."""
    return render_template('index.html', lessons=LESSONS)

if __name__ == '__main__':
    # Runs locally on http://127.0.0.1:5000
    print("🚀 DevOps for Dummies (Flask Server) is starting!")
    print("👉 Open your browser at http://127.0.0.1:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)
