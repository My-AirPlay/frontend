'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import DeliveriesTab from './misc/components/DeliveriesTab';
import CodesTab from './misc/components/CodesTab';

const tabs = [
	{ id: 'deliveries', label: 'FUGA Deliveries' },
	{ id: 'codes', label: 'UPC & ISRC Pool' }
] as const;

export default function FugaPage() {
	const [activeTab, setActiveTab] = useState<(typeof tabs)[number]['id']>('deliveries');

	return (
		<div className="p-6 font-plus-jakarta-sans">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">FUGA Management</h1>
			</div>

			<div className="flex gap-4 border-b border-border mb-6">
				{tabs.map(tab => (
					<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn('pb-2 px-1 text-sm font-medium transition-colors relative', activeTab === tab.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground')}>
						{tab.label}
						{activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
					</button>
				))}
			</div>

			<div className="mt-6">
				{activeTab === 'deliveries' && <DeliveriesTab />}
				{activeTab === 'codes' && <CodesTab />}
			</div>
		</div>
	);
}
