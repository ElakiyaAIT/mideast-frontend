import { lazy, Suspense, type JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GuestGuard } from '../guards';
import { ROUTES } from '../constants';
import { SuspenseFallback } from '../components/SuspenseFallback';

// Lazy load all pages for optimal code splitting
const LoginPage = lazy(() => import('../pages/auth/LoginPage'));
const RegisterPage = lazy(() => import('../pages/auth/RegisterPage'));
const ForgotPasswordPage = lazy(() => import('../pages/auth/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/auth/ResetPasswordPage'));

// Public pages
const PublicLayout = lazy(() => import('../layouts/PublicLayout'));
const HomePage = lazy(() => import('../pages/public/HomePage'));
const BuyPage = lazy(() => import('../pages/public/BuyPage'));
const BuyNowDetailsPage = lazy(() => import('../pages/public/BuyNowDetailsPage'));
const SellPage = lazy(() => import('../pages/public/SellPage'));
const AuctionPage = lazy(() => import('../pages/public/AuctionPage'));
const ContactUsPage = lazy(() => import('../pages/public/ContactUsPage'));
import LoaderDemoPage from '../pages/LoaderDemoPage';
import ContentPage from '../pages/public/ContentPage';

export const AppRoutes = (): JSX.Element => {
  return (
    <BrowserRouter>
      {/* Centralized Suspense boundary with premium fallback */}
      <Routes>
        {/* Public Routes */}
        <Route
          path={ROUTES.HOME}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading...' />}>
                <PublicLayout />
              </Suspense>
            </GuestGuard>
          }
        >
          <Route
            index
            element={
              <GuestGuard>
                <Suspense
                  fallback={<SuspenseFallback message='Loading home...' fullScreen={false} />}
                >
                  <HomePage />
                </Suspense>
              </GuestGuard>
            }
          />
        </Route>

        {/* Buy/Sell Routes (without layout - they have their own header/footer) */}
        <Route
          path={ROUTES.BUY}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading buy page...' />}>
                <BuyPage />
              </Suspense>
            </GuestGuard>
          }
        />

        <Route path={'demo/loaders'} element={<LoaderDemoPage />} />

        <Route
          path={ROUTES.BUY_DETAILS}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading product details...' />}>
                <BuyNowDetailsPage />
              </Suspense>
            </GuestGuard>
          }
        />

        <Route
          path={ROUTES.SELL}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading sell page...' />}>
                <SellPage />
              </Suspense>
            </GuestGuard>
          }
        />

        <Route
          path={ROUTES.AUCTION}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading auction page...' />}>
                <AuctionPage />
              </Suspense>
            </GuestGuard>
          }
        />

        <Route
          path={ROUTES.CONTACT_US}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading contact page...' />}>
                <ContactUsPage />
              </Suspense>
            </GuestGuard>
          }
        />

        {/* Auth Routes */}
        <Route
          path={ROUTES.LOGIN}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading login...' />}>
                <LoginPage />
              </Suspense>
            </GuestGuard>
          }
        />

        <Route
          path={ROUTES.REGISTER}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading registration...' />}>
                <RegisterPage />
              </Suspense>
            </GuestGuard>
          }
        />

        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading Forgot password...' />}>
                <ForgotPasswordPage />
              </Suspense>
            </GuestGuard>
          }
        />

        <Route
          path={ROUTES.RESET_PASSWORD}
          element={
            <GuestGuard>
              <Suspense fallback={<SuspenseFallback message='Loading Reset password...' />}>
                <ResetPasswordPage />
              </Suspense>
            </GuestGuard>
          }
        />
        <Route path={ROUTES.CONTENT} element={<ContentPage />} />
        {/* Catch all route */}
        <Route path='*' element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </BrowserRouter>
  );
};
