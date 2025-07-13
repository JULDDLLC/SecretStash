'use client';

import { Check, Crown } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export const PricingSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            One powerful plan that grows with you. Upgrade or downgrade at any time.
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="relative p-8 rounded-2xl backdrop-blur-sm border-2 bg-gradient-to-b from-white/10 to-white/5 border-cyan-500/50 shadow-cyan-500/25 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                Simple Pricing
              </div>
            </div>

            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 bg-opacity-20 mb-4">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-muted-foreground mb-4">For serious developers and teams</p>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-white">$4.97</span>
                <span className="text-muted-foreground ml-2">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                "Unlimited secrets",
                "Finance Matrix module",
                "Smart health insights",
                "Panic button security",
                "Custom themes & avatars",
                "Advanced search & filters",
                "Finance Matrix module",
                "Priority support",
                "Export to PDF/CSV",
                "Backup & restore"
              ].map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/dashboard">
                Start Your Journey
              </Link>
            </Button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            7-day free trial included. No credit card required to start.
          </p>
        </div>
      </div>
    </section>
  );
};