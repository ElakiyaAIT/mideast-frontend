import type { JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants';
import product1 from '../../assets/images/chuttersnap-PF1daJne7lA-unsplash-1-768x512.jpg.png';
import { useTranslation } from '../../i18n';

interface Equipment {
  _id: string;
  title: string;
  buyNowPrice?: number;
  images: string[];
  hoursUsed?: number;
  year: number;
  condition?: string;
  location: {
    city: string;
  };
}

interface ProductCardProps {
  readonly product: Equipment;
}

export function ProductCard({ product }: ProductCardProps): JSX.Element {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col rounded-2xl border bg-white shadow-lg">
      {/* IMAGE */}
      <div className="relative h-56">
        <div className="h-full overflow-hidden rounded-2xl border-4 border-slate-50">
          <img
            src={product.images?.[0] || product1}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Badge */}
        <span className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-white">
          {t('home.products.best')}
        </span>
      </div>

      {/* CONTENT */}
      <div className="flex-grow bg-white p-6">
        <h3 className="mb-4 truncate text-xl font-bold" title={product?.title}>
          {product.title}
        </h3>

        <div className="grid grid-cols-3 gap-y-6 text-sm">
          <Spec label="Assembly Weight" value="3,780 kg" />
          <Spec label="Gross Power" value="185 KW" />
          <Spec label="Max Speed" value="50 km/h" />
          <Spec label="Engine" value="BN455" />
          <Spec label="Hours" value={product?.hoursUsed?.toLocaleString()} />
          <Spec label="Location" value={product.location.city} />
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between rounded-b-2xl bg-white p-6">
        <div>
          <p className="text-xs font-semibold uppercase text-gray-400">
            {t('home.products.retailPrice')}
          </p>
          <p className="text-xl font-bold text-[#fdad3e]">
            ${product?.buyNowPrice?.toLocaleString()}
          </p>
        </div>

        <button
          onClick={() => navigate(`${ROUTES.BUY}/${product._id}`)}
          className="rounded-full bg-[#fdad3e] px-6 py-2 text-sm font-bold uppercase text-white"
        >
          {t('home.products.viewMore')}
        </button>
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value?: string | number | undefined }) {
  return (
    <div>
      <p className="mb-0.5 truncate font-bold">{value}</p>
      <p className="text-xs">{label}</p>
    </div>
  );
}
