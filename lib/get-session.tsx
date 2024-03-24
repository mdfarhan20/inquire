import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { unstable_noStore as noStore } from "next/cache";

export async function getSession() {
  noStore();
  return (await getServerSession(authOptions));
}