import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './userSlice';
import loaderReducer from './loaderSlice';
import themeReducer from './themeSlice';
import i18nReducer from './i18nSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    loader: loaderReducer,
    theme: themeReducer,
    i18n: i18nReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
