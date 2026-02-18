import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../utils';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, error, className, required = false, type = 'text', ...props }, ref) => {
    return (
      <div className='w-full'>
        {label && (
          <label className='mb-2 block text-lg font-bold tracking-wide dark:text-slate-300'>
            {label}
            {required && <span className='ml-1 text-red-500'>*</span>}
          </label>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full rounded-lg border bg-slate-10 dark:bg-slate-900',
            'border-slate-200 dark:border-slate-700',
            'p-3 text-sm text-slate-900 dark:text-white',
            'placeholder:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
            'transition-all duration-200',

            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',

            className,
          )}
          {...props}
        />

        {error && <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{error}</p>}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
