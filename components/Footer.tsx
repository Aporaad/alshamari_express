import React from 'react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="text-center p-6 text-slate-400 mt-auto">
      <p className="mb-2">{t('footer_developed_by')}</p>
      <a 
        href="https://wa.me/967782222247" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 hover:text-amber-400 transition-colors duration-300"
      >
        <span>{t('footer_contact_us')}</span>
        <WhatsAppIcon className="w-6 h-6" />
      </a>
    </footer>
  );
};
