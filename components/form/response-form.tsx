"use client"

import FormField from "@/components/form/form-field";
import type { FormFieldWithOptions, FieldResponseType } from "@/lib/form/types";
import FormSubmitButton from "./form-submit-button";
import { useState } from "react";
import { submitFormResponse } from "@/lib/actions";

interface ResponseFormProps {
  formFields: FormFieldWithOptions[],
  formId: string,
}

export default function ResponseForm({ formFields, formId }: ResponseFormProps) {
  const [response, setResponse] = useState<FieldResponseType[]>([]);
  const [focusField, setFocusField] = useState(0);
  const submitResponseWithData = submitFormResponse.bind(null, formId, response);

  return (
    <form action={submitResponseWithData}>
      <div className="grow grid gap-4">
        { formFields.map((field, index) => (
          <FormField 
            key={field.id}
            fieldData={field}
            index={index}
            fieldResponse={response[index]}
            setResponse={setResponse}
            focus={focusField === index}
            setFocus={setFocusField}
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