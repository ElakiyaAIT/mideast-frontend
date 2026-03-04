import React from 'react';
import type { SellFormData } from '../../types/home';
import { useTranslation } from '../../i18n';
import { BasicDetailsSection } from './sections/BasicDetailsSection';
import { GeneralSpecsSection } from './sections/GeneralSpecsSection';
import { ConditionOverviewSection } from './sections/ConditionOverviewSection';
import { EngineConditionSection } from './sections/EngineConditionSection';
import { HydraulicsSection } from './sections/HydraulicsSection';
import { CabElectronicsSection } from './sections/CabElectronicsSection';

type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};

interface Option {
  id: number;
  value: string;
}

interface DetailsProps {
  formData: SellFormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setFormData?: React.Dispatch<React.SetStateAction<SellFormData>>;
  errors?: NestedErrors<SellFormData>;
  options: {
    transmission: Option[];
    engineType: Option[];
    fuelType: Option[];
    cabType: Option[];
    suspension: Option[];
    overAllCondition: Option[];
    exteriorColor: Option[];
    yesNo: Option[];
    coldStartQuality: Option[];
    engineNoise: Option[];
  };
}

const Details = ({ formData, handleChange, options, errors }: DetailsProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className="mb-8 text-xl font-bold uppercase tracking-tight dark:text-slate-300">
        {t('sell.form.details.title')}
      </h3>

      <div className="space-y-12">
        <BasicDetailsSection formData={formData} handleChange={handleChange} errors={errors} />

        <GeneralSpecsSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          options={options}
        />

        <ConditionOverviewSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          options={options}
        />

        <EngineConditionSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          options={options}
        />

        <HydraulicsSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          options={options}
        />

        <CabElectronicsSection
          formData={formData}
          handleChange={handleChange}
          errors={errors}
          options={options}
        />
      </div>
    </div>
  );
};

export default Details;
