'use client'
import Link from "next/link";
import { NavigationItems } from "@/app/_components/navbar/NavbarItems";
import { Icons } from "@/components/icons";

export function MainNav() {
  return (
    <nav className="bg-gray-800 shadow-lg sticky top-0 z-50  text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4 space-x-2">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 " />
            <span className=" font-semibold text-lg">WordMentor</span>
          </Link>
          
          {/* Navigation Items */}

            <NavigationItems />

        </div>
      </div>
    </nav>
  );
}
