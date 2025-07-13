'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Eye, EyeOff, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';
import Link from 'next/link';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple demo authentication - in real app, this would be handled properly
    router.push('/dashboard');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
        <Navbar />
        
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="w-full max-w-md">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-gray-400">Sign in to access your secure vault</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-white mb-2 block">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-500/50"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-white mb-2 block">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-cyan-500/50"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 rounded border-white/20 bg-white/5 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-gray-400">Remember me</span>
                  </label>
                  <Link href="#" className="text-sm text-cyan-400 hover:text-cyan-300">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link href="/dashboard" className="text-cyan-400 hover:text-cyan-300 font-medium">
                    Get started for free
                  </Link>
                </p>
                <div className="mt-4">
                  <Link href="/terms" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </ThemeProvider>
  );
}