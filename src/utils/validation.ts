import * as yup from 'yup';
import i18n from '../i18n/config';

// Helper function to get translation
const t = (key: string, params?: Record<string, string | number>): string => {
  return i18n.t(key, params ?? {});
};

// Password validation regex: at least one uppercase, one lowercase, one number, one special character
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])/;

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

// Type exports for form data
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>;
export type UpdateProfileFormData = yup.InferType<typeof updateProfileSchema>;
