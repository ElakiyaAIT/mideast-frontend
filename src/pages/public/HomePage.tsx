import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
// Import images
import heavyMachinery from '../../assets/images/heavy-machinery-used-construction-industry-engineering 3.png';
import auction1 from '../../assets/images/dangvm_construction_equipment_bulldozers_-ar_32_-v_6.1_fc02ca1c-0341-4ac2-bbef-d00b37dfeab0_2.jpg.png';
import auction2 from '../../assets/images/dangvm_construction_equipment_-ar_32_-v_6.1_e1b8e2d9-7037-4e97-8068-86a46dd229ca_1.jpg.png';
import auction3 from '../../assets/images/dangvm_construction_equipment_bulldozers_-ar_32_-v_6.1_fb11d441-0a7f-431d-8d55-db7c7e8c46d6_2.jpg.png';
import rollersImg from '../../assets/images/Rollers.png';
import wheelLoadersImg from '../../assets/images/Wheel Loaders.png';
import excavatorImg from '../../assets/images/Excavator.png';
import bulldozersImg from '../../assets/images/Bulldozers.png';
import dumpTruckImg from '../../assets/images/Dump Truck.png';
import cranesImg from '../../assets/images/caspar-rae-ti4MG1kbpUk-unsplash-768x512.jpg.png';
import supportImg from '../../assets/images/26gcase.png';
import buyIcon from '../../assets/images/buy.svg';
import consignmentIcon from '../../assets/images/cargo-consignment.svg';
import auctionIcon from '../../assets/images/auction.svg';
import locatorIcon from '../../assets/images/locator 1.svg';
import quoteIcon from '../../assets/images/quoat.svg';
import { useEquipmentCategories, useLatestEquipment } from '../../hooks/queries/useEquipment';
import { ProductCard } from '../../components/Home/ProductCard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useLatestAuction } from '../../hooks/queries/useAuction';
import { AuctionCard } from '../../components/Home/AuctionCard';
import { CategoryCard } from '../../components/Home/CategoryCard';
import { useTestimonials } from '../../hooks/queries/useTestimonial';
import { useTranslation } from '../../i18n';
import TestimonialCarousel from '../../components/Home/TestimonialCarousel';

// const TESTIMONIALS = [
//   {
//     quote:
//       'We strive for a complete life-cycle approach in all we do to improve the use of the planet\'s resources. Together with our suppliers and other partners, we are accelerating a step change toward circularity, rethinking existing production and consumption patterns.',
//     name: 'Adam Hoffman',
//     role: 'CEO OF CONSTRUCTION',
//     image:
//       'https://lh3.googleusercontent.com/aida-public/AB6AXuCooN_bIrVG49K7h-6o1WsGmYsaGDYgQTak3PZEyGgzBqC-hKQJtCKilb6NN1bUYH21CldeleLpQVwOYK8KD1MeRzc7RpFgpKMTpVnfCh16Vzg9Bi7ahiOF7x7aHrpolCdDjS56QhPZmK7NVPcM-riuCHT-loBUkWxkBESedahlXqsUHxUtekIooHjsc5Rvhb6zQQ1zzDpxOvt6M73hCt7r4lhVEJ1jOkigy3WigfJ1q5Fd9n-73k2Kcn0oerYSYxLFHzUedEpXxvnm',
//   },
//   {
//     quote:
//       'Mideast Equipment has been instrumental in helping us scale our operations. Their professionalism and extensive network made finding the right equipment seamless. Highly recommended for any construction company looking to grow.',
//     name: 'Sarah Johnson',
//     role: 'PROJECT MANAGER',
//     image:
//       'https://lh3.googleusercontent.com/aida-public/AB6AXuCooN_bIrVG49K7h-6o1WsGmYsaGDYgQTak3PZEyGgzBqC-hKQJtCKilb6NN1bUYH21CldeleLpQVwOYK8KD1MeRzc7RpFgpKMTpVnfCh16Vzg9Bi7ahiOF7x7aHrpolCdDjS56QhPZmK7NVPcM-riuCHT-loBUkWxkBESedahlXqsUHxUtekIooHjsc5Rvhb6zQQ1zzDpxOvt6M73hCt7r4lhVEJ1jOkigy3WigfJ1q5Fd9n-73k2Kcn0oerYSYxLFHzUedEpXxvnm',
//   },
//   {
//     quote:
//       'Best equipment supplier in the northeast. Their team is knowledgeable, responsive, and committed to customer satisfaction. We\'ve purchased multiple pieces of equipment from them and never had an issue.',
//     name: 'Mike Rodriguez',
//     role: 'CONSTRUCTION COMPANY OWNER',
//     image:
//       'https://lh3.googleusercontent.com/aida-public/AB6AXuCooN_bIrVG49K7h-6o1WsGmYsaGDYgQTak3PZEyGgzBqC-hKQJtCKilb6NN1bUYH21CldeleLpQVwOYK8KD1MeRzc7RpFgpKMTpVnfCh16Vzg9Bi7ahiOF7x7aHrpolCdDjS56QhPZmK7NVPcM-riuCHT-loBUkWxkBESedahlXqsUHxUtekIooHjsc5Rvhb6zQQ1zzDpxOvt6M73hCt7r4lhVEJ1jOkigy3WigfJ1q5Fd9n-73k2Kcn0oerYSYxLFHzUedEpXxvnm',
//   },
// ];
const CATEGORY_IMAGE_MAP: Record<string, string> = {
  rollers: rollersImg,
  'wheel-loaders': wheelLoadersImg,
  excavator: excavatorImg,
  bulldozers: bulldozersImg,
  'dump-truck': dumpTruckImg,
  cranes: cranesImg,
};
const HomePage = (): JSX.Element => {
  const { data: equipmentData } = useLatestEquipment();
  const navigate = useNavigate();
  const { data: latestAuction } = useLatestAuction();
  const { data: categoryData } = useEquipmentCategories({
    isActive: true,
  });
  const { data: testimonialData } = useTestimonials();
  const equipment = equipmentData || [];
  const TESTIMONIALS = testimonialData?.items || [];
  const { t } = useTranslation();

  const getAvatar = (name: string) =>
    `https://api.dicebear.com/7.x/initials/svg?seed=${name || 'User'}`;

  const formatText = (text = '') =>
    text
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

  return (
    <>
      <TopBanner />
      <Header />

      {/* Hero Section */}
      <section className="bg-banner relative overflow-hidden dark:bg-slate-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 md:px-8 lg:flex-row">
          <div className="z-10 w-full space-y-6 lg:w-1/2">
            <h1 className="font-display text-4xl font-bold leading-[1.1] text-slate-800 dark:text-white lg:text-6xl">
              {t('home.hero.title')}
            </h1>
            <p className="max-w-xl text-lg text-slate-600 dark:text-slate-400">
              {t('home.hero.subtitle')}
            </p>
            <button
              onClick={() => navigate(ROUTES.BUY)}
              className="group flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold uppercase text-white shadow-xl shadow-primary/20 transition-all hover:bg-[#1e293b]"
            >
              {t('home.hero.exploreEquipment')}
              <i className="material-icons-outlined text-md rounded-full bg-white p-1 text-primary transition-transform group-hover:translate-x-1">
                arrow_forward
              </i>
            </button>
          </div>
          <div className="banner-transparent relative mt-12 w-full lg:mt-0 lg:w-1/2">
            <img
              alt="Large yellow bulldozer"
              className="slide-bottom relative z-10 w-full transform lg:scale-110"
              src={heavyMachinery}
            />
          </div>
        </div>
      </section>

      {/* Upcoming Auctions */}
      <section className="bg-white py-20 dark:bg-gray-900">
        <div className="mx-auto mb-12 max-w-7xl px-4 text-center md:px-8">
          <h2 className="font-display text-4xl font-bold uppercase text-gray-900 dark:text-white">
            {t('home.auctions.title')}
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 bg-primary"></div>
        </div>
        {latestAuction && (
          <div className="mx-auto max-w-6xl px-4">
            <AuctionCard
              auction={{
                ...latestAuction,
                date: new Date(latestAuction.startDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                time: new Date(latestAuction.startDate).toLocaleTimeString('en-US', {
                  hour: 'numeric',
                  minute: '2-digit',
                }),
                location: latestAuction.location ?? 'Online Auction',
                images: [
                  latestAuction.images[0] ?? auction1,
                  latestAuction.images[1] ?? auction2,
                  latestAuction.images[2] ?? auction3,
                ],
              }}
            />
          </div>
        )}
      </section>

      {/* Browse Equipment Categories */}
      {/* Integrated equpipment categories, need image to get and set  */}
      <section className="equpment-bg py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/80">
              {t('home.categories.reasons')}
            </p>
            <h2 className="font-display text-4xl font-bold uppercase text-white">
              {t('home.categories.title')}
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 bg-white"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {categoryData?.items.slice(0, 6).map((category) => {
              const image = CATEGORY_IMAGE_MAP[category.slug] ?? excavatorImg; // fallback

              return (
                <CategoryCard
                  key={category._id}
                  category={{
                    id: category._id,
                    title: category.name,
                    image: category.imageUrl || image,
                  }}
                />
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <button className="group mx-auto flex items-center gap-2 rounded-full bg-white px-10 py-4 font-bold uppercase text-primary transition-all hover:bg-slate-50">
              {t('home.categories.viewAllCategory')}
              <i className="material-icons-outlined text-md rounded-full bg-primary p-1 text-white transition-transform group-hover:translate-x-1">
                arrow_forward
              </i>
            </button>
          </div>
        </div>
      </section>

      {/* Support Service */}
      <section className="bg-white py-24 dark:bg-gray-900">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-4 md:px-8 lg:flex-row">
          <div className="relative w-full lg:w-1/2">
            <img alt="Construction worker support" src={supportImg} />
          </div>
          <div className="w-full space-y-8 lg:w-1/2">
            <h2 className="font-display text-4xl font-extrabold uppercase leading-tight text-slate-900 dark:text-white">
              {t('home.support.subtitle')}
            </h2>
            <div className="h-1 w-16 bg-primary"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {t('home.support.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Latest Equipment */}
      <section className="bg-slate-50 py-20 dark:bg-slate-900/50">
        <div className="mx-auto mb-16 max-w-7xl px-4 text-center md:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
            {t('home.products.title')}
          </p>
          <h2 className="font-display text-4xl font-bold uppercase text-gray-900 dark:text-white">
            {t('home.products.subtitle')}
          </h2>
          <div className="mx-auto my-4 h-1 w-16 bg-primary"></div>
          <p className="mx-auto max-w-2xl text-slate-500">{t('home.products.description')}</p>
        </div>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {equipment?.map((equipment) => (
            <ProductCard key={equipment._id} product={equipment} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate(ROUTES.BUY)}
            className="group mx-auto flex items-center gap-2 rounded-full bg-primary px-8 py-4 font-bold uppercase text-white shadow-xl shadow-primary/20 transition-all hover:bg-[#1e293b]"
          >
            {t('home.products.viewEquipments')}
            <i className="material-icons-outlined text-md rounded-full bg-white p-1 text-primary transition-transform group-hover:translate-x-1">
              arrow_forward
            </i>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-services relative overflow-hidden py-24 text-white">
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
              {t('home.services.title')}
            </p>
            <h2 className="mx-auto max-w-2xl font-display text-4xl font-bold uppercase text-white">
              {t('home.services.subtitle')}
            </h2>
            <div className="mx-auto my-4 h-1 w-16 bg-primary"></div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-4 rounded-3xl bg-white p-8 text-center">
              <img src={buyIcon} alt="Buy" />
              <h3 className="font-display text-xl font-bold uppercase text-gray-900">
                {t('home.services.buy.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('home.services.buy.subtitle')}</p>
              <button className="rounded-3xl bg-slate-900 px-6 py-2 text-xs font-bold uppercase text-white transition-colors hover:bg-primary">
                {t('home.services.buy.learnMore')}
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-3xl bg-white p-8 text-center">
              <img src={consignmentIcon} alt="Consignment" />
              <h3 className="font-display text-xl font-bold uppercase text-gray-900">
                {t('home.services.consignment.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('home.services.consignment.subtitle')}</p>
              <button className="rounded-3xl bg-slate-900 px-6 py-2 text-xs font-bold uppercase text-white transition-colors hover:bg-primary">
                {t('home.services.consignment.learnMore')}
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-3xl bg-white p-8 text-center">
              <img src={auctionIcon} alt="Auction" />
              <h3 className="font-display text-xl font-bold uppercase text-gray-900">
                {t('home.services.auctions.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('home.services.auctions.subtitle')}</p>
              <button className="rounded-3xl bg-slate-900 px-6 py-2 text-xs font-bold uppercase text-white transition-colors hover:bg-primary">
                {t('home.services.auctions.learnMore')}
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-3xl bg-white p-8 text-center">
              <img src={locatorIcon} alt="EQ-Locators" />
              <h3 className="font-display text-xl font-bold uppercase text-brand-dark">
                {t('home.services.eqLocators.title')}
              </h3>
              <p className="text-sm text-slate-600">{t('home.services.eqLocators.subtitle')}</p>
              <button className="rounded-3xl bg-slate-900 px-6 py-2 text-xs font-bold uppercase text-white transition-colors hover:bg-primary">
                {t('home.services.eqLocators.learnMore')}
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonials Section */}

      <TestimonialCarousel
        testimonials={TESTIMONIALS}
        quoteIcon={quoteIcon}
        getAvatar={getAvatar}
        formatText={formatText}
      />

      <Footer />
    </>
  );
};

export default HomePage;
