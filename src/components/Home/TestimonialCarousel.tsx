import { useState } from 'react';
import { useTranslation } from '../../i18n';


interface Testimonial {
  review: string;
  name: string;
  role: string;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  quoteIcon: string;
  getAvatar: (name: string) => string;
  formatText: (text: string) => string;
}

const TestimonialCarousel = ({
  testimonials,
  quoteIcon,
  getAvatar,
  formatText,
}: TestimonialCarouselProps) => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className='py-18 bg-white dark:bg-gray-900 overflow-hidden'>
      <div className='max-w-4xl mx-auto px-4 text-center'>
        <p className='text-primary font-bold text-xs uppercase tracking-widest mb-2'>
          {t('home.testimonials.title')}
        </p>
        <h2 className='text-4xl font-display font-bold text-gray-900 dark:text-white uppercase'>
          {t('home.testimonials.subtitle')}
        </h2>
        <div className='w-16 h-1 bg-primary mx-auto my-4'></div>

        <div className='mt-16 relative'>
          <div id='testimonialCarousel' className='space-y-8'>
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-slide transition-all duration-500 ${
                  index === currentSlide ? 'opacity-100 block' : 'opacity-0 hidden'
                }`}
              >
                <div className='w-full flex justify-center items-center'>
                  <img src={quoteIcon} alt='Quote Icon' />
                </div>

                <p className='text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate-400 italic leading-relaxed mt-6'>
                  {testimonial?.review}
                </p>

                <div className='mt-12 relative flex flex-col items-center'>
                  <div className='relative'>
                    <img
                      alt={`${testimonial.name} Profile`}
                      className='w-16 h-16 rounded-full object-cover'
                      src={testimonial?.image || getAvatar(testimonial?.name)}
                    />

                    {/* Prev Button */}
                    <button
                      onClick={prevSlide}
                      className='absolute -left-28 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-slate-500 hover:text-primary transition-colors'
                    >
                      <i className='material-icons-outlined text-lg'>arrow_back</i>
                      <span>{t('home.testimonials.prev')}</span>
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={nextSlide}
                      className='absolute -right-28 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-slate-500 hover:text-primary transition-colors'
                    >
                      <span>{t('home.testimonials.next')}</span>
                      <i className='material-icons-outlined text-lg'>arrow_forward</i>
                    </button>
                  </div>

                  <p className='mt-4 font-semibold text-slate-800 dark:text-white'>
                    {formatText(testimonial?.name)}
                  </p>

                  <p className='text-xs text-slate-400 uppercase tracking-widest'>
                    {testimonial?.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
