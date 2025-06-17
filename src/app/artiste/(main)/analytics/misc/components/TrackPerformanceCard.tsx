/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/currency'; // Your existing function (UNCHANGED)
import { Input } from '@/components/ui/input';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';
import * as React from 'react';

// ======================= THE FIX =======================
// 1. Create a new, small component specifically for displaying the formatted revenue.
const TrackRevenue = ({ amount }: { amount: number }) => {
	const { convertCurrency, currency: contextCurrency } = useCurrency();
	const formattedRevenue = formatCurrency(convertCurrency(amount || 0), contextCurrency);

	return <span className="w-28 text-right">{formattedRevenue}</span>;
};
// =======================================================

export const TrackPerformanceCard = ({ data }: { data: any }) => {
	// All your existing hooks and logic at the top remain the same.
	const [searchTerm, setSearchTerm] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const tracksPerPage = 5;

	const allTracks = useMemo(() => data?.trackPerformance || [], [data?.trackPerformance]);

	const filteredTracks = useMemo(() => {
		if (!searchTerm) return allTracks;
		return allTracks.filter((track: any) => track.trackTitle.toLowerCase().includes(searchTerm.toLowerCase()));
	}, [allTracks, searchTerm]);

	const paginatedTracks = useMemo(() => {
		const startIndex = (currentPage - 1) * tracksPerPage;
		return filteredTracks.slice(startIndex, startIndex + tracksPerPage);
	}, [filteredTracks, currentPage, tracksPerPage]);

	const totalPages = Math.ceil(filteredTracks.length / tracksPerPage);

	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	return (
		<Card className="col-span-1 lg:col-span-2">
			<CardHeader>
				<CardTitle>Track Performance</CardTitle>
				<CardDescription>
					Search and view performance across all your tracks. Showing {filteredTracks.length} of {allTracks.length} tracks.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<Input placeholder="Search for a track..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mb-4" />

					<div className="space-y-3">
						{paginatedTracks.length > 0 ? (
							paginatedTracks.map((track: any) => (
								<div key={track.trackTitle} className="p-3 rounded-lg border hover:bg-muted/50">
									<div className="flex justify-between items-center font-semibold">
										<span className="truncate pr-4">{track.trackTitle}</span>
										<div className="flex space-x-4 text-right">
											<span>{track.totalStreams.toLocaleString()} streams</span>

											{/* 3. Use the new component inside the loop */}
											<TrackRevenue amount={track.totalRevenue} />
										</div>
									</div>
								</div>
							))
						) : (
							<p className="text-center text-muted-foreground py-4">No tracks found.</p>
						)}
					</div>

					{/* Pagination Controls ... */}
					{totalPages > 1 && <div className="flex justify-center items-center space-x-2 pt-4">{/* ... buttons ... */}</div>}
				</div>
			</CardContent>
		</Card>
	);
};
