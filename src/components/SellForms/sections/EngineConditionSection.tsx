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

interface EngineConditionSectionProps {
  formData: SellFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors?: NestedErrors<SellFormData>;
  options: {
    overAllCondition: Option[];
    yesNo: Option[];
    engineNoise: Option[];
    coldStartQuality: Option[];
    smokeColor: Option[];
  };
}

export const EngineConditionSection = ({
  formData,
  handleChange,
  errors,
  options,
}: EngineConditionSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="sell-details-form">
      <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
        {t('sell.form.details.engine.title')}
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <SelectInput
          placeholder="e.g., Clean"
          label={t('sell.form.details.engine.overall')}
          name="engineCondition.overAllCondition"
          value={formData.engineCondition.overAllCondition}
          required={true}
          error={errors?.engineCondition?.overAllCondition}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.engine.oilLevel')}
          name="engineCondition.oilLevelOk"
          value={formData.engineCondition.oilLevelOk || ''}
          required={true}
          error={errors?.engineCondition?.oilLevelOk}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.engine.anyLeaks')}
          name="engineCondition.anyLeaks"
          value={formData.engineCondition?.anyLeaks || ''}
          required={true}
          error={errors?.engineCondition?.anyLeaks}
          options={options.yesNo}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Good"
          label={t('sell.form.details.engine.coolantLevel')}
          name="engineCondition.coolantLevel"
          value={formData.engineCondition.coolantLevel || ''}
          required={true}
          error={errors?.engineCondition?.coolantLevel}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Black"
          label={t('sell.form.details.engine.smokeColor')}
          name="engineCondition.smokeColor"
          value={formData.engineCondition.smokeColor || ''}
          required={true}
          error={errors?.engineCondition?.smokeColor}
          options={options.smokeColor}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g.. slight knock"
          label={t('sell.form.details.engine.engineNoise')}
          name="engineCondition.engineNoise"
          value={formData.engineCondition.engineNoise || ''}
          required={true}
          error={errors?.engineCondition?.engineNoise}
          options={options.engineNoise}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Black"
          label={t('sell.form.details.engine.coldStartQuality')}
          name="engineCondition.coldStartQuality"
          value={formData.engineCondition.coldStartQuality}
          required={true}
          error={errors?.engineCondition?.coldStartQuality}
          options={options.coldStartQuality}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.engine.checkEngineLight')}
          name="engineCondition.checkEngineLight"
          value={formData.engineCondition.checkEngineLight || ''}
          required={true}
          error={errors?.engineCondition?.checkEngineLight}
          options={options.yesNo}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};
