"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { FaGoogle as GoogleIcon } from "react-icons/fa";

export function GithubLoginButton({ text }: {text: string}) {
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
      <Github className="mr-4" /> {text}
    </Button>
  )
}

GithubLoginButton.defaultProps = {
  text: "Login with Github"
}


export function GoogleLoginButton({ text }: { text: string }) {
  const loginWithGoogle = () => {
    signIn("google", { callbackUrl: window.location.origin });
  }

  return (
    <Button 
      variant="outline" 
      className="w-full border-1 border-primary"
      onClick={loginWithGoogle}
    >
      <GoogleIcon size="1.2rem" className="mr-4" /> {text}
    </Button>
  )
}

GoogleLoginButton.defaultProps = {
  text: "Login with Google"
}

export function LogoutButton() {
  return (
    <Button 
      onClick={() => signOut({ callbackUrl: `${window.location.origin}/auth/login` })}
      className="rounded-none"
    >
      Logout
    </Button>
  )
}