import { type InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full rounded-xl px-4 py-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500/50',
            'glass-light text-gray-900 dark:text-gray-100',
            'border border-white/30 dark:border-white/10',
            'placeholder:text-gray-400 dark:placeholder:text-gray-500',
            'hover:glass hover:border-white/40 hover:shadow-frost dark:hover:border-white/15',
            'focus:glass-brand focus:border-primary-500/50 focus:shadow-glow',
            error && 'border-red-500/50 focus:border-red-500 focus:ring-red-500/50',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = 'Input';
