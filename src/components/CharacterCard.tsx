import { Headphones } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CharacterCardProps {
  name: string;
  creator: string;
  description: string;
  imageUrl: string;
  sessionsCompleted: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
}

const difficultyColors = {
  Easy: 'bg-green-500/10 text-green-600 border-green-500/20',
  Medium: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  Hard: 'bg-red-500/10 text-red-600 border-red-500/20',
};

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  creator,
  description,
  imageUrl,
  sessionsCompleted,
  difficulty,
  category,
}) => {
  return (
    <div className="min-w-[180px] w-[180px] bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden group">
      <div className="h-[140px] overflow-hidden relative">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge 
          variant="outline" 
          className={`absolute top-2 right-2 text-[10px] ${difficultyColors[difficulty]}`}
        >
          {difficulty}
        </Badge>
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-foreground text-sm truncate">{name}</h3>
        <p className="text-xs text-muted-foreground mb-1">{category}</p>
        <p className="text-xs text-secondary-foreground line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex items-center gap-1 mt-2 text-muted-foreground">
          <Headphones className="h-3 w-3" />
          <span className="text-[11px]">{sessionsCompleted} sessions</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
