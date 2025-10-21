import React, { useEffect } from 'react';
import { Header } from './components/Header';
import { CurrencyConverter } from './components/CurrencyConverter';
import { Footer } from './components/Footer';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

function AppContent() {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col text-white">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-slate-900 -z-10"
      ></div>
      <div className="relative z-10 flex flex-col flex-grow">
        <Header />
        <main className="flex-grow flex items-center justify-center px-4">
          <CurrencyConverter />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
