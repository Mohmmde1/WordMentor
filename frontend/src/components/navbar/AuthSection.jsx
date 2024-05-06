'use client';
import {useEffect, useState} from 'react';

import {
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';

import Badges from '@/components/Badges';
import ProfileDropdown from '@/components/ProfileDropdown';
import AuthTabs from '@/components/AuthTabs';

import {checkUser, fetchProfile, checkAssessmentStatus} from '@/lib/actions';

export function AuthSection () {
  const [isAuthenticated, setIsAuthenticated] = useState (false);
  const [isAssessed, setIsAssessed] = useState (false);
  const [profile, setProfile] = useState (null);
  useEffect (
    () => {
      const checkAuth = async () => {
        const userId = await checkUser ();
        const assessmentStatus = await checkAssessmentStatus ();
        if (userId) {
          setIsAuthenticated (true);
          const data = await fetchProfile ();
          setProfile (data);
        }
        if (assessmentStatus) {
          setIsAssessed (true);
        }
      };
      checkAuth ();
    },
    [isAuthenticated]
  );
  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        {!isAuthenticated
          ? <AuthTabs setIsAuthenticated={setIsAuthenticated} />
          : <div className="flex justify-between items-center space-x-2">

              <Badges isAssessed={isAssessed} />
              <ProfileDropdown
                profile={profile}
                setIsAuthenticated={setIsAuthenticated}
              />
            </div>}
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}