import React from 'react';
import type { SellFormData } from '../../../types/home';
import { TextInput } from '../TextInput';
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

interface GeneralSpecsSectionProps {
  formData: SellFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors?: NestedErrors<SellFormData>;
  options: {
    transmission: Option[];
    engineType: Option[];
    fuelType: Option[];
    cabType: Option[];
    suspension: Option[];
  };
}

export const GeneralSpecsSection = ({
  formData,
  handleChange,
  errors,
  options,
}: GeneralSpecsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="sell-details-form">
      <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
        {t('sell.form.details.general.title')}
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectInput
          required={true}
          error={errors?.general?.transmission}
          placeholder="eg.,hydrostatic"
          label={t('sell.form.details.general.transmission')}
          name="general.transmission"
          value={formData.general.transmission}
          options={options.transmission}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., CAT c4.4 ACERT"
          label={t('sell.form.details.general.engineType')}
          name="general.engineType"
          value={formData.general.engineType}
          required={true}
          error={errors?.general?.engineType}
          options={options.engineType}
          onChange={handleChange}
        />

        <TextInput
          label={t('sell.form.details.general.grossPower')}
          name="general.grossPower"
          placeholder="e.g., 121"
          value={formData.general.grossPower || ''}
          required={true}
          error={errors?.general?.grossPower}
          onChange={handleChange}
        />

        <TextInput
          label={t('sell.form.details.general.operatingWeight')}
          name="general.operatingWeight"
          placeholder="e.g., 22000"
          value={formData.general.operatingWeight || ''}
          required={true}
          error={errors?.general?.operatingWeight}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Diesel"
          label={t('sell.form.details.general.fuelType')}
          name="general.fuelType"
          value={formData.general.fuelType}
          required={true}
          error={errors?.general?.fuelType}
          options={options.fuelType}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Enclosed ROPS/FOPS"
          label={t('sell.form.details.general.cabType')}
          name="general.cabType"
          value={formData.general.cabType}
          required={true}
          error={errors?.general?.cabType}
          options={options.cabType}
          onChange={handleChange}
        />

        <TextInput
          label={t('sell.form.details.general.tireTrackSize')}
          name="general.tireTrackSize"
          placeholder="e.g., 600mm"
          value={formData.general.tireTrackSize || ''}
          required={true}
          error={errors?.general?.tireTrackSize}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.general.suspensionType')}
          name="general.suspension"
          value={formData.general.suspension || ''}
          required={true}
          error={errors?.general?.suspension}
          options={options.suspension}
          onChange={handleChange}
        />
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-lg font-bold tracking-wide dark:text-slate-300">
            {t('sell.form.details.general.tireTrackWear')}
            <span className="ml-1 text-red-500">*</span>
          </label>
          <span className="font-semibold text-orange-500">
            {formData.general.tireTrackWear || '0'}%
          </span>
        </div>

        <div className="relative mb-2 w-full">
          <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-slate-200 dark:bg-slate-700"></div>
          <div
            className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-orange-500 transition-all duration-200"
            style={{ width: `${formData.general.tireTrackWear || '0'}%` }}
          ></div>
          <input
            type="range"
            min="0"
            max="100"
            name="general.tireTrackWear"
            value={formData.general.tireTrackWear || '0'}
            onChange={handleChange}
            className="relative z-10 w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border [&::-webkit-slider-thumb]:border-slate-300 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow"
          />
        </div>

        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
          <span>0%</span>
          <span>100%</span>
        </div>
        {errors?.general?.tireTrackWear && (
          <p className="mt-1 text-xs text-red-600 dark:text-red-400">
            {errors.general?.tireTrackWear}
          </p>
        )}
      </div>
    </section>
  );
};
