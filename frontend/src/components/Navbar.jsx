import * as React from "react";
import Link from "next/link";

import { NavigationItems } from "@/components/NavbarItems";

import { Icons } from "@/components/Icons";

export function MainNav() {
  return (
    <div className="container flex border-b ">
      <Link href="/" className="flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
      </Link>

        <NavigationItems />


    </div>
  );
}
