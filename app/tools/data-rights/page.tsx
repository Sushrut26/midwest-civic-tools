import type { Metadata } from 'next';
import DataRightsClient from './DataRightsClient';

export const metadata: Metadata = {
  title: 'Indiana Data Privacy Rights 2026 — ICDPA Request Letter Generator',
  description:
    'Generate a free, legally formatted letter to exercise your Indiana Consumer Data Protection Act (ICDPA) rights: delete your data, access your data, or opt out of data sales. Free, no account needed.',
  keywords: [
    'Indiana Consumer Data Protection Act 2026',
    'ICDPA rights Indiana',
    'right to delete data Indiana',
    'opt out data sale Indiana',
    'IC 24-15 data rights',
    'Indiana data privacy letter',
  ],
  alternates: {
    canonical: 'https://civic-tools.com/tools/data-rights',
  },
  openGraph: {
    type: 'website',
    siteName: 'Midwest Civic Tools',
    locale: 'en_US',
    title: 'Indiana ICDPA Data Rights Letter Generator 2026',
    description: 'Generate a free letter to exercise your Indiana data privacy rights. No account needed.',
    url: 'https://civic-tools.com/tools/data-rights',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Indiana ICDPA Data Rights Letter Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Indiana ICDPA Data Rights Letter Generator 2026',
    description: 'Generate request letters for access, delete, correction, portability, or opt-out rights.',
    images: ['/og-image.svg'],
  },
};

export default function DataRightsPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Indiana ICDPA Data Rights Letter Generator',
    url: 'https://civic-tools.com/tools/data-rights',
    description:
      'Generate professionally formatted letters to exercise Indiana Consumer Data Protection Act rights.',
    applicationCategory: 'LegalApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DataRightsClient />
    </>
  );
}
