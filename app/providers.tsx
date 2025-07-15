'use client';

import { ThemeProvider } from '@/contexts/theme-context'; // ✅ MUST match your export

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}