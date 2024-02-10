import { HTMLAttributes } from "react";

export function Divider(props: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr { ...props } className={`w-full ${props.className}`} />
  );
}

export function DividerWithText({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <hr className="w-full" />
      <p className="text-zinc-300">{ text }</p>
      <hr className="w-full" />
    </div>
  )
}

