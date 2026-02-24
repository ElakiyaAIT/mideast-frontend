import type { JSX } from 'react';

export function HeroSection(): JSX.Element {
  return (
    <section className="bg-banner relative overflow-hidden">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-20 md:px-8 lg:flex-row">
        <div className="space-y-6 lg:w-1/2">
          <h1 className="font-display text-4xl font-bold lg:text-6xl">
            QUALITY, USED HEAVY <br />
            EQUIPMENT <span className="text-primary">FOR SALE</span>
          </h1>

          <p className="max-w-xl text-lg text-slate-600">
            Since 2004, Mideast Equipment Supply has been a reliable global partner for buying and
            selling heavy equipment.
          </p>
        </div>

        <div className="mt-12 lg:w-1/2">
          <img
            src="/images/heavy-machinery-used-construction-industry-engineering 3.png"
            alt="Heavy Machinery"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
