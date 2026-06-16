/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, Textarea } from '@/components/ui';
import { CheckCircle2, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useReviewRelease } from '../../api/reviewRelease';

interface ReleaseReviewPanelProps {
	releaseId: string;
	reviewStatus?: 'pending' | 'approved' | 'rejected' | string;
	rejectionReasons?: string[];
}

const STATUS_BADGE: Record<string, { variant: any; label: string }> = {
	pending: { variant: 'outline', label: 'Pending review' },
	approved: { variant: 'success', label: 'Approved' },
	rejected: { variant: 'destructive', label: 'Rejected' }
};

const ReleaseReviewPanel: React.FC<ReleaseReviewPanelProps> = ({ releaseId, reviewStatus = 'pending', rejectionReasons = [] }) => {
	const reviewMutation = useReviewRelease();
	const [rejectOpen, setRejectOpen] = useState(false);
	const [reasonsText, setReasonsText] = useState('');

	const badge = STATUS_BADGE[reviewStatus] || { variant: 'outline', label: reviewStatus };

	const handleApprove = async () => {
		try {
			await reviewMutation.mutateAsync({ releaseId, decision: 'approved' });
			toast.success('Release approved');
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
