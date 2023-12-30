import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser } from "@/lib/actions";

export default function RegisterForm() {
  return (
    <form action={createUser} className="grid gap-2">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input 
          className="mt-1" 
          name="name" 
          type="name" 
          placeholder="Name"
          required
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input 
          className="mt-1"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <Label htmlFor="password" className="mb-4">Password</Label>
        <Input
          className="mt-1"
          name="password"
          type="password"
          placeholder="Password" 
          required
        />
      </div>

      <Button type="submit" className="w-full mt-4">Register</Button>
    </form>
  );
}