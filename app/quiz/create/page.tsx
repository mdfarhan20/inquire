import { QuizFieldPreview } from "@/components/quiz/quiz-field-preview";
import TitleCardPreview from "@/components/quiz/title-card-preview";

export default async function CreateQuizPage() {
  return (
    <main className="grow grid place-items-center p-4">
      <form 
        action=""
        className={"max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full relative"}
      >
        <TitleCardPreview />

        <QuizFieldPreview />
      </form>
    </main>
  )
}