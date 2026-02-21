import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useState } from 'react';
import { useEquipmentList } from '../../hooks/queries/useEquipment';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { InlineSpinner } from '../../components/Loader';
import AccordionFilter, { type FilterOption } from '../../components/Filter/AccordionFilter';

// Import images
import buynowBanner from '../../assets/images/buynow-banner.png';
import defaultImage from '../../assets/images/Dump Truck.png';
import type { Equipment } from '../../api/equipmentApi';
import { useTranslation } from '../../i18n';

const BuyPage = (): JSX.Element => {
  const [page, setPage] = useState(1);
  const limit = 9;
  const [isAuctionDateOpen, setIsAuctionDateOpen] = useState(false);
  const [auctionDate, setAuctionDate] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [makes, setMakes] = useState<string[]>([]);
  const filtersPayload = {
    auctionDate, // string | null
    categories, // string[]
    makes, // string[]
    // later:
    // years,
    // states,
    // currentBid,
  };
  const { t } = useTranslation();
  const categoryOptions: FilterOption[] = [
    { id: 'articulated', label: 'Articulated Trucks', count: 2 },
    { id: 'belt', label: 'Belt Trailers', count: 1 },
    { id: 'drilling', label: 'Drilling Rigs', count: 3 },
    { id: 'dump', label: 'Dump Trucks', count: 6 },
    { id: 'excavators', label: 'Excavators', count: 2 },
  ];

  const radiusOptions: FilterOption[] = [
    { id: '50 miles', label: '50 miles' },
    { id: '100 miles', label: '100 miles' },
    { id: '250 miles', label: '250 miles' },
  ];
  // Fetch equipment with pagination
  const { data, isLoading, isError } = useEquipmentList({ page, limit });

  const equipment = data?.items || [];
  const totalPages = data?.pagination?.totalPages || 1;

  const getStatusBadge = (equipment: Equipment) => {
    if (equipment.status === 'SOLD') {
      return { label: t('product.status.sold'), className: 'bg-red-500' };
    }
    if (equipment.listingType === 'auction' || equipment.listingType === 'both') {
      return { label: t('product.status.forAuction'), className: 'bg-blue-500' };
    }
    return { label: t('product.status.newest'), className: 'bg-green-500' };
  };

  const formatPrice = (price?: number): string => {
    if (!price) return 'Contact for price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const appliedFiltersCount = Object.values(filtersPayload).reduce((count, value) => {
    if (Array.isArray(value)) return value.length > 0 ? count + value.length : count;
    return value ? count + 1 : count;
  }, 0);

  const handleApplyFilters = () => {
    //API call goes here
    // example:
    // fetchEquipment(filtersPayload)

    console.warn('Applying filters with payload:', filtersPayload);
  };
  const total = data?.pagination?.total || 0;
  const perPage = data?.pagination?.limit || 6;

  const start = total === 0 ? 0 : (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, total);

  return (
    <>
      <TopBanner />
      <Header />
      {/* Banner Section */}
      <div className='relative bg-gray-800 h-64 flex items-center justify-center overflow-hidden br-30'>
        <img
          alt='Construction background'
          className='absolute inset-0 w-full h-full object-cover'
          src={buynowBanner}
        />
        <div className='relative z-10 text-center'>
          <h1 className='text-5xl font-bold text-white tracking-tight uppercase'>
            {t('buy.inventory')}
          </h1>
          <div className='mt-2 text-primary font-medium text-sm flex items-center justify-center gap-2'>
            <Link to={ROUTES.HOME} className='text-white hover:text-primary transition-colors'>
              {t('product.breadcrumb.home')}
            </Link>
            <span className='material-icons text-xs text-gray-500'>chevron_right</span>
            <span>{t('product.breadcrumb.inventory')}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='mb-8 flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4'>
          <h2 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
            {t('buy.showing')} {start}-{end}{' '}
            {t('buy.resultsCount', {
              total: data?.pagination?.total || 0,
            })}
          </h2>

          <div className='flex gap-2'>
            <button className='flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white'>
              <span className='material-icons'>grid_view</span>
            </button>

            <button className='flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400'>
              <span className='material-icons'>view_list</span>
            </button>
          </div>
        </div>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Sidebar Filters */}
          <aside className='w-full lg:w-1/4 space-y-6'>
            <div className='bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-5 shadow-sm'>
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold'>{t('buy.filter')}</h2>
                <button className='text-primary text-sm font-medium hover:underline'>
                  {t('buy.reset')}
                </button>
              </div>
              <div className='bg-gray-100 dark:bg-gray-800 p-3 rounded-lg flex justify-between items-center mb-6'>
                <span className='text-xs font-bold uppercase tracking-wider opacity-60'>
                  {t('buy.activeResults')}
                </span>
                <span className='bg-primary text-white text-[10px] font-bold px-2 py-1 rounded'>
                  {data?.pagination?.total || 0} {t('buy.found')}
                </span>
              </div>
              {/* Filter sections - keeping existing structure */}
              {/* AUCTION DATE FILTER */}
              <div className='mb-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden'>
                <button
                  type='button'
                  onClick={() => setIsAuctionDateOpen((prev) => !prev)}
                  className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold transition
      ${
        isAuctionDateOpen
          ? 'bg-[#fdad3e] text-white'
          : 'bg-white dark:bg-gray-900 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
      }
    `}
                >
                  <div className='flex items-center gap-2'>
                    <i
                      className={`material-icons-outlined text-base transition
          ${isAuctionDateOpen ? 'text-white' : 'text-[#fdad3e]'}
        `}
                    >
                      calendar_month
                    </i>
                    <span
                      className={`transition ${
                        isAuctionDateOpen ? 'text-white' : 'text-black dark:text-white'
                      }`}
                    >
                      {t('buy.filters.auctionDate')}
                    </span>
                  </div>

                  <i
                    className={`material-icons-outlined transition
        ${isAuctionDateOpen ? 'text-white' : 'text-gray-400'}
      `}
                  >
                    {isAuctionDateOpen ? 'remove' : 'add'}
                  </i>
                </button>

                {isAuctionDateOpen && (
                  <div className='px-4 pb-2 bg-white dark:bg-gray-900  text-black dark:text-white'>
                    <input
                      type='date'
                      value={auctionDate || ''}
                      onChange={(e) => setAuctionDate(e.target.value)}
                      className='w-full px-3 py-2 text-sm rounded-xl
                   border border-gray-300 dark:border-gray-700
                   bg-white dark:bg-gray-900
                     text-black dark:text-white
                   focus:outline-none focus:ring-2 focus:ring-[#fdad3e]
                       dark:[color-scheme:dark]'
                    />

                    {auctionDate && (
                      <button
                        onClick={() => setAuctionDate(null)}
                        className='mt-3 text-xs text-black dark:text-white
                      font-medium hover:underline'
                      >
                        {t('buy.clearDate')}
                      </button>
                    )}
                  </div>
                )}
              </div>
              {/* Zip Radius*/}
              <AccordionFilter
                title={t('buy.filters.zip')}
                icon='location_on'
                headerColor='orange'
                options={radiusOptions}
                value={categories}
                onChange={setCategories}
                radio={true}
              />
              {/* {CATEGORY FILTER} */}
              <AccordionFilter
                title={t('buy.filters.category')}
                icon='category'
                headerColor='orange'
                options={categoryOptions}
                value={categories}
                onChange={setCategories}
              />
              {/* MAKE FILTER */}
              <AccordionFilter
                title={t('buy.filters.make')}
                icon='precision_manufacturing'
                options={categoryOptions}
                value={makes}
                onChange={setMakes}
              />
              {/* YEAR*/}
              <AccordionFilter
                title={t('buy.filters.year')}
                icon='calendar_month'
                options={categoryOptions}
                value={makes}
                onChange={setMakes}
              />
              {/* STATE/CITY*/}
              <AccordionFilter
                title={t('buy.filters.stateCity')}
                icon='map'
                options={categoryOptions}
                value={makes}
                onChange={setMakes}
              />
              {/* CURRENT BID */}
              <AccordionFilter
                title={t('buy.filters.currentBid')}
                icon='paid'
                options={categoryOptions}
                value={makes}
                onChange={setMakes}
              />
              <button
                type='button'
                onClick={handleApplyFilters}
                disabled={appliedFiltersCount === 0}
                className={`w-full mt-6 flex items-center justify-between px-4 py-3
    rounded-3xl font-semibold transition
    ${
      appliedFiltersCount === 0
        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
        : 'bg-primary text-white'
    }
  `}
              >
                <span>{t('buy.applyFilters')}</span>

                {appliedFiltersCount > 0 && (
                  <span className='ml-2 rounded bg-white/20 px-2 py-0.5 text-[10px] font-semibold text-white'>
                    {appliedFiltersCount} {t('buy.found')}
                  </span>
                )}
              </button>
            </div>
          </aside>

          {/* Products Grid */}
          <section className='flex-1'>
            {/* View Toggle and Sort */}

            {/* Loading State */}
            {isLoading && (
              <div className='flex justify-center items-center py-20'>
                <InlineSpinner />
              </div>
            )}

            {/* Error State */}
            {isError && (
              <div className='text-center py-20'>
                <p className='text-red-500'>{t('buy.error')}</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && !isError && equipment.length === 0 && (
              <div className='text-center py-20'>
                <p className='text-gray-500 dark:text-gray-400'>{t('buy.empty')}</p>
              </div>
            )}

            {/* Products Grid */}
            {!isLoading && !isError && equipment.length > 0 && (
              <>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
                  {equipment.map((item) => {
                    const badge = getStatusBadge(item);
                    const isSold = item.status === 'SOLD';
                    const primaryImage = item.images?.[0] || defaultImage;

                    return (
                      <div
                        key={item._id}
                        className='bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden group hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800'
                      >
                        <div className='relative overflow-hidden aspect-[16/9]'>
                          <div
                            className={`absolute top-4 left-4 ${badge.className} text-white text-[10px] font-bold px-3 py-1 uppercase rounded-full shadow-lg z-10`}
                          >
                            {badge.label}
                          </div>
                          <img
                            alt={item.title}
                            className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                            src={primaryImage}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-equipment.jpg';
                            }}
                          />
                        </div>
                        <div className={`p-3 ${isSold ? 'opacity-75' : ''}`}>
                          <h3 className='text-base font-bold mb-2 truncate'>{item.title}</h3>
                          <div className='grid grid-cols-3 gap-3 mb-4'>
                            <div>
                              <p
                                className={`text-sm font-bold ${isSold ? 'text-gray-400 line-through' : ''}`}
                              >
                                {item.make}
                              </p>
                              <p className='text-xs text-gray-400  font-medium'>
                                {t('product.specs.make')}
                              </p>
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold ${isSold ? 'text-gray-400 line-through' : ''}`}
                              >
                                {item.year}
                              </p>
                              <p className='text-xs text-gray-400 font-medium'>
                                {t('product.specs.year')}
                              </p>
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold ${isSold ? 'text-gray-400 line-through' : ''}`}
                              >
                                {item.hoursUsed || 'N/A'}
                              </p>
                              <p className='text-xs text-gray-400  font-medium'>
                                {t('product.specs.hours')}
                              </p>
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold ${isSold ? 'text-gray-400 line-through' : ''}`}
                              >
                                {item.models}
                              </p>
                              <p className='text-xs text-gray-400 font-medium'>
                                {t('product.specs.model')}
                              </p>
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold ${isSold ? 'text-gray-400 line-through' : ''}`}
                              >
                                {item.condition || 'N/A'}
                              </p>
                              <p className='text-xs text-gray-400 font-medium'>
                                {t('product.specs.condition')}
                              </p>
                            </div>
                            <div>
                              <p
                                className={`text-sm font-bold ${isSold ? 'text-gray-400 line-through' : ''}`}
                              >
                                {item.location.state}
                              </p>
                              <p className='text-xs text-gray-400 font-medium'>
                                {t('product.specs.location')}
                              </p>
                            </div>
                          </div>
                          <div className='flex justify-between items-end border-t border-gray-100 dark:border-gray-800 pt-3'>
                            <div>
                              <p className='text-xs text-gray-400 font-bold'>
                                {t('product.retailPrice')}
                              </p>
                              <p
                                className={`text-xl font-bold ${isSold ? 'text-gray-500' : 'text-primary'}`}
                              >
                                {formatPrice(item.buyNowPrice)}
                              </p>
                            </div>
                            {isSold ? (
                              <button className='bg-gray-400 text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase cursor-not-allowed'>
                                {t('product.status.sold')}
                              </button>
                            ) : (
                              <Link
                                to={`${ROUTES.BUY}/${item._id}`}
                                className='bg-primary text-white px-4 py-2 rounded-2xl text-xs font-bold uppercase transition-colors'
                              >
                                {t('product.viewMore')}
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className='flex justify-center items-center gap-2 mt-10'>
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className='p-1 rounded-full w-10 h-10 bg-[#f2f2f2] dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f2f2f2] dark:hover:bg-gray-800'
                    >
                      <span className='material-icons mt-0.5'>keyboard_double_arrow_left</span>
                    </button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-4 py-2 rounded-3xl font-medium ${
                            page === pageNum
                              ? 'bg-primary text-[white]'
                              : ' bg-[#f2f2f2] text-[#86919b] dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className='p-1 rounded-full w-10 h-10 bg-[#f2f2f2] dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#f2f2f2] dark:hover:bg-gray-800'
                    >
                      <span className='material-icons mt-0.5'>keyboard_double_arrow_right</span>
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default BuyPage;
