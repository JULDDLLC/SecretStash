import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';

const manrope = Manrope({ 
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope'
});

export const metadata: Metadata = {
  title: 'SecretStash - Secure Developer Vault',
  description: 'The ultimate vault for developers to securely store API keys, passwords, certificates, and sensitive data.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable}`}>{children}</body>
    </html>
  );
}