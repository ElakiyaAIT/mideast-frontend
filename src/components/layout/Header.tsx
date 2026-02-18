import { useState, type JSX } from 'react';
import type { NavItem } from '../../types/home';
import mideastLogo from '../../assets/images/mideastlogo.svg';
import { ROUTES } from '../../constants';
import { useLocation } from 'react-router-dom';
import { useTranslation } from '../../i18n';

export function Header(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const NAV_ITEMS: readonly NavItem[] = [
    { label: t('nav.home'), href: ROUTES.HOME },
    { label: t('nav.buyNow'), href: ROUTES.BUY },
    { label: t('nav.sell'), href: ROUTES.SELL },
    { label: t('nav.auction'), href: ROUTES.AUCTION },
    { label: t('nav.aboutUs'), href: ROUTES.ABOUT_US },
    { label: t('nav.contactUs'), href: ROUTES.CONTACT_US },
  ];

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  const isActive = (href: string): boolean => pathname === href;

  return (
    <header className='sticky top-0 z-50 border-b border-slate-100 bg-white dark:border-slate-800 dark:bg-gray-800'>
      <nav className='mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8'>
        <div className='flex flex-1 items-center gap-4 md:gap-8'>
          <div className='flex items-center gap-2'>
            <div className='leading-tight'>
              <img src={mideastLogo} alt='Mideast Equipment Logo' />
            </div>
          </div>
          <div className='hidden items-center gap-2 border-l border-slate-200 pl-8 dark:border-slate-700 lg:flex'>
            <i className='material-icons-outlined text-primary'>phone_in_talk</i>
            <div>
              <p className='text-[10px] font-medium text-slate-400'>{t('footer.needHelp')}</p>
              <p className='text-sm font-bold text-slate-700 dark:text-slate-200'>860-222-3393</p>
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          id='menuToggle'
          onClick={toggleMenu}
          className='order-3 p-2 text-slate-600 transition-colors hover:text-primary dark:text-slate-400 lg:hidden'
        >
          <i className='material-icons-outlined text-2xl'>menu</i>
        </button>

        {/* Desktop Navigation */}
        <div className='hidden items-center space-x-6 text-sm font-semibold text-slate-600 dark:text-slate-300 lg:flex'>
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <a
                key={item.label}
                className={`${active ? 'text-primary' : 'hover:text-primary'} transition-colors`}
                href={item.href}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Desktop Right Section */}
        <div className='hidden items-center gap-4 lg:flex'>
          <button className='p-2 text-slate-400 transition-colors hover:text-primary'>
            <i className='material-icons-outlined'>search</i>
          </button>
          <div className='flex items-center gap-2'>
            <a
              className='button rounded-3xl bg-primary px-5 py-2 text-sm font-bold uppercase text-white transition-colors hover:bg-orange-600'
              href={ROUTES.LOGIN}
            >
              {t('nav.login')}
            </a>
            <a
              className='rounded-3xl border-2 border-slate-200 px-5 py-2 text-sm font-bold uppercase transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800'
              href={ROUTES.REGISTER}
            >
              {t('nav.register')}
            </a>
          </div>
        </div>

        {/* Mobile Right Section */}
        <div className='order-2 flex items-center gap-2 lg:hidden'>
          <button className='p-2 text-slate-400 transition-colors hover:text-primary'>
            <i className='material-icons-outlined'>search</i>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id='mobileMenu'
        className={`${isOpen ? '' : 'hidden'} max-h-0 overflow-hidden border-t border-slate-100 bg-white transition-all duration-300 dark:border-slate-800 dark:bg-gray-800 lg:hidden`}
        style={isOpen ? { maxHeight: '500px' } : {}}
      >
        <div className='space-y-4 px-4 py-6'>
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.label}
              className={`block ${index === 0 ? 'text-primary' : 'text-slate-600 dark:text-slate-300'} text-sm font-semibold uppercase hover:text-${index === 0 ? 'orange-600' : 'primary'} transition-colors`}
              href={item.href}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <div className='flex gap-2 border-t border-slate-200 pt-4 dark:border-slate-700'>
            <a
              className='button flex-1 rounded-3xl bg-primary px-4 py-2 text-center text-xs font-bold uppercase text-white transition-colors hover:bg-orange-600'
              href={ROUTES.LOGIN}
            >
              {t('nav.login')}
            </a>
            <a
              className='flex-1 rounded-3xl border-2 border-slate-200 px-4 py-2 text-center text-xs font-bold uppercase text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
              href={ROUTES.REGISTER}
            >
              {t('nav.register')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
