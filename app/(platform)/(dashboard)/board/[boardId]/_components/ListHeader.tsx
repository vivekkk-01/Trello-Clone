"use client";

import { updateList } from "@/actions/update-list";
import FormInput from "@/components/form/FormInput";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import React, { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import ListOptions from "./ListOptions";

interface ListHeaderProps {
  list: List;
  onAddCard: () => void;
}

const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<ElementRef<"input">>(null);
  const formRef = useRef<ElementRef<"form">>(null);
  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to "${data.title}"!`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeydown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title")! as string;
    if (title === list.title) {
      disableEditing();
      return;
    }
    const boardId = formData.get("boardId")! as string;
    const id = formData.get("id")! as string;

    execute({ title, boardId, id });
  };

  const handleBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div className="pt-2 px-2 text-xm font-semibold flex items-start justify-between gap-x-2">
      {isEditing ? (
        <form ref={formRef} action={onSubmit} className="flex-1 px-[2px]">
          <input type="hidden" value={list.id} id="id" name="id" />
          <input
            type="hidden"
            value={list.boardId}
            id="boardId"
            name="boardId"
          />
          <FormInput
            ref={inputRef}
            id="title"
            placeholder="Enter list title..."
            onBlur={handleBlur}
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden aria-hidden></button>
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="w-full text-sm px-2.5 py-1 h-full font-medium border-transparent"
        >
          {title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} list={list} />
    </div>
  );
};

export default ListHeader;
