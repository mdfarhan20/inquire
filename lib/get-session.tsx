import { getServerSession } from "next-auth";
import { SessionWithID, authOptions } from "./authOptions";
import { unstable_noStore as noStore } from "next/cache";

export async function getSession() {
  noStore();
  const session: SessionWithID | null = await getServerSession(authOptions)
  return session;
}