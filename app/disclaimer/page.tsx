import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer | Midwest Civic Tools',
  description: 'Full disclaimer, data accuracy notice, and limitation of liability for Midwest Civic Tools.',
  robots: { index: false, follow: false },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link href="/" className="text-sm text-[#1a56db] hover:underline">← Back to Home</Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Disclaimer</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: February 2026</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">1. Not Legal or Financial Advice</h2>
          <p>
            The information provided on Midwest Civic Tools is for general informational and educational purposes
            only. Nothing on this website constitutes legal advice, financial advice, tax advice, benefits
            counseling, or any other form of professional guidance. Do not rely on any content on this site as a
            substitute for advice from a qualified attorney, licensed financial advisor, certified tax professional,
            or government caseworker.
          </p>
          <p className="mt-2">
            If you need help understanding your eligibility for government benefits, contact your local Indiana
            Family and Social Services Administration (FSSA) office, or call Indiana 211 by dialing 2-1-1.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">2. AI-Generated and AI-Assisted Content</h2>
          <p>
            The data, calculations, text, and tool logic on this site were developed with the assistance of AI
            tools, including Claude by Anthropic. While we have made reasonable efforts to verify the accuracy of
            content against primary government sources (including USDA/FNS, Indiana FSSA, Indiana DOE, Michigan
            LEO, Illinois DOL, Ohio BWC, and U.S. DOL), AI-generated content can contain errors, omissions,
            hallucinations, or outdated information.
          </p>
          <p className="mt-2">
            <strong>Use this site at your own risk.</strong> We do not warrant the accuracy, completeness,
            or fitness for purpose of any information presented here.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">3. Data May Change Without Notice</h2>
          <p>
            Government benefit rules, income thresholds, wage rates, program eligibility requirements, and legal
            statutes change frequently — sometimes with little or no public notice. The information on this site
            reflects our best understanding of the rules as of the date shown on each tool page (&ldquo;Last
            verified&rdquo; date) and may not reflect changes made after that date.
          </p>
          <p className="mt-2">
            Always verify current rules directly with the relevant government agency before making any financial,
            employment, healthcare, education, or legal decisions.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">4. SNAP Eligibility — Special Notice</h2>
          <p>
            SNAP eligibility determinations are made solely by your local Indiana FSSA office based on your
            specific household circumstances. The SNAP item eligibility information on this site reflects our
            interpretation of Indiana&rsquo;s USDA-approved Smart SNAP waiver as of February 2026.
          </p>
          <p className="mt-2">
            Item-level eligibility at the point of sale may vary depending on retailer POS system configuration,
            product labeling, and ongoing regulatory guidance. The transition period for the Indiana waiver ran
            through March 31, 2026, and POS systems at individual retailers may have been updated on different
            timelines. <strong>Always confirm eligibility at checkout.</strong>
          </p>
          <p className="mt-2">
            For official SNAP information, visit{' '}
            <a href="https://www.in.gov/fssa/dfr/snap-food-assistance/" className="text-[#1a56db] underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">
              in.gov/fssa/dfr/snap-food-assistance
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">5. Scholarship Calculator — Special Notice</h2>
          <p>
            The Indiana Choice Scholarship award amounts shown are estimates based on publicly available
            Average Daily Membership (ADM) per-pupil funding data. Actual scholarship award amounts are
            determined annually by the Indiana Department of Education and may differ from the estimates shown.
            Income eligibility rules, award amounts, and participating schools are subject to change.
          </p>
          <p className="mt-2">
            For official and current information, visit the{' '}
            <a href="https://www.in.gov/doe/students/indiana-choice-scholarship-program/" className="text-[#1a56db] underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">
              Indiana DOE Choice Scholarship page
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">6. Data Rights Letter Generator — Special Notice</h2>
          <p>
            Letters generated by the Data Rights tool are templates only. They are not legal documents and have
            not been reviewed or approved by an attorney. Sending a letter does not guarantee that the recipient
            company will respond, comply, or acknowledge your request. The letter template does not create an
            attorney-client relationship.
          </p>
          <p className="mt-2">
            For complex data privacy situations, consult a licensed attorney. For complaints about company
            non-compliance, contact the Indiana Attorney General&rsquo;s office at{' '}
            <a href="https://www.in.gov/attorneygeneral/" className="text-[#1a56db] underline hover:text-blue-700" target="_blank" rel="noopener noreferrer">
              in.gov/attorneygeneral
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">7. No Government Affiliation</h2>
          <p>
            Midwest Civic Tools is an independent, privately operated project. It is not affiliated with,
            endorsed by, sponsored by, or operated by the State of Indiana, Indiana FSSA, USDA, Indiana
            Department of Education, or any other federal, state, or local government agency.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">8. No Warranties; Limitation of Liability</h2>
          <p>
            This site and all content are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without
            any express or implied warranties of any kind, including but not limited to warranties of
            merchantability, fitness for a particular purpose, accuracy, or non-infringement. To the fullest
            extent permitted by applicable law, Midwest Civic Tools and its operators shall not be liable for
            any direct, indirect, incidental, consequential, special, or punitive damages arising from your
            use of or reliance on this site or its content.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-2">9. Privacy</h2>
          <p>
            This site does not collect, store, or transmit any personal information. No accounts are required.
            No cookies are set for tracking purposes. Analytics (if enabled) use Vercel Analytics, which is
            privacy-friendly and does not use cookies or store personal identifiers. Data entered into the
            Data Rights letter generator is processed entirely in your browser and is never sent to any server.
          </p>
        </section>

      </div>

      <div className="mt-10 pt-6 border-t border-gray-100">
        <Link href="/" className="text-sm text-[#1a56db] hover:underline">← Back to Home</Link>
      </div>
    </div>
  );
}
