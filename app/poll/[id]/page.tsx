import PollResponseForm from "@/components/poll/poll-response-form";
import TitleCard from "@/components/poll/title-card";
import { fetchPollById, fetchPollOptions } from "@/lib/poll/data";

export default async function PollPage({ params }: { params: { id: string } }) {
  const pollId = params.id;
  const [poll, options] = await Promise.all([
    fetchPollById(pollId),
    fetchPollOptions(pollId)
  ]);

  return (
    <main className="grow grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full">
        <TitleCard
          title={poll.title}
          body={poll.body}
        />

        <PollResponseForm
          pollId={poll.id}
          options={options}
        />
      </div>
    </main>
  )
}