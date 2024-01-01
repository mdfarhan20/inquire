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
import {  ReactElement,  useState } from "react";
import { FormInput } from "@/components/form/form-input";

export function FormField() {
  const [fieldType, setFieldType] = useState("SHORT_ANSWER");

  const FieldPreview = (): ReactElement => {
    if (fieldType === "SHORT_ANSWER")
      return <TextAnswerPreview text="Short answer text" />
    else if (fieldType === "LONG_ANSWER")
      return <TextAnswerPreview text="Long answer text" />
    else if (fieldType === "CHECKBOX" || fieldType === "MCQ")
      return <ChoicePreview />

    return <TextAnswerPreview text="undefined" />
  }

  return (
    <Card>
      <CardHeader className="flex items-center flex-row gap-2">
        <Input 
          name="question"
          placeholder="Question"
          defaultValue="Untitled Question"
        />

        <Select
          name="field-type"
          defaultValue="SHORT_ANSWER"
          onValueChange={(value: string) => setFieldType(value)}
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
          <Switch />
        </div>
        <Button variant="ghost" className="p-2 ml-auto">
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

function ChoicePreview() {
  const [options, setOptions] = useState([{
    name: "option-1", defaultValue: "Option 1"
  }]);

  const addOption = () => {
    const index = options.length + 1;
    const newOption = {
      name: `option-${index}`,
      defaultValue: `Option ${index}`,
    };

    setOptions(prev => [...prev, newOption] );
  }

  const removeOption = (index: number) => {
    const updatedOptions = [...options.slice(0, index), ...options.slice(index + 1)];
    console.log(updatedOptions);
    setOptions(updatedOptions);
  }

  console.log("Options:", options);

  return (
    <div className="grid gap-4">
      { options.map((option, index) => (
        <div className="flex gap-2">
          <RadioButtonUncheckedIcon className="mt-0.5 fill-zinc-400" />
          <FormInput
            name={option.name}
            defaultValue={option.defaultValue}
            className="text-sm pb-1 w-full"
          />
          <Button onClick={() => removeOption(index)} variant="ghost" className="h-fit p-px">
            <CloseIcon size="1.2rem" />
          </Button>
        </div>
      )) }
      <div className="flex gap-2">
        <RadioButtonUncheckedIcon className="mt-0.5 fill-zinc-400" />
        <Button onClick={addOption} variant="link" className="p-0 h-fit text-zinc-400">Add Option</Button>
      </div>
    </div>
  );
}