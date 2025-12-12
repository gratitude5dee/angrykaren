import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import CharacterCard from '@/components/CharacterCard';
import SceneCard from '@/components/SceneCard';
import LearningPathCard from '@/components/dashboard/LearningPathCard';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentSessionsList from '@/components/dashboard/RecentSessionsList';
import RecommendedPractice from '@/components/dashboard/RecommendedPractice';
import type { 
  LearningPathProgress, 
  TrainingStats, 
  RecentSession, 
  RecommendedScenario 
} from '@/types/training';

// Mock data for learning path
const mockLearningPath: LearningPathProgress = {
  pathId: '1',
  pathName: 'SDR Fundamentals',
  progress: 72,
  currentModule: 'Objection Handling Mastery',
  totalModules: 8,
  completedModules: 5,
};

// Mock stats
const mockStats: TrainingStats = {
  todaySessions: 2,
  todayGoal: 3,
  weekSessions: 8,
  weekAverageScore: 84,
  totalSessions: 47,
  totalHours: 12.5,
};

// Mock recent sessions
const mockRecentSessions: RecentSession[] = [
  {
    id: '1',
    scenarioTitle: 'Discovery Call',
    personaName: 'Tech Director',
    score: 87,
    completedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    duration: 480,
  },
  {
    id: '2',
    scenarioTitle: 'Objection Handling',
    personaName: 'Skeptical Prospect',
    score: 72,
    completedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    duration: 360,
  },
  {
    id: '3',
    scenarioTitle: 'Cold Call Opening',
    personaName: 'Gatekeeper',
    score: 91,
    completedAt: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
    duration: 300,
  },
];

// Mock recommended scenarios
const mockRecommendedScenarios: RecommendedScenario[] = [
  {
    id: '1',
    title: 'Difficult Customer',
    personaName: 'Karen Mitchell',
    difficulty: 'advanced',
    reason: 'Improve de-escalation skills',
    estimatedTime: 10,
    type: 'complaint-resolution',
  },
  {
    id: '2',
    title: 'Budget Objection',
    personaName: 'CFO Prospect',
    difficulty: 'advanced',
    reason: 'Based on recent performance',
    estimatedTime: 8,
    type: 'objection-handling',
  },
  {
    id: '3',
    title: 'Cold Call Opening',
    personaName: 'Friendly Gatekeeper',
    difficulty: 'beginner',
    reason: 'Build confidence',
    estimatedTime: 5,
    type: 'cold-call',
  },
  {
    id: '4',
    title: 'Gatekeeper Navigation',
    personaName: 'Patricia Chen',
    difficulty: 'intermediate',
    reason: 'Practice for certification',
    estimatedTime: 8,
    type: 'gatekeeper-navigation',
  },
];

// Training personas for horizontal scroll
const trainingPersonas = [
  { 
    id: '1', 
    name: 'Frustrated Customer', 
    creator: '@retail', 
    description: 'Long-time customer upset about repeated service failures.', 
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', 
    sessionsCompleted: '3.2k',
    difficulty: 'Hard' as const,
    category: 'CSR'
  },
  { 
    id: '2', 
    name: 'Tech-Savvy Senior', 
    creator: '@techsupport', 
    description: 'Elderly customer struggling with new technology setup.', 
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop', 
    sessionsCompleted: '2.1k',
    difficulty: 'Medium' as const,
    category: 'Tech Support'
  },
  { 
    id: '3', 
    name: 'Enterprise Buyer', 
    creator: '@enterprise', 
    description: 'VP of Operations evaluating solutions for 500+ company.', 
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop', 
    sessionsCompleted: '1.8k',
    difficulty: 'Hard' as const,
    category: 'SDR'
  },
  { 
    id: '4', 
    name: 'Skeptical Prospect', 
    creator: '@sales', 
    description: 'Been burned by vendors before, needs concrete proof.', 
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop', 
    sessionsCompleted: '1.5k',
    difficulty: 'Hard' as const,
    category: 'SDR'
  },
  { 
    id: '5', 
    name: 'Professional Gatekeeper', 
    creator: '@sales', 
    description: 'Executive assistant who screens all calls efficiently.', 
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop', 
    sessionsCompleted: '2.4k',
    difficulty: 'Medium' as const,
    category: 'SDR'
  },
  { 
    id: '6', 
    name: 'Price-Sensitive Buyer', 
    creator: '@finance', 
    description: 'CFO focused on ROI and budget constraints.', 
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop', 
    sessionsCompleted: '1.2k',
    difficulty: 'Hard' as const,
    category: 'SDR'
  },
];

// Practice scenarios
const scenarios = [
  { 
    id: '1', 
    name: 'Complaint Resolution', 
    creator: '@training', 
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=500&fit=crop', 
    type: 'Voice' as const,
    duration: '8-12 min',
    skills: ['Empathy', 'De-escalation'],
    gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' 
  },
  { 
    id: '2', 
    name: 'Discovery Call', 
    creator: '@sdr', 
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=500&fit=crop', 
    type: 'Video' as const,
    duration: '10-15 min',
    skills: ['Questioning', 'Active Listening'],
    gradient: 'linear-gradient(180deg, #11998e 0%, #38ef7d 100%)' 
  },
  { 
    id: '3', 
    name: 'Cold Call Opening', 
    creator: '@sales', 
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=500&fit=crop', 
    type: 'Voice' as const,
    duration: '3-5 min',
    skills: ['Hook', 'Value Prop'],
    gradient: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)' 
  },
  { 
    id: '4', 
    name: 'Objection Handling', 
    creator: '@sales', 
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=500&fit=crop', 
    type: 'Video' as const,
    duration: '8-10 min',
    skills: ['Reframing', 'Persistence'],
    gradient: 'linear-gradient(180deg, #ff6b9d 0%, #c44569 100%)' 
  },
  { 
    id: '5', 
    name: 'Churn Prevention', 
    creator: '@retention', 
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=500&fit=crop', 
    type: 'Voice' as const,
    duration: '10-15 min',
    skills: ['Retention', 'Value Selling'],
    gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' 
  },
];

const Index = () => {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    // Navigate to current module or learning path
    navigate('/scenarios');
  };

  const handleViewSession = (sessionId: string) => {
    navigate(`/simulation/${sessionId}/debrief`);
  };

  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Learning Path & Stats */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <LearningPathCard 
                path={mockLearningPath} 
                onContinue={handleContinueLearning} 
              />
            </div>
            <div className="lg:col-span-2">
              <StatsCards stats={mockStats} />
            </div>
          </div>

          {/* Recommended Practice */}
          <RecommendedPractice scenarios={mockRecommendedScenarios} />

          {/* Recent Sessions */}
          <RecentSessionsList 
            sessions={mockRecentSessions} 
            onViewSession={handleViewSession} 
          />

          {/* Customer Personas */}
          <HorizontalScrollSection title="Customer Personas">
            {trainingPersonas.map((persona) => (
              <CharacterCard
                key={persona.id}
                name={persona.name}
                creator={persona.creator}
                description={persona.description}
                imageUrl={persona.imageUrl}
                sessionsCompleted={persona.sessionsCompleted}
                difficulty={persona.difficulty}
                category={persona.category}
              />
            ))}
          </HorizontalScrollSection>

          {/* Practice Scenarios */}
          <HorizontalScrollSection title="Practice Scenarios">
            {scenarios.map((scenario) => (
              <SceneCard
                key={scenario.id}
                name={scenario.name}
                creator={scenario.creator}
                imageUrl={scenario.imageUrl}
                type={scenario.type}
                duration={scenario.duration}
                skills={scenario.skills}
                gradient={scenario.gradient}
              />
            ))}
          </HorizontalScrollSection>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Index;