import Hero from "@/components/home/hero-section";
import Features from "@/components/home/features-section";
import Footer from "@/components/home/footer";

export default async function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Features />
      <Footer />
    </main>
  )
}
