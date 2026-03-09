import React, { useState, useCallback } from 'react';
import * as yup from 'yup';
import type { SellFormData } from '../types/home';
import {
  additionalInformationSchema,
  basicInfoSchema,
  // conditionSchema,
  detailsSchema,
} from '../utils';
import { initialFormData } from '../pages/public/SellPage.constants';

export type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};

export const useSellForm = (
  stepsCount: number,
  formRef: React.RefObject<HTMLDivElement | null>,
) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [formData, setFormData] = useState<SellFormData>(initialFormData);
  const [errors, setErrors] = useState<NestedErrors<SellFormData>>({});

  const validateCurrentStep = async (): Promise<boolean> => {
    try {
      let schema;
      switch (currentStep) {
        case 0:
          schema = basicInfoSchema;
          break;
        case 1:
          schema = detailsSchema;
          break;
        //TO MAKE MANDATORY
        // case 2:
        //   schema = conditionSchema;
        //   break;
        case 4:
          schema = additionalInformationSchema;
          break;
        default:
          return true;
      }

      await schema.validate(formData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: NestedErrors<SellFormData> = {};

        err.inner.forEach((e) => {
          if (!e.path) return;
          const pathParts = e.path.split('.');
          let current: unknown = newErrors;

          pathParts.forEach((part, index) => {
            if (typeof current !== 'object' || current === null) return;

            const obj = current as Record<string, unknown>;
            if (index === pathParts.length - 1) {
              obj[part] = e.message;
            } else {
              if (!(part in obj) || typeof obj[part] !== 'object' || obj[part] === null) {
                obj[part] = {};
              }

              current = obj[part];
            }
          });
        });

        setErrors(newErrors);
        setTimeout(() => {
          const firstErrorElement = document.querySelector('[data-error="true"]');
          if (firstErrorElement) {
            firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            (firstErrorElement as HTMLElement).focus();
          }
        }, 0);
      }
      return false;
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const keys = name.split('.');

    setFormData((prev) => {
      const updated = { ...prev };
      let current: unknown = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (typeof current === 'object' && current !== null && keys[i] in current) {
          const obj = current as Record<string, unknown>;
          obj[keys[i]] = { ...(obj[keys[i]] as object) };
          current = obj[keys[i]];
        }
      }

      if (typeof current === 'object' && current !== null) {
        (current as Record<string, unknown>)[keys[keys.length - 1]] = value;
      }
      return updated;
    });

    setErrors((prev) => {
      const newErrors = { ...prev };
      let current: unknown = newErrors;
      for (let i = 0; i < keys.length - 1; i++) {
        if (typeof current !== 'object' || current === null || !(keys[i] in current)) {
          return newErrors;
        }

        current = (current as Record<string, unknown>)[keys[i]];
      }

      if (typeof current === 'object' && current !== null) {
        delete (current as Record<string, unknown>)[keys[keys.length - 1]];
      }

      return newErrors;
    });
  }, []);

  const scrollToForm = () => {
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  const nextStep = async () => {
    if (await validateCurrentStep()) {
      if (currentStep < stepsCount - 1) {
        setCurrentStep((prev) => prev + 1);
        scrollToForm();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToForm();
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    nextStep,
    prevStep,
    isLastStep: currentStep === stepsCount - 1,
  };
};
