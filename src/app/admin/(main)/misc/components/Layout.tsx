'use client'
import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AdminLayout: React.FC<LayoutProps> = ({ children, className }) => {
  const pathname = usePathname();

  // Determine if we need full width (no padding) based on route
  const isFullWidth =
    pathname.startsWith('/artist-revenue') ||
    pathname.startsWith('/help/tickets') ||
    pathname.startsWith('/help/chat');

  return (
    <div className={cn("flex h-screen overflow-hidden", className)}>
      <Sidebar className="max-md:hidden" />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <div className={cn(isFullWidth ? 'p-0' : "p-6 max-md:px-4 lg:px-10", "max-w-full")}>{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AdminLayout;
