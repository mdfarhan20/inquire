"use client";

import { InputHTMLAttributes, ReactElement, TextareaHTMLAttributes, useEffect } from "react"
import { FormInput } from "./form-input";
import { FormFieldOption } from "@prisma/client";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FieldResponseType, FormFieldWithOptions } from "@/lib/form/types";
import { useDebouncedCallback } from "use-debounce";

type FormFieldProps = {
  fieldData: FormFieldWithOptions,
  index: number,
  fieldResponse: FieldResponseType,
  setResponse: Function,
  focus: boolean,
  setFocus: Function
}

export default function FormField({ fieldData, index, fieldResponse, setResponse, focus, setFocus }: FormFieldProps) {
  const { id, question, type, required, options } = fieldData;

  useEffect(() => {
    setResponse((prev: FieldResponseType[]) => {
      const updated = [ ...prev ];
      if (type === "CHECKBOX") {
        updated[index] = {
          answer: [],
          formFieldId: id
        } as FieldResponseType<string[]>;
      } else {
        updated[index] = {
          answer: null,
          formFieldId: id
        } as FieldResponseType<string>;
      }
      return updated;
    });
  }, []);

  const handleInputChange = useDebouncedCallback((value: string) => {
    setResponse((prev: FieldResponseType[]) => {
      const updated = [ ...prev ];
      updated[index].answer = value;
      return updated;
    });
  }, 300);

  const handleCheckboxUpdate = (value: string) => {
    const response = { ...fieldResponse } as FieldResponseType<string[]>
    
    if (!response.answer?.includes(value))
      response.answer?.push(value);
    else
      response.answer = response.answer?.filter(option => option !== value);

    setResponse((prev: FieldResponseType[]) => {
      const updated = [ ...prev ];
      updated[index] = response;
      return updated;
    });
  }

  const FieldInput = (): ReactElement => {
    if (type === "LONG_ANSWER")
      return (
        <LongAnwerInput 
          required={required} 
          defaultValue={fieldResponse?.answer as string} 
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setFocus(index)}
          autoFocus={focus}
        />
      )
    else if (type === "MCQ")
      return (
        <MCQInput 
          options={options} 
          required={required} 
          defaultValue={fieldResponse?.answer as string}
          onValueChange={(value) => handleInputChange(value)}
        />
      )
    else if (type === "CHECKBOX")
      return (
        <CheckboxInput 
          options={options} 
          required={required} 
          selectedOptions={fieldResponse?.answer as string[]} 
          onChange={(e) => handleCheckboxUpdate(e.target.value)}
        />
      )
    
    return (
      <FormInput 
        placeholder="Your answer" 
        className="text-sm" 
        required={required} 
        defaultValue={fieldResponse?.answer as string}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setFocus(index)}
        autoFocus={focus}
      />
    );
  };

  return (
    <div className="border-1 border-border rounded-lg p-6 grid gap-4" onFocus={() => setFocus(index)} autoFocus={focus}>
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
      className={`block bg-transparent border-1 border-border rounded-md w-full p-4 text-sm ${props.className}`}
    ></textarea>
  )
}

interface ChoiceInputProps extends InputHTMLAttributes<HTMLInputElement> {
  options: FormFieldOption[],
  defaultValue?: string,
  selectedOptions?: string[],
  onValueChange?: (value: string)=> void,
}

function MCQInput({ options, defaultValue, onValueChange, ...props }: ChoiceInputProps) {
  return (
    <RadioGroup 
      onValueChange={onValueChange} 
      className="pl-4 grid gap-4"
      required={props.required} 
      defaultValue={defaultValue}
    >
      { options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <RadioGroupItem value={option.text} id={option.id} />
          <Label htmlFor={option.id}>{option.text}</Label>
        </div>
      )) }
    </RadioGroup>
  )
}

function CheckboxInput({ options, selectedOptions, ...props }: ChoiceInputProps) {
  return (
    <div className="grid gap-4 pl-4">
      { options.map((option) => (
        <div key={option.id} className="flex items-center space-x-2">
          <input
            type="checkbox" 
            id={option.id} 
            value={option.text}
            defaultChecked={selectedOptions?.includes(option.text)} 
            onChange={props.onChange}
          />
          <Label htmlFor={option.id}>{option.text}</Label>
        </div>
      ))}
    </div>
  );
}

