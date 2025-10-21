import React from 'react';
import { LogoIcon } from './icons/LogoIcon';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

export const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="relative text-center p-6 text-white">
      <div className="absolute top-4 ltr:right-4 rtl:left-4 z-20">
        <LanguageSwitcher />
      </div>
      <div className="flex items-center justify-center gap-4 mb-4">
        <LogoIcon className="w-16 h-16 text-amber-400" />
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400 tracking-wider" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {t('header_title')}
        </h1>
      </div>
      <p className="text-lg md:text-xl text-slate-300">
        {t('header_welcome')}
      </p>
    </header>
  );
};
