'use client';

import { useState } from 'react';
import { AuthForm } from '../../components/auth/auth-form';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';

export default function AuthPage() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const toggleMode = () => {
    setMode(prev => prev === 'signin' ? 'signup' : 'signin');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
          <Navbar />
          
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 pt-20">
            <AuthForm mode={mode} onToggleMode={toggleMode} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}