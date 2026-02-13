import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useEquipmentDetail } from '../../hooks/queries/useEquipment';
import { InlineSpinner } from '../../components/Loader';
import { ROUTES } from '../../constants';

// Import images
import buynowDetailsBanner from '../../assets/images/buynow details/buynow-details-banner.png';
import ProductCard from '../../components/Card/EquipmentCard';
import { PRODUCTS } from '../../constants/DummyConstant';
import React from 'react';
import { useTranslation } from '../../i18n';

const BuyNowDetailsPage = (): JSX.Element => {
  const {t}=useTranslation();
  const { id } = useParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Fetch equipment details
  const { data: response, isLoading, isError } = useEquipmentDetail(id || '');
  console.log(response, '----------------------');
  const equipment = response;

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
  const ITEMS_PER_PAGE = 3;

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex + ITEMS_PER_PAGE < PRODUCTS.length) {
      setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (currentIndex - ITEMS_PER_PAGE >= 0) {
      setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
    }
  };

  const visibleProducts = PRODUCTS.slice(
    currentIndex,
    currentIndex + ITEMS_PER_PAGE
  );

  type Location = {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  const getGoogleMapsEmbedUrl = (location: Location): string => {
    const fullAddress = `${location.address}, ${location.city}, ${location.state} ${location.zipCode}, ${location.country}`;

    return `https://www.google.com/maps?q=${encodeURIComponent(
      fullAddress
    )}&output=embed`;
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
        <div className="flex justify-center items-center min-h-screen">
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
        <div className="flex flex-col justify-center items-center min-h-screen">
          <p className="text-red-500 text-xl mb-4">Failed to load equipment details.</p>
          <Link
            to={ROUTES.BUY}
            className="bg-primary text-white px-6 py-2 rounded-2xl hover:bg-orange-600 transition-colors"
          >
            Back to Inventory
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const images = equipment.images || [];
  const selectedImage = images[selectedImageIndex] || '/placeholder-equipment.jpg';


  const handleDownload = async () => {
    console.log('Download document');
  };


  return (
    <>
      <TopBanner />
      <Header />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />

      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      />


      {/* Banner Start */}
      <div className="relative bg-gray-800 h-64 flex items-center justify-center overflow-hidden br-30">
        <img
          alt="Construction background"
          className="absolute inset-0 w-full h-full object-cover"
          src={buynowDetailsBanner}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-5xl font-bold text-white tracking-tight uppercase">
            {equipment.title}
          </h1>
          <div className="mt-2 text-primary font-medium text-sm flex items-center justify-center gap-2">
            <Link to={ROUTES.HOME} className="text-white hover:text-primary transition-colors">
              {t('product.breadcrumb.home')}
            </Link>
            <span className="material-icons text-xs text-white">chevron_right</span>
            <Link to={ROUTES.BUY} className="text-white hover:text-primary transition-colors">
              {t('product.breadcrumb.inventory')}
            </Link>
            <span className="material-icons text-xs text-white">chevron_right</span>
            <span>{equipment.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1">{equipment.title}</h2>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <span className="material-icons" style={{ color: '#F1A341' }}>
                access_time_filled</span>
              <span>ADDED: {formatDate(equipment.createdAt).toUpperCase()}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 border border-[#FDAD3E] dark:border-slate-700 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 hover:shadow transition-all">
              <span className="material-symbols-outlined text-[#FDAD3E] dark:text-slate-400">
                print
              </span>
            </button>
            <button className="w-10 h-10 border border-[#FDAD3E] dark:border-slate-700 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 hover:shadow transition-all">
              <span className="material-symbols-outlined text-[#FDAD3E] dark:text-slate-400">
                bookmark
              </span>
            </button>
            <button className="w-10 h-10 border border-[#FDAD3E] dark:border-slate-700 rounded-full flex items-center justify-center hover:bg-white dark:hover:bg-slate-800 hover:shadow transition-all">
              <span className="material-symbols-outlined text-[#FDAD3E] dark:text-slate-400">
                share
              </span>
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-12">
          {/* Main Image */}
          <div className="lg:col-span-4 aspect-[21/9] rounded-xl overflow-hidden group cursor-pointer relative shadow-xl">
            <img
              src={selectedImage}
              alt={equipment.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/placeholder-equipment.jpg';
              }}
            />
          </div>

          {/* Thumbnails */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:col-span-4">
              {images.slice(0, 5).map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-video rounded-3xl overflow-hidden cursor-pointer transition-all ${selectedImageIndex === index
                    ? 'ring-2 ring-primary'
                    : 'hover:opacity-80'
                    }`}
                >
                  <img
                    src={image}
                    alt={`${equipment.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-equipment.jpg';
                    }}
                  />
                </div>
              ))}
              {images.length > 5 && (
                <div className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group">
                  <img
                    src={images[5]}
                    alt="More images"
                    className="w-full h-full object-cover blur-[2px] scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white group-hover:bg-black/60 transition-all">
                    <span className="text-2xl font-bold">+{images.length - 5}</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest">
                      More Images
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-[1fr_300px] gap-12">
          <div className="space-y-12">
            {/* Product Description */}
            <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">
              <h3 className="text-xl font-bold pl-4  tracking-wide">
                {t('product.details.description')}
              </h3>
              <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                <p>{equipment.description}</p>
              </div>
            </section>

            {/* Equipment Details */}
            {/* Equipment Details */}
            <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 mt-12">
              <h3 className="text-xl font-bold pl-4 tracking-wide">
                {t('product.details.vehicleDetails')}
              </h3>

              <div
                className="
    grid grid-cols-1 
    sm:grid-cols-2 
    lg:grid-cols-3
    gap-y-2 gap-x-12
  "
              >
                {[
                  {
                    label: "Make",
                    icon: "precision_manufacturing",
                    value: equipment.make,
                  },
                  {
                    label: "Model",
                    icon: "model_training",
                    value: equipment.models,
                  },
                  {
                    label: "Year",
                    icon: "calendar_today",
                    value: equipment.year || '-',
                  },
                  {
                    label: "Hours Used",
                    icon: "schedule",
                    value: equipment.hoursUsed || '-',
                  },
                  {
                    label: "Serial Number",
                    icon: "tag",
                    value: equipment.serialNumber,
                  },
                  {
                    label: "Condition",
                    icon: "check_circle",
                    value: equipment.condition?.replace(/_/g, " ") || '-',
                  },
                  {
                    label: "Fuel Type",
                    icon: "local_gas_station",
                    value: equipment.fuelType || 'petrol',
                  },
                  {
                    label: "Transmission",
                    icon: "settings",
                    value: equipment.transmission || '-',
                  },
                  {
                    label: "Engine Power",
                    icon: "speed",
                    value: equipment.enginePower || '-',
                  },
                ].map(({ label, icon, value }, index) => (
                  <React.Fragment key={label}>
                    {/* Item */}
                    <div className="flex items-center justify-between pb-0">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">
                          {icon}
                        </span>
                        <span className="text-xs text-slate-500">{label}</span>
                      </div>

                      <span
                        className="
            text-sm font-small capitalize
            max-w-[25%]
            text-right
            truncate
            text-slate-700 dark:text-slate-300
          "
                        title={String(value)}
                      >
                        {value ?? "N/A"}
                      </span>
                    </div>

                    {/* Row Divider (after every 3 items on lg screens) */}
                    {(index + 1) % 3 === 0 && (
                      <div
                        className="
            col-span-full
            mt-2
            h-px
            bg-slate-100 dark:bg-slate-800
          "
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

            </section>


            {/* Location */}
            <section className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6 mt-12">
              <h3 className="text-xl font-bold pl-4 tracking-wide">
                {t('auction.location')}
              </h3>
              <div className='space-y-4'>
                <div className="flex items-center gap-3 text-sm">
                  {/* Icon */}
                  <span className="material-symbols-outlined text-primary ">
                    pin_drop
                  </span>

                  {/* Address */}
                  <p className="text-slate-600 dark:text-slate-400">
                    {equipment.location.address}, {equipment.location.city}, {equipment.location.state}{' '}
                    {equipment.location.zipCode}
                  </p>
                </div>

                <div className="
                  h-[250px] w-full overflow-hidden rounded-xl
                  bg-slate-200 dark:bg-slate-800
                  shadow-inner contrast-125 
                  transition-all duration-700 hover:grayscale-0
                ">

                  <iframe
                    title="Equipment Location Map"
                    src={getGoogleMapsEmbedUrl(loactionCheck.location)}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </section>
          </div>


          {/* Sidebar */}
          <div className="lg:sticky lg:top-6">
            <div className="space-y-4 max-w-[320px]">

              {/* PRICE + BUY NOW */}
              <div className="space-y-3">

                {/* PRICE CARD */}
                <div className="overflow-hidden rounded-xl shadow border border-slate-200 dark:border-slate-800 bg-white dark:bg-gray-900">

                  {/* PRICE BANNER */}
                  <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 text-white px-5 py-4">
                    <div className="flex items-center justify-between">

                      {/* LEFT PRICE ORIGINAL PRICE  */}
                      <div className="flex flex-col">
                        <p className="text-sm font-bold line-through opacity-80 text-right">
                          {formatPrice(equipment.buyNowPrice)}
                        </p>
                        <p className="text-xs opacity-90">
                          {t('product.details.includedTaxes')}
                        </p>
                      </div>

                      {/* VERTICAL DIVIDER */}
                      <div className="mx-4 h-10 w-px bg-white/60" />

                      {/* RIGHT PRICE */}
                      <p className="text-xl font-bold leading-none whitespace-nowrap">
                        {formatPrice(equipment.buyNowPrice)}
                      </p>

                    </div>
                  </div>

                  {/* HORIZONTAL WHITE DIVIDER */}
                  <div className="h-px bg-white/60" />

                  {/* SAVINGS */}
                  <div className="bg-slate-800 text-white text-center text-xs py-2">
                    {t('product.details.instantSavings')}: <span className="font-bold">$10,000</span>
                  </div>

                </div>

                {/* BUY NOW BUTTON */}
                <button className="
        -mt-1
        w-full
        rounded-full
        bg-orange-400
        hover:bg-orange-500
        text-white
        py-3
        text-sm
        font-bold
        uppercase
        shadow
        transition-colors
      ">
                  {t('product.buyNow')}
                </button>

              </div>

              {/* DOCUMENTATION */}
              {/* DOCUMENTATION */}
              <div className="
                rounded-xl
                border border-slate-200 dark:border-slate-800
                bg-white dark:bg-gray-900
                px-4 py-3
              ">

                <h4 className="font-bold text-sm mb-2">
                  {t('product.details.documentation')}
                </h4>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-orange-500 text-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      picture_as_pdf
                    </span>

                    <button
                      type="button"
                      onClick={() => handleDownload()}
                      className="font-medium hover:underline focus:outline-none"
                    >
                      {t('product.details.serviceHistory')}
                    </button>
                  </div>


                  <div className="flex items-center gap-3 text-orange-500 text-sm">
                    <span className="material-symbols-outlined text-[18px]">
                      picture_as_pdf
                    </span>

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
                <span className='h-[2px] w-10 bg-primary'></span>
                <span className='h-2 w-2 rounded-full bg-primary'></span>
                <span className='h-[2px] w-10 bg-primary'></span>

              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white transition-all hover:bg-primary hover:text-white disabled:opacity-40 disabled:hover:bg-white dark:border-slate-700 dark:bg-slate-800"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex + ITEMS_PER_PAGE >= PRODUCTS.length}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white transition-all hover:bg-primary disabled:opacity-40"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="grid grid-cols-3 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
};

export default BuyNowDetailsPage;
