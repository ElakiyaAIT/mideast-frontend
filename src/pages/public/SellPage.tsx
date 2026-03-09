import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useRef, useState } from 'react';
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
import { dropdownOptions, initialFormData } from './SellPage.constants';
import { useCreateEquipment } from '../../hooks/queries/useEquipment';
import { useCurrentUser } from '../../hooks/queries/useAuth';
import LoginRequiredModal from './components/LoginRequiredModal';
import { Button } from '../../components/Button/Button';

const SellPage = (): JSX.Element => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLDivElement>(null);
  const { data: user } = useCurrentUser();
  // const user={
  //   id:'1',
  //   firstName:'seller123',
  //   lastName:'demo',
  // }
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [category, setCategory] = useState('');

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
  const createMutation = useCreateEquipment();
  const isLoadingCreate = createMutation.isPending;
  const convertYesNoStringsToBooleans = (obj: unknown): unknown => {
    if (obj === 'yes') return true;
    if (obj === 'no') return false;

    if (Array.isArray(obj)) {
      return obj.map(convertYesNoStringsToBooleans);
    }

    if (obj !== null && typeof obj === 'object') {
      const newObj: Record<string, unknown> = {};
      const source = obj as Record<string, unknown>;

      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          newObj[key] = convertYesNoStringsToBooleans(source[key]);
        }
      }

      return newObj;
    }

    return obj;
  };
  const handleSubmit = async () => {
    try {
      const converted = convertYesNoStringsToBooleans(formData) as typeof formData;
      const payload = {
        ...converted,
        sellerId: user?.id,
        hoursUsed: formData?.basicDetails?.engineHours
          ? Number(formData.basicDetails.engineHours)
          : undefined,
        year: Number(formData.year),
        condition: 'new',
        listingType: 'buy_now',
        buyNowPrice: 150000,
      };
      await createMutation.mutateAsync(payload);
      setShowSuccessModal(true);
      setFormData(initialFormData);
      setCurrentStep(0);
    } catch (error) {
      console.error('Equipment creation failed', error);
    }
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
            setCategory={setCategory}
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
        return (
          <ReviewForm formData={formData} setCurrentStep={setCurrentStep} category={category} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <LoginRequiredModal open={!user} />
      <TopBanner />
      <Header />

      <SellBanner />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <SellInfoCards />

        <div
          ref={formRef}
          className={`rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-800 ${!user ? 'pointer-events-none opacity-50' : ''}`}
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

              <Button
                type="button"
                onClick={isLastStep ? handleSubmit : nextStep}
                className={`flex transform items-center gap-2 rounded-full bg-primary px-10 py-3 font-bold text-white shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:bg-orange-600 ${
                  isLastStep && isLoadingCreate ? 'cursor-not-allowed opacity-60' : ''
                }`}
                disabled={isLastStep && isLoadingCreate}
              >
                {isLastStep
                  ? isLoadingCreate
                    ? 'Saving...'
                    : t('common.submit')
                  : t('common.next')}
                <i className="material-icons">arrow_forward</i>
              </Button>
            </div>
          </div>
        </div>
      </main>
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
            <div className="mb-4 flex justify-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <i className="material-icons text-3xl text-green-600">check_circle</i>
              </div>
            </div>

            <h2 className="mb-2 text-xl font-semibold text-gray-900">Listing Submitted</h2>

            <p className="mb-6 text-gray-600">
              Your equipment listing has been submitted successfully. Please wait for our team to
              contact you.
            </p>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                setFormData(initialFormData);
                setCurrentStep(0);
              }}
              className="rounded-full bg-primary px-6 py-2 font-medium text-white hover:bg-orange-600"
            >
              OK
            </button>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default SellPage;
