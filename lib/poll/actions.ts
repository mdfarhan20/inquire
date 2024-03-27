"use server";

import prisma from "@/prisma/client";
import { getSession } from "@/lib/get-session";
import { PollData } from "@/lib/poll/types";
import { Poll } from "@prisma/client";

export async function createPoll(pollData: PollData, prevState: PollState) {
  const session = await getSession();
  let pollId;
  try {
    const poll: Poll = await prisma.poll.create({
      data: {
        title: pollData.title,
        body: pollData.body,
        userId: session?.userId
      }
    });

    pollData.options.forEach(async (option) => {
      await createPollOption(option, poll.id);
    });

    pollId = poll.id;
  } catch (err) {
    console.log(err);
  } 

  return {
    success: true,
    message: "Poll created successfully",
    pollId
  }
}

export async function createPollOption(option: string, pollId: string) {
  try {
    await prisma.pollOption.create({
      data: {
        text: option,
        pollId
      }
    })
  } catch (err) {
    console.log(err);
  }
}

export type PollState = {
  success: boolean,
  message?: string
}

export async function submitVote(optionId: string | null, prevState: PollState) {
  try {
    if (!optionId)
      throw new Error("No Option Selected");

    const option = await prisma.pollOption.findUnique({
      where: { id: optionId }
    });

    console.log(option);

    await prisma.pollOption.update({
      where: { id: optionId },
      data: { votes: option.votes + 1 }
    });

    return {
      success: true,
    }
  } catch (err) {
    console.log(err);
  }

  return {
    success: false
  }
}

export async function deletePoll(pollId: string) {
  try {
    await prisma.poll.delete({
      where: { id: pollId }
    });
  } catch (err) {
    console.log(err);
  }
}