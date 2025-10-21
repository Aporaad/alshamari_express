import React from 'react';
import type { CurrencyNames } from '../types';
import { CopyIcon } from './icons/CopyIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface CurrencyInputProps {
  label: string;
  currencies: string[];
  currencyNames: CurrencyNames;
  selectedCurrency: string;
  onCurrencyChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  amount: number | string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isAmountDisabled?: boolean;
  themeColor: 'blue' | 'green';
  isCopyable?: boolean;
  onCopy?: () => void;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  label,
  currencies,
  currencyNames,
  selectedCurrency,
  onCurrencyChange,
  amount,
  onAmountChange,
  isAmountDisabled = false,
  themeColor,
  isCopyable = false,
  onCopy
}) => {
  const { t } = useLanguage();
  const borderClass = themeColor === 'blue' ? 'border-sky-500' : 'border-emerald-500';
  const ringClass = themeColor === 'blue' ? 'focus:ring-sky-400' : 'focus:ring-emerald-400';

  return (
    <div className={`bg-slate-800/50 p-6 rounded-xl border-2 ${borderClass} space-y-3 backdrop-blur-sm`}>
      <label className="text-slate-300 text-lg">{label}</label>
      <div className="flex flex-col md:flex-row gap-4">
        <select
          value={selectedCurrency}
          onChange={onCurrencyChange}
          className={`w-full md:w-1/3 p-3 bg-slate-700 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 ${ringClass} transition-all`}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {`${currency} - ${currencyNames[currency] || ''}`}
            </option>
          ))}
        </select>
        <div className="relative w-full md:w-2/3">
          <input
            type="number"
            value={amount}
            onChange={onAmountChange}
            disabled={isAmountDisabled}
            className={`w-full p-3 bg-slate-900 text-white rounded-md border border-slate-600 focus:outline-none focus:ring-2 ${ringClass} text-2xl font-mono transition-all disabled:bg-slate-800 disabled:cursor-not-allowed ${isCopyable ? 'ltr:pr-12 rtl:pl-12' : ''}`}
            placeholder="0.00"
            min="0"
            step="any"
          />
          {isCopyable && (
            <button 
              onClick={onCopy}
              className="absolute top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-200 ltr:right-3 rtl:left-3"
              aria-label={t('converter_copy_aria_label')}
            >
              <CopyIcon className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
