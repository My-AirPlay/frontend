'use client';
import React from 'react';
import { StaticAppInfoProvider } from './StaticAppInfoContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './AuthContext';
import { CurrencyProvider } from '@/app/artiste/context/CurrencyContext';

const queryClient = new QueryClient();

const AllProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>
			<StaticAppInfoProvider>
				<AuthProvider>
					<CurrencyProvider>{children}</CurrencyProvider>
				</AuthProvider>
			</StaticAppInfoProvider>
		</QueryClientProvider>
	);
};

export default AllProviders;
