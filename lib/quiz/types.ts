import { QuizOption, QuizQuestion } from "@prisma/client";

export type QuizDataType = {
  title: string,
  description?: string,
  questions: QuizQuestionType[]
}

export type QuizQuestionType = {
  question: string,
  options: string[],
  correctAnswer: number,
  points: number,
}

export type QuizState = {
  success: boolean,
  message?: string,
  quizId?: string,
}

export type QuizResponseType = {
  questionId: string,
  optionId: string 
}

export interface QuizQuestionWithOptions extends QuizQuestion {
  options: QuizOption[]
}