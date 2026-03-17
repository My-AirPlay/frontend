'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Music, Loader2 } from 'lucide-react';
import { getArtistMedia, ArtistMediaItem } from '../api/catalogueMatch';

interface LinkMediaModalProps {
	artistId: string;
	trackTitle: string;
	onLink: (mediaId: string) => void;
	onClose: () => void;
}

const LinkMediaModal: React.FC<LinkMediaModalProps> = ({ artistId, trackTitle, onLink, onClose }) => {
	const [mediaItems, setMediaItems] = useState<ArtistMediaItem[]>([]);
	const [loading, setLoading] = useState(true);
	const [selectedId, setSelectedId] = useState<string | null>(null);
	const [linking, setLinking] = useState(false);

	useEffect(() => {
		const fetchMedia = async () => {
			try {
				const data = await getArtistMedia(artistId);
				setMediaItems(data);
			} catch {
				setMediaItems([]);
			} finally {
				setLoading(false);
			}
		};
		fetchMedia();
	}, [artistId]);

	const handleLink = async () => {
		if (!selectedId) return;
		setLinking(true);
		onLink(selectedId);
	};

	return (
		<div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
			<div className="bg-secondary border border-border rounded-lg w-full max-w-lg max-h-[80vh] flex flex-col">
				<div className="flex items-center justify-between p-4 border-b border-border">
					<div>
						<h3 className="text-lg font-semibold text-white">Link to Catalogue</h3>
						<p className="text-sm text-muted-foreground mt-1">Select media for &quot;{trackTitle}&quot;</p>
					</div>
					<button onClick={onClose} className="text-muted-foreground hover:text-white">
						<X size={20} />
					</button>
				</div>

				<div className="flex-1 overflow-y-auto p-4">
					{loading ? (
						<div className="flex justify-center items-center py-12">
							<Loader2 className="animate-spin text-muted-foreground" size={24} />
						</div>
					) : mediaItems.length === 0 ? (
						<div className="flex flex-col items-center justify-center py-12 text-center">
							<Music size={40} className="text-muted-foreground mb-3" />
							<p className="text-muted-foreground">No media uploads found for this artist.</p>
						</div>
					) : (
						<div className="space-y-2">
							{mediaItems.map(item => (
								<button key={item._id} onClick={() => setSelectedId(item._id)} className={`w-full text-left p-3 rounded-md border transition-colors ${selectedId === item._id ? 'border-primary bg-primary/10' : 'border-border hover:border-muted-foreground/50'}`}>
									<p className="font-medium text-white">{item.title}</p>
									<div className="flex gap-3 mt-1 text-xs text-muted-foreground">
										{item.universalProductCode && <span>UPC: {item.universalProductCode}</span>}
										{item.isrcCode && <span>ISRC: {item.isrcCode}</span>}
										{item.releaseDate && <span>Released: {new Date(item.releaseDate).toLocaleDateString()}</span>}
									</div>
								</button>
							))}
						</div>
					)}
				</div>

				<div className="flex justify-end gap-2 p-4 border-t border-border">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={handleLink} disabled={!selectedId || linking} isLoading={linking}>
						Link
					</Button>
				</div>
			</div>
		</div>
	);
};

export default LinkMediaModal;
