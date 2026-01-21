import APIAxios from '@/utils/axios';
import { useQuery } from '@tanstack/react-query';

// Types for reports by activity period
export interface ReportByPeriod {
	_id: string;
	name: string;
	reportId: string;
	artistNames: string[];
	netRevenue: number;
	grossRevenue: number;
	trackCount: number;
	createdAt: string;
	status: 'Complete' | 'Incomplete' | 'Pending';
	activityPeriod: string;
}

export interface ReportsByPeriodResponse {
	data: ReportByPeriod[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	summary: {
		totalNetRevenue: number;
		totalGrossRevenue: number;
		totalTracks: number;
		totalArtists: number;
	};
}

export interface ReportsByPeriodParams {
	activityPeriod: string;
	page?: number;
	limit?: number;
}

export const getReportsByPeriod = async (params: ReportsByPeriodParams): Promise<ReportsByPeriodResponse> => {
	// Fetch both the grouped data (for summary/totals) and individual reports in parallel
	const [groupedResponse, reportsResponse] = await Promise.all([
		APIAxios.get('/admin/sales-history/grouped', {
			params: {
				activityPeriod: params.activityPeriod,
				page: 1,
				limit: 1
			}
		}),
		APIAxios.get('/admin/get_published_reports', {
			params: {
				activityPeriod: params.activityPeriod,
				page: params.page || 1,
				limit: params.limit || 50
			}
		})
	]);

	// Get the summary from the grouped response
	const groupedData = groupedResponse.data?.data?.[0] || groupedResponse.data?.[0] || {};

	const summary = {
		totalNetRevenue: Number(groupedData.netRevenue || groupedData.totalNetRevenue || 0),
		totalGrossRevenue: Number(groupedData.grossRevenue || groupedData.totalGrossRevenue || 0),
		totalTracks: Number(groupedData.trackCount || groupedData.totalTracks || 0),
		totalArtists: groupedData.artistNames?.length || groupedData.totalArtists || 0
	};

	// Handle different response structures for reports
	let reports: Record<string, unknown>[] = [];
	if (Array.isArray(reportsResponse.data)) {
		reports = reportsResponse.data;
	} else if (reportsResponse.data?.data && Array.isArray(reportsResponse.data.data)) {
		reports = reportsResponse.data.data;
	} else if (reportsResponse.data?.reports && Array.isArray(reportsResponse.data.reports)) {
		reports = reportsResponse.data.reports;
	}

	// Transform the reports
	const transformedReports = reports.map((report: Record<string, unknown>) => {
		const artists = report.artistNames ?? report.artist_names ?? report.artists ?? [];

		return {
			_id: (report._id || report.id || '') as string,
			name: (report.name || report.reportName || report.report_name || 'Unnamed Report') as string,
			reportId: (report.reportId || report.report_id || report._id || report.id || '') as string,
			artistNames: (Array.isArray(artists) ? artists : []) as string[],
			netRevenue: 0, // Individual reports don't have revenue - it's calculated in analytics
			grossRevenue: 0,
			trackCount: Number(report.trackCount || report.track_count || 0),
			createdAt: (report.createdAt || report.created_at || '') as string,
			status: (report.status || 'Complete') as 'Complete' | 'Incomplete' | 'Pending',
			activityPeriod: (report.activityPeriod || report.activity_period || params.activityPeriod) as string
		};
	});

	return {
		data: transformedReports,
		total: reportsResponse.data?.total || transformedReports.length,
		page: reportsResponse.data?.page || params.page || 1,
		limit: reportsResponse.data?.limit || params.limit || 50,
		totalPages: reportsResponse.data?.totalPages || Math.ceil(transformedReports.length / (params.limit || 50)) || 1,
		summary
	};
};

export const useGetReportsByPeriod = (params: ReportsByPeriodParams, enabled: boolean = true) => {
	return useQuery({
		queryKey: ['reportsByPeriod', params.activityPeriod, params.page, params.limit],
		queryFn: () => getReportsByPeriod(params),
		enabled: enabled && !!params.activityPeriod
	});
};
