
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