import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SupportedLanguage } from '../i18n';
import { DEFAULT_LANGUAGE, isRTL } from '../i18n';
import { STORAGE_KEYS } from '../constants';

interface I18nState {
  language: SupportedLanguage;
  isRTL: boolean;
}

const getInitialLanguage = (): SupportedLanguage => {
  const stored = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
  if (stored && (stored === 'en' || stored === 'es')) {
    return stored;
  }
  return DEFAULT_LANGUAGE;
};

const initialState: I18nState = {
  language: getInitialLanguage(),
  isRTL: isRTL(getInitialLanguage()),
};

const i18nSlice = createSlice({
  name: 'i18n',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<SupportedLanguage>) => {
      state.language = action.payload;
      state.isRTL = isRTL(action.payload);
      localStorage.setItem(STORAGE_KEYS.LANGUAGE, action.payload);
    },
  },
});

export const { setLanguage } = i18nSlice.actions;
export default i18nSlice.reducer;
