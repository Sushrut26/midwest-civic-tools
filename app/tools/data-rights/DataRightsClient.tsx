'use client';

import { useState } from 'react';
import Accordion from '@/components/Accordion';
import Badge from '@/components/Badge';
import {
  DATA_RIGHTS,
  DATA_TYPES,
  generateAccessLetter,
  generateDeleteLetter,
  generateCorrectLetter,
  generatePortabilityLetter,
  generateOptOutLetter,
} from '@/data/data-rights';
import type { DataRightType, LetterFormData } from '@/types';

const RIGHTS_ACCORDION = DATA_RIGHTS.map((r) => ({
  title: r.label,
  content: (
    <p>
      {r.description}
      {' '}
      <strong>Deadline:</strong> The company must respond within 45 days (extendable to 90 with notice).
      Enforced by the Indiana Attorney General under IC 24-15.
    </p>
  ),
}));

const DEFAULT_FORM: LetterFormData = {
  yourName: '',
  yourAddress: '',
  yourEmail: '',
  companyName: '',
  companyAddress: '',
  rightType: 'delete',
  dataTypes: [],
  accountReference: '',
};

function generateLetter(form: LetterFormData): string {
  const dataTypesList = form.dataTypes.length > 0
    ? form.dataTypes
        .map((id) => DATA_TYPES.find((t) => t.id === id)?.label ?? id)
        .map((label) => `- ${label}`)
        .join('\n')
    : '- All personal data held about me';

  const params = {
    yourName: form.yourName || '[Your Name]',
    yourAddress: form.yourAddress || '[Your Address]',
    yourEmail: form.yourEmail || '[Your Email]',
    companyName: form.companyName || '[Company Name]',
    companyAddress: form.companyAddress,
    dataTypesList,
    accountReference: form.accountReference,
  };

  switch (form.rightType) {
    case 'access': return generateAccessLetter(params);
    case 'delete': return generateDeleteLetter(params);
    case 'correct': return generateCorrectLetter(params);
    case 'portability': return generatePortabilityLetter(params);
    case 'opt-out': return generateOptOutLetter(params);
  }
}

export default function DataRightsClient() {
  const [form, setForm] = useState<LetterFormData>(DEFAULT_FORM);
  const [letter, setLetter] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState('');

  const canGenerate = Boolean(
    form.yourName.trim() &&
    form.yourEmail.trim() &&
    form.yourAddress.trim() &&
    form.companyName.trim()
  );

  function updateField(field: keyof LetterFormData, value: string | string[] | DataRightType) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function toggleDataType(id: string) {
    setForm((prev) => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(id)
        ? prev.dataTypes.filter((t) => t !== id)
        : [...prev.dataTypes, id],
    }));
  }

  function handleGenerate() {
    setCopyError('');
    setLetter(generateLetter(form));
    setTimeout(() => {
      document.getElementById('letter-output')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(letter);
      setCopyError('');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError('Clipboard access failed. Please copy the text manually.');
    }
  }

  function handleDownload() {
    const blob = new Blob([letter], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `icdpa-${form.rightType}-request.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-[#1a56db] font-medium mb-2">
          <span>Tools</span><span>/</span><span>Data Rights</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Indiana Data Rights Letter Generator
        </h1>
        <p className="text-gray-600">
          Exercise your rights under the Indiana Consumer Data Protection Act (ICDPA) — IC 24-15.
        </p>
        <p className="text-xs text-gray-400 mt-2">Last verified: February 2026</p>
      </div>

      {/* ICDPA notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="text-blue-500 text-xl flex-shrink-0" aria-hidden="true">🔒</span>
        <div>
          <p className="font-bold text-blue-800 text-sm">Indiana Consumer Data Protection Act (ICDPA) — Effective 2026</p>
          <p className="text-blue-700 text-sm">
            IC 24-15 gives Indiana residents 5 new rights over their personal data. This generator creates
            professionally formatted letters that companies are legally required to respond to within 45 days.
            <strong> Your information is never stored or sent anywhere.</strong>
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Step 1: Your info */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1a56db] text-white text-sm font-bold mr-2">1</span>
            Your Information
          </h2>
          <p className="text-xs text-gray-500 mb-4">This is not stored. Used only to generate your letter.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="your-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                id="your-name"
                type="text"
                value={form.yourName}
                onChange={(e) => updateField('yourName', e.target.value)}
                placeholder="Jane Smith"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              />
            </div>
            <div>
              <label htmlFor="your-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                id="your-email"
                type="email"
                value={form.yourEmail}
                onChange={(e) => updateField('yourEmail', e.target.value)}
                placeholder="jane@example.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="your-address" className="block text-sm font-medium text-gray-700 mb-1">Indiana Mailing Address *</label>
              <input
                id="your-address"
                type="text"
                value={form.yourAddress}
                onChange={(e) => updateField('yourAddress', e.target.value)}
                placeholder="123 Main St, Indianapolis, IN 46201"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Company */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1a56db] text-white text-sm font-bold mr-2">2</span>
            Company You&rsquo;re Contacting
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company-name" className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                id="company-name"
                type="text"
                value={form.companyName}
                onChange={(e) => updateField('companyName', e.target.value)}
                placeholder="Acme Corp"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              />
            </div>
            <div>
              <label htmlFor="company-address" className="block text-sm font-medium text-gray-700 mb-1">Company Address <span className="text-gray-400">(optional)</span></label>
              <input
                id="company-address"
                type="text"
                value={form.companyAddress}
                onChange={(e) => updateField('companyAddress', e.target.value)}
                placeholder="Privacy Officer, 456 Corp Dr, Chicago, IL"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Right type */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1a56db] text-white text-sm font-bold mr-2">3</span>
            What Right Are You Exercising?
          </h2>
          <fieldset>
            <legend className="sr-only">Select data right type</legend>
            <div className="space-y-3">
              {DATA_RIGHTS.map((right) => (
                <label
                  key={right.id}
                  className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                    form.rightType === right.id
                      ? 'border-[#1a56db] bg-blue-50'
                      : 'border-gray-100 hover:border-gray-200 bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="right-type"
                    value={right.id}
                    checked={form.rightType === right.id}
                    onChange={() => updateField('rightType', right.id as DataRightType)}
                    className="mt-0.5 text-[#1a56db] focus:ring-[#1a56db]"
                    aria-describedby={`right-desc-${right.id}`}
                  />
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{right.label}</p>
                    <p id={`right-desc-${right.id}`} className="text-xs text-gray-500 mt-0.5">{right.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Step 4: Details */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          <h2 className="font-bold text-gray-800 text-lg mb-4">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#1a56db] text-white text-sm font-bold mr-2">4</span>
            Additional Details
          </h2>
          <div className="mb-5">
            <p className="text-sm font-medium text-gray-700 mb-3">What type of data? <span className="text-gray-400 font-normal">(select all that apply)</span></p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {DATA_TYPES.map((dt) => (
                <label key={dt.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.dataTypes.includes(dt.id)}
                    onChange={() => toggleDataType(dt.id)}
                    className="rounded text-[#1a56db] focus:ring-[#1a56db]"
                  />
                  <span className="text-sm text-gray-700">{dt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="account-ref" className="block text-sm font-medium text-gray-700 mb-1">Account / Reference Number <span className="text-gray-400 font-normal">(optional)</span></label>
            <input
              id="account-ref"
              type="text"
              value={form.accountReference}
              onChange={(e) => updateField('accountReference', e.target.value)}
              placeholder="e.g. Account #12345 or email address on file"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
            />
          </div>
        </div>

        {/* Generate button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={!canGenerate}
          className="w-full bg-[#1a56db] text-white rounded-xl px-6 py-3 font-bold text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Generate letter"
        >
          Generate Letter
        </button>
        {!canGenerate && (
          <p className="text-xs text-gray-400 text-center">
            Fill in your name, email, Indiana mailing address, and company name to generate.
          </p>
        )}
      </div>

      {/* Letter output */}
      {letter && (
        <div id="letter-output" className="mt-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-gray-800 text-lg">Your Letter</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                aria-label="Copy letter to clipboard"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1a56db] text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                aria-label="Download letter as text file"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download .txt
              </button>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed text-gray-800 shadow-sm overflow-x-auto">
            {letter}
          </div>
          {copyError && <p className="text-xs text-red-500 mt-2">{copyError}</p>}
          <p className="text-xs text-gray-400 mt-3 text-center">
            This letter references Indiana Code IC 24-15. It is not legal advice. For complex situations, consult an attorney.
          </p>
        </div>
      )}

      {/* Rights explained */}
      <div className="mt-12 mb-8">
        <h2 className="font-bold text-gray-800 text-xl mb-2">Your 5 ICDPA Rights Explained</h2>
        <p className="text-sm text-gray-500 mb-4">Indiana Consumer Data Protection Act (IC 24-15) — effective 2026. Enforced by the Indiana Attorney General.</p>
        <Accordion items={RIGHTS_ACCORDION} />
      </div>

      {/* Who is covered */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-5">
        <h3 className="font-bold text-gray-700 mb-2 text-sm">Who Does the ICDPA Cover?</h3>
        <p className="text-sm text-gray-600">
          The ICDPA applies to businesses that control or process the personal data of more than 100,000 Indiana consumers
          per year, or that control/process data of 25,000+ consumers and derive over 50% of gross revenue from selling
          personal data. Small businesses are generally exempt. Use this letter for large companies, data brokers,
          retailers, apps, and social media platforms.
        </p>
        <div className="mt-3 flex items-center gap-2">
          <Badge variant="state">IC 24-15</Badge>
          <Badge variant="new-law">Effective 2026</Badge>
          <span className="text-xs text-gray-400">Enforced by Indiana Attorney General</span>
        </div>
      </div>
    </div>
  );
}
