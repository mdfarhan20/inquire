import RegisterForm from "@/components/auth/register-form";
import { 
  Card,
  CardContent, 
  CardHeader,
  CardTitle,
  CardFooter 
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
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <RegisterForm />
          <DividerWithText text="or" />
          <GithubLoginButton text="Register with Github" />
          <GoogleLoginButton text="Register with Google" />
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-sm">
            Already have an account ? <Link className="text-blue-200 ml-1 underline" href="/auth/login">Login</Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  )
}