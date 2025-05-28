import React, { useState } from 'react';
// Removed unused Button import
import { ChevronDown, User } from 'lucide-react';
import { useGetAllArtists } from '../../../catalogue/api/getAllArtistsParams';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { Artist, ReportItem } from '@/lib/types'; // Keep Artist import if it exists and is needed
// Removed unused MatchArtistReportsResponse and MatchArtistReportsParams imports
import { useMatchArtistReports } from '../../../catalogue/api/matchArtistReports'; // Import the hook
import { toast } from 'sonner'; // Assuming you use sonner for notifications/popups
import { AxiosError } from 'axios'; // Import AxiosError for better error typing

// --- Start: Local Type Definitions ---

// General interface for expected API response structure (success or error)
interface ApiResponse {
	success: boolean; // Assume API includes this field
	message?: string;
	data?: unknown; // Keep data flexible or define more specifically if known
	// Add other potential fields if known
}

// --- End: Local Type Definitions ---

interface MatchArtistFormProps {
	onMatch: (artistId: string, success: boolean, message?: string) => void; // Modified to pass success/message
	onCreateNew: () => void;
	unmatchedArtistName?: ReportItem;
	activityPeriod?: string;
	unmatchedReports?: ReportItem[]; // Add prop for reports data
}

const MatchArtistForm: React.FC<MatchArtistFormProps> = ({ onMatch, onCreateNew, unmatchedArtistName, activityPeriod }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
	const { data: artists, isLoading: artistsLoading } = useGetAllArtists({ page: '1', limit: '100' });

	// Use the mutation hook - use isPending instead of isLoading
	const { mutate: matchArtist, isPending: isMatching } = useMatchArtistReports();

	const handleSelectArtist = (artist: Artist) => {
		setSelectedArtist(artist);
		setIsDropdownOpen(false);

		matchArtist(
			{ artistId: artist._id, activityPeriod, reports: unmatchedArtistName ? [unmatchedArtistName] : [] },
			{
				onSuccess: (data: ApiResponse) => {
					// Use ApiResponse type for data
					console.log('API Response:', data);
					toast.success(data.message || 'Artist matched successfully!');
					onMatch(artist._id, true, data.message); // Notify parent of success
				},
				onError: (error: Error | AxiosError<ApiResponse>) => {
					console.error('Match failed (Request error):', error);
					let errorMessage = 'An unexpected error occurred. Please try again.'; // Default generic message

					if (error instanceof AxiosError) {
						// Check for specific HTTP status codes
						if (error.response?.status === 413) {
							errorMessage = 'The data is too large to process. Please try again later or contact support.';
						} else if (error.response?.data?.message) {
							// Use message from API response body if available
							errorMessage = error.response.data.message;
						} else if (error.message) {
							// Use Axios error message if no specific body message
							errorMessage = error.message;
						}
					} else if (error.message) {
						// Handle non-Axios errors (e.g., network issues before request)
						errorMessage = error.message;
					}

					toast.error(errorMessage); // Show the determined error message
				}
			}
		);
	};

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Match Artist: {unmatchedArtistName ? unmatchedArtistName!.artistName : 'Unmatched Artist'}</h1>

			<p className="mb-4">Select the correct artist profile from the list below to match with the report data.</p>

			<p className="text-primary mb-4">*If the correct artist is not listed, you can create a new profile.*</p>

			<div className="space-y-4 mb-6">
				<h2 className="font-medium">Artist List (Select one to match)</h2>

				<div className="relative">
					<button // Changed to button for better accessibility
						type="button"
						className="flex items-center justify-between bg-secondary border border-border rounded-md p-3 cursor-pointer w-full text-left disabled:opacity-50 disabled:cursor-not-allowed"
						onClick={() => setIsDropdownOpen(!isDropdownOpen)}
						disabled={isMatching} // Disable while matching (using isPending)
					>
						<span className="text-white/50">{selectedArtist ? selectedArtist.artistName : 'Select artist'}</span>
						{isMatching ? <LoadingBox size={20} /> : <ChevronDown size={20} />}
					</button>

					{artistsLoading ? (
						<div className="absolute left-0 right-0 mt-1 max-h-80 overflow-y-auto bg-secondary border border-border rounded-md z-10 shadow-lg flex items-center justify-center p-4">
							<LoadingBox size={32} />
						</div>
					) : (
						isDropdownOpen &&
						!isMatching && ( // Hide dropdown while matching
							<div className="absolute left-0 right-0 mt-1 max-h-80 overflow-y-auto bg-secondary border border-border rounded-md z-10 shadow-lg">
								{artists?.data?.length === 0 && <div className="p-3 text-center text-gray-500">No artists found.</div>}
								{artists?.data?.map((artist: Artist) => (
									<div
										key={artist._id}
										className="flex items-center space-x-3 p-3 hover:bg-accent/20 cursor-pointer"
										onClick={() => handleSelectArtist(artist)}
										role="option" // Added role
										aria-selected={selectedArtist?._id === artist._id}
									>
										<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white flex-shrink-0">
											<User size={16} />
										</div>
										<span className="flex-1 truncate">{artist.artistName || '-'}</span>
										{/* Consider adding indication if this artist was just selected */}
									</div>
								))}

								<div className="p-3 text-primary hover:bg-accent/20 cursor-pointer border-t border-border" onClick={onCreateNew}>
									+ Add New Artist
								</div>
							</div>
						)
					)}
				</div>
				{/* Display matching status (using isPending) */}
				{isMatching && <p className="text-center text-sm text-gray-400 mt-2">Matching artist...</p>}
			</div>

			{/* Removed the "Can't find artist?" section and Update button as they are redundant */}
			{/* The "Create New Artist" option is now integrated into the dropdown */}
		</div>
	);
};

export default MatchArtistForm;
