import { Play, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RecentSession } from '@/types/training';

interface RecentSessionsListProps {
  sessions: RecentSession[];
  onViewSession: (sessionId: string) => void;
}

const RecentSessionsList = ({ sessions, onViewSession }: RecentSessionsListProps) => {
  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-destructive';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) {
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    }
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  if (sessions.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold text-card-foreground">Recent Sessions</h3>
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <Play className="mb-3 h-12 w-12 text-muted-foreground/50" />
          <p className="text-muted-foreground">No sessions yet</p>
          <p className="mt-1 text-sm text-muted-foreground">Start your first training session!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Sessions</h3>
        <Button variant="ghost" size="sm" className="text-primary">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between rounded-lg border border-border bg-background p-3 transition-colors hover:bg-muted/50"
          >
            <div className="flex items-center gap-3">
              {getScoreIcon(session.score)}
              <div>
                <p className="font-medium text-card-foreground">{session.scenarioTitle}</p>
                <p className="text-sm text-muted-foreground">
                  with "{session.personaName}" · {formatDuration(session.duration)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className={`text-lg font-semibold ${getScoreColor(session.score)}`}>
                {session.score}%
              </span>
              <span className="text-sm text-muted-foreground">
                {formatTimeAgo(session.completedAt)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewSession(session.id)}
              >
                Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSessionsList;
