import React, { useState, useEffect, useCallback } from 'react';
import { useCurrencyData } from '../hooks/useCurrencyData';
import { CurrencyInput } from './CurrencyInput';
import { useLanguage } from '../contexts/LanguageContext';

const SwapIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 17l4 4 4-4"/><path d="M7 21V3"/><path d="M21 7l-4-4-4 4"/><path d="M17 3v18"/>
    </svg>
);

export const CurrencyConverter: React.FC = () => {
    const { rates, currencyList, isLoading, error, currencyNames } = useCurrencyData();
    const { t } = useLanguage();
    const [fromCurrency, setFromCurrency] = useState('SAR');
    const [toCurrency, setToCurrency] = useState('USD');
    const [amount, setAmount] = useState<number | string>(1000);
    const [isFromAmount, setIsFromAmount] = useState(true);
    const [copySuccess, setCopySuccess] = useState('');


    useEffect(() => {
        if (currencyList.length > 0) {
            if (!currencyList.includes(fromCurrency)) {
                setFromCurrency(currencyList.includes('SAR') ? 'SAR' : currencyList[0]);
            }
            if (!currencyList.includes(toCurrency)) {
                setToCurrency(currencyList.includes('USD') ? 'USD' : (currencyList[1] || currencyList[0]));
            }
        }
    }, [currencyList, fromCurrency, toCurrency]);

    let fromAmount: number | string = '';
    let toAmount: number | string = '';

    if (rates) {
        if (isFromAmount) {
            fromAmount = amount;
            const rate = rates[toCurrency] / rates[fromCurrency];
            const result = Number(amount) * rate;
            toAmount = isNaN(result) ? '' : result.toFixed(2);
        } else {
            toAmount = amount;
            const rate = rates[fromCurrency] / rates[toCurrency];
            const result = Number(amount) * rate;
            fromAmount = isNaN(result) ? '' : result.toFixed(2);
        }
    }

    const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        setIsFromAmount(true);
    };

    const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setAmount(value);
        setIsFromAmount(false);
    };

    const handleSwapCurrencies = useCallback(() => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    }, [fromCurrency, toCurrency]);

    const handleCopyToClipboard = (valueToCopy: string | number) => {
        if (!valueToCopy) return;
        navigator.clipboard.writeText(String(valueToCopy)).then(() => {
            setCopySuccess(t('converter_copy_success'));
            setTimeout(() => setCopySuccess(''), 2000);
        }).catch(err => {
            console.error("Failed to copy: ", err);
            setCopySuccess(t('converter_copy_fail'));
            setTimeout(() => setCopySuccess(''), 2000);
        });
    };

    if (isLoading) {
        return <div className="text-center text-white text-2xl p-8">{t('converter_loading')}</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
             {error && (
                <div className="bg-red-900/50 border border-red-600 text-red-300 px-4 py-3 rounded-lg relative mb-6 text-center" role="alert">
                    <strong className="font-bold">{t('converter_alert_title')} </strong>
                    <span className="block sm:inline">{t(error)}</span>
                </div>
            )}
            <div className="relative">
                <div className="space-y-6">
                    <CurrencyInput
                        label={t('converter_from_label')}
                        currencies={currencyList}
                        currencyNames={currencyNames}
                        selectedCurrency={fromCurrency}
                        onCurrencyChange={(e) => setFromCurrency(e.target.value)}
                        amount={fromAmount}
                        onAmountChange={handleFromAmountChange}
                        isAmountDisabled={!isFromAmount}
                        themeColor="blue"
                        isCopyable={!isFromAmount && !!fromAmount}
                        onCopy={() => handleCopyToClipboard(fromAmount)}
                    />
                    <CurrencyInput
                        label={t('converter_to_label')}
                        currencies={currencyList}
                        currencyNames={currencyNames}
                        selectedCurrency={toCurrency}
                        onCurrencyChange={(e) => setToCurrency(e.target.value)}
                        amount={toAmount}
                        onAmountChange={handleToAmountChange}
                        isAmountDisabled={isFromAmount}
                        themeColor="green"
                        isCopyable={isFromAmount && !!toAmount}
                        onCopy={() => handleCopyToClipboard(toAmount)}
                    />
                </div>
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-center">
                    <button
                        onClick={handleSwapCurrencies}
                        className="bg-amber-400 text-slate-900 rounded-full p-3 shadow-lg hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-amber-400 transition-transform duration-200 hover:rotate-180"
                        aria-label={t('converter_swap_aria_label')}
                    >
                       <SwapIcon className="w-6 h-6"/>
                    </button>
                </div>
            </div>
            <div className="text-center mt-8 relative h-16">
                 <button className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white font-bold py-4 px-12 rounded-lg text-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                    {t('converter_button_text')}
                </button>
                 {copySuccess && (
                    <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 text-sm bg-emerald-600/90 text-white py-1 px-3 rounded-md transition-opacity duration-300">
                        {copySuccess}
                    </div>
                )}
            </div>
        </div>
    );
};