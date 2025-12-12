import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import CharacterCard from '@/components/CharacterCard';
import SceneCard from '@/components/SceneCard';
import FeaturedCard from '@/components/FeaturedCard';

const trainingPersonas = [
  { 
    id: '1', 
    name: 'Angry Customer', 
    creator: '@retail', 
    description: 'Upset about a delayed order and demanding immediate resolution.', 
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', 
    sessionsCompleted: '3.2k',
    difficulty: 'Hard' as const,
    category: 'Retail'
  },
  { 
    id: '2', 
    name: 'Confused Senior', 
    creator: '@techsupport', 
    description: 'Elderly customer struggling with technology setup.', 
    imageUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=300&fit=crop', 
    sessionsCompleted: '2.1k',
    difficulty: 'Medium' as const,
    category: 'Tech Support'
  },
  { 
    id: '3', 
    name: 'VIP Client', 
    creator: '@finance', 
    description: 'High-value customer expecting premium service and attention.', 
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop', 
    sessionsCompleted: '1.8k',
    difficulty: 'Medium' as const,
    category: 'Finance'
  },
  { 
    id: '4', 
    name: 'Impatient Caller', 
    creator: '@healthcare', 
    description: 'In a rush and needs quick answers without small talk.', 
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop', 
    sessionsCompleted: '1.5k',
    difficulty: 'Easy' as const,
    category: 'Healthcare'
  },
  { 
    id: '5', 
    name: 'Chatty Customer', 
    creator: '@retail', 
    description: 'Friendly but tends to go off-topic, needs gentle redirection.', 
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop', 
    sessionsCompleted: '980',
    difficulty: 'Easy' as const,
    category: 'Retail'
  },
  { 
    id: '6', 
    name: 'Technical Expert', 
    creator: '@techsupport', 
    description: 'Knows more than most agents, challenges your knowledge.', 
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop', 
    sessionsCompleted: '750',
    difficulty: 'Hard' as const,
    category: 'Tech Support'
  },
];

const scenarios = [
  { 
    id: '1', 
    name: 'Refund Request', 
    creator: '@training', 
    imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=500&fit=crop', 
    type: 'Voice' as const,
    duration: '5-10 min',
    skills: ['Empathy', 'Policy'],
    gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' 
  },
  { 
    id: '2', 
    name: 'Technical Troubleshoot', 
    creator: '@techsupport', 
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&h=500&fit=crop', 
    type: 'Video' as const,
    duration: '10-15 min',
    skills: ['Problem-solving', 'Patience'],
    gradient: 'linear-gradient(180deg, #11998e 0%, #38ef7d 100%)' 
  },
  { 
    id: '3', 
    name: 'De-escalation', 
    creator: '@crisis', 
    imageUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=300&h=500&fit=crop', 
    type: 'Voice' as const,
    duration: '8-12 min',
    skills: ['Calm', 'Active Listening'],
    gradient: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)' 
  },
  { 
    id: '4', 
    name: 'Upselling', 
    creator: '@sales', 
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=500&fit=crop', 
    type: 'Chat' as const,
    duration: '5-8 min',
    skills: ['Persuasion', 'Timing'],
    gradient: 'linear-gradient(180deg, #ff6b9d 0%, #c44569 100%)' 
  },
  { 
    id: '5', 
    name: 'Complaint Handling', 
    creator: '@quality', 
    imageUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=300&h=500&fit=crop', 
    type: 'Voice' as const,
    duration: '10-15 min',
    skills: ['Resolution', 'Follow-up'],
    gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' 
  },
];

const trainingModules = [
  { 
    id: '1', 
    name: 'Customer Empathy 101', 
    creator: '@csrpro', 
    description: 'Master the art of understanding and connecting with customers emotionally.', 
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    lessonsCount: 8,
    progress: 75
  },
  { 
    id: '2', 
    name: 'Active Listening Skills', 
    creator: '@communication', 
    description: 'Learn techniques to truly hear what customers are saying and respond effectively.', 
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    lessonsCount: 6,
    progress: 40
  },
  { 
    id: '3', 
    name: 'Conflict Resolution', 
    creator: '@management', 
    description: 'Turn challenging situations into positive outcomes with proven techniques.', 
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
    lessonsCount: 10,
    progress: 20
  },
  { 
    id: '4', 
    name: 'Product Knowledge Mastery', 
    creator: '@training', 
    description: 'Deep dive into product features to answer any customer question confidently.', 
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    lessonsCount: 12,
    progress: 0
  },
  { 
    id: '5', 
    name: 'Phone Etiquette', 
    creator: '@voice', 
    description: 'Perfect your phone presence with professional communication techniques.', 
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    lessonsCount: 5,
    progress: 100
  },
];

const Index = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <HorizontalScrollSection title="Recommended Training">
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

        <HorizontalScrollSection title="Training Modules">
          {trainingModules.map((module) => (
            <FeaturedCard
              key={module.id}
              name={module.name}
              creator={module.creator}
              description={module.description}
              avatarUrl={module.avatarUrl}
              lessonsCount={module.lessonsCount}
              progress={module.progress}
            />
          ))}
        </HorizontalScrollSection>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Index;
