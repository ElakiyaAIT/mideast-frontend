import type { SellFormData } from '../../types/home';
import { TextInput } from './TextInput';
import RadioGroup from './RadioInput';
import { useTranslation } from '../../i18n';
import { DocumentUpload } from './DocumentInput';
import React from 'react';
import { equipmentApi } from '../../api';

type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};
interface Option {
  value: string | number;
  label: string;
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
type Location = {
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zipcode?: string;
};
const AdditionalInformation = ({
  formData,
  handleChange,
  options,
  errors,
  setFormData,
}: DetailsProps) => {
  const { t } = useTranslation();
  const getGoogleMapsEmbedUrl = (location?: Location) => {
    if (location) {
      const parts = [
        location.address,
        location.city,
        location.state,
        location.zipcode,
        location.country,
      ].filter(Boolean); // remove empty values

      if (parts.length > 0) {
        const fullAddress = parts.join(', ');
        const encodedAddress = encodeURIComponent(fullAddress);

        return `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
      }
    }

    // fallback → plain map view
    return `https://www.google.com/maps?output=embed`;
  };
  const uploadApiMap = {
    ownershipProof: equipmentApi.uploadOwnershipDocs,
    invoiceBillOfSale: equipmentApi.uploadInvoiceDocs,
    governmentRegistration: equipmentApi.uploadRegistrationDocs,
    emissionTest: equipmentApi.uploadEmissionDocs,
    insurance: equipmentApi.uploadInsuranceDocs,
    maintenanceLog: equipmentApi.uploadMaintenanceDocs,
  };
  const handleOwnershipUpload =
    (field: keyof typeof formData.additionalInformation.ownership) => async (files: File[]) => {
      try {
        const uploadFn = uploadApiMap[field];
        if (!uploadFn) throw new Error('No upload API found');

        const uploadedUrls: string[] = [];

        for (const file of files) {
          const res = await uploadFn(file);
          uploadedUrls.push(...res.data.urls);
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
      <h3 className="mb-8 text-xl font-bold uppercase tracking-tight dark:text-slate-300">
        {t('sell.form.additionalInformation.title')}
      </h3>

      <div className="space-y-12">
        {/* EQUIPMENT IDENTITY DETAILS */}
        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.additionalInformation.equipmentIdentity.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TextInput
              label={t('sell.form.additionalInformation.equipmentIdentity.vinNumber')}
              name="additionalInformation.equipmentIdentity.vinNumber"
              placeholder="e.g., CAT0320GCXYZ123"
              value={formData.additionalInformation.equipmentIdentity.vinNumber || ''}
              // required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.vinNumber}
              onChange={handleChange}
            />

            <TextInput
              label={t('sell.form.additionalInformation.equipmentIdentity.manufacturerDate')}
              name="additionalInformation.equipmentIdentity.manufacturerDate"
              placeholder="MM/DD/YYYY"
              value={formData.additionalInformation.equipmentIdentity.manufacturerDate || ''}
              // required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.manufacturerDate}
              onChange={handleChange}
              type="date"
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.modelYear')}
              name="additionalInformation.equipmentIdentity.modelYearConfirmation"
              value={formData.additionalInformation.equipmentIdentity.modelYearConfirmation || ''}
              // required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.modelYearConfirmation}
              options={options.yesNo}
              onChange={handleChange}
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.equipmentHasDamage')}
              name="additionalInformation.equipmentIdentity.equipmentHasDamage"
              value={formData.additionalInformation.equipmentIdentity.equipmentHasDamage || ''}
              // required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.equipmentHasDamage}
              options={options.yesNo}
              onChange={handleChange}
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.maintainenceRecords')}
              name="additionalInformation.equipmentIdentity.maintainenceRecords"
              value={formData.additionalInformation.equipmentIdentity.maintenanceRecords || ''}
              // required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.maintenanceRecords}
              options={options.yesNo}
              onChange={handleChange}
            />

            <RadioGroup
              label={t('sell.form.additionalInformation.equipmentIdentity.warrantyAvailable')}
              name="additionalInformation.equipmentIdentity.warrantyAvailable"
              value={formData.additionalInformation.equipmentIdentity.warrantyAvailable || ''}
              // required={true}
              error={errors?.additionalInformation?.equipmentIdentity?.warrantyAvailable}
              options={options.yesNo}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.additionalInformation.location.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6">
            <TextInput
              label={t('sell.form.additionalInformation.location.address')}
              name="location.address"
              placeholder="e.g., Milan, Italia"
              value={formData.location.address || ''}
              required={true}
              error={errors?.location?.address}
              onChange={handleChange}
            />
            <TextInput
              label={t('sell.form.additionalInformation.location.city')}
              name="location.city"
              value={formData.location.city || ''}
              required={true}
              error={errors?.location?.city}
              onChange={handleChange}
            />
            <TextInput
              label={t('sell.form.additionalInformation.location.state')}
              name="location.state"
              value={formData.location.state || ''}
              required={true}
              error={errors?.location?.state}
              onChange={handleChange}
            />
            <TextInput
              label={t('sell.form.additionalInformation.location.zipCode')}
              name="location.zipCode"
              value={formData.location.zipCode || ''}
              required={true}
              error={errors?.location?.zipCode}
              onChange={handleChange}
            />
            <TextInput
              label={t('sell.form.additionalInformation.location.country')}
              name="location.country"
              value={formData.location.country || ''}
              required={true}
              error={errors?.location?.country}
              onChange={handleChange}
            />

            <div className="h-[350px] w-full overflow-hidden rounded-xl bg-slate-200 shadow-inner contrast-125 transition-all duration-700 hover:grayscale-0 dark:bg-slate-800">
              <iframe
                title="Equipment Location Map"
                src={getGoogleMapsEmbedUrl(formData?.location || '')}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        <section className="sell-details-form">
          <h4 className="mb-6 border-b border-slate-200 pb-3 text-xl font-bold uppercase tracking-wider text-slate-900 dark:border-slate-700 dark:text-slate-300">
            {t('sell.form.additionalInformation.ownership.title')}
          </h4>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.ownershipProof')}
              // required={true}
              maxFiles={1}
              value={formData.additionalInformation.ownership.ownershipProof}
              onChange={handleOwnershipUpload('ownershipProof')}
              onRemove={handleOwnershipRemove('ownershipProof')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.invoiceBill')}
              // required={true}
              maxFiles={1}
              value={formData.additionalInformation.ownership.invoiceBillOfSale}
              onChange={handleOwnershipUpload('invoiceBillOfSale')}
              onRemove={handleOwnershipRemove('invoiceBillOfSale')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.governmentRegistration')}
              // required={true}
              maxFiles={1}
              value={formData.additionalInformation.ownership.governmentRegistration}
              onChange={handleOwnershipUpload('governmentRegistration')}
              onRemove={handleOwnershipRemove('governmentRegistration')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.emission')}
              // required={true}
              maxFiles={1}
              value={formData.additionalInformation.ownership.emissionTest}
              onChange={handleOwnershipUpload('emissionTest')}
              onRemove={handleOwnershipRemove('emissionTest')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.insurance')}
              // required={true}
              maxFiles={1}
              value={formData.additionalInformation.ownership.insurance}
              onChange={handleOwnershipUpload('insurance')}
              onRemove={handleOwnershipRemove('insurance')}
            />

            <DocumentUpload
              label={t('sell.form.additionalInformation.ownership.maintenance')}
              // required={true}
              maxFiles={1}
              value={formData.additionalInformation.ownership.maintenanceLog}
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
