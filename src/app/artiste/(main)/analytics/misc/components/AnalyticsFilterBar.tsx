'use client';

import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SelectSimple } from '@/components/ui';

export interface PeriodRange {
	from?: string;
	to?: string;
}

interface AnalyticsFilterBarProps {
	periods: string[];
	value: PeriodRange;
	onChange: (next: PeriodRange) => void;
}

/**
 * Pick a range of report periods. Reports are monthly, so the options are the
 * months the viewer has data for.
 */
export function AnalyticsFilterBar({ periods, value, onChange }: AnalyticsFilterBarProps) {
	// Radix Select can't have an item with an empty value.
	const options = periods.filter(p => p?.trim()).map(p => ({ label: p, value: p }));
	const fromIndex = value.from ? periods.indexOf(value.from) : 0;
	const active = !!(value.from || value.to);

	return (
		<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
			<span className="text-sm text-muted-foreground">Period</span>
			<div className="sm:w-48">
				<SelectSimple options={options} value={value.from ?? ''} valueKey="value" labelKey="label" placeholder="From the start" onChange={(from: string) => onChange({ ...value, from })} />
			</div>
			<span className="text-sm text-muted-foreground hidden sm:inline">to</span>
			<div className="sm:w-48">
				<SelectSimple options={options.slice(Math.max(0, fromIndex))} value={value.to ?? ''} valueKey="value" labelKey="label" placeholder="Latest" onChange={(to: string) => onChange({ ...value, to })} />
			</div>
			{active && (
				<Button variant="ghost" size="sm" onClick={() => onChange({})}>
					<X size={14} className="mr-1" /> All time
				</Button>
			)}
		</div>
	);
}

/** "▲ 12% vs December - 2025", or nothing when there's no previous month to compare. */
export function ChangeBadge({ change, previousPeriod }: { change: number | null | undefined; previousPeriod?: string | null }) {
	if (change === null || change === undefined || !previousPeriod) return null;
	const up = change >= 0;
	return (
		<span className={up ? 'text-green-500' : 'text-red-500'}>
			{up ? '▲' : '▼'} {Math.abs(change)}% <span className="text-muted-foreground">vs {previousPeriod}</span>
		</span>
	);
}
