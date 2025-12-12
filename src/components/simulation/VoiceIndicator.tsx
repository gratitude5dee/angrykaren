import { cn } from '@/lib/utils';

interface VoiceIndicatorProps {
  agentSpeaking: boolean;
  userSpeaking: boolean;
  className?: string;
}

export function VoiceIndicator({ agentSpeaking, userSpeaking, className }: VoiceIndicatorProps) {
  const getMessage = () => {
    if (agentSpeaking) return '🔊 AI customer is speaking...';
    if (userSpeaking) return '🎤 You are speaking...';
    return '🎤 Listening...';
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 px-6 py-3 rounded-full transition-colors",
        agentSpeaking
          ? "bg-primary/20 text-primary"
          : userSpeaking
          ? "bg-green-500/20 text-green-400"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      <VoiceWaveform isActive={agentSpeaking || userSpeaking} />
      <span className="font-medium">{getMessage()}</span>
    </div>
  );
}

interface VoiceWaveformProps {
  isActive: boolean;
}

function VoiceWaveform({ isActive }: VoiceWaveformProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={cn(
            "w-1 bg-current rounded-full transition-all duration-100",
            isActive ? "animate-pulse" : "h-2"
          )}
          style={{
            height: isActive ? `${8 + Math.random() * 12}px` : '8px',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
