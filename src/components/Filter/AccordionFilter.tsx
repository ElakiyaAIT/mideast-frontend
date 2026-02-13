import { useState } from 'react';
import { useTranslation } from '../../i18n';

export type FilterOption = {
  id: string;
  label: string;
  count?: number;
};

type AccordionFilterProps = {
  title: string;
  icon: string;
  options: FilterOption[];
  value: string[];
  onChange: (value: string[]) => void;
  type?: 'checkbox' | 'radio';
  headerColor?: 'orange' | 'white';
  defaultOpen?: boolean;
};

const AccordionFilter = ({
  title,
  icon,
  options,
  value,
  onChange,
  type = 'checkbox',
  defaultOpen = false,
}: AccordionFilterProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const toggle = (id: string) => {
    if (type === 'radio') {
      onChange([id]);
    } else {
      onChange(
        value.includes(id)
          ? value.filter((v) => v !== id)
          : [...value, id]
      );
    }
  };

  const selectAll = () => onChange(options.map((o) => o.id));
  const unselectAll = () => onChange([]);
  const {t}=useTranslation();

  return (
    <div
      className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-2
    ${isOpen ? 'bg-yellow-500' : 'bg-white dark:bg-gray-900'}
  `}
    >

      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-4 py-3 font-semibold transition
    ${isOpen
            ? 'bg-yellow-500 text-white'
            : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
          }
  `}
      >
        <div className="flex items-center gap-2">
          <i className={`material-icons-outlined transition ${isOpen ? 'text-white' : 'text-yellow-500'
            }`}
          >
            {icon}
          </i>
          <span>{title}</span>
        </div>

        <i
          className={`material-icons-outlined transition ${isOpen ? 'text-white' : 'text-gray-400'
            }`}
        >
          {isOpen ? 'expand_less' : 'expand_more'}
        </i>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="px-4 py-4 text-sm bg-white dark:bg-gray-900">
          {type === 'checkbox' && (
            <div className="flex justify-between text-[11px] font-semibold text-gray-400 uppercase mb-3">
              <button onClick={selectAll}>{t('buy.selectAll')}</button>
              <button onClick={unselectAll}>{t('buy.unselectAll')}</button>
            </div>
          )}

          <ul className="space-y-3">
            {options.map((opt) => {
              const checked = value.includes(opt.id);

              return (
                <li
                  key={opt.id}
                  className="flex items-center justify-between"
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <span
                      className={`relative w-5 h-5 rounded-full border
      flex items-center justify-center transition
      ${checked ? 'border-orange-500' : 'border-gray-300'}`}
                    >
                      {/* Inner outlined circle */}
                      {checked && (
                        <span className="absolute w-3.5 h-3.5 rounded-full border border-orange-500" />
                      )}

                      {/* Tick */}
                      {checked && (
                        <svg
                          viewBox="0 0 24 24"
                          className="absolute w-3 h-3 text-orange-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>

                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggle(opt.id)}
                      className="sr-only"
                    />

                    <span className="text-gray-700 dark:text-gray-300">
                      {opt.label}
                    </span>
                  </label>

                  {opt.count !== undefined && (
                    <span className="text-gray-400 text-xs">
                      {opt.count}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AccordionFilter;
