"use client";

import clsx from "clsx";
import { PollOption } from "@prisma/client";
import { useState } from "react";
import { GrHomeOption as OptionIcon } from "react-icons/gr";
import { submitVote } from "@/lib/poll/actions";
import FormSubmitButton from "../ui/form-submit-button";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation";

interface PollResponseFormProps {
  pollId: string,
  options: PollOption[],
}

export default function PollResponseForm({ pollId, options }: PollResponseFormProps) {
  const totalVotes = options.reduce((acc, option) => option.votes + acc, 0);
  const [selection, setSelection] = useState<string | null>(null);

  const submitVoteWithId = submitVote.bind(null, selection);
  const [formState, formAction] = useFormState(submitVoteWithId, { success: false });

  if (formState.success) {
    return redirect(`/poll/${pollId}/response`);
  }

  return (
    <form
      action={formAction}
      className="grid gap-4 px-6 py-4 border-1 border-border border-y-primary rounded-lg"
    >
      { options.map((option, index) => (
        <button
          key={index}
          className={clsx("flex items-center border-1 border-border rounded-lg overflow-hidden cursor-pointer", {
            "border-primary": selection === option.id
          })}
          type="button"
          onClick={() => setSelection(option.id)}
        >
          <div className={clsx("bg-border p-4", { "bg-orange-500 bg-opacity-25": selection === option.id })}>
            <OptionIcon />
          </div>
          <div className="px-4 grow relative text-start h-full flex items-center">
            <p>{ option.text }</p>
          </div>
        </button>
      )) }

      <div className="flex items-center justify-between">
        <div className="flex items-center place-self-end uppercase text-sm border-border border-1 rounded-md w-fit">
          <p className="px-3">Votes</p> 
          <span className="bg-border px-3 py-2">{totalVotes}</span>
        </div>
        <FormSubmitButton
          text="Vote"
          pendingText="Voting"
          variant="secondary"
        />
      </div>
    </form>
  );
}