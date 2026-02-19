import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <p className="font-bold text-[#1a56db] text-lg mb-2">Midwest Civic Tools</p>
            <p className="text-sm text-gray-600">
              Free to use civic calculators and explainers for residents and small businesses.
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Built with Claude Code. Not affiliated with any government agency.
            </p>
          </div>

          {/* Tools */}
          <div>
            <p className="font-semibold text-gray-700 text-sm mb-3">Tools</p>
            <ul className="space-y-1 text-sm text-gray-600">
              <li><Link href="/tools/benefits-cliff" className="hover:text-[#1a56db] transition-colors">Benefits Cliff Visualizer</Link></li>
              <li><Link href="/tools/snap-checker" className="hover:text-[#1a56db] transition-colors">SNAP Eligibility Checker</Link></li>
              <li><Link href="/tools/scholarship-calc" className="hover:text-[#1a56db] transition-colors">Choice Scholarship Calculator</Link></li>
              <li><Link href="/tools/min-wage" className="hover:text-[#1a56db] transition-colors">Minimum Wage Timeline</Link></li>
              <li><Link href="/tools/data-rights" className="hover:text-[#1a56db] transition-colors">Data Rights Letter Generator</Link></li>
            </ul>
          </div>

          {/* Sources */}
          <div>
            <p className="font-semibold text-gray-700 text-sm mb-3">Data Sources</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              Data sourced from USDA, Indiana FSSA, Indiana DOE, Michigan LEO, and Illinois DOL.
              Benefit amounts and income thresholds are updated for 2026 as of publication.
              Always verify with the relevant state agency for official eligibility determinations.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Midwest Civic Tools. MIT License. Open source.
        </div>
      </div>
    </footer>
  );
}
