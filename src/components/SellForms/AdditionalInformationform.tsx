import type { SellFormData } from '../../types/home';
import { TextInput } from './TextInput';
import RadioGroup from './RadioInput';
import { useTranslation } from '../../i18n';
import { DocumentUpload } from './DocumentInput';
import React from 'react';

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
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
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

const AdditionalInformation = ({ formData, handleChange, options, errors, setFormData }: DetailsProps) => {
  const { t } = useTranslation();
  const getGoogleMapsEmbedUrl = (address?: string) => {
    if (address && address.trim() !== '') {
      const encodedAddress = encodeURIComponent(address);

      // When address exists → show location with marker
      return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
    }

    // When empty → show plain map view (no pin)
    return `https://www.google.com/maps?output=embed`;
  };

  const handleOwnershipUpload =
    (field: keyof typeof formData.additionalInformation.ownership) => async (files: File[]) => {
      try {
        const uploadedUrls: string[] = [];

        for (const file of files) {
          const uploadData = new FormData();
          uploadData.append('file', file);

          const res = await fetch('/your-upload-api', {
            method: 'POST',
            body: uploadData,
          });

          const data = await res.json();
          uploadedUrls.push(data.url);
        }

        setFormData((prev) => ({
          ...prev,
          additionalInformation: {
            ...prev.additionalInformation,
            ownership: {
              ...prev.additionalInformation.ownership,
              [field]: [...prev.additionalInformation.ownership[field], ...uploadedUrls],
            },
          },
        }));
      } catch (error) {
        console.error('Upload failed', error);
      }
    };

  const handleOwnershipRemove =
    (field: keyof typeof formData.additionalInformation.ownership) => (index: number) => {
      setFormData((prev) => ({
        ...prev,
        additionalInformation: {
          ...prev.additionalInformation,
          ownership: {
            ...prev.additionalInformation.ownership,
            [field]: prev.additionalInformation.ownership[field].filter((_, i) => i !== index),
          },
        },
      }));
    };

  return (
    <div>
      <h3 className='mb-8 text-xl font-bold uppercase tracking-tight dark:text-slate-300'>
        {t('sell.form.additionalInformation.title')}
      </h3>

      <div className='space-y-12'>
        {/* EQUIPMENT IDENTITY DETAILS */}
        <section className='sell-details-form'>
          <h4 className='mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300'>
            {t('sell.form.additionalInformation.equipmentIdentity.title')}
          </h4>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <TextInput
              label={t('sell.form.additionalInformation.equipmentIdentity.vinNumber')}
              name='additionalInformation.equipmentIdentity.vinNumber'
              placeholder='e.g., CAT0320GCXYZ123'
              value={formData.additionalInformation.equipmentIdentity.vinNumber || ''}
              required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.vinNumber}
              onChange={handleChange}
            />

            <TextInput
              label={t('sell.form.additionalInformation.equipmentIdentity.manufacturerDate')}
              name='additionalInformation.equipmentIdentity.manufacturerDate'
              placeholder='MM/DD/YYYY'
              value={formData.additionalInformation.equipmentIdentity.manufacturerDate || ''}
              required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.manufacturerDate}
              onChange={handleChange}
              type='date'
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.modelYear')}
              name='additionalInformation.equipmentIdentity.modelYearConfirmation'
              value={formData.additionalInformation.equipmentIdentity.modelYearConfirmation || ''}
              required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.modelYearConfirmation}
              options={options.yesNo}
              onChange={handleChange}
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.equipmentHasDamage')}
              name='additionalInformation.equipmentIdentity.equipmentHasDamage'
              value={formData.additionalInformation.equipmentIdentity.equipmentHasDamage || ''}
              required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.equipmentHasDamage}
              options={options.yesNo}
              onChange={handleChange}
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.maintainenceRecords')}
              name='additionalInformation.equipmentIdentity.maintainenceRecords'
              value={formData.additionalInformation.equipmentIdentity.maintainenceRecords || ''}
              required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.maintainenceRecords}
              options={options.yesNo}
              onChange={handleChange}
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.warrantyAvailable')}
              name='additionalInformation.equipmentIdentity.warrantyAvailable'
              value={formData.additionalInformation.equipmentIdentity.warrantyAvailable || ''}
              required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.warrantyAvailable}
              options={options.yesNo}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className='sell-details-form'>
          <h4 className='mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300'>
            {t('sell.form.additionalInformation.location.title')}
          </h4>

          <div className='grid grid-cols-1 gap-6 '>
            <TextInput
              label={t('sell.form.additionalInformation.location.address')}
              name='additionalInformation.location.address'
              placeholder='e.g., Milan, Italia'
              value={formData.additionalInformation.location.address || ''}
              required={true}
              error={errors?.additionalInformation?.location?.address}
              onChange={handleChange}
            />

            <div
              className='
                        h-[350px] w-full overflow-hidden rounded-xl
                        bg-slate-200 dark:bg-slate-800
                        shadow-inner contrast-125 
                        transition-all duration-700 hover:grayscale-0
                    '
            >
              <iframe
                title='Equipment Location Map'
                src={getGoogleMapsEmbedUrl(formData.additionalInformation.location.address)}
                className='w-full h-full border-0'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
              />
            </div>
          </div>
        </section>

        <section className='sell-details-form'>
          <h4 className='mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300'>
            {t('sell.form.additionalInformation.ownership.title')}
          </h4>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.ownershipProof')}
              required={true}
              maxFiles={3}
              onChange={handleOwnershipUpload('ownershipProof')}
              onRemove={handleOwnershipRemove('ownershipProof')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.invoiceBill')}
              required={true}
              maxFiles={3}
              onChange={handleOwnershipUpload('invoiceBillOfSale')}
              onRemove={handleOwnershipRemove('invoiceBillOfSale')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.governmentRegistration')}
              required={true}
              maxFiles={3}
              onChange={handleOwnershipUpload('governmentRegistration')}
              onRemove={handleOwnershipRemove('governmentRegistration')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.emission')}
              required={true}
              maxFiles={3}
              onChange={handleOwnershipUpload('emissionTest')}
              onRemove={handleOwnershipRemove('emissionTest')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.insurance')}
              required={true}
              maxFiles={3}
              onChange={handleOwnershipUpload('insurance')}
              onRemove={handleOwnershipRemove('insurance')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.maintenance')}
              required={true}
              maxFiles={3}
              onChange={handleOwnershipUpload('maintenanceLog')}
              onRemove={handleOwnershipRemove('maintenanceLog')}
            />
          </div>
        </section>
      </div>
    </div>
  );
};
export default AdditionalInformation;
