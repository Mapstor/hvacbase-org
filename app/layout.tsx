import './globals.css';
import type { Metadata } from 'next';
import Script from 'next/script';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { generateWebSiteSchema } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL('https://hvacbase.org'),
  title: {
    default: 'HVAC Base — Data-Driven HVAC Guides, Calculators & Comparisons',
    template: '%s | HVAC Base',
  },
  description:
    'Expert HVAC guides with interactive calculators, specs-driven comparisons, and data-backed recommendations for air conditioners, heat pumps, furnaces, and home energy efficiency.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hvacbase.org',
    siteName: 'HVAC Base',
    title: 'HVAC Base — Your Comprehensive HVAC Knowledge Resource',
    description: 'Expert HVAC guides with 339+ articles, 15+ interactive calculators, and unbiased recommendations for all your heating and cooling needs.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'HVACBase.org - Your Comprehensive HVAC Knowledge Resource',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HVAC Base — Data-Driven HVAC Guides & Calculators',
    description: 'Expert HVAC guides with interactive calculators and unbiased recommendations.',
    images: ['/og-image.svg'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const siteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0891B2" />
        <meta name="google-site-verification" content="google12f8c2f9c03913a3" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
      </head>
      <body className="font-sans antialiased">
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-ZCKSNVFR5V"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ZCKSNVFR5V');
            `,
          }}
        />
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
