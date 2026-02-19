'use client';

import { useState, useMemo } from 'react';
import Badge from '@/components/Badge';
import { SNAP_ITEMS } from '@/data/snap-items';
import type { SNAPCategory, SNAPStatus } from '@/types';

type FilterCategory = 'All' | SNAPCategory;
type FilterStatus = 'All' | SNAPStatus;

const CATEGORY_FILTERS: FilterCategory[] = [
  'All', 'Beverages', 'Snacks', 'Candy', 'Dairy', 'Frozen', 'Supplements', 'Staples', 'Baby',
];

export default function SNAPCheckerClient() {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('All');
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('All');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filtered = useMemo(() => {
    return SNAP_ITEMS.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
      return matchesQuery && matchesStatus && matchesCategory;
    });
  }, [query, statusFilter, categoryFilter]);

  const eligibleCount = SNAP_ITEMS.filter((i) => i.status === 'eligible').length;
  const notEligibleCount = SNAP_ITEMS.filter((i) => i.status === 'not-eligible').length;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#1a56db] font-medium mb-2">
          <span>Tools</span><span>/</span><span>SNAP Checker</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Indiana SNAP Eligibility Checker (2026)
        </h1>
        <p className="text-xs text-gray-400 mt-1">Last verified: February 2026 · Always confirm at checkout — retailer POS systems may differ.</p>
      </div>

      {/* Alert banner */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3" role="alert">
        <span className="text-orange-500 text-xl flex-shrink-0" aria-hidden="true">📢</span>
        <div>
          <p className="font-bold text-orange-800 text-sm">Indiana Waiver Effective January 1, 2026</p>
          <p className="text-orange-700 text-sm">
            Indiana excludes candy and sugary drinks from SNAP under its USDA-approved waiver.
            FSSA lists a transition period through <strong>March 31, 2026</strong>.
          </p>
        </div>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#057a55]">{eligibleCount}</p>
          <p className="text-xs text-green-600 font-medium">Eligible Items</p>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-[#c81e1e]">{notEligibleCount}</p>
          <p className="text-xs text-red-600 font-medium">Not Eligible</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-3 text-center">
          <p className="text-2xl font-bold text-gray-700">{SNAP_ITEMS.length}</p>
          <p className="text-xs text-gray-500 font-medium">Items in Database</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search items… (e.g. ice cream, Gatorade, Kit Kat)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] bg-white"
          aria-label="Search SNAP items"
        />
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Filter by eligibility status">
        {(['All', 'eligible', 'not-eligible', 'check-label'] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setStatusFilter(s as FilterStatus)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              statusFilter === s
                ? 'bg-[#1a56db] text-white border-[#1a56db]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
            aria-pressed={statusFilter === s}
          >
            {s === 'All' && 'All'}
            {s === 'eligible' && '✅ Eligible'}
            {s === 'not-eligible' && '❌ Not Eligible'}
            {s === 'check-label' && '⚠️ Check Label'}
          </button>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-5" role="group" aria-label="Filter by food category">
        {CATEGORY_FILTERS.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              categoryFilter === cat
                ? 'bg-gray-800 text-white border-gray-800'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
            aria-pressed={categoryFilter === cat}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Result count */}
      <p className="text-sm text-gray-500 mb-4" aria-live="polite">
        Showing <strong>{filtered.length}</strong> of <strong>{SNAP_ITEMS.length}</strong> items
      </p>

      {/* Results */}
      <div className="space-y-3 mb-12">
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">No items match your search.</p>
            <p className="text-sm mt-1">Try a different search term or clear the filters.</p>
          </div>
        )}
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="flex items-start justify-between gap-3 p-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-bold text-gray-900 text-sm">{item.name}</p>
                  <Badge variant="state">{item.category}</Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                <p className="text-xs text-gray-400 mt-1">Confirm at checkout — POS systems may differ.</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Badge
                  variant={
                    item.status === 'eligible'
                      ? 'eligible'
                      : item.status === 'not-eligible'
                      ? 'not-eligible'
                      : 'check-label'
                  }
                >
                  {item.status === 'eligible'
                    ? '✓ ELIGIBLE'
                    : item.status === 'not-eligible'
                    ? '✗ NOT ELIGIBLE'
                    : '⚠ CHECK LABEL'}
                </Badge>
                {item.notes && (
                  <button
                    type="button"
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className="text-gray-400 hover:text-gray-600 p-1 rounded"
                    aria-label={expandedId === item.id ? 'Collapse details' : 'Expand details'}
                    aria-expanded={expandedId === item.id}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform ${expandedId === item.id ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
            {expandedId === item.id && item.notes && (
              <div className="px-4 pb-4 pt-0">
                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed border-l-2 border-[#1a56db]">
                  {item.notes}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Rules Explained */}
      <section>
        <h2 className="text-xl font-bold text-gray-900 mb-4">The Rules Explained</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-2">
              <span className="text-2xl mr-2" aria-hidden="true">❄️</span>
              The Refrigeration Rule
            </h3>
            <p className="text-sm text-gray-600">
              Foods that <em>require</em> refrigeration or freezing are SNAP eligible, even if they contain sugar.
              This is why ice cream, frozen popsicles, and chocolate milk are eligible — they must be stored cold.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-2">
              <span className="text-2xl mr-2" aria-hidden="true">🌾</span>
              The Flour Rule
            </h3>
            <p className="text-sm text-gray-600">
              Items where grain or flour is the <em>primary ingredient</em> are eligible. This includes cookies,
              crackers, granola bars, Pop-Tarts, and even many sweet snack cakes. The candy rule doesn&rsquo;t apply
              when flour dominates.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-2">
              <span className="text-2xl mr-2" aria-hidden="true">🥤</span>
              The Sugary Drink Rule
            </h3>
            <p className="text-sm text-gray-600">
              Indiana&rsquo;s waiver excludes beverages with added sweeteners and no milk, juice, or protein.
              Regular sodas, sweet tea, and high-sugar juice drinks are excluded. 100% juice and
              unsweetened sparkling water remain eligible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
