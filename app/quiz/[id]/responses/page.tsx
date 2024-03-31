
import Pagination from "@/components/form/pagination";
import UserResponseData from "@/components/quiz/user-response-data";
import { fetchQuizById, fetchQuizQuestions, fetchQuizSubmitters } from "@/lib/quiz/data";

interface QuizResponsesPageProps {
  params: { id: string },
  searchParams: { 
    submission?: string 
  }
}

export default async function QuizResponsesPage({ params, searchParams }: QuizResponsesPageProps) {
  const quizId = params.id;
  const [quiz, questions, users] = await Promise.all([
    fetchQuizById(quizId),
    fetchQuizQuestions(quizId),
    fetchQuizSubmitters(quizId)
  ]);
  
  const submission = Number(searchParams.submission) || 1;

  return (
    <main className="grow grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full">
        <section className="border-1 border-secondary p-4 rounded-lg">
          <h1 className="text-3xl mb-4">{ quiz.title }</h1>
          <p className="text-zinc-400">{ quiz.description }</p>
        </section>
        <section className="grid gap-4">
          <UserResponseData 
            user={users[submission - 1]}
            questions={questions}
          />

          <Pagination className="ml-auto mr-auto" totalPages={users.length} />
        </section>
      </div>
    </main>
  );
}