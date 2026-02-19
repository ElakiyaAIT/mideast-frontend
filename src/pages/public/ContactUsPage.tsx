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
      <div className='relative bg-gray-800 h-64 flex items-center justify-center overflow-hidden rounded-b-[30px]'>
        <img
          alt='Construction background'
          className='absolute inset-0 w-full h-full object-cover'
          src={contactBanner}
        />
        <div className='relative z-10 text-center'>
          <h1 className='text-5xl font-bold text-white tracking-tight uppercase'>
            {t('contactUs.title')}
          </h1>
          <div className='mt-2 text-primary font-medium text-sm flex items-center justify-center gap-2'>
            <Link to={ROUTES.HOME} className='text-white hover:text-primary transition-colors'>
              {t('product.breadcrumb.home')}
            </Link>
            <span className='material-icons text-xs text-white'>chevron_right</span>
            <span className='text-primary'>{t('contactUs.breadCrumbs.contact')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-6 py-12'>
        <section className='py-20 px-4 md:px-8 bg-background-light dark:bg-background-dark'>
          <div className='container mx-auto'>
            <div className='grid lg:grid-cols-12 gap-12 items-start'>
              {/* Left Side - Contact Info */}
              <div
                className='lg:col-span-5 rounded-2xl p-8 md:p-12 text-white shadow-2xl overflow-hidden relative group bg-cover bg-no-repeat bg-center'
                style={{ backgroundImage: `url(${contactLeft})` }}
              >
                <div className='relative z-10'>
                  <div className='flex flex-col mb-8'>
                    <span className='font-display text-3xl font-bold tracking-tighter text-primary leading-none'>
                      {t('contactUs.midEast')}
                    </span>
                    <span className='text-[11px] tracking-[0.2em] font-bold text-slate-300'>
                      {t('contactUs.equipmentSupply')}
                    </span>
                  </div>
                  <p className='text-slate-300 leading-relaxed mb-10 text-sm'>
                    {t('contactUs.subtitle')}
                  </p>
                  <div className='space-y-8'>
                    <div className='flex gap-4'>
                      <span className='material-icons'>phone_in_talk</span>
                      <div>
                        <p className='text-xs uppercase text-primary font-bold mb-1'>
                          {t('contactUs.needHelp')}
                        </p>
                        <p className='text-lg'>860-222-3393</p>
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <span className='material-icons'>location_on</span>
                      <div>
                        <p className='text-xs uppercase text-primary font-bold mb-1'>
                          {t('contactUs.address')}
                        </p>
                        <p className='text-lg'>50 East Dudley Town Road Bloomfield, CT 06002</p>
                      </div>
                    </div>
                    <div className='flex gap-4'>
                      <span className='material-icons'>mail</span>
                      <div>
                        <p className='text-xs uppercase text-primary font-bold mb-1'>
                          {t('contactUs.email')}
                        </p>
                        <p className='text-lg '>auctions@mideastequip.com</p>
                      </div>
                    </div>
                  </div>
                  <div className='flex gap-4 mt-12'>
                    <a
                      className='w-10 h-10 rounded-full bg-[#fbac43] flex items-center justify-center hover:bg-primary transition-all duration-300 group/icon'
                      href='#'
                    >
                      <i className='fa-brands fa-facebook-f text-sm text-white'></i>
                    </a>
                    <a
                      className='w-10 h-10 rounded-full bg-[#fbac43] flex items-center justify-center hover:bg-primary transition-all duration-300 group/icon'
                      href='#'
                    >
                      <i className='fa-brands fa-x-twitter text-sm text-white'></i>
                    </a>
                    <a
                      className='w-10 h-10 rounded-full bg-[#fbac43] flex items-center justify-center hover:bg-primary transition-all duration-300 group/icon'
                      href='#'
                    >
                      <i className='fa-brands fa-linkedin-in'></i>
                    </a>
                    <a
                      className='w-10 h-10 rounded-full bg-[#fbac43] flex items-center justify-center hover:bg-primary transition-all duration-300 group/icon'
                      href='#'
                    >
                      <i className='fa-brands fa-behance'></i>
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div className='lg:col-span-6'>
                <div className='mb-10'>
                  <p className='text-[#FDAD3E] uppercase tracking-[0.2em] text-sm'>
                    {t('contactUs.getBack')}
                  </p>
                  <h2 className='font-display text-4xl md:text-5xl font-black text-slate-800 dark:text-white uppercase mb-4'>
                    {t('contactUs.info')}
                  </h2>
                  <div className='h-1 w-20 bg-primary rounded-full mb-8 relative'>
                    <div className='absolute -right-2 top-0 h-1 w-2 bg-primary rounded-full opacity-50'></div>
                  </div>
                </div>
                <form onSubmit={handleSubmit} className='space-y-6'>
                  <div className='grid md:grid-cols-2 gap-6'>
                    <div>
                      <input
                        className='w-full bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-0 rounded-lg p-4 text-slate-800 dark:text-white transition-all shadow-sm'
                        placeholder='Your Name'
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <input
                        className='w-full bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-0 rounded-lg p-4 text-slate-800 dark:text-white transition-all shadow-sm'
                        placeholder='Your Email'
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      className='w-full bg-white dark:bg-slate-800 border-gray-300 dark:border-gray-700 focus:border-primary focus:ring-0 rounded-lg p-4 text-slate-800 dark:text-white transition-all shadow-sm'
                      placeholder='Message'
                      rows={6}
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <button
                    className='group relative bg-primary hover:bg-orange-600 text-white font-bold uppercase py-4 px-6 rounded-full shadow-lg transition-all flex items-center gap-6 overflow-hidden'
                    type='submit'
                  >
                    <span className='tracking-widest whitespace-nowrap'>{t('common.submit')}</span>

                    <div className='bg-white w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45'>
                      <span className='material-icons text-primary text-2xl'>north_east</span>
                    </div>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className='h-[450px] w-full bg-slate-200'>
          <div className='w-full h-full relative'>
            <img
              alt='Map background'
              className='w-full h-full object-cover grayscale opacity-50'
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuDKD1F9ZjehKmOoIoYB8XvZoHnsWnFseaMTFJeNvRkfWdeZ01B4sZPXGYPneBXiZyovBDqLyY55u-UXdDwv5KMVSQ7NiP6hl9yhHcOo0x5qLGWbQchlG8iplFkyntVCau7CDNibopZubdX3zHTCRms5HtxYR78dwYprk452TDuVakoaouFuVMK7AD-rag7TV8SfWfwMrYJ5uQhIcdZCT3ICU17BdWJCWQlE_pjTZzI7nWI67rt28mzb-B37g_wLxVXveEjbKKIMnKUa'
            />
            <div className='absolute inset-0 bg-slate-900/10'></div>
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center'>
              <div className='bg-primary p-4 rounded-full shadow-2xl animate-bounce'>
                <span className='material-icons text-white text-3xl'>location_on</span>
              </div>
              <div className='mt-4 bg-white dark:bg-slate-800 p-4 rounded shadow-xl max-w-xs text-center'>
                <p className='font-bold text-slate-800 dark:text-white'>Bloomfield Headquarters</p>
                <p className='text-xs text-slate-500 mt-1'>
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
