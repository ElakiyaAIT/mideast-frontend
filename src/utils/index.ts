import { clsx, type ClassValue } from 'clsx';

export const cn = (...inputs: ClassValue[]): string => {
  return clsx(inputs);
};

export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Re-export validation utilities
export * from './validation';
export * from './toast';

// Re-export API loader interceptor (optional)
export * from './apiLoaderInterceptor';
