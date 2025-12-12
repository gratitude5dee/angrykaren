const stats = [
  { value: "3x", label: "Faster Skill Development" },
  { value: "40%", label: "Improvement in CSAT" },
  { value: "10k+", label: "CSRs Trained" },
  { value: "500+", label: "Scenarios Available" },
];

export default function StatsSection() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-[hsl(var(--landing-cyan))] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
