import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormSubmit } from "@/components/form/form-submit";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/use-action";
import { List } from "@/lib/generated/prisma/client";
import { CirclePlus, Copy, MoreHorizontal, Trash2, X } from "lucide-react";
import { ComponentRef, useRef } from "react";
import { toast } from "sonner";

interface ListOptionsProps {
  data: List;
  onAddCard: () => void;
}

const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
  const closeRef = useRef<ComponentRef<"button">>(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" deleted.`);
      closeRef.current?.click();
    },
    onError: (data) => {
      toast.error(data);
    },
  });

  const onDelete = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeDelete({ id, boardId });
  };

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List "${data.title}" copied.`);
      closeRef.current?.click();
    },
    onError: (data) => {
      toast.error(data);
    },
  });

  const onCopy = (formData: FormData) => {
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;
    executeCopy({ id, boardId });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-auto h-auto p-2" variant="ghost">
          <MoreHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 py-3" align="start" side="bottom">
        <div className="text-sm font-medium text-center text-neutral-600 py-1">
          List Actions
        </div>

        <PopoverClose ref={closeRef} asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>

        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start items-center font-normal text-sm"
          variant="ghost"
          onClick={onAddCard}
        >
          <CirclePlus className="ml-3" />
          Add a Card
        </Button>
        <form action={onCopy}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start items-center font-normal text-sm"
          >
            <Copy className="ml-3" />
            Copy Selected List
          </FormSubmit>
        </form>
        <Separator />
        <form action={onDelete}>
          <input hidden name="id" id="id" value={data.id} />
          <input hidden name="boardId" id="boardId" value={data.boardId} />
          <FormSubmit
            variant="danger"
            className="rounded-none w-full h-auto p-2 px-5 justify-start items-center font-normal text-sm"
          >
            <Trash2 className="ml-3" />
            Delete this list...
          </FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ListOptions;
