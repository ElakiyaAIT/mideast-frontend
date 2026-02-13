import type { JSX } from 'react';
import type { FooterLink } from '../../types/index';
import mideastLogo from '../../assets/images/mideast-logo.png';
import { useTranslation } from '../../i18n';

export function Footer(): JSX.Element {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const ABOUT_LINKS: readonly FooterLink[] = [
    { label: t('footer.links.buy'), href: '#' },
    { label: t('footer.links.sell'), href: '#' },
    { label: t('footer.links.aboutUs'), href: '#' },
    { label: t('footer.links.contactUs'), href: '#' },
  ];

  const NETWORK_LINKS: readonly FooterLink[] = [
    { label: t('footer.social.facebook'), href: '#' },
    { label: t('footer.social.behance'), href: '#' },
    { label: t('footer.social.linkedin'), href: '#' },
    { label: t('footer.social.twitter'), href: '#' },
  ];
  return (
    <footer className="border-t border-slate-800 bg-black pb-10 pt-20 text-white">
      {/* Top */}
      <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        {/* Logo & Description */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <img src={mideastLogo} alt="Mideast Equipment Logo" />
          </div>
          <p className="text-sm leading-relaxed text-slate-400">{t('footer.mission')}</p>
        </div>

        {/* About Company */}
        <div>
          <h4 className="mb-6 border-l-4 border-primary pl-3 font-display text-lg font-bold uppercase">
            {t('footer.aboutCompany')}
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {ABOUT_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Network */}
        <div>
          <h4 className="mb-6 border-l-4 border-primary pl-3 font-display text-lg font-bold uppercase">
            {t('footer.ourNetwork')}
          </h4>
          <ul className="space-y-3 text-sm text-slate-400">
            {NETWORK_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="mb-6 border-l-4 border-primary pl-3 font-display text-lg font-bold uppercase">
            {t('footer.contactInfo')}
          </h4>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs text-slate-400">{t('footer.needHelp')}</p>
              <p className="text-lg font-bold text-primary">860-222-3393</p>
            </div>
            <p className="text-slate-400">50 East Dudley Town Road Bloomfield, CT 06002</p>
            <p className="text-slate-400">auctions@mideastequip.com</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto max-w-7xl border-t border-slate-800 px-4 pt-10 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex gap-6 text-xs font-semibold text-slate-500">
            <a href="#" className="transition-colors hover:text-white">
              {t('footer.termsOfUse')}
            </a>
            <a href="#" className="transition-colors hover:text-white">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="transition-colors hover:text-white">
              {t('footer.links.contactUs')}
            </a>
          </div>

          <p className="text-center text-xs text-slate-500 md:text-right">
            {t('footer.copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  );
}
