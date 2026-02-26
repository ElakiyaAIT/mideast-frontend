import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEquipmentDetail, useRelatedEquipment } from '../../hooks/queries/useEquipment';
import { InlineSpinner } from '../../components/Loader';
import { ROUTES } from '../../constants';
import defaultImage from '../../assets/images/Dump Truck.png';

// Import images
import buynowDetailsBanner from '../../assets/images/buynow details/buynow-details-banner.png';
import ProductCard from '../../components/Card/EquipmentCard';
import React from 'react';
import { useTranslation } from '../../i18n';
import BuyNowModal from '../../components/BuyNow/BuyNowModal';

const BuyNowDetailsPage = (): JSX.Element => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch equipment details
  const { data: equipment, isLoading, isError } = useEquipmentDetail(id || '');
  // console.log(response, '----------------------');
  const ITEMS_PER_PAGE = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const { data: relatedData } = useRelatedEquipment({
    id: id!,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  });

  const formatPrice = (price?: number): string => {
    if (!price) return 'Contact for price';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < (relatedData?.pagination.totalPages || 1)) setCurrentPage((prev) => prev + 1);
  };

  type Location = {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  const getGoogleMapsEmbedUrl = (location: Location): string => {
    const fullAddress = `${location.address}, ${location.city}, ${location.state} ${location.zipCode}, ${location.country}`;

    return `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
  };

  const loactionCheck = {
    location: {
      address: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'CA',
      zipCode: '94043',
      country: 'USA',
    },
  };

  if (isLoading) {
    return (
      <>
        <TopBanner />
        <Header />
        <div className="flex min-h-screen items-center justify-center">
          <InlineSpinner />
        </div>
        <Footer />
      </>
    );
  }

  if (isError || !equipment) {
    return (
      <>
        <TopBanner />
        <Header />
        <div className="flex min-h-screen flex-col items-center justify-center">
          <p className="mb-4 text-xl text-red-500">Failed to load equipment details.</p>
          <Link
            to={ROUTES.BUY}
            className="rounded-2xl bg-primary px-6 py-2 text-white transition-colors hover:bg-orange-600"
          >
            Back to Inventory
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = equipment.images || [];
  const selectedImage = images[selectedImageIndex] || defaultImage;

  const handleDownload = async () => {
    console.warn('Download document');
  };

  return (
    <>
      <TopBanner />
      <Header />

      {/* Banner Start */}
      <div className="br-30 relative flex h-64 items-center justify-center overflow-hidden bg-gray-800">
        <img
          alt="Construction background"
          className="absolute inset-0 h-full w-full object-cover"
          src={buynowDetailsBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold uppercase tracking-tight text-white">
            {equipment.title}
          </h1>
          <div className="mt-2 flex items-center justify-center gap-2 text-sm font-medium text-primary">
            <Link to={ROUTES.HOME} className="text-white transition-colors hover:text-primary">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="material-icons text-xs text-white">chevron_right</span>
            <Link to={ROUTES.BUY} className="text-white transition-colors hover:text-primary">
              {t('product.breadcrumb.inventory')}
            </Link>
            <span className="material-icons text-xs text-white">chevron_right</span>
            <span>{equipment.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="mb-1 text-3xl font-bold tracking-tight">{equipment.title}</h2>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="material-icons" style={{ color: '#F1A341' }}>
                access_time_filled
              </span>
              <span>ADDED: {formatDate(equipment.createdAt).toUpperCase()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FDAD3E] transition-all hover:bg-white hover:shadow dark:border-slate-700 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined text-[#FDAD3E] dark:text-slate-400">
                print
              </span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FDAD3E] transition-all hover:bg-white hover:shadow dark:border-slate-700 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined text-[#FDAD3E] dark:text-slate-400">
                bookmark
              </span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#FDAD3E] transition-all hover:bg-white hover:shadow dark:border-slate-700 dark:hover:bg-slate-800">
              <span className="material-symbols-outlined text-[#FDAD3E] dark:text-slate-400">
                share
              </span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {/* Main Image */}
          <div className="group relative aspect-[21/9] cursor-pointer overflow-hidden rounded-xl shadow-xl lg:col-span-4">
            <img
              src={selectedImage}
              alt={equipment.title}
              className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-equipment.jpg';
              }}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5 lg:col-span-4">
              {images.slice(0, 5).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-video cursor-pointer overflow-hidden rounded-3xl transition-all ${
                    selectedImageIndex === index ? 'ring-2 ring-primary' : 'hover:opacity-80'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${equipment.title} ${index + 1}`}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-equipment.jpg';
                    }}
                  />
                </div>
              ))}
              {images.length > 5 && (
                <div className="group relative aspect-video cursor-pointer overflow-hidden rounded-3xl">
                  <img
                    src={images[5]}
                    alt="More images"
                    className="h-full w-full scale-110 object-cover blur-[2px]"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white transition-all group-hover:bg-black/60">
                    <span className="text-2xl font-bold">+{images.length - 5}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      More Images
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
          <div className="space-y-12">
            {/* Product Description */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
              <h3 className="pl-4 text-xl font-bold tracking-wide">
                {t('product.details.description')}
              </h3>
              <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                <p>{equipment.description}</p>
              </div>
            </section>

            {/* Equipment Details */}
            <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
              <h3 className="pl-4 text-xl font-bold tracking-wide">
                {t('product.details.vehicleDetails')}
              </h3>

              <div className="grid grid-cols-1 gap-x-12 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    label: 'Make',
                    icon: 'precision_manufacturing',
                    value: equipment.make,
                  },
                  {
                    label: 'Model',
                    icon: 'model_training',
                    value: equipment.models,
                  },
                  {
                    label: 'Year',
                    icon: 'calendar_today',
                    value: equipment.year || '-',
                  },
                  {
                    label: 'Hours Used',
                    icon: 'schedule',
                    value: equipment.hoursUsed || '-',
                  },
                  {
                    label: 'Serial Number',
                    icon: 'tag',
                    value: equipment.serialNumber,
                  },
                  {
                    label: 'Condition',
                    icon: 'check_circle',
                    value: equipment.condition?.replace(/_/g, ' ') || '-',
                  },
                  {
                    label: 'Fuel Type',
                    icon: 'local_gas_station',
                    value: equipment.fuelType || 'petrol',
                  },
                  {
                    label: 'Transmission',
                    icon: 'settings',
                    value: equipment.transmission || '-',
                  },
                  {
                    label: 'Engine Power',
                    icon: 'speed',
                    value: equipment.enginePower || '-',
                  },
                ].map(({ label, icon, value }, index) => (
                  <React.Fragment key={label}>
                    {/* Item */}
                    <div className="flex items-center justify-between pb-0">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">{icon}</span>
                        <span className="text-xs text-slate-500">{label}</span>
                      </div>

                      <span
                        className="font-small max-w-[25%] truncate text-right text-sm capitalize text-slate-700 dark:text-slate-300"
                        title={String(value)}
                      >
                        {value ?? 'N/A'}
                      </span>
                    </div>

                    {/* Row Divider (after every 3 items on lg screens) */}
                    {(index + 1) % 3 === 0 && (
                      <div className="col-span-full mt-2 h-px bg-slate-100 dark:bg-slate-800" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </section>

            {/* Location */}
            <section className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[250px_1fr]">
              <h3 className="pl-4 text-xl font-bold tracking-wide">{t('auction.location')}</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  {/* Icon */}
                  <span className="material-symbols-outlined text-primary">pin_drop</span>

                  {/* Address */}
                  <p className="text-slate-600 dark:text-slate-400">
                    {equipment.location.address}, {equipment.location.city},{' '}
                    {equipment.location.state} {equipment.location.zipCode}
                  </p>
                </div>

                <div className="h-[250px] w-full overflow-hidden rounded-xl bg-slate-200 shadow-inner contrast-125 transition-all duration-700 hover:grayscale-0 dark:bg-slate-800">
                  <iframe
                    title="Equipment Location Map"
                    src={getGoogleMapsEmbedUrl(loactionCheck.location)}
                    className="h-full w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-6">
            <div className="max-w-[320px] space-y-4">
              {/* PRICE + BUY NOW */}
              <div className="space-y-3">
                {/* PRICE CARD */}
                <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow dark:border-slate-800 dark:bg-gray-900">
                  {/* PRICE BANNER */}
                  <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-4 text-white">
                    <div className="flex items-center justify-between">
                      {/* LEFT PRICE ORIGINAL PRICE  */}
                      <div className="flex flex-col">
                        <p className="text-right text-sm font-bold line-through opacity-80">
                          {formatPrice(equipment.buyNowPrice)}
                        </p>
                        <p className="text-xs opacity-90">{t('product.details.includedTaxes')}</p>
                      </div>

                      {/* VERTICAL DIVIDER */}
                      <div className="mx-4 h-10 w-px bg-white/60" />

                      {/* RIGHT PRICE */}
                      <p className="whitespace-nowrap text-xl font-bold leading-none">
                        {formatPrice(equipment.buyNowPrice)}
                      </p>
                    </div>
                  </div>

                  {/* HORIZONTAL WHITE DIVIDER */}
                  <div className="h-px bg-white/60" />

                  {/* SAVINGS */}
                  <div className="bg-slate-800 py-2 text-center text-xs text-white">
                    {t('product.details.instantSavings')}:{' '}
                    <span className="font-bold">$10,000</span>
                  </div>
                </div>

                {/* BUY NOW BUTTON */}
                <button
                  className="-mt-1 w-full rounded-full bg-orange-400 py-3 text-sm font-bold uppercase text-white shadow transition-colors hover:bg-orange-500"
                  onClick={() => setIsOpen(true)}
                >
                  {t('product.buyNow')}
                </button>
              </div>

              {/* DOCUMENTATION */}
              {/* DOCUMENTATION */}
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-gray-900">
                <h4 className="mb-2 text-sm font-bold">{t('product.details.documentation')}</h4>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-orange-500">
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>

                    <button
                      type="button"
                      onClick={() => handleDownload()}
                      className="font-medium hover:underline focus:outline-none"
                    >
                      {t('product.details.serviceHistory')}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-orange-500">
                    <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>

                    <button
                      type="button"
                      onClick={() => handleDownload()}
                      className="font-medium hover:underline focus:outline-none"
                    >
                      {t('product.details.specificationDocumentation')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* RELATED PRODUCTS */}
        <section className="mt-24">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h3 className="font-display text-4xl font-bold uppercase tracking-tight">
                {t('product.details.relatedProducts')}
              </h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="h-[2px] w-10 bg-primary"></span>
                <span className="h-2 w-2 rounded-full bg-primary"></span>
                <span className="h-[2px] w-10 bg-primary"></span>
              </div>
            </div>

            {relatedData?.pagination?.total && relatedData.pagination.total > ITEMS_PER_PAGE && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition-all hover:bg-primary hover:text-white disabled:opacity-40 disabled:hover:bg-white dark:border-slate-700 dark:bg-slate-800"
                >
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPage === (relatedData?.pagination.totalPages || 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-primary disabled:opacity-40"
                >
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            )}
          </div>

          {/* Carousel */}
          <div className="grid grid-cols-3 gap-6">
            {relatedData?.items.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </main>
      {isOpen && <BuyNowModal productName={equipment?.title} onClose={() => setIsOpen(false)} />}
      <Footer />
    </>
  );
};

export default BuyNowDetailsPage;
