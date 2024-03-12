"use client";

import clsx from "clsx";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { GoTrash as TrashIcon } from "react-icons/go";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IoAddOutline as AddIcon, IoClose as CloseIcon } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";
import { QuizDataType } from "@/lib/quiz/types";

interface QuizFieldPreviewProps {
  index: number,
  question: string,
  points: number,
  options: string[],
  setQuizData: Function,
  correctAnswer: number
}

export function QuizFieldPreview({ question, points, options, correctAnswer, index, setQuizData }: QuizFieldPreviewProps) {
  const handleQuestionChange = useDebouncedCallback((value: string) => {
    setQuizData((prev: QuizDataType) => {
      const updated = { ...prev };
      updated.questions[index].question = value;
      return updated;
    });
  }, 300);

  const handlePointsChange = useDebouncedCallback((value: string) => {
    setQuizData((prev: QuizDataType) => {
      const updated = { ...prev };
      updated.questions[index].points = parseInt(value);
      return updated;
    });
  }, 300);

  const addNewOption = () => {
    const newOption = `Option ${options.length + 1}`;
    setQuizData((prev: QuizDataType) => {
      const updated = { ...prev };
      updated.questions[index].options.push(newOption);
      return updated;
    });
  }

  const deleteOption = (id: number) => {
    setQuizData((prev: QuizDataType) => {
      if (prev.questions[index].options.length <= 2) return prev;
      const updated = { ...prev };
      let options: string[] = [...updated.questions[index].options];
      options = [ ...options.slice(0, id), ...options.slice(id + 1) ];
      updated.questions[index].options = options;

      updated.questions[index].correctAnswer = 0;
      return updated;
    });
  }

  const deleteQuestion = () => {
    setQuizData((prev: QuizDataType) => {
      if (prev.questions.length <= 1) return prev;
      const updated = { ...prev };
      updated.questions = [ ...updated.questions.slice(0, index), ...updated.questions.slice(index + 1) ];
      return updated;
    });
  }

  const handleOptionUpdate = useDebouncedCallback((id: number, value: string) => {
    setQuizData((prev: QuizDataType) => {
      const updated = { ...prev };
      updated.questions[index].options[id] = value;
      return updated;
    })
  }, 300);

  const handleCorrectAnswerChange = (value: number) => {
    setQuizData((prev: QuizDataType) => {
      const updated = { ...prev };
      updated.questions[index].correctAnswer = value;
      return updated;
    })
  }

  return (
    <Card>
      <CardHeader>
        <Input 
          name="question"
          placeholder="Question"
          defaultValue={ question || "Untitled Question" }
          onChange={(e) => handleQuestionChange(e.target.value)}
          autoComplete="off"
        />
      </CardHeader>

      <CardContent>
        <RadioGroup 
          className="grid grid-cols-2" 
          onValueChange={(value) => handleCorrectAnswerChange(parseInt(value))}
        >
          { options.map((value, index) => (
            <QuizOption
              key={index}
              id={index}
              value={value}
              checked={correctAnswer === index}
              handleInputChange={handleOptionUpdate}
              deleteOption={deleteOption}
            />
          )) }
          <Button 
            variant="outline" 
            className={clsx("flex gap-1 items-center h-full py-3  ", { "col-span-2": (options.length % 2 === 0) })}
            onClick={addNewOption}
          >
            <AddIcon size="1.2rem" />
            <p>Add Option</p>
          </Button>
        </RadioGroup>
      </CardContent>

      <CardFooter>
        <div className="flex items-center border-1 border-border rounded-md">
          <Label htmlFor="points" className="font-thin text-xs uppercase p-2 pr-1">Points</Label>
          <input 
            type="number" 
            name="points"
            min={0}
            max={100}
            defaultValue={points || 0}
            className="text-xs w-10 text-center pr-1 bg-transparent outline-none"
            onChange={(e) => handlePointsChange(e.target.value)}
          />
        </div>

        <Button variant="ghost" className="p-2 ml-auto" onClick={deleteQuestion}>
          <TrashIcon size="1.2rem" className="block" />
        </Button>
      </CardFooter>
    </Card>
  )
}

interface QuizOptionProps {
  id: number,
  value: string,
  checked: boolean,
  handleInputChange: Function,
  deleteOption: Function
}

function QuizOption({ id, value, checked, handleInputChange, deleteOption }: QuizOptionProps) {
  const radioRef = useRef<HTMLButtonElement>(null);
  
  let className = clsx(
    "border-1 border-border p-3 flex gap-2 items-center rounded-md", 
    { "border-primary": checked }
  );
  
  return (
    <div className={className} onClick={() => {
      radioRef.current?.click()
    }}>
      <RadioGroupItem 
        value={id.toString()}
        ref={radioRef}
        onClick={(e) => e.stopPropagation()}
        checked={checked}
      />
      <input 
        type="text"
        defaultValue={value} 
        className="bg-transparent outline-none w-full text-sm"
        onChange={(e) => handleInputChange(id, e.target.value)}
      />
      <Button 
        variant="ghost"
        className="w-fit h-fit p-1" 
        onClick={(e) => {
          e.stopPropagation();
          deleteOption(id);
        }}
      >
        <CloseIcon />
      </Button>
    </div>
  );
}