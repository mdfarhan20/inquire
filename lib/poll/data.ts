import prisma from "@/prisma/client";
import { Poll, PollOption } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";


export async function fetchPollById(id: string) {
  const poll = await prisma.poll.findUnique({
    where: { id }
  });

  if (!poll)
    return notFound();

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