import type { Dispatch, SetStateAction } from 'react';
import { useTranslation } from '../../i18n';
import { ConditionPill } from './StatusChip';
interface ReviewFormProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
}
const dummyImages = [
  'https://picsum.photos/400/300?random=1',
  'https://picsum.photos/400/300?random=2',
  'https://picsum.photos/400/300?random=3',
  'https://picsum.photos/400/300?random=4',
  'https://picsum.photos/400/300?random=5',
  'https://picsum.photos/400/300?random=6',
  'https://picsum.photos/400/300?random=7',
  'https://picsum.photos/400/300?random=8',
  'https://picsum.photos/400/300?random=9',
];

export default function ReviewForm({ setCurrentStep }: ReviewFormProps) {
  const { t } = useTranslation();
  return (
    <>
      <link
        rel='stylesheet'
        href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
      />
      <div className='min-h-screen'>
        {/* Page Title */}
        <h3 className='text-xl font-bold uppercase tracking-wide mb-4'>
          {t('sell.form.review.title')}
        </h3>
        <div className='border-t border-gray-200 mb-6'></div>
        {/* Card */}
        {/* Basic Equipment Information*/}
        <div
          className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 ease-in-out
                hover:-translate-y-1'
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              {/* Orange Icon */}
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#fdad3e]'>
                <span className='material-symbols-outlined text-white'>info_i</span>
              </div>

              <h2 className='text-xl font-bold uppercase tracking-wide'>
                {t('sell.form.basicEquipmentInformation')}
              </h2>
            </div>

            {/* Edit Icon */}
            <button className='transition' onClick={() => setCurrentStep(0)}>
              <span className='material-symbols-outlined'>edit_square</span>
            </button>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200 mb-6'></div>

          {/* Content */}
          <div className='grid grid-cols-2 gap-y-6 gap-x-12'>
            {/* Left Column */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.equipmentTitle')}</p>
              <p className='font-medium'>Caterpillar 320 GC Excavator (2018)</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.category')}</p>
              <p className='font-medium'>Excavators</p>
            </div>

            <div className='col-span-2'>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.description')}</p>
              <p className='font-medium'>Heavy automated machine</p>
            </div>
          </div>
        </div>

        {/* Equipment Details */}
        <div
          className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 ease-in-out
           hover:translate-y-1'
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              {/* Orange Icon */}
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#fdad3e]'>
                <span className='material-symbols-outlined text-white'>quick_reference_all</span>
              </div>

              <h2 className='text-xl font-bold uppercase tracking-wide'>
                {t('sell.form.details.title')}
              </h2>
            </div>

            {/* Edit Icon */}
            <button className='transition' onClick={() => setCurrentStep(1)}>
              <span className='material-symbols-outlined'>edit_square</span>
            </button>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200 mb-6'></div>

          {/* Content */}
          <div className='grid grid-cols-3 gap-y-6 gap-x-12 mb-6'>
            {/* Left Column */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.details.basic.make')}</p>
              <p className='font-medium'>Caterpillar</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.details.basic.model')}</p>
              <p className='font-medium'>Excavators</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.details.general.operatingWeight')}
              </p>
              <p className='font-medium'>22,000 Kg</p>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-y-6 gap-x-12'>
            {/* Left Column */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('product.specs.engine')}</p>
              <p className='font-medium'>Diesel-162 HP</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.details.general.transmission')}
              </p>
              <p className='font-medium'>Automatic</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.details.general.engineType')}
              </p>
              <p className='font-medium'>CAT C4</p>
            </div>
          </div>
        </div>

        {/* Condition Checklist */}
        <div
          className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 ease-in-out
                hover:-translate-y-1'
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              {/* Orange Icon */}
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#fdad3e]'>
                <span className='material-symbols-outlined text-white'>receipt_long</span>
              </div>

              <h2 className='text-xl font-bold uppercase tracking-wide'>
                {t('sell.form.conditionCheckList.title')}
              </h2>
            </div>

            {/* Edit Icon */}
            <button className='transition' onClick={() => setCurrentStep(2)}>
              <span className='material-symbols-outlined'>edit_square</span>
            </button>
          </div>
          <div className='border-t border-gray-200 mb-6'></div>

          <div className='flex flex-wrap gap-4'>
            <ConditionPill label='Exterior: Good' status='good' />
            <ConditionPill label='Undercarriage: Fair' status='fair' />
            <ConditionPill label='Engine: Good' status='good' />
            <ConditionPill label='Hydraulics: Fair' status='fair' />
          </div>
        </div>

        {/* Photos */}
        <div
          className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 ease-in-out
                hover:-translate-y-1'
        >
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              {/* Orange Icon */}
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#fdad3e]'>
                <span className='material-symbols-outlined text-white'>imagesmode</span>
              </div>

              <h2 className='text-xl font-bold uppercase tracking-wide'>
                {t('sell.form.review.photosVideos')}
              </h2>
            </div>

            {/* Edit Icon */}
            <button className='transition' onClick={() => setCurrentStep(3)}>
              <span className='material-symbols-outlined'>edit_square</span>
            </button>
          </div>
          <div className='border-t border-gray-200 mb-6'></div>
          <div>
            <div className='flex gap-2 overflow-x-auto scrollbar-hide'>
              {dummyImages.slice(0, 6).map((src, index) => (
                <div
                  key={index}
                  className='min-w-[140px] h-[100px] rounded-2xl overflow-hidden flex-shrink-0 group relative cursor-pointer'
                >
                  <img
                    src={src}
                    alt='equipment'
                    className='w-full h-full object-cover transition duration-300 group-hover:scale-105'
                  />

                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 rounded-2xl'></div>
                </div>
              ))}

              {/* +More Card */}
              {dummyImages.length > 7 && (
                <div className='min-w-[140px] h-[100px] rounded-2xl overflow-hidden flex-shrink-0 relative cursor-pointer'>
                  <img src={dummyImages[6]} alt='more' className='w-full h-full object-cover' />

                  <div className='absolute inset-0 bg-black/60 flex items-center justify-center rounded-2xl'>
                    <span className='text-white text-lg font-bold'>
                      +{dummyImages.length - 6} More
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/*Additional Equipment Information */}
        <div
          className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 ease-in-out
           hover:translate-y-1'
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              {/* Orange Icon */}
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#fdad3e]'>
                <span className='material-symbols-outlined text-white'>note_add</span>
              </div>

              <h2 className='text-xl font-bold uppercase tracking-wide'>
                {t('sell.form.additionalInformation.title')}
              </h2>
            </div>

            {/* Edit Icon */}
            <button className='transition' onClick={() => setCurrentStep(4)}>
              <span className='material-symbols-outlined'>edit_square</span>
            </button>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200 mb-6'></div>

          {/* Content */}
          <div className='grid grid-cols-3 gap-y-6 gap-x-12 mb-6'>
            {/* Left Column */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.additionalInformation.equipmentIdentity.vinNumber')}
              </p>
              <p className='font-medium'>CAT0320GCXYZ123</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.additionalInformation.equipmentIdentity.manufacturerDate')}
              </p>
              <p className='font-medium'>12/05/2015</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.additionalInformation.equipmentIdentity.modelYear')}
              </p>
              <p className='font-medium'>22,000 Kg</p>
            </div>
          </div>
          <div className='grid grid-cols-3 gap-y-6 gap-x-12'>
            {/* Left Column */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.additionalInformation.location.title')}
              </p>
              <p className='font-medium'>1234 Industrial Bluvd, Italy</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>
                {t('sell.form.additionalInformation.ownership.insurance')}
              </p>
              <div className='flex item-center gap-2'>
                <span className='material-symbols-outlined text-[#fdad3e]'>picture_as_pdf</span>
                <p className='font-medium'>invoice.pdf</p>
              </div>
            </div>
          </div>
        </div>

        {/*Additional Equipment Information */}
        <div
          className='bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-6 transition-all duration-300 ease-in-out
           hover:translate-y-1'
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center gap-4'>
              {/* Orange Icon */}
              <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#fdad3e]'>
                <span className='material-symbols-outlined text-white'>payments</span>
              </div>

              <h2 className='text-xl font-bold uppercase tracking-wide'>
                {t('sell.form.additionalInformation.title')}
              </h2>
            </div>

            {/* Edit Icon */}
            <button className='transition' onClick={() => setCurrentStep(5)}>
              <span className='material-symbols-outlined'>edit_square</span>
            </button>
          </div>

          {/* Divider */}
          <div className='border-t border-gray-200 mb-6'></div>

          {/* Content */}
          <div className='grid grid-cols-3 gap-y-6 gap-x-12 mb-6'>
            {/* Left Column */}
            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.review.selectedOption')}</p>
              <p className='font-medium'>Retail Range</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.review.priceRange')}</p>
              <p className='font-medium'>$150,000-$175,000</p>
            </div>

            <div>
              <p className='text-sm text-gray-500 mb-1'>{t('sell.form.review.confidence')}</p>
              <p className='font-medium'>High</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
