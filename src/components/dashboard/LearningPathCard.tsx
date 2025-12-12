import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { LearningPathProgress } from '@/types/training';

interface LearningPathCardProps {
  path: LearningPathProgress;
  onContinue: () => void;
}

const LearningPathCard = ({ path, onContinue }: LearningPathCardProps) => {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Your Learning Path</p>
            <h3 className="text-lg font-semibold text-card-foreground">{path.pathName}</h3>
          </div>
        </div>
        <span className="text-sm font-medium text-primary">{path.progress}% Complete</span>
      </div>

      <div className="mt-4">
        <Progress value={path.progress} className="h-2" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="font-medium text-card-foreground">Up Next:</span> {path.currentModule}
        </div>
        <span className="text-xs text-muted-foreground">
          {path.completedModules}/{path.totalModules} modules
        </span>
      </div>

      <Button 
        onClick={onContinue} 
        className="mt-4 w-full gap-2"
      >
        Continue Training
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default LearningPathCard;
