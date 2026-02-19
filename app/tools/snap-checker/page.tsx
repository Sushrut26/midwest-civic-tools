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
    canonical: 'https://midwestcivictools.app/tools/snap-checker',
  },
  openGraph: {
    title: 'Indiana SNAP Eligibility Checker 2026',
    description: 'Instantly check if a grocery item is SNAP eligible under Indiana\'s 2026 waiver.',
    url: 'https://midwestcivictools.app/tools/snap-checker',
  },
};

export default function SNAPCheckerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Indiana SNAP Eligibility Checker',
    url: 'https://midwestcivictools.app/tools/snap-checker',
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
