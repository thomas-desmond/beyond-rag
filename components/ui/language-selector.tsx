"use client";

import { useTranslation } from '@/lib/i18n-context';
import { Language } from '@/lib/translations';

export function LanguageSelector() {
  const { language, setLanguage } = useTranslation();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ];

  return (
    <div className="flex items-center space-x-1">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-2 py-1 rounded text-sm transition-colors ${
            language === lang.code
              ? 'bg-[#f48120] text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title={lang.name}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
}
