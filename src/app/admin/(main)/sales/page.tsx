'use client';
import React, { useState } from 'react';
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
import { useAdminAnalyzeCsv } from '../catalogue/api/postAdminAnalyzeCsv';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { currencySymbols, ReportItem } from '@/lib/types';

type SalesStep = 'exchange-rate' | 'csv-upload' | 'processing' | 'artist-records' | 'match-artist' | 'create-artist';

interface DropdownOption {
	id: string;
	label: string;
	symbol: string;
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

const Sales: React.FC = () => {
	const { rawData } = useStaticAppInfo();

	const currencyOptions = mapCurrencyToOptions(rawData?.Currency);
	const [analyzedApiData, setAnalyzedApiData] = useState<ReportItem[] | null>(null);

	// Initialize react-hook-form with simplified CurrencyPair
	const { control, watch } = useForm<{ currencyPairs: CurrencyPair[] }>({
		defaultValues: {
			currencyPairs: [
				{
					fromCurrency: 'USD',
					toCurrency: 'NGN',
					exchangeRate: '1610' // Default rate for the first pair
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

	// Function to remove a currency pair (index: number)
	const removeCurrencyPair = (index: number) => {
		if (fields.length > 1) {
			remove(index);
		}
	};

	const [currentStep, setCurrentStep] = useState<SalesStep>('exchange-rate');
	const [showExchangeRates, setShowExchangeRates] = useState(true);
	const [showSuccessModal, setShowSuccessModal] = useState<'created' | 'matched' | null>(null);
	const [createdArtist, setCreatedArtist] = useState<createdArtistProp>({ artistName: '', fullName: '' });

	const [csvUploaded, setCsvUploaded] = useState(false);
	const [processingComplete, setProcessingComplete] = useState(false);

	const [processingSteps, setProcessingSteps] = useState({
		uploadSuccessful: false,
		sortingInformation: false,
		collectionFromBackend: false,
		completed: false
	});

	const [matchedArtists, setMatchedArtists] = useState<ReportItem[]>([]);
	const [unmatchedArtists, setUnmatchedArtists] = useState<ReportItem[]>([]);

	const [selectedUnmatchedArtist, setSelectedUnmatchedArtist] = useState<string | null>(null);
	const [systemArtistIdForMatch, setSystemArtistIdForMatch] = useState<string | null>(null);

	const navigateToNextStep = () => {
		if (currentStep === 'exchange-rate') {
			setCurrentStep('csv-upload');
			setShowExchangeRates(false);
		} else if (currentStep === 'csv-upload' && csvUploaded) {
			setCurrentStep('processing');
			startProcessing();
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
		}
	};

	const { mutate: analyzeCsv, isPending: isAnalyzeCsv } = useAdminAnalyzeCsv();

	const handleFileSelected = (file: File) => {
		// Convert exchange rates to positive numbers before sending
		const normalizedCurrencyPairs = currencyPairs.map(pair => ({
			...pair,
			exchangeRate: Math.abs(parseFloat(pair.exchangeRate))
		}));

		console.log('normalizedCurrencyPairs', normalizedCurrencyPairs);

		analyzeCsv(
			{ file, exchangeRates: normalizedCurrencyPairs },
			{
				onSuccess: apiResponse => {
					console.log('apiResponse', apiResponse);
					setProcessingComplete(true);

					console.log('apiResponse?.data', apiResponse);
					const reportItems: ReportItem[] = apiResponse || [];
					setAnalyzedApiData(reportItems);

					const groupedByArtist: { [key: string]: ReportItem[] } = reportItems.reduce(
						(acc, report) => {
							acc[report.artistName] = acc[report.artistName] || [];
							acc[report.artistName].push(report);
							return acc;
						},
						{} as { [key: string]: ReportItem[] }
					);

					console.log('apiResponse', apiResponse);
					console.log('groupedByArtist', groupedByArtist);

					const transformedArtistReports: ReportItem[] = Object.values(groupedByArtist).map((artistItemGroup: ReportItem[]) => {
						const firstItem = artistItemGroup[0];
						return {
							artistId: firstItem?.artistId || null,
							artistName: firstItem?.artistName || 'Unknown Artist',
							activityPeriod: firstItem?.activityPeriod || 'Unknown Period',
							fullReports: artistItemGroup.flatMap(item => item.fullReports),
							_id: firstItem?._id || `${firstItem?.artistName}-${firstItem?.activityPeriod}-${Math.random().toString(36).substring(2, 9)}`,
							createdAt: firstItem?.createdAt || new Date(),
							updatedAt: firstItem?.updatedAt || new Date(),
							__v: firstItem?.__v || 0
						};
					});

					console.log('transformedArtistReports', transformedArtistReports);

					const unmatched: ReportItem[] = transformedArtistReports.filter(ar => !ar.artistId);
					const matched: ReportItem[] = transformedArtistReports.filter(ar => ar.artistId);

					console.log('unmatched', unmatched);
					console.log('matched', matched);

					setUnmatchedArtists(unmatched);
					setMatchedArtists(matched);

					setCsvUploaded(true);
					setCurrentStep('processing');
					startProcessing();
				},
				onError: (error: Error) => {
					console.error('Failed to analyze CSV:', error);
					setCsvUploaded(false);
					const axiosError = error as AxiosError;
					const apiErrorMessage = axiosError?.response?.data && typeof axiosError.response.data === 'object' && 'message' in axiosError.response.data && typeof axiosError.response.data.message === 'string' && axiosError.response.data.message;
					const errorMessage = apiErrorMessage || error.message || 'Failed to analyze CSV';
					toast.error(String(errorMessage));
				}
			}
		);
	};

	const startProcessing = () => {
		setProcessingSteps({
			uploadSuccessful: true,
			sortingInformation: false,
			collectionFromBackend: false,
			completed: false
		});

		// Simulate processing steps with delays
		setTimeout(() => {
			setProcessingSteps(prev => ({ ...prev, sortingInformation: true }));

			setTimeout(() => {
				setProcessingSteps(prev => ({ ...prev, collectionFromBackend: true }));

				setTimeout(() => {
					setProcessingSteps(prev => ({ ...prev, completed: true }));
					setProcessingComplete(true);
				}, 700);
			}, 1500);
		}, 1000);
	};

	const handleArtistMatch = (artistId: string) => {
		setSelectedUnmatchedArtist(artistId);
		setCurrentStep('match-artist');
	};

	const handleMatchArtist = (systemArtistId: string) => {
		console.log('Matched with system artist ID:', systemArtistId);
		setSystemArtistIdForMatch(systemArtistId);
		setShowSuccessModal('matched');
	};

	const handleCreateNewArtist = () => {
		setCurrentStep('create-artist');
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleSaveArtist = (artistData: any) => {
		console.log('New artist data:', artistData);
		setCreatedArtist(artistData);
		// Here we would call an API to create the artist
		setShowSuccessModal('created');
	};

	const handleCloseSuccessModal = () => {
		setShowSuccessModal(null);
		setCurrentStep('artist-records');

		if (selectedUnmatchedArtist && systemArtistIdForMatch) {
			const reportItemToMove = unmatchedArtists.find(artist => artist._id === selectedUnmatchedArtist);

			if (reportItemToMove) {
				setUnmatchedArtists(currentUnmatched => currentUnmatched.filter(artist => artist._id !== selectedUnmatchedArtist));

				const newMatchedArtistData = {
					...reportItemToMove,
					artistId: systemArtistIdForMatch,
					realName: 'Updated Name', // This should ideally come from the matched system artist
					status: 'completed' as const
				};

				setMatchedArtists(currentMatched => [...currentMatched, newMatchedArtistData]);
			} else {
				console.warn('Could not find the artist to move from unmatched to matched.');
			}
		} else {
			console.warn('Missing selectedUnmatchedArtist or systemArtistIdForMatch in handleCloseSuccessModal.');
		}

		setSelectedUnmatchedArtist(null);
		setSystemArtistIdForMatch(null);
	};

	const getProgressPercentage = () => {
		const steps = Object.values(processingSteps);
		const completedSteps = steps.filter(step => step).length;
		return (completedSteps / steps.length) * 100;
	};

	return (
		<div className="space-y-8">
			<div className="flex items-center">
				<Button variant="outline" className="flex items-center gap-2 bg-background text-foreground border-border" onClick={navigateToPreviousStep}>
					Previous Page
				</Button>
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
														{fields.length > 1 && (
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
									<Button className=" flex items-center gap-2 rounded-full" size="lg" onClick={navigateToNextStep}>
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

						{isAnalyzeCsv ? (
							<div className="w-full px-6 py-4 flex justify-center items-center">
								<LoadingBox size={42} />
							</div>
						) : (
							<FileUploader onFileSelected={handleFileSelected} supportedFormats={['CSV']} icon={<Upload size={24} className="text-muted" />} id="csv-upload" />
						)}
					</div>
				)}

				{currentStep === 'artist-records' && (
					<div className="space-y-6">
						<h2 className="text-xl font-semibold mb-4">Artists Records</h2>

						<MatchedArtistsTable artists={matchedArtists} />

						<UnmatchedArtistsTable artists={unmatchedArtists} onArtistMatch={handleArtistMatch} />
					</div>
				)}

				{currentStep === 'match-artist' && analyzedApiData && <MatchArtistForm onMatch={handleMatchArtist} unmatchedReports={unmatchedArtists} onCreateNew={handleCreateNewArtist} unmatchedArtistName={unmatchedArtists.find(a => a._id === selectedUnmatchedArtist)?.artistName} />}

				{currentStep === 'create-artist' && <CreateArtistForm onSave={handleSaveArtist} />}

				{(currentStep === 'csv-upload' || currentStep === 'processing' || currentStep === 'artist-records') && (
					<div className="flex justify-between mt-8">
						<Button variant="outline" className="bg-background border-border text-foreground" onClick={navigateToPreviousStep}>
							Back
						</Button>

						{currentStep === 'artist-records' ? (
							''
						) : (
							<Button className={`bg-primary hover:bg-primary/90 text-white flex items-center gap-2`} onClick={navigateToNextStep} disabled={(currentStep === 'csv-upload' && !csvUploaded) || (currentStep === 'processing' && !processingComplete)}>
								Proceed <ArrowRight size={16} />
							</Button>
						)}
					</div>
				)}
			</div>

			{showSuccessModal && <SuccessModal type={showSuccessModal} artistName={createdArtist?.artistName} artistRealName={createdArtist?.fullName} onClose={handleCloseSuccessModal} />}
		</div>
	);
};

// Define types for the options and props
interface DropdownOption {
	id: string;
	label: string;
	value?: string;
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
