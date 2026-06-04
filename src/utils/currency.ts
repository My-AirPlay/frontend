/**
 * Converts a number to Nigerian Naira currency format.
 *
 * @param amount - The number to be converted.
 * @param includeCurrency - Whether to include the currency in the output.
 * @returns The converted amount in the desired format.
 */
export const convertNumberToNaira = (amount: number, includeCurrency = true) => {
	if (includeCurrency) {
		return new Intl.NumberFormat('en-NG', {
			style: 'currency',
			currency: 'NGN'
		}).format(amount);
	} else {
		return new Intl.NumberFormat('en-NG', {
			style: 'decimal',
			maximumFractionDigits: 2
		}).format(amount);
	}
};

export type SupportedCurrency = 'NGN' | 'USD' | 'EUR' | 'GBP';
export function getLocaleForCurrency(currency: SupportedCurrency): string {
	switch (currency) {
		case 'NGN':
			return 'en-NG';
		case 'USD':
			return 'en-US';
		case 'EUR':
			return 'en-GB'; // Common locale for EUR
		case 'GBP':
			return 'en-GB';
		default:
			return 'en-NG';
	}
}
export function formatCurrency(amount: number, currency?: SupportedCurrency): string {
	const locale = getLocaleForCurrency(currency || 'USD');
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
		minimumFractionDigits: 2
	}).format(amount);
}

/**
 * The symbol used to prefix raw amount inputs for a given currency.
 */
export function getCurrencySymbol(currency?: SupportedCurrency): string {
	switch (currency) {
		case 'USD':
			return '$';
		case 'EUR':
			return '€';
		case 'GBP':
			return '£';
		case 'NGN':
		default:
			return '₦';
	}
}

/**
 * Normalize a free-form currency string (e.g. from artist bank details) to a
 * SupportedCurrency. Mirrors the backend AdminService.normalizeCurrency.
 */
export function normalizeCurrency(currency?: string | null): SupportedCurrency {
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
}

/**
 * NGN-per-unit base rate for a currency. Mirrors the backend
 * AdminService.getBaseRate so amounts scale consistently with what is stored.
 */
export function getBaseRate(currency?: string | null): number {
	switch (currency?.toLowerCase()) {
		case 'dollar':
		case 'usd':
			return 1610;
		case 'euro':
		case 'eur':
			return 1365;
		case 'pounds':
		case 'gbp':
			return 2300;
		default:
			return 1;
	}
}

/**
 * Convert an NGN-stored amount into the artist's payout currency, preferring the
 * exchange rate captured on the slip and falling back to the base rate.
 */
export function scaleNgnToCurrency(ngnAmount: number, currency: SupportedCurrency, slipExchangeRate?: number): number {
	if (currency === 'NGN') return ngnAmount;
	const rate = slipExchangeRate && slipExchangeRate !== 1 ? slipExchangeRate : getBaseRate(currency);
	return ngnAmount / rate;
}
