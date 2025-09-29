import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Plus, Search, User } from 'lucide-react';
import { useGetAllArtists } from '../../../catalogue/api/getAllArtistsParams';
import { Artist, ReportItem } from '@/lib/types';
import { useMatchArtistReports } from '../../../catalogue/api/matchArtistReports';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

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
	onMatch: (artistId: string, artistRealName: string, success: boolean, message?: string) => void;
	onCreateNew: () => void;
	unmatchedArtistName?: ReportItem;
	activityPeriod?: string;
	unmatchedReports?: ReportItem[];
	rows?: ReportItem[];
}

const MatchArtistForm: React.FC<MatchArtistFormProps> = ({ onMatch, onCreateNew, unmatchedArtistName, rows, activityPeriod }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');

	const { data: artists, isLoading: artistsLoading } = useGetAllArtists({ page: '1', limit: '700' });
	const { mutate: matchArtist, isPending: isMatching } = useMatchArtistReports();

	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const searchInputRef = useRef<HTMLInputElement | null>(null);

	const handleCreateNewArtistClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		onCreateNew();
		setIsDropdownOpen(false);
		setSearchTerm('');
	};
	// Filter artists based on search term and exclude those without a name
	const filteredArtists = useMemo(() => {
		if (!artists?.data) return [];
		return artists.data.filter((artist: Artist) => artist.artistName && artist.artistName.toLowerCase().includes(searchTerm.toLowerCase()));
	}, [artists, searchTerm]);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsDropdownOpen(false);
				setSearchTerm('');
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen]);

	// Focus search input when dropdown opens
	useEffect(() => {
		if (isDropdownOpen) {
			searchInputRef.current?.focus();
		}
	}, [isDropdownOpen]);

	const handleSelectArtist = (artist: Artist) => {
		setSelectedArtist(artist);
		setIsDropdownOpen(false);
		setSearchTerm('');

		const selectedRows = rows?.map(row => row._id);
		matchArtist(
			{ artistId: artist._id, activityPeriod, analyticsId: unmatchedArtistName?._id, rows: selectedRows },
			{
				onSuccess: (data: ApiResponse) => {
					// Use ApiResponse type for data
					console.log('API Response:', data);
					toast.success(data.message || 'Artist matched successfully!');
					onMatch(artist._id, artist.artistName, true, data.message); // Notify parent of success
				},
				onError: (error: Error | AxiosError<ApiResponse>) => {
					console.error('Match failed (Request error):', error);
					let errorMessage = 'An unexpected error occurred. Please try again.'; // Default generic message

					if (error instanceof AxiosError) {
						// Check for specific HTTP status codes
						if (error.response?.status === 413) {
							errorMessage = 'The data is too large to process. Please try again later or contact support.';
						} else if (error.response?.data?.message) {
							errorMessage = error.response.data.message;
						} else if (error.message) {
							errorMessage = error.message;
						}
					} else if (error.message) {
						errorMessage = error.message;
					}
					toast.error(errorMessage);
				}
			}
		);
	};

	return (
		<div className="p-6 md:p-8 bg-zinc-900 rounded-xl shadow-2xl max-w-2xl mx-auto my-10 border border-zinc-800">
			<h1 className="text-3xl font-bold text-zinc-100 mb-3">
				Match Artist: <span className="text-primary-400">{unmatchedArtistName ? unmatchedArtistName.artistName : 'Unmatched Artist'}</span>
			</h1>

			<p className="text-sm text-zinc-400 mb-4">Select the correct artist profile from the list below to match with the report data.</p>

			<p className="text-sm text-primary-300 mb-6 font-medium">*If the correct artist is not listed, you can create a new profile.*</p>

			<div className="space-y-4 mb-6" ref={dropdownRef}>
				{' '}
				{/* Attach ref here */}
				<h2 className="text-lg font-semibold text-zinc-200">Artist List</h2>
				<div className="relative">
					<button type="button" className="flex items-center justify-between bg-zinc-800 border border-zinc-700 rounded-lg p-3 w-full text-left text-zinc-200 hover:bg-zinc-700 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed" onClick={() => setIsDropdownOpen(!isDropdownOpen)} disabled={isMatching}>
						<div className="flex items-center gap-2">
							<User size={18} className="text-zinc-400" />
							<span className="font-medium truncate">{selectedArtist ? selectedArtist.artistName : 'Select an artist to match'}</span>
						</div>
						{isMatching ? (
							<svg className="animate-spin h-5 w-5 text-primary-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
								<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
								<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
							</svg>
						) : (
							<ChevronDown size={20} className="text-zinc-400" />
						)}
					</button>

					{isDropdownOpen && !isMatching && (
						<div className="absolute z-20 left-0 right-0 mt-2 max-h-80 overflow-y-auto bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
							{/* Search Input */}
							<div className="p-3 border-b border-zinc-700 sticky top-0 bg-zinc-800 z-30">
								<div className="relative">
									<Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
									<input
										type="text"
										placeholder="Search artists..."
										className="w-full pl-10 pr-3 py-2 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
										value={searchTerm}
										onChange={e => setSearchTerm(e.target.value)}
										ref={searchInputRef}
										onClick={e => e.stopPropagation()} // Prevent dropdown closing on click
									/>
								</div>
							</div>

							{artistsLoading ? (
								<div className="p-4 text-center text-zinc-400 flex items-center justify-center">
									<svg className="animate-spin h-5 w-5 text-primary-400 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
										<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
										<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
									</svg>
									Loading artists...
								</div>
							) : filteredArtists.length === 0 ? (
								<div className="p-4 text-center text-zinc-400">No artists found matching your search.</div>
							) : (
								filteredArtists.map((artist: Artist) => (
									<div key={artist._id} className="flex items-center gap-3 p-3 text-zinc-200 hover:bg-primary-600 hover:text-white cursor-pointer transition-colors duration-200 rounded-md mx-2 my-1" onClick={() => handleSelectArtist(artist)} role="option" aria-selected={selectedArtist?._id === artist._id}>
										<div className="w-8 h-8 bg-zinc-700 rounded-full flex items-center justify-center text-primary-400 flex-shrink-0">
											<User size={16} />
										</div>
										<span className="flex-1 font-medium truncate">{artist.artistName}</span>
									</div>
								))
							)}

							<div className="p-3 text-primary-400 hover:bg-zinc-700 cursor-pointer border-t border-zinc-700 flex items-center gap-2 transition duration-200 sticky bottom-0 bg-zinc-800 z-30" onClick={handleCreateNewArtistClick}>
								<Plus size={18} />
								<span className="font-medium">Create New Artist Profile</span>
							</div>
						</div>
					)}
				</div>
				{/* Display matching status (using isPending) */}
				{isMatching && (
					<p className="text-center text-sm text-zinc-400 mt-2 flex items-center justify-center">
						<svg className="animate-spin h-4 w-4 text-primary-400 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
							<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
							<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
						</svg>
						Matching artist...
					</p>
				)}
			</div>

			{/* Tailwind CSS scrollbar utility classes */}
			<style>
				{`
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #525252 #27272a; /* thumb track */
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background-color: #525252; /* zinc-600 */
          border-radius: 10px;
          border: 2px solid #27272a; /* zinc-900 */
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background-color: #27272a; /* zinc-900 */
        }
        `}
			</style>
		</div>
	);
};

export default MatchArtistForm;
