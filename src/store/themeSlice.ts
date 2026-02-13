import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ThemeMode } from '../types';
import { STORAGE_KEYS } from '../constants';

const getInitialTheme = (): ThemeMode => {
  const stored = localStorage.getItem(STORAGE_KEYS.THEME);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

interface ThemeState {
  mode: ThemeMode;
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;
      localStorage.setItem(STORAGE_KEYS.THEME, action.payload);
      document.documentElement.classList.toggle('dark', action.payload === 'dark');
    },
    toggleTheme: (state) => {
      const newMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = newMode;
      localStorage.setItem(STORAGE_KEYS.THEME, newMode);
      document.documentElement.classList.toggle('dark', newMode === 'dark');
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
