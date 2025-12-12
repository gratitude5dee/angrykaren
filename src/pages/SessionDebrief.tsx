import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MessageSquare, Star, CheckCircle2, ArrowUpRight, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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

interface TranscriptEntry {
  id: string;
  speaker: 'csr' | 'customer';
  text: string;
  timestamp: number;
}

function getGrade(score: number): { label: string; color: string; bgColor: string } {
  if (score >= 90) return { label: 'Excellent', color: 'text-green-500', bgColor: 'bg-green-500/10' };
  if (score >= 75) return { label: 'Good', color: 'text-blue-500', bgColor: 'bg-blue-500/10' };
  if (score >= 60) return { label: 'Satisfactory', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10' };
  return { label: 'Needs Improvement', color: 'text-orange-500', bgColor: 'bg-orange-500/10' };
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatTimestamp(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function SessionDebrief() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const {
    transcript = [],
    duration = 0,
    personaName = 'Customer',
    scenarioTitle = 'Training Session',
    difficulty = 'intermediate',
    scoringResult,
  } = location.state || {};

  const score = scoringResult?.overallScore ?? 0;
  const grade = getGrade(score);

  if (!scoringResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">No Session Data</h1>
          <p className="text-muted-foreground mb-6">
            It looks like you haven't completed a session yet.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-foreground">{scenarioTitle}</h1>
            <p className="text-sm text-muted-foreground">Session with {personaName}</p>
          </div>
          <Badge variant="outline" className="capitalize">{difficulty}</Badge>
        </div>
      </header>

      <main className="container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Score Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Score Card */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center">
                  <div className={`h-32 w-32 rounded-full ${grade.bgColor} flex items-center justify-center mb-4`}>
                    <div className="text-center">
                      <Trophy className={`h-8 w-8 mx-auto mb-1 ${grade.color}`} />
                      <span className={`text-3xl font-bold ${grade.color}`}>{score}%</span>
                    </div>
                  </div>
                  <Badge className={`${grade.bgColor} ${grade.color} border-0`}>
                    {grade.label}
                  </Badge>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <Clock className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm font-medium text-foreground">{formatDuration(duration)}</p>
                    <p className="text-xs text-muted-foreground">Duration</p>
                  </div>
                  <div className="text-center">
                    <MessageSquare className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm font-medium text-foreground">{transcript.length}</p>
                    <p className="text-xs text-muted-foreground">Messages</p>
                  </div>
                  <div className="text-center">
                    <Star className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                    <p className="text-sm font-medium text-foreground">
                      {scoringResult.categoryScores.reduce((a: number, c: any) => a + c.score, 0)}/
                      {scoringResult.categoryScores.reduce((a: number, c: any) => a + c.maxScore, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Strengths */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {scoringResult.strengths.map((strength: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 shrink-0" />
                    <span className="text-muted-foreground">{strength}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Areas for Improvement */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <ArrowUpRight className="h-5 w-5 text-orange-500" />
                  Areas for Improvement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {scoringResult.improvements.map((improvement: string, i: number) => (
                  <div key={i} className="flex items-start gap-2 text-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500 mt-2 shrink-0" />
                    <span className="text-muted-foreground">{improvement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Category Scores & Transcript */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Summary */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">AI Analysis Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{scoringResult.summary}</p>
              </CardContent>
            </Card>

            {/* Category Scores */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {scoringResult.categoryScores.map((category: any, i: number) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{category.category}</span>
                      <span className="text-sm text-muted-foreground">
                        {category.score}/{category.maxScore}
                      </span>
                    </div>
                    <Progress 
                      value={(category.score / category.maxScore) * 100} 
                      className="h-2 mb-2"
                    />
                    <p className="text-sm text-muted-foreground">{category.feedback}</p>
                    {i < scoringResult.categoryScores.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Transcript Review */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Conversation Transcript</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {transcript.map((entry: TranscriptEntry) => (
                      <div
                        key={entry.id}
                        className={`flex gap-3 ${entry.speaker === 'csr' ? 'flex-row-reverse' : ''}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            entry.speaker === 'csr'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{entry.text}</p>
                          <p className={`text-xs mt-1 ${
                            entry.speaker === 'csr' 
                              ? 'text-primary-foreground/70' 
                              : 'text-muted-foreground'
                          }`}>
                            {formatTimestamp(entry.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex gap-4">
              <Button onClick={() => navigate('/dashboard')} variant="outline" className="flex-1">
                Back to Dashboard
              </Button>
              <Button 
                onClick={() => navigate(-1)} 
                className="flex-1"
              >
                Practice Again
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
