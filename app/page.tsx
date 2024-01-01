import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="grow grid gap-4 place-content-center">
      <div className="text-center grid gap-2 place-items-center">
        <h1 className="text-6xl font-bold">Inquire</h1>
        <h2 className="text-xl">Forms | Quizzes | Polls</h2>
        <p className="w-1/2 text-center text-muted-foreground">Everything you need create and share surveys, quizzes and polls with everyone in the world who has an account here..</p>
      </div>
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
