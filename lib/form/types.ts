import type { FormFieldOption, FormField } from "@prisma/client";

export type FormDataType = {
  title: string,
  description?: string,
  fields: FormFieldType[],
}

export type FormFieldType = {
  question: string,
  type: string,
  options: string[],
  required: boolean
}

export interface FormFieldWithOptions extends FormField {
  options: FormFieldOption[]
}