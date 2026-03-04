import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useRef } from 'react';
import { useTranslation } from '../../i18n';

// Components
import BasicInfo from '../../components/SellForms/BasicInfoForm';
import Details from '../../components/SellForms/DetailsForm';
import ConditionChecklist from '../../components/SellForms/ConditionCheckListForm';
import MediaForm from '../../components/SellForms/MediaForm';
import AdditionalInformation from '../../components/SellForms/AdditionalInformationform';
import PriceForm from '../../components/SellForms/priceForm';
import ReviewForm from '../../components/SellForms/ReviewForm';
import { SellBanner } from './components/SellBanner';
import { SellInfoCards } from './components/SellInfoCards';
import { SellStepProgress } from './components/SellStepProgress';

// Hooks & Constants
import { useSellForm } from '../../hooks/useSellForm';
import { dropdownOptions } from './SellPage.constants';

const SellPage = (): JSX.Element => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);

  const steps = [
    { id: 0, icon: 'info', label: t('sell.steps.basicInfo') },
    { id: 1, icon: 'description', label: t('sell.steps.details') },
    { id: 2, icon: 'receipt_long', label: t('sell.steps.condition') },
    { id: 3, icon: 'photo_library', label: t('sell.steps.media') },
    { id: 4, icon: 'note_add', label: t('sell.steps.additional') },
    { id: 5, icon: 'payments', label: t('sell.steps.price') },
    { id: 6, icon: 'visibility', label: t('sell.steps.review') },
  ];

  const {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    nextStep,
    prevStep,
    isLastStep,
  } = useSellForm(steps.length, formRef);

  const handleSubmit = () => {
    console.warn(formData, 'Form Submitted');
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

  return (
    <>
      <TopBanner />
      <Header />

      <SellBanner />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <SellInfoCards />

        <div
          ref={formRef}
          className="rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800"
        >
          <SellStepProgress steps={steps} currentStep={currentStep} />

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
      </main>

      <Footer />
    </>
  );
};

export default SellPage;
