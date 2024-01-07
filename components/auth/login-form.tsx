"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FormEvent } from "react";

export default function LoginForm() {
  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    signIn("credentials", {
      email, password,
      callbackUrl: window.location.origin
    })
  }

  return (
    <form onSubmit={login} className="grid gap-2">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          className="mt-1"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" className="mb-4">Password</Label>
        <Input
          className="mt-1"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </div>
      <Button type="submit" className="w-full mt-4">Login</Button>
    </form>
  );
}