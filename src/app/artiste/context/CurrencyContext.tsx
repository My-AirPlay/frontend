'use client';

import { createContext, useContext, useState, useMemo, ReactNode, FC } from 'react';

// Define the currency types for type safety
export type Currency = 'NGN' | 'USD' | 'EUR';

// Define the shape of the context value
interface CurrencyContextType {
	currency: Currency;
	setCurrency: (currency: Currency) => void;
	convertCurrency: (amount: number, fromCurrency?: Currency) => number;
}

// In a real app, you would fetch these from an API.
const exchangeRates: Record<Currency, number> = {
	NGN: 1,
	USD: 1 / 1450,
	EUR: 1 / 1600
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [currency, setCurrency] = useState<Currency>('NGN');

	const convertCurrency = (amount: number, fromCurrency: Currency = 'NGN'): number => {
		if (!amount) return 0;
		const rate = exchangeRates[currency] / exchangeRates[fromCurrency];
		return amount * rate;
	};

	const value = useMemo(
		() => ({
			currency,
			setCurrency,
			convertCurrency
		}),
		[currency]
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
