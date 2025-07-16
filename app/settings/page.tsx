'use client';

import React, { useState } from 'react';
import { useTheme } from '@/contexts/theme-context';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Download, Upload } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [vaultName, setVaultName] = useState('My Secret Vault');
  const [enableGuide, setEnableGuide] = useState(true);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleExportSettings = () => {
    const settings = { vaultName, theme, enableGuide };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'secret-stash-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files?.length) {
      fileReader.onload = event => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          if (imported.vaultName) setVaultName(imported.vaultName);
          if (imported.theme) setTheme(imported.theme);
          if (typeof imported.enableGuide === 'boolean') setEnableGuide(imported.enableGuide);
        } catch (err) {
          console.error('Import failed:', err);
        }
      };
      fileReader.readAsText(e.target.files[0]);
    }
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <div className="space-y-2">
          <Label htmlFor="vaultName">Vault Name</Label>
          <Input id="vaultName" value={vaultName} onChange={e => setVaultName(e.target.value)} placeholder="Name your stash..." />
        </div>
        <div className="flex items-center justify-between">
          <Label>Theme: {theme === 'dark' ? 'Dark' : 'Light'}</Label>
          <Switch checked={theme === 'dark'} onCheckedChange={handleThemeToggle} />
        </div>
        <div className="flex items-center justify-between">
          <Label>Enable Multiverse Guide</Label>
          <Switch checked={enableGuide} onCheckedChange={setEnableGuide} />
        </div>
        <div className="flex flex-col md:flex-row gap-4 pt-6">
          <Button variant="outline" onClick={handleExportSettings} className="flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Settings
          </Button>
          <Label className="flex items-center gap-2 cursor-pointer">
            <Upload className="w-4 h-4" /> Import Settings
            <Input type="file" accept="application/json" onChange={handleImportSettings} className="hidden" />
          </Label>
        </div>
      </div>
    </div>
  );
}
