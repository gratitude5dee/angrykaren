import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [phase, setPhase] = useState<"logo" | "tagline" | "exit">("logo");

  useEffect(() => {
    const logoTimer = setTimeout(() => setPhase("tagline"), 1200);
    const taglineTimer = setTimeout(() => setPhase("exit"), 2800);
    const exitTimer = setTimeout(onComplete, 3500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(taglineTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center transition-opacity duration-700",
        "bg-[hsl(var(--landing-bg))]",
        phase === "exit" && "opacity-0 pointer-events-none"
      )}
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-[120px] animate-morph" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[hsl(var(--landing-cyan))]/15 blur-[100px] animate-morph" style={{ animationDelay: "-4s" }} />
      </div>

      {/* Logo */}
      <div className="relative z-10">
        <h1
          className={cn(
            "text-6xl md:text-8xl font-bold tracking-tight transition-all duration-700",
            "bg-gradient-to-r from-white via-primary-foreground to-primary bg-clip-text text-transparent",
            "bg-[length:200%_auto] animate-text-shimmer",
            phase === "logo" ? "opacity-0 scale-95 animate-scale-in" : "opacity-100 scale-100"
          )}
          style={{ animationDelay: "200ms" }}
        >
          Simulate
        </h1>
        <div
          className={cn(
            "mt-2 text-center text-lg md:text-xl tracking-[0.3em] uppercase text-muted-foreground/60",
            "transition-all duration-500",
            phase === "logo" ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
          )}
          style={{ transitionDelay: "400ms" }}
        >
          CSR Training Platform
        </div>
      </div>

      {/* Tagline */}
      <p
        className={cn(
          "mt-12 text-xl md:text-2xl text-muted-foreground transition-all duration-700",
          phase === "tagline" || phase === "exit"
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        )}
      >
        Master the Art of Customer Service
      </p>

      {/* Skip button */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 text-sm text-muted-foreground/40 hover:text-muted-foreground transition-colors"
      >
        Press any key to skip
      </button>
    </div>
  );
}
