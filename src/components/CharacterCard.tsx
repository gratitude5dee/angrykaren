import { MessageCircle } from 'lucide-react';

interface CharacterCardProps {
  name: string;
  creator: string;
  description: string;
  imageUrl: string;
  chatCount: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  creator,
  description,
  imageUrl,
  chatCount,
}) => {
  return (
    <div className="min-w-[180px] w-[180px] bg-card rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer overflow-hidden group">
      <div className="h-[140px] overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-foreground text-sm truncate">{name}</h3>
        <p className="text-xs text-muted-foreground mb-1">By {creator}</p>
        <p className="text-xs text-secondary-foreground line-clamp-2 leading-relaxed">{description}</p>
        <div className="flex items-center gap-1 mt-2 text-muted-foreground">
          <MessageCircle className="h-3 w-3" />
          <span className="text-[11px]">{chatCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
