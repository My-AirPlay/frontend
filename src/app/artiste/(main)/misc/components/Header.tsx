import React from 'react';
import { Settings, Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { useAuthContext } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback, ReusableDropdownMenu, Skeleton } from '@/components/ui';
import { getInitials } from '@/utils/strings';
import { useRouter } from 'next/navigation';

const Header: React.FC = () => {
	const { artist, logout, isLoading } = useAuthContext();
	const router = useRouter();

	const logoutArtist = () => {
		logout(true);
		router.push('/');
	};
	return (
		<header className="h-16 flex items-center justify-between px-6">
			<div className="flex items-center space-x-4 ml-auto">
				<button className="text-white/60 hover:text-foreground">
					<Settings size={20} />
				</button>

				{isLoading ? (
					<Skeleton className="w-8 h-8 rounded-full bg-muted animate-pulse" />
				) : (
					<>
						<ReusableDropdownMenu
							trigger={
								<Avatar className="cursor-pointer">
									<AvatarImage alt="@shadcn" />
									<AvatarFallback>{getInitials(artist?.firstName + ' ' + artist?.lastName || artist?.artistName || 'FN')}</AvatarFallback>
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
						<Sheet>
							<SheetTrigger className="md:hidden text-primary">
								<Menu size={24} className="text-primary" />
							</SheetTrigger>
							<SheetContent side="right" className="w-64 !p-0">
								<Sidebar />
							</SheetContent>
						</Sheet>
					</>
				)}
			</div>
		</header>
	);
};

export default Header;
