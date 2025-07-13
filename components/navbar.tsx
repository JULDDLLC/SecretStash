'use client';

import { useTheme } from '../contexts/theme-context';
import { Shield, Sun, Moon, LogOut, Settings, Calculator, Code } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  const isAuthenticated = pathname === '/dashboard' || pathname === '/finance';

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/10 border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
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
                className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                asChild
              >
                <Link href="/">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Link>
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                asChild
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/dashboard">Get Started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};