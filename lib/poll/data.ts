import prisma from "@/prisma/client";
import { Poll, PollOption } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";


export async function fetchPollById(id: string) {
  const poll: Poll = await prisma.poll.findUnique({
    where: { id }
  });

  return poll;
}

export async function fetchPollOptions(pollId: string) {
  const options: PollOption[] = await prisma.pollOption.findMany({
    where: { pollId }
  });

  return options;
}

export async function fetchPollsByUser(userId: string) {
  noStore();
  const polls: Poll[] = await prisma.poll.findMany({
    where: { userId },
  });

  return polls;
}