import APIAxios from '@/utils/axios';
import { toast } from 'sonner';

export const exportArtistCsvByActivityPeriod = async (artistId: string, activityPeriod: string, reportId?: string) => {
	try {
		const params = reportId ? `?reportId=${encodeURIComponent(reportId)}` : '';
		const response = await APIAxios.get(`/admin/export-artist-csv/${artistId}/${encodeURIComponent(activityPeriod)}${params}`, { responseType: 'blob' });

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement('a');
		link.href = url;

		const filename = `artist-revenue-${activityPeriod}.csv`;
		link.setAttribute('download', filename);
		document.body.appendChild(link);
		link.click();
		link.parentNode?.removeChild(link);
		window.URL.revokeObjectURL(url);

		toast.success('Report is downloading!');
	} catch (error) {
		console.error('Failed to export artist CSV:', error);
		toast.error('Could not generate the report. Please try again.');
	}
};
