import React from 'react';

interface Option {
  id: string | number;
  value: string;
}

interface SelectInputProps {
  label?: string;
  name: string;
  value?: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const SelectInput = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder,
  error,
  required = false,
}: SelectInputProps) => {
  const isEmpty = !value;

  return (
    <div>
      <label className="mb-2 block text-lg font-bold tracking-wide dark:text-slate-300">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <select
        name={name}
        value={value || ''}
        onChange={onChange}
        data-error={!!error}
        className={`bg-slate-10 w-full rounded-lg border border-slate-200 p-3 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 ${isEmpty ? 'text-slate-400' : 'text-slate-900 dark:text-white'} ${error && 'border-red-500 focus:border-red-500 focus:ring-red-500'} `}
      >
        <option value="" disabled hidden>
          {placeholder || `Select ${label}`}
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.id} style={{ color: '#0f172a' }}>
            {option.value}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
