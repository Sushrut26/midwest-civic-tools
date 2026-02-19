import type { FPLData, SNAPBenefitMax } from '@/types';

// Derived monthly FPL values based on USDA FY 2026 SNAP gross income limits
export const FPL_MONTHLY: FPLData = {
  1: 1542,
  2: 2086,
  3: 2631,
  4: 3175,
  5: 3719,
  6: 4263,
  7: 4807,
  8: 5352,
};

// SNAP gross income limit: 130% of FPL
export const SNAP_GROSS_LIMIT_PCT = 1.3;

// SNAP net income limit: 100% of FPL
export const SNAP_NET_LIMIT_PCT = 1.0;

// Maximum monthly SNAP benefit by household size (USDA FY 2026 values)
export const SNAP_MAX_BENEFIT: SNAPBenefitMax = {
  1: 292,
  2: 536,
  3: 768,
  4: 975,
  5: 1158,
  6: 1390,
  7: 1536,
  8: 1756,
};

// Childcare subsidy cliff: 200% FPL
export const CHILDCARE_LIMIT_PCT = 2.0;

// Estimated average Indiana childcare subsidy value per month
// NOTE: This is an estimate. Actual amount varies by provider and child age.
export const CHILDCARE_SUBSIDY_VALUE = 800;

/**
 * Calculate SNAP benefit at a given monthly income for a household size.
 * SNAP uses a step-function: full benefit if below 130% FPL, zero above.
 * In reality there is a gradual reduction, but we model the cliff for visualization.
 */
export function calcSNAPBenefit(monthlyIncome: number, householdSize: number): number {
  const fpl = FPL_MONTHLY[householdSize] ?? FPL_MONTHLY[8];
  const grossLimit = fpl * SNAP_GROSS_LIMIT_PCT;
  if (monthlyIncome <= grossLimit) {
    // Simplified benefit: scales down from max to 0 as income approaches limit
    const maxBenefit = SNAP_MAX_BENEFIT[householdSize] ?? SNAP_MAX_BENEFIT[8];
    // SNAP reduces by ~30 cents per dollar of net income (30% net income rule)
    const netIncome = monthlyIncome * 0.8; // simplified: 20% income deduction
    const reduction = netIncome * 0.3;
    return Math.max(0, maxBenefit - reduction);
  }
  return 0;
}

/**
 * Calculate childcare subsidy at a given monthly income for a household size.
 * Binary cliff: full subsidy if below 200% FPL, zero above.
 */
export function calcChildcareBenefit(monthlyIncome: number, householdSize: number): number {
  const fpl = FPL_MONTHLY[householdSize] ?? FPL_MONTHLY[8];
  const childcareLimit = fpl * CHILDCARE_LIMIT_PCT;
  return monthlyIncome <= childcareLimit ? CHILDCARE_SUBSIDY_VALUE : 0;
}

/**
 * Generate chart data points across income range for a given household size.
 */
export function generateBenefitPoints(
  householdSize: number,
  maxIncome = 6000,
  step = 50
) {
  const points = [];
  for (let income = 0; income <= maxIncome; income += step) {
    const snap = calcSNAPBenefit(income, householdSize);
    const childcare = calcChildcareBenefit(income, householdSize);
    points.push({
      income,
      snap: Math.round(snap),
      childcare,
      total: Math.round(snap) + childcare,
    });
  }
  return points;
}

/**
 * Find the nearest cliff within $200 of the current income.
 * Returns an object with cliffType and lossAmount, or null if no cliff nearby.
 */
export function findNearbyCliff(
  monthlyIncome: number,
  householdSize: number
): { cliffType: string; cliffIncome: number; lossAmount: number } | null {
  const fpl = FPL_MONTHLY[householdSize] ?? FPL_MONTHLY[8];
  const snapCliff = fpl * SNAP_GROSS_LIMIT_PCT;
  const childcareCliff = fpl * CHILDCARE_LIMIT_PCT;
  const WARNING_RANGE = 200;

  if (Math.abs(monthlyIncome - snapCliff) <= WARNING_RANGE && monthlyIncome <= snapCliff) {
    const snapLoss = Math.round(calcSNAPBenefit(monthlyIncome, householdSize));
    return {
      cliffType: 'SNAP',
      cliffIncome: Math.round(snapCliff),
      lossAmount: snapLoss,
    };
  }

  if (
    Math.abs(monthlyIncome - childcareCliff) <= WARNING_RANGE &&
    monthlyIncome <= childcareCliff
  ) {
    return {
      cliffType: 'Childcare subsidy',
      cliffIncome: Math.round(childcareCliff),
      lossAmount: CHILDCARE_SUBSIDY_VALUE,
    };
  }

  return null;
}
