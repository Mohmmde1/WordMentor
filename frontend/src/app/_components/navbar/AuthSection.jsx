'use client';
import { useEffect, useState } from 'react';
import { ModeToggle } from '@/app/_components/navbar/Toggle';
import { NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import Badges from '@/app/_components/navbar/Badges';
import ProfileDropdown from '@/app/_components/navbar/NavDropdown';
import AuthTabs from '@/app/_components/navbar/AuthTabs';
import { checkUser, fetchProfile, checkAssessmentStatus } from '@/lib/actions';

export function AuthSection() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAssessed, setIsAssessed] = useState(false);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userId = await checkUser();
        if (userId) {
          setIsAuthenticated(true);
          const data = await fetchProfile();
          setProfile(data);
          const assessmentStatus = await checkAssessmentStatus();
          setIsAssessed(assessmentStatus);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    checkAuth();
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
