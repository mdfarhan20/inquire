
import prisma from "@/prisma/client";
import { Quiz, QuizQuestionResponse } from "@prisma/client";
import { QuizQuestionWithOptions, QuizSubmissionUser } from "@/lib/quiz/types";

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

export async function fetchQuizSubmitters(quizId: string) {
  const submissions: QuizSubmissionUser[] = await prisma.quizSubmission.findMany({
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
  const response: QuizQuestionResponse = await prisma.quizQuestionResponse.findUnique({
    data: {
      userId, questionId
    }
  });

  return response;
}