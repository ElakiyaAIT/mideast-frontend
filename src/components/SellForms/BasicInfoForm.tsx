import { useTranslation } from "../../i18n";
import type { SellFormData } from "../../types/home";
import { SelectInput } from "./SelectInput";
import { TextInput } from "./TextInput";


interface Props {
  formData: SellFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
}
const conditionOptions = [
  { id: 1, value: "Excellent" },
  { id: 2, value: "Good" },
  { id: 3, value: "Fair" },
  { id: 4, value: "Poor" },
];

const BasicInfo = ({
  formData,
  setFormData,
}: Props) => {
  const { t } = useTranslation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3 className="text-xl font-bold uppercase tracking-tight mb-8">
        {t('sell.form.basicEquipmentInformation')}
      </h3>

      <div className="space-y-8">
        {/* Equipment Title */}

        <TextInput
          label={t('sell.form.equipmentTitle')}
          name="title"
          placeholder="e.g., Caterpillar 320 Excavator (2020)"
          value={formData.title || ""}
          onChange={handleChange}
        />

        {/* Category */}

        <SelectInput
          placeholder="e.g., Excavators"
          label={t('sell.form.category')}
          name="category"
          value={formData.category}
          options={conditionOptions}
          onChange={handleChange}
        />
        {/* Description (Your Original UI Preserved) */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
            {t('sell.form.description')}
          </label>

          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-slate-100 dark:bg-slate-900 p-2 border-b border-slate-200 dark:border-slate-700 flex gap-2 overflow-x-auto">
              <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <i className="material-icons text-lg">format_bold</i>
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <i className="material-icons text-lg">format_italic</i>
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <i className="material-icons text-lg">format_underlined</i>
              </button>

              <div className="w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>

              <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <i className="material-icons text-lg">format_list_bulleted</i>
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <i className="material-icons text-lg">format_list_numbered</i>
              </button>

              <div className="w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>

              <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <i className="material-icons text-lg">link</i>
              </button>
              <button type="button" className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded text-slate-600 dark:text-slate-400">
                <i className="material-icons text-lg">image</i>
              </button>
            </div>

            {/* Textarea */}
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-white dark:bg-slate-900 border-none focus:ring-0 p-4"
              placeholder="Provide a detailed description of the equipment, its features, and recent maintenance..."
              rows={8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
