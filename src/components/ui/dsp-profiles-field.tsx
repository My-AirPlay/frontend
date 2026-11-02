'use client';

import { Plus, Trash2 } from 'lucide-react';

import { Button } from './button';
import { Checkbox } from './checkbox';
import { Input } from './input';
import { SelectSimple } from './index';
import { DSP_LABELS, REQUIRED_DSPS, artistPageLinkError } from '@/lib/dsp';

export interface DspProfile {
	dsp: string;
	url: string;
}

interface DspProfilesFieldProps {
	value: DspProfile[];
	onChange: (next: DspProfile[]) => void;
	/** Required platforms the artist says they aren't on yet. */
	newOnDsps: string[];
	onNewOnDspsChange: (next: string[]) => void;
	options: { label: string; value: string }[];
	isLoadingOptions?: boolean;
	disabled?: boolean;
}

const isRequired = (dsp: string) => (REQUIRED_DSPS as readonly string[]).includes(dsp);

/**
 * The streaming profiles an artist already has. Shared by onboarding and the settings
 * profile form so both enforce the same shape.
 *
 * Spotify and Apple Music come first and are required: either the link to the artist
 * page or "I'm not on it yet". Any other platform is optional, one row each. A
 * platform already chosen on another row is dropped from the remaining selects: the
 * server rejects the same DSP twice.
 */
const DspProfilesField = ({ value, onChange, newOnDsps, onNewOnDspsChange, options, isLoadingOptions, disabled }: DspProfilesFieldProps) => {
	const rows = value ?? [];
	const declared = newOnDsps ?? [];

	// Required platforms: at most one entry each, kept in the same list.
	const requiredUrl = (dsp: string) => rows.find(row => row.dsp === dsp)?.url ?? '';
	const setRequiredUrl = (dsp: string, url: string) => {
		const others = rows.filter(row => row.dsp !== dsp);
		onChange(url ? [...others, { dsp, url }] : others);
	};
	const setDeclaredNew = (dsp: string, isNew: boolean) => {
		onNewOnDspsChange(isNew ? Array.from(new Set([...declared, dsp])) : declared.filter(d => d !== dsp));
		if (isNew) onChange(rows.filter(row => row.dsp !== dsp));
	};

	// Optional platforms: everything else, edited by position in the full list.
	const optional = rows.map((row, index) => ({ row, index })).filter(({ row }) => !isRequired(row.dsp));
	const optionalOptions = options.filter(option => !isRequired(option.value));
	const taken = new Set(optional.map(({ row }) => row.dsp).filter(Boolean));
	const update = (index: number, patch: Partial<DspProfile>) => onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
	const addRow = () => onChange([...rows, { dsp: '', url: '' }]);
	const removeRow = (index: number) => onChange(rows.filter((_, i) => i !== index));

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-col gap-3">
				{REQUIRED_DSPS.map(dsp => {
					const label = DSP_LABELS[dsp] ?? dsp;
					const isNew = declared.includes(dsp);
					const url = requiredUrl(dsp);
					const error = artistPageLinkError(dsp, url);
					return (
						<div key={dsp} className="flex flex-col gap-1">
							<div className="flex flex-col gap-2 sm:flex-row sm:items-center">
								<span className="text-sm font-medium sm:w-1/3">
									{label} <span className="text-destructive">*</span>
								</span>
								<Input className="sm:flex-1" placeholder={`Link to your ${label} artist page`} value={url} onChange={event => setRequiredUrl(dsp, event.target.value)} disabled={disabled || isNew} hasError={!!error} errormessage={error ?? undefined} />
							</div>
							<label className="flex items-center gap-2 text-sm text-muted-foreground sm:ml-[33.333%] sm:pl-2">
								<Checkbox checked={isNew} onCheckedChange={checked => setDeclaredNew(dsp, checked === true)} disabled={disabled} />
								I&apos;m not on {label} yet. Create a new artist page for me.
							</label>
						</div>
					);
				})}
			</div>

			<div className="flex flex-col gap-3">
				<p className="text-sm text-muted-foreground">Other platforms (optional)</p>
				{optional.map(({ row, index }) => (
					<div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center">
						<div className="sm:w-1/3">
							<SelectSimple options={optionalOptions.filter(option => option.value === row.dsp || !taken.has(option.value))} value={row.dsp} valueKey="value" labelKey="label" onChange={(dsp: string) => update(index, { dsp })} placeholder={isLoadingOptions ? 'Loading platforms...' : 'Select platform'} disabled={disabled || isLoadingOptions} />
						</div>
						<Input className="sm:flex-1" placeholder="Link to your profile on that platform" value={row.url} onChange={event => update(index, { url: event.target.value })} disabled={disabled} />
						<Button type="button" variant="outline" size="icon" onClick={() => removeRow(index)} disabled={disabled} aria-label="Remove this profile">
							<Trash2 size={16} />
						</Button>
					</div>
				))}

				<div>
					<Button type="button" variant="outline" size="sm" onClick={addRow} disabled={disabled || (optionalOptions.length > 0 && taken.size >= optionalOptions.length)}>
						<Plus size={16} className="mr-1" /> Add another platform
					</Button>
				</div>
			</div>
		</div>
	);
};

export default DspProfilesField;
