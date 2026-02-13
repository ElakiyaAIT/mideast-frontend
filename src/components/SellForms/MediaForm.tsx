import type { SellFormData } from "../../types/home";
import { ImageUpload } from "./ImageInput";
export const mediaSections: Record<
  keyof SellFormData["media"],
  { title: string; icon: string }
> = {
  exteriorImages: {
    title: "Exterior",
    icon: "crop_original",
  },

  engineCompartMentImages: {
    title: "Engine Compartment",
    icon: "crop_original",
  },

  underCarriageTracksImages: {
    title: "Undercarriage / Tracks",
    icon: "crop_original",
  },

  cabInteiorImages: {
    title: "Cab Interior",
    icon: "crop_original",
  },

  otherAttachments: {
    title: "Other Attachments",
    icon: "crop_original",
  },

  videos: {
    title: "Videos",
    icon: "videocam",
  },
};


interface MediaFormProps {
  formData: SellFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
}

const MediaForm = ({ formData, setFormData }: MediaFormProps) => {
type MediaKey = keyof SellFormData["media"];

  // 🔥 Reusable Section Component INSIDE same file
  interface MediaSectionProps {
    title: string;
    icon: string;
    images: string[];
    onUpload: (files: File[]) => void;
    onRemove: (index: number) => void;
  }

  const MediaSection = ({
    title,
    icon,
    images,
    onUpload,
    onRemove,
  }: MediaSectionProps) => {
    return (
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-[#FDAD3E] flex items-center justify-center">
            <span className="material-icons text-white text-[18px]">
              {icon}
            </span>
          </div>

          <span className="text-[#FDAD3E] font-medium text-sm">
            {title}
          </span>
        </div>

        <ImageUpload
          label=""
          required
          maxFiles={10}
          value={images}
          onChange={onUpload}
          onRemove={onRemove}
          helperText="Supported formats: SVG, JPG, PNG (10MB max each)"
        />
      </div>
    );
  };

  // 🔥 Generic Upload
  const handleUpload = async (sectionKey: string, files: File[]) => {
    const uploadData = new FormData();
    files.forEach((file) => uploadData.append("images", file));

    const response = await fetch("/api/upload-images", {
      method: "POST",
      body: uploadData,
    });

    const data = await response.json();
    const uploadedUrls: string[] = data.imageUrls;

    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [sectionKey]: [
          ...(prev.media?.[sectionKey] || []),
          ...uploadedUrls,
        ],
      },
    }));
  };

  const handleRemove = (sectionKey: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      media: {
        ...prev.media,
        [sectionKey]: prev.media?.[sectionKey].filter(
          (_: string, i: number) => i !== index
        ),
      },
    }));
  };

  return (
    <div>

      <h3 className="mb-4 text-lg font-bold uppercase tracking-wide text-slate-800">
        Upload Equipment Photos & Videos
      </h3>

      <div className="h-px bg-slate-300 mb-6" />

      {/* 🔥 Map Here Itself */}
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
