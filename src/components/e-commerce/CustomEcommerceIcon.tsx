import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';

/** Mark for the custom e-commerce service (no third-party platform logo applies). */
export function CustomEcommerceIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return <CodeBracketSquareIcon className={`${className} text-heritage-turquoise-deep`} aria-hidden="true" />;
}
