// ============= Training Platform Type Definitions =============

// Difficulty levels
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

// Training category
export type TrainingCategory = 'csr' | 'sdr' | 'both';

// Scenario types
export type ScenarioType =
  // CSR Scenarios
  | 'complaint-resolution'
  | 'technical-support'
  | 'billing-inquiry'
  | 'escalation-handling'
  | 'churn-prevention'
  | 'upsell-cross-sell'
  // SDR Scenarios
  | 'cold-call'
  | 'discovery-call'
  | 'objection-handling'
  | 'gatekeeper-navigation'
  | 'demo-scheduling'
  | 'follow-up-call'
  | 'pricing-discussion';

// Session mode
export type SessionMode = 'video' | 'audio' | 'chat';

// Session status
export type SessionStatus = 'in-progress' | 'completed' | 'abandoned';

// Personality configuration
export interface PersonalityConfig {
  temperament: 'friendly' | 'neutral' | 'difficult' | 'hostile';
  patience: number; // 1-10
  technicalLevel: number; // 1-10
  decisionAuthority: 'none' | 'influencer' | 'decision-maker' | 'budget-holder';
  objectionStyle: 'direct' | 'passive' | 'analytical' | 'emotional';
}

// Customer Persona (AI characters trainees practice with)
export interface CustomerPersona {
  id: string;
  name: string;
  role: string;
  company?: string;
  avatarUrl: string;
  difficulty: DifficultyLevel;
  category: TrainingCategory;
  personality: PersonalityConfig;
  agentId?: string;
  voiceId?: string;
  systemPrompt?: string;
  skills: string[];
  commonObjections: string[];
  backgroundStory: string;
  createdAt: string;
  updatedAt: string;
}

// Scenario briefing
export interface ScenarioBriefing {
  situation: string;
  customerBackground: string;
  objectives: string[];
  keyPhrases: string[];
  avoidPhrases: string[];
}

// Scoring rubric category
export interface RubricCategory {
  name: string;
  weight: number;
  criteria: {
    description: string;
    maxPoints: number;
    keywords?: string[];
  }[];
}

// Scoring rubric
export interface ScoringRubric {
  categories: RubricCategory[];
  passingScore: number;
  expertScore: number;
}

// Training Scenario
export interface TrainingScenario {
  id: string;
  title: string;
  description: string;
  category: TrainingCategory;
  type: ScenarioType;
  difficulty: DifficultyLevel;
  estimatedDuration: number;
  briefing: ScenarioBriefing;
  compatiblePersonaIds: string[];
  rubric: ScoringRubric;
  skills: string[];
  learningObjectives: string[];
  imageUrl?: string;
  gradient?: string;
  createdAt: string;
  updatedAt: string;
}

// Transcript entry
export interface TranscriptEntry {
  id: string;
  speaker: 'agent' | 'user';
  text: string;
  timestamp: string;
}

// Session score category
export interface ScoreCategory {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
}

// Session score
export interface SessionScore {
  overall: number;
  categories: ScoreCategory[];
  passed: boolean;
  badges?: string[];
}

// Transcript highlight
export interface TranscriptHighlight {
  timestamp: string;
  text: string;
  type: 'excellent' | 'needs-improvement' | 'critical-miss';
  note: string;
}

// AI-generated feedback
export interface AIFeedback {
  summary: string;
  strengths: string[];
  improvements: string[];
  coachingTips: string[];
  suggestedScenarioIds: string[];
  transcriptHighlights: TranscriptHighlight[];
}

// Training Session
export interface TrainingSession {
  id: string;
  userId: string;
  personaId: string;
  scenarioId: string;
  mode: SessionMode;
  startedAt: string;
  endedAt?: string;
  duration: number;
  transcript: TranscriptEntry[];
  score?: SessionScore;
  feedback?: AIFeedback;
  recordingUrl?: string;
  status: SessionStatus;
}

// Skill proficiency
export interface SkillProficiency {
  skillId: string;
  name: string;
  proficiency: number;
  sessionsCompleted: number;
}

// Certification
export interface Certification {
  id: string;
  name: string;
  earnedAt: string;
  expiresAt?: string;
}

// Learning path progress
export interface LearningPathProgress {
  pathId: string;
  pathName: string;
  progress: number;
  currentModule: string;
  totalModules: number;
  completedModules: number;
}

// Trainee progress
export interface TraineeProgress {
  userId: string;
  totalSessions: number;
  totalHours: number;
  averageScore: number;
  skills: SkillProficiency[];
  certifications: Certification[];
  currentPath?: LearningPathProgress;
  currentStreak: number;
  longestStreak: number;
  lastSessionAt?: string;
}

// Learning Path
export interface LearningPath {
  id: string;
  name: string;
  description: string;
  category: TrainingCategory;
  moduleIds: string[];
  estimatedHours: number;
  createdAt: string;
  updatedAt: string;
}

// Training Module
export interface TrainingModule {
  id: string;
  name: string;
  description: string;
  avatarUrl?: string;
  lessonsCount: number;
  scenarioIds: string[];
  skills: string[];
  estimatedMinutes: number;
  createdAt: string;
  updatedAt: string;
}

// Skill Definition
export interface SkillDefinition {
  id: string;
  name: string;
  description: string;
  category: TrainingCategory;
  icon?: string;
}

// Recent session for dashboard
export interface RecentSession {
  id: string;
  scenarioTitle: string;
  personaName: string;
  score: number;
  completedAt: string;
  duration: number;
}

// Daily/Weekly stats
export interface TrainingStats {
  todaySessions: number;
  todayGoal: number;
  weekSessions: number;
  weekAverageScore: number;
  totalSessions: number;
  totalHours: number;
}

// Recommended scenario for dashboard
export interface RecommendedScenario {
  id: string;
  title: string;
  personaName: string;
  difficulty: DifficultyLevel;
  reason: string;
  estimatedTime: number;
  type: ScenarioType;
}
