'use client';

import { useState } from 'react';
import { Settings, Palette, User, Shield, Download, Upload, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';

export default function SettingsPage() {
  const [vaultName, setVaultName] = useState('My SecretStash');
  const [selectedAvatar, setSelectedAvatar] = useState('cosmic');
  const [selectedTheme, setSelectedTheme] = useState('cosmic-dark');
  const [selectedBackground, setSelectedBackground] = useState('nebula');

  const avatars = [
    { id: 'cosmic', name: 'Cosmic Guardian', emoji: '🌌' },
    { id: 'shield', name: 'Security Shield', emoji: '🛡️' },
    { id: 'key', name: 'Key Master', emoji: '🗝️' },
    { id: 'star', name: 'Star Navigator', emoji: '⭐' },
    { id: 'lock', name: 'Vault Keeper', emoji: '🔒' },
    { id: 'gem', name: 'Crystal Sage', emoji: '💎' }
  ];

  const themes = [
    { id: 'cosmic-dark', name: 'Cosmic Dark', preview: 'from-gray-900 to-black' },
    { id: 'cosmic-blue', name: 'Cosmic Blue', preview: 'from-blue-900 to-indigo-900' },
    { id: 'cosmic-purple', name: 'Cosmic Purple', preview: 'from-purple-900 to-pink-900' },
    { id: 'cosmic-green', name: 'Cosmic Green', preview: 'from-green-900 to-emerald-900' },
    { id: 'light-mode', name: 'Light Mode', preview: 'from-gray-100 to-white' }
  ];

  const backgrounds = [
    { id: 'nebula', name: 'Nebula Storm', preview: 'Swirling cosmic clouds' },
    { id: 'starfield', name: 'Starfield', preview: 'Twinkling stars' },
    { id: 'galaxy', name: 'Galaxy Spiral', preview: 'Spiral galaxy arms' },
    { id: 'aurora', name: 'Aurora Lights', preview: 'Dancing light waves' },
    { id: 'minimal', name: 'Minimal', preview: 'Clean and simple' }
  ];

  const handleExportSettings = () => {
    const settings = {
      vaultName,
      selectedAvatar,
      selectedTheme,
      selectedBackground,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'secretstash-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
          <Navbar />
          
          <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-4">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-2">Vault Settings</h1>
              <p className="text-muted-foreground text-lg">
                Customize your SecretStash multiverse experience
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Personalization Section */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20">
                    <Sparkles className="h-6 w-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Personalization</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Vault Name */}
                  <div>
                    <Label htmlFor="vaultName" className="text-white mb-2 block">
                      Vault Name
                    </Label>
                    <Input
                      id="vaultName"
                      value={vaultName}
                      onChange={(e) => setVaultName(e.target.value)}
                      className="bg-white/5 border-white/10 text-white"
                      placeholder="My SecretStash"
                    />
                  </div>

                  {/* Avatar Selection */}
                  <div>
                    <Label className="text-white mb-2 block">
                      Multiverse Guide
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {avatars.map((avatar) => (
                        <button
                          key={avatar.id}
                          onClick={() => setSelectedAvatar(avatar.id)}
                          className={`p-3 rounded-lg border transition-all duration-300 ${
                            selectedAvatar === avatar.id
                              ? 'border-cyan-500 bg-cyan-500/20'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="text-2xl mb-1">{avatar.emoji}</div>
                          <div className="text-xs text-gray-300">{avatar.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Customization */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20">
                    <Palette className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Theme & Appearance</h2>
                </div>

                <div className="space-y-6">
                  {/* Theme Selection */}
                  <div>
                    <Label className="text-white mb-3 block">
                      Color Theme
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setSelectedTheme(theme.id)}
                          className={`p-4 rounded-lg border transition-all duration-300 ${
                            selectedTheme === theme.id
                              ? 'border-cyan-500 bg-cyan-500/20'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className={`h-8 w-full rounded bg-gradient-to-r ${theme.preview} mb-2`} />
                          <div className="text-sm text-white">{theme.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Background Selection */}
                  <div>
                    <Label className="text-white mb-3 block">
                      Universe Background
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {backgrounds.map((bg) => (
                        <button
                          key={bg.id}
                          onClick={() => setSelectedBackground(bg.id)}
                          className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                            selectedBackground === bg.id
                              ? 'border-cyan-500 bg-cyan-500/20'
                              : 'border-white/10 bg-white/5 hover:border-white/20'
                          }`}
                        >
                          <div className="text-white font-medium">{bg.name}</div>
                          <div className="text-sm text-gray-400">{bg.preview}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Backup & Security */}
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20">
                    <Shield className="h-6 w-6 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-semibold text-white">Backup & Security</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    onClick={handleExportSettings}
                    variant="outline"
                    className="border-green-500/50 text-green-400 hover:bg-green-500/10"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Import Settings
                  </Button>
                </div>
              </div>

              {/* Save Changes */}
              <div className="text-center">
                <Button
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-3"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}