'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '../contexts/theme-context';
import { Shield, Sun, Moon, LogOut, Settings, Calculator, Code, User } from 'lucide-react';
import { Button } from './ui/button';
import { SubscriptionStatus } from './subscription/subscription-status';
import { getCurrentUser, signOut } from '../lib/auth';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { AuthUser } from '../lib/auth';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isAuthenticated = !!user;
  const isAuthPage = pathname === '/auth';
  const isPricingPage = pathname === '/pricing';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 group-hover:from-cyan-400 group-hover:to-purple-400 transition-all duration-300">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent tracking-tight">
              SecretStash
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-white/10 transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
            </Button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* Subscription Status */}
                <div className="hidden md:block">
                  <SubscriptionStatus />
                </div>

                {/* Navigation Links */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  asChild
                >
                  <Link href="/snippets">
                    <Code className="h-4 w-4 mr-2" />
                    Snippets
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  asChild
                >
                  <Link href="/finance">
                    <Calculator className="h-4 w-4 mr-2" />
                    Finance Matrix
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-colors"
                  asChild
                >
                  <Link href="/dashboard">
                    <Shield className="h-4 w-4 mr-2" />
                    Secrets
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-white/10 transition-colors"
                  asChild
                >
                  <Link href="/settings">
                    <Settings className="h-5 w-5 text-gray-400" />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSignOut}
                  className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {!isPricingPage && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                    asChild
                  >
                    <Link href="/pricing">Pricing</Link>
                  </Button>
                )}
                {!isAuthPage && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                      asChild
                    >
                      <Link href="/auth">
                        <User className="h-4 w-4 mr-2" />
                        Sign In
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                      asChild
                    >
                      <Link href="/auth">Get Started</Link>
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};