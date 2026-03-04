'use client';

import { Bell, CreditCard, FileSignature } from 'lucide-react';
import Link from 'next/link';
import { useAuthContext } from '@/contexts/AuthContext';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface Notification {
	label: string;
	href: string;
	icon: React.ReactNode;
}

const NotificationBell = () => {
	const { artist } = useAuthContext();

	const notifications: Notification[] = [];

	if (artist?.bankDetails?.paidRegistrationFee === false) {
		notifications.push({
			label: 'Pay registration fee',
			href: '/artiste/onboarding?step=registration_fee',
			icon: <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
		});
	}

	if (artist?.contractDetails?.status === 'PENDING_SIGNATURE') {
		notifications.push({
			label: 'Sign your contract',
			href: '/artiste/settings?section=contract',
			icon: <FileSignature className="h-4 w-4 text-muted-foreground shrink-0" />
		});
	}

	const count = notifications.length;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button className="relative p-2 rounded-full hover:bg-muted transition-colors" aria-label="Notifications">
					<Bell className="h-5 w-5" />
					{count > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">{count}</span>}
				</button>
			</PopoverTrigger>
			<PopoverContent align="end" className="w-72 p-0">
				<div className="px-4 py-3 border-b">
					<p className="text-sm font-semibold">Notifications</p>
				</div>
				{notifications.length === 0 ? (
					<div className="px-4 py-6 text-center text-sm text-muted-foreground">No pending actions</div>
				) : (
					<div className="py-1">
						{notifications.map(notification => (
							<Link key={notification.href} href={notification.href} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors">
								{notification.icon}
								<span>{notification.label}</span>
							</Link>
						))}
					</div>
				)}
			</PopoverContent>
		</Popover>
	);
};

export default NotificationBell;
