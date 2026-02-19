'use client';

import { useState, useMemo } from 'react';
import Accordion from '@/components/Accordion';
import Badge from '@/components/Badge';
import { INDIANA_COUNTIES, SCHOLARSHIP_PCT, AWARD_RANGE } from '@/data/scholarship';

const COUNTY_NAMES = Object.keys(INDIANA_COUNTIES).sort();

const FAQ_ITEMS = [
  {
    title: 'What changed for 2026-27?',
    content: (
      <p>
        Indiana previously limited Choice Scholarships to families below a certain income threshold (185%–400% of
        the free/reduced lunch income limit). Under HEA 1001-2025, the income cap is scheduled to be removed
        beginning <strong>June 29, 2026</strong>. Verify current requirements and timing at indianascholarships.org
        before applying.
      </p>
    ),
  },
  {
    title: 'How is the award amount calculated?',
    content: (
      <div className="space-y-2">
        <p>
          The scholarship award is calculated as a percentage of the public school district&rsquo;s per-pupil
          operating funding (ADM — Average Daily Membership funding). The state uses the per-pupil amount from
          the school corporation where the student would otherwise attend public school.
        </p>
        <p>
          The award is approximately <strong>90%</strong> of that per-pupil figure. If a private school charges
          less than the scholarship amount, the scholarship covers only the tuition — it does not result in
          additional cash. If the private school charges more, families pay the difference.
        </p>
        <p className="text-xs text-gray-400">
          Note: The per-pupil amounts shown are estimates based on publicly available ADM funding data. Actual
          award amounts are determined by the Indiana DOE and may vary.
        </p>
      </div>
    ),
  },
  {
    title: 'Can I use it for any private school?',
    content: (
      <p>
        The scholarship can be used at any accredited Indiana non-public school that participates in the Choice
        Scholarship program. Most private schools in Indiana participate. Schools must meet certain state
        accountability requirements. Homeschooling is not covered under the Choice Scholarship program (though a
        separate Education Scholarship Account program may apply).
      </p>
    ),
  },
  {
    title: 'What if my school costs less than the award?',
    content: (
      <p>
        If the private school&rsquo;s tuition is <em>less</em> than the scholarship amount, the scholarship covers
        only the actual tuition charged. The difference does not go to the family. If tuition is <em>more</em> than
        the scholarship, families are responsible for paying the difference directly to the school.
      </p>
    ),
  },
];

export default function ScholarshipClient() {
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedCorp, setSelectedCorp] = useState('');

  const corporations = useMemo(() => {
    if (!selectedCounty || !INDIANA_COUNTIES[selectedCounty]) return [];
    return INDIANA_COUNTIES[selectedCounty].corporations;
  }, [selectedCounty]);

  const selectedCorpData = useMemo(() => {
    if (!selectedCorp || !selectedCounty) return null;
    return corporations.find((c) => c.name === selectedCorp) ?? null;
  }, [selectedCorp, selectedCounty, corporations]);

  const scholarshipAmount = selectedCorpData
    ? Math.round(selectedCorpData.perPupil * SCHOLARSHIP_PCT)
    : null;

  function handleCountyChange(county: string) {
    setSelectedCounty(county);
    setSelectedCorp('');
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#1a56db] font-medium mb-2">
          <span>Tools</span><span>/</span><span>Scholarship Calculator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Indiana Choice Scholarship Calculator
        </h1>
      </div>

      {/* Universal eligibility banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-start gap-3" role="alert">
        <span className="text-green-500 text-xl flex-shrink-0" aria-hidden="true">🎓</span>
        <div>
          <p className="font-bold text-green-800 text-sm">Scheduled Change: June 29, 2026</p>
          <p className="text-green-700 text-sm">
            Indiana HEA 1001-2025 schedules removal of Choice Scholarship income limits beginning
            June 29, 2026. Confirm current eligibility and deadlines at{' '}
            <a href="https://indianascholarships.org" target="_blank" rel="noopener noreferrer" className="underline">
              indianascholarships.org
            </a>
          </p>
        </div>
      </div>

      {/* Eligibility checklist */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-800 text-lg mb-4">Eligibility Requirements (2026-27)</h2>
        <ul className="space-y-3">
          {[
            'Indiana resident',
            'School-age child (Kindergarten through Grade 12)',
            'Income limits are scheduled to end on June 29, 2026',
            'Prior year public school attendance OR entering Kindergarten',
          ].map((req) => (
            <li key={req} className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center" aria-hidden="true">
                <svg className="w-3.5 h-3.5 text-[#057a55]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <span className="text-sm text-gray-700">{req}</span>
              <Badge variant="eligible">Eligible</Badge>
            </li>
          ))}
        </ul>
      </div>

      {/* Calculator */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="font-bold text-gray-800 text-lg mb-5">Estimate Your Award</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Step 1: County */}
          <div>
            <label htmlFor="county-select" className="block text-sm font-medium text-gray-700 mb-2">
              Step 1: Select Your County
            </label>
            <select
              id="county-select"
              value={selectedCounty}
              onChange={(e) => handleCountyChange(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              aria-label="Select Indiana county"
            >
              <option value="">— Select a county —</option>
              {COUNTY_NAMES.map((c) => (
                <option key={c} value={c}>{c} County</option>
              ))}
            </select>
          </div>

          {/* Step 2: School Corporation */}
          <div>
            <label htmlFor="corp-select" className="block text-sm font-medium text-gray-700 mb-2">
              Step 2: Select Your School Corporation
            </label>
            <select
              id="corp-select"
              value={selectedCorp}
              onChange={(e) => setSelectedCorp(e.target.value)}
              disabled={!selectedCounty}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db] disabled:opacity-50"
              aria-label="Select school corporation"
            >
              <option value="">— Select a school corporation —</option>
              {corporations.map((corp) => (
                <option key={corp.name} value={corp.name}>{corp.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {selectedCorpData && scholarshipAmount && (
          <div className="mt-6 border-t border-gray-100 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
                <p className="text-xs text-[#1a56db] font-medium mb-1">Per-Pupil Funding</p>
                <p className="text-2xl font-bold text-[#1a56db]">
                  ${selectedCorpData.perPupil.toLocaleString()}
                </p>
                <p className="text-xs text-blue-400">public school ADM</p>
              </div>
              <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
                <p className="text-xs text-[#057a55] font-medium mb-1">Estimated Scholarship</p>
                <p className="text-2xl font-bold text-[#057a55]">
                  ${scholarshipAmount.toLocaleString()}
                </p>
                <p className="text-xs text-green-400">90% of per-pupil</p>
              </div>
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                <p className="text-xs text-gray-500 font-medium mb-1">Statewide Range</p>
                <p className="text-lg font-bold text-gray-700">
                  ${AWARD_RANGE.min.toLocaleString()}–${AWARD_RANGE.max.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">typical range</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-[#1a56db] font-semibold mb-1">
                {selectedCorpData.name}
                {' '}
                <Badge variant="state">{selectedCorpData.tier === 'high' ? 'High Funding' : selectedCorpData.tier === 'mid-high' ? 'Mid-High' : selectedCorpData.tier === 'mid' ? 'Mid Funding' : 'Rural/Lower'}</Badge>
              </p>
              <p className="text-xs text-blue-700">
                Estimated annual scholarship: <strong>${scholarshipAmount.toLocaleString()}/year per student</strong>.
                Apply at{' '}
                <a href="https://indianascholarships.org" target="_blank" rel="noopener noreferrer" className="underline">
                  indianascholarships.org
                </a>{' '}
                and check the official application calendar.
              </p>
            </div>
          </div>
        )}

        {!selectedCounty && (
          <div className="mt-6 text-center text-gray-400 text-sm py-6">
            Select your county and school corporation to see your estimated award.
          </div>
        )}
      </div>

      {/* FAQ */}
      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-4">Frequently Asked Questions</h2>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </div>
  );
}
