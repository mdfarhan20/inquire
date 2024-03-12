
import prisma from "@/prisma/client";
import { Quiz } from "@prisma/client";
import { QuizQuestionWithOptions } from "@/lib/quiz/types";

export async function fetchQuizById(id: string) {
  const quiz: Quiz = await prisma.quiz.findUnique({
    where: { id }
  });

  return quiz;
}

export async function fetchQuizQuestions(quizId: string) {
  const questions: QuizQuestionWithOptions[] = await prisma.quizQuestion.findMany({
    where: { quizId },
    include: { options: true }
  });

  return questions;
}