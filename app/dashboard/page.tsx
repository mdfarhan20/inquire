
import { fetchFormsByUser } from "@/lib/form/data";
import { getSession } from "@/lib/get-session"
import { fetchPollsByUser } from "@/lib/poll/data";
import { fetchQuizzesByUser } from "@/lib/quiz/data";
import Collection from "@/components/dashboard/collection";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default async function DashboardPage() {
  const session = await getSession();
  const [forms, quizzes, polls] = await Promise.all([
    fetchFormsByUser(session?.userId),
    fetchQuizzesByUser(session?.userId),
    fetchPollsByUser(session?.userId)
  ]);

  return (
    <main className="grid place-items-center gap-6">
      <section className="px-4 py-6 bg-neutral-900 grid gap-4 place-items-center w-screen max-w-full">
        <h1 className="text-2xl">{ session?.user?.name }</h1>
        <div className="flex gap-2 items-center">
          <MailIcon className="size-4 md:size-5" /> 
          <p className="text-xs md:text-base">{ session?.user?.email }</p>
        </div>
        <div className="flex gap-1 md:gap-2 flex-wrap">
          <Link href="/form/create">
            <Button variant="outline" className="text-xs">Create Form</Button>
          </Link>
          <Link href="/quiz/create">
            <Button variant="outline" className="text-xs">Create Quiz</Button>
          </Link>
          <Link href="/poll/create">
            <Button variant="outline" className="text-xs">Create Poll</Button>
          </Link>
        </div>
      </section>
      <section className="w-full max-w-90 grid gap-8">
        <Collection
          title="Forms"
          type="form"
          collection={forms.map((form) => { return { id: form.id, name: form.title } })}
        />
        <Collection
          title="Quizzes"
          type="quiz"
          collection={quizzes.map((quiz) => { return { id: quiz.id, name: quiz.title } })}
        />
        <Collection
          title="Polls"
          type="poll"
          collection={polls.map((poll) => { return { id: poll.id, name: poll.title } })}
        />
      </section>
    </main>
  )
}



