import { useTranslation } from '../../i18n';
import type { SellFormData } from '../../types/home';
import { SelectInput } from './SelectInput';
import { TextInput } from './TextInput';
import { Editor } from '@tinymce/tinymce-react';
import React from 'react';
// Core
import 'tinymce/tinymce';
import 'tinymce/models/dom';

// Theme
import 'tinymce/themes/silver';

// Icons
import 'tinymce/icons/default';

// Plugins
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/plugins/image';

//  ADD THESE
import 'tinymce/skins/ui/oxide/skin.min.css';
import 'tinymce/skins/content/default/content.min.css';
type NestedErrors<T> = {
  [K in keyof T]?: T[K] extends object ? NestedErrors<T[K]> : string;
};

interface Props {
  formData: SellFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
  errors?: NestedErrors<SellFormData>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  setErrors: React.Dispatch<React.SetStateAction<NestedErrors<SellFormData>>>;
}
const conditionOptions = [
  { id: 1, value: 'Excellent' },
  { id: 2, value: 'Good' },
  { id: 3, value: 'Fair' },
  { id: 4, value: 'Poor' },
];

const BasicInfo = ({ formData, setFormData, handleChange, errors, setErrors }: Props) => {
  const { t } = useTranslation();

  return (
    <div>
      <h3 className='text-xl font-bold uppercase tracking-tight mb-8'>
        {t('sell.form.basicEquipmentInformation')}
      </h3>

      <div className='space-y-8'>
        {/* Equipment Title */}

        <TextInput
          required={true}
          error={errors?.title}
          label={t('sell.form.equipmentTitle')}
          name='title'
          placeholder='e.g., Caterpillar 320 Excavator (2020)'
          value={formData.title || ''}
          onChange={handleChange}
        />

        {/* Category */}

        <SelectInput
          required={true}
          error={errors?.category}
          placeholder='e.g., Excavators'
          label={t('sell.form.category')}
          name='category'
          value={formData.category}
          options={conditionOptions}
          onChange={handleChange}
        />
        {/* Description (Your Original UI Preserved) */}
        <div>
          <label className='block text-lg font-bold  tracking-wide dark:text-slate-300 mb-2'>
            {t('sell.form.description')}
            <span className='ml-1 text-red-500'>*</span>
          </label>
          <Editor
            value={formData.description || ''}
            onEditorChange={(content) => {
              setFormData((prev) => {
                return { ...prev, description: content };
              });

              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.description;
                return newErrors;
              });
            }}
            init={{
              height: 220,
              menubar: false,
              branding: false,

              plugins: ['link', 'lists', 'image', 'media', 'table', 'code', 'advlist'],

              toolbar:
                'fontsize | formatselect | forecolor backcolor | ' +
                'bold italic underline strikethrough | alignleft aligncenter alignright | ' +
                'bullist numlist | link image media | code',

              fontsize_formats: '12px 14px 16px 18px 20px 24px',

              placeholder:
                'Provide a detailed description of the equipment, its features, and recent maintenance.',

              automatic_uploads: true,
              file_picker_types: 'image media file',
            }}
          />
          {errors?.description && (
            <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
              {errors.description}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
