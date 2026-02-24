import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import React, { useState, type FormEvent } from 'react';

// Import images
import contactBanner from '../../assets/images/contact_banner.png';
import contactLeft from '../../assets/images/contact_left.png';
import { useTranslation } from '../../i18n';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';

const ContactUsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <TopBanner />
      <Header />
      {/* Banner */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-b-[30px] bg-gray-800">
        <img
          alt="Construction background"
          className="absolute inset-0 h-full w-full object-cover"
          src={contactBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold uppercase tracking-tight text-white">
            {t('contactUs.title')}
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Link to={ROUTES.HOME} className="text-white transition-colors hover:text-primary">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="material-icons text-xs text-white">chevron_right</span>
            <span className="text-primary">{t('contactUs.breadCrumbs.contact')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <section className="bg-background-light px-4 py-20 dark:bg-background-dark md:px-8">
          <div className="container mx-auto">
            <div className="grid items-start gap-12 lg:grid-cols-12">
              {/* Left Side - Contact Info */}
              <div
                className="group relative overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat p-8 text-white shadow-2xl md:p-12 lg:col-span-5"
                style={{ backgroundImage: `url(${contactLeft})` }}
              >
                <div className="relative z-10">
                  <div className="mb-8 flex flex-col">
                    <span className="font-display text-3xl font-bold leading-none tracking-tighter text-primary">
                      {t('contactUs.midEast')}
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.2em] text-slate-300">
                      {t('contactUs.equipmentSupply')}
                    </span>
                  </div>
                  <p className="mb-10 text-sm leading-relaxed text-slate-300">
                    {t('contactUs.subtitle')}
                  </p>
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <span className="material-icons">phone_in_talk</span>
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase text-primary">
                          {t('contactUs.needHelp')}
                        </p>
                        <p className="text-lg">860-222-3393</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="material-icons">location_on</span>
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase text-primary">
                          {t('contactUs.address')}
                        </p>
                        <p className="text-lg">50 East Dudley Town Road Bloomfield, CT 06002</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="material-icons">mail</span>
                      <div>
                        <p className="mb-1 text-xs font-bold uppercase text-primary">
                          {t('contactUs.email')}
                        </p>
                        <p className="text-lg">auctions@mideastequip.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-12 flex gap-4">
                    <a
                      className="group/icon flex h-10 w-10 items-center justify-center rounded-full bg-[#fbac43] transition-all duration-300 hover:bg-primary"
                      href="#"
                    >
                      <i className="fa-brands fa-facebook-f text-sm text-white"></i>
                    </a>
                    <a
                      className="group/icon flex h-10 w-10 items-center justify-center rounded-full bg-[#fbac43] transition-all duration-300 hover:bg-primary"
                      href="#"
                    >
                      <i className="fa-brands fa-x-twitter text-sm text-white"></i>
                    </a>
                    <a
                      className="group/icon flex h-10 w-10 items-center justify-center rounded-full bg-[#fbac43] transition-all duration-300 hover:bg-primary"
                      href="#"
                    >
                      <i className="fa-brands fa-linkedin-in"></i>
                    </a>
                    <a
                      className="group/icon flex h-10 w-10 items-center justify-center rounded-full bg-[#fbac43] transition-all duration-300 hover:bg-primary"
                      href="#"
                    >
                      <i className="fa-brands fa-behance"></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className="lg:col-span-6">
                <div className="mb-10">
                  <p className="text-sm uppercase tracking-[0.2em] text-[#FDAD3E]">
                    {t('contactUs.getBack')}
                  </p>
                  <h2 className="mb-4 font-display text-4xl font-black uppercase text-slate-800 dark:text-white md:text-5xl">
                    {t('contactUs.info')}
                  </h2>
                  <div className="relative mb-8 h-1 w-20 rounded-full bg-primary">
                    <div className="absolute -right-2 top-0 h-1 w-2 rounded-full bg-primary opacity-50"></div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <input
                        className="w-full rounded-lg border-gray-300 bg-white p-4 text-slate-800 shadow-sm transition-all focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-slate-800 dark:text-white"
                        placeholder="Your Name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className="w-full rounded-lg border-gray-300 bg-white p-4 text-slate-800 shadow-sm transition-all focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-slate-800 dark:text-white"
                        placeholder="Your Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      className="w-full rounded-lg border-gray-300 bg-white p-4 text-slate-800 shadow-sm transition-all focus:border-primary focus:ring-0 dark:border-gray-700 dark:bg-slate-800 dark:text-white"
                      placeholder="Message"
                      rows={6}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    className="group relative flex items-center gap-6 overflow-hidden rounded-full bg-primary px-6 py-4 font-bold uppercase text-white shadow-lg transition-all hover:bg-orange-600"
                    type="submit"
                  >
                    <span className="whitespace-nowrap tracking-widest">{t('common.submit')}</span>

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:rotate-45">
                      <span className="material-icons text-2xl text-primary">north_east</span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="h-[450px] w-full bg-slate-200">
          <div className="relative h-full w-full">
            <img
              alt="Map background"
              className="h-full w-full object-cover opacity-50 grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKD1F9ZjehKmOoIoYB8XvZoHnsWnFseaMTFJeNvRkfWdeZ01B4sZPXGYPneBXiZyovBDqLyY55u-UXdDwv5KMVSQ7NiP6hl9yhHcOo0x5qLGWbQchlG8iplFkyntVCau7CDNibopZubdX3zHTCRms5HtxYR78dwYprk452TDuVakoaouFuVMK7AD-rag7TV8SfWfwMrYJ5uQhIcdZCT3ICU17BdWJCWQlE_pjTZzI7nWI67rt28mzb-B37g_wLxVXveEjbKKIMnKUa"
            />
            <div className="absolute inset-0 bg-slate-900/10"></div>
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
              <div className="animate-bounce rounded-full bg-primary p-4 shadow-2xl">
                <span className="material-icons text-3xl text-white">location_on</span>
              </div>
              <div className="mt-4 max-w-xs rounded bg-white p-4 text-center shadow-xl dark:bg-slate-800">
                <p className="font-bold text-slate-800 dark:text-white">Bloomfield Headquarters</p>
                <p className="mt-1 text-xs text-slate-500">
                  50 East Dudley Town Road, Bloomfield, CT 06002
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default ContactUsPage;
