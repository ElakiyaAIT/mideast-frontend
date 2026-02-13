import type { JSX } from 'react';
import type { Auction } from '../../types/home';
import { useTranslation } from '../../i18n';

interface AuctionCardProps {
  readonly auction: Auction;
}

export function AuctionCard({ auction }: AuctionCardProps): JSX.Element {
  const images = auction.images.filter(Boolean);
  const { t } = useTranslation();


  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white shadow-2xl dark:bg-brand-dark md:flex-row">
      {/* Image Grid */}


      <div
        className={`md:w-1/2 overflow-hidden rounded-xl ${images?.length === 1
            ? 'aspect-[4/3]'
            : images?.length === 2
              ? 'flex aspect-[4/3]'
              : 'grid grid-cols-2 grid-rows-2 aspect-[4/3]'
          }`}
      >
        {images?.slice(0, 3).map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Auction equipment"
            className={`h-full w-full object-cover ${images?.length >= 3 && index === 0 ? 'col-span-2' : ''
              }`}
          />
        ))}
      </div>


      {/* Content */}
      <div className="space-y-6 p-10 md:w-1/2">
        <h3 className="font-display text-3xl font-bold uppercase">{auction?.title}</h3>

        <div className="space-y-3 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-primary">calendar_today</span>
            {auction?.date}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-primary">schedule</span>
            {auction?.time}
          </div>
          <div className="flex items-center gap-2">
            <span className="material-icons-outlined text-primary">location_on</span>
            {auction?.location?.state}
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button className="rounded-3xl bg-primary px-6 py-3 text-sm font-bold uppercase text-white">
            {t('home.auctions.proxibidBidding')}
          </button>
          <button className="rounded-3xl bg-primary px-6 py-3 text-sm font-bold uppercase text-white">
            {t('home.auctions.equipmentfactsBidding')}
          </button>
        </div>
      </div>
    </div>
  );
}
