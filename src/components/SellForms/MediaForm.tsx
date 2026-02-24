import { useTranslation } from '../../i18n';
import type { SellFormData } from '../../types/home';
import { ImageUpload } from './ImageInput';
import React from 'react';

interface MediaFormProps {
  formData: SellFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
}

const MediaForm = ({ formData, setFormData }: MediaFormProps) => {
  type MediaKey = keyof SellFormData['media'];
  const { t } = useTranslation();

  const mediaSections: Record<keyof SellFormData['media'], { title: string; icon: string }> = {
    exteriorImages: {
      title: t('sell.form.media.exterior'),
      icon: 'crop_original',
    },

    engineCompartMentImages: {
      title: t('sell.form.media.engineCompartment'),
      icon: 'crop_original',
    },

    underCarriageTracksImages: {
      title: t('sell.form.media.underCarriage'),
      icon: 'crop_original',
    },

    cabInteiorImages: {
      title: t('sell.form.media.cabInterior'),
      icon: 'crop_original',
    },

    otherAttachments: {
      title: t('sell.form.media.other'),
      icon: 'crop_original',
    },

    videos: {
      title: t('sell.form.media.videos'),
      icon: 'videocam',
    },
  };
  // Reusable Section Component INSIDE same file
  interface MediaSectionProps {
    title: string;
    icon: string;
    images: string[];
    onUpload: (files: File[]) => void;
    onRemove: (index: number) => void;
  }

  const MediaSection = ({ title, icon, images, onUpload, onRemove }: MediaSectionProps) => {
    return (
      <div className="mb-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDAD3E]">
            <span className="material-icons text-[18px] text-white">{icon}</span>
          </div>

          <span className="text-sm font-medium text-[#FDAD3E]">
            {title} <span className="ml-1 text-red-500">*</span>
          </span>
        </div>

        <ImageUpload
          label=""
          required
          maxFiles={1}
          value={images}
          onChange={onUpload}
          onRemove={onRemove}
          mode={icon === 'videocam' ? 'video' : 'image'}
          // helperText="Supported formats: SVG, JPG, PNG (10MB max each)"
        />
      </div>
    );
  };

  //  Generic Upload
  const handleUpload = async (sectionKey: MediaKey, files: File[]) => {
    const uploadData = new FormData();
    files.forEach((file) => uploadData.append('images', file));

    const response = await fetch('/api/upload-images', {
      method: 'POST',
      body: uploadData,
    });

    const data = await response.json();
    const uploadedUrls: string[] = data.imageUrls;

    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [sectionKey]: [...(prev.media?.[sectionKey] || []), ...uploadedUrls],
      },
    }));
  };

  const handleRemove = (sectionKey: MediaKey, index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [sectionKey]: prev.media?.[sectionKey].filter((_: string, i: number) => i !== index),
      },
    }));
  };

  return (
    <div>
      <h3 className="mb-4 text-lg font-bold uppercase tracking-wide text-slate-800">
        {t('sell.form.media.title')}
      </h3>

      <div className="mb-6 h-px bg-slate-300" />

      {/* Map Here Itself */}
      {(Object.keys(mediaSections) as MediaKey[]).map((key) => {
        const section = mediaSections[key];

        return (
          <MediaSection
            key={key}
            title={section.title}
            icon={section.icon}
            images={formData.media[key] || []}
            onUpload={(files) => handleUpload(key, files)}
            onRemove={(index) => handleRemove(key, index)}
          />
        );
      })}
    </div>
  );
};

export default MediaForm;
