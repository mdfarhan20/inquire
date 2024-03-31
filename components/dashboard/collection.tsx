"use client";

import { deleteForm } from "@/lib/form/actions";
import { deleteQuiz } from "@/lib/quiz/actions";
import { deletePoll } from "@/lib/poll/actions";
import { DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { CopyIcon, ExternalLink, Trash2Icon } from "lucide-react";
import { HiOutlineDotsVertical as MenuIcon } from "react-icons/hi";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Popup from "../ui/popup";

interface CollectionProps {
  title: string,
  type: "form" | "quiz" | "poll",
  collection: { id: string, name: string }[]
}


export default function Collection({ title, type, collection }: CollectionProps) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [IDToDelete, setIDToDelete] = useState<string | null>(null);

  const deleteInquire = async (id: string) => {
    if (type === "form")
      return (await deleteForm(id));
    else if (type === "quiz")
      return (await deleteQuiz(id));
    
    return (await deletePoll(id));
  }

  return (
    <div className="w-full">
      <h2 className="text-xl pb-2 border-b-1 border-border">{ title }</h2>

      { collection.length === 0 ? (
        <p className="mt-4 text-neutral-700">You have no {type}s</p>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          { collection.map((item, index) => (
            <li 
              key={index} 
              className="px-4 py-2 bg-neutral-900 flex justify-between items-center rounded-lg cursor-pointer hover:bg-neutral-800 transition-all duration-200"
            >
              <Link href={`/${type}/${item.id}`} className="text-sm">{ item.name }</Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="p-1 hover:bg-neutral-800 rounded-lg">
                  <MenuIcon size="1.1rem" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>
                    <Link href={`/${type}/${item.id}/responses`} className="flex justify-between cursor-pointer w-full">
                      <p>Responses</p>
                      <ExternalLink size="1rem" />
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(`${location.origin}/${type}/${item.id}`);
                    }}
                  >
                    <p>Copy Link</p>
                    <CopyIcon size="1rem" />
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      setIDToDelete(item.id);
                      setPopupOpen(true)
                    }}
                  >
                    <p>Delete</p>
                    <Trash2Icon size="1rem" />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          )) }
        </ul>
      ) }

      { popupOpen && (
        <Popup title="Delete Confirmation" className="absolute top-1/2 left-1/2 -translate-x-1/2" center>
          <p>Are you sure you want to delete?</p>
          <div className="px-20">
            <Button variant="secondary" onClick={async () => {
              await deleteInquire(IDToDelete as string);
              location.reload();
            }}>Delete</Button>
            <Button className="ml-4" variant="ghost" onClick={() => {
              setIDToDelete(null);
              setPopupOpen(false);
            }}>Cancel</Button>
          </div>
        </Popup>
      ) }              
    </div>
  );
}