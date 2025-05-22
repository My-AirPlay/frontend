'use client';
import React from 'react';
import { StaticAppInfoProvider } from './StaticAppInfoContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthContext';

const queryClient = new QueryClient();

const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<StaticAppInfoProvider>
				<AuthProvider>{children}</AuthProvider>
			</StaticAppInfoProvider>
		</QueryClientProvider>
	);
};

export default AllProviders;
