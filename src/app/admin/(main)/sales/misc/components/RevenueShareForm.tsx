/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus, User } from 'lucide-react';
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
		limit: '100'
	});

	const [assignments, setAssignments] = useState<SharedRevenue[]>(matchedArtistName!.sharedRevenue || []);

	console.log(assignments);

	const [isDropdownOpen, setIsDropdownOpen] = useState<number | null>(null);

	// Initialize assignment once artists are loaded
	useEffect(() => {
		if (!artists?.data || !matchedArtistName?.artistId) return;
		if (matchedArtistName.sharedRevenue) {
			setAssignments(matchedArtistName.sharedRevenue);
			return;
		}

		const matchedArtist = artists.data.find((a: any) => a._id === matchedArtistName.artistId);

		setAssignments([
			{
				artistId: matchedArtist?._id || null,
				artistName: matchedArtist?.artistName || 'Unknown Artist',
				percentage: 100,
				activityPeriod: matchedArtistName.activityPeriod
			}
		]);
	}, [artists, matchedArtistName]);

	const totalPercentage = assignments.reduce((sum, a) => sum + Number(a.percentage), 0);

	const updateAssignment = (index: number, field: 'artist' | 'percentage', value: any) => {
		setAssignments(prev => {
			const updated = [...prev];
			if (field === 'artist') {
				updated[index].artistId = value._id;
				updated[index].artistName = value.artistName;
			}
			if (field === 'percentage') updated[index].percentage = Number(value);
			return updated;
		});
	};

	const addAssignment = () => {
		if (totalPercentage >= 100) {
			toast.error('Total percentage already 100%');
			return;
		}
		setAssignments(prev => [
			...prev,
			{
				artistId: null,
				artistName: null,
				percentage: 0,
				activityPeriod: matchedArtistName?.activityPeriod
			}
		]);
	};

	const handleSave = () => {
		if (totalPercentage !== 100) {
			toast.error('Total percentage must be exactly 100%');
			return;
		}
		onSave(assignments);
	};

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Assign Artists & Percentages</h1>
			<p className="text-sm text-muted-foreground mb-2">Total must equal 100%</p>

			{assignments.map((assignment, index) => (
				<div key={index} className="flex gap-4 items-center">
					<div className="relative w-full">
						<button type="button" className="flex items-center justify-between bg-secondary border border-border rounded-md p-3 w-full text-left" onClick={() => setIsDropdownOpen(isDropdownOpen === index ? null : index)}>
							<span className="text-white/70">{assignment.artistName || 'Select Artist'}</span>
							<ChevronDown size={18} />
						</button>

						{isDropdownOpen === index && !artistsLoading && (
							<div className="absolute z-10 left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-secondary border border-border rounded-md shadow-lg">
								{artists?.data.map((artist: any) => (
									<button
										key={artist._id}
										type="button"
										className="w-full text-left px-4 py-2 hover:bg-muted/30 flex items-center gap-2"
										onClick={() => {
											updateAssignment(index, 'artist', artist);
											setIsDropdownOpen(null);
										}}
									>
										<User size={16} />
										<span>{artist.artistName}</span>
									</button>
								))}
							</div>
						)}
					</div>

					<input type="number" className="w-20 p-2 rounded-md border border-border bg-background text-white" value={assignment.percentage} min={0} max={100} onChange={e => updateAssignment(index, 'percentage', e.target.value)} />
					<span className="text-white/60 text-sm">%</span>
				</div>
			))}

			<div className="flex items-center justify-between">
				<button type="button" onClick={addAssignment} className="flex items-center gap-2 text-sm bg-muted text-white px-3 py-2 rounded-md hover:bg-muted/70 transition">
					<Plus size={16} />
					Add Artist
				</button>

				<span className={`text-sm font-medium ${totalPercentage !== 100 ? 'text-red-500' : 'text-green-400'}`}>Total: {totalPercentage}%</span>
			</div>

			<button type="button" onClick={handleSave} className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition disabled:opacity-50 disabled:cursor-not-allowed" disabled={totalPercentage !== 100}>
				Save
			</button>
		</div>
	);
};

export default RevenueShareForm;
