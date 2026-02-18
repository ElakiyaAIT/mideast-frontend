import * as yup from 'yup';
import i18n from '../i18n/config';

// Helper function to get translation
const t = (key: string, params?: Record<string, string | number>): string => {
  return i18n.t(key, params ?? {});
};

// Password validation regex: at least one uppercase, one lowercase, one number, one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

// Strip HTML tags for TinyMCE validation
const stripHtml = (value: string) => value?.replace(/<[^>]*>/g, '').trim();

// Email validation
export const emailSchema = yup
  .string()
  .required(() => t('validation.email.required'))
  .email(() => t('validation.email.invalid'));

// Password validation
export const passwordSchema = yup
  .string()
  .required(() => t('validation.password.required'))
  .min(8, () => t('validation.password.minLength'))
  .matches(passwordRegex, () => t('validation.password.pattern'));

// Login form schema
export const loginSchema = yup.object({
  email: emailSchema,
  password: yup.string().required(() => t('validation.password.required')),
});

// Register form schema
export const registerSchema = yup.object({
  email: emailSchema,
  password: passwordSchema,
  firstName: yup
    .string()
    .required(() => t('validation.firstName.required'))
    .min(2, () => t('validation.firstName.minLength'))
    .max(50, () => t('validation.firstName.maxLength')),
  lastName: yup
    .string()
    .required(() => t('validation.lastName.required'))
    .min(2, () => t('validation.lastName.minLength'))
    .max(50, () => t('validation.lastName.maxLength')),
});

// Forgot password schema
export const forgotPasswordSchema = yup.object({
  email: emailSchema,
});

// Reset password schema
export const resetPasswordSchema = yup.object({
  token: yup.string().required(() => t('validation.token.required')),
  newPassword: passwordSchema,
});

// Update profile schema
export const updateProfileSchema = yup.object({
  email: emailSchema,
  firstName: yup
    .string()
    .min(2, () => t('validation.firstName.minLength'))
    .max(50, () => t('validation.firstName.maxLength'))
    .optional(),
  lastName: yup
    .string()
    .min(2, () => t('validation.lastName.minLength'))
    .max(50, () => t('validation.lastName.maxLength'))
    .optional(),
});

export const basicInfoSchema = yup.object({
  title: yup
    .string()
    .transform((value) => (value?.trim() === '' ? undefined : value))
    .required(() => t('validation.sell.title.required'))
    .min(5, () => t('validation.sell.title.minLength'))
    .max(120, () => t('validation.sell.title.maxLength')),

  category: yup.string().required(() => t('validation.sell.category.required')),

  description: yup
    .string()
    .transform((value) => (value?.trim() === '' ? undefined : value))
    .required(() => t('validation.sell.description.required'))
    .test(
      'not-empty-html',
      () => t('validation.sell.description.required'),
      (value) => {
        if (!value) return false;
        return stripHtml(value).length >= 20;
      },
    )
    .test(
      'min-length',
      () => t('validation.sell.description.minLength'),
      (value) => {
        if (!value) return false;
        return stripHtml(value).length >= 20;
      },
    )
    .test(
      'max-length',
      () => t('validation.sell.description.maxLength'),
      (value) => {
        if (!value) return false;
        return stripHtml(value).length <= 2000;
      },
    ),
});

export const detailsSchema = yup.object({
  basicDetails: yup.object({
    year: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
      })
      .required(() => t('validation.sell.year.required'))
      .typeError(() => t('validation.sell.year.number'))
      .min(1900, () => t('validation.sell.year.min'))
      .max(new Date().getFullYear(), () => t('validation.sell.year.max')),
    make: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.make.required')),
    model: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.model.required')),
    manufacturer: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.manufacturer.required')),
    engineHours: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
      })
      .required(() => t('validation.sell.engineHours.required'))
      .typeError(() => t('validation.sell.engineHours.number'))
      .min(0, () => t('validation.sell.engineHours.min')),
    mileage: yup
      .number()
      .transform((value, originalValue) => {
        return originalValue === '' ? undefined : value;
      })
      .required(() => t('validation.sell.mileage.required'))
      .typeError(() => t('validation.sell.mileage.number'))
      .min(0, () => t('validation.sell.mileage.min')),
  }),

  general: yup.object({
    transmission: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.transmission.required')),

    engineType: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.engineType.required')),
    grossPower: yup
      .number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(() => t('validation.sell.grossPower.required'))
      .typeError(() => t('validation.sell.grossPower.number'))
      .min(0, () => t('validation.sell.grossPower.min')),
    operatingWeight: yup
      .number()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(() => t('validation.sell.operatingWeight.required'))
      .typeError(() => t('validation.sell.operatingWeight.number'))
      .min(0, () => t('validation.sell.operatingWeight.min')),
    fuelType: yup
      .string()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(() => t('validation.sell.fuelType.required')),
    cabType: yup
      .string()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(() => t('validation.sell.cabType.required')),
    tireTrackSize: yup
      .string()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(() => t('validation.sell.tireTrackSize.required')),
    suspension: yup
      .string()
      .transform((value, originalValue) => (originalValue === '' ? undefined : value))
      .required(() => t('validation.sell.suspension.required')),
    tireTrackWear: yup
      .number()
      .transform((originalValue) => {
        if (originalValue === '' || originalValue === undefined) return undefined; // empty → undefined
        const parsed = Number(originalValue);
        return isNaN(parsed) ? NaN : parsed; // non-number → NaN
      })
      .required(() => t('validation.sell.tireTrackWear.required'))
      .typeError(() => t('validation.sell.tireTrackWear.number'))
      .min(0, () => t('validation.sell.tireTrackWear.min'))
      .max(100, () => t('validation.sell.tireTrackWear.max')),
  }),

  condition: yup.object({
    overallCondition: yup.string().required(() => t('validation.sell.overallCondition.required')),
    exteriorColor: yup.string().required(() => t('validation.sell.exteriorColor.required')),
    interiorColor: yup.string().required(() => t('validation.sell.interiorColor.required')),
    jumpStartRequired: yup.string().required(() => t('validation.sell.jumpStartRequired.required')),
    batteriesHoldCharge: yup
      .string()
      .required(() => t('validation.sell.batteriesHoldCharge.required')),
    parkingBrakeWorks: yup.string().required(() => t('validation.sell.parkingBrakeWorks.required')),
  }),

  engineCondition: yup.object({
    overAllCondition: yup
      .string()
      .required(() => t('validation.sell.engineOverallCondition.required')),
    oilLevelOk: yup.string().required(() => t('validation.sell.oilLevelOk.required')),
    anyLeaks: yup.string().required(() => t('validation.sell.anyLeaks.required')),
    coolantLevel: yup.string().required(() => t('validation.sell.coolantLevel.required')),
    smokeColor: yup.string().required(() => t('validation.sell.smokeColor.required')),
    engineNoise: yup.string().required(() => t('validation.sell.engineNoise.required')),
    coldStartQuality: yup.string().required(() => t('validation.sell.coldStartQuality.required')),
    checkEngineLight: yup.string().required(() => t('validation.sell.checkEngineLight.required')),
  }),

  hydraulics: yup.object({
    hydraulicPumpCondition: yup
      .string()
      .required(() => t('validation.sell.hydraulicPumpCondition.required')),
    cylinderLeaks: yup.string().required(() => t('validation.sell.cylinderLeaks.required')),
    hoseCondition: yup.string().required(() => t('validation.sell.hoseCondition.required')),
    hydraulicResponse: yup.string().required(() => t('validation.sell.hydraulicResponse.required')),
    hydraulicsDamage: yup.string().required(() => t('validation.sell.hydraulicsDamage.required')),
  }),

  cabElectronics: yup.object({
    dashboardFunctional: yup
      .string()
      .required(() => t('validation.sell.dashboardFunctional.required')),
    acHeaterWorking: yup.string().required(() => t('validation.sell.acHeaterWorking.required')),
    displayErrors: yup.string().required(() => t('validation.sell.displayErrors.required')),
    seatCondition: yup.string().required(() => t('validation.sell.seatCondition.required')),
    controlsWorking: yup.string().required(() => t('validation.sell.controlsWorking.required')),
    lightsWorking: yup.string().required(() => t('validation.sell.lightsWorking.required')),
    sensorsWorking: yup.string().required(() => t('validation.sell.sensorsWorking.required')),
  }),
});

export const conditionSchema = yup.object({
  checkList: yup.object({
    exterior: yup.object({
      bodyPanels: yup.string().required(() => t('validation.sell.condition.required')),
      glassMirrors: yup.string().required(() => t('validation.sell.condition.required')),
      lightsSignals: yup.string().required(() => t('validation.sell.condition.required')),
    }),
    engine: yup.object({
      engineBlock: yup.string().required(() => t('validation.sell.condition.required')),
      transmission: yup.string().required(() => t('validation.sell.condition.required')),
    }),
    hydraulics: yup.object({
      hydraulicPump: yup.string().required(() => t('validation.sell.condition.required')),
      cylinders: yup.string().required(() => t('validation.sell.condition.required')),
    }),
    underCarriage: yup.object({
      tracksWheels: yup.string().required(() => t('validation.sell.condition.required')),
      suspension: yup.string().required(() => t('validation.sell.condition.required')),
    }),
    functionalTest: yup.object({
      engineStart: yup.string().required(() => t('validation.sell.condition.required')),
      operationTest: yup.string().required(() => t('validation.sell.condition.required')),
    }),
  }),
});

export const additionalInformationSchema =  yup.object({
  additionalInformation:yup.object({
  equipmentIdentity: yup.object({
    vinNumber: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.additionalInformation.vinNumberRequired')),

    manufacturerDate: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.additionalInformation.required')),

    modelYearConfirmation: yup
      .string()
      .required(() => t('validation.sell.additionalInformation.required')),

    equipmentHasDamage: yup
      .string()
      .required(() => t('validation.sell.additionalInformation.required')),

    maintainenceRecords: yup
      .string()
      .required(() => t('validation.sell.additionalInformation.required')),

    warrantyAvailable: yup
      .string()
      .required(() => t('validation.sell.additionalInformation.required')),
  }),

  location: yup.object({
    address: yup
      .string()
      .transform((value) => (value?.trim() === '' ? undefined : value))
      .required(() => t('validation.sell.additionalInformation.location.addressRequired')),
  }),

  ownership: yup.object({
    ownershipProof: yup.array().of(yup.string()),
    invoiceBillOfSale: yup.array().of(yup.string()),
    governmentRegistration: yup.array().of(yup.string()),
    emissionTest: yup.array().of(yup.string()),
    insurance: yup.array().of(yup.string()),
    maintenanceLog: yup.array().of(yup.string()),
  }),
})
});

// Type exports for form data
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
export type UpdateProfileFormData = yup.InferType<typeof updateProfileSchema>;
export type BasicInfoFormData = yup.InferType<typeof basicInfoSchema>;
export type DetailInfoFormData = yup.InferType<typeof detailsSchema>;
export type ConditionChekListFormData = yup.InferType<typeof conditionSchema>;
export type AdditionalInformationData = yup.InferType<typeof additionalInformationSchema>;
