import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useState } from 'react';
import React from 'react';

// Import images
import auctionBanner from '../../assets/images/auction-banner.png';
// import auction1 from '../../assets/images/dangvm_construction_equipment_bulldozers_-ar_32_-v_6.1_fc02ca1c-0341-4ac2-bbef-d00b37dfeab0_2.jpg.png';
// import auction12 from '../../assets/images/AUCT12.png';
// import auction13 from '../../assets/images/auct13.png';
// import auction14 from '../../assets/images/auct14.png';
// import auction15 from '../../assets/images/auct15.png';
// import auction16 from '../../assets/images/auct16.png';
// import auction17 from '../../assets/images/auct17.png';
import { useFilteredAuctions } from '../../hooks/queries/useAuction';
import { useTranslation } from '../../i18n';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import type { NewAuction } from '../../types/home';

type AuctionFilterState = {
  auctionName?: string;
  startDate?: string;
  location?: string;
  page: number;
  limit: number;
};

const AuctionPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>('upcoming');
  const [draftFilters, setDraftFilters] = useState<AuctionFilterState>({
    auctionName: '',
    startDate: '',
    location: '',
    page: 1,
    limit: 6,
  });

  const [appliedFilters, setAppliedFilters] = useState<AuctionFilterState>({
    auctionName: '',
    startDate: '',
    location: '',
    page: 1,
    limit: 6,
  });

  const formatLocation = (location?: {
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
  }) => {
    if (!location) return '—';

    const parts = [location.address, location.city, location.state, location.zipCode].filter(
      Boolean,
    );

    return parts.join(', ');
  };
  const cleanObject = (obj: Record<string, unknown>) =>
    Object.fromEntries(
      Object.entries(obj).filter(
        ([_, value]) => value !== '' && value !== undefined && value !== null,
      ),
    );
  const params = cleanObject({
    type: activeTab,
    ...appliedFilters,
  });

  const { data, isLoading } = useFilteredAuctions(params);
  if (!data?.pagination || !data?.items) {
    return <div className="text-slate-400">Loading results…</div>;
  }

  const { page, limit, total } = data.pagination;
  const count = data.items.length;
  const tabs = ['upcoming', 'past'];
  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, start + count - 1);
  const currentPage = page;
  const totalPages = data.pagination.totalPages;

  const filteredAuctions = data?.items.map((auction) => {
    const start = new Date(auction.startDate);

    return {
      _id: auction._id,
      title: auction.title,
      description: auction.description,
      mainImage: auction.images?.[0] ?? '/placeholder.jpg',
      thumbnails: auction.images?.slice(1, 3) ?? [],
      date: start.toLocaleDateString(),
      time: start.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: auction?.location,
      duration: auction?.duration,
      startingPrice: auction?.startingPrice,
      bids: auction?.bids,
      soldFor: auction?.soldFor,
      status: auction.status,
      startDate: auction.startDate,
      locationFormat: formatLocation(auction?.location),
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraftFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    setAppliedFilters({
      ...draftFilters,
      page: 1,
    });
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setDraftFilters({
      auctionName: '',
      startDate: '',
      location: '',
      page: 1,
      limit: 6,
    });
    setAppliedFilters({
      auctionName: '',
      startDate: '',
      location: '',
      page: 1,
      limit: 6,
    });
  };

  const handlePageChange = (newPage: number) => {
    setAppliedFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };
  if (isLoading) {
    <div>Loading....</div>;
  }

  const renderAuctionCard = (item: NewAuction, variant: 'upcoming' | 'past') => {
    return (
      <div
        key={item._id}
        className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
      >
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={item.mainImage}
            alt={item.title}
            className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Status Badge */}
          <div className="absolute right-3 top-3 rounded bg-slate-800/80 px-3 py-1 text-[10px] font-bold uppercase text-white">
            {variant === 'upcoming' ? t('auction.upcoming') : t('auction.past')}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3
            className="mb-2 truncate text-lg font-bold leading-tight dark:text-white"
            title={item.title}
          >
            {item.title}
          </h3>

          <p
            className="mb-6 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400"
            title={item.description}
          >
            {item.description}
          </p>

          {/* Shared Info */}
          <div className="mb-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <span className="material-icons text-base">calendar_today</span>
              {item.date}
            </div>

            {variant === 'upcoming' && (
              <div className="flex items-center gap-2">
                <span className="material-icons text-base">schedule</span>
                {item.time}
              </div>
            )}

            <div className="flex items-center gap-2">
              <span className="material-icons text-base">location_on</span>
              {item.locationFormat}
            </div>
          </div>

          {/* Variant Specific */}
          {variant === 'upcoming' ? (
            <div className="space-y-3">
              <button className="w-full rounded-2xl border border-primary/30 bg-primary/20 py-3 text-xs font-bold uppercase tracking-widest text-primary hover:bg-primary/30">
                {t('auction.proxibidBidding')}
              </button>
              <button className="w-full rounded-2xl bg-primary py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-orange-500">
                {t('auction.equipmentfactsBidding')}
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6 grid grid-cols-2 gap-y-3 text-xs">
                <div>
                  {t('auction.startingPrice')}:{' '}
                  <span className="font-bold">{item.startingPrice}</span>
                </div>
                <div>
                  {t('auction.bids')}: <span className="font-bold">{item.bids}</span>
                </div>
                <div className="col-span-2">
                  {t('auction.soldFor')}:{' '}
                  <span className="font-bold text-primary">{item.soldFor}</span>
                </div>
              </div>

              <button className="w-full rounded-2xl bg-primary/10 py-3 text-xs font-bold uppercase text-primary hover:bg-primary hover:text-white">
                {t('common.viewMore')}
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <TopBanner />
      <Header />
      {/* <link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Icons' /> */}
      {/* Banner */}
      <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-b-[30px] bg-gray-800">
        <img
          alt="Construction background"
          className="absolute inset-0 h-full w-full object-cover"
          src={auctionBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold uppercase tracking-tight text-white">
            {t('auction.title')}
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Link to={ROUTES.HOME} className="text-white transition-colors hover:text-primary">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="material-icons text-xs text-white">chevron_right</span>
            <span className="text-primary">Auction</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="relative z-20 mx-auto -mt-16 max-w-7xl px-4">
        <div className="rounded-lg bg-primary p-8 shadow-2xl">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="relative">
              <input
                className="w-full rounded border-none bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900"
                placeholder={t('auction.searchAuctions')}
                name="auctionName"
                value={draftFilters?.auctionName}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <input
                className="w-full rounded border-none bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900"
                placeholder="DD/MM/YYYY"
                name="startDate"
                type="date"
                value={draftFilters?.startDate}
                onChange={handleChange}
              />
              {/* <span className="material-icons absolute right-3 top-3 text-slate-400">
                calendar_today
              </span> */}
            </div>
            <div className="relative">
              <input
                className="w-full rounded border-none bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-slate-900"
                placeholder={t('auction.location')}
                name="location"
                value={draftFilters?.location}
                onChange={handleChange}
              />
            </div>
            <button
              onClick={handleSearch}
              className="rounded-3xl bg-slate-900 px-4 py-3 font-bold uppercase tracking-wider text-white transition-all hover:bg-slate-800"
            >
              {t('auction.search')}
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Toggle Section */}
      <section className="mx-auto mt-12 flex max-w-7xl flex-col items-center justify-between gap-6 px-4 md:flex-row">
        <div className="font-medium text-slate-500 dark:text-slate-400">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {t('buy.showing')} {start}-{end}{' '}
            {t('buy.resultsCount', {
              total: data?.pagination?.total || 0,
            })}
          </h2>
        </div>

        <div className="flex rounded-3xl bg-slate-200 p-1 dark:bg-slate-800">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => handleTabChange(tab)}
              className={`rounded-2xl px-8 py-2 text-xs font-bold uppercase transition-colors ${
                activeTab === tab
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {t(`auction.${tab}`)}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredAuctions?.map((item) =>
            renderAuctionCard(item, activeTab as 'upcoming' | 'past'),
          )}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4">
            {/* Showing Info */}
            <div className="text-sm text-slate-500">
              Showing {start} – {end} of {total} results
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center justify-center gap-3">
              {/* Previous */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white font-bold text-slate-600 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                ‹
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => handlePageChange(num)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-bold transition-all ${
                    num === currentPage
                      ? 'bg-primary text-white shadow-lg shadow-orange-500/30'
                      : 'border bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                  } `}
                >
                  {num}
                </button>
              ))}

              {/* Next */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white font-bold text-slate-600 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
};

export default AuctionPage;
