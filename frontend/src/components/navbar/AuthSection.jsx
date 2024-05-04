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

import {LogOut, User} from 'lucide-react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useEffect, useState} from 'react';
import Link from 'next/link';
import {checkUser, logout} from '@/lib/actions';

export function AuthSection () {
  const [isAuthenticated, setIsAuthenticated] = useState (false);
  useEffect (
    () => {
      const checkAuth = async () => {
        const userId = await checkUser ();
        if (userId) {
          setIsAuthenticated (true);
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
          : <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
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
                    }}
                  >

                    <LogOut className="mr-2 h-4 w-4" color="red" />
                    <span>Logout</span>

                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>}
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
