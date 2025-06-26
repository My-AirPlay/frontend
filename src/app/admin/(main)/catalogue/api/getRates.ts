import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

export const getRates = async () => {
	const response = await APIAxios.get(`/admin/get_rates`);
	return response.data;
};

export const useGetRates = () => {
	return useQuery({
		queryKey: ['getRates'],
		queryFn: () => getRates(),
		staleTime: 1000 * 60 * 30,
		refetchOnWindowFocus: false,
		retry: false
	});
};
