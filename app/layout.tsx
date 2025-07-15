import './globals.css';
import type { Metadata } from 'next';
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
    </html>
  );
}