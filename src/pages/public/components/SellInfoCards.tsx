import { useTranslation } from '../../../i18n';

export const SellInfoCards = () => {
  const { t } = useTranslation();

  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="mb-8 w-fit border-b-4 border-primary pb-2 text-3xl font-black uppercase tracking-tight">
          {t('sell.subtitle')}
        </h2>
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]"
            >
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                {num}
              </span>
              <p className="text-lg font-bold uppercase leading-tight">
                {t(`sell.card.card${num}`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-12 flex items-center justify-center gap-4">
          <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700"></div>
          <span className="text-2xl font-black text-slate-400">OR</span>
          <div className="h-px flex-grow bg-slate-300 dark:bg-slate-700"></div>
        </div>

        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="bg-dark-gray group flex items-center gap-6 rounded-2xl border-b-4 border-primary p-8 text-white transition-all hover:translate-y-[-4px]"
            >
              <span className="text-7xl font-black text-primary/40 transition-colors group-hover:text-primary">
                {num}
              </span>
              <p className="text-lg font-bold uppercase leading-tight">
                {t(`sell.card.card${num}OR`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <h2 className="text-3xl font-black uppercase tracking-tight">{t('sell.getStarted')}</h2>
          <p className="mt-2 text-slate-500">
            {t('sell.completeForm')} <span className="font-bold text-primary">860-222-3393</span>
          </p>
        </div>
      </section>
    </>
  );
};
