'use client';

import { useState, useEffect } from 'react';
import { ModeToggle } from '@/app/_components/navbar/Toggle';
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import Badges from '@/app/_components/navbar/Badges';
import ProfileDropdown from '@/app/_components/navbar/NavDropdown';
import AuthTabs from '@/app/_components/navbar/AuthTabs';
import { checkAssessmentStatus, checkUser, fetchProfile } from '@/lib/actions';

export function AuthSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profile, setProfile] = useState({});
  const [isAssessed, setIsAssessed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const userId = await checkUser();

      if (userId) {
        setIsAuthenticated(true);

        const tempProfile = await fetchProfile(userId); // Make sure to await async fetch
        setProfile(tempProfile || {}); // Default to an empty object if null

        const isAssessedStatus = await checkAssessmentStatus(); // Ensure async/await here as well
        setIsAssessed(isAssessedStatus || false); // Default to false if null/undefined
      } else {
        setIsAuthenticated(false);
        setProfile({});
        setIsAssessed(false);
      }
      setLoading(false);
    };

    checkAuthentication();
  }, [isAuthenticated]);
  if (loading) {
    return <></>; // Show loading spinner while checking authentication
  }
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
