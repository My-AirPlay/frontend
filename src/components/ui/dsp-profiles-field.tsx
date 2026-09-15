'use client';

import { Plus, Trash2 } from 'lucide-react';

import { Button } from './button';
import { Input } from './input';
import { SelectSimple } from './index';

export interface DspProfile {
	dsp: string;
	url: string;
}

interface DspProfilesFieldProps {
	value: DspProfile[];
	onChange: (next: DspProfile[]) => void;
	options: { label: string; value: string }[];
	isLoadingOptions?: boolean;
	disabled?: boolean;
}

/**
 * The streaming profiles an artist already has, one row per platform. Shared by
 * onboarding and the settings profile form so both enforce the same shape.
 *
 * A platform already chosen on another row is dropped from the remaining selects:
 * the server rejects the same DSP twice, and two rows would disagree about which
 * profile a release on that platform belongs to.
 */
const DspProfilesField = ({ value, onChange, options, isLoadingOptions, disabled }: DspProfilesFieldProps) => {
	const rows = value ?? [];
	const taken = new Set(rows.map(row => row.dsp).filter(Boolean));

	const update = (index: number, patch: Partial<DspProfile>) => {
		onChange(rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
	};

	const addRow = () => onChange([...rows, { dsp: '', url: '' }]);
	const removeRow = (index: number) => onChange(rows.filter((_, i) => i !== index));

	return (
		<div className="flex flex-col gap-3">
			{rows.length === 0 && <p className="text-sm text-muted-foreground">No streaming profiles added yet.</p>}

			{rows.map((row, index) => (
				<div key={index} className="flex flex-col gap-2 sm:flex-row sm:items-center">
					<div className="sm:w-1/3">
						<SelectSimple options={options.filter(option => option.value === row.dsp || !taken.has(option.value))} value={row.dsp} valueKey="value" labelKey="label" onChange={(dsp: string) => update(index, { dsp })} placeholder={isLoadingOptions ? 'Loading platforms...' : 'Select platform'} disabled={disabled || isLoadingOptions} />
					</div>
					<Input className="sm:flex-1" placeholder="Link to your profile on that platform" value={row.url} onChange={event => update(index, { url: event.target.value })} disabled={disabled} />
					<Button type="button" variant="outline" size="icon" onClick={() => removeRow(index)} disabled={disabled} aria-label="Remove this profile">
						<Trash2 size={16} />
					</Button>
				</div>
			))}

			<div>
				<Button type="button" variant="outline" size="sm" onClick={addRow} disabled={disabled || (options.length > 0 && taken.size >= options.length)}>
					<Plus size={16} className="mr-1" /> Add a streaming profile
				</Button>
			</div>
		</div>
	);
};

export default DspProfilesField;
