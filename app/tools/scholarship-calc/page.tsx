import type { Metadata } from 'next';
import ScholarshipClient from './ScholarshipClient';

export const metadata: Metadata = {
  title: 'Indiana Choice Scholarship Calculator 2026-27 — Voucher Estimator',
  description:
    'Estimate your Indiana Choice Scholarship award for 2026-27. Indiana HEA 1001-2025 schedules income-limit removal starting June 29, 2026.',
  keywords: [
    'Indiana Choice Scholarship 2026',
    'Indiana school voucher calculator',
    'Universal Choice Indiana 2026',
    'Indiana school voucher amount',
    'Indiana private school voucher',
  ],
  alternates: {
    canonical: 'https://civic-tools.com/tools/scholarship-calc',
  },
  openGraph: {
    type: 'website',
    siteName: 'Midwest Civic Tools',
    locale: 'en_US',
    title: 'Indiana Choice Scholarship Calculator 2026-27',
    description: 'Estimate your Indiana school choice scholarship award for the 2026-27 school year.',
    url: 'https://civic-tools.com/tools/scholarship-calc',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Indiana Choice Scholarship Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indiana Choice Scholarship Calculator 2026-27',
    description: 'Estimate Indiana Choice Scholarship awards by county and school corporation.',
    images: ['/og-image.svg'],
  },
};

export default function ScholarshipPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Indiana Choice Scholarship Calculator',
    url: 'https://civic-tools.com/tools/scholarship-calc',
    description:
      'Estimate Indiana Choice Scholarship awards with county and school-corporation selection.',
    applicationCategory: 'EducationApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ScholarshipClient />
    </>
  );
}
