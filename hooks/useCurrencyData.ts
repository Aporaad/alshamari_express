import { useState, useEffect } from 'react';
import type { FrankfurterResponse, ExchangeRates, CurrencyNames } from '../types';

const CURRENCY_NAMES: CurrencyNames = {
    "USD": "الدولار الأمريكي",
    "YER": "الريال اليمني",
    "EUR": "اليورو",
    "SAR": "الريال السعودي",
    "AED": "الدرهم الإماراتي",
    "GBP": "الجنيه الاسترليني",
    "JPY": "الين الياباني",
    "CAD": "الدولار الكندي",
    "AUD": "الدولار الأسترالي",
    "CHF": "الفرنك السويسري",
    "CNY": "اليوان الصيني",
    "INR": "الروبية الهندية",
    "EGP": "الجنيه المصري",
    "TRY": "الليرة التركية",
    "QAR": "الريال القطري",
    "OMR": "الريال العماني",
    "KWD": "الدينار الكويتي",
    "BHD": "الدينار البحريني",
    "DZD": "الدينار الجزائري",
    "JOD": "الدينار الأردني",
    "LYD": "الدينار الليبي",
    "MAD": "الدرهم المغربي",
    "TND": "الدينار التونسي",
    "SGD": "الدولار السنغافوري",
    "HKD": "دولار هونج كونج",
    "NZD": "الدولار النيوزيلندي",
    "SEK": "الكرونا السويدية",
    "NOK": "الكرونا النروجية",
    "MXN": "البيزو المكسيكي",
    "MYR": "رينغيت ماليزي",
    "ZAR": "الراند الجنوب أفريقي",
    "BGN": "ليف بلغاري",
    "BRL": "ريال برازيلي",
    "RON": "ليو روماني",
    "PHP": "بيزو فلبيني",
    "CZK": "كرونة تشيكية",
    "DKK": "كرونة دنماركية",
    "HUF": "فورنت مجري",
    "IDR": "روبية إندونيسية",
    "ILS": "شيكل إسرائيلي جديد",
    "KRW": "وون كوري جنوبي",
    "ISK": "كرونا آيسلندية",
    "PLN": "زلوتي بولندي",
    "THB": "بات تايلاندي",
    "MUR": "روبية موريشية",
};

// Fallback rates to ensure key currencies are always available
const FALLBACK_RATES: ExchangeRates = {
    "USD": 1,
    "YER": 533,
    "EUR": 0.92,
    "SAR": 3.75,
    "AED": 3.67,
    "GBP": 0.79,
    "JPY": 157.12,
    "CAD": 1.37,
    "AUD": 1.50,
    "CHF": 0.90,
    "CNY": 7.24,
    "INR": 83.45,
    "EGP": 47.65,
    "TRY": 32.83,
    "QAR": 3.64,
    "OMR": 0.38,
    "KWD": 0.31,
    "BHD": 0.38,
    "DZD": 134.50,
    "JOD": 0.709,
    "LYD": 4.85,
    "MAD": 9.98,
    "TND": 3.12,
    "SGD": 1.35,
    "HKD": 7.81,
    "NZD": 1.63,
    "SEK": 10.45,
    "NOK": 10.55,
    "MXN": 17.10,
    "MYR": 4.70,
    "ZAR": 18.50,
    "MUR": 47.00
};


export const useCurrencyData = () => {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currencyList, setCurrencyList] = useState<string[]>([]);

  useEffect(() => {
    const fetchRates = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://api.frankfurter.app/latest?from=USD`);
        
        if (!response.ok) {
           throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data: FrankfurterResponse = await response.json();
        
        const liveRates = { ...data.rates, [data.base]: 1 };
        
        const combinedRates = { ...FALLBACK_RATES, ...liveRates };

        setRates(combinedRates);
        setCurrencyList(Object.keys(combinedRates).sort());

      } catch (err) {
        console.error("Fetch error, falling back to mock data:", err);
        setError('converter_error_fallback');
        
        setRates(FALLBACK_RATES);
        setCurrencyList(Object.keys(FALLBACK_RATES).sort());
      } finally {
        setIsLoading(false);
      }
    };

    fetchRates();
  }, []);

  return { rates, currencyList, isLoading, error, currencyNames: CURRENCY_NAMES };
};