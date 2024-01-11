"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/form/form-input";
import { FormDataType } from "@/lib/form/types";
import { useDebouncedCallback } from "use-debounce";

type TitleCardProps = {
  className?: string,
  title?: string,
  description?: string,
  formData?: FormDataType,
  setFormData: Function,
}

export default function TitleCardPreview({ className, title, description, setFormData }: TitleCardProps) {
  const handleTitleChange = useDebouncedCallback((value) => {
    setFormData((prev: FormDataType) => {
      const updated = {...prev};
      updated.title = value;
      return updated;
    });
  }, 300);

  const handleDescriptionChange = useDebouncedCallback((value) => {
    setFormData((prev: FormDataType) => {
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
            defaultValue={title || "Untitled Form"}
            className="text-3xl"
            required
            onChange={(e) => handleTitleChange(e.target.value)}
          />          
          <FormInput 
            name="description"
            placeholder="Form description"
            className="text-sm"
            defaultValue={ description }
            onChange={(e) => handleDescriptionChange(e.target.value)}
          />          
        </CardContent>
      </Card>
    </section>
  )
}