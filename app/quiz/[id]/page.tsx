import TitleCard from "@/components/quiz/title-card";
import QuizResponse from "@/components/quiz/quiz-response";
import { fetchQuizById, fetchQuizQuestions } from "@/lib/quiz/data";

export default async function QuizPage({ params }: { params: { id: string } }) {
  const quizId = params.id;
  const [quiz, questions] = await Promise.all([
    fetchQuizById(quizId),
    fetchQuizQuestions(quizId)
  ]);

  return (
    <main className="grow grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full">
        <TitleCard
          title={quiz.title}
          description={quiz.description}
        />

        <QuizResponse 
          questions={questions}
          quizId={quizId}
        />
      </div>
    </main>
  );
} 