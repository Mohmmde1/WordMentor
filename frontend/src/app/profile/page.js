'use client';
import ProfileAvtar from '@/components/ProfileAvtar';
import ProfileFormSkeleton from '@/components/skeletons/profile';

import {useState, useEffect} from 'react';
import {Separator} from '@/components/ui/separator';
import {ProfileForm} from '@/components/forms/profile';
import {fetchProfile} from '@/lib/actions';

export default function SettingsProfilePage () {
  const [isHovered, setIsHovered] = useState (false);
  const [profile, setProfile] = useState (null);
  const [isUpdated, setIsUpdated] = useState (false);
  useEffect (
    () => {
      const fetch = async () => {
        const data = await fetchProfile ();
        setProfile (data);
      };
      fetch ();
    },
    [isUpdated]
  );
  return (
    <div className="space-y-6">
      <div className="flex justify-between space-x-4">

        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <ProfileAvtar
          profile={profile}
          setIsHovered={setIsHovered}
          isHovered={isHovered}
          setIsUpdated={setIsUpdated}
          isUpdated={isUpdated}
        />
      </div>
      <Separator />

      {profile && <ProfileForm profile={profile} />}
      {!profile && <ProfileFormSkeleton />}


    </div>
  );
}
