import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './assets/css/style.css';
import './assets/css/animations.css';
import App from './app/App';

// Setup API loader interceptor
import axiosInstance from './api/axiosInstance';
import { store } from './store';
import { setupApiLoaderInterceptor } from './utils/apiLoaderInterceptor';

// ✅ Enable automatic API loader tracking
setupApiLoaderInterceptor(axiosInstance, store.dispatch);

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
