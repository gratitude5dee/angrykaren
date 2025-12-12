import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/25 group-hover:shadow-primary/40 transition-shadow">
            <span className="text-xl font-bold text-primary-foreground">S</span>
          </div>
          <span className="text-xl font-semibold text-foreground">Simulate</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#personas" className="text-muted-foreground hover:text-foreground transition-colors">
            Personas
          </a>
          <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
            <Link to="/login">Sign In</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
            <Link to="/register">Get Started</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
