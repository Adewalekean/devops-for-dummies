export type LessonId = 
  | 'intro'
  | 'linux'
  | 'git'
  | 'docker'
  | 'cicd'
  | 'k8s'
  | 'cloud'
  | 'monitoring';

export interface Lesson {
  id: LessonId;
  stepNumber: number;
  title: string;
  subtitle: string;
  emoji: string;
  badge: string;
  estimatedMinutes: number;
  analogy: {
    title: string;
    description: string;
    visualLabel: string;
    realWorldRole: string;
  };
  plainEnglishExplanation: string;
  whyItMatters: string;
  fearBuster: string; // "Why you shouldn't be scared"
  keyConcepts: {
    term: string;
    simpleDefinition: string;
    example?: string;
  }[];
  interactiveType?: 'terminal' | 'git' | 'docker' | 'cicd' | 'k8s';
  recommendedPractice: {
    name: string;
    description: string;
    url: string;
    isFree: boolean;
    noInstallNeeded: boolean;
  };
  summaryTakeaway: string;
}

export interface JargonTerm {
  id: string;
  term: string;
  pronunciation?: string;
  category: 'Basics' | 'Containers' | 'Automation' | 'Cloud' | 'Kubernetes';
  scaryDefinition: string;
  dummyDefinition: string;
  metaphor: string;
}

export interface QuizQuestion {
  id: string;
  lessonId: LessonId;
  question: string;
  analogyHint: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}
