// src/components/RestartButton.tsx (example file path)

'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

// List all the sessionStorage keys your application uses
const SESSION_STORAGE_KEYS = ['analyzedApiData', 'salesCurrentStep', 'showExchangeRates', 'showSuccessModal', 'createdArtist', 'csvUploaded', 'processingComplete', 'loadingComplete', 'processingSteps', 'matchedArtists', 'unmatchedArtists', 'selectedRows', 'selectedMatchRows', 'selectedUnmatchedArtist', 'systemArtistIdForMatch', 'systemArtistNameForMatch', 'activityPeriod', 'showPublishTagModal', 'showReportingPeriodModal', 'tagValue', 'reportingPeriod', 'currentReportId'];

export const RestartButton = () => {
	const handleRestart = () => {
		// Loop through the keys and remove them from sessionStorage
		SESSION_STORAGE_KEYS.forEach(key => {
			sessionStorage.removeItem(key);
		});

		// Reload the page to reset the component's internal state
		window.location.reload();
	};

	return (
		<Button variant="destructive" className="flex items-center gap-2" onClick={handleRestart}>
			<RotateCcw size={16} />
			Restart Process
		</Button>
	);
};
