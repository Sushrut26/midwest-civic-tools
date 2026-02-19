import type { Metadata } from 'next';
import MinWageClient from './MinWageClient';

export const metadata: Metadata = {
  title: 'Michigan Illinois Ohio Minimum Wage 2026 — Schedule Through 2031',
  description:
    'See the full minimum wage schedule for Michigan, Illinois, and Ohio through 2031, including tipped wage schedules and projected values.',
  keywords: [
    'Michigan minimum wage 2026',
    'Illinois minimum wage increase schedule',
    'Ohio minimum wage 2026',
    'Michigan tipped wage schedule',
    'Midwest minimum wage 2026 2031',
    'minimum wage timeline chart',
  ],
  alternates: {
    canonical: 'https://midwestcivictools.app/tools/min-wage',
  },
  openGraph: {
    title: 'Midwest Minimum Wage Timeline 2026-2031',
    description: 'Full minimum wage schedule for Michigan, Illinois, and Ohio through 2031.',
    url: 'https://midwestcivictools.app/tools/min-wage',
  },
};

export default function MinWagePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Midwest Minimum Wage Timeline',
    url: 'https://midwestcivictools.app/tools/min-wage',
    description:
      'Interactive minimum wage chart for Michigan, Illinois, and Ohio through 2031.',
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
