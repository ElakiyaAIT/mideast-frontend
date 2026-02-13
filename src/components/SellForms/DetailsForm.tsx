import { useState } from "react";
import type { SellFormData } from "../../types/home";
import { TextInput } from "./TextInput";
import { SelectInput } from "./SelectInput";
import RadioGroup from "./RadioInput";

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
    const [wear, setWear] = useState('39');

    return (
        <div>
            <h3 className="mb-8 text-xl font-bold uppercase tracking-tight dark:text-slate-300">
                Equipment Details
            </h3>

            <div className="space-y-12">
                {/* BASIC DETAILS */}
                <section className="sell-details-form">
                    <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
                        Basic Details
                    </h4>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        <TextInput
                            label="Year"
                            name="year"
                            placeholder="e.g., 2020"
                            value={formData.year || ""}
                            onChange={handleChange}
                        />


                        <TextInput
                            label="Make"
                            name="make"
                            placeholder="Caterpillar"
                            value={formData.make || ""}
                            onChange={handleChange}
                        />

                        <TextInput
                            label="Model"
                            name="model"
                            placeholder="e.g., 320D"
                            value={formData.model || ""}
                            onChange={handleChange}
                        />

                        <TextInput
                            label="Manufacturer"
                            name="manufacturer"
                            placeholder="e.g., Caterpillar Inc"
                            value={formData.manufacturer || ""}
                            onChange={handleChange}
                        />


                        <TextInput
                            label="Engine Hours"
                            name="engineHours"
                            placeholder="e.g., 4,750"
                            value={formData.engineHours || ""}
                            onChange={handleChange}
                        />


                        <TextInput
                            label="Mileage"
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
                        General Specifications
                    </h4>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Transmission */}

                        <SelectInput
                            label="Transmission"
                            name="transmission"
                            value={formData.transmission}
                            options={options.transmission}
                            onChange={handleChange}
                        />
                        {/* Engine Type */}

                        <SelectInput
                            label="Engine Type"
                            name="engineType"
                            value={formData.engineType}
                            options={options.engineType}
                            onChange={handleChange}
                        />

                        {/* Gross Power */}

                        <TextInput
                            label="Gross Year"
                            name="grossYear"
                            placeholder="e.g., 320"
                            value={formData.grossYear || ""}
                            onChange={handleChange}
                        />


                        {/* Operating Weight */}

                        <TextInput
                            label="Operating Weight"
                            name="operatingWeight"
                            placeholder="e.g., 52000"
                            value={formData.operatingWeight || ""}
                            onChange={handleChange}
                        />
                        {/* Fuel Type */}
                        <SelectInput
                            label="Fuel Type"
                            name="fuelType"
                            value={formData.fuelType}
                            options={options.fuelType}
                            onChange={handleChange}
                        />

                        {/* Cab Type */}
                        <SelectInput
                            label="Cab Type"
                            name="cabType"
                            value={formData.cabType}
                            options={options.cabType}
                            onChange={handleChange}
                        />


                        {/* Tire/Track Size */}

                        <TextInput
                            label="Tire/Track Size"
                            name="tireTrackSize"
                            placeholder="e.g., 320mm"
                            value={formData.tireTrackSize || ""}
                            onChange={handleChange}
                        />
                        {/* Suspension Type */}
                        <RadioGroup
                            label="Suspension Type"
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
                                Tire/Track Wear
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
                        Condition Overview
                    </h4>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Overall Condition */}

                        <SelectInput
                            label="Overall Condition"
                            name="overallCondition"
                            value={formData.overallCondition}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />
                        {/* Exterior Color */}

                        <SelectInput
                            label="Exterior Color"
                            name="exteriorColor"
                            value={formData.exteriorColor}
                            options={options.exteriorColor}
                            onChange={handleChange}
                        />

                        {/* Interior color */}

                         <SelectInput
                            label="Interior Color"
                            name="interiorColor"
                            value={formData.interiorColor}
                            options={options.exteriorColor}
                            onChange={handleChange}
                        />


                        {/* Jump start required*/}

                         <RadioGroup
                            label="Jump Start Required"
                            name="jumpStartRequired"
                            value={formData.jumpStartRequired || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Batteries Hold charge */}
                         <RadioGroup
                            label="Batteries Hold Charge"
                            name="batteriesHoldCharge"
                            value={formData.batteriesHoldCharge || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />


                        {/* Parking Brake Works*/}
                         <RadioGroup
                            label="Parking Brake Wroks"
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
                        Engine Condition
                    </h4>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Overall Condition */}

                        <SelectInput
                            label="Overall Condition"
                            name="engineCondition.overallCondition"
                            value={formData.engineCondition.overAllCondition}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />
                        {/* Oil Level OK? */}

                        <RadioGroup
                            label="Oil Level Ok?"
                            name="engineCondition.oilLevelOk"
                            value={formData.engineCondition.oilLevelOk||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Any Leaks? */}

                         <RadioGroup
                            label="Any Leaks?"
                            name="engineCondition.anyLeaks"
                            value={formData.engineCondition?.anyLeaks||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />


                        {/* Coolant level*/}

                         <SelectInput
                            label="Coolant Level"
                            name="engineCondition.coolantLevel"
                            value={formData.engineCondition.coolantLevel || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Smoke Color */}
                         <SelectInput
                            label="Smoke Color"
                            name="engineCondition.smokeColor"
                            value={formData.engineCondition.smokeColor || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />


                        {/* Engine Noise*/}
                         <RadioGroup
                            label="Engine Noise"
                            name="engineCondition.engineNoise"
                            value={formData.engineCondition.engineNoise || ""}
                            options={options.engineNoise}
                            onChange={handleChange}
                        />
                          {/* Cold Start Quality*/}
                        <SelectInput
                            label="Cold Start Quality"
                            name="engineCondition.coldStartQuality"
                            value={formData.engineCondition.coldStartQuality}
                            options={options.coldStartQuality}
                            onChange={handleChange}
                        />

                          {/* Check Engine Light*/}
                         <RadioGroup
                            label="Check Engine Light"
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
                        Hydraulics
                    </h4>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Hydraulic Pump Conditio */}

                        <SelectInput
                            label="Hydraulic Pump Condition"
                            name="hydraulics.hydraulicPumpCondition"
                            value={formData.hydraulics.hydraulicPumpCondition}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />
                        {/* Cylinder Leaks */}

                        <RadioGroup
                            label="Cylinder Leaks"
                            name="hydraulics.cylinderLeaks"
                            value={formData.hydraulics.cylinderLeaks||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Hose Condition */}

                         <SelectInput
                            label="Hose Condition"
                            name="hydraulics.hoseCondition"
                            value={formData.hydraulics?.hoseCondition||""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />


                        {/* Hydraulic Response*/}

                         <SelectInput
                            label="Hydraulic Response"
                            name="hydraulics.hydraulicResponse"
                            value={formData.hydraulics.hydraulicResponse|| ""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />

                        {/* Hydraulics Damage*/}
                         <RadioGroup
                            label="Hydraulics Damage"
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
                        Cab & Electronics
                    </h4>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                        {/* Dashboard Functional */}

                        <RadioGroup
                            label="Dashboard Functional"
                            name="cabElectronics.dashboardFunctional"
                            value={formData.cabElectronics.dashboardFunctional}
                            options={options.yesNo}
                            onChange={handleChange}
                        />
                        {/* Ac/Heater workng */}

                        <RadioGroup
                            label="Ac/Heater Working"
                            name="cabElectronics.acHeaterWorking"
                            value={formData.cabElectronics.acHeaterWorking||""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />

                        {/* Display Errors*/}

                         <RadioGroup
                            label="Display Errors"
                            name="cabElectronics.displayErrors"
                            value={formData.cabElectronics.displayErrors||""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />


                        {/* Seat Condition*/}

                         <SelectInput
                            label="Seat Condition"
                            name="cabElectronics.seatCondition"
                            value={formData.cabElectronics.seatCondition|| ""}
                            options={options.overAllCondition}
                            onChange={handleChange}
                        />

                        {/* Controls Working*/}
                         <RadioGroup
                            label="Controls Working"
                            name="cabElectronics.controlsWorking"
                            value={formData.cabElectronics.controlsWorking || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />
                        
                        {/* Lights Working*/}
                         <RadioGroup
                            label="Lights Working"
                            name="cabElectronics.lightsWorking"
                            value={formData.cabElectronics.lightsWorking || ""}
                            options={options.yesNo}
                            onChange={handleChange}
                        />
                        
                        {/* Sensors Working*/}
                         <RadioGroup
                            label="Sensors Working"
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
