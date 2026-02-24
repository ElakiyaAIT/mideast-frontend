import { type Product } from '../../constants/DummyConstant';
import { useTranslation } from '../../i18n';

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { t } = useTranslation();

  const getProductBadge = (status: string) => {
    switch (status) {
      case 'for_sale':
        return {
          label: t('product.status.forSale'),
          className: 'bg-orange-400',
        };

      case 'sold':
        return {
          label: t('product.status.sold'),
          className: 'bg-slate-500',
        };

      case 'auction':
        return {
          label: t('product.status.forAuction'),
          className: 'bg-purple-500',
        };

      default:
        return { label: '', className: '' };
    }
  };

  const badge = getProductBadge(product.status);

  return (
    <div className="group rounded-2xl bg-white shadow-md transition-all hover:shadow-xl">
      {/* IMAGE AREA */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
        {/* IMAGE (scales) */}
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* BADGE — INSIDE IMAGE */}
        <div
          className={`absolute -left-8 top-4 z-20 rotate-[-45deg] ${badge.className} px-10 py-1 text-[10px] font-bold uppercase text-white shadow`}
        >
          {badge.label}
        </div>

        {/* BOOKMARK — INSIDE IMAGE */}
        <button className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2 text-white backdrop-blur transition hover:bg-black/60">
          <span className="material-symbols-outlined text-[18px]">bookmark</span>
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <h3 className="mb-4 truncate text-lg font-bold">{product.title}</h3>

        <div className="mb-4 grid grid-cols-3 gap-4 text-sm">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <p className="font-bold">{value}</p>
              <p className="text-[11px] capitalize text-slate-400">{key.replace('_', ' ')}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div>
            <p className="text-[10px] font-bold uppercase text-slate-400">
              {t('product.totalPrice')}
            </p>
            <p className="text-xl font-bold text-orange-500">${product.price.toLocaleString()}</p>
          </div>

          <button
            // onClick={()=>navigate(`/buy/${product.id}`)}
            className="rounded-full bg-orange-400 px-5 py-2 text-xs font-bold text-white transition hover:bg-orange-500"
          >
            {t('product.viewMore')}
          </button>
        </div>
      </div>
    </div>
  );
}
