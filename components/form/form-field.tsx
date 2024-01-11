"use client";

import { InputHTMLAttributes, ReactElement, TextareaHTMLAttributes } from "react"
import { FormInput } from "./form-input";
import { FormFieldOption } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type FormFieldProps = {
  id: string,
  question: string,
  type: string,
  required: boolean,
  options: FormFieldOption[]
}

export default function FormField({ id, question, type, required, options }: FormFieldProps) {
  const FieldInput = (): ReactElement => {
    if (type === "LONG_ANSWER")
      return <LongAnwerInput required={required} />
    else if (type === "MCQ")
      return <MCQInput options={options} required={required} />
    else if (type === "CHECKBOX")
      return <CheckboxInput options={options} required={required} />
    return <FormInput placeholder="Your answer" className="text-sm" required={required} />
  };

  return (
    <div className="border-1 border-border rounded-lg p-6 grid gap-4">
      <p>{ question } { required && <span className="text-red-400 ml-0.5">*</span> }</p>
      <FieldInput />
    </div>
  )
}

function LongAnwerInput(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea 
      placeholder={"Type you answer here"}
      { ...props }
      className={`bg-transparent border-1 border-border rounded-md w-full p-4 text-sm ${props.className}`}
    ></textarea>
  )
}

interface ChoiceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  options: FormFieldOption[],
}

function MCQInput({ options, ...props }: ChoiceInputProps) {
  return (
    <RadioGroup className="pl-4 grid gap-4" required={props.required}>
      { options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <RadioGroupItem value={option.text} id={option.id} />
          <Label htmlFor={option.id}>{option.text}</Label>
        </div>
      )) }
    </RadioGroup>
  )
}

function CheckboxInput({ options, ...props }: ChoiceInputProps) {
  return (
    <div className="grid gap-4 pl-4">
      { options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <Checkbox id={option.id} required={props.required} />
          <Label htmlFor={option.id}>{option.text}</Label>
        </div>
      ))}
    </div>
  );
}

