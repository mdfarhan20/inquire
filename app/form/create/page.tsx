"use client";

import { useMemo, useState } from "react";
import { FormField } from "@/components/form/form-field";
import TitleCard from "@/components/form/title-card";
import { Button } from "@/components/ui/button";
import { IoAdd as AddIcon } from "react-icons/io5";
import { FormDataType, FormFieldType } from "@/lib/form/types";


export default function CreateFormPage() {
  const [formData, setFormData] = useState<FormDataType>({
    title: "Untitled Form",
    fields: [{ question: "Untitled question", type: "SHORT_ANSWER", options: [], required: false }]
  });

  const MAX_FIELDS = 5;
  const addFormField = () => {
    if (formData.fields.length >= MAX_FIELDS) return;
    const newField: FormFieldType = {
      question: "Untitled question",
      type: "SHORT_ANSWER",
      options: [],
      required: false
    };
    const updated = {...formData};
    updated.fields.push(newField);
    setFormData(updated);
  }

  return (
    <main className="grow grid place-items-center p-4">
      <form className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full relative">
        <TitleCard 
          className="h-fit" 
          title={formData.title}
          description={formData?.description} 
          setFormData={setFormData} 
        />

        <div className="grow grid gap-4">
          { formData.fields.map((field, index) => (
            <FormField 
              key={index}
              data={field}
              index={index}
              setFormData={setFormData}
            />
          )) }
        </div>

        <div className="flex justify-between mt-4">
          <Button>
            Create Form
          </Button>
          <Button
            onClick={addFormField} 
            className="p-2 h-min"
            variant="secondary"
          >
            <AddIcon size="1.6rem" />
          </Button>
        </div>
      </form>
    </main>
  );
}