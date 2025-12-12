import DashboardLayout from '@/components/DashboardLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';
import CharacterCard from '@/components/CharacterCard';
import SceneCard from '@/components/SceneCard';
import FeaturedCard from '@/components/FeaturedCard';

const characters = [
  { id: '1', name: 'Raiden Shogun', creator: '@genshin', description: 'The Electro Archon of Inazuma, seeking eternity.', imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=300&fit=crop', chatCount: '3.2m' },
  { id: '2', name: 'Sherlock Holmes', creator: '@detective', description: 'The world\'s greatest consulting detective.', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop', chatCount: '2.8m' },
  { id: '3', name: 'Space Explorer', creator: '@nasa', description: 'Discover the mysteries of the universe together.', imageUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=300&fit=crop', chatCount: '1.5m' },
  { id: '4', name: 'Writing Coach', creator: '@author', description: 'I\'ll help you craft compelling stories.', imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop', chatCount: '980k' },
  { id: '5', name: 'Fitness Trainer', creator: '@gym', description: 'Your personal guide to health and wellness.', imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=300&fit=crop', chatCount: '750k' },
  { id: '6', name: 'Chef Master', creator: '@cooking', description: 'Learn recipes from around the world.', imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', chatCount: '620k' },
];

const scenes = [
  { id: '1', name: 'Fantasy Quest', creator: '@rpg', imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&h=500&fit=crop', actionLabel: 'Select character', gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' },
  { id: '2', name: 'Space Station', creator: '@scifi', imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=300&h=500&fit=crop', actionLabel: 'Customize', gradient: 'linear-gradient(180deg, #11998e 0%, #38ef7d 100%)' },
  { id: '3', name: 'Mystery Manor', creator: '@thriller', imageUrl: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=300&h=500&fit=crop', actionLabel: 'Select character', gradient: 'linear-gradient(180deg, #f093fb 0%, #f5576c 100%)' },
  { id: '4', name: 'Beach Paradise', creator: '@relax', imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&h=500&fit=crop', actionLabel: 'Customize', gradient: 'linear-gradient(180deg, #ff6b9d 0%, #c44569 100%)' },
  { id: '5', name: 'Cyberpunk City', creator: '@future', imageUrl: 'https://images.unsplash.com/photo-1515634928627-2a4e0dae3ddf?w=300&h=500&fit=crop', actionLabel: 'Select character', gradient: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' },
];

const featured = [
  { id: '1', name: 'Philosophy Tutor', creator: '@wisdom', description: 'Explore deep questions about life, meaning, and existence.', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: '2', name: 'Language Partner', creator: '@polyglot', description: 'Practice any language with a patient native speaker.', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: '3', name: 'Career Advisor', creator: '@jobs', description: 'Get personalized guidance for your professional growth.', avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop' },
  { id: '4', name: 'Meditation Guide', creator: '@mindful', description: 'Find peace and calm with guided meditation sessions.', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: '5', name: 'History Teacher', creator: '@past', description: 'Travel through time and learn about fascinating events.', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
];

const Index = () => {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <HorizontalScrollSection title="For you">
          {characters.map((char) => (
            <CharacterCard
              key={char.id}
              name={char.name}
              creator={char.creator}
              description={char.description}
              imageUrl={char.imageUrl}
              chatCount={char.chatCount}
            />
          ))}
        </HorizontalScrollSection>

        <HorizontalScrollSection title="Scenes">
          {scenes.map((scene) => (
            <SceneCard
              key={scene.id}
              name={scene.name}
              creator={scene.creator}
              imageUrl={scene.imageUrl}
              actionLabel={scene.actionLabel}
              gradient={scene.gradient}
            />
          ))}
        </HorizontalScrollSection>

        <HorizontalScrollSection title="Featured">
          {featured.map((feat) => (
            <FeaturedCard
              key={feat.id}
              name={feat.name}
              creator={feat.creator}
              description={feat.description}
              avatarUrl={feat.avatarUrl}
            />
          ))}
        </HorizontalScrollSection>
      </DashboardLayout>
    </ProtectedRoute>
  );
};

export default Index;
