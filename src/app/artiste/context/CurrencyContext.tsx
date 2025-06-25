'use client';

import { createContext, useContext, useState, useMemo, ReactNode, FC, useEffect } from 'react';

// Define the currency types for type safety
export type Currency = 'NGN' | 'USD' | 'EUR';

// Define the shape of the context value
interface CurrencyContextType {
	currency: Currency;
	setCurrency: (currency: Currency) => void;
	convertCurrency: (amount: number, fromCurrency?: Currency) => number;
	isLoadingRates: boolean;
	errorRates: string | null;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Define default rates to be used as a fallback
const defaultExchangeRates: Record<Currency, number> = {
	NGN: 1,
	USD: 1480, // Approximate NGN per USD
	EUR: 1600 // Approximate NGN per EUR
};

export const CurrencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currency, setCurrency] = useState<Currency>('NGN');
	const [exchangeRates, setExchangeRates] = useState<Record<Currency, number> | null>(null);
	const [isLoadingRates, setIsLoadingRates] = useState(true);
	const [errorRates, setErrorRates] = useState<string | null>(null);

	useEffect(() => {
		const API_KEY = 'a9de751973aa562b3a31f5e1';
		const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

		const fetchRates = async () => {
			try {
				const response = await fetch(API_URL);
				if (!response.ok) throw new Error('Failed to fetch live exchange rates.');

				const data = await response.json();
				if (data.result === 'error') throw new Error(data['error-type'] || 'Live API error');

				const ratesFromUSD = data.conversion_rates;
				const ngnPerUSD = ratesFromUSD.NGN;

				// Set rates from live API data
				setExchangeRates({
					NGN: 1,
					USD: ngnPerUSD / ratesFromUSD.USD,
					EUR: ngnPerUSD / ratesFromUSD.EUR
				});
			} catch (error) {
				const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
				console.error('Currency API Error:', errorMessage);
				setErrorRates(`Using fallback rates: ${errorMessage}`); // Inform that fallback is used

				// ==============================================
				// If the fetch fails, set the exchange rates to the hardcoded default values.
				setExchangeRates(defaultExchangeRates);
				// ================================================================
			} finally {
				setIsLoadingRates(false);
			}
		};

		fetchRates();
	}, []);

	const convertCurrency = (amount: number, fromCurrency: Currency = 'NGN'): number => {
		if (!amount || !exchangeRates) return 0;
		const rate = exchangeRates[fromCurrency] / exchangeRates[currency];
		return amount * rate;
	};

	const value = useMemo(
		() => ({
			currency,
			setCurrency,
			convertCurrency,
			isLoadingRates,
			errorRates
		}),
		[currency, isLoadingRates, errorRates, convertCurrency]
	);

	return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = (): CurrencyContextType => {
	const context = useContext(CurrencyContext);
	if (!context) {
		throw new Error('useCurrency must be used within a CurrencyProvider');
	}
	return context;
};
