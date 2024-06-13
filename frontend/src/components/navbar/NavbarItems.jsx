"use client";


import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { AuthSection } from "@/components/navbar/AuthSection";

export function NavigationItems() {
  return (
    <NavigationMenu className="max-w-full  flex justify-between">
      <NavigationMenuList>
        <NavigationMenuItem>
            <NavigationMenuLink href="/" className={navigationMenuTriggerStyle() + " bg-transparent"}>
              <span className="inline-block font-bold"> Home </span>
            </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <AuthSection />
    </NavigationMenu>
  );
}
