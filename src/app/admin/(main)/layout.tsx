import { ReactNode } from 'react';
import { AdminLayout } from './misc/components';
import { ArtistAuthProvider } from '@/contexts/AuthContextArtist'; // Import ArtistAuthProvider

interface AppLayoutProps {
	children: ReactNode;
}
const AppLayout = async ({ children }: AppLayoutProps) => {
	return (
		<ArtistAuthProvider>
			{' '}
			{/* Use ArtistAuthProvider */}
			<AdminLayout>{children}</AdminLayout>
		</ArtistAuthProvider>
	);
};

export default AppLayout;
