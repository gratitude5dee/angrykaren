import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FeaturedCardProps {
  name: string;
  creator: string;
  description: string;
  avatarUrl: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  name,
  creator,
  description,
  avatarUrl,
}) => {
  return (
    <div className="min-w-[200px] w-[200px] bg-card rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer">
      <Avatar className="h-12 w-12 mb-3 ring-2 ring-border">
        <AvatarImage src={avatarUrl} />
        <AvatarFallback className="bg-accent text-accent-foreground">
          {name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <h3 className="font-semibold text-foreground text-[15px] truncate">{name}</h3>
      <p className="text-xs text-muted-foreground mb-2">By {creator}</p>
      <p className="text-[13px] text-secondary-foreground line-clamp-2 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeaturedCard;
