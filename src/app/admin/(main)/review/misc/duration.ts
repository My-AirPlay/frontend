/** Shorter than this is unusual for a song and worth a listen to the end. */
export const SHORT_TRACK_SECONDS = 60;
/** Longer than this is often a mixtape or DJ mix uploaded as one track. */
export const LONG_TRACK_SECONDS = 12 * 60;

export function formatDuration(seconds?: number | null): string {
	if (seconds == null || !Number.isFinite(seconds)) return '--:--';
	const total = Math.round(seconds);
	const h = Math.floor(total / 3600);
	const m = Math.floor((total % 3600) / 60);
	const s = String(total % 60).padStart(2, '0');
	return h > 0 ? `${h}:${String(m).padStart(2, '0')}:${s}` : `${m}:${s}`;
}

export type DurationFlag = { label: string; hint: string } | null;

export function durationFlag(seconds?: number | null): DurationFlag {
	if (seconds == null || !Number.isFinite(seconds)) return null;
	if (seconds < SHORT_TRACK_SECONDS) return { label: 'Very short', hint: 'Under a minute. Check it isn’t cut off.' };
	if (seconds > LONG_TRACK_SECONDS) return { label: 'Very long', hint: 'Over 12 minutes. Could be a mixtape or DJ mix.' };
	return null;
}

export function previewError(error: unknown): string {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const e = error as any;
	return e?.response?.data?.message || 'Couldn’t load the file';
}
