import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-intro',
    lessonId: 'intro',
    question: 'In the Restaurant analogy, what best describes the goal of DevOps?',
    analogyHint: 'Think about the Cooks and the Waiters.',
    options: [
      {
        text: 'The Cooks and Waiters team up with automated prep lines to serve hot food fast.',
        isCorrect: true,
        explanation: 'Spot on! DevOps is all about Developers ("cooks") and Operations ("waiters") collaborating smoothly using automation.',
      },
      {
        text: 'The Chef throws cold food over a brick wall and refuses to talk to anyone.',
        isCorrect: false,
        explanation: 'That was the bad old way before DevOps existed!',
      },
      {
        text: 'Firing the waiters and making customers wash their own dishes in the sink.',
        isCorrect: false,
        explanation: 'Haha, nope! DevOps doesn\'t eliminate operations; it unites operations with development.',
      },
    ],
  },
  {
    id: 'q-linux',
    lessonId: 'linux',
    question: 'Why do almost all web servers run on Linux instead of a flashy desktop?',
    analogyHint: 'Think about a professional kitchen countertop.',
    options: [
      {
        text: 'Linux is fast, free, rock-solid, and doesn\'t waste memory on fancy mouse animations.',
        isCorrect: true,
        explanation: 'Exactly right! Servers don\'t need 3D games or wallpapers; they need pure stability and efficiency.',
      },
      {
        text: 'Because only penguins are allowed inside data centers.',
        isCorrect: false,
        explanation: 'Tux the penguin is just the mascot, though penguins are very cool!',
      },
      {
        text: 'Because typing is 100 times harder than clicking, and engineers love torture.',
        isCorrect: false,
        explanation: 'Actually, once you learn 4 or 5 commands, typing is much faster and can be automated with scripts!',
      },
    ],
  },
  {
    id: 'q-git',
    lessonId: 'git',
    question: 'What is a Git "Commit" like in everyday life?',
    analogyHint: 'Remember the video game checkpoint.',
    options: [
      {
        text: 'A permanent save-point you can always travel back to if something breaks.',
        isCorrect: true,
        explanation: 'Yes! A commit is your safety net. You can experiment with zero fear because you can always revert.',
      },
      {
        text: 'Throwing your laptop in a dumpster because your code had a red error.',
        isCorrect: false,
        explanation: 'No need for dumpster fires! Git lets you undo any mistake with a simple command.',
      },
      {
        text: 'A secret password required to turn on your monitor.',
        isCorrect: false,
        explanation: 'Nope, a commit is simply a recorded snapshot of your project at that moment.',
      },
    ],
  },
  {
    id: 'q-docker',
    lessonId: 'docker',
    question: 'Why is Docker called a "Magic Lunchbox"?',
    analogyHint: 'Think about bringing a meal to a friend\'s house.',
    options: [
      {
        text: 'It packages your app, its code, and its tools so it runs identically on any computer.',
        isCorrect: true,
        explanation: 'Bingo! No more "it works on my machine!" excuses. The container brings its own environment everywhere.',
      },
      {
        text: 'It keeps your actual physical sandwich warm while you write code.',
        isCorrect: false,
        explanation: 'We wish! But digital containers are almost as satisfying.',
      },
      {
        text: 'It deletes all your files to save disk space on your hard drive.',
        isCorrect: false,
        explanation: 'Quite the opposite! It isolates your application safely.',
      },
    ],
  },
  {
    id: 'q-cicd',
    lessonId: 'cicd',
    question: 'What does the automated CI/CD conveyor belt do when someone pushes broken code?',
    analogyHint: 'Think of the factory inspection sensor.',
    options: [
      {
        text: 'It catches the failed test, sounds an alert, and halts before broken code touches production.',
        isCorrect: true,
        explanation: 'Perfect! Automated tests prevent bad updates from ever reaching real users.',
      },
      {
        text: 'It ignores the error and immediately deploys the broken code to 10 million users.',
        isCorrect: false,
        explanation: 'That would be a disaster! CI/CD protects us from that nightmare.',
      },
      {
        text: 'It calls your boss and plays sad trombone music.',
        isCorrect: false,
        explanation: 'Funny, but no! It just logs a clear red error message showing which line failed.',
      },
    ],
  },
  {
    id: 'q-k8s',
    lessonId: 'k8s',
    question: 'If one of your application containers suddenly crashes, what does Kubernetes do?',
    analogyHint: 'Think of the head chef who spots a broken stove.',
    options: [
      {
        text: 'It automatically detects the crash and immediately spawns a fresh new healthy container.',
        isCorrect: true,
        explanation: 'Self-healing at its finest! Kubernetes works 24/7 so users never notice a server hiccup.',
      },
      {
        text: 'It shuts down the entire company and sends everyone home.',
        isCorrect: false,
        explanation: 'Never! Kubernetes is built specifically to prevent shutdowns.',
      },
      {
        text: 'It writes a sad poem about the crashed container.',
        isCorrect: false,
        explanation: 'Poetic, but Kubernetes is a practical manager that fixes things immediately.',
      },
    ],
  },
];
