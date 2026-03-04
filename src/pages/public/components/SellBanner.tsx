import { Link } from 'react-router-dom';
import { useTranslation } from '../../../i18n';
import { ROUTES } from '../../../constants';
import sellBanner from '../../../assets/images/sell-banner.png';

export const SellBanner = () => {
  const { t } = useTranslation();

  return (
    <div className="br-30 relative flex h-64 items-center justify-center overflow-hidden bg-gray-800">
      <img
        alt="Construction background"
        className="absolute inset-0 h-full w-full object-cover"
        src={sellBanner}
      />
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold uppercase tracking-tight text-white">
          {t('sell.title')}
        </h1>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-primary">
          <Link to={ROUTES.HOME} className="text-white transition-colors hover:text-primary">
            {t('product.breadcrumb.home')}
          </Link>
          <span className="material-icons text-xs text-white">chevron_right</span>
          <span className="text-primary">{t('sell.breadCrumbs.sellInventory')}</span>
        </div>
      </div>
    </div>
  );
};
