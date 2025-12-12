import { useEffect, useState } from 'react';
import { Brain } from 'lucide-react';

const analysisMessages = [
  "Evaluating empathy scores...",
  "Analyzing communication clarity...",
  "Reviewing problem resolution...",
  "Assessing customer engagement...",
  "Calculating overall performance...",
];

interface ScoringOverlayProps {
  isVisible: boolean;
}

export function ScoringOverlay({ isVisible }: ScoringOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % analysisMessages.length);
    }, 2000);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="flex flex-col items-center gap-8">
        {/* Pulsing Brain Icon */}
        <div className="relative">
          {/* Outer pulse rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 animate-pulse-ring rounded-full bg-primary/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-32 w-32 animate-pulse-ring rounded-full bg-primary/20" style={{ animationDelay: '0.5s' }} />
          </div>
          
          {/* Main icon container */}
          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/60 shadow-lg shadow-primary/30">
            <Brain className="h-12 w-12 text-primary-foreground animate-pulse" />
          </div>
        </div>

        {/* Main text */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Analyzing Your Performance
          </h2>
          <p className="text-muted-foreground animate-fade-in-up" key={messageIndex}>
            {analysisMessages[messageIndex]}
          </p>
        </div>

        {/* Typing dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-3 w-3 rounded-full bg-primary animate-typing-dot"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
