// Core type definitions for Midwest Civic Tools

export interface ToolCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  href: string;
  updated: string;
}

// Benefits Cliff types
export interface FPLData {
  [size: number]: number; // monthly FPL in dollars
}

export interface SNAPBenefitMax {
  [size: number]: number; // max monthly SNAP benefit
}

export interface BenefitPoint {
  income: number;
  snap: number;
  childcare: number;
  total: number;
}

// SNAP Checker types
export type SNAPCategory =
  | 'Beverages'
  | 'Snacks'
  | 'Candy'
  | 'Dairy'
  | 'Frozen'
  | 'Supplements'
  | 'Staples'
  | 'Baby';

export type SNAPStatus = 'eligible' | 'not-eligible' | 'check-label';

export interface SNAPItem {
  id: number;
  name: string;
  category: SNAPCategory;
  status: SNAPStatus;
  reason: string;
  notes?: string;
}

// Scholarship Calculator types
export type FundingTier = 'high' | 'mid-high' | 'mid' | 'rural';

export interface SchoolCorporation {
  name: string;
  tier: FundingTier;
  perPupil: number;
}

export interface County {
  name: string;
  corporations: SchoolCorporation[];
}

export interface CountyMap {
  [county: string]: County;
}

// Minimum Wage types
export interface WageDataPoint {
  year: number;
  date: string;
  standard: number;
  tipped: number;
  note?: string;
}

export interface StateWageData {
  state: string;
  color: string;
  data: WageDataPoint[];
}

// Data Rights types
export type DataRightType =
  | 'access'
  | 'delete'
  | 'correct'
  | 'portability'
  | 'opt-out';

export interface DataRight {
  id: DataRightType;
  label: string;
  description: string;
}

export interface DataType {
  id: string;
  label: string;
}

export interface LetterFormData {
  yourName: string;
  yourAddress: string;
  yourEmail: string;
  companyName: string;
  companyAddress: string;
  rightType: DataRightType;
  dataTypes: string[];
  accountReference: string;
}
