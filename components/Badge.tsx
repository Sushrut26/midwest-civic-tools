interface BadgeProps {
  variant: 'eligible' | 'not-eligible' | 'check-label' | 'state' | 'new-law' | 'updated';
  children: React.ReactNode;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeProps['variant'], string> = {
  eligible: 'bg-green-100 text-green-800 border border-green-200',
  'not-eligible': 'bg-red-100 text-red-800 border border-red-200',
  'check-label': 'bg-yellow-100 text-yellow-800 border border-yellow-200',
  state: 'bg-blue-100 text-[#1a56db] border border-blue-200',
  'new-law': 'bg-orange-100 text-orange-700 border border-orange-200',
  updated: 'bg-blue-50 text-blue-600 border border-blue-100',
};

export default function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${VARIANT_STYLES[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
