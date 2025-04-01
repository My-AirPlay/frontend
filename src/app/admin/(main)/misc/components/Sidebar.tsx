
import React from 'react';
import { Document, Setting2, Headphone, Category, User, Calculator, Edit2 } from 'iconsax-react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';



const Sidebar= ({ className }: { className?: string }) => {

  const pathname = usePathname();
  const sidebarItems = [
    {
      title: null,
      items: [
        {
          href: "/admin/dashboard",
          icon: Category,
          label: "Dashboard",
        },
        {
          href: "/admin/contracts",
          icon: Edit2,
          label: "Contracts",
          badge: 10,
        },
        {
          href: "/admin/catalogue",
          icon: Document,
          label: "Catalogue",
        },
      ],
    },
    {
      title: "Accounting",
      items: [
        {
          href: "/admin/sales",
          icon: Calculator,
          label: "Sales",
        },
        {
          href: "/admin/artist-revenue",
          icon: User,
          label: "Artist Revenue",
        },
      ],
    },
    {
      title: "Organization",
      items: [
        {
          href: "/admin/settings",
          icon: Setting2,
          label: "Settings",
        },
        {
          href: "/admin/support",
          icon: Headphone,
          label: "Help and Support",
        },
      ],
    },
  ]



  return (
    <div className={cn("w-64 h-screen border-r border-admin-border flex flex-col overflow-hidden", className)}>
      <div className="h-16 p-4 border-b border-admin-border flex items-center space-x-3">
        <div className="h-8 w-8 rounded-md bg-admin-primary flex items-center justify-center">
          <span className="text-white font-bold">A</span>
        </div>
        <span className="font-semibold text-lg">Admin</span>
      </div>

      <div className="flex-1 overflow-y-auto py-4 space-y-16 px-2 font-plus-jakarta-sans">
        {
          sidebarItems.map((section, index) => (
            <div key={index}>
              {section.title && (
                <h3 className="text-muted-foreground uppercase text-sm font-medium tracking-wider px-4 mb-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-2.5">
                {section.items.map((item, idx) => {

                  const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <Link
                      href={item.href}
                      className={cn(
                        "flex text-sm font-normal items-center space-x-2 py-2 px-4 rounded-md cursor-pointer transition-all duration-200 hover:bg-black/20",

                      )}
                      key={idx}
                    >
                      <span>
                        <item.icon
                          variant='Bold'
                          size={20}
                          className={cn("fill-primary", isActive ? "fill-primary" : "fill-muted-foreground")}
                        />
                      </span>
                      <span className={cn("flex-1 text-muted-foreground", isActive && "text-primary")}>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))
        }

      </div>
    </div>
  );
};

export default Sidebar;
