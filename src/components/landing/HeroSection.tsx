import { Link } from "react-router-dom";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  isVisible: boolean;
}

export default function HeroSection({ isVisible }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div
        className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          style={{ transitionDelay: "100ms" }}
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">AI-Powered Training Platform</span>
        </div>

        {/* Main Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight mb-6"
          style={{ transitionDelay: "200ms" }}
        >
          <span className="text-foreground">Train With AI.</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-[hsl(var(--landing-glow))] to-[hsl(var(--landing-cyan))] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-shift">
            Handle Any Customer.
          </span>
        </h1>

        {/* Subheadline */}
        <p
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          style={{ transitionDelay: "300ms" }}
        >
          Practice with realistic AI personas that challenge you with real-world scenarios.
          Build confidence, master de-escalation, and become an exceptional customer service rep.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          style={{ transitionDelay: "400ms" }}
        >
          <Button
            size="lg"
            asChild
            className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all group"
          >
            <Link to="/register">
              Start Training Free
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg border-border/50 hover:bg-muted/50 group"
          >
            <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </div>

        {/* Trust badges */}
        <div
          className="flex flex-col items-center gap-4"
          style={{ transitionDelay: "500ms" }}
        >
          <p className="text-sm text-muted-foreground/60">Trusted by leading companies</p>
          <div className="flex items-center gap-8 opacity-50">
            {["Salesforce", "HubSpot", "Zendesk", "Intercom"].map((company) => (
              <span key={company} className="text-lg font-semibold text-muted-foreground">
                {company}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-muted-foreground/40">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/40" />
        </div>
      </div>
    </section>
  );
}
