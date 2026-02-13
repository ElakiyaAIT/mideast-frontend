import { type Product, type ProductStatus } from "../../constants/DummyConstant";
import { useTranslation } from "../../i18n";

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
    <div className="group bg-white rounded-2xl shadow-md transition-all hover:shadow-xl">

      {/* IMAGE AREA */}
      <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">

        {/* IMAGE (scales) */}
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        />

        {/* BADGE — INSIDE IMAGE */}
        <div
          className={`absolute top-4 -left-8 rotate-[-45deg] z-20
    ${badge.className}
    text-white text-[10px] font-bold px-10 py-1 uppercase shadow`}
        >
          {badge.label}
        </div>

        {/* BOOKMARK — INSIDE IMAGE */}
        <button className="absolute top-4 right-4 z-20 bg-black/40 text-white p-2 rounded-full backdrop-blur transition hover:bg-black/60">
          <span className="material-symbols-outlined text-[18px]">
            bookmark
          </span>
        </button>

      </div>


      {/* CONTENT */}
      <div className="p-5">
        <h3 className="font-bold text-lg mb-4 truncate">
          {product.title}
        </h3>

        <div className="grid grid-cols-3 gap-4 text-sm mb-4">
          {Object.entries(product.specs).map(([key, value]) => (
            <div key={key}>
              <p className="font-bold">{value}</p>
              <p className="text-[11px] text-slate-400 capitalize">
                {key.replace("_", " ")}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center border-t pt-4">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">
              {t('product.totalPrice')}
            </p>
            <p className="text-xl font-bold text-orange-500">
              ${product.price.toLocaleString()}
            </p>
          </div>

          <button className="bg-orange-400 hover:bg-orange-500 text-white px-5 py-2 rounded-full text-xs font-bold transition">
            {t('product.viewMore')}
          </button>
        </div>
      </div>
    </div>
  );
}
