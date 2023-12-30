
export function Divider() {
  return (
    <hr />
  );
}

export function DividerWithText({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2">
      <hr className="w-full" />
      <p className="text-muted">{ text }</p>
      <hr className="w-full" />
    </div>
  )
}

