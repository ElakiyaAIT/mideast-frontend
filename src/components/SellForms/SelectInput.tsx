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
  const isEmpty = !value;

  return (
    <div>
      <label className="mb-2 block text-lg font-bold  tracking-wide  dark:text-slate-300">
        {label}
      </label>

      <select
        name={name}
        value={value || ""}
        onChange={onChange}
        className={`w-full rounded-lg border border-slate-200 bg-slate-50 p-3 focus:border-primary focus:ring-primary dark:border-slate-700 dark:bg-slate-900
        ${isEmpty ? "text-slate-400" : "text-slate-900 dark:text-white"}`}


      >
        <option value="" disabled hidden>{placeholder || `Select ${label}`}</option>

        {options.map((option) => (
          <option key={option.id} value={option.id} style={{ color: "#0f172a" }} >
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
