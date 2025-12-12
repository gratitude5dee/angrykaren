import { Clock, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { CallState } from '@/types/simulation';

interface StatusBarProps {
  scenarioTitle: string;
  personaName: string;
  difficulty: string;
  callState: CallState;
  className?: string;
}

export function StatusBar({
  scenarioTitle,
  personaName,
  difficulty,
  callState,
  className,
}: StatusBarProps) {
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const difficultyConfig = {
    beginner: { label: 'Easy', className: 'bg-green-500/20 text-green-400 border-green-500/30' },
    intermediate: { label: 'Medium', className: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    advanced: { label: 'Hard', className: 'bg-red-500/20 text-red-400 border-red-500/30' },
    expert: { label: 'Expert', className: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  };

  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig] || difficultyConfig.intermediate;

  return (
    <div className={cn(
      "flex items-center justify-between px-6 py-4 bg-card/50 backdrop-blur-sm border-b border-border",
      className
    )}>
      {/* Left: Scenario info */}
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-xl">
          😤
        </div>
        <div>
          <h1 className="font-semibold text-foreground">{personaName}</h1>
          <p className="text-sm text-muted-foreground">{scenarioTitle}</p>
        </div>
      </div>

      {/* Right: Status indicators */}
      <div className="flex items-center gap-4">
        {/* Timer */}
        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg font-mono text-lg">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-foreground">{formatDuration(callState.duration)}</span>
        </div>

        {/* Difficulty */}
        <Badge variant="outline" className={config.className}>
          {config.label}
        </Badge>

        {/* Connection status */}
        <div className={cn(
          "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium",
          callState.status === 'connected'
            ? "bg-green-500/20 text-green-400"
            : callState.status === 'connecting'
            ? "bg-amber-500/20 text-amber-400"
            : "bg-muted text-muted-foreground"
        )}>
          <span className={cn(
            "w-2 h-2 rounded-full",
            callState.status === 'connected'
              ? "bg-green-400 animate-pulse"
              : callState.status === 'connecting'
              ? "bg-amber-400 animate-pulse"
              : "bg-muted-foreground"
          )} />
          {callState.status === 'connected' ? 'Live' : 
           callState.status === 'connecting' ? 'Connecting...' : 
           callState.status === 'error' ? 'Error' : 'Disconnected'}
        </div>
      </div>
    </div>
  );
}
