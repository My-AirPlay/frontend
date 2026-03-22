import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

const fetchAvailablePeriods = async (): Promise<string[]> => {
	const { data } = await APIAxios.get('/admin/available-periods');
	return data;
};

export const useGetAvailablePeriods = () => {
	return useQuery({
		queryKey: ['available-periods'],
		queryFn: fetchAvailablePeriods
	});
};
