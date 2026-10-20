/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { toast } from 'sonner';

import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, Textarea } from '@/components/ui';
import { SmallSpinner } from '@/components/icons';
import { useRequestTakedown } from '../api';

const RequestTakedownDialog = ({ releaseId, title, open, onOpenChange }: { releaseId: string; title: string; open: boolean; onOpenChange: (open: boolean) => void }) => {
	const [reason, setReason] = useState('');
	const { mutate: requestTakedown, isPending } = useRequestTakedown();

	const handleSubmit = () => {
		requestTakedown(
			{ releaseId, reason: reason.trim() || undefined },
			{
				onSuccess() {
					toast.success("Takedown requested. We'll email you once it's been processed.");
					setReason('');
					onOpenChange(false);
				},
				onError(error: any) {
					toast.error(error?.response?.data?.message || 'Failed to request takedown');
				}
			}
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent onClick={e => e.stopPropagation()}>
				<DialogHeader>
					<DialogTitle>Request takedown</DialogTitle>
					<DialogDescription>Ask for &quot;{title}&quot; to be removed from all stores and platforms. Once processed, stores can take 2–4 weeks to remove it from their catalogues.</DialogDescription>
				</DialogHeader>
				<div className="space-y-3">
					<Textarea placeholder="Reason (optional)" className="min-h-24" maxLength={1000} value={reason} onChange={e => setReason(e.target.value)} />
					<div className="flex justify-end gap-2">
						<Button variant="outline" size="sm" onClick={() => onOpenChange(false)} disabled={isPending}>
							Cancel
						</Button>
						<Button variant="destructive" size="sm" onClick={handleSubmit} disabled={isPending}>
							Request takedown
							{isPending && <SmallSpinner className="ml-1.5" />}
						</Button>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default RequestTakedownDialog;
