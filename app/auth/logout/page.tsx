import { getSession } from "@/lib/get-session";
import {
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import Link from "next/link";
import { LogoutButton } from "@/components/auth-buttons";
import { redirect } from "next/navigation";
import { Divider } from "@/components/ui/divider";

export default async function Logout() {
  const session = await getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <main className="grow grid place-content-center">
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Logout</CardTitle>
          <CardDescription>Are you sure you want to log out?</CardDescription>
        </CardHeader>
        <Divider/>
        <CardContent className="flex items-center justify-between gap-10 p-6">
          <div>
            <p className="font-semibold tracking-wider">{ session.user?.name }</p>
            <p className="text-sm text-gray-400">{ session.user?.email }</p>
          </div>
          { session.user?.image && 
            <img 
              src={session.user.image}
              alt="profile image"
              className="w-16 rounded-full"
            /> 
          }
        </CardContent>
        <Divider />
        <CardFooter className="grid grid-cols-2 p-0">
          <Link href="/" className="text-center hover:text-gray-300">Go back</Link>
          <LogoutButton />
        </CardFooter>
      </Card>
    </main>
  );
}