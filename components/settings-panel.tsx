'use client';

import { useTheme } from '../contexts/theme-context';
import { Button } from './ui/button';

export function SettingsPanel() {
  const { theme, toggleTheme } = useTheme();

  return (
    <section className="p-6 rounded-lg bg-card shadow-md text-card-foreground border border-border">
      <h2 className="text-lg font-bold mb-4">Theme Settings</h2>
      <div className="flex items-center space-x-4">
        <span>Current Theme:</span>
        <span className="font-mono">{theme}</span>
        <Button variant="outline" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </div>
    </section>
  );
}