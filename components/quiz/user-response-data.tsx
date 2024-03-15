import { User } from "@prisma/client";
import { QuizQuestionWithOptions } from "@/lib/quiz/types";
import { CiMail as MailIcon } from "react-icons/ci";
import { fetchUserQuestionResponse } from "@/lib/quiz/data";
import { MdOutlineRadioButtonUnchecked as RadioIcon } from "react-icons/md";
import { IoCheckmark as CorrectIcon } from "react-icons/io5";
import { IoClose as WrongIcon } from "react-icons/io5";
import clsx from "clsx";

interface UserResponseDataProps {
  user: User,
  questions: QuizQuestionWithOptions[]
}

export default function UserResponseData({ user, questions }: UserResponseDataProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4 py-2 px-4 bg-secondary rounded-lg">
        <p>{ user.email }</p>
        <MailIcon size="1.2rem" />
      </div>

      <div className="grid gap-4">
        { questions.map((question, index) => (
          <UserQuestionResponse
            key={index}
            userId={user.id}
            question={question}
          />
        )) }
      </div>
    </div>
  );
}

interface UserQuestionResponseProps {
  question: QuizQuestionWithOptions,
  userId: string
}

async function UserQuestionResponse({ question, userId }: UserQuestionResponseProps) {
  const response = await fetchUserQuestionResponse(userId, question.id);

  return (
    <div className="border-1 border-secondary rounded-md p-4">
      <div className="flex justify-between">
        <p className="mb-2">{ question.question }</p>
        <p className="uppercase text-sm text-zinc-600">{ question.points }</p>
      </div>

      <ul className="grid gap-2">
        { question.options.map(option => (
          <li className={clsx("flex gap-4 border-1 border-border px-4 py-2 rounded-md items-center", {
            "border-green-600": option.isCorrect,
            "border-primary": (response.optionId === option.id)
          })}>
            { option.isCorrect 
              ? <CorrectIcon /> : (response.optionId === option.id && !option.isCorrect) 
              ? <WrongIcon /> : <RadioIcon /> 
            }
            <p>{ option.text }</p>
          </li>
        )) }
      </ul>
    </div>
  )
}