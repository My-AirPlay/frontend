import React from 'react';
import { getReleaseStatus, TReleaseStatusFields, TReleaseStatusKind } from '../utils/releaseStatus';

const STYLES: Record<TReleaseStatusKind, string> = {
	in_review: 'bg-zinc-500/15 text-zinc-300',
	approved: 'bg-green-500/15 text-green-500',
	rejected: 'bg-red-500/15 text-red-500',
	takedown_requested: 'bg-amber-500/15 text-amber-500',
	removed: 'bg-zinc-500/15 text-zinc-400'
};

/**
 * The release's status pill on a catalog card. A rejected release the artist
 * can fix gets `onFixRejected`, which turns the pill into the way in to the
 * edit sheet.
 */
const ReleaseStatusBadge = ({ release, onFixRejected, rejectedLabel }: { release: TReleaseStatusFields; onFixRejected?: () => void; rejectedLabel?: string }) => {
	const { kind, label } = getReleaseStatus(release);
	const className = `mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${STYLES[kind]}`;

	if (kind === 'rejected' && onFixRejected) {
		return (
			<button
				type="button"
				onClick={e => {
					e.stopPropagation();
					onFixRejected();
				}}
				className={`${className} hover:bg-red-500/25`}
			>
				Rejected — edit to resubmit
			</button>
		);
	}

	return <span className={className}>{kind === 'rejected' && rejectedLabel ? rejectedLabel : label}</span>;
};

export default ReleaseStatusBadge;
