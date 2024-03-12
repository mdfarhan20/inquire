
import { 
  Card, CardHeader,
  CardContent, CardFooter
} from "@/components/ui/card";
import { Divider } from "../ui/divider";
import { getSession } from "@/lib/get-session";
import { CiMail as MailIcon } from "react-icons/ci";
import { HTMLAttributes } from "react";

interface TitleCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string,
  description: string | null,
}

export default async function TitleCard({ title, description, ...props }: TitleCardProps) {
  const session = await getSession();

  return (
    <section { ...props }>
      <Card className="border-t-4 border-t-primary">
        <CardHeader>
          <h1 className="text-3xl">{ title }</h1>
          <p className="text-sm text-zinc-400">{ description }</p>
        </CardHeader>
        <Divider />
        <CardContent className="px-6 py-4 flex justify-between items-center">
          <p>{ session?.user?.email }</p>
          <MailIcon size="1.2rem"/>
        </CardContent>
      </Card>
    </section>
  )
}