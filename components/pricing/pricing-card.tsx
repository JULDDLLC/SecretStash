'use client';

import { useState } from 'react';
import { Check, Crown, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { createCheckoutSession } from '../../lib/stripe';
import type { Product } from '../../src/stripe-config';

interface PricingCardProps {
  product: Product;
  isPopular?: boolean;
}

export const PricingCard = ({ product, isPopular = false }: PricingCardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const checkoutUrl = await createCheckoutSession(product.priceId, product.mode);
      window.location.href = checkoutUrl;
    } catch (error: any) {
      console.error('Checkout error:', error);
      alert(error.message || 'Failed to start checkout process');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price);
  };

  const features = [
    "Unlimited secrets",
    "Finance Matrix module",
    "Smart health insights",
    "Panic button security",
    "Custom themes & avatars",
    "Advanced search & filters",
    "Code snippets & AI prompts",
    "Priority support",
    "Export to PDF/CSV",
    "Backup & restore"
  ];

  return (
    <div className={`relative p-8 rounded-2xl backdrop-blur-sm border-2 bg-gradient-to-b from-white/10 to-white/5 transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 ${
      isPopular 
        ? 'border-cyan-500/50 shadow-cyan-500/25' 
        : 'border-white/20 hover:border-cyan-500/30'
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            Exclusive Beta Price 
          </div>
        </div>
      )}

      <div className="text-center mb-8">
        <div className="inline-flex p-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 bg-opacity-20 mb-4">
          <Crown className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
        <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{product.description}</p>
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-4xl font-bold text-white">{formatPrice(product.price, product.currency)}</span>
          {product.interval && (
            <span className="text-muted-foreground ml-2">/{product.interval}</span>
          )}
        </div>
      </div>

      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
            <span className="text-muted-foreground">{feature}</span>
          </li>
        ))}
      </ul>

      <Button 
        onClick={handleSubscribe}
        disabled={isLoading}
        className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          'Start Your Journey'
        )}
      </Button>
    </div>
  );
};