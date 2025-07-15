'use client';

import { useEffect } from 'react';
import { TestimonialsTicker } from '../components/TestimonialsTicker';
import { HeroSection } from '../components/hero-section';
import { FeaturesSection } from '../components/features-section';
import { PricingSection } from '../components/pricing-section';
import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { ThemeProvider } from '../contexts/theme-context';

export default function Home() {
  useEffect(() => {
    // 🥚 SecretStash Easter Egg 🥚
    console.log(
      '%c👀 Julie sees you poking around in the code... she approves. Keep it cosmic, dev traveler. 🌌',
      'color: #0ff; font-weight: bold; background: #222; padding: 6px; border-radius: 4px;'
    );
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background cosmic-background relative">
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300 pointer-events-none z-0" />

        {/* Floating Particles */}
        <div className="floating-particles pointer-events-none z-0">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="particle"></div>
          ))}
        </div>

        {/* Page content */}
        <div className="cosmic-content relative z-10">
          <Navbar />
          <main className="pt-20">
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <TestimonialsTicker />
          </main>
          <Footer />
        </div>
      </div>
    </ThemeProvider>
  );
}