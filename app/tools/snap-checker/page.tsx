import type { Metadata } from 'next';
import SNAPCheckerClient from './SNAPCheckerClient';

export const metadata: Metadata = {
  title: 'Indiana SNAP Eligible Foods 2026 — Eligibility Checker',
  description:
    'Is your grocery item SNAP eligible in Indiana under the 2026 waiver? Check candy, drinks, snacks, and gray-area items instantly.',
  keywords: [
    'Indiana SNAP eligible food 2026',
    'Smart SNAP Indiana',
    'SNAP candy rule Indiana',
    'SNAP ineligible foods Indiana 2026',
    'SNAP sugary drinks Indiana',
  ],
  alternates: {
    canonical: 'https://civic-tools.com/tools/snap-checker',
  },
  openGraph: {
    type: 'website',
    siteName: 'Midwest Civic Tools',
    locale: 'en_US',
    title: 'Indiana SNAP Eligibility Checker 2026',
    description: 'Instantly check if a grocery item is SNAP eligible under Indiana\'s 2026 waiver.',
    url: 'https://civic-tools.com/tools/snap-checker',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Indiana SNAP Eligibility Checker',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indiana SNAP Eligibility Checker 2026',
    description: 'Search grocery items and check Indiana SNAP eligibility under 2026 waiver rules.',
    images: ['/og-image.svg'],
  },
};

export default function SNAPCheckerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Indiana SNAP Eligibility Checker',
    url: 'https://civic-tools.com/tools/snap-checker',
    description:
      'Check SNAP eligibility for food items under Indiana\'s 2026 SNAP waiver rules.',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <SNAPCheckerClient />
    </>
  );
}
