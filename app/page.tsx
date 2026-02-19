import type { Metadata } from 'next';
import ToolCard from '@/components/ToolCard';

export const metadata: Metadata = {
  title: 'Midwest Civic Tools — Free Indiana & Midwest Tools for 2026',
  description:
    'Free calculators and guides for Indiana SNAP rules, Choice Scholarships, Benefits Cliff, Minimum Wage changes, and Data Privacy rights. Updated for 2026.',
  alternates: {
    canonical: 'https://midwestcivictools.app',
  },
};

const TOOLS = [
  {
    id: 'benefits-cliff',
    icon: '📉',
    title: 'Benefits Cliff Visualizer',
    description:
      'See exactly where Indiana SNAP and childcare subsidies cut off based on your income and household size.',
    href: '/tools/benefits-cliff',
    updated: 'Updated for 2026',
    tags: ['Indiana', 'SNAP', 'Childcare'],
  },
  {
    id: 'snap-checker',
    icon: '🛒',
    title: 'SNAP Eligibility Checker',
    description:
      'Instantly check whether a grocery item is SNAP eligible under Indiana\'s 2026 Smart SNAP waiver.',
    href: '/tools/snap-checker',
    updated: 'New Law 2026',
    tags: ['Indiana', 'SNAP', '2026'],
  },
  {
    id: 'scholarship-calc',
    icon: '🎓',
    title: 'Choice Scholarship Calculator',
    description:
      'Estimate your Indiana Choice Scholarship award. Income limits are scheduled to be removed starting June 29, 2026.',
    href: '/tools/scholarship-calc',
    updated: 'HEA 1001-2025',
    tags: ['Indiana', 'Education', 'Vouchers'],
  },
  {
    id: 'min-wage',
    icon: '💵',
    title: 'Minimum Wage Timeline',
    description:
      'Interactive chart of Michigan, Illinois, and Ohio minimum wage schedules through 2031, including tipped wage schedules.',
    href: '/tools/min-wage',
    updated: 'Updated for 2026',
    tags: ['Michigan', 'Illinois', 'Ohio'],
  },
  {
    id: 'data-rights',
    icon: '🔒',
    title: 'Data Rights Letter Generator',
    description:
      'Generate a free, legally formatted letter to exercise your Indiana Consumer Data Protection Act (ICDPA) rights.',
    href: '/tools/data-rights',
    updated: 'ICDPA 2026',
    tags: ['Indiana', 'Privacy', 'ICDPA'],
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-blue-50 to-[#f9fafb] border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-[#1a56db] rounded-full px-3 py-1 text-sm font-semibold mb-6">
              <span aria-hidden="true">🏛️</span> Free civic tools for Indiana and the Midwest
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Navigate Indiana&rsquo;s 2026 law changes —{' '}
              <span className="text-[#1a56db]">free tools for residents and small businesses</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
              Five tools covering SNAP eligibility, school vouchers, minimum wage, benefits cliffs, and your new data
              privacy rights.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#tools"
                className="inline-flex items-center gap-2 bg-[#1a56db] text-white rounded-xl px-5 py-3 text-sm font-semibold hover:bg-blue-700 transition-colors"
              >
                Explore Tools
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">All 5 Tools</h2>
          <span className="text-sm text-gray-500">Indiana &amp; Midwest — 2026</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              href={tool.href}
              updated={tool.updated}
              tags={tool.tags}
            />
          ))}
        </div>
      </section>

      {/* Law Changes section */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">What Changed in 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-100 rounded-xl p-5">
              <span className="text-2xl" aria-hidden="true">🎓</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-1">Universal School Choice</h3>
              <p className="text-sm text-gray-600">
                Under Indiana HEA 1001-2025, household income limits for Choice Scholarships are scheduled to be
                removed starting June 29, 2026.
              </p>
            </div>
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-5">
              <span className="text-2xl" aria-hidden="true">🛒</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-1">Smart SNAP Rules</h3>
              <p className="text-sm text-gray-600">
                Indiana&rsquo;s SNAP waiver took effect on January 1, 2026 and excludes candy and sugary drinks.
                FSSA lists a transition period through March 31, 2026.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
              <span className="text-2xl" aria-hidden="true">🔒</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-1">ICDPA Data Rights</h3>
              <p className="text-sm text-gray-600">
                The Indiana Consumer Data Protection Act (IC 24-15) took effect on January 1, 2026 and gives
                residents five rights over personal data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#1a56db] rounded-2xl p-8 text-center text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-3">
            All tools are free forever.
          </h2>
          <p className="text-blue-100 text-sm sm:text-base max-w-2xl mx-auto">
            Built for practical decision support with transparent assumptions and clearly labeled estimates.
          </p>
        </div>
      </section>
    </>
  );
}
