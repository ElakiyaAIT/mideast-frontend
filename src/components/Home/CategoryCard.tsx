import type { JSX } from 'react';
import type { Category } from '../../types/home';

interface CategoryCardProps {
  readonly category: Category;
}

export function CategoryCard({ category }: CategoryCardProps): JSX.Element {
  return (
    <div className="group relative h-64 overflow-hidden rounded-xl shadow-xl">
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-center">
        <h3 className="truncate font-display text-2xl font-bold uppercase text-white">
          {category.title}
        </h3>
      </div>
    </div>
  );
}
