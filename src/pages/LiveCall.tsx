import { useEffect, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'sonner';
import { useAnamSession } from '@/hooks/useAnamSession';
import { AnamAvatar } from '@/components/simulation/AnamAvatar';
import { TranscriptPanel } from '@/components/simulation/TranscriptPanel';
import { CallControls } from '@/components/simulation/CallControls';
import { StatusBar } from '@/components/simulation/StatusBar';
import { VoiceIndicator } from '@/components/simulation/VoiceIndicator';

export default function LiveCall() {
  const { personaId, scenarioId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const personaName = location.state?.personaName || 'Training Customer';
  const scenarioTitle = location.state?.scenarioTitle || 'Training Scenario';
  const difficulty = location.state?.difficulty || 'intermediate';

  const { callState, transcript, startSession, endSession, toggleMute } = useAnamSession({
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
    navigate(`/debrief/${scenarioId}`, {
      state: {
        transcript: result.transcript,
        duration: result.duration,
        session: result.session,
        personaName,
        scenarioTitle,
        difficulty,
      },
    });
  }, [endSession, navigate, scenarioId, personaName, scenarioTitle, difficulty]);

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
    </div>
  );
}
