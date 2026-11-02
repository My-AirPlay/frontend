/**
 * Platforms every artist must account for before uploading: a link to their artist
 * page, or "I'm not on it yet" so a new page is created. Without one or the other we
 * can't tell FUGA which page a release belongs to, and an existing artist ends up
 * with a second, empty page. Mirrors REQUIRED_DSPS on the server.
 */
export const REQUIRED_DSPS = ['Spotify', 'Apple Music / iTunes'] as const;

export const DSP_LABELS: Record<string, string> = {
	Spotify: 'Spotify',
	'Apple Music / iTunes': 'Apple Music'
};

const ARTIST_PAGE: Record<string, { host: RegExp; example: string }> = {
	Spotify: { host: /(^|\.)spotify\.com$/i, example: 'https://open.spotify.com/artist/…' },
	'Apple Music / iTunes': { host: /(^|\.)apple\.com$/i, example: 'https://music.apple.com/…/artist/…' }
};

/** Why a link isn't an artist page on that platform, or null when it's fine. */
export function artistPageLinkError(dsp: string, url: string): string | null {
	const rule = ARTIST_PAGE[dsp];
	if (!rule || !url) return null;
	try {
		const parsed = new URL(url.trim());
		if (rule.host.test(parsed.hostname) && parsed.pathname.includes('/artist/')) return null;
	} catch {
		// fall through
	}
	return `Use your ${DSP_LABELS[dsp] ?? dsp} artist page, like ${rule.example}. A song or album link won't work.`;
}

/** Required platforms the artist has neither linked nor declared themselves new on. */
export function missingRequiredDsps(artist?: { dspProfiles?: { dsp: string; url: string }[]; newOnDsps?: string[] } | null): string[] {
	const accounted = new Set([...(artist?.dspProfiles ?? []).filter(p => p.url?.trim()).map(p => p.dsp), ...(artist?.newOnDsps ?? [])]);
	return REQUIRED_DSPS.filter(dsp => !accounted.has(dsp));
}

/** Validation shared by onboarding (yup) and settings (zod): returns the first problem. */
export function dspProfilesError(dspProfiles: { dsp: string; url: string }[] = [], newOnDsps: string[] = []): string | null {
	for (const profile of dspProfiles) {
		const error = artistPageLinkError(profile.dsp, profile.url);
		if (error) return error;
	}
	const missing = missingRequiredDsps({ dspProfiles, newOnDsps });
	if (missing.length) {
		return `Add your ${missing.map(d => DSP_LABELS[d] ?? d).join(' and ')} artist page, or tick "I'm not on it yet".`;
	}
	return null;
}
