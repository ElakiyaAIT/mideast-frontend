import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useState } from 'react';

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

type AuctionFilterState={
  auctionName?:string;
  startDate?:string;
  location?:string;
  page:number;
  limit:number;
};

const AuctionPage = (): JSX.Element => {
  const {t}=useTranslation();
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

  const parts = [
    location.address,
    location.city,
    location.state,
    location.zipCode,
  ].filter(Boolean);

  return parts.join(', ');
};
const cleanObject = (obj: Record<string, any>) =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) =>
        value !== '' &&
        value !== undefined &&
        value !== null
    )
  );
  const params = cleanObject({
  type: activeTab,
  ...appliedFilters,
});


const { data, isLoading} = useFilteredAuctions(params);
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
    duration:auction?.duration,
    startingPrice:auction?.startingPrice,
    bids:auction?.bids,
    soldFor:auction?.soldFor,
    status: auction.status,
  };
});

const handleChange=(
  e:React.ChangeEvent<HTMLInputElement>,
)=>{
  const{name, value}=e.target;
 setDraftFilters(prev => ({
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
  setAppliedFilters(prev => ({
    ...prev,
    page: newPage,
  }));
};
if(isLoading){
  <div>Loading....</div>
}

console.log(data,'kertyuiop');
  return (
    <>
      <TopBanner />
      <Header />
 <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Icons"
      />
      {/* Banner */}
      <div className="relative bg-gray-800 h-64 flex items-center justify-center overflow-hidden rounded-b-[30px]">
        <img
          alt="Construction background"
          className="absolute inset-0 w-full h-full object-cover"
          src={auctionBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight uppercase">
            {t('auction.title')}
          </h1>
          <div className="mt-2 text-primary font-medium text-sm flex items-center justify-center gap-2">
            <span className="text-white">Home</span>
            <span className="material-icons text-xs text-white">
              chevron_right
            </span>
            <span className="text-white">Auction</span>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-primary p-8 rounded-lg shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <input
                className="w-full py-3 px-4 rounded border-none focus:ring-2 focus:ring-slate-900 bg-white text-sm"
                placeholder={t('auction.searchAuctions')}
                name="auctionName"
                value={draftFilters?.auctionName}
                onChange={handleChange}
              />
            </div>
            <div className="relative">
              <input
                className="w-full py-3 px-4 rounded border-none focus:ring-2 focus:ring-slate-900 bg-white text-sm"
                placeholder="DD/MM/YYYY"
                name='startDate'
                type='date'
                value={draftFilters?.startDate}
                onChange={handleChange}
              />
              {/* <span className="material-icons absolute right-3 top-3 text-slate-400">
                calendar_today
              </span> */}
            </div>
            <div className="relative">
              <input
                className="w-full py-3 px-4 rounded border-none focus:ring-2 focus:ring-slate-900 bg-white text-sm"
                placeholder={t('auction.location')}
                name="location"
                value={draftFilters?.location}
                onChange={handleChange}
              />
            </div>
            <button 
            onClick={handleSearch}
            className="bg-slate-900 text-white font-bold py-3 px-4 rounded-3xl hover:bg-slate-800 transition-all uppercase tracking-wider">
              {t('auction.search')}
            </button>
          </div>
        </div>
      </section>

      {/* Filter & Toggle Section */}
      <section className="max-w-7xl mx-auto px-4 mt-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 dark:text-slate-400 font-medium">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            {t('buy.showing')} {start}-{end} {t('buy.resultsCount', {
              total: data?.pagination?.total || 0,
            })}
            </h2>
        </div>
        

        <div className="bg-slate-200 dark:bg-slate-800 p-1 rounded-3xl flex">
          {tabs.map(tab => (
            <button
              key={tab}
              type="button"
              onClick={()=>handleTabChange(tab)}
              className={`px-8 py-2 rounded-2xl font-bold text-xs uppercase transition-colors ${activeTab === tab
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
      <main className="max-w-7xl mx-auto px-6 py-12">
        {activeTab === 'upcoming' ? (
          /* Upcoming Auctions */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAuctions?.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md group hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700"
              >
                <div className="relative">
                  <img
                    alt={item.title}
                    className="w-full h-48 object-cover"
                    src={item.mainImage}
                  />
                  <div className="absolute top-4 right-4 bg-slate-700/80 text-white text-[10px] font-bold px-3 py-1 rounded-xl uppercase tracking-wider backdrop-blur-sm">
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
                  <h3 className="text-xl font-bold mb-2 dark:text-white leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed  line-clamp-2 cursor-help">
                    {item.description}
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-icons text-slate-900 dark:text-slate-100 text-base">
                        calendar_today
                      </span>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-icons text-slate-900 dark:text-slate-100 text-base">
                        schedule
                      </span>
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <span className="material-icons text-slate-900 dark:text-slate-100 text-base">
                        location_on
                      </span>
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary font-black py-3 rounded-2xl transition-colors text-xs uppercase tracking-widest border border-primary/30">
                      {t('auction.proxibidBidding')}
                    </button>
                    <button className="w-full bg-primary text-white font-black py-3 rounded-2xl hover:bg-orange-500 transition-colors shadow-lg shadow-orange-500/20 text-xs uppercase tracking-widest">
                      {t('auction.equipmentfactsBidding')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Past Auctions */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAuctions?.map((item) => (
              <div
                key={item.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700"
              >
                <div className="relative overflow-hidden">
                  <div className=" h-[240px] gap-1">
                    <div className="col-span-3 row-span-1 overflow-hidden relative">
                      <img
                        src={item.mainImage}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-slate-800/80 text-white text-[10px] font-bold px-3 py-1 rounded uppercase">
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
                  <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors leading-tight">
                    {item?.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed line-clamp-2">
                    {item?.description}
                  </p>
                  <div className="grid grid-cols-2 gap-y-3 mb-6 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-slate-900 dark:text-slate-100 text-sm">
                        calendar_today
                      </span>
                      {item.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-slate-900 dark:text-slate-100 text-sm">
                        schedule
                      </span>
                      {t('auction.auctionDuration')}: {item?.duration}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-slate-900 dark:text-slate-100 text-sm">
                        sell
                      </span>
                      {t('auction.startingPrice')}:{' '}
                      <span className="font-bold">{item?.startingPrice}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-icons-outlined text-slate-900 dark:text-slate-100 text-sm">
                        gavel
                      </span>
                      {t('auction.bids')}: <span className="font-bold">{item?.bids}</span>
                    </div>
                    <div className="flex items-center gap-2 col-span-2">
                      <span className="material-icons-outlined text-slate-900 dark:text-slate-100 text-sm">
                        location_on
                      </span>
                      {item?.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                    <div>
                      <p className="text-[14px] uppercase font-bold text-slate-400">
                        {t('auction.soldFor')}
                      </p>
                      <p className="text-xl font-extrabold text-primary">
                        {item?.soldFor}
                      </p>
                    </div>
                    <button className="bg-primary/10 hover:bg-primary text-primary hover:text-white font-bold py-2.5 px-6 rounded-2xl transition-all text-sm uppercase">
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
    <div className="flex justify-center items-center gap-3">

      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-slate-600 dark:text-slate-300
                   hover:bg-slate-100 dark:hover:bg-slate-700
                   font-bold flex items-center justify-center border transition-all"
      >
        ‹
      </button>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
        <button
          key={num}
          onClick={() => handlePageChange(num)}
          className={`w-10 h-10 rounded-full font-bold flex items-center justify-center transition-all
            ${
              num === currentPage
                ? 'bg-primary text-white shadow-lg shadow-orange-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border'
            }
          `}
        >
          {num}
        </button>
      ))}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="w-10 h-10 rounded-full bg-white dark:bg-slate-800
                   disabled:opacity-50 disabled:cursor-not-allowed
                   text-slate-600 dark:text-slate-300
                   hover:bg-slate-100 dark:hover:bg-slate-700
                   font-bold flex items-center justify-center border transition-all"
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
