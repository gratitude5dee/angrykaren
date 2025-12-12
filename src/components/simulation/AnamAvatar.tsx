import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AnamAvatarProps {
  isConnected: boolean;
  isSpeaking: boolean;
  className?: string;
}

export const AnamAvatar = forwardRef<HTMLVideoElement, AnamAvatarProps>(
  ({ isConnected, isSpeaking, className }, ref) => {
    return (
      <div className={cn(
        "relative rounded-2xl overflow-hidden bg-muted",
        isSpeaking && "ring-4 ring-primary/50",
        className
      )}>
        <video
          ref={ref}
          autoPlay
          playsInline
          muted={false}
          className="w-full h-full object-cover"
          style={{ transform: 'scaleX(-1)' }} // Mirror for natural feel
        />
        
        {/* Connection overlay */}
        {!isConnected && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Connecting to AI customer...</p>
            </div>
          </div>
        )}

        {/* Speaking indicator */}
        {isConnected && isSpeaking && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-full text-sm font-medium">
            <VoiceWaveform />
            <span>Speaking...</span>
          </div>
        )}
      </div>
    );
  }
);

AnamAvatar.displayName = 'AnamAvatar';

function VoiceWaveform() {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-0.5 bg-current rounded-full animate-pulse"
          style={{
            height: `${8 + Math.random() * 8}px`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
