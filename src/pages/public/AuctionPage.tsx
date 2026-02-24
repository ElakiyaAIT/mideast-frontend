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

// interface AuctionItem {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   time: string;
//   location: string;
//   mainImage: string;
//   thumbnails: string[];
//   status: 'upcoming' | 'past';
//   startingPrice?: string;
//   soldFor?: string;
//   duration?: string;
//   bids?: number;
// }

// const AUCTION_ITEMS: AuctionItem[] = [
//   {
//     id: 1,
//     title: 'John Deere 850K Crawler Dozer - Construction Ready',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and...',
//     date: 'January 12, 2026',
//     time: '10AM ET',
//     location: 'Various Locations Throughout the Northeast',
//     mainImage: auction1,
//     thumbnails: [auction12, auction13],
//     status: 'upcoming',
//   },
//   {
//     id: 2,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Excavators, Earthmoving, Construction Equipment, Heavy Duty, Site Prep and...',
//     date: 'January 13, 2026',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction14,
//     thumbnails: [auction15, auction16],
//     status: 'upcoming',
//   },
//   {
//     id: 3,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Excavators, Earthmoving, Construction Equipment, Heavy Duty, Site Prep and...',
//     date: 'January 13, 2026',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction17,
//     thumbnails: [auction16, auction15],
//     status: 'upcoming',
//   },
//   {
//     id: 4,
//     title: 'John Deere 850K Crawler Dozer - Construction Ready',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and...',
//     date: 'January 12, 2026',
//     time: '10AM ET',
//     location: 'Various Locations Throughout the Northeast',
//     mainImage: auction14,
//     thumbnails: [auction15, auction16],
//     status: 'upcoming',
//   },
//   {
//     id: 5,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Excavators, Earthmoving, Construction Equipment, Heavy Duty, Site Prep and...',
//     date: 'January 13, 2026',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction17,
//     thumbnails: [auction15, auction16],
//     status: 'upcoming',
//   },
//   {
//     id: 6,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Excavators, Earthmoving, Construction Equipment, Heavy Duty, Site Prep and...',
//     date: 'January 13, 2026',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction1,
//     thumbnails: [auction12, auction13],
//     status: 'upcoming',
//   },
//   // Past auctions
//   {
//     id: 7,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and....',
//     date: 'December 12, 2025',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction1,
//     thumbnails: [auction12, auction14],
//     status: 'past',
//     startingPrice: '$25.199',
//     soldFor: '$35.199',
//     duration: '3Days',
//     bids: 18,
//   },
//   {
//     id: 8,
//     title: 'John Deere 850K Crawler Dozer - Construction Ready',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and....',
//     date: 'December 12, 2025',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction17,
//     thumbnails: [auction15, auction1],
//     status: 'past',
//     startingPrice: '$25.199',
//     soldFor: '$35.199',
//     duration: '3Days',
//     bids: 18,
//   },
//   {
//     id: 9,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and....',
//     date: 'December 12, 2025',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction17,
//     thumbnails: [auction15, auction16],
//     status: 'past',
//     startingPrice: '$25.199',
//     soldFor: '$35.199',
//     duration: '3Days',
//     bids: 18,
//   },
//   {
//     id: 10,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and....',
//     date: 'December 12, 2025',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction16,
//     thumbnails: [auction15, auction17],
//     status: 'past',
//     startingPrice: '$25.199',
//     soldFor: '$35.199',
//     duration: '3Days',
//     bids: 18,
//   },
//   {
//     id: 11,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and....',
//     date: 'December 12, 2025',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction1,
//     thumbnails: [auction12, auction14],
//     status: 'past',
//     startingPrice: '$25.199',
//     soldFor: '$35.199',
//     duration: '3Days',
//     bids: 18,
//   },
//   {
//     id: 12,
//     title: 'Komatsu PC390LC Excavator Fleet - 3 Units Available',
//     description: 'Farm Tractors, Construction Equipment, Farm Equipment, Cars, Trucks, Lawn and....',
//     date: 'December 12, 2025',
//     time: '10AM ET',
//     location: 'Los Angeles, California',
//     mainImage: auction16,
//     thumbnails: [auction15, auction17],
//     status: 'past',
//     startingPrice: '$25.199',
//     soldFor: '$35.199',
//     duration: '3Days',
//     bids: 18,
//   },
// ];

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
      id: auction._id,
      title: auction.title,
      description: auction.description,
      mainImage: auction.images?.[0] ?? '/placeholder.jpg',
      thumbnails: auction.images?.slice(1, 3) ?? [],
      date: start.toLocaleDateString(),
      time: start.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      location: formatLocation(auction?.location),
      duration: auction?.duration,
      startingPrice: auction?.startingPrice,
      bids: auction?.bids,
      soldFor: auction?.soldFor,
      status: auction.status,
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
        {activeTab === 'upcoming' ? (
          /* Upcoming Auctions */
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAuctions?.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="relative">
                  <img alt={item.title} className="h-48 w-full object-cover" src={item.mainImage} />
                  <div className="absolute right-4 top-4 rounded-xl bg-slate-700/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-sm">
                    {t('auction.upcoming')}
                  </div>
                  {/* <div className="grid grid-cols-2 gap-1 p-1 bg-white dark:bg-slate-800">
                    {item.thumbnails.map((thumb, idx) => (
                      <img
                        key={idx}
                        alt={`Thumbnail ${idx + 1}`}
                        className="w-full h-20 object-cover"
                        src={thumb}
                      />
                    ))}
                  </div> */}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold leading-tight dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 cursor-help text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                  <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-icons text-base text-slate-900 dark:text-slate-100">
                        calendar_today
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-icons text-base text-slate-900 dark:text-slate-100">
                        schedule
                      </span>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-icons text-base text-slate-900 dark:text-slate-100">
                        location_on
                      </span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full rounded-2xl border border-primary/30 bg-primary/20 py-3 text-xs font-black uppercase tracking-widest text-primary transition-colors hover:bg-primary/30">
                      {t('auction.proxibidBidding')}
                    </button>
                    <button className="w-full rounded-2xl bg-primary py-3 text-xs font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20 transition-colors hover:bg-orange-500">
                      {t('auction.equipmentfactsBidding')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Past Auctions */
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredAuctions?.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-800"
              >
                <div className="relative overflow-hidden">
                  <div className="h-[240px] gap-1">
                    <div className="relative col-span-3 row-span-1 overflow-hidden">
                      <img
                        src={item.mainImage}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute right-3 top-3 rounded bg-slate-800/80 px-3 py-1 text-[10px] font-bold uppercase text-white">
                        {t('auction.past')}
                      </div>
                    </div>
                    {/* <div className="col-span-1 row-span-1 overflow-hidden">
                      <img
                        src={item.thumbnails[0]}
                        alt="Detail 1"
                        className="w-full h-full object-cover"
                      />
                    </div> */}
                    {/* <div className="col-span-2 row-span-1 overflow-hidden">
                      <img
                        src={item.thumbnails[1]}
                        alt="Detail 2"
                        className="w-full h-full object-cover"
                      />
                    </div> */}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold leading-tight transition-colors group-hover:text-primary">
                    {item?.title}
                  </h3>
                  <p className="mb-6 line-clamp-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item?.description}
                  </p>
                  <div className="mb-6 grid grid-cols-2 gap-y-3 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-sm text-slate-900 dark:text-slate-100">
                        calendar_today
                      </span>
                      {item.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-sm text-slate-900 dark:text-slate-100">
                        schedule
                      </span>
                      {t('auction.auctionDuration')}: {item?.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-sm text-slate-900 dark:text-slate-100">
                        sell
                      </span>
                      {t('auction.startingPrice')}:{' '}
                      <span className="font-bold">{item?.startingPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-sm text-slate-900 dark:text-slate-100">
                        gavel
                      </span>
                      {t('auction.bids')}: <span className="font-bold">{item?.bids}</span>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <span className="material-icons-outlined text-sm text-slate-900 dark:text-slate-100">
                        location_on
                      </span>
                      {item?.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-700">
                    <div>
                      <p className="text-[14px] font-bold uppercase text-slate-400">
                        {t('auction.soldFor')}
                      </p>
                      <p className="text-xl font-extrabold text-primary">{item?.soldFor}</p>
                    </div>
                    <button className="rounded-2xl bg-primary/10 px-6 py-2.5 text-sm font-bold uppercase text-primary transition-all hover:bg-primary hover:text-white">
                      {t('common.viewMore')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

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
