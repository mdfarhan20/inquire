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

export async function updatePollVotes(optionId: string, prevOptionId: string | null) {
  try {
    if (prevOptionId) {
      await prisma.pollOption.update({
        where: {}
      })
    }
  }
}