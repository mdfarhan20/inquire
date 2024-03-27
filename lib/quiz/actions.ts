"use server";

import prisma from "@/prisma/client";
import { QuizDataType, QuizQuestionType, QuizResponseType, QuizState } from "@/lib/quiz/types";
import { getSession } from "@/lib/get-session";
import { Quiz, QuizQuestion } from "@prisma/client";

export async function createQuiz(quizData: QuizDataType, state: QuizState) {
  const session = await getSession();
  let quizId;

  try {
    const quiz: Quiz = await prisma.quiz.create({
      data: {
        title: quizData.title,
        description: quizData.description,
        userId: session?.userId
      }
    });

    quizData.questions.forEach(async (question) => {
      await createQuizQuestion(question, quiz.id);
    });

    quizId = quiz.id;
  } catch (err) {
    console.log(err);
  } finally {
    return {
      success: true,
      message: "Quiz created successfully",
      quizId
    };
  }
}

export async function createQuizQuestion(questionData: QuizQuestionType, quizId: string) {
  try {
    const question: QuizQuestion = await prisma.quizQuestion.create({
      data: {
        question: questionData.question,
        points: questionData.points,
        quizId,
      }
    });

    questionData.options.forEach(async (option, index) => {
      await createQuizOption(option, question.id, (questionData.correctAnswer === index));
    });
  } catch (err) {
    console.log(err);
  }
}

export async function createQuizOption(option: string, questionId: string, isCorrect: boolean) {
  try {
    await prisma.quizOption.create({
      data: {
        text: option,
        isCorrect,
        questionId
      }
    });
  } catch (err) {
    console.log(err)
  }
}

export async function submitQuizResponse(quizId: string, quizResponse: QuizResponseType[], prevState: QuizState) {
  const session = await getSession();

  try {
    await prisma.quizSubmission.create({
      data: {
        userId: session?.userId,
        quizId
      }
    });
    
    quizResponse.forEach(async (repsonse) => {
      await prisma.quizQuestionResponse.create({
        data: {
          userId: session?.userId,
          questionId: repsonse.questionId,
          optionId: repsonse.optionId
        }
      });
    });
  } catch (err) {
    console.log(err);
  }

  return {
    success: true,
    message: "Quiz Submission Recorded"
  }
}

export async function deleteQuiz(quizId: string) {
  try {
    await prisma.quiz.delete({
      where: { id: quizId }
    });
  } catch(err) {
    console.log(err);
  }
}