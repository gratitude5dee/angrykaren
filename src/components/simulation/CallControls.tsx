import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CallControlsProps {
  isMuted: boolean;
  isConnected: boolean;
  onToggleMute: () => void;
  onEndCall: () => void;
  className?: string;
}

export function CallControls({
  isMuted,
  isConnected,
  onToggleMute,
  onEndCall,
  className,
}: CallControlsProps) {
  return (
    <div className={cn("flex items-center justify-center gap-6", className)}>
      {/* Mute Button */}
      <Button
        variant="outline"
        size="lg"
        onClick={onToggleMute}
        disabled={!isConnected}
        className={cn(
          "w-14 h-14 rounded-full p-0",
          isMuted && "bg-destructive hover:bg-destructive/90 border-destructive"
        )}
      >
        {isMuted ? (
          <MicOff className="w-6 h-6" />
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </Button>

      {/* End Call Button */}
      <Button
        variant="destructive"
        size="lg"
        onClick={onEndCall}
        className="px-8 py-6 rounded-full font-semibold"
      >
        <PhoneOff className="w-5 h-5 mr-2" />
        End Call
      </Button>
    </div>
  );
}
