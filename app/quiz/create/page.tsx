"use client";

import { Button } from "@/components/ui/button";
import { IoAdd as AddIcon } from "react-icons/io5";
import { QuizFieldPreview } from "@/components/quiz/quiz-field-preview";
import TitleCardPreview from "@/components/quiz/title-card-preview";
import FormSubmitButton from "@/components/ui/form-submit-button";
import { useState } from "react";
import { QuizDataType, QuizQuestionType } from "@/lib/quiz/types";

export default function CreateQuizPage() {
  const [quizData, setQuizData] = useState<QuizDataType>({
    title: "Untitled Quiz",
    questions: [{ question: "Untitled question", options: ["Option 1", "Option 2"], correctAnswer: 0, points: 0 }]
  });

  console.log(quizData);

  const addNewQuestion = () => {
    const newQuestion = { question: "Untitled question", options: ["Option 1", "Option 2"], correctAnswer: 0, points: 0 };
    const updated = { ...quizData };
    updated.questions.push(newQuestion);
    setQuizData(updated);
  }

  return (
    <main className="grow grid place-items-center p-4">
      <form 
        action=""
        className={"max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full relative"}
      >
        <TitleCardPreview 
          title={quizData.title}
          description={quizData.description}
          setQuizData={setQuizData}
        />

        { quizData.questions.map((question: QuizQuestionType, index) => (
          <QuizFieldPreview 
            key={index}
            question={question.question}
            points={question.points}
            options={question.options}
            index={index}
            setQuizData={setQuizData}
            correctAnswer={question.correctAnswer}
          />
        )) }

        <div className="flex justify-between mt-4">
          <FormSubmitButton text="Create Quiz" pendingText="Creating Quiz" />
          <Button
            className="p-2 h-min"
            variant="secondary"
            onClick={addNewQuestion}
          >
            <AddIcon size="1.6rem" />
          </Button>
        </div>
      </form>
    </main>
  )
}