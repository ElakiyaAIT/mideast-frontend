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

interface ConditionOverviewSectionProps {
  formData: SellFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors?: NestedErrors<SellFormData>;
  options: {
    overAllCondition: Option[];
    exteriorColor: Option[];
    yesNo: Option[];
  };
}

export const ConditionOverviewSection = ({
  formData,
  handleChange,
  errors,
  options,
}: ConditionOverviewSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="sell-details-form">
      <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
        {t('sell.form.details.condition.title')}
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectInput
          placeholder="e.g., Good"
          label={t('sell.form.details.condition.overall')}
          name="condition.overallCondition"
          value={formData.condition.overallCondition}
          required={true}
          error={errors?.condition?.overallCondition}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., CAT yellow"
          label={t('sell.form.details.condition.exterior')}
          name="condition.exteriorColor"
          value={formData.condition.exteriorColor}
          required={true}
          error={errors?.condition?.exteriorColor}
          options={options.exteriorColor}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Black/Grey"
          label={t('sell.form.details.condition.interior')}
          name="condition.interiorColor"
          value={formData.condition.interiorColor}
          required={true}
          error={errors?.condition?.interiorColor}
          options={options.exteriorColor}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.condition.jumpStart')}
          name="condition.jumpStartRequired"
          value={formData.condition.jumpStartRequired || ''}
          required={true}
          error={errors?.condition?.jumpStartRequired}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.condition.batteriesHoldCharge')}
          name="condition.batteriesHoldCharge"
          value={formData.condition.batteriesHoldCharge || ''}
          required={true}
          error={errors?.condition?.batteriesHoldCharge}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.condition.parkingBrake')}
          name="condition.parkingBrakeWorks"
          value={formData.condition.parkingBrakeWorks || ''}
          required={true}
          error={errors?.condition?.parkingBrakeWorks}
          options={options.yesNo}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};
