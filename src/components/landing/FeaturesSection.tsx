import { Bot, Target, TrendingUp, Shield, Zap, Users } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Personas",
      description: "Train with diverse, realistic customer personalities that adapt to your responses in real-time.",
      gradient: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--landing-glow)) 100%)",
    },
    {
      icon: Target,
      title: "Scenario-Based Learning",
      description: "Practice complaint resolution, upselling, de-escalation, and more with targeted exercises.",
      gradient: "linear-gradient(135deg, hsl(var(--landing-cyan)) 0%, hsl(195 80% 40%) 100%)",
    },
    {
      icon: TrendingUp,
      title: "Real-Time Feedback",
      description: "Get instant performance insights and actionable recommendations after every session.",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    },
    {
      icon: Shield,
      title: "Safe Practice Environment",
      description: "Make mistakes and learn without impacting real customers or your performance metrics.",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    },
    {
      icon: Zap,
      title: "Accelerated Growth",
      description: "Compress months of experience into weeks with focused, intensive training scenarios.",
      gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
    },
    {
      icon: Users,
      title: "Team Analytics",
      description: "Track team progress, identify skill gaps, and benchmark performance across your organization.",
      gradient: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
    },
  ];

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to Excel
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete training platform designed to transform your customer service skills through realistic practice and data-driven insights.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
