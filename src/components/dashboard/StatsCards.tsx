import { Target, TrendingUp, Clock, Award } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import type { TrainingStats } from '@/types/training';

interface StatsCardsProps {
  stats: TrainingStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const goalProgress = (stats.todaySessions / stats.todayGoal) * 100;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {/* Today's Goal */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Today's Goal</p>
            <p className="text-xl font-semibold text-card-foreground">
              {stats.todaySessions}/{stats.todayGoal} Sessions
            </p>
          </div>
        </div>
        <Progress value={goalProgress} className="mt-3 h-1.5" />
      </div>

      {/* Weekly Sessions */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">This Week</p>
            <p className="text-xl font-semibold text-card-foreground">
              {stats.weekSessions} Sessions
            </p>
          </div>
        </div>
      </div>

      {/* Average Score */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/10">
            <Award className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg Score</p>
            <p className="text-xl font-semibold text-card-foreground">
              {stats.weekAverageScore}%
            </p>
          </div>
        </div>
      </div>

      {/* Total Hours */}
      <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
            <Clock className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Hours</p>
            <p className="text-xl font-semibold text-card-foreground">
              {stats.totalHours.toFixed(1)}h
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
