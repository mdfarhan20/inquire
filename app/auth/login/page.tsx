import LoginForm from "@/components/auth/login-form";
import { 
  Card,
  CardContent, 
  CardFooter, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { GithubLoginButton, GoogleLoginButton } from "@/components/auth-buttons";
import { DividerWithText } from "@/components/ui/divider";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import Link from "next/link";


export default async function LoginPage() {
  const session = await getSession();

  if (session) {
    redirect("/")
  }

  return (
    <main className="grow grid place-content-center">
      <Card className="w-96 max-w-95">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <LoginForm />
          <DividerWithText text="or" />
          <GithubLoginButton />
          <GoogleLoginButton />
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm">
            Don't have an account ? <Link className="text-blue-200 ml-1 underline" href="/auth/register">Register</Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}