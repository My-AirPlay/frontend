
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface ArtistOverviewProps {
    artistId: number;
}

interface MediaItemProps {
    title: string;
    type: string;
    album: string;
    tracks: number;
    platforms: string[];
}

const MediaItem: React.FC<MediaItemProps> = ({ title, type, album, tracks, platforms }) => {
    return (
        <div className="bg-admin-secondary/80 rounded-md p-4 flex gap-4">
            <div className="relative w-12 h-12 bg-purple-600 rounded-md text-white">
                <Image
                    src={`/images/placeholder_images/album-cover.png`}
                    alt={"album cover"}
                    fill
                />
            </div>
            <div className="flex flex-col gap-1">
                <p className="font-medium">{title}</p>
                <div className="text-xs text-[#898989] gap-x-8 gap-y-1">
                    <div className="flex items-center gap-2.5">
                        <span>Type:</span>
                        <span className="ml-1">{type}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span>Album:</span>
                        <span className="ml-1">{album}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span>Tracks:</span>
                        <span className="ml-1">{tracks}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <span>Platforms:</span>
                        <div className="inline-flex ml-1 gap-1">
                            {platforms.map((platform, index) => (
                                <div
                                    key={index}
                                    className="size-8 rounded-full flex items-center justify-center bg-white/20 -ml-2.5"
                                >
                                    <Image
                                        src={`/images/platform_logos/${platform}.svg`}
                                        alt={platform}
                                        width={20}
                                        height={20}
                                    />
                                </div>
                                // <span 
                                //   key={platform} 
                                //   className="w-4 h-4 rounded-full" 
                                //   style={{ 
                                //     backgroundColor: 
                                //       platform === 'spotify' ? '#1DB954' : 
                                //       platform === 'C' ? '#FC3C44' : 
                                //       platform === 'youtube' ? '#FF0000' : 
                                //       platform === 'amazon' ? '#00A8E1' : 
                                //       '#888' 
                                //   }}
                                // />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArtistOverview: React.FC<ArtistOverviewProps> = ({ artistId }) => {
    // Mock data
    const streamingItems = [
        {
            title: "California King Bed",
            type: "Album",
            album: "California King Bed",
            tracks: 5,
            platforms: ["spotify", "apple", "youtube", "amazon"]
        },
        {
            title: "California King Bed",
            type: "Album",
            album: "California King Bed",
            tracks: 8,
            platforms: ["spotify", "apple", "youtube", "amazon"]
        },
        {
            title: "California King Bed",
            type: "Album",
            album: "California King Bed",
            tracks: 6,
            platforms: ["spotify", "apple", "youtube", "amazon"]
        }
    ];

    const downloadItems = [...streamingItems];

    return (
        <div className="space-y-8">
            {/* Streaming Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold bg-admin-primary/10 text-admin-primary px-3 py-1 rounded">
                        Streaming
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs text-admin-muted">
                        View All <ArrowRight size={14} className="ml-1" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {streamingItems.map((item, index) => (
                        <MediaItem key={`streaming-${index}`} {...item} />
                    ))}
                </div>
            </div>

            {/* Downloads Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold bg-admin-primary/10 text-admin-primary px-3 py-1 rounded">
                        Downloads
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs text-admin-muted">
                        View All <ArrowRight size={14} className="ml-1" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {downloadItems.map((item, index) => (
                        <MediaItem key={`download-${index}`} {...item} />
                    ))}
                </div>
            </div>

            {/* Royalties Section */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold bg-admin-primary/10 text-admin-primary px-3 py-1 rounded">
                        Royalties
                    </h3>
                    <Button variant="ghost" size="sm" className="text-xs text-admin-muted">
                        View All <ArrowRight size={14} className="ml-1" />
                    </Button>
                </div>

                <div className="p-8 text-center text-admin-muted">
                    No royalties found with this artist.
                </div>
            </div>
        </div>
    );
};

export default ArtistOverview;
