import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { setLanguage } from '../../store/i18nSlice';
import { SUPPORTED_LANGUAGES, type SupportedLanguage, isRTL } from '../../i18n';
import { Button } from '../Button';
import type { JSX } from 'react';

export const LanguageSwitcher = (): JSX.Element => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.i18n.language);

  // Update document direction and language when currentLanguage changes
  useEffect(() => {
    const rtl = isRTL(currentLanguage);
    document.documentElement.dir = rtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const handleLanguageChange = (lang: SupportedLanguage): void => {
    i18n.changeLanguage(lang).catch((error) => {
      console.error('Failed to change language:', error);
    });
    dispatch(setLanguage(lang));
  };

  return (
    <div className='flex items-center gap-2'>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <Button
          key={lang}
          variant={currentLanguage === lang ? 'primary' : 'outline'}
          size='sm'
          onClick={() => handleLanguageChange(lang)}
          className='min-w-[60px]'
        >
          {lang.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
