import type { JSX } from 'react';
import { useTranslation } from '../../i18n';

export function TopBanner(): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap items-center justify-between bg-slate-900 px-4 py-2 text-xs text-white md:px-12">
      <div className="flex space-x-6">
        <span className="flex items-center gap-1">
          <i className="material-icons-outlined text-sm">location_on</i> {t('topBanner.address')}
        </span>
        <span className="flex items-center gap-1">
          <i className="material-icons-outlined text-sm">email</i>
          {t('topBanner.email')}
        </span>
        <span className="hidden items-center gap-1 md:flex">
          <i className="material-icons-outlined text-sm">schedule</i> {t('topBanner.hours')}
        </span>
      </div>
      <div className="flex space-x-4">
        <a className="transition-colors hover:text-primary" href="#">
          {t('footer.abbreviations.fb')}
        </a>
        <a className="transition-colors hover:text-primary" href="#">
          {t('footer.abbreviations.be')}
        </a>
        <a className="transition-colors hover:text-primary" href="#">
          {t('footer.abbreviations.ln')}
        </a>
        <a className="transition-colors hover:text-primary" href="#">
          {t('footer.abbreviations.tw')}
        </a>
      </div>
    </div>
  );
}
