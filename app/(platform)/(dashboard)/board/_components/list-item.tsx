"use client";
import { ListWithCards } from "@/types";
import ListHeader from "./list-header";
import { ComponentRef, useRef, useState } from "react";
import CardForm from "./card-form";
import { cn } from "@/lib/utils";
import CardItem from "./card-item";

interface ListItemProps {
  index: number;
  data: ListWithCards;
}

const ListItem = ({ index, data }: ListItemProps) => {
  const textareaRef = useRef<ComponentRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  return (
    <li className="shrink-0 h-full w-68 select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2 ">
        <ListHeader data={data} onAddCard={enableEditing} />
        <ol
          className={cn(
            "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
            data.card.length > 0 ? "mt-2" : "mt-0",
          )}
        >
          {data.card.map((card, index) => (
            <CardItem key={card.id} index={index} card={card} />
          ))}
        </ol>
        <CardForm
          listId={data.id}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
          ref={textareaRef}
        />
      </div>
    </li>
  );
};

export default ListItem;
