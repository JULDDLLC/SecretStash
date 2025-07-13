'use client';

import { PricingCard } from './pricing/pricing-card';
import { products } from '../src/stripe-config';

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
            7-day free trial included. No credit card required to start.
          </p>
        </div>
      </div>
    </section>
  );
};