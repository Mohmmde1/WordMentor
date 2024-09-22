'use client';

import { useState, useEffect } from 'react';
import { ModeToggle } from '@/app/_components/navbar/Toggle';
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import Badges from '@/app/_components/navbar/Badges';
import ProfileDropdown from '@/app/_components/navbar/NavDropdown';
import AuthTabs from '@/app/_components/navbar/AuthTabs';
import { checkUser } from '@/lib/actions';

export function AuthSection({ profile, isAssessed }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await checkUser(); // Call checkUser as a function
      if (token)
        setIsAuthenticated(true); // Update state based on the result
      else
        setIsAuthenticated(false);
    };

    checkAuthentication();
  }, []);

  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <ModeToggle />
      </NavigationMenuItem>
      <NavigationMenuItem>
        {!isAuthenticated ? (
          <AuthTabs setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <div className="flex justify-between items-center space-x-5">
            <Badges isAssessed={isAssessed} />
            <ProfileDropdown profile={profile} setIsAuthenticated={setIsAuthenticated} />
          </div>
        )}
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
