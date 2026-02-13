import { TopBanner, Header, Footer } from '../../components/layout';
import type { JSX } from 'react';
import { useState, useEffect } from 'react';

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
import { useEquipmentCategories, useEquipmentList } from '../../hooks/queries/useEquipment';
import { ProductCard } from '../../components/Home/ProductCard';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import { useLatestAuction } from '../../hooks/queries/useAuction';
import { AuctionCard } from '../../components/Home/AuctionCard';
import { CategoryCard } from '../../components/Home/CategoryCard';
import { useTestimonials } from '../../hooks/queries/useTestimonial';
import { useTranslation } from '../../i18n';

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
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  
  const { data: equipmentData } = useEquipmentList({ page: 1, limit: 3 });
  const navigate = useNavigate();
  const { data: latestAuction } = useLatestAuction();
  const { data: categoryData } = useEquipmentCategories({
    isActive: true,
  });
  const{data:testimonialData}=useTestimonials();
  const equipment = equipmentData?.items || [];
  const TESTIMONIALS=testimonialData?.items||[];
  const totalSlides = TESTIMONIALS.length;
  const { t } = useTranslation();


  const getAvatar = (name:string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${name || "User"}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);

    return () => clearInterval(timer);
  }, [totalSlides]);

  const nextSlide = (): void => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = (): void => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

const formatText = (text = "") =>
  text
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ");


  return (
    <>
      <TopBanner />
      <Header />

      {/* Hero Section */}
      <section className="relative bg-banner dark:bg-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 z-10 space-y-6">
            <h1 className="text-4xl lg:text-6xl font-display font-bold text-slate-800 dark:text-white leading-[1.1]">
              {t('home.hero.title')}
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
             {t('home.hero.subtitle')}
            </p>
            <button onClick={() => navigate(ROUTES.BUY)}
              className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase rounded-full hover:bg-[#1e293b] shadow-xl shadow-primary/20 transition-all group">
              {t('home.hero.exploreEquipment')}
              <i className="material-icons-outlined bg-white text-primary rounded-full p-1 text-md group-hover:translate-x-1 transition-transform">
                arrow_forward
              </i>
            </button>
          </div>
          <div className="banner-transparent w-full lg:w-1/2 mt-12 lg:mt-0 relative">
            <img
              alt="Large yellow bulldozer"
              className="relative z-10 w-full transform lg:scale-110 slide-bottom"
              src={heavyMachinery}
            />
          </div>
        </div>
      </section>

      {/* Upcoming Auctions */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-12">
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white uppercase">
            {t('home.auctions.title')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4"></div>
        </div>
        {latestAuction && (
          <div className="max-w-6xl mx-auto px-4">
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
      <section className="py-20 equpment-bg">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="text-white/80 font-bold text-xs uppercase tracking-widest mb-2">
              {t('home.categories.reasons')}
            </p>
            <h2 className="text-4xl font-display font-bold text-white uppercase">
              {t('home.categories.title')}
            </h2>
            <div className="w-16 h-1 bg-white mx-auto mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryData?.items
              .slice(0, 6)
              .map(category => {
                const image =
                  CATEGORY_IMAGE_MAP[category.slug] ?? excavatorImg; // fallback

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
            <button className="px-10 py-4 bg-white text-primary font-bold uppercase rounded-full hover:bg-slate-50 transition-all group flex items-center gap-2 mx-auto">
              {t('home.categories.viewAllCategory')}
              <i className="material-icons-outlined text-md bg-primary text-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                arrow_forward
              </i>
            </button>
          </div>
        </div>
      </section>

      {/* Support Service */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 relative">
            <img alt="Construction worker support" src={supportImg} />
          </div>
          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-display font-extrabold text-slate-900 dark:text-white leading-tight uppercase">
              {t('home.support.subtitle')}
            </h2>
            <div className="w-16 h-1 bg-primary"></div>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              {t('home.support.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Latest Equipment */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center mb-16">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            {t('home.products.title')}
          </p>
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white uppercase">
            {t('home.products.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto my-4"></div>
          <p className="text-slate-500 max-w-2xl mx-auto">
           {t('home.products.description')}
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {equipment?.map((equipment) => (
            <ProductCard key={equipment._id} product={equipment} />
          ))}
        </div>
        <div className="mt-16 text-center">
          <button onClick={() => navigate(ROUTES.BUY)}
            className="flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold uppercase rounded-full hover:bg-[#1e293b] shadow-xl shadow-primary/20 transition-all group flex items-center gap-2 mx-auto">
            {t('home.products.viewEquipments')}
            <i className="material-icons-outlined bg-white text-primary rounded-full p-1 text-md group-hover:translate-x-1 transition-transform">
              arrow_forward
            </i>
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-services text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center mb-16">
            <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
              {t('home.services.title')}
            </p>
            <h2 className="text-4xl font-display font-bold text-white uppercase max-w-2xl mx-auto">
              {t('home.services.subtitle')}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto my-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
              <img src={buyIcon} alt="Buy" />
              <h3 className="text-gray-900 font-display font-bold text-xl uppercase">
                {t('home.services.buy.title')}
              </h3>
              <p className="text-slate-600 text-sm">
                {t('home.services.buy.subtitle')}
              </p>
              <button className="bg-slate-900 text-white text-xs font-bold px-6 py-2 rounded-3xl uppercase hover:bg-primary transition-colors">
                {t('home.services.buy.learnMore')}
              </button>
            </div>
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
              <img src={consignmentIcon} alt="Consignment" />
              <h3 className="text-gray-900 font-display font-bold text-xl uppercase">
                {t('home.services.consignment.title')}
              </h3>
              <p className="text-slate-600 text-sm">
              {t('home.services.consignment.subtitle')}
              </p>
              <button className="bg-slate-900 text-white text-xs font-bold px-6 py-2 rounded-3xl uppercase hover:bg-primary transition-colors">
                {t('home.services.consignment.learnMore')}
              </button>
            </div>
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
              <img src={auctionIcon} alt="Auction" />
              <h3 className="text-gray-900 font-display font-bold text-xl uppercase">
                {t('home.services.auctions.title')}
              </h3>
              <p className="text-slate-600 text-sm">
              {t('home.services.auctions.subtitle')}
              </p>
              <button className="bg-slate-900 text-white text-xs font-bold px-6 py-2 rounded-3xl uppercase hover:bg-primary transition-colors">
                {t('home.services.auctions.learnMore')}
              </button>
            </div>
            <div className="bg-white p-8 rounded-3xl flex flex-col items-center text-center space-y-4">
              <img src={locatorIcon} alt="EQ-Locators" />
              <h3 className="text-brand-dark font-display font-bold text-xl uppercase">
                {t('home.services.eqLocators.title')}
              </h3>
              <p className="text-slate-600 text-sm">
                {t('home.services.eqLocators.subtitle')}
              </p>
              <button className="bg-slate-900 text-white text-xs font-bold px-6 py-2 rounded-3xl uppercase hover:bg-primary transition-colors">
                {t('home.services.eqLocators.learnMore')}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-primary font-bold text-xs uppercase tracking-widest mb-2">
            {t('home.testimonials.title')}
          </p>
          <h2 className="text-4xl font-display font-bold text-gray-900 dark:text-white uppercase">
            {t('home.testimonials.subtitle')}
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto my-4"></div>

          <div className="mt-16 relative">
            <div id="testimonialCarousel" className="space-y-8 transition-all duration-500">
              {TESTIMONIALS.map((testimonial, index) => (
                <div
                  key={index}
                  className={`testimonial-slide ${index === currentSlide
                    ? 'opacity-100'
                    : 'opacity-0 hidden'
                    } transition-opacity duration-500`}
                >
                  <div className="w-full flex justify-center items-center">
                    <img src={quoteIcon} alt="Quote Icon" />
                  </div>
                  <p className="text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 italic leading-relaxed mt-6">
                    {testimonial?.review}
                  </p>
                  <div className="mt-12 relative flex flex-col items-center">

                    {/* Avatar */}
                    <div className="relative">
                      <img
                        alt={`${testimonial.name} Profile`}
                        className="w-16 h-16 rounded-full object-cover"
                        src={testimonial?.image || getAvatar(testimonial?.name)}
                      />

                      {/* Prev Button */}
                      <button
                        onClick={prevSlide}
                        className="absolute -left-28 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                      >
                        <i className="material-icons-outlined text-lg">arrow_back</i>
                        <span>{t('home.testimonials.prev')}</span>
                      </button>

                      {/* Next Button */}
                      <button
                        onClick={nextSlide}
                        className="absolute -right-28 top-1/2 -translate-y-1/2 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
                      >
                        <span>{t('home.testimonials.next')}</span>
                        <i className="material-icons-outlined text-lg">arrow_forward</i>
                      </button>
                    </div>

                    {/* Name */}
                    <p className="mt-4 font-semibold text-slate-800 dark:text-white">
                      {formatText(testimonial?.name)}
                    </p>

                    {/* Role */}
                    <p className="text-xs text-slate-400 uppercase tracking-widest">
                      {testimonial?.role}
                    </p>

                  </div>

                </div>
              ))}
            </div>

            {/* <div className="flex items-center justify-center gap-4 md:gap-6 mt-12 flex-wrap">
              <button
                id="prevBtn"
                onClick={prevSlide}
                className="p-2 text-slate-300 hover:text-primary transition-colors"
              >
                <i className="material-icons-outlined">chevron_left</i>
                <span className="hidden sm:inline ml-1">Prev</span>
              </button>
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, index) => (
                  <button
                    key={index}
                    className={`dot-indicator h-2 w-2 rounded-full transition-all ${index === currentSlide
                      ? 'bg-primary'
                      : 'bg-slate-300 dark:bg-slate-600'
                      }`}
                    onClick={() => goToSlide(index)}
                    data-slide={index}
                  ></button>
                ))}
              </div>
              <button
                id="nextBtn"
                onClick={nextSlide}
                className="p-2 text-slate-300 hover:text-primary transition-colors"
              >
                <span className="hidden sm:inline mr-1">Next</span>
                <i className="material-icons-outlined">chevron_right</i>
              </button>
            </div> */}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
