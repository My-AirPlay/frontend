/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Plus, User, X, Search } from 'lucide-react';
import { useGetAllArtists } from '../../../catalogue/api/getAllArtistsParams';
import { ReportItem, SharedRevenue } from '@/lib/types';
import { toast } from 'sonner';

interface MatchArtistFormProps {
	onSave: (data: any) => void;
	matchedArtistName?: ReportItem;
	matchedReports?: ReportItem[];
}

const RevenueShareForm: React.FC<MatchArtistFormProps> = ({ onSave, matchedArtistName }) => {
	const { data: artists, isLoading: artistsLoading } = useGetAllArtists({
		page: '1',
		limit: '500'
	});

	const [assignments, setAssignments] = useState<SharedRevenue[]>(matchedArtistName?.sharedRevenue || []);
	const [songs, setSongs] = useState<string[] | []>([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>(''); // New state for search term

	const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
	const searchInputRefs = useRef<(HTMLInputElement | null)[]>([]); // Ref for search input

	// Initialize assignments and song titles
	useEffect(() => {
		console.log(matchedArtistName);
		if (!matchedArtistName) return;

		const songTitles = [...matchedArtistName.otherTitles, matchedArtistName.firstTitle];
		setSongs(songTitles);

		if (artists?.data && matchedArtistName.sharedRevenue && matchedArtistName.sharedRevenue.length > 0) {
			const enrichedAssignments = matchedArtistName.sharedRevenue.map(share => {
				const artist = artists.data.find((a: any) => a._id === share.artistId);
				return {
					...share,
					artistName: artist ? artist.artistName : 'Unknown Artist',
					activityPeriod: matchedArtistName.activityPeriod
				};
			});

			setAssignments(enrichedAssignments);
			return;
		}

		if (artists?.data && matchedArtistName.artistId) {
			const matchedArtist = artists.data.find((a: any) => a._id === matchedArtistName.artistId);
			setAssignments([
				{
					artistId: matchedArtist?._id || null,
					artistName: matchedArtist?.artistName || 'Unknown Artist',
					percentage: 100,
					activityPeriod: matchedArtistName.activityPeriod
				}
			]);
		} else {
			setAssignments([
				{
					artistId: null,
					artistName: 'Select Artist',
					percentage: 0,
					activityPeriod: matchedArtistName.activityPeriod
				}
			]);
		}
	}, [artists, matchedArtistName]);

	// Focus search input when dropdown opens
	useEffect(() => {
		if (isDropdownOpen !== null && searchInputRefs.current[isDropdownOpen]) {
			searchInputRefs.current[isDropdownOpen]?.focus();
		}
	}, [isDropdownOpen]);

	// Handle clicks outside dropdown to close it
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (isDropdownOpen !== null && dropdownRefs.current[isDropdownOpen] && !dropdownRefs.current[isDropdownOpen]?.contains(event.target as Node)) {
				setIsDropdownOpen(null);
				setSearchTerm(''); // Clear search term on close
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isDropdownOpen]);

	// Filter artists based on search term
	const filteredArtists = useMemo(() => {
		if (!artists?.data) return [];

		return artists.data.filter((artist: any) => {
			const artistName = artist.artistName || 'all';
			if (artistName) {
				return artistName.toLowerCase().includes(searchTerm.toLowerCase());
			}
		});
	}, [artists, searchTerm]);

	const totalPercentage = assignments.reduce((sum, a) => sum + Number(a.percentage || 0), 0);

	const updateAssignment = (index: number, field: 'artist' | 'percentage', value: any) => {
		setAssignments(prev => {
			const updated = [...prev];
			if (field === 'artist') {
				updated[index].artistId = value._id;
				updated[index].artistName = value.artistName;
			}
			if (field === 'percentage') {
				const parsedValue = Math.max(0, Math.min(100, Number(value)));
				updated[index].percentage = parsedValue;
			}
			return updated;
		});
	};

	const addAssignment = () => {
		if (totalPercentage >= 100) {
			toast.error('Total percentage is already 100%. Cannot add more assignments.');
			return;
		}
		setAssignments(prev => [
			...prev,
			{
				artistId: null,
				artistName: 'Select Artist',
				percentage: 0,
				activityPeriod: matchedArtistName?.activityPeriod
			}
		]);
	};

	const removeAssignment = (index: number) => {
		setAssignments(prev => prev.filter((_, i) => i !== index));
	};

	const handleSave = () => {
		if (totalPercentage !== 100) {
			toast.error('Total percentage must be exactly 100% to save.');
			return;
		}
		onSave(assignments);
		toast.success('Revenue assignments saved!');
	};

	return (
		<div className="p-6 md:p-8 bg-zinc-900 rounded-xl shadow-2xl max-w-3xl mx-auto my-10 border border-zinc-800">
			<h1 className="text-3xl font-bold text-zinc-100 mb-2">Assign Revenue Shares</h1>
			<p className="text-sm text-zinc-400 mb-6">
				Distribute the revenue among artists for the linked songs.
				<span className="font-semibold text-zinc-300 ml-1">Total must equal 100%.</span>
			</p>

			{/* Song Titles List */}
			{songs.length > 0 && (
				<div className="mb-6 p-4 bg-zinc-800 rounded-lg border border-zinc-700">
					<h2 className="text-lg font-semibold text-zinc-200 mb-3">Linked Songs:</h2>
					<div className="flex flex-wrap gap-2 text-sm">
						{songs.map((song, idx) => (
							<span key={idx} className="bg-primary-700 text-white px-3 py-1 rounded-full shadow-sm">
								{song}
							</span>
						))}
					</div>
				</div>
			)}

			<div className="space-y-4 mb-6">
				{assignments.map((assignment, index) => (
					<div key={index} className="flex flex-col md:flex-row gap-3 md:gap-4 items-center p-4 bg-zinc-800 rounded-lg shadow-sm border border-zinc-700">
						{/* Artist Dropdown */}
						<div
							className="relative flex-grow w-full"
							ref={el => {
								dropdownRefs.current[index] = el;
							}}
						>
							<button type="button" className="flex items-center justify-between bg-zinc-700 border border-zinc-600 rounded-md p-3 w-full text-left text-zinc-200 hover:bg-zinc-600 transition focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent" onClick={() => setIsDropdownOpen(isDropdownOpen === index ? null : index)}>
								<div className="flex items-center gap-2">
									<User size={18} className="text-zinc-400" />
									<span className="font-medium truncate">{assignment.artistName || 'Select Artist'}</span>
								</div>
								<ChevronDown size={18} className="text-zinc-400" />
							</button>

							{isDropdownOpen === index && (
								<div className="absolute z-20 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-zinc-700 border border-zinc-600 rounded-md shadow-lg scrollbar-thin scrollbar-thumb-zinc-600 scrollbar-track-zinc-800">
									{/* Search Input */}
									<div className="p-3 border-b border-zinc-600 sticky top-0 bg-zinc-700 z-30">
										<div className="relative">
											<Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
											<input
												type="text"
												placeholder="Search artists..."
												className="w-full pl-10 pr-3 py-2 rounded-md bg-zinc-800 border border-zinc-600 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-primary-500"
												value={searchTerm}
												onChange={e => setSearchTerm(e.target.value)}
												ref={el => {
													searchInputRefs.current[index] = el;
												}}
												onClick={e => e.stopPropagation()} // Prevent closing dropdown when clicking search
											/>
										</div>
									</div>

									{artistsLoading ? (
										<div className="p-4 text-zinc-400">Loading artists...</div>
									) : filteredArtists.length === 0 ? (
										<div className="p-4 text-zinc-400">No artists found.</div>
									) : (
										filteredArtists.map((artist: any) => (
											<button
												key={artist._id}
												type="button"
												className="w-full text-left px-4 py-3 text-zinc-200 hover:bg-primary-600 hover:text-white flex items-center gap-3 transition"
												onClick={() => {
													updateAssignment(index, 'artist', artist);
													setIsDropdownOpen(null);
													setSearchTerm(''); // Clear search term after selection
												}}
											>
												<User size={16} className="text-zinc-300" />
												<span>{artist.artistName}</span>
											</button>
										))
									)}
								</div>
							)}
						</div>

						{/* Percentage Input */}
						<div className="flex items-center gap-2 w-full md:w-auto">
							<input type="number" className="w-24 p-3 rounded-md border border-zinc-600 bg-zinc-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition text-center" value={assignment.percentage} min={0} max={100} onChange={e => updateAssignment(index, 'percentage', e.target.value)} aria-label="Percentage" />
							<span className="text-zinc-300 text-lg font-semibold">%</span>
						</div>

						{/* Remove Assignment Button */}
						{assignments.length > 1 && (
							<button type="button" onClick={() => removeAssignment(index)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-zinc-700 rounded-full transition-colors flex-shrink-0" aria-label="Remove assignment">
								<X size={20} />
							</button>
						)}
					</div>
				))}
			</div>

			{/* Add Artist Button and Total Percentage */}
			<div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
				<button type="button" onClick={addAssignment} className="flex items-center gap-2 text-sm bg-zinc-700 text-zinc-100 px-4 py-2 rounded-lg hover:bg-zinc-600 transition shadow-md">
					<Plus size={18} />
					Add Another Artist
				</button>

				<span className={`text-xl font-bold ${totalPercentage !== 100 ? 'text-red-400' : 'text-green-400'}`}>Total: {totalPercentage}%</span>
			</div>

			{/* Save Button */}
			<button type="button" onClick={handleSave} className="w-full bg-primary-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-700 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={totalPercentage !== 100}>
				Save Assignments
			</button>

			{/* Tailwind CSS scrollbar utility classes (for custom scrollbar styling) */}
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

export default RevenueShareForm;
