import React, { useState } from 'react';
import cashOffer from '../../../src/assets/images/cashOffer.png';
import auction from '../../../src/assets/images/auction.png';
import retailPrice from '../../../src/assets/images/retailPrice.png';
import { useTranslation } from '../../i18n';
/* ============================
   TYPES
============================ */
interface ConditionItem {
  label: string;
  text: string;
  status: 'good' | 'fair' | 'bad';
}
interface PriceRange {
  description: string;
  min?: number;
  max?: number;
  value?: number;
}
interface EquipmentValuation {
  title: string;
  subtitle: string;
  auction: PriceRange;
  retail: PriceRange;
  cashOffer: PriceRange;
  condition: ConditionItem[];
  confidence: number;
  confidenceLabel: string;
  disclaimer: string[];
}

/* ============================
   MOCK DATA (API REPLACEABLE)
============================ */

const mockValuation: EquipmentValuation = {
  title: 'CATERPILLAR 320 GC EXCAVATOR',
  subtitle: 'Current valuation for your 2018 model with 4,500 hours.',
  auction: {
    description: 'Based on recent auction sales in your region',
    min: 120000,
    max: 145000,
  },
  retail: {
    description: 'Estimate for private or dealer listings',
    min: 130000,
    max: 155000,
  },
  cashOffer: {
    description: 'Guaranteed offer if you sell today',
    value: 135000,
  },
  condition: [
    {
      label: 'Engine',
      text: 'Excellent condition, recently serviced.',
      status: 'good',
    },
    {
      label: 'Hydraulics',
      text: 'Good, no leaks detected.',
      status: 'good',
    },
    {
      label: 'Exterior',
      text: 'Minor cosmetic dents and scratches.',
      status: 'fair',
    },
    {
      label: 'Undercarriage',
      text: 'Heavy wear on tracks.',
      status: 'bad',
    },
    {
      label: 'Interior',
      text: 'Clean, fully functional controls.',
      status: 'good',
    },
  ],

  confidence: 85,
  confidenceLabel: 'High',

  disclaimer: [
    'Valuations based on 500+ similar equipment sales in the past 12 months.',
    'Data aggregated from major auction houses and private sales.',
    'Adjusted for hours, condition, and regional market trends.',
    'Final sale price may vary based on market conditions at time of sale.',
  ],
};

/* ============================
   MAIN COMPONENT
============================ */

const PriceForm: React.FC = () => {
  const { t } = useTranslation();
  const [valuation] = useState<EquipmentValuation>(mockValuation);

  const formatRange = (min?: number, max?: number) => {
    if (!min || !max) return '-';
    return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
  };
  const formatValue = (value?: number) => (value ? `$${value.toLocaleString()}` : '-');

  const getStatusStyles = (status: 'good' | 'fair' | 'bad') => {
    switch (status) {
      case 'good':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-600',
          icon: 'check_circle',
        };
      case 'fair':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-600',
          icon: 'error_outline',
        };
      case 'bad':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-600',
          icon: 'cancel',
        };
    }
  };

  return (
    <div className='mx-auto max-w-6xl'>
      {/* ================= HEADER ================= */}
      <div className='mb-12 flex flex-col items-center justify-center'>
        <h2 className='mb-2 text-3xl font-bold text-slate-900 dark:text-white'>
          {valuation.title}
        </h2>
        <p className='text-slate-600 dark:text-slate-400'>{valuation.subtitle}</p>
      </div>

      {/* ================= PRICING CARDS ================= */}
      <div className='mx-auto mb-12 grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3'>
        <PricingCard
          title='Auction Range'
          icon={auction}
          price={formatRange(valuation.auction.min, valuation.auction.max)}
          description={valuation.auction.description}
          buttonText='View Auction Insights'
        />

        <PricingCard
          title='Retail Range'
          icon={retailPrice}
          price={formatRange(valuation.retail.min, valuation.retail.max)}
          description={valuation.retail.description}
          buttonText='Explore Retail Listings'
        />

        <PricingCard
          title='Cash Offer'
          icon={cashOffer}
          price={formatValue(valuation.cashOffer.value)}
          description={valuation.cashOffer.description}
          buttonText='Get My Offer'
        />
      </div>

      {/* ================= CONDITION SECTION ================= */}
      <section className='mb-8 rounded-2xl bg-slate-50 p-8 dark:bg-slate-800'>
        <h3 className='mb-6 text-lg font-bold text-slate-900 dark:text-white'>
          {t('sell.form.pricing.condition')}
        </h3>

        <div className='space-y-3'>
          {valuation.condition.map((item, index) => {
            const styles = getStatusStyles(item.status);

            return (
              <div key={index} className='flex items-start gap-3'>
                <div
                  className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${styles.bg}`}
                >
                  <i className={`material-icons text-sm ${styles.text}`}>{styles.icon}</i>
                </div>

                <p className='text-sm font-semibold text-slate-900 dark:text-white'>
                  {item.label}:{' '}
                  <span className='font-normal text-slate-600 dark:text-slate-400'>
                    {item.text}
                  </span>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= DETAILED VALUATION ================= */}
      <section className='rounded-2xl bg-slate-50 p-8 dark:bg-slate-800'>
        <h3 className='mb-6 text-lg font-bold text-slate-900 dark:text-white'>
          {t('sell.form.pricing.detailedValuation')}
        </h3>

        <div className='mb-6'>
          <div className='mb-3 flex items-center gap-2'>
            <i className='material-icons text-slate-600 dark:text-slate-400'>info</i>
            <h4 className='font-semibold text-slate-900 dark:text-white'>
              Data Sources & Disclaimer
            </h4>
          </div>

          <ul className='ml-8 list-disc space-y-2 text-sm text-slate-600 dark:text-slate-400'>
            {valuation.disclaimer.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Confidence */}
        <div>
          <div className='mb-2 flex items-center justify-between'>
            <h4 className='font-semibold text-slate-900 dark:text-white'>
              {t('sell.form.pricing.valuationConfidence')}
            </h4>
            <span className='text-sm font-bold text-orange-500'>{valuation.confidenceLabel}</span>
          </div>

          <div className='h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700'>
            <div
              className='h-2 rounded-full bg-orange-500 transition-all duration-500'
              style={{ width: `${valuation.confidence}%` }}
            />
          </div>

          <p className='mt-2 text-xs text-slate-500 dark:text-slate-400'>
            Based on strong market data availability and recent comparable sales
          </p>
        </div>
      </section>
    </div>
  );
};

export default PriceForm;

/* ============================
   PRICING CARD COMPONENT
============================ */

interface CardProps {
  title: string;
  icon: string;
  price: string;
  description: string;
  buttonText: string;
}

const PricingCard: React.FC<CardProps> = ({ title, icon, price, description, buttonText }) => {
  return (
    <div className='rounded-3xl bg-[#fdad3e] pt-5 shadow-sm'>
      <h3 className='text-center text-xs font-bold uppercase tracking-wider text-white'>{title}</h3>

      <div className='mt-4 rounded-2xl bg-[#fdc06a] pt-6'>
        <div className='flex justify-center'>
          <img src={icon} alt={title} className='h-12 w-12' />
        </div>

        <div className='mt-4 px-6 text-left'>
          <p className='text-xs text-orange-100'>{description}</p>
          <p className='mt-2 text-2xl font-bold text-white'>{price}</p>
        </div>

        <div className='mt-6 flex justify-center pb-12'>
          <button className='rounded-full bg-orange-500 px-6 py-2 text-xs font-semibold text-white transition hover:bg-orange-600'>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};
