"use client";

import { MdContentCopy as CopyIcon } from "react-icons/md";

export default function CopyText({ text }: { text: string }) {
  return (
    <div className="flex bg-zinc-950 rounded-md border-zinc-800 border-1 mx-4">
      <p className="px-4 py-2 italic text-zinc-400" >{ text }</p>
      <button 
        className="bg-zinc-800 p-2 overflow-hidden"
        onClick={() => {
          navigator.clipboard.writeText(text)
          alert("Text Copied!!");
        }}
      >
        <CopyIcon size="1.2rem" />
      </button>
    </div>
  );
}