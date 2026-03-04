import React from 'react';
import type { SellFormData } from '../../../types/home';
import { TextInput } from '../TextInput';
import { useTranslation } from '../../../i18n';

type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};
interface BasicDetailsSectionProps {
  formData: SellFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors?: NestedErrors<SellFormData>;
}

export const BasicDetailsSection = ({
  formData,
  handleChange,
  errors,
}: BasicDetailsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="sell-details-form">
      <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
        {t('sell.form.details.basic.title')}
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TextInput
          error={errors?.basicDetails?.year}
          required={true}
          label={t('sell.form.details.basic.year')}
          name="basicDetails.year"
          placeholder="e.g., 2020"
          value={formData.basicDetails.year || ''}
          onChange={handleChange}
        />

        <TextInput
          error={errors?.basicDetails?.make}
          required={true}
          label={t('sell.form.details.basic.make')}
          name="basicDetails.make"
          placeholder="Caterpillar"
          value={formData.basicDetails.make || ''}
          onChange={handleChange}
        />

        <TextInput
          error={errors?.basicDetails?.model}
          required={true}
          label={t('sell.form.details.basic.model')}
          name="basicDetails.model"
          placeholder="e.g., 320D"
          value={formData.basicDetails.model || ''}
          onChange={handleChange}
        />

        <TextInput
          error={errors?.basicDetails?.manufacturer}
          required={true}
          label={t('sell.form.details.basic.manufacturer')}
          name="basicDetails.manufacturer"
          placeholder="e.g., Caterpillar Inc"
          value={formData.basicDetails.manufacturer || ''}
          onChange={handleChange}
        />

        <TextInput
          error={errors?.basicDetails?.engineHours}
          required={true}
          label={t('sell.form.details.basic.engineHours')}
          name="basicDetails.engineHours"
          placeholder="e.g., 4,750"
          value={formData.basicDetails.engineHours || ''}
          onChange={handleChange}
        />

        <TextInput
          error={errors?.basicDetails?.mileage}
          required={true}
          label={t('sell.form.details.basic.mileage')}
          name="basicDetails.mileage"
          placeholder="e.g.,12000"
          value={formData.basicDetails.mileage || ''}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};
