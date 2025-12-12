import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { BookOpen } from 'lucide-react';

interface FeaturedCardProps {
  name: string;
  creator: string;
  description: string;
  avatarUrl: string;
  lessonsCount: number;
  progress: number;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  name,
  creator,
  description,
  avatarUrl,
  lessonsCount,
  progress,
}) => {
  return (
    <div className="min-w-[200px] w-[200px] bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <Avatar className="h-12 w-12 mb-3 ring-2 ring-border">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="bg-accent text-accent-foreground">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h3 className="font-semibold text-foreground text-[15px] truncate">{name}</h3>
      <p className="text-xs text-muted-foreground mb-2">By {creator}</p>
      <p className="text-[13px] text-secondary-foreground line-clamp-2 leading-relaxed mb-3">
        {description}
      </p>
      
      {/* Lessons count */}
      <div className="flex items-center gap-1.5 text-muted-foreground text-xs mb-2">
        <BookOpen className="h-3 w-3" />
        <span>{lessonsCount} lessons</span>
      </div>
      
      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-[10px]">
          <span className="text-muted-foreground">Progress</span>
          <span className="text-foreground font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-1.5" />
      </div>
    </div>
  );
};

export default FeaturedCard;
