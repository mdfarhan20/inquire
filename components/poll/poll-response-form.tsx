"use client";

import clsx from "clsx";
import { PollOption } from "@prisma/client";
import { useRef, useState } from "react";
import { GrHomeOption as OptionIcon } from "react-icons/gr";

interface PollResponseFormProps {
  options: PollOption[],
}

export default function PollResponseForm({ options }: PollResponseFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const totalVotes = options.reduce((acc, option) => option.votes + acc, 0);
  const [currentSelection, setCurrentSelection] = useState<string | null>(null);
  const [previousSelection, setPreviousSelection] = useState<string | null>(null);

  const getVotePercentage = (votes: number) => {
    return Math.round((votes / totalVotes) * 100);
  }

  const handleOptionSelect = (index: number, optionId: string) => {
    setPreviousSelection(currentSelection);
    setCurrentSelection(optionId);
  }

  return (
    <form
      ref={formRef}
      className="grid gap-4 px-6 py-4 border-1 border-border border-y-primary rounded-lg"
    >
      { options.map((option, index) => (
        <button
          key={index}
          className={clsx("flex items-center border-1 border-border rounded-lg overflow-hidden cursor-pointer", {
            "border-primary": currentSelection === option.id
          })}
          type="button"
          onClick={() => handleOptionSelect(index, option.id)}
        >
          <div className={clsx("bg-border p-4", { "bg-orange-500 bg-opacity-25": currentSelection === option.id })}>
            <OptionIcon />
          </div>
          <div className="px-4 grow relative text-start">
            <div className={`absolute bg-orange-500 bg-opacity-25 top-0 left-0 h-full w-[${getVotePercentage(option.votes)}%]`}></div>
            <p>{ option.text }</p>
          </div>
        </button>
      )) }

      <div className="flex items-center place-self-end uppercase text-sm border-border border-1 rounded-md w-fit">
        <p className="px-3">Votes</p> 
        <span className="bg-border px-3 py-2">{totalVotes}</span>
      </div>
    </form>
  );
}