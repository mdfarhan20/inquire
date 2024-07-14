"use client";

import { useRef, useState } from "react";
import { FormFieldPreview } from "@/components/form/form-field-preview";
import TitleCardPreview from "@/components/form/title-card-preview";
import { Button } from "@/components/ui/button";
import { IoAdd as AddIcon } from "react-icons/io5";
import { FormDataType, FormFieldType } from "@/lib/form/types";
import { FormState, createForm } from "@/lib/form/actions";
import FormSubmitButton from "@/components/ui/form-submit-button";
import { useFormState } from "react-dom";
import clsx from "clsx";
import Link from "next/link";
import Popup from "@/components/ui/popup";
import CopyText from "@/components/ui/copy-text";

export default function CreateFormPage() {
  const [fieldInFocus, setFieldInFocus] = useState(0);
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

  const createFormWithData = createForm.bind(null, formData);
  const [formState, formAction] = useFormState<FormState>(createFormWithData, { success: false, message: undefined });

  return (
    <main className="grow grid place-items-center p-4">
      <form 
        action={formAction} 
        className={clsx("max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full relative", { "blur-sm pointer-events-none": formState.success })}
      >
        <TitleCardPreview 
          className="h-fit" 
          title={formData.title}
          description={formData?.description} 
          setFormData={setFormData} 
        />

        <div className="grow grid gap-4">
          { formData.fields.map((field, index) => (
            <FormFieldPreview
              key={index}
              data={field}
              index={index}
              setFormData={setFormData}
              onFocus={() => setFieldInFocus(index)}
              fieldInFocus={fieldInFocus === index}
            />
          )) }
        </div>

        <div className="flex justify-between mt-4">
          <FormSubmitButton text="Create From" pendingText="Creating Form" />
          <Button
            onClick={addFormField} 
            className="p-2 h-min"
            variant="secondary"
          >
            <AddIcon size="1.6rem" />
          </Button>
        </div>
      </form>

      { formState.success && (
        <Popup title="Form Created" className="absolute">
          <CopyText text={`${location.origin}/form/${formState.formId}`} />
          <Link href="/dashboard"><Button className="mx-4">Back to Dashboard</Button></Link>
        </Popup>
      ) }
      
    </main>
  );
}

