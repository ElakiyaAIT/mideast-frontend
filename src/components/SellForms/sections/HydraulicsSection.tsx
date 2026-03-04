import React from 'react';
import type { SellFormData } from '../../../types/home';
import { SelectInput } from '../SelectInput';
import RadioGroup from '../RadioInput';
import { useTranslation } from '../../../i18n';
type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};
interface Option {
  id: number;
  value: string;
}

interface HydraulicsSectionProps {
  formData: SellFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors?: NestedErrors<SellFormData>;
  options: {
    overAllCondition: Option[];
    yesNo: Option[];
  };
}

export const HydraulicsSection = ({
  formData,
  handleChange,
  errors,
  options,
}: HydraulicsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="sell-details-form">
      <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
        {t('sell.form.details.hydraulics.title')}
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectInput
          placeholder="e.g., Good"
          label={t('sell.form.details.hydraulics.hydraulicPump')}
          name="hydraulics.hydraulicPumpCondition"
          value={formData.hydraulics.hydraulicPumpCondition}
          required={true}
          error={errors?.hydraulics?.hydraulicPumpCondition}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.hydraulics.cylinderLeaks')}
          name="hydraulics.cylinderLeaks"
          value={formData.hydraulics.cylinderLeaks || ''}
          required={true}
          error={errors?.hydraulics?.cylinderLeaks}
          options={options.yesNo}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Good-minor wear"
          label={t('sell.form.details.hydraulics.hoseCondition')}
          name="hydraulics.hoseCondition"
          value={formData.hydraulics?.hoseCondition || ''}
          required={true}
          error={errors?.hydraulics?.hoseCondition}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Good"
          label={t('sell.form.details.hydraulics.hydraulicResponse')}
          name="hydraulics.hydraulicResponse"
          value={formData.hydraulics.hydraulicResponse || ''}
          required={true}
          error={errors?.hydraulics?.hydraulicResponse}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.hydraulics.hydraulicDamage')}
          name="hydraulics.hydraulicsDamage"
          value={formData.hydraulics.hydraulicsDamage || ''}
          required={true}
          error={errors?.hydraulics?.hydraulicsDamage}
          options={options.yesNo}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};
