import { useState } from 'react';
import { conditionSections } from './ConditionCheckList/conditionSectionConst';
import ConditionSection from './ConditionCheckList/ConditionSection';
import { useTranslation } from '../../i18n';
import type { SellFormData } from '../../types/home';
import React from 'react';

type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};
interface Props {
  formData: SellFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors?: NestedErrors<SellFormData>;
}

const ConditionChecklist = ({ formData, setFormData, errors, handleChange }: Props) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<keyof SellFormData['checkList']>('exterior');

  const sections = Object.entries(conditionSections) as [
    keyof SellFormData['checkList'],
    (typeof conditionSections)[keyof typeof conditionSections],
  ][];

  return (
    <>
      <link
        href='https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined'
        rel='stylesheet'
      />
      <div>
        <h3 className='mb-8 text-xl font-bold uppercase'>
          {t('sell.form.conditionCheckList.title')}
        </h3>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* LEFT SIDEBAR */}
          <div className='space-y-4'>
            {sections.map(([key, section], index) => {
              const isActive = activeTab === key;
              const activeIndex = sections.findIndex(([k]) => k === activeTab);
              const isCompleted = index < activeIndex;

              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
          relative flex w-full items-center justify-between
          rounded-full px-4 py-2 font-bold transition-all duration-300
          ${
            isActive
              ? 'bg-primary text-white shadow-lg text-sm'
              : 'border border-slate-400 text-sm text-slate-700 bg-transparent hover:border-primary dark:border-slate-600 dark:text-slate-300'
          }
        `}
                >
                  {/* Left Side */}
                  <div className='flex items-center gap-3 uppercase'>
                    {/* Icon Circle */}
                    <div
                      className={`
              w-10 h-10 flex items-center justify-center rounded-full
              ${isActive ? 'bg-white/20' : 'bg-slate-700 text-white'}
            `}
                    >
                      <span className='material-symbols-outlined'>{section.icon}</span>
                    </div>
                    {t(section.label)}
                  </div>

                  {/* Green Tick for Completed */}
                  {isCompleted && (
                    <div className='absolute right-4'>
                      <div className='w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-sm'>
                        ✓
                      </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* RIGHT CONTENT */}
          <div className='lg:col-span-3'>
            {sections.map(([key, section]) =>
              activeTab === key ? (
                <ConditionSection
                  key={key}
                  sectionKey={key}
                  title={t(section.title)}
                  items={
                    section.items as {
                      key: keyof SellFormData['checkList'][keyof SellFormData['checkList']];
                      label: string;
                    }[]
                  }
                  formData={formData}
                  setFormData={setFormData}
                  handleChange={handleChange}
                  errors={errors}
                />
              ) : null,
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ConditionChecklist;
