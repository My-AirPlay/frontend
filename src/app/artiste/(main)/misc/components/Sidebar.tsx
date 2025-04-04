
import React from 'react';
import { MusicSquare, Headphone, Category,  Musicnote, UsdCoin, Chart, User } from 'iconsax-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';



const Sidebar = ({ className }: { className?: string }) => {

  const pathname = usePathname();
  const sidebarItems = [
    {
      href: "/artiste/dashboard",
      icon: Category,
      label: "Dashboard",
    },
    {
      href: "/artiste/upload",
      icon: Musicnote,
      label: "Upload",
    },
    {
      href: "/artiste/catalogue",
      icon: MusicSquare,
      label: "Catalogue",
    },

    {
      href: "/artiste/report",
      icon: UsdCoin,
      label: "Report",
    },
    {
      href: "/artiste/analytics",
      icon: Chart,
      label: "Analytics",
    },
    {
      href: "/artiste/support",
      icon: Headphone,
      label: "Support",
    },
    {
      href: "/artiste/profile",
      icon: User,
      label: "Profile",
    },
  ]



  return (
    <div className={cn("w-20 h-screen md:h-[calc(100vh_-_2rem)] md:bg-secondary md:rounded-xl flex flex-col overflow-hidden", className)}>
      <div className="h-16 p-4 border-b border-artiste-border flex items-center space-x-3">
        <div className="h-8 w-8 rounded-md bg-artiste-primary flex items-center justify-center">
          <span className="text-white font-bold">A</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto py-4 pl-2 font-plus-jakarta-sans">
        {
          sidebarItems.map((item, index) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (

              <Link
                href={item.href}
                className={cn(
                  "relative flex md:flex-col text-sm font-normal items-center justify-center py-4 pl-2 pr-3 rounded-l-xl rounded-r-none hover:rounded-r-xl cursor-pointer transition-all duration-200",
                  isActive && "bg-background !rounded-r-none"
                )}
                key={index}
              >
                {
                  isActive && (
                    <>
                      <div className="transition-all duration-300 absolute right-0 top-full w-full h-4 bg-background" />
                      <div className="transition-all duration-300 absolute right-0 top-full w-full h-4 bg-secondary rounded-tr-xl" />
                      <div className="transition-all duration-300 absolute right-0 bottom-full w-full h-4 bg-background" />
                      <div className="transition-all duration-300 absolute right-0 bottom-full w-full h-4 bg-secondary rounded-br-xl" />
                    </>
                  )
                }
                <span>
                  <item.icon
                    variant='Bold'
                    size={18}
                    className={cn("fill-primary", isActive ? "fill-primary" : "fill-muted-foreground")}
                  />
                </span>
                <span className={cn("flex-1 text-muted-foreground text-[0.7rem] text-center", isActive && "text-primary")}>{item.label}</span>
              </Link>


            )
          })
        }

      </div>
    </div>
  );
};

export default Sidebar;
