import './globals.css';
import type { Metadata } from 'next';
<<<<<<< HEAD
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'SecretStash',
  description: 'Your local secrets vault for developers. Built by JULDD LLC.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" sizes="600x600" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
=======
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
>>>>>>> 3f405ad5be1c4f87915b3a52b7aba4e9289950ff
    </html>
  );
}