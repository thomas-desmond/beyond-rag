import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { I18nProvider } from '@/lib/i18n-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cloudflare AI Chat',
  description: 'Cloudflare AI Chat',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
