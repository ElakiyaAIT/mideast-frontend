// src/test/components/Header.test.tsx
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../components/layout/Header';
import { ROUTES } from '../../constants';
import * as i18n from '../../i18n';
import '@testing-library/jest-dom'; // Vitest-compatible matchers

import { describe, it, expect, beforeAll, vi } from 'vitest';
import type { UseTranslationResponse } from 'react-i18next';

describe('<Header />', () => {
  // Mock translations
  beforeAll(() => {
    vi.spyOn(i18n, 'useTranslation').mockReturnValue({
      t: (key: string) => {
        const map: Record<string, string> = {
          'nav.home': 'Home',
          'nav.buyNow': 'Buy Now',
          'nav.sell': 'Sell',
          'nav.auction': 'Auction',
          'nav.aboutUs': 'About Us',
          'nav.contactUs': 'Contact Us',
          'nav.login': 'Login',
          'nav.register': 'Register',
          'footer.needHelp': 'Need Help?',
        };
        return map[key] || key;
      },
    } as unknown as UseTranslationResponse<string, string>);
  });

  it('renders desktop navigation correctly', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    // Scope to desktop nav container (the one with lg:flex)
    const desktopNav = document.querySelector(
      'div.lg\\:flex.items-center.space-x-6',
    ) as HTMLElement;
    if (!desktopNav) throw new Error('Desktop nav not found');
    const { getByText } = within(desktopNav);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Buy Now')).toBeInTheDocument();
    expect(getByText('Sell')).toBeInTheDocument();
    expect(getByText('Auction')).toBeInTheDocument();
    expect(getByText('About Us')).toBeInTheDocument();
    expect(getByText('Contact Us')).toBeInTheDocument();
  });

  it('applies active class based on pathname', () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.BUY]}>
        <Header />
      </MemoryRouter>,
    );

    // Scope to desktop nav only
    const desktopNav = document.querySelector(
      'div.lg\\:flex.items-center.space-x-6',
    ) as HTMLElement;
    if (!desktopNav) throw new Error('Desktop nav not found');
    const { getByText: getByTextDesktop } = within(desktopNav);

    const buyLink = getByTextDesktop('Buy Now');
    expect(buyLink).toHaveClass('text-primary');

    // Check other links are not active
    const homeLink = getByTextDesktop('Home');
    expect(homeLink).not.toHaveClass('text-primary');
  });

  it('toggles mobile menu when menu button is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole('button', { name: /menu/i });
    const mobileMenu = document.getElementById('mobileMenu')!;
    expect(mobileMenu).toHaveClass('hidden');

    fireEvent.click(toggleButton);
    expect(mobileMenu).not.toHaveClass('hidden');

    fireEvent.click(toggleButton);
    expect(mobileMenu).toHaveClass('hidden');
  });

  it('closes mobile menu when a mobile link is clicked', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    const toggleButton = screen.getByRole('button', { name: /menu/i });
    const mobileMenu = document.getElementById('mobileMenu')!;

    // Open mobile menu
    fireEvent.click(toggleButton);
    expect(mobileMenu).not.toHaveClass('hidden');

    // Use "within" to scope search to mobile menu only
    const { getByText: getByTextWithinMobile } = within(mobileMenu);
    const homeLinkMobile = getByTextWithinMobile('Home');

    fireEvent.click(homeLinkMobile);
    expect(mobileMenu).toHaveClass('hidden');
  });
});
