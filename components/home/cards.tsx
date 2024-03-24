
import { 
  MdOutlineShortText as ShortTextIcon, 
  MdOutlineRadioButtonChecked as RadioButtonIcon,
  MdOutlineRadioButtonUnchecked as RadioButtonUncheckedIcon,
} from "react-icons/md";
import { IoIosArrowDown as ArrowDownIcon } from "react-icons/io";
import { IoToggle as ToggleIcon } from "react-icons/io5";
import { GoTrash as TrashIcon } from "react-icons/go";


export function FormCard() {
  return (
    <div className="grid gap-4 w-full p-4 border-1 border-border rounded-lg">
      <div className="flex flex-row items-center gap-2">
        <p className="border-border border-1 px-4 py-2 rounded-md text-xs grow">Conduct your survey</p>
        <div className="flex items-center gap-2 border-border border-1 rounded-md p-2">
          <ShortTextIcon />
          <p className="text-xs">Short Answer</p>
          <ArrowDownIcon />
        </div>
      </div>
      <div>
        <p className="pb-2 border-b-1 border-border text-xs">Short answer text</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-xs">Required</p>
          <ToggleIcon size="1.2rem" />
        </div>
        <TrashIcon />
      </div>
    </div>
  )
}

export function QuizCard() {
  return (
    <div className="grid gap-2 w-full p-4 border-1 border-border rounded-lg">
      <div className="flex gap-4 items-center px-3 py-2 border-1 border-primary rounded-lg">
        <RadioButtonIcon className="fill-primary" />
        <p className="text-sm">Build your inquire now</p>
      </div>
      <div className="flex gap-4 items-center px-3 py-2 border-1 border-border rounded-lg">
        <RadioButtonUncheckedIcon />
        <p className="text-sm">It's very simple</p>
      </div>
      <div className="flex gap-4 items-center px-3 py-2 border-1 border-border rounded-lg">
        <RadioButtonUncheckedIcon />
        <p className="text-sm">Share with a single link</p>
      </div>
    </div>
  )
}

export function PollCard() {
  return (
    <div className="grid gap-2 w-full p-4 border-1 border-border rounded-lg">
      <div className="flex justify-between items-center px-3 py-2 border-1 border-border rounded-lg relative overflow-hidden text-sm">
        <p>I am going to sign up</p>
        <p>14%</p>
        <div className="absolute h-full w-[14%] bg-neutral-400 bg-opacity-20 top-0 left-0"></div>
      </div>
      <div className="flex justify-between items-center px-3 py-2 border-1 border-primary rounded-lg relative overflow-hidden text-sm">
        <p>Inquire is amazing</p>
        <p>64%</p>
        <div className="absolute h-full w-[64%] bg-orange-400 bg-opacity-20 top-0 left-0"></div>
      </div>
      <div className="flex justify-between items-center px-3 py-2 border-1 border-border rounded-lg relative overflow-hidden text-sm">
        <p>I am trying it out</p>
        <p>22%</p>
        <div className="absolute h-full w-[22%] bg-neutral-400 bg-opacity-20 top-0 left-0"></div>
      </div>
    </div>
  )
}