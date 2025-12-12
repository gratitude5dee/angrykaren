import { useState, useRef, useCallback, useEffect } from 'react';
import { createClient, AnamEvent, type AnamClient } from '@anam-ai/js-sdk';
import { supabase } from '@/integrations/supabase/client';
import type { CallState, TranscriptEntry, SimulationSession } from '@/types/simulation';

interface UseAnamSessionOptions {
  onTranscript?: (entry: TranscriptEntry) => void;
  onCallStateChange?: (state: CallState) => void;
  onError?: (error: Error) => void;
}

export function useAnamSession(options: UseAnamSessionOptions = {}) {
  const { onTranscript, onCallStateChange, onError } = options;
  
  const [callState, setCallState] = useState<CallState>({
    status: 'idle',
    startTime: null,
    duration: 0,
    isMicMuted: false,
    agentSpeaking: false,
    userSpeaking: false,
  });
  
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [session, setSession] = useState<SimulationSession | null>(null);
  
  const anamClientRef = useRef<AnamClient | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Update call state and notify parent
  const updateCallState = useCallback((updates: Partial<CallState>) => {
    setCallState(prev => {
      const newState = { ...prev, ...updates };
      onCallStateChange?.(newState);
      return newState;
    });
  }, [onCallStateChange]);

  // Add transcript entry
  const addTranscript = useCallback((entry: Omit<TranscriptEntry, 'id'>) => {
    const newEntry: TranscriptEntry = {
      ...entry,
      id: crypto.randomUUID(),
    };
    setTranscript(prev => [...prev, newEntry]);
    onTranscript?.(newEntry);
  }, [onTranscript]);

  // Start timer
  useEffect(() => {
    if (callState.status === 'connected' && callState.startTime) {
      timerRef.current = setInterval(() => {
        setCallState(prev => ({
          ...prev,
          duration: Math.floor((Date.now() - prev.startTime!) / 1000),
        }));
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callState.status, callState.startTime]);

  // Initialize session with Anam
  const startSession = useCallback(async (
    personaId: string,
    scenarioId: string,
    personaName: string,
    scenarioTitle: string,
    difficulty: string,
    videoElementId: string
  ) => {
    try {
      updateCallState({ status: 'connecting' });

      console.log('Starting training session...');

      // Get session token from edge function
      const { data, error } = await supabase.functions.invoke('training-config', {
        body: { personaId, scenarioId },
      });

      if (error) {
        throw new Error(error.message || 'Failed to get session config');
      }

      console.log('Got session config:', data);

      if (!data.anamSessionToken) {
        throw new Error('No session token received from server');
      }

      // Initialize Anam client with session token
      const anamClient = createClient(data.anamSessionToken);
      anamClientRef.current = anamClient;

      // Set up event listeners using correct AnamEvent enum
      anamClient.addListener(AnamEvent.CONNECTION_ESTABLISHED, () => {
        console.log('Anam connection established');
        startTimeRef.current = Date.now();
        updateCallState({ 
          status: 'connected',
          startTime: Date.now(),
        });
      });

      anamClient.addListener(AnamEvent.MESSAGE_HISTORY_UPDATED, (messages) => {
        console.log('Message history updated:', messages);
        // Process messages into transcript entries
        if (Array.isArray(messages)) {
          messages.forEach((msg) => {
            if (msg.content) {
              // MessageRole enum uses PERSONA for AI, USER for human
              const isPersona = String(msg.role).toUpperCase().includes('PERSONA') || 
                               String(msg.role).toUpperCase().includes('ASSISTANT');
              addTranscript({
                speaker: isPersona ? 'customer' : 'csr',
                text: msg.content,
                timestamp: startTimeRef.current ? Date.now() - startTimeRef.current : 0,
                isFinal: true,
              });
            }
          });
        }
      });

      anamClient.addListener(AnamEvent.MESSAGE_STREAM_EVENT_RECEIVED, (event) => {
        console.log('Stream event:', event);
        if (event.content) {
          const isPersona = String(event.role).toUpperCase().includes('PERSONA');
          addTranscript({
            speaker: isPersona ? 'customer' : 'csr',
            text: event.content,
            timestamp: startTimeRef.current ? Date.now() - startTimeRef.current : 0,
            isFinal: true,
          });
        }
      });

      anamClient.addListener(AnamEvent.AUDIO_STREAM_STARTED, () => {
        console.log('Agent audio started');
        updateCallState({ agentSpeaking: true });
      });

      anamClient.addListener(AnamEvent.CONNECTION_CLOSED, (reason, details) => {
        console.log('Connection closed:', reason, details);
        updateCallState({ status: 'ended' });
      });

      // Start streaming to video element
      await anamClient.streamToVideoElement(videoElementId);

      setSession({
        id: crypto.randomUUID(),
        scenarioId,
        personaId,
        personaName,
        scenarioTitle,
        difficulty,
        anamSessionToken: data.anamSessionToken,
      });

    } catch (error) {
      console.error('Failed to start session:', error);
      const err = error instanceof Error ? error : new Error('Unknown error');
      updateCallState({ 
        status: 'error',
        errorMessage: err.message,
      });
      onError?.(err);
    }
  }, [updateCallState, addTranscript, onError]);

  // End session
  const endSession = useCallback(async () => {
    console.log('Ending session...');
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    if (anamClientRef.current) {
      try {
        await anamClientRef.current.stopStreaming();
      } catch (e) {
        console.error('Error stopping stream:', e);
      }
      anamClientRef.current = null;
    }

    updateCallState({ status: 'ended' });
    
    return {
      transcript,
      duration: callState.duration,
      session,
    };
  }, [transcript, callState.duration, session, updateCallState]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    const newMuted = !callState.isMicMuted;
    
    if (anamClientRef.current) {
      if (newMuted) {
        anamClientRef.current.muteInputAudio();
      } else {
        anamClientRef.current.unmuteInputAudio();
      }
    }
    
    updateCallState({ isMicMuted: newMuted });
  }, [callState.isMicMuted, updateCallState]);

  // Send user message
  const sendMessage = useCallback((content: string) => {
    if (anamClientRef.current && callState.status === 'connected') {
      anamClientRef.current.sendUserMessage(content);
    }
  }, [callState.status]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (anamClientRef.current) {
        try {
          anamClientRef.current.stopStreaming();
        } catch (e) {
          console.error('Error stopping stream on unmount:', e);
        }
      }
    };
  }, []);

  return {
    callState,
    transcript,
    session,
    startSession,
    endSession,
    toggleMute,
    sendMessage,
  };
}
