import { useEffect, useCallback, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAnamSession } from '@/hooks/useAnamSession';
import { useAuth } from '@/contexts/AuthContext';
import { AnamAvatar } from '@/components/simulation/AnamAvatar';
import { TranscriptPanel } from '@/components/simulation/TranscriptPanel';
import { CallControls } from '@/components/simulation/CallControls';
import { StatusBar } from '@/components/simulation/StatusBar';
import { VoiceIndicator } from '@/components/simulation/VoiceIndicator';
import { ScoringOverlay } from '@/components/simulation/ScoringOverlay';
import { ScoreCardModal } from '@/components/simulation/ScoreCardModal';

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

export default function LiveCall() {
  const { personaId, scenarioId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { profile, user } = useAuth();
  
  const personaName = location.state?.personaName || 'Training Customer';
  const scenarioTitle = location.state?.scenarioTitle || 'Training Scenario';
  const difficulty = location.state?.difficulty || 'intermediate';

  const [isScoring, setIsScoring] = useState(false);
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null);
  const [showScoreCard, setShowScoreCard] = useState(false);
  const [finalDuration, setFinalDuration] = useState(0);
  const [finalTranscript, setFinalTranscript] = useState<any[]>([]);
  const [finalSession, setFinalSession] = useState<any>(null);

  const { callState, transcript, session, startSession, endSession, toggleMute } = useAnamSession({
    onError: (error) => {
      toast.error(`Session error: ${error.message}`);
    },
  });

  useEffect(() => {
    if (personaId && scenarioId) {
      startSession(personaId, scenarioId, personaName, scenarioTitle, difficulty, 'anam-video');
    }
  }, [personaId, scenarioId]);

  const handleEndCall = useCallback(async () => {
    const result = await endSession();
    
    // Store for use in modal/navigation
    setFinalDuration(result.duration);
    setFinalTranscript(result.transcript);
    setFinalSession(result.session);
    
    // Show scoring overlay
    setIsScoring(true);

    try {
      const { data: scoring, error } = await supabase.functions.invoke('score-session', {
        body: {
          scenarioId,
          personaId,
          transcript: result.transcript,
          duration: result.duration,
          scenarioTitle,
          personaName,
          difficulty,
        },
      });

      setIsScoring(false);

      if (error) {
        console.error('Scoring error:', error);
        toast.error('Failed to generate scoring');
        navigate('/dashboard');
        return;
      }

      // Show score card modal
      // Send summary to Railway webhook
      try {
        await fetch('https://primary-production-92d2.up.railway.app/webhook/store-conversation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: result.transcript,
            user: profile?.username || user?.email || 'anonymous',
          }),
        });
        console.log('Conversation transcript sent to webhook');
      } catch (webhookError) {
        console.error('Failed to send summary to webhook:', webhookError);
      }

      setScoringResult(scoring);
      setShowScoreCard(true);
    } catch (err) {
      console.error('Scoring failed:', err);
      setIsScoring(false);
      toast.error('Failed to analyze session');
      navigate('/dashboard');
    }
  }, [endSession, navigate, scenarioId, personaId, personaName, scenarioTitle, difficulty, profile, user]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <StatusBar
        scenarioTitle={scenarioTitle}
        personaName={personaName}
        difficulty={difficulty}
        callState={callState}
      />

      <main className="flex-1 flex gap-6 p-6 max-w-7xl mx-auto w-full">
        <div className="flex-1 flex flex-col gap-4">
          <AnamAvatar
            ref={(el) => {
              if (el) el.id = 'anam-video';
            }}
            isConnected={callState.status === 'connected'}
            isSpeaking={callState.agentSpeaking}
            className="flex-1 min-h-[400px]"
          />
          
          <VoiceIndicator
            agentSpeaking={callState.agentSpeaking}
            userSpeaking={callState.userSpeaking}
          />

          <CallControls
            isMuted={callState.isMicMuted}
            isConnected={callState.status === 'connected'}
            onToggleMute={toggleMute}
            onEndCall={handleEndCall}
            className="py-4"
          />
        </div>

        <TranscriptPanel
          transcript={transcript}
          personaName={personaName}
          className="w-96 hidden lg:block"
        />
      </main>

      {/* Scoring Overlay */}
      <ScoringOverlay isVisible={isScoring} />

      {/* Score Card Modal */}
      <ScoreCardModal
        isOpen={showScoreCard}
        onClose={() => setShowScoreCard(false)}
        scoringResult={scoringResult}
        duration={finalDuration}
        transcriptLength={finalTranscript.length}
        personaId={personaId}
        scenarioId={scenarioId}
        personaName={personaName}
        scenarioTitle={scenarioTitle}
        difficulty={difficulty}
        transcript={finalTranscript}
        session={finalSession}
      />
    </div>
  );
}
