'use client';

import { Key, FileText, Search, Download, Shield, Zap, Users, Cloud } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: Key,
      title: "Secure Vault",
      description: "Store API keys, passwords, certificates, and tokens with 100% local storage security.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: FileText,
      title: "Finance Matrix",
      description: "Track income streams, expense flows, and net worth in one unified cosmic dashboard.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Universal Snippets",
      description: "Manage code snippets, templates, and AI prompts with intelligent organization.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Privacy-first design - your data never leaves your device. No servers, no tracking.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Palette,
      title: "Cosmic Interface",
      description: "Playful, customizable cosmic interface with themes, avatars, and smooth animations.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Search,
      title: "Smart Search",
      description: "Find anything instantly with powerful search, filtering, and intelligent categorization.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant loading, smooth performance, and responsive design across all devices.",
      gradient: "from-teal-500 to-cyan-500"
    },
    {
      icon: Download,
      title: "Export & Backup",
      description: "Export your data to PDF or CSV for secure backups and comprehensive reporting.",
      gradient: "from-rose-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Everything You Need
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Powerful features designed to make secret management<br />effortless and secure
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className={`mb-4 inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};