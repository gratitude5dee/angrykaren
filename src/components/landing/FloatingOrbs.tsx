export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Primary glow orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-float"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)",
          top: "10%",
          left: "15%",
        }}
      />
      
      {/* Cyan accent orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20 blur-[100px] animate-float-slow"
        style={{
          background: "radial-gradient(circle, hsl(var(--landing-cyan)) 0%, transparent 70%)",
          top: "50%",
          right: "10%",
          animationDelay: "-2s",
        }}
      />
      
      {/* Small accent orb */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-25 blur-[80px] animate-float-slower"
        style={{
          background: "radial-gradient(circle, hsl(var(--landing-glow)) 0%, transparent 70%)",
          bottom: "20%",
          left: "30%",
          animationDelay: "-4s",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
