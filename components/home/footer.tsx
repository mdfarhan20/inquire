import { FaPoll as Icon } from "react-icons/fa";

export default function Footer() {
  return (
    <footer 
      className="grid gap-2 place-content-center text-center border-t-1 border-secondary px-4 py-8 mt-20 bg-neutral-900 md:grid-cols-2 md:gap-y-6 lg:grid-cols-3"
    >
      <div className="flex items-center justify-center gap-2 lg:col">
        <Icon size="1.2rem" className="fill-primary md:size-8"  />
        <h1 className="text-2xl font-bold md:text-4xl">inquire</h1>
      </div>
      <p className="uppercase tracking-widest text-neutral-400 text-sm md:text-lg lg:self-center">Forms | Quizzes | Polls</p>
      <p className="uppercase tracking-widest text-xs border-1 border-neutral-400 px-2 py-1 rounded-md md:col-span-2 md:border-none lg:col-span-1 lg:self-center">&copy; 2024 - Inquire / mdfarhan20</p>
    </footer>
  )
}