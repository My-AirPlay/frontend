/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useGetReprocessData } from '@/app/admin/(main)/catalogue/api/postAdminAnalyzeCsv';
import { useParams, useRouter } from 'next/navigation';
import { ReportItem, SharedRevenue } from '@/lib/types';
import { toast } from 'sonner';
import { Button, PreviousPageButton } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';

// Import the necessary components from your Sales page
import MatchedArtistsTable from '@/app/admin/(main)/sales/misc/components/MatchedArtistsTable';
import UnmatchedArtistsTable from '@/app/admin/(main)/sales/misc/components/UnmatchedArtistsTable';
import MatchArtistForm from '@/app/admin/(main)/sales/misc/components/MatchArtistForm';
import CreateArtistForm from '@/app/admin/(main)/sales/misc/components/CreateArtistForm';
import RevenueShareForm from '@/app/admin/(main)/sales/misc/components/RevenueShareForm';
import SendEmailsToArtistsTable from '@/app/admin/(main)/sales/misc/components/SendEmailsToArtistsTable';
import { AxiosError } from 'axios';
import { usePublishArtistReports, useSendEmailReports } from '@/app/admin/(main)/catalogue/api/matchArtistReports';
import { AnimatePresence } from 'framer-motion';
import { PublishingOverlay } from '@/app/admin/(main)/artist-revenue/misc/components/LoadingOverlay';
import SuccessModal from '@/app/admin/(main)/sales/misc/components/SuccessModal';
// ... import other necessary components and hooks (MatchArtistForm, usePublishArtistReports, etc.)

interface createdArtistProp {
	artistName: string;
	fullName: string;
}
interface ApiResponse {
	success: boolean;
	message?: string;
	data?: unknown;
}
const ReprocessSalesPage: React.FC = () => {
	const router = useRouter();
	const params = useParams();
	const reportId = decodeURIComponent(params.reportId as string);

	// State for the UI, starting at the 'artist-records' step
	const [currentStep, setCurrentStep] = useState('artist-records');
	const [matchedArtists, setMatchedArtists] = useState<ReportItem[]>([]);
	const [unmatchedArtists, setUnmatchedArtists] = useState<ReportItem[]>([]);
	const [selectedRows, setSelectedRows] = useState<ReportItem[]>([]);
	const [selectedMatchRows, setSelectedMatchRows] = useState<ReportItem[]>([]);
	const [selectedUnmatchedArtist, setSelectedUnmatchedArtist] = useState<string | null>(null);
	const [systemArtistIdForMatch, setSystemArtistIdForMatch] = useState<string | null>(null);
	const [systemArtistNameForMatch, setSystemArtistNameForMatch] = useState<string | null>(null);
	const [activityPeriod, setActivityPeriod] = useState<string>('');
	const [currentReportTag, setCurrentReportTag] = useState<string | null>(null);
	const [showSuccessModal, setShowSuccessModal] = useState<'created' | 'matched' | null>(null);
	const [loadingComplete, setLoadingComplete] = useState(false);
	const [createdArtist, setCreatedArtist] = useState<createdArtistProp>({ artistName: '', fullName: '' });
	const [reportingPeriod, setReportingPeriod] = useState<string | null>(null);
	// setCurrentReportTag(reportId);

	// Fetch the initial data using the reportId from the URL
	const { data: initialData, isLoading, error } = useGetReprocessData(reportId);

	// This effect runs once the data is fetched
	useEffect(() => {
		if (initialData) {
			const transformedArtistReports: ReportItem[] = initialData.map(item => ({
				...item,
				// Conditionally set the sharedRevenue array
				sharedRevenue:
					item.sharedRevenue && item.sharedRevenue.length > 0
						? item.sharedRevenue // <-- Use existing data if it's there
						: [
								// <-- Otherwise, create the default
								{
									artistId: item.artistId || null,
									artistName: item.artistRealName || item.artistName || 'Unknown Artist',
									activityPeriod: item.activityPeriod || 'Unknown Period',
									percentage: 100
								}
							]
			}));
			console.log(transformedArtistReports);

			const unmatched = transformedArtistReports.filter(ar => !ar.artistId);
			const matched = transformedArtistReports.filter(ar => ar.artistId);
			setCurrentReportTag(reportId);
			setUnmatchedArtists(unmatched);
			setMatchedArtists(matched);
			setReportingPeriod(matched[0].activityPeriod);
			toast.success('Report data loaded successfully.');
		}
		if (error) {
			toast.error('Failed to load report data.');
		}
	}, [initialData, error, setMatchedArtists, setUnmatchedArtists]);

	const handleBulkArtistMatch = () => {
		setCurrentStep('match-artist');
	};

	const handleRevenueShare = (row: any) => {
		setSelectedUnmatchedArtist(row._id);
		setActivityPeriod(row.activityPeriod);
		setCurrentStep('add-revenue-share');
	};

	const handleCloseSuccessModal = () => {
		setShowSuccessModal(null);
		setCurrentStep('artist-records');
		const idsToMove = selectedMatchRows.length > 0 ? selectedMatchRows.map(row => row._id) : selectedUnmatchedArtist ? [selectedUnmatchedArtist] : [];

		// Proceed only if there are artists to move and a system artist to match them to.
		if (idsToMove.length > 0 && systemArtistIdForMatch) {
			// 1. Find all the full artist objects from the unmatched list that correspond to the selected IDs.
			const artistsToMove = unmatchedArtists.filter(artist => idsToMove.includes(artist._id));

			// 2. Create the new data structure for each artist being moved.
			const newMatchedArtists = artistsToMove.map(reportItem => ({
				...reportItem,
				artistId: systemArtistIdForMatch,
				status: 'completed' as const,
				sharedRevenue: [
					{
						artistId: systemArtistIdForMatch,
						artistName: systemArtistNameForMatch || reportItem.artistName || null,
						activityPeriod: reportItem.activityPeriod || null,
						percentage: 100
					}
				]
			}));

			// 3. Update state in bulk for better performance.
			// Remove all moved artists from the unmatched list.
			setUnmatchedArtists(currentUnmatched => currentUnmatched.filter(artist => !idsToMove.includes(artist._id)));

			// Add all newly matched artists to the matched list.
			setMatchedArtists(currentMatched => [...currentMatched, ...newMatchedArtists]);

			if (artistsToMove.length !== idsToMove.length) {
				console.warn('Could not find all selected artists to move.');
			}
		} else {
			console.warn('Missing artists to move or systemArtistIdForMatch in handleCloseSuccessModal.');
		}

		// Reset state for both single and multiple selection modes.
		setShowSuccessModal(null);
		setCurrentStep('artist-records');
		setSelectedUnmatchedArtist(null);
		setSelectedMatchRows([]);
		setSystemArtistIdForMatch(null);
		setSystemArtistNameForMatch(null);
	};

	const handleMatchArtist = (systemArtistId: string, systemArtistName: string) => {
		console.log('Matched with system artist name:', systemArtistName);
		console.log('Matched with system artist ID:', systemArtistId);
		setSystemArtistIdForMatch(systemArtistId);
		setSystemArtistNameForMatch(systemArtistName);
		setShowSuccessModal('matched');
	};

	const handleOnSave = (value: SharedRevenue[]) => {
		setCurrentStep('artist-records');
		const newMatchedArtist = matchedArtists.find(artist => artist._id === selectedUnmatchedArtist);
		if (newMatchedArtist) {
			newMatchedArtist.sharedRevenue = value;
		}

		setSelectedUnmatchedArtist(null);
		setSystemArtistIdForMatch(null);
		setSystemArtistNameForMatch(null);
	};

	const handleSelectionMatchChange = useCallback((selectedData: ReportItem[]) => {
		setSelectedMatchRows(selectedData);
	}, []);

	const handleSaveArtist = (artistData: any) => {
		console.log('New artist data:', artistData);
		setCreatedArtist(artistData);
		// Here we would call an API to create the artist
		setShowSuccessModal('created');
	};

	// --- COPY a streamlined version of your handler functions from Sales.tsx ---
	// e.g., handleArtistMatch, handleCloseSuccessModal, publishArtists, etc.
	// You can remove handlers related to the first two steps (exchange rates, upload).
	// const { mutate: publishCsv } = usePublishArtistReports();
	// const publishArtists = async () => { /* ... your publish logic ... */ };
	const handleArtistMatch = (row: any) => {
		setSelectedUnmatchedArtist(row._id);
		setActivityPeriod(row.activityPeriod);
		setCurrentStep('match-artist');
	};

	const handleSelectionChange = useCallback((selectedData: ReportItem[]) => {
		setSelectedRows(selectedData);
	}, []);
	const handleCreateNewArtist = () => {
		console.log('clicked');
		setCurrentStep('create-artist');
	};
	const { mutate: publishCsv } = usePublishArtistReports();
	const { mutate: sendEmails } = useSendEmailReports();

	const handleSendEmails = async (rows: any) => {
		if (selectedRows.length === 0) {
			toast.info('No matched artists to send emails.');
			return;
		}

		const artistIdsToPublish = rows.map((artist: any) => artist.artistId);
		sendEmails(
			{ artistIds: artistIdsToPublish, activityPeriod: reportingPeriod as string },
			{
				onSuccess: (data: ApiResponse) => {
					console.log('API Response:', data);
					setCurrentReportTag(null);
					toast.success(data.message || 'Emails sent successfully!');
				},
				onError: (error: Error | AxiosError<ApiResponse>) => {
					console.error('Error sending emails:', error);
					toast.error('An unexpected error occurred while sending emails.');
				}
			}
		);
	};

	const publishArtists = async () => {
		if (matchedArtists.length === 0) {
			toast.info('No matched artists to publish.');
			return;
		}
		if (!currentReportTag) {
			toast.error('Oops you have not selected a tag yet. Please refresh page to start the session again');
		}
		setLoadingComplete(true);
		publishCsv(
			{ tracks: matchedArtists, reportId: currentReportTag as string },
			{
				onSuccess: (data: ApiResponse) => {
					// Use ApiResponse type for data
					console.log('API Response:', data);
					toast.success(data.message || 'Published successfully!');
					setLoadingComplete(false);
					setCurrentReportTag(null);
					setCurrentStep('send-emails');
				},
				onError: (error: Error | AxiosError<ApiResponse> | null) => {
					console.error('Error publishing matched artists:', error);
					toast.error('An unexpected error occurred while publishing artists.');
					setLoadingComplete(false);
				}
			}
		);
	};

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<LoadingBox size={62} />
			</div>
		);
	}

	return (
		<div className="space-y-8">
			<PreviousPageButton />
			<h1 className="text-2xl font-semibold">Reprocess Sales Report</h1>
			<p className="text-muted-foreground">Report ID: {reportId}</p>

			{currentStep === 'artist-records' && (
				<div className="space-y-6">
					<h2 className="text-xl font-semibold mb-4">Artists Records</h2>
					{/* Your existing tables and forms go here */}
					<UnmatchedArtistsTable artists={unmatchedArtists} onArtistMatch={handleArtistMatch} onBulkArtistMatch={handleBulkArtistMatch} onRowSelectionChange={handleSelectionMatchChange} />
					<MatchedArtistsTable artists={matchedArtists} onArtistRevenueClick={handleRevenueShare} />
				</div>
			)}

			{currentStep === 'match-artist' && <MatchArtistForm onMatch={handleMatchArtist} unmatchedReports={unmatchedArtists} onCreateNew={handleCreateNewArtist} activityPeriod={activityPeriod} unmatchedArtistName={unmatchedArtists.find(a => a._id === selectedUnmatchedArtist)} rows={selectedMatchRows} />}

			{currentStep === 'create-artist' && (
				<div className="flex w-full justify-center">
					<CreateArtistForm onSave={handleSaveArtist} onCancel={() => setCurrentStep('match-artist')} />
				</div>
			)}

			{currentStep === 'add-revenue-share' && <RevenueShareForm matchedArtistName={matchedArtists.find(a => a._id === selectedUnmatchedArtist)} matchedReports={matchedArtists} onSave={handleOnSave} />}

			{currentStep === 'send-emails' && (
				<div>
					<div className="mt-8 mb-4">
						<SendEmailsToArtistsTable artists={matchedArtists} onRowSelectionChange={handleSelectionChange} onSendEmails={handleSendEmails} />
					</div>
				</div>
			)}

			<div className="flex justify-between mt-8">
				<Button variant="outline" onClick={() => router.push('/admin/sales-history')}>
					Back to History
				</Button>
				{currentStep === 'artist-records' && (
					<Button onClick={publishArtists} isLoading={loadingComplete} disabled={unmatchedArtists.length > 0}>
						Publish Matched Artists
					</Button>
				)}
			</div>
			<AnimatePresence>{loadingComplete && <PublishingOverlay />}</AnimatePresence>
			{showSuccessModal && <SuccessModal type={showSuccessModal} artistName={createdArtist?.artistName} artistRealName={createdArtist?.fullName} onClose={handleCloseSuccessModal} />}
		</div>
	);
};

export default ReprocessSalesPage;
