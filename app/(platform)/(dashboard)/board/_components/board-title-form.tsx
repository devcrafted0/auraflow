"use client";
import { Button } from "@/components/ui/button";
import { Board } from "@/lib/generated/prisma/client";
import { FormInput } from "@/components/form/form-input";
import { ComponentRef, useEffect, useRef, useState } from "react";
import { useAction } from "@/hooks/use-action";
import { updateBoard } from "@/actions/update-board";
import { toast } from "sonner";
import { FormErrors } from "@/components/form/form-errors";

interface BoardTitleFormProps {
  board: Board;
}

const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
  const { execute, fieldErrors } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board "${data.title}" Udpated.`);
      setValue(data.title);
      disableEditing();
    },
    onError: (data) => {
      toast.error(`${data}`);
    },
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formRef = useRef<ComponentRef<"form">>(null);
  const inputRef = useRef<ComponentRef<"input">>(null);

  const [value, setValue] = useState<string>(board.title);

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

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    execute({
      title,
      id: board.id,
    });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex items-center gap-x-2"
        ref={formRef}
      >
        <FormInput
          ref={inputRef}
          id="title"
          onBlur={onBlur}
          defaultValue={value}
          className="text-lg font-bold px-1.75 py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-white focus-visible:ring-1 border-none"
        />
      </form>
    );
  }

  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {board.title}
    </Button>
  );
};

export default BoardTitleForm;
