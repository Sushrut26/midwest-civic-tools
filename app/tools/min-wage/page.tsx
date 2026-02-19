import type { Metadata } from 'next';
import MinWageClient from './MinWageClient';

export const metadata: Metadata = {
  title: 'Indiana, Michigan, Illinois, Ohio Minimum Wage 2026 — Schedule Through 2031',
  description:
    'See the full minimum wage schedule for Indiana, Michigan, Illinois, and Ohio through 2031, including tipped wage schedules and projected values.',
  keywords: [
    'Indiana minimum wage 2026',
    'Michigan minimum wage 2026',
    'Illinois minimum wage increase schedule',
    'Ohio minimum wage 2026',
    'Indiana tipped wage 2026',
    'Michigan tipped wage schedule',
    'Midwest minimum wage 2026 2031',
    'minimum wage timeline chart',
  ],
  alternates: {
    canonical: 'https://civic-tools.com/tools/min-wage',
  },
  openGraph: {
    type: 'website',
    siteName: 'Midwest Civic Tools',
    locale: 'en_US',
    title: 'Midwest Minimum Wage Timeline 2026-2031',
    description: 'Full minimum wage schedule for Indiana, Michigan, Illinois, and Ohio through 2031.',
    url: 'https://civic-tools.com/tools/min-wage',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Midwest Minimum Wage Timeline',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midwest Minimum Wage Timeline 2026-2031',
    description: 'Compare Indiana, Michigan, Illinois, and Ohio wages through 2031.',
    images: ['/og-image.svg'],
  },
};

export default function MinWagePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Midwest Minimum Wage Timeline',
    url: 'https://civic-tools.com/tools/min-wage',
    description:
      'Interactive minimum wage chart for Indiana, Michigan, Illinois, and Ohio through 2031.',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <MinWageClient />
    </>
  );
}
