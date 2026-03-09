import type { SellFormData } from '../../types/home';

export const initialFormData: SellFormData = {
  title: '',
  categoryId: '',
  description: '',
  make: '',
  models: '',
  year: undefined,
  location: {
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
  basicDetails: {
    manufacturer: '',
    engineHours: '',
    mileage: '',
  },
  general: {
    grossPower: '',
    operatingWeight: '',
    tireTrackSize: '',
    suspension: '',
    transmission: '',
    engineType: '',
    fuelType: '',
    cabType: '',
    tireTrackWear: '',
  },
  conditionOverview: {
    overallCondition: '',
    exteriorColor: '',
    interiorColor: '',
    batteriesHoldCharge: undefined,
    jumpStartRequired: undefined,
    parkingBrakeWorks: undefined,
  },
  engineCondition: {
    overAllCondition: '',
    oilLevelOk: undefined,
    anyLeaks: undefined,
    coolantLevel: '',
    smokeColor: '',
    engineNoise: '',
    coldStartQuality: '',
    checkEngineLight: undefined,
  },
  hydraulics: {
    hydraulicPumpCondition: '',
    cylinderLeaks: undefined,
    hoseCondition: '',
    hydraulicResponse: '',
    hydraulicsDamage: undefined,
  },
  cabElectronics: {
    dashboardFunctional: undefined,
    acHeaterWorking: undefined,
    displayErrors: undefined,
    seatCondition: '',
    controlsWorking: undefined,
    lightsWorking: undefined,
    sensorsWorking: undefined,
  },
  checkList: {
    exterior: {
      bodyPanels: '',
      bodyPanelsImages: [],
      glassMirrors: '',
      glassMirrorsImages: [],
      lightsSignals: '',
      lightsSignalsImages: [],
    },
    engine: {
      engineBlock: '',
      engineBlockImages: [],
      transmission: '',
      transmissionImages: [],
    },
    hydraulics: {
      hydraulicPump: '',
      hydraulicPumpImages: [],
      cylinders: '',
      cylindersImages: [],
    },
    underCarriage: {
      tracksWheels: '',
      tracksWheelsImages: [],
      suspension: '',
      suspensionImages: [],
    },
    functionalTest: {
      engineStart: '',
      engineStartImages: [],
      operationTest: '',
      operationTestImages: [],
    },
  },
  media: {
    exteriorImages: [],
    engineCompartMentImages: [],
    underCarriageTracksImages: [],
    cabInteriorImages: [],
    otherAttachments: [],
    videos: [],
  },
  additionalInformation: {
    equipmentIdentity: {
      vinNumber: '',
      manufacturerDate: '',
      modelYearConfirmation: undefined,
      equipmentHasDamage: undefined,
      maintenanceRecords: undefined,
      warrantyAvailable: undefined,
    },
    ownership: {
      ownershipProof: [],
      invoiceBillOfSale: [],
      governmentRegistration: [],
      emissionTest: [],
      insurance: [],
      maintenanceLog: [],
    },
  },
};

export const dropdownOptions = {
  transmission: [
    { value: 'automatic', label: 'Automatic' },
    { value: 'manual', label: 'Manual' },
    { value: 'hydrostatic', label: 'Hydrostatic' },
  ],
  engineType: [
    { value: 'diesel', label: 'Diesel' },
    { value: 'gasoline', label: 'Gasoline' },
    { value: 'electric', label: 'Electric' },
    { value: 'hybrid', label: 'Hybrid' },
  ],
  fuelType: [
    { value: 'diesel', label: 'Diesel' },
    { value: 'gasoline', label: 'Gasoline' },
    { value: 'propane', label: 'Propane' },
  ],
  cabType: [
    { value: 'enclosed', label: 'Enclosed' },
    { value: 'open', label: 'Open' },
    { value: 'rops', label: 'ROPS' },
  ],
  suspension: [
    { value: 'track', label: 'Track' },
    { value: 'wheel', label: 'Wheel' },
    { value: 'combined', label: 'Combined' },
  ],
  overAllCondition: [
    { value: 'excellent', label: 'Excellent' },
    { value: 'good', label: 'Good' },
    { value: 'fair', label: 'Fair' },
    { value: 'poor', label: 'Poor' },
  ],
  exteriorColor: [
    { value: 'red', label: 'Red' },
    { value: 'black', label: 'Black' },
    { value: 'other', label: 'Other' },
  ],
  yesNo: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ],
  coldStartQuality: [
    { value: 'starts_easily', label: 'Starts Easily' },
    { value: 'normal', label: 'Normal' },
    { value: 'difficult', label: 'Difficult' },
    { value: 'wont_start', label: "Won't Start" },
  ],
  engineNoise: [
    { value: 'quiet', label: 'Quiet' },
    { value: 'normal', label: 'Normal' },
    { value: 'loud', label: 'Loud' },
    { value: 'very_loud', label: 'Very Loud' },
  ],
  smokeColor: [
    { value: 'black', label: 'Black' },
    { value: 'grey', label: 'Grey' },
    { value: 'white', label: 'White' },
    { value: 'none', label: 'None' },
  ],
};
export interface Option {
  value: string | number;
  label: string;
}
