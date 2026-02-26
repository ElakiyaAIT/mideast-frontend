import React, { useState } from 'react';
import mideastLogo from '../../assets/images/mideastlogo.svg';
// import { buyNowFormSchema } from '../../utils/validation';//enable this for api integration
import * as yup from 'yup';

type ContactMethod = 'call' | 'email' | 'whatsapp';

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  contactMethods: ContactMethod[];
}

interface BuyNowModalProps {
  productName?: string;
  onClose: () => void;
}

export default function BuyNowModal({ productName = '', onClose }: BuyNowModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: '',
    contactMethods: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleCheckboxChange = (method: ContactMethod) => {
    setFormData((prev) => ({
      ...prev,
      contactMethods: prev.contactMethods.includes(method)
        ? prev.contactMethods.filter((m) => m !== method)
        : [...prev.contactMethods, method],
    }));
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({}); // reset errors

    try {
      // const validatedData = await buyNowFormSchema.validate(formData, { abortEarly: false });//[enable this line after api integration]
      // Submit form here, e.g., API call
      // await api.sendEnquiry(validatedData);

      onClose(); // close modal on success
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) newErrors[error.path] = error.message;
        });
        setErrors(newErrors);
      }
    }
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="hide-scrollbar relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[24px] bg-[#ffffff] p-6 shadow-2xl">
          {/* Close Icon */}
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-500 hover:text-black"
          >
            <span className="material-icons text-xl">cancel</span>
          </button>

          {/* Logo */}
          <div className="mb-2 flex justify-center">
            <img src={mideastLogo} alt="Mideast Logo" className="h-14" />
          </div>

          {/* Heading */}
          <h2 className="mb-2 text-center text-3xl font-bold text-gray-900">
            Get More Info About This Machine
          </h2>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Underline Input Style */}
            <div>
              <label className="text-sm text-gray-500">
                Name <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g., John doe"
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent pb-2 pt-1 outline-none focus:border-black focus:outline-none focus:ring-0"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Phone <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="eg.,+1 992 565 678"
                onChange={handleChange}
                className="w-full border-b border-gray-300 bg-transparent pb-2 pt-1 outline-none focus:border-black focus:outline-none focus:ring-0"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-500">
                Email <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="e.g.,johndoe@email.com"
                onChange={handleChange}
                className="focus:ring-0focus:border-black w-full border-b border-gray-300 bg-transparent pb-2 pt-1 outline-none focus:outline-none"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>

            <div>
              <label className="text-sm text-gray-500">Product Name</label>
              <input
                type="text"
                value={productName}
                readOnly
                className="w-full border-b border-gray-300 bg-transparent pb-2 pt-1 text-gray-700 outline-none focus:outline-none focus:ring-0"
              />
            </div>

            <div>
              <label className="text-sm text-gray-500">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => {
                  handleChange(e);

                  // Auto-grow the textarea
                  const target = e.target;
                  target.style.height = 'auto'; // reset height
                  target.style.height = target.scrollHeight + 'px'; // set to scrollHeight
                }}
                rows={1} // initial row
                className="pt:1 w-full resize-none border-b border-gray-300 bg-transparent outline-none focus:border-black focus:outline-none focus:ring-0"
              />{' '}
              {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
            </div>

            {/* Preferred Contact Method */}
            <div>
              <p className="mb-4 text-sm text-gray-500">Preferred Contact Method</p>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" onChange={() => handleCheckboxChange('call')} />
                  <span className="material-icons text-sm text-[#F27405]">phone</span> Call
                </label>

                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" onChange={() => handleCheckboxChange('email')} />
                  <span className="material-icons text-sm text-[#F27405]">email</span>
                  Email
                </label>

                <label className="flex items-center gap-2 text-gray-700">
                  <input type="checkbox" onChange={() => handleCheckboxChange('whatsapp')} />
                  <i className="fa-brands fa-whatsapp text-[#F27405]"></i>
                  Whatsapp
                </label>
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-gradient-to-r from-orange-400 to-orange-500 py-2 font-semibold text-white shadow-lg transition hover:opacity-90"
            >
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
