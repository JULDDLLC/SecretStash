'use client';

import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="py-12 border-t border-white/10">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4 flex-wrap text-sm">
          <Link href="/terms" className="text-gray-400 hover:text-cyan-400 transition-colors">
            Terms & Conditions
          </Link>
          <Link href="/terms#privacy" className="text-gray-400 hover:text-cyan-400 transition-colors">
            Privacy Policy
          </Link>
          <Link href="https://juldd.me" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
            juldd.me
          </Link>
          <Link href="https://x.com/JULDDLLC" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
            X / @JULDDLLC
          </Link>
          <Link href="https://github.com/JULDDLLC" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
            GitHub
          </Link>
          <Link href="https://julddmedia.com" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
            julddmedia.com
          </Link>
          <Link href="https://pastportai.com" target="_blank" className="text-gray-400 hover:text-cyan-400 transition-colors">
            pastportai.com
          </Link>
        </div>
        <p className="text-gray-400">
          © 2025 SecretStash by JULDD LLC. Built with ❤️ for developers.
        </p>
      </div>
    </footer>
  );
};