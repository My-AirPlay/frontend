import React, { useState, useMemo } from 'react';
import { Loader2, Download } from 'lucide-react';
import { formatCurrency } from '@/utils/currency';
import { useParams } from 'next/navigation';
import { useGetArtistAnalytics } from '../../../catalogue/api/getArtistAnalytics';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { exportArtistCsvByActivityPeriod } from '@/app/admin/(main)/catalogue/api/exportArtistCsv';

// Define interfaces for the delivery breakdown structure
interface PeriodBreakdownItem {
	streams: number;
	revenue: number;
	netRevenue: number;
}

interface DeliveryPlatformData {
	totalStreams: number;
	totalRevenue: number;
	periodBreakdown: {
		[period: string]: PeriodBreakdownItem;
	};
}

interface DeliveryBreakdown {
	[platform: string]: DeliveryPlatformData;
}

// Removed MediaItemProps and MediaItem component as they are no longer needed

const ArtistOverview: React.FC = ({}) => {
	const { artist_id } = useParams<{ artist_id: string }>();
	const { data: artistAnalytics, isLoading: artistAnalyticsLoading } = useGetArtistAnalytics({
		artistId: artist_id
	});
	const { convertCurrency, currency: contextCurrency } = useCurrency();

	// Export CSV state
	const [exportDialogOpen, setExportDialogOpen] = useState(false);
	const [selectedPeriod, setSelectedPeriod] = useState<string>('');
	const [isExportingCsv, setIsExportingCsv] = useState(false);

	// Extract unique activity periods from analytics periodSummary
	const activityPeriods = useMemo(() => {
		if (!artistAnalytics?.periodSummary) return [];
		return Object.keys(artistAnalytics.periodSummary).sort();
	}, [artistAnalytics]);

	const handleExportCsv = async () => {
		if (!selectedPeriod) return;
		setIsExportingCsv(true);
		await exportArtistCsvByActivityPeriod(artist_id, selectedPeriod);
		setIsExportingCsv(false);
		setExportDialogOpen(false);
		setSelectedPeriod('');
	};

	return (
		<div className="space-y-8">
			{/* Export CSV Button */}
			<div className="flex justify-end">
				<Button variant="secondary" onClick={() => setExportDialogOpen(true)} disabled={activityPeriods.length === 0 || artistAnalyticsLoading}>
					<Download className="w-4 h-4 mr-2" />
					Export CSV
				</Button>
			</div>

			{/* Export CSV Dialog */}
			<Dialog open={exportDialogOpen} onOpenChange={setExportDialogOpen}>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Export Revenue CSV</DialogTitle>
						<DialogDescription>Select an activity period to export the revenue report.</DialogDescription>
					</DialogHeader>
					<div className="py-4">
						<Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select activity period" />
							</SelectTrigger>
							<SelectContent>
								{activityPeriods.map(period => (
									<SelectItem key={period} value={period}>
										{period}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button variant="outline" onClick={() => setExportDialogOpen(false)} disabled={isExportingCsv}>
							Cancel
						</Button>
						<Button onClick={handleExportCsv} disabled={!selectedPeriod || isExportingCsv}>
							{isExportingCsv ? (
								<>
									<Loader2 className="w-4 h-4 mr-2 animate-spin" />
									Exporting...
								</>
							) : (
								<>
									<Download className="w-4 h-4 mr-2" />
									Export
								</>
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{artistAnalyticsLoading ? (
				// Display a single loading indicator for the whole overview
				<div className="flex items-center justify-center p-8 text-admin-muted rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Loading Artist Overview...
				</div>
			) : !artistAnalytics?.deliveryBreakdown || Object.keys(artistAnalytics.deliveryBreakdown).length === 0 ? (
				// Display a single message if no data is available
				<div className="p-8 text-center text-admin-muted rounded-lg border-[0.5px] border-[#383838] bg-[#1f1f1f]">No delivery breakdown data available for this artist.</div>
			) : (
				// Map each platform to its own section
				Object.entries(artistAnalytics.deliveryBreakdown as DeliveryBreakdown).map(([platform, data]) => (
					<section key={platform} className="flex flex-col rounded-lg border-[0.5px] border-[#383838]">
						<header className="flex justify-between items-center bg-[#27272766] p-4">
							{' '}
							{/* Original header style */}
							<h3 className="text-md font-semibold bg-admin-primary/10 text-admin-primary px-3 py-1 rounded">
								{' '}
								{/* Original title style */}
								{platform} {/* Platform name as the title */}
							</h3>
							{/* Optional: Add View All button if needed later */}
						</header>

						<div className="p-4 space-y-4">
							{' '}
							{/* Content area for this platform */}
							{/* Totals */}
							<div className="bg-admin-secondary/50 rounded-md p-3 space-y-1 border border-[#383838]/50">
								<h4 className="text-sm font-medium uppercase text-admin-muted/80 mb-1">Totals</h4>
								<p className="text-sm">
									<span className="font-medium">Streams:</span> <span className="text-admin-muted">{data.totalStreams.toLocaleString()}</span>
								</p>
								<p className="text-sm">
									<span className="font-medium">Revenue:</span> <span className="text-admin-accent">{formatCurrency(convertCurrency(data.totalRevenue), contextCurrency)}</span>
								</p>
							</div>
							{/* Period Breakdown */}
							<div className="bg-admin-secondary/50 rounded-md p-3 space-y-2 border border-[#383838]/50">
								<h4 className="text-sm font-medium uppercase text-admin-muted/80 mb-2">Period Breakdown</h4>
								{Object.keys(data.periodBreakdown).length > 0 ? (
									Object.entries(data.periodBreakdown).map(([period, periodData]: [string, PeriodBreakdownItem]) => (
										<div key={period} className="text-xs border-b border-[#383838]/50 pb-2 mb-2 last:border-b-0 last:pb-0 last:mb-0">
											<p className="font-medium mb-0.5">{period}</p>
											<p>
												<span className="text-admin-muted/90">Streams:</span> {periodData.streams.toLocaleString()}
											</p>
											<p>
												<span className="text-admin-muted/90">Gross Revenue:</span> <span className={periodData.revenue >= 0 ? 'text-green-400' : 'text-red-400'}>{formatCurrency(convertCurrency(periodData.revenue), contextCurrency)}</span>
											</p>
											<p>
												<span className="text-admin-muted/90">Net Revenue:</span> <span className={periodData.revenue >= 0 ? 'text-green-400' : 'text-red-400'}>{formatCurrency(convertCurrency(periodData.netRevenue), contextCurrency)}</span>
											</p>
										</div>
									))
								) : (
									<p className="text-xs text-admin-muted/80 italic">No period breakdown available.</p>
								)}
							</div>
						</div>
					</section>
				))
			)}
		</div>
	);
};

export default ArtistOverview;
