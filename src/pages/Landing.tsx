import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SplashScreen from "@/components/landing/SplashScreen";
import Navbar from "@/components/landing/Navbar";
import FloatingOrbs from "@/components/landing/FloatingOrbs";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import StatsSection from "@/components/landing/StatsSection";
import PersonasPreview from "@/components/landing/PersonasPreview";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

export default function Landing() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Check if splash has been shown this session
  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");
    if (splashShown) {
      setShowSplash(false);
      setContentVisible(true);
    }
  }, []);

  // Handle splash completion
  const handleSplashComplete = () => {
    sessionStorage.setItem("splashShown", "true");
    setShowSplash(false);
    setTimeout(() => setContentVisible(true), 100);
  };

  // Redirect if logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  // Handle keyboard skip
  useEffect(() => {
    const handleKeyDown = () => {
      if (showSplash) {
        handleSplashComplete();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSplash]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[hsl(var(--landing-bg))] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--landing-bg))] text-foreground overflow-x-hidden dark">
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}

      {/* Main Content */}
      <div className={`transition-opacity duration-700 ${contentVisible ? "opacity-100" : "opacity-0"}`}>
        {/* Background */}
        <FloatingOrbs />

        {/* Navigation */}
        <Navbar />

        {/* Hero */}
        <HeroSection isVisible={contentVisible} />

        {/* Stats */}
        <StatsSection />

        {/* Features */}
        <FeaturesSection />

        {/* Personas Preview */}
        <PersonasPreview />

        {/* CTA */}
        <CTASection />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
