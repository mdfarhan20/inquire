"use client";

import { QuizQuestionWithOptions, QuizResponseType, QuizState } from "@/lib/quiz/types";
import FormSubmitButton from "../ui/form-submit-button";
import QuizQuestion from "./quiz-question";
import { useState } from "react";
import { useFormState } from "react-dom";
import { submitQuizResponse } from "@/lib/quiz/actions";
import Popup from "@/components/ui/popup";

interface QuizResponseProps {
  questions: QuizQuestionWithOptions[],
  quizId: string
}

export default function QuizResponse({ questions, quizId }: QuizResponseProps) {
  const [responseData, setResponseData] = useState<QuizResponseType[]>([]);
  const submitQuizWithData = submitQuizResponse.bind(null, quizId, responseData);
  const [formState, formAction] = useFormState<QuizState>(submitQuizWithData, { success: false });

  const handleResponseUpdate = (index: number, optionId: string) => {
    const data = [...responseData];
    const response: QuizResponseType = { 
      questionId: questions[index].id ,
      optionId
    };
    data[index] = response;
    setResponseData(data);
  }

  const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);
  const getScore = () => {  
    const correctOptions = questions.map((question) => {
      for (let option of question.options) {
        if (option.isCorrect)
          return option.id;
      }
      return null;
    });

    let score = 0;
    for (let i = 0; i < correctOptions.length; i++) {
      if (responseData[i].optionId === correctOptions[i])
        score += questions[i].points;
    }

    return score;
  }

  return (
    <form action={formAction}>
      { !formState.success ? (
        <>
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
        </>
      ) : (
        <Popup title="Response Submitted" className="mx-auto">
          <p className="text-sm mx-4">You got {getScore()} points out of {totalPoints}.</p>
        </Popup>
      ) }
    </form>
  );
}