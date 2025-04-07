
import React from 'react';
import { Settings, Bell, ChevronDown, Menu } from 'lucide-react';

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './Sidebar';

const Header: React.FC = () => {
  

  return (
    <header className="h-16 flex items-center justify-between px-6">

      <div className="flex items-center space-x-4 ml-auto">

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
