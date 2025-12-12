import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const personas = [
  {
    name: "Angry Karen",
    role: "Retail Customer",
    difficulty: "Hard",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "Tech-Confused Tom",
    role: "Senior Customer",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    name: "Enterprise Eva",
    role: "VP of Operations",
    difficulty: "Expert",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
];

export default function PersonasPreview() {
  return (
    <section id="personas" className="py-24 px-6 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Your Training Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practice with AI personas modeled after real customer archetypes. Each one brings unique challenges to help you grow.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {personas.map((persona, index) => (
            <div
              key={persona.name}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${persona.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={persona.image}
                  alt={persona.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>

              {/* Content */}
              <div className="relative p-6 -mt-8">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{persona.name}</h3>
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                    {persona.difficulty}
                  </span>
                </div>
                <p className="text-muted-foreground">{persona.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-primary/50 hover:bg-primary/10 group"
          >
            <Link to="/register">
              Explore All Personas
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
