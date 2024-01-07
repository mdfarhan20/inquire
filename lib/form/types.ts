
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