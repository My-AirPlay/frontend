import React, { useState } from 'react';
import { Loader2, Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { useAuthContext } from '@/contexts/AuthContext';
import { Avatar, AvatarImage, AvatarFallback, ReusableDropdownMenu, Skeleton } from '@/components/ui';
import { getInitials } from '@/utils/strings';
import { useRouter } from 'next/navigation';
import { CurrencySwitcher } from '@/app/artiste/(main)/dashboard/misc/components/CurrencySwitcher';

const Header: React.FC = () => {
	const { artist, logout, isLoading } = useAuthContext();
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const [isSheetOpen, setIsSheetOpen] = useState(false);
	const router = useRouter();

	const logoutArtist = () => {
		setIsLoggingOut(true);
		setTimeout(() => {
			logout({ redirect: true });
			//router.push('/artiste/login');
		}, 1500);
	};
	return (
		<>
			<header className="h-16 flex items-center justify-between px-6">
				<div className="flex items-center space-x-4 ml-auto">
					<CurrencySwitcher />

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
							<Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
								<SheetTrigger
									className="md:hidden text-primary"
									onClick={() => setIsSheetOpen(true)} // Explicitly open
								>
									<Menu size={24} className="text-primary" />
								</SheetTrigger>
								<SheetContent side="right" className="w-64 !p-0">
									{/* Pass a function to the Sidebar to close the sheet */}
									<Sidebar onLinkClick={() => setIsSheetOpen(false)} />
								</SheetContent>
							</Sheet>
						</>
					)}
				</div>
			</header>
			{isLoggingOut && (
				<div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-[9999]">
					<div className="bg-background text-gray-800 p-8 rounded-xl shadow-2xl flex items-center space-x-4">
						<Loader2 className="animate-spin h-8 w-8 text-primary" />
						<span className="text-xl font-semibold text-primary">Logging you out...</span>
					</div>
				</div>
			)}
		</>
	);
};

export default Header;
