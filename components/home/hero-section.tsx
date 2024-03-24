import Link from "next/link";
import { Button } from "../ui/button";
import { FormCard, PollCard, QuizCard } from "./cards";

export default function Hero() {
  return (
    <section className="h-screen grid place-items-center relative lg:flex lg:flex-col">
      <div className="grid gap-8 place-items-center lg:grid-cols-2 lg:w-4/5 lg:h-3/5">
        <div>
          <h1 className="text-4xl md:text-6xl text-center lg:text-start lg:text-8xl font-bold">Inquire</h1>
          <p className="uppercase text-sm sm:text-base text-center mt-4 tracking-wider font-light lg:text-start lg:mt-8">Forms | Quizzes | Polls</p>
        </div>
        <div className="grid gap-4 place-items-center">
          <p className="lg:px-0 text-center text-sm sm:text-base md:w-1/2 lg:w-4/5 lg:text-lg px-6 font-light lg:tracking-wider">Create, share, and gather insights effortlessly with Inquire. Craft customized forms, quizzes, and polls, then share them via simple links. Start creating today!</p>
          <div className="flex gap-4 justify-center lg:justify-end">
            <Link href="/login" className="lg:grow">
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/register" className="lg:grow">
              <Button className="w-full" variant="secondary">Register</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden grid-cols-3 gap-6 px-8 lg:grid w-full">
        <QuizCard />
        <FormCard />
        <PollCard />
      </div>

      <div className="absolute top-100 left-100 w-60 aspect-square rounded-full bg-primary blur-xl opacity-10 lg:-top-1/4 lg:-left-20 lg:w-1/2 lg:blur-3xl"></div>
      <div className="absolute aspect-square rounded-full bg-primary opacity-10 top-full left-full w-1/4 blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
    </section>
  )
}
