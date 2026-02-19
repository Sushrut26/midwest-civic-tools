import type { DataRight, DataType } from '@/types';

// Indiana Consumer Data Protection Act (ICDPA) — IC 24-15
// Effective 2026. Enforced by Indiana Attorney General.

export const DATA_RIGHTS: DataRight[] = [
  {
    id: 'access',
    label: 'Right to Access',
    description:
      'Request a copy of the personal data a company has collected about you, including categories, specific pieces, and how it is used.',
  },
  {
    id: 'delete',
    label: 'Right to Delete',
    description:
      'Request that a company delete all personal data they have collected about you, subject to certain legal exceptions.',
  },
  {
    id: 'correct',
    label: 'Right to Correct',
    description:
      'Request that a company correct inaccurate personal data they hold about you.',
  },
  {
    id: 'portability',
    label: 'Right to Data Portability',
    description:
      'Request a copy of your personal data in a portable, machine-readable format so you can transfer it to another service.',
  },
  {
    id: 'opt-out',
    label: 'Right to Opt-Out',
    description:
      'Direct a company to stop selling, sharing, or using your personal data for targeted advertising or profiling.',
  },
];

export const DATA_TYPES: DataType[] = [
  { id: 'purchase_history', label: 'Purchase History' },
  { id: 'browsing_data', label: 'Browsing Data' },
  { id: 'location_data', label: 'Location Data' },
  { id: 'email_contact', label: 'Email / Contact Info' },
  { id: 'social_demographic', label: 'Social / Demographic Data' },
  { id: 'biometric', label: 'Biometric Data' },
  { id: 'financial', label: 'Financial Information' },
  { id: 'health', label: 'Health / Medical Data' },
  { id: 'other', label: 'Other (describe in reference field)' },
];

// ── Letter Templates ────────────────────────────────────────────────────────
// Each template is a function that accepts LetterFormData fields and returns
// a formatted letter string. References Indiana Code IC 24-15.

function formatDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface TemplateParams {
  yourName: string;
  yourAddress: string;
  yourEmail: string;
  companyName: string;
  companyAddress: string;
  dataTypesList: string;
  accountReference: string;
}

function buildHeader(p: TemplateParams): string {
  const companyAddrLine = p.companyAddress ? `\n${p.companyAddress}` : '';
  const refLine = p.accountReference
    ? `\nRe: Account / Reference: ${p.accountReference}`
    : '';
  return `${formatDate()}

${p.yourName}
${p.yourAddress}
Email: ${p.yourEmail}

${p.companyName}${companyAddrLine}
${refLine}`;
}

function buildFooter(p: TemplateParams): string {
  return `If you have any questions or need clarification, please contact me at ${p.yourEmail}.

Please be advised that under IC 24-15, you are required to respond to this request within 45 days of receipt. A single 45-day extension is permitted with written notice.

Failure to comply may result in a complaint filed with the Indiana Attorney General's Office, which enforces the Indiana Consumer Data Protection Act.

Sincerely,

${p.yourName}`;
}

export function generateAccessLetter(p: TemplateParams): string {
  return `${buildHeader(p)}

Subject: Indiana Consumer Data Protection Act — Right to Access Request (IC 24-15)

Dear Privacy Officer or Data Controller at ${p.companyName},

Pursuant to the Indiana Consumer Data Protection Act (IC 24-15), which became effective in 2026, I am exercising my Right to Access as an Indiana resident.

I hereby request that ${p.companyName} provide me with:

1. Confirmation of whether you are processing my personal data;
2. A complete list of the categories of personal data you have collected about me;
3. Specific pieces of personal data you hold about me;
4. The purposes for which my personal data is being processed;
5. The categories of third parties with whom my personal data has been shared;
6. The source of my personal data if not collected directly from me.

I am specifically requesting information about the following types of data:
${p.dataTypesList}

This request covers all personal data collected, processed, or stored by ${p.companyName} and any processors acting on your behalf.

${buildFooter(p)}`;
}

export function generateDeleteLetter(p: TemplateParams): string {
  return `${buildHeader(p)}

Subject: Indiana Consumer Data Protection Act — Right to Delete Request (IC 24-15)

Dear Privacy Officer or Data Controller at ${p.companyName},

Pursuant to the Indiana Consumer Data Protection Act (IC 24-15), which became effective in 2026, I am exercising my Right to Delete as an Indiana resident.

I hereby request that ${p.companyName} promptly delete all personal data that you have collected about me, including but not limited to:

${p.dataTypesList}

This deletion request covers:
- All personal data held in your primary systems;
- All backups or archived copies, to the extent technically feasible;
- All personal data shared with third-party processors acting on your behalf.

I understand that certain legal exceptions may apply (e.g., data required to complete a transaction, legal compliance obligations). If any data cannot be deleted, please specify the legal basis for retaining it.

After completing the deletion, please provide written confirmation that my data has been deleted and identify any data that could not be deleted along with the reason.

${buildFooter(p)}`;
}

export function generateCorrectLetter(p: TemplateParams): string {
  return `${buildHeader(p)}

Subject: Indiana Consumer Data Protection Act — Right to Correct Request (IC 24-15)

Dear Privacy Officer or Data Controller at ${p.companyName},

Pursuant to the Indiana Consumer Data Protection Act (IC 24-15), which became effective in 2026, I am exercising my Right to Correct inaccurate personal data as an Indiana resident.

I believe that ${p.companyName} holds inaccurate personal data about me. I am requesting that you investigate and correct the following:

Categories of data I believe may be inaccurate:
${p.dataTypesList}

Please take the following steps:
1. Review all personal data you hold about me in the categories listed above;
2. Correct any inaccuracies you identify;
3. Notify any third parties to whom you have disclosed this data of the corrections made, to the extent required by law.

Please provide written confirmation of the corrections made once the process is complete.

${buildFooter(p)}`;
}

export function generatePortabilityLetter(p: TemplateParams): string {
  return `${buildHeader(p)}

Subject: Indiana Consumer Data Protection Act — Right to Data Portability Request (IC 24-15)

Dear Privacy Officer or Data Controller at ${p.companyName},

Pursuant to the Indiana Consumer Data Protection Act (IC 24-15), which became effective in 2026, I am exercising my Right to Data Portability as an Indiana resident.

I hereby request a copy of all personal data you hold about me in a portable, machine-readable format (such as CSV or JSON). Specifically, I am requesting data in the following categories:

${p.dataTypesList}

Please provide this data in a structured, commonly used, and machine-readable format that allows me to transmit it to another controller.

This request includes all personal data you have collected about me and that you have processed based on my consent or pursuant to a contract with me.

${buildFooter(p)}`;
}

export function generateOptOutLetter(p: TemplateParams): string {
  return `${buildHeader(p)}

Subject: Indiana Consumer Data Protection Act — Opt-Out of Data Sale / Targeted Advertising (IC 24-15)

Dear Privacy Officer or Data Controller at ${p.companyName},

Pursuant to the Indiana Consumer Data Protection Act (IC 24-15), which became effective in 2026, I am exercising my Right to Opt-Out as an Indiana resident.

I hereby direct ${p.companyName} to immediately cease:

1. The sale of my personal data to any third parties;
2. The use of my personal data for targeted advertising;
3. The use of my personal data for profiling that produces legal or similarly significant effects on me.

This opt-out covers all personal data you hold about me, including but not limited to:
${p.dataTypesList}

Please confirm in writing that you have honored this opt-out request and have notified all third parties with whom my data has been shared for the above purposes to honor this request as well.

${buildFooter(p)}`;
}
