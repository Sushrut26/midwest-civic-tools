'use client';

import { useState, useMemo, Suspense } from 'react';
import dynamic from 'next/dynamic';
import Accordion from '@/components/Accordion';
import {
  FPL_MONTHLY,
  SNAP_MAX_BENEFIT,
  calcSNAPBenefit,
  calcChildcareBenefit,
  findNearbyCliff,
} from '@/data/benefits-cliff';

// Load chart only on client side (Chart.js is not SSR-compatible)
const BenefitsCliffChart = dynamic(() => import('@/components/BenefitsCliffChart'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[340px] bg-gray-50 rounded-xl border border-gray-100">
      <div className="text-gray-500 text-sm">Loading chart…</div>
    </div>
  ),
});

const ACCORDION_ITEMS = [
  {
    title: 'What is the Benefits Cliff?',
    content: (
      <p>
        The &ldquo;benefits cliff&rdquo; is what happens when a small raise causes you to lose more in public
        benefits than you gained in wages. For example, earning just $50 more per month could push your household
        income above the SNAP gross income limit (130% of the Federal Poverty Level), causing you to lose hundreds
        of dollars in monthly food assistance. The cliff can make getting a raise feel financially risky.
      </p>
    ),
  },
  {
    title: 'How is this calculated?',
    content: (
      <div className="space-y-2">
        <p>
          <strong>SNAP:</strong> The gross income limit is 130% of the Federal Poverty Level (FPL) for your
          household size. The benefit is calculated using a simplified model where the maximum benefit decreases
          as net income (income minus deductions) increases. The standard deduction and 20% earned income
          deduction are applied.
        </p>
        <p>
          <strong>Childcare:</strong> Indiana&rsquo;s On My Way Pre-K and childcare subsidy programs generally
          cut off at 200% FPL. The $800/month subsidy value shown is an estimate of the average Indiana
          childcare subsidy. Actual amounts vary by provider and child age.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Source: USDA FY2026 SNAP income limits and benefit amounts. Indiana FSSA childcare subsidy estimates.
        </p>
      </div>
    ),
  },
  {
    title: 'What can I do about the cliff?',
    content: (
      <ul className="list-disc list-inside space-y-1">
        <li>Talk to a benefits navigator at Indiana 211 (dial 2-1-1) before taking a raise.</li>
        <li>Ask your employer about scheduling raises in phases rather than all at once.</li>
        <li>Explore whether a health savings account (HSA) or retirement contribution can reduce your &ldquo;countable income.&rdquo;</li>
        <li>Ask your case worker whether transitional SNAP protections apply in your situation.</li>
        <li>Visit Indiana 211 or a local community action agency for free benefits counseling.</li>
      </ul>
    ),
  },
];

export default function BenefitsCliffClient() {
  const [householdSize, setHouseholdSize] = useState(3);
  const [income, setIncome] = useState(2000);

  const fpl = FPL_MONTHLY[householdSize] ?? FPL_MONTHLY[8];
  const snapCliff = Math.round(fpl * 1.3);
  const childcareCliff = Math.round(fpl * 2.0);
  const snapBenefit = Math.round(calcSNAPBenefit(income, householdSize));
  const childcareBenefit = calcChildcareBenefit(income, householdSize);
  const totalBenefit = snapBenefit + childcareBenefit;
  const cliffWarning = useMemo(() => findNearbyCliff(income, householdSize), [income, householdSize]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-[#1a56db] font-medium mb-2">
          <span>Tools</span>
          <span>/</span>
          <span>Benefits Cliff</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Indiana Benefits Cliff Visualizer
        </h1>
        <p className="text-gray-600 text-lg">
          A small raise can cost you more than you gain. See exactly where your benefits cut off.
        </p>
      </div>

      {/* Inputs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-bold text-gray-800 text-lg mb-5">Your Household</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Household size */}
          <div>
            <label htmlFor="household-size" className="block text-sm font-medium text-gray-700 mb-2">
              Household Size
            </label>
            <select
              id="household-size"
              value={householdSize}
              onChange={(e) => setHouseholdSize(Number(e.target.value))}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              aria-label="Select household size"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'person' : 'people'}
                </option>
              ))}
            </select>
          </div>

          {/* Monthly income */}
          <div>
            <label htmlFor="income-number" className="block text-sm font-medium text-gray-700 mb-2">
              Monthly Gross Income
            </label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm">$</span>
              <input
                id="income-number"
                type="number"
                min={0}
                max={6000}
                step={50}
                value={income}
                onChange={(e) => setIncome(Math.max(0, Math.min(6000, Number(e.target.value))))}
                className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
                aria-label="Monthly gross income in dollars"
              />
              <span className="text-gray-400 text-xs">/month</span>
            </div>
            <input
              type="range"
              min={0}
              max={6000}
              step={50}
              value={income}
              onChange={(e) => setIncome(Number(e.target.value))}
              className="w-full mt-3"
              aria-label="Income slider"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>$0</span>
              <span>$3,000</span>
              <span>$6,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cliff warning */}
      {cliffWarning && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6 flex items-start gap-3" role="alert">
          <span className="text-orange-500 text-xl flex-shrink-0" aria-hidden="true">⚠️</span>
          <div>
            <p className="font-bold text-orange-800 text-sm">Benefits Cliff Warning</p>
            <p className="text-orange-700 text-sm">
              At <strong>${income.toLocaleString()}/month</strong> income, you are within $200 of the{' '}
              <strong>{cliffWarning.cliffType}</strong> cliff at{' '}
              <strong>${cliffWarning.cliffIncome.toLocaleString()}/month</strong>. Earning just a little more
              could cause you to lose up to <strong>${cliffWarning.lossAmount.toLocaleString()}/month</strong> in
              benefits.
            </p>
          </div>
        </div>
      )}

      {/* Current benefit summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
          <p className="text-xs text-blue-600 font-medium mb-1">SNAP Benefit</p>
          <p className="text-2xl font-bold text-[#1a56db]">${snapBenefit.toLocaleString()}</p>
          <p className="text-xs text-blue-400">/month</p>
        </div>
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 text-center">
          <p className="text-xs text-orange-600 font-medium mb-1">Childcare Subsidy</p>
          <p className="text-2xl font-bold text-orange-600">${childcareBenefit.toLocaleString()}</p>
          <p className="text-xs text-orange-400">/month</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
          <p className="text-xs text-gray-600 font-medium mb-1">Combined Total</p>
          <p className="text-2xl font-bold text-gray-900">${totalBenefit.toLocaleString()}</p>
          <p className="text-xs text-gray-400">/month</p>
        </div>
      </div>

      {/* Cliff thresholds */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">SNAP Gross Income Limit (130% FPL)</p>
          <p className="text-lg font-bold text-gray-900">
            ${snapCliff.toLocaleString()}
            <span className="text-sm font-normal text-gray-400">/mo</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {income <= snapCliff
              ? `$${(snapCliff - income).toLocaleString()} below cliff`
              : `$${(income - snapCliff).toLocaleString()} above — SNAP not available`}
          </p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-1">Childcare Subsidy Limit (200% FPL)</p>
          <p className="text-lg font-bold text-gray-900">
            ${childcareCliff.toLocaleString()}
            <span className="text-sm font-normal text-gray-400">/mo</span>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {income <= childcareCliff
              ? `$${(childcareCliff - income).toLocaleString()} below cliff`
              : `$${(income - childcareCliff).toLocaleString()} above — childcare subsidy not available`}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="font-bold text-gray-800 text-lg mb-1">Benefit Value by Income</h2>
        <p className="text-sm text-gray-500 mb-5">
          {householdSize}-person household · Red line = your current income
        </p>
        <Suspense fallback={<div className="h-[340px] flex items-center justify-center text-gray-400">Loading chart…</div>}>
          <BenefitsCliffChart householdSize={householdSize} currentIncome={income} />
        </Suspense>
        <p className="text-xs text-gray-400 mt-3">
          * SNAP benefit uses simplified calculation. Childcare subsidy ($800/mo) is an Indiana average estimate.
          Max SNAP for {householdSize} {householdSize === 1 ? 'person' : 'people'}: ${SNAP_MAX_BENEFIT[householdSize]}/mo.
          FPL: ${FPL_MONTHLY[householdSize]}/mo.
        </p>
      </div>

      {/* Info accordion */}
      <div className="mb-8">
        <h2 className="font-bold text-gray-800 text-lg mb-4">Learn More</h2>
        <Accordion items={ACCORDION_ITEMS} />
      </div>
    </div>
  );
}
