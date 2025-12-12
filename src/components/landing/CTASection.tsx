import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTASection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-[hsl(var(--landing-cyan))]/10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />

      <div className="max-w-4xl mx-auto text-center relative">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          Ready to Transform Your{" "}
          <span className="bg-gradient-to-r from-primary to-[hsl(var(--landing-cyan))] bg-clip-text text-transparent">
            Customer Service Skills?
          </span>
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Join thousands of customer service professionals who are already leveling up with AI-powered training.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="h-14 px-10 text-lg bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 group"
          >
            <Link to="/register">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="text-sm text-muted-foreground">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>
    </section>
  );
}
