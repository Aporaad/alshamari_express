import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GlobeIcon } from './icons/GlobeIcon';

export const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();

    const toggleLanguage = () => {
        const newLang = language === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
    };

    const buttonText = language === 'ar' ? 'EN' : 'AR';
    const ariaLabel = language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية';

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-white px-3 py-2 rounded-md hover:bg-slate-700/50 transition-colors"
            aria-label={ariaLabel}
        >
            <GlobeIcon className="w-5 h-5" />
            <span className="font-semibold">{buttonText}</span>
        </button>
    );
};
