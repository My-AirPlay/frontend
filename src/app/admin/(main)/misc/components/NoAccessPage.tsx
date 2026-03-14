'use client';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '@/contexts/AuthContext';

export default function NoAccessPage() {
	const { logout } = useAuthContext();

	return (
		<div className="flex flex-col items-center justify-center h-[60vh] gap-4">
			<h1 className="text-2xl font-bold">Access Denied</h1>
			<p className="text-muted-foreground text-center max-w-md">You do not have permission to access any pages. Contact your administrator to get access.</p>
			<Button onClick={() => logout({ redirect: true })} variant="outline">
				Sign Out
			</Button>
		</div>
	);
}
