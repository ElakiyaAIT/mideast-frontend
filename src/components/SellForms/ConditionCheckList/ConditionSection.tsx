import { useTranslation } from '../../../i18n';
import type { SellFormData } from '../../../types/home';
import { ImageUpload } from '../ImageInput';
import { SelectInput } from '../SelectInput';
import React from 'react';
type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};

interface Props {
  sectionKey: keyof SellFormData['checkList'];
  title: string;
  items: { key: keyof SellFormData['checkList'][keyof SellFormData['checkList']]; label: string }[];
  formData: SellFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
  errors?: NestedErrors<SellFormData>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const conditionOptions = [
  { id: 1, value: 'Excellent' },
  { id: 2, value: 'Good' },
  { id: 3, value: 'Fair' },
  { id: 4, value: 'Poor' },
];

const ConditionSection = ({
  sectionKey,
  title,
  items,
  formData,
  errors,
  setFormData,
  handleChange,
}: Props) => {
  const { t } = useTranslation();
  // const [uploadingItem, setUploadingItem] = useState<string | null>(null);
  // Inside your Parent Component
  const handleConditionUpload = async (itemKey: string, files: File[]) => {
    if (files.length === 0) return;

    // setUploadingItem(itemKey);

    try {
      const uploadData = new FormData();
      files.forEach((file) => uploadData.append('images', file));

      const response = await fetch('/api/upload-images', {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data: { imageUrls: string[] } = await response.json();
      const uploadedUrls = data.imageUrls;

      setFormData((prev) => {
        const section = prev.checkList[sectionKey];
        const imagesKey = `${itemKey}Images`;

        const existingImages =
          typeof section === 'object' &&
          section !== null &&
          imagesKey in section &&
          Array.isArray((section as Record<string, unknown>)[imagesKey])
            ? ((section as Record<string, unknown>)[imagesKey] as string[])
            : [];

        return {
          ...prev,
          checkList: {
            ...prev.checkList,
            [sectionKey]: {
              ...section,
              [imagesKey]: [...existingImages, ...uploadedUrls],
            },
          },
        };
      });
    } catch (error) {
      console.error('Condition Upload Error:', error);
    } finally {
      // setUploadingItem(null);
    }
  };

  const handleConditionRemove = (itemKey: string, index: number) => {
    setFormData((prev) => {
      const section = prev.checkList[sectionKey];

      const imagesKey = `${itemKey}Images`;

      const existingImages =
        typeof section === 'object' &&
        section !== null &&
        imagesKey in section &&
        Array.isArray((section as Record<string, unknown>)[imagesKey])
          ? ((section as Record<string, unknown>)[imagesKey] as string[])
          : [];

      return {
        ...prev,
        checkList: {
          ...prev.checkList,
          [sectionKey]: {
            ...section,
            [imagesKey]: existingImages.filter((_: string, i: number) => i !== index),
          },
        },
      };
    });
  };

  console.log(errors, 'er123e');

  return (
    <div className='rounded-2xl bg-slate-50 p-8 dark:bg-slate-900'>
      <h4 className='mb-6 border-b-2 border-primary pb-4 text-lg font-bold uppercase dark:text-slate-400'>
        {t(title)}
      </h4>

      <div className='space-y-6'>
        <div className='hidden md:grid grid-cols-12 gap-6 border-b border-slate-200 pb-6 dark:border-slate-700'>
          <div className='md:col-span-3'>
            <p className='text-sm font-bold uppercase text-slate-600 dark:text-slate-400'>
              {t('sell.form.conditionCheckList.item')}
            </p>
          </div>
          <div className='md:col-span-3'>
            <p className='text-sm font-bold uppercase text-slate-600 dark:text-slate-400'>
              {t('sell.form.conditionCheckList.status')}
            </p>
          </div>
          <div className='md:col-span-6'>
            <p className='text-sm font-bold uppercase text-slate-600 dark:text-slate-400'>
              {t('sell.form.conditionCheckList.photosVideos')}
            </p>
          </div>
        </div>
        {items.map((item, index) => (
          <div
            key={item.key}
            className={`grid grid-cols-1 gap-6 md:grid-cols-12 ${
              index !== items.length - 1
                ? 'border-b border-slate-200 pb-6 dark:border-slate-700'
                : ''
            }`}
          >
            {/* Item */}
            <div className='md:col-span-3 font-semibold dark:text-slate-400'>
              {t(item.label)}
              <span className='ml-1 text-red-500'>*</span>
            </div>

            {/* Select */}
            <div className='md:col-span-3'>
              <SelectInput
                placeholder={'eg.,Good'}
                name={`checkList.${sectionKey}.${item.key}`}
                value={formData?.checkList?.[sectionKey]?.[item.key]}
                error={errors?.checkList?.[sectionKey]?.[item.key]} // <-- pass the error here
                options={conditionOptions}
                onChange={handleChange}
              />
            </div>

            {/* Upload */}
            <div className='md:col-span-6'>
              <ImageUpload
                maxFiles={1}
                value={formData?.checkList?.[sectionKey]?.[`${item.key}Images`] || []}
                onChange={(files) => handleConditionUpload(item.key, files)}
                onRemove={(idx) => handleConditionRemove(item.key, idx)}
              />
              {/* {uploadingItem === item.key && (
                <span className='text-xs text-primary animate-pulse'>Uploading...</span>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionSection;
