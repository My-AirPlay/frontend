import APIAxios from '@/utils/axios';
import { useMutation } from '@tanstack/react-query';

interface CurrencyPair {
	fromCurrency: string | null;
	toCurrency: string | null;
	exchangeRate: string;
}

export const analyzeCsv = async (file: File, exchangeRates: CurrencyPair[]) => {
	const payload = new FormData();
	payload.append('file', file);
	payload.append('exchangeRates', JSON.stringify(exchangeRates));

	const response = await APIAxios.post(`/admin/analyze_csv`, payload, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});

	return response.data;
};

export const useAdminAnalyzeCsv = () => {
	return useMutation({
		mutationFn: ({ file, exchangeRates }: { file: File; exchangeRates: CurrencyPair[] }) => analyzeCsv(file, exchangeRates),
		onSuccess: data => {
			console.log('CSV analyzed successfully:', data);
		},
		onError: error => {
			console.error('Error analyzing CSV:', error);
		}
	});
};
