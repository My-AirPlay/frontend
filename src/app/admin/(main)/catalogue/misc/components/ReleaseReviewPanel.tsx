/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Textarea } from '@/components/ui';
import { CheckCircle2, ExternalLink, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useReviewRelease } from '../../api/reviewRelease';
import { useGetOneArtist } from '../../api/getOneArtist';
import { DSP_LABELS, REQUIRED_DSPS } from '@/lib/dsp';

interface ReleaseReviewPanelProps {
	releaseId: string;
	/** Whose streaming pages the release should be attached to in FUGA. */
	artistId?: string;
	reviewStatus?: 'pending' | 'approved' | 'rejected' | string;
	rejectionReasons?: string[];
	/** Called after a decision is saved, e.g. to move on to the next release. */
	onReviewed?: (decision: 'approved' | 'rejected') => void;
}

/** Common reasons, one tap to add. */
const QUICK_REASONS = ['Mixtapes are not accepted. Upload each song as its own release.', 'The song ends abruptly or is cut off.', 'Poor audio quality (distorted, very quiet or clipping).', 'Cover art doesn’t meet store requirements (3000x3000, no blur, logos or website links).', 'Explicit content is not marked as explicit.', 'Title or artist name doesn’t match the audio.'];

const STATUS_BADGE: Record<string, { variant: any; label: string }> = {
	pending: { variant: 'outline', label: 'Pending review' },
	approved: { variant: 'success', label: 'Approved' },
	rejected: { variant: 'destructive', label: 'Rejected' }
};

const ReleaseReviewPanel: React.FC<ReleaseReviewPanelProps> = ({ releaseId, artistId, reviewStatus = 'pending', rejectionReasons = [], onReviewed }) => {
	const reviewMutation = useReviewRelease();
	const { data: artist } = useGetOneArtist({ artistId: artistId ?? '' });
	const profiles: { dsp: string; url: string }[] = artist?.dspProfiles ?? [];
	const newOn: string[] = artist?.newOnDsps ?? [];
	const [rejectOpen, setRejectOpen] = useState(false);
	const [reasonsText, setReasonsText] = useState('');

	const badge = STATUS_BADGE[reviewStatus] || { variant: 'outline', label: reviewStatus };

	const handleApprove = async () => {
		try {
			await reviewMutation.mutateAsync({ releaseId, decision: 'approved' });
			toast.success('Release approved');
			onReviewed?.('approved');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to approve release');
		}
	};

	const handleReject = async () => {
		const reasons = reasonsText
			.split('\n')
			.map(r => r.trim())
			.filter(Boolean);
		if (reasons.length === 0) {
			toast.error('Add at least one rejection reason (one per line).');
			return;
		}
		try {
			await reviewMutation.mutateAsync({ releaseId, decision: 'rejected', reasons });
			toast.success('Release rejected — the artist has been notified');
			setRejectOpen(false);
			setReasonsText('');
			onReviewed?.('rejected');
		} catch (error: any) {
			toast.error(error?.response?.data?.message || 'Failed to reject release');
		}
	};

	return (
		<div className="bg-secondary rounded-lg p-4 space-y-3">
			<div className="flex items-center justify-between gap-4">
				<div className="flex items-center gap-3">
					<span className="text-sm font-medium">Review status</span>
					<Badge variant={badge.variant}>{badge.label}</Badge>
				</div>
				<div className="flex items-center gap-2">
					<Button variant="outline" size="sm" className="text-green-600 hover:text-green-700" onClick={handleApprove} disabled={reviewMutation.isPending || reviewStatus === 'approved'}>
						<CheckCircle2 size={16} className="mr-1" />
						Approve
					</Button>
					<Button
						variant="ghost"
						size="sm"
						className="text-destructive hover:text-destructive hover:bg-destructive/10"
						onClick={() => {
							setReasonsText((rejectionReasons || []).join('\n'));
							setRejectOpen(true);
						}}
						disabled={reviewMutation.isPending}
					>
						<XCircle size={16} className="mr-1" />
						Reject
					</Button>
				</div>
			</div>

			{artistId && artist && (
				<div className="text-sm">
					<p className="text-muted-foreground mb-1">Artist pages: attach the release to these in FUGA</p>
					<ul className="space-y-0.5">
						{REQUIRED_DSPS.map(dsp => {
							const link = profiles.find(p => p.dsp === dsp)?.url;
							return (
								<li key={dsp} className="flex gap-2">
									<span className="w-28 shrink-0">{DSP_LABELS[dsp] ?? dsp}</span>
									{link ? (
										<a href={link} target="_blank" rel="noreferrer" className="text-primary hover:underline inline-flex items-center gap-1 break-all">
											{link} <ExternalLink size={12} />
										</a>
									) : newOn.includes(dsp) ? (
										<span>New artist: create a page</span>
									) : (
										<span className="text-destructive">Not provided</span>
									)}
								</li>
							);
						})}
						{profiles
							.filter(p => !(REQUIRED_DSPS as readonly string[]).includes(p.dsp))
							.map(p => (
								<li key={p.dsp} className="flex gap-2">
									<span className="w-28 shrink-0">{p.dsp}</span>
									<a href={p.url} target="_blank" rel="noreferrer" className="text-primary hover:underline break-all">
										{p.url}
									</a>
								</li>
							))}
					</ul>
				</div>
			)}

			{reviewStatus === 'rejected' && rejectionReasons.length > 0 && (
				<div className="text-sm">
					<p className="text-muted-foreground mb-1">Rejection reasons:</p>
					<ul className="list-disc list-inside text-destructive space-y-0.5">
						{rejectionReasons.map((r, i) => (
							<li key={i}>{r}</li>
						))}
					</ul>
				</div>
			)}

			<Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Reject release</DialogTitle>
						<DialogDescription>Enter one reason per line. The artist is emailed these reasons and can fix &amp; resubmit. Any pending FUGA delivery is cancelled.</DialogDescription>
					</DialogHeader>
					<div className="space-y-3">
						<div className="flex flex-wrap gap-1.5">
							{QUICK_REASONS.map(reason => {
								const added = reasonsText.split('\n').some(line => line.trim() === reason);
								return (
									<button key={reason} type="button" disabled={added} onClick={() => setReasonsText(text => (text.trim() ? `${text.trimEnd()}\n${reason}` : reason))} className="rounded-full border border-border px-2.5 py-1 text-xs text-left hover:bg-secondary disabled:opacity-40">
										+ {reason}
									</button>
								);
							})}
						</div>
						<Textarea autoResize minRows={4} placeholder={'e.g.\nArtwork must be 1400x1400 or 3000x3000\nMissing songwriter credits'} value={reasonsText} onChange={e => setReasonsText(e.target.value)} />
						<div className="flex justify-end gap-2">
							<Button variant="outline" size="sm" onClick={() => setRejectOpen(false)}>
								Cancel
							</Button>
							<Button variant="destructive" size="sm" onClick={handleReject} disabled={reviewMutation.isPending}>
								{reviewMutation.isPending ? 'Rejecting...' : 'Reject & notify artist'}
							</Button>
						</div>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ReleaseReviewPanel;
