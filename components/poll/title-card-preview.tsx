"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/form/form-input";
import { useDebouncedCallback } from "use-debounce";
import { PollData } from "@/lib/poll/types";

type TitleCardProps = {
  className?: string,
  title?: string,
  body?: string,
  setPollData: Function,
}

export default function TitleCardPreview({ className, title, body, setPollData }: TitleCardProps) {
  const handleTitleChange = useDebouncedCallback((value: string) => {
    setPollData((prev: PollData) => {
      const updated = {...prev};
      updated.title = value;
      return updated;
    });
  }, 300);

  const handleBodyChange = useDebouncedCallback((value: string) => {
    setPollData((prev: PollData) => {
      const updated = {...prev};
      updated.body = value;
      return updated;
    });
  }, 300);

  return (
    <section className={`${className}`}>
      <Card className="border-t-4 border-t-primary">
        <CardContent className="p-6 grid gap-6">
          <FormInput 
            name="title"
            placeholder="Poll Title"
            defaultValue={title || "Untitled Quiz"}
            className="text-3xl grow"
            required
            onChange={(e) => handleTitleChange(e.target.value)}
          />    
          <FormInput 
            name="description"
            placeholder="Poll body"
            className="text-sm"
            defaultValue={ body }
            onChange={(e) => handleBodyChange(e.target.value)}
          />    
        </CardContent>
      </Card>
    </section>
  )
}