import React from 'react';
import { Settings, Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';
import { useArtisteContext } from '@/contexts/AuthContextArtist';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui';
import { getInitials } from '@/utils/strings';

const Header: React.FC = () => {
	const { artist } = useArtisteContext();

	return (
		<header className="h-16 flex items-center justify-between px-6">
			<div className="flex items-center space-x-4 ml-auto">
				<button className="text-white/60 hover:text-foreground">
					<Settings size={20} />
				</button>

				<Avatar>
					<AvatarImage alt="@shadcn" />
					<AvatarFallback>{getInitials(artist?.artistName || 'FN')}</AvatarFallback>
				</Avatar>
				<Sheet>
					<SheetTrigger className="md:hidden text-primary">
						<Menu size={24} className="text-primary" />
					</SheetTrigger>
					<SheetContent side="right" className="w-64 !p-0">
						<Sidebar />
					</SheetContent>
				</Sheet>
			</div>
		</header>
	);
};

export default Header;
