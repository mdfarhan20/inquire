"use client";

import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "@/components/form/form-input";
import { FormDataType } from "@/lib/form/types";
import { useDebouncedCallback } from "use-debounce";
import { Label } from "@/components/ui/label";

type TitleCardProps = {
  className?: string,
  title?: string,
  description?: string,
  // formData?: FormDataType,
  // setFormData: Function,
}

export default function TitleCardPreview({ className, title, description }: TitleCardProps) {
  // const handleTitleChange = useDebouncedCallback((value) => {
  //   setFormData((prev: FormDataType) => {
  //     const updated = {...prev};
  //     updated.title = value;
  //     return updated;
  //   });
  // }, 300);

  // const handleDescriptionChange = useDebouncedCallback((value) => {
  //   setFormData((prev: FormDataType) => {
  //     const updated = {...prev};
  //     updated.description = value;
  //     return updated;
  //   });
  // }, 300);

  return (
    <section className={`${className}`}>
      <Card className="border-t-4 border-t-primary">
        <CardContent className="p-6 grid gap-6">
          <div className="flex items-start">
            <FormInput 
              name="title"
              placeholder="Form Title"
              defaultValue={title || "Untitled Quiz"}
              className="text-3xl grow"
              required
              // onChange={(e) => handleTitleChange(e.target.value)}
            />    
            <div className="flex gap-4 items-center">
              <Label htmlFor="points" className="text-sm uppercase">Points</Label>
              <input
                name="points"
                type="number"
                min={1}
                className="w-16 rounded-md py-1 px-2 text-center"
              />
            </div>
          </div>        
          <FormInput 
            name="description"
            placeholder="Quiz description"
            className="text-sm"
            defaultValue={ description }
            // onChange={(e) => handleDescriptionChange(e.target.value)}
          />    
          
        </CardContent>
      </Card>
    </section>
  )
}