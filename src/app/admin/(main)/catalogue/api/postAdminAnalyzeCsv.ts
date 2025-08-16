import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

interface CurrencyPair {
	fromCurrency: string | null;
	toCurrency: string | null;
	exchangeRate: number | null;
}

export const analyzeCsv = async (file: File, exchangeRates: CurrencyPair[], tag: string, reportingPeriod: string) => {
	const payload = new FormData();
	payload.append('file', file);
	payload.append('exchangeRates', JSON.stringify(exchangeRates));
	payload.append('tag', tag);
	payload.append('reportingPeriod', reportingPeriod);

	const response = await APIAxios.post(`/admin/analyze_csv`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const useAdminAnalyzeCsv = () => {
	return useMutation({
		mutationFn: ({ file, exchangeRates, tag, reportingPeriod }: { file: File; exchangeRates: CurrencyPair[]; tag: string; reportingPeriod: string }) => analyzeCsv(file, exchangeRates, tag, reportingPeriod),
		onSuccess: data => {
			console.log('CSV analyzed successfully:', data);
		},
		onError: error => {
			console.error('Error analyzing CSV:', error);
		}
	});
};
