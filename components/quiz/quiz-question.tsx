"use client";

import { useRef } from "react";
import clsx from "clsx";
import type { QuizOption as QuizOptionType } from "@prisma/client";
import { QuizQuestionWithOptions } from "@/lib/quiz/types";
import { Divider } from "../ui/divider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface QuizQuestionProps {
  index: number,
  question: QuizQuestionWithOptions,
  handleResponseUpdate: Function,
  selectedOption: string | null
}

export default function QuizQuestion({ index, question, handleResponseUpdate, selectedOption }: QuizQuestionProps) {
  return (
    <div className="border-1 border-border border-x-primary rounded-lg">
      <p className="py-4 px-6">{ question.question }</p>
      <Divider className="border-1" />

      <RadioGroup 
        className="p-6" 
        onValueChange={(value) => handleResponseUpdate(index, value)}
        required
      >
        { question.options.map((option) => (
          <QuizOption 
            option={option} 
            selected={option.id === selectedOption}
            key={option.id}
          />
        )) }
      </RadioGroup>
    </div>
  );
}

export function QuizOption({ option, selected }: { option: QuizOptionType, selected: boolean }) {
  const radioRef = useRef<HTMLButtonElement>(null);

  let className = clsx(
    "border-1 border-border p-3 flex gap-4 items-center rounded-md cursor-pointer",
    { "border-primary bg-orange-700 bg-opacity-10": selected }
  );

  return (
    <div className={className} onClick={() => radioRef.current?.click()}>
      <RadioGroupItem 
        ref={radioRef}
        value={option.id}
        onClick={(e) => e.stopPropagation()}
        checked={selected}
      />
      <p>{option.text}</p>
    </div>
  );
}