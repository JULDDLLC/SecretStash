'use client';

import { HeroSection } from '../components/hero-section';
import { FeaturesSection } from '../components/features-section';
import { PricingSection } from '../components/pricing-section';
import { Navbar } from '../components/navbar';
import { ThemeProvider } from '../contexts/theme-context';
import Link from 'next/link';

export default function Home() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background cosmic-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        
        {/* Floating Particles */}
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="cosmic-content">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <PricingSection />
        </main>
        
        <footer className="py-12 border-t border-white/10">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center space-x-6 mb-4">
              <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/terms#privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </Link>
            </div>
            <p className="text-gray-400">
              © 2025 SecretStash by JULDD LLC. Built with ❤️ for developers.
            </p>
          </div>
        </footer>
        </div>
      </div>
    </ThemeProvider>
  );
}