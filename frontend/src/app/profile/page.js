"use client"
import { useState } from 'react';
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/forms/profile"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
export default function SettingsProfilePage() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex justify-between space-x-4">

      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Avatar className="size-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {isHovered && (
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer"
              >
                Upload
                <input
                  id="avatar-upload"
                  type="file"
                  className="absolute opacity-0 w-0 h-0"
                  onChange={(e) => {
                    // Handle file upload logic here
                    console.log('File uploaded:', e.target.files[0]);
                  }}
                  />
              </label>
            )}
          </div>
                  </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}