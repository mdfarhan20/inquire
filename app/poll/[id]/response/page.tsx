import TitleCard from "@/components/poll/title-card";
import { fetchPollById, fetchPollOptions } from "@/lib/poll/data";
import { GrHomeOption as OptionIcon } from "react-icons/gr";

export default async function PollResponsePage({ params }: { params: { id: string } }) {
  const pollId = params.id;
  const [poll, options] = await Promise.all([
    fetchPollById(pollId),
    fetchPollOptions(pollId)
  ]);

  const totalVotes = options.reduce((acc, option) => option.votes + acc, 0);
  const getVotePercentage = (votes: number) => {
    return Math.round(100 * votes / totalVotes);
  }

  return (
    <main className="grow grid place-items-center p-4">
      <div className="max-w-95 w-full md:w-3/4 lg:w-1/2 flex flex-col gap-4 h-full">
        <div className="border-1 border-border border-t-4 border-t-primary px-4 py-6 rounded-lg">
          <h1 className="text-3xl">{poll.title}</h1>
          <p className="text-sm text-zinc-400">{poll.body}</p>
        </div>

        <ul className="grid gap-4 px-6 py-4 border-1 border-border border-y-primary rounded-lg">
          { options.map((option, index) => (
            <li
              key={index}
              className={"flex items-center border-1 border-border rounded-lg overflow-hidden"}
            >
              <div className="bg-border p-4">
                <OptionIcon />
              </div>
              <div className="px-4 grow relative text-start h-full flex items-center">
                <p>{ option.text }</p>
                <div className={`absolute bg-neutral-400 top-0 left-0 h-full w-[${getVotePercentage(option.votes)}%]`}></div>
              </div>
            </li>
          )) }
        </ul>
      </div>
    </main>
  );
}