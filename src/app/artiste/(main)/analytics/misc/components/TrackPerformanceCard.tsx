/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/utils/currency';
import { Input } from '@/components/ui/input';
import { useCurrency } from '@/app/artiste/context/CurrencyContext';
import { Button } from '@/components/ui'; // Assuming Button is in this path

// =======================================================
// This is a great pattern! No changes needed here.
// It isolates the currency conversion logic.
const TrackRevenue = ({ amount }: { amount: number }) => {
	const { convertCurrency, currency: contextCurrency } = useCurrency();
	const formattedRevenue = formatCurrency(convertCurrency(amount || 0), contextCurrency);

	return <span className="w-28 text-right">{formattedRevenue}</span>;
};
// =======================================================

export const TrackPerformanceCard = ({ data }: { data: any }) => {
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

	// Reset to page 1 whenever the search term changes
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	// --- PAGINATION HANDLERS ---
	const handleNextPage = () => {
		setCurrentPage(prev => Math.min(prev + 1, totalPages));
	};
	const handlePrevPage = () => {
		setCurrentPage(prev => Math.max(prev - 1, 1));
	};

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
									{/* CHANGE: This container now stacks on mobile and is a row on larger screens */}
									<div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center font-semibold">
										<span className="truncate pr-4">{track.trackTitle}</span>

										{/* CHANGE: This sub-container also adapts for better mobile layout */}
										<div className="flex items-center justify-between text-sm sm:justify-end sm:space-x-4 sm:text-right w-full sm:w-auto">
											<span className="text-muted-foreground">{track.totalStreams.toLocaleString()} streams</span>
											<TrackRevenue amount={track.totalRevenue} />
										</div>
									</div>
								</div>
							))
						) : (
							<p className="text-center text-muted-foreground py-4">No tracks found.</p>
						)}
					</div>

					{/* CHANGE: Implemented pagination controls */}
					{totalPages > 1 && (
						<div className="flex justify-center items-center space-x-3 pt-4">
							<Button onClick={handlePrevPage} disabled={currentPage === 1} variant="outline" size="sm">
								Previous
							</Button>
							<span className="text-sm text-muted-foreground">
								Page {currentPage} of {totalPages}
							</span>
							<Button onClick={handleNextPage} disabled={currentPage === totalPages} variant="outline" size="sm">
								Next
							</Button>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
};
