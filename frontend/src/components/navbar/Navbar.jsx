import Link from "next/link";
import { NavigationItems } from "@/components/navbar/NavbarItems";
import { Icons } from "@/components/Icons";

export function MainNav() {
  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-black" />
            <span className="text-black font-semibold text-lg">WordMentor</span>
          </Link>
          
          {/* Navigation Items */}

            <NavigationItems />

        </div>
      </div>
    </nav>
  );
}
