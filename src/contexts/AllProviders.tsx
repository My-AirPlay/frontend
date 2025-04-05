'use client'
import React from 'react'
import { StaticAppInfoProvider } from './StaticAppInfoContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const AllProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <StaticAppInfoProvider>
        {children}
      </StaticAppInfoProvider>
    </QueryClientProvider>
  )
}

export default AllProviders