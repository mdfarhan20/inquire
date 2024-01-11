"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from "@/components/ui/select";
import { GoTrash as TrashIcon } from "react-icons/go";
import { 
  MdOutlineShortText as ShortTextIcon, 
  MdOutlineRadioButtonChecked as RadioButtonIcon,
  MdOutlineRadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "react-icons/md";
import { GrTextAlignFull as LongTextIcon } from "react-icons/gr";
import { IoIosCheckboxOutline as CheckboxIcon, IoMdClose as CloseIcon } from "react-icons/io";
import { Switch } from "../ui/switch";
import {  ReactElement,  useMemo,  useState } from "react";
import { FormInput } from "@/components/form/form-input";
import { FormDataType, FormFieldType } from "@/lib/form/types";
import { useDebouncedCallback } from "use-debounce";

type FormFieldProps = {
  data: FormFieldType,
  setFormData: Function,
  index: number
}

export function FormFieldPreview({ data, setFormData, index }: FormFieldProps) {

  const FieldPreview = (): ReactElement => {
    if (data.type === "SHORT_ANSWER")
      return <TextAnswerPreview text="Short answer text" />
    else if (data.type === "LONG_ANSWER")
      return <TextAnswerPreview text="Long answer text" />
    else if (data.type === "CHECKBOX" || data.type === "MCQ")
      return (
        <ChoiceAnswerPreview
          type={data.type}
          options={data.options}
          setFormData={setFormData}
          fieldIndex={index}
        />
      )

    return <TextAnswerPreview text="undefined" />
  }

  const handleQuestionChange = useDebouncedCallback((value: string) => {
    setFormData((prev: FormDataType) => {
      const updated = {...prev};
      updated.fields[index].question = value;
      return updated;
    });
  }, 300);

  const handleTypeChange = useDebouncedCallback((value: string) => {
    setFormData((prev: FormDataType) => {
      const updated = {...prev};
      updated.fields[index].type = value;

      if (value === "SHORT_ANSWER" || value === "LONG_ANSWER")
        updated.fields[index].options = [];
      else if (value === "MCQ" || value === "CHECKBOX")
        updated.fields[index].options = updated.fields[index].options.length === 0 ? ["Option 1"] : updated.fields[index].options;

      return updated;
    });
  }, 300);

  const deleteFormField = () => {
    setFormData((prev: FormDataType) => {
      if (prev.fields.length <= 1) return prev;
      const updated = { ...prev };
      updated.fields = [ ...updated.fields.slice(0, index), ...updated.fields.slice(index + 1) ];
      return updated;
    });
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex items-center flex-row gap-2">
        <Input 
          name="question"
          placeholder="Question"
          defaultValue={ data.question || "Untitled Question" }
          onChange={(e) => handleQuestionChange(e.target.value)}
          autoComplete="off"
        />

        <Select
          name="field-type"
          defaultValue={ data.type || "SHORT_ANSWER"}
          onValueChange={(value: string) => handleTypeChange(value)}
        >
          <SelectTrigger className="m-all-0 w-2/5">
            <SelectValue placeholder="Select Question Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="SHORT_ANSWER">
              <ShortTextIcon className="inline mr-2" size="1.2rem" /> Short Answer
            </SelectItem>
            <SelectItem value="LONG_ANSWER">
              <LongTextIcon className="inline mr-2" size="1.2rem" /> Long Answer
            </SelectItem>
            <SelectItem value="MCQ">
              <RadioButtonIcon className="inline mr-2" size="1.2rem" /> Multiple Choice
            </SelectItem>
            <SelectItem value="CHECKBOX">
              <CheckboxIcon className="inline mr-2" size="1.2rem" /> Checkbox
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <FieldPreview />
      </CardContent>
      <CardFooter >
        <div className="flex items-center gap-2">
          <p className="text-sm text-zinc-400">Required</p>
          <Switch name="required" defaultChecked={data.required} onCheckedChange={(value) => {
            setFormData((prev: FormDataType) => {
              const updated = { ...prev };
              updated.fields[index].required = value;
              return updated;
            })
          }} />
        </div>
        <Button variant="ghost" className="p-2 ml-auto" onClick={deleteFormField}>
          <TrashIcon size="1.2rem" className="block" />
        </Button>
      </CardFooter>
    </Card>
  );
}

function TextAnswerPreview({ text }: { text: string }) {
  return (
    <p className="pb-2 text-sm text-zinc-400 tracking-wider border-b-1 border-secondary">
      { text }
    </p>
  );
}

type ChoiceAnswerPreviewProps = {
  type: string,
  options?: string[],
  setFormData: Function,
  fieldIndex: number
}

function ChoiceAnswerPreview({ type, options=[], setFormData, fieldIndex }: ChoiceAnswerPreviewProps) {
  const Icon = (): ReactElement => {
    if (type === "CHECKBOX")
      return <CheckboxIcon className="mt-0.5 fill-zinc-400" />
    return <RadioButtonUncheckedIcon className="mt-0.5 fill-zinc-400" />
  }

  const optionCount = useMemo(() => options.length, [options]);

  const addOption = () => {
    if (optionCount >= 5) return;
    const option = `Option ${optionCount + 1}`;
    setFormData((prev: FormDataType) => {
      const updated = { ...prev };
      updated.fields[fieldIndex].options?.push(option);
      return updated;
    });
  }

  const removeOption = (index: number) => {
    if (optionCount <= 1) return;
    setFormData((prev: FormDataType) => {
      const updated = { ...prev };
      const options = updated.fields[fieldIndex].options;
      updated.fields[fieldIndex].options = [ ...options.slice(0, index), ...options.slice(index + 1) ];
      return updated;
    });
  }

  const handleInputChange = useDebouncedCallback((index: number, value: string) => {
    setFormData((prev: FormDataType) => {
      const updated = { ...prev };
      updated.fields[fieldIndex].options[index] = value;
      return updated;
    });
  }, 300);

  return (
    <div className="grid gap-4">
      { options.map((option, index) => (
        <div key={index} className="flex gap-2">
          <Icon />
          <FormInput
            name="option"
            defaultValue={option}
            className="text-sm pb-1  w-full"
            onChange={(e) => handleInputChange(index, e.target.value)}
            placeholder="Option"
          />
          <Button onClick={() => removeOption(index)} variant="ghost" className="h-fit p-px">
            <CloseIcon size="1.2rem" />
          </Button>
        </div>
      )) }
      <div className="flex gap-2">
        <Icon />
        <Button onClick={addOption} variant="link" className="p-0 h-fit text-zinc-400">Add Option</Button>
      </div>
    </div>
  );
}