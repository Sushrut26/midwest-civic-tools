import type { Metadata } from 'next';
import BenefitsCliffClient from './BenefitsCliffClient';

export const metadata: Metadata = {
  title: 'Indiana Benefits Cliff Calculator 2026 — SNAP & Childcare Cutoffs',
  description:
    'See exactly where Indiana SNAP and childcare subsidies cut off based on your income and household size. Free 2026 Federal Poverty Level calculator. No account needed.',
  keywords: [
    'benefits cliff Indiana',
    'Indiana SNAP income limit 2026',
    'childcare subsidy cutoff Indiana',
    'Federal Poverty Level calculator Indiana',
    'SNAP benefits cliff 2026',
  ],
  alternates: {
    canonical: 'https://midwestcivictools.app/tools/benefits-cliff',
  },
  openGraph: {
    title: 'Indiana Benefits Cliff Calculator 2026',
    description: 'See exactly where your Indiana SNAP and childcare subsidies cut off.',
    url: 'https://midwestcivictools.app/tools/benefits-cliff',
  },
};

export default function BenefitsCliffPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Indiana Benefits Cliff Calculator',
    url: 'https://midwestcivictools.app/tools/benefits-cliff',
    description:
      'Visualize where Indiana SNAP and childcare subsidies cut off based on income and household size.',
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
      <BenefitsCliffClient />
    </>
  );
}
