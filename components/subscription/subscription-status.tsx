'use client';

import { useEffect, useState } from 'react';
import { Crown, Calendar, CreditCard, AlertCircle } from 'lucide-react';
import { getSubscriptionPlan } from '../../lib/stripe';
import type { SubscriptionData } from '../../lib/stripe';
import type { Product } from '../../src/stripe-config';

interface SubscriptionPlan extends SubscriptionData {
  product?: Product;
}

export const SubscriptionStatus = () => {
  const [subscription, setSubscription] = useState<SubscriptionPlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const plan = await getSubscriptionPlan();
        setSubscription(plan);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-white/10 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-white/10 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (!subscription || !subscription.product) {
    return (
      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-4 w-4 text-yellow-400" />
          <span className="text-sm text-gray-300">No active subscription</span>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-400';
      case 'trialing':
        return 'text-blue-400';
      case 'past_due':
        return 'text-yellow-400';
      case 'canceled':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Crown className="h-4 w-4 text-cyan-400" />
          <span className="font-medium text-white">{subscription.product.name}</span>
        </div>
        <span className={`text-sm font-medium ${getStatusColor(subscription.subscription_status)}`}>
          {subscription.subscription_status.replace('_', ' ').toUpperCase()}
        </span>
      </div>
      
      <div className="space-y-2 text-sm text-gray-400">
        {subscription.current_period_end && (
          <div className="flex items-center space-x-2">
            <Calendar className="h-3 w-3" />
            <span>
              {subscription.cancel_at_period_end ? 'Expires' : 'Renews'} on{' '}
              {formatDate(subscription.current_period_end)}
            </span>
          </div>
        )}
        
        {subscription.payment_method_brand && subscription.payment_method_last4 && (
          <div className="flex items-center space-x-2">
            <CreditCard className="h-3 w-3" />
            <span>
              {subscription.payment_method_brand.toUpperCase()} •••• {subscription.payment_method_last4}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};