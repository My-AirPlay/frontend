import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

import { Avatar, AvatarImage, AvatarFallback, ReusableDropdownMenu } from '@/components/ui';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuthContext } from '@/contexts/AuthContext';
import { getInitials } from '@/utils/strings';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
	const { admin, logout } = useAuthContext();
	const router = useRouter();

	const logoutArtist = () => {
		logout(true);
		router.push('/admin/login');
	};
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const path = usePathname();
	const getPageTitle = () => {
		if (path === '/') return 'Overview';
		if (path.startsWith('/admin/contracts')) return 'Contracts';
		if (path.startsWith('/admin/catalogue')) return 'Catalogue';
		if (path.startsWith('/admin/sales')) return 'Sales';
		if (path.startsWith('/admin/artists')) return 'Artists';
		if (path.startsWith('/admin/settings')) return 'Settings';
		if (path.startsWith('/admin/support')) return 'Help and Support';

		// Handle specific detail pages
		if (path.includes('/artist/')) return 'Artist Details';
		if (path.includes('/track/')) return 'Track Details';

		return 'Overview';
	};

	return (
		<header className="h-16 border-b flex items-center justify-between px-6">
			<h1 className="text-xl font-semibold">{getPageTitle()}</h1>

			<div className="flex items-center space-x-4">
				<div className="flex items-center space-x-2">
					<ReusableDropdownMenu
						trigger={
							<Avatar className="cursor-pointer">
								<AvatarImage alt="@shadcn" />
								<AvatarFallback>{getInitials(admin?.firstName + ' ' + admin?.lastName || admin?.artistName || 'FN')}</AvatarFallback>
							</Avatar>
						}
						items={[
							{
								label: 'Profile',
								onClick: () => {
									router.push('/artiste/settings?section=profile');
								}
							},
							{
								label: 'Logout',
								onClick: logoutArtist
							}
						]}
					/>
				</div>

				{/* Control the Sheet's open state */}
				<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
					<SheetTrigger className="md:hidden text-primary" onClick={() => setIsSheetOpen(true)}>
						<Menu size={24} className="text-primary" />
					</SheetTrigger>
					<SheetContent side="right" className="w-64 !p-0">
						{/* Pass the function to close the sheet */}
						<Sidebar onClose={() => setIsSheetOpen(false)} />
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};

export default Header;
