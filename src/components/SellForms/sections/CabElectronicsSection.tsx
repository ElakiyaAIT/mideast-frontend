import React from 'react';
import type { SellFormData } from '../../../types/home';
import { SelectInput } from '../SelectInput';
import RadioGroup from '../RadioInput';
import { useTranslation } from '../../../i18n';
import { type Option } from '../../../pages/public/SellPage.constants';
type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};
interface CabElectronicsSectionProps {
  formData: SellFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors?: NestedErrors<SellFormData>;
  options: {
    overAllCondition: Option[];
    yesNo: Option[];
  };
}

export const CabElectronicsSection = ({
  formData,
  handleChange,
  errors,
  options,
}: CabElectronicsSectionProps) => {
  const { t } = useTranslation();

  return (
    <section className="sell-details-form">
      <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
        {t('sell.form.details.cabElectronics.title')}
      </h4>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <RadioGroup
          label={t('sell.form.details.cabElectronics.dashboardFunctional')}
          name="cabElectronics.dashboardFunctional"
          value={formData.cabElectronics.dashboardFunctional}
          required={true}
          error={errors?.cabElectronics?.dashboardFunctional}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.cabElectronics.acHeater')}
          name="cabElectronics.acHeaterWorking"
          value={formData.cabElectronics.acHeaterWorking || ''}
          required={true}
          error={errors?.cabElectronics?.acHeaterWorking}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.cabElectronics.displayErrors')}
          name="cabElectronics.displayErrors"
          value={formData.cabElectronics.displayErrors || ''}
          required={true}
          error={errors?.cabElectronics?.displayErrors}
          options={options.yesNo}
          onChange={handleChange}
        />

        <SelectInput
          placeholder="e.g., Good-minor wear"
          label={t('sell.form.details.cabElectronics.seatCondition')}
          name="cabElectronics.seatCondition"
          value={formData.cabElectronics.seatCondition || ''}
          required={true}
          error={errors?.cabElectronics?.seatCondition}
          options={options.overAllCondition}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.cabElectronics.controlsWorking')}
          name="cabElectronics.controlsWorking"
          value={formData.cabElectronics.controlsWorking || ''}
          required={true}
          error={errors?.cabElectronics?.controlsWorking}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.cabElectronics.lightsWorking')}
          name="cabElectronics.lightsWorking"
          value={formData.cabElectronics.lightsWorking || ''}
          required={true}
          error={errors?.cabElectronics?.lightsWorking}
          options={options.yesNo}
          onChange={handleChange}
        />

        <RadioGroup
          label={t('sell.form.details.cabElectronics.sensorsWorking')}
          name="cabElectronics.sensorsWorking"
          value={formData.cabElectronics.sensorsWorking || ''}
          required={true}
          error={errors?.cabElectronics?.sensorsWorking}
          options={options.yesNo}
          onChange={handleChange}
        />
      </div>
    </section>
  );
};
