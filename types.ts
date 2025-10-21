export interface ExchangeRates {
  [key: string]: number;
}

/**
 * Defines the structure of the response from the Frankfurter API.
 * @see https://www.frankfurter.app/docs/
 */
export interface FrankfurterResponse {
  amount: number;
  base: string;
  date: string;
  rates: ExchangeRates;
}

/**
 * Defines the structure for the currency code to Arabic name mapping.
 */
export interface CurrencyNames {
  [key: string]: string;
}
