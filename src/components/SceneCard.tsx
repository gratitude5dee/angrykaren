import { Play, User } from 'lucide-react';

interface SceneCardProps {
  name: string;
  creator: string;
  imageUrl: string;
  actionLabel: string;
  gradient?: string;
}

const SceneCard: React.FC<SceneCardProps> = ({
  name,
  creator,
  imageUrl,
  actionLabel,
  gradient,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="min-w-[140px] w-[140px] h-[220px] rounded-2xl overflow-hidden relative cursor-pointer group"
        style={{
          background: gradient || 'linear-gradient(180deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)',
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Video badge */}
        <div className="absolute top-3 right-3 bg-black/40 rounded-md p-1.5">
          <Play className="h-3 w-3 text-white fill-white" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-semibold text-white text-sm mb-2 truncate">{name}</h3>
          <button className="flex items-center gap-1.5 bg-white/20 backdrop-blur-md rounded-lg px-2.5 py-1.5 text-white text-[11px] hover:bg-white/30 transition-colors">
            <User className="h-3 w-3" />
            {actionLabel}
          </button>
        </div>
      </div>
      <p className="text-xs text-muted-foreground px-1">By {creator}</p>
    </div>
  );
};

export default SceneCard;
