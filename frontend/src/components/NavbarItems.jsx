"use client";


import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { AuthSection } from "@/components/AuthSection";

export function NavigationItems() {
  return (
    <NavigationMenu className="max-w-full  flex justify-between">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <span className="inline-block font-bold"> Home </span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <AuthSection />
    </NavigationMenu>
  );
}
