import { Link } from 'react-router-dom';
import { Phone, Video, MessageSquare, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { RecommendedScenario, DifficultyLevel, ScenarioType } from '@/types/training';

interface RecommendedPracticeProps {
  scenarios: RecommendedScenario[];
}

const RecommendedPractice = ({ scenarios }: RecommendedPracticeProps) => {
  const difficultyConfig: Record<DifficultyLevel, { label: string; className: string }> = {
    beginner: { label: 'Easy', className: 'bg-green-500/10 text-green-600 border-green-500/20' },
    intermediate: { label: 'Medium', className: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' },
    advanced: { label: 'Hard', className: 'bg-destructive/10 text-destructive border-destructive/20' },
    expert: { label: 'Expert', className: 'bg-primary/10 text-primary border-primary/20' },
  };

  const getScenarioIcon = (type: ScenarioType) => {
    if (type.includes('call') || type === 'objection-handling' || type === 'gatekeeper-navigation') {
      return <Phone className="h-5 w-5" />;
    }
    if (type === 'technical-support' || type === 'demo-scheduling') {
      return <Video className="h-5 w-5" />;
    }
    return <MessageSquare className="h-5 w-5" />;
  };

  return (
    <section className="mt-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-foreground">Recommended Practice</h2>
        <p className="text-sm text-muted-foreground">Based on your progress and skill gaps</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {scenarios.map((scenario) => (
          <Link
            key={scenario.id}
            to={`/scenario/${scenario.id}`}
            className="group rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              {getScenarioIcon(scenario.type)}
            </div>

            <h3 className="font-semibold text-card-foreground">{scenario.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">with "{scenario.personaName}"</p>

            <div className="mt-3 flex items-center gap-2">
              <Badge 
                variant="outline" 
                className={difficultyConfig[scenario.difficulty].className}
              >
                {difficultyConfig[scenario.difficulty].label}
              </Badge>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {scenario.estimatedTime} min
              </span>
            </div>

            <p className="mt-2 text-xs text-muted-foreground">{scenario.reason}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RecommendedPractice;
