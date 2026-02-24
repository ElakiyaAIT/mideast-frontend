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
  radio?: boolean;
};

const AccordionFilter = ({
  title,
  icon,
  options,
  value,
  onChange,
  type = 'checkbox',
  defaultOpen = false,
  radio = false,
}: AccordionFilterProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [isSelected, setIsSelected] = useState(false);

  const toggle = (id: string) => {
    if (radio) {
      onChange([id]);
    } else {
      onChange(value.includes(id) ? value.filter((v) => v !== id) : [...value, id]);
    }
  };

  const selectAll = () => {
    setIsSelected(true);
    onChange(options.map((o) => o.id));
  };
  const unselectAll = () => {
    setIsSelected(false);
    onChange([]);
  };
  const { t } = useTranslation();

  return (
    <div
      className={`mb-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 ${isOpen ? 'bg-[#fdad3e]' : 'bg-white dark:bg-gray-900'} `}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between px-4 py-3 font-semibold transition ${
          isOpen
            ? 'bg-[#fdad3e] text-white'
            : 'bg-white text-gray-800 hover:bg-gray-50 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800'
        } `}
      >
        <div className="flex items-center gap-2">
          <i
            className={`material-icons-outlined transition ${
              isOpen ? 'text-white' : 'text-[#fdad3e]'
            }`}
          >
            {icon}
          </i>
          <span>{title}</span>
        </div>

        <i
          className={`material-icons-outlined transition ${
            isOpen ? 'text-white' : 'text-gray-400'
          }`}
        >
          {isOpen ? 'remove' : 'add'}
        </i>
      </button>

      {/* Content */}
      {isOpen && (
        <div className="bg-white px-4 py-4 text-sm dark:bg-gray-900">
          {radio && (
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Zip Code
              </label>
              <input
                type="text"
                placeholder="Enter zip code"
                className="w-32 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#eab308] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              />
            </div>
          )}
          {type === 'checkbox' && !radio && (
            <div className="mb-3 flex justify-between text-[11px] font-semibold uppercase text-gray-400">
              <button style={{ color: isSelected ? '#fdad3e' : 'inherit' }} onClick={selectAll}>
                {t('buy.selectAll')}
              </button>
              <button onClick={unselectAll}>{t('buy.unselectAll')}</button>
            </div>
          )}

          <ul className="space-y-3">
            {options.map((opt) => {
              const checked = value.includes(opt.id);

              return (
                <li key={opt.id} className="flex items-center justify-between">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type={radio ? 'radio' : 'checkbox'}
                      name={radio ? title : opt.id} // radios need same name
                      checked={checked}
                      onChange={() => toggle(opt.id)}
                      className={` ${radio ? 'h-4 w-4 accent-[#fdad3e]' : 'sr-only'} `}
                    />

                    {/* Custom checkbox UI only for checkbox mode */}
                    {!radio && (
                      <span
                        className={`relative flex h-5 w-5 items-center justify-center rounded-full border transition ${checked ? 'border-orange-500' : 'border-gray-300'} `}
                      >
                        {checked && (
                          <>
                            <span className="absolute h-3.5 w-3.5 rounded-full border border-orange-500" />
                            <svg
                              viewBox="0 0 24 24"
                              className="absolute h-3 w-3 text-orange-500"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          </>
                        )}
                      </span>
                    )}

                    <span className="text-gray-700 dark:text-gray-300">{opt.label}</span>
                  </label>

                  {opt.count !== undefined && (
                    <span className="text-xs text-gray-400">{opt.count}</span>
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
