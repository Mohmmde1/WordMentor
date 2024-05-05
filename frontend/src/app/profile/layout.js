"use client"
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from "@/components/ui/separator";
import SidebarNav from "@/components/SidebarNav";

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile",
  },
];

export default function SettingsLayout({ children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="flex justify-between space-x-4">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and set e-mail preferences.
            </p>
          </div>
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar className="size-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isHovered && (
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer"
              >
                Upload
                <input
                  id="avatar-upload"
                  type="file"
                  className="absolute opacity-0 w-0 h-0"
                  onChange={(e) => {
                    // Handle file upload logic here
                    console.log('File uploaded:', e.target.files[0]);
                  }}
                />
              </label>
            )}
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
