"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/form/form-input";
import { QuizDataType } from "@/lib/quiz/types";
import { useDebouncedCallback } from "use-debounce";

type TitleCardProps = {
  className?: string,
  title?: string,
  description?: string,
  setQuizData: Function,
}

export default function TitleCardPreview({ className, title, description, setQuizData }: TitleCardProps) {
  const handleTitleChange = useDebouncedCallback((value: string) => {
    setQuizData((prev: QuizDataType) => {
      const updated = {...prev};
      updated.title = value;
      return updated;
    });
  }, 300);

  const handleDescriptionChange = useDebouncedCallback((value: string) => {
    setQuizData((prev: QuizDataType) => {
      const updated = {...prev};
      updated.description = value;
      return updated;
    });
  }, 300);

  return (
    <section className={`${className}`}>
      <Card className="border-t-4 border-t-primary">
        <CardContent className="p-6 grid gap-6">
          <FormInput 
            name="title"
            placeholder="Form Title"
            defaultValue={title || "Untitled Quiz"}
            className="text-3xl grow"
            required
            onChange={(e) => handleTitleChange(e.target.value)}
          />    
          <FormInput 
            name="description"
            placeholder="Quiz description"
            className="text-sm"
            defaultValue={ description }
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />    
        </CardContent>
      </Card>
    </section>
  )
}