import { useEffect, useRef, type JSX } from 'react';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from '../store';
import { ThemeProvider } from '../theme/ThemeProvider';
import { ReactQueryProvider } from '../lib/react-query';
import { AppRoutes } from '../routes';
import { ErrorBoundary, GlobalLoader } from '../components';
import { useAppDispatch } from '../hooks/redux';
import { setTheme } from '../store/themeSlice';
import { setLanguage } from '../store/i18nSlice';
import type { ThemeMode } from '../types';
import { STORAGE_KEYS } from '../constants';
// import { authService } from '../services/authService';
import '../i18n/config';
import { DEFAULT_LANGUAGE, isRTL } from '../i18n';
import i18n from '../i18n/config';

const AppContent = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    const initializeApp = (): void => {
      // Initialize theme
      const storedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      const theme: ThemeMode =
        storedTheme === 'light' || storedTheme === 'dark'
          ? storedTheme
          : window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';

      dispatch(setTheme(theme));
      document.documentElement.classList.toggle('dark', theme === 'dark');

      // Initialize i18n
      const storedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE) ?? DEFAULT_LANGUAGE;
      const language =
        storedLanguage === 'en' || storedLanguage === 'es' ? storedLanguage : DEFAULT_LANGUAGE;

      i18n.changeLanguage(language).catch((error) => {
        console.error('Failed to initialize language:', error);
      });
      dispatch(setLanguage(language));

      // Set document direction and language
      document.documentElement.dir = isRTL(language) ? 'rtl' : 'ltr';
      document.documentElement.lang = language;

      // Check auth on app initialization
      // The guards will handle redirects appropriately
      // authService.checkAuth().catch(() => {
      //   // Auth check failed, user will be redirected to login by guards
      // });
    };

    initializeApp();
  }, [dispatch]);

  return (
    <>
      <GlobalLoader />
      <AppRoutes />
      <Toaster
        position="top-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          duration: 4000,
        }}
      />
    </>
  );
};

const App = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ReactQueryProvider>
          <ThemeProvider>
            <AppContent />
          </ThemeProvider>
        </ReactQueryProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
