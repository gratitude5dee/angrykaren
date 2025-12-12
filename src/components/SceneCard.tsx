import { Video, Mic, MessageSquare, Clock } from 'lucide-react';

interface SceneCardProps {
  name: string;
  creator: string;
  imageUrl: string;
  type: 'Voice' | 'Video' | 'Chat';
  duration: string;
  skills: string[];
  gradient?: string;
}

const typeIcons = {
  Voice: Mic,
  Video: Video,
  Chat: MessageSquare,
};

const SceneCard: React.FC<SceneCardProps> = ({
  name,
  creator,
  imageUrl,
  type,
  duration,
  skills,
  gradient,
}) => {
  const TypeIcon = typeIcons[type];

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
        
        {/* Type badge */}
        <div className="absolute top-3 right-3 bg-black/40 rounded-md p-1.5">
          <TypeIcon className="h-3 w-3 text-white" />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h3 className="font-semibold text-white text-sm mb-1 truncate">{name}</h3>
          <div className="flex items-center gap-1.5 text-white/80 text-[10px] mb-2">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 2).map((skill) => (
              <span 
                key={skill} 
                className="bg-white/20 backdrop-blur-md rounded px-1.5 py-0.5 text-white text-[9px]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground px-1">By {creator}</p>
    </div>
  );
};

export default SceneCard;
