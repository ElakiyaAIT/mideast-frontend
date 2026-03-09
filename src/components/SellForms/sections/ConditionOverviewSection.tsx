import React from 'react';
import type { SellFormData } from '../../../types/home';
import { SelectInput } from '../SelectInput';
import RadioGroup from '../RadioInput';
import { useTranslation } from '../../../i18n';
type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};
interface Option {
  value: string | number;
  label: string;
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
          name="conditionOverview.overallCondition"
          value={formData.conditionOverview.overallCondition}
          required={true}
          error={errors?.conditionOverview?.overallCondition}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., CAT yellow"
          label={t('sell.form.details.condition.exterior')}
          name="conditionOverview.exteriorColor"
          value={formData.conditionOverview.exteriorColor}
          required={true}
          error={errors?.conditionOverview?.exteriorColor}
          options={options.exteriorColor}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Black/Grey"
          label={t('sell.form.details.condition.interior')}
          name="conditionOverview.interiorColor"
          value={formData.conditionOverview.interiorColor}
          required={true}
          error={errors?.conditionOverview?.interiorColor}
          options={options.exteriorColor}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.condition.jumpStart')}
          name="conditionOverview.jumpStartRequired"
          value={formData.conditionOverview.jumpStartRequired || ''}
          required={true}
          error={errors?.conditionOverview?.jumpStartRequired}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.condition.batteriesHoldCharge')}
          name="conditionOverview.batteriesHoldCharge"
          value={formData.conditionOverview.batteriesHoldCharge || ''}
          required={true}
          error={errors?.conditionOverview?.batteriesHoldCharge}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.condition.parkingBrake')}
          name="conditionOverview.parkingBrakeWorks"
          value={formData.conditionOverview.parkingBrakeWorks || ''}
          required={true}
          error={errors?.conditionOverview?.parkingBrakeWorks}
          options={options.yesNo}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};
