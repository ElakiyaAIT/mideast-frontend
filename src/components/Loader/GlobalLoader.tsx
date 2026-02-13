import { type JSX } from 'react';
import { useSelector } from 'react-redux';
import { selectIsGlobalLoading, selectGlobalMessage } from '../../store/loaderSlice';
import { cn } from '../../utils';
import { useTranslation } from '../../i18n';

/**
 * Global Page Loader
 *
 * Features:
 * - Smooth fade in/out transitions
 * - Glassmorphism design
 * - Optional loading message
 * - Prevents interaction during loading
 *
 * Use for:
 * - Authentication flows
 * - Critical page transitions
 * - Data initialization
 */
export const GlobalLoader = (): JSX.Element | null => {
  const { t } = useTranslation();
  const isLoading = useSelector(selectIsGlobalLoading);
  const message = useSelector(selectGlobalMessage);

  if (!isLoading) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center',
        'bg-white/80 dark:bg-gray-900/80',
        'backdrop-blur-md backdrop-saturate-150',
        'animate-fadeIn',
      )}
      role="progressbar"
      aria-label={message ?? t('common.loading')}
      aria-live="polite"
    >
      <div
        className={cn(
          'relative flex flex-col items-center gap-6',
          'glass-light rounded-3xl p-8 shadow-2xl',
          'animate-scaleIn',
        )}
      >
        {/* Animated Loader */}
        <div className="relative h-20 w-20">
          {/* Outer ring */}
          <div
            className={cn(
              'absolute inset-0 rounded-full border-4',
              'border-primary-200 dark:border-primary-900',
            )}
          />

          {/* Spinning ring */}
          <div
            className={cn(
              'absolute inset-0 rounded-full border-4 border-transparent',
              'border-r-primary-400 border-t-primary-500',
              'animate-spin',
            )}
            style={{ animationDuration: '1s' }}
          />

          {/* Inner pulsing dot */}
          <div
            className={cn(
              'absolute inset-0 m-auto h-3 w-3',
              'rounded-full bg-primary-500',
              'animate-ping',
            )}
          />
        </div>

        {/* Loading Message */}
        {message && (
          <p
            className={cn(
              'text-center text-base font-medium',
              'text-gray-700 dark:text-gray-300',
              'animate-fadeIn',
            )}
          >
            {message}
          </p>
        )}

        {/* Loading text */}
        <div className="flex items-center gap-1">
          <span
            className={cn(
              'text-sm font-semibold',
              'bg-gradient-to-r from-primary-600 to-primary-400',
              'bg-clip-text text-transparent',
            )}
          >
            {t('common.loading')}
          </span>
          <span className="flex gap-1">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: '150ms' }}>
              .
            </span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>
              .
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
