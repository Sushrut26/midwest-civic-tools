import type { StateWageData } from '@/types';

// Midwest Minimum Wage Data 2023-2031
// Sources: Michigan LEO, Illinois DOL, Ohio BWC, U.S. DOL (federal/Indiana)
// Note: Values after confirmed agency announcements are estimates.
// Michigan tip-credit percentages after 2026 follow FAQ guidance and use projected CPI-adjusted standard rates.
// Illinois values after 2026 assume no new statutory change.
// Ohio values are updated annually per CPI each January.
// Indiana has no state minimum wage law above the federal floor; it follows the federal rate of $7.25/hr (unchanged since 2009).

export const WAGE_DATA: StateWageData[] = [
  {
    state: 'Indiana',
    color: '#ff5a1f', // orange
    data: [
      { year: 2023, date: 'Jan 2023', standard: 7.25, tipped: 2.13, note: 'Federal minimum wage — Indiana has no state law above federal floor' },
      { year: 2024, date: 'Jan 2024', standard: 7.25, tipped: 2.13, note: 'Federal minimum wage — unchanged since 2009' },
      { year: 2025, date: 'Jan 2025', standard: 7.25, tipped: 2.13, note: 'Federal minimum wage — unchanged since 2009' },
      { year: 2026, date: 'Jan 2026', standard: 7.25, tipped: 2.13, note: 'Federal minimum wage — unchanged since 2009' },
      { year: 2027, date: 'Jan 2027', standard: 7.25, tipped: 2.13, note: 'Estimated — assumes no federal or state change' },
      { year: 2028, date: 'Jan 2028', standard: 7.25, tipped: 2.13, note: 'Estimated — assumes no federal or state change' },
      { year: 2029, date: 'Jan 2029', standard: 7.25, tipped: 2.13, note: 'Estimated — assumes no federal or state change' },
      { year: 2030, date: 'Jan 2030', standard: 7.25, tipped: 2.13, note: 'Estimated — assumes no federal or state change' },
      { year: 2031, date: 'Jan 2031', standard: 7.25, tipped: 2.13, note: 'Estimated — assumes no federal or state change' },
    ],
  },
  {
    state: 'Michigan',
    color: '#1a56db', // civic blue
    data: [
      {
        year: 2023,
        date: 'Jan 2023',
        standard: 10.10,
        tipped: 3.84,
        note: 'Tipped wage is ~38% of standard',
      },
      {
        year: 2024,
        date: 'Jan 2024',
        standard: 10.33,
        tipped: 3.93,
        note: 'Annual CPI adjustment',
      },
      {
        year: 2025,
        date: 'Jan 2025',
        standard: 12.48,
        tipped: 4.74,
        note: 'Improved Workforce Opportunity Wage Act increase',
      },
      {
        year: 2026,
        date: 'Jan 2026',
        standard: 13.73,
        tipped: 5.49,
        note: 'Confirmed by Michigan LEO release (Dec 2025)',
      },
      {
        year: 2027,
        date: 'Jan 2027',
        standard: 15.00,
        tipped: 6.15,
        note: 'Confirmed standard wage; tipped uses 41% schedule',
      },
      {
        year: 2028,
        date: 'Jan 2028',
        standard: 15.30,
        tipped: 6.43,
        note: 'Estimated CPI adjustment with 42% tipped schedule',
      },
      {
        year: 2029,
        date: 'Jan 2029',
        standard: 15.60,
        tipped: 6.71,
        note: 'Estimated CPI adjustment with 43% tipped schedule',
      },
      {
        year: 2030,
        date: 'Jan 2030',
        standard: 15.90,
        tipped: 7.00,
        note: 'Estimated CPI adjustment with 44% tipped schedule',
      },
      {
        year: 2031,
        date: 'Jan 2031',
        standard: 16.20,
        tipped: 7.29,
        note: 'Estimated CPI adjustment with 45% tipped schedule',
      },
    ],
  },
  {
    state: 'Illinois',
    color: '#c81e1e', // red
    data: [
      {
        year: 2023,
        date: 'Jan 2023',
        standard: 13.00,
        tipped: 7.80,
        note: 'Tipped wage is 60% of standard',
      },
      {
        year: 2024,
        date: 'Jan 2024',
        standard: 14.00,
        tipped: 8.40,
        note: 'Annual scheduled increase',
      },
      {
        year: 2025,
        date: 'Jan 2025',
        standard: 15.00,
        tipped: 9.00,
        note: '$15 floor reached statewide',
      },
      {
        year: 2026,
        date: 'Jan 2026',
        standard: 15.00,
        tipped: 9.00,
        note: 'Current Illinois statewide rate as of Jan 2026',
      },
      {
        year: 2027,
        date: 'Jan 2027',
        standard: 15.00,
        tipped: 9.00,
        note: 'Assumes no statutory change',
      },
      {
        year: 2028,
        date: 'Jan 2028',
        standard: 15.00,
        tipped: 9.00,
        note: 'Assumes no statutory change',
      },
      {
        year: 2029,
        date: 'Jan 2029',
        standard: 15.00,
        tipped: 9.00,
        note: 'Assumes no statutory change',
      },
      {
        year: 2030,
        date: 'Jan 2030',
        standard: 15.00,
        tipped: 9.00,
        note: 'Assumes no statutory change',
      },
      {
        year: 2031,
        date: 'Jan 2031',
        standard: 15.00,
        tipped: 9.00,
        note: 'Assumes no statutory change',
      },
    ],
  },
  {
    state: 'Ohio',
    color: '#057a55', // green
    data: [
      {
        year: 2023,
        date: 'Jan 2023',
        standard: 10.10,
        tipped: 5.05,
        note: 'Tipped wage is 50% of standard',
      },
      {
        year: 2024,
        date: 'Jan 2024',
        standard: 10.45,
        tipped: 5.23,
        note: 'CPI adjustment per Ohio Constitution',
      },
      {
        year: 2025,
        date: 'Jan 2025',
        standard: 10.70,
        tipped: 5.35,
        note: 'CPI adjustment',
      },
      {
        year: 2026,
        date: 'Jan 2026',
        standard: 11.00,
        tipped: 5.50,
        note: 'Confirmed by Ohio annual minimum wage posting',
      },
      {
        year: 2027,
        date: 'Jan 2027',
        standard: 11.10,
        tipped: 5.55,
        note: 'Estimated CPI adjustment',
      },
      {
        year: 2028,
        date: 'Jan 2028',
        standard: 11.40,
        tipped: 5.70,
        note: 'Estimated CPI adjustment',
      },
      {
        year: 2029,
        date: 'Jan 2029',
        standard: 11.70,
        tipped: 5.85,
        note: 'Estimated CPI adjustment',
      },
      {
        year: 2030,
        date: 'Jan 2030',
        standard: 12.00,
        tipped: 6.00,
        note: 'Estimated CPI adjustment',
      },
      {
        year: 2031,
        date: 'Jan 2031',
        standard: 12.30,
        tipped: 6.15,
        note: 'Estimated CPI adjustment',
      },
    ],
  },
];

/**
 * Get the current effective wage for a state based on today's date.
 */
export function getCurrentWage(stateData: StateWageData): {
  standard: number;
  tipped: number;
  year: number;
} {
  const currentYear = new Date().getFullYear();
  // Find the most recent data point at or before the current year
  const sorted = [...stateData.data].sort((a, b) => b.year - a.year);
  const current = sorted.find((d) => d.year <= currentYear) ?? sorted[sorted.length - 1];
  return { standard: current.standard, tipped: current.tipped, year: current.year };
}
