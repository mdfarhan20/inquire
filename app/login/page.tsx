import LoginForm from "@/components/login/login-form";
import { 
  Card,
  CardContent, 
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import { GithubLoginButton, GoogleLoginButton } from "@/components/oauth-login";
import { DividerWithText } from "@/components/ui/divider";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";


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
      </Card>
    </main>
  )
}