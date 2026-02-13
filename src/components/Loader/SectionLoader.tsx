import { type JSX, type ReactNode } from 'react';
import { cn } from '../../utils';

/**
 * Section Loader Component
 *
 * Features:
 * - Overlay loading state for sections/cards
 * - Minimal spinner design
 * - Customizable size and message
 * - Smooth transitions
 *
 * Use for:
 * - Card/section updates
 * - Partial page refreshes
 * - Component-level loading
 */

interface SectionLoaderProps {
  /**
   * Loading state
   */
  isLoading: boolean;

  /**
   * Children to show when not loading
   */
  children: ReactNode;

  /**
   * Optional loading message
   */
  message?: string;

  /**
   * Spinner size
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Minimum height of the loader area
   */
  minHeight?: string;

  /**
   * Additional className for the wrapper
   */
  className?: string;

  /**
   * Show overlay (semi-transparent) or replace content
   */
  overlay?: boolean;
}

const Spinner = ({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }): JSX.Element => {
  const sizes = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="relative" style={{ width: 'fit-content' }}>
      {/* Outer ring */}
      <div className={cn(sizes[size], 'rounded-full border-gray-200 dark:border-gray-700')} />

      {/* Spinning ring */}
      <div
        className={cn(
          'absolute inset-0 rounded-full border-transparent',
          sizes[size],
          'animate-spin border-r-primary-400 border-t-primary-500',
        )}
      />
    </div>
  );
};

export const SectionLoader = ({
  isLoading,
  children,
  message,
  size = 'md',
  minHeight = '200px',
  className,
  overlay = true,
}: SectionLoaderProps): JSX.Element => {
  if (!isLoading) {
    return <>{children}</>;
  }

  if (overlay) {
    return (
      <div className={cn('relative', className)}>
        {/* Original content (dimmed) */}
        <div className="opacity-50 blur-sm">{children}</div>

        {/* Loading overlay */}
        <div
          className={cn(
            'absolute inset-0 z-10',
            'flex flex-col items-center justify-center gap-4',
            'bg-white/80 dark:bg-gray-900/80',
            'backdrop-blur-sm',
            'animate-fadeIn',
          )}
        >
          <Spinner size={size} />
          {message && (
            <p
              className={cn(
                'text-center font-medium',
                'text-gray-700 dark:text-gray-300',
                size === 'sm' && 'text-sm',
                size === 'md' && 'text-base',
                size === 'lg' && 'text-lg',
              )}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Replace mode
  return (
    <div
      className={cn('flex flex-col items-center justify-center gap-4', 'animate-fadeIn', className)}
      style={{ minHeight }}
    >
      <Spinner size={size} />
      {message && (
        <p
          className={cn(
            'text-center font-medium',
            'text-gray-700 dark:text-gray-300',
            size === 'sm' && 'text-sm',
            size === 'md' && 'text-base',
            size === 'lg' && 'text-lg',
          )}
        >
          {message}
        </p>
      )}
    </div>
  );
};
