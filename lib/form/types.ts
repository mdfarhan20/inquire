import type { FormFieldOption, FormField, FormSubmission, User } from "@prisma/client";

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

export type ResponseWithCount = {
  _count: number,
  answer: string,
}

export interface FieldResponseType<T=string | string[]> {
  answer: T | null,
  formFieldId: string
}

export interface FormFieldWithOptions extends FormField {
  options: FormFieldOption[]
}

export interface FormSubmissionWithUser extends FormSubmission {
  user: User
}
