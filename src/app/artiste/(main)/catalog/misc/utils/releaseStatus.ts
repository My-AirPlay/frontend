import { format, isAfter } from 'date-fns';

export interface TReleaseTakedown {
	status: 'requested' | 'completed' | 'declined';
	reason?: string;
	requestedAt: string;
	resolvedAt?: string;
	adminNote?: string;
}

export interface TReleaseStatusFields {
	reviewStatus?: 'pending' | 'approved' | 'rejected';
	rejectionReasons?: string[];
	releaseDate?: string;
	takedown?: TReleaseTakedown;
	fugaDelivery?: { status?: string; firstDeliveredAt?: string };
}

export type TReleaseStatusKind = 'removed' | 'takedown_requested' | 'rejected' | 'approved' | 'in_review';

/**
 * What the artist sees as a release's status. A takedown outranks review: once
 * the artist has asked for a release to come down, that's what they're
 * waiting on. A declined takedown falls back to the review status.
 */
export const getReleaseStatus = (release: TReleaseStatusFields): { kind: TReleaseStatusKind; label: string } => {
	if (release.takedown?.status === 'completed') return { kind: 'removed', label: 'Removed from stores' };
	if (release.takedown?.status === 'requested') return { kind: 'takedown_requested', label: 'Takedown requested' };
	if (release.reviewStatus === 'rejected') return { kind: 'rejected', label: 'Rejected' };
	if (release.reviewStatus === 'approved') {
		const releaseDate = release.releaseDate ? new Date(release.releaseDate) : null;
		return {
			kind: 'approved',
			label: releaseDate && isAfter(releaseDate, new Date()) ? `Approved · releases ${format(releaseDate, 'MMM d, yyyy')}` : 'Approved'
		};
	}
	return { kind: 'in_review', label: 'In review' };
};

/** A takedown can be asked for once the release has reached stores, and not while one is open or done. */
export const canRequestTakedown = (release: TReleaseStatusFields) => !!release.fugaDelivery?.firstDeliveredAt && release.takedown?.status !== 'requested' && release.takedown?.status !== 'completed';
