'use client';

import React, { Suspense, useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Headphone } from 'iconsax-react';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { cn } from '@/lib/utils';
import { useReviewQueue } from './api/reviewQueue';
import ReviewQueueList, { KIND_OPTIONS, STATUS_OPTIONS } from './misc/ReviewQueueList';
import ReviewDetail from './misc/ReviewDetail';

const PAGE_SIZE = 20;

function pick<T extends string>(value: string | null, options: { value: T }[], fallback: T): T {
	return options.some(o => o.value === value) ? (value as T) : fallback;
}

/**
 * Listen to or watch each upload, check its details and approve or reject it,
 * without leaving the page. The queue is on the left; the selected release on the right.
 */
const ReviewPageContent = () => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useSearchParams();

	const status = pick(params.get('status'), STATUS_OPTIONS, 'pending');
	const kind = pick(params.get('kind'), KIND_OPTIONS, 'all');
	const page = Math.max(1, Number(params.get('page')) || 1);
	const selectedId = params.get('id');

	const [searchInput, setSearchInput] = useState(params.get('q') ?? '');
	const search = params.get('q') ?? '';

	const setParams = useCallback(
		(changes: Record<string, string | null>) => {
			const next = new URLSearchParams(params.toString());
			for (const [key, value] of Object.entries(changes)) {
				if (value === null || value === '') next.delete(key);
				else next.set(key, value);
			}
			router.replace(`${pathname}?${next.toString()}`, { scroll: false });
		},
		[params, pathname, router]
	);

	// Search as they type, without a request per keystroke.
	useEffect(() => {
		if (searchInput === search) return;
		const t = setTimeout(() => setParams({ q: searchInput || null, page: null }), 350);
		return () => clearTimeout(t);
	}, [searchInput, search, setParams]);

	const { data, isLoading } = useReviewQueue({ status, kind, search: search || undefined, page, limit: PAGE_SIZE });

	// Open the first release on wide screens so there's something to review straight away.
	useEffect(() => {
		if (selectedId || !data?.items.length) return;
		if (typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches) {
			setParams({ id: data.items[0].id });
		}
	}, [data, selectedId, setParams]);

	/** After a decision in the pending queue, go straight to the next release. */
	const handleReviewed = () => {
		if (status !== 'pending' || !data) return;
		const items = data.items;
		const i = items.findIndex(item => item.id === selectedId);
		const next = items[i + 1] ?? items[i - 1];
		setParams({ id: next && next.id !== selectedId ? next.id : null });
	};

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2">
					<Headphone size={24} variant="Bold" className="fill-primary" /> Review releases
				</h1>
				<p className="text-sm text-muted-foreground">Listen or watch, check the details, then approve or reject. Nothing goes to stores until it’s approved.</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-[minmax(280px,360px)_1fr] gap-6 items-start">
				<aside className={cn('lg:sticky lg:top-4 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto lg:pr-1', selectedId && 'hidden lg:block')}>
					<ReviewQueueList status={status} kind={kind} search={searchInput} onStatus={s => setParams({ status: s === 'pending' ? null : s, page: null, id: null })} onKind={k => setParams({ kind: k === 'all' ? null : k, page: null, id: null })} onSearch={setSearchInput} data={data} isLoading={isLoading} selectedId={selectedId} onSelect={id => setParams({ id })} onPage={p => setParams({ page: String(p), id: null })} />
				</aside>

				<main className={cn('min-w-0', !selectedId && 'hidden lg:block')}>{selectedId ? <ReviewDetail id={selectedId} onBack={() => setParams({ id: null })} onReviewed={handleReviewed} /> : <div className="rounded-lg border border-dashed border-border p-10 text-center text-sm text-muted-foreground">{data && data.items.length === 0 ? 'All caught up.' : 'Pick a release from the queue.'}</div>}</main>
			</div>
		</div>
	);
};

const ReviewPage = () => (
	<Suspense
		fallback={
			<div className="flex justify-center items-center min-h-[50vh]">
				<LoadingBox size={62} />
			</div>
		}
	>
		<ReviewPageContent />
	</Suspense>
);

export default ReviewPage;
