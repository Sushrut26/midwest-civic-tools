import Link from 'next/link';
import Badge from './Badge';

interface ToolCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
  updated?: string;
  tags?: string[];
}

export default function ToolCard({ icon, title, description, href, updated, tags }: ToolCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-3xl" aria-hidden="true">{icon}</span>
        {updated && (
          <Badge variant="updated">
            {updated}
          </Badge>
        )}
      </div>

      {/* Content */}
      <div>
        <h2 className="font-bold text-gray-900 text-lg mb-1">{title}</h2>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Badge key={tag} variant="state">{tag}</Badge>
          ))}
        </div>
      )}

      {/* CTA */}
      <Link
        href={href}
        className="mt-auto inline-flex items-center justify-center gap-2 bg-[#1a56db] text-white rounded-lg px-4 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors"
        aria-label={`Open ${title} tool`}
      >
        Open Tool
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}
