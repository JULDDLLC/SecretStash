'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ArrowRight, Crown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';
import Link from 'next/link';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a brief loading period to show the success animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
          <div className="relative z-10 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
            <p className="text-white text-lg">Processing your subscription...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
          <Navbar />
          
          <div className="container mx-auto px-4 py-12 pt-24">
            <div className="max-w-2xl mx-auto text-center">
              {/* Success Animation */}
              <div className="mb-8">
                <div className="inline-flex p-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 mb-6 animate-pulse">
                  <CheckCircle className="h-16 w-16 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  Welcome to the Multiverse!
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Your subscription has been successfully activated. You now have access to all SecretStash features.
                </p>
              </div>

              {/* Features Unlocked */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
                <div className="flex items-center justify-center mb-6">
                  <Crown className="h-8 w-8 text-cyan-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Features Unlocked</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  {[
                    'Secure secrets vault',
                    'Finance Matrix module',
                    'Universal snippets manager',
                    'Customizable cosmic interface',
                    'Advanced search & filters',
                    'Panic button security',
                    'Export to PDF/CSV',
                    '100% local storage'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Session Info */}
              {sessionId && (
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-8">
                  <p className="text-blue-300 text-sm">
                    <strong>Session ID:</strong> {sessionId}
                  </p>
                  <p className="text-blue-200 text-xs mt-1">
                    Save this for your records. You can find your subscription details in your dashboard.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-3 text-lg font-semibold"
                >
                  <Link href="/dashboard">
                    Start Using SecretStash
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
                
                <Button 
                  variant="outline"
                  asChild
                  className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 text-lg"
                >
                  <Link href="/settings">
                    Customize Your Vault
                  </Link>
                </Button>
              </div>

              {/* Welcome Message */}
              <div className="mt-12 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
                <p className="text-cyan-300 text-lg italic">
                  "Welcome to your cosmic journey through the SecretStash multiverse. Your secrets are now protected by the finest digital vault in existence."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}