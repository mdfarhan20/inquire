
export function Divider() {
  return (
    <hr className="w-full" />
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

