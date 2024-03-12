"use client";

import { QuizQuestionWithOptions, QuizResponseType } from "@/lib/quiz/types";
import FormSubmitButton from "../ui/form-submit-button";
import QuizQuestion from "./quiz-question";
import { useState } from "react";

interface QuizResponseProps {
  questions: QuizQuestionWithOptions[],
  quizId: string
}

export default function QuizResponse({ questions, quizId }: QuizResponseProps) {
  const [responseData, setResponseData] = useState<QuizResponseType[]>([]);

  const handleResponseUpdate = (index: number, optionId: string) => {
    const data = [...responseData];
    const response: QuizResponseType = { 
      questionId: questions[index].id ,
      optionId
    };
    data[index] = response;
    setResponseData(data);
  }

  return (
    <form>
      <div className="grow grid gap-4">
        { questions.map((question, index) => (
          <QuizQuestion 
            index={index}
            question={question}
            handleResponseUpdate={handleResponseUpdate}
            selectedOption={responseData[index]?.optionId || null}
            key={index}
          />
        )) }
      </div>

      <FormSubmitButton 
        text="Submit" 
        pendingText="Submitting Response" 
        className="mt-6"
      />
    </form>
  );
}