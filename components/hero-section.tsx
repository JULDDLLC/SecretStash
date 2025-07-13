'use client';

import { Shield, Lock, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-3000" />
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-emerald-500/15 rounded-full blur-xl animate-pulse delay-4000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
            <Shield className="h-4 w-4 text-cyan-400" />
            <span className="text-sm text-cyan-300">Secure • Encrypted • Private</span>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Your Digital Life,
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animated-gradient-text animate-gradient-x drop-shadow-lg leading-tight">
              Perfectly Organized
            </span>
          </h1>

          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            SecretStash Multiverse is a privacy-first, all-in-one digital organization tool for developers, 
            engineers, and power users. Secure secrets vault, finance matrix, and universal snippet manager 
            with a playful, customizable cosmic interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white px-8 py-6 text-lg font-semibold shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <Link href="/auth">
                <Lock className="h-5 w-5 mr-2" />
                Start Securing Now
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
              asChild
            >
              <Link href="/pricing">
              <Zap className="h-5 w-5 mr-2" />
              View Pricing
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Shield, title: "Secure Vault", desc: "API keys, passwords & certificates" },
              { icon: Zap, title: "Finance Matrix", desc: "Track income, expenses & subscriptions" },
              { icon: CheckCircle2, title: "All-in-One", desc: "Your complete digital organizer" }
            ].map((feature, index) => (
              <div key={index} className="group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:transform hover:-translate-y-1">
                <div className="mb-4 inline-flex p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};