'use client';

import { PricingCard } from '../../components/pricing/pricing-card';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';
import { products } from '../../src/stripe-config';
import { Calculator } from 'lucide-react';

export default function PricingPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
          <Navbar />
          
          <div className="container mx-auto px-4 py-12 pt-24">
            <div className="text-center mb-16">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-6">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Join the SecretStash Multiverse
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Privacy-first digital organization for developers, engineers, and power users. 
                Start your cosmic journey today.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              {products.map((product) => (
                <PricingCard 
                  key={product.id} 
                  product={product} 
                  isPopular={true}
                />
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-400">
                Secure checkout powered by Stripe. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}