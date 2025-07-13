'use client';

import { Shield, Lock, Database, Eye, FileText, Scale } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Navbar } from '../../components/navbar';
import { ThemeProvider } from '../../contexts/theme-context';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 dark:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 light:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative z-10">
          <Navbar />
          
          <div className="container mx-auto px-4 py-12 max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mb-6">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-foreground mb-4">Terms & Conditions</h1>
              <p className="text-muted-foreground text-lg">
                Last updated: January 2025
              </p>
            </div>

            <div className="space-y-8">
              {/* Company Information */}
              <section className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-3 text-cyan-400" />
                  Company Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  SecretStash is operated by <strong>JULDD LLC</strong>, a limited liability company 
                  dedicated to providing secure, developer-friendly tools for managing sensitive information. 
                  By using SecretStash, you agree to these terms and conditions.
                </p>
              </section>

              {/* Data Storage & Privacy */}
              <section className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                  <Database className="h-6 w-6 mr-3 text-purple-400" />
                  Data Storage & Privacy
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      <strong className="text-green-300">Your Privacy is Protected</strong>
                    </div>
                    <p className="text-green-200">
                      All your secrets and sensitive data are stored locally in your browser's localStorage. 
                      No data is transmitted to our servers or any third-party services.
                    </p>
                  </div>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Local Storage Only:</strong> Your secrets never leave your device</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>No Server Communication:</strong> We don't collect, store, or transmit your data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Browser-Based Security:</strong> Data persists only in your current browser</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span><strong>Your Control:</strong> You can clear your data anytime through browser settings</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Demo Data Disclaimer */}
              <section className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-3 text-orange-400" />
                  Demo Data Disclaimer
                </h2>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Eye className="h-5 w-5 text-yellow-400" />
                    <strong className="text-yellow-300">Important Notice</strong>
                  </div>
                  <p className="text-yellow-200 leading-relaxed">
                    The application comes pre-loaded with sample secrets for demonstration purposes. 
                    These are <strong>dummy data examples</strong> and should not be used for real sensitive information. 
                    Please replace all demo data with your actual secrets or clear the application data to start fresh.
                  </p>
                </div>
              </section>

              {/* Terms of Use */}
              <section className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center">
                  <Lock className="h-6 w-6 mr-3 text-red-400" />
                  Terms of Use
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <h3 className="text-lg font-semibold text-foreground">Acceptable Use</h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Use SecretStash only for legitimate purposes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Do not use the service for illegal activities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Respect intellectual property rights</span>
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-foreground mt-6">Limitations</h3>
                  <ul className="space-y-2 ml-4">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Service provided "as is" without warranties</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>JULDD LLC not liable for data loss or security breaches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>Users responsible for backing up their data</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-8">
                <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms & Conditions, please contact JULDD LLC 
                  through the appropriate channels. We're committed to transparency and user privacy.
                </p>
              </section>
            </div>

            <div className="text-center mt-12">
              <Button asChild className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400">
                <Link href="/dashboard">
                  <Shield className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}