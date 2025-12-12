import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, gradient, delay = 0 }: FeatureCardProps) {
  return (
    <div
      className={cn(
        "group relative p-6 rounded-2xl",
        "bg-card/50 backdrop-blur-sm border border-border/50",
        "hover:border-primary/30 hover:bg-card/80",
        "transition-all duration-500",
        "animate-fade-in-up"
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"
        style={{ background: gradient }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
        style={{ background: gradient }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
