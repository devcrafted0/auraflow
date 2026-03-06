"use client";
import { createCard } from "@/actions/create-card";
import { FormSubmit } from "@/components/form/form-submit";
import FormTextarea from "@/components/form/form-textarea";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/use-action";
import { PlusCircle, X } from "lucide-react";
import { parseRelativeUrl } from "next/dist/shared/lib/router/utils/parse-relative-url";
import { useParams } from "next/navigation";
import { ComponentRef, KeyboardEventHandler, RefObject, useRef } from "react";
import { toast } from "sonner";
import { useEventListener, useOnClickOutside } from "usehooks-ts";

interface CardFormProps {
  listId: string;
  isEditing: boolean;
  enableEditing: () => void;
  disableEditing: () => void;
  ref: RefObject<HTMLTextAreaElement | null>;
}

const CardForm = ({
  listId,
  isEditing,
  enableEditing,
  disableEditing,
  ref,
}: CardFormProps) => {
  const params = useParams();
  const formRef = useRef<ComponentRef<"form">>(null);

  const { execute, fieldErrors } = useAction(createCard, {
    onSuccess: (data) => {
      toast.success(`Card "${data}" created`);
      formRef.current?.reset();
    },
    onError: (data) => {
      toast.error(data);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  useOnClickOutside(
    formRef as React.RefObject<HTMLFormElement>,
    disableEditing,
  );
  useEventListener("keydown", onKeyDown);

  const onTextAreaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const listId = formData.get("listId") as string;
    const boardId = formData.get("boardId") as string;

    execute({ title, listId, boardId });
  };

  if (isEditing) {
    return (
      <form ref={formRef} action={onSubmit} className="m-1 py-0.5 space-y-4">
        <FormTextarea
          id="title"
          onKeyDown={onTextAreaKeyDown}
          ref={ref}
          placeholder="Enter a title for this card..."
          errors={fieldErrors}
        />
        <input hidden id="listId" name="listId" value={listId} />
        <input hidden id="boardId" name="boardId" value={params.id} />
        <div className="flex items-center gap-x-1">
          <FormSubmit>Add a Card</FormSubmit>
          <Button onClick={disableEditing} size="sm" variant="ghost">
            <X className="w-5 h-5" />
          </Button>
        </div>
      </form>
    );
  }

  return (
    <div className="pt-2 px-2">
      <Button
        className="h-auto px-2 py-1.5 w-full justify-start text-muted-foreground text-sm"
        variant="ghost"
        size="sm"
        onClick={enableEditing}
      >
        <PlusCircle className="h-4 w-4" />
        Add a Card
      </Button>
    </div>
  );
};

export default CardForm;
