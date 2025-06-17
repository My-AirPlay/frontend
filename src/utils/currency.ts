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
		currency: 'NGN',
		minimumFractionDigits: 2
	}).format(amount);
}
