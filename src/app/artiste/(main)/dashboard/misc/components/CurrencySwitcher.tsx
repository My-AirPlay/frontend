'use client';

import { FC, useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Currency, useCurrency } from '@/app/artiste/context/CurrencyContext';

const normalizeCurrency = (currency?: string | null): Currency => {
	switch (currency?.toLowerCase()) {
		case 'naira':
		case 'ngn':
			return 'NGN';
		case 'dollar':
		case 'usd':
			return 'USD';
		case 'euro':
		case 'eur':
			return 'EUR';
		case 'pounds':
		case 'gbp':
			return 'GBP';
		default:
			return 'NGN';
	}
};
export const CurrencySwitcher: FC = () => {
	const { setCurrency } = useCurrency();
	const { artist } = useAuthContext();
	const artistCurrency = artist?.bankDetails?.currency;
	useEffect(() => {
		const currencyToSet = normalizeCurrency(artistCurrency);

		setCurrency(currencyToSet as Currency);
	}, [artistCurrency, setCurrency]);

	const displayCurrency = normalizeCurrency(artistCurrency);
	return <div className="flex h-10 w-28 items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">{displayCurrency}</div>;
};
