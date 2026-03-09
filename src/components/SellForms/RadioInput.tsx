import React from 'react';

interface Option {
  value: string | number;
  label: string; // optional if label different from value
}

interface RadioGroupProps {
  label: string;
  name: string;
  value: string | boolean | undefined;
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
      <label className="mb-4 block text-lg font-bold tracking-wide dark:text-slate-300">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <div className="flex flex-wrap gap-6">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center text-slate-700 dark:text-slate-300"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={String(value) === String(option.value)}
              onChange={onChange}
              className="mr-2 h-4 w-4 appearance-none rounded-full border border-gray-400 checked:border-primary checked:bg-primary focus:outline-none focus:ring-2 focus:ring-primary"
              data-error={!!error}
            />
            {formatLabel(option.label || option.label)}
          </label>
        ))}
        {/* {error && <p className='mt-1 text-xs text-red-600 dark:text-red-400'>{error}</p>} */}
      </div>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
    </div>
  );
};

export default RadioGroup;
