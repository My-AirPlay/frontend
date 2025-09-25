/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { ArrowLeftRight, ArrowRight, ChevronDown, Upload } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AmountInput, FileUploader } from '@/components/ui';

import MatchedArtistsTable from './misc/components/MatchedArtistsTable';
import UnmatchedArtistsTable from './misc/components/UnmatchedArtistsTable';
import MatchArtistForm from './misc/components/MatchArtistForm';
import CreateArtistForm from './misc/components/CreateArtistForm';
import SuccessModal from './misc/components/SuccessModal';
import { useStaticAppInfo } from '@/contexts/StaticAppInfoContext';
import { toast } from 'sonner'; // Import toast
import { AxiosError } from 'axios'; // Import AxiosError
import { AnimatePresence, motion } from 'framer-motion';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useAdminAnalyzeCsv, useGetReportStatus } from '../catalogue/api/postAdminAnalyzeCsv';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { currencySymbols, ReportItem, SharedRevenue } from '@/lib/types';
import { usePublishArtistReports, useSendEmailReports } from '@/app/admin/(main)/catalogue/api/matchArtistReports';
import SendEmailsToArtistsTable from '@/app/admin/(main)/sales/misc/components/SendEmailsToArtistsTable';
import RevenueShareForm from '@/app/admin/(main)/sales/misc/components/RevenueShareForm';
import ReportingModal from '@/app/admin/(main)/sales/misc/components/ReportingModal';
import { PublishingOverlay } from '@/app/admin/(main)/artist-revenue/misc/components/LoadingOverlay';
import useSessionStorageState from '@/hooks/useSessionStorageState';
import { RestartButton } from '@/components/ui/restart-button';

type SalesStep = 'exchange-rate' | 'csv-upload' | 'processing' | 'artist-records' | 'match-artist' | 'create-artist' | 'add-revenue-share' | 'send-emails';

interface DropdownOption {
	id: string;
	label: string;
	symbol?: string;
}

interface createdArtistProp {
	artistName: string;
	fullName: string;
}

// Function to map rawData?.Currency to DropdownOption[]
const mapCurrencyToOptions = (currencyData?: Record<string, string>): DropdownOption[] => {
	if (!currencyData) return []; // Return empty array if no data

	return Object.keys(currencyData).map(key => ({
		id: key, // Use the key as the ID (e.g., "USD")
		label: key, // Use the key as the label
		symbol: (currencySymbols as Record<string, string>)[key] || key // Use the symbol if available, otherwise fall back to the currency code
	}));
};

interface CurrencyPair {
	fromCurrency: string | null;
	toCurrency: string | null;
	exchangeRate: string;
}

interface PublishTagModalProps {
	onClose: () => void;
	onPublish: (tag: string) => void;
	isLoading: boolean;
}

const PublishTagModal: React.FC<PublishTagModalProps> = ({ onClose, onPublish, isLoading }) => {
	const [selectedTag, setSelectedTag] = useState<string>('');
	const tags = ['MyAirplay-F', 'MyAirplay-S', 'Sound on'];

	const handlePublish = () => {
		if (!selectedTag) {
			toast.error('Please select a tag to continue.');
			return;
		}
		onPublish(selectedTag);
	};

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
			<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-[#272727] p-6 rounded-lg shadow-xl w-full max-w-md space-y-4">
				<h2 className="text-xl font-semibold text-white">Choose a tag to publish</h2>
				<p className="text-sm text-gray-400">Select one of the following tags. This will be associated with the published artist records.</p>
				<div className="space-y-2">
					{tags.map(tag => (
						<div key={tag} className={`p-3 rounded-md cursor-pointer transition-colors ${selectedTag === tag ? 'bg-primary text-white' : 'bg-secondary hover:bg-primary/20'}`} onClick={() => setSelectedTag(tag)}>
							{tag}
						</div>
					))}
				</div>
				<div className="flex justify-end gap-4 mt-6">
					<Button variant="outline" onClick={onClose} disabled={isLoading}>
						Cancel
					</Button>
					<Button className="bg-primary hover:bg-primary/90" onClick={handlePublish} disabled={!selectedTag || isLoading} isLoading={isLoading}>
						Continue
					</Button>
				</div>
			</motion.div>
		</div>
	);
};

const Sales: React.FC = () => {
	const { rawData } = useStaticAppInfo();

	const currencyOptions = mapCurrencyToOptions(rawData?.Currency);
	const [analyzedApiData, setAnalyzedApiData] = useSessionStorageState<ReportItem[] | null>('analyzedApiData', null);

	// Initialize react-hook-form with simplified CurrencyPair
	const { control, watch } = useForm<{ currencyPairs: CurrencyPair[] }>({
		defaultValues: {
			currencyPairs: [
				{
					fromCurrency: 'USD',
					toCurrency: 'NGN',
					exchangeRate: '1610' // Default rate for the first pair
				},
				{
					fromCurrency: 'EUR',
					toCurrency: 'NGN',
					exchangeRate: '2600' // Default rate for the second pair
				}
			]
		}
	});

	// Use useFieldArray to manage the array of currency pairs
	const { fields, append, remove } = useFieldArray({
		control,
		name: 'currencyPairs'
	});

	const currencyPairs = watch('currencyPairs');

	// Function to add a new currency pair (max 5)
	const addCurrencyPair = () => {
		if (fields.length < 5) {
			append({
				fromCurrency: 'USD',
				toCurrency: 'NGN',
				exchangeRate: '1610' // Default rate for new pairs
			});
		}
	};

	interface ApiResponse {
		success: boolean; // Assume API includes this field
		message?: string;
		data?: unknown; // Keep data flexible or define more specifically if known
		// Add other potential fields if known
	}

	// Function to remove a currency pair (index: number)
	const removeCurrencyPair = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};
	const [currentStep, setCurrentStep] = useSessionStorageState<SalesStep>('salesCurrentStep', 'exchange-rate');
	const [showExchangeRates, setShowExchangeRates] = useSessionStorageState('showExchangeRates', true);
	const [showSuccessModal, setShowSuccessModal] = useSessionStorageState<'created' | 'matched' | null>('showSuccessModal', null);
	const [createdArtist, setCreatedArtist] = useSessionStorageState<createdArtistProp>('createdArtist', { artistName: '', fullName: '' });

	const [csvUploaded, setCsvUploaded] = useSessionStorageState('csvUploaded', false);
	const [processingComplete, setProcessingComplete] = useSessionStorageState('processingComplete', false);
	const [loadingComplete, setLoadingComplete] = useSessionStorageState('loadingComplete', false);

	const [processingSteps, setProcessingSteps] = useSessionStorageState('processingSteps', {
		uploadSuccessful: false,
		sortingInformation: false,
		collectionFromBackend: false,
		completed: false
	});

	const [matchedArtists, setMatchedArtists] = useSessionStorageState<ReportItem[]>('matchedArtists', []);
	const [unmatchedArtists, setUnmatchedArtists] = useSessionStorageState<ReportItem[]>('unmatchedArtists', []);

	const [selectedRows, setSelectedRows] = useSessionStorageState<ReportItem[]>('selectedRows', []);
	const [selectedMatchRows, setSelectedMatchRows] = useSessionStorageState<ReportItem[]>('selectedMatchRows', []);
	const [selectedUnmatchedArtist, setSelectedUnmatchedArtist] = useSessionStorageState<string | null>('selectedUnmatchedArtist', null);
	const [systemArtistIdForMatch, setSystemArtistIdForMatch] = useSessionStorageState<string | null>('systemArtistIdForMatch', null);
	const [systemArtistNameForMatch, setSystemArtistNameForMatch] = useSessionStorageState<string | null>('systemArtistNameForMatch', null);
	const [activityPeriod, setActivityPeriod] = useSessionStorageState<string>('activityPeriod', '');
	const [showPublishTagModal, setShowPublishTagModal] = useSessionStorageState('showPublishTagModal', false);
	const [showReportingPeriodModal, setShowReportingPeriodModal] = useSessionStorageState('showReportingPeriodModal', false);
	const [tagValue, setTagValue] = useSessionStorageState<string | null>('tagValue', null);
	const [reportingPeriod, setReportingPeriod] = useSessionStorageState<string | null>('reportingPeriod', null);
	const [currentReportId, setCurrentReportId] = useSessionStorageState<string | null>('currentReportId', null);

	// NEW: Polling logic using the hook
	const { data: reportStatusData, error: reportStatusError } = useGetReportStatus(
		currentReportId!,
		!!currentReportId // This enables/disables the query
	);

	useEffect(() => {
		console.log(reportStatusData);
		if (reportStatusData?.status === 'completed') {
			toast.success('Report processing is complete!');

			// Stop polling by clearing the report ID
			setCurrentReportId(null);

			// --- This is your original data processing logic, moved here ---
			const reportItems: ReportItem[] = reportStatusData.data || [];
			setAnalyzedApiData(reportItems);

			const groupedByArtistAndPeriod: { [artistName: string]: { [activityPeriod: string]: ReportItem[] } } = reportItems.reduce(
				(acc, report) => {
					acc[report.artistName] = acc[report.artistName] || {};
					acc[report.artistName][report.activityPeriod] = acc[report.artistName][report.activityPeriod] || [];
					acc[report.artistName][report.activityPeriod].push(report);
					return acc;
				},
				{} as { [artistName: string]: { [activityPeriod: string]: ReportItem[] } }
			);
			const transformedArtistReports: ReportItem[] = Object.values(groupedByArtistAndPeriod).flatMap(
				// The outer flatMap iterates through each artist's group of periods.
				// 'artistPeriodGroup' looks like: { "Jun-24": [...], "Jul-24": [...] }
				artistPeriodGroup =>
					Object.values(artistPeriodGroup).map(
						// The inner map iterates through the array of reports for a single period.
						// 'periodItemGroup' is the array of reports for ONE artist in ONE period.
						(periodItemGroup: ReportItem[]) => {
							// Since all items in this group have the same artist and period,
							// we can safely take the metadata from the first item.
							const firstItem = periodItemGroup[0];

							return {
								artistId: firstItem?.artistId || null,
								artistName: firstItem?.artistName || 'Unknown Artist',
								activityPeriod: firstItem?.activityPeriod || 'Unknown Period',

								// This now correctly flattens reports for only this specific group
								fullReports: periodItemGroup.flatMap(item => item.fullReports),

								// The rest of your logic remains the same
								_id: firstItem?._id || `${firstItem?.artistName}-${firstItem?.activityPeriod}-${Math.random().toString(36).substring(2, 9)}`,
								createdAt: firstItem?.createdAt || new Date(),
								updatedAt: firstItem?.updatedAt || new Date(),
								firstTitle: firstItem.firstTitle,
								otherTitles: firstItem.otherTitles,
								titleCount: firstItem.titleCount,
								total: firstItem.total,
								catalogueId: firstItem.catalogueId,
								isrcCode: firstItem.isrcCode,
								currency: firstItem.currency,
								sharedRevenue: [
									{
										artistId: firstItem?.artistId || null,
										artistName: firstItem?.artistRealName || firstItem?.artistName || 'Unknown Artist',
										activityPeriod: firstItem?.activityPeriod || 'Unknown Period',
										percentage: 100
									}
								],
								__v: firstItem?.__v || 0
							};
						}
					)
			);
			const unmatched: ReportItem[] = transformedArtistReports.filter(ar => !ar.artistId);
			const matched: ReportItem[] = transformedArtistReports.filter(ar => ar.artistId);

			setUnmatchedArtists(unmatched);
			setMatchedArtists(matched);
			// --- End of original data processing logic ---

			// Move the user to the next step
			setProcessingSteps(prev => ({ ...prev, collectionFromBackend: true, completed: true }));
			setProcessingComplete(true);
			setCurrentStep('artist-records');
		} else if (reportStatusData?.status === 'failed' || reportStatusError) {
			toast.error('Report generation failed. Please try again.');
			setCurrentReportId(null); // Stop polling
			// Reset UI to the upload step
			setCurrentStep('csv-upload');
			setCsvUploaded(false);
			setProcessingComplete(false);
			setProcessingSteps({
				uploadSuccessful: false,
				sortingInformation: false,
				collectionFromBackend: false,
				completed: false
			});
		}
	}, [reportStatusData, reportStatusError, setAnalyzedApiData, setMatchedArtists, setUnmatchedArtists, setCurrentStep, setCurrentReportId, setProcessingComplete, setProcessingSteps]);

	const navigateToReportingModal = (tag: string | null) => {
		if (tag) {
			setTagValue(tag);
		}
		setShowPublishTagModal(false);
		setShowReportingPeriodModal(true);
	};

	const setReportingPeriodValue = (reportingPeriod: string) => {
		setReportingPeriod(reportingPeriod);
		setShowReportingPeriodModal(false);
		navigateToNextStep();
	};
	const navigateToNextStep = () => {
		setShowReportingPeriodModal(false);
		if (currentStep === 'exchange-rate') {
			setCurrentStep('csv-upload');
			setShowExchangeRates(false);
		} else if (currentStep === 'csv-upload' && csvUploaded) {
			setCurrentStep('processing');
		} else if (currentStep === 'processing' && processingComplete) {
			setCurrentStep('artist-records');
		}
	};

	const navigateToPreviousStep = () => {
		if (currentStep === 'csv-upload') {
			setCurrentStep('exchange-rate');
			setShowExchangeRates(true);
		} else if (currentStep === 'processing') {
			setCurrentStep('csv-upload');
		} else if (currentStep === 'artist-records') {
			setCurrentStep('processing');
		} else if (currentStep === 'match-artist') {
			setCurrentStep('artist-records');
			setSelectedUnmatchedArtist(null);
		} else if (currentStep === 'create-artist') {
			setCurrentStep('match-artist');
		} else if (currentStep === 'send-emails') {
			setCurrentStep('artist-records');
		} else if (currentStep === 'add-revenue-share') {
			setCurrentStep('artist-records');
			setSelectedUnmatchedArtist(null);
		}
	};

	const { mutate: analyzeCsv } = useAdminAnalyzeCsv();
	const { mutate: publishCsv } = usePublishArtistReports();
	const { mutate: sendEmails } = useSendEmailReports();

	const handleFileSelected = (file: File) => {
		// Convert exchange rates to positive numbers before sending
		const normalizedCurrencyPairs = currencyPairs.map(pair => ({
			...pair,
			exchangeRate: Math.abs(parseFloat(pair.exchangeRate))
		}));

		if (!tagValue) {
			toast.error('Reporting Period not set. Please refresh page and start again');
			return;
		}

		if (!reportingPeriod) {
			toast.error('Tag not set. Please refresh page and start again');
			return;
		}
		// --- END: VALIDATION ---

		// --- START: PROCESSING UI LOGIC ---
		setCurrentStep('processing');
		setProcessingComplete(false); // Ensure this is reset
		setProcessingSteps({
			uploadSuccessful: true,
			sortingInformation: false,
			collectionFromBackend: false,
			completed: false
		});

		// Simulate intermediate steps while API call is in flight
		setTimeout(() => {
			setProcessingSteps(prev => ({ ...prev, sortingInformation: true }));
		}, 1000);

		// --- END: PROCESSING UI LOGIC ---

		analyzeCsv(
			{
				file,
				exchangeRates: normalizedCurrencyPairs,
				tag: tagValue as string,
				reportingPeriod: reportingPeriod as string
			},
			{
				onSuccess: apiResponse => {
					const { reportId, message } = apiResponse;
					toast.success(message || 'Report generation started.');
					setCsvUploaded(true);
					setCurrentReportId(reportId);
				},
				onError: (error: Error) => {
					console.error('Failed to analyze CSV:', error);
					const axiosError = error as AxiosError;
					const apiErrorMessage = axiosError?.response?.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data && typeof axiosError.response.data.message === 'string' && axiosError.response.data.message;
					const errorMessage = apiErrorMessage || error.message || 'Failed to analyze CSV';
					toast.error(String(errorMessage));

					// Reset state on error
					setCurrentStep('csv-upload');
					setCsvUploaded(false);
					setProcessingComplete(false);
					setProcessingSteps({
						uploadSuccessful: false,
						sortingInformation: false,
						collectionFromBackend: false,
						completed: false
					});
				}
			}
		);
	};

	const publishArtists = async () => {
		if (matchedArtists.length === 0) {
			toast.info('No matched artists to publish.');
			return;
		}
		if (!tagValue) {
			toast.error('Oops you have not selected a tag yet. Please refresh page to start the session again');
		}
		setLoadingComplete(true);
		publishCsv(
			{ artists: matchedArtists, tag: tagValue as string },
			{
				onSuccess: (data: ApiResponse) => {
					// Use ApiResponse type for data
					console.log('API Response:', data);
					toast.success(data.message || 'Published successfully!');
					setLoadingComplete(false);
					//setShowPublishTagModal(false);
					//setMatchedArtists([]);
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
					toast.success(data.message || 'Emails sent successfully!');
				},
				onError: (error: Error | AxiosError<ApiResponse>) => {
					console.error('Error sending emails:', error);
					toast.error('An unexpected error occurred while sending emails.');
				}
			}
		);
	};

	const handleArtistMatch = (row: any) => {
		setSelectedUnmatchedArtist(row._id);
		setActivityPeriod(row.activityPeriod);
		setCurrentStep('match-artist');
	};

	const handleBulkArtistMatch = () => {
		setActivityPeriod(reportingPeriod as string);
		setCurrentStep('match-artist');
	};

	const handleRevenueShare = (row: any) => {
		setSelectedUnmatchedArtist(row._id);
		setActivityPeriod(row.activityPeriod);
		setCurrentStep('add-revenue-share');
	};

	const handleMatchArtist = (systemArtistId: string, systemArtistName: string) => {
		console.log('Matched with system artist name:', systemArtistName);
		console.log('Matched with system artist ID:', systemArtistId);
		setSystemArtistIdForMatch(systemArtistId);
		setSystemArtistNameForMatch(systemArtistName);
		setShowSuccessModal('matched');
	};

	const handleCreateNewArtist = () => {
		console.log('clicked');
		setCurrentStep('create-artist');
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSaveArtist = (artistData: any) => {
		console.log('New artist data:', artistData);
		setCreatedArtist(artistData);
		// Here we would call an API to create the artist
		setShowSuccessModal('created');
	};

	const handleSelectionChange = useCallback((selectedData: ReportItem[]) => {
		setSelectedRows(selectedData);
	}, []);

	const handleSelectionMatchChange = useCallback((selectedData: ReportItem[]) => {
		setSelectedMatchRows(selectedData);
	}, []);

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

	const getProgressPercentage = () => {
		const steps = Object.values(processingSteps);
		const completedSteps = steps.filter(step => step).length;
		return (completedSteps / steps.length) * 100;
	};

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				{' '}
				{/* 2. Use flexbox to space out buttons */}
				<Button variant="outline" className="flex items-center gap-2" onClick={navigateToPreviousStep}>
					Previous Page
				</Button>
				<RestartButton />
			</div>

			<h1 className="text-2xl font-semibold">Sales</h1>

			<div className="py-6">
				{currentStep === 'exchange-rate' || currentStep === 'csv-upload' ? (
					<>
						<p className="mb-2">You are required to upload a Csv file to be able to access and match artists. This will help you give access to artist payouts</p>
						<p className="text-primary mb-6">* Kindly follow these steps below.</p>
					</>
				) : null}

				{showExchangeRates && (
					<>
						<h2 className="text-lg font-medium mb-4">Input Exchange Rate</h2>

						<div className="p-6 rounded-md mb-6 bg-[#272727] max-w-3xl">
							<div className="">
								{currentStep === 'exchange-rate' ? (
									<>
										<div className="space-y-6">
											{fields.map((field, index) => (
												<div key={field.id} className="space-y-6 border-b border-gray-600 pb-6 last:border-b-0">
													<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
														<Controller control={control} name={`currencyPairs.${index}.fromCurrency`} render={({ field: { onChange, value } }) => <CustomDropdown label="From" buttonText={value || 'Select Currency'} buttonIcon={<div className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">{currencySymbols[value || 'USD']}</div>} options={currencyOptions} onOptionChange={option => onChange(option.id)} buttonClassName="text-left" dropdownClassName="mt-2" optionClassName="cursor-pointer" />} />
														<div className="flex items-center justify-center">
															<div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-primary">
																<ArrowLeftRight className="" size={24} />
															</div>
														</div>
														<Controller control={control} name={`currencyPairs.${index}.toCurrency`} render={({ field: { onChange, value } }) => <CustomDropdown label="To" buttonText={value || 'Select Currency'} buttonIcon={<div className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center">{currencySymbols[value || 'USD']}</div>} options={currencyOptions} onOptionChange={option => onChange(option.id)} buttonClassName="text-left" dropdownClassName="mt-2" optionClassName="cursor-pointer" />} />
													</div>

													<Controller control={control} name={`currencyPairs.${index}.exchangeRate`} render={({ field: { onChange, value } }) => <AmountInput value={value} onChange={onChange} className="w-full rounded-md h-[4rem] text-center border-border p-3 focus:outline-none focus:ring-1 focus:ring-primary" />} />

													{/* Add/Remove Buttons */}
													<div className="flex justify-end gap-2 mt-4">
														{fields.length > 3 && (
															<Button variant="destructive" size="sm" onClick={() => removeCurrencyPair(index)}>
																Remove
															</Button>
														)}
														{index === fields.length - 1 && fields.length < 5 && (
															<Button variant="outline" size="sm" onClick={addCurrencyPair}>
																Add Another Pair
															</Button>
														)}
													</div>
												</div>
											))}
										</div>
									</>
								) : (
									<div className="space-y-6">
										{currencyPairs.map((pair, index) => (
											<div key={index} className="flex items-center justify-between mb-2">
												<div className="flex items-center gap-4">
													<div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white">{currencySymbols[pair.fromCurrency || 'USD']}</div>
													<span className="text-lg">1</span>
												</div>
												<div className="w-8 h-8 flex items-center justify-center">
													<div className="w-4 h-4 text-muted">⇄</div>
												</div>
												<div className="flex items-center gap-4">
													<div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white">{currencySymbols[pair.toCurrency || 'USD']}</div>
													<span className="text-lg text-primary">{pair.exchangeRate}</span>
												</div>
											</div>
										))}

										<Button variant="link" className="text-primary p-0 h-auto" onClick={() => setShowExchangeRates(true)}>
											Edit Rate
										</Button>
									</div>
								)}
							</div>

							{currentStep === 'exchange-rate' && (
								<div className="flex justify-center mt-8 ">
									<Button className=" flex items-center gap-2 rounded-full" size="lg" onClick={() => setShowPublishTagModal(true)}>
										Submit <ArrowRight size={16} />
									</Button>
								</div>
							)}
						</div>
					</>
				)}

				{currentStep === 'processing' && (
					<>
						<h2 className="text-lg font-medium mb-4">CSV Status</h2>

						<div className="bg-background p-6 rounded-md">
							<h3 className="text-md font-medium mb-4">Progress Bar</h3>

							<div className="space-y-4">
								<div className="w-full bg-accent rounded-sm h-2 overflow-hidden">
									<div className="bg-primary h-full transition-all duration-500" style={{ width: `${getProgressPercentage()}%` }}></div>
								</div>
								<p className="text-xs text-muted">{getProgressPercentage()}% complete</p>

								<div className="space-y-3 mt-6">
									<div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
										<div className={`w-5 h-5 rounded-full ${processingSteps.uploadSuccessful ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>{processingSteps.uploadSuccessful && <div className="w-2 h-2 bg-white rounded-full"></div>}</div>
										<span>Upload Successful</span>
									</div>

									<div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
										<div className={`w-5 h-5 rounded-full ${processingSteps.sortingInformation ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>{processingSteps.sortingInformation && <div className="w-2 h-2 bg-white rounded-full"></div>}</div>
										<span>Sorting Information</span>
									</div>

									<div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
										<div className={`w-5 h-5 rounded-full ${processingSteps.collectionFromBackend ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>{processingSteps.collectionFromBackend && <div className="w-2 h-2 bg-white rounded-full"></div>}</div>
										<span>Collection from Back-end</span>
									</div>

									<div className="flex items-center space-x-3 p-3 rounded-md bg-secondary">
										<div className={`w-5 h-5 rounded-full ${processingSteps.completed ? 'bg-primary' : 'bg-accent'} flex items-center justify-center`}>{processingSteps.completed && <div className="w-2 h-2 bg-white rounded-full"></div>}</div>
										<span>Completed</span>
									</div>
								</div>
							</div>
						</div>
					</>
				)}

				{currentStep === 'csv-upload' && (
					<div className="mt-8 mb-4 max-w-3xl">
						<h2 className="text-lg font-medium mb-4">Upload CSV</h2>
						<FileUploader onFileSelected={handleFileSelected} supportedFormats={['CSV']} icon={<Upload size={24} className="text-muted" />} id="csv-upload" />
					</div>
				)}

				{/* Note: The 'isAnalyzeCsv' spinner is implicitly handled by the 'processing' step UI now, so we can remove the conditional rendering here to avoid UI flicker. */}

				{currentStep === 'artist-records' && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold mb-4">Artists Records</h2>

						<MatchedArtistsTable artists={matchedArtists} onArtistRevenueClick={handleRevenueShare} />

						<UnmatchedArtistsTable artists={unmatchedArtists} onArtistMatch={handleArtistMatch} onBulkArtistMatch={handleBulkArtistMatch} onRowSelectionChange={handleSelectionMatchChange} />
					</div>
				)}
				{currentStep === 'send-emails' && (
					<div>
						<div className="mt-8 mb-4">
							<SendEmailsToArtistsTable artists={matchedArtists} onRowSelectionChange={handleSelectionChange} onSendEmails={handleSendEmails} />
						</div>
					</div>
				)}

				{currentStep === 'match-artist' && analyzedApiData && <MatchArtistForm onMatch={handleMatchArtist} unmatchedReports={unmatchedArtists} onCreateNew={handleCreateNewArtist} activityPeriod={activityPeriod} unmatchedArtistName={unmatchedArtists.find(a => a._id === selectedUnmatchedArtist)} />}

				{currentStep === 'create-artist' && <CreateArtistForm onSave={handleSaveArtist} />}

				{currentStep === 'add-revenue-share' && <RevenueShareForm matchedArtistName={matchedArtists.find(a => a._id === selectedUnmatchedArtist)} matchedReports={matchedArtists} onSave={handleOnSave} />}

				{(currentStep === 'csv-upload' || currentStep === 'processing' || currentStep === 'artist-records') && (
					<div className="flex justify-between mt-8">
						<Button variant="outline" className="bg-background border-border text-foreground" onClick={navigateToPreviousStep}>
							Back
						</Button>

						{currentStep === 'artist-records' && unmatchedArtists.length === 0 && (
							<Button variant="outline" className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2" onClick={publishArtists} isLoading={loadingComplete}>
								Publish Matched Artists
							</Button>
						)}

						{currentStep === 'artist-records' ? (
							''
						) : (
							<Button className={`bg-primary hover:bg-primary/90 text-white flex items-center gap-2`} onClick={() => navigateToNextStep()} disabled={(currentStep === 'csv-upload' && !csvUploaded) || (currentStep === 'processing' && !processingComplete)}>
								Proceed <ArrowRight size={16} />
							</Button>
						)}
					</div>
				)}
			</div>

			<AnimatePresence>{loadingComplete && <PublishingOverlay />}</AnimatePresence>
			{showSuccessModal && <SuccessModal type={showSuccessModal} artistName={createdArtist?.artistName} artistRealName={createdArtist?.fullName} onClose={handleCloseSuccessModal} />}
			{showPublishTagModal && <PublishTagModal onClose={() => setShowPublishTagModal(false)} onPublish={navigateToReportingModal} isLoading={loadingComplete} />}
			{showReportingPeriodModal && <ReportingModal onClose={() => setShowReportingPeriodModal(false)} onSave={period => setReportingPeriodValue(period)} isLoading={loadingComplete} />}
		</div>
	);
};

// Define types for the options and props
interface DropdownOption {
	id: string;
	label: string;
	value?: string;
	symbol?: string;
}

interface CustomDropdownProps {
	label?: string; // Text above the button (e.g., "From")
	buttonText: string; // Main text in the button (e.g., "Euro")
	buttonIcon?: React.ReactNode; // Icon or element before the text (e.g., € symbol)
	options: DropdownOption[]; // List of dropdown options
	onOptionChange?: (option: DropdownOption) => void; // Callback for option selection
	buttonClassName?: string; // Custom classes for the button
	dropdownClassName?: string; // Custom classes for the dropdown
	optionClassName?: string; // Custom classes for each option
	width?: string; // Dropdown width (e.g., "w-48")
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ label, buttonText, buttonIcon, options, onOptionChange, buttonClassName = '', dropdownClassName = '', optionClassName = '', width = 'w-48' }) => {
	const [isOpen, setIsOpen] = useState(false);

	// Close dropdown when clicking outside
	const ref = useOnclickOutside(() => setIsOpen(false));

	// Animation variants for Framer Motion
	const dropdownVariants = {
		hidden: { opacity: 0, y: -10, scale: 0.95 },
		visible: { opacity: 1, y: 0, scale: 1 },
		exit: { opacity: 0, y: -10, scale: 0.95 }
	};

	return (
		<div className="relative w-fit" ref={ref}>
			{/* Button */}
			<button type="button" className={`flex flex-col items-start gap-2 ${buttonClassName}`} onClick={() => setIsOpen(!isOpen)}>
				{label && <span className="text-sm">{label}</span>}
				<div className="flex items-center space-x-2 rounded-full py-1">
					{buttonIcon && <div>{buttonIcon}</div>}
					<span>{buttonText}</span>
					<ChevronDown size={14} className={`${isOpen ? 'rotate-180' : ''} transition-transform`} />
				</div>
			</button>

			{/* Dropdown */}
			<AnimatePresence>
				{isOpen && (
					<motion.div className={`absolute z-10 ${width} bg-[#1e1e1e] rounded-lg shadow-sm ${dropdownClassName}`} variants={dropdownVariants} initial="hidden" animate="visible" exit="exit" transition={{ duration: 0.2 }}>
						<ul className="p-3 space-y-1 text-sm text-gray-700">
							{options.map(option => (
								<li key={option.id}>
									<div
										className={`flex items-center p-2 rounded-sm text-white  hover:bg-white hover:text-[#1e1e1e] ${optionClassName}`}
										onClick={() => {
											onOptionChange?.(option);
											setIsOpen(val => !val);
										}}
									>
										{`${option.symbol} ${option.label}`}
									</div>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Sales;
