import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Smart Investment Gateway | Investment & Economic Advisory',
  description: 'Smart Investment Gateway (SIG) - Investment promotion, FDI services, economic advisory, and capability building for Oman and beyond.',
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
  authors: [{ name: 'Smart Investment Gateway' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.omaninvestgateway.com',
    siteName: 'Smart Investment Gateway',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
