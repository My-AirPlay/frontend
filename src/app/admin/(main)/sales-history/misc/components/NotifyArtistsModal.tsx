'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useGetReportEmailRecipients, useSendReportEmails } from '@/app/admin/(main)/catalogue/api/matchArtistReports';

interface NotifyArtistsModalProps {
	reportId: string | null;
	isOpen: boolean;
	onClose: () => void;
}

/**
 * Picks which artists on a report get the "report ready" email. Releasing used
 * to mail everyone as a side effect of moving the money; this is the separate,
 * deliberate step.
 */
const NotifyArtistsModal: React.FC<NotifyArtistsModalProps> = ({ reportId, isOpen, onClose }) => {
	const { data, isLoading, isError } = useGetReportEmailRecipients(isOpen ? reportId : null);
	const { mutate: sendEmails, isPending } = useSendReportEmails();
	const [selectedIds, setSelectedIds] = useState<string[]>([]);
	const [search, setSearch] = useState('');

	const recipients = useMemo(() => data?.recipients ?? [], [data]);
	const emailable = useMemo(() => recipients.filter(r => r.emailable), [recipients]);
	const skipped = useMemo(() => recipients.filter(r => !r.emailable), [recipients]);

	// Default to everyone who can actually receive it — the common case is
	// notifying the whole report, and the admin narrows from there.
	useEffect(() => {
		setSelectedIds(emailable.map(r => r.artistId));
	}, [emailable]);

	const visible = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) return emailable;
		return emailable.filter(r => (r.artistName || '').toLowerCase().includes(term) || (r.email || '').toLowerCase().includes(term));
	}, [emailable, search]);

	const allVisibleSelected = visible.length > 0 && visible.every(r => selectedIds.includes(r.artistId));

	const toggleAllVisible = () => {
		const visibleIds = visible.map(r => r.artistId);
		setSelectedIds(prev => (allVisibleSelected ? prev.filter(id => !visibleIds.includes(id)) : Array.from(new Set([...prev, ...visibleIds]))));
	};

	const toggleOne = (artistId: string) => {
		setSelectedIds(prev => (prev.includes(artistId) ? prev.filter(id => id !== artistId) : [...prev, artistId]));
	};

	const handleSend = () => {
		if (!reportId || selectedIds.length === 0) return;
		sendEmails(
			{ reportId, artistIds: selectedIds },
			{
				onSuccess: result => {
					toast.success(`Emailed ${result.sent} of ${result.requested} selected artist(s).`);
					onClose();
				},
				onError: (err: unknown) => {
					const axiosErr = err as { response?: { data?: { message?: string } } };
					toast.error(axiosErr?.response?.data?.message || 'Failed to send report emails.');
				}
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
			<DialogContent className="max-w-lg">
				<DialogHeader>
					<DialogTitle>Send report email</DialogTitle>
				</DialogHeader>

				{isLoading && (
					<div className="flex items-center justify-center py-10 text-white/60">
						<Loader2 className="h-5 w-5 animate-spin mr-2" /> Loading artists…
					</div>
				)}

				{isError && <p className="py-6 text-sm text-red-400">Couldn&apos;t load the artists on this report.</p>}

				{!isLoading && !isError && data && (
					<div className="space-y-4">
						{!data.released && <p className="text-xs text-amber-400">This report hasn&apos;t been released yet. Release it first — the email asks artists to log in and view figures they can&apos;t see until then.</p>}

						<input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search artists…" className="w-full rounded-md bg-transparent border border-border px-3 py-2 text-sm" />

						<div className="flex items-center justify-between text-sm">
							<label className="flex items-center gap-2 cursor-pointer">
								<Checkbox checked={allVisibleSelected} onCheckedChange={toggleAllVisible} />
								<span>Select all {search ? 'shown' : ''}</span>
							</label>
							<span className="text-white/50">{selectedIds.length} selected</span>
						</div>

						<div className="max-h-64 overflow-y-auto rounded-md border border-border divide-y divide-border">
							{visible.map(recipient => (
								<label key={recipient.artistId} className="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-white/5">
									<Checkbox checked={selectedIds.includes(recipient.artistId)} onCheckedChange={() => toggleOne(recipient.artistId)} />
									<span className="flex flex-col">
										<span className="text-sm">{recipient.artistName || 'Unnamed artist'}</span>
										<span className="text-xs text-white/40">{recipient.email}</span>
									</span>
								</label>
							))}
							{visible.length === 0 && <p className="px-3 py-4 text-sm text-white/50">No artists match that search.</p>}
						</div>

						{skipped.length > 0 && (
							<details className="text-xs text-white/50">
								<summary className="cursor-pointer">{skipped.length} artist(s) can&apos;t be emailed</summary>
								<ul className="mt-2 space-y-1 pl-4 list-disc">
									{skipped.map(recipient => (
										<li key={recipient.artistId}>
											{recipient.artistName || recipient.artistId} — {recipient.reason}
										</li>
									))}
								</ul>
							</details>
						)}
					</div>
				)}

				<div className="flex justify-end gap-3 pt-2">
					<Button variant="outline" className="rounded-full" onClick={onClose} disabled={isPending}>
						Cancel
					</Button>
					<Button className="rounded-full" onClick={handleSend} disabled={isPending || selectedIds.length === 0 || !data?.released}>
						{isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : `Send to ${selectedIds.length}`}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default NotifyArtistsModal;
