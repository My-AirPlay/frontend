'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AlertTriangle, Loader2, Pause, Play, SkipForward, FastForward, Rewind } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';
import { FileKind, ReviewTrack, useMediaPreviews } from '../api/reviewQueue';
import { durationFlag, formatDuration, previewError } from './duration';

interface MediaPlayerProps {
	tracks: ReviewTrack[];
	fileType: FileKind;
}

/** How much of the ending "Play ending" jumps to, to catch abrupt cuts. */
const ENDING_SECONDS = 20;

/**
 * Listen to (or watch) a release in the browser. One player for the selected
 * track; the list shows every track's length so short or overlong ones stand out.
 */
const MediaPlayer: React.FC<MediaPlayerProps> = ({ tracks, fileType }) => {
	const playable = useMemo(() => tracks.filter(t => t.hasFile), [tracks]);
	const previews = useMediaPreviews(playable.map(t => t.id));
	const previewById = useMemo(() => {
		const map: Record<string, (typeof previews)[number]> = {};
		playable.forEach((t, i) => (map[t.id] = previews[i]));
		return map;
	}, [playable, previews]);

	const [currentId, setCurrentId] = useState<string | null>(playable[0]?.id ?? null);
	const [playing, setPlaying] = useState(false);
	const [durations, setDurations] = useState<Record<string, number>>({});
	const [mediaError, setMediaError] = useState<string | null>(null);
	const mediaRef = useRef<HTMLAudioElement & HTMLVideoElement>(null);
	const playOnLoad = useRef(false);

	// A different release: start again from its first track.
	const trackKey = tracks.map(t => t.id).join(',');
	useEffect(() => {
		setCurrentId(playable[0]?.id ?? null);
		setPlaying(false);
		setDurations({});
		setMediaError(null);
		playOnLoad.current = false;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [trackKey]);

	const current = tracks.find(t => t.id === currentId) ?? null;
	const currentPreview = currentId ? previewById[currentId] : undefined;
	const src = currentPreview?.data?.url;
	const isVideo = fileType === 'video' || current?.fileType === 'video';

	const recordDuration = useCallback((id: string, seconds: number) => {
		if (!Number.isFinite(seconds)) return;
		setDurations(d => (d[id] === seconds ? d : { ...d, [id]: seconds }));
	}, []);

	const select = (id: string, autoplay: boolean) => {
		if (id === currentId) {
			const el = mediaRef.current;
			if (!el) return;
			if (el.paused) el.play().catch(() => undefined);
			else el.pause();
			return;
		}
		playOnLoad.current = autoplay;
		setMediaError(null);
		setCurrentId(id);
	};

	const nextTrack = () => {
		const i = playable.findIndex(t => t.id === currentId);
		const next = playable[i + 1];
		if (next) select(next.id, true);
	};

	const seekBy = (delta: number) => {
		const el = mediaRef.current;
		if (el) el.currentTime = Math.max(0, Math.min(el.duration || 0, el.currentTime + delta));
	};

	const playEnding = () => {
		const el = mediaRef.current;
		if (!el || !Number.isFinite(el.duration)) return;
		el.currentTime = Math.max(0, el.duration - ENDING_SECONDS);
		el.play().catch(() => undefined);
	};

	if (tracks.length === 0) {
		return <p className="text-sm text-muted-foreground">This release has no tracks.</p>;
	}

	const mediaProps = {
		ref: mediaRef,
		src,
		controls: true,
		preload: 'metadata' as const,
		onLoadedMetadata: (e: React.SyntheticEvent<HTMLMediaElement>) => {
			if (currentId) recordDuration(currentId, e.currentTarget.duration);
			if (playOnLoad.current) {
				playOnLoad.current = false;
				e.currentTarget.play().catch(() => undefined);
			}
		},
		onPlay: () => setPlaying(true),
		onPause: () => setPlaying(false),
		onEnded: () => {
			setPlaying(false);
			nextTrack();
		},
		onError: () => setMediaError('The browser couldn’t play this file. Download it to check.')
	};

	const currentFlag = currentId ? durationFlag(durations[currentId]) : null;

	return (
		<div className="space-y-3">
			<div className="rounded-lg border border-border bg-background/40 p-3 space-y-3">
				<div className="flex items-center justify-between gap-3 min-w-0">
					<div className="min-w-0">
						<p className="text-xs text-muted-foreground">
							{isVideo ? 'Now watching' : 'Now playing'}
							{currentId && durations[currentId] != null && ` · ${formatDuration(durations[currentId])} long`}
						</p>
						<p className="font-medium truncate">{current ? `${tracks.length > 1 ? `${current.position}. ` : ''}${current.title}` : 'Nothing playable'}</p>
					</div>
					{currentFlag && (
						<span className="shrink-0 inline-flex items-center gap-1 rounded-md bg-amber-500/15 text-amber-500 px-2 py-1 text-xs" title={currentFlag.hint}>
							<AlertTriangle size={12} /> {currentFlag.label}
						</span>
					)}
				</div>

				{currentPreview?.isLoading ? (
					<div className="h-12 flex items-center gap-2 text-sm text-muted-foreground">
						<Loader2 size={16} className="animate-spin" /> Loading…
					</div>
				) : currentPreview?.isError ? (
					<p className="text-sm text-destructive">{previewError(currentPreview.error)}</p>
				) : src ? (
					isVideo ? (
						<video key={src} {...mediaProps} playsInline className="w-full max-h-[60vh] rounded-md bg-black" />
					) : (
						<audio key={src} {...mediaProps} className="w-full" />
					)
				) : (
					<p className="text-sm text-muted-foreground">No file attached.</p>
				)}
				{mediaError && <p className="text-sm text-destructive">{mediaError}</p>}

				{src && (
					<div className="flex flex-wrap gap-2">
						<Button variant="outline" size="sm" onClick={() => seekBy(-15)}>
							<Rewind size={14} className="mr-1" /> 15s
						</Button>
						<Button variant="outline" size="sm" onClick={() => seekBy(15)}>
							<FastForward size={14} className="mr-1" /> 15s
						</Button>
						<Button variant="outline" size="sm" onClick={playEnding} title="Jump to the last 20 seconds to check it doesn’t end abruptly">
							Play ending
						</Button>
						{playable.length > 1 && (
							<Button variant="outline" size="sm" onClick={nextTrack} disabled={playable[playable.length - 1]?.id === currentId}>
								<SkipForward size={14} className="mr-1" /> Next track
							</Button>
						)}
					</div>
				)}
			</div>

			{tracks.length > 1 && (
				<ol className="divide-y divide-border rounded-lg border border-border">
					{tracks.map(t => {
						const preview = previewById[t.id];
						const isCurrent = t.id === currentId;
						const flag = durationFlag(durations[t.id]);
						const error = !t.hasFile ? 'No file' : preview?.isError ? previewError(preview.error) : null;
						return (
							<li key={t.id} className={cn('flex items-center gap-3 px-3 py-2 text-sm', isCurrent && 'bg-primary/10')}>
								<Button variant="ghost" size="icon" className="size-8 shrink-0" disabled={!!error || !preview?.data} onClick={() => select(t.id, true)} aria-label={isCurrent && playing ? `Pause ${t.title}` : `Play ${t.title}`}>
									{preview?.isLoading ? <Loader2 size={14} className="animate-spin" /> : isCurrent && playing ? <Pause size={14} /> : <Play size={14} />}
								</Button>
								<span className="w-6 shrink-0 text-muted-foreground font-mono">{t.position}</span>
								<div className="min-w-0 flex-1">
									<p className={cn('truncate', isCurrent && 'text-primary')}>{t.title}</p>
									<p className="text-xs text-muted-foreground truncate">{[t.featuredArtists && `feat. ${t.featuredArtists}`, t.isrcCode && `ISRC ${t.isrcCode}`, t.extension?.replace('.', '').toUpperCase()].filter(Boolean).join(' · ')}</p>
									{error && <p className="text-xs text-destructive">{error}</p>}
								</div>
								{flag && (
									<span className="hidden sm:inline-flex shrink-0 items-center gap-1 rounded-md bg-amber-500/15 text-amber-500 px-2 py-0.5 text-xs" title={flag.hint}>
										<AlertTriangle size={12} /> {flag.label}
									</span>
								)}
								<span className={cn('w-14 shrink-0 text-right font-mono tabular-nums', flag ? 'text-amber-500' : 'text-muted-foreground')}>{formatDuration(durations[t.id])}</span>
								{/* Reads just the header to learn the length. */}
								{preview?.data?.url && durations[t.id] == null && !isCurrent && <audio className="hidden" preload="metadata" src={preview.data.url} onLoadedMetadata={e => recordDuration(t.id, e.currentTarget.duration)} />}
							</li>
						);
					})}
				</ol>
			)}
		</div>
	);
};

export default MediaPlayer;
