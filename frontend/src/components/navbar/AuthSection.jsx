"use client";

import * as React from "react";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function AuthSection() {
  return (
    <NavigationMenuList>
      <NavigationMenuItem>
        <Dialog>
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
                <LoginForm />
              </TabsContent>
              <TabsContent value="signup">
                <SignupForm />
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}
