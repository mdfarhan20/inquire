"use server";

import prisma from "@/prisma/client";
import { getSession } from "@/lib/get-session";
import { PollData, PollState } from "@/lib/poll/types";
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

export async function submitVote(optionId: string | null) {
  try {
    if (!optionId)
      throw new Error("No Option Selected");

    const option = await prisma.pollOption.find({
      where: { id: optionId }
    });

    await prisma.pollOption.update({
      where: { id: optionId },
      data: { votes: option.votes + 1 }
    });
  } catch (err) {
    console.log(err);
  }
}