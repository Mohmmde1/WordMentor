'use client';

import { ModeToggle } from '@/app/_components/navbar/Toggle';
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import Badges from '@/app/_components/navbar/Badges';
import ProfileDropdown from '@/app/_components/navbar/NavDropdown';
import AuthTabs from '@/app/_components/navbar/AuthTabs';


export function AuthSection({profile, isAssessed, isAuthenticated}) {
  

  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <ModeToggle />
      </NavigationMenuItem>
      <NavigationMenuItem>
        {!isAuthenticated ? (
          <AuthTabs  />
        ) : (
          <div className="flex justify-between items-center space-x-5">
            <Badges isAssessed={isAssessed} />
            <ProfileDropdown profile={profile}  />
          </div>
        )}
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
