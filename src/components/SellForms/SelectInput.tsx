import React from "react";

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
}

export const SelectInput = ({
  label,
  name,
  value,
  options,
  onChange,
  placeholder,
}: SelectInputProps) => {
  return (
    <div>
      <label className="mb-2 block text-lg font-bold  tracking-wide  dark:text-slate-300">
        {label}
      </label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 bg-slate-50 p-3 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900"
      >
        <option value="">{placeholder || `Select ${label}`}</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
