import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";
import HomePage from "@/components/home";


export default async function Home() {
  const session = await getSession();

  return (
    <main className="grow grid gap-4 place-content-center">
      <HomePage />
      { session ? (
        <div className="grid gap-4 place-items-center">
          <p className="text-center">{session.user?.name}, You are logged in..</p>
        </div>
      ) : (
        <div className="flex gap-4 justify-center">
          <Button><Link href="/auth/login">Login</Link></Button>
          <Button variant='secondary'><Link href="/auth/register">Register</Link></Button>
        </div>
      ) }
    </main>
  )
}
