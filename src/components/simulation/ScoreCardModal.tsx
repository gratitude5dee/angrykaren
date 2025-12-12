import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowUpRight, Clock, MessageSquare, Star, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScoringResult {
  overallScore: number;
  categoryScores: {
    category: string;
    score: number;
    maxScore: number;
    feedback: string;
  }[];
  strengths: string[];
  improvements: string[];
  summary: string;
}

interface ScoreCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  scoringResult: ScoringResult | null;
  duration: number;
  transcriptLength: number;
  personaId?: string;
  scenarioId?: string;
  personaName: string;
  scenarioTitle: string;
  difficulty: string;
  transcript: any[];
  session: any;
}

function getGrade(score: number): { label: string; color: string } {
  if (score >= 90) return { label: 'Excellent', color: 'text-green-500' };
  if (score >= 75) return { label: 'Good', color: 'text-blue-500' };
  if (score >= 60) return { label: 'Satisfactory', color: 'text-yellow-500' };
  return { label: 'Needs Improvement', color: 'text-orange-500' };
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function ScoreCardModal({
  isOpen,
  onClose,
  scoringResult,
  duration,
  transcriptLength,
  personaId,
  scenarioId,
  personaName,
  scenarioTitle,
  difficulty,
  transcript,
  session,
}: ScoreCardModalProps) {
  const navigate = useNavigate();
  const [animatedScore, setAnimatedScore] = useState(0);
  
  const score = scoringResult?.overallScore ?? 0;
  const grade = getGrade(score);
  const totalPoints = scoringResult?.categoryScores.reduce((acc, c) => acc + c.maxScore, 0) ?? 30;
  const earnedPoints = scoringResult?.categoryScores.reduce((acc, c) => acc + c.score, 0) ?? 0;

  useEffect(() => {
    if (!isOpen || !scoringResult) return;
    
    // Animate score from 0 to final value
    const duration = 1500;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedScore(Math.round(score * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isOpen, score, scoringResult]);

  if (!isOpen || !scoringResult) return null;

  const handleViewDebrief = () => {
    navigate(`/debrief/${scenarioId}`, {
      state: {
        transcript,
        duration,
        session,
        personaName,
        scenarioTitle,
        difficulty,
        scoringResult,
      },
    });
  };

  const handlePracticeAgain = () => {
    navigate(`/call/${personaId}/${scenarioId}`, {
      state: { personaName, scenarioTitle, difficulty },
    });
  };

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  // Calculate stroke dashoffset for circular progress
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
      <Card className="w-full max-w-lg animate-scale-in border-border/50 bg-card/95 shadow-2xl">
        <CardContent className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Circular Score */}
          <div className="flex flex-col items-center mb-6">
            <div className="relative h-32 w-32 mb-4">
              <svg className="h-32 w-32 -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted/30"
                />
                {/* Progress circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="text-primary transition-all duration-1000"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset,
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">{animatedScore}%</span>
              </div>
            </div>
            <Badge variant="secondary" className={`text-sm font-medium ${grade.color}`}>
              {grade.label}
            </Badge>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-3 rounded-lg bg-muted/30">
            <div className="flex flex-col items-center">
              <Clock className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-medium text-foreground">{formatDuration(duration)}</span>
              <span className="text-xs text-muted-foreground">Duration</span>
            </div>
            <div className="flex flex-col items-center">
              <MessageSquare className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-medium text-foreground">{transcriptLength}</span>
              <span className="text-xs text-muted-foreground">Messages</span>
            </div>
            <div className="flex flex-col items-center">
              <Star className="h-5 w-5 text-muted-foreground mb-1" />
              <span className="text-sm font-medium text-foreground">{earnedPoints}/{totalPoints}</span>
              <span className="text-xs text-muted-foreground">Points</span>
            </div>
          </div>

          {/* Strengths */}
          {scoringResult.strengths.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-foreground mb-2">Strengths</h4>
              <div className="space-y-2">
                {scoringResult.strengths.slice(0, 3).map((strength, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvements */}
          {scoringResult.improvements.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-foreground mb-2">Areas for Improvement</h4>
              <div className="space-y-2">
                {scoringResult.improvements.slice(0, 2).map((improvement, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <ArrowUpRight className="h-4 w-4 text-orange-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{improvement}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
            {scoringResult.summary}
          </p>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <Button onClick={handleViewDebrief} className="w-full">
              View Full Debrief
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePracticeAgain} className="flex-1">
                Practice Again
              </Button>
              <Button variant="ghost" onClick={handleBackToDashboard} className="flex-1">
                Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
