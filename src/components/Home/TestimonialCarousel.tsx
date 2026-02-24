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
    <section className="overflow-hidden bg-white py-18 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 text-center">
        <p className="mb-2 text-xs font-bold uppercase tracking-widest text-primary">
          {t('home.testimonials.title')}
        </p>
        <h2 className="font-display text-4xl font-bold uppercase text-gray-900 dark:text-white">
          {t('home.testimonials.subtitle')}
        </h2>
        <div className="mx-auto my-4 h-1 w-16 bg-primary"></div>

        <div className="relative mt-16">
          <div id="testimonialCarousel" className="space-y-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-slide transition-all duration-500 ${
                  index === currentSlide ? 'block opacity-100' : 'hidden opacity-0'
                }`}
              >
                <div className="flex w-full items-center justify-center">
                  <img src={quoteIcon} alt="Quote Icon" />
                </div>

                <p className="mt-6 text-lg italic leading-relaxed text-slate-600 dark:text-slate-400 sm:text-xl md:text-2xl">
                  {testimonial?.review}
                </p>

                <div className="relative mt-12 flex flex-col items-center">
                  <div className="relative">
                    <img
                      alt={`${testimonial.name} Profile`}
                      className="h-16 w-16 rounded-full object-cover"
                      src={testimonial?.image || getAvatar(testimonial?.name)}
                    />

                    {/* Prev Button */}
                    <button
                      onClick={prevSlide}
                      className="absolute -left-28 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-slate-500 transition-colors hover:text-primary md:flex"
                    >
                      <i className="material-icons-outlined text-lg">arrow_back</i>
                      <span>{t('home.testimonials.prev')}</span>
                    </button>

                    {/* Next Button */}
                    <button
                      onClick={nextSlide}
                      className="absolute -right-28 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-slate-500 transition-colors hover:text-primary md:flex"
                    >
                      <span>{t('home.testimonials.next')}</span>
                      <i className="material-icons-outlined text-lg">arrow_forward</i>
                    </button>
                  </div>

                  <p className="mt-4 font-semibold text-slate-800 dark:text-white">
                    {formatText(testimonial?.name)}
                  </p>

                  <p className="text-xs uppercase tracking-widest text-slate-400">
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
