import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { TranscriptEntry } from '@/types/simulation';

interface TranscriptPanelProps {
  transcript: TranscriptEntry[];
  personaName: string;
  className?: string;
}

export function TranscriptPanel({ transcript, personaName, className }: TranscriptPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript]);

  const formatTimestamp = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl overflow-hidden", className)}>
      <div className="px-4 py-3 border-b border-border bg-muted/50">
        <h2 className="font-semibold text-foreground">Live Transcript</h2>
      </div>
      
      <ScrollArea className="h-[400px]" ref={scrollRef}>
        <div className="p-4 space-y-4">
          {transcript.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              <p>Conversation will appear here...</p>
            </div>
          ) : (
            transcript.map((entry) => (
              <TranscriptBubble
                key={entry.id}
                entry={entry}
                personaName={personaName}
              />
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

interface TranscriptBubbleProps {
  entry: TranscriptEntry;
  personaName: string;
}

function TranscriptBubble({ entry, personaName }: TranscriptBubbleProps) {
  const isCustomer = entry.speaker === 'customer';

  const formatTimestamp = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("flex", isCustomer ? "justify-start" : "justify-end")}>
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isCustomer
            ? "bg-destructive/10 text-foreground rounded-bl-md"
            : "bg-primary/10 text-foreground rounded-br-md",
          !entry.isFinal && "opacity-70"
        )}
      >
        <div
          className={cn(
            "flex items-center gap-2 mb-1 text-xs",
            isCustomer ? "text-destructive" : "text-primary"
          )}
        >
          <span className="font-medium">
            {isCustomer ? `🤖 ${personaName}` : '👤 You'}
          </span>
          <span className="text-muted-foreground">
            {formatTimestamp(entry.timestamp)}
          </span>
        </div>
        <p className="text-sm leading-relaxed">{entry.text}</p>
      </div>
    </div>
  );
}
