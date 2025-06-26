'use client';

import { createContext, useContext, useState, useMemo, ReactNode, FC, useEffect } from 'react';
import { useGetRates } from '@/app/admin/(main)/catalogue/api/getRates';

// Define the currency types for type safety
export type Currency = 'NGN' | 'USD' | 'EUR' | 'GBP';

// Define the shape of the context value
interface CurrencyContextType {
	currency: Currency;
	setCurrency: (currency: Currency) => void;
	convertCurrency: (amount: number, fromCurrency?: Currency) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Define default rates to be used as a fallback
const defaultExchangeRates: Record<Currency, number> = {
	NGN: 1,
	USD: 1480, // Approximate NGN per USD
	EUR: 2600, // Approximate NGN per EUR
	GBP: 2300
};

export const CurrencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currency, setCurrency] = useState<Currency>('NGN');
	const { data: ratesData } = useGetRates();
	console.log(ratesData);
	const [exchangeRates, setExchangeRates] = useState<Record<Currency, number> | null>(defaultExchangeRates);

	useEffect(() => {
		const rates = ratesData?.rates;
		if (rates) {
			setExchangeRates({
				NGN: 1,
				USD: rates.USD,
				EUR: rates.EUR,
				GBP: rates.GBP ?? 2300
			});
		}
	}, [ratesData]);

	const convertCurrency = (amount: number, fromCurrency: Currency = 'NGN'): number => {
		if (!amount || !exchangeRates) return 0;
		console.log(`converting from ${fromCurrency}`);
		return amount / exchangeRates[currency];
	};

	const value = useMemo(
		() => ({
			currency,
			setCurrency,
			convertCurrency
		}),
		[currency, convertCurrency]
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
