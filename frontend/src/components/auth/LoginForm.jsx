import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "@/lib/actions";
const LoginForm = () => {
  return (
    <form className="rounded px-8 pt-6 pb-8 mb-4" action={login}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Email
        </label>
        <Input type="email" placeholder="Enter your email" name="email"/>
      </div>
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <Input type="password" placeholder="Enter your password" name="password" />
      </div>
      <div className="flex items-center justify-between">
        <Button>Login</Button>
        <a
          className="inline-block align-baseline font-bold text-sm text-black-500 hover:text-black-800"
          href="#"
        >
          Forgot Password?
        </a>
      </div>
    </form>
  );
};

export default LoginForm;
