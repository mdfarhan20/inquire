"use server";

import prisma from "@/prisma/client";
import { QuizDataType } from "@/lib/quiz/types";
import { getSession } from "@/lib/get-session";

export type QuizState = {
  success: boolean,
  message?: string,
  quizId?: string,
}

// export async function createQuiz(quizData: QuizDataType, state: QuizState) {
//   const session = await getSession();

//   await
// }