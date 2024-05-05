'use client';

import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

import {
  NavigationMenuItem,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {Badge} from '@/components/ui/badge';

import {LogOut, User, FlaskConical, FlaskConicalOff} from 'lucide-react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {
  checkUser,
  logout,
  fetchProfile,
  checkAssessmentStatus,
} from '@/lib/actions';
import {useRouter} from 'next/navigation';

export function AuthSection () {
  const router = useRouter ();
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
        }
        if (assessmentStatus) {
          setIsAssessed (true);
        }
        const data = await fetchProfile ();
        setProfile (data);
      };
      checkAuth ();
    },
    [isAuthenticated]
  );
  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        {!isAuthenticated
          ? <Dialog>
              <DialogTrigger>Guest</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle> Authentication</DialogTitle>
                  <DialogDescription>Welcome to WordMentor</DialogDescription>
                </DialogHeader>

                <Tabs defaultValue="login" className="w-[400px]">
                  <div className="flex justify-center">
                    <TabsList>
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="signup">SignUp</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="login">
                    <LoginForm setIsAuthenticated={setIsAuthenticated} />
                  </TabsContent>
                  <TabsContent value="signup">
                    <SignupForm />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          : <div className="flex justify-between items-center space-x-2">

              {isAssessed
                ? <Badge className="inline-flex  items-center w-30 h-5 px-2 py-1  text-white bg-gradient-to-r from-slate-600 to-slate-800">
                    <FlaskConical size={16} />
                    <span className="ml-1">
                      Assessed
                    </span>
                  </Badge>
                : <Link href="/assessment">

                    <Badge className="inline-flex items-center w-30 h-5 px-2 py-1  text-white bg-gradient-to-l from-blue-400 to-blue-800">
                      <FlaskConicalOff size={16} />
                      <span className="ml-1">
                        Assess
                      </span>
                    </Badge>
                  </Link>}
              <DropdownMenu>

                <DropdownMenuTrigger>

                  <Avatar>
                    {profile &&
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${profile.avatar_url}`}
                      />}
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <Link href="/profile">

                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>

                    <button
                      className="flex"
                      onClick={async () => {
                        await logout ();
                        setIsAuthenticated (false);
                        router.push ('/');
                      }}
                    >

                      <LogOut className="mr-2 h-4 w-4" color="red" />
                      <span>Logout</span>

                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>}
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
