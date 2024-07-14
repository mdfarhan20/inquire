
import prisma from "@/prisma/client";
import { Quiz } from "@prisma/client";
import { QuizQuestionWithOptions } from "@/lib/quiz/types";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";


export async function fetchQuizById(id: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { id }
  });

  if (!quiz)
    return notFound();

  return quiz;
}

export async function fetchQuizQuestions(quizId: string) {
  const questions: QuizQuestionWithOptions[] = await prisma.quizQuestion.findMany({
    where: { quizId },
    include: { options: true }
  });

  return questions;
}

export async function fetchQuizSubmitters(quizId: string) {
  const submissions = await prisma.quizSubmission.findMany({
    select: {
      user: {
        select: {
          id: true,
          email: true,
        }
      }
    },
    where: { quizId },
  });

  const users = submissions.map((submission) => submission.user);
  return users;
}

export async function fetchUserQuestionResponse(userId: string, questionId: string) {
  const response = await prisma.quizQuestionResponse.findFirst({
    where: {
      userId, questionId
    }
  });

  return response;
}

export async function fetchQuizzesByUser(userId: string) {
  noStore();
  const quizzes: Quiz[] = await prisma.quiz.findMany({
    where: { userId },
  });

  return quizzes;
}