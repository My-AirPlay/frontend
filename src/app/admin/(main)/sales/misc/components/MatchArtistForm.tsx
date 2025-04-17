import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, User } from 'lucide-react';
import { useGetAllArtists } from '../../../catalogue/api/getAllArtistsParams';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { Artist } from '@/lib/types';

interface MatchArtistFormProps {
	onMatch: (artistId: string) => void;
	onCreateNew: () => void;
	unmatchedArtistName?: string;
}

const MatchArtistForm: React.FC<MatchArtistFormProps> = ({ onMatch, onCreateNew }) => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
	const { data: artists, isLoading: contractsLoading } = useGetAllArtists({ page: '1', limit: '100' });

	const handleSelectArtist = (artist: Artist) => {
		setSelectedArtist(artist);
		setIsDropdownOpen(false);
	};

	const handleUpdate = () => {
		if (selectedArtist) {
			onMatch(selectedArtist._id);
		}
	};

	return (
		<div className="space-y-6">
			<h1 className="text-2xl font-semibold">Unmatched Artist</h1>

			<p className="mb-4">Kindly select and match the artist whose profile it belongs to among the list of artists here</p>

			<p className="text-primary mb-4">*You can create new artist if you can not find the preferred artist*</p>

			<div className="space-y-4 mb-6">
				<h2 className="font-medium">Artist List (Select one)</h2>

				<div className="relative">
					<div className="flex items-center justify-between bg-secondary border border-border rounded-md p-3 cursor-pointer" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
						<span className="textwhite/50">{selectedArtist ? selectedArtist.artistName : 'Select artist'}</span>
						<ChevronDown size={20} />
					</div>

					{contractsLoading ? (
						<div className="absolute left-0 right-0 mt-1 max-h-80 overflow-y-auto bg-secondary border border-border rounded-md z-10 shadow-lg flex items-center justify-center">
							<LoadingBox size={32} />
						</div>
					) : (
						isDropdownOpen && (
							<div className="absolute left-0 right-0 mt-1 max-h-80 overflow-y-auto bg-secondary border border-border rounded-md z-10 shadow-lg">
								{artists?.data?.map(artist => (
									<div key={artist._id} className="flex items-center space-x-3 p-3 hover:bg-accent/20 cursor-pointer" onClick={() => handleSelectArtist(artist)}>
										<div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
											<User size={16} />
										</div>
										<span className="flex-1">{artist.artistName || '-'}</span>
										{artist.isNew && <span className="bg-primary text-white text-xs px-2 py-1 rounded-sm">New</span>}
									</div>
								))}

								<div className="p-3 text-primary hover:bg-accent/20 cursor-pointer" onClick={onCreateNew}>
									Add New Artist
								</div>
							</div>
						)
					)}
				</div>
			</div>

			<div className="flex items-center space-x-3 mb-6">
				<span className="textwhite/50">Can&apost find artist?</span>
				<Button variant="link" className="text-primary p-0 h-auto" onClick={onCreateNew}>
					Create New Artist
				</Button>
			</div>

			<div className="flex justify-center mt-8">
				<Button className="bg-primary hover:bg-primary/90 text-white px-8" onClick={handleUpdate} disabled={!selectedArtist}>
					Update
				</Button>
			</div>
		</div>
	);
};

export default MatchArtistForm;
