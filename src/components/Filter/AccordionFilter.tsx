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
      className={`border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4
    ${isOpen ? 'bg-[#fdad3e]' : 'bg-white dark:bg-gray-900'}
  `}
    >
      {/* Header */}
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full flex items-center justify-between px-4 py-3 font-semibold transition
    ${
      isOpen
        ? 'bg-[#fdad3e] text-white'
        : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
    }
  `}
      >
        <div className='flex items-center gap-2'>
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
        <div className='px-4 py-4 text-sm bg-white dark:bg-gray-900'>
          {radio && (
            <div className='mb-4'>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Zip Code
              </label>
              <input
                type='text'
                placeholder='Enter zip code'
                className='w-32 px-3 py-2 border border-gray-300 rounded-md 
                     focus:outline-none focus:ring-2 focus:ring-[#eab308]
                     dark:bg-gray-800 dark:border-gray-600 dark:text-white'
              />
            </div>
          )}
          {type === 'checkbox' && !radio && (
            <div className='flex justify-between text-[11px] font-semibold text-gray-400 uppercase mb-3'>
              <button style={{ color: isSelected ? '#fdad3e' : 'inherit' }} onClick={selectAll}>
                {t('buy.selectAll')}
              </button>
              <button onClick={unselectAll}>{t('buy.unselectAll')}</button>
            </div>
          )}

          <ul className='space-y-3'>
            {options.map((opt) => {
              const checked = value.includes(opt.id);

              return (
                <li key={opt.id} className='flex items-center justify-between'>
                  <label className='flex items-center gap-3 cursor-pointer'>
                    <input
                      type={radio ? 'radio' : 'checkbox'}
                      name={radio ? title : opt.id} // radios need same name
                      checked={checked}
                      onChange={() => toggle(opt.id)}
                      className={`
              ${radio ? 'w-4 h-4 accent-[#fdad3e]' : 'sr-only'}
            `}
                    />

                    {/* Custom checkbox UI only for checkbox mode */}
                    {!radio && (
                      <span
                        className={`relative w-5 h-5 rounded-full border
                flex items-center justify-center transition
                ${checked ? 'border-orange-500' : 'border-gray-300'}
              `}
                      >
                        {checked && (
                          <>
                            <span className='absolute w-3.5 h-3.5 rounded-full border border-orange-500' />
                            <svg
                              viewBox='0 0 24 24'
                              className='absolute w-3 h-3 text-orange-500'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='3'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            >
                              <polyline points='20 6 9 17 4 12' />
                            </svg>
                          </>
                        )}
                      </span>
                    )}

                    <span className='text-gray-700 dark:text-gray-300'>{opt.label}</span>
                  </label>

                  {opt.count !== undefined && (
                    <span className='text-gray-400 text-xs'>{opt.count}</span>
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
