'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import moment from 'moment';
import { ArrowLeft, ExternalLink, ImageOff } from 'lucide-react';
import { Badge, Button } from '@/components/ui';
import { LoadingBox } from '@/components/ui/LoadingBox';
import ReleaseReviewPanel from '../../catalogue/misc/components/ReleaseReviewPanel';
import { useReviewRelease } from '../api/reviewQueue';
import MediaPlayer from './MediaPlayer';

interface ReviewDetailProps {
	id: string;
	onBack: () => void;
	onReviewed: () => void;
}

const DIR_TYPE_LABEL: Record<string, string> = {
	album: 'Album',
	extended_play: 'EP',
	mix_tape: 'Mixtape',
	playback: 'Playback',
	folder: 'Folder'
};

const Field = ({ label, value }: { label: string; value?: React.ReactNode }) => (
	<div className="min-w-0">
		<p className="text-xs text-muted-foreground">{label}</p>
		<p className="text-sm font-medium break-words">{value || <span className="text-muted-foreground font-normal">-</span>}</p>
	</div>
);

const formatDate = (d?: string | null) => (d ? moment(d).format('D MMM YYYY') : undefined);

const ReviewDetail: React.FC<ReviewDetailProps> = ({ id, onBack, onReviewed }) => {
	const { data: release, isLoading, isError } = useReviewRelease(id);
	const [showLyrics, setShowLyrics] = useState(false);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[40vh]">
				<LoadingBox size={48} />
			</div>
		);
	}
	if (isError || !release) {
		return <p className="text-sm text-destructive p-4">Couldn’t load this release.</p>;
	}

	const typeLabel = release.type === 'album' ? (DIR_TYPE_LABEL[release.dirType ?? ''] ?? 'Album') : release.fileType === 'video' ? 'Music video' : 'Single';
	const catalogueHref = release.type === 'album' ? `/admin/catalogue/releases/${release.id}` : `/admin/catalogue/tracks/${release.id}`;

	return (
		<div className="space-y-5 min-w-0">
			<Button variant="ghost" size="sm" className="lg:hidden -ml-2" onClick={onBack}>
				<ArrowLeft size={16} className="mr-1" /> Back to queue
			</Button>

			<div className="flex flex-col sm:flex-row gap-4">
				{release.coverArtUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<a href={release.coverArtUrl} target="_blank" rel="noreferrer" title="Open full-size cover" className="shrink-0">
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={release.coverArtUrl} alt={`${release.title} cover`} className="size-36 sm:size-40 rounded-lg object-cover border border-border" />
					</a>
				) : (
					<div className="size-36 sm:size-40 shrink-0 rounded-lg border border-dashed border-border flex flex-col items-center justify-center text-xs text-muted-foreground gap-1">
						<ImageOff size={20} /> No cover
					</div>
				)}
				<div className="min-w-0 space-y-1.5">
					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="secondary">{typeLabel}</Badge>
						{release.type === 'album' && <span className="text-xs text-muted-foreground">{release.tracks.length} tracks</span>}
						{release.explicitContent === 'Yes' && <Badge variant="outline">Explicit</Badge>}
					</div>
					<h2 className="text-xl md:text-2xl font-semibold break-words">
						{release.title}
						{release.releaseVersion ? <span className="text-muted-foreground font-normal"> ({release.releaseVersion})</span> : null}
					</h2>
					<p className="text-sm">
						<Link href={`/admin/contracts/${release.artistId}/overview`} className="text-primary hover:underline">
							{release.artistName}
						</Link>
						{release.featuredArtists ? <span className="text-muted-foreground"> feat. {release.featuredArtists}</span> : null}
					</p>
					<p className="text-xs text-muted-foreground">
						Submitted {moment(release.createdAt).fromNow()} · Release date {formatDate(release.releaseDate) ?? 'not set'}
					</p>
					<Link href={catalogueHref} className="text-xs text-primary hover:underline inline-flex items-center gap-1">
						Open in catalogue <ExternalLink size={12} />
					</Link>
				</div>
			</div>

			{release.parentAlbum ? (
				<div className="bg-secondary rounded-lg p-4 text-sm">
					This track is reviewed with its album,{' '}
					<Link href={`/admin/review?id=${release.parentAlbum.id}`} className="text-primary hover:underline">
						{release.parentAlbum.title || 'view album'}
					</Link>
					.
				</div>
			) : (
				<ReleaseReviewPanel releaseId={release.id} artistId={release.artistId} reviewStatus={release.reviewStatus} rejectionReasons={release.rejectionReasons} onReviewed={onReviewed} />
			)}

			<section className="space-y-2">
				<h3 className="text-sm font-medium">{release.fileType === 'video' ? 'Watch' : 'Listen'}</h3>
				{release.missingTracks > 0 && (
					<p className="text-sm text-destructive">
						{release.missingTracks} track{release.missingTracks === 1 ? ' is' : 's are'} missing from this release. Ask the artist to re-add {release.missingTracks === 1 ? 'it' : 'them'}.
					</p>
				)}
				<MediaPlayer tracks={release.tracks} fileType={release.fileType} />
			</section>

			<section className="bg-secondary rounded-lg p-4 grid grid-cols-2 md:grid-cols-3 gap-4">
				<Field label="Genre" value={[release.mainGenre, ...(release.secondaryGenres ?? [])].filter(Boolean).join(', ')} />
				<Field label="Record label" value={release.recordLabel} />
				<Field label="Publisher" value={release.publisher} />
				<Field label="Writer" value={release.writer} />
				<Field label="Producer" value={release.producer} />
				<Field label="Copyright" value={release.copyright} />
				<Field label="UPC" value={release.universalProductCode} />
				<Field label="Original release date" value={formatDate(release.originalReleaseDate)} />
				<Field label="Explicit" value={release.explicitContent} />
				<div className="col-span-2 md:col-span-3">
					<Field
						label="Stores"
						value={
							release.streamingPlatforms.length ? (
								<span className="flex flex-wrap gap-1.5 mt-1">
									{release.streamingPlatforms.map(p => (
										<span key={p} className="rounded-full border border-border px-2.5 py-0.5 text-xs font-normal capitalize">
											{p}
										</span>
									))}
								</span>
							) : undefined
						}
					/>
				</div>
				{release.description && (
					<div className="col-span-2 md:col-span-3">
						<Field label="Notes from the artist" value={<span className="whitespace-pre-wrap font-normal">{release.description}</span>} />
					</div>
				)}
				{release.lyrics && (
					<div className="col-span-2 md:col-span-3">
						<button type="button" className="text-xs text-primary hover:underline" onClick={() => setShowLyrics(v => !v)}>
							{showLyrics ? 'Hide lyrics' : 'Show lyrics'}
						</button>
						{showLyrics && <p className="mt-2 text-sm whitespace-pre-wrap">{release.lyrics}</p>}
					</div>
				)}
			</section>
		</div>
	);
};

export default ReviewDetail;
