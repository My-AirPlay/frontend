'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FC } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Currency, useCurrency } from '@/app/artiste/context/CurrencyContext';

export const CurrencySwitcher: FC = () => {
	const { currency, setCurrency } = useCurrency();
	const { artist } = useAuthContext();

	// Safely get the artist's preferred currency
	const artistCurrency = artist?.bankDetails?.currency;

	const handleValueChange = (value: string) => {
		// We cast here to ensure type safety with the context
		setCurrency(value as Currency);
	};

	return (
		<Select value={currency} onValueChange={handleValueChange}>
			<SelectTrigger className="w-28">
				<SelectValue placeholder="Currency" />
			</SelectTrigger>
			<SelectContent>
				{/* The base currency is always available */}
				<SelectItem value="NGN">NGN</SelectItem>

				{/* --- This is the change --- */}
				{/* Conditionally render the artist's currency if it exists and is not NGN */}
				{artistCurrency && artistCurrency !== 'NGN' && <SelectItem value={artistCurrency}>{artistCurrency}</SelectItem>}
			</SelectContent>
		</Select>
	);
};
