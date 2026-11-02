'use client';

import Link from 'next/link';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingBox } from '@/components/ui/LoadingBox';
import { CatalogueHealth, useCatalogueHealth } from '../api/labelAnalytics';

type Keyed = { id?: string; artistId?: string };

function HealthCard<T extends Keyed>({ title, hint, section, render, tone = 'warn' }: { title: string; hint: string; section: { count: number; items: T[] }; render: (item: T) => React.ReactNode; tone?: 'warn' | 'info' }) {
	const ok = section.count === 0;
	return (
		<Card>
			<CardHeader className="pb-2">
				<CardTitle className="text-sm font-medium flex items-center gap-2">
					{ok ? <CheckCircle2 size={16} className="text-green-500" /> : <AlertTriangle size={16} className={tone === 'warn' ? 'text-amber-500' : 'text-blue-400'} />}
					{title}
					<span className="ml-auto text-xl font-bold">{section.count.toLocaleString()}</span>
				</CardTitle>
				<p className="text-xs text-muted-foreground">{hint}</p>
			</CardHeader>
			{!ok && (
				<CardContent className="pt-0">
					<ul className="space-y-1 text-sm">
						{section.items.slice(0, 5).map((item, i) => (
							<li key={item.id ?? item.artistId ?? i} className="truncate">
								{render(item)}
							</li>
						))}
						{section.count > 5 && <li className="text-xs text-muted-foreground">and {section.count - 5} more</li>}
					</ul>
				</CardContent>
			)}
		</Card>
	);
}

const releaseLink = (item: { id: string; type: 'single' | 'album'; title: string; artistName?: string }) => (
	<Link href={item.type === 'album' ? `/admin/catalogue/releases/${item.id}` : `/admin/catalogue/tracks/${item.id}`} className="hover:underline">
		{item.title || 'Untitled'}
		{item.artistName ? <span className="text-muted-foreground"> · {item.artistName}</span> : null}
	</Link>
);
const artistLink = (item: { artistId: string; artistName: string; releasesUsed?: number }, showReleases = false) => (
	<Link href={`/admin/contracts/${item.artistId}/overview`} className="hover:underline">
		{item.artistName || 'Unnamed artist'}
		{showReleases ? <span className="text-muted-foreground"> · {item.releasesUsed} releases</span> : null}
	</Link>
);

/** What in the catalogue needs an admin's attention right now. */
export default function CatalogueHealthPanel() {
	const { data, isLoading } = useCatalogueHealth();
	if (isLoading || !data) {
		return (
			<div className="flex justify-center py-10">
				<LoadingBox size={32} />
			</div>
		);
	}
	const h: CatalogueHealth = data;
	const pool = (type: 'upc' | 'isrc') => h.codePool[type];

	return (
		<section className="space-y-4">
			<header>
				<h2 className="text-xl font-normal">Needs attention</h2>
				<p className="text-sm text-muted-foreground">Releases, deliveries, codes and artist details that need someone to act.</p>
			</header>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
				<HealthCard title="Waiting for approval" hint="Oldest first. Nothing is delivered until approved." section={h.awaitingApproval} render={releaseLink} />
				<HealthCard title="Failed deliveries" hint="FUGA rejected or couldn't receive these." section={h.failedDeliveries} render={item => <span title={item.lastError ?? ''}>{releaseLink(item)}</span>} />
				<HealthCard title="Takedown requests" hint="Remove in FUGA, then mark completed." section={h.openTakedowns} render={releaseLink} />

				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium flex items-center gap-2">
							{pool('upc').low || pool('isrc').low ? <AlertTriangle size={16} className="text-amber-500" /> : <CheckCircle2 size={16} className="text-green-500" />}
							Code pool
						</CardTitle>
						<p className="text-xs text-muted-foreground">Warns below {h.thresholds.lowPool} left.</p>
					</CardHeader>
					<CardContent className="pt-0 text-sm space-y-1">
						{(['upc', 'isrc'] as const).map(type => (
							<div key={type} className="flex justify-between">
								<span className="uppercase">{type}</span>
								<span className={pool(type).low ? 'text-amber-500 font-semibold' : ''}>
									{pool(type).available.toLocaleString()} left <span className="text-muted-foreground">· {pool(type).used.toLocaleString()} used</span>
								</span>
							</div>
						))}
						<Link href="/admin/fuga" className="text-xs text-primary hover:underline">
							Manage codes
						</Link>
					</CardContent>
				</Card>

				<HealthCard title="At the free release limit" hint={`Unpaid artists who've used all ${h.thresholds.freeReleaseLimit} free releases.`} tone="info" section={h.artistsAtReleaseLimit} render={item => artistLink(item, true)} />
				<HealthCard title="Close to the limit" hint={`Unpaid artists with ${h.thresholds.nearLimitRemaining} or fewer free releases left.`} tone="info" section={h.artistsNearReleaseLimit} render={item => artistLink(item, true)} />
				<HealthCard title="Missing bank details" hint="Can't upload or be paid royalties." section={h.artistsMissingBankDetails} render={item => artistLink(item)} />
				<HealthCard title="Missing Spotify / Apple links" hint="Can't upload until they add them or say they're new." section={h.artistsMissingStreamingLinks} render={item => artistLink(item)} />
			</div>
		</section>
	);
}
