import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useRef, useState } from 'react';
import React from 'react';
// Import images
import sellBanner from '../../assets/images/sell-banner.png';
import type { SellFormData } from '../../types/home';
import BasicInfo from '../../components/SellForms/BasicInfoForm';
import Details from '../../components/SellForms/DetailsForm';
import ConditionChecklist from '../../components/SellForms/ConditionCheckListForm';
import { useTranslation } from '../../i18n';
import MediaForm from '../../components/SellForms/MediaForm';
import AdditionalInformation from '../../components/SellForms/AdditionalInformationform';
import PriceForm from '../../components/SellForms/priceForm';
import ReviewForm from '../../components/SellForms/ReviewForm';
import {
  additionalInformationSchema,
  basicInfoSchema,
  conditionSchema,
  detailsSchema,
} from '../../utils';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

const dropdownOptions = {
  transmission: [
    { id: 1, value: 'Automatic' },
    { id: 2, value: 'Manual' },
    { id: 3, value: 'Hydrostatic' },
  ],
  engineType: [
    { id: 1, value: 'Diesel' },
    { id: 2, value: 'Gasoline' },
    { id: 3, value: 'Electric' },
    { id: 4, value: 'Hybrid' },
  ],
  fuelType: [
    { id: 1, value: 'Diesel' },
    { id: 2, value: 'Gasoline' },
    { id: 3, value: 'Propane' },
  ],
  cabType: [
    { id: 1, value: 'Enclosed' },
    { id: 2, value: 'Open' },
    { id: 3, value: 'ROPS' },
  ],
  suspension: [
    { id: 1, value: 'track' },
    { id: 2, value: 'wheel' },
    { id: 3, value: 'combined' },
  ],
  overAllCondition: [
    { id: 1, value: 'Excellent' },
    { id: 2, value: 'Good' },
    { id: 3, value: 'Fair' },
    { id: 4, value: 'Poor' },
  ],
  exteriorColor: [
    { id: 1, value: 'red' },
    { id: 1, value: 'black' },
    { id: 1, value: 'other' },
  ],
  yesNo: [
    { id: 1, value: 'yes' },
    { id: 2, value: 'no' },
  ],
  coldStartQuality: [
    { id: 1, value: 'start easily' },
    { id: 2, value: 'normal' },
    { id: 3, value: 'difficult' },
    { id: 4, value: "won't start" },
  ],
  engineNoise: [
    { id: 1, value: 'Quiet' },
    { id: 2, value: 'Normal' },
    { id: 3, value: 'Loud' },
    { id: 4, value: 'Very Loud' },
  ],
};
const SellPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const formRef = useRef<HTMLDivElement>(null);
  type NestedErrors<T> = {
    [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
  };
  const [errors, setErrors] = useState<NestedErrors<SellFormData>>({});

  const [formData, setFormData] = useState<SellFormData>({
    title: '',
    category: '',
    description: '',
    basicDetails: {
      year: '',
      make: '',
      model: '',
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
    condition: {
      overallCondition: '',
      exteriorColor: '',
      interiorColor: '',
      batteriesHoldCharge: '',
      jumpStartRequired: '',
      parkingBrakeWorks: '',
    },

    engineCondition: {
      overAllCondition: '',
      oilLevelOk: '',
      anyLeaks: '',
      coolantLevel: '',
      smokeColor: '',
      engineNoise: '',
      coldStartQuality: '',
      checkEngineLight: '',
    },
    hydraulics: {
      hydraulicPumpCondition: '',
      cylinderLeaks: '',
      hoseCondition: '',
      hydraulicResponse: '',
      hydraulicsDamage: '',
    },
    cabElectronics: {
      dashboardFunctional: '',
      acHeaterWorking: '',
      displayErrors: '',
      seatCondition: '',
      controlsWorking: '',
      lightsWorking: '',
      sensorsWorking: '',
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
      cabInteiorImages: [],
      otherAttachments: [],
      videos: [],
    },
    additionalInformation: {
      equipmentIdentity: {
        vinNumber: '',
        manufacturerDate: '',
        modelYearConfirmation: '',
        equipmentHasDamage: '',
        maintainenceRecords: '',
        warrantyAvailable: '',
      },
      location: {
        address: '',
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
  });
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
        case 2:
          schema = conditionSchema;
          break;
        case 4:
          schema = additionalInformationSchema;
          break;
        default:
          return true;
      }

      // validate all fields, don't stop on first error
      await schema.validate(formData, { abortEarly: false });

      setErrors({}); // clear errors if valid
      return true;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: NestedErrors<SellFormData> = {};

        err.inner.forEach((e) => {
          if (!e.path) return;

          const pathParts = e.path.split('.'); // e.g., "basicDetails.mileage"
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

        console.error('Errors set:', newErrors);
        setErrors(newErrors);
        //SCROLL TO TOP MOST ERROR
        setTimeout(() => {
          const firstErrorElement = document.querySelector('[data-error="true"]');

          if (firstErrorElement) {
            firstErrorElement.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });

            (firstErrorElement as HTMLElement).focus();
          }
        }, 0);
      } else {
        console.error('Unexpected error', err);
      }
      return false;
    }
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      requestAnimationFrame(() => {
        formRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    }
  };

  const handleSubmit = () => {
    console.warn(formData, 'formData123');
  };
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfo
            formData={formData}
            setErrors={setErrors}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 1:
        return (
          <Details
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            options={dropdownOptions}
            errors={errors}
          />
        );
      case 2:
        return (
          <ConditionChecklist
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 3:
        return <MediaForm formData={formData} setFormData={setFormData} />;
      case 4:
        return (
          <AdditionalInformation
            formData={formData}
            handleChange={handleChange}
            options={dropdownOptions}
            setFormData={setFormData}
            errors={errors}
          />
        );
      case 5:
        return <PriceForm />;
      case 6:
        return <ReviewForm formData={formData} setCurrentStep={setCurrentStep} />;
      default:
        return null;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
  };

  const steps = [
    { id: 0, icon: 'info', label: t('sell.steps.basicInfo') },
    { id: 1, icon: 'description', label: t('sell.steps.details') },
    { id: 2, icon: 'receipt_long', label: t('sell.steps.condition') },
    { id: 3, icon: 'photo_library', label: t('sell.steps.media') },
    { id: 4, icon: 'note_add', label: t('sell.steps.additional') },
    { id: 5, icon: 'payments', label: t('sell.steps.price') },
    { id: 6, icon: 'visibility', label: t('sell.steps.review') },
  ];
  const isLastStep = currentStep === steps.length - 1;

  return (
    <>
      <TopBanner />
      <Header />

      {/* Banner Section */}
      <div className="br-30 relative flex h-64 items-center justify-center overflow-hidden bg-gray-800">
        <img
          alt="Construction background"
          className="absolute inset-0 h-full w-full"
          src={sellBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold uppercase tracking-tight text-white">
            {t('sell.title')}
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Link to={ROUTES.HOME} className="text-white transition-colors hover:text-primary">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="material-icons text-xs text-white">chevron_right</span>
            <span className="text-primary">{t('sell.breadCrumbs.sellInventory')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <section className="mx-auto max-w-7xl px-6 py-16">
          <h2 className="mb-8 w-fit border-b-4 border-primary pb-2 text-3xl font-black uppercase tracking-tight">
            {t('sell.subtitle')}
          </h2>
          <div className="mb-12 grid gap-6 md:grid-cols-3">
            <div className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]">
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                1
              </span>
              <p className="text-lg font-bold uppercase leading-tight">{t('sell.card.card1')}</p>
            </div>
            <div className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]">
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                2
              </span>
              <p className="text-lg font-bold uppercase leading-tight">{t('sell.card.card2')}</p>
            </div>
            <div className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]">
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                3
              </span>
              <p className="text-lg font-bold uppercase leading-tight">{t('sell.card.card3')}</p>
            </div>
          </div>

          <div className="mb-12 flex items-center justify-center gap-4">
            <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700"></div>
            <span className="text-2xl font-black text-slate-400">OR</span>
            <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700"></div>
          </div>

          <div className="mb-20 grid gap-6 md:grid-cols-3">
            <div className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]">
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                1
              </span>
              <p className="text-lg font-bold uppercase leading-tight">{t('sell.card.card1OR')}</p>
            </div>
            <div className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]">
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                2
              </span>
              <p className="text-lg font-bold uppercase leading-tight">{t('sell.card.card2OR')}</p>
            </div>
            <div className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]">
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                3
              </span>
              <p className="text-lg font-bold uppercase leading-tight">{t('sell.card.card3OR')}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-black uppercase tracking-tight">{t('sell.getStarted')}</h2>
            <p className="mt-2 text-slate-500">
              {t('sell.completeForm')} <span className="font-bold text-primary">860-222-3393</span>
            </p>
          </div>

          <div
            ref={formRef}
            className="rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
          >
            {/* Progress Stepper */}
            <div className="rounded-t-3xl border-b border-slate-200 bg-[#DE9A4F33] p-8 dark:border-slate-700 dark:bg-slate-900/50">
              <div className="no-scrollbar overflow-x-auto">
                <div className="flex min-w-max items-center justify-start gap-8 sm:min-w-0 sm:justify-between sm:gap-0">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex flex-shrink-0 items-center">
                      {/* Step Icon + Label */}
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full ${
                            index <= currentStep
                              ? 'bg-primary text-white shadow-lg shadow-primary/30'
                              : 'bg-black text-white dark:bg-slate-700'
                          }`}
                        >
                          <i className="material-icons">{step.icon}</i>
                        </div>

                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            index <= currentStep ? 'text-primary' : 'text-slate-400'
                          }`}
                        >
                          {step.label}
                        </span>
                      </div>

                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="flex items-center px-6">
                          <div
                            className={`h-[2px] w-10 ${
                              index < currentStep ? 'bg-primary' : 'bg-slate-400 dark:bg-slate-600'
                            }`}
                          ></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8 lg:p-8">
              {renderStep()}

              <div className="mt-8 flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-2 rounded-full px-8 py-3 font-bold transition-all ${
                    currentStep === 0
                      ? 'cursor-not-allowed bg-slate-100 text-slate-500 opacity-50 dark:bg-slate-700 dark:text-slate-300'
                      : 'bg-[#151515] text-white hover:bg-[#222222]'
                  }`}
                >
                  <i className="material-icons">arrow_back</i>
                  {t('common.previous')}
                </button>

                <button
                  type="button"
                  onClick={isLastStep ? handleSubmit : nextStep}
                  className="flex transform items-center gap-2 rounded-full bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-orange-600"
                >
                  {isLastStep ? t('common.submit') : t('common.next')}

                  <i className="material-icons">arrow_forward</i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default SellPage;
