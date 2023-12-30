"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import GoogleIcon from "@/public/google-icon.svg";

export function GithubLoginButton() {
  const loginWithGithub = () => {
    signIn("github", {
      callbackUrl: window.location.origin
    })
  }

  return (
    <Button 
      variant="outline" 
      className="w-full border-1 border-primary"
      onClick={loginWithGithub}
    >
      <Github className="mr-4" /> Login with Github
    </Button>
  )
}

export function GoogleLoginButton() {
  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: window.location.origin });
  }

  return (
    <Button 
      variant="outline" 
      className="w-full border-1 border-primary"
      onClick={loginWithGoogle}
    >
      <GoogleIcon className="mr-4" /> Login with Github
    </Button>
  )
}

export function LogoutButton() {
  return (
    <Button 
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/login` })}
      className="w-fit"
    >
      Logout
    </Button>
  )
}