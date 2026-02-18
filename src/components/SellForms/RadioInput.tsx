import React from 'react';

interface Option {
  id: number | string;
  value: string;
  label?: string; // optional if label different from value
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}
const formatLabel = (text: string) =>
  text
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const RadioGroup = ({
  label,
  name,
  value,
  options,
  required = false,
  error,
  onChange,
}: RadioGroupProps) => {
  return (
    <div>
      <label className='mb-4 block text-lg font-bold tracking-wide  dark:text-slate-300'>
        {label}
        {required && <span className='ml-1 text-red-500'>*</span>}
      </label>

      <div className='flex gap-6 flex-wrap'>
        {options.map((option) => (
          <label
            key={option.id}
            className='flex items-center text-slate-700 dark:text-slate-300 cursor-pointer'
          >
            <input
              type='radio'
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              className='mr-2 accent-primary'
            />
            {formatLabel(option.label || option.value)}
          </label>
        ))}
        {/* {error && <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{error}</p>} */}
      </div>
      {error && <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{error}</p>}
    </div>
  );
};

export default RadioGroup;
