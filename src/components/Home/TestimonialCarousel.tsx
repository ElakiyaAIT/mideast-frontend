import { useEffect, useState, type JSX } from 'react';
import type { Testimonial } from '../../types/home';

const TESTIMONIALS: readonly Testimonial[] = [
  {
    name: 'Adam Hoffman',
    role: 'CEO OF CONSTRUCTION',
    message: 'We strive for a complete life-cycle approach...',
    image: 'https://lh3.googleusercontent.com/...',
  },
  {
    name: 'Sarah Johnson',
    role: 'PROJECT MANAGER',
    message: 'Mideast Equipment has been instrumental...',
    image: 'https://lh3.googleusercontent.com/...',
  },
];

export function TestimonialCarousel(): JSX.Element {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const testimonial = TESTIMONIALS[index];

  return (
    <div className="space-y-8 text-center">
      <p className="text-xl italic text-slate-600">{testimonial.message}</p>

      <div className="flex flex-col items-center">
        <img src={testimonial.image} alt={testimonial.name} className="h-16 w-16 rounded-full" />
        <p className="mt-4 font-bold">{testimonial.name}</p>
        <p className="text-xs text-slate-400">{testimonial.role}</p>
      </div>
    </div>
  );
}
