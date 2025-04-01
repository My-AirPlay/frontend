
import React from 'react';
import { Search, Settings, Bell, ChevronDown, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  const path = usePathname()
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
        {/* <Input
          type="text"
          placeholder="Search..."
          leftIcon={<Search size={16} className="text-white" />}
          className=" rounded-full pl-10 pr-4 w-64 text-sm max-md:hidden"
        /> */}

        <button className="text-white/60 hover:text-foreground">
          <Settings size={20} />
        </button>

        <button className="text-white/60 hover:text-foreground">
          <Bell size={20} />
        </button>

        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center">
            <span className="text-white text-sm">JD</span>
          </div>
          <ChevronDown size={16} className="text-white/60" />
        </div>

        <Sheet>
          <SheetTrigger className="md:hidden text-primary">
            <Menu size={24} className='text-primary' />
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
