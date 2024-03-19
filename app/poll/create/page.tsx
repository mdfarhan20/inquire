"use client";

import { useState } from "react";
import TitleCardPreview from "@/components/poll/title-card-preview";
import { GrHomeOption as OptionIcon } from "react-icons/gr";
import { IoAddOutline as AddIcon, IoClose as CloseIcon } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { PollData, PollState } from "@/lib/poll/types";
import { useFormState } from "react-dom";
import { createPoll } from "@/lib/poll/actions";
import FormSubmitButton from "@/components/ui/form-submit-button";
import Popup from "@/components/ui/popup";
import CopyText from "@/components/ui/copy-text";
import Link from "next/link";

export default function CreatePollPage() {
  const [pollData, setPollData] = useState<PollData>({
    title: "Untitled Poll",
    options: ["Option 1", "Option 2"]
  });

  const addOption = () => {
    const data = { ...pollData };
    data.options.push(`Option ${data.options.length + 1}`);
    setPollData(data);
  }

  const deleteOption = (id: number) => {
    if (pollData.options.length <= 2) return;
    const data = { ...pollData }
    data.options = [...data.options.slice(0, id), ...data.options.slice(id + 1)];
    setPollData(data);
  }

  const createPollWithData = createPoll.bind(null, pollData);
  const [formState, formAction] = useFormState<PollState>(createPollWithData, { success: false });

  return (
    <main className="grow grid place-items-center p-4">
      <form 
        action={formAction}
        className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full relative"
      >
        <TitleCardPreview
          title={pollData.title}
          body={pollData.body}
          setPollData={setPollData}
        />

        <ul className="grid gap-4 px-6 py-4 border-border border-1 rounded-lg">
          { pollData.options.map((option, index) => (
            <li key={index} className="flex items-center gap-4 border-1 border-border px-4 py-2 rounded-md">
              <OptionIcon />
              <input 
                type="text"
                defaultValue={option} 
                className="border-none bg-transparent outline-none grow text-sm focus:border-b-1 focus:border-primary"
              />
              <Button 
                variant="ghost"
                className="w-fit h-fit p-1" 
                onClick={(e) => {
                  e.stopPropagation();
                  deleteOption(index);
                }}
              >
                <CloseIcon />
              </Button>
            </li>
          )) }
          <Button 
            variant="outline" 
            className={"flex gap-1 items-center py-3 w-full"}
            onClick={addOption}
          >
            <AddIcon size="1.2rem" />
            <p>Add Option</p>
          </Button>
        </ul>

        <FormSubmitButton text="Create Poll" pendingText="Creating Poll" />
      </form>

      { formState.success && (
        <Popup title="Poll created successfully" className="absolute">
          <CopyText text={`${location.origin}/quiz/${formState.pollId}`} />
          <Link href="/"><Button className="mx-4">Back to Dashboard</Button></Link>
        </Popup>
      ) }
    </main>
  );
} 