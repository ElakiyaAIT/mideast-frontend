import { useState } from "react";
import type { SellFormData } from "../../types/home";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import RadioGroup from "./RadioInput";
import { useTranslation } from "../../i18n";

interface Option {
    id: number;
    value: string;
}
interface DetailsProps {
    formData: SellFormData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    options: {
        transmission: Option[];
        engineType: Option[];
        fuelType: Option[];
        cabType: Option[];
        suspension:Option[];
        overAllCondition:Option[];
        exteriorColor:Option[];
        yesNo:Option[];
        coldStartQuality:Option[];
        engineNoise:Option[];
    };
}

const Details = ({ formData, handleChange, options }: DetailsProps) => {
    const {t}=useTranslation();
    const [wear, setWear] = useState('39');

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
                            label={t('sell.form.details.basic.year')}
                            name="year"
                            placeholder="e.g., 2020"
                            value={formData.year || ""}
                            onChange={handleChange}
                        />


                        <TextInput
                            label={t('sell.form.details.basic.make')}
                            name="make"
                            placeholder="Caterpillar"
                            value={formData.make || ""}
                            onChange={handleChange}
                        />

                        <TextInput
                            label={t('sell.form.details.basic.model')}
                            name="model"
                            placeholder="e.g., 320D"
                            value={formData.model || ""}
                            onChange={handleChange}
                        />

                        <TextInput
                            label={t('sell.form.details.basic.manufacturer')}
                            name="manufacturer"
                            placeholder="e.g., Caterpillar Inc"
                            value={formData.manufacturer || ""}
                            onChange={handleChange}
                        />


                        <TextInput
                            label={t('sell.form.details.basic.engineHours')}
                            name="engineHours"
                            placeholder="e.g., 4,750"
                            value={formData.engineHours || ""}
                            onChange={handleChange}
                        />


                        <TextInput
                            label={t('sell.form.details.basic.mileage')}
                            name="mileage"
                            placeholder="e.g.,12000"
                            value={formData.mileage || ""}
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
                            placeholder="eg.,hydrostatic"
                            label={t('sell.form.details.general.transmission')}
                            name="transmission"
                            value={formData.transmission}
                            options={options.transmission}
                            onChange={handleChange}
                        />
                        {/* Engine Type */}

                        <SelectInput
                            placeholder="e.g., CAT c4.4 ACERT"
                            label={t('sell.form.details.general.engineType')}
                            name="engineType"
                            value={formData.engineType}
                            options={options.engineType}
                            onChange={handleChange}
                        />

                        {/* Gross Power */}

                        <TextInput
                            label={t('sell.form.details.general.grossPower')}
                            name="grossYear"
                            placeholder="e.g., 121"
                            value={formData.grossPower || ""}
                            onChange={handleChange}
                        />


                        {/* Operating Weight */}

                        <TextInput
                            label={t('sell.form.details.general.operatingWeight')}
                            name="operatingWeight"
                            placeholder="e.g., 22000"
                            value={formData.operatingWeight || ""}
                            onChange={handleChange}
                        />
                        {/* Fuel Type */}
                        <SelectInput
                            placeholder="e.g., Diesel"
                            label={t('sell.form.details.general.fuelType')}
                            name="fuelType"
                            value={formData.fuelType}
                            options={options.fuelType}
                            onChange={handleChange}
                        />

                        {/* Cab Type */}
                        <SelectInput
                            placeholder="e.g., Enclosed ROPS/FOPS"
                            label={t('sell.form.details.general.cabType')}
                            name="cabType"
                            value={formData.cabType}
                            options={options.cabType}
                            onChange={handleChange}
                        />


                        {/* Tire/Track Size */}

                        <TextInput
                            label={t('sell.form.details.general.tireTrackSize')}
                            name="tireTrackSize"
                            placeholder="e.g., 600mm"
                            value={formData.tireTrackSize || ""}
                            onChange={handleChange}
                        />
                        {/* Suspension Type */}
                        <RadioGroup
                            label={t('sell.form.details.general.suspensionType')}
                            name="suspension"
                            value={formData.suspension || ""}
                            options={options.suspension}
                            onChange={handleChange}
                        />

                        {/* Tire/Track Wear */}


                    </div>
                    <div>
                        {/* Top Row */}
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300">
                                {t('sell.form.details.general.tireTrackWear')}
                            </label>
                            <span className="text-orange-500 font-semibold">
                                {wear}%
                            </span>
                        </div>

                        {/* Slider */}
                        <div className="relative w-full mb-2">
                            {/* Background Track */}
                            <div className="absolute top-1/2 -translate-y-1/2 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700"></div>

                            {/* Filled Track */}
                            <div
                                className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-orange-500 transition-all duration-200"
                                style={{ width: `${wear}%` }}
                            ></div>

                            {/* Range Input */}
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={wear}
                                onChange={(e) => setWear(e.target.value)}
                                className="relative z-10 w-full appearance-none bg-transparent cursor-pointer
                     [&::-webkit-slider-thumb]:appearance-none
                     [&::-webkit-slider-thumb]:h-5
                     [&::-webkit-slider-thumb]:w-5
                     [&::-webkit-slider-thumb]:rounded-full
                     [&::-webkit-slider-thumb]:bg-white
                     [&::-webkit-slider-thumb]:border
                     [&::-webkit-slider-thumb]:border-slate-300
                     [&::-webkit-slider-thumb]:shadow"
                            />
                        </div>

                        {/* Bottom Labels */}
                        <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                            <span>0%</span>
                            <span>100%</span>
                        </div>
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
                            name="overallCondition"
                            value={formData.overallCondition}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />
                        {/* Exterior Color */}

                        <SelectInput
                            placeholder="e.g., CAT yellow"
                            label={t('sell.form.details.condition.exterior')}
                            name="exteriorColor"
                            value={formData.exteriorColor}
                            options={options.exteriorColor}
                            onChange={handleChange}
                        />

                        {/* Interior color */}

                         <SelectInput
                            placeholder="e.g., Black/Grey"
                            label={t('sell.form.details.condition.interior')}
                            name="interiorColor"
                            value={formData.interiorColor}
                            options={options.exteriorColor}
                            onChange={handleChange}
                        />


                        {/* Jump start required*/}

                         <RadioGroup
                            label={t('sell.form.details.condition.jumpStart')}
                            name="jumpStartRequired"
                            value={formData.jumpStartRequired || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Batteries Hold charge */}
                         <RadioGroup
                            label={t('sell.form.details.condition.batteriesHoldCharge')}
                            name="batteriesHoldCharge"
                            value={formData.batteriesHoldCharge || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />


                        {/* Parking Brake Works*/}
                         <RadioGroup
                            label={t('sell.form.details.condition.parkingBrake')}
                            name="parkingBrakeWorks"
                            value={formData.parkingBrakeWorks || ""}
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
                            name="engineCondition.overallCondition"
                            value={formData.engineCondition.overAllCondition}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />
                        {/* Oil Level OK? */}

                        <RadioGroup
                            label={t('sell.form.details.engine.oilLevel')}
                            name="engineCondition.oilLevelOk"
                            value={formData.engineCondition.oilLevelOk||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Any Leaks? */}

                         <RadioGroup
                            label={t('sell.form.details.engine.anyLeaks')}
                            name="engineCondition.anyLeaks"
                            value={formData.engineCondition?.anyLeaks||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />


                        {/* Coolant level*/}

                         <SelectInput
                            placeholder="e.g., Good"
                            label={t('sell.form.details.engine.coolantLevel')}
                            name="engineCondition.coolantLevel"
                            value={formData.engineCondition.coolantLevel || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Smoke Color */}
                         <SelectInput
                            placeholder="e.g., Black"
                            label={t('sell.form.details.engine.smokeColor')}
                            name="engineCondition.smokeColor"
                            value={formData.engineCondition.smokeColor || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />


                        {/* Engine Noise*/}
                         <RadioGroup
                            label={t('sell.form.details.engine.engineNoise')}
                            name="engineCondition.engineNoise"
                            value={formData.engineCondition.engineNoise || ""}
                            options={options.engineNoise}
                            onChange={handleChange}
                        />
                          {/* Cold Start Quality*/}
                        <SelectInput
                            placeholder="e.g., Black"
                            label={t('sell.form.details.engine.coldStartQuality')}
                            name="engineCondition.coldStartQuality"
                            value={formData.engineCondition.coldStartQuality}
                            options={options.coldStartQuality}
                            onChange={handleChange}
                        />

                          {/* Check Engine Light*/}
                         <RadioGroup
                            label={t('sell.form.details.engine.checkEngineLight')}
                            name="engineCondition.checkEngineLight"
                            value={formData.engineCondition.checkEngineLight || ""}
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
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />
                        {/* Cylinder Leaks */}

                        <RadioGroup
                            label={t('sell.form.details.hydraulics.cylinderLeaks')}
                            name="hydraulics.cylinderLeaks"
                            value={formData.hydraulics.cylinderLeaks||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Hose Condition */}

                         <SelectInput
                            placeholder="e.g., Good-minor wear"
                            label={t('sell.form.details.hydraulics.hoseCondition')}
                            name="hydraulics.hoseCondition"
                            value={formData.hydraulics?.hoseCondition||""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />


                        {/* Hydraulic Response*/}

                         <SelectInput
                            placeholder="e.g., Good"
                            label={t('sell.form.details.hydraulics.hydraulicResponse')}
                            name="hydraulics.hydraulicResponse"
                            value={formData.hydraulics.hydraulicResponse|| ""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />

                        {/* Hydraulics Damage*/}
                         <RadioGroup
                            label={t('sell.form.details.hydraulics.hydraulicDamage')}
                            name="hydraulics.hydraulicsDamage"
                            value={formData.hydraulics.hydraulicsDamage || ""}
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
                            options={options.yesNo}
                            onChange={handleChange}
                        />
                        {/* Ac/Heater workng */}

                        <RadioGroup
                            label={t('sell.form.details.cabElectronics.acHeater')}
                            name="cabElectronics.acHeaterWorking"
                            value={formData.cabElectronics.acHeaterWorking||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Display Errors*/}

                         <RadioGroup
                            label={t('sell.form.details.cabElectronics.displayErrors')}
                            name="cabElectronics.displayErrors"
                            value={formData.cabElectronics.displayErrors||""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />


                        {/* Seat Condition*/}

                         <SelectInput
                            placeholder="e.g., Good-minor wear"
                            label={t('sell.form.details.cabElectronics.seatCondition')}
                            name="cabElectronics.seatCondition"
                            value={formData.cabElectronics.seatCondition|| ""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />

                        {/* Controls Working*/}
                         <RadioGroup
                            label={t('sell.form.details.cabElectronics.controlsWorking')}
                            name="cabElectronics.controlsWorking"
                            value={formData.cabElectronics.controlsWorking || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />
                        
                        {/* Lights Working*/}
                         <RadioGroup
                            label={t('sell.form.details.cabElectronics.lightsWorking')}
                            name="cabElectronics.lightsWorking"
                            value={formData.cabElectronics.lightsWorking || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />
                        
                        {/* Sensors Working*/}
                         <RadioGroup
                            label={t('sell.form.details.cabElectronics.sensorsWorking')}
                            name="cabElectronics.sensorsWorking"
                            value={formData.cabElectronics.sensorsWorking || ""}
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
