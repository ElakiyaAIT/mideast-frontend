import React from 'react';
import type { SellFormData } from '../../types/home';
import { TextInput } from './TextInput';
import { SelectInput } from './SelectInput';
import RadioGroup from './RadioInput';
import { useTranslation } from '../../i18n';
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
        {/* BASIC DETAILS */}
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

        {/* GENERAL SPECIFICATIONS */}
        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.details.general.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Transmission */}

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
            {/* Engine Type */}

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

            {/* Gross Power */}

            <TextInput
              label={t('sell.form.details.general.grossPower')}
              name="general.grossPower"
              placeholder="e.g., 121"
              value={formData.general.grossPower || ''}
              required={true}
              error={errors?.general?.grossPower}
              onChange={handleChange}
            />

            {/* Operating Weight */}

            <TextInput
              label={t('sell.form.details.general.operatingWeight')}
              name="general.operatingWeight"
              placeholder="e.g., 22000"
              value={formData.general.operatingWeight || ''}
              required={true}
              error={errors?.general?.operatingWeight}
              onChange={handleChange}
            />
            {/* Fuel Type */}
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

            {/* Cab Type */}
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

            {/* Tire/Track Size */}

            <TextInput
              label={t('sell.form.details.general.tireTrackSize')}
              name="general.tireTrackSize"
              placeholder="e.g., 600mm"
              value={formData.general.tireTrackSize || ''}
              required={true}
              error={errors?.general?.tireTrackSize}
              onChange={handleChange}
            />
            {/* Suspension Type */}
            <RadioGroup
              label={t('sell.form.details.general.suspensionType')}
              name="general.suspension"
              value={formData.general.suspension || ''}
              required={true}
              error={errors?.general?.suspension}
              options={options.suspension}
              onChange={handleChange}
            />

            {/* Tire/Track Wear */}
          </div>
          <div>
            {/* Top Row */}
            <div className="mb-2 flex items-center justify-between">
              <label className="text-lg font-bold tracking-wide dark:text-slate-300">
                {t('sell.form.details.general.tireTrackWear')}
                <span className="ml-1 text-red-500">*</span>
              </label>

              <span className="font-semibold text-orange-500">
                {formData.general.tireTrackWear || '0'}%
              </span>
            </div>

            {/* Slider */}
            <div className="relative mb-2 w-full">
              {/* Background Track */}
              <div className="absolute top-1/2 h-2 w-full -translate-y-1/2 rounded-full bg-slate-200 dark:bg-slate-700"></div>

              {/* Filled Track */}
              <div
                className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-orange-500 transition-all duration-200"
                style={{
                  width: `${formData.general.tireTrackWear || '0'}%`,
                }}
              ></div>

              {/* Range Input */}
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

            {/* Bottom Labels */}
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

        {/* Condition OverView */}
        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.details.condition.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Overall Condition */}

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
            {/* Exterior Color */}

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

            {/* Interior color */}

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

            {/* Jump start required*/}

            <RadioGroup
              label={t('sell.form.details.condition.jumpStart')}
              name="condition.jumpStartRequired"
              value={formData.condition.jumpStartRequired || ''}
              required={true}
              error={errors?.condition?.jumpStartRequired}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Batteries Hold charge */}
            <RadioGroup
              label={t('sell.form.details.condition.batteriesHoldCharge')}
              name="condition.batteriesHoldCharge"
              value={formData.condition.batteriesHoldCharge || ''}
              required={true}
              error={errors?.condition?.batteriesHoldCharge}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Parking Brake Works*/}
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

        {/*Engine Condition */}
        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.details.engine.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Overall Condition */}

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
            {/* Oil Level OK? */}

            <RadioGroup
              label={t('sell.form.details.engine.oilLevel')}
              name="engineCondition.oilLevelOk"
              value={formData.engineCondition.oilLevelOk || ''}
              required={true}
              error={errors?.engineCondition?.oilLevelOk}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Any Leaks? */}

            <RadioGroup
              label={t('sell.form.details.engine.anyLeaks')}
              name="engineCondition.anyLeaks"
              value={formData.engineCondition?.anyLeaks || ''}
              required={true}
              error={errors?.engineCondition?.anyLeaks}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Coolant level*/}

            <SelectInput
              placeholder="e.g., Good"
              label={t('sell.form.details.engine.coolantLevel')}
              name="engineCondition.coolantLevel"
              value={formData.engineCondition.coolantLevel || ''}
              required={true}
              error={errors?.engineCondition?.coolantLevel}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Smoke Color */}
            <SelectInput
              placeholder="e.g., Black"
              label={t('sell.form.details.engine.smokeColor')}
              name="engineCondition.smokeColor"
              value={formData.engineCondition.smokeColor || ''}
              required={true}
              error={errors?.engineCondition?.smokeColor}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Engine Noise*/}
            <RadioGroup
              label={t('sell.form.details.engine.engineNoise')}
              name="engineCondition.engineNoise"
              value={formData.engineCondition.engineNoise || ''}
              required={true}
              error={errors?.engineCondition?.engineNoise}
              options={options.engineNoise}
              onChange={handleChange}
            />
            {/* Cold Start Quality*/}
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

            {/* Check Engine Light*/}
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
        {/*Hydraulics*/}
        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.details.hydraulics.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Hydraulic Pump Conditio */}

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
            {/* Cylinder Leaks */}

            <RadioGroup
              label={t('sell.form.details.hydraulics.cylinderLeaks')}
              name="hydraulics.cylinderLeaks"
              value={formData.hydraulics.cylinderLeaks || ''}
              required={true}
              error={errors?.hydraulics?.cylinderLeaks}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Hose Condition */}

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

            {/* Hydraulic Response*/}

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

            {/* Hydraulics Damage*/}
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
        {/*Cab & Electronics*/}
        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.details.cabElectronics.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Dashboard Functional */}

            <RadioGroup
              label={t('sell.form.details.cabElectronics.dashboardFunctional')}
              name="cabElectronics.dashboardFunctional"
              value={formData.cabElectronics.dashboardFunctional}
              required={true}
              error={errors?.cabElectronics?.dashboardFunctional}
              options={options.yesNo}
              onChange={handleChange}
            />
            {/* Ac/Heater workng */}

            <RadioGroup
              label={t('sell.form.details.cabElectronics.acHeater')}
              name="cabElectronics.acHeaterWorking"
              value={formData.cabElectronics.acHeaterWorking || ''}
              required={true}
              error={errors?.cabElectronics?.acHeaterWorking}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Display Errors*/}

            <RadioGroup
              label={t('sell.form.details.cabElectronics.displayErrors')}
              name="cabElectronics.displayErrors"
              value={formData.cabElectronics.displayErrors || ''}
              required={true}
              error={errors?.cabElectronics?.displayErrors}
              options={options.overAllCondition}
              onChange={handleChange}
            />

            {/* Seat Condition*/}

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

            {/* Controls Working*/}
            <RadioGroup
              label={t('sell.form.details.cabElectronics.controlsWorking')}
              name="cabElectronics.controlsWorking"
              value={formData.cabElectronics.controlsWorking || ''}
              required={true}
              error={errors?.cabElectronics?.controlsWorking}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Lights Working*/}
            <RadioGroup
              label={t('sell.form.details.cabElectronics.lightsWorking')}
              name="cabElectronics.lightsWorking"
              value={formData.cabElectronics.lightsWorking || ''}
              required={true}
              error={errors?.cabElectronics?.lightsWorking}
              options={options.yesNo}
              onChange={handleChange}
            />

            {/* Sensors Working*/}
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
      </div>
    </div>
  );
};

export default Details;
