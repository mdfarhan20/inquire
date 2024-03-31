import Hero from "@/components/home/hero-section";
import Features from "@/components/home/features-section";
import Footer from "@/components/home/footer";
import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="overflow-hidden">
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}
