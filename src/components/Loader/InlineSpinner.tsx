import { type JSX } from 'react';
import { cn } from '../../utils';

/**
 * Inline Spinner Component
 *
 * Features:
 * - Minimal inline spinner
 * - Multiple sizes
 * - Can be used inline with text
 * - Accessible
 *
 * Use for:
 * - Inline loading indicators
 * - Button loaders (alternative to Button's built-in)
 * - Small UI updates
 */

interface InlineSpinnerProps {
  /**
   * Size of the spinner
   */
  size?: 'xs' | 'sm' | 'md' | 'lg';

  /**
   * Color variant
   */
  variant?: 'primary' | 'secondary' | 'white' | 'current';

  /**
   * Additional className
   */
  className?: string;

  /**
   * Accessible label
   */
  label?: string;
}

export const InlineSpinner = ({
  size = 'md',
  variant = 'primary',
  className,
  label = 'Loading',
}: InlineSpinnerProps): JSX.Element => {
  const sizes = {
    xs: 'h-3 w-3 border',
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-6 w-6 border-2',
  };

  const variants = {
    primary: 'border-gray-200 border-t-primary-500 dark:border-gray-700',
    secondary: 'border-gray-300 border-t-gray-700 dark:border-gray-600 dark:border-t-gray-300',
    white: 'border-white/30 border-t-white',
    current: 'border-current/30 border-t-current',
  };

  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full',
        sizes[size],
        variants[variant],
        className,
      )}
      role="status"
      aria-label={label}
      aria-live="polite"
    >
      <span className="sr-only">{label}</span>
    </span>
  );
};
