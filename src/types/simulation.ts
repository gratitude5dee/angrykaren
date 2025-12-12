// Simulation-specific types for the live call experience

export interface TranscriptEntry {
  id: string;
  speaker: 'customer' | 'csr';
  text: string;
  timestamp: number; // ms since call start
  isFinal: boolean;
}

export interface CallState {
  status: 'idle' | 'connecting' | 'connected' | 'ended' | 'error';
  startTime: number | null;
  duration: number; // seconds
  isMicMuted: boolean;
  agentSpeaking: boolean;
  userSpeaking: boolean;
  errorMessage?: string;
}

export interface ScoringCategory {
  score: number; // 1-5
  feedback: string;
}

export interface ScoringResult {
  scenarioId: string;
  personaId: string;
  timestamp: string;
  duration: number;
  categories: {
    empathy: ScoringCategory;
    problemSolving: ScoringCategory;
    patience: ScoringCategory;
    communication: ScoringCategory;
    resolution: ScoringCategory;
    overall: ScoringCategory;
  };
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  recommendation: 'excellent' | 'good' | 'needs-improvement' | 'requires-training';
  summary: string;
  keyStrengths: string[];
  areasForImprovement: string[];
  transcript: TranscriptEntry[];
}

export interface SimulationSession {
  id: string;
  scenarioId: string;
  personaId: string;
  personaName: string;
  scenarioTitle: string;
  difficulty: string;
  anamSessionToken?: string;
}
