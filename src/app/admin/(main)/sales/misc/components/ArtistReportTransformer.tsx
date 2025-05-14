import React from 'react';
import { ReportItem, FullReport } from '@/lib/types';

interface ArtistReport {
	artistId: string | null;
	artistName: string;
	activityPeriod: string;
	fullReports: FullReport[];
}

interface ArtistReportTransformerProps {
	reportItems: ReportItem[] | null;
}

const ArtistReportTransformer: React.FC<ArtistReportTransformerProps> = ({ reportItems }) => {
	if (!reportItems) {
		return null;
	}

	// Group reports by artistName
	const groupedReports: { [artistName: string]: ReportItem[] } = (reportItems || []).reduce((acc: { [artistName: string]: ReportItem[] }, item: ReportItem) => {
		const artistName = item.artistName;
		if (!acc[artistName]) {
			acc[artistName] = [];
		}
		acc[artistName].push(item);
		return acc;
	}, {});

	// Transform grouped reports into ArtistReport[]
	const artistReports: ArtistReport[] = Object.entries(groupedReports).map(([artistName, reports]) => {
		// Determine if the artist is matched or unmatched based on the presence of artistId
		const isMatched = reports.some(report => report.artistId);

		return {
			artistId: isMatched ? reports[0].artistId : null, // Use the artistId from the first report if matched
			artistName: artistName,
			activityPeriod: reports[0].activityPeriod, // Use activityPeriod from the first report
			fullReports: reports.map(report => report.fullReports).flat() as FullReport[]
		};
	});

	return (
		<React.Fragment>
			{artistReports.map((report, index) => (
				<div key={index}></div>
			))}
		</React.Fragment>
	); // Return the transformed data
};

export default ArtistReportTransformer;
