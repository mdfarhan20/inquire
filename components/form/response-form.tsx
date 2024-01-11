"use client"

import FormField from "@/components/form/form-field";
import type { FormFieldWithOptions } from "@/lib/form/types";
import FormSubmitButton from "./form-submit-button";

export default function ResponseForm({ formFields }: { formFields: FormFieldWithOptions[] }) {
  return (
    <form>
      <div className="grow grid gap-4">
        { formFields.map((field) => (
          <FormField 
            key={field.id}
            question={field.question}
            type={field.type}
            required={field.required}
            options={field.options}
            id={field.id}
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