import en from './en.json';
import ar from './ar.json';

const translations = { en, ar };

export const languages = {
  en: { name: 'English', nativeName: 'English', dir: 'ltr' },
  ar: { name: 'العربية', nativeName: 'العربية', dir: 'rtl' },
};

export const getTranslation = (key, language = 'en') => {
  const keys = key.split('.');
  let value = translations[language] || translations.en;

  for (const k of keys) {
    value = value?.[k];
  }

  return value || key;
};

export const t = (key, language = 'en') => getTranslation(key, language);

export default translations;
