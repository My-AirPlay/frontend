'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import TeamTab from './TeamTab';
import RolesTab from './RolesTab';
import ActivityTab from './ActivityTab';

const tabs = ['Team', 'Roles', 'Activity'] as const;

export default function SettingsPage() {
	const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Team');

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-6">Settings</h1>
			<div className="flex gap-4 border-b border-border mb-6">
				{tabs.map(tab => (
					<button key={tab} onClick={() => setActiveTab(tab)} className={cn('pb-2 px-1 text-sm font-medium transition-colors', activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground')}>
						{tab}
					</button>
				))}
			</div>

			{activeTab === 'Team' && <TeamTab />}
			{activeTab === 'Roles' && <RolesTab />}
			{activeTab === 'Activity' && <ActivityTab />}
		</div>
	);
}
