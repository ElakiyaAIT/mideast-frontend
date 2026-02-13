import { ImageUpload } from "../ImageInput";
import { SelectInput } from "../SelectInput";

interface Props {
  sectionKey: string;
  title: string;
  items: { key: string; label: string }[];
  formData: any;
  handleChange: any;
}

const conditionOptions = [
  { id: 1, value: "Excellent" },
  { id: 2, value: "Good" },
  { id: 3, value: "Fair" },
  { id: 4, value: "Poor" },
];

const ConditionSection = ({
  sectionKey,
  title,
  items,
  formData,
  handleChange,
}: Props) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-8 dark:bg-slate-900">
      <h4 className="mb-6 border-b-2 border-primary pb-4 text-lg font-bold uppercase dark:text-slate-400">
        {title}
      </h4>

      <div className="space-y-6">
         <div className="hidden md:grid grid-cols-12 gap-6 border-b border-slate-200 pb-6 dark:border-slate-700">
          <div className="md:col-span-3">
            <p className="text-sm font-bold uppercase text-slate-600 dark:text-slate-400">
              Item
            </p>
          </div>
          <div className="md:col-span-3">
            <p className="text-sm font-bold uppercase text-slate-600 dark:text-slate-400">
              Status
            </p>
          </div>
          <div className="md:col-span-6">
            <p className="text-sm font-bold uppercase text-slate-600 dark:text-slate-400">
              Photos / Videos
            </p>
          </div>
        </div>
        {items.map((item, index) => (
          <div
            key={item.key}
            className={`grid grid-cols-1 gap-6 md:grid-cols-12 ${
              index !== items.length - 1
                ? "border-b border-slate-200 pb-6 dark:border-slate-700"
                : ""
            }`}
          >
            {/* Item */}
            <div className="md:col-span-3 font-semibold dark:text-slate-400">
              {item.label}
            </div>

            {/* Select */}
            <div className="md:col-span-3">
              <SelectInput
                name={`checkList.${sectionKey}.${item.key}`}
                value={
                  formData?.checkList?.[sectionKey]?.[item.key] || ""
                }
                options={conditionOptions}
                onChange={handleChange}
              />
            </div>

            {/* Upload */}
            <div className="md:col-span-6">
              <ImageUpload
                maxFiles={5}
                value={
                  formData?.checkList?.[sectionKey]?.[
                    `${item.key}Images`
                  ] || []
                }
                onChange={(files) =>
                  handleChange({
                    target: {
                      name: `checkList.${sectionKey}.${item.key}Images`,
                      value: files,
                    },
                  })
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConditionSection;
