'use client';

import { useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { WAGE_DATA, getCurrentWage } from '@/data/min-wage';

// Load chart dynamically (Chart.js not SSR compatible)
const MinWageChart = dynamic(() => import('@/components/MinWageChart'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[380px] bg-gray-50 rounded-xl border border-gray-100">
      <div className="text-gray-500 text-sm">Loading chart…</div>
    </div>
  ),
});

const ALL_STATES = ['Indiana', 'Michigan', 'Illinois', 'Ohio'];

const STATE_INFO = [
  {
    state: 'Indiana',
    color: '#ff5a1f',
    highlight: 'Indiana has no state minimum wage law above the federal floor. The federal rate of $7.25/hr has been unchanged since 2009. Tipped minimum is $2.13/hr (federal).',
  },
  {
    state: 'Michigan',
    color: '#1a56db',
    highlight: 'Michigan reaches a $15.00 standard rate in 2027. Tipped-wage percentages are scheduled to rise from 40% (2026) to 45% (2031).',
  },
  {
    state: 'Illinois',
    color: '#c81e1e',
    highlight: 'Illinois statewide minimum wage is $15.00 ($9.00 tipped) as of January 2026. Future increases require statutory or regulatory change.',
  },
  {
    state: 'Ohio',
    color: '#057a55',
    highlight: 'Ohio is CPI-indexed and published annually. Small employers can have separate federal-rate treatment.',
  },
];

export default function MinWageClient() {
  const [selectedStates, setSelectedStates] = useState<string[]>([...ALL_STATES]);
  const [showTipped, setShowTipped] = useState(false);

  function toggleState(state: string) {
    setSelectedStates((prev) =>
      prev.includes(state)
        ? prev.length > 1
          ? prev.filter((s) => s !== state)
          : prev
        : [...prev, state]
    );
  }

  const currentRates = WAGE_DATA.map((s) => ({
    state: s.state,
    color: s.color,
    ...getCurrentWage(s),
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#1a56db] font-medium mb-2">
          <span>Tools</span><span>/</span><span>Minimum Wage Timeline</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Midwest Minimum Wage Timeline 2023–2031
        </h1>
        <p className="text-gray-600">
          Indiana, Michigan, Illinois, and Ohio wage schedules including tipped wage schedules. Data through 2031.
        </p>
        <p className="text-xs text-gray-400 mt-2">Last verified: February 2026</p>
      </div>

      {/* Currently in effect */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {currentRates.map((r) => (
          <div key={r.state} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-gray-800">{r.state}</span>
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: r.color }}
              >
                {r.year}
              </span>
            </div>
            <div className="flex gap-4">
              <div>
                <p className="text-xs text-gray-500">Standard</p>
                <p className="text-xl font-bold text-gray-900">${r.standard.toFixed(2)}</p>
                <p className="text-xs text-gray-400">/hour</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tipped</p>
                <p className="text-xl font-bold text-gray-500">${r.tipped.toFixed(2)}</p>
                <p className="text-xs text-gray-400">/hour</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex flex-wrap items-center gap-4">
          {/* State toggles */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Select states">
            {ALL_STATES.map((state) => {
              const color = WAGE_DATA.find((s) => s.state === state)?.color ?? '#888';
              const active = selectedStates.includes(state);
              return (
                <button
                  key={state}
                  type="button"
                  onClick={() => toggleState(state)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                    active ? 'text-white border-transparent' : 'text-gray-600 border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                  style={active ? { backgroundColor: color, borderColor: color } : {}}
                  aria-pressed={active}
                >
                  {state}
                </button>
              );
            })}
          </div>

          {/* Tipped toggle */}
          <div className="flex items-center gap-2 ml-auto">
            <span className="text-sm text-gray-600">Show tipped wages</span>
            <button
              type="button"
              role="switch"
              aria-checked={showTipped}
              onClick={() => setShowTipped(!showTipped)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#1a56db] ${
                showTipped ? 'bg-[#1a56db]' : 'bg-gray-200'
              }`}
              aria-label="Toggle tipped wage display"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                  showTipped ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <Suspense fallback={<div className="h-[380px] flex items-center justify-center text-gray-400">Loading chart…</div>}>
          <MinWageChart selectedStates={selectedStates} showTipped={showTipped} />
        </Suspense>
        <p className="text-xs text-gray-400 mt-3">
          Dashed lines = tipped wages. Later years include projections where agencies have not published final rates.
        </p>
      </div>

      {/* Data table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <h2 className="font-bold text-gray-800 text-lg p-5 border-b border-gray-100">Full Data Table</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">State</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Date</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Standard</th>
                <th className="px-4 py-3 text-right font-semibold text-gray-600">Tipped</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden md:table-cell">Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {WAGE_DATA.flatMap((s) =>
                s.data.map((d) => (
                  <tr
                    key={`${s.state}-${d.year}`}
                    className={`hover:bg-gray-50 ${d.year === new Date().getFullYear() ? 'bg-blue-50' : ''}`}
                  >
                    <td className="px-4 py-3 font-medium" style={{ color: s.color }}>
                      {s.state}
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {d.date}
                      {d.year === new Date().getFullYear() && (
                        <span className="ml-2 text-xs bg-blue-100 text-[#1a56db] px-1.5 py-0.5 rounded font-semibold">
                          Current
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-gray-900">
                      ${d.standard.toFixed(2)}
                      {(d.note?.toLowerCase().includes('estimated') || d.note?.toLowerCase().includes('assumes')) && (
                        <span className="text-xs text-gray-400 ml-1">est.</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-gray-600">
                      ${d.tipped.toFixed(2)}
                      {(d.note?.toLowerCase().includes('estimated') || d.note?.toLowerCase().includes('assumes')) && (
                        <span className="text-xs text-gray-400 ml-1">est.</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell max-w-xs truncate">
                      {d.note}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATE_INFO.map((info) => (
          <div
            key={info.state}
            className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 border-t-4"
            style={{ borderTopColor: info.color }}
          >
            <h3 className="font-bold text-gray-800 mb-2">{info.state}</h3>
            <p className="text-sm text-gray-600">{info.highlight}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
