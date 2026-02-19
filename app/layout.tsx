import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

function getMetadataBase(): URL {
  const fallback = 'https://midwestcivictools.app';
  const rawSiteUrl = process.env.SITE_URL?.trim();

  if (!rawSiteUrl) return new URL(fallback);

  const normalized = rawSiteUrl.startsWith('http://') || rawSiteUrl.startsWith('https://')
    ? rawSiteUrl
    : `https://${rawSiteUrl}`;

  try {
    return new URL(normalized);
  } catch {
    return new URL(fallback);
  }
}

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: {
    default: 'Midwest Civic Tools — Free Indiana & Midwest Tools for 2026',
    template: '%s | Midwest Civic Tools',
  },
  description:
    'Free calculators and guides for Indiana SNAP rules, Choice Scholarships, Benefits Cliff, Minimum Wage changes, and Data Privacy rights. Updated for 2026.',
  keywords: [
    'Indiana civic tools',
    'SNAP eligibility Indiana 2026',
    'Indiana Choice Scholarship calculator',
    'benefits cliff Indiana',
    'minimum wage Midwest 2026',
    'Indiana data privacy rights ICDPA',
    'free Indiana tools',
  ],
  authors: [{ name: 'Midwest Civic Tools' }],
  creator: 'Midwest Civic Tools',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://midwestcivictools.app',
    siteName: 'Midwest Civic Tools',
    title: 'Midwest Civic Tools — Free Indiana & Midwest Tools for 2026',
    description:
      'Free calculators and guides for Indiana SNAP rules, Choice Scholarships, Benefits Cliff, Minimum Wage, and Data Privacy rights.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Midwest Civic Tools',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midwest Civic Tools — Free Indiana & Midwest Tools for 2026',
    description:
      'Free calculators and guides for SNAP, school vouchers, benefits cliffs, minimum wage, and data privacy.',
    images: ['/og-image.svg'],
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Midwest Civic Tools',
    url: 'https://midwestcivictools.app',
    description:
      'Free civic tools for Indiana and Midwest residents. SNAP eligibility, school vouchers, benefits cliff, minimum wage timeline, and data privacy rights.',
    publisher: {
      '@type': 'Organization',
      name: 'Midwest Civic Tools',
      url: 'https://midwestcivictools.app',
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={`${inter.className} bg-[#f9fafb] text-gray-900 antialiased`}>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
