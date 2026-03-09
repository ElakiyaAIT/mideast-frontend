import React from 'react';

interface Option {
  value: string | number;
  label: string;
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
  setLabelValue?: (label: string) => void; // optional
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
  setLabelValue,
}: SelectInputProps) => {
  const isEmpty = !value;
  const inputId = `select-${name}`;
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e);

    // only run if passed
    if (setLabelValue) {
      const selected = options.find((opt) => String(opt.value) === e.target.value);
      if (selected) {
        setLabelValue(selected.label);
      }
    }
  };
  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2 block text-lg font-bold tracking-wide dark:text-slate-300"
      >
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <select
        name={name}
        id={inputId}
        value={value || ''}
        onChange={handleChange}
        data-error={!!error}
        className={`bg-slate-10 w-full rounded-lg border border-slate-200 p-3 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900 ${isEmpty ? 'text-slate-400' : 'text-slate-900 dark:text-white'} ${error && 'border-red-500 focus:border-red-500 focus:ring-red-500'} `}
      >
        <option value="" disabled hidden>
          {placeholder || `Select ${label}`}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value} style={{ color: '#0f172a' }}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
