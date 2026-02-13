import type { SellFormData } from "../../types/home";


interface Props {
  formData: SellFormData;
  setFormData: React.Dispatch<React.SetStateAction<SellFormData>>;
}

const BasicInfo = ({
  formData,
  setFormData,
}: Props) => {
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
        Basic Equipment Information
      </h3>

      <div className="space-y-8">
        {/* Equipment Title */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
            Equipment Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary"
            placeholder="e.g., Caterpillar 320 Excavator (2020)"
            type="text"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg p-3 focus:ring-primary focus:border-primary"
          >
            <option value="">Select Category</option>
            <option>Excavators</option>
            <option>Loaders</option>
            <option>Dozers</option>
            <option>Compaction</option>
          </select>
        </div>

        {/* Description (Your Original UI Preserved) */}
        <div>
          <label className="block text-sm font-bold uppercase tracking-wide text-slate-700 dark:text-slate-300 mb-2">
            Description
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

      {/* Buttons */}
      {/* <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
        {prevStep && (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 px-8 py-3 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 rounded-full font-bold"
          >
            <i className="material-icons">arrow_back</i> PREVIOUS
          </button>
        )}

        <button
          type="button"
          onClick={nextStep}
          className="flex items-center gap-2 px-10 py-3 bg-primary hover:bg-orange-600 text-white rounded-full font-bold shadow-lg shadow-primary/30 transition-all transform hover:scale-105"
        >
          NEXT <i className="material-icons">arrow_forward</i>
        </button>
      </div> */}
    </div>
  );
};

export default BasicInfo;
