"use client"

import FormField from "@/components/form/form-field";
import type { FormFieldWithOptions, FieldResponseType } from "@/lib/form/types";
import FormSubmitButton from "./form-submit-button";
import { useState } from "react";
import { FormState, submitFormResponse } from "@/lib/form/actions";
import Popup from "@/components/ui/popup";
import { useFormState } from "react-dom";

interface ResponseFormProps {
  formFields: FormFieldWithOptions[],
  formId: string,
}

export default function ResponseForm({ formFields, formId }: ResponseFormProps) {
  const [response, setResponse] = useState<FieldResponseType[]>([]);
  const [focusField, setFocusField] = useState(0);
  const submitResponseWithData = submitFormResponse.bind(null, formId, response);

  const [formState, formAction] = useFormState<FormState>(submitResponseWithData, { success: false });

  return (
    <form action={formAction}>
      {!formState.success ? (
        <>
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
        </>
      ) : (
        <Popup title="Response Submitted" className="mx-auto">
          <p className="text-sm mx-4">Your response has been recorded.</p>
        </Popup>
      )}
    </form>
  );
}