import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginForm() {
  return (
    <form className="grid gap-2">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input className="mt-1" name="email" type="email" placeholder="Email" />
      </div>
      <div>
        <Label htmlFor="password" className="mb-4">Password</Label>
        <Input className="mt-1" name="password" type="password" placeholder="Password" />
      </div>
      <Button className="w-full mt-4">Login</Button>
    </form>
  );
}