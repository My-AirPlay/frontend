/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/currency';
import { cn } from '@/lib/utils';
import { TrackPerformance } from '@/app/artiste/(main)/dashboard/misc/api';

export const TrackPerformanceCard = ({ data }: { data: any }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const tracks = useMemo(() => data?.trackPerformance || [], [data?.trackPerformance]);

	useEffect(() => {
		if (!tracks.length) return;
		const interval = setInterval(() => {
			setActiveIndex(prev => (prev + 1) % tracks.length);
		}, 4000);
		return () => clearInterval(interval);
	}, [tracks]);

	const current = tracks[activeIndex] as TrackPerformance;

	return (
		<Card className="col-span-1 lg:col-span-2">
			<CardHeader>
				<CardTitle>Track Performance</CardTitle>
				<CardDescription>{current?.trackTitle}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					{/* Stats */}
					<div className="grid grid-cols-2 gap-4">
						<div>
							<h3 className="text-sm lg:text-xl font-semibold text-muted-foreground">Total Streams</h3>
							<p className="text-xl font-bold">{current?.totalStreams.toLocaleString()}</p>
						</div>
						<div>
							<h3 className="text-sm lg:text-xl font-semibold text-muted-foreground">Total Revenue</h3>
							<p className="text-xl font-bold">{formatCurrency(current?.totalRevenue || 0)}</p>
						</div>
					</div>

					{/* Monthly Breakdown */}
					<div>
						<h3 className="text-sm lg:text-xl font-semibold text-muted-foreground mb-2">Monthly Performance</h3>
						<div className="space-y-2">
							{Object.entries(current?.periodBreakdown || {})
								.sort((a, b) => {
									const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
									const aMonth = a[0].split(' ')[0];
									const bMonth = b[0].split(' ')[0];
									return months.indexOf(bMonth) - months.indexOf(aMonth);
								})
								.map(([period, details]) => (
									<div key={period} className="flex justify-between items-center">
										<span className="text-sm">{period}</span>
										<div className="flex space-x-4">
											<span className="text-sm">{details.streams.toLocaleString()} streams</span>
											<span className="text-sm lg:text-xl font-semibold">{formatCurrency(details.revenue)}</span>
										</div>
									</div>
								))}
						</div>
					</div>
					{/* Navigation dots */}
					{tracks.length > 1 && (
						<div className="flex justify-center space-x-2 mb-2">
							{tracks.map((_: any, idx: number) => (
								<button key={idx} onClick={() => setActiveIndex(idx)} className={cn('w-3 h-3 rounded-full', activeIndex === idx ? 'bg-primary' : 'bg-muted hover:bg-muted-foreground/50')} aria-label={`View track ${idx + 1}`} />
							))}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
