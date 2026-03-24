'use client';

import { useGetSystemSettings } from '../../api/queries';
import { useUpdateSystemSettings } from '../../api/mutations';
import { Checkbox } from '@/components/ui/checkbox';

export default function GeneralTab() {
	const { data: settings, isLoading } = useGetSystemSettings();
	const updateSettings = useUpdateSystemSettings();

	if (isLoading) return <div>Loading settings...</div>;

	const contractEmailEnabled = settings?.contractEmailEnabled ?? true;

	return (
		<div>
			<h2 className="text-lg font-semibold mb-4">General</h2>

			<div className="bg-secondary p-4 rounded-lg space-y-4">
				<div>
					<p className="text-sm font-medium mb-3">Contract Notifications</p>
					<label className="flex items-start gap-3 cursor-pointer">
						<Checkbox
							checked={contractEmailEnabled}
							onCheckedChange={checked => {
								updateSettings.mutate({ contractEmailEnabled: !!checked });
							}}
							disabled={updateSettings.isPending}
						/>
						<div>
							<p className="text-sm">Send contract email to artists</p>
							<p className="text-xs text-muted-foreground mt-0.5">When enabled, artists will receive an email notification when a contract is uploaded to their account. Admin notifications are always sent regardless of this setting.</p>
						</div>
					</label>
				</div>
			</div>
		</div>
	);
}
