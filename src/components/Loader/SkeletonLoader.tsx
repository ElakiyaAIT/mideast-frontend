import { type JSX } from 'react';
import { cn } from '../../utils';

/**
 * Skeleton Loader Component
 *
 * Features:
 * - Multiple variants (text, circle, rectangle, card)
 * - Shimmer animation
 * - Responsive design
 * - Customizable sizing
 *
 * Use for:
 * - Content placeholders
 * - Better perceived performance
 * - Smooth loading transitions
 */

interface SkeletonLoaderProps {
  /**
   * Variant type
   * - text: Single line text placeholder
   * - circle: Avatar/icon placeholder
   * - rectangle: Image/card placeholder
   * - card: Full card with multiple elements
   */
  variant?: 'text' | 'circle' | 'rectangle' | 'card';

  /**
   * Width (CSS value or Tailwind class)
   */
  width?: string;

  /**
   * Height (CSS value or Tailwind class)
   */
  height?: string;

  /**
   * Number of repetitions (useful for text lines)
   */
  count?: number;

  /**
   * Additional className
   */
  className?: string;

  /**
   * Animation speed
   */
  speed?: 'slow' | 'normal' | 'fast';
}

const SkeletonItem = ({
  variant = 'text',
  width,
  height,
  className,
  speed = 'normal',
}: Omit<SkeletonLoaderProps, 'count'>): JSX.Element => {
  const baseStyles = cn(
    'relative overflow-hidden',
    'bg-gray-200 dark:bg-gray-700',
    'before:absolute before:inset-0',
    'before:-translate-x-full',
    'before:bg-gradient-to-r',
    'before:from-transparent before:via-white/60 before:to-transparent',
    'dark:before:via-white/10',
    speed === 'slow' && 'before:animate-shimmer-slow',
    speed === 'normal' && 'before:animate-shimmer',
    speed === 'fast' && 'before:animate-shimmer-fast',
  );

  const variants = {
    text: 'h-4 rounded',
    circle: 'rounded-full',
    rectangle: 'rounded-lg',
    card: 'rounded-xl p-4',
  };

  const style = {
    width: width ?? (variant === 'circle' ? '48px' : '100%'),
    height: height ?? (variant === 'circle' ? '48px' : variant === 'text' ? '16px' : '200px'),
  };

  if (variant === 'card') {
    return (
      <div className={cn(baseStyles, variants.card, className)} style={style}>
        <div className='space-y-4'>
          {/* Header */}
          <div className='flex items-center gap-3'>
            <div className='h-12 w-12 rounded-full bg-gray-300 dark:bg-gray-600' />
            <div className='flex-1 space-y-2'>
              <div className='h-4 w-3/4 rounded bg-gray-300 dark:bg-gray-600' />
              <div className='h-3 w-1/2 rounded bg-gray-300 dark:bg-gray-600' />
            </div>
          </div>

          {/* Content */}
          <div className='space-y-2'>
            <div className='h-3 w-full rounded bg-gray-300 dark:bg-gray-600' />
            <div className='h-3 w-5/6 rounded bg-gray-300 dark:bg-gray-600' />
            <div className='h-3 w-4/6 rounded bg-gray-300 dark:bg-gray-600' />
          </div>

          {/* Footer */}
          <div className='flex gap-2'>
            <div className='h-8 w-20 rounded bg-gray-300 dark:bg-gray-600' />
            <div className='h-8 w-20 rounded bg-gray-300 dark:bg-gray-600' />
          </div>
        </div>
      </div>
    );
  }

  return <div className={cn(baseStyles, variants[variant], className)} style={style} />;
};

export const SkeletonLoader = ({
  variant = 'text',
  width,
  height,
  count = 1,
  className,
  speed = 'normal',
}: SkeletonLoaderProps): JSX.Element => {
  if (count === 1) {
    return (
      <SkeletonItem
        variant={variant}
        width={width}
        height={height}
        className={className}
        speed={speed}
      />
    );
  }

  return (
    <div className='space-y-3'>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonItem
          key={index}
          variant={variant}
          width={width}
          height={height}
          className={className}
          speed={speed}
        />
      ))}
    </div>
  );
};

/**
 * Pre-built skeleton layouts for common use cases
 */

export const SkeletonCard = ({ className }: { className?: string }): JSX.Element => (
  <SkeletonLoader variant='card' className={className} />
);

export const SkeletonText = ({
  lines = 3,
  className,
}: {
  lines?: number;
  className?: string;
}): JSX.Element => <SkeletonLoader variant='text' count={lines} className={className} />;

export const SkeletonAvatar = ({
  size = '48px',
  className,
}: {
  size?: string;
  className?: string;
}): JSX.Element => (
  <SkeletonLoader variant='circle' width={size} height={size} className={className} />
);

export const SkeletonImage = ({
  width = '100%',
  height = '200px',
  className,
}: {
  width?: string;
  height?: string;
  className?: string;
}): JSX.Element => (
  <SkeletonLoader variant='rectangle' width={width} height={height} className={className} />
);
