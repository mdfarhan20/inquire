import { ThemeToggle } from "@/components/ui/toggle-theme";

export default function NavBar() {
  return (
    <nav className="flex justify-between items-center px-8 py-2 border-b-2 border-border">
      <h1 className="text-xl">Inquire</h1>

      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}