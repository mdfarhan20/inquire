import { ThemeToggle } from "@/components/ui/toggle-theme";
import { FaPoll as Icon } from "react-icons/fa";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSession } from "@/lib/get-session";

export default async function NavBar() {
  const session = await getSession();

  return (
    <nav className="flex justify-between items-center px-8 py-2 border-b-2 border-border">
      <div className="flex items-center gap-2 font-semibold">
        <Icon size="1.2rem" />
        <h1 className="text-xl">
          <Link href="/">inquire</Link>
        </h1>
      </div>

      <div className="text-sm flex items-center gap-4">
        { !session ? (
          <>
            <Link href="/auth/login" className="hover:text-gray-300 duration-100 transition-colors">
              Login
            </Link>
            <Button variant="outline" className="px-4 py-0 border-gray-300">
              <Link href="/auth/Register">Register</Link>
            </Button>
          </>
        ) : (
          <>
            <Link href="/form/create" className="hover:text-gray-300 duration-100 transition-colors">
              Create Form
            </Link>
            <Link href="/auth/logout" className="hover:text-gray-300 duration-100 transition-colors">
              Logout
            </Link>
          </>
        ) }

        <ThemeToggle />
      </div>
    </nav>
  );
}